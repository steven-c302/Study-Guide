/* ============================================================
   LESSON 2 — "Constructivism in Computer Science Education"
   Reading Quiz 2 (due Tu 9/8):
     - Ben-Ari, M. (2001). "Constructivism in Computer Science
       Education." Jl. of Computers in Mathematics and Science
       Teaching, 20(1), 45-73.
   Every vocabulary term and "question to think about" from the
   instructor's Reading Quiz 2 terms/concepts reminder is covered.
   Injects into #l2. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal below
   must be written \\ .
   ============================================================ */
document.getElementById('l2').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l2-theory')">Constructivism &amp; Models</button>
  <button onclick="showTopic(this,'l2-paradigm')">Ernest's Educational Paradigm</button>
  <button onclick="showTopic(this,'l2-construction')">How Knowledge Is Built</button>
  <button onclick="showTopic(this,'l2-teaching')">Bricolage, Minimalism &amp; Labs</button>
  <button onclick="showTopic(this,'l2-csclaims')">Ben-Ari's Claims About CS</button>
  <button onclick="showTopic(this,'l2-questions')">The 10 Questions, Answered</button>
  <button onclick="showTopic(this,'l2-check')">Reading Quiz 2 Self-Check</button>
</nav>
<main>

<!-- ============ CONSTRUCTIVISM & MODELS ============ -->
<section class="topic active" id="l2-theory">
  <h2>Lesson 2 &middot; Constructivism, Misconceptions &amp; Mental Models</h2>

  <div class="concept"><b>Constructivism:</b> the dominant theory of learning today, claiming students actively
  <i>construct</i> knowledge rather than passively receive and store it from a teacher. Because construction
  builds recursively on knowledge the student already has, each student ends up with a slightly idiosyncratic
  version of the knowledge. Where that version isn't identical to "standard" knowledge, the student is said to
  have a <b>misconception</b>.</div>

  <div class="card">
    <h3 style="margin-top:0">Worked example: WYSIWYG word processors (Ben-Ari's motivating case)</h3>
    <p>You type a title, select it, request boldface. As you keep typing the rest of the paper, it's <i>also</i>
    boldface. Why? Your pre-existing model of a word processor &mdash; "it's just like writing with pen and
    paper" &mdash; explains normal use, but has no way to explain this.</p>
    <table class="cmp">
      <tr><th>What you (think you) get</th><th>What you actually get</th></tr>
      <tr><td>Blobs of ink placed sequentially on paper</td><td>A <b>data structure</b> storing text plus formatting symbols (e.g., <code>&lt;b&gt;</code>, <code>&lt;br&gt;</code>) and a <b>set of operations</b> on that data structure &mdash; what you see on screen is a rendering of it</td></tr>
    </table>
    <p class="muted">If your selection to bold included an invisible line-break character, text typed <i>before</i>
    that line break gets boldfaced too &mdash; perfectly explicable once you have the real model, inexplicable
    with the "ink on paper" model.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Three key terms, applied to that example</h3>
    <table class="cmp">
      <tr><th>Term</th><th>Meaning</th><th>In the WYSIWYG example</th></tr>
      <tr><td><b>Misconception</b></td><td>Not a careless error &mdash; a logically consistent, non-standard theory built from real prior knowledge</td><td>"It's like ink on paper" is perfectly reasonable, just wrong for this artifact</td></tr>
      <tr><td><b>Viable / non-viable model</b></td><td>Viable = lets you successfully predict/act; non-viable = leads you to fail</td><td>The ink-on-paper model is <i>viable</i> for ordinary typing, <i>non-viable</i> the moment formatting and invisible line breaks are involved</td></tr>
      <tr><td><b>Effective model</b></td><td>A cognitive structure detailed enough to support further viable construction from experience</td><td>Understanding "data structure + operations on it" is what lets you correctly predict &amp; fix formatting surprises going forward</td></tr>
    </table>
  </div>

  <div class="warn"><b>Commonly missed point.</b> A misconception is not "not trying hard enough." Ben-Ari is
  explicit: the problem is "caused not by stupidity on the part of the novice, nor by incorrectly following the
  instructions, but by a misconception" &mdash; the absence of a viable model that can explain the novel
  situation.</div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does typing text after selecting "bold" sometimes make later, unselected text boldface too?</div>
      <button class="opt" data-i="0">The word processor is buggy and this shouldn't happen</button>
      <button class="opt" data-i="1">Your selection likely included an invisible line-break symbol; since formatting is stored as symbols in a data structure, not "ink," the boldface tag now applies to more than you intended</button>
      <button class="opt" data-i="2">Word processors always bold everything after the title</button>
      <button class="opt" data-i="3">This can't happen if you understand the ink-on-paper model correctly</button>
      <div class="fb">This is exactly the scenario in Figs. 1&ndash;2: the underlying reality is a data structure of
      symbols including invisible ones, not literal ink &mdash; the ink-on-paper model has no way to predict
      this.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Per Ben-Ari, a student's misconception is best explained by carelessness or not following instructions closely enough.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; misconceptions are logical constructions from real prior knowledge, "caused not
      by stupidity... nor by incorrectly following instructions, but by a misconception" (the lack of a viable
      model for this situation).</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>A student's mental model of a variable as a "box" correctly predicts simple assignment, but breaks down on <code>read(A,B); read(B); write(A,B,B);</code>. This model is:</div>
      <button class="opt" data-i="0">An effective model, since it worked for a while</button>
      <button class="opt" data-i="1">Not a real model at all, just a guess</button>
      <button class="opt" data-i="2">A viable model for simple cases that turns out to be non-viable once reads/writes get more complex</button>
      <button class="opt" data-i="3">Proof the student has no prior knowledge to build from</button>
      <div class="fb">Viability is task-dependent: a model can be viable for the tasks it was built to explain and
      non-viable the moment it meets a case &mdash; like double-reads &mdash; it can't account for.</div>
    </div>
  </div>
