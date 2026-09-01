/* ============================================================
   LESSON 0 — CL00 Welcome: course logistics + binary.
   Injects into #l0. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal below
   must be written \\ .
   ============================================================ */
document.getElementById('l0').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l0-course')">How the Course Works</button>
  <button onclick="showTopic(this,'l0-policies')">Policies &amp; AI Rules</button>
  <button onclick="showTopic(this,'l0-binary')">Binary &amp; Bases</button>
  <button onclick="showTopic(this,'l0-lab')">Binary Lab</button>
  <button onclick="showTopic(this,'l0-check')">Self-Check</button>
</nav>
<main>

<!-- ============ COURSE STRUCTURE ============ -->
<section class="topic active" id="l0-course">
  <h2>Lesson 0 &middot; How COMP 211 Works</h2>
  <div class="concept">The rhythm of this course is <b>read &rarr; discuss &rarr; practice &rarr; apply</b>.
  A reading assignment lands before every class, class time is for working problems together, homework
  reinforces, and labs are where you actually build things.</div>

  <h3>The five kinds of work</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Component</th><th>What it is</th><th>Key rules</th></tr>
      <tr>
        <td><b>Readings</b> (RD)</td>
        <td>Guided reading questions on Gradescope, done <i>before</i> the material is covered in class</td>
        <td>Due <b>10:00 AM on the day of class</b> &middot; <b>5 drops</b></td>
      </tr>
      <tr>
        <td><b>Homework</b> (HW)</td>
        <td>Reinforces ideas from the readings and class</td>
        <td>Autograded, <b>unlimited submissions</b>, highest score counts &middot; <b>no late work, no drops, no regrades</b></td>
      </tr>
      <tr>
        <td><b>Labs</b></td>
        <td>Programming assignments — writing, testing, and debugging code</td>
        <td>Autograded, multiple submissions &middot; up to <b>2 days late</b>; first <b>2</b> late labs free, then <b>&minus;20%</b> each</td>
      </tr>
      <tr>
        <td><b>Quizzes</b></td>
        <td>Frequent, low-stakes assessments</td>
        <td><b>50 minutes</b>, on paper, closed-book &middot; a missed quiz is replaced by the final</td>
      </tr>
      <tr>
        <td><b>Checkoffs</b></td>
        <td>Short <b>oral</b> assessments — demonstrate a tool and explain your thinking aloud</td>
        <td>Practice for technical interviews</td>
      </tr>
    </table>
    <div class="warn"><b>The asymmetry worth noticing.</b> Homework has unlimited submissions and the highest
    score counts — but <b>zero</b> flexibility on the deadline. Labs are the reverse: a real late policy, but
    you are expected to iterate. Readings are the only category with drops (5). Plan around that: a missed
    homework deadline is unrecoverable in a way a late lab is not.</div>
  </div>

  <h3>Final exam</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Section</th><th>Date</th><th>Time</th></tr>
      <tr><td>Section 1</td><td>Tuesday, December 8, 2026</td><td>8:00&ndash;11:00 AM</td></tr>
      <tr><td>Section 2</td><td>Saturday, December 5, 2026</td><td>4:00&ndash;7:00 PM</td></tr>
    </table>
    <p class="muted">Three hours, on paper, closed-book and closed-note — same format as the quizzes, just
    longer. Quiz dates live on Canvas.</p>
  </div>

  <h3>Where things live</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Platform</th><th>Used for</th></tr>
      <tr><td><b>Gradescope</b></td><td>Readings, homework, labs, active-learning photo submissions</td></tr>
      <tr><td><b>Canvas</b></td><td>Slides (posted before class), release/due dates, quiz dates</td></tr>
    </table>
    <p class="muted">Slides go up <b>before</b> class; a second version <b>with solutions to the active-learning
    problems</b> is posted afterwards. Worth grabbing both — the solution slides are the answer key to the
    in-class problems.</p>
  </div>

  <h3>This week's action items</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Item</th><th>Due</th></tr>
      <tr><td><b>RD00</b> &mdash; Unix File System</td><td>10:00 AM Wednesday</td></tr>
      <tr><td><b>HW00</b> &mdash; Unix Basics</td><td>11:59 PM next Monday</td></tr>
    </table>
  </div>
</section>

