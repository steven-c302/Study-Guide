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

  document.addEventListener('DOMContentLoaded', function () {
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