</section>

<!-- ============ ERNEST'S EDUCATIONAL PARADIGM ============ -->
<section class="topic" id="l2-paradigm">
  <h2>Lesson 2 &middot; Ernest's Four-Part "Educational Paradigm"</h2>

  <div class="concept">Ernest (1995) frames a coherent educational worldview as four components. Ben-Ari uses
  this framework specifically to contrast the <b>classical</b> and <b>constructivist</b> paradigms cleanly.</div>

  <div class="card">
    <h3 style="margin-top:0">Click each component to compare the two paradigms</h3>
    <div class="reqrow">
      <div class="req-list">
        <button class="req-btn" onclick="paradigmShow(this,'onto')">Ontology &mdash; theory of existence</button>
        <button class="req-btn" onclick="paradigmShow(this,'epist')">Epistemology &mdash; theory of knowledge</button>
        <button class="req-btn" onclick="paradigmShow(this,'meth')">Methodology &mdash; acquiring/validating knowledge</button>
        <button class="req-btn" onclick="paradigmShow(this,'ped')">Pedagogy &mdash; theory of teaching</button>
        <div class="req-detail" id="paradigm-detail">Click a component to compare the classical and constructivist answers.</div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each term to its definition</h3>
    <table class="match" id="match-paradigm">
      <tr><td class="match-term">Ontology</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="o">A theory of existence &mdash; what is really "out there"</option>
        <option value="e">A theory of knowledge, both individual and shared</option>
        <option value="m">The method for acquiring and validating knowledge</option>
        <option value="p">A theory of teaching</option></select></td></tr>
      <tr><td class="match-term">Epistemology</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="o">A theory of existence &mdash; what is really "out there"</option>
        <option value="e">A theory of knowledge, both individual and shared</option>
        <option value="m">The method for acquiring and validating knowledge</option>
        <option value="p">A theory of teaching</option></select></td></tr>
      <tr><td class="match-term">Methodology</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="o">A theory of existence &mdash; what is really "out there"</option>
        <option value="e">A theory of knowledge, both individual and shared</option>
        <option value="m">The method for acquiring and validating knowledge</option>
        <option value="p">A theory of teaching</option></select></td></tr>
      <tr><td class="match-term">Pedagogy</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="o">A theory of existence &mdash; what is really "out there"</option>
        <option value="e">A theory of knowledge, both individual and shared</option>
        <option value="m">The method for acquiring and validating knowledge</option>
        <option value="p">A theory of teaching</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-paradigm','fb-match-paradigm',['o','e','m','p'])">Check</button>
    <div class="fb" id="fb-match-paradigm"></div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does it mean for constructivist epistemology to be "nonfoundationalist and fallible"?</div>
      <button class="opt" data-i="0">Knowledge rests on absolute, unshakeable truths like 2+2=4</button>
      <button class="opt" data-i="1">There is no foundation of absolute truth to build on &mdash; even "2+2=4" is not a necessary truth, and all knowledge is a fallible, revisable construction</button>
      <button class="opt" data-i="2">Only mathematics can be known with certainty</button>
      <button class="opt" data-i="3">It means the same thing as "foundational"</button>
      <div class="fb">Ben-Ari is explicit that in constructivism, "absolute truth is unattainable, so there is no
      foundation of truth on which to build. Even 2+2=4 is not a necessary truth."</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>The classical paradigm and the constructivist paradigm mainly disagree about teaching technique (e.g., lecturing vs. group work), not about deeper questions of existence or knowledge.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. Ben-Ari notes constructivism doesn't reject lecturing itself (Mason: "many educators
      espousing constructivism have been known to attend lectures... and to have enjoyed them"). The real
      divide is in ontology and epistemology &mdash; pedagogy is just the downstream consequence.</div>
    </div>
  </div>
