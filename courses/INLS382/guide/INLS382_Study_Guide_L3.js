/* ============================================================
   LESSON 3 — "Do P, by Q, in order to achieve R" (Wed Oct 7, deck L14).
   Unit: Models to Argue With. Reading: Checkland & Poulter Ch.2 p.39
   (PQR), pp.43-44 (primary-task vs issue-based), Ch.4 p.123 (the
   nurse's system). Injects into #l3. Loaded BEFORE the shared engine.
   Practice items marked "not from the slides" are illustrations
   written for this guide.
   ============================================================ */
function mt3(id, opts, rows, keys) {
  var o = '<option value="">&mdash; choose &mdash;</option>' + opts.map(function (p) {
    return '<option value="' + p[0] + '">' + p[1] + '</option>';
  }).join('');
  return '<table class="match" id="' + id + '">' + rows.map(function (r) {
    return '<tr><td class="match-term">' + r + '</td><td><select class="match-def">' + o + '</select></td></tr>';
  }).join('') + '</table>' +
  '<button class="btn small" style="margin-top:8px" onclick="checkMatch(\'' + id + '\',\'fb-' + id + '\',' + JSON.stringify(keys).replace(/"/g, "'") + ')">Check</button>' +
  '<div class="fb" id="fb-' + id + '"></div>';
}

document.getElementById('l3').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l3-pqr')">Do P, by Q, to R</button>
  <button onclick="showTopic(this,'l3-builder')">The Nurse's System, Twice</button>
  <button onclick="showTopic(this,'l3-worldview')">The &#10007; Card</button>
  <button onclick="showTopic(this,'l3-ptib')">PT or IB? (Unit Test)</button>
  <button onclick="showTopic(this,'l3-check')">Self-Check</button>
</nav>
<main>

<!-- ============ PQR ============ -->
<section class="topic active" id="l3-pqr">
  <h2>Lesson 3 &middot; Do P, by Q, in Order to Achieve R</h2>
  <p class="muted">Wed Oct 7 &middot; Ch.2 p.39 &middot; the formula for saying what a system is, in one sentence.</p>

  <div class="concept"><b>P &mdash; what. Q &mdash; how. R &mdash; why.</b> A system statement says <i>what</i> is done, <i>how</i>
  it is done, and <i>why</i> it is worth doing. Changing Q or R gives you a different system &mdash; even if P stays the same.</div>

  <h3>The bus, from the deck</h3>
  <div class="card"><p>A system run by the Town of Chapel Hill, its costs shared with Carrboro and the University, <b>to bring
  students to campus</b> (P), <b>by running fare-free buses</b> (Q), <b>in order to get them to class without driving and
  needing somewhere to park</b> (R).</p>
  <ul>
    <li><b>The transformation is in Q:</b> fare-free buses, not simply buses. "Fare-free" is what makes this system this system.</li>
    <li><b>Q has to be a plausible how for P.</b> The deck's counter-example: "Define health-care needs, by asking patients for their views" is not
    a plausible way to do what P says.</li>
  </ul></div>

  <h3>Sort the pieces</h3>
  <div class="card">
    <p class="muted">Sentence: "To provide a bus service, by charging no fare, in order to keep cars off campus."</p>
    ${mt3('match-pqr', [['p','What is done (P)'],['q','How it is done (Q)'],['r','Why it is worth doing (R)']],
      ['to provide a bus service','by charging no fare','in order to keep cars off campus'], ['p','q','r'])}
  </div>

  <div class="card">
    <h3 style="margin-top:0">Practice</h3>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>In "Do P, by Q, in order to achieve R," which letter answers <i>how</i>?</div>
      <button class="opt" data-i="0">P</button>
      <button class="opt" data-i="1">Q</button>
      <button class="opt" data-i="2">R</button>
      <div class="fb">P is what, <b>Q is how</b>, R is why.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which of these is <i>not</i> a plausible Q for the P "provide nursing care"?</div>
      <button class="opt" data-i="0">By nurses judging and meeting each patient's needs on the ward</button>
      <button class="opt" data-i="1">By supplying the amount and quality of care set out in the contract</button>
      <button class="opt" data-i="2">By printing the hospital's annual report</button>
      <div class="fb">Q must be a plausible how for P. The first two are the deck's two versions of the nurse's system; printing a report is not a way of providing care.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>If two statements share the same P, they describe the same system.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. The nurse's two systems share P ("provide nursing care") but have different Q and R &mdash; and so different worldviews.</div>
    </div>
    <div class="q">
      <p>Fill in the blank: in the deck's bus example, the transformation is in
      <input type="text" class="fillblank" data-answer="Q~~~q" placeholder="?"> (P, Q or R).</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>Q.</b> Fare-free buses, not simply buses.</div>
    </div>
  </div>
