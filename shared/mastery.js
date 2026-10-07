/* ============================================================
   MASTERY ENGINE (core) — state, scheduling, question types, unit
   registry, AI client. The UI lives in mastery-hub.js.

   Design (each choice maps to learning-science / CS-education research,
   see courses/COMP211/mastery/README.md):
   - Retrieval practice + spaced review (Leitner boxes 1,3,7,14,30 days)
   - Code TRACING and EXPLAINING before WRITING (Lopez/Lister et al.)
   - Worked examples faded to solo problems (Sweller, Renkl; Parsons)
   - Interleaved mixed practice and timed exam simulation
   - Confidence ratings: "sure but wrong" = misconception, studied first
   - Wrong answers never reveal the right one; hints before reveals

   Authoring: units register themselves with Mastery.unit({...}) using
   the helpers in Mastery.h. See _TEMPLATE.js and README.md in
   courses/<COURSE>/mastery/.

   Item types (shared fields: topic, prompt(html), why(html), hint,
   x (extra unit ids for cross-unit items), verify (checked offline)):
     mc       options:[text | [text, whyWrong]], answer:index
     multi    options:[...], answers:[indexes]
     trace    code?, blanks:[{label?, answer}]           answers split on '~~~'
     memory   as trace, drawn as a stack-frame table
     fill     code with __0__ __1__ tokens, blanks:[{answer}]
     bug      lines, bad:index, reasons, reason:index
     parsons  lines (correct order), distract?:[lines]
     free     model(html), rubric:[...], pass:n          (self-graded + optional AI)
     explain  keypoints:[...], model, pass:n             (explain-it-back)
   ============================================================ */
