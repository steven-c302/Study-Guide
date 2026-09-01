/* ============================================================
   LESSON 4 — CL04 Function Stack Frames (+ RD03).
   Injects into #l4. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l4').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l4-concept')">1 &middot; Stack Frames</button>
  <button onclick="showTopic(this,'l4-chain')">2 &middot; Call-Chain Walkthrough</button>
  <button onclick="showTopic(this,'l4-types')">3 &middot; Fixed-Size Types</button>
  <button onclick="showTopic(this,'l4-add')">4 &middot; Diagram: add(a,b)</button>
  <button onclick="showTopic(this,'l4-array')">5 &middot; Diagram: Arrays &amp; Pointers</button>
  <button onclick="showTopic(this,'l4-byval')">6 &middot; Value vs Pointer</button>
  <button onclick="showTopic(this,'l4-rd03')">RD03 Self-Check</button>
</nav>
<main>

<!-- ============ STACK FRAMES CONCEPT ============ -->
<section class="topic active" id="l4-concept">
  <h2>Lesson 4 &middot; Function Stack Frames</h2>

  <div class="concept">Every time a function is called, the program allocates a chunk of memory for it on
  the <b>call stack</b> called a <b>stack frame</b>. That frame holds everything the function needs to run and
  to hand control back when it's done.</div>

  <h3>What's inside a stack frame</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Field</th><th>Purpose</th></tr>
      <tr><td><b>Return Address (RA)</b></td><td>The address in the <b>caller</b> to resume execution at once the callee returns.</td></tr>
      <tr><td><b>Arguments</b></td><td>The parameter values passed in by the caller.</td></tr>
      <tr><td><b>Local Variables</b></td><td>Variables declared inside the function's own body.</td></tr>
    </table>
    <p class="muted"><b>Caller</b> — the function making the call. <b>Callee</b> — the function being called.
    Every call has exactly one of each.</p>
  </div>

  <h3>The stack pointer</h3>
  <div class="card">
    <p>The <b>stack pointer (<code>sp</code>)</b> always points at the <b>top</b> of the stack &mdash; the
    edge of the most recently allocated frame.</p>
    <table class="cmp">
      <tr><th>Event</th><th>What happens to <code>sp</code></th></tr>
      <tr><td>A function is <b>called</b></td><td>A new frame is <b>pushed</b>: <code>sp</code> moves to make room for it (grows the stack).</td></tr>
      <tr><td>A function <b>returns</b></td><td>The top frame is <b>popped</b>/deallocated: <code>sp</code> moves back, and that frame's memory is considered dead (conceptually "X-ed out" — its contents are no longer valid, even though the bytes may still physically sit in memory until overwritten).</td></tr>
    </table>
    <div class="concept">The stack grows with every call and shrinks with every return &mdash; a strict
    last-in-first-out order. The <b>most recently called, not-yet-returned</b> function's frame is always the
    one on top.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does a stack frame's Return Address (RA) store?</div>
      <button class="opt" data-i="0">The value the function will return</button>
      <button class="opt" data-i="1">The address in the caller to resume execution at once this function returns</button>
      <button class="opt" data-i="2">The address of the function's first local variable</button>
      <button class="opt" data-i="3">The size of the stack frame</button>
      <div class="fb">The RA is how the CPU knows where to go <b>back to</b> in the caller &mdash; not the function's own return value.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>When a function returns, what happens to its stack frame?</div>
      <button class="opt" data-i="0">It is popped/deallocated, and <code>sp</code> moves back down</button>
      <button class="opt" data-i="1">It stays on the stack forever</button>
      <button class="opt" data-i="2">It moves to the heap</button>
      <button class="opt" data-i="3"><code>sp</code> moves further up to make more room for it</button>
      <div class="fb">Returning <b>pops</b> the frame: <code>sp</code> moves back to where it was before the call, freeing that space for the next call.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>The stack pointer <code>sp</code> always points at the bottom (oldest frame) of the stack.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> <code>sp</code> points at the <b>top</b> &mdash; the most recently pushed frame.</div>
    </div>
  </div>
</section>

<!-- ============ CALL CHAIN ============ -->
<section class="topic" id="l4-chain">
  <h2>Lesson 4 &middot; Call-Chain Walkthrough</h2>

  <div class="concept">Trace a chain of calls: <code>main</code> calls <code>A</code>, <code>A</code> calls
  <code>B</code>, <code>B</code> calls <code>C</code>. Watch the stack grow with each call, and unwind on
  each return.</div>

  <div class="card">
<pre><span class="ty">void</span> <span class="fn">C</span>() { <span class="cm">/* does work, returns */</span> }
<span class="ty">void</span> <span class="fn">B</span>() { <span class="fn">C</span>(); }
<span class="ty">void</span> <span class="fn">A</span>() { <span class="fn">B</span>(); }
<span class="ty">int</span> <span class="fn">main</span>() { <span class="fn">A</span>(); }</pre>
    <table class="cmp">
      <tr><th>Step</th><th>Call/Return</th><th>Stack (top &rarr; bottom)</th></tr>
      <tr><td>1</td><td><code>main</code> starts</td><td><code>main</code></td></tr>
      <tr><td>2</td><td><code>main</code> calls <code>A</code></td><td><code>A</code> &middot; <code>main</code></td></tr>
      <tr><td>3</td><td><code>A</code> calls <code>B</code></td><td><code>B</code> &middot; <code>A</code> &middot; <code>main</code></td></tr>
      <tr><td>4</td><td><code>B</code> calls <code>C</code></td><td><code>C</code> &middot; <code>B</code> &middot; <code>A</code> &middot; <code>main</code></td></tr>
      <tr><td>5</td><td><code>C</code> returns (frame popped)</td><td><code>B</code> &middot; <code>A</code> &middot; <code>main</code></td></tr>
      <tr><td>6</td><td><code>B</code> returns (frame popped)</td><td><code>A</code> &middot; <code>main</code></td></tr>
      <tr><td>7</td><td><code>A</code> returns (frame popped)</td><td><code>main</code></td></tr>
      <tr><td>8</td><td><code>main</code> returns</td><td>(empty)</td></tr>
    </table>
    <p class="muted">Each call pushes a new frame on top; each return pops exactly one frame &mdash; the one on
    top, which is always the most recently called, not-yet-finished function. This is why the RA in each
    frame matters: when <code>C</code> returns, the CPU jumps to the RA stored in <code>C</code>'s frame,
    which points back into <code>B</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>In the chain <code>main &rarr; A &rarr; B &rarr; C</code>, at the moment <code>C</code> is executing, how many stack frames exist?</div>
      <button class="opt" data-i="0">1</button>
      <button class="opt" data-i="1">2</button>
      <button class="opt" data-i="2">4</button>
      <button class="opt" data-i="3">0</button>
      <div class="fb">One frame for each function still "in progress": <code>main</code>, <code>A</code>, <code>B</code>, and <code>C</code> itself &mdash; <b>4</b> total.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>When <code>C</code> returns, whose frame does the CPU resume executing in?</div>
      <button class="opt" data-i="0"><code>B</code>'s &mdash; the function that called <code>C</code></button>
      <button class="opt" data-i="1"><code>main</code>'s</button>
      <button class="opt" data-i="2"><code>A</code>'s</button>
      <button class="opt" data-i="3"><code>C</code>'s own frame, restarted</button>
      <div class="fb">A return always goes back to the <b>immediate caller</b> &mdash; the RA stored in <code>C</code>'s own frame points into <code>B</code>, not further up the chain.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>Stack frames are deallocated in the reverse order they were created (last pushed, first popped).</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True</b> &mdash; the call stack is strictly LIFO (last-in, first-out).</div>
    </div>
  </div>