</section>

<!-- ============ BUILDER ============ -->
<section class="topic" id="l3-builder">
  <h2>The Nurse's System, Written Twice</h2>
  <p class="muted">Built from Ch.4 p.123. Same P; Q and R change, and so does the worldview.</p>

  <div class="two">
    <div class="card"><b>System 1.</b> Do provide nursing care, by <b>nurses judging and meeting each patient's needs on the ward</b>,
    in order to contribute to <b>patients' recovery</b>.</div>
    <div class="card"><b>System 2.</b> Do provide nursing care, by <b>supplying the amount and quality of care set out in the contract</b>,
    in order to contribute to <b>meeting the hospital's contracts within budget</b>.</div>
  </div>

  <h3>Build one</h3>
  <p>P is fixed: <b>provide nursing care</b>. Pick a Q and an R.</p>
  <div class="card">
    <p><b>Q (how)</b></p>
    <div class="lens-choices" id="bq-btns">
      <button onclick="bPick(this,'bq','1')">Nurses judging and meeting each patient's needs on the ward</button>
      <button onclick="bPick(this,'bq','2')">Supplying the amount and quality of care set out in the contract</button>
    </div>
    <p><b>R (why)</b></p>
    <div class="lens-choices" id="br-btns">
      <button onclick="bPick(this,'br','1')">Patients' recovery</button>
      <button onclick="bPick(this,'br','2')">Meeting the hospital's contracts within budget</button>
    </div>
    <div class="lens-result" id="b-result">Choose a Q and an R.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What does the nurse's pair of systems show?</div>
      <button class="opt" data-i="0">One of the two is the correct model of nursing</button>
      <button class="opt" data-i="1">Changing P is the only way to get a different system</button>
      <button class="opt" data-i="2">The same P can be a different system when Q and R change, and each carries its own worldview</button>
      <div class="fb">That is the deck's point: "Same P. Q and R change, and so does the worldview."</div>
    </div>
  </div>
</section>

<!-- ============ WORLDVIEW ============ -->
<section class="topic" id="l3-worldview">
  <h2>A Worldview Nobody at Your Table Holds</h2>
  <p class="muted">The &#10007; card &middot; Wed Oct 7 slides.</p>

  <div class="concept">Across your three systems, <b>at least one</b> must be a view <b>nobody at your table holds</b> &mdash; but
  somebody in the situation does. On the card's corner you mark it <b>&#10007;</b>.</div>
  <div class="card">
    <ul>
      <li><b>Name the position.</b> Not a person, and not "people who disagree with us."</li>
      <li><b>Write it so that whoever holds it would sign it.</b></li>
      <li>The deck's test case, from Monday's board: <i>"a system that cuts out advising and puts onus on students."</i> Ask: <b>is that how the people who hold it would say it?</b></li>
    </ul>
  </div>

  <h3>Would a holder sign it?</h3>
  <p class="muted">Practice items below are not from the slides; they are written for this guide.</p>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which is the better way to name a position for the &#10007; card?</div>
      <button class="opt" data-i="0">The people who disagree with us</button>
      <button class="opt" data-i="1">Those in the school's leadership who think students should plan their own paths, and who would say that is how they become independent</button>
      <button class="opt" data-i="2">The dean</button>
      <div class="fb">A position is named by what it holds and why someone would hold it &mdash; not by a person ("the dean") and not by "people who disagree with us."</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>The deck's board item reads "a system that cuts out advising and puts onus on students." What does the deck ask you to check?</div>
      <button class="opt" data-i="0">Whether that is how the people who hold the view would say it</button>
      <button class="opt" data-i="1">Whether the view is correct</button>
      <button class="opt" data-i="2">Whether someone at your table could be blamed for it</button>
      <div class="fb">"Is that how the people who hold it would say it?" The test is whether a holder would sign the wording.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A &#10007; card should describe a view that at least one person at your table holds.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. &#10007; marks a worldview <b>nobody at your table</b> holds.</div>
    </div>
  </div>
</section>

