/* ============================================================
   LESSON 1 — "Tutoring Basics & the Learning Environment"
   Readings (Reading Quiz 1, due Tu 9/1):
     - UNC CS Undergraduate Teaching Assistant Manual, pp. 1-16
       (Aug 26) and pp. 17-27 (Sep 1) — Tessa Joseph-Nicholas
     - Boyer, Lahti, Phillips, Wallis, Vouk & Lester, "Principles
       of Asking Effective Questions During Student Problem
       Solving" (SIGCSE '10)
     - Ambrose, Bridges, DiPietro, Lovett & Norman, How Learning
       Works, Ch. 6, "Why Do Student Development and Course
       Climate Matter for Student Learning?" pp. 153-187
   Injects into #l1. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal below
   must be written \\ .
   ============================================================ */
document.getElementById('l1').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l1-steps')">10 Steps &amp; Trust</button>
  <button onclick="showTopic(this,'l1-listening')">Active Listening</button>
  <button onclick="showTopic(this,'l1-mistakes')">Mistakes &amp; ESL Tutoring</button>
  <button onclick="showTopic(this,'l1-questions')">Asking Effective Questions</button>
  <button onclick="showTopic(this,'l1-development')">Chickering &amp; Perry</button>
  <button onclick="showTopic(this,'l1-identity')">Social Identity Development</button>
  <button onclick="showTopic(this,'l1-climate')">Course Climate &amp; Strategies</button>
  <button onclick="showTopic(this,'l1-check')">Reading Quiz 1 Self-Check</button>
</nav>
<main>