</section>

<!-- ============ FIXED SIZE TYPES ============ -->
<section class="topic" id="l4-types">
  <h2>Lesson 4 &middot; Fixed-Size Integer Types</h2>

  <div class="concept">Plain <code>int</code>'s size can vary across compilers and architectures.
  <code>&lt;stdint.h&gt;</code> defines types whose <b>byte width is guaranteed</b>, which makes stack-frame
  byte-arithmetic (and this lecture's diagrams) predictable and portable.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Type</th><th>Bit width</th><th>Byte width</th><th>Typical use</th></tr>
      <tr><td><code>int8_t</code></td><td>8 bits</td><td>1 byte</td><td>small counters, byte-sized flags, raw byte data</td></tr>
      <tr><td><code>int16_t</code></td><td>16 bits</td><td>2 bytes</td><td>compact values with a known small range (e.g. audio samples)</td></tr>
      <tr><td><code>int32_t</code></td><td>32 bits</td><td>4 bytes</td><td>general-purpose integers &mdash; matches a typical <code>int</code></td></tr>
      <tr><td><code>int64_t</code></td><td>64 bits</td><td>8 bytes</td><td>large counts, memory addresses/offsets, pointers-worth of data</td></tr>
    </table>
    <div class="warn"><b>Why not just use <code>int</code>?</b> Because <code>int</code>'s size "might vary
    from one architecture to the next" &mdash; exactly the same caveat from Lesson 2's numeric-types table. In
    stack-frame diagrams we need to say precisely "this field is 4 bytes" and have that be true everywhere,
    so the lecture uses <code>int32_t</code> etc. instead of <code>int</code>/<code>short</code>/<code>long</code>.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>How many bytes does <code>int32_t</code> occupy, on every platform?</div>
      <button class="opt" data-i="0">2</button>
      <button class="opt" data-i="1">8</button>
      <button class="opt" data-i="2">4</button>
      <button class="opt" data-i="3">It varies by platform, same as <code>int</code></button>
      <div class="fb">That's the entire point of <code>&lt;stdint.h&gt;</code> types &mdash; <code>int32_t</code> is <b>always</b> 4 bytes, unlike plain <code>int</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Which <code>stdint.h</code> type is exactly 8 bytes wide?</div>
      <input class="fillblank" data-answer="int64_t">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>int64_t</code> — 64 bits = 8 bytes.</div>
    </div>
  </div>
</section>

<!-- ============ ADD DIAGRAM ============ -->
<section class="topic" id="l4-add">
  <h2>Lesson 4 &middot; Memory Diagram: <code>add(int8_t a, int8_t b)</code></h2>

  <div class="card">
<pre><span class="ty">int8_t</span> <span class="fn">add</span>(<span class="ty">int8_t</span> a, <span class="ty">int8_t</span> b) {
    <span class="ty">int8_t</span> result = a + b;
    <span class="kw">return</span> result;
}

<span class="ty">int8_t</span> <span class="fn">main</span>() {
    <span class="ty">int8_t</span> x = <span class="fn">add</span>(<span class="nm">3</span>, <span class="nm">4</span>);
}</pre>
    <p>Build the callee's (<code>add</code>'s) frame field by field:</p>
    <table class="cmp">
      <tr><th>Field</th><th>Size</th><th>Value</th></tr>
      <tr><td>RA</td><td>8 bytes</td><td>address back in <code>main</code>, right after the call to <code>add</code></td></tr>
      <tr><td><code>a</code> (arg)</td><td>1 byte</td><td>3</td></tr>
      <tr><td><code>b</code> (arg)</td><td>1 byte</td><td>4</td></tr>
      <tr><td><code>result</code> (local)</td><td>1 byte</td><td>7, once computed</td></tr>
    </table>
  </div>

  <h3>The sequence of events</h3>
  <div class="card">
    <ol class="muted" style="line-height:2">
      <li><code>main</code> calls <code>add(3, 4)</code> &mdash; a new frame for <code>add</code> is <b>pushed</b>, containing the RA and the argument copies <code>a=3</code>, <code>b=4</code>.</li>
      <li><code>add</code> executes, computing <code>result = 7</code> in its own frame.</li>
      <li>Just <b>before</b> <code>add</code>'s frame is deallocated, the return value <b>7</b> is written into an <b>RV (return-value) slot that lives in the CALLER's (<code>main</code>'s) frame</b>.</li>
      <li><code>add</code>'s frame is popped (X-ed out) &mdash; <code>a</code>, <code>b</code>, and <code>result</code> no longer exist.</li>
      <li><code>main</code> resumes, reading the value from its own RV slot to initialize <code>x = 7</code>.</li>
    </ol>
    <div class="concept">The return value does not live inside the callee's frame after the callee is gone
    &mdash; it is handed off into a slot in the <b>caller's</b> frame first. That's how the value survives the
    callee's frame being deallocated.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Where does <code>add</code>'s return value end up living once <code>add</code>'s frame is deallocated?</div>
      <button class="opt" data-i="0">Nowhere &mdash; it's lost when the frame is popped</button>
      <button class="opt" data-i="1">It stays in <code>add</code>'s old frame, which is read later</button>
      <button class="opt" data-i="2">It was written into an RV slot in the <b>caller's</b> (<code>main</code>'s) frame before <code>add</code>'s frame was popped</button>
      <button class="opt" data-i="3">On the heap</button>
      <div class="fb">The value is copied into the caller's RV slot <b>before</b> the callee's frame is deallocated &mdash; that hand-off is what lets <code>main</code> use the result afterward.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the correct order of events for <code>x = add(3,4)</code>?</div>
      <button class="opt" data-i="0">push add's frame &rarr; compute result &rarr; write result into caller's RV slot &rarr; pop add's frame &rarr; caller resumes using RV</button>
      <button class="opt" data-i="1">pop add's frame &rarr; push add's frame &rarr; compute result</button>
      <button class="opt" data-i="2">write RV slot &rarr; push add's frame &rarr; compute result &rarr; pop frame</button>
      <button class="opt" data-i="3">push add's frame &rarr; pop add's frame &rarr; compute result &rarr; write RV slot</button>
      <div class="fb">Frame pushed first, computation happens inside it, the result is written to the caller's RV slot <i>while add's frame still exists</i>, and only then is the frame popped.</div>
    </div>
  </div>
