/* ============================================================
   COMP 227 STUDY GUIDE — SHARED ENGINE
   Loads LAST so it can wire up questions injected by every
   lesson module (each module writes into its own .lesson div).

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
  const alts = inp.dataset.answer.toLowerCase().split('|').map(s => s.trim().replace(/\s+/g, ' '));
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
    scope.querySelectorAll('.fillblank').forEach(i => {
      i.value = i.dataset.answer.split('|')[0];
      i.style.borderColor = 'var(--amber)';
    });
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

/* ================= INIT ================= */
['initL0', 'initL1', 'initL2', 'initL3', 'initL4', 'initL5', 'initL6', 'initL7', 'initL8']
  .forEach(function (fn) { if (typeof window[fn] === 'function') window[fn](); });

/* stash every explanation up front so nothing leaks before it is earned */
document.querySelectorAll('.q .fb, .card > .fb').forEach(fbInit);

updateProgress();
