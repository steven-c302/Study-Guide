/* ============================================================
   Shared "Ask" panel — RAG Q&A over the current course's lesson
   content. Injects a "★ Ask" button into the guide's existing
   .lesson-bar (same mechanism as "★ Final Prep" / "★ Quizzes")
   and a matching <div class="lesson" id="lask"> panel, so it
   reuses showLesson()/the progress bar exactly like a real lesson
   — no changes needed to shared/course.js or the engine files.

   Expects window.GUIDE_COURSE to be set (each guide/index.html
   already sets this before loading the engine script). Calls the
   Netlify function at /.netlify/functions/ask — this is the only
   part of the guide that needs network access.
   ============================================================ */
(function () {
  function injectButton() {
    const bar = document.querySelector('.lesson-bar');
    if (!bar) return;
    const btn = document.createElement('button');
    btn.dataset.l = 'lask';
    btn.textContent = '★ Ask';
    btn.onclick = () => showLesson('lask', btn);
    bar.appendChild(btn);
  }

  function injectPanel() {
    const anchor = document.querySelector('.lesson');
    if (!anchor || !anchor.parentNode) return;
    const panel = document.createElement('div');
    panel.className = 'lesson';
    panel.id = 'lask';
    panel.innerHTML = `
      <section class="topic active">
        <h2>Ask about ${window.GUIDE_COURSE || 'this course'}</h2>
        <div class="concept">Ask a question in your own words. The answer is generated only from this course's own lesson content — if nothing in the guide covers it, it will say so instead of guessing.</div>
        <div class="card">
          <textarea id="ask-input" rows="2" style="width:100%;box-sizing:border-box;font-family:inherit;padding:8px" placeholder="e.g. Why is BFS O(V + E) instead of O(V * E)?"></textarea>
          <button class="btn small" id="ask-submit" style="margin-top:8px">Ask</button>
          <div id="ask-status" class="muted" style="font-size:13px;margin-top:8px"></div>
          <div id="ask-answer" style="margin-top:12px"></div>
          <div id="ask-sources" style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap"></div>
        </div>
      </section>`;
    anchor.parentNode.insertBefore(panel, anchor);
  }

  function jumpToSource(sectionId) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const lesson = el.closest('.lesson');
    if (lesson) {
      document.querySelectorAll('.lesson').forEach(l => l.classList.remove('active'));
      lesson.classList.add('active');
      document.querySelectorAll('.lesson-bar button[data-l]').forEach(b => b.classList.remove('active'));
      const navBtn = document.querySelector('.lesson-bar button[data-l="' + lesson.id + '"]');
      if (navBtn) navBtn.classList.add('active');
    }
    if (el.classList.contains('topic')) {
      const siblings = el.parentElement ? el.parentElement.querySelectorAll(':scope > .topic') : [];
      siblings.forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      const nav = lesson && lesson.querySelector('nav.topics');
      if (nav) {
        nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        const topicBtn = Array.from(nav.querySelectorAll('button')).find(b =>
          (b.getAttribute('onclick') || '').includes("'" + sectionId + "'"));
        if (topicBtn) topicBtn.classList.add('active');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function ask() {
    const input = document.getElementById('ask-input');
    const status = document.getElementById('ask-status');
    const answerBox = document.getElementById('ask-answer');
    const sourcesBox = document.getElementById('ask-sources');
    const question = input.value.trim();
    if (!question) return;

    status.textContent = 'Thinking…';
    answerBox.innerHTML = '';
    sourcesBox.innerHTML = '';

    try {
      const res = await fetch('/.netlify/functions/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course: window.GUIDE_COURSE, question }),
      });
      const data = await res.json();

      if (!res.ok) {
        status.textContent = 'Something went wrong: ' + (data.error || res.status);
        return;
      }
      if (data.answer === null) {
        status.textContent = '';
        answerBox.innerHTML = "<div class=\"fb show no\">Nothing in this guide's content covers that closely enough to answer from. Try rephrasing, or ask about a specific lesson topic.</div>";
        return;
      }

      status.textContent = '';
      answerBox.innerHTML = '<div class="fb show ok" style="display:block">' +
        String(data.answer).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>') +
        '</div>';
      (data.sources || []).forEach(s => {
        const chip = document.createElement('button');
        chip.className = 'btn small ghost';
        chip.textContent = '📍 ' + s.title;
        chip.onclick = () => jumpToSource(s.section || s.id);
        sourcesBox.appendChild(chip);
      });
    } catch (err) {
      status.textContent = 'Network error — is the site running behind Netlify (netlify dev / a deploy), not opened as a plain static file?';
    }
  }

  function init() {
    injectButton();
    injectPanel();
    const submit = document.getElementById('ask-submit');
    const input = document.getElementById('ask-input');
    if (submit) submit.onclick = ask;
    if (input) input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) ask();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
