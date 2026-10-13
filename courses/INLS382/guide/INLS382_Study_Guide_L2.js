/* ============================================================
   LESSON 2 — "Systems worth thinking with" (Mon Oct 5, deck L13).
   Unit: Models to Argue With.
   Reading: Checkland & Poulter, Learning for Action (2006),
   Ch.4 "SSM in Action in the Field of Information Systems"
   (pp.111-145), plus the Ch.2 passages the deck re-reads
   (p.38 one model/one worldview; pp.43-44 primary-task vs
   issue-based). Injects into #l2. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal below
   must be written \\ .
   ============================================================ */
document.getElementById('l2').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l2-info')">Information &amp; Activity</button>
  <button onclick="showTopic(this,'l2-case1')">Case 1: Two Hospitals</button>
  <button onclick="showTopic(this,'l2-cases')">Cases 2&ndash;4</button>
  <button onclick="showTopic(this,'l2-aspect')">Aspect vs. Relevant System</button>
  <button onclick="showTopic(this,'l2-ptib')">Primary-Task vs. Issue-Based</button>
  <button onclick="showTopic(this,'l2-check')">Self-Check</button>
</nav>
<main>

<!-- ============ INFORMATION & ACTIVITY ============ -->
<section class="topic active" id="l2-info">
  <h2>Lesson 2 &middot; Information Systems Start with Purposeful Activity</h2>
  <p class="muted">Mon Oct 5 &middot; "Systems worth thinking with" &middot; Ch.4, pp.111&ndash;114. The unit's slogan:
  <i>a relevant system is a choice of viewpoint; a model that tries to be balanced argues for nothing.</i></p>

  <div class="concept">Chapter 4 opens with a claim about <b>why SSM belongs in information-systems work</b>: as soon as
  you have an activity model, you can ask of <b>each activity</b> in it &mdash; <i>What information would have to be
  available to someone carrying this out? What information would doing it generate?</i> (then: who supplies or uses it,
  in what form, how often). So an <b>activity model can be turned into an information model</b> (p.111). The
  questions you ask of the real world become information-oriented.</div>

  <h3>Data &rarr; capta &rarr; information &rarr; knowledge (Fig. 4.1)</h3>
  <div class="card">
    <p>There are "uncountable millions of facts about the world" &mdash; <b>data</b>. The temperature at Reykjavik
    airport right now is undoubtedly recorded somewhere, but we have no interest in it &mdash; until we are flying to
    Iceland tomorrow and about to pack. Then it becomes "an item of data <i>which we have an interest in knowing</i>."
    English has no word for that distinction, so Checkland and Holwell suggest <b>capta</b> (Latin <i>capere</i>, "to
    take") for the subset of data we pay attention to. Click each stage:</p>
    <div class="lens-choices" id="lad-btns">
      <button class="active" onclick="ladShow(this,'data')">Data</button>
      <button onclick="ladShow(this,'capta')">Capta</button>
      <button onclick="ladShow(this,'info')">Information</button>
      <button onclick="ladShow(this,'know')">Knowledge</button>
    </div>
    <div class="lens-result" id="lad-detail"></div>
  </div>

  <div class="warn"><b>Common misreading.</b> "Information" is <b>not</b> something a computer holds. The reading's
  line is blunt: information is created "when <i>human beings</i> attribute meaning to data in a particular context. No
  machine operations can do that." A designer "cannot determine how the system will be used" &mdash; the example is a
  spreadsheet of student marks that "ostensibly provides information concerning student assessment" but which
  lecturers "may well use &hellip; in internal battles over uneven teaching loads!" (p.113). Machines manipulate
  electronic tokens for data; people confer meaning.</div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>In the Reykjavik example, what turns an ordinary datum (the airport temperature) into <b>capta</b>?</div>
      <button class="opt" data-i="0">It is stored in a database</button>
      <button class="opt" data-i="1">A computer processes it into a report</button>
      <button class="opt" data-i="2">Someone takes an interest in knowing it (here, because they are about to travel there)</button>
      <button class="opt" data-i="3">A second source confirms it</button>
      <div class="fb">Capta is "that subset of all data which we have an interest in knowing." What changes is the
      <b>person's interest</b>, not the data and not the storage. Context then turns capta into <i>information</i>.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>According to the reading, a sufficiently well-designed system can itself create <i>information</i> from data.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Information is created when human beings attribute meaning to data in a particular context &mdash;
      "no machine operations can do that." The system designer has some information provision in mind, but cannot
      control how it will be used (p.113).</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each term to its meaning</h3>
    <table class="match" id="match-ladder">
      <tr><td class="match-term">Data</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="data">Facts about the world, whether or not anyone cares about them</option><option value="capta">The subset of data we have an interest in knowing</option><option value="info">Capta made meaningful by a context and by the person's interests</option><option value="know">Larger, longer-living structures of meaningful facts</option></select></td></tr>
      <tr><td class="match-term">Capta</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="data">Facts about the world, whether or not anyone cares about them</option><option value="capta">The subset of data we have an interest in knowing</option><option value="info">Capta made meaningful by a context and by the person's interests</option><option value="know">Larger, longer-living structures of meaningful facts</option></select></td></tr>
      <tr><td class="match-term">Information</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="data">Facts about the world, whether or not anyone cares about them</option><option value="capta">The subset of data we have an interest in knowing</option><option value="info">Capta made meaningful by a context and by the person's interests</option><option value="know">Larger, longer-living structures of meaningful facts</option></select></td></tr>
      <tr><td class="match-term">Knowledge</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="data">Facts about the world, whether or not anyone cares about them</option><option value="capta">The subset of data we have an interest in knowing</option><option value="info">Capta made meaningful by a context and by the person's interests</option><option value="know">Larger, longer-living structures of meaningful facts</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-ladder','fb-match-ladder',['data','capta','info','know'])">Check</button>
    <div class="fb" id="fb-match-ladder"></div>
  </div>

  <h3>IS vs. IT: design the activity first (Fig. 4.2)</h3>
  <div class="concept"><b>"No one creates an information system for its own sake."</b> An IS exists because it helps,
  supports, or enables someone carrying out some <b>purposeful activity</b>. And "when one system, A, supports another,
  B, it is obvious that you cannot conceptualize or design A until you have first conceptualized B" (pp.113&ndash;114).
  So if a managing director asks for a system to support research, you cannot move until you know what
  "research support" means <i>to that company</i>.</div>

  <div class="card">
    <div class="sysdia">
      <div class="req-list" style="max-width:520px">
        <div class="amodel">
          <span class="node">Real-world purposeful activity</span><br>
          <span class="arrow">&uarr; <i>supports</i></span><br>
          <span class="node">Information Systems (IS)</span><br>
          <span class="arrow">&uarr; <i>enables</i></span><br>
          <span class="node">Information Technology (IT)</span><br>
          <span class="arrow">&hellip;and IT <i>can yield ideas</i> for new IS or new activity (the dotted arrows)</span>
        </div>
      </div>
      <div class="req-list">
        <p class="muted">"Especially to be avoided is the procurement of a complex IT system without first thinking out
        exactly how it will be used, as well as what activity it will serve" (p.114). Case 3 later reports the bill for
        skipping that step: <b>seven of 150</b> RM systems were "procured but not installed" (p.135).</p>
        <p class="muted">The dotted arrows matter too: modern IT "may make possible purposeful activity and information
        systems which would be impossible without it," so the arrow runs both ways &mdash; but sensible thinking
        still starts from the activity.</p>
      </div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which description matches Figure 4.2?</div>
      <button class="opt" data-i="0">IT supports the purposeful activity, which in turn enables the IS</button>
      <button class="opt" data-i="1">The IS supports real-world purposeful activity; IT enables the IS</button>
      <button class="opt" data-i="2">Purposeful activity supports the IS, which enables IT</button>
      <button class="opt" data-i="3">IS, IT and purposeful activity are independent of one another</button>
      <div class="fb">The IS exists to <b>support</b> some purposeful activity, and IT is what <b>enables</b> the IS to be
      realized. That is why you define the activity first.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>A managing director asks you to design a system to support the company's research. According to pp.113&ndash;114, what must you do <i>first</i>?</div>
      <button class="opt" data-i="0">Conceptualize what "research support" would mean for that company &mdash; the activity being supported</button>
      <button class="opt" data-i="1">Choose the database technology</button>
      <button class="opt" data-i="2">Survey vendors of research software</button>
      <button class="opt" data-i="3">Draft the user-interface screens</button>
      <div class="fb">You cannot design system A (the information system) until you have conceptualized system B (the
      purposeful activity it supports). Everything else on the list comes after.</div>
    </div>
    <div class="q">
      <p>Fill in the blank: before working on an information system you must first carefully define the purposeful
      <input type="text" class="fillblank" data-answer="activity" placeholder="?"> that the system will support.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>Activity.</b> The general message of the setup section: focus on defining carefully the purposeful
      activity the information system will support.</div>
    </div>
  </div>
