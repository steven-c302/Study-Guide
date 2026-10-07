/* ============================================================
   Theme toggle: Auto (follow OS) -> Light -> Dark.
   Load in <head> so the saved choice applies before first paint.
   The floating button is added once the DOM is ready.
   ============================================================ */
(function () {
  var KEY = 'study-theme';
  var order = ['auto', 'light', 'dark'];
  var label = { auto: 'Theme: Auto', light: 'Theme: Light', dark: 'Theme: Dark' };

  function read() { try { return localStorage.getItem(KEY) || 'auto'; } catch (e) { return 'auto'; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: choice just won't persist */ } }
  function apply(v) {
    if (v === 'light' || v === 'dark') document.documentElement.setAttribute('data-theme', v);
    else document.documentElement.removeAttribute('data-theme');
  }

  apply(read());

  /* Guide pages: collapse the long lesson bar to "Mastery + current lesson", with an expander. */
  function enhanceLessonBar() {
    var bar = document.querySelector('.lesson-bar');
    if (!bar || bar.getAttribute('data-enh')) return;
    var btns = bar.querySelectorAll('button[data-l]');
    if (btns.length < 9) return;
    bar.setAttribute('data-enh', '1'); bar.classList.add('collapsed');
    var t = document.createElement('button');
    t.type = 'button'; t.className = 'lb-toggle';
    function label() { t.textContent = bar.classList.contains('collapsed') ? 'All lessons (' + btns.length + ') \u25BE' : 'Hide list \u25B4'; }
    label();
    t.onclick = function () { bar.classList.toggle('collapsed'); label(); };
    bar.appendChild(t);

    /* Previous / next lesson: tag the neighbours of the active lesson so the collapsed bar shows
       "Mastery | < previous | current | next > | All lessons". Mastery and Ask are not part of the sequence. */
    var SKIP = { lmastery: 1, lask: 1 };
    function seq() { return Array.prototype.filter.call(bar.querySelectorAll('button[data-l]'), function (b) { return !SKIP[b.getAttribute('data-l')]; }); }
    var lastActive = -2;                                   // only react when the ACTIVE lesson changes (not to our own class edits)
    function neighbours() {
      var list = seq(), i = -1;
      list.forEach(function (b, k) { if (b.classList.contains('active')) i = k; });
      if (i === lastActive) return;
      lastActive = i;
      Array.prototype.forEach.call(bar.querySelectorAll('.lb-prev,.lb-next'), function (b) { b.classList.remove('lb-prev', 'lb-next'); b.removeAttribute('title'); });
      if (i < 0) return;
      if (i > 0) { list[i - 1].classList.add('lb-prev'); list[i - 1].setAttribute('title', 'Previous lesson ( [ )'); }
      if (i < list.length - 1) { list[i + 1].classList.add('lb-next'); list[i + 1].setAttribute('title', 'Next lesson ( ] )'); }
      /* narrow screens scroll the bar sideways: once the neighbours are visible, bring previous / current / next into view */
      requestAnimationFrame(function () {
        var from = list[Math.max(i - 1, 0)];
        bar.scrollLeft += from.getBoundingClientRect().left - bar.getBoundingClientRect().left - 8;
      });
    }
    neighbours();
    new MutationObserver(neighbours).observe(bar, { attributes: true, subtree: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', function (e) {                  // [ and ] step through lessons
      var tag = (e.target && e.target.tagName) || '';
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (e.target && e.target.isContentEditable) || e.metaKey || e.ctrlKey || e.altKey) return;
      var b = e.key === '[' ? bar.querySelector('.lb-prev') : e.key === ']' ? bar.querySelector('.lb-next') : null;
      if (b) { e.preventDefault(); b.click(); }
    });
    bar.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('button[data-l]')) setTimeout(function () { bar.classList.add('collapsed'); label(); }, 0);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(enhanceLessonBar, 0);                      // after other scripts have injected their own buttons
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';
    btn.textContent = label[read()];
    btn.onclick = function () {
      var next = order[(order.indexOf(read()) + 1) % order.length];
      write(next); apply(next); btn.textContent = label[next];
    };
    document.body.appendChild(btn);
  });
})();
