/* ============================================================
   Floating-point bit explorer (used by the COMP211 floating point lessons).
   fpExplorer(containerId, designs) draws one clickable bit row per design
   (pick the design with the buttons on top) and explains the value:
     design = { name, sb, eb, mb, bias, special }   (sb = sign bits 0/1,
     special = reserve exponent all-ones for inf/NaN and all-zeros for
     zero/denormals, as the minifloat does).
   ============================================================ */
window.fpExplorer = function (id, designs, startBits) {
  var root = document.getElementById(id);
  if (!root || !designs || !designs.length) return;
  var cur = 0, bits = [];
  function width(d) { return d.sb + d.eb + d.mb; }
  function reset(d, init) {
    bits = [];
    for (var i = 0; i < width(d); i++) bits.push(init && init[i] === '1' ? 1 : 0);
  }
  function field(d, from, len) { var v = 0; for (var i = 0; i < len; i++) v = v * 2 + bits[from + i]; return v; }
  function frac(d) { var s = ''; for (var i = 0; i < d.mb; i++) s += bits[d.sb + d.eb + i]; return s; }
  function explain(d) {
    var s = d.sb ? bits[0] : 0, E = field(d, d.sb, d.eb), maxE = Math.pow(2, d.eb) - 1, f = frac(d);
    var M = parseInt(f, 2), sign = s ? '−' : '', pm = d.sb ? '(−1)<sup>' + s + '</sup> × ' : '';
    if (d.special && E === maxE) {
      return M ? { kind: 'NaN', html: 'Exponent all ones and a <b>nonzero</b> significand: <b>NaN</b> (not a number).', val: 'NaN' }
               : { kind: 'infinity', html: 'Exponent all ones and a zero significand: <b>' + sign + 'infinity</b>.', val: sign + 'Inf' };
    }
    if (d.special && E === 0) {
      if (M === 0) return { kind: 'zero', html: 'Exponent all zeros and a zero significand: <b>' + sign + 'zero</b>.', val: sign + '0' };
      var v = (s ? -1 : 1) * (M / Math.pow(2, d.mb)) * Math.pow(2, 1 - d.bias);
      return { kind: 'denormalized', html: 'Denormalized (exponent all zeros, significand nonzero): no hidden 1 and a fixed exponent of 1 − bias = ' + (1 - d.bias) + '.<br>' + pm + '0.' + f + ' × 2<sup>' + (1 - d.bias) + '</sup> = <b>' + v + '</b>', val: String(v) };
    }
    var e = E - d.bias, val = (s ? -1 : 1) * (1 + M / Math.pow(2, d.mb)) * Math.pow(2, e);
    return { kind: 'normalized', html: 'Normalized: exponent field ' + E + (d.bias ? ' − bias ' + d.bias + ' = ' + e : ' = ' + e) + '.<br>' + pm + '1.' + f + ' × 2<sup>' + e + '</sup> = <b>' + val + '</b>', val: String(val) };
  }
  function draw() {
    var d = designs[cur], r = explain(d), h = '';
    if (designs.length > 1) {
      h += '<div class="fpx-row">' + designs.map(function (x, i) { return '<button class="btn small' + (i === cur ? '' : ' ghost') + '" data-d="' + i + '">' + x.name + '</button>'; }).join(' ') + '</div>';
    }
    h += '<div class="fpx-row fpx-bits">';
    for (var i = 0; i < bits.length; i++) {
      var lab = i < d.sb ? 'S' : (i < d.sb + d.eb ? 'E' : 'M');
      if (i === d.sb && d.sb) h += '<span class="fpx-gap"></span>';
      if (i === d.sb + d.eb) h += '<span class="fpx-gap"></span>';
      h += '<button class="fpx-bit fpx-' + lab + '" data-b="' + i + '" title="' + lab + '">' + bits[i] + '</button>';
    }
    h += '</div><div class="fpx-row fpx-legend"><span class="fpx-S">S = sign</span> <span class="fpx-E">E = exponent</span> <span class="fpx-M">M = significand</span> &middot; bias ' + d.bias + '</div>';
    h += '<div class="fpx-out"><div><b>' + r.kind + '</b> &mdash; value <code>' + r.val + '</code></div><div class="muted">' + r.html + '</div></div>';
    root.innerHTML = h;
    Array.prototype.forEach.call(root.querySelectorAll('[data-b]'), function (b) { b.onclick = function () { var k = +b.getAttribute('data-b'); bits[k] = bits[k] ? 0 : 1; draw(); }; });
    Array.prototype.forEach.call(root.querySelectorAll('[data-d]'), function (b) { b.onclick = function () { cur = +b.getAttribute('data-d'); reset(designs[cur]); draw(); }; });
  }
  if (!document.getElementById('fpx-style')) {
    var st = document.createElement('style'); st.id = 'fpx-style';
    st.textContent = '.fpx-row{margin:8px 0;display:flex;flex-wrap:wrap;gap:6px;align-items:center}.fpx-bit{min-width:38px;height:42px;font:600 18px/1 ui-monospace,Menlo,monospace;border:1.5px solid var(--line);border-radius:8px;background:var(--card,transparent);color:inherit;cursor:pointer}.fpx-bit:hover{border-color:var(--ink)}.fpx-gap{width:10px}.fpx-S{color:var(--red,#b3261e)}.fpx-E{color:var(--accent,#0b5fa5)}.fpx-M{color:var(--green,#2e7d32)}.fpx-legend span{font-size:13px;font-weight:600}.fpx-out{margin-top:10px;padding:10px 12px;border:1px solid var(--line);border-radius:8px;line-height:1.55}';
    document.head.appendChild(st);
  }
  reset(designs[0], startBits); draw();
};