</section>

<!-- ============ CASE 1 ============ -->
<section class="topic" id="l2-case1">
  <h2>Case 1 &middot; Creating an Information Strategy in an Acute Hospital</h2>
  <p class="muted">Ch.4, pp.115&ndash;124. The deck's frame: <b>two hospitals, one deadline</b>.</p>

  <div class="two-wide">
    <div class="card">
      <h3 style="margin-top:0">The situation</h3>
      <p>In the early 1990s the Royal Victoria Infirmary in Newcastle (a large acute hospital) and Hexham General
      (much smaller, 25 miles away) <b>merged into one organization while staying on separate sites</b>. The Information
      Officer of the new hospital, Steve Clarke, used the merger to reformulate the combined information and IT
      strategy: central NHS money, work put out to tender, a management consultancy (John Poulter), and Checkland
      brought in for methodological guidance. Work began in <b>March</b>; the strategy had to reach the Board in
      <b>September</b>.</p>
      <p>The plan: about <b>forty professionals</b> &mdash; doctors, nurses, people from estates and accounting &mdash; in
      small <b>mixed groups</b>, each examining the core purpose, activities and information needs of some of the
      hospital's functions; a monthly plenary; a steering group of directors and senior managers. The Chief Executive
      stressed the strategy would come "not from 'management' but from the work of small groups of hospital professionals."</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">What the groups were given</h3>
      <p>Only <b>two</b> pieces of SSM beyond its general role: <b>CATWOE</b> and the measures of performance for T &mdash;
      <b>E1</b> efficacy, <b>E2</b> efficiency, <b>E3</b> effectiveness (p.117). Plus <b>generic</b> models of "an acute
      hospital" to adopt or modify.</p>
      <p class="muted">The generic root definition: <i>a system, operating under a range of external influences, which, in
      the light of a strategy based on its capabilities and costs, delivers services defined in "contracts" with
      purchasers within the context of NHS norms and policies, that service delivery itself contributing to the ongoing
      development of its strategy.</i></p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Its CATWOE and three Es (p.117)</h3>
    <table class="cmp">
      <tr><th>Element</th><th>In the hospital model</th></tr>
      <tr><td><b>C</b> Customers</td><td>those receiving hospital services; purchasers</td></tr>
      <tr><td><b>A</b> Actors</td><td>hospital professionals</td></tr>
      <tr><td><b>T</b> Transformation</td><td>need for acute services &rarr; need for acute services met</td></tr>
      <tr><td><b>W</b> Worldview</td><td>acute services can best be provided by an organization dedicated to developing and delivering such services</td></tr>
      <tr><td><b>O</b> Owners</td><td>hospital management board; NHS executive</td></tr>
      <tr><td><b>E</b> Environment</td><td>NHS structures and norms; the purchaser&ndash;provider split</td></tr>
      <tr><td><b>E1</b> efficacy</td><td>demonstrable delivery of a portfolio of services of suitable quality</td></tr>
      <tr><td><b>E2</b> efficiency</td><td>minimum use of resources (expressible in money and time)</td></tr>
      <tr><td><b>E3</b> effectiveness</td><td>satisfaction of patients treated, purchasers, the NHS executive; contributions to hospital reputation (long-term viability)</td></tr>
    </table>
    <p class="muted">The model (Fig. 4.3) had <b>five</b> main activities &mdash; "the 'magical number' 7 minus 2 in this
    case!" &mdash; with four expanded at a second level (Fig. 4.4 expands activity 4.1). It is "very rare to expand
    more than two levels below that of a starting model" (p.120).</p>
  </div>

  <h3>The course of the project (Fig. 4.5)</h3>
  <div class="card">
    <div class="lens-choices" id="tl-btns">
      <button class="active" onclick="tlShow(this,'mar')">March</button>
      <button onclick="tlShow(this,'marapr')">Mar&ndash;Apr</button>
      <button onclick="tlShow(this,'apr')">April</button>
      <button onclick="tlShow(this,'mayjun')">May&ndash;June</button>
      <button onclick="tlShow(this,'julaug')">July&ndash;Aug</button>
      <button onclick="tlShow(this,'sep')">September</button>
    </div>
    <div class="lens-result" id="tl-detail"></div>
  </div>

  <div class="danger"><b>The trade-off the reading is open about.</b> The tight timescale and the required outcome
  (a reformulated strategy based on the hospital's <i>current pattern of activity</i>) meant the work "would focus on
  primary-task models rather than issue-based ones" (p.116). The deck quotes the outcome section twice: "the timescale
  dictated that it would be based on existing patterns of hospital activity" (p.121), and "In the time available it
  could not have become a more luxurious study of future hospital strategy" (pp.121&ndash;122) &mdash; which would
  have needed "more models, including ones which were issue-based." A deadline can choose your <i>kind</i> of model
  before anyone chooses a worldview.</div>

  <h3>The nurse's C (p.123)</h3>
  <div class="card">
    <p>One group, led by a senior nurse, defined <b>CATWOE for "a system to provide a hospital nursing service"</b> before
    modifying a generic model. Asked <b>C &mdash; who would be the beneficiaries or victims?</b> they said "patients" at once
    and moved on. A group member pulled them back: under the "internal market" (annual contracts with a purchaser), the
    C could arguably be the hospital <b>"contracts manager,"</b> with the nurses' job being "to supply the amount and
    quality of nursing care that was paid for under the contract." The ensuing "long and animated discussion" let the
    senior nurse see why she had felt, without being able to pinpoint it, that the contracting regime was eroding her
    profession's autonomy.</p>
    <p>A second moment: a paediatrician said, "I've worked here for 20 years, and this is the first time I've ever had any
    sense of the total activity of the hospital as a whole" (pp.123&ndash;124). The authors' reading: "although no
    methodology can itself produce learning and 'answers,' as if by magic, organized use of methodological guidelines
    can render the users' own thinking more coherent and more effective" (p.124).</p>
    <div class="concept">The deck puts the two answers side by side: <b>patients</b> vs. <b>the hospital contracts
    manager</b>. Same activity, different C &mdash; and the choice of C is not neutral. It is a choice of viewpoint.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Why did Case 1 use primary-task models rather than issue-based ones?</div>
      <button class="opt" data-i="0">The hospital staff preferred them</button>
      <button class="opt" data-i="1">The tight timescale and the required outcome &mdash; a strategy based on the existing pattern of hospital activity</button>
      <button class="opt" data-i="2">Primary-task models are always the better kind</button>
      <button class="opt" data-i="3">The authors did not know issue-based models existed</button>
      <div class="fb">"The timescale dictated that it would be based on existing patterns of hospital activity" (p.121). With
      more time the study could have included issue-based models (pp.121&ndash;122). Neither kind is "always better."</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>In Case 1, the hospital groups were taught the whole of SSM before they began.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">The only aspects of SSM presented (apart from its general role in information-focused work) were
      <b>CATWOE</b> and the measures of performance for T (E1, E2, E3), plus generic models to start from (p.117).</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>In the senior nurse's group, how did the answer to <b>C</b> change?</div>
      <button class="opt" data-i="0">From "nurses" to "patients"</button>
      <button class="opt" data-i="1">From "the NHS executive" to "patients"</button>
      <button class="opt" data-i="2">From "patients" to (arguably) the hospital's "contracts manager," since care was paid for under the contract</button>
      <button class="opt" data-i="3">It did not change; the group agreed "patients" was obvious</button>
      <div class="fb">They first said "patients" and moved on; a group member then noted that under the internal-market
      contracts the C could be the hospital contracts manager. That prompted the long discussion that explained the
      senior nurse's unease about eroded professional autonomy (p.123).</div>
    </div>
    <div class="q">
      <p>Fill in the blank: Case 1's generic model had <input type="text" class="fillblank sm" data-answer="5~~~five" placeholder="?"> main
      activities, the "magical number" 7 minus 2.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>Five</b> main activities, four of which were expanded at a second level (Fig. 4.3).</div>
    </div>
    <div class="q" data-multi="0,2">
      <div class="prompt"><span class="tag">Select all that apply</span>What do the nurse's CATWOE discussion and the paediatrician's remark illustrate (pp.123&ndash;124)?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Organized use of a declared methodology can broaden people's thinking and lead to learning</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> The generic hospital model was wrong and had to be discarded</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> No methodology can itself produce learning or "answers," as if by magic</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> SSM removes disagreement between professions</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">Both episodes show a declared methodology broadening thinking &mdash; while no methodology produces
      learning "as if by magic"; it makes the users' <i>own</i> thinking more coherent. Neither episode shows the model
      being wrong, and the nurse's discussion <i>exposed</i> disagreement rather than removing it.</div>
    </div>
  </div>
</section>

<!-- ============ CASES 2-4 ============ -->
<section class="topic" id="l2-cases">
  <h2>Cases 2&ndash;4 &middot; Evaluating and Reorganizing</h2>
  <p class="muted">Ch.4, pp.124&ndash;144. Three more uses of SSM around information systems. Each ends with a lesson about method.</p>

  <div class="card">
    <h3 style="margin-top:0">Case 2 &middot; Evaluating a clinical information system (pp.124&ndash;129)</h3>
    <p>Part of the national <b>Resource Management (RM) Initiative</b> in the NHS (&pound;300m of public money). At
    Huddersfield, a clinical information system (CIS) had begun <b>without any tight definition of an ultimate aim</b>;
    it proceeded at the pace and direction the four consultants involved would accept. SSM was used <b>after the
    event</b> to describe what had emerged. The expected model was doctors treating patients &mdash; but the CIS turned
    out to be "a system which <i>monitored</i> the taken-as-given 'diagnose and treat' activity, took control action with
    respect to it, and <i>learned</i> from the experience" (p.126; Fig. 4.6).</p>
    <p>How it worked: consultants entered an <b>anticipated profile of care</b> for a condition (symptoms, complications,
    treatments, expected stay, outcomes, plus resource use and costs), recorded actual cases in the same format, and a
    facilitator ran regular meetings to compare experience with the profiles and modify them.</p>
    <div class="concept"><b>Lesson:</b> desirable changes have to be <b>feasible for these people in their specific
    situation</b>, with "its own history and sense-making narrative" (p.129). A good IS includes arrangements for capturing
    learning from its operation, and the key feature was "ongoing joint work by doctors and information professionals"
    &mdash; not designers imposing a system "on apparently awkward and obtuse users, who naturally resist."</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Case 3 &middot; Evaluating a national initiative (pp.130&ndash;136)</h3>
    <p>The evaluation of RM across <b>250+ projects</b> and &pound;300m. SSM was used twice: <b>SSM(p)</b> &mdash; "How shall we go
    about this investigation?" &mdash; and <b>SSM(c)</b> &mdash; "How shall we create and then capture the <i>content</i> of
    this evaluation from the huge mass of material collected?" (p.131).</p>
    <ul>
      <li>The Health Notice that launched RM (12 pages) was "taken to be an elaborate <b>Root Definition</b>"; three RDs
      were modelled (set up and execute an RM project; manage one; fund and monitor at regional level) (p.133).</li>
      <li>Those models structured the questions for <b>16 four-day site visits</b>, a questionnaire to <b>200+ sites</b>
      (130 returned), and about <b>30 national and regional interviews</b>.</li>
      <li>To analyse the pile of visit reports, they built an idealised "RM-ed site" that took the Notice "as a sacred
      text" &mdash; an activity model "expressed the other way round": <b>elements are entities and arrows carry
      activities</b> (Fig. 4.8, pp.133&ndash;134).</li>
    </ul>
    <p>Outcomes: IS and organization-development work were rarely <i>linked</i>, and in <b>seven cases out of 150</b>
    systems were "procured but not installed" (p.135) &mdash; "the usual results when too early an emphasis on IT neglects
    prior analysis of the purposeful activity to be supported."</p>
    <div class="concept"><b>Lessons:</b> SSM's verb-based models are usually superior in human affairs, "since function is
    more important than form &mdash; which is arbitrary and can be easily changed." And: "Never dive straight into complex
    situations. Organize prior thinking about intervention by the use of guiding principles about complexity and
    frameworks and tools for inquiry" (p.136).</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Case 4 &middot; Information support for scientists (pp.137&ndash;144)</h3>
    <p>In a large multinational science-based company the Information Department (ID: 100 people, serving laboratories of
    1,000) wanted to rethink the support it gave researchers. Eva led the project; <b>the initiative came from ID, not from
    the researchers</b>, who did not hold ID in high esteem. SSM was used with workshops of about 20 researchers: a rich
    picture (Fig. 4.9), then <b>ID's own mission statement modelled as if it were a root definition</b> (Fig. 4.10).</p>
    <p>Gaps between such a model and real life "usually appear" because mission statements are "normally part of PR rather
    than the result of dispassionate thinking" (p.138). Workshop discussion converged on: <b>"what the researcher needs is
    more important than how ID wants to use technology"</b> (p.139). Then came a hiatus of nearly a year (the reorganization's
    terms of reference covered only one section of ID), ending in an <b>"Information Market"</b> &mdash; a permanent platform
    for dialogue.</p>
    <div class="concept"><b>Lesson:</b> the SSM work took about half a dozen days; the organizational change "was much, much
    slower." The head of ID held a "commodity of power" but was reluctant to use it (Analyses Two and Three). "There is never
    a straightforward, spick and span answer to the question: What is culturally feasible here?" (p.144).</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each case to what it shows</h3>
    <table class="match" id="match-cases">
      <tr><td class="match-term">Case 1 &mdash; Acute hospital</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="c1">Generic primary-task models used by small mixed groups to build an information strategy to a deadline</option><option value="c2">SSM used after the event to discover that a system monitored the "diagnose and treat" activity and learned from it</option><option value="c3">SSM used to design a large evaluation and to structure its findings with an entity-based model</option><option value="c4">Workshops using a mission-statement model and a rich picture; the organizational change was far slower than the SSM work</option></select></td></tr>
      <tr><td class="match-term">Case 2 &mdash; Huddersfield CIS</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="c1">Generic primary-task models used by small mixed groups to build an information strategy to a deadline</option><option value="c2">SSM used after the event to discover that a system monitored the "diagnose and treat" activity and learned from it</option><option value="c3">SSM used to design a large evaluation and to structure its findings with an entity-based model</option><option value="c4">Workshops using a mission-statement model and a rich picture; the organizational change was far slower than the SSM work</option></select></td></tr>
      <tr><td class="match-term">Case 3 &mdash; National RM evaluation</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="c1">Generic primary-task models used by small mixed groups to build an information strategy to a deadline</option><option value="c2">SSM used after the event to discover that a system monitored the "diagnose and treat" activity and learned from it</option><option value="c3">SSM used to design a large evaluation and to structure its findings with an entity-based model</option><option value="c4">Workshops using a mission-statement model and a rich picture; the organizational change was far slower than the SSM work</option></select></td></tr>
      <tr><td class="match-term">Case 4 &mdash; Information Department</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="c1">Generic primary-task models used by small mixed groups to build an information strategy to a deadline</option><option value="c2">SSM used after the event to discover that a system monitored the "diagnose and treat" activity and learned from it</option><option value="c3">SSM used to design a large evaluation and to structure its findings with an entity-based model</option><option value="c4">Workshops using a mission-statement model and a rich picture; the organizational change was far slower than the SSM work</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-cases','fb-match-cases',['c1','c2','c3','c4'])">Check</button>
    <div class="fb" id="fb-match-cases"></div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>In Case 2, what did the Huddersfield CIS turn out to be?</div>
      <button class="opt" data-i="0">A system that carried out the "diagnose and treat" activity itself</button>
      <button class="opt" data-i="1">A system that monitored the taken-as-given "diagnose and treat" activity, took control action, and learned from experience</button>
      <button class="opt" data-i="2">A patient-booking system</button>
      <button class="opt" data-i="3">A national database of RM projects</button>
      <div class="fb">The anticipated models (doctors treating patients) were not what the CIS was: it was a
      <b>monitor-and-learn</b> system around that activity &mdash; profiles of expected care compared with actual experience (p.126).</div>
    </div>
    <div class="q">
      <p>Fill in the blank: in Case 3, the Health Notice that launched RM was taken to be an elaborate
      <input type="text" class="fillblank" data-answer="root definition~~~rd~~~root definitions" placeholder="?"> (RD).</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>Root Definition.</b> Three relevant RDs were formulated from it and modelled (p.133).</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>In Case 4, a gap between the mission-statement model and real life was a sign the SSM work had gone wrong.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Such gaps "usually appear," because mission statements are normally part of PR rather than the result of
      dispassionate thinking (p.138). The gap was useful: it showed a strong need for the reorganization project.</div>
    </div>
  </div>
