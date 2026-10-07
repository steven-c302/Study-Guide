#!/usr/bin/env node
/* ============================================================
   validate-mastery.mjs — checks every Mastery unit file BEFORE you ship.

     node tools/validate-mastery.mjs [COURSE]            (default COMP211)
     node tools/validate-mastery.mjs COMP211 --no-c      (skip compiling C)

   1. SCHEMA: required fields per item type, answer indexes in range,
      fill-blank tokens match blanks, rubric/pass sanity, duplicate prompts.
   2. VERIFIED ANSWERS (this is the point): an item may carry
        verify: { src: "<full C program>", expect: ["line", ...] }
          -> compiled with the system C compiler and run; each stdout line
             must equal expect[i], AND expect must equal the item's own
             answers (first alternative). So a wrong answer key fails here.
        verify: { js: "<expression returning an array of strings>" }
          -> evaluated here (helpers: bin(n,w) hex(n) s8(n) u8(n) wrap(n,bits,signed))
             and compared with the item's answers.
        verify: { sh: "<bash script>", expect?: ["line", ...] }
          -> run with bash in a fresh temp directory (LC_ALL=C); stdout lines
             must equal the item's answers (and expect, if given).
   Exit code is non-zero if anything fails, so it can gate a commit.
   ============================================================ */
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const course = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'COMP211';
const SKIP_C = process.argv.includes('--no-c');
const dir = join(ROOT, 'courses', course, 'mastery');
if (!existsSync(dir)) { console.error('No mastery folder:', dir); process.exit(2); }

