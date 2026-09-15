document.getElementById('l3').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l3-active')">What Is Active Learning?</button>
  <button onclick="showTopic(this,'l3-barriers')">Barriers to Adoption</button>
  <button onclick="showTopic(this,'l3-survey')">The Eickholt Survey</button>
  <button onclick="showTopic(this,'l3-classrooms')">Active Learning Classrooms</button>
  <button onclick="showTopic(this,'l3-study')">The Greer et al. Study</button>
  <button onclick="showTopic(this,'l3-findings')">Findings &amp; Takeaways</button>
  <button onclick="showTopic(this,'l3-check')">Reading Quiz 3 Self-Check</button>
</nav>

<section class="topic active" id="l3-active">
  <h2>What Is Active Learning?</h2>
  <div class="concept"><b>Active learning</b> is any instructional approach that engages students in doing things
  and thinking about what they are doing &mdash; as opposed to passively listening to a lecture and copying notes.
  The defining ingredient isn't activity for its own sake; it's <b>metacognition</b> &mdash; students are asked to
  monitor and reflect on their own understanding while they work, not just perform a task.</div>
  <p class="muted">Simple version: active learning is anything that makes students <i>do</i> something with the
  material &mdash; solve, explain, predict, discuss &mdash; instead of only watching someone else do it.</p>

  <h3>Evidence-based practices (EBPs)</h3>
  <div class="card">
    <p>Both readings describe active learning as one of the best-documented <b>evidence-based practices (EBPs)</b>
    in STEM/CS education &mdash; teaching techniques whose effectiveness is backed by empirical research (most
    famously the Freeman et al. 2014 meta-analysis showing lecture-only STEM courses have higher failure rates than
    active-learning ones). "Evidence-based" here means the opposite of "adopted because it's traditional" &mdash;
    it means adopted because studies measured better outcomes.</p>
    <table class="cmp">
      <tr><th>Technique</th><th>What students do</th></tr>
      <tr><td><b>POGIL</b> (Process-Oriented Guided Inquiry Learning)</td><td>Work in structured small teams through guided activities that lead them to construct a concept themselves, with defined roles (manager, recorder, etc.)</td></tr>
      <tr><td><b>Problem-based learning (PBL)</b></td><td>Start from an open-ended real problem and work backward to the concepts needed to solve it</td></tr>
      <tr><td><b>Peer instruction</b></td><td>Answer a conceptual question individually, discuss with a neighbor, then re-vote &mdash; used heavily in the Greer et al. study</td></tr>
      <tr><td><b>Think-pair-share</b></td><td>Think alone briefly, discuss in pairs, then share with the full class</td></tr>
      <tr><td><b>Minute paper</b></td><td>Write for one minute at the end of class on the muddiest point or main takeaway &mdash; a quick metacognitive check</td></tr>
    </table>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>What makes a technique count as "active learning" rather than just "an activity"?</div>
    <button class="opt" data-i="0">The class stands up and moves around</button>
    <button class="opt" data-i="1">Students engage in the material and reflect on (are metacognitive about) their own understanding</button>
    <button class="opt" data-i="2">The instructor uses slides instead of a whiteboard</button>
    <button class="opt" data-i="3">Students work completely without instructor guidance</button>
    <div class="fb" data-explain="Both papers tie active learning to engagement plus metacognition &mdash; doing something and monitoring your own understanding of it &mdash; not to physical movement or the presence/absence of guidance."></div>
  </div>

  <div class="q" data-multi="0,2,3">
    <div class="prompt"><span class="tag">Select all</span>Which of these are examples of active-learning techniques named in the readings?</div>
    <div class="ma-item"><input type="checkbox" data-i="0"><span>Peer instruction</span></div>
    <div class="ma-item"><input type="checkbox" data-i="1"><span>Assigning a textbook chapter to read before the next lecture</span></div>
    <div class="ma-item"><input type="checkbox" data-i="2"><span>POGIL</span></div>
    <div class="ma-item"><input type="checkbox" data-i="3"><span>Think-pair-share</span></div>
    <div class="fb" data-explain="Peer instruction, POGIL, and think-pair-share are all named active-learning techniques. Assigning a reading for later isn't active learning by itself &mdash; there's no in-the-moment engagement or reflection built in."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>The "minute paper" is a quick check of students' <input class="fillblank" data-answer="metacognition|metacognitive awareness" placeholder="concept"> because it asks them to reflect on their own understanding, not just recall facts.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Metacognition &mdash; thinking about your own thinking &mdash; is the thread connecting every active-learning technique in both papers."></div>
  </div>
