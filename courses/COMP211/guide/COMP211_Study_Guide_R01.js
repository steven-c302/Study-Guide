/* ============================================================
   READING ASSIGNMENT 01 — Dive into Systems 16.1 (getting
   started), 16.2 (input/output), 16.3 (conditionals),
   16.5 (arrays).
   Injects into #r01. Loaded BEFORE the shared engine.
   NOTE: inside the template literal below, a literal backslash
   must be written as \\ (so a newline escape prints as \\n).
   ============================================================ */
document.getElementById('r01').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'r01-basics')">1 &middot; C vs Java Basics</button>
  <button onclick="showTopic(this,'r01-oplab')">Operator Lab</button>
  <button onclick="showTopic(this,'r01-printf')">2 &middot; printf &amp; Format Strings</button>
  <button onclick="showTopic(this,'r01-printflab')">printf Lab</button>
  <button onclick="showTopic(this,'r01-cond')">3 &middot; Conditionals</button>
  <button onclick="showTopic(this,'r01-arrays')">4 &middot; Arrays</button>
  <button onclick="showTopic(this,'r01-arraylab')">Array Lab</button>
  <button onclick="showTopic(this,'r01-quiz')">&#9733; Assignment Q&amp;A</button>
  <button onclick="showTopic(this,'r01-code')">Code Writing</button>
</nav>
<main>

<!-- ===================================================================
     1 — GETTING STARTED (16.1)
     =================================================================== -->
<section class="topic active" id="r01-basics">
  <h2>Reading 01 &middot; Part 1 — C after Java (&sect;16.1)</h2>

  <div class="concept">The book's framing: <b>Java is a purely object-oriented language, so all code must be
  part of a class. C is a purely imperative and procedural language, and thus there are no classes in C.</b>
  Almost every difference below follows from that one sentence.</div>

  <h3>The anatomy of a C program</h3>
  <div class="card">
<pre><span class="cm">// hello.c  &mdash; the .c suffix is the convention for C source files</span>
<span class="cm">#include</span> <span class="st">&lt;stdio.h&gt;</span>    <span class="cm">// libraries come in with #include, at the TOP, outside any function</span>
<span class="cm">#include</span> <span class="st">&lt;stdlib.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {      <span class="cm">// exactly one main; its return type MUST be int</span>
    <span class="ty">int</span> x;              <span class="cm">// declare variables at the top of their { } block</span>
    x = <span class="nm">10</span>;
    <span class="fn">printf</span>(<span class="st">"x is %d\\n"</span>, x);
    <span class="kw">return</span> <span class="nm">0</span>;           <span class="cm">// 0 conventionally means "finished successfully"</span>
}</pre>
    <table class="cmp" style="margin-top:14px">
      <tr><th></th><th>Java</th><th>C</th></tr>
      <tr><td>Source file</td><td><code>.java</code> &rarr; compiled to <code>.class</code></td><td><b><code>.c</code></b> &rarr; compiled to a native executable</td></tr>
      <tr><td>Libraries</td><td><code>import java.util.*;</code></td><td><b><code>#include &lt;stdio.h&gt;</code></b> at the top of the file</td></tr>
      <tr><td><code>main</code></td><td><code>public static void main(String[] args)</code>, inside a class</td><td><b><code>int main(void)</code></b> &mdash; not in a class, and it <b>returns an <code>int</code></b></td></tr>
      <tr><td>Paradigm</td><td>purely object-oriented</td><td>purely imperative / <b>procedural</b></td></tr>
      <tr><td>Declaring a variable</td><td><code>int x;</code></td><td><code>int x;</code> &mdash; <b>type first, then name</b>, at the top of the block</td></tr>
    </table>
    <p class="muted">Note what is <i>not</i> different: the declaration syntax <code>type_name variable_name;</code>
    is the same in both. The exam-style trap options (<code>x int;</code>, <code>declare int x;</code>,
    <code>x = int;</code>) are not valid in either language.</p>
  </div>

  <h3><code>'h'</code> is not <code>"h"</code></h3>
  <div class="card">
    <div class="two">
      <div>
        <h4>Single quotes &rarr; a <code>char</code></h4>
<pre><span class="ty">char</span> c = <span class="st">'h'</span>;   <span class="cm">// ONE byte</span>
<span class="cm">// its value is 104, the ASCII code for h</span></pre>
        <p class="muted">A <code>char</code> <i>is</i> a small integer. <code>'h' + 1</code> is <code>105</code>,
        which is <code>'i'</code>.</p>
      </div>
      <div>
        <h4>Double quotes &rarr; a string literal</h4>
<pre><span class="ty">char</span> s[] = <span class="st">"h"</span>;  <span class="cm">// TWO bytes: 'h' and '\\0'</span></pre>
        <p class="muted">A string literal is an array of characters ending in the null terminator. The book is
        blunt about it: <b>"a string and a <code>char</code> are two very different types."</b></p>
      </div>
    </div>
  </div>

  <h3>Two arithmetic traps</h3>
  <div class="card">
    <h4>Integer division truncates</h4>
    <p>When <b>both</b> operands are integers, <code>/</code> performs integer division — the result is an
    <code>int</code>, and everything past the decimal point is thrown away (not rounded).</p>
<pre><span class="nm">11</span> / <span class="nm">2</span>      <span class="cm">// 5   &larr; NOT 5.5 and NOT 6 &mdash; truncated toward zero</span>
<span class="nm">11</span> % <span class="nm">2</span>      <span class="cm">// 1   &larr; the remainder lives in %</span>
<span class="nm">11</span> / <span class="nm">2.0</span>    <span class="cm">// 5.5 &larr; one operand is a double, so it is real division</span>
(<span class="ty">double</span>)<span class="nm">11</span> / <span class="nm">2</span>  <span class="cm">// 5.5 &larr; cast one side first</span></pre>

    <h4 style="margin-top:22px">Post- vs pre-increment</h4>
    <p>Both <code>x++</code> and <code>++x</code> add one to <code>x</code>. They differ in <b>what the
    expression evaluates to</b>:</p>
    <table class="cmp">
      <tr><th>Expression</th><th>Value it contributes</th><th>Effect on <code>x</code></th></tr>
      <tr><td><code>x++</code> (post)</td><td>the <b>old</b> value of <code>x</code></td><td><code>x</code> becomes <code>x + 1</code></td></tr>
      <tr><td><code>++x</code> (pre)</td><td>the <b>new</b> value of <code>x</code></td><td><code>x</code> becomes <code>x + 1</code></td></tr>
    </table>
<pre><span class="ty">int</span> x = <span class="nm">6</span>;
<span class="ty">int</span> y = x++ + <span class="nm">2</span>;   <span class="cm">// x++ hands over 6, THEN x becomes 7  =&gt;  y = 6 + 2 = 8</span>

<span class="ty">int</span> x = <span class="nm">6</span>;
<span class="ty">int</span> y = ++x + <span class="nm">2</span>;   <span class="cm">// x becomes 7 FIRST, then hands over 7  =&gt;  y = 7 + 2 = 9</span></pre>
    <div class="warn"><b>The book's own advice:</b> "code like this that uses an arithmetic expression with an
    increment operator is often hard to read, and it's easy to get wrong." It shows up on quizzes precisely
    because it is confusing — in real code, put the increment on its own line.</div>
  </div>

  <h3>Quick checks</h3>
  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>In C, <code>main</code> can be declared <code>void</code> like Java's.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">The book is explicit: a C program "must have a function named <code>main</code>, and its
      return type must be <code>int</code>." The <code>int</code> it returns is the program's exit status —
      <code>0</code> for success.</div>
    </div>
    <div class="q" data-tf="T" style="margin-top:16px">
      <div class="prompt"><span class="tag">True / False</span><code>7 / 2 * 2</code> is <code>6</code> in C.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Left to right: <code>7 / 2</code> truncates to <b>3</b>, then <code>3 * 2</code> = <b>6</b>.
      Integer division loses the 0.5 permanently — multiplying afterwards cannot bring it back.</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     OPERATOR LAB
     =================================================================== -->