</section>

<!-- ============ ARRAY DIAGRAM ============ -->
<section class="topic" id="l4-array">
  <h2>Lesson 4 &middot; Memory Diagram: Passing an Array</h2>

  <div class="card">
<pre><span class="pp">#define</span> ARR_SIZE 5

<span class="ty">int32_t</span> <span class="fn">example</span>(<span class="ty">int32_t</span> arr[ARR_SIZE], <span class="ty">int32_t</span> size, <span class="ty">int32_t</span> sum) {
    <span class="kw">for</span> (<span class="ty">int32_t</span> i = <span class="nm">0</span>; i &lt; size; i++) {
        sum += arr[i];
        arr[i]++;              <span class="cm">// mutates the CALLER's array!</span>
    }
    size = <span class="nm">0</span>;                <span class="cm">// does NOT affect the caller's size</span>
    <span class="kw">return</span> sum;
}</pre>
  </div>

  <div class="concept" style="font-size:15px"><b>The single most important idea in this lecture:</b> Arrays
  are <b>never copied</b> into a callee's frame. Only an <b>8-byte pointer</b> to the original array &mdash;
  which still lives in the <b>caller's</b> frame &mdash; is passed in.
  <br><br>
  So in <code>example</code>'s frame, the field for <code>arr</code> is <code>arr(8): pointer&nbsp;&rarr;
  caller's array</code> &mdash; eight bytes holding an <i>address</i>, with a conceptual arrow pointing back
  up the stack into <code>main</code>'s frame where the real array data lives.
  <br><br>
  <b>Contrast</b> with <code>size</code> and <code>sum</code>: as plain <code>int32_t</code> parameters, they
  <b>are</b> copied by value &mdash; the callee gets its own independent 4-byte copies. Changing
  <code>size</code> inside <code>example</code> (<code>size = 0;</code>) does <b>not</b> touch the caller's
  original <code>size</code> variable at all.
  <br><br>
  But because <code>arr</code> is only a pointer <i>back to the caller's actual array</i>, a statement like
  <code>arr[i]++;</code> follows that pointer and <b>does</b> mutate the caller's original array data. The
  callee has no array of its own &mdash; every read and write through <code>arr</code> reaches straight into
  the caller's memory.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Field in <code>example</code>'s frame</th><th>Size</th><th>Relationship to caller</th></tr>
      <tr><td>RA</td><td>8 bytes</td><td>&mdash;</td></tr>
      <tr><td><code>arr</code></td><td><b>8 bytes</b></td><td>a <b>pointer</b> back to the caller's actual array &mdash; not a copy</td></tr>
      <tr><td><code>size</code></td><td>4 bytes</td><td>an <b>independent copy</b> of the caller's value</td></tr>
      <tr><td><code>sum</code></td><td>4 bytes</td><td>an <b>independent copy</b> of the caller's value</td></tr>
      <tr><td><code>i</code> (local)</td><td>4 bytes</td><td>exists only inside <code>example</code></td></tr>
    </table>
    <p class="muted"><b>All pointers are 8 bytes</b> on this architecture, regardless of what type they point
    to &mdash; a pointer to an <code>int32_t</code> array and a pointer to a single <code>char</code> are both
    8 bytes, because a pointer just stores an address.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>When <code>example(arr, size, sum)</code> is called, what actually gets copied into the callee's frame for the <code>arr</code> parameter?</div>
      <button class="opt" data-i="0">A full copy of every element of the array</button>
      <button class="opt" data-i="1">Nothing &mdash; arrays cannot be passed to functions in C</button>
      <button class="opt" data-i="2">An 8-byte pointer to the original array, which still lives in the caller's frame</button>
      <button class="opt" data-i="3">Only the first element of the array</button>
      <div class="fb">Arrays are never copied into a callee's frame &mdash; only a pointer (8 bytes) back to the original data.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span><code>arr[i]++;</code> inside <code>example</code> modifies the caller's original array.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> <code>arr</code> is a pointer to the caller's actual array data, so writing through it changes the caller's original.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>size = 0;</code> inside <code>example</code> changes the caller's original <code>size</code> variable.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> Plain <code>int32_t</code> parameters are copied by value &mdash; the callee's <code>size</code> is an independent copy.</div>
    </div>
    <div class="q" data-multi="1,3">
      <div class="prompt"><span class="tag">Select all that apply</span>Which are true of passing <code>int32_t arr[ARR_SIZE]</code> as a parameter?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> The array's contents are duplicated into the callee's frame.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> Only a pointer (8 bytes) is passed.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Changes to <code>arr[i]</code> inside the function are invisible to the caller.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> This happens even though the parameter is written as <code>arr[ARR_SIZE]</code>, with no explicit <code>*</code>.</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>B and D.</b> An array parameter decays to a pointer &mdash; only 8 bytes cross into the callee's frame, and mutations through it <i>are</i> visible to the caller (so C is false), even though the syntax never shows a <code>*</code>.</div>
    </div>
  </div>