</section>

<!-- ============ HOW KNOWLEDGE IS BUILT ============ -->
<section class="topic" id="l2-construction">
  <h2>Lesson 2 &middot; Recursive Construction, Radical &amp; Social Constructivism</h2>

  <div class="concept"><b>Recursive knowledge construction:</b> sensory data combines with <i>existing</i>
  knowledge to create new cognitive structures, which then become the basis for further construction. This
  traces to Piaget's work on how children acquire knowledge.</div>

  <div class="card">
    <h3 style="margin-top:0">Two variants of constructivism</h3>
    <table class="cmp">
      <tr><th>Variant</th><th>Emphasis</th></tr>
      <tr><td><b>Radical constructivism</b></td><td>Individual cognition is central; taken to an extreme, critics warn it can slide toward <i>solipsism</i> &mdash; the world as nothing but your own mental creation</td></tr>
      <tr><td><b>Social constructivism</b></td><td>Knowledge is constructed through social interaction and negotiation, not solely inside one mind; has a lot to say about the role of peers and the teacher, and (Ben-Ari argues) about the documented social difficulties women face in CS classrooms/labs</td></tr>
    </table>
  </div>

  <div class="warn"><b>Why passive learning is expected to fail.</b> Because each student brings a different
  cognitive framework and will construct new knowledge differently, a lecture or textbook can't just "pour"
  identical knowledge into every student. Constructivists argue learning must be <b>active</b>: the student
  constructs knowledge assisted by teacher guidance and feedback, not by absorbing a transmission.</div>

  <div class="card">
    <div class="q">
      <p>Fill in the blank: because knowledge construction is <input type="text" class="fillblank" data-answer="recursive" placeholder="?">, new knowledge is built by combining sensory data with knowledge the student <i>already</i> has &mdash; which is why passive transmission can't guarantee two students end up with the same understanding.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Recursive. Each round of construction uses the previous round's output as raw material.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which variant of constructivism does Ben-Ari invoke to discuss the social difficulties women face in CS classrooms and labs, and to argue for closed labs?</div>
      <button class="opt" data-i="0">Radical constructivism</button>
      <button class="opt" data-i="1">Social constructivism</button>
      <button class="opt" data-i="2">Minimalism</button>
      <button class="opt" data-i="3">Neither &mdash; this is outside the scope of constructivism entirely</button>
      <div class="fb">Social constructivism, since it has "a lot to say about the task of the teacher and the role
      of peers in education."</div>
    </div>
  </div>
