/* ============================================================
   LESSON 1 — Intro (complexity, storage, number systems, ASCII).
   Injects into #l1. Loaded before the main engine.
   ============================================================ */
document.getElementById('l1').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l1-why')">Why Data Structures</button>
  <button onclick="showTopic(this,'l1-storage')">Storage</button>
  <button onclick="showTopic(this,'l1-numbers')">Number Systems</button>
  <button onclick="showTopic(this,'l1-ascii')">Bits &amp; ASCII</button>
</nav>
<main>

  <!-- ===================== WHY ===================== -->
  <section class="topic active" id="l1-why">
    <h2>Lesson 1 · Why Data Structures Matter</h2>
    <div class="concept">Behind every real-world app that processes huge data in real time (Google search, self-driving cars, ChatGPT) is an <b>algorithm</b> — a set of instructions that solves a problem — and behind every algorithm is an <b>efficient data structure</b> that organizes and stores the data. Data is at the center. (Slides 12–13.)</div>
    <div class="card">
      <h3>Fill in — the core idea (your quiz)</h3>
      <p>For each
        <input type="text" class="fillblank sm" data-answer="real-world application~~~real world application~~~application~~~real-world app" placeholder="?" style="width:150px"> that requires processing huge amounts of data in real time, there exists an
        <input type="text" class="fillblank sm" data-answer="algorithm" placeholder="?" style="width:100px"> that utilizes an efficient
        <input type="text" class="fillblank sm" data-answer="data structure~~~datastructure" placeholder="?" style="width:130px"> to organize and store the data.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>real-world application</b> → <b>algorithm</b> → <b>data structure</b>. (Slides 11–13.)</div>
    </div>
    <div class="card">
      <h3>Fill in — the two complexities (your quiz)</h3>
      <p>An algorithm's running time is known as its
        <input type="text" class="fillblank sm" data-answer="time complexity~~~time" placeholder="?" style="width:130px">. The amount of space taken by its data is known as its
        <input type="text" class="fillblank sm" data-answer="space complexity~~~space" placeholder="?" style="width:130px">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>time complexity</b> (running time) and <b>space complexity</b> (memory used). Efficiency is judged on both. (Slide 13.) <b>Moore's Law</b> (storage/power doubles ~every 2 years) means ever more data → efficient structures matter more.</div>
    </div>
  </section>

  <!-- ===================== STORAGE ===================== -->
  <section class="topic" id="l1-storage">
    <h2>Lesson 1 · Primary vs Secondary Storage</h2>
    <div class="concept"><b>Primary storage</b> (RAM, cache) temporarily holds data for running apps and the OS — fast, small, <b>volatile</b> (clears on power off). <b>Secondary storage</b> (SSD, HDD, USB) is long-term — slower, larger, <b>non-volatile</b>. (Slides 23–24.)</div>
    <div class="card">
      <h3>Categorize each property (your quiz)</h3>
      <table class="match" id="match-store">
        <tr><td class="match-term">Frequently accessed</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Volatile</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Very fast to access</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Smaller capacity</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Temporarily holds data for running apps &amp; the OS</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Non-volatile</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Long-term storage of OS, apps, and files</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Slower to access</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
        <tr><td class="match-term">Larger capacity</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primary Storage</option><option value="s">Secondary Storage</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-store','fb-match-store',['p','p','p','p','p','s','s','s','s'])">Check</button>
      <div class="fb" id="fb-match-store"></div>
    </div>
  </section>

  <!-- ===================== NUMBER SYSTEMS ===================== -->
  <section class="topic" id="l1-numbers">
    <h2>Lesson 1 · Number Systems</h2>
    <div class="concept"><b>Decimal (0d)</b> base 10, <b>Binary (0b)</b> base 2, <b>Octal (0o)</b> base 8, <b>Hex (0x)</b> base 16 (digits 0–9, A–F). Convert to decimal by summing digit × base^position. Trick: <b>4 binary digits = 1 hex digit</b>, <b>3 binary digits = 1 octal digit</b> — group from the right. (Slides 26–31.)</div>
    <div class="card">
      <h3>Fill in — binary to hex (your quiz)</h3>
      <p><code>0b1010011</code> is equivalent to <code>0x</code>
        <input type="text" class="fillblank sm" data-answer="53" placeholder="?" style="width:70px">.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <b>53</b>. Group from the right in 4s: <code>101 0011</code> → <code>0101 0011</code> = 5 and 3 → <b>0x53</b>. (Check: 0b1010011 = 64+16+2+1 = 83 = 5×16 + 3 = 0x53.)</div>
    </div>
    <div class="card">
      <h3>Practice</h3>
      <div class="q">
        <p><code>0x15</code> to decimal =
          <input type="text" class="fillblank sm" data-answer="21~~~0d21" placeholder="?" style="width:70px"></p>
        <button class="btn small" onclick="checkFill(this)">Check</button>
        <div class="fb">1×16 + 5 = <b>21</b>.</div>
      </div>
      <div class="q" style="margin-top:12px">
        <p><code>0b1010100</code> to hex = <code>0x</code>
          <input type="text" class="fillblank sm" data-answer="54" placeholder="?" style="width:70px"></p>
        <button class="btn small" onclick="checkFill(this)">Check</button>
        <div class="fb">Group in 4s from right: <code>101 0100</code> → <code>0101 0100</code> = 5, 4 → <b>0x54</b>.</div>
      </div>
    </div>
  </section>

  <!-- ===================== ASCII ===================== -->
  <section class="topic" id="l1-ascii">
    <h2>Lesson 1 · Bits, Bytes &amp; ASCII</h2>
    <div class="concept">Data is stored in <b>binary</b> — each bit is a transistor that's off (0) or on (1). <b>8 bits = 1 byte</b> (the smallest addressable unit). <b>ASCII</b> maps characters to numbers: <code>A</code>=65, <code>a</code>=97 (so lowercase = uppercase + 32; letters run in order). (Slides 33–38.)</div>
    <div class="card">
      <h3>Fill in — ASCII of "ABab" (your quiz)</h3>
      <p>"ABab" in decimal ASCII is
        <input type="text" class="fillblank sm" data-answer="65" placeholder="A" style="width:55px">
        <input type="text" class="fillblank sm" data-answer="66" placeholder="B" style="width:55px">
        <input type="text" class="fillblank sm" data-answer="97" placeholder="a" style="width:55px">
        <input type="text" class="fillblank sm" data-answer="98" placeholder="b" style="width:55px"></p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>65, 66, 97, 98</b>. A=65, B=66 (uppercase start at 65); a=97, b=98 (lowercase start at 97 = 65+32). Consecutive letters are consecutive numbers.</div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>How many bits are in a byte?</div>
        <button class="opt" data-i="0">4</button>
        <button class="opt" data-i="1">8</button>
        <button class="opt" data-i="2">16</button>
        <div class="fb"><b>8 bits = 1 byte</b> (slide 34). A byte can represent 2⁸ = 256 values — enough for the ASCII character set.</div>
      </div>
    </div>
  </section>
</main>`;

document.querySelectorAll('#l1 .ma-item').forEach(el=>{el.style.cssText='display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:6px 0;font-size:14px';});
