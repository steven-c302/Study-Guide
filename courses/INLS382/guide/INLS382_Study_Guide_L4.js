/* ============================================================
   LESSON 4 — "Root definitions & CATWOE" (Mon Oct 12, deck L15).
   Unit: Models to Argue With. Reading: Checkland & Poulter Ch.2
   pp.40-43 (T, CATWOE, "working if"). Includes the unit cheat-sheet.
   Injects into #l4. Loaded BEFORE the shared engine.
   Items marked "not from the slides" are written for this guide.
   ============================================================ */
function mt4(id, opts, rows, keys) {
  var o = '<option value="">&mdash; choose &mdash;</option>' + opts.map(function (p) {
    return '<option value="' + p[0] + '">' + p[1] + '</option>';
  }).join('');
  return '<table class="match" id="' + id + '">' + rows.map(function (r) {
    return '<tr><td class="match-term">' + r + '</td><td><select class="match-def">' + o + '</select></td></tr>';
  }).join('') + '</table>' +
  '<button class="btn small" style="margin-top:8px" onclick="checkMatch(\'' + id + '\',\'fb-' + id + '\',' + JSON.stringify(keys).replace(/"/g, "'") + ')">Check</button>' +
  '<div class="fb" id="fb-' + id + '"></div>';
}

document.getElementById('l4').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l4-t')">T Changes One Entity</button>
  <button onclick="showTopic(this,'l4-catwoe')">CATWOE on the Bus</button>
  <button onclick="showTopic(this,'l4-cards')">Writing the Card</button>
  <button onclick="showTopic(this,'l4-steelman')">Declaring a Worldview</button>
  <button onclick="showTopic(this,'l4-cheat')">Unit Cheat-Sheet</button>
  <button onclick="showTopic(this,'l4-check')">Self-Check</button>
</nav>
<main>