</section>

<!-- ============ BRICOLAGE, MINIMALISM & LABS ============ -->
<section class="topic" id="l2-teaching">
  <h2>Lesson 2 &middot; Bricolage, Minimalism, Notional Machines &amp; Lab Design</h2>

  <div class="card">
    <h3 style="margin-top:0">Bricolage vs. planning</h3>
    <p><b>Bricolage</b> (Lévi-Strauss's "science of the concrete," reframed by Turtle &amp; Papert as a valid
    learning style) is tinkering with whatever's at hand &mdash; in programming, this is <b>endless debugging</b>:
    try it and see what happens.</p>
    <div class="danger"><b>Its limits, per Ben-Ari.</b> Bricolage is fine, even essential, for novices in intro
    courses &mdash; but it is <b>not a viable methodology for professional software engineering</b>, and it fails
    outright on non-deterministic, concurrent, or real-time systems, which can only be mastered through
    abstract technique. Students who excel at bricolage, he warns, often struggle to transition to the abstract
    methods those systems require.</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Minimalism</h3>
    <p>An instructional-design approach from software-manual writing (Carroll): let learners start immediately
    on realistic tasks, minimize passive reading, and treat errors as productive rather than as failures.</p>
    <table class="cmp">
      <tr><th>Overlaps with constructivism</th><th>Diverges from constructivism</th></tr>
      <tr><td>Prefers active learning; respects pre-existing knowledge; treats errors as a pedagogical device, not a symptom of failure</td><td>Emphasizes &mdash; even insists on &mdash; eliminating or deferring conceptual material as long as possible ("a welcome-to-the-system preface... obstructs the goal"); constructivism instead requires a viable model to eventually be <b>explicitly</b> built</td></tr>
    </table>
    <p class="muted">Ben-Ari's own experiment (modifying Word documents) found that even sophisticated users
    restrict themselves to elementary bricolage techniques and never engage the underlying concepts &mdash;
    evidence that minimalism alone isn't sufficient once tasks go beyond the elementary.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Notional machine / epistemic game</h3>
    <p>A <b>notional machine</b> is a deliberately simplified, teachable model of how the underlying machine
    works &mdash; enough structure to reason correctly without full technical fidelity. An <b>epistemic
    game</b> is a more formalized procedure or tool for building this model. Ben-Ari's own example: three cheap
    calculators taped to a board, each representing one variable, used to physically demonstrate assignment
    statements &mdash; without ever touching a real, programmable computer.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Closed lab vs. open lab</h3>
    <table class="cmp">
      <tr><th>Closed lab</th><th>Open lab</th></tr>
      <tr><td>Supervised session at an appointed time, everyone working together</td><td>Students work on assignments whenever convenient, typically alone</td></tr>
    </table>
    <p>From a (especially <i>social</i>) constructivist viewpoint, closed labs should be preferable: they soften
    the "brutality" of interacting with the computer and facilitate the social interaction Ben-Ari sees as
    necessary for construction. He cites Thweatt (1994) as empirical evidence for the superiority of closed
    labs.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does Ben-Ari say bricolage is not sufficient for professional software engineering?</div>
      <button class="opt" data-i="0">Non-deterministic, concurrent, or real-time systems can only be mastered through abstract technique, which trial-and-error tinkering can't provide</button>
      <button class="opt" data-i="1">Bricolage is only useful for graphic design, not programming</button>
      <button class="opt" data-i="2">Professional engineers never make mistakes, so debugging is unnecessary</button>
      <button class="opt" data-i="3">Bricolage is banned by most software engineering standards bodies</button>
      <div class="fb">Bricolage (try it and see) has no answer for systems whose complexity can only be handled
      through structured, abstract reasoning &mdash; concurrency and real-time systems are Ben-Ari's specific
      examples.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Minimalism and constructivism fully agree on how much conceptual/model material to include in instruction.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; this is exactly where they diverge. Minimalism wants to defer or eliminate
      conceptual material as long as possible; constructivism insists a viable model must eventually be
      explicitly built.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What is a "notional machine"?</div>
      <button class="opt" data-i="0">The literal, full electronic specification of a CPU</button>
      <button class="opt" data-i="1">A synonym for bricolage</button>
      <button class="opt" data-i="2">A deliberately simplified, teachable model of how the underlying machine works, detailed enough to support correct reasoning without full technical fidelity</button>
      <button class="opt" data-i="3">A type of programming language</button>
      <div class="fb">Right &mdash; it's a simplification built for teaching, like the three-calculators-on-a-board
      epistemic game for demonstrating assignment.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which lab format does a (social) constructivist viewpoint favor, and why?</div>
      <button class="opt" data-i="0">Open labs, because students learn best completely alone</button>
      <button class="opt" data-i="1">Closed labs, because they soften the brutality of computer feedback and facilitate the social interaction needed for construction</button>
      <button class="opt" data-i="2">Neither &mdash; lab format has no bearing on constructivism</button>
      <button class="opt" data-i="3">Open labs, because they're empirically proven superior</button>
      <div class="fb">Closed labs &mdash; Ben-Ari cites Thweatt (1994) as empirical support, and connects the
      preference specifically to social constructivism's emphasis on peer interaction.</div>
    </div>
  </div>
