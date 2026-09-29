document.getElementById('l5').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l5-competence')">Cultural Competence in CS</button>
  <button onclick="showTopic(this,'l5-bias')">Bias, Intersectionality &amp; Gaslighting</button>
  <button onclick="showTopic(this,'l5-action')">From Reading to Action</button>
  <button onclick="showTopic(this,'l5-equity')">Equity vs. Equality &amp; Mindset</button>
  <button onclick="showTopic(this,'l5-grading')">Specification Grading &amp; Pathways</button>
  <button onclick="showTopic(this,'l5-data')">Data, Discomfort &amp; Broadening Participation</button>
  <button onclick="showTopic(this,'l5-check')">Reading Quiz 5 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l5-competence">
  <h2>Cultural Competence in Computer Science</h2>
  <div class="concept"><b>Cultural competence</b>, as Nicki Washington defines it, is the ability to engage with
  people from diverse backgrounds &mdash; across race, gender, class, age, ability, and sexuality &mdash; in ways
  that respect their identities while still effectively doing your job. The term didn't originate in computing:
  it came out of <b>social work in the late 1980s</b> and spread into education and healthcare by the 1990s.
  That origin matters &mdash; it's part of her point that CS students get almost no training in this unless they
  go looking for it as an elective.</div>
  <p class="muted">Simple version: cultural competence is being good at working with people who are different from
  you, on purpose and by training &mdash; not just by good intentions.</p>

  <h3>Identity dimensions</h3>
  <div class="card">
    <p>Washington frames identity as multi-dimensional: <b>race, gender, class, age, ability</b>, and others all
    shape how a person experiences a classroom, a workplace, or a piece of software. None of these dimensions
    operates alone &mdash; a key theme that leads directly into intersectionality (next topic).</p>
  </div>

  <h3>Why this matters specifically for computing</h3>
  <div class="warn"><b>The scale argument:</b> a doctor or social worker who lacks cultural competence affects the
  people directly in front of them. A software engineer who lacks it can bake a bad assumption into a product
  used by millions of people at once. That's Washington's core reason cultural competence isn't optional for CS
  &mdash; the blast radius of an unexamined default is enormous.</div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>Where did the concept of "cultural competence" originally come from?</div>
    <button class="opt" data-i="0">Computer science curricula in the 1990s</button>
    <button class="opt" data-i="1">Corporate diversity training programs</button>
    <button class="opt" data-i="2">Social work in the late 1980s, later spreading to education and healthcare</button>
    <button class="opt" data-i="3">Federal civil rights legislation</button>
    <div class="fb" data-explain="Cultural competence originated in social work and moved into education and healthcare in the 1990s &mdash; computing is a comparatively recent, and still underdeveloped, adopter of the concept."></div>
  </div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>Most computing students receive little to no formal training in cultural competence or behavioral/social science unless they seek it out as an elective.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="This is one of Washington's central diagnoses of the field &mdash; cultural competence is treated as optional extra material rather than core training."></div>
  </div>
</section>