<section class="topic" id="r01-oplab">
  <h2>Operator Lab</h2>
  <div class="concept">The two arithmetic behaviours that catch Java programmers out, made concrete.</div>

  <div class="card">
    <h3 style="margin-top:0">Integer division</h3>
    <div class="toolbar">
      <input type="text" id="op-a" value="11" style="width:80px" oninput="renderDiv()">
      <span class="muted">/</span>
      <input type="text" id="op-b" value="2" style="width:80px" oninput="renderDiv()">
      <button class="btn small ghost" onclick="divPreset(11,2)">11 / 2</button>
      <button class="btn small ghost" onclick="divPreset(7,2)">7 / 2</button>
      <button class="btn small ghost" onclick="divPreset(-7,2)">-7 / 2</button>
      <button class="btn small ghost" onclick="divPreset(3,4)">3 / 4</button>
    </div>
    <div class="fdbox" id="op-out"></div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Post- vs pre-increment, step by step</h3>
    <div class="toolbar">
      <label class="muted">Expression:</label>
      <select id="inc-expr" onchange="resetInc()">
        <option value="post">int y = x++ + 2;</option>
        <option value="pre">int y = ++x + 2;</option>
        <option value="postpost">int y = x++ + x++;</option>
      </select>
      <label class="muted">starting x:</label>
      <input type="text" id="inc-x" value="6" style="width:70px" oninput="resetInc()">
      <button class="btn small ghost" onclick="stepInc(-1)">&larr; Back</button>
      <button class="btn small ghost" onclick="stepInc(1)">Next &rarr;</button>
      <span class="muted" id="inc-count"></span>
    </div>
    <pre id="inc-code" style="min-height:80px"></pre>
    <div class="fdbox">
      <div class="fdrow"><div class="fdtag fd0">x</div><div class="arrow">=</div><div class="dest" id="inc-vx"></div></div>
      <div class="fdrow"><div class="fdtag fd1">y</div><div class="arrow">=</div><div class="dest" id="inc-vy"></div></div>
    </div>
    <div class="step-desc" id="inc-desc"></div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>After <code>int x = 6; int y = ++x + 2;</code>, what are <code>x</code> and <code>y</code>?</div>
      <button class="opt" data-i="0">x = 6, y = 8</button>
      <button class="opt" data-i="1">x = 7, y = 8</button>
      <button class="opt" data-i="2">x = 7, y = 9</button>
      <button class="opt" data-i="3">x = 8, y = 9</button>
      <div class="fb"><b>x = 7, y = 9.</b> Pre-increment bumps <code>x</code> to 7 <i>before</i> the expression
      uses it, so <code>y = 7 + 2 = 9</code>. Compare the post-increment version, where <code>x</code> also
      ends at 7 but <code>y</code> is 8.</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     2 — INPUT / OUTPUT (16.2)
     =================================================================== -->
<section class="topic" id="r01-printf">
  <h2>Reading 01 &middot; Part 2 — <code>printf</code> and format strings (&sect;16.2)</h2>

  <div class="concept">A <b>format string</b> is the first argument to <code>printf</code>. It
  <b>defines how the output should be formatted</b>: literal text, escape sequences such as <code>\\n</code>
  and <code>\\t</code>, and <b>placeholders</b> that get replaced by the values you pass after it.</div>

  <div class="card">
<pre><span class="fn">printf</span>(<span class="st">"the value of x is %d and y is %d\\n"</span>, x, y);
        <span class="cm">|________ format string ________|  |__ args __|</span></pre>
    <p>Each placeholder <b>begins with <code>%</code></b>, followed by a type-specifier letter. The
    placeholders are filled <b>left to right</b> from the arguments that follow.</p>

    <h3>Placeholders</h3>
    <table class="cmp">
      <tr><th>Placeholder</th><th>Prints</th><th>Example</th></tr>
      <tr><td><code>%d</code></td><td>a decimal value (<code>int</code>, <code>short</code>, <code>char</code>)</td><td><code>printf("%d", 65)</code> &rarr; <code>65</code></td></tr>
      <tr><td><code>%c</code></td><td>a <code>char</code> — <b>the ASCII character for a numeric encoding</b></td><td><code>printf("%c", 65)</code> &rarr; <code>A</code></td></tr>
      <tr><td><code>%s</code></td><td>a string</td><td><code>printf("%s", "hi")</code> &rarr; <code>hi</code></td></tr>
      <tr><td><code>%g</code></td><td>a <code>float</code> or <code>double</code></td><td><code>printf("%g", 3.5)</code> &rarr; <code>3.5</code></td></tr>
    </table>
    <div class="concept"><b>The <code>%d</code> / <code>%c</code> pair is the point of the section.</b> The same
    byte <code>65</code> prints as the number <code>65</code> under <code>%d</code> and as the letter
    <code>A</code> under <code>%c</code>. The placeholder chooses the <i>interpretation</i>; the bits never
    changed. That idea — one pattern of bits, many meanings — is the spine of this whole course.</div>

    <h3>Escape sequences</h3>
    <table class="cmp">
      <tr><th>Sequence</th><th>Effect</th></tr>
      <tr><td><code>\\n</code></td><td><b>newline</b> — move to the next line</td></tr>
      <tr><td><code>\\t</code></td><td>tab</td></tr>
      <tr><td><code>\\\\</code></td><td>a literal backslash</td></tr>
      <tr><td><code>%%</code></td><td>a literal percent sign</td></tr>
    </table>
    <p class="muted">The escape character is the <b>backslash</b>; the placeholder character is the
    <b>percent sign</b>. Don't swap them: <code>\\n</code> is a newline, <code>%n</code> is something else
    entirely (and dangerous).</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each placeholder to what it prints</h3>
    <table class="match" id="match-ph">
      <tr><td class="match-term"><code>%d</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">a decimal integer</option><option value="chr">a single character</option><option value="str">a string</option><option value="flt">a floating-point value</option><option value="nl">a newline</option></select></td></tr>
      <tr><td class="match-term"><code>%c</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">a decimal integer</option><option value="chr">a single character</option><option value="str">a string</option><option value="flt">a floating-point value</option><option value="nl">a newline</option></select></td></tr>
      <tr><td class="match-term"><code>%s</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">a decimal integer</option><option value="chr">a single character</option><option value="str">a string</option><option value="flt">a floating-point value</option><option value="nl">a newline</option></select></td></tr>
      <tr><td class="match-term"><code>%g</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">a decimal integer</option><option value="chr">a single character</option><option value="str">a string</option><option value="flt">a floating-point value</option><option value="nl">a newline</option></select></td></tr>
      <tr><td class="match-term"><code>\\n</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">a decimal integer</option><option value="chr">a single character</option><option value="str">a string</option><option value="flt">a floating-point value</option><option value="nl">a newline</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-ph','fb-match-ph',['int','chr','str','flt','nl'])">Check</button>
    <div class="fb" id="fb-match-ph"></div>
  </div>
</section>

<!-- ===================================================================
     PRINTF LAB
     =================================================================== -->
