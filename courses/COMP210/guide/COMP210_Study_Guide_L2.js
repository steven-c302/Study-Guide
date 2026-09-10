/* ============================================================
   LESSON 2 — Java (execution model, data types, Strings, arrays, loops).
   Injects into #l2. Loaded before the main engine.
   ============================================================ */
document.getElementById('l2').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l2-exec')">Execution Model</button>
  <button onclick="showTopic(this,'l2-types')">Data Types</button>
  <button onclick="showTopic(this,'l2-strings')">Strings &amp; Arrays</button>
  <button onclick="showTopic(this,'l2-flow')">Control Flow</button>
</nav>
<main>

  <!-- ===================== EXECUTION ===================== -->
  <section class="topic active" id="l2-exec">
    <h2>Lesson 2 · Java Execution Model</h2>
    <div class="concept">Java is <b>compiled to an intermediate representation</b> (bytecode), then run by a virtual machine. Two steps: <b>Compile time</b> — <code>javac</code> turns <code>.java</code> → <code>.class</code> (bytecode). <b>Runtime</b> — the <b>JVM</b> runs <code>java</code> (interprets bytecode line-by-line) and the <b>JIT compiler</b> (translates hot spots to native machine code). (Slides 5–7.)</div>
    <div class="card">
      <h3>Which programs does the JVM run? (your quiz — select all)</h3>
      <div id="ma-jvm">
        <label class="ma-item"><input type="checkbox"> Debugger</label>
        <label class="ma-item"><input type="checkbox"> JIT Compiler</label>
        <label class="ma-item"><input type="checkbox"> javac</label>
        <label class="ma-item"><input type="checkbox"> java</label>
      </div>
      <button class="btn small" style="margin-top:8px" onclick="maJVM()">Check</button>
      <div class="fb" id="fb-ma-jvm"></div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What does <code>javac</code> do?</div>
        <button class="opt" data-i="0">Runs bytecode at runtime.</button>
        <button class="opt" data-i="1">Compiles <code>.java</code> source into <code>.class</code> bytecode (compile time).</button>
        <button class="opt" data-i="2">Translates hot spots to native code.</button>
        <div class="fb"><code>javac</code> is the <b>compiler</b> — it runs once at compile time to produce bytecode. At <b>runtime</b>, the JVM runs <code>java</code> (interpreter) + JIT. (Slide 7.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== DATA TYPES ===================== -->
  <section class="topic" id="l2-types">
    <h2>Lesson 2 · Primitives vs Reference Types</h2>
    <div class="concept"><b>Primitives</b> are raw values, lowercase, stored in stack memory: <code>boolean, char, byte, short, int, long, float, double</code>. <b>Reference types</b> are objects (created with <code>new</code>, capitalized), whose value is an address in heap memory: <code>String, Array, Class, Interface</code>. (Slides 11–13.)</div>
    <div class="card">
      <h3>Sort the data types (your quiz)</h3>
      <table class="match" id="match-types">
        <tr><td class="match-term">long</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">char</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">Class</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">short</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">Array</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">float</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">Interface</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">boolean</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">int</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">String</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">double</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
        <tr><td class="match-term">byte</td><td><select class="match-def"><option value="">— choose —</option><option value="p">Primitive</option><option value="r">Reference Type</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-types','fb-match-types',['p','p','r','p','r','p','r','p','p','r','p','p'])">Check</button>
      <div class="fb" id="fb-match-types"></div>
    </div>
    <div class="card">
      <div class="concept"><b>Static typing:</b> Java variables must be declared with a type that can't change (<code>int x = 5;</code>). Primitives are lowercase; reference types are capitalized (they're class names). The 8 primitives: boolean(1 bit), char(2B), byte(1B), short(2B), int(4B), long(8B), float(4B), double(8B). Declaration hints: <code>L</code> for long, <code>f</code> for float, double quotes for String, braces for arrays, single quotes for char.</div>
    </div>
  </section>

  <!-- ===================== STRINGS & ARRAYS ===================== -->
  <section class="topic" id="l2-strings">
    <h2>Lesson 2 · Strings &amp; Arrays</h2>
    <div class="card">
      <h3>Fill in — substring (your quiz)</h3>
      <p>Given <code>String str = "apple";</code>, extract "app" into <code>str2</code>:</p>
      <p><code>String str2 =</code>
        <input type="text" class="fillblank sm" data-answer="str.substring(0, 3);~~~str.substring(0,3);~~~str.substring(0, 3)~~~str.substring(0,3)" placeholder="?" style="width:220px"></p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <code>str.substring(0, 3);</code> — <b>substring(start, end)</b> takes characters from index <b>start up to but not including end</b>. Indices 0,1,2 = "app". (Note the space after the comma per style rules.)</div>
    </div>
    <div class="card">
      <h3>Fill in — array declaration (your quiz)</h3>
      <p>Declare an array <code>flavors</code> holding "vanilla", "chocolate", "strawberry":</p>
      <p><input type="text" class="fillblank" data-answer='string[] flavors = {"vanilla", "chocolate", "strawberry"};|string[] flavors = {"vanilla","chocolate","strawberry"};' placeholder="?" style="width:100%"></p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <code>String[] flavors = {"vanilla", "chocolate", "strawberry"};</code> — <code>Type[]</code> for the array type, <b>braces</b> for the literal, double quotes for each String, commas between (with a space).</div>
    </div>
  </section>

  <!-- ===================== CONTROL FLOW ===================== -->
  <section class="topic" id="l2-flow">
    <h2>Lesson 2 · Control Flow</h2>
    <div class="card">
      <h3>Fill in — a for loop (your quiz)</h3>
      <p>Write a for loop that runs 10 times with counter <code>i</code>:</p>
      <p><input type="text" class="fillblank" data-answer="for (int i = 0; i < 10; i++)~~~for (int i = 0; i < 10; i++) {~~~for(int i = 0; i < 10; i++)~~~for (int i=0; i<10; i++)" placeholder="?" style="width:100%"> <code>{ ... }</code></p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <code>for (int i = 0; i &lt; 10; i++)</code> — start at 0, run while <code>i &lt; 10</code> (10 iterations: 0–9), increment each pass. Spaces around operators per style rules.</div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>How many times does <code>for (int i = 0; i &lt; 10; i++)</code> run?</div>
        <button class="opt" data-i="0">9</button>
        <button class="opt" data-i="1">10 — i takes values 0 through 9</button>
        <button class="opt" data-i="2">11</button>
        <div class="fb"><b>10</b>. i starts at 0 and the loop continues while i &lt; 10, so i = 0,1,…,9 — ten iterations. Starting at 0 with <code>&lt; n</code> is the standard idiom for n iterations.</div>
      </div>
    </div>
  </section>
</main>`;

document.querySelectorAll('#l2 .ma-item').forEach(el=>{el.style.cssText='display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:6px 0;cursor:pointer;font-size:14px';});
function maJVM(){
  const correct=[1,3];   // JIT Compiler, java
  const items=document.querySelectorAll('#ma-jvm .ma-item');
  let all=true;
  items.forEach((item,i)=>{ const ch=item.querySelector('input').checked, should=correct.indexOf(i)!==-1, ok=ch===should;
    item.style.borderColor=ok?'var(--green)':'var(--red)'; item.style.background=ok?'rgba(21,153,87,.14)':'rgba(192,57,43,.12)'; if(!ok)all=false; });
  const fb=document.getElementById('fb-ma-jvm');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all ? '✓ Correct! At runtime the JVM runs <b>java</b> (the interpreter) and the <b>JIT Compiler</b> together.'
    : '✗ Not quite. The JVM runs <b>java</b> (interpreter) + <b>JIT Compiler</b> at runtime. <code>javac</code> runs at compile time (not in the JVM); the Debugger is separate.';
}