</section>

<!-- ============ VALUE VS POINTER ============ -->
<section class="topic" id="l4-byval">
  <h2>Lesson 4 &middot; Pass-by-Value vs Pass-by-Pointer</h2>

  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Pass-by-value</th><th>Pass-by-pointer</th></tr>
      <tr><td>What crosses into the callee's frame</td><td>a <b>copy</b> of the value</td><td>an <b>address</b> (a pointer)</td></tr>
      <tr><td>Callee modifies its parameter</td><td>caller's original is <b>unaffected</b></td><td>caller's original <b>is affected</b> &mdash; the callee wrote through the address</td></tr>
      <tr><td>Typical C examples</td><td><code>int32_t size</code>, <code>int32_t sum</code></td><td><code>int32_t arr[ARR_SIZE]</code> (array parameters decay to pointers), or an explicit <code>int32_t *p</code></td></tr>
    </table>
    <div class="concept">This is exactly how arrays behave when passed to functions in C, <b>even without an
    explicit <code>*</code></b> in the parameter list &mdash; <code>int32_t arr[ARR_SIZE]</code> decays to a
    pointer the moment it's used as a parameter. Plain scalar parameters (<code>int32_t</code>,
    <code>int8_t</code>, ...) do not decay; they are copied.</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match the parameter to its passing style</h3>
    <table class="match" id="match-byval">
      <tr><td class="match-term"><code>int32_t size</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="val">pass-by-value</option><option value="ptr">pass-by-pointer</option></select></td></tr>
      <tr><td class="match-term"><code>int32_t arr[ARR_SIZE]</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="val">pass-by-value</option><option value="ptr">pass-by-pointer</option></select></td></tr>
      <tr><td class="match-term"><code>int32_t *p</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="val">pass-by-value</option><option value="ptr">pass-by-pointer</option></select></td></tr>
      <tr><td class="match-term"><code>int8_t a</code> (as in <code>add(a,b)</code>)</td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="val">pass-by-value</option><option value="ptr">pass-by-pointer</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-byval','fb-match-byval',['val','ptr','ptr','val'])">Check</button>
    <div class="fb" id="fb-match-byval">Any array parameter decays to a pointer; any explicit pointer parameter is pass-by-pointer; plain scalar types (<code>int32_t</code>, <code>int8_t</code>, ...) are pass-by-value.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>A function takes <code>int32_t x</code> and does <code>x = x * 2;</code> inside. What happens to the caller's original variable?</div>
      <button class="opt" data-i="0">It doubles too</button>
      <button class="opt" data-i="1">It is unaffected &mdash; the callee only modified its own local copy</button>
      <button class="opt" data-i="2">It becomes garbage</button>
      <button class="opt" data-i="3">A compiler error occurs</button>
      <div class="fb">Plain scalar parameters are pass-by-value; the callee's <code>x</code> is a completely separate copy.</div>
    </div>
  </div>