<section class="topic" id="r01-printflab">
  <h2>printf Lab</h2>
  <div class="concept">Edit the format string and the arguments and see what lands on the terminal.
  Handles <code>%d %c %s %g %%</code> and <code>\\n \\t \\\\</code>.</div>

  <div class="card">
    <div class="toolbar" style="align-items:flex-start">
      <div style="flex:1;min-width:260px">
        <label class="muted">format string</label>
        <input type="text" id="pf-fmt" value="x is %d and its ASCII char is %c\\n" oninput="renderPrintf()">
      </div>
      <div style="flex:1;min-width:200px">
        <label class="muted">arguments (comma separated)</label>
        <input type="text" id="pf-args" value="65, 65" oninput="renderPrintf()">
      </div>
    </div>
    <div class="toolbar">
      <button class="btn small ghost" onclick="pfPreset('%d vs %c\\\\n','65, 65')">65 as %d vs %c</button>
      <button class="btn small ghost" onclick="pfPreset('%s has %d chars\\\\n','hello, 5')">string + int</button>
      <button class="btn small ghost" onclick="pfPreset('a\\\\tb\\\\tc\\\\n','')">tabs</button>
      <button class="btn small ghost" onclick="pfPreset('%d%% done\\\\n','50')">literal percent</button>
      <button class="btn small ghost" onclick="pfPreset('%d and %d\\\\n','7')">too few args</button>
    </div>
    <h4>terminal output</h4>
    <pre id="pf-out" style="min-height:70px"></pre>
    <div class="step-desc" id="pf-note"></div>
    <p class="muted">Arguments are read as numbers when they look numeric, otherwise as strings. A
    <code>%c</code> given a number prints that ASCII character; a <code>%d</code> given a number prints the
    number itself.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does <code>printf("%c%c%c", 67, 79, 77);</code> print?</div>
      <button class="opt" data-i="0"><code>67 79 77</code></button>
      <button class="opt" data-i="1"><code>COM</code></button>
      <button class="opt" data-i="2"><code>%c%c%c</code></button>
      <button class="opt" data-i="3">nothing — the types are wrong</button>
      <div class="fb"><b><code>COM</code>.</b> 67, 79 and 77 are the ASCII codes for C, O and M.
      <code>%c</code> asks for the <i>character</i> that a numeric encoding stands for. Try it in the lab
      above.</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     3 — CONDITIONALS (16.3)
     =================================================================== -->
<section class="topic" id="r01-cond">
  <h2>Reading 01 &middot; Part 3 — Conditionals and Booleans (&sect;16.3)</h2>

  <div class="concept">The book's headline: <b>"C doesn't provide a Boolean type with true or false values."</b>
  C uses plain <b>integers</b> as Boolean values in conditionals.</div>

  <div class="card">
    <h3 style="margin-top:0">The rule</h3>
    <table class="cmp">
      <tr><th>Integer expression</th><th>Evaluates to</th></tr>
      <tr><td><code>0</code></td><td><b>false</b></td></tr>
      <tr><td>nonzero — any positive <b>or negative</b> value</td><td><b>true</b></td></tr>
    </table>
    <p class="muted"><code>-1</code>, <code>42</code> and <code>'a'</code> are all true. Only <code>0</code>
    is false. This is why <code>if (x = 5)</code> — an assignment, not a comparison — silently runs the
    <code>if</code> body: the assignment's value is 5, which is nonzero, which is true.</p>
<pre><span class="ty">int</span> x = <span class="nm">0</span>;
<span class="kw">if</span> (x) { <span class="cm">/* skipped: 0 is false */</span> }
<span class="kw">if</span> (!x) { <span class="cm">/* runs: !0 is true */</span> }
<span class="kw">if</span> (-<span class="nm">3</span>) { <span class="cm">/* runs: nonzero is true, negative counts */</span> }</pre>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Short-circuit evaluation</h3>
    <p>C "stops evaluating a logical expression as soon as the result is known."</p>
    <table class="cmp">
      <tr><th>Operator</th><th>Stops at</th><th>Because</th></tr>
      <tr><td><code>&amp;&amp;</code></td><td>the first <b>false</b> operand</td><td>one false makes the whole AND false — the rest cannot change it</td></tr>
      <tr><td><code>||</code></td><td>the first <b>true</b> operand</td><td>one true makes the whole OR true</td></tr>
    </table>
<pre><span class="cm">// the classic guard &mdash; order matters</span>
<span class="kw">if</span> (i &lt; size &amp;&amp; arr[i] == <span class="nm">0</span>) { ... }
<span class="cm">// if i &lt; size is false, arr[i] is NEVER evaluated, so the</span>
<span class="cm">// out-of-bounds read never happens. Swap the two operands</span>
<span class="cm">// and the guard stops protecting you.</span></pre>
    <div class="warn"><b>Short-circuiting is not just an optimization.</b> Because the second operand may
    never run, any side effect in it (an <code>i++</code>, a function call) may never happen either. That is
    a feature when you are guarding a pointer or an index, and a bug when you were relying on the side
    effect.</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Parentheses</h3>
    <p>The book advises: <b>"it's always best to use parentheses around complex Boolean expressions to make
    them easier to read."</b> That is the whole justification — readability and fewer mistakes. Parentheses
    do <i>not</i> make code faster, are not required by C any more than by Java, and do <b>not</b> disable
    short-circuiting.</p>
<pre><span class="kw">if</span> (a &lt; b &amp;&amp; b &lt; c || d)        <span class="cm">// legal, but what binds first?</span>
<span class="kw">if</span> (((a &lt; b) &amp;&amp; (b &lt; c)) || d)  <span class="cm">// same meaning, no guessing</span></pre>
  </div>

  <h3>Quick checks</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What does this print?
        <pre style="margin-top:8px"><span class="ty">int</span> i = <span class="nm">0</span>;
<span class="kw">if</span> (<span class="nm">0</span> &amp;&amp; i++) { }
<span class="fn">printf</span>(<span class="st">"%d"</span>, i);</pre></div>
      <button class="opt" data-i="0">1</button>
      <button class="opt" data-i="1">2</button>
      <button class="opt" data-i="2">0</button>
      <button class="opt" data-i="3">undefined</button>
      <div class="fb"><b>0.</b> The left operand is <code>0</code> (false), so the whole <code>&amp;&amp;</code>
      is already known to be false and <code>i++</code> is <b>never evaluated</b>. The increment simply does
      not happen.</div>
    </div>
    <div class="q" data-tf="T" style="margin-top:16px">
      <div class="prompt"><span class="tag">True / False</span><code>if (-5)</code> executes its body.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True. The rule is <b>zero is false, nonzero is true</b> — and "nonzero" explicitly
      includes negative values.</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     4 — ARRAYS (16.5)
     =================================================================== -->
<section class="topic" id="r01-arrays">
  <h2>Reading 01 &middot; Part 4 — Arrays (&sect;16.5)</h2>

  <div class="concept">C arrays are a contiguous block of memory and <b>nothing else</b>. No length field, no
  bounds checking, no exception. <b>"In C, it's up to the programmer to ensure that their code uses only
  valid index values when indexing into arrays."</b></div>

  <h3>Declaring</h3>
  <div class="card">
<pre><span class="ty">int</span> nums[<span class="nm">10</span>];        <span class="cm">// 10 ints, statically allocated. THIS is the C syntax.</span>

<span class="cm">// none of these are C:</span>
<span class="cm">// int[] nums = new int[10];   &larr; Java</span>
<span class="cm">// array&lt;int&gt; nums(10);        &larr; C++</span>
<span class="cm">// int nums = [10];            &larr; not a thing</span></pre>
    <p class="muted">Note the brackets go <b>after the variable name</b> in C, not after the type as in Java.</p>
  </div>

  <h3>Out of bounds</h3>
  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Java</th><th>C</th></tr>
      <tr><td><code>arr[10]</code> on a size-10 array</td><td>throws <code>ArrayIndexOutOfBoundsException</code></td><td><b>undefined behavior</b></td></tr>
      <tr><td>When you find out</td><td>immediately, at run time</td><td>maybe never; maybe much later, somewhere else</td></tr>
      <tr><td>Who checks</td><td>the runtime</td><td><b>you</b></td></tr>
    </table>
    <p>The book spells out what "undefined" means in practice: running such code
    <b>"can lead to unexpected program behavior (and the behavior might differ from run to run). It can lead
    to your program crashing, it can change another variable's value, or it might have no effect on your
    program's behavior."</b></p>
    <div class="warn"><b>Read the answer options carefully.</b> "The program always crashes" and "the
    compiler catches the error" are both wrong for the same reason: <i>undefined</i> means no guarantee at
    all — including no guarantee that anything visibly bad happens. A bug that sometimes does nothing is
    worse than one that always crashes.</div>
  </div>

  <h3>Passing arrays to functions</h3>
  <div class="card">