<section class="topic" id="l5-bias">
  <h2>Bias, Intersectionality &amp; Gaslighting</h2>
  <h3>Bias in algorithms &amp; technology</h3>
  <div class="concept"><b>Bias in algorithms and technology</b> refers to systems that perform worse, or cause
  harm, for some groups of people because the assumptions, training data, or defaults built into them reflect only
  a narrow slice of humanity. Washington's go-to example is <b>facial recognition</b> systems failing to
  accurately detect or verify people with darker skin tones &mdash; with real consequences, like being locked out
  of remotely-proctored exams (e.g., the bar exam) that rely on facial verification software.</div>

  <div class="card">
    <h4>Shirley cards</h4>
    <p>The <b>Shirley card</b> is Washington's historical example of the same pattern predating computers
    entirely: for decades, film manufacturers calibrated color exposure using a reference photo of a white woman
    (nicknamed "Shirley"). Because exposure settings were tuned to her skin tone, photographs of people with darker
    skin were routinely underexposed for generations &mdash; not because anyone intended harm, but because the
    "default" user assumed in the calibration process was implicitly white. It's the same structural pattern as
    modern algorithmic bias, just from analog photography instead of software.</p>
  </div>
  <p class="muted">The throughline: bias doesn't require anyone to be malicious. It just requires a narrow set of
  assumptions to go unquestioned in a technical default that then gets applied to everyone.</p>

  <h3>Intersectionality</h3>
  <div class="concept"><b>Intersectionality</b> is the idea that a person's overlapping identities (e.g., being
  both a woman and Black) produce experiences that are not simply the sum of each identity considered separately.
  A Black woman in computing doesn't experience "racism plus sexism" as two independent forces &mdash; she
  experiences a distinct combined experience that neither a race-only nor a gender-only lens fully captures.</div>

  <h3>Gaslighting</h3>
  <div class="concept"><b>Gaslighting</b>, in this context, means deliberately minimizing or ignoring the impact
  of one's actions on someone else, in a way that makes the target question whether their own legitimate concerns
  are valid. Washington uses this term to describe a common experience for marginalized students: raising a
  concern about how they're being treated, and having that concern dismissed or downplayed until they start to
  doubt their own read of the situation.</div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>What does the Shirley card illustrate about bias in technology?</div>
    <button class="opt" data-i="0">That bias in technology is a purely modern, software-specific problem</button>
    <button class="opt" data-i="1">That a narrow, unexamined default (calibrating exposure to one skin tone) can produce systemic harm without anyone intending it</button>
    <button class="opt" data-i="2">That film photography was intentionally designed to discriminate</button>
    <button class="opt" data-i="3">That bias only affects facial recognition software, not other technologies</button>
    <div class="fb" data-explain="The Shirley card predates computing and shows the same structural pattern as algorithmic bias: an unquestioned default calibrated to one group, applied universally, with unequal results."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>The idea that overlapping identities (e.g., race and gender together) create a distinct combined experience, not just the sum of each identity separately, is called <input class="fillblank" data-answer="intersectionality" placeholder="term">.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Intersectionality captures how combined identities produce experiences that a single-identity lens misses."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>"Gaslighting," as used in this episode, refers to accidentally misunderstanding someone's concern.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Gaslighting specifically means minimizing or dismissing someone's legitimate concern in a way that makes them doubt their own perception &mdash; it's about invalidation, not honest misunderstanding."></div>
  </div>
</section>

<section class="topic" id="l5-action">
  <h2>From Reading to Action</h2>
  <div class="concept">Washington's critique of typical diversity efforts: they put the burden of adaptation on
  <b>marginalized students</b> (teaching them to cope, mentor them harder, etc.) rather than requiring change from
  the faculty and peers around them. She sorts people into <b>three groups</b> that hinder progress: those who
  explicitly reject discussing race in computing at all, those who genuinely want to help but lack any behavioral-
  science training, and those who recognize the problem but stay complacent anyway.</div>

  <h3>Reading, planning, and accountability</h3>
  <div class="card">
    <p>Washington's recommended starting resources: work by <b>Ruha Benjamin, Timnit Gebru, Joy Buolamwini,
    Safiya Noble</b>; the documentary <i>Coded Bias</i>; books like <i>Race After Technology</i> and
    <i>Algorithms of Oppression</i>; and the Algorithmic Justice League. But her real point is that <b>reading
    alone is not the goal</b> &mdash; it's a first step that must lead to planning and implementation. She's
    explicit that debating <b>qualitative vs. quantitative research</b> methodology can become another way to stall
    &mdash; the urgent need is action, not achieving perfect methodological consensus first.</p>
  </div>

  <div class="reqrow">
    <div class="req-list" id="l5-role-list">
      <button class="req-btn active" onclick="roleShow(this,'ally')">"Ally"</button>
      <button class="req-btn" onclick="roleShow(this,'accomplice')">"Advocate / Accomplice"</button>
    </div>
    <div class="req-detail" id="l5-role-detail" style="flex:2;min-width:260px">
      Click a role to see how Washington distinguishes them.
    </div>
  </div>

  <div class="warn"><b>Agile development, applied to social change:</b> instead of waiting years for a perfect
  plan, Washington advocates a cycle of read &rarr; plan &rarr; implement &rarr; evaluate &rarr; iterate,
  continuously. Her line: "spring can't wait" &mdash; ongoing harm doesn't pause while people perfect their
  approach.</div>

  <h3>Department-level accountability</h3>
  <div class="concept">Her concrete asks of departments: make inclusive design part of the <b>required
  curriculum</b>, not an optional add-on, and tie <b>faculty performance reviews and tenure decisions</b> to
  actually creating equitable environments &mdash; so that commitment is enforced by real incentives, not just
  stated as a value.</div>

  <div class="q" data-mc="0">
    <div class="prompt"><span class="tag">MC</span>According to Washington, what is the main problem with many current diversity efforts in CS departments?</div>
    <button class="opt" data-i="0">They focus on helping marginalized students adapt/cope, rather than requiring change from faculty and peers</button>
    <button class="opt" data-i="1">They spend too much money on facial recognition research</button>
    <button class="opt" data-i="2">They rely too heavily on department chairs instead of individual faculty</button>
    <button class="opt" data-i="3">They focus exclusively on hiring, ignoring the curriculum entirely</button>
    <div class="fb" data-explain="Her critique is specifically about where the burden of change is placed &mdash; on marginalized students rather than the systems and people around them."></div>
  </div>

  <div class="q" data-multi="0,1,3">
    <div class="prompt"><span class="tag">Select all</span>Which of these are groups Washington identifies as hindering progress on cultural competence in CS?</div>
    <div class="ma-item"><input type="checkbox" data-i="0"><span>People who explicitly reject discussing race in computing</span></div>
    <div class="ma-item"><input type="checkbox" data-i="1"><span>People who want to help but lack behavioral-science training</span></div>
    <div class="ma-item"><input type="checkbox" data-i="2"><span>People who have read every book on the recommended list</span></div>
    <div class="ma-item"><input type="checkbox" data-i="3"><span>People who recognize the problem but remain complacent</span></div>
    <button class="btn small" onclick="checkMulti(this)">Check</button>
    <div class="fb" data-explain="Washington names three groups: outright rejecters, well-meaning but untrained people, and complacent people who see the problem but don't act. Having read the recommended books isn't one of her named categories &mdash; and by her own argument, reading alone doesn't exempt anyone from the other two failure modes."></div>
  </div>