<!-- ============ POLICIES ============ -->
<section class="topic" id="l0-policies">
  <h2>Lesson 0 &middot; Collaboration, Honor Code, and AI</h2>

  <div class="concept">The line the course draws: <b>talking is encouraged, code is not shared</b>.
  "You are encouraged to discuss the homework and lab assignments with each other, but you may not view or
  copy another student's code."</div>

  <div class="card">
    <h3 style="margin-top:0">Honor code</h3>
    <ul class="muted" style="line-height:1.9">
      <li>Discuss problems and teach each other — the slides call this "one of the most effective ways to learn."</li>
      <li><b>No</b> viewing or copying another student's code. No sharing solutions.</li>
      <li><b>No posting assignments on GitHub or other public websites.</b></li>
    </ul>
    <div class="warn"><b>Note for your own repos.</b> That last rule covers public GitHub repositories — so
    keep COMP 211 lab code out of any public repo, including a personal portfolio or a study-guide repo like
    this one. Course <i>notes</i> are fine; <i>assignment code</i> is not.</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">AI usage</h3>
    <div class="two">
      <div>
        <h4 style="color:#ff8b7a">What you can't do</h4>
        <p class="muted">Copy and paste <b>any part of an assignment</b> into an AI tool — that includes code,
        prompts, and the full problem text.</p>
      </div>
      <div>
        <h4 style="color:var(--accent)">What you can do</h4>
        <p class="muted">Use AI <b>like you would use a TA</b>: ask questions, get clarification, strengthen
        your understanding.</p>
      </div>
    </div>
    <div class="concept">The course's own framing: <b>"AI is most useful when it helps you think through a
    problem, not when it replaces your work."</b> The stated reason is not suspicion — it is that "the skills
    you build are the same skills you'll rely on in your job."</div>
    <h4>How to ask a good question</h4>
    <p class="muted">The slides give three model questions. Notice the shape: each one states <b>what you
    already understand</b> and <b>exactly where you are stuck</b>.</p>
    <ul class="muted" style="line-height:1.8">
      <li>"Can you explain the purpose of dynamic memory allocation? I understand that malloc, realloc, and
      calloc allocate memory on the heap, but I'm not sure why that's useful."</li>
      <li>"What's the difference between strncpy and strlcpy? I think one always includes a null terminator,
      but I cannot remember which one. Is one of them considered safer?"</li>
      <li>"Can you help me understand this error message? I know the issue is on line 21. What are some
      common causes of this type of error, and what should I check?"</li>
    </ul>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Scenario</span>You are stuck on a lab. Which of these is allowed under the course AI policy?</div>
      <button class="opt" data-i="0">Paste the lab's problem statement into a chatbot and ask how to approach it</button>
      <button class="opt" data-i="1">Paste your buggy lab function in and ask it to fix the bug</button>
      <button class="opt" data-i="2">Ask "what are common causes of a segmentation fault when indexing an array?" in your own words</button>
      <button class="opt" data-i="3">Ask a classmate to send you their working version to compare against</button>
      <div class="fb"><b>Only the third.</b> It contains no assignment text and no code — it is a conceptual
      question you could equally ask a TA. Options 0 and 1 both paste assignment material (problem text
      counts, not just code), and option 4 is viewing another student's code.</div>
    </div>
  </div>
</section>