</section>

<section class="topic" id="l3-barriers">
  <h2>Barriers to Adoption</h2>
  <p>If active learning is this well-supported by evidence, why don't more CS faculty use it? Eickholt's paper
  surveys CS faculty and administrators to find out. She organizes barriers using a framework adapted from
  <b>Michael (2003)</b>, who grouped obstacles to active learning into four categories.</p>

  <div class="two">
    <div class="concept"><b>Student characteristics</b> &mdash; students may resist active learning because
    they're used to passive lecture, feel active learning is "not real teaching," or worry it takes time away
    from covering content for exams.</div>
    <div class="concept"><b>Teacher characteristics</b> &mdash; faculty may lack training in how to run active
    learning, feel it threatens their sense of expertise/control, or simply prefer lecturing.</div>
    <div class="concept"><b>Pedagogical characteristics</b> &mdash; concerns about covering enough content,
    difficulty assessing active learning fairly, or uncertainty about how to redesign a whole course around it.</div>
    <div class="concept"><b>Institutional/environmental characteristics</b> &mdash; classroom layout (fixed
    lecture-hall seating), class size, lack of institutional reward for teaching innovation, and departmental
    culture.</div>
  </div>

  <h3>The two barriers named most often: time and cost</h3>
  <div class="card">
    <p>Across Eickholt's survey responses, the two barriers that come up most are:</p>
    <ul>
      <li><b>Time</b> &mdash; the up-front time cost of redesigning a course around active learning, and the
      in-class time cost of activities that could otherwise be spent lecturing through more material.</li>
      <li><b>Cost</b> &mdash; both the effort/labor cost to faculty (preparing new materials, training) and, for
      some active learning classroom formats, literal renovation/equipment cost.</li>
    </ul>
    <p class="muted">Simple version: switching to active learning is expensive in the currency professors have the
    least of &mdash; time &mdash; and sometimes in actual dollars for the room itself.</p>
  </div>

  <h3>Institutional climate</h3>
  <div class="concept">Eickholt also highlights <b>institutional climate</b> &mdash; whether a department/college
  culturally rewards teaching innovation (through tenure/promotion criteria, recognition, or just peer attitudes)
  or treats research as the only thing that "counts." A poor climate discourages faculty from taking the risk of
  changing their teaching even if they're personally convinced by the evidence.</div>

  <h3>Locus of control and mindset</h3>
  <div class="card">
    <p>Two psychological concepts explain <i>why</i> some faculty adopt active learning despite the barriers and
    others don't:</p>
    <p><b>Locus of control</b> &mdash; whether a person believes outcomes (like their teaching evaluations or
    student learning) are within their own control (internal locus) or determined by outside forces like
    students, administration, or circumstance (external locus). Faculty with an internal locus of control are more
    likely to believe that changing their teaching methods will actually make a difference, so they're more
    willing to try active learning.</p>
    <p><b>Fixed vs. growth mindset</b> &mdash; a <b>fixed mindset</b> treats teaching ability (or intelligence) as
    a stable trait you either have or don't; a <b>growth mindset</b> treats it as something that improves with
    effort and practice. Faculty with a growth mindset about their own teaching are more open to trying and
    iterating on a new pedagogical approach, since a rough first attempt isn't proof they "can't" teach that way.</p>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>According to Eickholt's survey, which two barriers to active learning adoption were reported most frequently by CS faculty?</div>
    <button class="opt" data-i="0">Student resistance and lack of textbooks</button>
    <button class="opt" data-i="1">Class size and lack of TA support</button>
    <button class="opt" data-i="2">Time and cost</button>
    <button class="opt" data-i="3">Institutional climate and locus of control</button>
    <div class="fb" data-explain="Time (redesign + in-class) and cost (labor/effort, and sometimes classroom renovation) were the most frequently cited barriers."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>Michael (2003)'s framework groups barriers to active learning into only two categories: time and money.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Michael's framework has four categories: student characteristics, teacher characteristics, pedagogical characteristics, and institutional/environmental characteristics. Time and cost are examples that surfaced most often within those categories, not the categories themselves."></div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>A faculty member believes that no matter what they do in the classroom, their students' performance is determined by the students' own prior preparation, not by teaching method. This best illustrates:</div>
    <button class="opt" data-i="0">A growth mindset</button>
    <button class="opt" data-i="1">An external locus of control</button>
    <button class="opt" data-i="2">An internal locus of control</button>
    <button class="opt" data-i="3">A pedagogical-characteristics barrier</button>
    <div class="fb" data-explain="Believing outcomes are controlled by something outside yourself (the students, not your teaching choices) is the definition of an external locus of control &mdash; and it predicts lower willingness to adopt active learning, since changing your teaching feels pointless."></div>
  </div>

  <table class="match" id="l3-match1">
    <tr><td class="match-term">Time</td><td><select class="match-def"><option value="">choose&hellip;</option></select></td></tr>
    <tr><td class="match-term">Cost</td><td><select class="match-def"><option value="">choose&hellip;</option></select></td></tr>
    <tr><td class="match-term">Institutional climate</td><td><select class="match-def"><option value="">choose&hellip;</option></select></td></tr>
    <tr><td class="match-term">Locus of control</td><td><select class="match-def"><option value="">choose&hellip;</option></select></td></tr>
    <tr><td class="match-term">Growth mindset</td><td><select class="match-def"><option value="">choose&hellip;</option></select></td></tr>
  </table>
  <div class="toolbar"><button class="btn small" onclick="checkMatch('l3-match1','fb-l3-match1',['Redesign and in-class time cost most frequently cited by faculty','Effort/labor cost, and sometimes physical renovation cost','Whether a department rewards or discourages teaching innovation','Belief about whether your actions can change outcomes','Belief that teaching ability improves with effort and practice'])">Check matches</button></div>
  <div class="fb" id="fb-l3-match1"></div>