<pre><span class="ty">void</span> <span class="fn">test</span>(<span class="ty">int</span> a[], <span class="ty">int</span> size) {   <span class="cm">// a[] &mdash; an array of ANY capacity</span>
    a[<span class="nm">3</span>] = <span class="nm">8</span>;                     <span class="cm">// writes into the CALLER's array</span>
}

<span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {
    <span class="ty">int</span> arr[<span class="nm">5</span>] = {<span class="nm">0</span>,<span class="nm">0</span>,<span class="nm">0</span>,<span class="nm">0</span>,<span class="nm">0</span>};
    <span class="fn">test</span>(arr, <span class="nm">5</span>);
    <span class="fn">printf</span>(<span class="st">"%d\\n"</span>, arr[<span class="nm">3</span>]);      <span class="cm">// 8  &mdash; the change persisted</span>
}</pre>
    <p>The book's mechanism: <b>"an array parameter gets the <i>value of the array's base address</i>. This
    behavior implies that when a function modifies the elements of an array that was passed as a parameter,
    the changes <i>will</i> persist when the function returns."</b></p>
    <p class="muted">So <code>a</code> and <code>arr</code> are two different variables holding the
    <b>same address</b> — they refer to the same memory. C is still strictly pass-by-value; what gets copied
    is the address, not the elements. (That is why "arrays are passed by reference in C" is a tempting but
    imprecise answer — C has no reference parameters. The precise statement is that both names refer to the
    same memory.)</p>
    <div class="concept"><b>Why the extra <code>size</code> parameter?</b> Straight from the book:
    <b>"Because there is no way to get an array's size or capacity just from the array variable, functions
    that are passed arrays almost always also have a second parameter that specifies the array's size."</b>
    <code>a[]</code> carries no length with it, and there is no <code>arr.length</code> in C.</div>
  </div>

  <h3>Quick check</h3>
  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Inside <code>void f(int a[], int size)</code>, <code>sizeof(a)</code> tells you how many bytes the caller's array occupies.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">No — the parameter only holds a base address, so <code>sizeof</code> measures the
      address, not the array. This is exactly why the <code>size</code> parameter has to be there.</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     ARRAY LAB
     =================================================================== -->
<section class="topic" id="r01-arraylab">
  <h2>Array Lab</h2>
  <div class="concept">Step through <code>test(arr, 5)</code> and watch why a write inside the function
  survives the return — then step off the end of the array and see what "undefined" actually touches.</div>

  <div class="card">
    <div class="toolbar">
      <label class="muted">Scenario:</label>
      <select id="ar-mode" onchange="resetArr()">
        <option value="ok">test(arr, 5) writes a[3] = 8</option>
        <option value="oob">main writes arr[5] = 99 &nbsp;(out of bounds)</option>
      </select>
      <button class="btn small ghost" onclick="stepArr(-1)">&larr; Back</button>
      <button class="btn small ghost" onclick="stepArr(1)">Next &rarr;</button>
      <button class="btn small ghost" onclick="resetArr()">Reset</button>
      <span class="muted" id="ar-count"></span>
    </div>

    <pre id="ar-code" style="min-height:96px"></pre>

    <h4>memory</h4>
    <div class="fdbox">
      <div id="ar-frames"></div>
      <div class="muted" style="margin:14px 0 4px">the array itself, at address <code>0x7ffd00</code>:</div>
      <div class="strip" id="ar-strip"></div>
      <div class="legend">
        <span class="l-chr">inside the array</span>
        <span class="l-nul">just written</span>
        <span class="l-junk">NOT part of the array</span>
      </div>
    </div>
    <div class="step-desc" id="ar-desc"></div>
  </div>
</section>

<!-- ===================================================================
     ASSIGNMENT Q&A
     =================================================================== -->
<section class="topic" id="r01-quiz">
  <h2>Reading Assignment 01 &middot; every question, graded</h2>
  <p class="muted">The exact questions from Q1.1, Q2.1, Q3.1 and Q4.1. Answer them cold first — the
  explanation is where the learning is.</p>

  <h3>Q1.1 &middot; Getting started (&sect;16.1)</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q1</span>What is the conventional file extension for a C source code file?</div>
      <button class="opt" data-i="0"><code>.java</code></button>
      <button class="opt" data-i="1"><code>.class</code></button>
      <button class="opt" data-i="2"><code>.c</code></button>
      <button class="opt" data-i="3"><code>.exe</code></button>
      <div class="fb"><b><code>.c</code></b> for source. <code>.class</code> is compiled Java bytecode and
      <code>.exe</code> is a Windows executable — both are <i>outputs</i>, not source.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>How are libraries included in C?</div>
      <button class="opt" data-i="0">Using <code>import</code></button>
      <button class="opt" data-i="1">Inside the main function</button>
      <button class="opt" data-i="2">Using <code>#include</code> at the top of the file</button>
      <button class="opt" data-i="3">Automatically by the runtime system</button>
      <div class="fb"><b><code>#include</code> at the top of the file</b>, outside any function body.
      <code>import</code> is Java's keyword.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>Which statement about the <code>main</code> function is true for C?</div>
      <button class="opt" data-i="0"><code>main</code> must be a void function</button>
      <button class="opt" data-i="1">There can be multiple <code>main</code> functions</button>
      <button class="opt" data-i="2"><code>main</code> must return an <code>int</code></button>
      <button class="opt" data-i="3"><code>main</code> must be part of a class</button>
      <div class="fb"><b><code>main</code> must return an <code>int</code></b> — the program's exit status.
      There is exactly one <code>main</code>, and C has no classes at all.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>Which statement best describes the programming paradigms of Java and C?</div>
      <button class="opt" data-i="0">Both are purely object-oriented</button>
      <button class="opt" data-i="1">Both are purely procedural</button>
      <button class="opt" data-i="2">Java is object-oriented; C is procedural</button>
      <button class="opt" data-i="3">Java is procedural; C is object-oriented</button>
      <div class="fb"><b>Java is object-oriented; C is procedural.</b> The book: "Java is a purely object
      oriented language... C is a purely imperative and procedural language, and thus there are no classes
      in C."</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>Which of the following is a valid C variable declaration?</div>
      <button class="opt" data-i="0"><code>x int;</code></button>
      <button class="opt" data-i="1"><code>int x;</code></button>
      <button class="opt" data-i="2"><code>declare int x;</code></button>
      <button class="opt" data-i="3"><code>x = int;</code></button>
      <div class="fb"><b><code>int x;</code></b> — the form is <code>type_name variable_name;</code>, type
      first. Same as Java, which makes the three distractors easy to eliminate.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>What is the key difference between <code>'h'</code> and <code>"h"</code> in C?</div>
      <button class="opt" data-i="0">There is no difference</button>
      <button class="opt" data-i="1"><code>'h'</code> is a string, <code>"h"</code> is a <code>char</code></button>
      <button class="opt" data-i="2"><code>'h'</code> is a char, <code>"h"</code> is a string literal</button>
      <button class="opt" data-i="3">Both represent integers</button>
      <div class="fb"><b><code>'h'</code> is a char, <code>"h"</code> is a string literal.</b> One byte
      (value 104) versus a two-byte array holding <code>'h'</code> and <code>'\\0'</code>. Option 2 has the
      pairing backwards — read those carefully.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span>What is the result of the expression <code>11 / 2</code> in C?</div>
      <button class="opt" data-i="0">5.5</button>
      <button class="opt" data-i="1">5</button>
      <button class="opt" data-i="2">6</button>
      <button class="opt" data-i="3">A compiler error</button>
      <div class="fb"><b>5.</b> Both operands are <code>int</code>, so <code>/</code> is integer division: the
      result is an <code>int</code>, truncated — not rounded, so not 6.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q8</span>What is the value of <code>y</code> after this code?
        <pre style="margin-top:8px"><span class="ty">int</span> x = <span class="nm">6</span>;