<!-- ============ PT / IB ============ -->
<section class="topic" id="l3-ptib">
  <h2>Primary-Task or Issue-Based? The Unit Test</h2>
  <p class="muted">Ch.2 pp.43&ndash;44 &middot; the test from the Oct 7 deck.</p>

  <div class="concept"><b>Name the unit whose job this system would be.</b><br>
  &bull; <b>One unit, and the system is its job &rarr; primary-task.</b><br>
  &bull; <b>Two or more units, or none &rarr; issue-based.</b><br>
  <i>Neither kind is better. Friday needs one of each.</i></div>

  <h3>From Monday's board (the deck's two examples)</h3>
  <div class="card"><ul>
    <li>"a system to better improve servers for internal comms"</li>
    <li>"a system that keeps history &amp; identity of SILS within SDIS"</li>
  </ul><p class="muted">The deck leaves these for your table to classify with the unit test. Try the items below, which use the same test on invented systems (not from the slides).</p></div>

  <div class="card">
    <h3 style="margin-top:0">Classify (illustrations, not from the slides)</h3>
    ${mt3('match-ptib3', [['pt','Primary-task'],['ib','Issue-based']],
      ['A system that runs the IT help desk for one department (it is that unit\'s job)',
       'A system that makes students feel they belong in the school (no single unit\'s job)',
       'A system that coordinates the library and the advising office to reduce late graduation (two units)'],
      ['pt','ib','ib'])}
  </div>

  <div class="card">
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>If no single unit's job is the system, it is issue-based.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">"Two or more units, or none &rarr; issue-based."</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>The deck's reminder about the two kinds:</div>
      <button class="opt" data-i="0">Primary-task is better because it has an owner</button>
      <button class="opt" data-i="1">Neither kind is better; Friday needs one of each</button>
      <button class="opt" data-i="2">Issue-based systems should be avoided</button>
      <div class="fb">"Neither kind is better. Friday needs one of each."</div>
    </div>
  </div>

  <h3>What do your systems disagree about?</h3>
  <div class="card">
    <p>One card per group, two lines:</p>
    <ol>
      <li>Line 1: <i>Our systems disagree about whether &hellip; or &hellip;</i></li>
      <li>Line 2: which two of our cards.</li>
    </ol>
    <p>The disagreement is about <b>what the school is for, or who it is for</b> &mdash; not about your aspect. Someone in another group should be able to say: <i>ours too</i>.</p>
  </div>
</section>

<!-- ============ CHECK ============ -->
<section class="topic" id="l3-check">
  <h2>Lesson 3 &middot; Self-Check</h2>
  <div class="card">
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>Which rule applies across your <b>three</b> cards (before 2:10)?</div>
      <button class="opt" data-i="0">All three must be primary-task</button>
      <button class="opt" data-i="1">All three may be praised by the same people for the same reasons</button>
      <button class="opt" data-i="2">At least one must be a view the skeptic holds</button>
      <button class="opt" data-i="3">At least one &#10007;, and at least one PT and one IB</button>
      <div class="fb">At least one &#10007;, at least one PT and one IB. And two cards praised by the same people for the same reasons are one system &mdash; choose again.</div>
    </div>
    <div class="q" data-multi="0,2">
      <div class="prompt"><span class="tag">Select all that apply</span>Which belong on each system's card?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Do P</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> The group member who wrote it</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> Who would think this worth doing, and what they would say it is for (the worldview)</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> A final grade</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">The card has: Do P; by Q; in order to contribute to achieving R; and the worldview. In the corner: PT or IB and the unit(s) involved, and &#10007; if nobody at your table holds it.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>The PQR statements are due Friday 10/9 as one message from each group's skeptic.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. Due Fri 10/9: one message per group, headed with your group number and aspect, posted by the <b>recorder</b> to Zulip, #general &rsaquo; pqr statements. The iteration memo is also due Fri 10/9 (individual).</div>
    </div>
  </div>
</section>

</main>
`;

var bSel = { bq: null, br: null };
function bPick(btn, which, val) {
  document.querySelectorAll('#' + which + '-btns button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  bSel[which] = val;
  var Q = { '1': "nurses judging and meeting each patient's needs on the ward", '2': 'supplying the amount and quality of care set out in the contract' };
  var R = { '1': "patients' recovery", '2': "meeting the hospital's contracts within budget" };
  var out = document.getElementById('b-result');
  if (!bSel.bq || !bSel.br) { out.innerHTML = 'Choose a Q and an R.'; return; }
  var line = '<b>Do provide nursing care, by ' + Q[bSel.bq] + ', in order to contribute to ' + R[bSel.br] + '.</b>';
  if (bSel.bq === bSel.br) {
    out.innerHTML = line + '<br>This pair hangs together: it is System ' + bSel.bq + ' from the deck (Ch.4 p.123).';
  } else {
    out.innerHTML = line + '<br><span class="muted">This mixed pair is not one of the deck\'s two systems. Ask whether the people who value that how would also name that why &mdash; if not, the statement may blur two worldviews.</span>';
  }
}
function initL3() {}
