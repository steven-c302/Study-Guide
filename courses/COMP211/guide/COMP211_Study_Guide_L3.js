/* ============================================================
   LESSON 3 — CL03 IO Redirection and Strings (+ RD02).
   Injects into #l3. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l3').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l3-arrays')">1 &middot; Arrays &amp; #define</button>
  <button onclick="showTopic(this,'l3-redir')">2 &middot; I/O Redirection</button>
  <button onclick="showTopic(this,'l3-pipes')">3 &middot; Pipes</button>
  <button onclick="showTopic(this,'l3-strings')">4 &middot; Strings</button>
  <button onclick="showTopic(this,'l3-rd02')">RD02 Self-Check</button>
</nav>
<main>

<!-- ============ ARRAYS & #define ============ -->
<section class="topic active" id="l3-arrays">
  <h2>Lesson 3 &middot; Arrays and <code>#define</code></h2>

  <div class="concept">Arrays in C are a fixed-size, contiguous block of memory holding elements of the same
  type. Unlike Java, <b>a C array does not know its own size</b> &mdash; there is no <code>.length</code>.
  The programmer must track the size separately, often with a <code>#define</code>d constant.</div>

  <h3>Digit-counting program</h3>
  <div class="card">
    <p>A classic example: read characters until EOF, and count how many times each digit <code>'0'&ndash;'9'</code>
    appears.</p>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>
<span class="pp">#define</span> NUM_DIGITS 10

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> ndigit[NUM_DIGITS] = {<span class="nm">0</span>};
    <span class="ty">int</span> c;

    <span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
        <span class="kw">if</span> (c &gt;= <span class="st">'0'</span> &amp;&amp; c &lt;= <span class="st">'9'</span>) {
            ++ndigit[c - <span class="st">'0'</span>];
        }
    }
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nm">0</span>; i &lt; NUM_DIGITS; i++) {
        <span class="fn">printf</span>(<span class="st">"digit %d: %d\\n"</span>, i, ndigit[i]);
    }
}</pre>
    <p class="muted"><code>int ndigit[NUM_DIGITS] = {0};</code> declares an array of 10 ints and initializes
    <b>every</b> element to 0 (a partial brace initializer zero-fills the rest).</p>
  </div>

  <h3>Why <code>++ndigit[c - '0']</code> and not the tempting alternatives</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Expression</th><th>What it actually does</th><th>Verdict</th></tr>
      <tr><td><code>++ndigit[c - '0'];</code></td><td><code>c</code> is a character code (e.g. <code>'5'</code> = 53). Subtracting <code>'0'</code> (48) converts it to the numeric digit value 5, a valid index 0&ndash;9.</td><td><b>Correct</b></td></tr>
      <tr><td><code>ndigit[c]++;</code></td><td>Uses the raw character code <b>as the index</b>. <code>c</code> for <code>'5'</code> is 53 &mdash; miles past the array's 10 slots.</td><td><b>Wrong &mdash; out-of-bounds access</b></td></tr>
      <tr><td><code>ndigit['c'-'0']++;</code></td><td>This is the <i>literal letter</i> <code>'c'</code> (99) minus <code>'0'</code> (48) = a fixed constant, <b>51</b>. It never reads the loop variable at all.</td><td><b>Wrong &mdash; nonsense fixed index, and still out of bounds</b></td></tr>
    </table>
    <div class="warn"><b>The bug is easy to miss visually.</b> <code>ndigit[c]</code> and <code>ndigit['c'-'0']</code>
    both <i>look</i> like they involve the character we just read, but neither one does what
    <code>ndigit[c - '0']</code> does: take the variable <code>c</code>'s ASCII code and subtract the code for
    <code>'0'</code> to land on a small index.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Given <code>char c = '7';</code>, what does <code>c - '0'</code> evaluate to?</div>
      <button class="opt" data-i="0">7</button>
      <button class="opt" data-i="1">55</button>
      <button class="opt" data-i="2">48</button>
      <button class="opt" data-i="3">A compiler error &mdash; you cannot subtract characters</button>
      <div class="fb"><code>'7'</code> is ASCII 55, <code>'0'</code> is ASCII 48. 55 &minus; 48 = <b>7</b> &mdash; the numeric value of the digit character. This is exactly the trick used to convert a digit character to its value.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>ndigit[c]++;</code> is a safe, equivalent replacement for <code>++ndigit[c - '0'];</code> when <code>c</code> holds a digit character.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> <code>c</code> is the raw ASCII code (e.g. 53 for <code>'5'</code>), which is far larger than the array's 10 elements &mdash; an out-of-bounds write.</div>
    </div>
  </div>

  <h3><code>#define</code>: preprocessor text substitution</h3>
  <div class="card">
    <p><code>#define NAME value</code> is a <b>preprocessor directive</b> &mdash; a pure <b>find-and-replace</b>
    performed on the source text <i>before compilation even starts</i>. It is not a variable.</p>
    <table class="cmp">
      <tr><th></th><th><code>#define NUM_DIGITS 10</code></th><th><code>const int num_digits = 10;</code></th></tr>
      <tr><td>Memory allocated</td><td><b>None</b> &mdash; it never exists at runtime</td><td>Yes, a real memory location</td></tr>
      <tr><td>Type checking</td><td><b>None</b> &mdash; it is just swapped-in text</td><td>Yes, it has a declared type</td></tr>
      <tr><td>When it happens</td><td>Preprocessing, before compiling</td><td>Compile time / runtime</td></tr>
      <tr><td>What the compiler sees</td><td>Every occurrence of <code>NUM_DIGITS</code> literally replaced by <code>10</code></td><td>A named, typed variable</td></tr>
    </table>
    <div class="concept">Think of <code>#define</code> as your editor's "find and replace," run once, automatically,
    on the whole file before the compiler ever looks at it. <b>No memory, no type, no runtime existence</b> &mdash;
    it is gone by the time the compiler starts working.</div>
  </div>

  <h3>The four-stage build process</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Stage</th><th>Tool</th><th>Job</th></tr>
      <tr><td>1. Preprocessor</td><td><code>cpp</code></td><td>Handles <code>#include</code> (pastes in header contents) and <code>#define</code> (text substitution). Produces expanded source text.</td></tr>
      <tr><td>2. Compiler</td><td><code>cc1</code></td><td>Translates the expanded C source into <b>assembly language</b> for the target processor.</td></tr>
      <tr><td>3. Assembler</td><td><code>as</code></td><td>Translates assembly into <b>object code</b> (machine code) &mdash; a <code>.o</code> file.</td></tr>
      <tr><td>4. Linker</td><td><code>ld</code></td><td>Combines your object file(s) with library object code (e.g. the implementation of <code>printf</code>) into one final <b>executable</b>.</td></tr>
    </table>
    <p class="muted"><code>gcc hello.c</code> runs all four stages for you in one command, which is why nothing
    visibly "stops" between them.</p>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which stage expands <code>#define</code> macros and <code>#include</code> directives?</div>
      <button class="opt" data-i="0">The compiler</button>
      <button class="opt" data-i="1">The preprocessor</button>
      <button class="opt" data-i="2">The assembler</button>
      <button class="opt" data-i="3">The linker</button>
      <div class="fb">The <b>preprocessor</b> runs first and handles all lines starting with <code>#</code> &mdash; pure text manipulation before any real compiling happens.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>Which stage combines your object file with the library code for functions like <code>printf</code> to produce the final executable?</div>
      <button class="opt" data-i="0">The preprocessor</button>
      <button class="opt" data-i="1">The compiler</button>
      <button class="opt" data-i="2">The assembler</button>
      <button class="opt" data-i="3">The linker</button>
      <div class="fb">The <b>linker</b> is the last stage &mdash; it stitches together every object file (yours and the standard library's) into one runnable program.</div>
    </div>
  </div>

  <h3>C arrays vs Java arrays</h3>
  <div class="card">
    <table class="cmp">
      <tr><th></th><th>C array</th><th>Java array</th></tr>
      <tr><td>Knows its own size?</td><td><b>No</b> &mdash; no <code>.length</code></td><td><b>Yes</b> &mdash; <code>arr.length</code></td></tr>
      <tr><td>Tracking size</td><td>Programmer's responsibility (a separate <code>size</code> parameter, or a <code>#define</code>d constant)</td><td>Built in to the array object</td></tr>
      <tr><td>Bounds checking</td><td>None &mdash; out-of-bounds access is undefined behavior</td><td>Runtime <code>ArrayIndexOutOfBoundsException</code></td></tr>
    </table>
    <div class="warn">If you write a C function that takes an array, you almost always need to pass its size
    too &mdash; the array itself carries no such information.</div>
  </div>

  <div class="card">
    <div class="q" data-multi="0,2">
      <div class="prompt"><span class="tag">Select all that apply</span>Which statements about C arrays are true?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> A C array does not know its own length at runtime.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> Accessing an index past the end of a C array raises a runtime exception, just like Java.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Programmers commonly use <code>#define</code> to name an array's size.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> <code>ndigit[9]</code> is out of bounds for <code>int ndigit[NUM_DIGITS]</code> when <code>NUM_DIGITS</code> is 10.</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A and C.</b> C has <b>no bounds checking</b> (B is false &mdash; out-of-bounds access is undefined behavior, not a clean exception). <b>D</b> is false too: valid indices for a 10-element array are 0&ndash;9, so <code>ndigit[9]</code> is the <i>last valid</i> element, not out of bounds.</div>
    </div>
  </div>
</section>

<!-- ============ IO REDIRECTION ============ -->
<section class="topic" id="l3-redir">
  <h2>Lesson 3 &middot; I/O Redirection</h2>

  <div class="concept">Every running program has three standard streams, each identified by a small integer
  called a <b>file descriptor</b>:</div>

  <div class="card">
    <table class="cmp">
      <tr><th>File descriptor</th><th>Stream</th><th>Default destination</th></tr>
      <tr><td><b>0</b></td><td><code>stdin</code></td><td>the keyboard</td></tr>
      <tr><td><b>1</b></td><td><code>stdout</code></td><td>the terminal</td></tr>
      <tr><td><b>2</b></td><td><code>stderr</code></td><td>the terminal</td></tr>
    </table>
    <p class="muted"><code>stdout</code> and <code>stderr</code> both print to the terminal by default, which
    is why you normally cannot tell them apart &mdash; until you redirect one of them.</p>
  </div>

  <h3>Redirection operators</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Syntax</th><th>Effect</th></tr>
      <tr><td><code>cmd &lt; input.txt</code></td><td>Redirects <b>stdin</b> &mdash; the program reads from <code>input.txt</code> instead of the keyboard.</td></tr>
      <tr><td><code>cmd &gt; output.txt</code></td><td>Redirects <b>stdout</b> to <code>output.txt</code>, <b>overwriting</b> it if it exists.</td></tr>
      <tr><td><code>cmd &gt;&gt; output.txt</code></td><td>Redirects <b>stdout</b> to <code>output.txt</code>, <b>appending</b> to the end instead of overwriting.</td></tr>
      <tr><td><code>cmd 2&gt; errors.txt</code></td><td>Redirects <b>stderr</b> only, to <code>errors.txt</code>.</td></tr>
      <tr><td><code>cmd &gt; out.txt 2&gt; err.txt</code></td><td>Sends <b>stdout</b> and <b>stderr</b> to two <i>separate</i> files.</td></tr>
    </table>
    <div class="warn"><b><code>&gt;</code> overwrites, <code>&gt;&gt;</code> appends.</b> This is one of the most
    common mistakes in the course &mdash; running the same command twice with <code>&gt;</code> destroys the
    first run's output.</div>
  </div>

  <h3>Demo programs</h3>
  <div class="card">
    <div class="two">
      <div>
        <h4><code>readstdin.c</code></h4>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> c;
    <span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
        <span class="cm">/* process c */</span>
    }
}</pre>
        <p class="muted">Reads from <b>stdin</b> (fd 0) via <code>getchar()</code> in a loop until <code>EOF</code>.</p>
      </div>
      <div>
        <h4><code>writestdout.c</code></h4>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="fn">putchar</span>(<span class="st">'x'</span>);
}</pre>
        <p class="muted"><code>putchar()</code> <b>always</b> writes to <b>stdout</b> (fd 1) &mdash; there is no way to redirect it to stderr by changing arguments.</p>
      </div>
    </div>
    <h4><code>writestderr.c</code></h4>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="fn">fputc</span>(<span class="st">'x'</span>, stderr);
    <span class="cm">/* or: fprintf(stderr, "x"); */</span>
}</pre>
    <div class="danger"><b>Key point:</b> <code>putchar()</code> can only ever write to <b>stdout</b>. To write
    to <b>stderr</b>, you must use a different function &mdash; <code>fputc(ch, stderr)</code> or
    <code>fprintf(stderr, ...)</code> &mdash; that takes the stream explicitly.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>You want a character written to stderr instead of stdout. Which function should you use?</div>
      <button class="opt" data-i="0"><code>putchar(ch)</code></button>
      <button class="opt" data-i="1"><code>printf("%c", ch)</code></button>
      <button class="opt" data-i="2"><code>fputc(ch, stderr)</code></button>
      <button class="opt" data-i="3">There is no way to write to stderr in C</button>
      <div class="fb"><code>putchar</code> and plain <code>printf</code> are hard-wired to <b>stdout</b>. <code>fputc(ch, stderr)</code> (or <code>fprintf(stderr, ...)</code>) explicitly names the stream.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>cmd &gt; output.txt</code> appends to <code>output.txt</code> if the file already exists.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> A single <code>&gt;</code> <b>overwrites</b> (truncates) the file. Use <code>&gt;&gt;</code> to append.</div>
    </div>
  </div>

  <h3>Walkthrough: <code>./program &lt; input.txt &gt; output.txt 2&gt; error.txt</code></h3>
  <div class="card">
    <p>Suppose <code>program</code> reads numbers from stdin, prints valid results to stdout, and prints an
    error message to stderr for any invalid input line.</p>
    <table class="cmp">
      <tr><th>Stream</th><th>Where it goes</th></tr>
      <tr><td>stdin (fd 0)</td><td>read from <code>input.txt</code>, not the keyboard</td></tr>
      <tr><td>stdout (fd 1)</td><td>written to <code>output.txt</code></td></tr>
      <tr><td>stderr (fd 2)</td><td>written to <code>error.txt</code></td></tr>
      <tr><td>What appears on the terminal</td><td><b>nothing</b> &mdash; both output streams were redirected to files</td></tr>
    </table>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Given <code>./program &lt; input.txt &gt; output.txt 2&gt; error.txt</code>, what shows up on the terminal while it runs?</div>
      <button class="opt" data-i="0">Only the error messages</button>
      <button class="opt" data-i="1">Nothing &mdash; both stdout and stderr were redirected to files</button>
      <button class="opt" data-i="2">Only the normal output</button>
      <button class="opt" data-i="3">Everything, because redirection doesn't affect the terminal</button>
      <div class="fb">Both <code>1</code> (stdout) and <code>2</code> (stderr) point at files here, so the terminal shows <b>nothing</b> from the program itself.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Where do the program's error messages end up in that same command?</div>
      <button class="opt" data-i="0"><code>output.txt</code></button>
      <button class="opt" data-i="1">the terminal</button>
      <button class="opt" data-i="2"><code>error.txt</code></button>
      <button class="opt" data-i="3"><code>input.txt</code></button>
      <div class="fb"><code>2&gt; error.txt</code> sends stderr specifically to <code>error.txt</code>, separate from stdout's <code>output.txt</code>.</div>
    </div>
  </div>