<span class="ty">int</span> y = x++ + <span class="nm">2</span>;</pre></div>
      <button class="opt" data-i="0">6</button>
      <button class="opt" data-i="1">7</button>
      <button class="opt" data-i="2">8</button>
      <button class="opt" data-i="3">9</button>
      <div class="fb"><b>8.</b> <code>x++</code> is <i>post</i>-increment: the expression uses the old value
      <b>6</b>, so <code>y = 6 + 2 = 8</code>, and only afterwards does <code>x</code> become 7. (With
      <code>++x</code> you would get <code>y = 9</code>.)</div>
    </div>
  </div>

  <h3>Q2.1 &middot; Input / Output (&sect;16.2)</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What does a format string do in <code>printf</code>?</div>
      <button class="opt" data-i="0">Specifies how many variables exist</button>
      <button class="opt" data-i="1">Defines how output should be formatted</button>
      <button class="opt" data-i="2">Stores user input</button>
      <button class="opt" data-i="3">Converts strings to integers</button>
      <div class="fb"><b>Defines how output should be formatted</b> — literal text plus escape sequences plus
      placeholders for the values that follow.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>What character begins a placeholder in a <code>printf</code> format string?</div>
      <button class="opt" data-i="0"><code>\\</code></button>
      <button class="opt" data-i="1"><code>$</code></button>
      <button class="opt" data-i="2"><code>%</code></button>
      <button class="opt" data-i="3"><code>#</code></button>
      <div class="fb"><b><code>%</code></b>. The backslash is the <i>escape</i> character (<code>\\n</code>,
      <code>\\t</code>) — a different job.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q3</span>Which placeholder should be used to print an integer value?</div>
      <button class="opt" data-i="0"><code>%f</code></button>
      <button class="opt" data-i="1"><code>%g</code></button>
      <button class="opt" data-i="2"><code>%s</code></button>
      <button class="opt" data-i="3"><code>%d</code></button>
      <div class="fb"><b><code>%d</code></b> — d for <i>decimal</i>. <code>%f</code> and <code>%g</code> are
      floating point, <code>%s</code> is a string.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>Which placeholder is used to print a string in C?</div>
      <button class="opt" data-i="0"><code>%c</code></button>
      <button class="opt" data-i="1"><code>%d</code></button>
      <button class="opt" data-i="2"><code>%s</code></button>
      <button class="opt" data-i="3"><code>%g</code></button>
      <div class="fb"><b><code>%s</code></b>. Note <code>%c</code> is a single character — one char is not a
      string.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q5</span>Which escape sequence prints a newline?</div>
      <button class="opt" data-i="0"><code>\\t</code></button>
      <button class="opt" data-i="1"><code>\\b</code></button>
      <button class="opt" data-i="2"><code>\\n</code></button>
      <button class="opt" data-i="3"><code>\\r</code></button>
      <div class="fb"><b><code>\\n</code></b> — n for newline. <code>\\t</code> is a tab, <code>\\b</code>
      backspace, <code>\\r</code> carriage return.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>What does the <code>%c</code> placeholder print?</div>
      <button class="opt" data-i="0">A string</button>
      <button class="opt" data-i="1">A floating-point value</button>
      <button class="opt" data-i="2">A character corresponding to a numeric ASCII value</button>
      <button class="opt" data-i="3">A memory address</button>
      <div class="fb"><b>A character corresponding to a numeric ASCII value.</b> The book: "%c is useful when
      a programmer wants to print the ASCII character associated with a particular numeric encoding" —
      <code>printf("%c", 65)</code> prints <code>A</code>.</div>
    </div>
  </div>

  <h3>Q3.1 &middot; Conditionals (&sect;16.3)</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q1</span>Which statement is true about Boolean types in C?</div>
      <button class="opt" data-i="0">C has a built-in boolean type like Java</button>
      <button class="opt" data-i="1">C has true and false keywords by default</button>
      <button class="opt" data-i="2">C uses integers as Boolean values in conditionals</button>
      <button class="opt" data-i="3">C only allows Boolean expressions in if statements</button>
      <div class="fb"><b>C uses integers as Boolean values in conditionals.</b> "C doesn't provide a Boolean
      type with true or false values."</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>In C conditionals, what does the integer value 0 evaluate to?</div>
      <button class="opt" data-i="0">true</button>
      <button class="opt" data-i="1">false</button>
      <button class="opt" data-i="2">depends on the compiler</button>
      <button class="opt" data-i="3">depends on whether it is signed</button>
      <div class="fb"><b>false.</b> Zero is the one and only false value.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q3</span>In C conditionals, what does any nonzero integer evaluate to?</div>
      <button class="opt" data-i="0">true</button>
      <button class="opt" data-i="1">false</button>
      <button class="opt" data-i="2">only positive values are true</button>
      <button class="opt" data-i="3">only negative values are true</button>
      <div class="fb"><b>true</b> — "nonzero (any positive <i>or negative</i> value) evaluates to true."
      <code>-1</code> is true.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q4</span>What does "short-circuiting" mean for <code>&amp;&amp;</code> in C?</div>
      <button class="opt" data-i="0">Evaluation stops when the result is already known to be false</button>
      <button class="opt" data-i="1">Both operands are always evaluated</button>
      <button class="opt" data-i="2">The second operand is evaluated first</button>
      <button class="opt" data-i="3">Evaluation stops only if both operands are true</button>
      <div class="fb"><b>Evaluation stops when the result is already known to be false.</b> If the first
      operand of <code>&amp;&amp;</code> is false the answer must be false, so the second operand "need not
      be evaluated, and it is not evaluated."</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q5</span>Why does the text recommend parentheses around complex Boolean expressions?</div>
      <button class="opt" data-i="0">Parentheses make the program run faster</button>
      <button class="opt" data-i="1">Parentheses are required in C but not Java</button>
      <button class="opt" data-i="2">Parentheses prevent short-circuit evaluation</button>
      <button class="opt" data-i="3">Parentheses make expressions easier to read and less error-prone</button>
      <div class="fb"><b>Easier to read and less error-prone.</b> "It's always best to use parentheses around
      complex Boolean expressions to make them easier to read." They change nothing about speed, are not
      required, and do not disable short-circuiting.</div>
    </div>
  </div>

  <h3>Q4.1 &middot; Arrays (&sect;16.5)</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>Which is valid C syntax for declaring an array of 10 integers?</div>
      <button class="opt" data-i="0"><code>int[] nums = new int[10];</code></button>
      <button class="opt" data-i="1"><code>int nums[10];</code></button>
      <button class="opt" data-i="2"><code>array&lt;int&gt; nums(10);</code></button>
      <button class="opt" data-i="3"><code>int nums = [10];</code></button>
      <div class="fb"><b><code>int nums[10];</code></b> — brackets after the <i>name</i>. Option 0 is Java,
      option 2 is C++.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>Which statement best describes the difference between Java and C when accessing invalid array indices?</div>
      <button class="opt" data-i="0">Both Java and C throw runtime exceptions</button>
      <button class="opt" data-i="1">Java allows invalid indices, but C does not</button>
      <button class="opt" data-i="2">Java throws an exception, while C has undefined behavior</button>
      <button class="opt" data-i="3">Both languages prevent compilation if indices are invalid</button>
      <div class="fb"><b>Java throws an exception, while C has undefined behavior.</b> Java raises
      <code>ArrayIndexOutOfBoundsException</code>; C has no exceptions and does no bounds checking.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>What happens in C if you access an invalid array index (like <code>array[10]</code> when size is 10)?</div>
      <button class="opt" data-i="0">The compiler always catches the error</button>
      <button class="opt" data-i="1">The program always crashes immediately</button>
      <button class="opt" data-i="2">The behavior is undefined and could vary across runs</button>
      <button class="opt" data-i="3">C throws an exception</button>
      <div class="fb"><b>Undefined, and it could vary across runs.</b> Note the two words doing the work in
      the wrong options: <i>always</i> catches and <i>always</i> crashes. Undefined behavior gives no
      guarantees in either direction.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>What happens when this code is compiled and run in C?
        <pre style="margin-top:8px"><span class="ty">int</span> array[<span class="nm">10</span>];