</section>

<section class="topic" id="l3-classrooms">
  <h2>Active Learning Classrooms</h2>
  <p>Because "institutional/environmental" barriers include physical space, several universities built classrooms
  specifically designed for active learning &mdash; round tables instead of rows, whiteboards on every wall,
  multiple screens, no obvious "front" of the room. Both papers reference these as a distinct condition worth
  studying on their own, separate from the teaching method used inside them.</p>

  <div class="reqrow">
    <div class="req-list" id="l3-classroom-list">
      <button class="req-btn active" onclick="classroomShow(this,'scaleup')">SCALE-UP &mdash; NC State</button>
      <button class="req-btn" onclick="classroomShow(this,'teal')">TEAL &mdash; MIT</button>
      <button class="req-btn" onclick="classroomShow(this,'acl')">ACL &mdash; University of Minnesota</button>
    </div>
    <div class="req-detail" id="l3-classroom-detail" style="flex:2;min-width:260px">
      Click a project to see what it changed about the physical classroom.
    </div>
  </div>

  <div class="warn"><b>Common mix-up:</b> the physical classroom (round tables, whiteboards, no fixed "front") and
  the teaching method (peer instruction, POGIL, lecture) are <b>two separate variables</b>. A university can put a
  conventional lecture into a fancy active-learning room, or run peer instruction in a plain lecture hall. This
  distinction is exactly what the Greer et al. study is designed to tease apart &mdash; see the next topic.</div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>Active learning classrooms like SCALE-UP, TEAL, and ACL are defined by their physical layout (seating, whiteboards, screens), not by which teaching method an instructor uses inside them.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="These are room-design projects. An instructor could still lecture the whole time inside one, which is exactly why environment and pedagogy need to be studied as separate factors."></div>
  </div>
</section>