</section>

<!-- ============ BEN-ARI'S CLAIMS ABOUT CS ============ -->
<section class="topic" id="l2-csclaims">
  <h2>Lesson 2 &middot; Ben-Ari's Two Claims About CS &amp; Their Conclusions</h2>

  <div class="concept">Ben-Ari's central argument: computer science education has <b>two characteristics that
  don't appear in the natural sciences</b>, and from these, three conclusions follow.</div>

  <div class="card">
    <h3 style="margin-top:0">Claim 1 &mdash; No effective model of a computer</h3>
    <p>A beginning CS student typically has <b>no effective model of a computer at all</b> &mdash; unlike, say, a
    physics student, who at least brings an intuitive (if wrong, Aristotelian/Newtonian) model of motion that
    is genuinely <i>effective</i> for everyday predictions ("everyone who has ever thrown a ball knows that if
    you don't keep applying force, an object in motion will eventually come to rest"). Studies (Taylor 1990;
    Sleeman et al. 1988) show CS students' models are, at best, non-viable "grossly anthropomorphic giant
    brain" metaphors.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Claim 2 &mdash; Accessible ontological reality</h3>
    <p>The computer gives <b>immediate, brutal, unambiguous feedback</b>. Unlike physics (you get your homework
    back a week later) or a discussion where meaning is socially negotiable, the consequences of a misconception
    show up as a <i>bug</i>, right now. A "correct" answer is directly checkable, and there's no room to argue
    that a crashing program is "a matter of interpretation."</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">The three conclusions that follow</h3>
    <table class="cmp">
      <tr><th>Conclusion</th><th>Why it follows</th></tr>
      <tr><td><b>(a) Models must be explicitly taught</b></td><td>Since students bring no effective model on their own (Claim 1), leaving model-building to chance or "facile analogies" produces haphazard, non-viable models</td></tr>
      <tr><td><b>(b) Models must be taught before abstractions</b></td><td>The <b>object-oriented paradox</b>: abstraction is supposed to follow (Piaget: accommodation follows assimilation of) detailed understanding, but beginners never had that detail to begin with, so they can't meaningfully "forget" it to form an abstraction. Objects-first curricula risk this exact trap</td></tr>
      <tr><td><b>(c) The computer's seductive reality must not replace model construction</b></td><td>Because feedback is so immediate (Claim 2), students can fall into pure bricolage &mdash; "try it and see" &mdash; without ever building the underlying model, since the computer's reality feels sufficient on its own</td></tr>
    </table>
  </div>

  <div class="warn"><b>The object-oriented paradox, restated simply.</b> To treat something as an abstraction
  (like a <code>Window</code> object), you're supposed to have first understood the messy detail underneath it
  and then chosen to set that detail aside. A true beginner never had that detail in the first place &mdash; so
  what exactly are they "abstracting away"? This is Ben-Ari's core objection to objects-first introductory
  courses.</div>

  <div class="card">
    <div class="q" data-multi="0,1">
      <div class="prompt"><span class="tag">Select all that apply</span>Which two claims does Ben-Ari make about how CS education differs from other STEM fields like physics?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Beginning CS students do not have an effective model of a computer</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> Computers form an accessible ontological reality &mdash; feedback is immediate and unambiguous</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> CS students are, on average, less intelligent than physics students</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> Programming languages are impossible to teach using constructivist principles</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">The two claims (from the abstract) are exactly (a) no effective model of a computer, and (b)
      the computer is an accessible ontological reality.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the "object-oriented paradox"?</div>
      <button class="opt" data-i="0">Objects are always easier to teach than procedures</button>
      <button class="opt" data-i="1">There is no paradox &mdash; OOP is unambiguously the best first paradigm</button>
      <button class="opt" data-i="2">Abstraction is supposed to follow detailed understanding, but beginners never had that detail to forget in the first place &mdash; so how can they meaningfully grasp an object as an abstraction?</button>
      <button class="opt" data-i="3">Objects can only be represented using inheritance</button>
      <div class="fb">Exactly &mdash; this is Ben-Ari's central objection to objects-first curricula, grounded in
      Piaget's claim that abstraction/accommodation follows assimilation of concrete detail.</div>
    </div>

    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>Ben-Ari argues the "seductive reality" of the computer can actually work against constructivist learning if it isn't managed carefully.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True &mdash; this is conclusion (c). Because the computer's immediate feedback feels
      sufficient, students can substitute pure trial-and-error for real model construction unless instructors
      guard against it.</div>
    </div>
  </div>
