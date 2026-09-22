document.getElementById('l4').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l4-intro')">Learning Styles &amp; the Meshing Hypothesis</button>
  <button onclick="showTopic(this,'l4-evidence')">What Evidence Would Prove It</button>
  <button onclick="showTopic(this,'l4-crossover')">Crossover Interactions</button>
  <button onclick="showTopic(this,'l4-lit')">The Literature Search</button>
  <button onclick="showTopic(this,'l4-ati')">ATIs &amp; Locus of Control</button>
  <button onclick="showTopic(this,'l4-conclusions')">Conclusions &amp; Policy</button>
  <button onclick="showTopic(this,'l4-check')">Reading Quiz 4 Self-Check</button>
</nav>

<section class="topic active" id="l4-intro">
  <h2>Learning Styles &amp; the Meshing Hypothesis</h2>
  <div class="concept"><b>Learning styles</b> refers to the view that different people learn information in
  different ways, and that optimal instruction requires diagnosing each student's style and tailoring
  instruction to it. It has become a huge commercial industry &mdash; tests, inventories, certification programs
  &mdash; despite the authors (cognitive psychologists) finding, after a full review, essentially no scientific
  evidence behind it.</div>
  <p class="muted">Simple version: "learning styles" is the popular idea that some kids are "visual learners" and
  some are "auditory learners," and that teaching to each kid's type helps them learn better. This paper asks:
  is that actually true, or just something everyone believes?</p>

  <h3>The commercial learning-styles industry</h3>
  <div class="card">
    <p>The paper names specific, real products built around the concept: the <b>Dunn and Dunn</b> learning-styles
    model and its assessment instruments, <b>Kolb's Learning Styles Inventory</b> (which sorts people into
    divergers/assimilators/convergers/accommodators), and <b>Honey and Mumford's Learning Styles Questionnaire</b>.
    Coffield et al. (2004) found <b>71 different schemes</b> in the literature &mdash; this is not one small idea,
    it's an entire ecosystem of competing "type" theories.</p>
  </div>

  <h3>Myers&ndash;Briggs influence</h3>
  <div class="concept">The authors trace part of learning styles' popularity to the cultural influence of the
  <b>Myers&ndash;Briggs Type Indicator</b>. Myers&ndash;Briggs sorts people into discrete personality "types" and
  became hugely popular starting in the 1940s, despite having weak support from objective studies. Its success
  normalized the idea that finding "what type of person you are" is valuable and legitimate &mdash; which primed
  the public and educators to accept learning-styles "type" theories the same way, without asking for the same
  evidence a scientific claim would need.</div>

  <h3>The meshing hypothesis</h3>
  <div class="concept"><b>The meshing hypothesis</b> is the specific, most common version of the learning-styles
  hypothesis that matters for classrooms: instruction should be presented in the format that matches
  (&ldquo;meshes with&rdquo;) the learner's own style &mdash; e.g., visual information, when possible, for a
  self-identified &ldquo;visual learner.&rdquo; This is the version the paper spends most of its effort testing,
  because it's the version with real, practical implications for how teachers should teach.</div>

  <h3>Preferences vs. the learning-style hypothesis &mdash; evidence vs. belief</h3>
  <div class="warn"><b>This is the single most important distinction in the whole paper, and the easiest thing to
  mix up on a quiz.</b> The authors carefully separate two claims that get blurred together:
  <ul>
    <li><b>Existence of study preferences</b> &mdash; the uncontroversial, well-supported fact that people, if
    asked, will reliably report preferring certain ways of receiving information (e.g., "I like diagrams better
    than text"). This is real and measurable &mdash; preference questionnaires have decent test-retest reliability.</li>
    <li><b>The learning-styles hypothesis</b> &mdash; the much stronger claim that <i>honoring</i> that preference
    actually improves <i>learning outcomes</i>. This is the claim with real educational-policy stakes, and it's
    the one the authors could not find credible evidence for.</li>
  </ul>
  A preference existing tells you nothing by itself about whether catering to it helps you learn. That gap &mdash;
  between what people believe about their own learning (belief) and what controlled experiments actually show
  (evidence) &mdash; is the paper's central theme.</div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>According to Pashler et al., what is the "meshing hypothesis"?</div>
    <button class="opt" data-i="0">The idea that all students learn equally well regardless of instructional method</button>
    <button class="opt" data-i="1">The claim that instruction is best when its presentation format matches the learner's own preferred style</button>
    <button class="opt" data-i="2">The idea that teachers should mix multiple instructional methods together in every lesson</button>
    <button class="opt" data-i="3">The claim that learning styles should be assessed using the Myers&ndash;Briggs test</button>
    <div class="fb" data-explain="The meshing hypothesis is specifically about matching presentation format (e.g., visual content) to a learner's self-identified style."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>The existence of study preferences (people reporting they prefer diagrams over text, for example) is, by itself, sufficient evidence for the learning-styles hypothesis.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Preferences existing is a separate, weaker claim than the learning-styles hypothesis, which requires showing that honoring those preferences actually improves learning outcomes &mdash; something the existence of a preference does not demonstrate."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>The paper's popularity of "type" theories like learning styles is partly traced to the cultural influence of the <input class="fillblank" data-answer="myers-briggs|myers briggs|myers–briggs" placeholder="test name"> personality test.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Myers&ndash;Briggs normalized sorting people into discrete types despite weak objective support, priming acceptance of similar learning-style typologies."></div>
  </div>
</section>

<section class="topic" id="l4-evidence">
  <h2>What Evidence Would Prove It</h2>
  <p>This is the paper's central methodological contribution: before reviewing any studies, the authors define
  exactly what a study would need to show to actually validate learning-styles-based instruction.</p>

  <div class="card">
    <h4>The four required criteria for experimental validation</h4>
    <ol>
      <li>Students must be divided into groups based on their learning style.</li>
      <li>Students from each style group must be <b>randomly assigned</b> to one of multiple instructional methods.</li>
      <li>All subjects must then sit for the <b>same final test</b> (not different tests for different groups).</li>
      <li>The results must show that the instructional method that optimizes one style group's performance is
      <b>different</b> from the method that optimizes the other group's performance.</li>
    </ol>
    <p class="muted">Simple version: you can't just show visual learners like diagrams. You have to show that
    visual learners actually score higher on a real test when taught with diagrams <i>than they do</i> with text
    &mdash; and that verbal learners show the opposite pattern.</p>
  </div>

  <div class="concept"><b>Experimental validation</b> is the authors' term for this whole standard: only a proper
  randomized experiment with these four features counts. Surveys asking people what they prefer, testimonials
  from teachers, or correlational studies relating preference to some outcome do not meet this bar &mdash; because
  none of them can rule out simpler explanations (like one method just being better for everyone, or the
  preference correlating with something else entirely).</div>

  <div class="q" data-multi="0,1,3">
    <div class="prompt"><span class="tag">Select all</span>Which of these are among the four criteria Pashler et al. require for a study to validate the learning-styles hypothesis?</div>
    <div class="ma-item"><input type="checkbox" data-i="0"><span>Students are randomly assigned to an instructional method within their style group</span></div>
    <div class="ma-item"><input type="checkbox" data-i="1"><span>All students take the same final test</span></div>
    <div class="ma-item"><input type="checkbox" data-i="2"><span>Each style group is given a different test tailored to their style</span></div>
    <div class="ma-item"><input type="checkbox" data-i="3"><span>The optimal method must differ between style groups</span></div>
    <div class="fb" data-explain="Random assignment within style group, a common final test, and a different optimal method per group are three of the four criteria. Giving each group a different test is the opposite of what's required &mdash; a shared outcome measure is essential."></div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>Why do the authors insist that all subjects take the same final test, rather than different tests suited to each learning style?</div>
    <button class="opt" data-i="0">Because different tests are more expensive to create</button>
    <button class="opt" data-i="1">Because students dislike being tested differently from their peers</button>
    <button class="opt" data-i="2">Because a shared outcome measure is necessary to fairly compare which instructional method produced better performance across groups</button>
    <button class="opt" data-i="3">Because standardized tests are required by law</button>
    <div class="fb" data-explain="If each group took a different test, you couldn't tell whether performance differences reflect real learning differences or just differences in test difficulty/content &mdash; the comparison has to be apples-to-apples."></div>
  </div>
</section>

<section class="topic" id="l4-crossover">
  <h2>Crossover Interactions</h2>
  <div class="concept">A <b>crossover interaction</b> is the specific statistical pattern that counts as evidence
  for the learning-styles hypothesis: the instructional method that produces the <i>best</i> outcome for Style
  Group A must be a <i>different</i> method from the one that produces the best outcome for Style Group B. If you
  plotted this, the two groups' performance lines would literally cross when graphed with learning style on the
  horizontal axis.</div>

  <div class="reqrow">
    <div class="req-list" id="l4-crossover-list">
      <button class="req-btn active" onclick="crossoverShow(this,'acceptable')">Acceptable evidence (crossover)</button>
      <button class="req-btn" onclick="crossoverShow(this,'unacceptable')">Unacceptable evidence (no crossover)</button>
      <button class="req-btn" onclick="crossoverShow(this,'relabel')">The relabeling trap</button>
    </div>
    <div class="req-detail" id="l4-crossover-detail" style="flex:2;min-width:260px">
      Click an option to see what does and doesn't count as evidence for learning styles.
    </div>
  </div>

  <div class="warn"><b>Commonly confused:</b> the paper shows (Figures 1 and 2) that you can take the exact same
  underlying data and make it <i>look</i> like a crossover just by choosing what goes on the horizontal axis
  (learning method vs. learning style). A "crossover" only counts as evidence for learning styles specifically
  when <b>learning style is on the horizontal axis</b> &mdash; if the same one method wins for both style groups,
  no relabeling of the graph changes that underlying fact, and it does not support the hypothesis.</div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>For a crossover interaction to count as evidence for the learning-styles hypothesis, the learning-style variable must be plotted on the horizontal axis.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="The paper shows the same raw data can look like it crosses over depending on which variable is on the horizontal axis &mdash; only when learning style is on that axis does a crossover actually support the hypothesis."></div>
  </div>

  <div class="q" data-mc="0">
    <div class="prompt"><span class="tag">MC</span>Group A scores higher than Group B under Method 1, and Group A also scores higher than Group B under Method 2 (Group A simply outperforms Group B under both methods). Does this support the learning-styles hypothesis?</div>
    <button class="opt" data-i="0">No &mdash; the same relative ranking holds under both methods, so there's no crossover; one method may still just be generally better</button>
    <button class="opt" data-i="1">Yes &mdash; any difference between groups counts as support</button>
    <button class="opt" data-i="2">Yes, but only if Group A is larger than Group B</button>
    <button class="opt" data-i="3">It's impossible to know without a locus-of-control measure</button>
    <div class="fb" data-explain="Without a crossover &mdash; without the optimal method differing between groups &mdash; there's no evidence that groups need different instruction, even if the groups differ in overall performance."></div>
  </div>
</section>

<section class="topic" id="l4-lit">
  <h2>The Literature Search: What They Found</h2>
  <div class="concept">Despite the enormous size of the learning-styles literature, the authors found only a
  <b>handful of studies</b> that even attempted the required design &mdash; and the ones that were well-designed
  actually <b>contradicted</b> the meshing hypothesis.</div>

  <h3>The one "positive" result &mdash; and why it's weak</h3>
  <div class="card">
    <p>Sternberg, Grigorenko, Ferrari &amp; Clinkenbeard (1999) sorted gifted high-schoolers by their strongest
    ability (analytical, creative, or practical) and found matched students slightly outscored mismatched
    students. But the authors flag serious problems: the effect only appeared after outliers were excluded, only
    about a third of subjects were classified strongly enough to use, the instructional manipulation doesn't
    resemble any real commercial learning-styles product, and raw (untransformed) scores weren't reported. They
    call it, at best, "tenuous" evidence.</p>
  </div>

  <h3>The well-designed studies &mdash; and they found nothing</h3>
  <table class="cmp">
    <tr><th>Study</th><th>What it tested</th><th>Result</th></tr>
    <tr><td><b>Massa &amp; Mayer (2006)</b></td><td>Verbal vs. visual help-screens matched to verbalizer/visualizer preference, in a computer electronics lesson</td><td>No support &mdash; matching instruction to preference did not improve learning, despite testing nearly 20 individual-difference measures</td></tr>
    <tr><td><b>Constantinidou &amp; Baker (2002)</b></td><td>Whether self-reported verbal/visual preference (via the VVQ) predicted actual free-recall performance across modalities</td><td>No relationship between preference and actual recall performance</td></tr>
  </table>
  <p class="muted">The authors describe these two as <b>methodologically strong</b> studies that provide no support
  for the learning-styles hypothesis (or its most popular version, the meshing hypothesis).</p>

  <div class="q" data-mc="3">
    <div class="prompt"><span class="tag">MC</span>What did Massa &amp; Mayer (2006) find when they matched verbal or visual help-screens to students' own verbalizer/visualizer preference?</div>
    <button class="opt" data-i="0">Matched students strongly outperformed mismatched students on every measure tested</button>
    <button class="opt" data-i="1">Preference for visual vs. verbal input strongly predicted an objective measure of aptitude</button>
    <button class="opt" data-i="2">The study was too poorly designed to draw conclusions</button>
    <button class="opt" data-i="3">Matching instruction to preference found no support for the meshing hypothesis, despite testing nearly 20 individual-difference measures</button>
    <div class="fb" data-explain="Massa & Mayer's well-designed, thorough study found no benefit from meshing instruction to stated preference."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>The Sternberg et al. (1999) study is presented by the authors as strong, conclusive evidence for the learning-styles hypothesis.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="The authors call it at best tenuous evidence, citing outlier exclusion, a small classified subset, an unrepresentative instructional manipulation, and unreported raw scores."></div>
  </div>
</section>

<section class="topic" id="l4-ati">
  <h2>ATIs &amp; Locus of Control</h2>
  <p>The paper also reviews two related-but-distinct literatures. These are <b>not</b> the learning-styles
  hypothesis, but they get discussed because they involve similar interaction logic and are easy to confuse with
  it on a quiz.</p>

  <h3>Aptitude-Treatment Interactions (ATIs)</h3>
  <div class="concept"><b>Aptitude-Treatment Interaction (ATI)</b> research asks whether a student's general
  <i>ability/aptitude</i> (not "style") interacts with how much <b>structure</b> their instruction should have.
  The dominant hypothesis: high-ability students do better with <b>less structured</b> instruction, while
  low-ability students do better with <b>more structured</b>, guided instruction. This tradition traces back to
  Cronbach's classic 1957 call for aptitude-by-treatment research.</div>
  <div class="warn"><b>Why this is a separate question from learning styles:</b> ATI is about general cognitive
  <i>ability level</i>, not a preferred presentation format or "type." A student isn't a "structured learner" the
  way they might be labeled a "visual learner" &mdash; ability is a continuum, and the ATI literature is its own
  body of research with its own (also mixed) results.</div>
  <p>The results were <b>inconsistent</b>: some well-conducted studies (like Peterson, Janicki & Swing, 1980,
  using multiple-choice outcome measures) found the predicted crossover; others using different content domains
  and different ability measures found no interaction at all, or even the reverse pattern.</p>

  <h3>Locus of control</h3>
  <div class="concept"><b>Locus of control</b> is a personality measure describing whether a person believes their
  successes/failures are a consequence of their own actions (<b>internal</b> locus of control) or of factors
  outside their control (<b>external</b> locus of control). Some studies found students with an internal locus of
  control performed better with <b>less guided</b> instruction, while students with an external locus of control
  performed better with <b>more guided</b> instruction &mdash; but the authors describe this evidence as
  "modest" and note the findings don't always replicate across studies.</div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>What does the dominant ATI hypothesis predict about instructional structure and student ability?</div>
    <button class="opt" data-i="0">All students, regardless of ability, learn best with highly structured instruction</button>
    <button class="opt" data-i="1">High-ability students fare better with less structured instruction; low-ability students fare better with more structured instruction</button>
    <button class="opt" data-i="2">Ability has no relationship to how much instructional structure is optimal</button>
    <button class="opt" data-i="3">Low-ability students always outperform high-ability students regardless of method</button>
    <div class="fb" data-explain="This is the primary hypothesis reviewed in the ATI literature &mdash; though the paper notes the empirical support for it across studies is mixed, not uniformly confirmed."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>A student who believes their outcomes are determined mainly by their own effort and choices has an <input class="fillblank" data-answer="internal" placeholder="internal/external"> locus of control, while a student who believes outcomes are determined by outside forces has an <input class="fillblank sm" data-answer="external" placeholder="internal/external"> locus of control.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Internal = believing you control your outcomes; external = believing outside factors control your outcomes."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>Aptitude-Treatment Interaction (ATI) research is simply another name for the learning-styles hypothesis discussed earlier in the paper.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="The authors explicitly treat ATI validity as a separate issue from learning-style validity &mdash; ATI concerns general aptitude/ability and instructional structure, not a preferred presentation format or type."></div>
  </div>
</section>

<section class="topic" id="l4-conclusions">
  <h2>Conclusions &amp; Policy</h2>
  <div class="concept"><b>Bottom line:</b> the authors conclude there is <i>no adequate evidence base</i> to
  justify incorporating learning-styles assessments into general educational practice. This isn't a claim that
  every possible version of learning styles has been definitively disproven &mdash; many versions simply
  haven't been rigorously tested at all &mdash; but given the current state of the evidence, limited educational
  resources are better spent on practices that do have a strong evidence base (they point to testing/retrieval
  practice as one clear example).</div>

  <h3>Educational policy implications</h3>
  <div class="card">
    <p>Because learning-styles assessment and instruction lack supporting evidence, the authors argue schools and
    teacher-training programs should <b>not</b> mandate or promote it as a required practice. They're careful to
    frame this as a resource-allocation argument as much as a truth claim: time and money spent assessing every
    student's "style" and building style-specific materials is time and money not spent on approaches (like
    retrieval practice) that are actually backed by evidence.</p>
  </div>

  <h3>Cost considerations</h3>
  <div class="concept">Even setting evidence aside, the authors note that learning-styles interventions carry
  real <b>costs</b>: students must be assessed and grouped, teachers need additional training, and instructional
  materials must be created and validated for each style category &mdash; potentially requiring more teachers to
  serve smaller, style-specific groups. Given the near-absence of demonstrated benefit, these costs are very hard
  to justify.</div>

  <h3>Metacognition, intuition, and the universality of learning capacity</h3>
  <div class="card">
    <p>The authors close by noting that people's <b>intuitions</b> about their own learning are frequently wrong
    &mdash; research on <b>metacognition</b> shows people often mispredict which study/instructional conditions
    will actually produce the best long-term learning (e.g., conditions that feel easy during practice, like
    blocking, often produce worse long-term retention than conditions that feel harder, like spacing or
    interleaving). This is part of why belief and self-report aren't a substitute for controlled evidence.</p>
    <p>Finally, they emphasize the <b>universality of learning capacity</b>: nearly all humans have a substantial,
    shared capacity to learn. Rather than assuming people need fundamentally different teaching methods based on a
    style label, the more promising path is identifying techniques &mdash; like retrieval practice &mdash; that
    reliably improve learning for essentially everyone.</p>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">MC</span>What is the paper's overall conclusion about learning-styles assessment in schools?</div>
    <button class="opt" data-i="0">It should be mandatory because the evidence strongly supports it</button>
    <button class="opt" data-i="1">Every version of learning styles has been conclusively disproven</button>
    <button class="opt" data-i="2">There is currently no adequate evidence to justify it, and resources would be better spent on practices with a stronger evidence base</button>
    <button class="opt" data-i="3">It should be used only for students who self-report a strong preference</button>
    <div class="fb" data-explain="The authors' conclusion is a call to redirect limited resources toward evidence-based practices, not a claim that every possible learning-styles idea has been proven false."></div>
  </div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>The paper argues that people's intuitions about how they learn best are often unreliable, which is part of why controlled evidence, not belief, should guide educational practice.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="Research on metacognition shows people frequently mispredict which study/instructional conditions produce the best long-term learning &mdash; exactly the authors' point about beliefs vs. evidence."></div>
  </div>