<!-- ============ BINARY ============ -->
<section class="topic" id="l0-binary">
  <h2>Lesson 0 &middot; Binary and Number Bases</h2>

  <div class="concept">A <b>base</b> is the number of different digits a system can use to represent numbers.
  Decimal is <b>base-10</b> (digits 0&ndash;9). Binary is <b>base-2</b> (digits 0 and 1). Computers use binary
  because the building block of a computer is a <b>transistor</b> — a switch that is either off (0) or on (1).</div>

  <h3>Bits</h3>
  <div class="card">
    <p>Each digit of a binary number is a <b>bit</b>. One bit represents two values; the number of values
    doubles with every bit you add.</p>
    <table class="cmp">
      <tr><th>Bits</th><th>Distinct values</th><th>Range</th></tr>
      <tr><td>1</td><td>2<sup>1</sup> = 2</td><td>0&ndash;1</td></tr>
      <tr><td>2</td><td>2<sup>2</sup> = 4</td><td>0&ndash;3</td></tr>
      <tr><td>3</td><td>2<sup>3</sup> = 8</td><td>0&ndash;7</td></tr>
      <tr><td>4</td><td>2<sup>4</sup> = 16</td><td>0&ndash;15</td></tr>
      <tr><td>8 (one byte)</td><td>2<sup>8</sup> = 256</td><td>0&ndash;255</td></tr>
    </table>
    <p class="muted">Memorize the pattern, not the table: <b>n bits give 2<sup>n</sup> values, spanning
    0 through 2<sup>n</sup>&minus;1.</b> That "minus one" is the source of an enormous number of bugs.</p>
  </div>

  <h3>The <code>0b</code> prefix</h3>
  <div class="card">
    <p>When you write a binary number, you must mark it as binary by <b>prepending <code>0b</code></b>.</p>
    <div class="danger"><b>Why this matters.</b> Write <code>10</code> and everyone reads <b>ten</b>. Write
    <code>0b10</code> and it is unambiguously <b>two</b>. The slides call this out explicitly: without the
    <code>0b</code>, "we would assume that it is the decimal number ten!"</div>
    <table class="cmp">
      <tr><th>Decimal</th><th>Binary (2 bits)</th><th>Binary (3 bits)</th><th>Binary (4 bits)</th></tr>
      <tr><td>0</td><td><code>0b00</code></td><td><code>0b000</code></td><td><code>0b0000</code></td></tr>
      <tr><td>1</td><td><code>0b01</code></td><td><code>0b001</code></td><td><code>0b0001</code></td></tr>
      <tr><td>2</td><td><code>0b10</code></td><td><code>0b010</code></td><td><code>0b0010</code></td></tr>
      <tr><td>3</td><td><code>0b11</code></td><td><code>0b011</code></td><td><code>0b0011</code></td></tr>
      <tr><td>4</td><td>&mdash;</td><td><code>0b100</code></td><td><code>0b0100</code></td></tr>
      <tr><td>7</td><td>&mdash;</td><td><code>0b111</code></td><td><code>0b0111</code></td></tr>
      <tr><td>15</td><td>&mdash;</td><td>&mdash;</td><td><code>0b1111</code></td></tr>
    </table>
    <p class="muted">Notice what happens when you widen the field: the values 0&ndash;3 just gain leading
    zeros. <b>Leading zeros never change the value</b> — they only change how many bits you are using.</p>
  </div>

  <h3>Converting</h3>
  <div class="card">
    <h4>Binary &rarr; decimal: add up the place values</h4>
    <p>Each position is a power of two, counting from the <b>right</b>, starting at 2<sup>0</sup>.</p>
<pre>0b 1 0 1 1
   |  |  |  |
   8  4  2  1     &lt;- place values
   8 + 0 + 2 + 1  =  11</pre>
    <h4>Decimal &rarr; binary: greedy subtraction</h4>
    <p>Take the largest power of two that fits, write a 1, subtract, repeat.</p>
<pre>13:  8 fits  -> 1, remainder 5
      4 fits  -> 1, remainder 1
      2 no    -> 0
      1 fits  -> 1, remainder 0
                 = 0b1101</pre>
    <p class="muted">Use the lab on the next tab to check yourself — click bits on and off and watch the
    decimal value follow.</p>
  </div>
</section>

