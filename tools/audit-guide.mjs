#!/usr/bin/env node
/* ============================================================
   audit-guide.mjs — deterministic bug audit for a course's study guide.

     node tools/audit-guide.mjs [COURSE] [--quick] [--json]       (default COMP211)

   Loads courses/<COURSE>/guide/index.html in jsdom (scripts really run), then:
     1. PAGE        no script/console errors, every <script src> resolves
     2. LESSONS     every lesson-bar button has a container with content and
                    vice versa; labels unique; topic tabs point at real sections
     3. QUESTIONS   every question is well formed (answer index in range, fill
                    answers non-empty, no raw tab/newline in data-answer, explanation
                    present); then each is ANSWERED CORRECTLY (must be accepted) and,
                    where possible, WRONGLY (must be rejected)
     4. PROGRESS    saved progress is restored with the answer visibly shown
                    (correct option marked, blanks filled, boxes ticked)
     5. LINKS       showLesson()/showTopic() targets and Mastery lesson links exist
     6. TEXT        no "undefined", "[object Object]", "NaN" or unrendered ${...}
     7. MASTERY     runs tools/validate-mastery.mjs and renders every item
     8. MATERIALS   every file named in materials.js exists; nothing from
                    materials/private is referenced
   Exit code is non-zero when any ERROR is found (warnings do not fail).
   --quick skips the answer-every-question simulation and the Mastery item rendering.
   ============================================================ */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { JSDOM, VirtualConsole } from 'jsdom';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const COURSE = args.find(a => !a.startsWith('--')) || 'COMP211';
const QUICK = args.includes('--quick');
const AS_JSON = args.includes('--json');
const COURSE_DIR = join(ROOT, 'courses', COURSE);
const GUIDE = join(COURSE_DIR, 'guide', 'index.html');
if (!existsSync(GUIDE)) { console.error('No guide at ' + GUIDE); process.exit(2); }

const problems = [];   // {level, area, where, msg}
const add = (level, area, where, msg) => problems.push({ level, area, where, msg });
const err = (area, where, msg) => add('ERROR', area, where, msg);
const warn = (area, where, msg) => add('warn', area, where, msg);
const stats = { lessons: 0, topics: 0, questions: 0, answeredOk: 0, rejectedOk: 0, restored: 0, units: 0, items: 0 };
const short = s => String(s).replace(/\s+/g, ' ').trim().slice(0, 90);

/* ------------------------------------------------------------ load */
function load(savedProgress) {
  const errors = [], missing = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(String(e.stack || e.message).split('\n').slice(0, 2).join(' | ')));
  vc.on('error', (...a) => errors.push('console.error: ' + a.map(String).join(' ')));
  vc.on('warn', () => {});
  const dom = new JSDOM(readFileSync(GUIDE, 'utf8'), {
    url: 'file://' + GUIDE, runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) {
      w.matchMedia = w.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
      w.scrollTo = () => {};
      w.HTMLElement.prototype.scrollIntoView = function () {};
      /* file:// pages have an opaque origin, so jsdom has no localStorage: give the page an in-memory one */
      const mem = new Map(Object.entries(savedProgress || {}));
      const store = { getItem: k => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => { mem.set(String(k), String(v)); }, removeItem: k => { mem.delete(k); }, clear: () => mem.clear(), key: i => [...mem.keys()][i] ?? null, get length() { return mem.size; } };
      Object.defineProperty(w, 'localStorage', { value: store, configurable: true });
    }
  });
  return new Promise(res => {
    const done = () => setTimeout(() => res({ dom, win: dom.window, doc: dom.window.document, errors, missing }), 300);
    if (dom.window.document.readyState === 'complete') done(); else dom.window.addEventListener('load', done);
  });
}