</section>

<section class="topic" id="l5-equity">
  <h2>Equity vs. Equality &amp; Mindset</h2>
  <div class="concept">Pérez-Quiñones opens by directly addressing a common objection: supporting students of
  color is <i>not</i> unfair to other students, because the gap he's responding to comes from <b>systemic
  discrimination / structural inequality</b> &mdash; underfunded high schools, fewer AP course offerings, less
  early exposure to CS &mdash; not from any difference in ability. "Supporting one group does not mean ignoring
  the other."</div>

  <h3>Equity vs. equality</h3>
  <div class="two">
    <div class="card"><h4>Equality</h4><p>Treating every student identically &mdash; the same resources, the same
    expectations, the same starting conditions &mdash; regardless of what they walked in with.</p></div>
    <div class="card"><h4>Equity</h4><p>Giving each student what they specifically need to reach the same starting
    line. A student who never had access to an AP CS course needs different support than one who took four of
    them; treating them identically going forward just preserves the old gap.</p></div>
  </div>
  <p class="muted">Simple version: equality is giving everyone the same ladder; equity is giving everyone a ladder
  tall enough to reach the same shelf, since they didn't all start at the same height.</p>

  <h3>Fixed vs. growth mindset</h3>
  <div class="concept">A <b>fixed mindset</b> treats ability as a stable trait you either have or don't. A
  <b>growth mindset</b> treats ability as something that improves through effort, practice, and iteration.
  Pérez-Quiñones designs his course policies specifically to reinforce a growth mindset &mdash; a student who
  doesn't succeed on the first attempt isn't branded as lacking ability, they're supported toward eventual
  mastery.</div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>Why does Pérez-Quiñones argue that supporting students of color isn't unfair to other students?</div>
    <button class="opt" data-i="0">Because all students perform identically once enrolled</button>
    <button class="opt" data-i="1">Because the gap being addressed comes from systemic discrimination and structural inequality, not from differences in ability</button>
    <button class="opt" data-i="2">Because other students don't need any support at all</button>
    <button class="opt" data-i="3">Because supporting one group automatically disadvantages another</button>
    <div class="fb" data-explain="His argument rests specifically on the source of the gap being systemic/structural, not individual merit &mdash; which is why addressing it isn't a zero-sum unfairness to other students."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>Equality and equity mean the same thing: treating every student in exactly the same way.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Equality means identical treatment; equity means giving each student what they specifically need to reach the same starting point &mdash; these are explicitly contrasted, not synonyms."></div>
  </div>
</section>

