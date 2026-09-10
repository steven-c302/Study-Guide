/* ============================================================
   SHARED STUDY GUIDE ENGINE
   Loads LAST (after every lesson module) so it can wire up
   questions injected by each lesson (each module writes into
   its own .lesson div). Used by any course guide that follows
   the retry-until-correct question pattern — currently COMP211,
   COMP227, and INLS382. (COMP210 predates this engine and has
   its own, with a different single-shot grading UX — not
   consolidated here.)

   Grading policy:
     - A WRONG answer never reveals the correct one. The chosen
       option is marked wrong, the rest stay live, and you try
       again. The explanation is withheld until you get it right
       (or explicitly ask for it).
     - Every question gets "Try again" and "Reveal answer".
     - Progress counts a question once it is answered correctly
       (revealing marks it seen but not correct).
   ============================================================ */

/* ================= LESSON / TOPIC NAV ================= */
function showLesson(id, btn) {
  document.querySelectorAll('.lesson').forEach(l => l.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  document.querySelectorAll('.lesson-bar button[data-l]').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showTopic(btn, sectionId) {
  const lesson = btn.closest('.lesson');
  lesson.querySelectorAll('.topic').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  btn.closest('nav').querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ================= PROGRESS ================= */
let answered = new Set();
function markAnswered(el) { answered.add(el); updateProgress(); }
function unmarkAnswered(el) { answered.delete(el); updateProgress(); }
function updateProgress() {
  const total = document.querySelectorAll('.q').length
    + document.querySelectorAll('table.match').length;
  const pct = total ? Math.min(100, Math.round(answered.size / total * 100)) : 0;
  const bar = document.getElementById('pbar');
  const txt = document.getElementById('ptxt');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = answered.size + ' of ' + total + ' answered correctly';
}

/* ================= FEEDBACK HELPERS ================= */
/* Every .fb starts out holding the explanation. We stash it and
   only put it back on the screen once the answer is right. */
function fbInit(fb) {
  if (fb && fb._explain === undefined) { fb._explain = fb.innerHTML; fb.innerHTML = ''; }
}
function fbOk(fb, lead) {
  if (!fb) return;
  fbInit(fb);
  fb.className = 'fb show ok';
  fb.innerHTML = (lead || '&#10003; Correct. ') + fb._explain;
}
function fbNo(fb, msg) {
  if (!fb) return;
  fbInit(fb);
  fb.className = 'fb show no';
  fb.innerHTML = '&#10007; ' + (msg || 'Not quite &mdash; try again.');
}
function fbHide(fb) {
  if (!fb) return;
  fbInit(fb);
  fb.className = 'fb';
  fb.innerHTML = '';
}
function fbReveal(fb) {
  if (!fb) return;
  fbInit(fb);
  fb.className = 'fb show revealed';
  /* don't stack "Answer:" on top of an explanation that already opens with one */
  const lead = /^\s*(<b>)?\s*Answers?\b/i.test(fb._explain) ? '' : '<b>Answer:</b> ';
  fb.innerHTML = lead + fb._explain;
}

/* ================= T/F + MULTIPLE CHOICE ================= */
document.querySelectorAll('.q').forEach(q => {
  if (q.dataset.tf === undefined && q.dataset.mc === undefined) return;
  fbInit(q.querySelector('.fb'));
  wireChoices(q);
});

/* ================= FILL IN THE BLANK ================= */
function gradeInput(inp) {
  /* '~~~' separates multiple ACCEPTED alternative answers. It is NOT '|',
     because some correct answers contain a literal pipe character (a shell
     pipe like "cat f | ./prog", or math notation like "O(|V| + |E|)") and
     splitting on '|' would truncate them. */
  const alts = inp.dataset.answer.toLowerCase().split('~~~').map(s => s.trim().replace(/\s+/g, ' '));
  const val = inp.value.trim().toLowerCase().replace(/\s+/g, ' ');
  const ok = alts.indexOf(val) !== -1;
  inp.style.borderColor = val === '' ? 'var(--line)' : (ok ? 'var(--green)' : 'var(--red)');
  return ok;
}
function checkFill(btn) {
  const scope = btn.closest('.q') || btn.closest('.card');
  const ok = gradeInput(scope.querySelector('.fillblank'));
  fillResult(scope, ok, 1);
}
function checkFillGroup(btn) {
  const scope = btn.closest('.q') || btn.closest('.card');
  const inps = scope.querySelectorAll('.fillblank');
  let n = 0;
  inps.forEach(i => { if (gradeInput(i)) n++; });
  fillResult(scope, n === inps.length, inps.length, n);
}
function fillResult(scope, ok, total, n) {
  const fb = scope.querySelector('.fb');
  if (ok) { scope.dataset.done = 1; markAnswered(scope); fbOk(fb); }
  else {
    fbNo(fb, total > 1
      ? (n || 0) + ' of ' + total + ' correct so far &mdash; the green blanks are right, fix the red ones.'
      : 'Not quite &mdash; check that blank and try again.');
  }
  qShowControls(scope);
}

/* ================= REVEAL (code-writing solutions) ================= */
function toggleReveal(btn) {
  const r = btn.closest('.card').querySelector('.reveal');
  r.classList.toggle('show');
  btn.textContent = r.classList.contains('show') ? 'Hide solution' : 'Show solution';
}

/* ================= MATCHING ================= */
function checkMatch(tableId, fbId, key) {
  const rows = document.querySelectorAll('#' + tableId + ' .match-def');
  const fb = document.getElementById(fbId);
  let n = 0, filled = 0;
  rows.forEach((sel, i) => {
    if (sel.value) filled++;
    const ok = sel.value === key[i];
    if (ok) n++;
    /* only confirm the ones that are right; wrong rows are just cleared,
       so a wrong guess never marks the answer for you */
    sel.style.borderColor = !sel.value ? 'var(--line)' : (ok ? 'var(--green)' : 'var(--red)');
  });
  if (n === rows.length) { answered.add(tableId); updateProgress(); fbOk(fb, '&#10003; All correct. '); }
  else fbNo(fb, n + ' of ' + rows.length + ' correct. Green rows are right &mdash; change the red ones and check again.');
  matchShowControls(tableId, fbId, key);
}

/* ================= MULTIPLE-ANSWER (checkbox) ================= */
function checkMulti(btn) {
  const q = btn.closest('.q');
  const want = q.dataset.multi.split(',').map(s => s.trim());
  const items = q.querySelectorAll('.ma-item');
  let wrong = 0;
  items.forEach(item => {
    const box = item.querySelector('input');
    const should = want.indexOf(box.dataset.i) !== -1;
    if (box.checked !== should) wrong++;
    item.style.borderColor = 'var(--line)';   /* reveal nothing */
  });
  if (!wrong) {
    q.dataset.done = 1;
    items.forEach(i => { i.style.borderColor = 'var(--green)'; });
    markAnswered(q);
    fbOk(q.querySelector('.fb'));
  } else {
    fbNo(q.querySelector('.fb'), wrong + ' of ' + items.length +
      ' boxes ' + (wrong === 1 ? 'is' : 'are') + ' wrong (ticked when it should not be, or the reverse). Adjust and check again.');
  }
  qShowControls(q);
}

/* ================= PER-QUESTION CONTROLS ================= */
/* Injected by the engine, so lesson modules need no changes. */
function qControls(scope) {
  let bar = scope.querySelector(':scope > .q-ctrl');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'q-ctrl';
    bar.innerHTML =
      '<button class="btn small ghost" onclick="qRetry(this)">&#8635; Try again</button>' +
      '<button class="btn small ghost" onclick="qGiveUp(this)">Reveal answer</button>';
    scope.appendChild(bar);
  }
  return bar;
}
function qShowControls(scope) { qControls(scope).classList.add('show'); }

function qRetry(btn) {
  const scope = btn.closest('.q') || btn.closest('.card');
  delete scope.dataset.done;
  scope._tries = 0;
  unmarkAnswered(scope);

  scope.querySelectorAll('.opt').forEach(o => {
    o.classList.remove('correct', 'wrong', 'disabled');
  });
  scope.querySelectorAll('.fillblank').forEach(i => { i.value = ''; i.style.borderColor = 'var(--line)'; });
  scope.querySelectorAll('.ma-item').forEach(i => {
    i.style.borderColor = 'var(--line)';
    const b = i.querySelector('input'); if (b) b.checked = false;
  });
  fbHide(scope.querySelector('.fb'));
  qControls(scope).classList.remove('show');
  wireChoices(scope);
}
function qGiveUp(btn) {
  const scope = btn.closest('.q') || btn.closest('.card');
  scope.dataset.done = 1;
  const tf = scope.dataset.tf, mc = scope.dataset.mc, multi = scope.dataset.multi;
  if (tf !== undefined || mc !== undefined) {
    scope.querySelectorAll('.opt').forEach(o => {
      const isRight = (tf !== undefined) ? o.dataset.v === tf : parseInt(o.dataset.i) === parseInt(mc);
      if (isRight) o.classList.add('correct');
      o.classList.add('disabled');
      o.onclick = null;
    });
  } else if (multi !== undefined) {
    const want = multi.split(',').map(s => s.trim());
    scope.querySelectorAll('.ma-item').forEach(i => {
      const b = i.querySelector('input');
      b.checked = want.indexOf(b.dataset.i) !== -1;
      i.style.borderColor = b.checked ? 'var(--green)' : 'var(--line)';
    });
  } else {
    const answers = [];
    scope.querySelectorAll('.fillblank').forEach(i => {
      const first = i.dataset.answer.split('~~~')[0];
      i.value = first;
      i.style.borderColor = 'var(--amber)';
      answers.push(first);
    });
    /* Make the literal correct answer visible in the explanation text too —
       the input box alone can be too narrow/easy to miss, especially for
       long piped/redirected commands. */
    const fb = scope.querySelector('.fb');
    if (fb && answers.length) {
      fbInit(fb);
      const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const code = answers.map(a => '<code>' + esc(a) + '</code>').join(', ');
      fb._explain = code + (fb._explain ? ' &mdash; ' + fb._explain : '');
    }
  }
  fbReveal(scope.querySelector('.fb'));
  qShowControls(scope);
}

/* (re)attach click handlers — used on load and after every retry */
function wireChoices(q) {
  const tf = q.dataset.tf, mc = q.dataset.mc;
  if (tf === undefined && mc === undefined) return;
  q.querySelectorAll('.opt').forEach(opt => {
    opt.onclick = () => {
      if (q.dataset.done) return;
      const correct = (tf !== undefined) ? opt.dataset.v === tf : parseInt(opt.dataset.i) === parseInt(mc);
      if (correct) {
        q.dataset.done = 1;
        opt.classList.add('correct');
        q.querySelectorAll('.opt').forEach(o => o.classList.add('disabled'));
        markAnswered(q);
        const tries = (q._tries || 0) + 1;
        fbOk(q.querySelector('.fb'), tries > 1 ? '&#10003; Correct, on attempt ' + tries + '. ' : '&#10003; Correct. ');
      } else {
        q._tries = (q._tries || 0) + 1;
        opt.classList.add('wrong', 'disabled');
        opt.onclick = null;
        const left = q.querySelectorAll('.opt:not(.wrong)').length;
        fbNo(q.querySelector('.fb'), left > 1
          ? 'Not that one. ' + left + ' options left &mdash; try again.'
          : 'Not that one. One option left.');
      }
      qShowControls(q);
    };
  });
}

/* ---- matching gets its own controls, since its fb lives outside a .q ---- */
function matchShowControls(tableId, fbId, key) {
  const fb = document.getElementById(fbId);
  let bar = fb.parentNode.querySelector('.q-ctrl[data-for="' + tableId + '"]');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'q-ctrl';
    bar.setAttribute('data-for', tableId);
    bar.innerHTML =
      '<button class="btn small ghost" onclick="matchRetry(\'' + tableId + '\',\'' + fbId + '\')">&#8635; Try again</button>' +
      '<button class="btn small ghost" onclick="matchGiveUp(\'' + tableId + '\',\'' + fbId + '\')">Reveal answer</button>';
    fb.parentNode.insertBefore(bar, fb.nextSibling);
    bar._key = key;
  }
  bar._key = key;
  bar.classList.add('show');
}
function matchRetry(tableId, fbId) {
  document.querySelectorAll('#' + tableId + ' .match-def').forEach(s => {
    s.value = ''; s.style.borderColor = 'var(--line)';
  });
  answered.delete(tableId); updateProgress();
  fbHide(document.getElementById(fbId));
  const bar = document.querySelector('.q-ctrl[data-for="' + tableId + '"]');
  if (bar) bar.classList.remove('show');
}
function matchGiveUp(tableId, fbId) {
  const bar = document.querySelector('.q-ctrl[data-for="' + tableId + '"]');
  const key = bar && bar._key;
  if (key) {
    document.querySelectorAll('#' + tableId + ' .match-def').forEach((s, i) => {
      s.value = key[i]; s.style.borderColor = 'var(--amber)';
    });
  }
  const fb = document.getElementById(fbId);
  fbInit(fb);
  fb.className = 'fb show revealed';
  fb.innerHTML = '<b>Answer:</b> the correct pairing is filled in above. Hit <b>Try again</b> to clear it and test yourself.';
}

/* ================= PROGRESS PERSISTENCE (localStorage) ================= */
/* Namespaced per course so multiple guides don't collide. window.GUIDE_COURSE
   is set by each course's guide/index.html before this script loads; falls
   back to the page path if a course forgot to set it. */
function progressKey() {
  return 'guide-progress:' + (window.GUIDE_COURSE || location.pathname);
}
function answeredId(el) {
  /* Prefer a stable id already on the element/table; fall back to a
     position-based key (topic id + index among siblings of the same kind)
     so items without a hand-authored id still persist sensibly. */
  if (el.id) return el.id;
  if (typeof el === 'string') return el; /* matching tableId is already a string */
  const scope = el.closest ? el.closest('.topic') : null;
  const within = scope ? Array.from(scope.querySelectorAll('.q, .card')) : [];
  const idx = within.indexOf(el);
  return (scope ? scope.id : 'root') + ':' + (idx === -1 ? 'x' : idx);
}
function saveProgress() {
  try {
    const ids = [];
    answered.forEach(el => ids.push(answeredId(el)));
    localStorage.setItem(progressKey(), JSON.stringify(ids));
  } catch (e) { /* private browsing / storage disabled — just skip persistence */ }
}
function loadProgress() {
  try {
    const raw = localStorage.getItem(progressKey());
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}
function restoreProgress() {
  const saved = new Set(loadProgress());
  if (!saved.size) return;
  document.querySelectorAll('.q, .card').forEach(el => {
    if (!saved.has(answeredId(el))) return;
    if (el.querySelector('.fillblank, .ma-item, [data-tf], [data-mc]') || el.dataset.tf !== undefined || el.dataset.mc !== undefined) {
      el.dataset.done = 1;
      answered.add(el);
      const fb = el.querySelector('.fb');
      if (fb) fbOk(fb);
      qShowControls(el);
      el.querySelectorAll('.opt').forEach(o => o.classList.add('disabled'));
    }
  });
  document.querySelectorAll('table.match').forEach(t => {
    if (saved.has(t.id)) { answered.add(t.id); }
  });
  updateProgress();
}

/* wrap the mark/unmark hooks so every progress change also persists */
const _markAnswered = markAnswered, _unmarkAnswered = unmarkAnswered;
markAnswered = function (el) { _markAnswered(el); saveProgress(); };
unmarkAnswered = function (el) { _unmarkAnswered(el); saveProgress(); };
const _checkMatch = checkMatch;
checkMatch = function (tableId, fbId, key) { _checkMatch(tableId, fbId, key); saveProgress(); };
const _matchRetry = matchRetry;
matchRetry = function (tableId, fbId) { _matchRetry(tableId, fbId); saveProgress(); };

/* ================= INIT ================= */
['initL0', 'initL1', 'initL2', 'initL3', 'initL4', 'initL5', 'initL6', 'initL7', 'initL8', 'initL9', 'initL10']
  .forEach(function (fn) { if (typeof window[fn] === 'function') window[fn](); });

/* stash every explanation up front so nothing leaks before it is earned */
document.querySelectorAll('.q .fb, .card > .fb').forEach(fbInit);

restoreProgress();
updateProgress();