<!-- ============ BINARY LAB ============ -->
<section class="topic" id="l0-lab">
  <h2>Binary Lab</h2>
  <div class="concept">Click a bit to flip it. Watch how the place values add up, and how far a fixed number
  of bits can actually reach.</div>

  <div class="card">
    <div class="toolbar">
      <label class="muted">Width:</label>
      <select id="b0-width" onchange="b0Width()">
        <option value="4">4 bits</option>
        <option value="8" selected>8 bits (1 byte)</option>
      </select>
      <button class="btn small ghost" onclick="b0Set(0)">clear</button>
      <button class="btn small ghost" onclick="b0Set(-1)">all ones</button>
      <button class="btn small ghost" onclick="b0Set(13)">13</button>
      <button class="btn small ghost" onclick="b0Set(65)">65</button>
      <button class="btn small ghost" onclick="b0Random()">random</button>
    </div>
    <div class="bits" id="b0-bits"></div>
    <div class="readout">
      <div class="ro"><div class="lbl">binary</div><div class="val" id="b0-bin">&mdash;</div></div>
      <div class="ro"><div class="lbl">decimal</div><div class="val" id="b0-dec">0</div></div>
      <div class="ro"><div class="lbl">max for this width</div><div class="val" id="b0-max">255</div></div>
    </div>
    <div class="step-desc" id="b0-note"></div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Drill: fill in the 4-bit table (the in-class problem)</h3>
    <p class="muted">The active-learning question from lecture gave you 0&ndash;7 and asked for the rest.
    Type the four binary digits for each — no <code>0b</code> prefix needed.</p>
    <div class="q">
      <p style="line-height:2.4">
        8 = <input type="text" class="fillblank sm" data-answer="1000~~~0b1000" placeholder="????" style="width:90px">
        &nbsp; 9 = <input type="text" class="fillblank sm" data-answer="1001~~~0b1001" placeholder="????" style="width:90px">
        &nbsp; 10 = <input type="text" class="fillblank sm" data-answer="1010~~~0b1010" placeholder="????" style="width:90px">
        &nbsp; 11 = <input type="text" class="fillblank sm" data-answer="1011~~~0b1011" placeholder="????" style="width:90px"><br>
        12 = <input type="text" class="fillblank sm" data-answer="1100~~~0b1100" placeholder="????" style="width:90px">
        &nbsp; 13 = <input type="text" class="fillblank sm" data-answer="1101~~~0b1101" placeholder="????" style="width:90px">
        &nbsp; 14 = <input type="text" class="fillblank sm" data-answer="1110~~~0b1110" placeholder="????" style="width:90px">
        &nbsp; 15 = <input type="text" class="fillblank sm" data-answer="1111~~~0b1111" placeholder="????" style="width:90px">
      </p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111</b>. Every one of these
      starts with a 1 because they are all &ge; 8, and 8 is the leftmost place value in a 4-bit number. The
      remaining three bits just recount 0&ndash;7.</div>
    </div>
  </div>
</section>

<!-- ============ SELF CHECK ============ -->
<section class="topic" id="l0-check">
  <h2>Lesson 0 &middot; Self-Check</h2>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Why do computers represent data in binary?</div>
      <button class="opt" data-i="0">Binary numbers are shorter than decimal numbers</button>
      <button class="opt" data-i="1">A transistor is a switch with two states, off (0) and on (1)</button>
      <button class="opt" data-i="2">Binary is easier for humans to read</button>
      <button class="opt" data-i="3">Base-2 arithmetic is more precise than base-10</button>
      <div class="fb">The hardware decides. A <b>transistor</b> behaves as a switch that is either on or off,
      so a two-symbol system maps directly onto the physical building block. Binary numbers are in fact
      <i>longer</i> than their decimal equivalents and harder for people to read — the convenience is entirely
      on the machine's side.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>How many distinct values can 4 bits represent?</div>
      <button class="opt" data-i="0">4</button>
      <button class="opt" data-i="1">8</button>
      <button class="opt" data-i="2">16</button>
      <button class="opt" data-i="3">32</button>
      <div class="fb"><b>16</b> = 2<sup>4</sup>. The values run 0 through 15 — sixteen values, but the largest
      is fifteen.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is <code>0b1011</code> in decimal?</div>
      <button class="opt" data-i="0">9</button>
      <button class="opt" data-i="1">11</button>
      <button class="opt" data-i="2">13</button>
      <button class="opt" data-i="3">1011</button>
      <div class="fb"><b>11.</b> Place values from the right: 8 + 0 + 2 + 1 = 11. Option 3 is the trap the
      <code>0b</code> prefix exists to prevent.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>0b10</code> and <code>10</code> mean the same thing.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><code>0b10</code> is binary for <b>two</b>; a bare <code>10</code> is read as decimal
      <b>ten</b>. This is exactly why the prefix is required.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You miss a homework deadline by ten minutes. What happens?</div>
      <button class="opt" data-i="0">It is accepted with a 20% deduction</button>
      <button class="opt" data-i="1">It is not accepted — there are no late submissions and no drops on homework</button>
      <button class="opt" data-i="2">It is dropped automatically; you have 5 drops</button>
      <button class="opt" data-i="3">You can request a regrade</button>
      <div class="fb">Homework has <b>no late submissions, no dropped assignments, and no regrade requests</b>.
      The 20% deduction belongs to <i>labs</i>, and the 5 drops belong to <i>readings</i>. Three different
      policies — don't blend them.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each assessment to its policy</h3>
    <table class="match" id="match-policy">
      <tr><td class="match-term">Readings (RD)</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="drop">5 drops; due 10 AM on class day</option><option value="hw">No late work, no drops, no regrades</option><option value="lab">Up to 2 days late; first 2 free, then &minus;20%</option><option value="quiz">50 minutes, on paper, closed-book</option><option value="chk">Short oral assessment</option></select></td></tr>
      <tr><td class="match-term">Homework (HW)</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="drop">5 drops; due 10 AM on class day</option><option value="hw">No late work, no drops, no regrades</option><option value="lab">Up to 2 days late; first 2 free, then &minus;20%</option><option value="quiz">50 minutes, on paper, closed-book</option><option value="chk">Short oral assessment</option></select></td></tr>
      <tr><td class="match-term">Labs</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="drop">5 drops; due 10 AM on class day</option><option value="hw">No late work, no drops, no regrades</option><option value="lab">Up to 2 days late; first 2 free, then &minus;20%</option><option value="quiz">50 minutes, on paper, closed-book</option><option value="chk">Short oral assessment</option></select></td></tr>
      <tr><td class="match-term">Quizzes</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="drop">5 drops; due 10 AM on class day</option><option value="hw">No late work, no drops, no regrades</option><option value="lab">Up to 2 days late; first 2 free, then &minus;20%</option><option value="quiz">50 minutes, on paper, closed-book</option><option value="chk">Short oral assessment</option></select></td></tr>
      <tr><td class="match-term">Checkoffs</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="drop">5 drops; due 10 AM on class day</option><option value="hw">No late work, no drops, no regrades</option><option value="lab">Up to 2 days late; first 2 free, then &minus;20%</option><option value="quiz">50 minutes, on paper, closed-book</option><option value="chk">Short oral assessment</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-policy','fb-match-policy',['drop','hw','lab','quiz','chk'])">Check</button>
    <div class="fb" id="fb-match-policy"></div>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET — bit strip
   ============================================================ */
