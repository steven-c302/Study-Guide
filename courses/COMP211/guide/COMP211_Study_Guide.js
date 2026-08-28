/* ============================================================
   COMP211 STUDY GUIDE — SHARED ENGINE
   Loads LAST so it can wire up questions injected by every
   lesson module (each module writes into its own .lesson div).
   Provides: showLesson, showTopic, checkFill, checkFillGroup,
   checkMatch, toggleReveal, gradeInput, checkMulti, progress.
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
function updateProgress() {
  const total = document.querySelectorAll('.q').length
    + document.querySelectorAll('table.match').length;
  const pct = total ? Math.min(100, Math.round(answered.size / total * 100)) : 0;
  const bar = document.getElementById('pbar');
  const txt = document.getElementById('ptxt');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = answered.size + ' of ' + total + ' items answered';
}

/* ================= T/F + MULTIPLE CHOICE ================= */
document.querySelectorAll('.q').forEach(q => {
  const tf = q.dataset.tf, mc = q.dataset.mc;
  const handle = (opt, correct) => {
    if (q.dataset.done) return;
    q.dataset.done = 1; markAnswered(q);
    q.querySelectorAll('.opt').forEach(o => o.classList.add('disabled'));
    const fb = q.querySelector('.fb');
    if (fb) { fb.classList.add('show', correct ? 'ok' : 'no'); fb.innerHTML = (correct ? '&#10003; Correct. ' : '&#10007; Not quite. ') + fb.innerHTML; }
  };
  if (tf !== undefined) {
    q.querySelectorAll('.opt').forEach(opt => opt.onclick = () => {
      const correct = opt.dataset.v === tf;
      q.querySelectorAll('.opt').forEach(o => { if (o.dataset.v === tf) o.classList.add('correct'); });
      if (!correct) opt.classList.add('wrong');
      handle(opt, correct);
    });
  }
  if (mc !== undefined) {
    const ci = parseInt(mc);
    q.querySelectorAll('.opt').forEach(opt => opt.onclick = () => {
      const correct = parseInt(opt.dataset.i) === ci;
      q.querySelectorAll('.opt').forEach(o => { if (parseInt(o.dataset.i) === ci) o.classList.add('correct'); });
      if (!correct) opt.classList.add('wrong');
      handle(opt, correct);
    });
  }
});

/* ================= FILL IN THE BLANK ================= */
function gradeInput(inp) {
  const alts = inp.dataset.answer.toLowerCase().split('|').map(s => s.trim().replace(/\s+/g, ' '));
  const val = inp.value.trim().toLowerCase().replace(/\s+/g, ' ');
  const ok = alts.indexOf(val) !== -1;
  inp.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
  return ok;
}
function checkFill(btn) {
  const scope = btn.closest('.q') || btn.closest('.card');
  const inp = scope.querySelector('.fillblank');
  const ok = gradeInput(inp);
  markFillFB(scope.querySelector('.fb'), ok, scope);
}
function checkFillGroup(btn) {
  const scope = btn.closest('.q') || btn.closest('.card');
  const inps = scope.querySelectorAll('.fillblank');
  let all = true; inps.forEach(i => { if (!gradeInput(i)) all = false; });
  markFillFB(scope.querySelector('.fb'), all, scope);
}
function markFillFB(fb, ok, scope) {
  if (scope) markAnswered(scope);
  if (!fb) return;
  fb.className = 'fb show ' + (ok ? 'ok' : 'no');
  fb.innerHTML = (ok ? '&#10003; Correct. ' : '&#10007; Check the highlighted blank(s). ')
    + fb.innerHTML.replace(/^(&#10003; Correct\. |&#10007; Check the highlighted blank\(s\)\. |✓ Correct\. |✗ Check the highlighted blank\(s\)\. )/, '');
}

/* ================= REVEAL ================= */
function toggleReveal(btn) {
  const r = btn.closest('.card').querySelector('.reveal');
  r.classList.toggle('show');
  btn.textContent = r.classList.contains('show') ? 'Hide solution' : 'Show solution';
}

/* ================= MATCHING ================= */
function checkMatch(tableId, fbId, key) {
  const rows = document.querySelectorAll('#' + tableId + ' .match-def');
  let all = true, any = false;
  rows.forEach((sel, i) => {
    if (sel.value) any = true;
    const ok = sel.value === key[i];
    sel.style.borderColor = sel.value ? (ok ? 'var(--green)' : 'var(--red)') : 'var(--line)';
    if (!ok) all = false;
  });
  const fb = document.getElementById(fbId);
  if (any) { answered.add(tableId); updateProgress(); }
  fb.className = 'fb show ' + (all ? 'ok' : 'no');
  fb.innerHTML = all ? '&#10003; All correct!' : '&#10007; Green = correct, red = fix these and check again.';
}

/* ================= MULTIPLE-ANSWER (checkbox) ================= */
/* Usage: <div class="q" data-multi="0,2"> with .ma-item inputs carrying data-i */
function checkMulti(btn) {
  const q = btn.closest('.q');
  const want = q.dataset.multi.split(',').map(s => s.trim());
  let all = true;
  q.querySelectorAll('.ma-item').forEach(item => {
    const box = item.querySelector('input');
    const should = want.indexOf(box.dataset.i) !== -1;
    item.style.borderColor = (box.checked === should) ? 'var(--green)' : 'var(--red)';
    if (box.checked !== should) all = false;
  });
  markAnswered(q);
  const fb = q.querySelector('.fb');
  fb.className = 'fb show ' + (all ? 'ok' : 'no');
  fb.innerHTML = (all ? '&#10003; Correct. ' : '&#10007; Not quite. ')
    + fb.innerHTML.replace(/^(&#10003; Correct\. |&#10007; Not quite\. )/, '');
}

/* ================= INIT ================= */
if (typeof initR01 === 'function') initR01();
if (typeof initR02 === 'function') initR02();
updateProgress();