</section>

<!-- ============ THE 10 QUESTIONS, ANSWERED ============ -->
<section class="topic" id="l2-questions">
  <h2>Lesson 2 &middot; The Instructor's 10 "Questions to Think About"</h2>
  <p class="muted">These are the exact questions from the Reading Quiz 2 reminder, each with a full answer and a
  graded recall item.</p>

  <div class="card">
    <h4>1. What is the classical (non-constructivist) view of how knowledge is transmitted, and how does it differ from the constructivist view?</h4>
    <p>Classical: an ontological reality exists independently; epistemology is foundational (built on absolute
    truths via logical deduction); the mind is a "clean slate" that lectures/books can fill directly (the
    "Nurnberg Funnel"). Constructivist: ontology is rejected/irrelevant; epistemology is nonfoundationalist and
    fallible; knowledge is recursively self-constructed by each student from their own existing structures, so
    it cannot simply be poured in.</p>
  </div>

  <div class="card">
    <h4>2. What is Ernest's four-part framework for describing an "educational paradigm"?</h4>
    <p>Ontology (theory of existence), epistemology (theory of knowledge), methodology (method for acquiring and
    validating knowledge), and pedagogy (theory of teaching) &mdash; see the Ernest topic above.</p>
  </div>

  <div class="card">
    <h4>3. What are the two claims Ben-Ari makes about how CS education differs from other STEM fields (e.g., physics)? What conclusions does he draw from them?</h4>
    <p>(a) Beginning CS students have no effective model of a computer; (b) the computer forms an accessible
    ontological reality (immediate, brutal, unambiguous feedback). Conclusions: (a) models must be explicitly
    taught, (b) models must be taught before abstractions, (c) the computer's seductive reality must not be
    allowed to replace real model construction.</p>
  </div>

  <div class="card">
    <h4>4. Why does Ben-Ari say a misconception should not be treated as a simple mistake?</h4>
    <p>Because it's a logically consistent, non-standard theory the student genuinely constructed from real
    prior knowledge &mdash; not carelessness. Some researchers (Smith, diSessa &amp; Roschelle) go further,
    arguing misconceptions can even be essential prior knowledge for building the correct model.</p>
  </div>

  <div class="card">
    <h4>5. What role does the teacher play in a constructivist classroom, as opposed to a classical one?</h4>
    <p>Classical: deliver/transmit facts. Constructivist: actively guide construction &mdash; which is
    significantly harder, because guidance must be based on understanding each student's <i>current</i>,
    possibly non-viable cognitive structures, and helping them modify those structures rather than just
    supplying new facts.</p>
  </div>

  <div class="card">
    <h4>6. What does the WYSIWYG word processor example (Figures 1&ndash;2) illustrate about mental models?</h4>
    <p>That what you <i>see</i> (formatted text on screen) is a rendering of what you actually <i>get</i> (a data
    structure of text plus formatting symbols, some invisible, plus operations on it) &mdash; and that a
    plausible prior model (ink on paper) can be viable for ordinary use but non-viable the moment it meets a
    case, like an invisible line break, it can't explain.</p>
  </div>

  <div class="card">
    <h4>7. How does bricolage differ from a "planning" approach to programming, and what does Ben-Ari think its limits are?</h4>
    <p>Bricolage is tinkering/trial-and-error (endless debugging); planning is structured, abstract design.
    Ben-Ari accepts bricolage as valid, even essential, for novices, but says it is not a viable methodology for
    professional software engineering, and fails outright on non-deterministic, concurrent, or real-time
    systems that require abstract technique to master.</p>
  </div>

  <div class="card">
    <h4>8. How does minimalism overlap with constructivism, and where does Ben-Ari say it diverges?</h4>
    <p>Overlap: both favor active learning, respect pre-existing knowledge, and treat errors as pedagogically
    useful rather than failures. Divergence: minimalism emphasizes eliminating or deferring conceptual material
    as long as possible, while constructivism requires a viable model to eventually be explicitly built &mdash;
    Ben-Ari's own experiment found sophisticated users who relied purely on minimalist/bricolage technique never
    engaged the underlying concepts at all.</p>
  </div>

  <div class="card">
    <h4>9. Why does Ben-Ari argue that models should be taught *before* abstractions? What is the "object-oriented paradox"?</h4>
    <p>Because abstraction (per Piaget) is supposed to follow assimilation of concrete detail &mdash; but a true
    beginner never had that detail, so teaching an abstraction (like an object) before a viable underlying model
    exists risks a non-viable model that can't easily be fixed later. The object-oriented paradox is exactly
    this: how can you forget detail you never had?</p>
  </div>

  <div class="card">
    <h4>10. Why does Ben-Ari believe passive learning (e.g., straight lectures rather than active learning classrooms) is likely to fail in CS specifically?</h4>
    <p>Because each student constructs knowledge differently from their own existing structures, a lecture
    wrongly assumes "students know what the lecturer told them." In CS specifically, this is compounded by the
    accessible ontological reality of the computer: a non-viable model gets exposed immediately and brutally by
    a crashing program (not softened by a week's delay, as in physics, or negotiability, as in humanities
    discussion) &mdash; so only active, guided construction can build a model that survives contact with that
    reality.</p>
  </div>