<section class="topic" id="l5-grading">
  <h2>Specification Grading &amp; Pathways</h2>
  <div class="concept"><b>Specification grading</b> is Pérez-Quiñones's concrete mechanism for supporting a growth
  mindset: assignments are graded <b>satisfactory/unsatisfactory</b> against a roughly 80% mastery threshold,
  rather than accumulated points. Students get <b>multiple attempts</b> at an assignment, without late penalties,
  until they reach that bar. Final grades are based on how many assignments reached "satisfactory," not on total
  points earned along the way.</div>
  <p class="muted">Simple version: instead of losing points forever for an early mistake, you keep working on an
  assignment until it's actually good &mdash; which is what "mastery" is supposed to mean.</p>

  <h3>Scaffolding for underprepared students</h3>
  <div class="concept"><b>Scaffolding</b> means providing structured, temporary support (extra resources, worked
  examples, guided practice) that helps an underprepared student reach the same competency level as their peers
  &mdash; support that can be reduced as the student gains independence. This is the practical, in-the-classroom
  expression of the equity principle from the previous topic.</div>

  <h3>The "pipeline" metaphor vs. alternative pathways</h3>
  <div class="warn"><b>Commonly confused:</b> the "pipeline" metaphor frames the whole problem as simply "too few
  students of color enter CS at the very start," implying the fix is only about recruitment at the entry point.
  Pérez-Quiñones pushes back on this framing &mdash; students arrive at CS from many different backgrounds and
  timelines, not just a single straight-through track from childhood interest to CS major. He argues for
  recognizing and supporting <b>alternative pathways</b> into the field, not just funneling more students into one
  narrow on-ramp.</div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>Under Pérez-Quiñones's specification grading system, how are assignments graded?</div>
    <button class="opt" data-i="0">On a traditional 100-point scale with partial credit</button>
    <button class="opt" data-i="1">Pass/fail with no opportunity to revise</button>
    <button class="opt" data-i="2">Satisfactory/unsatisfactory against roughly an 80% mastery bar, with multiple attempts allowed</button>
    <button class="opt" data-i="3">Curved relative to the highest-scoring student in the class</button>
    <div class="fb" data-explain="Specification grading uses a satisfactory/unsatisfactory bar (about 80%) and allows multiple attempts without late penalties, supporting a growth-mindset approach to mastery."></div>
  </div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>Pérez-Quiñones is critical of the "pipeline" metaphor because it frames the problem as only about recruiting more students at the very beginning, ignoring the variety of pathways students actually take into CS.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="He explicitly argues for recognizing alternative pathways rather than treating the pipeline's entry point as the only lever worth pulling."></div>
  </div>
</section>

<section class="topic" id="l5-data">
  <h2>Data, Discomfort &amp; Broadening Participation</h2>
  <div class="concept">Pérez-Quiñones argues <b>data</b> (like campus <b>climate surveys</b>) should be used to
  actually diagnose real problems in a department &mdash; not just to generate feel-good statistics for
  showcasing existing initiatives. Data should drive what a department does next, not just justify what it's
  already doing.</div>

  <h3>Faculty discomfort discussing race &amp; identity</h3>
  <div class="warn">Both speakers converge on the same practical obstacle: many faculty are simply
  <b>uncomfortable discussing race and identity</b> at all. Pérez-Quiñones names this directly as a barrier that
  has to be acknowledged before it can be addressed &mdash; and it echoes Washington's point in the first topic
  that most CS faculty never received training that would make these conversations feel routine rather than
  fraught.</div>

  <h3>Broadening participation in computing</h3>
  <div class="concept"><b>Broadening participation in computing</b> is the umbrella goal both episodes serve:
  increasing the number and success of students from underrepresented groups in CS, through a combination of
  culturally competent teaching, equitable support structures, and departmental accountability &mdash; not through
  any single fix. Pérez-Quiñones specifically highlights the role of <b>student organizations, mentoring, and
  emotional support</b> as part of what makes this possible in practice, alongside the structural/policy changes
  discussed earlier.</div>

  <div class="q" data-mc="3">
    <div class="prompt"><span class="tag">MC</span>According to Pérez-Quiñones, what should data (like climate surveys) primarily be used for?</div>
    <button class="opt" data-i="0">Ranking departments against each other nationally</button>
    <button class="opt" data-i="1">Justifying that no further changes are needed</button>
    <button class="opt" data-i="2">Satisfying accreditation requirements only</button>
    <button class="opt" data-i="3">Actually identifying and diagnosing real problems, so departments know what to work on next</button>
    <div class="fb" data-explain="He contrasts using data to diagnose real problems with using it merely to celebrate existing initiatives."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>Both speakers note that many CS faculty feel <input class="fillblank" data-answer="uncomfortable|discomfort" placeholder="feeling"> discussing race and identity, which both episodes identify as a barrier that must be named before it can be overcome.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Faculty discomfort with these conversations is a shared theme across both episodes, tracing back to the lack of behavioral-science training Washington describes."></div>
  </div>
</section>