</section>

<section class="topic" id="l4-check">
  <h2>Reading Quiz 4 Self-Check</h2>
  <p class="muted">Every term from the instructor's Reading Quiz 4 terms/concepts list, as a mixed review.</p>

  <div class="q" data-mc="0">
    <div class="prompt"><span class="tag">MC</span>What did Pashler, McDaniel, Rohrer &amp; Bjork conclude after reviewing the learning-styles literature?</div>
    <button class="opt" data-i="0">There is no adequate evidence base to justify learning-styles assessment in schools</button>
    <button class="opt" data-i="1">Learning styles are strongly supported by dozens of well-designed crossover studies</button>
    <button class="opt" data-i="2">Only auditory and visual learning styles have been validated</button>
    <button class="opt" data-i="3">Learning styles should replace all other forms of educational assessment</button>
    <div class="fb" data-explain="This is the paper's headline conclusion."></div>
  </div>

  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">T/F</span>A study showing that people reliably report preferring pictures over text is, by itself, sufficient to validate the learning-styles hypothesis.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="That only demonstrates a preference exists &mdash; not that honoring it improves learning outcomes, which is what the learning-styles hypothesis actually requires."></div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">MC</span>Which pattern of results would count as a genuine crossover interaction supporting the learning-styles hypothesis?</div>
    <button class="opt" data-i="0">Method 1 produces the best outcome for both Style Group A and Style Group B</button>
    <button class="opt" data-i="1">Method 1 is best for Style Group A, while Method 2 is best for Style Group B</button>
    <button class="opt" data-i="2">Style Group A simply scores higher than Style Group B under every method tested</button>
    <button class="opt" data-i="3">Both groups score identically regardless of method</button>
    <div class="fb" data-explain="A genuine crossover requires the optimal method to differ between the two style groups."></div>
  </div>

  <div class="q" data-multi="0,2">
    <div class="prompt"><span class="tag">Select all</span>Which named commercial learning-styles products/schemes appear in the reading?</div>
    <div class="ma-item"><input type="checkbox" data-i="0"><span>Kolb's Learning Styles Inventory</span></div>
    <div class="ma-item"><input type="checkbox" data-i="1"><span>The Sternberg Triarchic Abilities Test</span></div>
    <div class="ma-item"><input type="checkbox" data-i="2"><span>Honey and Mumford's Learning Styles Questionnaire</span></div>
    <div class="ma-item"><input type="checkbox" data-i="3"><span>The Visualizer&ndash;Verbalizer Questionnaire (VVQ)</span></div>
    <div class="fb" data-explain="Kolb's Inventory and Honey and Mumford's Questionnaire are named commercial learning-styles products. The Sternberg test and the VVQ are research instruments used in specific studies discussed, not commercial learning-styles products."></div>
  </div>

  <div class="q">
    <div class="prompt"><span class="tag">Fill-in</span>Thurstone's theory of <input class="fillblank" data-answer="primary mental abilities" placeholder="theory name"> proposed seven distinct cognitive abilities, offering real evidence for specific-ability differences &mdash; a separate claim from the learning-styles hypothesis about preferred presentation format.</div>
    <button class="btn small" onclick="checkFillGroup(this)">Check</button>
    <div class="fb" data-explain="Primary mental abilities is evidence for ability differences, which does not by itself validate the learning-styles hypothesis about format preference."></div>
  </div>

  <div class="q" data-mc="3">
    <div class="prompt"><span class="tag">MC</span>What is the relationship between Aptitude-Treatment Interaction (ATI) research and the learning-styles hypothesis, according to the paper?</div>
    <button class="opt" data-i="0">They are the same claim tested with different vocabulary</button>
    <button class="opt" data-i="1">ATI research proves the learning-styles hypothesis correct</button>
    <button class="opt" data-i="2">ATI research has never been studied</button>
    <button class="opt" data-i="3">They are related but distinct questions &mdash; ATI concerns general aptitude and instructional structure, not style-based format preference</button>
    <div class="fb" data-explain="The authors are explicit that ATI validity is a separate issue from learning-styles validity, even though both involve interaction-style research designs."></div>
  </div>

  <div class="q" data-tf="T">
    <div class="prompt"><span class="tag">T/F</span>Even if learning-styles assessment had stronger evidence behind it, the authors note it would still carry real costs &mdash; including assessment time, teacher training, and creating style-specific materials.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb" data-explain="The authors explicitly discuss cost as a separate consideration from evidence &mdash; any real intervention would need benefits large enough to justify these costs."></div>
  </div>
</section>
`;

function crossoverShow(btn, key) {
  document.querySelectorAll('#l4-crossover-list .req-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const info = {
    acceptable: "<b>Acceptable evidence:</b> Style-A learners score highest under Method 1 while Style-B learners score highest under Method 2 (or vice versa) &mdash; the two groups' best method genuinely differs. This is the only pattern the paper accepts as support for the learning-styles hypothesis.",
    unacceptable: "<b>Unacceptable evidence:</b> The same method (say, Method 1) produces the best score for both Style-A and Style-B learners. Even if the interaction is statistically significant, this means one method is simply better for everyone &mdash; it does not show that instruction needs to be individualized by style.",
    relabel: "<b>The relabeling trap:</b> The exact same raw data can be plotted two ways &mdash; with learning method on the horizontal axis, or with learning style on the horizontal axis. Swapping the axis can make a non-crossover look like a crossover, or vice versa. The paper insists the crossover only counts as evidence when <i>learning style</i> is on the horizontal axis, since that is what's actually being tested."
  };
  document.getElementById('l4-crossover-detail').innerHTML = info[key];
}

function initL4() {
  crossoverShow(document.querySelector('#l4-crossover-list .req-btn'), 'acceptable');
}