/* ------------------------------------------------------------ helpers */
function questionsOf(doc) {
  return [...doc.querySelectorAll('.q')].map(q => {
    const lesson = q.closest('.lesson'), topic = q.closest('.topic');
    const kind = q.dataset.mc !== undefined ? 'mc' : q.dataset.tf !== undefined ? 'tf' : q.dataset.multi !== undefined ? 'multi' : q.querySelector('.fillblank') ? 'fill' : 'other';
    return { q, kind, lesson: lesson && lesson.id, topic: topic && topic.id, label: (lesson ? lesson.id : '?') + '/' + (topic ? topic.id.replace(/^l\d+-/, '') : '?') + ': ' + short((q.querySelector('.prompt') || q.previousElementSibling || q).textContent || '') };
  });
}

/* ------------------------------------------------------------ 1-6: the page */
async function auditPage() {
  const { win, doc, errors } = await load();
  errors.forEach(e => err('PAGE', 'index.html', e));
  /* script tags resolve */
  const base = dirname(GUIDE);
  [...doc.querySelectorAll('script[src]')].forEach(s => {
    const p = resolve(base, s.getAttribute('src'));
    if (!/^https?:/.test(s.getAttribute('src')) && !existsSync(p)) err('PAGE', s.getAttribute('src'), 'script file not found');
  });
  [...doc.querySelectorAll('link[href]')].forEach(l => {
    const h = l.getAttribute('href');
    if (!/^(https?:|data:|#)/.test(h) && !existsSync(resolve(base, h))) err('PAGE', h, 'stylesheet not found');
  });

  /* lessons */
  const buttons = [...doc.querySelectorAll('.lesson-bar button[data-l]')].filter(b => b.dataset.l !== 'lmastery');
  const containers = [...doc.querySelectorAll('.lesson')];
  const seenLabel = new Map();
  buttons.forEach(b => {
    const id = b.dataset.l, c = doc.getElementById(id), label = b.textContent.trim();
    stats.lessons++;
    if (!c) { err('LESSONS', id, 'lesson-bar button has no #' + id + ' container'); return; }
    if (c.innerHTML.trim().length < 200) err('LESSONS', id, 'lesson "' + label + '" is empty or nearly empty (script missing/failed?)');
    if (seenLabel.has(label)) err('LESSONS', id, 'duplicate lesson label "' + label + '" (also ' + seenLabel.get(label) + ')');
    seenLabel.set(label, id);
    if (!/onclick="showLesson\('/.test(b.outerHTML) && !b.onclick) warn('LESSONS', id, 'button has no showLesson handler');
  });
  containers.forEach(c => { if (!buttons.some(b => b.dataset.l === c.id) && c.id !== 'lmastery') warn('LESSONS', c.id, 'lesson container has no lesson-bar button'); });

  /* topics */
  containers.forEach(c => {
    const topics = [...c.querySelectorAll('.topic')], ids = new Set(topics.map(t => t.id));
    stats.topics += topics.length;
    [...c.querySelectorAll('.topics button[onclick]')].forEach(b => {
      const m = (b.getAttribute('onclick') || '').match(/showTopic\(this,\s*'([^']+)'/);
      if (m && !ids.has(m[1])) err('LINKS', c.id, 'topic tab "' + short(b.textContent) + '" points at missing section #' + m[1]);
    });
    topics.forEach(t => {
      if (![...c.querySelectorAll('.topics button[onclick]')].some(b => (b.getAttribute('onclick') || '').includes("'" + t.id + "'"))) warn('LESSONS', c.id, 'section #' + t.id + ' has no topic tab');
      if (!t.querySelector('h2')) warn('LESSONS', t.id, 'section has no <h2> heading');
    });
  });

  /* duplicate ids */
  const idCount = {};
  doc.querySelectorAll('[id]').forEach(e => { idCount[e.id] = (idCount[e.id] || 0) + 1; });
  Object.entries(idCount).filter(([, n]) => n > 1).forEach(([id, n]) => err('PAGE', '#' + id, 'duplicate id used ' + n + ' times'));

  /* showLesson / showTopic links in markup and in the lesson text */
  const lessonIds = new Set(containers.map(c => c.id).concat(['lmastery']));
  [...doc.querySelectorAll('[onclick]')].forEach(e => {
    const s = e.getAttribute('onclick') || '';
    for (const m of s.matchAll(/showLesson\(\s*'(l\w+)'/g)) if (!lessonIds.has(m[1])) err('LINKS', (e.closest('.lesson') || {}).id || 'page', 'onclick targets missing lesson ' + m[1] + ' ("' + short(e.textContent) + '")');
  });

  /* text smells: a stray "undefined" / "[object Object]" in visible prose is almost always a template bug.
     ("undefined behavior", NaN and ${VAR} are legitimate topics in C, floating point and shell lessons, so not flagged.) */
  containers.forEach(c => {
    const prose = [...c.querySelectorAll('*')].filter(e => !e.closest('code, pre')).flatMap(e => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent)).join(' ');
    if (/\[object Object\]/.test(prose)) err('TEXT', c.id, 'visible text contains "[object Object]"');
    const m = prose.match(/.{0,30}(?<!\b(?:is|are|be|was|remains|stays)\s)(?<!\()\bundefined\b(?!\s+(behaviou?r|value|result|results|operation|operations|or\b|variable|order|pointer|state|reads?))(?!\W+(behaviou?r))/i);
    if (m) warn('TEXT', c.id, 'visible text contains a bare "undefined": …' + short(m[0]) + '…');
  });

  /* questions: static shape */
  const qs = questionsOf(doc);
  stats.questions = qs.length;
  qs.forEach(({ q, kind, label }) => {
    /* the engine moves each explanation into fb._explain at load, so the element itself is empty until earned;
       the .fb may sit inside the question, right after it, or be shared by the enclosing card */
    const fbs = [q.querySelector('.fb'), q.nextElementSibling && q.nextElementSibling.classList.contains('fb') ? q.nextElementSibling : null, q.parentElement && q.parentElement.querySelector(':scope > .fb')].filter(Boolean);
    if (!fbs.some(f => String(f._explain || '').replace(/<[^>]*>/g, '').trim() || f.textContent.trim())) warn('QUESTIONS', label, 'no explanation (.fb) text');
    if (kind === 'mc') {
      const opts = q.querySelectorAll('.opt'), k = parseInt(q.dataset.mc, 10);
      if (!(k >= 0 && k < opts.length)) err('QUESTIONS', label, 'data-mc="' + q.dataset.mc + '" is outside the ' + opts.length + ' options');
      if (opts.length < 2) err('QUESTIONS', label, 'fewer than 2 options');
      const idx = [...opts].map(o => o.dataset.i); if (new Set(idx).size !== idx.length) err('QUESTIONS', label, 'duplicate data-i values');
      const texts = [...opts].map(o => o.textContent.trim()); if (new Set(texts).size !== texts.length) warn('QUESTIONS', label, 'two options have identical text');
    } else if (kind === 'tf') {
      if (!/^[TF]$/.test(q.dataset.tf)) err('QUESTIONS', label, 'data-tf must be T or F, got "' + q.dataset.tf + '"');
      const vs = [...q.querySelectorAll('.opt')].map(o => o.dataset.v);
      if (!vs.includes(q.dataset.tf)) err('QUESTIONS', label, 'no option with data-v="' + q.dataset.tf + '"');
    } else if (kind === 'multi') {
      const items = q.querySelectorAll('.ma-item input'), want = q.dataset.multi.split(',').map(s => s.trim());
      want.forEach(w => { if (![...items].some(i => i.dataset.i === w)) err('QUESTIONS', label, 'data-multi index ' + w + ' has no checkbox'); });
      if (!q.querySelector('button[onclick*="checkMulti"]')) err('QUESTIONS', label, 'no Check button');
    } else if (kind === 'fill') {
      q.querySelectorAll('.fillblank').forEach(inp => {
        const a = inp.dataset.answer;
        if (a === undefined || !a.trim()) err('QUESTIONS', label, 'fill blank has no data-answer');
        else {
          if (/[\t\n\r]/.test(a)) err('QUESTIONS', label, 'data-answer contains a raw tab/newline character (a "\\t" or "\\n" inside a template literal must be written "\\\\t"/"\\\\n"): ' + JSON.stringify(a.slice(0, 60)));
          if (a.split('~~~').some(x => !x.trim())) err('QUESTIONS', label, 'data-answer has an empty alternative (stray ~~~)');
        }
      });
      if (!q.querySelector('button[onclick*="checkFill"]') && !q.closest('.card')?.querySelector('button[onclick*="checkFillGroup"]')) warn('QUESTIONS', label, 'no Check button');
    } else if (kind === 'other') {
      warn('QUESTIONS', label, 'unrecognised question type');
    }
  });
  return { win, doc, qs };
}

/* ------------------------------------------------------------ 3b: answer every question */
async function simulate(ctx) {
  const { win, doc, qs } = ctx;
  const outcomes = [];
  for (const { q, kind, label } of qs) {
    try {
      if (kind === 'mc' || kind === 'tf') {
        const opts = [...q.querySelectorAll('.opt')];
        const right = kind === 'mc' ? opts.find(o => o.dataset.i === q.dataset.mc) : opts.find(o => o.dataset.v === q.dataset.tf);
        const wrong = opts.find(o => o !== right);
        if (wrong && right) { wrong.click(); if (!wrong.classList.contains('wrong')) err('QUESTIONS', label, 'a wrong option was not marked wrong'); else stats.rejectedOk++; }
        if (right) { right.click(); if (!right.classList.contains('correct') || !q.dataset.done) err('QUESTIONS', label, 'clicking the correct option did not complete the question'); else stats.answeredOk++; }
      } else if (kind === 'multi') {
        const want = q.dataset.multi.split(',').map(s => s.trim());
        const boxes = [...q.querySelectorAll('.ma-item input')];
        boxes.forEach(b => { b.checked = !want.includes(b.dataset.i); });   // all wrong
        win.checkMulti(q.querySelector('button[onclick*="checkMulti"]'));
        if (q.dataset.done) err('QUESTIONS', label, 'an all-wrong checkbox set was accepted'); else stats.rejectedOk++;
        boxes.forEach(b => { b.checked = want.includes(b.dataset.i); });
        win.checkMulti(q.querySelector('button[onclick*="checkMulti"]'));
        if (!q.dataset.done) err('QUESTIONS', label, 'the intended checkbox set was rejected'); else stats.answeredOk++;
      } else if (kind === 'fill') {
        const inputs = [...q.querySelectorAll('.fillblank')];
        const btn = q.querySelector('button[onclick*="checkFill"]');
        if (btn) {
          inputs.forEach(i => { i.value = '@@definitely-wrong@@'; });
          btn.click();
          if (q.dataset.done) err('QUESTIONS', label, 'a nonsense answer was accepted'); else stats.rejectedOk++;
          /* every listed alternative must be accepted */
          let allOk = true;
          for (const inp of inputs) {
            for (const alt of inp.dataset.answer.split('~~~')) {
              inputs.forEach(i => { i.value = i.dataset.answer.split('~~~')[0]; });
              inp.value = alt.trim();
              if (!win.gradeInput(inp)) { allOk = false; err('QUESTIONS', label, 'listed alternative is not accepted by the grader: ' + JSON.stringify(alt.slice(0, 50))); }
            }
          }
          inputs.forEach(i => { i.value = i.dataset.answer.split('~~~')[0]; });
          btn.click();
          if (allOk) { if (!q.dataset.done) err('QUESTIONS', label, 'the intended answer was rejected'); else stats.answeredOk++; }
        }
      }
    } catch (e) { err('QUESTIONS', label, 'threw while answering: ' + e.message); }
  }
  /* collect progress for the restore test */
  const saved = {};
  for (let i = 0; i < win.localStorage.length; i++) { const k = win.localStorage.key(i); saved[k] = win.localStorage.getItem(k); }
  return saved;
}

/* ------------------------------------------------------------ 4: restore */
async function restoreTest(saved) {
  if (!Object.keys(saved).length) { warn('PROGRESS', 'localStorage', 'nothing was saved after answering questions'); return; }
  const { doc, errors } = await load(saved);
  errors.forEach(e => err('PROGRESS', 'reload', e));
  const done = questionsOf(doc).filter(x => x.q.dataset.done);
  if (!done.length) { err('PROGRESS', 'reload', 'no answered question was restored from saved progress'); return; }
  done.forEach(({ q, kind, label }) => {
    stats.restored++;
    if (kind === 'mc' || kind === 'tf') {
      const right = [...q.querySelectorAll('.opt')].find(o => kind === 'mc' ? o.dataset.i === q.dataset.mc : o.dataset.v === q.dataset.tf);
      if (!right || !right.classList.contains('correct')) err('PROGRESS', label, 'restored question shows the verdict but not the correct option marked');
    } else if (kind === 'multi') {
      const want = q.dataset.multi.split(',').map(s => s.trim());
      if (![...q.querySelectorAll('.ma-item input')].every(b => b.checked === want.includes(b.dataset.i))) err('PROGRESS', label, 'restored question does not show the correct boxes ticked');
    } else if (kind === 'fill') {
      q.querySelectorAll('.fillblank').forEach(i => { if (!i.value) err('PROGRESS', label, 'restored question shows an empty answer box'); });
    }
  });
}

/* ------------------------------------------------------------ 7: Mastery */
async function auditMastery() {
  const v = spawnSync('node', [join(ROOT, 'tools', 'validate-mastery.mjs'), COURSE], { encoding: 'utf8', timeout: 300000 });
  const out = (v.stdout || '') + (v.stderr || '');
  if (v.status !== 0) { out.split('\n').filter(l => /✗|FAILED|Error/.test(l)).slice(0, 25).forEach(l => err('MASTERY', 'validate-mastery', l.trim())); if (!/✗/.test(out)) err('MASTERY', 'validate-mastery', 'validator exited with status ' + v.status); }
  const m = out.match(/(\d+) units · (\d+) items/); if (m) { stats.units = +m[1]; stats.items = +m[2]; }

  const { win, doc, errors } = await load();
  const M = win.Mastery;
  if (!M) { err('MASTERY', 'page', 'window.Mastery is not defined'); return; }
  const barIds = new Set([...doc.querySelectorAll('.lesson-bar button[data-l]')].map(b => b.dataset.l));
  M.units.forEach(u => {
    (u.lessons || []).forEach(l => { if (!barIds.has(l.id)) err('LINKS', 'Mastery ' + u.id, 'lesson link "' + l.label + '" -> #' + l.id + ' has no lesson-bar button'); });
    const labelOf = {}; [...doc.querySelectorAll('.lesson-bar button[data-l]')].forEach(b => { labelOf[b.dataset.l] = b.textContent.trim().replace(/\s+/g, ' '); });
    if (!u.cards.length) warn('MASTERY', u.id, 'unit has no recall cards');
    if (!(u.learn && (u.learn.big || []).length)) warn('MASTERY', u.id, 'unit has no “big ideas”');
  });
  if (!QUICK) {
    for (const u of M.units) {
      for (const it of u.items.concat(u.checkpoint || [])) {
        try { const r = M.renderItem(it, { exam: true }); if (!r || !r.node || !r.node.textContent.trim()) err('MASTERY', u.id + ' ' + short(it.prompt), 'item rendered empty'); }
        catch (e) { err('MASTERY', u.id + ' ' + short(it.prompt || it.topic), 'render threw: ' + e.message); }
      }
    }
  }
  /* hub renders */
  try { const b = doc.querySelector('.lesson-bar button[data-l="lmastery"]'); win.showLesson('lmastery', b); } catch (e) { err('MASTERY', 'hub', 'opening the Mastery tab threw: ' + e.message); }
  errors.forEach(e => err('MASTERY', 'hub', e));
}

/* ------------------------------------------------------------ 8: materials */
function auditMaterials() {
  const f = join(COURSE_DIR, 'materials.js');
  if (!existsSync(f)) return;
  const w = {}; try { new Function('window', readFileSync(f, 'utf8'))(w); } catch (e) { err('MATERIALS', 'materials.js', 'does not parse: ' + e.message); return; }
  const all = [].concat((w.MATERIALS || {}).lectures || [], (w.MATERIALS || {}).exams || []);
  all.forEach(m => {
    if (m.file) {
      if (!existsSync(join(COURSE_DIR, m.file))) err('MATERIALS', m.title, 'file missing: ' + m.file);
      if (/materials\/private\//.test(m.file)) err('MATERIALS', m.title, 'references materials/private (graded work must not be published)');
      if (/\.pdf$/i.test(m.file) && !existsSync(join(COURSE_DIR, m.file.replace(/\.pdf$/i, '.txt')))) warn('MATERIALS', m.title, 'no .txt extract next to the PDF, so Ask cannot search it');
    }
  });
  const dir = join(COURSE_DIR, 'materials');
  for (const sub of ['lectures', 'readings']) {
    const d = join(dir, sub); if (!existsSync(d)) continue;
    readdirSync(d).filter(n => /\.(pdf|txt)$/i.test(n)).forEach(n => {
      if (!all.some(m => (m.file || '').endsWith('/' + n)) && !/\.txt$/i.test(n)) warn('MATERIALS', sub + '/' + n, 'file is not listed in materials.js');
    });
  }
}

/* ------------------------------------------------------------ run */
process.on('unhandledRejection', e => { console.error('audit crashed:', e && (e.stack || e.message || e)); process.exit(2); });
(async () => {
  const t0 = Date.now();
  let ctx;
  try { ctx = await auditPage(); } catch (e) { err('PAGE', 'audit', 'could not audit the page: ' + (e.stack || e.message)); }
  if (ctx && !QUICK) { const saved = await simulate(ctx); await restoreTest(saved); }
  try { await auditMastery(); } catch (e) { err('MASTERY', 'audit', 'could not audit Mastery: ' + (e.stack || e.message)); }
  auditMaterials();

  const errs = problems.filter(p => p.level === 'ERROR'), warns = problems.filter(p => p.level === 'warn');
  if (AS_JSON) { console.log(JSON.stringify({ course: COURSE, stats, problems }, null, 2)); }
  else {
    console.log(`\nAudit of ${COURSE} study guide  (${((Date.now() - t0) / 1000).toFixed(1)}s${QUICK ? ', quick' : ''})`);
    console.log(`  ${stats.lessons} lessons · ${stats.topics} topic sections · ${stats.questions} questions · ${stats.units} Mastery units · ${stats.items} Mastery items`);
    if (!QUICK) console.log(`  answered correctly ${stats.answeredOk} · wrong answers rejected ${stats.rejectedOk} · restored from saved progress ${stats.restored}`);
    const groups = {};
    problems.forEach(p => { (groups[p.area] = groups[p.area] || []).push(p); });
    Object.keys(groups).forEach(a => {
      console.log(`\n[${a}]`);
      groups[a].slice(0, 60).forEach(p => console.log(`  ${p.level === 'ERROR' ? '✗' : '!'} ${p.where}: ${p.msg}`));
      if (groups[a].length > 60) console.log(`  … and ${groups[a].length - 60} more`);
    });
    console.log(errs.length ? `\nFAILED: ${errs.length} error(s), ${warns.length} warning(s)` : `\nOK (${warns.length} warning(s))`);
  }
  process.exit(errs.length ? 1 : 0);
})();