<!-- ============ 10 STEPS & TRUST ============ -->
<section class="topic active" id="l1-steps">
  <h2>Lesson 1 &middot; The 10 Steps of Effective Peer Tutoring</h2>

  <div class="concept">You won't know much about most of your tutees &mdash; where their strengths/weaknesses
  are, what else they're dealing with. So the manual recommends a <b>systematic approach</b> to extend equal,
  professional treatment to everyone, especially during your first semester, with new students, across a
  language/cultural barrier, or whenever the comfort level between you and a student could use improvement.
  Once you're comfortable, you're not expected to run every step in every session.</div>

  <div class="card">
    <h3 style="margin-top:0">The sequence</h3>
    <div class="seqdia">
      <span class="node">1. Greet &amp; set the climate</span><span class="arrow">&rarr;</span>
      <span class="node">2. Identify the task/s</span><span class="arrow">&rarr;</span>
      <span class="node">3. Break large problems into subtasks</span><span class="arrow">&rarr;</span>
      <span class="node">4. Identify course resources &amp; strategies</span><span class="arrow">&rarr;</span>
      <span class="node">5. Set your agenda &amp; next steps</span><br>
      <span class="node">6. Start work on the tasks</span><span class="arrow">&rarr;</span>
      <span class="node">7. Wrap-up: skills/information summary</span><span class="arrow">&rarr;</span>
      <span class="node">8. Wrap-up: problem-solving process summary</span><span class="arrow">&rarr;</span>
      <span class="node">9. Confirm learning; positive feedback</span><span class="arrow">&rarr;</span>
      <span class="node">10. Say goodbye</span>
    </div>
  </div>

  <div class="warn"><b>Step 2 is the one worth studying closest.</b> It has two jobs: (1) get the tutee to
  <i>specifically</i> articulate what they need help with &mdash; "everything" is not a starting point &mdash; and
  (2) identify their real misunderstandings. If a tutee is <i>completely</i> lost, the manual says go all the way
  back to fundamentals: is the code editor/debugger working? Do they understand functions vs. methods, or why we
  use for loops? Foundational and tool issues get cleared up <b>before</b> the assignment itself.</div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>A tutee says they need help with "everything." Per Step 2, what should you do?</div>
      <button class="opt" data-i="0">Start explaining the whole assignment from the top</button>
      <button class="opt" data-i="1">Follow up with questions until you've identified a specific place to start &mdash; make sure they can articulate each problem before working on it</button>
      <button class="opt" data-i="2">Tell them to come back once they've narrowed it down themselves</button>
      <button class="opt" data-i="3">Move straight to Step 6 and start working through the code together</button>
      <div class="fb">The manual is explicit: "This is not helpful; follow up with questions until you've
      identified a place to start. Make sure your tutee can articulate each problem before you start working on
      it."</div>
    </div>

    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>Which step is specifically about time management &mdash; discussing how long each task will take and making a plan if there isn't enough time in the current session?</div>
      <button class="opt" data-i="0">Step 2: Identify the task/s</button>
      <button class="opt" data-i="1">Step 4: Identify course resources and problem-solving strategies</button>
      <button class="opt" data-i="2">Step 7: Wrap-up, skills summary</button>
      <button class="opt" data-i="3">Step 5: Set your agenda and next steps</button>
      <div class="fb">Step 5 is about time management: discuss how much time each identified task needs, and
      break tasks across multiple sessions if you don't have enough time now.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>The 10 steps must be followed in full, in order, in every tutoring session.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. Once you're more comfortable with the process, you're not expected to apply every
      step every time &mdash; you develop a sense of which ones matter most for each session. (Running every step
      rigidly, every time, is literally the manual's "Procedural Tutor" mistake &mdash; see the next topic.)</div>
    </div>

    <div class="q" data-multi="0,1,2">
      <div class="prompt"><span class="tag">Select all that apply</span>Which of these are behaviors the manual's "Do" list says build trust with tutees?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Express empathy ("I understand; that sounds really frustrating")</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> Be patient &mdash; give the tutee time to speak and form a thoughtful response</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> Admit when you don't know something, and show them how you'd find the answer</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> Take the blame for a bad grade, even if it wasn't really your fault, to keep the student happy</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">The Dos are empathy, patience, and honestly admitting what you don't know. Taking blame you
      don't deserve is a listed <b>Don't</b> (along with overpromising, creating "shared enemies" out of the
      professor, and implying judgment).</div>
    </div>
  </div>
</section>

<!-- ============ ACTIVE LISTENING ============ -->
<section class="topic" id="l1-listening">
  <h2>Lesson 1 &middot; Active Listening</h2>

  <div class="concept">Active listening means focusing attentively and intentionally on the speaker: keep your
  <b>full</b> attention on what the student says, wait until you're certain they're done, then <b>paraphrase</b>
  their remarks back to confirm you've understood. It communicates respect and builds the trust that makes
  effective tutoring possible.</div>

  <div class="card">
    <h3 style="margin-top:0">The three tasks, in order</h3>
    <ol>
      <li>Listen with your full attention.</li>
      <li>Wait until you're very sure the speaker is done before responding.</li>
      <li>Paraphrase the speaker's remarks back to them: e.g., "It sounds like you're saying ___. Is that
      correct?"</li>
    </ol>
  </div>

  <div class="warn"><b>Common misunderstanding.</b> "Not interrupting" doesn't just mean not talking over
  someone &mdash; the manual specifically warns against <i>faking</i> attention (smiling and nodding while your
  brain is elsewhere; "people can tell when they're not being listened to"), and against multitasking even for a
  moment without narrating it out loud first.</div>

  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>If you need to quickly check an important text message during a session, it's fine to do so silently while nodding along so you don't interrupt the flow.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. The manual's example script is to say so out loud first: "I'm sorry, this is
      important. Do you mind if I answer it?" &mdash; handle it quickly, then apologize and return full attention.
      Silently faking attention is explicitly called out as something students can tell is happening.</div>
    </div>

    <div class="q">
      <p>Fill in the blank: after paraphrasing what you heard, the manual's model always closes with a direct
      check &mdash; "...Is that <input type="text" class="fillblank sm" data-answer="right|correct|accurate" placeholder="?">?" &mdash; rather than just assuming you understood correctly.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Right / correct / accurate all work. The point of active listening isn't just restating
      what you heard &mdash; it's explicitly asking whether you got it right, so a misunderstanding surfaces
      immediately instead of derailing the rest of the session.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Per the reading, what should active listening communicate about the student's tone (not just their words)?</div>
      <button class="opt" data-i="0">Tone doesn't matter &mdash; only the literal content of what's said should shape your response</button>
      <button class="opt" data-i="1">You should correct a nervous or worried tone immediately so the student can move on</button>
      <button class="opt" data-i="2">Be attentive to tone (nervous, worried, confused) and offer a nonjudgmental acknowledgment of their state of mind</button>
      <button class="opt" data-i="3">Tone should be ignored entirely to avoid seeming unprofessional</button>
      <div class="fb">The manual specifically calls out being attentive to tone, not just words, and offers
      nonjudgmental reassurance ("I know this stuff is confusing. I'm really glad you came in") as a model
      response.</div>
    </div>
  </div>
</section>

<!-- ============ MISTAKES & ESL ============ -->
<section class="topic" id="l1-mistakes">
  <h2>Lesson 1 &middot; Common Mistakes &amp; Tutoring ESL Students</h2>

  <div class="concept">Three well-meaning, competent UTAs still make common mistakes. None of these tutors are
  incompetent or careless &mdash; each has a real strength that tips into a real weakness.</div>

  <div class="card">
    <h3 style="margin-top:0">Match the tutor profile to its mistake</h3>
    <table class="match" id="match-tutors">
      <tr><td class="match-term">The Amazing Tutor</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="a">Talented and well-liked, but never plans sessions &mdash; free-form conversation leaves no way to evaluate progress, and students struggle to replicate the methods on their own later</option>
        <option value="b">Prepares exhaustively and moves quickly, but loses patience with students who aren't as prepared and doesn't check whether concepts self-evident to her actually landed</option>
        <option value="c">Sticks rigidly to all 10 steps every time, even with familiar students &mdash; sessions run long, and he over-explains rules/definitions instead of letting students program</option></select></td></tr>
      <tr><td class="match-term">The Ambitious Tutor</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="a">Talented and well-liked, but never plans sessions &mdash; free-form conversation leaves no way to evaluate progress, and students struggle to replicate the methods on their own later</option>
        <option value="b">Prepares exhaustively and moves quickly, but loses patience with students who aren't as prepared and doesn't check whether concepts self-evident to her actually landed</option>
        <option value="c">Sticks rigidly to all 10 steps every time, even with familiar students &mdash; sessions run long, and he over-explains rules/definitions instead of letting students program</option></select></td></tr>
      <tr><td class="match-term">The Procedural Tutor</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="a">Talented and well-liked, but never plans sessions &mdash; free-form conversation leaves no way to evaluate progress, and students struggle to replicate the methods on their own later</option>
        <option value="b">Prepares exhaustively and moves quickly, but loses patience with students who aren't as prepared and doesn't check whether concepts self-evident to her actually landed</option>
        <option value="c">Sticks rigidly to all 10 steps every time, even with familiar students &mdash; sessions run long, and he over-explains rules/definitions instead of letting students program</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-tutors','fb-match-tutors',['a','b','c'])">Check</button>
    <div class="fb" id="fb-match-tutors"></div>
  </div>

  <div class="concept">ESL is an umbrella term for a huge range of backgrounds, and English proficiency has
  <b>nothing to do with intelligence or effort</b>. Some ESL students speak five languages but struggle with
  English; some understand everything spoken but struggle to speak; some write better than they speak, or the
  reverse.</div>

  <div class="card">
    <h3 style="margin-top:0">Techniques for Questioning ESL Students &mdash; the difficulty ladder</h3>
    <p class="muted">Click each rung. If a student seems to be keeping up well, start at the top and work down
    only if they get stuck. If a student seems to be struggling, start at the bottom and work up.</p>
    <div class="reqrow">
      <div class="req-list">
        <button class="req-btn" onclick="ladderShow(this,'hard')">Why / Which / How questions (hardest)</button>
        <button class="req-btn" onclick="ladderShow(this,'med')">Or questions (medium)</button>
        <button class="req-btn" onclick="ladderShow(this,'easy')">Yes/No &amp; definition questions (easiest)</button>
        <div class="req-detail" id="ladder-detail">Click a rung to see what it tests and an example.</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You suspect a student is struggling and might not have integrated a concept. Where should you start on the question ladder?</div>
      <button class="opt" data-i="0">A why/which/how question, to test the deepest understanding first</button>
      <button class="opt" data-i="1">The easiest type &mdash; a yes/no question or a request for a definition &mdash; then work up through "or" questions toward why/which/how</button>
      <button class="opt" data-i="2">Skip questioning and just re-explain the concept</button>
      <button class="opt" data-i="3">An "or" question only, since it's a good middle ground</button>
      <div class="fb">If you're pretty sure the student is struggling, start with the easiest type (yes/no or
      definition) to build confidence, then move up through "or" to why/which/how once they're answering
      confidently.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Quiet or hesitant English from a student is a reliable sign that the student is personally shy.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. The manual explicitly warns against assuming quiet/hesitant English means a quiet
      person &mdash; the student might simply be less confident speaking English, regardless of personality.</div>
    </div>

    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>You don't understand what a student is trying to say. What does the manual recommend?</div>
      <button class="opt" data-i="0">Say so honestly: "I'm sorry, I didn't understand that. Can you repeat it or write it down?"</button>
      <button class="opt" data-i="1">Nod along and hope it becomes clear from context</button>
      <button class="opt" data-i="2">Correct their pronunciation so the miscommunication doesn't happen again</button>
      <button class="opt" data-i="3">Move on to a different topic to avoid embarrassing them</button>
      <div class="fb">Pretending to understand "does no one any good." The manual's script is to say so plainly
      and ask them to repeat or write it down &mdash; and to never correct pronunciation unless they ask you to.</div>
    </div>
  </div>