</section>

<!-- ============ RD03 ============ -->
<section class="topic" id="l4-rd03">
  <h2>RD03 &middot; Functions &amp; Stack Frames — Self-Check</h2>
  <p class="muted">Covers the RD03 reading: <i>Dive into Systems</i> Appendix &sect;Functions.</p>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What triggers a new stack frame to be pushed?</div>
      <button class="opt" data-i="0">Declaring a global variable</button>
      <button class="opt" data-i="1">Calling a function</button>
      <button class="opt" data-i="2">Compiling the program</button>
      <button class="opt" data-i="3">Including a header file</button>
      <div class="fb">Each function <b>call</b> pushes a new frame; each <b>return</b> pops one.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>Which of these is stored in a function's own stack frame?</div>
      <button class="opt" data-i="0">The caller's local variables</button>
      <button class="opt" data-i="1">The next function it will call</button>
      <button class="opt" data-i="2">Its own local variables, its arguments, and the return address</button>
      <button class="opt" data-i="3">The entire program's source code</button>
      <div class="fb">RA, arguments, and locals &mdash; the three components covered in this lecture.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">Q3</span>Passing an array to a function in C passes a pointer, not a copy of the data.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> Only an 8-byte address crosses into the callee's frame; the array itself stays in the caller's frame.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Q4</span>Modifying a plain <code>int</code> parameter inside a function changes the caller's original variable.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> Plain scalar parameters are copied (pass-by-value); the caller's original is untouched.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q5</span>Where does a function's return value get placed so the caller can use it after the callee's frame is gone?</div>
      <button class="opt" data-i="0">A return-value (RV) slot in the caller's own frame</button>
      <button class="opt" data-i="1">It stays in the callee's frame permanently</button>
      <button class="opt" data-i="2">A global variable</button>
      <button class="opt" data-i="3">The heap</button>
      <div class="fb">It's written into the caller's frame <b>before</b> the callee's frame is deallocated.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q6</span>Why does this lecture prefer <code>int32_t</code> over plain <code>int</code> in its diagrams?</div>
      <button class="opt" data-i="0"><code>int32_t</code> is faster</button>
      <button class="opt" data-i="1"><code>int32_t</code> has a guaranteed, portable size (exactly 4 bytes) everywhere, unlike plain <code>int</code></button>
      <button class="opt" data-i="2"><code>int</code> cannot be used as a function parameter</button>
      <button class="opt" data-i="3">There is no real difference</button>
      <div class="fb">Predictable byte widths make the stack-frame arithmetic in the diagrams exact and portable.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q7</span>What does the stack pointer <code>sp</code> track?</div>
      <button class="opt" data-i="0">The number of functions defined in the program</button>
      <button class="opt" data-i="1">The address of <code>main</code></button>
      <button class="opt" data-i="2">The return value of the current function</button>
      <button class="opt" data-i="3">The top of the call stack</button>
      <div class="fb"><code>sp</code> always points at the top of the stack &mdash; the most recently pushed frame.</div>
    </div>
    <div class="q" data-multi="0,2">
      <div class="prompt"><span class="tag">Q8 &middot; Select all</span>Which parameters would be pass-by-pointer in C?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> <code>int32_t data[SIZE]</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>int32_t count</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> <code>char *name</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> <code>int8_t flag</code></span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A and C.</b> An array parameter decays to a pointer, and <code>char *name</code> is an explicit pointer. B and D are plain scalars &mdash; pass-by-value.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q9 &middot; Fill in the blank</span>On this architecture, a pointer &mdash; regardless of what it points to &mdash; is always how many bytes?</div>
      <input class="fillblank sm" data-answer="8|8 bytes">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">All pointers are 8 bytes: an address, not the data itself.</div>
    </div>
  </div>
</section>

</main>
`;
