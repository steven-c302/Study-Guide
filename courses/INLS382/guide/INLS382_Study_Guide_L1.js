/* ============================================================
   LESSON 1 — "What a rich picture is and isn't."
   Reading: Checkland & Poulter, Learning for Action (2006) —
   Preface/Preamble (xvii) and Ch.1 "A Skeleton Account of SSM"
   (pp.3-22). Injects into #l1. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal below
   must be written \\ .
   ============================================================ */
document.getElementById('l1').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l1-situations')">Problematical Situations</button>
  <button onclick="showTopic(this,'l1-worldview')">Worldview &amp; Systems Ideas</button>
  <button onclick="showTopic(this,'l1-models')">Models &amp; the Learning Cycle</button>
  <button onclick="showTopic(this,'l1-hardsoft')">Hard vs. Soft Systems</button>
  <button onclick="showTopic(this,'l1-richpicture')">Rich Pictures &mdash; Preview</button>
  <button onclick="showTopic(this,'l1-check')">Self-Check</button>
</nav>
<main>

<!-- ============ PROBLEMATICAL SITUATIONS ============ -->
<section class="topic active" id="l1-situations">
  <h2>Lesson 1 &middot; "Problematical Situations," Not "Problems"</h2>

  <div class="concept">Checkland and Poulter deliberately avoid the word <b>"problem."</b> A problem implies a
  well-defined thing that can be <b>solved</b> out of existence. Real situations in organizations and everyday
  life are messier than that &mdash; so SSM calls them <b>"problematical situations": </b> situations about which
  someone has the feeling that "something needs to be done about this."</div>

  <div class="card">
    <h3 style="margin-top:0">The reading's own examples</h3>
    <table class="cmp">
      <tr><th>Situation</th><th>Why it isn't a clean "problem"</th></tr>
      <tr><td>A company wonders whether to bid for a smaller rival's equity</td><td>No obviously "correct" answer &mdash; it depends on judgment, risk appetite, and whose interests count</td></tr>
      <tr><td>A university's intake is biased toward middle-class students</td><td>"Fixing" it raises further open questions about what changing it would actually involve</td></tr>
      <tr><td>A government wants security from terrorism without losing civil liberties</td><td>The two goals trade off against each other; there's no single correct balance</td></tr>
      <tr><td>A local council's services aren't "citizen-friendly"</td><td>"Citizen-friendly" itself means different things to different people</td></tr>
      <tr><td>A head teacher decides whether the school or the local authority should run school meals</td><td>Depends on who benefits from a surplus and how much control matters</td></tr>
    </table>
    <p class="muted">Notice what all five have in common: each could be tackled by "appealing to previous
    experience; intuitively; by randomly thrashing about... by responding emotionally" &mdash; or by using a
    genuine method of inquiry. SSM is that method.</p>
  </div>

  <div class="warn"><b>Common misreading.</b> "Problematical situation" is not just a softer synonym for
  "problem." The whole point of the word choice is to keep open the possibility that there is <i>no single
  correct fix</i> &mdash; only a situation that different people, with different criteria, experience differently.
  If you find yourself asking "what's the solution to this problematical situation," you've slipped back into
  hard-systems thinking without noticing.</div>

  <div class="card">
    <h3 style="margin-top:0">What "everyday life" actually looks like, per the reading</h3>
    <p>We experience life as an "onrushing turbulent stream, a flux of happenings, ideas, emotions, actions, all
    mediated through the slippery agency of language, all continually changing." <b>Nothing is intrinsically "a
    situation"</b> &mdash; it is our own perceptions that carve a "situation" out of that flux, and in doing so we
    already know its boundaries and content will keep changing.</p>
    <div class="concept">This is why SSM is a <b>flexible process</b>, not a fixed technique or a sequence of
    steps you could hand to a robot. Checkland calls it a <b>methodology</b> rather than a <i>method</i>
    precisely because "the human world is one in which nothing ever happens twice, not in exactly the same
    way" &mdash; a methodology is a set of principles adapted to each unique situation, not a recipe.</div>
  </div>
