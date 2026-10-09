/* ============================================================
   CL12 — Quiz 1 Applied Review. Injects into #l18.
   Loaded BEFORE the shared engine.
   Source: "COMP211 Quiz 1 Review 2" slide deck. Mixed applied
   practice tying together character arrays/strings, bitwise
   operators, stack frames, and glob patterns from earlier in
   the course — a cross-topic gut-check ahead of Quiz 1.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l18').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l18-strings')">1 &middot; Character Arrays</button>
  <button onclick="showTopic(this,'l18-bitwise')">2 &middot; Bitwise: Image Filters</button>
  <button onclick="showTopic(this,'l18-stack')">3 &middot; Stack Diagram</button>
  <button onclick="showTopic(this,'l18-glob')">4 &middot; Glob</button>
</nav>
<main>

<!-- ============ CHARACTER ARRAYS ============ -->
<section class="topic active" id="l18-strings">
<h2>CL12 &middot; Character Arrays: <code>sizeof</code> vs. <code>strlen</code></h2>

<div class="card concept">
  <h3>The program</h3>
  <pre>char str1[] = "211";
char str2[] = "U\\nN\\nC\\n";
char str3[] = "She said \\"hello\\"!";
char str4[25] = {'U','N','C','\\n','t','a','\\0','r','h','e','e','l','s','\\0'};

char dest[20];
strcpy(dest, str1);</pre>
  <p><code>sizeof</code> reports the <b>total allocated size</b> of the array (including the null terminator and any
  unused space); <code>strlen</code> reports the <b>length of the string up to (not including) the first
  <code>'\\0'</code></b>, regardless of how much space is actually allocated.</p>
</div>

<div class="card">
  <h3>Fill in the program output</h3>
  <table class="cmp">
    <tr><th>Variable</th><th>sizeof</th><th>strlen</th><th>Why</th></tr>
    <tr><td>str1</td><td>4</td><td>3</td><td>"211" + implicit \\0 = 4 bytes; 3 visible chars</td></tr>
    <tr><td>str2</td><td>7</td><td>6</td><td>Each \\n is one char: U,\\n,N,\\n,C,\\n + \\0 = 7 bytes, 6 visible chars</td></tr>
    <tr><td>str3</td><td>18</td><td>17</td><td>Escaped quotes \\" are one char each; count every char + \\0</td></tr>
    <tr><td>str4</td><td>25</td><td>6</td><td>Array declared with a fixed size of 25, but the FIRST \\0 appears after
    just 6 characters (U,N,C,\\n,t,a) &mdash; strlen stops there even though more data follows in the array</td></tr>
    <tr><td>dest</td><td>20</td><td>3</td><td>Declared as char dest[20]; strcpy copied "211" (3 chars + \\0) into it</td></tr>
  </table>
  <p class="muted">Key takeaway: <code>sizeof</code> is a compile-time property of the array's declared size;
  <code>strlen</code> is a runtime scan that stops at the first null byte, no matter how the array itself is sized.</p>
</div>

<div class="card">
  <h3>Printed output</h3>
  <p>What do the four <code>printf("%s", ...)</code> calls followed by <code>printf("\\nEnd\\n")</code> print?</p>
  <button class="btn small" onclick="toggleReveal(this)">Show answer</button>
  <div class="reveal">
    <pre>211U
N
C
She said "hello"!UNC
ta
End</pre>
    <p class="muted">Each <code>%s</code> print stops at the first <code>'\\0'</code> it hits &mdash; note how str2's
    embedded <code>\\n</code>s actually produce newlines when printed, and str4 prints only up through <code>ta</code>
    (its first null terminator) even though "rhee ls" is still sitting in the array afterward, unreachable by
    <code>%s</code>.</p>
  </div>
</div>

<div class="card">
  <div class="q">
    <p>Why does <code>str4</code>'s <code>strlen</code> (6) not match its declared size (25)?</p>
    <input class="fillblank" data-answer="first null terminator~~~the first \\0 is early~~~early null byte~~~strlen stops at the first null byte">
    <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
    <div class="fb"></div>
  </div>
</div>
</section>

<!-- ============ BITWISE: IMAGE FILTERS ============ -->
<section class="topic" id="l18-bitwise">
<h2>CL12 &middot; Bitwise Practice: Image Filters</h2>

<div class="card concept">
  <h3>The problem</h3>
  <p>Write <code>uint32_t warm_filter(uint32_t hex_color)</code> that takes a 24-bit RGB color packed into a 32-bit int
  (format <code>0xRRGGBB</code>) and returns a "warmed" version: add <code>0x20</code> to the red channel, clamped at
  <code>0xFF</code>, and leave green/blue unchanged.</p>
  <p><b>4-step skeleton:</b></p>
  <ol>
    <li>Extract the current red channel: <code>uint32_t red = (hex_color &gt;&gt; 16) &amp; 0xFF;</code></li>
    <li>Increase it, clamped at 0xFF: <code>uint32_t new_red = (red + 0x20 &gt; 0xFF) ? 0xFF : red + 0x20;</code></li>
    <li>Clear the original red bits: <code>uint32_t cleared = hex_color &amp; 0x00FFFFFF;</code></li>
    <li>Insert the new red value: <code>return cleared | (new_red &lt;&lt; 16);</code></li>
  </ol>
</div>

<div class="card">
  <h3>Worked examples</h3>
  <table class="cmp">
    <tr><th>Input</th><th>Output</th><th>Why</th></tr>
    <tr><td><code>0x123456</code></td><td><code>0x323456</code></td><td>Red 0x12 + 0x20 = 0x32, no clamping needed</td></tr>
    <tr><td><code>0xF0ABCD</code></td><td><code>0xFFABCD</code></td><td>Red 0xF0 + 0x20 = 0x110, which overflows 0xFF,
    so it clamps to 0xFF</td></tr>
  </table>
</div>

<div class="card">
  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">Multiple choice</span>Why is step 3 (clearing the original red bits) necessary
    before OR-ing in the new red value?</div>
    <button class="opt" data-i="0">It isn't &mdash; you could skip it</button>
    <button class="opt" data-i="1">OR-ing a new value into bits that already hold 1s can't turn those bits back to 0,
    so the old red bits must be cleared first</button>
    <button class="opt" data-i="2">It converts the number from signed to unsigned</button>
    <button class="opt" data-i="3">It's needed to prevent integer overflow</button>
    <div class="fb">This is the same clear-then-set pattern from <code>update_bit</code>: OR can only turn bits on, so
    any old 1-bits in that field have to be zeroed out first, or they'd "leak through" into the result.</div>
  </div>
</div>
</section>

<!-- ============ STACK DIAGRAM ============ -->
<section class="topic" id="l18-stack">
<h2>CL12 &middot; Stack Diagram Practice</h2>

<div class="card concept">
  <h3>The program</h3>
  <pre>void update(int32_t arr[], int64_t value) {
    value = value * 2;
    for (int8_t i = 0; i &lt; ARR_SIZE; i += 3) {
        arr[i] = value * 2;
    }
}

int main(void) {
    int64_t x = 5;
    int32_t a[ARR_SIZE] = {1, 2, 3, 4, 5};
    update(a, x);
    return 0;
}</pre>
  <p>Assume <code>ARR_SIZE</code> is 5. Just before <code>update</code> returns, what has happened to <code>x</code> in
  <code>main</code>, and to the array? Draw the stack and find where the stack pointer sits.</p>
</div>

<div class="card">
  <button class="btn small" onclick="toggleReveal(this)">Show answer</button>
  <div class="reveal">
    <p><b><code>x</code> in <code>main</code> is unchanged (still 5).</b> Arguments in C are passed <b>by value</b>:
    <code>update</code> receives its own local copy of <code>value</code> (initialized from <code>x</code>). Reassigning
    <code>value = value * 2;</code> inside <code>update</code> only modifies that function's own stack frame &mdash; it
    has no effect on the caller's <code>x</code>.</p>
    <p><b>The array is different:</b> <code>arr</code> is a pointer to the same memory as <code>a</code> in
    <code>main</code> (arrays decay to pointers when passed to functions), so writes through <code>arr[i]</code>
    <b>do</b> modify <code>a</code> in <code>main</code>. With <code>value</code> now 10 inside <code>update</code>, the
    loop runs for <code>i = 0</code> and <code>i = 3</code> (since <code>i += 3</code> and the loop stops once
    <code>i &gt;= ARR_SIZE</code>), setting <code>a[0] = 20</code> and <code>a[3] = 20</code>. So just before
    <code>update</code> returns: <code>a = {20, 2, 3, 20, 5}</code>, and the stack pointer sits inside
    <code>update</code>'s frame, which sits above <code>main</code>'s frame &mdash; the stack grows downward and
    <code>update</code> was called more recently, so its frame is at a lower address, closer to the current top of the
    stack.</p>
  </div>
</div>

<div class="card">
  <div class="q" data-tf="F">
    <div class="prompt"><span class="tag">True/False</span>Because <code>value</code> is reassigned inside
    <code>update</code>, <code>x</code> in <code>main</code> also changes.</div>
    <button class="opt" data-v="T">True</button>
    <button class="opt" data-v="F">False</button>
    <div class="fb">False &mdash; <code>value</code> is a separate, local copy. Only pointer/array parameters let a
    callee modify the caller's data.</div>
  </div>
</div>
</section>

<!-- ============ GLOB ============ -->
<section class="topic" id="l18-glob">
<h2>CL12 &middot; Glob Practice</h2>

<div class="card concept">
  <h3>Write the commands</h3>
  <table class="cmp">
    <tr><th>Task</th><th>Command</th></tr>
    <tr><td>Remove all files starting with <code>temp</code></td><td><code>rm temp*</code></td></tr>
    <tr><td>List files whose names contain at least one digit</td><td><code>ls *[0-9]*</code></td></tr>
    <tr><td><code>find</code> for files ending in <code>.log</code>, recursively</td><td><code>find . -name "*.log"</code></td></tr>
    <tr><td>Files starting with <code>a</code> or <code>b</code>, ending in <code>.txt</code></td><td><code>ls [ab]*.txt</code></td></tr>
    <tr><td>Copy files starting with <code>data</code>, ending in a digit, into <code>backup/</code></td>
    <td><code>cp data*[0-9] backup/</code></td></tr>
  </table>
  <p class="muted">Glob patterns are expanded by the <b>shell</b> before the command ever runs &mdash; <code>rm</code>,
  <code>ls</code>, <code>cp</code>, etc. never see the wildcard characters themselves, only the list of matching
  filenames.</p>
</div>

<div class="card">
  <div class="q">
    <p>Write a <code>find</code> command that searches the current directory and all subdirectories for files ending in
    <code>.log</code>.</p>
    <input class="fillblank" data-answer="find . -name &quot;*.log&quot;~~~find . -name '*.log'">
    <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
    <div class="fb"></div>
  </div>
</div>
</section>

</main>
`;
