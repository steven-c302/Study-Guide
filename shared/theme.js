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