/* ---- load the engine core + unit files in a stubbed browser ---- */
const noop = () => {};
const stubEl = () => ({ className: '', style: {}, classList: { add: noop, remove: noop, toggle: noop }, appendChild: noop, setAttribute: noop, addEventListener: noop });
const sandbox = {
  console, setTimeout, clearTimeout,
  document: { createElement: stubEl, addEventListener: noop, querySelector: () => null, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  location: { pathname: '/', hostname: 'localhost', protocol: 'http:' },
  fetch: async () => ({ ok: false, json: async () => ({}) }),
};
sandbox.window = sandbox;
vm.createContext(sandbox);
const run = (file) => vm.runInContext(readFileSync(file, 'utf8'), sandbox, { filename: file });
run(join(ROOT, 'shared', 'mastery.js'));
/* unit files first, then *checkpoint* files (they attach to an already-registered unit) */
const files = readdirSync(dir).filter(f => /^u\d+.*\.js$/.test(f)).sort((a, b) => (/checkpoint/.test(a) - /checkpoint/.test(b)) || a.localeCompare(b));
if (existsSync(join(dir, 'config.js'))) run(join(dir, 'config.js'));
for (const f of files) run(join(dir, f));
const M = sandbox.Mastery;

/* ---- helpers for verify.js ---- */
const helpers = {
  bin: (n, w) => (n >>> 0).toString(2).padStart(w, '0').slice(-w),
  hex: n => (n >>> 0).toString(16).toUpperCase(),
  s8: n => ((n + 128) & 255) - 128,
  u8: n => n & 255,
  wrap: (n, bits, signed) => { const m = 2 ** bits; let v = ((n % m) + m) % m; return signed && v >= m / 2 ? v - m : v; },
};

let errors = 0, warns = 0;
const err = (id, msg) => { errors++; console.error('  ✗ ' + id + ': ' + msg); };
const warn = (id, msg) => { warns++; console.warn('  ! ' + id + ': ' + msg); };

function checkHtml(id, field, s) {
  if (typeof s !== 'string') return;
  const stack = [], re = /<(\/?)(b|i|code|pre|ul|ol|li|table|tr|td|th|span|em|u)\b[^>]*>/gi;
  let m;
  while ((m = re.exec(s))) {
    if (!m[1]) stack.push(m[2].toLowerCase());
    else if (stack.pop() !== m[2].toLowerCase()) { err(id, `unbalanced <${m[2]}> in ${field}`); return; }
  }
  if (stack.length) err(id, `unclosed <${stack.pop()}> in ${field}`);
}
const firstAlt = a => String(a).split('~~~')[0];
const plain = t => String(t).replace(/<[^>]+>/g, '').replace(/\u2212/g, '-').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
/* what a verify.js result is compared against: blank answers, or the text of the correct option(s) */
const answersOf = it => it.type === 'mc' ? [plain(it.options[it.answer].t)]
  : it.type === 'multi' ? it.answers.map(i => plain(it.options[i].t))
  : (it.blanks || []).filter(b => !b.given).map(b => firstAlt(b.answer));

const seenPrompt = new Map();
let nItems = 0, nVerified = 0;
const counts = {};

for (const u of M.units) {
  console.log(`\n${u.id} · ${u.title}`);
  const tCount = u.tiers.map(t => t.items.length);
  console.log(`  tiers: ${tCount.join(' / ')}   items: ${u.items.length}   cards: ${u.cards.length}`);
  if (!u.cards.length) warn(u.id, 'no recall cards');
  if (!(u.learn.big || []).length) warn(u.id, 'no "big ideas" in learn');
  const ids = new Set();
  u.checkpoint.filter(i => i.type === 'free' || i.type === 'explain').forEach(i => err(u.id + ':cp', 'checkpoint items must be auto-gradable (no free/explain): ' + i.topic));
  if (u.checkpoint.length) console.log(`  checkpoint: ${u.checkpoint.length} questions in ${new Set(u.checkpoint.map(i => i.topic)).size} topics`);
  u.items.concat(u.checkpoint).forEach(it => {
    nItems++; counts[it.type] = (counts[it.type] || 0) + 1;
    const id = `${it.id} [${it.type}${it.topic ? ' · ' + it.topic : ''}] "${plain(it.prompt).replace(/\s+/g, ' ').slice(0, 72)}"`;
    if (ids.has(it.id)) err(id, 'duplicate item id (same prompt/code twice?)'); ids.add(it.id);
    const key = (it.prompt + (it.code || '')).trim();
    if (seenPrompt.has(key)) err(id, 'identical to ' + seenPrompt.get(key)); seenPrompt.set(key, it.id);
    if (!it.prompt) err(id, 'missing prompt');
    if (!it.topic) warn(id, 'missing topic (weak-spot tracking needs it)');
    checkHtml(id, 'prompt', it.prompt); checkHtml(id, 'why', it.why);
    if (it.type !== 'free' && it.type !== 'explain' && !it.why) warn(id, 'missing why (explanation shown after answering)');
    switch (it.type) {
      case 'mc':
        if (!Array.isArray(it.options) || it.options.length < 2) err(id, 'needs >= 2 options');
        else {
          if (!Number.isInteger(it.answer) || it.answer < 0 || it.answer >= it.options.length) err(id, 'answer index out of range');
          it.options.forEach((o, i) => { checkHtml(id, 'option ' + i, o.t); if (i !== it.answer && !o.why) warn(id, `wrong option ${i} has no "why" (misconception feedback)`); });
          if (new Set(it.options.map(o => o.t)).size !== it.options.length) err(id, 'duplicate options');
        }
        break;
      case 'multi':
        if (!Array.isArray(it.answers) || !it.answers.length || it.answers.some(a => a < 0 || a >= it.options.length)) err(id, 'bad answers[]');
        break;
      case 'trace': case 'memory': case 'fill':
        if (!Array.isArray(it.blanks) || !it.blanks.length) err(id, 'needs blanks');
        else it.blanks.forEach((b, i) => { if (b.answer == null || b.answer === '') err(id, `blank ${i} has no answer`); });
        if (it.type === 'fill') {
          const toks = [...(it.code || '').matchAll(/__(\d+)__/g)].map(m => +m[1]).sort();
          if (!toks.length) err(id, 'fill needs __0__ style tokens in code');
          if (toks.length !== (it.blanks || []).length || toks.some((t, i) => t !== i)) err(id, 'blank tokens must be __0__.. matching blanks[] one-to-one');
        }
        break;
      case 'bug':
        if (!Array.isArray(it.lines) || it.lines.length < 2) err(id, 'needs lines');
        else if (!(it.bad >= 0 && it.bad < it.lines.length)) err(id, 'bad line index out of range');
        if (!Array.isArray(it.reasons) || it.reasons.length < 2 || !(it.reason >= 0 && it.reason < it.reasons.length)) err(id, 'bad reasons/reason');
        break;
      case 'parsons':
        if (!Array.isArray(it.lines) || it.lines.length < 2) err(id, 'needs >= 2 lines');
        else if (new Set([...it.lines, ...(it.distract || [])]).size !== it.lines.length + (it.distract || []).length) err(id, 'duplicate lines (parsons lines must be unique strings)');
        break;
      case 'free': case 'explain': {
        const pts = it.type === 'free' ? it.rubric : it.keypoints;
        if (!Array.isArray(pts) || pts.length < 2) err(id, 'needs rubric/keypoints');
        else if (!(it.pass >= 1 && it.pass <= pts.length)) err(id, 'pass must be between 1 and number of points');
        if (!it.model) warn(id, 'no model answer');
        break;
      }
      default: err(id, 'unknown type ' + it.type);
    }

    /* ---- verified answers ---- */
    const v = it.verify;
    if (v && v.js) {
      nVerified++;
      try {
        const got = vm.runInNewContext(v.js, { ...helpers }).map(String);
        const want = answersOf(it);
        if (JSON.stringify(got) !== JSON.stringify(want)) err(id, `js verify mismatch: computed ${JSON.stringify(got)} but item says ${JSON.stringify(want)}`);
      } catch (e) { err(id, 'js verify threw: ' + e.message); }
    }
    if (v && v.sh) {
      nVerified++;
      try {
        const tmp = mkdtempSync(join(tmpdir(), 'mv-'));
        let out;
        try { out = execFileSync('bash', ['-c', v.sh], { cwd: tmp, stdio: 'pipe', timeout: 8000, env: { ...process.env, LC_ALL: 'C', PATH: process.env.PATH } }).toString(); }
        catch (e) { out = e.stdout ? e.stdout.toString() : ''; if (!out) throw e; }
        const lines = out.replace(/\r/g, '').replace(/\n$/, '').split('\n').map(l => l.replace(/\s+$/, ''));
        const want = answersOf(it);
        if (v.expect && JSON.stringify(lines) !== JSON.stringify(v.expect.map(l => l.replace(/\s+$/, '')))) err(id, `shell output ${JSON.stringify(lines)} != verify.expect ${JSON.stringify(v.expect)}`);
        if (it.blanks && JSON.stringify(lines) !== JSON.stringify(want)) err(id, `shell output ${JSON.stringify(lines)} != item answers ${JSON.stringify(want)}`);
        if (!v.expect && !it.blanks) warn(id, 'sh verify has no expect[]');
      } catch (e) { err(id, 'sh verify failed: ' + String(e.stderr || e.message).split('\n').slice(0, 2).join(' | ')); }
    }
    if (v && v.src) {
      if (SKIP_C) return;
      nVerified++;
      try {
        const tmp = mkdtempSync(join(tmpdir(), 'mv-'));
        writeFileSync(join(tmp, 'p.c'), v.src);
        execFileSync('cc', ['-std=gnu11', '-w', '-o', join(tmp, 'p'), join(tmp, 'p.c')], { stdio: 'pipe' });
        const out = execFileSync(join(tmp, 'p'), { stdio: 'pipe', timeout: 5000 }).toString().replace(/\r/g, '').replace(/\n$/, '').split('\n');
        const want = answersOf(it);
        if (v.expect && JSON.stringify(out) !== JSON.stringify(v.expect)) err(id, `C output ${JSON.stringify(out)} != verify.expect ${JSON.stringify(v.expect)}`);
        if (!v.expect && !it.blanks) warn(id, 'C verify has no expect[] (only smoke-tested); add expect to pin the answer');
        if (it.blanks && JSON.stringify(out) !== JSON.stringify(want)) err(id, `C output ${JSON.stringify(out)} != item answers ${JSON.stringify(want)}`);
      } catch (e) { err(id, 'C verify failed: ' + String(e.stderr || e.message).split('\n').slice(0, 3).join(' | ')); }
    }
  });
  u.cards.forEach(c => { if (!c.f || !c.b) err(u.id, 'empty card'); checkHtml(u.id + ' card', 'front', c.f); checkHtml(u.id + ' card', 'back', c.b); });
  ((u.learn || {}).examples || []).forEach(ex => { if (ex.item) checkHtml(u.id + ' example', 'prompt', ex.item.prompt); });
}

console.log(`\n${M.units.length} units · ${nItems} items · ${M.units.reduce((a, u) => a + u.cards.length, 0)} cards · ${nVerified} answer keys machine-verified`);
console.log('by type:', Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', '));
console.log(errors ? `\nFAILED: ${errors} error(s), ${warns} warning(s)` : `\nOK (${warns} warning(s))`);
process.exit(errors ? 1 : 0);