</section>

<!-- ============ ASPECT VS RELEVANT SYSTEM ============ -->
<section class="topic" id="l2-aspect">
  <h2>Aspect vs. Relevant System</h2>
  <p class="muted">From the Oct 5 deck, with Ch.2 p.38. This is the move your group makes after choosing what to study.</p>

  <div class="two">
    <div class="card">
      <h3 style="margin-top:0">Your aspect</h3>
      <p><b>What you are looking at.</b> One per group. Committed to on <b>9/14</b>.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">A relevant system</h3>
      <p><b>How you look at it.</b> Several per group, from today onward.</p>
    </div>
  </div>

  <div class="concept">The deck's example comes from the first week (<b>8/26</b>): <b>one subject, two relevant systems</b>.
  Subject: group work. Relevant system 1 &mdash; group work is for <i>producing more, or higher quality, work than is possible
  individually</i>. Relevant system 2 &mdash; group work is <i>a device for producing individual learning</i>. Same subject,
  different system, because each is built from a different point of view. And: <b>"What is your relevant system?" is not
  answered by the name of your aspect.</b></div>

  <h3>One model, one worldview (Ch.2, p.38)</h3>
  <div class="card">
    <p>"Each model is built according to a declared <b>single worldview</b> (e.g. 'the Olympic Games from the perspective of
    the host city')." The deck repeats the Games from three other perspectives: <b>an athlete</b>, <b>a broadcaster</b>, and
    <b>a family moved out to make room for a stadium</b>. Pick a perspective to see why one model per worldview matters
    (the one-line "working if" statements below are <i>illustrations</i>, not from the reading):</p>
    <div class="lens-choices" id="oly-btns">
      <button onclick="olyShow(this,'athlete')">Athlete</button>
      <button onclick="olyShow(this,'broadcaster')">Broadcaster</button>
      <button onclick="olyShow(this,'family')">Displaced family</button>
      <button onclick="olyShow(this,'balanced')">A "balanced" model</button>
    </div>
    <div class="lens-result" id="oly-detail">Choose a perspective above.</div>
  </div>

  <div class="danger"><b>The unit's slogan.</b> "A model that tries to be balanced argues for nothing and can be argued
  with by no one." If a model tries to satisfy the athlete, the broadcaster and the displaced family at once, nobody can
  say what it is <i>for</i> &mdash; and so nobody can disagree with it. A relevant system is a <b>choice of viewpoint</b>; the
  value of a model is that it gives you something definite to argue with.</div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Your aspect is "group work." Which of these is a <i>relevant system</i> for it?</div>
      <button class="opt" data-i="0">"Group work" (the name of the aspect)</button>
      <button class="opt" data-i="1">A system in which group work is a device for producing individual learning</button>
      <button class="opt" data-i="2">A balanced system that serves every stakeholder in group work equally</button>
      <button class="opt" data-i="3">The class's group-work grading policy</button>
      <div class="fb">A relevant system says <b>how</b> you look at the subject, from a stated point of view. The name of
      the aspect doesn't; a "balanced" system has no single worldview; and a policy is a thing in the world, not a viewpoint.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>A group builds one "fair" model of the Olympic Games that includes the athlete's, the broadcaster's and the displaced family's views. What is wrong with it?</div>
      <button class="opt" data-i="0">It tries to be balanced, so it argues for nothing and can be argued with by no one</button>
      <button class="opt" data-i="1">Three perspectives take too long to draw</button>
      <button class="opt" data-i="2">Models may only express the host city's view</button>
      <button class="opt" data-i="3">Nothing; balanced models are the goal</button>
      <div class="fb">Each model must be built according to <b>a declared single worldview</b> (Ch.2, p.38). A different
      perspective gets a different model.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Naming your aspect (for example, "advising") is enough to answer "What is your relevant system?"</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">The deck says so directly: "What is your relevant system?" is <b>not</b> answered by the name of your aspect.
      The aspect is what you look at; the relevant system is how.</div>
    </div>
  </div>