array[<span class="nm">10</span>] = <span class="nm">100</span>;</pre></div>
      <button class="opt" data-i="0">The compiler generates an error</button>
      <button class="opt" data-i="1">The program always crashes</button>
      <button class="opt" data-i="2">The program behavior is undefined</button>
      <button class="opt" data-i="3">The assignment is ignored safely</button>
      <div class="fb"><b>Undefined.</b> Valid indices for <code>int array[10]</code> are <b>0 through 9</b>;
      index 10 is one past the end. It "can lead to your program crashing, it can change another variable's
      value, or it might have no effect" — the write happens, it just lands somewhere it shouldn't.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q5</span>Who is responsible for ensuring array indices are valid in C?</div>
      <button class="opt" data-i="0">The compiler</button>
      <button class="opt" data-i="1">The operating system</button>
      <button class="opt" data-i="2">The runtime system</button>
      <button class="opt" data-i="3">The programmer</button>
      <div class="fb"><b>The programmer.</b> "As a C programmer, it's up to you to ensure that your array
      accesses refer to valid positions!" (C has no runtime system to do it for you.)</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>In <code>void print_array(int arr[], int size);</code>, what does <code>arr[]</code> indicate?</div>
      <button class="opt" data-i="0"><code>arr</code> is a single integer</button>
      <button class="opt" data-i="1"><code>arr</code> is an array of fixed size</button>
      <button class="opt" data-i="2"><code>arr</code> is an array of any capacity</button>
      <button class="opt" data-i="3"><code>arr</code> is passed by reference</button>
      <div class="fb"><b>An array of any capacity.</b> The empty brackets carry no size — which is exactly
      why the separate <code>size</code> parameter has to exist.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span>Given <code>void test(int a[], int size) { a[3] = 8; }</code> — what happens when this function is called with an array argument?</div>
      <button class="opt" data-i="0">Only the local copy of the array is changed</button>
      <button class="opt" data-i="1">The original array's element at index 3 is changed</button>
      <button class="opt" data-i="2">The program crashes</button>
      <button class="opt" data-i="3">Nothing happens unless <code>size</code> &gt; 3</button>
      <div class="fb"><b>The original array's element at index 3 is changed.</b> No copy of the elements is
      ever made — "the changes <i>will</i> persist when the function returns." (Option 3 is a trap: the
      function ignores <code>size</code> entirely, so nothing stops the write.)</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q8</span>Why does modifying <code>a[3]</code> inside <code>test</code> affect <code>arr[3]</code> in <code>main</code>?</div>
      <button class="opt" data-i="0">Arrays are passed by reference in C</button>
      <button class="opt" data-i="1">Arrays are global by default</button>
      <button class="opt" data-i="2">Both <code>a</code> and <code>arr</code> refer to the same memory</button>
      <button class="opt" data-i="3">The compiler optimizes the code</button>
      <div class="fb"><b>Both refer to the same memory.</b> The parameter received a copy of the array's
      <i>base address</i>, so both names point at the same block. "Passed by reference" is the tempting
      answer, but C has no reference parameters — it copies the address, which is still pass-by-value.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q9</span>Why do C functions that accept arrays usually also take a size parameter?</div>
      <button class="opt" data-i="0">Because arrays cannot be indexed without size</button>
      <button class="opt" data-i="1">Because <code>printf</code> requires size</button>
      <button class="opt" data-i="2">Because the function cannot determine the array's size/capacity from the array variable alone</button>
      <button class="opt" data-i="3">Because arrays in C can store different types</button>
      <div class="fb"><b>The function cannot determine the size from the array variable alone.</b> "There is
      no way to get an array's size or capacity just from the array variable." There is no
      <code>arr.length</code> in C.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Answer key at a glance</h3>
    <div class="two">
      <div>
        <h4>Q1.1 — Getting started</h4>
        <ol class="muted" style="line-height:1.8;font-size:13px">
          <li><code>.c</code></li>
          <li><code>#include</code> at the top of the file</li>
          <li><code>main</code> must return an <code>int</code></li>
          <li>Java is object-oriented; C is procedural</li>
          <li><code>int x;</code></li>
          <li><code>'h'</code> is a char, <code>"h"</code> is a string literal</li>
          <li>5</li>
          <li>8</li>
        </ol>
        <h4>Q2.1 — Input / Output</h4>
        <ol class="muted" style="line-height:1.8;font-size:13px">
          <li>Defines how output should be formatted</li>
          <li><code>%</code></li>
          <li><code>%d</code></li>
          <li><code>%s</code></li>
          <li><code>\\n</code></li>
          <li>A character corresponding to a numeric ASCII value</li>
        </ol>
      </div>
      <div>
        <h4>Q3.1 — Conditionals</h4>
        <ol class="muted" style="line-height:1.8;font-size:13px">
          <li>C uses integers as Boolean values in conditionals</li>
          <li>false</li>
          <li>true</li>
          <li>Evaluation stops when the result is already known to be false</li>
          <li>Parentheses make expressions easier to read and less error-prone</li>
        </ol>
        <h4>Q4.1 — Arrays</h4>
        <ol class="muted" style="line-height:1.8;font-size:13px">
          <li><code>int nums[10];</code></li>
          <li>Java throws an exception, while C has undefined behavior</li>
          <li>The behavior is undefined and could vary across runs</li>
          <li>The program behavior is undefined</li>
          <li>The programmer</li>
          <li><code>arr</code> is an array of any capacity</li>
          <li>The original array's element at index 3 is changed</li>
          <li>Both <code>a</code> and <code>arr</code> refer to the same memory</li>
          <li>Because the function cannot determine the array's size/capacity from the array variable alone</li>
        </ol>
      </div>
    </div>
  </div>
</section>

<!-- ===================================================================
     CODE WRITING
     =================================================================== -->
<section class="topic" id="r01-code">
  <h2>Write it yourself</h2>
  <p class="muted">Type first, reveal second.</p>

  <div class="card">
    <h3 style="margin-top:0">1 &middot; A complete C program</h3>
    <p>Write a full C program that declares <code>int x = 11;</code> and <code>int y = 2;</code> and prints
    <code>11 / 2 = 5 remainder 1</code>.</p>
    <textarea placeholder="#include ..."></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="cm">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {
    <span class="ty">int</span> x = <span class="nm">11</span>;
    <span class="ty">int</span> y = <span class="nm">2</span>;
    <span class="fn">printf</span>(<span class="st">"%d / %d = %d remainder %d\\n"</span>, x, y, x / y, x % y);
    <span class="kw">return</span> <span class="nm">0</span>;
}</pre>
      <p class="muted">Four things the grader looks for: the <code>#include</code> at the top, the
      <code>int</code> return type on <code>main</code>, a <code>%d</code> placeholder for every value, and
      <code>return 0;</code>. Note the <code>%</code> in <code>x % y</code> is the remainder
      <i>operator</i> — it sits outside the quotes, so it is not a placeholder.</p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">2 &middot; Print a letter from its ASCII code</h3>
    <p>Print <code>65 is the code for A</code> using a single <code>printf</code> and the value
    <code>65</code> only once... then again passing it twice.</p>
    <textarea placeholder="printf(...);"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="ty">int</span> code = <span class="nm">65</span>;