</section>

<!-- ============ ASKING EFFECTIVE QUESTIONS ============ -->
<section class="topic" id="l1-questions">
  <h2>Lesson 1 &middot; Boyer et al., "Principles of Asking Effective Questions"</h2>

  <div class="concept">This study classified 714 questions from 78 tutoring sessions between untrained CS tutors
  and novice students, to see what question-asking habits look like <i>without</i> training &mdash; and where
  those habits fall short.</div>

  <div class="card">
    <h3 style="margin-top:0">The headline finding</h3>
    <p>Only <b>11%</b> of all 6,558 tutor dialogue messages were questions at all &mdash; untrained tutors default
    to <i>telling</i>. Of the questions that were asked, <b>Hint</b> and <b>Procedural</b> types were the two most
    common, together accounting for nearly a fifth of all questions.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Four principles for asking better questions</h3>
    <table class="cmp">
      <tr><th>Principle</th><th>What it means</th></tr>
      <tr><td><b>Facilitate comprehension &amp; decomposition</b></td><td>Make sure the student understands and has broken down the problem <i>before</i> jumping to a plan (their bad example: asking "Where would you like to start?" before the student has even finished reading the problem)</td></tr>
      <tr><td><b>Ask targeted, specific questions</b></td><td>Vague questions ("Did you have any questions?") don't reveal real knowledge gaps; specific content questions do</td></tr>
      <tr><td><b>Prompt self-explanation</b></td><td>Ask the student to explain their own reasoning rather than telling them the answer &mdash; their example shows a tutor supplying the next line of code instead of asking the student to reason to it</td></tr>
      <tr><td><b>Ask questions frequently</b></td><td>Novice tutors ask far fewer questions than expert tutors &mdash; asking more, not fewer, is itself a marker of pedagogical skill</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What percentage of untrained tutors' dialogue messages in the study were questions?</div>
      <button class="opt" data-i="0">64%</button>
      <button class="opt" data-i="1">33%</button>
      <button class="opt" data-i="2">11%</button>
      <button class="opt" data-i="3">85%</button>
      <div class="fb">Only 11% of the 6,558 tutor messages were questions &mdash; consistent with other findings
      that novice tutors ask far fewer questions than expert tutors.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which two question types were most common among the untrained tutors studied?</div>
      <button class="opt" data-i="0">Assessment and Backchannel</button>
      <button class="opt" data-i="1">Hint and Procedural</button>
      <button class="opt" data-i="2">Enablement and Justification</button>
      <button class="opt" data-i="3">Free Creation and Causal Antecedent</button>
      <div class="fb">Hint questions (scaffolding the student's problem-solving effort) and Procedural questions
      each accounted for nearly a fifth of all questions asked &mdash; the two most frequent types.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>The paper's excerpt where a tutor supplies the next line of code ("Ok so now we need somewhere to keep the individual digits") is presented as a good example of effective questioning.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; it's presented as the opposite: an instance of the tutor <i>telling</i> the
      student information instead of asking a question that would prompt the student to self-explain and reach
      it themselves.</div>
    </div>
  </div>
</section>

<!-- ============ CHICKERING & PERRY ============ -->
<section class="topic" id="l1-development">
  <h2>Lesson 1 &middot; Chickering's Seven Vectors &amp; Perry's Intellectual Development</h2>

  <div class="concept"><b>Principle (How Learning Works, Ch. 6):</b> Students' current level of development
  interacts with the social, emotional, and intellectual climate of the course to impact learning. Chickering's
  model (1969) systematically accounts for the developmental changes students experience across seven
  cumulative <b>vectors</b>.</div>

  <div class="card">
    <h3 style="margin-top:0">Chickering's Seven Vectors (build on each other, cumulatively)</h3>
    <div class="seqdia">
      <span class="node">1. Developing competence</span><span class="arrow">&rarr;</span>
      <span class="node">2. Managing emotions</span><span class="arrow">&rarr;</span>
      <span class="node">3. Developing autonomy</span><span class="arrow">&rarr;</span>
      <span class="node">4. Establishing identity</span><span class="arrow">&rarr;</span>
      <span class="node">5. Freeing interpersonal relationships</span><span class="arrow">&rarr;</span>
      <span class="node">6. Developing purpose</span><span class="arrow">&rarr;</span>
      <span class="node">7. Developing integrity</span>
    </div>
    <p class="muted">Vector 4, <b>establishing identity</b>, is the pivotal one &mdash; it builds on the vectors
    before it and is the foundation for the ones after.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each vector to how Professor Guttman's story illustrates it</h3>
    <table class="match" id="match-vectors">
      <tr><td class="match-term">Developing competence</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="comp">By never calling on women, Guttman inadvertently signals doubt in their ability to perform on the spot, hindering their sense of intellectual/interpersonal competence</option>
        <option value="auto">By giving women extra unsolicited help, Guttman may interfere with their developing sense of independent, self-directed capability</option>
        <option value="purp">The TA's sexist comment challenges women's sense that they belong and can commit to engineering as a field</option></select></td></tr>
      <tr><td class="match-term">Developing autonomy</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="comp">By never calling on women, Guttman inadvertently signals doubt in their ability to perform on the spot, hindering their sense of intellectual/interpersonal competence</option>
        <option value="auto">By giving women extra unsolicited help, Guttman may interfere with their developing sense of independent, self-directed capability</option>
        <option value="purp">The TA's sexist comment challenges women's sense that they belong and can commit to engineering as a field</option></select></td></tr>
      <tr><td class="match-term">Developing purpose</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="comp">By never calling on women, Guttman inadvertently signals doubt in their ability to perform on the spot, hindering their sense of intellectual/interpersonal competence</option>
        <option value="auto">By giving women extra unsolicited help, Guttman may interfere with their developing sense of independent, self-directed capability</option>
        <option value="purp">The TA's sexist comment challenges women's sense that they belong and can commit to engineering as a field</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-vectors','fb-match-vectors',['comp','auto','purp'])">Check</button>
    <div class="fb" id="fb-match-vectors"></div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Perry's Intellectual Development: Dualism &rarr; Multiplicity &rarr; Relativism &rarr; Commitment</h3>
    <table class="cmp">
      <tr><th>Stage</th><th>What it looks like</th></tr>
      <tr><td><b>Dualism</b></td><td>Knowledge is right or wrong, handed down by authorities; no room for ambiguity (Kayla's "It's just plain wrong!")</td></tr>
      <tr><td><b>Multiplicity</b></td><td>Everyone's opinion is equally valid; the instructor is just "another perspective." Looks like a step backward, but isn't &mdash; it's the first stage where students are open to disagreement and can start constructing their own knowledge</td></tr>
      <tr><td><b>Relativism</b></td><td>Opinions aren't all equal &mdash; they're evaluated by evidence and discipline-specific rules; a shift from quantitative to qualitative knowledge</td></tr>
      <tr><td><b>Commitment</b></td><td>Students provisionally commit to one theory/approach as a foundation, refining it as they go &mdash; informed and nuanced, not naively dualistic</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q">
      <p>Fill in the Perry sequence: <input type="text" class="fillblank sm" data-answer="dualism" placeholder="?">
      &rarr; <input type="text" class="fillblank sm" data-answer="multiplicity" placeholder="?"> &rarr;
      <input type="text" class="fillblank sm" data-answer="relativism" placeholder="?"> &rarr;
      <input type="text" class="fillblank sm" data-answer="commitment" placeholder="?"></p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Dualism &rarr; Multiplicity &rarr; Relativism &rarr; Commitment.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does the "multiplicity" stage matter, even though it can look like a regression (everyone's opinion is equally valid)?</div>
      <button class="opt" data-i="0">It doesn't matter &mdash; it's simply a wrong turn students should skip</button>
      <button class="opt" data-i="1">It means students have mastered the course material</button>
      <button class="opt" data-i="2">It's the crucial transition where students stop fixating on "the right answer" and become open to differing opinions, which is foundational for all later development</button>
      <button class="opt" data-i="3">It means the instructor should stop grading student work</button>
      <div class="fb">Two things happen here: students are no longer fixated on one "right" opinion, and learning
      becomes personal &mdash; they're now entitled to their own opinion and can start constructing their own
      knowledge. The book calls this transition "foundational for all further development."</div>
    </div>

    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>A student can be more developed in one area (e.g., intellectual maturity) than another (e.g., emotional maturity) at the same time.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True. Developmental models describe the aggregate, not any one individual &mdash; movement
      isn't always forward, students can regress or foreclose development, and uneven development across areas
      is normal.</div>
    </div>
  </div>
</section>

<!-- ============ SOCIAL IDENTITY DEVELOPMENT ============ -->
<section class="topic" id="l1-identity">
  <h2>Lesson 1 &middot; Social Identity Development (Hardiman &amp; Jackson)</h2>

  <div class="concept">Social identity is the extent and nature of a student's identification with social
  groups &mdash; especially groups that are often targets of prejudice. Hardiman &amp; Jackson (1992) describe
  <b>two parallel developmental paths</b>: one for minority groups, one for dominant groups, moving through
  similar named stages but experienced very differently.</div>

  <div class="card">
    <h3 style="margin-top:0">Naïve &rarr; Acceptance &rarr; Resistance/Immersion &rarr; Redefinition &rarr; Internalization</h3>
    <table class="cmp">
      <tr><th>Stage</th><th>What happens</th></tr>
      <tr><td><b>Naïve</b></td><td>Early childhood; differences (e.g., skin color) are noticed but no value is attached to them yet</td></tr>
      <tr><td><b>Acceptance</b></td><td>Conscious or unconscious acceptance of societal messages about which groups are "normal," "smart," etc. (Kayla's comment about immigrants may reflect this stage)</td></tr>
      <tr><td><b>Resistance / Immersion</b></td><td>Triggered by challenge or new information. <b>Dominant-group members</b> often feel shame/guilt about their group's privilege. <b>Minority-group members</b> often feel pride in their own group, sometimes withdrawing to socialize mainly within it ("immersion")</td></tr>
      <tr><td><b>Redefinition &amp; Internalization</b></td><td>Students move beyond the dominant/minority dichotomy; group identity becomes one part of who they are, not the defining feature &mdash; guilt/anger give way to a commitment to work for justice within their sphere of influence</td></tr>
    </table>
  </div>

  <div class="warn"><b>Commonly missed detail.</b> At the resistance stage, white students who feel overwhelmed by
  accusations of racism (rather than pride/anger) are going through what Helms (1993) calls
  <b>disintegration</b> &mdash; a related but distinct experience from the minority-group version of this
  stage.</div>

  <div class="card">
    <div class="q">
      <p>Fill in the five-stage sequence: <input type="text" class="fillblank sm" data-answer="naive|naïve" placeholder="?">
      &rarr; <input type="text" class="fillblank sm" data-answer="acceptance" placeholder="?"> &rarr;
      <input type="text" class="fillblank" data-answer="resistance|immersion|resistance/immersion" placeholder="?"> &rarr;
      <input type="text" class="fillblank sm" data-answer="redefinition" placeholder="?"> &rarr;
      <input type="text" class="fillblank sm" data-answer="internalization" placeholder="?"></p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Naïve &rarr; Acceptance &rarr; Resistance/Immersion &rarr; Redefinition &rarr;
      Internalization.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Dominant-group and minority-group members typically experience the "resistance" stage the same way.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. Dominant-group members tend to experience shame and guilt about their group's
      privilege; minority-group members tend to experience pride in their own group (and sometimes prefer to
      socialize within it &mdash; "immersion"), sometimes viewing the dominant group as a source of societal
      harm.</div>
    </div>

    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>What does Helms (1993) call it when white students feel overwhelmed, rather than proud/angry, when confronted with racism accusations?</div>
      <button class="opt" data-i="0">Disintegration</button>
      <button class="opt" data-i="1">Redefinition</button>
      <button class="opt" data-i="2">Multiplicity</button>
      <button class="opt" data-i="3">Internalization</button>
      <div class="fb">Disintegration &mdash; the dominant-group-specific experience at the resistance stage,
      distinct from (though related to) the minority-group experience of pride/immersion at that same stage.</div>
    </div>
  </div>
</section>

<!-- ============ COURSE CLIMATE & STRATEGIES ============ -->
<section class="topic" id="l1-climate">
  <h2>Lesson 1 &middot; Course Climate, Stereotype Threat &amp; Strategies</h2>

  <div class="concept"><b>Course climate</b> is the intellectual, social, emotional, and physical environment in
  which students learn &mdash; shaped by faculty-student interaction, tone, stereotyping/tokenism, course
  demographics, student-student interaction, and the range of perspectives in the content, both inside and
  outside class.</div>

  <div class="card">
    <h3 style="margin-top:0">The climate continuum &mdash; click each stage</h3>
    <p class="muted">Climate is better modeled as a continuum than a good/bad binary. Messages are
    <b>explicit</b> (planned/stated) or <b>implicit</b> (inferred from consistent absence), and either
    marginalizing or centralizing.</p>
    <div class="reqrow">
      <div class="req-list">
        <button class="req-btn" onclick="climateShow(this,'em')">Explicitly Marginalizing</button>
        <button class="req-btn" onclick="climateShow(this,'im')">Implicitly Marginalizing</button>
        <button class="req-btn" onclick="climateShow(this,'ic')">Implicitly Centralizing</button>
        <button class="req-btn" onclick="climateShow(this,'ec')">Explicitly Centralizing</button>
        <div class="req-detail" id="climate-detail">Click a stage to see its definition and an example from the reading.</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which point on the continuum did DeSurra &amp; Church's research find was most common in college classrooms &mdash; even well-intentioned ones?</div>
      <button class="opt" data-i="0">Explicitly centralizing</button>
      <button class="opt" data-i="1">Implicitly marginalizing</button>
      <button class="opt" data-i="2">Explicitly marginalizing</button>
      <button class="opt" data-i="3">Climate research found no common pattern</button>
      <div class="fb">Implicitly marginalizing climates &mdash; subtle, unintentional exclusion &mdash; were most
      common, even though most instructors assume their courses land on the inclusive end. Professor Guttman's
      story is the textbook example: trying to help women by not calling on them backfires into exactly this.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Steele &amp; Aronson's research found that stereotype threat's effect on performance is driven by lowered self-esteem.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; that hypothesis was tested and <b>not</b> supported. The mechanism their data
      confirmed instead is emotional/cognitive disruption: students focus on anger at the stereotype or
      instructor, can't think clearly, and re-check answers repeatedly, running out of time.</div>
    </div>

    <div class="q" data-multi="0,1,2,3">
      <div class="prompt"><span class="tag">Select all that apply</span>Which four factors does the chapter identify as shaping course climate?</div>
      <div class="ma-item"><input type="checkbox" data-i="0"> Stereotypes</div>
      <div class="ma-item"><input type="checkbox" data-i="1"> Tone</div>
      <div class="ma-item"><input type="checkbox" data-i="2"> Faculty-student and student-student interaction</div>
      <div class="ma-item"><input type="checkbox" data-i="3"> Content</div>
      <div class="ma-item"><input type="checkbox" data-i="4"> The course's grading curve</div>
      <button class="btn small" onclick="checkMulti(this)">Check</button>
      <div class="fb">The chapter focuses on four interrelated climate factors: stereotypes, tone,
      faculty-student/student-student interaction, and content. A grading curve isn't one of the four, though
      grading criteria come up under the "incorporate evidence" strategy below.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each strategy to what it looks like in practice</h3>
    <table class="match" id="match-strategy">
      <tr><td class="match-term">Make uncertainty safe</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="s1">Explicitly validate different viewpoints, even unpopular ones, and frame the goal of discussion as enriching thinking, not reaching consensus</option>
        <option value="s2">Use rubrics/evidence in grading criteria so opinions must be supported, which also reduces "grade grubbing"</option>
        <option value="s3">Question your own assumptions about what background, ability, or identity your students share with you or each other</option>
        <option value="s4">Learn students' names and invite them to office hours so large classes don't feel anonymous</option></select></td></tr>
      <tr><td class="match-term">Incorporate evidence into grading</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="s1">Explicitly validate different viewpoints, even unpopular ones, and frame the goal of discussion as enriching thinking, not reaching consensus</option>
        <option value="s2">Use rubrics/evidence in grading criteria so opinions must be supported, which also reduces "grade grubbing"</option>
        <option value="s3">Question your own assumptions about what background, ability, or identity your students share with you or each other</option>
        <option value="s4">Learn students' names and invite them to office hours so large classes don't feel anonymous</option></select></td></tr>
      <tr><td class="match-term">Examine your assumptions</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="s1">Explicitly validate different viewpoints, even unpopular ones, and frame the goal of discussion as enriching thinking, not reaching consensus</option>
        <option value="s2">Use rubrics/evidence in grading criteria so opinions must be supported, which also reduces "grade grubbing"</option>
        <option value="s3">Question your own assumptions about what background, ability, or identity your students share with you or each other</option>
        <option value="s4">Learn students' names and invite them to office hours so large classes don't feel anonymous</option></select></td></tr>
      <tr><td class="match-term">Reduce anonymity</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option>
        <option value="s1">Explicitly validate different viewpoints, even unpopular ones, and frame the goal of discussion as enriching thinking, not reaching consensus</option>
        <option value="s2">Use rubrics/evidence in grading criteria so opinions must be supported, which also reduces "grade grubbing"</option>
        <option value="s3">Question your own assumptions about what background, ability, or identity your students share with you or each other</option>
        <option value="s4">Learn students' names and invite them to office hours so large classes don't feel anonymous</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-strategy','fb-match-strategy',['s1','s2','s3','s4'])">Check</button>
    <div class="fb" id="fb-match-strategy"></div>
    <p class="muted" style="margin-top:10px">Other listed strategies: be mindful of low-ability cues, don't ask
    individuals to speak for their whole group, model inclusive language, use multiple/diverse examples,
    establish &amp; reinforce ground rules, use the syllabus/first day to set climate, get feedback on climate,
    anticipate sensitive issues, address tensions early, turn discord into a learning opportunity, and facilitate
    active listening.</p>
  </div>
</section>

<!-- ============ SELF-CHECK ============ -->
<section class="topic" id="l1-check">
  <h2>Lesson 1 &middot; Reading Quiz 1 Self-Check</h2>
  <p class="muted">Mixed review, built directly from the terms/concepts list your instructor circulated ahead of
  Reading Quiz 1. Each item names where it's covered above if you want to review before answering.</p>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(10 Steps &amp; Trust topic)</i> A tutee is completely lost on an assignment. Per the manual, where should you start?</div>
      <button class="opt" data-i="0">Straight to Step 7, summarizing skills, so they leave with something</button>
      <button class="opt" data-i="1">Give them the answer so they don't fall further behind</button>
      <button class="opt" data-i="2">Go back to fundamentals &mdash; confirm their editor/debugger works and that they understand basic concepts (like functions vs. methods) before touching the assignment</button>
      <button class="opt" data-i="3">Tell them to re-read the assignment on their own and come back</button>
      <div class="fb">When a tutee is completely lost, the problem may lie outside the assignment itself &mdash;
      in tooling or foundational concepts. Clear those up first.</div>
    </div>

    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span> <i>(Active Listening topic)</i> Paraphrasing the speaker's remarks back to them is one of active listening's three core tasks.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True &mdash; listen fully, wait until they're done, then paraphrase to confirm.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Mistakes &amp; ESL topic)</i> Which question type is <b>easiest</b> for an ESL student, and should be the starting point if you suspect they're struggling?</div>
      <button class="opt" data-i="0">Why questions</button>
      <button class="opt" data-i="1">Yes/no questions and requests for definitions</button>
      <button class="opt" data-i="2">Which questions</button>
      <button class="opt" data-i="3">How questions</button>
      <div class="fb">Yes/no and definition questions are the easiest rung of the ladder; why/which/how are the
      hardest, since they require fully integrated, independent understanding.</div>
    </div>

    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Asking Effective Questions topic)</i> Per Boyer et al., what should an instructor do instead of just telling a student the next step?</div>
      <button class="opt" data-i="0">Ask a question that prompts the student to self-explain and reason to that step themselves</button>
      <button class="opt" data-i="1">Wait silently until the student gives up and asks directly</button>
      <button class="opt" data-i="2">Give a hint that's really just the answer reworded</button>
      <button class="opt" data-i="3">Move to a completely different topic</button>
      <div class="fb">Prompting self-explanation (rather than telling) is one of the paper's four principles, and
      research shows self-explaining improves learning.</div>
    </div>

    <div class="q">
      <p><i>(Chickering &amp; Perry topic)</i> Fill in the blank: Chickering's <b>pivotal</b> vector, which builds
      on the vectors before it and underlies all the ones after, is
      <input type="text" class="fillblank" data-answer="establishing identity|identity" placeholder="?">.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Establishing identity &mdash; vector 4 of 7.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Social Identity Development topic)</i> At the "resistance/immersion" stage, how do minority-group members typically respond, in contrast to dominant-group members?</div>
      <button class="opt" data-i="0">Both groups respond with guilt and shame</button>
      <button class="opt" data-i="1">Both groups respond with pride and immersion in their own group</button>
      <button class="opt" data-i="2">Minority-group members often feel pride in their own group (sometimes immersing within it); dominant-group members often feel guilt/shame about privilege</button>
      <button class="opt" data-i="3">Neither group shows any emotional response at this stage</button>
      <div class="fb">This asymmetry &mdash; pride/immersion for minority-group members vs. guilt/shame (or
      "disintegration," per Helms) for dominant-group members &mdash; is the detail most worth double-checking
      before the quiz.</div>
    </div>

    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span> <i>(Course Climate topic)</i> An instructor never planned to include a marginalized perspective, and it's also never spontaneously come up in class. What point on the climate continuum is this?</div>
      <button class="opt" data-i="0">Explicitly centralizing</button>
      <button class="opt" data-i="1">Implicitly centralizing</button>
      <button class="opt" data-i="2">Explicitly marginalizing</button>
      <button class="opt" data-i="3">Implicitly marginalizing</button>
      <div class="fb">No overt hostility (so not "explicit"), but consistent, unplanned absence of a perspective
      &mdash; that's implicitly marginalizing, the point on the continuum research found most common.</div>
    </div>

    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span> <i>(Course Climate topic)</i> Stereotype threat requires an instructor's intentional, overtly hostile comment to be triggered.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; activation "does not need to be intentional." Subtle cues (assumptions about
      ability, tokenism) can trigger it just as effectively as overt comments.</div>
    </div>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET 1 — ESL question-difficulty ladder
   ============================================================ */
var ladderData = {
  hard: "<b>Why / which / how questions</b> (hardest). E.g., &ldquo;Why is ____ preferable over ____ as an approach to ____?&rdquo;, &ldquo;Which of the following methods is most appropriate, and why?&rdquo; These tell you whether a student has integrated a concept enough to think critically about it and assess it independently.",
  med: "<b>Or questions</b> (medium). E.g., &ldquo;Which approach is preferable for this task, ____ or ____?&rdquo; Measures whether a student can apply a concept or method appropriately. Watch out: &ldquo;which is preferable <i>and why</i>&rdquo; is secretly two questions of different difficulty.",
  easy: "<b>Yes/no questions and definitions</b> (easiest). E.g., &ldquo;Can ____ be used for ____?&rdquo;, &ldquo;Provide a definition for ____.&rdquo; The safest starting point if a student seems to be struggling &mdash; it builds confidence before you move up the ladder."
};
function ladderShow(btn, key) {
  document.querySelectorAll('#l1-mistakes .req-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('ladder-detail').innerHTML = ladderData[key];
}

/* ============================================================
   WIDGET 2 — course climate continuum
   ============================================================ */
var climateData = {
  em: "<b>Explicitly Marginalizing</b> &mdash; overtly hostile, discriminatory, or unwelcoming. Example: the TA's openly sexist comments about women in engineering in Professor Guttman's story.",
  im: "<b>Implicitly Marginalizing</b> &mdash; excludes certain groups in subtle, indirect ways, sometimes from well-meaning instructors. Example: Professor Guttman avoiding calling on women (to protect them) and giving them unsolicited extra help &mdash; both unintentionally signal doubt in their competence. Research found this point on the continuum is the <b>most common</b>, even in courses instructors assume are inclusive.",
  ic: "<b>Implicitly Centralizing</b> &mdash; unplanned responses that validate alternative perspectives when they spontaneously come up. Example: if, after Danielle asked why Gloria &ldquo;always brings up race,&rdquo; Professor Battaglia had said &ldquo;Gloria might be on to something &mdash; let's dig deeper,&rdquo; building on her contribution productively.",
  ec: "<b>Explicitly Centralizing</b> &mdash; marginalized perspectives are intentionally and overtly integrated, not just validated when they happen to come up. Example: a syllabus with planned discussion ground rules and course policies designed to foster sensitivity to the range of perspectives students bring."
};
function climateShow(btn, key) {
  document.querySelectorAll('#l1-climate .req-btn').forEach(function (b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('climate-detail').innerHTML = climateData[key];
}

function initL1() { /* widgets render on click; nothing to pre-render */ }