<section class="topic" id="l3-survey">
  <h2>The Eickholt Survey</h2>
  <h3>Design</h3>
  <div class="card">
    <p>Eickholt surveyed CS <b>faculty</b> and <b>administrators</b> (department chairs/deans) separately, using
    mostly <b>Likert-scale</b> questions (e.g., "strongly disagree" to "strongly agree" on statements about active
    learning) plus some open-ended questions, which were analyzed qualitatively and summarized with
    <b>word clouds</b> showing which words/themes recurred most often across free-text responses.</p>
  </div>
  <h3>Key finding: a perception gap</h3>
  <div class="concept">The headline result is a <b>gap between faculty and administrator perceptions</b>.
  Administrators tended to rate their department as more supportive of active learning, and to believe barriers
  like time/cost were less severe, than faculty actually experienced them to be. In other words, the people
  making resourcing and reward decisions often underestimate how real the obstacles are for the people doing the
  teaching.</div>
  <p class="muted">Simple version: administrators think it's easier for professors to switch to active learning
  than professors say it actually is.</p>

  <div class="q" data-mc="0">
    <div class="prompt"><span class="tag">MC</span>What is the headline finding of Eickholt's faculty/administrator survey?</div>
    <button class="opt" data-i="0">Administrators tend to underestimate the barriers to active learning that faculty actually experience</button>
    <button class="opt" data-i="1">Faculty and administrators agree completely on what's holding back active learning</button>
    <button class="opt" data-i="2">Administrators want less active learning than faculty do</button>
    <button class="opt" data-i="3">Time and cost were not mentioned by either group</button>
    <div class="fb" data-explain="The survey found a perception gap: administrators rated support higher and barriers lower than faculty reported experiencing them."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>Eickholt's survey used mostly <input class="fillblank" data-answer="likert|likert-scale|likert scale" placeholder="scale type"> questions, supplemented by open-ended responses summarized with word clouds.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Likert-scale items (agree/disagree ratings) formed the quantitative core of the survey."></div>
  </div>
</section>

<section class="topic" id="l3-study">
  <h2>The Greer et al. Replication Study</h2>
  <div class="concept">Greer, Hao, Jing, and Barnes design a study specifically to answer the question the
  classroom-design projects raise: <b>does the physical environment drive better outcomes, or does the teaching
  method (pedagogy) drive better outcomes?</b> Earlier active-learning-classroom studies often changed both the
  room and the method at the same time, so nobody could tell which one deserved the credit.</div>

  <h3>The Three-Group design</h3>
  <p>To separate environment from pedagogy, the study places three sections of the same course into three
  different combinations:</p>
  <table class="cmp">
    <tr><th>Course</th><th>Environment</th><th>Pedagogy</th></tr>
    <tr><td><b>Course One</b></td><td>Conventional classroom</td><td>Lecture</td></tr>
    <tr><td><b>Course Two</b></td><td>Active learning classroom</td><td>Peer instruction</td></tr>
    <tr><td><b>Course Three</b> ("Hybrid")</td><td>Conventional classroom</td><td>Peer instruction</td></tr>
  </table>
  <div class="warn"><b>Why this design matters:</b> Course One vs. Course Two changes <i>both</i> variables at
  once (classic confound). Course Three vs. Course One isolates <b>pedagogy alone</b> (same room, different
  method). Course Three vs. Course Two isolates <b>environment alone</b> (same method, different room). That's
  the whole trick of the design &mdash; the "Hybrid" course is what makes the comparison possible.</div>

  <h3>Analysis methods</h3>
  <div class="card">
    <p>The researchers compared outcomes (like exam/assignment performance) across the three courses using
    <b>MANCOVA</b> (Multivariate Analysis of Covariance) &mdash; a statistical test for differences across groups
    on multiple outcome measures at once, while controlling for covariates (like prior GPA) that could otherwise
    explain the difference. Because comparing three groups pairwise multiplies the chance of a false positive,
    they applied a <b>Bonferroni correction</b> (a stricter significance threshold to account for multiple
    comparisons), and used <b>discriminant analysis</b> to see which specific outcome measures were driving the
    group differences that MANCOVA detected.</p>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>Why does the Greer et al. study include a "Hybrid" course (conventional classroom + peer instruction)?</div>
    <button class="opt" data-i="0">It's a control group that receives no instruction</button>
    <button class="opt" data-i="1">It replaces the need for a conventional lecture course entirely</button>
    <button class="opt" data-i="2">It isolates pedagogy from environment by holding the room constant while changing the teaching method</button>
    <button class="opt" data-i="3">It was only added because Course One and Course Two had scheduling conflicts</button>
    <div class="fb" data-explain="The Hybrid course keeps the environment the same as Course One (conventional room) but changes only the pedagogy, which is exactly what lets the researchers attribute any performance difference to teaching method rather than room design."></div>
  </div>

  <div class="q" data-multi="0,1">
    <div class="prompt"><span class="tag">Select all</span>Which statistical tools does the Greer et al. study use in its analysis?</div>
    <div class="ma-item"><input type="checkbox" data-i="0"><span>MANCOVA</span></div>
    <div class="ma-item"><input type="checkbox" data-i="1"><span>Bonferroni correction</span></div>
    <div class="ma-item"><input type="checkbox" data-i="2"><span>Word-cloud coding of open-ended responses</span></div>
    <div class="ma-item"><input type="checkbox" data-i="3"><span>A single unpaired t-test between only two groups</span></div>
    <div class="fb" data-explain="MANCOVA (with covariates), Bonferroni-corrected pairwise comparisons, and discriminant analysis are Greer et al.'s tools. Word clouds are Eickholt's qualitative method, not Greer et al.'s statistical one, and the design compares three groups, not two."></div>
  </div>