<section class="topic" id="l5-check">
  <h2>Reading Quiz 5 Self-Check</h2>
  <p class="muted">Every term from the instructor's Reading Quiz 5 terms/concepts list, as a mixed review.</p>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>What is "cultural competence," as Nicki Washington defines it?</div>
    <button class="opt" data-i="0">Fluency in multiple spoken languages</button>
    <button class="opt" data-i="1">The ability to engage with people from diverse backgrounds in ways that respect their identities while still effectively doing your job</button>
    <button class="opt" data-i="2">A certification required for all software engineers</button>
    <button class="opt" data-i="3">A synonym for diversity hiring quotas</button>
    <div class="fb" data-explain="Cultural competence is about how you engage with diverse people while remaining effective at your actual work, not a credential or hiring policy."></div>
  </div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>The Shirley card and modern facial-recognition bias are both examples of a narrow technical default causing unequal harm, even without malicious intent.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Both are the same structural pattern: an unquestioned default calibrated to one group, applied universally."></div>
  </div>

  <div class="q" data-mc="0">
    <div class="prompt"><span class="tag">MC</span>What distinguishes an "advocate/accomplice" from a passive "ally," per Washington?</div>
    <button class="opt" data-i="0">Willingness to be uncomfortable and take concrete action, including pushing peers toward discomfort</button>
    <button class="opt" data-i="1">Having read more books on the recommended list</button>
    <button class="opt" data-i="2">Holding a formal diversity-officer title</button>
    <button class="opt" data-i="3">Avoiding any public disagreement with colleagues</button>
    <div class="fb" data-explain="Washington's distinction is about willingness to act and tolerate discomfort, not credentials or reading volume."></div>
  </div>

  <div class="q" data-multi="0,2">
    <div class="prompt"><span class="tag">Select all</span>Which of these are among the identity dimensions Washington names as shaping how someone experiences computing spaces?</div>
    <div class="ma-item"><input type="checkbox" data-i="0"><span>Race</span></div>
    <div class="ma-item"><input type="checkbox" data-i="1"><span>GPA</span></div>
    <div class="ma-item"><input type="checkbox" data-i="2"><span>Gender, class, age, and ability</span></div>
    <div class="ma-item"><input type="checkbox" data-i="3"><span>Programming language preference</span></div>
    <button class="btn small" onclick="checkMulti(this)">Check</button>
    <div class="fb" data-explain="Washington's named identity dimensions include race, gender, class, age, and ability &mdash; not academic metrics or technical preferences."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>Pérez-Quiñones argues that supporting students of color is unfair to other students because it gives some students an advantage they haven't earned.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="He explicitly rejects this framing: the support addresses systemic discrimination and structural inequality, not a difference in earned merit."></div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>What is "specification grading"?</div>
    <button class="opt" data-i="0">Grading based on how closely a student's code matches a reference implementation</button>
    <button class="opt" data-i="1">A curve based on class-wide performance</button>
    <button class="opt" data-i="2">A satisfactory/unsatisfactory system (roughly an 80% bar) allowing multiple attempts without late penalties</button>
    <button class="opt" data-i="3">Extra credit awarded for exceeding a specification</button>
    <div class="fb" data-explain="Specification grading is Pérez-Quiñones's mastery-based system: satisfactory/unsatisfactory against a set bar, with room to retry."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>Pérez-Quiñones is critical of the <input class="fillblank" data-answer="pipeline" placeholder="metaphor"> metaphor because it frames the problem as only about recruiting more students at the entry point, rather than recognizing alternative pathways into CS.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="The pipeline metaphor implies a single straight-through track; he argues for recognizing the many different pathways students actually take."></div>
  </div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>Both Washington and Pérez-Quiñones identify faculty discomfort discussing race and identity as a real obstacle to progress in CS education.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="This is a shared theme across both episodes &mdash; Washington ties it to a lack of behavioral-science training, and Pérez-Quiñones names it directly as a barrier."></div>
  </div>
</section>

</main>
`;

function roleShow(btn, key) {
  document.querySelectorAll('#l5-role-list .req-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const info = {
    ally: "<b>\"Ally\" (as Washington critiques the term):</b> someone who supports change in principle but stays comfortable &mdash; agreeing privately, avoiding conflict, not disrupting the status quo among their own peers.",
    accomplice: "<b>\"Advocate / accomplice\":</b> someone willing to be inconvenienced and uncomfortable &mdash; having hard conversations within their own peer networks, pushing colleagues toward discomfort, and taking visible action, because (in her words) no social justice movement succeeds by keeping the majority group comfortable."
  };
  document.getElementById('l5-role-detail').innerHTML = info[key];
}

function initL5() {
  roleShow(document.querySelector('#l5-role-list .req-btn'), 'ally');
}
