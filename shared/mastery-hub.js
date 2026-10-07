/* ============================================================
   MASTERY HUB (UI) — one "★ Mastery" panel with six views:
     Today     dashboard + one-click daily session (spaced review + interleaving)
     Learn     per-unit big ideas, traps, and worked examples faded to solo
     Practice  5-tier difficulty ladder per unit (with topic drill-down)
     Cards     spaced-repetition recall cards
     Exam      timed, interleaved, no-feedback simulation
     Tutor     AI: Socratic chat, Teach-it-back, variants of missed items
   Reads units registered through Mastery.unit(...) and course settings
   from window.MASTERY_COURSE (see courses/<COURSE>/mastery/config.js).
   ============================================================ */
(function () {
  'use strict';
  var M = window.Mastery, el = M.el, esc = M.esc, shuffle = M.shuffle, AI = M.AI;
  function S() { return M.S(); }
  function now() { return Date.now(); }

  var ui = { view: 'today', unit: null, tier: 0, topic: null, cardsUnit: null };
  var root, body, nav;
  var examTimer = null;

  var VIEWS = [['today', 'Today'], ['learn', 'Learn'], ['practice', 'Practice'], ['cards', 'Cards'], ['exam', 'Exam'], ['tutor', 'Tutor ★']];

  /* ---------------- mounting ---------------- */
  function mount() {
    if (!M.units.length) return;
    var C = window.MASTERY_COURSE || {};
    var bar = document.querySelector('.lesson-bar'), anchor = document.querySelector('.lesson');
    if (!bar || !anchor) return;
    var btn = el('button', '', '★ Mastery'); btn.dataset.l = 'lmastery';
    btn.onclick = function () { showLesson('lmastery', btn); render(); };
    bar.insertBefore(btn, bar.firstChild);
    var panel = el('div', 'lesson'); panel.id = 'lmastery';
    root = el('main', 'mq-hub'); panel.appendChild(root);
    anchor.parentNode.insertBefore(panel, anchor);
    ui.unit = (M.units[0] || {}).id;
    render();
  }

  function render() {
    if (examTimer) { clearInterval(examTimer); examTimer = null; }
    root.innerHTML = '';
    var C = window.MASTERY_COURSE || {};
    root.appendChild(el('h2', '', (C.course || 'Course') + ' · Mastery'));
    nav = el('div', 'mq-nav');
    VIEWS.forEach(function (v) {
      var b = el('button', 'mq-navb' + (ui.view === v[0] ? ' on' : ''), v[1]); b.type = 'button';
      b.onclick = function () { ui.view = v[0]; render(); window.scrollTo({ top: 0 }); };
      nav.appendChild(b);
    });
    root.appendChild(nav);
    body = el('div', 'mq-wrap'); root.appendChild(body);
    ({ today: viewToday, session: viewSession, learn: viewLearn, practice: viewPractice, cards: viewCards, exam: viewExam, tutor: viewTutor })[ui.view]();
  }
  function go(view, patch) { ui.view = view; if (patch) for (var k in patch) ui[k] = patch[k]; render(); window.scrollTo({ top: 0 }); }

  function unitChips(sel, onPick, withAll) {
    var row = el('div', 'mq-chips');
    if (withAll) { var a = el('button', 'mq-chip' + (!sel ? ' on' : ''), 'All units'); a.onclick = function () { onPick(null); }; row.appendChild(a); }
    M.units.forEach(function (u) {
      var b = el('button', 'mq-chip' + (sel === u.id ? ' on' : ''), esc(u.short)); b.type = 'button';
      b.onclick = function () { onPick(u.id); }; row.appendChild(b);
    });
    return row;
  }
  function bar(pct) { return '<span class="mq-seg-bar"><i style="width:' + pct + '%"></i></span>'; }
  function unitOf() { return M.byId[ui.unit] || M.units[0]; }

  /* ============================================================ TODAY */
  function viewToday() {
    var cd = M.dueCards(null, 5), dueIt = M.dueItems(null);
    var nCards = cd.due.length + cd.fresh.length, nItems = Math.min(dueIt.length, 5);

    var hero = el('div', 'mq-hero');
    hero.innerHTML = '<div><div class="mq-hero-t">Today’s session</div><div class="mq-blurb">' +
      (nCards + nItems ? '<b>' + cd.due.length + '</b> cards due · <b>' + cd.fresh.length + '</b> new · <b>' + dueIt.length + '</b> questions to revisit, mixed together with a couple of stretch questions. About 10 minutes.' : 'Nothing is due. Start a stretch session, or learn something new.') +
      '</div></div>';
    var go1 = el('button', 'mq-btn big', 'Start session'); go1.onclick = function () { startSession(); };
    hero.appendChild(go1); body.appendChild(hero);

    /* last 14 days */
    var days = el('div', 'mq-days'), cnt = 0;
    for (var i = 13; i >= 0; i--) {
      var d = new Date(now() - i * 864e5).toISOString().slice(0, 10), n = S().days[d] || 0; if (n) cnt++;
      var c = el('span', 'mq-day' + (n ? ' on' : '') + (n > 15 ? ' hi' : '')); c.title = d + ': ' + n + ' answers'; days.appendChild(c);
    }
    var act = el('div', 'mq-card'); act.innerHTML = '<div class="mq-sub">Last 14 days: studied on ' + cnt + ' of 14 days</div>'; act.appendChild(days);
    act.appendChild(el('div', 'mq-note', 'Spread-out short sessions beat one long cram. Aim for most days, 10 to 15 minutes.'));
    body.appendChild(act);

    /* units */
    var g = el('div', 'mq-units');
    M.units.forEach(function (u) {
      var s = M.unitStats(u), due = M.dueItems(u).length, dc = M.dueCards(u, 0).due.length;
      var card = el('button', 'mq-unit'); card.type = 'button';
      card.innerHTML = '<div class="mq-unit-t">' + esc(u.title) + '</div><div class="mq-unit-s">' + s.m + ' / ' + s.n + ' mastered' + (due + dc ? ' · <b>' + (due + dc) + ' due</b>' : '') + '</div>' + bar(s.pct);
      card.onclick = function () { go('learn', { unit: u.id }); };
      g.appendChild(card);
    });
    body.appendChild(el('h3', 'mq-h', 'Units'));
    body.appendChild(g);

    /* weak spots */
    var weak = M.weakTopics(5);
    body.appendChild(el('h3', 'mq-h', 'Weak spots'));
    if (!weak.length) body.appendChild(el('div', 'mq-note', 'No misses logged yet. As you practice, the topics you miss most (and the ones you were sure about) show up here.'));
    else {
      var w = el('div', 'mq-card');
      weak.forEach(function (x) {
        var u = M.byId[x.unit]; var row = el('div', 'mq-weak');
        row.innerHTML = '<span><b>' + esc(x.topic) + '</b> <span class="mq-topic">' + esc(u ? u.short : '') + '</span></span><span class="mq-topic">' + x.n + ' miss' + (x.n > 1 ? 'es' : '') + (x.sure ? ' · ' + x.sure + ' while sure' : '') + '</span>';
        var b = el('button', 'mq-btn ghost', 'Drill this'); b.onclick = function () { go('practice', { unit: x.unit, topic: x.topic }); };
        row.appendChild(b); w.appendChild(row);
      });
      body.appendChild(w);
    }

    /* milestones */
    var C = window.MASTERY_COURSE || {};
    if ((C.milestones || []).length) {
      body.appendChild(el('h3', 'mq-h', 'Countdown'));
      var m = el('div', 'mq-card');
      C.milestones.forEach(function (x) {
        var d = Math.ceil((new Date(x.date + 'T12:00:00').getTime() - now()) / 864e5);
        m.appendChild(el('div', 'mq-weak', '<span><b>' + esc(x.label) + '</b></span><span class="mq-topic">' + (d >= 0 ? d + ' days' : 'passed') + '</span>'));
      });
      body.appendChild(m);
    }

    var how = el('details', 'mq-how'); how.innerHTML = '<summary>How this works (and why)</summary><ul>' +
      '<li><b>Recall before reading.</b> Cards and questions make you retrieve answers from memory, which beats rereading and highlighting by a wide margin.</li>' +
      '<li><b>Spaced.</b> Right answers come back after 1, 3, 7, 14, 30 days. Misses come back immediately.</li>' +
      '<li><b>Trace first.</b> Predicting what code does is the skill that best predicts being able to write it. The ladder is ordered that way.</li>' +
      '<li><b>Mixed.</b> Sessions and exams interleave topics so you practice choosing the right idea, not just applying the one you just read.</li>' +
      '<li><b>Confidence.</b> Mark how sure you are. A miss while sure is a misconception, and gets studied first.</li></ul>';
    body.appendChild(how);
  }

  /* ============================================================ SESSION */
  function startSession() {
    var cd = M.dueCards(null, 5);
    var cards = cd.due.slice(0, 8).concat(cd.fresh).slice(0, 10).map(function (c) { return { kind: 'card', c: c }; });
    var items = shuffle(M.dueItems(null)).slice(0, 5);
    var have = {}; items.forEach(function (i) { have[i.id] = 1; });

    /* stretch: next unmastered items in the weakest unit */
    var cand = M.units.filter(function (u) { return M.unitStats(u).n > M.unitStats(u).m; })
      .sort(function (a, b) { return M.unitStats(a).pct - M.unitStats(b).pct; });
    var stretch = [];
    if (cand.length) {
      var u = cand[0];
      for (var t = 0; t < u.tiers.length && stretch.length < 2; t++) {
        if (!M.tierOpen(u, t)) break;
        u.tiers[t].items.forEach(function (i) { var s = S().items[i.id]; if (stretch.length < 2 && !(s && s.mastered) && !have[i.id] && i.type !== 'free') stretch.push(i); });
      }
    }
    var entries = shuffle(cards.concat(items.concat(stretch).map(function (i) { return { kind: 'item', i: i }; })));
    ui.session = { entries: entries, at: 0, done: 0, ok: 0 };
    go('session');
  }
  function viewSession() {
    var s = ui.session;
    if (!s || !s.entries.length) { body.appendChild(el('div', 'mq-card', 'Nothing to do right now. You are caught up.')); var b0 = el('button', 'mq-btn', 'Back to Today'); b0.onclick = function () { go('today'); }; body.appendChild(b0); return; }
    if (s.at >= s.entries.length) {
      var d = el('div', 'mq-result'); d.innerHTML = '<div class="mq-score">Done</div><div>' + s.entries.length + ' steps · ' + s.ok + ' answered right the first time.</div><p class="mq-blurb">Misses are already queued. Come back tomorrow: that gap is what makes it stick.</p>';
      var b = el('button', 'mq-btn', 'Back to Today'); b.onclick = function () { go('today'); }; d.appendChild(b); body.appendChild(d); return;
    }
    var e = s.entries[s.at];
    var head = el('div', 'mq-examhead'); head.innerHTML = '<span>Step ' + (s.at + 1) + ' of ' + s.entries.length + '</span>' + bar(Math.round(s.at / s.entries.length * 100));
    var quit = el('button', 'mq-btn ghost', 'End session'); quit.onclick = function () { go('today'); }; head.appendChild(quit); body.appendChild(head);
    function next() { s.at++; render(); window.scrollTo({ top: 0 }); }
    if (e.kind === 'card') {
      body.appendChild(cardUI(e.c, function (q) { if (q >= 2) s.ok++; next(); }, true));
    } else {
      var first = true;
      var r = M.renderItem(e.i, { showUnit: true, onFinish: function (res) {
        if (res.ok && first) s.ok++;
        if (!body.querySelector('.mq-next')) { var n = el('button', 'mq-btn mq-next', 'Next →'); n.onclick = next; body.appendChild(n); }
      }, onChange: function () { first = false; } });
      body.appendChild(r.node);
      var skip = el('button', 'mq-link', 'Skip this one'); skip.onclick = next; body.appendChild(skip);
    }
  }

  /* shared flash card UI; onRate(q) after rating */
  function cardUI(c, onRate, showUnit) {
    var card = el('div', 'mq-flash'), u = M.byId[c.unit];
    card.appendChild(el('div', 'mq-flash-k', 'Say or write the answer first, then reveal' + (showUnit && u ? ' · ' + esc(u.short) : '')));
    card.appendChild(el('div', 'mq-flash-f', c.f));
    var back = el('div', 'mq-flash-b', c.b); back.style.display = 'none'; card.appendChild(back);
    var show = el('button', 'mq-btn', 'Show answer'); card.appendChild(show);
    var rates = el('div', 'mq-actions'); rates.style.display = 'none';
    [['Again', 0], ['Hard', 1], ['Good', 2], ['Easy', 3]].forEach(function (r) {
      var b = el('button', 'mq-btn ghost', r[0]); b.onclick = function () { M.rateCard(c, r[1]); onRate(r[1]); }; rates.appendChild(b);
    });
    card.appendChild(rates);
    show.onclick = function () { back.style.display = ''; rates.style.display = ''; show.style.display = 'none'; };
    return card;
  }

  /* ============================================================ LEARN */
  function viewLearn() {
    body.appendChild(unitChips(ui.unit, function (id) { ui.unit = id; render(); }));
    var u = unitOf(), L = u.learn || {};
    body.appendChild(el('h3', 'mq-h', u.title));
    if (u.blurb) body.appendChild(el('p', 'mq-blurb', u.blurb));
    if (u.lessons.length) {
      var ln = el('div', 'mq-chips'); ln.appendChild(el('span', 'mq-topic', 'Source lessons:'));
      u.lessons.forEach(function (l) {
        var b = el('button', 'mq-chip', esc(l.label)); b.onclick = function () { var bt = document.querySelector('.lesson-bar button[data-l="' + l.id + '"]'); showLesson(l.id, bt); };
        ln.appendChild(b);
      });
      body.appendChild(ln);
    }
    if ((L.big || []).length) {
      var c = el('div', 'mq-card'); c.appendChild(el('div', 'mq-sub', 'Big ideas (know these cold)'));
      var ol = el('ol', 'mq-list-big'); L.big.forEach(function (x) { ol.appendChild(el('li', '', x)); }); c.appendChild(ol); body.appendChild(c);
    }
    if ((L.traps || []).length) {
      var t = el('div', 'mq-card mq-traps'); t.appendChild(el('div', 'mq-sub', '▲ Common traps'));
      var ul = el('ul', 'mq-list-big'); L.traps.forEach(function (x) { ul.appendChild(el('li', '', x)); }); t.appendChild(ul); body.appendChild(t);
    }
    if ((L.examples || []).length) {
      body.appendChild(el('h3', 'mq-h', 'Worked examples, then you try'));
      body.appendChild(el('p', 'mq-blurb', 'Study the worked one step by step. Then finish the partly-done one. Then do one with nothing given. Skipping straight to the end skips the practice that transfers.'));
      L.examples.forEach(function (ex) {
        if (ex.kind === 'worked') {
          var w = el('div', 'mq-card mq-worked'); w.appendChild(el('div', 'mq-tag', 'Worked example'));
          w.appendChild(el('div', 'mq-prompt', ex.title));
          if (ex.code) w.appendChild(el('pre', '', '<code>' + esc(ex.code) + '</code>'));
          var tb = el('table', 'cmp'); tb.innerHTML = '<tr><th>Step</th><th>What happens</th><th>Why</th></tr>' + ex.steps.map(function (s) { return '<tr><td>' + s[0] + '</td><td>' + s[1] + '</td><td>' + s[2] + '</td></tr>'; }).join('');
          w.appendChild(tb);
          if (ex.takeaway) w.appendChild(el('div', 'mq-fb ok', '<b>Reusable rule:</b> ' + ex.takeaway));
          body.appendChild(w);
        } else {
          var tag = ex.kind === 'complete' ? 'You finish it' : 'You do it alone';
          var wrap = el('div'); wrap.appendChild(el('div', 'mq-sub', tag));
          wrap.appendChild(M.renderItem(ex.item, {}).node); body.appendChild(wrap);
        }
      });
    }
    var due = M.dueCards(u, 0);
    var row = el('div', 'mq-actions');
    var p = el('button', 'mq-btn', 'Practice this unit →'); p.onclick = function () { go('practice', { unit: u.id, topic: null }); };
    var cb = el('button', 'mq-btn ghost', 'Recall cards (' + u.cards.length + ')'); cb.onclick = function () { go('cards', { cardsUnit: u.id }); };
    row.appendChild(p); row.appendChild(cb); body.appendChild(row);
  }

  /* ============================================================ PRACTICE */
  function viewPractice() {
    body.appendChild(unitChips(ui.unit, function (id) { ui.unit = id; ui.topic = null; ui.tier = 0; render(); }));
    var u = unitOf();
    var segs = el('div', 'mq-segs');
    u.tiers.forEach(function (t, ti) {
      var s = M.tierStats(u, ti), open = M.tierOpen(u, ti);
      var seg = el('button', 'mq-seg' + (open ? '' : ' locked') + (!ui.topic && ui.tier === ti ? ' on' : '') + (s.n === 0 ? ' empty' : '')); seg.type = 'button';
      seg.innerHTML = '<span class="mq-seg-n">' + (ti + 1) + '</span><span class="mq-seg-t">' + esc(t.name) + '</span><span class="mq-seg-c">' + (s.n === 0 ? '—' : open ? s.m + '/' + s.n : '🔒') + '</span>' + bar(s.n ? Math.round(s.m / s.n * 100) : 0);
      seg.onclick = function () { ui.tier = ti; ui.topic = null; render(); };
      segs.appendChild(seg);
    });
    body.appendChild(segs);

    var main = el('div', 'mq-main'); body.appendChild(main);
    var due = M.dueItems(u).length;
    if (ui.topic) {
      main.appendChild(el('h3', 'mq-h', 'Topic drill: ' + esc(ui.topic)));
      var cl = el('button', 'mq-link', 'Clear filter'); cl.onclick = function () { ui.topic = null; render(); }; main.appendChild(cl);
      u.items.filter(function (i) { return i.topic === ui.topic; }).forEach(function (i) { main.appendChild(M.renderItem(i, { onChange: refresh }).node); });
    } else {
      var t = u.tiers[ui.tier];
      main.appendChild(el('h3', 'mq-h', 'Tier ' + (ui.tier + 1) + ' · ' + t.name));
      main.appendChild(el('p', 'mq-blurb', t.blurb));
      if (!t.items.length) main.appendChild(el('div', 'mq-lock', 'No questions in this tier for this unit yet.'));
      else if (!M.tierOpen(u, ui.tier)) {
        var prev = ui.tier - 1; while (prev > 0 && !u.tiers[prev].items.length) prev--;
        var ps = M.tierStats(u, prev);
        main.appendChild(el('div', 'mq-lock', '🔒 Locked. Master ' + Math.ceil(M.UNLOCK * ps.n) + ' of ' + ps.n + ' items in Tier ' + (prev + 1) + ' first (you have ' + ps.m + '). Mastered means answered correctly, even after retries.'));
      } else t.items.forEach(function (i) { main.appendChild(M.renderItem(i, { onChange: refresh }).node); });
      /* next tier link */
      var nx = ui.tier + 1; while (nx < u.tiers.length && !u.tiers[nx].items.length) nx++;
      if (nx < u.tiers.length && t.items.length && M.tierOpen(u, nx)) { var nb = el('button', 'mq-btn', 'Next: Tier ' + (nx + 1) + ' →'); nb.onclick = function () { ui.tier = nx; render(); window.scrollTo({ top: 0 }); }; main.appendChild(nb); }
    }
    var foot = el('div', 'mq-foot');
    var rv = el('button', 'mq-link', 'Review queue for this unit (' + due + ')'); rv.onclick = function () { ui.review = true; startUnitReview(u); };
    var unl = el('button', 'mq-link', S().unlockAll ? 'Re-lock tiers' : 'Unlock all tiers'); unl.onclick = function () { S().unlockAll = !S().unlockAll; M.save(); render(); };
    var rst = el('button', 'mq-link', 'Reset this unit’s progress'); rst.onclick = function () { if (confirm('Erase mastery progress for this unit?')) { u.items.forEach(function (i) { delete S().items[i.id]; }); M.save(); render(); } };
    foot.appendChild(rv); foot.appendChild(unl); foot.appendChild(rst); body.appendChild(foot);
    function refresh() { /* summary strip only; keeps typed answers */
      var bars = segs.querySelectorAll('.mq-seg');
      u.tiers.forEach(function (t2, ti) { var s = M.tierStats(u, ti), open = M.tierOpen(u, ti), sg = bars[ti]; sg.classList.toggle('locked', !open); sg.querySelector('.mq-seg-c').textContent = s.n === 0 ? '—' : open ? s.m + '/' + s.n : '🔒'; sg.querySelector('.mq-seg-bar i').style.width = (s.n ? Math.round(s.m / s.n * 100) : 0) + '%'; });
    }
  }
  function startUnitReview(u) {
    var items = M.dueItems(u);
    ui.session = { entries: items.map(function (i) { return { kind: 'item', i: i }; }), at: 0, ok: 0 };
    go('session');
  }

  /* ============================================================ CARDS */
  function viewCards() {
    body.appendChild(unitChips(ui.cardsUnit, function (id) { ui.cardsUnit = id; render(); }, true));
    var u = ui.cardsUnit ? M.byId[ui.cardsUnit] : null;
    var cd = M.dueCards(u, null);
    var queue = shuffle(cd.due).concat(cd.fresh);
    var total = (u ? u.cards : M.units.reduce(function (a, x) { return a.concat(x.cards); }, []));
    var learned = total.filter(function (c) { return M.cardState(c).box >= 3; }).length;
    var sum = el('div', 'mq-summary'); sum.innerHTML = '<span class="mq-stat"><b>' + queue.length + '</b> to do now</span><span class="mq-stat"><b>' + cd.fresh.length + '</b> new</span><span class="mq-stat"><b>' + learned + '</b> / ' + total.length + ' well learned</span>';
    body.appendChild(sum);
    var stage = el('div', 'mq-cardstage'); body.appendChild(stage);
    function show() {
      stage.innerHTML = '';
      if (!queue.length) {
        var nxt = total.map(function (c) { return M.cardState(c).due; }).sort(function (a, b) { return a - b; })[0];
        stage.appendChild(el('div', 'mq-lock', 'All caught up. ' + (nxt ? 'Next card is due ' + M.when(nxt) + '. ' : '') + 'Waiting is part of how it sticks.'));
        var re = el('button', 'mq-btn ghost', 'Practice all anyway'); re.onclick = function () { queue = shuffle(total); show(); }; stage.appendChild(re); return;
      }
      var c = queue[0];
      stage.appendChild(cardUI(c, function (q) { var cur = queue.shift(); if (q === 0) queue.push(cur); show(); }, !u));
    }
    show();
  }

  /* ============================================================ EXAM */
  var EXAM_SKIP = { free: 1, explain: 1 };
  function viewExam() {
    body.appendChild(el('h3', 'mq-h', 'Exam simulation'));
    body.appendChild(el('p', 'mq-blurb', 'Interleaved questions from the units you pick, timed, no feedback until you submit. Real exams mix topics and levels, and nothing tells you which idea to use. Practicing that is what trains the "which tool?" decision. It skews toward trace, debug and integrate questions, like exam problems.'));
    var form = el('div', 'mq-card');
    var picks = {}; var unitsRow = el('div', 'mq-chips');
    M.units.forEach(function (u) {
      if (!u.items.some(function (i) { return !EXAM_SKIP[i.type]; })) return;
      picks[u.id] = true; var b = el('button', 'mq-chip on', esc(u.short)); b.type = 'button';
      b.onclick = function () { picks[u.id] = !picks[u.id]; b.classList.toggle('on', picks[u.id]); };
      unitsRow.appendChild(b);
    });
    form.appendChild(el('div', 'mq-sub', 'Units to include')); form.appendChild(unitsRow);
    var sizeSel = el('select'); [5, 8, 12, 20].forEach(function (n) { var o = el('option', '', n + ' questions'); o.value = n; if (n === 8) o.selected = true; sizeSel.appendChild(o); });
    var minSel = el('select'); [['auto', 'Time: 3 min per question'], ['30', 'Time: 30 min'], ['50', 'Time: 50 min (quiz length)'], ['0', 'Untimed']].forEach(function (x) { var o = el('option', '', x[1]); o.value = x[0]; minSel.appendChild(o); });
    var r = el('div', 'mq-actions'); r.appendChild(sizeSel); r.appendChild(minSel); form.appendChild(r);
    var start = el('button', 'mq-btn', 'Start exam'); form.appendChild(start); body.appendChild(form);
    var run = el('div'); body.appendChild(run);

    start.onclick = function () {
      var pool = [];
      M.units.forEach(function (u) { if (picks[u.id]) u.items.forEach(function (i) { if (!EXAM_SKIP[i.type]) pool.push(i); }); });
      if (!pool.length) return;
      var W = [1, 3, 3, 4, 2];
      var weighted = pool.map(function (i) { var s = S().items[i.id]; return { i: i, w: (W[i._tier] || 1) * (s && s.mastered ? 1 : 1.5) * (0.5 + Math.random()) }; })
        .sort(function (a, b) { return b.w - a.w; });
      var size = Math.min(+sizeSel.value, weighted.length), picked = shuffle(weighted.slice(0, size).map(function (x) { return x.i; }));
      var mins = minSel.value === 'auto' ? size * 3 : +minSel.value;
      form.style.display = 'none'; run.innerHTML = '';
      var hd = el('div', 'mq-examhead'), clock = el('span', 'mq-clock', mins ? mins + ':00' : 'Untimed'), sub = el('button', 'mq-btn', 'Submit exam');
      hd.appendChild(el('span', '', size + ' questions')); hd.appendChild(clock); hd.appendChild(sub); run.appendChild(hd);
      var rendered = picked.map(function (it, n) {
        var rr = M.renderItem(it, { exam: true, showUnit: false }); rr.node.insertBefore(el('div', 'mq-qn', 'Question ' + (n + 1)), rr.node.firstChild);
        run.appendChild(rr.node); return { it: it, r: rr };
      });
      var left = mins * 60, started = now(), submitted = false;
      function tick() { if (!mins) return; var m = Math.floor(left / 60), s = left % 60; clock.textContent = m + ':' + (s < 10 ? '0' : '') + s; if (left-- <= 0) finish(); }
      if (mins) { examTimer = setInterval(tick, 1000); tick(); }
      function finish() {
        if (submitted) return; submitted = true; if (examTimer) { clearInterval(examTimer); examTimer = null; } sub.disabled = true;
        var ok = 0, byU = {}, byT = {};
        rendered.forEach(function (x) {
          var g = x.r.gradeSilently(), good = !!g.ok; if (good) ok++;
          var uu = x.it._unit, tt = x.it._tier; byU[uu] = byU[uu] || { ok: 0, n: 0 }; byT[tt] = byT[tt] || { ok: 0, n: 0 };
          byU[uu].n++; byT[tt].n++; if (good) { byU[uu].ok++; byT[tt].ok++; }
          M.record(x.it, good, good, '', false);
          x.r.node.classList.add(good ? 'exam-ok' : 'exam-bad');
          if (!good) x.r.revealInto('<b>Missed.</b> ' + (x.it.why || '') + '<br><i>Queued for review.</i>');
        });
        var used = Math.round((now() - started) / 60000);
        var res = el('div', 'mq-result');
        res.innerHTML = '<div class="mq-score">' + ok + ' / ' + size + '</div><div>' + Math.round(ok / size * 100) + '% · ' + used + ' min used</div>' +
          '<div class="mq-sub">By unit</div>' + Object.keys(byU).map(function (k) { var u = M.byId[k]; return '<div>' + esc(u ? u.short : k) + ': ' + byU[k].ok + '/' + byU[k].n + '</div>'; }).join('') +
          '<div class="mq-sub">By tier</div>' + Object.keys(byT).sort().map(function (k) { return '<div>Tier ' + (+k + 1) + ' ' + esc(M.TIER_INFO[M.TIER_KEYS[k]][0]) + ': ' + byT[k].ok + '/' + byT[k].n + '</div>'; }).join('') +
          '<p class="mq-blurb">If lower tiers are solid but Integrate fails, the gap is combining ideas, not knowing them. Misses are in tomorrow’s session.</p>';
        run.insertBefore(res, hd.nextSibling); window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      sub.onclick = finish;
    };
  }

  /* ============================================================ TUTOR (AI) */
  var chat = [], teachSel = '', teachHist = [];
  function viewTutor() {
    var C = window.MASTERY_COURSE || {};
    var setup = el('div', 'mq-card');
    setup.innerHTML = '<div class="mq-sub">AI connection</div>';
    var st = el('div', 'mq-note'); setup.appendChild(st);
    var row = el('div', 'mq-actions'), inp = el('input', 'mq-in wide'); inp.type = 'password'; inp.placeholder = 'Access code'; inp.value = AI.code(); inp.autocomplete = 'off';
    var save = el('button', 'mq-btn', 'Save & check'), clr = el('button', 'mq-btn ghost', 'Forget');
    row.appendChild(inp); row.appendChild(save); row.appendChild(clr); setup.appendChild(row);
    var meter = el('div', 'mq-meter'); setup.appendChild(meter);
    setup.appendChild(el('div', 'mq-note', 'Runs on Claude Haiku. A monthly budget cap is enforced on the server, so cost cannot run away. The access code is whatever you set as STUDY_ACCESS_CODE in Netlify; it is stored only in this browser.'));
    body.appendChild(setup);

    function paintMeter() {
      var b = AI.budget;
      if (!b) { meter.innerHTML = ''; return; }
      var pct = Math.min(100, Math.round(b.spent / b.cap * 100));
      meter.innerHTML = '<div class="mq-sub">AI budget this month: $' + b.spent.toFixed(3) + ' of $' + b.cap.toFixed(2) + '</div>' + bar(pct);
    }
    function check() {
      if (!AI.code()) { st.textContent = 'Not connected. Enter your access code to enable the AI features. Everything else works without it.'; return; }
      st.textContent = 'Checking…';
      AI.call('status', {}).then(function () { st.textContent = 'Connected.'; paintMeter(); }).catch(function (e) { st.textContent = AI.errorText(e); });
    }
    save.onclick = function () { AI.setCode(inp.value.trim()); check(); };
    clr.onclick = function () { AI.setCode(''); inp.value = ''; AI.budget = null; paintMeter(); check(); };
    check(); paintMeter();

    var modes = [['ask', 'Ask the tutor'], ['teach', 'Teach it back'], ['variants', 'Practice variants']];
    ui.tutorMode = ui.tutorMode || 'ask';
    var mrow = el('div', 'mq-nav sub');
    modes.forEach(function (m) { var b = el('button', 'mq-navb' + (ui.tutorMode === m[0] ? ' on' : ''), m[1]); b.onclick = function () { ui.tutorMode = m[0]; render(); }; mrow.appendChild(b); });
    body.appendChild(mrow);
    var area = el('div'); body.appendChild(area);
    ({ ask: tutorAsk, teach: tutorTeach, variants: tutorVariants })[ui.tutorMode](area, paintMeter);
  }

  function needAI(area) {
    if (AI.ready()) return false;
    area.appendChild(el('div', 'mq-lock', 'Enter your access code above to use this. (Not set up yet? See courses/COMP211/mastery/README.md.)'));
    return true;
  }

  function tutorAsk(area, paintMeter) {
    area.appendChild(el('p', 'mq-blurb', 'A Socratic tutor grounded in this guide’s lessons. It asks guiding questions and gives hints rather than just answers. Tell it what you understand and where you are stuck, and say if you want a full worked solution.'));
    var log = el('div', 'mq-chat'); area.appendChild(log);
    function paint() {
      log.innerHTML = '';
      if (!chat.length) log.appendChild(el('div', 'mq-note', 'Try: "I think a pointer parameter is a copy of the array. Why does arr[i]++ still change main’s array?"'));
      chat.forEach(function (m) { log.appendChild(el('div', 'mq-msg ' + m.role, M.mdLite(m.content) + (m.sources && m.sources.length ? '<div class="mq-src2">From: ' + m.sources.map(function (s) { return esc(s.title.replace(/&middot;/g, '·')); }).join(' · ') + '</div>' : ''))); });
      log.scrollTop = log.scrollHeight;
    }
    paint();
    var ta = el('textarea', 'mq-ta'); ta.rows = 3; ta.placeholder = 'Ask a question… (Ctrl/Cmd+Enter to send)'; area.appendChild(ta);
    var act = el('div', 'mq-actions'), send = el('button', 'mq-btn', 'Send'), nw = el('button', 'mq-btn ghost', 'New chat'); act.appendChild(send); act.appendChild(nw); area.appendChild(act);
    function go1() {
      if (needAI(area)) return;
      var q = ta.value.trim(); if (!q) return;
      chat.push({ role: 'user', content: q }); ta.value = ''; paint(); send.disabled = true;
      var pending = el('div', 'mq-msg assistant', '…'); log.appendChild(pending);
      AI.call('tutor', { messages: chat.map(function (m) { return { role: m.role, content: m.content }; }) })
        .then(function (d) { chat.push({ role: 'assistant', content: d.reply, sources: d.sources }); paint(); paintMeter(); })
        .catch(function (e) { chat.pop(); paint(); log.appendChild(el('div', 'mq-fb no', esc(AI.errorText(e)))); ta.value = q; })
        .then(function () { send.disabled = false; });
    }
    send.onclick = go1; nw.onclick = function () { chat = []; paint(); };
    ta.onkeydown = function (e) { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) go1(); };
  }

  function tutorTeach(area, paintMeter) {
    area.appendChild(el('p', 'mq-blurb', 'Pick a concept and explain it in your own words, as if teaching a friend. The AI compares it to the key points, names what is missing (as hints, not answers) and asks a follow-up. Teaching it back is one of the most reliable ways to find out what you only half understand.'));
    var all = [];
    M.units.forEach(function (u) { u.items.forEach(function (i) { if (i.type === 'explain') all.push(i); }); });
    if (!all.length) { area.appendChild(el('div', 'mq-lock', 'No explain-it-back concepts in this course yet.')); return; }
    var sel = el('select', 'mq-sel');
    M.units.forEach(function (u) {
      var items = u.items.filter(function (i) { return i.type === 'explain'; }); if (!items.length) return;
      var g = document.createElement('optgroup'); g.label = u.short;
      items.forEach(function (i) { var o = el('option', '', M.stripHtml(i.prompt).slice(0, 90)); o.value = i.id; g.appendChild(o); });
      sel.appendChild(g);
    });
    if (teachSel) sel.value = teachSel;
    area.appendChild(sel);
    var holder = el('div'); area.appendChild(holder);
    function paint() {
      teachSel = sel.value; holder.innerHTML = '';
      var item = M.items[sel.value];
      var card = M.renderItem(item, { onAI: paintMeter, onChange: function () {} });
      holder.appendChild(card.node);
    }
    sel.onchange = paint; paint();
  }

  function tutorVariants(area, paintMeter) {
    area.appendChild(el('p', 'mq-blurb', 'Missed questions you can generate fresh variants of. Each new question is re-solved independently by a second AI pass and dropped if the answers disagree. (It is not run through a compiler, so treat the explanation as the real check.) You can also press "3 AI practice variants" right after missing a question anywhere.'));
    if (needAI(area)) return;
    var seen = {}, list = [];
    S().log.slice().reverse().forEach(function (l) { var it = M.items[l.id]; if (it && !seen[l.id] && (it.type === 'mc' || it.type === 'trace' || it.type === 'memory')) { seen[l.id] = 1; list.push(it); } });
    if (!list.length) { area.appendChild(el('div', 'mq-lock', 'No eligible misses yet. Practice a unit; questions you miss will show up here.')); return; }
    list.slice(0, 8).forEach(function (it) {
      var c = el('div', 'mq-card'); c.appendChild(el('div', 'mq-topic', esc((it._u && it._u.short) || '') + ' · ' + esc(it.topic || '')));
      c.appendChild(el('div', 'mq-prompt', it.prompt));
      var ex = el('div'); var b = el('button', 'mq-btn ghost', '★ 3 AI practice variants'); c.appendChild(b); c.appendChild(ex);
      b.onclick = function () {
        b.disabled = true; b.textContent = 'Generating and double-checking…';
        AI.call('variants', { item: { type: it.type, topic: it.topic, prompt: M.stripHtml(it.prompt), code: it.code, options: it.options && it.options.map(function (o) { return { t: M.stripHtml(o.t), why: M.stripHtml(o.why || '') }; }), answer: it.answer, blanks: it.blanks } })
          .then(function (d) {
            ex.innerHTML = '';
            if (!d.variants.length) { ex.appendChild(el('div', 'mq-fb no', 'No variants survived the double-check. Try again.')); b.disabled = false; b.textContent = '★ 3 AI practice variants'; return; }
            d.variants.forEach(function (v) { var g = M.sanitizeGen(v); g._u = it._u; g._unit = it._unit; g._tier = it._tier; ex.appendChild(M.renderItem(g, {}).node); });
            b.style.display = 'none'; paintMeter();
          })
          .catch(function (e) { ex.innerHTML = '<div class="mq-fb no">' + esc(AI.errorText(e)) + '</div>'; b.disabled = false; b.textContent = '★ 3 AI practice variants'; });
      };
      area.appendChild(c);
    });
  }

  M.hub = { render: render, go: go, startSession: startSession, ui: ui };
  document.addEventListener('DOMContentLoaded', mount);
})();