</section>

<!-- ============ PRIMARY-TASK VS ISSUE-BASED ============ -->
<section class="topic" id="l2-ptib">
  <h2>Primary-Task vs. Issue-Based Models</h2>
  <p class="muted">Ch.2, pp.43&ndash;44, as framed in the Oct 5 deck. "Never work with only one kind."</p>

  <div class="two">
    <div class="card">
      <h3 style="margin-top:0">Primary-task (PT)</h3>
      <p>The boundary is an <b>existing unit</b>: an office, a committee, a division.</p>
      <p class="muted">Not wrong. But it takes the organization chart as given, <b>and nobody notices</b>.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Issue-based (IB)</h3>
      <p>The boundary <b>cuts across the chart</b>.</p>
      <p class="muted">"Questions about what departments, sections, etc. should exist &hellip; are always bound up in the
      power-play."</p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">The two candidates every group may take</h3>
    <ul>
      <li><b>Issue-based:</b> a system to turn unallocated resources into allocated ones (Ch.2, p.44).</li>
      <li><b>Primary-task:</b> the school's own mission statement (sdis.unc.edu/about), modelled as if it were a root
      definition (Ch.4, p.138 &mdash; exactly what Case 4 did with ID's mission statement).</li>
    </ul>
    <p class="muted">Case 1 shows how the kind gets chosen by circumstance: a deadline and a required answer (a strategy
    based on current activity) pushed it to primary-task models.</p>
  </div>

  <h3>The card exercise (in class on 10/5)</h3>
  <div class="card">
    <ol>
      <li><b>Line 1:</b> A system to &hellip; (one sentence).</li>
      <li><b>Line 2:</b> Who would think this worth doing, and why? (the worldview).</li>
      <li><b>Corner:</b> PT or IB. By 2:16: at least <b>eight</b> cards, at least <b>two</b> marked IB, and at least one that
      <b>nobody at your table holds</b>, marked &#10007; (the skeptic makes sure it is written).</li>
    </ol>
    <p class="muted">Then lay them out: two cards with the same line 2? <b>One system</b> &mdash; merge them. A card that is
    the name of your aspect? <b>Not a system yet.</b> A card that tries to please everyone? <b>Split it.</b></p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each term to its meaning</h3>
    <table class="match" id="match-ptib">
      <tr><td class="match-term">Aspect</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="asp">What you are looking at; one per group</option><option value="rel">How you look at it; several per group, each from one declared worldview</option><option value="pt">Boundary is an existing unit such as an office, committee or division</option><option value="ib">Boundary cuts across the organization chart</option></select></td></tr>
      <tr><td class="match-term">Relevant system</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="asp">What you are looking at; one per group</option><option value="rel">How you look at it; several per group, each from one declared worldview</option><option value="pt">Boundary is an existing unit such as an office, committee or division</option><option value="ib">Boundary cuts across the organization chart</option></select></td></tr>
      <tr><td class="match-term">Primary-task</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="asp">What you are looking at; one per group</option><option value="rel">How you look at it; several per group, each from one declared worldview</option><option value="pt">Boundary is an existing unit such as an office, committee or division</option><option value="ib">Boundary cuts across the organization chart</option></select></td></tr>
      <tr><td class="match-term">Issue-based</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="asp">What you are looking at; one per group</option><option value="rel">How you look at it; several per group, each from one declared worldview</option><option value="pt">Boundary is an existing unit such as an office, committee or division</option><option value="ib">Boundary cuts across the organization chart</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-ptib','fb-match-ptib',['asp','rel','pt','ib'])">Check</button>
    <div class="fb" id="fb-match-ptib"></div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which pairing matches the two candidates the deck names?</div>
      <button class="opt" data-i="0">PT: "a system to turn unallocated resources into allocated ones"; IB: the school's mission statement</button>
      <button class="opt" data-i="1">IB: "a system to turn unallocated resources into allocated ones" (Ch.2, p.44); PT: the school's mission statement modelled as a root definition (Ch.4, p.138)</button>
      <button class="opt" data-i="2">Both are primary-task</button>
      <button class="opt" data-i="3">Both are issue-based</button>
      <div class="fb">Allocating resources cuts across units (an issue-based boundary), while a school's mission statement is the
      stated job of one unit &mdash; the school (primary-task).</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Primary-task models are wrong, so a group should avoid them.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">They are "not wrong" &mdash; the risk is that they take the organization chart as given "and nobody notices."
      The advice is to <b>never work with only one kind</b>.</div>
    </div>
  </div>
</section>

<!-- ============ SELF-CHECK ============ -->
<section class="topic" id="l2-check">
  <h2>Lesson 2 &middot; Self-Check</h2>
  <p class="muted">Mixed practice across the whole reading and the Oct 5 deck.</p>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does the reading say about the generic "acute hospital" models (p.120)?</div>
      <button class="opt" data-i="0">They describe how every acute hospital actually works</button>
      <button class="opt" data-i="1">They are only devices, not descriptions of any specific real-world example; they simply unpack the concept "an acute hospital"</button>
      <button class="opt" data-i="2">They were replaced by issue-based models once the deadline passed</button>
      <button class="opt" data-i="3">They are the only models SSM allows</button>
      <div class="fb">Because the models were generic, it helped get across that SSM models "are only devices, not
      descriptions of any specific example in the real world."</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>The reading says it is usually necessary to expand an SSM model to four or five levels of detail.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">"Experience suggests that it is very rare to expand more than two levels below that of a starting model"
      (p.120).</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the chapter's closing claim about how SSM relates to a formula or recipe (pp.144&ndash;145)?</div>
      <button class="opt" data-i="0">SSM is a fixed method: follow the seven steps in order</button>
      <button class="opt" data-i="1">SSM is a technique that works best when it is hidden from participants</button>
      <button class="opt" data-i="2">SSM is a recipe that can be painted by numbers once you have practice</button>
      <button class="opt" data-i="3">SSM is a methodology, not a method or technique: the approach in each case is adapted to the situation (LUMAS), and with experience the methodology becomes a "given"</button>
      <div class="fb">"Using SSM is not like using a formula, cooking to a recipe or painting by numbers." The cases illustrate
      the LUMAS process in action, and the core activity models become "sense-making devices to illuminate the work being done,
      rather than reminders of a prescription" (p.145).</div>
    </div>
    <div class="q" data-multi="0,1,3">
      <div class="prompt"><span class="tag">Select all that apply</span>Which of these appear in the Oct 5 deck as ideas for choosing and writing models?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> A relevant system is a choice of viewpoint, not the name of your aspect</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> Never work with only one kind of model (primary-task and issue-based)</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> A good model tries to give every stakeholder equal weight</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> A card that tries to please everyone should be split</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">Viewpoint over aspect-name, both kinds of model, and splitting people-pleasing cards are all in the deck.
      "Equal weight to every stakeholder" is the balanced model the unit says argues for nothing.</div>
    </div>
  </div>
</section>

</main>
`;

/* ============================================================
   WIDGET 1 — data / capta / information / knowledge ladder
   ============================================================ */
var ladData = {
  data: "<b>Data</b> &mdash; the \"uncountable millions of facts about the world.\" The temperature at the Reykjavik airport this afternoon is undoubtedly recorded somewhere; we may have no interest in it. <span class=\"muted\">(Words normally used loosely: \"data\" is often made to cover both data and capta.)</span>",
  capta: "<b>Capta</b> &mdash; \"that subset of all data which we have an interest in knowing.\" If you are flying to Iceland tomorrow and about to pack, the Reykjavik temperature has acquired a new status. Checkland and Holwell suggest the word because we lack one (<i>capere</i>, \"to take,\" as data comes from <i>dare</i>, \"to give\"). A \"capta processing system\" would have been a more accurate name than \"data processing system.\"",
  info: "<b>Information</b> &mdash; \"meaningful capta.\" Having paid attention to some data we enrich it further as a result of our interest, which provides a <b>context</b> (cognitive settings, interests) that makes it meaningful. Information \"is created when human beings attribute meaning to data in a particular context. No machine operations can do that.\"",
  know: "<b>Knowledge</b> &mdash; \"larger, longer-living structures\" assembled from items of information. In Case 2's terms, a consultant turned an individual patient's <b>data</b> into <b>capta</b> for the hospital, transformed it into <b>information</b> in the context of treating that patient, and the information fed the <b>knowledge</b> the system built up over time as the consultants reviewed experience (p.129)."
};
function ladShow(btn, key) {
  document.querySelectorAll('#lad-btns button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('lad-detail').innerHTML = ladData[key];
}

/* ============================================================
   WIDGET 2 — Case 1 timeline (Fig. 4.5)
   ============================================================ */
var tlData = {
  mar: "<b>March &middot; Teams formed.</b> A hundred staff attend a launch meeting addressed by the Chief Executive and the facilitators; about forty professionals from all areas of hospital activity form small mixed groups. The clock is already running: the strategy goes to the Board in September.",
  marapr: "<b>March&ndash;April &middot; Modelling.</b> Checkland builds <b>generic</b> activity models relevant to being an acute hospital, for the groups to adopt or modify. Only CATWOE and the three Es (E1, E2, E3) are presented as SSM.",
  apr: "<b>April &middot; Teams derive models for their own area of concern.</b> Monthly plenary meetings begin; the facilitators attend some group meetings. A steering group of directors and senior managers keeps the whole exercise under review.",
  mayjun: "<b>May&ndash;June &middot; Information-requirements analysis of the models</b> (Table 4.1). For each activity: how it is done, measures of performance, the information needed, what currently supports it, and the <b>gaps and opportunities</b>. Monthly meetings with team leaders review progress.",
  julaug: "<b>July&ndash;August &middot; Comparison with real-world identities, gaps and opportunities</b>, with input from IS/IT professionals. The gaps were being worked on by July, which let the IT options be evaluated by Clarke's colleagues.",
  sep: "<b>September &middot; Information strategy created and presented to the Board</b>, as planned. The reading calls it a \"tightly-managed project\" whose greatest problem was meeting the deadline (pp.120&ndash;122)."
};
function tlShow(btn, key) {
  document.querySelectorAll('#tl-btns button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('tl-detail').innerHTML = tlData[key];
}

/* ============================================================
   WIDGET 3 — the Olympic Games, one worldview at a time
   (the three perspectives are from the deck; the "working if"
   lines are illustrations, not from the reading)
   ============================================================ */
var olyData = {
  athlete: "<b>The Games from an athlete's perspective.</b> <span class=\"muted\">(illustration)</span> A model built here would be judged by whether it gives competitors the conditions to perform. Its activities, owners and measures of success would be ones an athlete would recognize as <i>the Games working</i>.",
  broadcaster: "<b>The Games from a broadcaster's perspective.</b> <span class=\"muted\">(illustration)</span> A model built here would be judged by whether it produces an event worth carrying: audiences, schedules, moments worth showing. A different set of activities, a different \"working if.\"",
  family: "<b>The Games from the perspective of a family moved out to make room for a stadium.</b> <span class=\"muted\">(illustration)</span> A model built here may barely resemble the other two: what counts as success could be fair treatment and a say in the decision. The same event, a different system.",
  balanced: "<b>A \"balanced\" model of all three.</b> It has no single \"working if,\" so no one can say what it is for &mdash; and so no one can argue with it. <b>\"A model that tries to be balanced argues for nothing and can be argued with by no one.\"</b>"
};
function olyShow(btn, key) {
  document.querySelectorAll('#oly-btns button').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('oly-detail').innerHTML = olyData[key];
}

function initL2() {
  ladShow(document.querySelector('#lad-btns button'), 'data');
  tlShow(document.querySelector('#tl-btns button'), 'mar');
}