<!-- ============ T ============ -->
<section class="topic active" id="l4-t">
  <h2>Lesson 4 &middot; T Changes One Entity</h2>
  <p class="muted">Mon Oct 12 &middot; Ch.2 pp.40&ndash;41.</p>

  <div class="concept"><b>T (transformation): an entity &rarr; the same entity, changed.</b><br>
  &bull; A fence &rarr; a painted fence<br>
  &bull; The health-care needs of Coketown citizens &rarr; the health-care needs of Coketown citizens met<br>
  <b>Not:</b> one thing &rarr; a different thing (paint &rarr; a painted fence; doctors &rarr; healthy citizens).</div>

  <div class="card"><b>The test:</b> say the thing on the left. Is the thing on the right <i>the same thing, changed?</i></div>

  <h3>Pass or fail? (the deck's four items, built from the PQR thread)</h3>
  <p class="muted">The deck poses these for discussion without printing a key. The answers here apply the deck's test; check them against your skeptic's reading.</p>
  <div class="card">
    ${mt4('match-t', [['pass','Pass &mdash; same entity, changed'],['fail','Fail &mdash; a different thing']],
      ['IT resources &rarr; efficient internal communication',
       'Students at risk of graduating late &rarr; students on track to graduate on time',
       'Career events and referrals &rarr; hired candidates',
       'Research opportunities announced in three places &rarr; research opportunities announced in one place'],
      ['fail','pass','fail','pass'])}
    
  </div>

  <div class="card">
    <h3 style="margin-top:0">Practice</h3>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>"Doctors &rarr; healthy citizens" is a valid T.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. Doctors are one thing and healthy citizens are another; T must change <i>one</i> entity.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Which is a valid T (not from the slides)?</div>
      <button class="opt" data-i="0">Unread messages &rarr; the same messages, read</button>
      <button class="opt" data-i="1">A budget &rarr; a satisfied department</button>
      <button class="opt" data-i="2">Teachers &rarr; learning</button>
      <div class="fb">Only the first keeps the same entity and changes it.</div>
    </div>
  </div>
</section>

<!-- ============ CATWOE ============ -->
<section class="topic" id="l4-catwoe">
  <h2>CATWOE, on the Bus</h2>
  <p class="muted">Ch.2 pp.41&ndash;42.</p>

  <div class="card"><p><b>Root definition:</b> A system owned by the Town of Chapel Hill, with costs shared by Carrboro and the University,
  to meet students' need to get to campus without a car, by running fare-free buses, in order to get them to class without driving
  and needing somewhere to park.</p></div>

  <p>Click a letter:</p>
  <div class="lens-choices" id="cw-btns">
    <button class="active" onclick="cwShow(this,'T')">T</button>
    <button onclick="cwShow(this,'W')">W</button>
    <button onclick="cwShow(this,'A')">A</button>
    <button onclick="cwShow(this,'C')">C</button>
    <button onclick="cwShow(this,'O')">O</button>
    <button onclick="cwShow(this,'E')">E</button>
  </div>
  <div class="lens-result" id="cw-detail"></div>

  <div class="card">
    <h3 style="margin-top:0">Match each letter to its role</h3>
    ${mt4('match-cw', [['t','The change the system makes'],['w','The view that makes T worth doing'],['a','Those who carry out T'],['c','Those who benefit or are harmed'],['o','Those who could stop the system'],['e','Constraints the system takes as given']],
      ['T','W','A','C','O','E'], ['t','w','a','c','o','e'])}
  </div>

  <div class="card">
    <div class="q" data-multi="0,1">
      <div class="prompt"><span class="tag">Select all that apply</span>In the bus example, who is in C (customers)?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Students (beneficiaries)</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> Taxpayers who fund rides they never take (victims)</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> Drivers, dispatchers and mechanics</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> The roads as they are</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">C: students (beneficiaries) and taxpayers (victims). Drivers, dispatchers and mechanics are A; the roads are E.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why is O the Town, Carrboro <i>or</i> the University?</div>
      <button class="opt" data-i="0">Each of them runs the buses day to day</button>
      <button class="opt" data-i="1">Each is a beneficiary</button>
      <button class="opt" data-i="2">Any one can withdraw its share</button>
      <div class="fb">O is whoever could stop the system &mdash; here, any of the three can withdraw its share.</div>
    </div>
  </div>
</section>

<!-- ============ CARDS ============ -->
<section class="topic" id="l4-cards">
  <h2>Writing the Card</h2>
  <p class="muted">Mon Oct 12 &middot; one card per system.</p>

  <div class="two">
    <div class="card"><h3 style="margin-top:0">Front, in this order</h3>
      <ol>
        <li><b>T:</b> ___ &rarr; the same ___, changed</li>
        <li><b>W:</b> why anyone would want T</li>
        <li><b>A, C, O, E</b></li>
      </ol></div>
    <div class="card"><h3 style="margin-top:0">Back</h3>
      <ul>
        <li>The root definition as one sentence: <b>a system owned by O, to do T, by Q, in order to R</b></li>
        <li><b>Start with the &#10007; system</b>, the one nobody in the group holds</li>
        <li>The skeptic checks every T with the test <b>before anyone writes W</b></li>
        <li><b>No metaphors.</b> "Go the extra mile" cannot be modeled.</li>
      </ul></div>
  </div>

  <div class="concept"><b>What would count as this system working?</b> (Ch.2 pp.42&ndash;43) On the back of the &#10007; card, one line:
  <i>This system is working if &hellip;</i> &mdash; the bus: it is working if students get to class without a car.</div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which "working if" line fits the bus system?</div>
      <button class="opt" data-i="0">It is working if the buses look new</button>
      <button class="opt" data-i="1">It is working if students get to class without a car</button>
      <button class="opt" data-i="2">It is working if drivers go the extra mile</button>
      <div class="fb">It must follow from T and R, and be something you could check. The third is a metaphor that cannot be modeled.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>The skeptic checks every T with the test before anyone writes W.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True: that is the order on the card.</div>
    </div>
    <div class="q">
      <p>Fill in the blank: the root definition has the shape "a system owned by O, to do T, by Q, in order to
      <input type="text" class="fillblank" data-answer="R~~~r" placeholder="?">."</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>R</b> &mdash; the why.</div>
    </div>
  </div>
</section>

<!-- ============ STEELMAN ============ -->
<section class="topic" id="l4-steelman">
  <h2>Declaring a Worldview, and the Steelman</h2>
  <p class="muted">Mon Oct 12 &middot; the steelman, this week.</p>

  <div class="concept"><b>The steelman:</b> argue for a view you don't hold, so that someone who holds it would sign.</div>

  <div class="two">
    <div class="card"><h3 style="margin-top:0">Not a good declaration</h3>
      <ul><li>"AI people."</li><li>"The administration, who only care about funding."</li><li>Anyone's name.</li></ul></div>
    <div class="card"><h3 style="margin-top:0">A good declaration</h3>
      <p>"Those in university leadership who think SDIS should build its programs around AI. They would say it is for preparing every student for work that AI is already changing, and for keeping a public school useful to the state that funds it."</p></div>
  </div>
  <p>Declare <b>one you do not hold and are not sympathetic to</b>. Start from the PQR thread, or the three lines from 10/7.</p>

  <h3>The tells &mdash; each costs points</h3>
  <div class="card">
    ${mt4('match-tells', [['sq','Scare quotes'],['tb','"They believe that"'],['ei','Explaining by interest']],
      ['Leadership wants the school to be &ldquo;AI-driven.&rdquo;','They believe that AI will change every career.','Leadership backs AI because it brings in state money.'],
      ['sq','tb','ei'])}
    <p class="muted" style="margin-top:8px">Also: anything that makes a holder wince.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>What goes in the steelman (up to 1200 words)?</div>
      <button class="opt" data-i="0">A critique of the view, then your own</button>
      <button class="opt" data-i="1">A summary of the PQR thread</button>
      <button class="opt" data-i="2">Quotes from the reading about the view</button>
      <button class="opt" data-i="3">A root definition and CATWOE for the view as its holders would state it, plus one paragraph on what this view sees that yours does not</button>
      <div class="fb">Exactly those two parts.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Your readers answer by saying whether your steelman is persuasive.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. They answer: <i>"Yes, I could sign this."</i> or <i>"No. This sentence stopped me: '&hellip;'"</i></div>
    </div>
  </div>
</section>

<!-- ============ CHEAT SHEET ============ -->
<section class="topic" id="l4-cheat">
  <h2>Models to Argue With &middot; Cheat-Sheet</h2>
  <p class="muted">Unit so far: Oct 5, Oct 7, Oct 12.</p>

  <h3>Glossary</h3>
  <div class="card"><table class="cmp">
    <tr><th>Term</th><th>Meaning</th><th>Source</th></tr>
    <tr><td>Data / capta</td><td>Facts about the world; the subset we have an interest in knowing</td><td>Ch.4 p.112</td></tr>
    <tr><td>Information</td><td>Capta given meaning by a human in context; "no machine operations can do that"</td><td>Ch.4 p.113</td></tr>
    <tr><td>IS / IT</td><td>The IS supports purposeful activity; IT enables the IS</td><td>Ch.4 Fig 4.2</td></tr>
    <tr><td>Aspect</td><td>A part of the situation you attend to; not itself a system</td><td>L13</td></tr>
    <tr><td>Relevant system</td><td>One declared viewpoint on an aspect; one model, one worldview</td><td>Ch.2 p.38</td></tr>
    <tr><td>PQR</td><td>Do P (what), by Q (how), in order to achieve R (why)</td><td>Ch.2 p.39</td></tr>
    <tr><td>T</td><td>An entity changed into the same entity, changed</td><td>Ch.2 pp.40&ndash;41</td></tr>
    <tr><td>CATWOE</td><td>Customers, Actors, Transformation, Worldview, Owner, Environmental constraints</td><td>Ch.2 pp.41&ndash;42</td></tr>
    <tr><td>Root definition</td><td>A system owned by O, to do T, by Q, in order to R</td><td>L15</td></tr>
    <tr><td>Primary-task</td><td>One unit, and the system is its job</td><td>Ch.2 pp.43&ndash;44</td></tr>
    <tr><td>Issue-based</td><td>Two or more units, or none</td><td>Ch.2 pp.43&ndash;44</td></tr>
    <tr><td>&#10007; card</td><td>A worldview nobody at your table holds</td><td>L14</td></tr>
    <tr><td>Steelman</td><td>Argue for a view you don't hold so a holder would sign</td><td>L15</td></tr>
  </table></div>

  <h3>Due dates</h3>
  <div class="card"><table class="cmp">
    <tr><th>When</th><th>What</th></tr>
    <tr><td>Fri 10/9</td><td>PQR statements (group, recorder posts to Zulip #general &rsaquo; pqr statements); Iteration memo 1 (individual)</td></tr>
    <tr><td>Tue 10/13, 6 p.m.</td><td>Worldview declaration (individual), Zulip #general &rsaquo; steelman declarations; then reply "I hold this" to any view you hold</td></tr>
    <tr><td>Wed 10/14</td><td>Arguing for a view you don't hold; recorders bring every card; you learn your readers</td></tr>
    <tr><td>Wed 10/21</td><td>Steelman exercise (individual): on the site, and by DM to your readers and the instructor</td></tr>
    <tr><td>Fri 10/23</td><td>Readers answer</td></tr>
  </table></div>
</section>

<!-- ============ CHECK ============ -->
<section class="topic" id="l4-check">
  <h2>Lesson 4 &middot; Self-Check</h2>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which T passes the test?</div>
      <button class="opt" data-i="0">Doctors &rarr; healthy citizens</button>
      <button class="opt" data-i="1">A fence &rarr; a painted fence</button>
      <button class="opt" data-i="2">Paint &rarr; a painted fence</button>
      <div class="fb">Only "a fence &rarr; a painted fence" is the same entity, changed.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>What does W hold?</div>
      <button class="opt" data-i="0">Why anyone would want T</button>
      <button class="opt" data-i="1">Who runs the system</button>
      <button class="opt" data-i="2">What the system takes as given</button>
      <div class="fb">W is the worldview that makes T worth doing; E is what is taken as given; A runs it.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>The steelman is due Wednesday 10/14.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. The declaration is due Tue 10/13 at 6 p.m.; Wed 10/14 is class practice; the steelman is due Wed 10/21.</div>
    </div>
    <div class="q" data-multi="0,2,3">
      <div class="prompt"><span class="tag">Select all that apply</span>Which are tells that cost points?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Scare quotes</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> A clear root definition</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> "They believe that"</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> Explaining the view by interest</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">Scare quotes, "They believe that," and explaining by interest &mdash; plus anything that makes a holder wince.</div>
    </div>
  </div>
</section>

</main>
`;

var cwData = {
  T: "<b>T &mdash; transformation.</b> Students' need to get to campus &rarr; that need met, without a car.",
  W: "<b>W &mdash; worldview.</b> Moving people is a better use of a town's money and space than storing their cars.",
  A: "<b>A &mdash; actors.</b> Drivers, dispatchers and mechanics at Chapel Hill Transit.",
  C: "<b>C &mdash; customers.</b> Students (beneficiaries); taxpayers who fund rides they never take (victims).",
  O: "<b>O &mdash; owner.</b> The Town, Carrboro or the University: any one can withdraw its share.",
  E: "<b>E &mdash; environmental constraints.</b> The town's budget; too little parking near campus; the roads as they are."
};
function cwShow(btn, key) {
  document.querySelectorAll('#cw-btns button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('cw-detail').innerHTML = cwData[key];
}
function initL4() {
  cwShow(document.querySelector('#cw-btns button'), 'T');
}