</section>

<!-- ============ PIPES ============ -->
<section class="topic" id="l3-pipes">
  <h2>Lesson 3 &middot; Pipes</h2>

  <div class="concept"><code>command1 | command2</code> connects <b>command1's stdout directly to
  command2's stdin</b> &mdash; no intermediate file is ever written to disk. The <code>|</code> character is
  called a <b>pipe</b>.</div>

  <h3>Demo: producer and consumer</h3>
  <div class="card">
    <div class="two">
      <div>
        <h4><code>producer.c</code></h4>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="st">"apple\\n"</span>);
    <span class="fn">printf</span>(<span class="st">"banana\\n"</span>);
    <span class="fn">printf</span>(<span class="st">"cherry\\n"</span>);
}</pre>
        <p class="muted">Prints three lines to stdout, one fruit per line.</p>
      </div>
      <div>
        <h4><code>consumer.c</code></h4>
<pre><span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> c;
    <span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
        <span class="kw">if</span> (c==<span class="st">'a'</span>||c==<span class="st">'e'</span>||c==<span class="st">'i'</span>||
            c==<span class="st">'o'</span>||c==<span class="st">'u'</span>)
            <span class="fn">putchar</span>(<span class="st">'-'</span>);
        <span class="kw">else</span>
            <span class="fn">putchar</span>(c);
    }
}</pre>
        <p class="muted">Reads stdin character by character and replaces each vowel with <code>-</code>.</p>
      </div>
    </div>
    <p><code>producer | consumer</code> feeds producer's stdout straight into consumer's stdin:</p>
    <table class="cmp">
      <tr><th>Input line (from producer)</th><th>Output line (from consumer)</th></tr>
      <tr><td><code>apple</code></td><td><code>-ppl-</code></td></tr>
      <tr><td><code>banana</code></td><td><code>b-n-n-</code></td></tr>
      <tr><td><code>cherry</code></td><td><code>ch-rry</code></td></tr>
    </table>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match the input line to its piped output</h3>
    <table class="match" id="match-pipe">
      <tr><td class="match-term"><code>apple</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="a">-ppl-</option><option value="b">b-n-n-</option><option value="c">ch-rry</option></select></td></tr>
      <tr><td class="match-term"><code>banana</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="a">-ppl-</option><option value="b">b-n-n-</option><option value="c">ch-rry</option></select></td></tr>
      <tr><td class="match-term"><code>cherry</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="a">-ppl-</option><option value="b">b-n-n-</option><option value="c">ch-rry</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-pipe','fb-match-pipe',['a','b','c'])">Check</button>
    <div class="fb" id="fb-match-pipe">Each vowel (a, e, i, o, u) becomes <code>-</code>; every other character, including newlines, passes through unchanged.</div>
  </div>

  <h3>Chaining pipes</h3>
  <div class="card">
    <p>Pipes chain: <code>producer | consumer | wc -c</code> feeds consumer's output into <code>wc</code>.</p>
    <table class="cmp">
      <tr><th>Command</th><th>Counts</th></tr>
      <tr><td><code>wc -c</code></td><td>characters (bytes)</td></tr>
      <tr><td><code>wc -l</code></td><td>lines</td></tr>
      <tr><td><code>wc -w</code></td><td>words</td></tr>
    </table>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What does <code>producer | consumer | wc -l</code> print?</div>
      <button class="opt" data-i="0">The total number of characters printed by consumer</button>
      <button class="opt" data-i="1">The number of vowels replaced</button>
      <button class="opt" data-i="2">The number of lines consumer produced &mdash; 3, one per fruit</button>
      <button class="opt" data-i="3">Nothing; you cannot chain more than one pipe</button>
      <div class="fb">Pipes chain freely. <code>wc -l</code> counts lines of its stdin, which here is consumer's output &mdash; 3 lines, one per fruit.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>A pipe connects one program's stdout directly to the next program's stdin, without writing an intermediate file.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> That's the whole point of <code>|</code> &mdash; no temp file, no disk I/O in between.</div>
    </div>
  </div>