</section>

<!-- ============ SELF-CHECK ============ -->
<section class="topic" id="l2-check">
  <h2>Lesson 2 &middot; Reading Quiz 2 Self-Check</h2>
  <p class="muted">Mixed review built directly from the instructor's Reading Quiz 2 terms/concepts reminder.</p>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Constructivism &amp; Models topic)</i> A model that successfully predicts and lets a student act correctly in a domain, even if not objectively "true," is called:</div>
      <button class="opt" data-i="0">A misconception</button>
      <button class="opt" data-i="1">A viable model</button>
      <button class="opt" data-i="2">A foundational model</button>
      <button class="opt" data-i="3">A notional machine</button>
      <div class="fb">Viable &mdash; it works for the student, whether or not it's the "standard" model.</div>
    </div>

    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Ernest's Paradigm topic)</i> Which of Ernest's four components describes "the method for acquiring and validating knowledge"?</div>
      <button class="opt" data-i="0">Methodology</button>
      <button class="opt" data-i="1">Ontology</button>
      <button class="opt" data-i="2">Pedagogy</button>
      <button class="opt" data-i="3">Epistemology</button>
      <div class="fb">Methodology. (Ontology = existence, epistemology = knowledge itself, pedagogy = teaching.)</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span> <i>(How Knowledge Is Built topic)</i> Radical constructivism emphasizes social negotiation of knowledge over individual cognition.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; that's social constructivism. Radical constructivism emphasizes the
      individual mind, and taken to an extreme risks solipsism.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Bricolage/Minimalism/Labs topic)</i> Per Ben-Ari, why might a (social) constructivist prefer closed labs over open labs?</div>
      <button class="opt" data-i="0">Closed labs are cheaper to run</button>
      <button class="opt" data-i="1">Open labs are banned by most CS departments</button>
      <button class="opt" data-i="2">Closed labs soften the brutality of computer feedback and facilitate the social interaction constructivism sees as important</button>
      <button class="opt" data-i="3">Closed labs eliminate the need for any lab assignments</button>
      <div class="fb">Closed labs support the social-interaction piece of construction and are backed by
      empirical evidence (Thweatt, 1994) of outperforming open labs.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Ben-Ari's Claims topic)</i> Which pair correctly matches Ben-Ari's two claims about CS education?</div>
      <button class="opt" data-i="0">CS is easier than physics; computers are unreliable</button>
      <button class="opt" data-i="1">Students lack an effective model of a computer; the computer is an accessible ontological reality (immediate, unambiguous feedback)</button>
      <button class="opt" data-i="2">Bricolage is always sufficient; minimalism always fails</button>
      <button class="opt" data-i="3">Objects should always be taught first; abstraction never causes problems</button>
      <div class="fb">Exactly the two claims from the abstract, which drive all three of his conclusions.</div>
    </div>

    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span> <i>(The 10 Questions topic, Q10)</i> Ben-Ari believes CS is especially unsuited to passive learning because the computer exposes a non-viable model immediately, rather than softening the blow the way physics homework or humanities discussion might.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True &mdash; the accessible ontological reality of the computer is exactly what makes
      passive learning riskier in CS than in fields with slower or more negotiable feedback.</div>
    </div>

    <div class="q">
      <p><i>(Ben-Ari's Claims topic)</i> Fill in the blank: because abstraction is supposed to follow
      assimilation of detail, but beginners never had that detail, teaching abstractions like objects before a
      viable model exists creates the <input type="text" class="fillblank" data-answer="object-oriented paradox~~~object oriented paradox" placeholder="?">.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The object-oriented paradox.</div>
    </div>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET — Ernest's educational paradigm, classical vs constructivist
   ============================================================ */
var paradigmData = {
  onto: "<b>Ontology.</b> Classical: there <i>is</i> an ontological reality &mdash; even accepting relativity/quantum mechanics, we function as if Newtonian space/time (and 2+2=4) is absolutely, mind-independently true. Constructivist: ontological reality is rejected or considered irrelevant, since we can never truly \"know\" anything about it.",
  epist: "<b>Epistemology.</b> Classical: <i>foundational</i> &mdash; truth is out there; we build from necessary truths and empirical data via logical deduction, and the mind is a \"clean slate\" that can be filled with facts. Constructivist: <i>nonfoundationalist and fallible</i> &mdash; there's no bedrock of absolute truth; even \"2+2=4\" isn't a necessary truth; all knowledge is fallible and constructed.",
  meth: "<b>Methodology.</b> Classical: knowledge transmission via listening to lectures and reading books, reinforced by repetition (drill and practice). Constructivist: knowledge is acquired <i>recursively</i> &mdash; combining new sensory data with existing knowledge, and reflecting on existing knowledge to build new cognitive structures.",
  ped: "<b>Pedagogy.</b> Classical: the teacher's job is to transmit facts as efficiently as possible (the \"Nurnberg Funnel\"). Constructivist: passive learning will likely fail, since every student constructs differently; the teacher must actively <i>guide</i> construction, basing guidance on each student's current (possibly non-viable) cognitive structures &mdash; a significantly harder job."
};
function paradigmShow(btn, key) {
  document.querySelectorAll('#l2-paradigm .req-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('paradigm-detail').innerHTML = paradigmData[key];
}

function initL2() { /* widget renders on click; nothing to pre-render */ }
