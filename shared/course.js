/* ============================================================
   Shared course-page renderer. Each course.html loads its own
   config.js (defining window.COURSE) then this script.

   Overview is a dashboard: if the course has Mastery data, the guide
   writes a small snapshot to localStorage ("mastery-summary:<COURSE>")
   and this page shows what is due plus per-unit progress, with deep
   links straight into the guide (guide/index.html#mastery:...).
   ============================================================ */
(function () {
  const C = window.COURSE || {};
  const MM = window.MATERIALS || {};                      // added via the in-hub Materials Manager (materials.js)
  C.lectures = (C.lectures || []).concat(MM.lectures || []);
  C.exams = (C.exams || []).concat(MM.exams || []);
  const app = document.getElementById('app');
  const slug = (C.code || '').replace(/\s/g, '');
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const guide = C.guide || '';

  let snap = null;
  try { snap = JSON.parse(localStorage.getItem('mastery-summary:' + slug)); } catch (e) { snap = null; }
  const hasMastery = !!(C.mastery || snap);

  const badge = m => {
    if (m.url && !m.file) return 'LINK';
    const ext = ((m.file || '').split('.').pop() || '').toUpperCase();
    return ext && ext.length <= 5 ? ext : 'FILE';
  };
  const matItem = m => {
    const sub = [m.date, m.note].filter(Boolean).join(' · ');
    let acts = '';
    if (m.file) acts += '<a href="' + m.file + '" target="_blank" rel="noopener">Open</a>';
    if (m.solution) acts += '<a href="' + m.solution + '" target="_blank" rel="noopener">Solution</a>';
    if (m.url) acts = '<a href="' + m.url + '" target="_blank" rel="noopener">Open ↗</a>';
    return '<li class="mat-item"><span class="ic">' + badge(m) + '</span><div class="info"><div class="t">' + esc(m.title || 'Untitled') + '</div>' +
      (sub ? '<div class="s">' + esc(sub) + '</div>' : '') + '</div><div class="act">' + acts + '</div></li>';
  };
  const list = (arr, emptyMsg) => (arr && arr.length) ? '<ul class="mat-list">' + arr.map(matItem).join('') + '</ul>' : '<div class="empty">' + emptyMsg + '</div>';
  const addBtn = kind => '<button class="btn" style="margin:8px 0 14px" onclick="MaterialsManager.add(\'' + kind + '\')">+ Add ' + (kind === 'exams' ? 'exam' : 'lecture') + '</button>';

  const instructor = ((C.requisites || '').match(/Instructor:\s*([^.]+)/) || [])[1] || '';
  const prereq = (C.requisites || '').replace(/\s*Instructor:[^.]*\.?/, '').trim();

  /* ---------- hero ---------- */
  let html = '<div class="topbar"><div class="crumb"><a href="../../index.html">Study Hub</a><span class="sep">/</span>' + esc(C.code) + '</div></div>';
  html += '<div class="course-hero"><div class="code">' + esc(C.code) + '</div><h1>' + esc(C.title) + '</h1>' +
    (C.desc ? '<p class="desc clamp" id="desc">' + esc(C.desc) + '</p><button class="linkish" id="more">Show full description</button>' : '') +
    '<div class="hero-meta"><span class="pill">' + esc(C.term || '') + '</span><span class="pill">' + (C.credits || 3) + ' credits</span>' +
    (instructor ? '<span class="pill">' + esc(instructor.trim()) + '</span>' : '') + '</div></div>';

  /* ---------- primary actions ---------- */
  html += '<div class="actions">';
  if (guide) html += '<a class="big-link" href="' + guide + '">Open study guide</a>';
  if (guide && hasMastery) {
    const due = snap ? (snap.dueCards || 0) + (snap.dueItems || 0) : 0, nw = snap ? (snap.newCards || 0) : 0;
    html += '<a class="ghost-link" href="' + guide + '#mastery:session">Start today’s session' + (due ? ' (' + due + ' due)' : nw ? ' (' + nw + ' new)' : '') + '</a>';
    html += '<a class="ghost-link" href="' + guide + '#mastery">Mastery dashboard</a>';
  }
  html += '<a class="ghost-link" data-jump="lectures">Lectures (' + C.lectures.length + ')</a></div>';

  /* ---------- tabs ---------- */
  html += '<div class="tabs" id="tabs"><button data-t="overview" class="active">Overview</button><button data-t="guide">Study Guide</button>' +
    '<button data-t="lectures">Lectures</button><button data-t="exams">Past Exams</button><button data-t="notes">Notes &amp; Resources</button></div>';

  /* ---------- overview dashboard ---------- */
  let left = '', right = '';
  if (snap && snap.units && snap.units.length) {
    let m = 0, n = 0; snap.units.forEach(u => { m += u.m; n += u.n; });
    const pct = n ? Math.round(m / n * 100) : 0;
    left += '<div class="card"><h2>Your progress</h2>' +
      '<div class="statrow"><div class="stat"><b>' + ((snap.dueCards || 0) + (snap.dueItems || 0)) + '</b><span>due to review</span></div>' +
      '<div class="stat"><b>' + (snap.newCards || 0) + '</b><span>new cards</span></div>' +
      '<div class="stat"><b>' + (snap.studied14 || 0) + '/14</b><span>days studied</span></div>' +
      '<div class="stat"><b>' + pct + '%</b><span>questions mastered</span></div></div>' +
      '<div class="units">' + snap.units.map(u =>
        '<a class="unit-row" href="' + guide + '#mastery:learn:' + u.id + '"><div><div class="u-t">' + esc(u.title) + '</div><div class="u-s">' +
        u.m + ' / ' + u.n + ' mastered' + (u.due ? ' · ' + u.due + ' due' : '') +
        (u.cp ? ' · checkpoint ' + (u.cp.best == null ? 'not taken' : u.cp.best + '/' + u.cp.n) : '') + '</div></div>' +
        '<div class="bar" style="--accent-c:' + (C.color || 'var(--ink)') + '"><i style="width:' + u.pct + '%"></i></div><div class="u-n">' + u.pct + '%</div></a>').join('') +
      '</div><p class="muted" style="font-size:12.5px;margin:12px 0 0">Updated ' + new Date(snap.t).toLocaleString() + ' from the study guide on this device.</p></div>';
  } else if (guide) {
    left += '<div class="card"><h2>Get started</h2><p>The study guide has lesson-by-lesson tabs plus a Mastery section with a daily session, difficulty ladders, recall cards and exam simulations. ' +
      'Open it once and your progress will show up here.</p><a class="big-link" href="' + guide + (hasMastery ? '#mastery' : '') + '">Open the study guide</a></div>';
  }
  left += '<div class="card"><h2>About this course</h2><p>' + esc(C.desc || '') + '</p>' + (prereq ? '<p class="muted" style="font-size:13.5px">' + esc(prereq) + '</p>' : '') + '</div>';

  const dates = (snap && snap.milestones && snap.milestones.length ? snap.milestones : (C.keyDates || []));
  if (dates.length) {
    right += '<div class="card"><h2>Key dates</h2>' + dates.map(d => {
      const days = Math.ceil((new Date(d.date + 'T12:00:00').getTime() - Date.now()) / 864e5);
      return '<div class="kv"><span>' + esc(d.label) + '</span><span>' + (days >= 0 ? days + ' days' : 'passed') + '</span></div>';
    }).join('') + '</div>';
  }
  const recent = C.lectures.slice(-4).reverse();
  right += '<div class="card"><h2>Library</h2>' + (recent.length ? '<ul class="mat-list">' + recent.map(matItem).join('') + '</ul>' : '<div class="empty">No lectures yet.</div>') +
    '<p style="margin:10px 0 0"><a class="linkish" data-jump="lectures" href="#">All lectures (' + C.lectures.length + ')</a> · <a class="linkish" data-jump="exams" href="#">Past exams (' + C.exams.length + ')</a></p></div>';

  html += '<div class="tab-panel active" id="p-overview"><div class="dash"><div>' + left + '</div><div>' + right + '</div></div></div>';

  /* ---------- study guide tab ---------- */
  html += '<div class="tab-panel" id="p-guide">';
  if (guide) {
    html += '<div class="card"><h2>Lesson-by-lesson guide</h2><p>Every lecture and reading worked through with concept cards, active-recall questions and interactive labs.</p><a class="big-link" href="' + guide + '">Open the study guide</a></div>';
    if (hasMastery) html += '<div class="card"><h2>Mastery</h2><p>Practice built for exams: a daily spaced-review session, a five-tier difficulty ladder per unit, recall cards, homework-style checkpoints, timed exam simulations and an AI tutor.</p>' +
      '<div class="actions" style="margin:0"><a class="big-link" href="' + guide + '#mastery">Open Mastery</a><a class="ghost-link" href="' + guide + '#mastery:session">Start today’s session</a></div></div>';
  } else {
    html += '<div class="card"><h2>Interactive Study Guide</h2><p class="muted">' + esc(C.guideNote || 'No study guide yet.') + '</p></div>';
  }
  html += '</div>';

  /* ---------- lectures / exams / notes ---------- */
  html += '<div class="tab-panel" id="p-lectures"><div class="card"><h2>Lecture library</h2><p class="muted" style="font-size:13.5px">Slides, reading notes and recordings. Saved text copies are searchable by the Ask feature.</p>' + addBtn('lectures') + list(C.lectures, 'No lectures added yet.') + '</div></div>';
  html += '<div class="tab-panel" id="p-exams"><div class="card"><h2>Past exams &amp; quizzes</h2><p class="muted" style="font-size:13.5px">Exams, quizzes, and their solutions.</p>' + addBtn('exams') + list(C.exams, 'No past exams added yet.') + '</div></div>';
  html += '<div class="tab-panel" id="p-notes"><div class="card"><h2>Notes &amp; resources</h2>';
  if (C.notes && C.notes.length) html += C.notes.map(n => '<div class="note-box"><h4>' + (n.title || '') + '</h4><div>' + (n.body || '') + '</div></div>').join('');
  if (C.noteFiles && C.noteFiles.length) html += list(C.noteFiles, '');
  if (C.resources && C.resources.length) html += '<h3>Links</h3>' + list(C.resources, '');
  if (!(C.notes && C.notes.length) && !(C.noteFiles && C.noteFiles.length) && !(C.resources && C.resources.length)) html += '<div class="empty">No notes or resources yet. Add them in <code>config.js</code>.</div>';
  html += '</div></div>';
  html += '<div class="footer">Files live in this course\'s folder. Edit <code>config.js</code> or <code>materials.js</code> to add materials; keep graded work in <code>materials/private/</code>.</div>';

  app.innerHTML = html;
  app.style.setProperty('--accent-c', C.color || 'var(--ink)');
  document.title = (C.code ? C.code + ' · ' : '') + (C.title || 'Course');

  /* ---------- behavior ---------- */
  function show(t) {
    document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.t === t));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'p-' + t));
    window.scrollTo(0, 0);
  }
  document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => show(b.dataset.t));
  document.querySelectorAll('[data-jump]').forEach(a => a.onclick = e => { e.preventDefault(); show(a.dataset.jump); });
  const more = document.getElementById('more');
  if (more) more.onclick = () => { const d = document.getElementById('desc'); const open = d.classList.toggle('clamp'); more.textContent = open ? 'Show full description' : 'Show less'; };
})();