</section>

<!-- ============ STRINGS ============ -->
<section class="topic" id="l3-strings">
  <h2>Lesson 3 &middot; Strings</h2>

  <div class="concept">C has no built-in string type. A <b>C string</b> is just a <code>char</code> array
  <b>terminated by the null character <code>'\\0'</code></b>. Everything that works with strings
  (<code>printf("%s", ...)</code>, <code>strlen</code>, ...) relies on finding that terminator.</div>

  <h3>Literal initializers: quotes matter</h3>
  <div class="card">
    <div class="two">
      <div>
<pre><span class="ty">char</span> str1[] = <span class="st">"hello"</span>;</pre>
        <p class="muted">A <b>double-quoted string literal</b> automatically gets a <code>'\\0'</code> appended.
        <code>str1</code> is 6 bytes: <code>h e l l o \\0</code>. Valid C string.</p>
      </div>
      <div>
<pre><span class="ty">char</span> str2[] = {<span class="st">'h'</span>,<span class="st">'e'</span>,<span class="st">'l'</span>,<span class="st">'l'</span>,<span class="st">'o'</span>};</pre>
        <p class="muted">A <b>char-array initializer list</b> does <b>NOT</b> add a terminator. <code>str2</code>
        is only 5 bytes with no <code>'\\0'</code> &mdash; <b>not a valid C string</b>. Passing it to
        <code>printf("%s",...)</code> or <code>strlen</code> is undefined behavior.</p>
      </div>
    </div>
    <div class="danger"><b>This is a real bug pattern, not a pedantic detail.</b> <code>{'h','e','l','l','o'}</code>
    looks like it should behave like <code>"hello"</code>. It does not &mdash; there is no null terminator, so
    any function that scans for one will read past the end of the array into whatever memory happens to follow.</div>
  </div>

  <h3><code>strlen()</code> vs <code>sizeof()</code></h3>
  <div class="card">
    <table class="cmp">
      <tr><th></th><th><code>strlen(s)</code></th><th><code>sizeof(s)</code></th></tr>
      <tr><td>What it measures</td><td>characters up to (not including) the first <code>'\\0'</code></td><td>the array's total allocated byte capacity</td></tr>
      <tr><td>Needs <code>&lt;string.h&gt;</code>?</td><td>Yes</td><td>No &mdash; it's a compile-time operator, not a function</td></tr>
    </table>