</section>

<section class="topic" id="l3-findings">
  <h2>Findings &amp; Takeaways</h2>
  <div class="concept"><b>The core finding:</b> performance differences tracked <b>pedagogy</b>, not
  <b>environment</b>. Course Two and Course Three (both taught with peer instruction) performed similarly to each
  other and better than Course One (lecture) &mdash; even though Course Three used the same plain, conventional
  room as Course One. The active-learning <i>classroom</i> by itself, without a matching change in teaching
  method, was not what produced the benefit.</div>
  <p class="muted">Simple version: it's not the fancy room that helps students learn &mdash; it's what the
  instructor does with the class time. You can get most of the benefit with round tables optional, whiteboards
  optional, peer instruction required.</p>

  <div class="two">
    <div class="card"><h4>Why this matters practically</h4><p>Retrofitting classrooms into SCALE-UP/TEAL/ACL-style
    rooms is expensive &mdash; exactly the "cost" barrier Eickholt's survey identifies. Greer et al.'s finding is
    good news for adoption: a department that can't afford a room renovation can still get most of the learning
    benefit by changing pedagogy alone in an ordinary room.</p></div>
    <div class="card"><h4>How this connects back to barriers</h4><p>This directly undercuts the "institutional/
    environmental" barrier as an excuse &mdash; a program doesn't need a capital construction project to start
    getting the benefits of active learning; it needs faculty willing and supported to change how they teach.</p></div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>What did Greer et al. conclude drives the performance difference between the three courses?</div>
    <button class="opt" data-i="0">The physical classroom environment, independent of teaching method</button>
    <button class="opt" data-i="1">The teaching method (pedagogy), not the physical environment</button>
    <button class="opt" data-i="2">Neither pedagogy nor environment had any measurable effect</button>
    <button class="opt" data-i="3">Class size was the only significant factor</button>
    <div class="fb" data-explain="Course Three (conventional room + peer instruction) performed like Course Two (active classroom + peer instruction) and better than Course One (conventional room + lecture) &mdash; pedagogy, not the room, tracked with the outcome."></div>
  </div>
</section>