</section>

<!-- ============ WORLDVIEW & SYSTEMS IDEAS ============ -->
<section class="topic" id="l1-worldview">
  <h2>Lesson 1 &middot; Worldview and the Core Systems Ideas</h2>

  <div class="concept">To judge anything as "good" or "bad," you need <b>criteria</b>. Different people's
  criteria come from different genetic makeup and, above all, different life experience &mdash; and over time
  those criteria firm up into a relatively stable outlook, a <b>worldview</b> (German <i>Weltanschauung</i>),
  through which a person perceives the world. The book calls worldview <b>"the most important concept in
  understanding the complexity of human situations, and indeed, the nature and form of SSM."</b></div>

  <div class="card">
    <h3 style="margin-top:0">Worldview lens: same facts, different verdict</h3>
    <p class="muted">Pick a scenario, then try each worldview on it. Nothing about the underlying facts
    changes &mdash; only the criteria used to judge them.</p>
    <div class="toolbar">
      <label class="muted">Scenario:</label>
      <select id="wv-scenario" onchange="wvRender()">
        <option value="econ">Economic activity (the reading's example)</option>
        <option value="prison">A prison's daily routine (the reading's example)</option>
        <option value="conflict">An armed group attacks a government facility (the reading's example)</option>
      </select>
    </div>
    <div class="lens-scenario" id="wv-label"></div>
    <div class="lens-choices" id="wv-choices"></div>
    <div class="lens-result" id="wv-result">Choose a worldview above.</div>
  </div>

  <div class="warn"><b>What this does <i>not</i> mean.</b> Neither observer is "factually wrong." Worldviews
  aren't errors to correct &mdash; they're stable, and can change over time (the book's example: "a paranoid
  person whose worldview is 'this hostile world owes me a living' might become a more integrated member of
  society as a result of experiencing love and generosity"), but they can't be argued away by pointing at facts
  both sides already agree on.</p></div>

  <h3>The four requirements of an adaptive whole (a "system")</h3>
  <div class="card">
    <p>Systems ideas are the toolkit SSM borrows &mdash; but redirected, as the next section explains. The core
    systems concept is an <b>adaptive whole</b>: something that survives through time by adapting to changes in
    its environment. Click each requirement to see what it means.</p>
    <div class="sysdia">
      <svg width="230" height="190" viewBox="0 0 230 190">
        <rect x="4" y="4" width="222" height="182" fill="none" stroke="#c2a894" stroke-width="1.2" rx="8"/>
        <text x="14" y="20" font-size="11" fill="#c2a894">E (environment)</text>
        <ellipse cx="120" cy="105" rx="88" ry="70" fill="rgba(194,65,12,.14)" stroke="#c2410c" stroke-width="2"/>
        <text x="120" y="50" font-size="14" fill="#f5ece4" text-anchor="middle" font-weight="700">S</text>
        <ellipse cx="90" cy="115" rx="30" ry="22" fill="rgba(63,183,201,.18)" stroke="#3fb7c9" stroke-width="1.5"/>
        <text x="90" y="119" font-size="11" fill="#f5ece4" text-anchor="middle">SS</text>
        <ellipse cx="150" cy="140" rx="26" ry="19" fill="rgba(63,183,201,.18)" stroke="#3fb7c9" stroke-width="1.5"/>
        <text x="150" y="144" font-size="11" fill="#f5ece4" text-anchor="middle">SS</text>
        <line x1="10" y1="60" x2="45" y2="80" stroke="#c2a894" stroke-width="1.5" marker-end="url(#arrow)"/>
        <line x1="30" y1="170" x2="70" y2="150" stroke="#c2a894" stroke-width="1.5" marker-end="url(#arrow)"/>
        <line x1="120" y1="185" x2="120" y2="165" stroke="#c2a894" stroke-width="1.5" marker-end="url(#arrow)"/>
        <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#c2a894"/></marker></defs>
      </svg>
      <div class="req-list">
        <button class="req-btn" onclick="reqShow(this,'comm')">Communication processes</button>
        <button class="req-btn" onclick="reqShow(this,'ctrl')">Control processes</button>
        <button class="req-btn" onclick="reqShow(this,'layer')">Structure in layers</button>
        <button class="req-btn" onclick="reqShow(this,'emerge')">Emergent properties</button>
        <div class="req-detail" id="req-detail">A system S receives shocks from its changing environment E (the
        arrows). Click a requirement to see why survival depends on it.</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="q" data-multi="0,2">
      <div class="prompt"><span class="tag">Select all that apply</span>Which two of these are among the four requirements Figure 1.1 lists for a system S to survive through time?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Structure in layers</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> A written objective function</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> Emergent properties</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> A single, unified worldview</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">The four are <b>communication processes, control processes, structure in layers,</b> and
      <b>emergent properties</b> &mdash; only two of which appear above. "Objective function" belongs to hard
      systems engineering, and a "single worldview" is the opposite of what SSM expects to find in a real
      situation.</div>
    </div>
  </div>
</section>

<!-- ============ MODELS & LEARNING CYCLE ============ -->
<section class="topic" id="l1-models">
  <h2>Lesson 1 &middot; Purposeful Activity Models and the Learning Cycle</h2>

  <div class="concept">Every real-world problematical situation &mdash; whether "a small firm making
  wheelbarrows" or a "multi-national oil company" &mdash; has one thing in common: it contains people trying to
  act <b>purposefully</b>, not just acting on instinct. SSM's key move is to <b>treat purposeful action itself as
  a system</b> &mdash; an adaptive whole, built the same way as Figure 1.1, with the "operations" being monitored
  against defined measures of performance so that control action can be taken.</div>

  <h3>Worked example: painting the garden fence (Fig. 1.2 &amp; 1.3)</h3>
  <div class="card">
    <p class="muted">A logically linked set of activities forms a whole whose emergent property is
    <b>purposefulness</b>. Arrows show one activity depending on another.</p>
    <div class="amodel">
      <span class="node">1. Decide the scope of the task</span><span class="arrow">&rarr;</span>
      <span class="node">2. Appraise the colour scheme of the property</span><span class="arrow">&rarr;</span>
      <span class="node">3. Decide colour to paint the fence</span><span class="arrow">&rarr;</span><br>
      <span class="node">4. Obtain paint</span>
      <span class="node">5. Obtain brush</span>
      <span class="node">6. Prepare fence for painting</span>
      <span class="arrow">&rarr;</span>
      <span class="node">7. Apply paint to fence</span><br>
      <span class="node">8. Define measures of performance</span><span class="arrow">&rarr;</span>
      <span class="node">9. Monitor activities 1&ndash;7</span><span class="arrow">&rarr;</span>
      <span class="node">10. Take control action</span>
    </div>
    <p class="muted" style="margin-top:10px">Activity 7 (apply paint) depends on 4, 5, <i>and</i> 6 all being
    done first &mdash; that's what the arrows into it mean.</p>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Whose worldview does this particular model express?</div>
      <button class="opt" data-i="0">An objective, worldview-free description of fence painting</button>
      <button class="opt" data-i="1">The householder's: "I can do useful DIY jobs to improve my property"</button>
      <button class="opt" data-i="2">The neighbour's worldview about property upkeep</button>
      <button class="opt" data-i="3">The paint manufacturer's worldview</button>
      <div class="fb">The model is built entirely within <b>the fence-painter's own worldview</b>. The book is
      explicit that other relevant worldviews exist even in a case this trivial &mdash; the neighbours' or a
      partner's &mdash; and each would require a <i>different</i> model, since a model can only ever encapsulate
      one pure worldview at a time.</div>
    </div>
  </div>

  <div class="danger"><b>The single most-missed idea in the whole reading.</b> Purposeful activity models
  <b>can never be descriptions</b> of (part of) the real world. Each one expresses only one way of looking at the
  situation, and there will always be multiple possibilities (think of the Olympics example: the IOC, the host
  city, athletes, sponsors, security staff, and a group seeking publicity for a cause could <i>each</i> need a
  different relevant model &mdash; "there could never be a single model relevant to all these different
  interests"). A model's job is to be a <b>device</b> &mdash; an intellectual tool that generates good questions
  about the real situation, not a picture of it.</div>

  <h3>The learning cycle (Fig. 1.4 &amp; 1.5)</h3>
  <div class="card">
    <p>Once you have models built from different worldviews, you use them as a <b>source of questions</b>: does
    real activity in the situation look more, or less, like the model? Should it? That comparison structures a
    real discussion/debate whose purpose is to surface different worldviews and find an <b>accommodation</b> —
    a version of the situation different people, with different worldviews, could nevertheless <b>live with</b>.
    A candidate change has to clear two bars simultaneously:</p>
    <table class="cmp">
      <tr><th>Bar</th><th>Meaning</th></tr>
      <tr><td><b>Arguably desirable</b></td><td>Justified by what using the models to question the situation revealed</td></tr>
      <tr><td><b>Culturally feasible</b></td><td>Workable for these particular people, given their particular history and politics &mdash; not a generic "best practice"</td></tr>
    </table>
    <p class="muted">The four stages, as the classic diagram (Fig. 1.5) shows them: <b>(1)</b> find out about the
    perceived real-world problematical situation, <b>(2)</b> build purposeful activity models relevant to it
    (each based on a declared worldview), <b>(3)</b> use the models to structure a discussion about change, and
    <b>(4)</b> define/take action to improve.</p>
  </div>

  <div class="warn"><b>Common misreading: the cycle is not a checklist you complete once, in order.</b> The book
  says this explicitly: describing the cycle as steps 1&ndash;4 "may give a false impression that we are
  describing a sequence of steps. Not so." In real use (Fig. 1.6), finding-out runs continuously, model-building
  happens in bursts fed by both the models and the ongoing finding-out, and discussion feeds back into more
  finding-out and more modelling. It is, in principle, <b>never-ending</b>: taking action changes the situation
  into a new one, which the cycle can address all over again.</div>

  <h3>LUMAS: how a user actually applies the methodology</h3>
  <div class="card">
    <p><b>LUMAS</b> = <b>L</b>earning for a <b>U</b>ser by a <b>M</b>ethodology-informed <b>A</b>pproach to a
    <b>S</b>ituation. Read it starting from the <b>user (U)</b> in the centre: perceiving a problematical
    situation (S) and appreciating the methodology (M), the user tailors M to S to produce a specific approach
    (A) for this situation. Using A doesn't just improve the situation &mdash; it also yields <b>learning (L)</b>,
    which can in turn modify how the user appreciates the methodology itself.</p>
    <div class="q">
      <p>Fill in the LUMAS acronym: <b>L</b>earning for a
      <input type="text" class="fillblank sm" data-answer="user" placeholder="?"> by a
      <input type="text" class="fillblank sm" data-answer="methodology" placeholder="?">-informed
      <input type="text" class="fillblank sm" data-answer="approach" placeholder="?"> to a
      <input type="text" class="fillblank sm" data-answer="situation" placeholder="?"></p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Learning for a <b>User</b> by a <b>Methodology</b>-informed <b>Approach</b> to a
      <b>Situation</b>. It is a generic model of how <i>any</i> methodology (not just SSM) gets tailored to a
      unique real situation by the person using it.</div>
    </div>
  </div>
</section>

<!-- ============ HARD VS SOFT ============ -->
<section class="topic" id="l1-hardsoft">
  <h2>Lesson 1 &middot; Hard vs. Soft Systems Thinking</h2>

  <div class="concept">SSM grew out of <b>Systems Engineering (SE)</b> &mdash; developed at Bell Telephone &mdash;
  which names a "system" (assumed to exist, or be buildable, in the real world), defines its objectives, then
  engineers it to meet them. SE was found "poverty-stricken" for human situations: "too thin, not rich enough to
  deal with fizzing social complexity." The fix was not to add more technique &mdash; it was to change where
  "systemicity" is assumed to live.</div>

  <div class="two">
    <div class="card">
      <h3 style="margin-top:0">Observer 1 &mdash; "hard"</h3>
      <p class="muted">"I spy systems which I can engineer." The world itself is taken to contain systems with
      fixed objectives. This is the stance of Systems Engineering, classical Operational Research, the Viable
      System Model, and early System Dynamics &mdash; none of which have a place for conflicting worldviews.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Observer 2 &mdash; "soft"</h3>
      <p class="muted">"I spy complexity and confusion; but I can organize exploration of it as a learning
      system." The social world itself is complex, problematical, and mysteriously shot through with clashing
      worldviews &mdash; created and recreated by people thinking, talking, and acting. What's systemic is the
      <b>process of inquiry</b>, not the world being inquired into.</p>
    </div>
  </div>

  <div class="warn"><b>Common misreading.</b> "Hard vs. soft" is <i>not</i> "quantitative vs. qualitative," and
  it isn't a value judgment about rigor. It's a question of <b>where the word "system" is allowed to attach</b>:
  to the world itself (hard), or only to the inquiry process built to make sense of the world (soft). This is
  also why casual, everyday talk of "the education system" or "the healthcare system" is a trap &mdash; SSM's
  technical sense of "system" never refers to those real-world chunks directly, only to models and the inquiry
  process.</div>

  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>In SSM, "the prison system" is itself a system in the technical sense the methodology uses.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Everyday language uses "system" loosely, to mean "a complex chunk of reality that might be
      better engineered." SSM's technical use is much narrower: systemicity belongs to the <b>models</b> (each
      built from one declared worldview) and to the <b>process of inquiry</b> &mdash; never directly to a
      real-world institution.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Hard systems thinking and soft systems thinking mainly differ over whether to use numbers.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">They differ over <b>where systemicity is located</b> &mdash; in the world (hard) or in the
      process of inquiry into the world (soft) &mdash; not over quantitative versus qualitative method.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match the stance to its belief</h3>
    <table class="match" id="match-hardsoft">
      <tr><td class="match-term">Systems Engineering (hard)</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="hard">Systems exist in the world and can be engineered to meet fixed objectives</option><option value="soft">The world is complex and contested; the inquiry process itself can be organized as a learning system</option></select></td></tr>
      <tr><td class="match-term">SSM (soft)</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="hard">Systems exist in the world and can be engineered to meet fixed objectives</option><option value="soft">The world is complex and contested; the inquiry process itself can be organized as a learning system</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-hardsoft','fb-match-hardsoft',['hard','soft'])">Check</button>
    <div class="fb" id="fb-match-hardsoft"></div>
  </div>
</section>

<!-- ============ RICH PICTURE PREVIEW ============ -->
<section class="topic" id="l1-richpicture">
  <h2>Lesson 1 &middot; What a Rich Picture Is (and Isn't) &mdash; Preview</h2>

  <div class="warn"><b>Where this fits.</b> The assigned reading for this meeting (the Preamble and Chapter 1)
  lays the conceptual groundwork &mdash; problematical situations, worldview, purposeful activity models, the
  learning cycle &mdash; but doesn't itself walk through <i>how to draw</i> a rich picture. That's a "finding
  out" technique detailed in Chapter 2, which isn't assigned yet. What follows previews the idea from the
  syllabus's own framing so today's class makes sense; expect the full technique (symbols, drawing conventions,
  worked examples) once Chapter 2 is assigned.</div>

  <div class="concept">The course's own framing: <b>"Human situations are complex because they always involve
  multiple interacting relationships. A picture shows those relations all at once, which a paragraph can only
  deliver one after another: that is the whole argument for drawing one."</b></div>

  <div class="card">
    <h3 style="margin-top:0">What a rich picture is</h3>
    <ul class="muted" style="line-height:1.9">
      <li>A way of capturing a problematical situation's <b>structure</b> (roles, physical layout, reporting
      lines) and <b>process</b> (what actually happens, who does what) together, at a glance.</li>
      <li>A "finding out" device — it belongs to stage (1) of the learning cycle, before any purposeful
      activity model gets built.</li>
      <li>Meant to surface tensions, concerns, and multiple worldviews simultaneously — exactly the kind of
      thing a paragraph of prose has to present one sentence at a time, losing the "all at once" quality that
      makes interacting relationships visible.</li>
    </ul>
    <h3>What it is <i>not</i></h3>
    <table class="cmp">
      <tr><th>Not this</th><th>Why not</th></tr>
      <tr><td>A flowchart</td><td>A flowchart shows a sequence of steps toward one outcome; a rich picture shows many relationships coexisting, with no single "flow"</td></tr>
      <tr><td>An org chart</td><td>An org chart shows only formal reporting lines; a rich picture also shows informal tensions, physical realities, and concerns an org chart can't represent</td></tr>
      <tr><td>Judged as art</td><td>Its purpose is to communicate structure and process to the people in the situation, not to be aesthetically impressive</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which best describes why Checkland &amp; Poulter's tradition uses a picture rather than a paragraph to capture a problematical situation?</div>
      <button class="opt" data-i="0">Pictures are quicker to draw than paragraphs</button>
      <button class="opt" data-i="1">A picture looks more professional in a report</button>
      <button class="opt" data-i="2">A picture can show multiple interacting relationships all at once, where prose can only present them one after another</button>
      <button class="opt" data-i="3">A picture avoids the need to talk to people in the situation</button>
      <div class="fb">The stated argument is entirely about <b>simultaneity</b>: complex human situations always
      involve multiple interacting relationships, and only a picture can show them together rather than
      one-after-another the way sentences must.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A rich picture is essentially a flowchart of the main process in a situation.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">The course materials explicitly rule this out: a rich picture is <b>"not a flowchart, not
      an org chart, and not judged as art."</b> A flowchart's sequential, single-outcome shape is exactly what a
      rich picture is meant to avoid.</div>
    </div>
  </div>
</section>

<!-- ============ SELF-CHECK ============ -->
<section class="topic" id="l1-check">
  <h2>Lesson 1 &middot; Self-Check</h2>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does Checkland avoid the word "problem" in favor of "problematical situation"?</div>
      <button class="opt" data-i="0">"Problem" sounds too negative for a business audience</button>
      <button class="opt" data-i="1">"Problem" implies a well-defined thing that can be solved out of existence; real situations are messier</button>
      <button class="opt" data-i="2">"Problematical situation" is simply the British spelling</button>
      <button class="opt" data-i="3">Clients respond better to softer language</button>
      <div class="fb">"Problem" implies "solution," which eliminates the problem for ever &mdash; and "real life
      is more complex than that." A problematical situation is something people feel needs improving, with no
      guarantee of one clean fix.</div>
    </div>

    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the single most important concept for understanding SSM, per the reading?</div>
      <button class="opt" data-i="0">Worldview (Weltanschauung)</button>
      <button class="opt" data-i="1">Emergent properties</button>
      <button class="opt" data-i="2">Feasibility studies</button>
      <button class="opt" data-i="3">Return on investment</button>
      <div class="fb">The text calls worldview "the most important concept in understanding the complexity of
      human situations, and indeed, the nature and form of SSM" &mdash; it's what makes multiple, conflicting,
      equally legitimate judgments of the same situation possible.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A purposeful activity model is meant to be an accurate description of what actually happens in the real-world situation.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Purposeful activity models "can never be descriptions" of the real world. Each one
      expresses a single pure worldview and functions as a <b>device</b> to generate questions &mdash; comparing
      model to reality is the point, not mistaking one for the other.</div>
    </div>

    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>SSM's four-stage learning cycle is, in principle, never-ending.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Taking action to improve a situation changes that situation into a new one, which the
      cycle could in principle address all over again &mdash; "the changing flux of everyday life will itself
      bring new events and new ideas, so that no human situation could ever be rendered static."</div>
    </div>

    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>An SSM study finds a change that is "desirable" but not "culturally feasible" for the people involved. What should happen?</div>
      <button class="opt" data-i="0">Implement it anyway, since desirability is what matters most</button>
      <button class="opt" data-i="1">Abandon the whole study</button>
      <button class="opt" data-i="2">Force an accommodation by eliminating the conflicting worldview</button>
      <button class="opt" data-i="3">Look for a different change that clears both bars &mdash; desirable <i>and</i> feasible &mdash; for this particular situation and its history</button>
      <div class="fb">SSM requires change to be <b>both</b> arguably desirable (given the models) <b>and</b>
      culturally feasible for these particular people, with their particular history and politics. A change
      that fails either bar isn't the target &mdash; the search continues for one that clears both.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What distinguishes "hard" from "soft" systems thinking?</div>
      <button class="opt" data-i="0">Hard systems thinking uses statistics; soft systems thinking doesn't</button>
      <button class="opt" data-i="1">Hard systems thinking locates "systemicity" in the world itself; soft systems thinking locates it in the process of inquiry</button>
      <button class="opt" data-i="2">Hard systems thinking is older and therefore outdated</button>
      <button class="opt" data-i="3">Soft systems thinking rejects the idea of systems entirely</button>
      <div class="fb">Hard (e.g. Systems Engineering) assumes the world contains engineerable systems with fixed
      objectives. Soft (SSM) treats the world as complex and contested, and organizes the <b>inquiry itself</b>
      as the thing that can be systemic.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A rich picture is judged partly on how artistically polished it looks.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">The course is explicit: a rich picture is "not judged as art." Its only job is to
      communicate a situation's structure and process &mdash; multiple relationships at once &mdash; to the
      people who need to use it.</div>
    </div>

    <div class="q">
      <p>Fill in the blank: SSM treats <b>purposeful
      <input type="text" class="fillblank" data-answer="activity" placeholder="?"></b> itself as a system &mdash;
      because every real-world problematical situation contains people trying to act this way, whatever their
      worldview.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>Activity.</b> "Purposeful activity" is the thing SSM chooses to model as an adaptive
      whole &mdash; not the organization, not "the system" in the everyday sense, but the purposeful behavior of
      people within it.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each learning-cycle stage to what happens in it</h3>
    <table class="match" id="match-cycle">
      <tr><td class="match-term">Stage 1</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="find">Find out about the perceived real-world problematical situation</option><option value="model">Build purposeful activity models, each based on a declared worldview</option><option value="debate">Use the models to structure a discussion about change</option><option value="act">Define/take action to improve the situation</option></select></td></tr>
      <tr><td class="match-term">Stage 2</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="find">Find out about the perceived real-world problematical situation</option><option value="model">Build purposeful activity models, each based on a declared worldview</option><option value="debate">Use the models to structure a discussion about change</option><option value="act">Define/take action to improve the situation</option></select></td></tr>
      <tr><td class="match-term">Stage 3</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="find">Find out about the perceived real-world problematical situation</option><option value="model">Build purposeful activity models, each based on a declared worldview</option><option value="debate">Use the models to structure a discussion about change</option><option value="act">Define/take action to improve the situation</option></select></td></tr>
      <tr><td class="match-term">Stage 4</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="find">Find out about the perceived real-world problematical situation</option><option value="model">Build purposeful activity models, each based on a declared worldview</option><option value="debate">Use the models to structure a discussion about change</option><option value="act">Define/take action to improve the situation</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-cycle','fb-match-cycle',['find','model','debate','act'])">Check</button>
    <div class="fb" id="fb-match-cycle"></div>
    <p class="muted" style="margin-top:10px">Remember: in real use these overlap and loop back into each
    other (Fig. 1.6) &mdash; this ordering is the "iconic" summary (Fig. 1.5), not a checklist you complete once.</p>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET 1 — worldview lens
   ============================================================ */
var wvData = {
  econ: {
    label: "“A company clears a wetland to build a factory that will employ 500 people.”",
    views: [
      { name: "Eco-warrior", crit: "criteria: environmentally friendly, sustainable", verdict: "bad",
        why: "The clearance destroys a wetland ecosystem — it fails the sustainability test outright, regardless of jobs created." },
      { name: "Capitalist", crit: "criteria: profitable", verdict: "good",
        why: "500 new jobs and a productive factory are exactly what this worldview counts as “good” — environmental cost isn’t part of its criteria at all." }
    ]
  },
  prison: {
    label: "“A facility runs a strict, highly regimented daily schedule for inmates.”",
    views: [
      { name: "Punishment view", crit: "criteria: deterrence, just deserts", verdict: "good",
        why: "A regimented, unpleasant routine is exactly what this worldview wants a prison to deliver." },
      { name: "Rehabilitation view", crit: "criteria: reduced reoffending, skills gained", verdict: "bad",
        why: "A schedule with no education or therapy built in does nothing to change inmates’ future behavior — this worldview judges it a missed opportunity." }
    ]
  },
  conflict: {
    label: "“An armed group attacks a government facility to draw attention to their cause.”",
    views: [
      { name: "Government view", crit: "criteria: lawful order, protection of civilians", verdict: "bad",
        why: "This worldview’s label for the action is ‘terrorism’ — an illegitimate attack on the state and civilians." },
      { name: "Sympathizer view", crit: "criteria: resistance to oppression", verdict: "good",
        why: "This worldview’s label for the very same action is ‘freedom fighting’ — legitimate resistance toward a cause it judges just." }
    ]
  }
};
function wvRender() {
  var key = document.getElementById('wv-scenario').value;
  var s = wvData[key];
  document.getElementById('wv-label').textContent = s.label;
  var html = '';
  for (var i = 0; i < s.views.length; i++) {
    html += '<button onclick="wvPick(' + i + ',this)">' + s.views[i].name + '</button>';
  }
  document.getElementById('wv-choices').innerHTML = html;
  document.getElementById('wv-result').innerHTML = 'Choose a worldview above.';
}
function wvPick(i, btn) {
  var key = document.getElementById('wv-scenario').value;
  var v = wvData[key].views[i];
  var siblings = btn.parentNode.querySelectorAll('button');
  siblings.forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('wv-result').innerHTML =
    '<b>' + v.name + '</b> <span class="muted">(' + v.crit + ')</span> judges this as ' +
    '<span class="verdict ' + v.verdict + '">' + v.verdict.toUpperCase() + '</span>.<br>' + v.why;
}

/* ============================================================
   WIDGET 2 — adaptive-whole requirement explainer
   ============================================================ */
var reqData = {
  comm: "<b>Communication processes</b> — “to know what is going on.” A system has to sense the shocks arriving from its environment E before it can do anything about them. Without communication, S has no way to notice change is happening at all.",
  ctrl: "<b>Control processes</b> — “possible adaptive responses to the shocks.” Once S knows what's going on, it needs some mechanism for actually changing its own behavior in response — sensing without the ability to respond wouldn't help it survive.",
  layer: "<b>Structure in layers</b> — the system may contain sub-systems (SS), or may itself be seen by a different observer as only a sub-system of some wider system. Layering is relative to the observer, not a fixed fact about the world.",
  emerge: "<b>Emergent properties</b> — what is called a system must have properties as a single whole. The reading's example: the parts of a bicycle, assembled correctly (and only then), produce the emergent property of being a vehicle — “vehicle” is meaningful only in relation to the whole, not to any one part."
};
function reqShow(btn, key) {
  document.querySelectorAll('.req-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('req-detail').innerHTML = reqData[key];
}

function initL1() { wvRender(); }