<span class="fn">printf</span>(<span class="st">"%d is the code for %c\\n"</span>, code, code);
<span class="cm">// 65 is the code for A</span>
<span class="cm">// same value, two placeholders, two interpretations</span></pre>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">3 &middot; A safe array loop</h3>
    <p>Write <code>sum_array(int arr[], int size)</code> that returns the sum of the elements — and cannot
    run off the end.</p>
    <textarea placeholder="int sum_array(int arr[], int size) { ... }"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="ty">int</span> <span class="fn">sum_array</span>(<span class="ty">int</span> arr[], <span class="ty">int</span> size) {
    <span class="ty">int</span> total = <span class="nm">0</span>;
    <span class="ty">int</span> i;
    <span class="kw">for</span> (i = <span class="nm">0</span>; i &lt; size; i++) {   <span class="cm">// i &lt; size, NOT i &lt;= size</span>
        total += arr[i];
    }
    <span class="kw">return</span> total;
}</pre>
      <p class="muted">The <code>size</code> parameter is not decoration — without it the function has no way
      to know where the array ends, and <code>i &lt;= size</code> would read one element past it.</p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">4 &middot; Use short-circuiting as a guard</h3>
    <p>Write a condition that safely checks whether <code>arr[i]</code> is zero, where <code>i</code> might
    be out of range. Then explain why the operand order matters.</p>
    <textarea placeholder="if ( ... ) { ... }"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="kw">if</span> (i &gt;= <span class="nm">0</span> &amp;&amp; i &lt; size &amp;&amp; arr[i] == <span class="nm">0</span>) { ... }</pre>
      <p class="muted">Order matters because <code>&amp;&amp;</code> stops at the first false operand. The
      range checks come first, so if <code>i</code> is invalid the expression is already known to be false
      and <code>arr[i]</code> is never evaluated. Write it as
      <code>arr[i] == 0 &amp;&amp; i &lt; size</code> and the out-of-bounds read happens before the guard
      ever runs.</p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">5 &middot; Trace it</h3>
    <p>What are <code>x</code> and <code>y</code> after each pair? Write your answers, then check.</p>
<pre><span class="cm">a)</span> <span class="ty">int</span> x = <span class="nm">6</span>;  <span class="ty">int</span> y = x++ + <span class="nm">2</span>;
<span class="cm">b)</span> <span class="ty">int</span> x = <span class="nm">6</span>;  <span class="ty">int</span> y = ++x + <span class="nm">2</span>;
<span class="cm">c)</span> <span class="ty">int</span> x = <span class="nm">9</span>;  <span class="ty">int</span> y = x / <span class="nm">2</span> * <span class="nm">2</span>;
<span class="cm">d)</span> <span class="ty">int</span> x = <span class="nm">0</span>;  <span class="ty">int</span> y = (x &amp;&amp; ++x) + <span class="nm">1</span>;</pre>
    <textarea placeholder="a) x = ?, y = ?  ..."></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
      <table class="cmp">
        <tr><th></th><th>x</th><th>y</th><th>why</th></tr>
        <tr><td>a</td><td>7</td><td><b>8</b></td><td>post-increment hands over the old 6</td></tr>
        <tr><td>b</td><td>7</td><td><b>9</b></td><td>pre-increment hands over the new 7</td></tr>
        <tr><td>c</td><td>9</td><td><b>8</b></td><td>9 / 2 truncates to 4, then 4 &times; 2 = 8</td></tr>
        <tr><td>d</td><td><b>0</b></td><td>1</td><td><code>x</code> is 0 &rarr; false, so <code>++x</code> is short-circuited away and never runs</td></tr>
      </table>
    </div>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET 1a — integer division
   ============================================================ */
function divPreset(a, b) {
  document.getElementById('op-a').value = a;
  document.getElementById('op-b').value = b;
  renderDiv();
}
function renderDiv() {
  const a = parseInt(document.getElementById('op-a').value, 10);
  const b = parseInt(document.getElementById('op-b').value, 10);
  const box = document.getElementById('op-out');
  if (isNaN(a) || isNaN(b)) { box.innerHTML = '<span class="muted">enter two integers</span>'; return; }
  if (b === 0) {
    box.innerHTML = '<b style="color:var(--red)">Division by zero.</b> In C this is <b>undefined behavior</b> for integers &mdash; typically a crash (SIGFPE), not an exception.';
    return;
  }
  const trunc = Math.trunc(a / b);
  const rem = a - trunc * b;
  const real = a / b;
  const exact = Number.isInteger(real);
  box.innerHTML =
    row('a / b', '<b>' + trunc + '</b>', 'int / int &rarr; integer division, truncated toward zero') +
    row('a % b', '<b>' + rem + '</b>', 'the remainder that division threw away') +
    row('a / (double)b', '<b>' + (Math.round(real * 1e6) / 1e6) + '</b>', 'one operand is a double &rarr; real division') +
    '<div class="step-desc" style="margin-top:12px">' +
      (exact
        ? 'This one divides evenly, so truncation is invisible. Try <b>11 / 2</b> to see the difference.'
        : '<b>' + a + ' / ' + b + '</b> is really <b>' + (Math.round(real * 1e6) / 1e6) + '</b>, but C gives you <b>' +
          trunc + '</b>. It <b>truncates</b> &mdash; it does not round, so the answer is never ' +
          (real > 0 ? Math.ceil(real) : Math.floor(real)) + '.') +
    '</div>';
}
function row(label, val, note) {
  return '<div class="fdrow"><div class="fdtag fd1">' + label + '</div><div class="arrow">=</div>' +
    '<div class="dest changed">' + val + ' &nbsp;<span class="muted" style="font-family:inherit">' + note + '</span></div></div>';
}

/* ============================================================
   WIDGET 1b — increment stepper
   ============================================================ */
let incStep = 0;
function resetInc() { incStep = 0; renderInc(); }
function stepInc(d) {
  const max = incPlan().length - 1;
  incStep = Math.max(0, Math.min(max, incStep + d));
  renderInc();
}
function incPlan() {
  const mode = document.getElementById('inc-expr').value;
  let x0 = parseInt(document.getElementById('inc-x').value, 10);
  if (isNaN(x0)) x0 = 0;
  if (mode === 'post') {
    return [
      { x: x0, y: '?', d: 'Start. <b>x = ' + x0 + '</b>, y not yet assigned.' },
      { x: x0, y: '?', d: 'Evaluate <b>x++</b>. Post-increment hands the expression the <b>old</b> value <b>' + x0 + '</b>.' },
      { x: x0 + 1, y: '?', d: 'The side effect fires: <b>x becomes ' + (x0 + 1) + '</b>. The value already handed over is still ' + x0 + '.' },
      { x: x0 + 1, y: x0 + 2, d: 'Add 2 to the handed-over value: <b>y = ' + x0 + ' + 2 = ' + (x0 + 2) + '</b>. Final: x = ' + (x0 + 1) + ', y = ' + (x0 + 2) + '.' }
    ];
  }
  if (mode === 'pre') {
    return [
      { x: x0, y: '?', d: 'Start. <b>x = ' + x0 + '</b>, y not yet assigned.' },
      { x: x0 + 1, y: '?', d: 'Evaluate <b>++x</b>. Pre-increment updates first: <b>x becomes ' + (x0 + 1) + '</b>.' },
      { x: x0 + 1, y: '?', d: 'Then it hands the expression the <b>new</b> value <b>' + (x0 + 1) + '</b>.' },
      { x: x0 + 1, y: x0 + 3, d: 'Add 2: <b>y = ' + (x0 + 1) + ' + 2 = ' + (x0 + 3) + '</b>. Final: x = ' + (x0 + 1) + ', y = ' + (x0 + 3) + '.' }
    ];
  }
  return [
    { x: x0, y: '?', d: 'Start. <b>x = ' + x0 + '</b>.' },
    { x: x0 + 1, y: '?', d: 'First <b>x++</b> hands over <b>' + x0 + '</b>, then x becomes ' + (x0 + 1) + '.' },
    { x: x0 + 2, y: '?', d: 'Second <b>x++</b> hands over <b>' + (x0 + 1) + '</b>, then x becomes ' + (x0 + 2) + '.' },
    { x: x0 + 2, y: 2 * x0 + 1, d: '<b>y = ' + x0 + ' + ' + (x0 + 1) + ' = ' + (2 * x0 + 1) + '</b> on a typical compiler &mdash; but modifying x twice in one expression is <b style="color:var(--amber)">undefined behavior</b> in C. Never write this; it is here so you recognize it.' }
  ];
}
function renderInc() {
  const mode = document.getElementById('inc-expr').value;
  const src = mode === 'post' ? 'int y = x++ + 2;' : mode === 'pre' ? 'int y = ++x + 2;' : 'int y = x++ + x++;';
  const plan = incPlan();
  const s = plan[Math.min(incStep, plan.length - 1)];
  document.getElementById('inc-code').textContent =
    'int x = ' + (document.getElementById('inc-x').value || '0') + ';\n' + src;
  document.getElementById('inc-vx').textContent = s.x;
  document.getElementById('inc-vy').textContent = s.y;
  document.getElementById('inc-desc').innerHTML = s.d;
  document.getElementById('inc-count').textContent = 'step ' + (incStep + 1) + ' of ' + plan.length;
}