<section class="topic" id="l3-check">
  <h2>Reading Quiz 3 Self-Check</h2>
  <p class="muted">A mixed review pulling together both readings. No instructor terms/concepts reminder was
  circulated for this quiz, so these questions are drawn straight from each paper's own vocabulary and findings.</p>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>Active learning is grounded in the idea that students should engage with material and reflect on their own understanding, not just receive information passively.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Engagement plus metacognitive reflection is the through-line definition used by both papers."></div>
  </div>

  <div class="q" data-mc="3">
    <div class="prompt"><span class="tag">MC</span>Which of these is <i>not</i> one of Michael (2003)'s four categories of barriers to active learning?</div>
    <button class="opt" data-i="0">Student characteristics</button>
    <button class="opt" data-i="1">Teacher characteristics</button>
    <button class="opt" data-i="2">Institutional/environmental characteristics</button>
    <button class="opt" data-i="3">Geographic characteristics</button>
    <div class="fb" data-explain="The four categories are student, teacher, pedagogical, and institutional/environmental characteristics. Geographic characteristics is not one of them."></div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>In Eickholt's survey, who tended to underestimate the barriers faculty face in adopting active learning?</div>
    <button class="opt" data-i="0">Students</button>
    <button class="opt" data-i="1">Faculty themselves</button>
    <button class="opt" data-i="2">Administrators</button>
    <button class="opt" data-i="3">TAs</button>
    <div class="fb" data-explain="Administrators rated their departments as more supportive and barriers as less severe than faculty reported experiencing."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>In the Greer et al. study, Course Two (active classroom + peer instruction) significantly outperformed Course Three (conventional classroom + peer instruction).</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Course Two and Course Three performed similarly to each other &mdash; both used peer instruction &mdash; which is exactly how the study shows pedagogy, not the room, drives the difference."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>A faculty member with an internal <input class="fillblank sm" data-answer="locus of control|locus" placeholder="term"> believes their own teaching choices can change student outcomes, which the Eickholt paper links to greater willingness to try active learning.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Internal locus of control = believing you can influence outcomes through your own actions."></div>
  </div>

  <div class="q" data-multi="1,2,3">
    <div class="prompt"><span class="tag">Select all</span>Which of these were named as active-learning classroom design projects?</div>
    <div class="ma-item"><input type="checkbox" data-i="0"><span>POGIL (NC State)</span></div>
    <div class="ma-item"><input type="checkbox" data-i="1"><span>SCALE-UP (NC State)</span></div>
    <div class="ma-item"><input type="checkbox" data-i="2"><span>TEAL (MIT)</span></div>
    <div class="ma-item"><input type="checkbox" data-i="3"><span>ACL (University of Minnesota)</span></div>
    <div class="fb" data-explain="SCALE-UP, TEAL, and ACL are classroom-design projects. POGIL is a teaching technique, not a room."></div>
  </div>

  <div class="q" data-mc="0">
    <div class="prompt"><span class="tag">MC</span>What statistical adjustment did Greer et al. apply to account for making multiple pairwise comparisons across three courses?</div>
    <button class="opt" data-i="0">A Bonferroni correction</button>
    <button class="opt" data-i="1">A word-cloud analysis</button>
    <button class="opt" data-i="2">A Likert-scale weighting</button>
    <button class="opt" data-i="3">A locus-of-control adjustment</button>
    <div class="fb" data-explain="The Bonferroni correction tightens the significance threshold to control the increased false-positive risk from multiple pairwise comparisons."></div>
  </div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>Time and cost were the barriers CS faculty reported most frequently in Eickholt's survey.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Time (redesign + in-class) and cost (labor and sometimes renovation) topped the list."></div>
  </div>
</section>
`;

function classroomShow(btn, key) {
  document.querySelectorAll('#l3-classroom-list .req-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const info = {
    scaleup: "<b>SCALE-UP</b> (Student-Centered Active Learning Environment with Upside-down Pedagogies), developed at NC State: round tables seating groups of 9 (3 teams of 3), whiteboards around the room, no fixed 'front' &mdash; designed so the instructor circulates among groups rather than lecturing from a podium.",
    teal: "<b>TEAL</b> (Technology-Enabled Active Learning), developed at MIT: round tables with networked laptops/shared screens at each, originally built for physics, blending lecture, simulation, and hands-on group work in the same room.",
    acl: "<b>ACL</b> (Active Learning Classrooms), University of Minnesota: round tables, glass whiteboards, multiple wall-mounted screens students can project to from their own laptops, explicitly studied for its effect on learning outcomes across many departments."
  };
  document.getElementById('l3-classroom-detail').innerHTML = info[key];
}

function initL3() {
  classroomShow(document.querySelector('#l3-classroom-list .req-btn'), 'scaleup');
}