(function () {
  'use strict';

  var DAY = 864e5;
  var INTERVALS = [0, 1, 3, 7, 14, 30];           // days per Leitner box
  var UNLOCK = 0.8;                               // fraction of a tier to master before the next opens
  var TIER_KEYS = ['recognize', 'trace', 'debug', 'integrate', 'produce'];
  var TIER_INFO = {
    recognize: ['Recognize', 'Can you pick the right idea from a list? Necessary, never sufficient.'],
    trace: ['Trace', 'Predict what the code does. No options: you produce the answer.'],
    debug: ['Debug & Build', 'Find what is broken, and assemble correct code from parts.'],
    integrate: ['Integrate', 'Exam level: several ideas inside one problem.'],
    produce: ['Produce', 'No scaffolding. Write it, then explain it in your own words.']
  };
  var TYPE_LABEL = { mc: 'Multiple choice', multi: 'Select all', trace: 'Trace', memory: 'Memory state', fill: 'Fill the code', bug: 'Bug hunt', parsons: 'Arrange the code', free: 'Written', explain: 'Explain it back' };

  var M = { units: [], byId: {}, items: {}, TIER_KEYS: TIER_KEYS, TIER_INFO: TIER_INFO, TYPE_LABEL: TYPE_LABEL, UNLOCK: UNLOCK, INTERVALS: INTERVALS };
  window.Mastery = M;

  /* ---------------- helpers ---------------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function norm(s, loose) { s = String(s).trim().toLowerCase(); return loose ? s.replace(/\s+/g, '') : s.replace(/\s+/g, ' '); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  function stripHtml(h) { var t = document.createElement('div'); t.innerHTML = h; return t.textContent || ''; }
  function today() { return new Date().toISOString().slice(0, 10); }
  function now() { return Date.now(); }
  function when(ts) { var d = ts - now(); if (d <= 0) return 'now'; var h = d / 36e5; if (h < 24) return 'in ' + Math.ceil(h) + 'h'; return 'in ' + Math.ceil(h / 24) + 'd'; }
  M.esc = esc; M.el = el; M.shuffle = shuffle; M.stripHtml = stripHtml; M.when = when; M.hash = hash;

  /* ---------------- persistent state ---------------- */
  function courseKey() { return 'mastery2:' + ((window.MASTERY_COURSE && window.MASTERY_COURSE.course) || window.GUIDE_COURSE || location.pathname); }
  var S = load();
  function load() {
    try { var r = JSON.parse(localStorage.getItem(courseKey())); if (r && r.items) { r.days = r.days || {}; r.log = r.log || []; r.cards = r.cards || {}; r.ui = r.ui || {}; return r; } } catch (e) { /* ignore */ }
    return { items: {}, cards: {}, log: [], days: {}, ui: {}, unlockAll: false };
  }
  function save() { try { localStorage.setItem(courseKey(), JSON.stringify(S)); } catch (e) { /* storage blocked */ } }
  M.S = function () { return S; };
  M.save = save;
  M.resetAll = function () { S = { items: {}, cards: {}, log: [], days: {}, ui: {}, unlockAll: false }; save(); };
  function touch() { var d = today(); S.days[d] = (S.days[d] || 0) + 1; }
  function st(id) { return S.items[id] || (S.items[id] = { box: 0, due: 0, tries: 0, mastered: false }); }
  function dueIn(box) { return now() + INTERVALS[Math.max(0, Math.min(5, box))] * DAY; }
  M.st = st; M.dueIn = dueIn; M.touch = touch;

  /* Record an outcome. ok+firstTry advances the box; a miss resets it and
     puts the item straight back in the review queue. */
  function record(item, ok, firstTry, conf, revealed) {
    touch();
    if (!item.id || item._noRecord) { save(); return; }
    var s = st(item.id);
    s.tries++;
    if (revealed || !ok) { s.box = 0; s.due = now(); }
    else { s.mastered = true; s.box = firstTry ? Math.min(5, s.box + 1) : 1; s.due = dueIn(s.box); }
    if (!ok || revealed) {
      S.log.push({ id: item.id, t: now(), unit: item._unit || '', tier: item._tier, type: item.type, topic: item.topic || '', conf: conf || '', over: conf === 'sure' });
      if (S.log.length > 400) S.log = S.log.slice(-400);
    }
    save();
  }
  M.record = record;

  /* ============================================================
     UNIT REGISTRY + AUTHORING HELPERS
     ============================================================ */
  M.unit = function (spec) {
    var u = { id: spec.id, title: spec.title, short: spec.short || spec.title, lessons: spec.lessons || [], learn: spec.learn || {}, cards: [], tiers: [], items: [], ai: spec.ai !== false, blurb: spec.blurb || '' };
    TIER_KEYS.forEach(function (k, ti) {
      var arr = (spec.tiers && spec.tiers[k]) || [];
      var tier = { key: k, name: TIER_INFO[k][0], blurb: TIER_INFO[k][1], items: arr };
      arr.forEach(function (it) {
        it._unit = u.id; it._tier = ti; it._u = u;
        it.id = it.id || (u.id + ':' + hash(it.type + '|' + it.prompt + '|' + (it.code || '')));
        M.items[it.id] = it; u.items.push(it);
      });
      u.tiers.push(tier);
    });
    (spec.cards || []).forEach(function (c) {
      var card = { f: c[0], b: c[1], unit: u.id };
      card.id = u.id + ':c' + hash(c[0]);
      u.cards.push(card);
    });
    (u.learn.examples || []).forEach(function (ex) { if (ex.item) { ex.item._noRecord = true; ex.item._unit = u.id; ex.item._u = u; ex.item.id = ex.item.id || (u.id + ':ex:' + hash(ex.item.prompt)); } });
    M.units.push(u); M.byId[u.id] = u;
    return u;
  };

  function mix(base, extra) { if (extra) for (var k in extra) base[k] = extra[k]; return base; }
  var h = M.h = {
    mc: function (topic, prompt, options, answer, why, extra) {
      return mix({ type: 'mc', topic: topic, prompt: prompt, options: options.map(function (o) { return typeof o === 'string' ? { t: o } : { t: o[0], why: o[1] }; }), answer: answer, why: why }, extra);
    },
    multi: function (topic, prompt, options, answers, why, extra) {
      return mix({ type: 'multi', topic: topic, prompt: prompt, options: options.map(function (o) { return typeof o === 'string' ? { t: o } : { t: o[0], why: o[1] }; }), answers: answers, why: why }, extra);
    },
    trace: function (topic, prompt, code, answer, why, extra) {
      return mix({ type: 'trace', topic: topic, prompt: prompt, code: code, blanks: [{ label: 'output', answer: answer }], why: why }, extra);
    },
    mem: function (topic, prompt, code, cells, why, extra) {
      return mix({ type: 'memory', topic: topic, prompt: prompt, code: code, blanks: cells.map(function (c) { return { label: c[0], answer: c[1], given: c[2] === 'given' }; }), why: why }, extra);
    },
    fill: function (topic, prompt, code, answers, why, extra) {
      return mix({ type: 'fill', topic: topic, prompt: prompt, code: code, blanks: answers.map(function (a) { return { answer: a }; }), why: why }, extra);
    },
    bug: function (topic, prompt, lines, bad, reasons, reason, why, extra) {
      return mix({ type: 'bug', topic: topic, prompt: prompt, lines: lines, bad: bad, reasons: reasons.map(function (o) { return typeof o === 'string' ? { t: o } : { t: o[0], why: o[1] }; }), reason: reason, why: why }, extra);
    },
    parsons: function (topic, prompt, lines, distract, why, extra) {
      return mix({ type: 'parsons', topic: topic, prompt: prompt, lines: lines, distract: distract, why: why }, extra);
    },
    free: function (topic, prompt, model, rubric, pass, extra) {
      return mix({ type: 'free', topic: topic, prompt: prompt, model: model, rubric: rubric, pass: pass }, extra);
    },
    explain: function (topic, prompt, keypoints, model, pass, extra) {
      return mix({ type: 'explain', topic: topic, prompt: prompt, keypoints: keypoints, model: model, pass: pass }, extra);
    }
  };

  /* ============================================================
     AI CLIENT (talks to netlify/functions/study-ai.mjs)
     ============================================================ */
  var AI = M.AI = { budget: null };
  AI.endpoint = function () {
    var c = window.MASTERY_COURSE || {};
    try { var o = localStorage.getItem('mastery-ai-endpoint'); if (o) return o; } catch (e) { /* ignore */ }
    return c.aiEndpoint || '/.netlify/functions/study-ai';
  };
  AI.code = function () { try { return localStorage.getItem('mastery-ai-code') || ''; } catch (e) { return ''; } };
  AI.setCode = function (v) { try { if (v) localStorage.setItem('mastery-ai-code', v); else localStorage.removeItem('mastery-ai-code'); } catch (e) { /* ignore */ } };
  AI.ready = function () { return !!AI.code() && window.MASTERY_AI !== false; };
  AI.call = function (action, payload) {
    var body = {}; for (var k in payload) body[k] = payload[k]; body.action = action; body.course = (window.MASTERY_COURSE || {}).course || '';
    return fetch(AI.endpoint(), { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-study-code': AI.code() }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { if (!r.ok) { var e = new Error(d.message || d.error || ('HTTP ' + r.status)); e.status = r.status; e.data = d; throw e; } return d; }); })
      .then(function (d) { if (d.budget) AI.budget = d.budget; if (d.spent != null && d.cap != null) AI.budget = { spent: d.spent, cap: d.cap }; return d; });
  };
  AI.errorText = function (e) {
    if (e && e.status === 401) return 'Access code rejected. Check it in the Tutor tab.';
    if (e && e.status === 429) return e.message || 'AI limit reached for now.';
    if (e && e.status === 403) return e.message || 'Not allowed.';
    return 'AI backend not reachable. It only works on the deployed site with the function configured (see mastery/README.md).';
  };

  /* AI text is untrusted: escape it, allow only `code` and ```blocks``` */
  M.mdLite = function (s) {
    var t = esc(s);
    t = t.replace(/```[a-z]*\n?([\s\S]*?)```/g, function (m, c) { return '<pre><code>' + c.replace(/\n$/, '') + '</code></pre>'; });
    t = t.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
    return t.replace(/\n(?!<\/?pre|<code)/g, '<br>');
  };
  M.sanitizeGen = function (v) {
    var o = JSON.parse(JSON.stringify(v));
    function f(s) { return M.mdLite(s || ''); }
    o.prompt = f(o.prompt); o.why = f(o.why); o.topic = esc(o.topic || '');
    if (o.options) o.options = o.options.map(function (x) { return { t: f(x.t), why: f(x.why) }; });
    if (o.blanks) o.blanks = o.blanks.map(function (b) { return { label: esc(b.label || ''), answer: b.answer }; });
    o._noRecord = true; o._gen = true; o.id = 'gen:' + hash(o.prompt + (o.code || ''));
    return o;
  };

  /* ============================================================
     ITEM BODIES — each returns { node, grade(), reveal(), reset(), custom? }
     grade() -> { ok, msg }   (msg shown on a wrong answer; never the answer)
     ============================================================ */
  function inputsBody(item) {
    var node = el('div', 'mq-body'), blanks = item.blanks || [], loose = item.type === 'fill', inputs = [];
    function mk(i, b) {
      var inp = el('input', 'mq-in'); inp.type = 'text'; inp.spellcheck = false; inp.autocomplete = 'off'; inp.setAttribute('autocapitalize', 'off');
      inp.setAttribute('aria-label', b.label || ('blank ' + (i + 1)));
      if (b.given) { inp.value = b.answer.split('~~~')[0]; inp.readOnly = true; inp.classList.add('given'); }
      inputs[i] = inp; return inp;
    }
    var inline = item.code && item.code.indexOf('__0__') !== -1;
    if (item.code) {
      var pre = el('pre'), code = el('code'), parts = item.code.split(/__(\d+)__/);
      for (var p = 0; p < parts.length; p++) {
        if (p % 2 === 0) code.appendChild(document.createTextNode(parts[p]));
        else { var idx = +parts[p]; code.appendChild(mk(idx, blanks[idx] || { answer: '' })); }
      }
      pre.appendChild(code); node.appendChild(pre);
    }
    if (!inline) {
      var frame = el('div', item.type === 'memory' ? 'mq-frame' : 'mq-list');
      blanks.forEach(function (b, i) {
        var row = el('label', 'mq-row'); row.appendChild(el('span', 'mq-lbl', b.label ? b.label : ('answer ' + (i + 1))));
        row.appendChild(mk(i, b)); frame.appendChild(row);
      });
      node.appendChild(frame);
    }
    function ok1(i) {
      var alts = blanks[i].answer.split('~~~').map(function (a) { return norm(a, loose); });
      return alts.indexOf(norm(inputs[i].value, loose)) !== -1;
    }
    return {
      node: node,
      grade: function () {
        var n = 0, total = 0, empty = 0;
        blanks.forEach(function (b, i) {
          if (b.given) return; total++;
          var v = inputs[i].value.trim(), ok = ok1(i); if (ok) n++; if (!v) empty++;
          inputs[i].classList.toggle('good', ok && !!v); inputs[i].classList.toggle('bad', !ok && !!v);
        });
        if (empty === total) return { ok: false, msg: 'Type an answer first.', soft: true };
        return { ok: n === total, msg: total > 1 ? n + ' of ' + total + ' correct. Green boxes are right; fix the red ones.' : 'Not quite. Re-check and try again.' };
      },
      reveal: function () { blanks.forEach(function (b, i) { inputs[i].value = b.answer.split('~~~')[0]; inputs[i].classList.add('good'); inputs[i].classList.remove('bad'); }); },
      reset: function () { blanks.forEach(function (b, i) { if (!b.given) inputs[i].value = ''; inputs[i].classList.remove('good', 'bad'); }); }
    };
  }

  function mcBody(item) {
    var node = el('div', 'mq-body'), sel = -1, btns = [], done = false;
    item.options.forEach(function (o, i) {
      var b = el('button', 'mq-opt', o.t); b.type = 'button';
      b.onclick = function () { if (done || b.disabled) return; btns.forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); sel = i; };
      btns.push(b); node.appendChild(b);
    });
    return {
      node: node,
      grade: function () {
        if (sel < 0) return { ok: false, msg: 'Pick an option first.', soft: true };
        if (sel === item.answer) { done = true; btns[sel].classList.add('right'); btns.forEach(function (x) { x.disabled = true; }); return { ok: true }; }
        var why = item.options[sel].why;
        btns[sel].classList.remove('sel'); btns[sel].classList.add('wrongopt'); btns[sel].disabled = true; sel = -1;
        return { ok: false, msg: why || 'Not that one. Try again.' };
      },
      reveal: function () { done = true; btns.forEach(function (x, i) { x.disabled = true; if (i === item.answer) x.classList.add('right'); }); },
      reset: function () { done = false; sel = -1; btns.forEach(function (x) { x.disabled = false; x.className = 'mq-opt'; }); }
    };
  }

  function multiBody(item) {
    var node = el('div', 'mq-body'), boxes = [], done = false;
    item.options.forEach(function (o, i) {
      var lab = el('label', 'mq-chk'), cb = document.createElement('input'); cb.type = 'checkbox';
      lab.appendChild(cb); lab.appendChild(el('span', '', o.t)); boxes.push(cb); node.appendChild(lab);
    });
    return {
      node: node,
      grade: function () {
        var picked = boxes.map(function (b, i) { return b.checked ? i : -1; }).filter(function (i) { return i >= 0; });
        if (!picked.length) return { ok: false, msg: 'Select at least one.', soft: true };
        var wrong = 0;
        boxes.forEach(function (b, i) { if (b.checked !== (item.answers.indexOf(i) !== -1)) wrong++; });
        if (!wrong) { done = true; boxes.forEach(function (b) { b.disabled = true; }); return { ok: true }; }
        return { ok: false, msg: wrong + ' of ' + boxes.length + ' boxes ' + (wrong === 1 ? 'is' : 'are') + ' wrong (ticked when it should not be, or missed). Adjust and check again.' };
      },
      reveal: function () { done = true; boxes.forEach(function (b, i) { b.checked = item.answers.indexOf(i) !== -1; b.disabled = true; }); },
      reset: function () { done = false; boxes.forEach(function (b) { b.checked = false; b.disabled = false; }); }
    };
  }

  function bugBody(item) {
    var node = el('div', 'mq-body'), line = -1, reason = -1, done = false, lineEls = [], rs = [];
    var pre = el('pre', 'mq-lines');
    item.lines.forEach(function (l, i) {
      var b = el('button', 'mq-line'); b.type = 'button';
      b.innerHTML = '<span class="mq-ln">' + (i + 1) + '</span><span class="mq-src">' + esc(l) + '</span>';
      b.onclick = function () { if (done) return; lineEls.forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); line = i; };
      lineEls.push(b); pre.appendChild(b);
    });
    node.appendChild(el('div', 'mq-sub', '1. Click the line that causes the bug'));
    node.appendChild(pre);
    node.appendChild(el('div', 'mq-sub', '2. Why is it a bug?'));
    item.reasons.forEach(function (r, i) {
      var b = el('button', 'mq-opt', r.t); b.type = 'button';
      b.onclick = function () { if (done || b.disabled) return; rs.forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); reason = i; };
      rs.push(b); node.appendChild(b);
    });
    return {
      node: node,
      grade: function () {
        if (line < 0 || reason < 0) return { ok: false, msg: 'Choose a line and a reason.', soft: true };
        if (line !== item.bad) { lineEls[line].classList.remove('sel'); lineEls[line].classList.add('wrongopt'); line = -1; return { ok: false, msg: "That line isn't the root cause. Re-read what each line does at run time." }; }
        if (reason !== item.reason) { var w = item.reasons[reason].why; rs[reason].classList.remove('sel'); rs[reason].classList.add('wrongopt'); rs[reason].disabled = true; reason = -1; return { ok: false, msg: 'Right line, wrong reason. ' + (w || '') }; }
        done = true; lineEls[item.bad].classList.add('right'); rs[item.reason].classList.add('right'); return { ok: true };
      },
      reveal: function () { done = true; lineEls[item.bad].classList.add('right'); rs[item.reason].classList.add('right'); },
      reset: function () { done = false; line = reason = -1; lineEls.forEach(function (x) { x.className = 'mq-line'; }); rs.forEach(function (x) { x.className = 'mq-opt'; x.disabled = false; }); }
    };
  }

  function parsonsBody(item) {
    var node = el('div', 'mq-body'), pool = el('div', 'mq-pool'), sol = el('div', 'mq-sol');
    node.appendChild(el('div', 'mq-sub', 'Click lines to build the solution top to bottom. Click a placed line to take it back.'));
    var cols = el('div', 'mq-two'), a = el('div'), b = el('div');
    a.appendChild(el('div', 'mq-sub', 'Available lines')); a.appendChild(pool);
    b.appendChild(el('div', 'mq-sub', 'Your solution')); b.appendChild(sol);
    cols.appendChild(a); cols.appendChild(b); node.appendChild(cols);
    var all = item.lines.concat(item.distract || []);
    var order = shuffle(all.map(function (l, i) { return i; })), placed = [];
    function draw() {
      pool.innerHTML = ''; sol.innerHTML = '';
      order.filter(function (i) { return placed.indexOf(i) === -1; }).forEach(function (i) {
        var x = el('button', 'mq-pl'); x.type = 'button'; x.textContent = all[i]; x.onclick = function () { placed.push(i); draw(); }; pool.appendChild(x);
      });
      placed.forEach(function (i) {
        var x = el('button', 'mq-pl placed'); x.type = 'button'; x.textContent = all[i]; x.onclick = function () { placed.splice(placed.indexOf(i), 1); draw(); }; sol.appendChild(x);
      });
      if (!placed.length) sol.appendChild(el('div', 'mq-empty', 'empty'));
    }
    draw();
    return {
      node: node,
      grade: function () {
        var got = placed.map(function (i) { return all[i]; });
        if (!got.length) return { ok: false, msg: 'Place some lines first.', soft: true };
        var good = item.lines.length === got.length && item.lines.every(function (l, i) { return got[i] === l; });
        if (good) return { ok: true };
        var inPlace = got.filter(function (l, i) { return item.lines[i] === l; }).length;
        return { ok: false, msg: inPlace + ' of ' + item.lines.length + ' lines are in the right place' + (got.length !== item.lines.length ? ' (you placed ' + got.length + ' lines)' : '') + '.' };
      },
      reveal: function () { placed = item.lines.map(function (l) { return all.indexOf(l); }); draw(); },
      reset: function () { placed = []; draw(); }
    };
  }

  /* free-response + explain-it-back: self-graded against a rubric, optional AI feedback */
  function writtenBody(item, finish, ctx) {
    var explain = item.type === 'explain', points = explain ? item.keypoints : item.rubric;
    var node = el('div', 'mq-body'), history = [];
    var ta = el('textarea', 'mq-ta'); ta.rows = explain ? 6 : 8;
    ta.placeholder = explain ? 'Explain it as if teaching a friend who missed lecture. Your own words; examples welcome.' : 'Write your answer here. Code is fine.';
    node.appendChild(ta);
    var act = el('div', 'mq-actions'), showBtn = el('button', 'mq-btn', explain ? 'I’m done: show key points' : 'I’m done: show model answer');
    var aiBtn = el('button', 'mq-btn ghost', '★ AI feedback');
    act.appendChild(showBtn); act.appendChild(aiBtn); node.appendChild(act);
    var aiOut = el('div', 'mq-ai'), after = el('div', 'mq-after'); after.style.display = 'none'; node.appendChild(aiOut); node.appendChild(after);
    aiBtn.style.display = (AI.ready()) ? '' : 'none';

    function runAI(answer, round) {
      aiBtn.disabled = true; aiOut.innerHTML = '<div class="mq-fb">Reading your answer…</div>';
      return AI.call('explain', { kind: item.type, prompt: stripHtml(item.prompt), points: points, model: item.model ? stripHtml(item.model) : '', answer: answer, history: history })
        .then(function (d) {
          var o = '<div class="mq-fb"><b>AI feedback</b> (advisory; you grade yourself below)';
          if (d.hit && d.hit.length) o += '<div class="mq-sub">You covered</div><ul>' + d.hit.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
          if (d.missed && d.missed.length) o += '<div class="mq-sub">Missing or shaky</div><ul>' + d.missed.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
          if (d.misconception) o += '<div class="mq-sub">Possible misconception</div>' + esc(d.misconception);
          if (d.followup) o += '<div class="mq-sub">Answer this next (edit your text above, then ask again)</div><i>' + esc(d.followup) + '</i>';
          aiOut.innerHTML = o + '</div>';
          if (d.followup) history.push({ q: d.followup, a: answer.slice(0, 600) });
          if (ctx.onAI) ctx.onAI();
        })
        .catch(function (e) { aiOut.innerHTML = '<div class="mq-fb no">' + esc(AI.errorText(e)) + '</div>'; })
        .then(function () { aiBtn.disabled = false; });
    }
    aiBtn.onclick = function () {
      if (ta.value.trim().length < 20) { aiOut.innerHTML = '<div class="mq-fb no">Write a few sentences first.</div>'; return; }
      runAI(ta.value.slice(0, 3000));
    };
    showBtn.onclick = function () {
      if (ta.value.trim().length < 10) { aiOut.innerHTML = '<div class="mq-fb no">Write an attempt first. Retrieval only helps if you try before you look.</div>'; return; }
      showBtn.style.display = 'none'; after.style.display = ''; aiOut.innerHTML = '';
      var o = '';
      if (item.model) o += '<div class="mq-model"><b>Model answer</b>' + item.model + '</div>';
      o += '<div class="mq-sub">' + (explain ? 'Which key points did you actually make?' : 'Check off what your answer contained:') + '</div>';
      points.forEach(function (p, i) { o += '<label class="mq-chk"><input type="checkbox" data-i="' + i + '"> <span>' + p + '</span></label>'; });
      after.innerHTML = o;
      var go = el('button', 'mq-btn', 'Submit self-grade'); after.appendChild(go);
      go.onclick = function () {
        var n = after.querySelectorAll('input:checked').length, need = item.pass || Math.ceil(points.length * 0.7);
        go.disabled = true;
        finish(n >= need, n + ' of ' + points.length + ' points. ' + (n >= need ? (item.why || '') : 'Below the bar (' + need + '). Re-read the missing points, then rewrite your answer from memory.'));
      };
    };
    return { node: node, custom: true, grade: function () { return { ok: false }; }, reveal: function () {}, reset: function () {} };
  }

  function buildBody(item, finish, ctx) {
    switch (item.type) {
      case 'mc': return mcBody(item);
      case 'multi': return multiBody(item);
      case 'trace': case 'memory': case 'fill': return inputsBody(item);
      case 'bug': return bugBody(item);
      case 'parsons': return parsonsBody(item);
      case 'free': case 'explain': return writtenBody(item, finish, ctx);
    }
    return { node: el('div', '', 'Unknown item type: ' + esc(item.type)), grade: function () { return { ok: false }; }, reveal: function () {}, reset: function () {} };
  }

  /* ============================================================
     ITEM CARD (practice or exam mode)
     ctx = { exam, onChange, onFinish(result), gen }
     ============================================================ */
  var VARIANT_TYPES = { mc: 1, trace: 1, memory: 1 };
  M.renderItem = function (item, ctx) {
    ctx = ctx || {};
    var card = el('div', 'mq' + (item._gen ? ' mq-genitem' : ''));
    var u = item._u;
    var head = el('div', 'mq-head');
    head.innerHTML = '<span class="mq-tag">' + (TYPE_LABEL[item.type] || item.type) + '</span>' +
      (item._gen ? '<span class="mq-tag gen">AI-generated &middot; double-checked by a second pass, not by a compiler</span>' : '') +
      (ctx.showUnit && u ? '<span class="mq-topic">' + esc(u.short) + '</span>' : '') +
      (item.topic ? '<span class="mq-topic">' + (item._gen ? item.topic : esc(item.topic)) + '</span>' : '') +
      '<span class="mq-done"></span>';
    card.appendChild(head);
    card.appendChild(el('div', 'mq-prompt', item.prompt));

    var tries = 0, finished = false, conf = '', hinted = false, lastWrong = '';
    var fb = el('div', 'mq-fb'); fb.style.display = 'none';
    function showFb(kind, html) { fb.style.display = ''; fb.className = 'mq-fb ' + kind; fb.innerHTML = html; }
    function markDone() { finished = true; card.classList.add('is-done'); }

    var body = buildBody(item, function (ok, msg) {                      // custom (written) items finish here
      tries++; record(item, ok, ok && tries === 1, '', false);
      if (ok) { markDone(); showFb('ok', '✓ ' + esc(msg)); } else showFb('no', '✕ ' + esc(msg));
      if (ctx.onChange) ctx.onChange(); if (ok && ctx.onFinish) ctx.onFinish({ ok: true });
    }, ctx);
    card.appendChild(body.node);
    if (S.items[item.id] && S.items[item.id].mastered && !ctx.exam) card.classList.add('was-mastered');
    card.appendChild(fb);
    var genBox = el('div', 'mq-gen'); card.appendChild(genBox);

    function variantsButton() {
      if (ctx.exam || item._gen || !AI.ready() || !VARIANT_TYPES[item.type] || (u && u.ai === false)) return null;
      var b = el('button', 'mq-btn ghost', '★ 3 AI practice variants'); b.type = 'button';
      b.onclick = function () {
        b.disabled = true; b.textContent = 'Generating and double-checking…';
        AI.call('variants', { item: { type: item.type, topic: item.topic, prompt: stripHtml(item.prompt), code: item.code, options: item.options && item.options.map(function (o) { return { t: stripHtml(o.t), why: stripHtml(o.why || '') }; }), answer: item.answer, blanks: item.blanks }, wrongAnswer: lastWrong })
          .then(function (d) {
            genBox.innerHTML = '';
            if (!d.variants || !d.variants.length) { genBox.appendChild(el('div', 'mq-fb no', 'The AI could not produce variants that survived the double-check. Try again.')); return; }
            genBox.appendChild(el('div', 'mq-sub', d.variants.length + ' of ' + d.generated + ' variants passed the independent re-solve:'));
            d.variants.forEach(function (v) { var g = M.sanitizeGen(v); g._u = u; g._unit = item._unit; g._tier = item._tier; genBox.appendChild(M.renderItem(g, { onChange: ctx.onChange }).node); });
            b.style.display = 'none';
          })
          .catch(function (e) { genBox.innerHTML = '<div class="mq-fb no">' + esc(AI.errorText(e)) + '</div>'; b.disabled = false; b.textContent = '★ 3 AI practice variants'; });
      };
      return b;
    }

    if (!body.custom && !ctx.exam) {
      var confRow = el('div', 'mq-conf', '<span>How sure are you?</span>');
      [['guess', 'Guess'], ['think', 'Think so'], ['sure', 'Sure']].forEach(function (c) {
        var b = el('button', 'mq-pill', c[1]); b.type = 'button';
        b.onclick = function () { conf = conf === c[0] ? '' : c[0]; confRow.querySelectorAll('.mq-pill').forEach(function (x) { x.classList.remove('on'); }); if (conf) b.classList.add('on'); };
        confRow.appendChild(b);
      });
      card.appendChild(confRow);

      var act = el('div', 'mq-actions');
      var check = el('button', 'mq-btn', 'Check'), hint = el('button', 'mq-btn ghost', 'Hint'), rev = el('button', 'mq-btn ghost', 'Reveal answer'), again = el('button', 'mq-btn ghost', '↻ Try again');
      again.style.display = 'none'; if (!item.hint) hint.style.display = 'none';
      act.appendChild(check); act.appendChild(hint); act.appendChild(rev); act.appendChild(again); card.appendChild(act);
      var extra = el('div', 'mq-actions'); card.appendChild(extra);

      hint.onclick = function () { hinted = true; showFb('rev', '<b>Hint.</b> ' + item.hint); hint.disabled = true; };
      check.onclick = function () {
        if (finished) return;
        var r = body.grade();
        if (r.soft) { showFb('no', '✕ ' + r.msg); return; }
        tries++;
        if (r.ok) {
          record(item, true, tries === 1 && !hinted, conf, false); markDone();
          showFb('ok', '✓ Correct' + (tries > 1 ? ' (attempt ' + tries + ')' : '') + '. ' + (conf === 'guess' ? 'You flagged it a guess, so make sure you could explain why. ' : '') + (item.why || ''));
          check.disabled = rev.disabled = hint.disabled = true; again.style.display = '';
          if (ctx.onFinish) ctx.onFinish({ ok: true });
        } else {
          record(item, false, false, conf, false); lastWrong = r.msg || '';
          showFb('no', '✕ ' + (r.msg || 'Not quite.') + (conf === 'sure' ? ' <i>You were sure about this one. Misses like this are the most valuable to study.</i>' : ''));
          var vb = variantsButton(); if (vb && !extra.firstChild) extra.appendChild(vb);
        }
        if (ctx.onChange) ctx.onChange();
      };
      rev.onclick = function () {
        if (finished) return;
        body.reveal(); record(item, false, false, conf, true); finished = true;
        showFb('rev', '<b>Answer shown.</b> ' + (item.why || '') + '<br><i>Queued for review, so you will see it again soon.</i>');
        check.disabled = rev.disabled = hint.disabled = true; again.style.display = '';
        var vb = variantsButton(); if (vb && !extra.firstChild) extra.appendChild(vb);
        if (ctx.onChange) ctx.onChange(); if (ctx.onFinish) ctx.onFinish({ ok: false, revealed: true });
      };
      again.onclick = function () {
        body.reset(); tries = 0; finished = false; hinted = false; card.classList.remove('is-done');
        fb.style.display = 'none'; check.disabled = rev.disabled = false; hint.disabled = false; again.style.display = 'none'; extra.innerHTML = '';
      };
    }
    return {
      node: card,
      gradeSilently: function () { return body.grade(); },                 // exam mode
      revealInto: function (html) { body.reveal(); showFb('rev', html); }
    };
  };

  /* ---------------- scheduling queries used by the hub ---------------- */
  M.tierStats = function (u, ti) {
    var its = u.tiers[ti].items, m = its.filter(function (i) { return S.items[i.id] && S.items[i.id].mastered; }).length;
    return { m: m, n: its.length };
  };
  M.tierOpen = function (u, ti) {
    if (S.unlockAll || ti === 0) return true;
    for (var k = ti - 1; k >= 0; k--) {
      var p = M.tierStats(u, k);
      if (p.n === 0) continue;                              // empty tiers never block
      return p.m / p.n >= UNLOCK;
    }
    return true;
  };
  M.unitStats = function (u) {
    var m = 0, n = u.items.length;
    u.items.forEach(function (i) { if (S.items[i.id] && S.items[i.id].mastered) m++; });
    return { m: m, n: n, pct: n ? Math.round(m / n * 100) : 0 };
  };
  M.dueItems = function (u) {
    var pool = u ? u.items : M.units.reduce(function (a, x) { return a.concat(x.items); }, []);
    return pool.filter(function (i) { var s = S.items[i.id]; return s && s.tries && (!s.mastered || s.due <= now()); });
  };
  M.cardState = function (c) { return S.cards[c.id] || { box: 0, due: 0, seen: false }; };   // read-only default; rateCard stores
  M.dueCards = function (u, newLimit) {
    var pool = u ? u.cards : M.units.reduce(function (a, x) { return a.concat(x.cards); }, []);
    var due = pool.filter(function (c) { var s = M.cardState(c); return s.seen && s.due <= now(); });
    var fresh = pool.filter(function (c) { return !M.cardState(c).seen; });
    return { due: due, fresh: newLimit == null ? fresh : fresh.slice(0, newLimit), allFresh: fresh.length };
  };
  M.rateCard = function (c, q) {                           // q: 0 again, 1 hard, 2 good, 3 easy
    var s = S.cards[c.id] || (S.cards[c.id] = { box: 0, due: 0, seen: false }); s.seen = true; touch();
    if (q === 0) { s.box = 0; s.due = now(); }
    else if (q === 1) { s.box = Math.max(1, s.box); s.due = dueIn(s.box); }
    else { s.box = Math.min(5, s.box + (q === 3 ? 2 : 1)); s.due = dueIn(s.box); }
    save();
  };
  /* weak topics: recent misses, "sure but wrong" counted double */
  M.weakTopics = function (limit) {
    var agg = {}, cutoff = now() - 60 * DAY;
    S.log.forEach(function (l) {
      if (l.t < cutoff || !l.topic) return;
      var k = l.unit + '|' + l.topic; var a = agg[k] || (agg[k] = { unit: l.unit, topic: l.topic, score: 0, n: 0, sure: 0 });
      a.n++; a.score += l.over ? 2 : 1; if (l.over) a.sure++;
    });
    return Object.keys(agg).map(function (k) { return agg[k]; }).sort(function (a, b) { return b.score - a.score; }).slice(0, limit || 5);
  };
})();