/* ============================================================
   WIDGET 2 — printf simulator
   ============================================================ */
function pfPreset(fmt, args) {
  document.getElementById('pf-fmt').value = fmt;
  document.getElementById('pf-args').value = args;
  renderPrintf();
}
function renderPrintf() {
  const fmt = document.getElementById('pf-fmt').value;
  const raw = document.getElementById('pf-args').value;
  const args = raw.split(',').map(s => s.trim()).filter(s => s.length);
  let ai = 0, out = '', notes = [], usedC = false, missing = false;

  for (let i = 0; i < fmt.length; i++) {
    const ch = fmt[i];
    if (ch === '\\' && i + 1 < fmt.length) {
      const n = fmt[i + 1];
      if (n === 'n') { out += '\n'; i++; continue; }
      if (n === 't') { out += '\t'; i++; continue; }
      if (n === '\\') { out += '\\'; i++; continue; }
      out += ch; continue;
    }
    if (ch === '%' && i + 1 < fmt.length) {
      const spec = fmt[i + 1];
      i++;
      if (spec === '%') { out += '%'; continue; }
      if ('dcsg'.indexOf(spec) === -1) { out += '%' + spec; notes.push('<code>%' + spec + '</code> is not one of the placeholders this section covers.'); continue; }
      if (ai >= args.length) { out += '(?)'; missing = true; continue; }
      const a = args[ai++];
      const num = Number(a);
      const isNum = a !== '' && !isNaN(num);
      if (spec === 'd') { out += isNum ? String(Math.trunc(num)) : '(?)'; if (!isNum) notes.push('<code>%d</code> got the non-numeric argument <b>' + esc(a) + '</b>.'); }
      else if (spec === 'c') {
        usedC = true;
        if (isNum) out += String.fromCharCode(Math.trunc(num));
        else out += a.charAt(0);
      }
      else if (spec === 's') out += a;
      else if (spec === 'g') out += isNum ? String(num) : '(?)';
      continue;
    }
    out += ch;
  }

  document.getElementById('pf-out').textContent = out === '' ? '(no output)' : out;
  if (missing) notes.push('<b style="color:var(--red)">Not enough arguments.</b> Real C would print whatever garbage happens to sit where the argument should have been &mdash; the compiler warns, but does not stop you.');
  if (ai < args.length) notes.push('<b>' + (args.length - ai) + '</b> extra argument(s) were ignored &mdash; there are more values than placeholders.');
  if (usedC) notes.push('A <code>%c</code> given a number printed the <b>ASCII character</b> for that code. The same number under <code>%d</code> would print as digits.');
  if (!notes.length) notes.push('Every placeholder was filled left to right from the argument list.');
  document.getElementById('pf-note').innerHTML = notes.join('<br><br>');
}
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ============================================================
   WIDGET 3 — array pass-by-base-address stepper
   ============================================================ */
let arrStep = 0;
function resetArr() { arrStep = 0; renderArr(); }
function stepArr(d) {
  const plan = arrPlan();
  arrStep = Math.max(0, Math.min(plan.length - 1, arrStep + d));
  renderArr();
}
function arrPlan() {
  const mode = document.getElementById('ar-mode').value;
  if (mode === 'ok') {
    return [
      { cells: [0, 0, 0, 0, 0], hot: -1, frames: [['main', 'arr', '0x7ffd00']],
        d: '<b>main</b> declares <code>int arr[5]</code>. The variable <code>arr</code> names a block of 5 ints starting at address <code>0x7ffd00</code>. Valid indices: <b>0&ndash;4</b>.' },
      { cells: [0, 0, 0, 0, 0], hot: -1, frames: [['main', 'arr', '0x7ffd00'], ['test', 'a', '0x7ffd00']],
        d: 'Calling <code>test(arr, 5)</code>. The parameter <code>a</code> receives a <b>copy of the base address</b> &mdash; not a copy of the 5 elements. Two variables, one block of memory.' },
      { cells: [0, 0, 0, 8, 0], hot: 3, frames: [['main', 'arr', '0x7ffd00'], ['test', 'a', '0x7ffd00']],
        d: '<code>a[3] = 8</code> resolves to "address 0x7ffd00, plus 3 ints" &mdash; which is the <b>same slot</b> <code>arr[3]</code> names. The write lands in the array owned by <b>main</b>.' },
      { cells: [0, 0, 0, 8, 0], hot: 3, frames: [['main', 'arr', '0x7ffd00']],
        d: '<code>test</code> returns and its frame disappears &mdash; but the array was never inside that frame. <code>arr[3]</code> is still <b>8</b>. This is why array modifications persist.' }
    ];
  }
  return [
    { cells: [0, 0, 0, 0, 0], hot: -1, extra: 7, frames: [['main', 'arr', '0x7ffd00'], ['main', 'lucky', '7']],
      d: '<b>main</b> has <code>int arr[5]</code> and, right after it, another variable <code>lucky = 7</code>. Valid indices for arr are <b>0&ndash;4</b>.' },
    { cells: [0, 0, 0, 0, 0], hot: -1, extra: 7, frames: [['main', 'arr', '0x7ffd00'], ['main', 'lucky', '7']],
      d: 'The program executes <code>arr[5] = 99;</code>. There is <b>no bounds check</b> &mdash; C computes "base + 5 ints" and writes there. No exception, no compiler error.' },
    { cells: [0, 0, 0, 0, 0], hot: -1, extra: 99, hotExtra: true, frames: [['main', 'arr', '0x7ffd00'], ['main', 'lucky', '99']],
      d: '<b>Undefined behavior.</b> In this layout the write landed on <code>lucky</code>, which silently became <b>99</b>. On another compiler, another machine, or another run it might crash instead &mdash; or appear to do nothing. That unpredictability <i>is</i> the definition.' }
  ];
}
function renderArr() {
  const mode = document.getElementById('ar-mode').value;
  const plan = arrPlan();
  const s = plan[Math.min(arrStep, plan.length - 1)];

  document.getElementById('ar-code').textContent = mode === 'ok'
    ? 'void test(int a[], int size) {\n    a[3] = 8;\n}\n\nint arr[5] = {0,0,0,0,0};\ntest(arr, 5);'
    : 'int arr[5] = {0,0,0,0,0};\nint lucky = 7;\n\narr[5] = 99;   /* index 5 does not exist */';

  document.getElementById('ar-frames').innerHTML = s.frames.map(f =>
    '<div class="fdrow"><div class="fdtag ' + (f[0] === 'main' ? 'fd1' : 'fd0') + '">' + f[0] + ' &middot; ' + f[1] + '</div>' +
    '<div class="arrow">holds</div><div class="dest' + (f[2].indexOf('0x') === 0 ? ' changed' : '') + '">' + f[2] + '</div></div>').join('');

  let html = '';
  for (let i = 0; i < s.cells.length; i++) {
    const cls = i === s.hot ? 'cell nul' : 'cell chr';
    html += '<div class="' + cls + '">' + s.cells[i] + '<span class="idx">[' + i + ']</span></div>';
  }
  if (s.extra !== undefined) {
    html += '<div class="cell junk' + (s.hotExtra ? ' read' : '') + '" style="border-style:dashed">' + s.extra +
      '<span class="idx">lucky</span></div>';
  }
  document.getElementById('ar-strip').innerHTML = html;
  document.getElementById('ar-desc').innerHTML = s.d;
  document.getElementById('ar-count').textContent = 'step ' + (arrStep + 1) + ' of ' + plan.length;
}

/* ============================================================
   INIT (called by the engine once everything is injected)
   ============================================================ */
function initR01() {
  renderDiv();
  resetInc();
  renderPrintf();
  resetArr();
}