<pre><span class="ty">char</span> str3[<span class="nm">10</span>] = <span class="st">"hi"</span>;
<span class="fn">printf</span>(<span class="st">"%lu\\n"</span>, <span class="kw">sizeof</span>(str3));   <span class="cm">// 10 — the array's declared capacity</span>
<span class="fn">printf</span>(<span class="st">"%lu\\n"</span>, <span class="fn">strlen</span>(str3));  <span class="cm">// 2 — chars before the first '\\0'</span></pre>
    <p class="muted">These two numbers can differ a lot, and mixing them up is a common bug (e.g. looping
    <code>sizeof</code> times over data that's really only <code>strlen</code> long).</p>

    <h4>An early null terminator</h4>
<pre><span class="ty">char</span> str4[] = {<span class="st">'h'</span>,<span class="st">'i'</span>,<span class="st">'\\0'</span>,<span class="st">'X'</span>,<span class="st">'Y'</span>,<span class="st">'Z'</span>,<span class="st">'\\0'</span>};
<span class="fn">printf</span>(<span class="st">"%lu\\n"</span>, <span class="fn">strlen</span>(str4));   <span class="cm">// 2</span>
<span class="fn">printf</span>(<span class="st">"%lu\\n"</span>, <span class="kw">sizeof</span>(str4));   <span class="cm">// 7</span></pre>
    <p class="muted"><code>strlen</code> stops at the <b>first</b> <code>'\\0'</code> it finds &mdash; giving
    2 &mdash; even though the array physically holds 7 bytes and more data ("XYZ") sits after that first
    terminator. <code>strlen</code> has no way to know that data is there.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char a[] = {'h','i','\\0','X','Y','Z','\\0'};</code> &mdash; what does <code>strlen(a)</code> return?</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>strlen</code> stops counting at the <b>first</b> <code>'\\0'</code>, which is at index 2. It has no visibility into what comes after.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Same array &mdash; what does <code>sizeof(a)</code> return (its total byte capacity)?</div>
      <input class="fillblank sm" data-answer="7">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>sizeof</code> counts every element of the array, regardless of any <code>'\\0'</code> inside it &mdash; all 7 bytes.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span><code>char bad[] = {'h','e','l','l','o'};</code> Why is this NOT a valid C string?</div>
      <button class="opt" data-i="0">It's missing the letter 'w'</button>
      <button class="opt" data-i="1">It has no terminating <code>'\\0'</code>, so functions that scan for the end of the string will read past the array</button>
      <button class="opt" data-i="2">C arrays can't be initialized with a list</button>
      <button class="opt" data-i="3">It should have used double quotes on each letter</button>
      <div class="fb">A char-array initializer list does not auto-append <code>'\\0'</code> the way a double-quoted string literal does. Without it, <code>strlen</code>/<code>printf("%s",...)</code> keep reading past the array's end &mdash; undefined behavior.</div>
    </div>
  </div>
  <div class="card">
    <p class="muted">String-handling functions like <code>strlen</code>, <code>strcpy</code>, <code>strcat</code>,
    and <code>strcmp</code> live in <code>&lt;string.h&gt;</code> &mdash; remember to include it.</p>
  </div>
</section>

<!-- ============ RD02 ============ -->
<section class="topic" id="l3-rd02">
  <h2>RD02 &middot; Arrays, Strings, I/O Redirection &amp; Pipes — Self-Check</h2>
  <p class="muted">Covers the RD02 readings: <i>Dive into Systems</i> Appendix &sect;Arrays &amp; Strings,
  &sect;I/O Redirection, &sect;Pipes.</p>

  <h3>Part 1: Strings &amp; Arrays</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What makes <code>strcpy</code> dangerous compared to Java's string assignment?</div>
      <button class="opt" data-i="0">It runs slower than Java</button>
      <button class="opt" data-i="1">It performs <b>no bounds checking</b> &mdash; if the source isn't null-terminated, or is longer than the destination buffer, the result is undefined behavior (a buffer overflow)</button>
      <button class="opt" data-i="2">It requires <code>&lt;stdio.h&gt;</code> instead of <code>&lt;string.h&gt;</code></button>
      <button class="opt" data-i="3">It only works on arrays of exactly 10 characters</button>
      <div class="fb">Java strings are immutable and bounds-checked by the runtime. C's <code>strcpy</code> just keeps copying bytes until it hits a <code>'\\0'</code> in the source &mdash; <b>the programmer is responsible</b> for making sure the destination is big enough and the source is properly terminated.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">Q2</span>In C, the programmer is responsible for ensuring a char array is properly null-terminated before treating it as a string.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> Unlike Java's safe, bounds-checked <code>String</code>, C gives you raw memory and trusts you to terminate it correctly.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>What does the C preprocessor do with a <code>#define</code>d constant?</div>
      <button class="opt" data-i="0">Allocates a memory location for it</button>
      <button class="opt" data-i="1">Type-checks every use of it</button>
      <button class="opt" data-i="2">Textually substitutes it wherever the name appears, before compilation</button>
      <button class="opt" data-i="3">Converts it into a function call</button>
      <div class="fb">Pure text substitution &mdash; no memory, no type. That happens entirely in the preprocessing stage.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q4</span>Given a valid digit character stored in <code>char c</code>, which expression correctly converts it to its numeric value?</div>
      <button class="opt" data-i="0"><code>c - '0'</code></button>
      <button class="opt" data-i="1"><code>c - 0</code></button>
      <button class="opt" data-i="2"><code>'c' - '0'</code></button>
      <button class="opt" data-i="3"><code>c * '0'</code></button>
      <div class="fb">ASCII digit characters '0'-'9' are consecutive codes 48-57, so subtracting the code for <code>'0'</code> converts a digit character to its numeric value.</div>
    </div>
  </div>

  <h3>Part 2: I/O Redirection</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q1</span>Which operator redirects a program's stdin to come from a file?</div>
      <button class="opt" data-i="0"><code>&gt;</code></button>
      <button class="opt" data-i="1"><code>&gt;&gt;</code></button>
      <button class="opt" data-i="2"><code>&lt;</code></button>
      <button class="opt" data-i="3"><code>|</code></button>
      <div class="fb"><code>&lt;</code> feeds a file's contents in as stdin.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>Difference between <code>&gt;</code> and <code>&gt;&gt;</code>?</div>
      <button class="opt" data-i="0"><code>&gt;</code> is for stderr, <code>&gt;&gt;</code> is for stdout</button>
      <button class="opt" data-i="1"><code>&gt;</code> overwrites the file, <code>&gt;&gt;</code> appends to it</button>
      <button class="opt" data-i="2">They are identical</button>
      <button class="opt" data-i="3"><code>&gt;&gt;</code> is only valid with pipes</button>
      <div class="fb"><b><code>&gt;</code> overwrites; <code>&gt;&gt;</code> appends.</b> Same stream (stdout by default), different file-open mode.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q3</span>Which file descriptor is stderr?</div>
      <button class="opt" data-i="0">0</button>
      <button class="opt" data-i="1">2</button>
      <button class="opt" data-i="2">1</button>
      <button class="opt" data-i="3">3</button>
      <div class="fb">0 = stdin, 1 = stdout, <b>2 = stderr</b>.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">Q4</span><code>cmd &gt; out.txt 2&gt; err.txt</code> sends stdout and stderr to two separate files.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> Each redirection targets a different file descriptor, so they don't collide.</div>
    </div>
  </div>

  <h3>Part 3: Pipes</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What does <code>|</code> connect?</div>
      <button class="opt" data-i="0">Two files on disk</button>
      <button class="opt" data-i="1">The left command's stdout to the right command's stdin</button>
      <button class="opt" data-i="2">The left command's stderr to the right command's stdout</button>
      <button class="opt" data-i="3">Two separate terminal windows</button>
      <div class="fb">A pipe is a direct stdout&rarr;stdin connection between two processes, with no file on disk.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">Q2</span>Pipes can be chained: <code>a | b | c</code> is valid and feeds a's output through b into c.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> Each <code>|</code> creates one connection; you can chain as many as you like.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3 &middot; Fill in the blank</span>Which <code>wc</code> flag counts lines of input?</div>
      <input class="fillblank sm" data-answer="-l|wc -l">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>wc -l</code> counts lines; <code>-w</code> counts words, <code>-c</code> counts characters/bytes.</div>
    </div>
  </div>
</section>

</main>
`;
