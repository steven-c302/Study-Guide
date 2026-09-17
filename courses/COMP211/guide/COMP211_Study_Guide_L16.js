/* ============================================================
   LESSON 16 — Quiz 1 Study Guide (hub / coverage checklist).
   Injects into #l16. Loaded BEFORE the shared engine.
   Plain content lesson — aggregates existing lessons, flags gaps
   against the official Quiz 1 coverage sheet (CL00-CL12, RD00-RD10,
   HW0-3, Lab 0-1, plus the Stack Frames additional reading).
   No initL16() — no interactive widget.
   ============================================================ */
document.getElementById('l16').innerHTML = `
<main>
<h2>Quiz 1 Study Guide</h2>
<p class="muted">A jumping-off point for 9/18 &mdash; logistics, what this guide already covers, and exactly
what's still missing before the quiz.</p>

<div class="card danger">
  <h3>Gaps in this guide right now</h3>
  <p>The official coverage sheet lists <b>CL00&ndash;CL12</b>, <b>RD00&ndash;RD10</b>, <b>HW0&ndash;3</b>,
  <b>Lab 0 and 1</b>, plus the Stack Frames additional reading. Checked against that, this guide is missing:</p>
  <ul>
    <li><b>Lab 0 and Lab 1</b> &mdash; the guide has a general shell simulator and the Checkoff 1 CLI drill,
    but nothing built from the actual Lab 0 / Lab 1 handouts or starter code.</li>
  </ul>
  <p class="muted"><b>Note:</b> <code>RD04</code> does not exist in this course &mdash; the reading numbering skips
  from RD03 straight to RD05, so it's not a gap and won't appear in the readings table below.</p>
  <p><b>To close the remaining gap, send over:</b> the Lab 0 / Lab 1 assignment handouts. Once those are in hand
  this section (and a new lesson) can be built out and this warning removed.</p>
</div>

<div class="card">
  <h3>Logistics</h3>
  <ul>
    <li><b>Date:</b> Friday 9/18</li>
    <li>Covers all material up to 9/16 (9/16 is a review day).</li>
    <li>Class is 50 minutes &mdash; the quiz will take up most of the period.</li>
    <li>A seating chart is sent out right before the quiz.</li>
    <li>Backpacks along the walls; phones off and in your backpack.</li>
    <li>Paper quiz &mdash; bring a pencil. No cheat sheets.</li>
    <li>No leaving and re-entering the room once the quiz starts &mdash; use the restroom beforehand.</li>
  </ul>
  <h3 style="margin-top:16px">Review session &amp; tutoring</h3>
  <ul>
    <li><b>TA-led review session:</b> Wednesday, Sep 16, 6&ndash;7:30pm, FB141</li>
    <li><b>Tutoring:</b> Monday Sep 14 and Tuesday Sep 15, 5&ndash;6pm, in the CSXL</li>
  </ul>
</div>

<div class="card">
  <h3>Coverage checklist &middot; Lectures (CL00&ndash;CL12)</h3>
  <table class="cmp">
    <tr><th>Lecture</th><th>Topic</th><th>Status</th></tr>
    <tr><td>CL00</td><td>Welcome, course logistics, binary &amp; bases</td><td>&#9989; <a href="#" onclick="showLesson('l0', document.querySelector('[data-l=\\'l0\\']')); return false;">Lesson 0</a></td></tr>
    <tr><td>CL01</td><td>Unix Basics</td><td>&#9989; <a href="#" onclick="showLesson('l1', document.querySelector('[data-l=\\'l1\\']')); return false;">Lesson 1</a></td></tr>
    <tr><td>CL02</td><td>Intro to C</td><td>&#9989; <a href="#" onclick="showLesson('l2', document.querySelector('[data-l=\\'l2\\']')); return false;">Lesson 2</a></td></tr>
    <tr><td>CL03</td><td>I/O Redirection and Strings</td><td>&#9989; <a href="#" onclick="showLesson('l3', document.querySelector('[data-l=\\'l3\\']')); return false;">Lesson 3</a></td></tr>
    <tr><td>CL04</td><td>Function Stack Frames</td><td>&#9989; <a href="#" onclick="showLesson('l4', document.querySelector('[data-l=\\'l4\\']')); return false;">Lesson 4</a></td></tr>
    <tr><td>CL05</td><td>Unix Basics (FA26): $PATH, globbing, regex, find, grep</td><td>&#9989; <a href="#" onclick="showLesson('l5', document.querySelector('[data-l=\\'l5\\']')); return false;">Lesson 5</a></td></tr>
    <tr><td>CL06</td><td>Number Representation</td><td>&#9989; <a href="#" onclick="showLesson('l10', document.querySelector('[data-l=\\'l10\\']')); return false;">Lesson 6</a></td></tr>
    <tr><td>CL07</td><td>Signed Binary Integers &amp; Binary Arithmetic</td><td>&#9989; combined into <a href="#" onclick="showLesson('l10', document.querySelector('[data-l=\\'l10\\']')); return false;">Lesson 6</a></td></tr>
    <tr><td>CL08</td><td>Bitwise Operators</td><td>&#9989; <a href="#" onclick="showLesson('l7', document.querySelector('[data-l=\\'l7\\']')); return false;">Lesson 8</a></td></tr>
    <tr><td>CL09</td><td>Applications of Bitwise Operators</td><td>&#9989; <a href="#" onclick="showLesson('l14', document.querySelector('[data-l=\\'l14\\']')); return false;">Lesson 9</a></td></tr>
    <tr><td>CL10</td><td>Debugging</td><td>&#9989; <a href="#" onclick="showLesson('l15', document.querySelector('[data-l=\\'l15\\']')); return false;">Lesson 10</a></td></tr>
    <tr><td>CL11</td><td>Unix Basics: Shell Prompt Config, Environment Variables, $PATH, .bashrc &amp; Aliases</td><td>&#9989; <a href="#" onclick="showLesson('l17', document.querySelector('[data-l=\'l17\']')); return false;">Lesson 17</a></td></tr>
    <tr><td>CL12</td><td>Quiz 1 Applied Review: character arrays (sizeof/strlen), bitwise image filters, stack diagrams, glob</td><td>&#9989; <a href="#" onclick="showLesson('l18', document.querySelector('[data-l=\'l18\']')); return false;">CL12 lesson</a></td></tr>
  </table>
</div>

<div class="card">
  <h3>Coverage checklist &middot; Readings (RD00&ndash;RD10)</h3>
  <table class="cmp">
    <tr><th>Reading</th><th>Status</th></tr>
    <tr><td>RD00</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l1', document.querySelector('[data-l=\\'l1\\']')); return false;">Lesson 1</a></td></tr>
    <tr><td>RD01</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l2', document.querySelector('[data-l=\\'l2\\']')); return false;">Lesson 2</a></td></tr>
    <tr><td>RD02</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l3', document.querySelector('[data-l=\\'l3\\']')); return false;">Lesson 3</a></td></tr>
    <tr><td>RD03</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l4', document.querySelector('[data-l=\\'l4\\']')); return false;">Lesson 4</a></td></tr>
    <tr><td>RD05</td><td>&#9989; covered in <a href="#" onclick="showLesson('l10', document.querySelector('[data-l=\\'l10\\']')); return false;">Lesson 6</a></td></tr>
    <tr><td>RD06</td><td>&#9989; covered in <a href="#" onclick="showLesson('l10', document.querySelector('[data-l=\\'l10\\']')); return false;">Lesson 6</a></td></tr>
    <tr><td>RD07</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l7', document.querySelector('[data-l=\\'l7\\']')); return false;">Lesson 8</a></td></tr>
    <tr><td>RD08</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l14', document.querySelector('[data-l=\\'l14\\']')); return false;">Lesson 9</a></td></tr>
    <tr><td>RD09</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l15', document.querySelector('[data-l=\\'l15\\']')); return false;">Lesson 10</a></td></tr>
    <tr><td>RD10</td><td>&#9989; self-check in <a href="#" onclick="showLesson('l17', document.querySelector('[data-l=\'l17\']')); return false;">Lesson 17</a></td></tr>
  </table>
</div>

<div class="card">
  <h3>Coverage checklist &middot; Homework, Labs &amp; Additional Reading</h3>
  <table class="cmp">
    <tr><th>Item</th><th>Status</th></tr>
    <tr><td>HW0 &middot; Unix Basics</td><td>&#9989; reviewed in <a href="#" onclick="showLesson('l9', document.querySelector('[data-l=\\'l9\\']')); return false;">HW00</a></td></tr>
    <tr><td>HW1 &middot; Intro to C</td><td>&#9989; reviewed in <a href="#" onclick="showLesson('l8', document.querySelector('[data-l=\\'l8\\']')); return false;">HW01</a></td></tr>
    <tr><td>HW2 &middot; Stack Frames, Globbing &amp; Regex</td><td>&#9989; reviewed in <a href="#" onclick="showLesson('l12', document.querySelector('[data-l=\\'l12\\']')); return false;">HW2</a></td></tr>
    <tr><td>HW3 &middot; Number Rep, Arithmetic &amp; Bitwise</td><td>&#9989; reviewed in <a href="#" onclick="showLesson('l13', document.querySelector('[data-l=\\'l13\\']')); return false;">HW03</a></td></tr>
    <tr><td>Lab 0</td><td>&#10060; <b>missing</b> &mdash; no dedicated lesson from the actual handout (Checkoff 1 Prep drills similar CLI skills, but isn't Lab 0 itself)</td></tr>
    <tr><td>Lab 1</td><td>&#10060; <b>missing</b> &mdash; send the handout/starter code</td></tr>
    <tr><td>Additional reading: Stack Frames</td><td>&#9989; covered in <a href="#" onclick="showLesson('l4', document.querySelector('[data-l=\\'l4\\']')); return false;">Lesson 4</a></td></tr>
  </table>
</div>

<div class="card concept">
  <h3>Suggested study order</h3>
  <p>Work roughly in the order material was taught, since later lectures (bitwise operators, debugging) build
  on earlier ones (binary, C basics, stack frames):</p>
  <ol>
    <li>Lesson 0 &rarr; Lesson 5 (CL00&ndash;CL05, plus their RD self-checks) &mdash; Unix, C basics, I/O, stack frames, $PATH/regex.</li>
    <li>Lesson 6 (CL06/CL07, number representation &amp; binary arithmetic) &mdash; this is the densest math section; redo the RD05/RD06 material until the addition/subtraction overflow rules are automatic.</li>
    <li>Lesson 8, 9, 10 (CL08&ndash;CL10, bitwise operators &rarr; applications &rarr; debugging) &mdash; do the RD07/RD08/RD09 self-checks back to back since they build on each other directly.</li>
    <li>HW00, HW01, HW2, HW03 review lessons &mdash; these are real graded questions, good for a final gut-check.</li>
    <li>Checkoff 1 Prep &mdash; useful CLI drilling even though it isn't itself on the quiz coverage sheet.</li>
    <li>CL11 (Unix Basics: shell config, environment variables, $PATH, .bashrc/aliases &amp; the RD10
    self-check), then CL12 (Quiz 1 Applied Review: character arrays, bitwise image filters, stack diagram, and glob
    problems) as a final cross-topic gut-check.</li>
    <li>Once sent: Lab 0/Lab 1 material.</li>
  </ol>
</div>

</main>
`;