var b0Bits = [];

function b0Width() {
  var w = parseInt(document.getElementById('b0-width').value, 10);
  b0Bits = new Array(w).fill(0);
  b0Render();
}
function b0Set(v) {
  var w = b0Bits.length;
  if (v === -1) { b0Bits = new Array(w).fill(1); b0Render(); return; }
  var max = Math.pow(2, w) - 1;
  v = Math.max(0, Math.min(max, v));
  for (var i = 0; i < w; i++) b0Bits[w - 1 - i] = (v >> i) & 1;
  b0Render();
}
function b0Random() { b0Set(Math.floor(Math.random() * Math.pow(2, b0Bits.length))); }
function b0Flip(i) { b0Bits[i] = b0Bits[i] ? 0 : 1; b0Render(); }

function b0Render() {
  var w = b0Bits.length, html = '', val = 0;
  for (var i = 0; i < w; i++) {
    var place = Math.pow(2, w - 1 - i);
    if (b0Bits[i]) val += place;
    html += '<div class="bit' + (b0Bits[i] ? ' on' : '') + '" onclick="b0Flip(' + i + ')">' +
      b0Bits[i] + '<span class="pv">' + place + '</span></div>';
  }
  document.getElementById('b0-bits').innerHTML = html;
  document.getElementById('b0-bin').textContent = '0b' + b0Bits.join('');
  document.getElementById('b0-dec').textContent = val;
  var max = Math.pow(2, w) - 1;
  document.getElementById('b0-max').textContent = max;

  var terms = [];
  for (var j = 0; j < w; j++) if (b0Bits[j]) terms.push(Math.pow(2, w - 1 - j));
  var note = document.getElementById('b0-note');
  if (!terms.length) {
    note.innerHTML = 'All bits off &rarr; <b>0</b>. Click any bit to turn it on; the small grey number is that position’s place value.';
  } else {
    note.innerHTML = '<b>' + terms.join(' + ') + ' = ' + val + '</b>. With <b>' + w + ' bits</b> you get 2<sup>' +
      w + '</sup> = <b>' + (max + 1) + '</b> distinct values, running 0 through <b>' + max + '</b>' +
      (val === max ? ' &mdash; and you are sitting on the maximum right now.' : '.');
  }
}

function initL0() { b0Bits = new Array(8).fill(0); b0Render(); }
