/* ============================================================
   LESSON 34 — ★ Quiz 2 Study Guide (hub): logistics, coverage, where each objective lives in this guide
   and in Mastery, suggested order, and the gaps. Injects into #l34. Loaded BEFORE the shared engine.
   ============================================================ */
document.getElementById('l34').innerHTML = `
<main>
<h2>Quiz 2 Study Guide</h2>
<p class="muted">A jumping-off point for the Quiz 2 date: logistics, what is covered, where each topic is practiced, and what is still missing.</p>

<div class="card">
  <h3>Logistics</h3>
  <ul>
    <li><b>Date:</b> Monday 10/19 at 11:00 am (makeup session; the original date was 10/14). Covers material through 10/12.</li>
    <li>Paper quiz, 50 minutes. <b>No cheat sheets, no calculators.</b></li>
    <li>A seating chart is sent right before; no leaving and re-entering once it starts.</li>
    <li><b>Review session:</b> Monday 10/12, 5:00&ndash;6:30 pm, FB141. <b>Tutoring (CSXL):</b> Oct 5, 8, 13, 5&ndash;6 pm.</li>
    <li><b>Office hours:</b> Mon&ndash;Thu 11:30&ndash;5:00, Fri 11:30&ndash;3:30.</li>
  </ul>
</div>

<div class="card">
  <h3>What is covered</h3>
  <p>CL13&ndash;CL21, RD11&ndash;RD19, HW5&ndash;HW7, Lab 1 and the Denorm Exponent Guide. The practice problems cover seven areas:</p>
  <table class="cmp">
    <tr><th>Topic</th><th>Guide tab</th></tr>
    <tr><td>Floating point (custom formats, denormals)</td><td><a href="#" onclick="showLesson('l20',document.querySelector('[data-l=l20]'));return false;">CL13</a> &middot; <a href="#" onclick="showLesson('l21',document.querySelector('[data-l=l21]'));return false;">CL14</a> &middot; <a href="#" onclick="showLesson('l24',document.querySelector('[data-l=l24]'));return false;">CL15</a> &middot; <a href="#" onclick="showLesson('l23',document.querySelector('[data-l=l23]'));return false;">HW05</a></td></tr>
    <tr><td>Pointers, pointer arithmetic, byte addresses</td><td><a href="#" onclick="showLesson('l25',document.querySelector('[data-l=l25]'));return false;">CL16</a> &middot; <a href="#" onclick="showLesson('l26',document.querySelector('[data-l=l26]'));return false;">CL17</a> &middot; <a href="#" onclick="showLesson('l27',document.querySelector('[data-l=l27]'));return false;">HW06</a> &middot; <a href="#" onclick="showLesson('l32',document.querySelector('[data-l=l32]'));return false;">HW07</a></td></tr>
    <tr><td>Memory diagrams, program memory, lifetime and bugs, malloc/free</td><td><a href="#" onclick="showLesson('l28',document.querySelector('[data-l=l28]'));return false;">CL18</a> &middot; <a href="#" onclick="showLesson('l30',document.querySelector('[data-l=l30]'));return false;">CL20</a> &middot; <a href="#" onclick="showLesson('l31',document.querySelector('[data-l=l31]'));return false;">CL21</a></td></tr>
    <tr><td>2D arrays</td><td><a href="#" onclick="showLesson('l29',document.querySelector('[data-l=l29]'));return false;">CL19</a></td></tr>
    <tr><td>make and Bash</td><td><a href="#" onclick="showLesson('l33',document.querySelector('[data-l=l33]'));return false;">Lab 1 tab</a></td></tr>
  </table>
</div>

<div class="card">
  <h3>Practice in Mastery</h3>
  <ul>
    <li>Unit <b>Quiz 2 &middot; Practice set (mixed)</b>: custom floating-point formats, program memory, byte addresses, memory diagrams, pointer arithmetic, lifetime, code analysis, 2D arrays.</li>
    <li>Unit <b>Lab 1 &middot; make &amp; Bash scripts</b>: Makefile rebuild reasoning and shell scripts, with answers checked by running make and bash.</li>
    <li>Per-lecture units for CL13&ndash;CL21 and the HW5&ndash;HW7 checkpoints.</li>
  </ul>
</div>

<div class="card">
  <h3>Suggested order</h3>
  <ol>
    <li>Floating point: redo the minifloat decode/encode, then the 10-bit and 9-bit custom formats and the Denorm Exponent Guide designs.</li>
    <li>Pointers and byte addresses, then pointer arithmetic expressions.</li>
    <li>Memory diagrams (stack and heap), program memory regions, lifetime and the four memory bugs.</li>
    <li>2D arrays: row-major index and address, the two dynamic allocations.</li>
    <li>Lab 1: make rebuild questions, then the Bash scripts.</li>
    <li>Finish with the mixed practice set under timed conditions, on paper, with no calculator.</li>
  </ol>
</div>

<div class="card danger">
  <h3>Gaps</h3>
  <ul>
    <li><b>RD18, RD19 and the Lab 1 handout</b> have not been added. The Lab 1 tab and unit are built from the Quiz 2 practice problems.</li>
    <li>The released Quiz 2 practice PDFs are kept privately; this guide uses original questions of the same types.</li>
  </ul>
</div>
</main>
`;
