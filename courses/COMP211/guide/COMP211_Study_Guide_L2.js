/* ============================================================
   LESSON 2 — CL02 Intro to C (+ RD01, DiS 16.1-16.3, 16.5).
   Injects into #l2. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l2').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l2-compile')">1 &middot; Compiling &amp; Assembling</button>
  <button onclick="showTopic(this,'l2-pipe')">Pipeline Lab</button>
  <button onclick="showTopic(this,'l2-first')">2 &middot; Your First C Program</button>
  <button onclick="showTopic(this,'l2-gcc')">3 &middot; gcc</button>
  <button onclick="showTopic(this,'l2-vars')">4 &middot; Variables &amp; Types</button>
  <button onclick="showTopic(this,'l2-printf')">5 &middot; printf</button>
  <button onclick="showTopic(this,'l2-ascii')">6 &middot; Characters &amp; ASCII</button>
  <button onclick="showTopic(this,'l2-bits')">Bits Lab</button>
  <button onclick="showTopic(this,'l2-io')">7 &middot; getchar, putchar, EOF</button>
  <button onclick="showTopic(this,'l2-inclass')">In-Class Problems</button>
  <button onclick="showTopic(this,'l2-rd01')">RD01 Self-Check</button>
</nav>
<main>

<!-- ============ COMPILING ============ -->
<section class="topic active" id="l2-compile">
  <h2>Lesson 2 &middot; Compiling and Assembling</h2>

  <div class="concept">Computers cannot understand Python, Java, or C. They understand <b>machine code</b>:
  binary instructions — strings of 1s and 0s — that tell the processor what operations to perform.
  Everything else is a translation layer built to spare humans from writing that.</div>

  <h3>How we got from bits to C</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Era</th><th>What you wrote</th><th>What made it possible</th></tr>
      <tr><td>Before the 1950s</td><td><b>Machine code</b>, entered by switches, punch cards, or paper tape</td><td>nothing — you were the translator</td></tr>
      <tr><td>Early 1950s</td><td><b>Assembly language</b> — human-readable mnemonics like <code>add x8, x9, x10</code></td><td><b>Assemblers</b>, programs that translate assembly into machine code</td></tr>
      <tr><td>Late 1950s</td><td><b>High-level languages</b> that abstract away the hardware and focus on logic and algorithms</td><td><b>Compilers</b></td></tr>
    </table>
    <p class="muted">Machines still cannot read assembly — only machine code. The assembler exists precisely
    to automate that conversion, and it is what let programmers write and debug far more efficiently.</p>
    <h4>The three languages the slides name</h4>
    <table class="cmp">
      <tr><th>Year</th><th>Language</th><th>Why it mattered</th></tr>
      <tr><td>1957</td><td><b>FORTRAN</b> (FORmula TRANslation)</td><td>First widely adopted high-level language; built by IBM for scientific and engineering calculations</td></tr>
      <tr><td>1958</td><td><b>LISP</b> (LISt Processor)</td><td>Pioneered functional programming and symbolic processing</td></tr>
      <tr><td>1959</td><td><b>COBOL</b> (COmmon Business-Oriented Language)</td><td>Business applications; emphasized readability and portability; became the enterprise/financial standard</td></tr>
    </table>
  </div>

  <h3>Low-level vs high-level</h3>
  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Machine code</th><th>Assembly (low-level)</th><th>C (high-level)</th></tr>
      <tr><td>Looks like</td><td><code>0b0000000010100100...</code></td><td><code>add x8, x9, x10</code></td><td><code>return num * num;</code></td></tr>
      <tr><td>Readable by</td><td>the machine</td><td>humans, with effort</td><td>humans, easily</td></tr>
      <tr><td>Tied to a specific processor</td><td>yes</td><td>yes</td><td>no</td></tr>
    </table>
    <div class="concept"><b>C is a compiled high-level language.</b> To execute it, the program is first
    translated into <b>assembly</b> by a <b>compiler</b>, then the <b>assembler</b> translates that assembly
    into <b>machine code</b>. Two translations, two different tools.
    <br><br><b>Interpreted</b> languages like Python are executed differently — no separate compile-then-run
    step producing a machine-code file.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does a <b>compiler</b> translate, and into what?</div>
      <button class="opt" data-i="0">Assembly language into machine code</button>
      <button class="opt" data-i="1">A high-level language into assembly language</button>
      <button class="opt" data-i="2">Machine code into a high-level language</button>
      <button class="opt" data-i="3">Source code directly into output on the screen</button>
      <div class="fb">Compiler: <b>high-level &rarr; assembly</b>. Option 0 is the <b>assembler</b>. Two
      distinct programs, run one after the other — <code>gcc</code> just hides the seam by doing both.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why do assemblers exist?</div>
      <button class="opt" data-i="0">Because machines cannot read machine code</button>
      <button class="opt" data-i="1">Because C is faster than assembly</button>
      <button class="opt" data-i="2">Because machines cannot read assembly language — something has to convert it to machine code</button>
      <button class="opt" data-i="3">Because assembly is a high-level language</button>
      <div class="fb">Machines read <b>only</b> machine code. Assembly is for humans; the assembler automates
      the conversion. Option 0 has it exactly backwards.</div>
    </div>
  </div>
</section>

<!-- ============ PIPELINE LAB ============ -->
<section class="topic" id="l2-pipe">
  <h2>Compilation Pipeline Lab</h2>
  <div class="concept">Step through what happens between <code>hello.c</code> and text appearing on your
  screen. Notice how many separate artifacts exist along the way.</div>

  <div class="card">
    <div class="toolbar">
      <button class="btn small ghost" onclick="pipeStep(-1)">&larr; Back</button>
      <button class="btn small ghost" onclick="pipeStep(1)">Next &rarr;</button>
      <button class="btn small ghost" onclick="pipeReset()">Reset</button>
      <span class="muted" id="pl-count"></span>
    </div>
    <div class="pipe" id="pl-stages"></div>
    <pre id="pl-code" style="min-height:150px"></pre>
    <div class="step-desc" id="pl-desc"></div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You run <code>gcc hello.c</code> and nothing appears on screen. What happened?</div>
      <button class="opt" data-i="0">The compile failed silently</button>
      <button class="opt" data-i="1">It succeeded and produced an executable named <code>a.out</code> — compiling does not run the program</button>
      <button class="opt" data-i="2"><code>gcc</code> printed the output of the program</button>
      <button class="opt" data-i="3">You need to add <code>-o</code> for it to do anything</button>
      <div class="fb">Silence is success. <code>gcc</code> <b>translates</b>; it does not execute. The
      program only runs when you type <code>./a.out</code>.</div>
    </div>
  </div>
</section>

<!-- ============ FIRST PROGRAM ============ -->
<section class="topic" id="l2-first">
  <h2>Lesson 2 &middot; Your First C Program</h2>

  <div class="card">
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="st">"Hello, world!\\n"</span>);
    <span class="kw">return</span> <span class="nm">0</span>;
}</pre>
    <table class="cmp" style="margin-top:14px">
      <tr><th>Line</th><th>Why it is there</th></tr>
      <tr><td><code>#include &lt;stdio.h&gt;</code></td><td><code>printf</code> is a standard library function. <b>C does not automatically include any standard library functions</b> — to use <code>printf</code> you must explicitly include <code>stdio.h</code>.</td></tr>
      <tr><td><code>int main()</code></td><td><b>All C programs begin executing at <code>main</code>.</b> It returns an <code>int</code> — the program's <b>exit status</b>.</td></tr>
      <tr><td><code>return 0;</code></td><td>A successful execution returns <b>0</b>. An abnormal execution returns a <b>non-zero</b> value.</td></tr>
    </table>
    <p class="muted">Note the direction of that convention: <b>0 means success</b>, which is the opposite of
    the usual "0 is false" intuition. Non-zero is how a program reports <i>which</i> thing went wrong.</p>
  </div>

  <h3>The C Standard Library</h3>
  <div class="card">
    <p>A collection of pre-written functions for common tasks: input/output, string manipulation,
    mathematical operations, memory management. The functions are grouped into <b>header files</b>.</p>
    <p>A header file contains the <b>declarations</b> of the functions, macros, and types you can use.</p>
    <table class="cmp">
      <tr><th>Term</th><th>Meaning</th></tr>
      <tr><td><b>Function declaration</b></td><td>the function's <b>name, return type, and parameters</b></td></tr>
      <tr><td><b>Function definition</b></td><td>the <b>body</b> of the function</td></tr>
    </table>
    <p class="muted">The header gives you the declaration so the compiler knows how to call the function; the
    definition lives in the compiled library.</p>
    <table class="cmp">
      <tr><th>Header file</th><th>Purpose</th><th>Example functions</th></tr>
      <tr><td><code>&lt;stdio.h&gt;</code></td><td>Input/output</td><td><code>printf, getchar, putchar, fopen</code></td></tr>
      <tr><td><code>&lt;stdlib.h&gt;</code></td><td>General utilities</td><td><code>malloc, free, exit, atoi, rand</code></td></tr>
      <tr><td><code>&lt;string.h&gt;</code></td><td>String manipulation</td><td><code>strlen, strcpy, strcat, strcmp</code></td></tr>
      <tr><td><code>&lt;math.h&gt;</code></td><td>Mathematical operations</td><td><code>sqrt, pow, sin, cos, tan, exp</code></td></tr>
      <tr><td><code>&lt;time.h&gt;</code></td><td>Date and time</td><td><code>time, clock, localtime, gmtime</code></td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>You call <code>strlen</code> but forget <code>#include &lt;string.h&gt;</code>. Why is that a problem?</div>
      <button class="opt" data-i="0">The function does not exist without the include</button>
      <button class="opt" data-i="1">C automatically includes it anyway, so it is fine</button>
      <button class="opt" data-i="2">C does not automatically include standard library functions — without the header the compiler has no declaration for <code>strlen</code></button>
      <button class="opt" data-i="3">Header files are optional in C</button>
      <div class="fb">The function's <i>definition</i> exists in the library either way, but the compiler needs
      the <b>declaration</b> from the header to know its return type and parameters. The slides state it
      plainly: "C does not automatically include any standard library functions."</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does the value returned by <code>main</code> represent?</div>
      <button class="opt" data-i="0">The number of lines the program printed</button>
      <button class="opt" data-i="1">The program's exit status — 0 for success, non-zero for abnormal</button>
      <button class="opt" data-i="2">The amount of memory used</button>
      <button class="opt" data-i="3">Nothing; it is ignored</button>
      <div class="fb">The <b>exit status</b>. This is how the shell (and tools like <code>make</code>) find
      out whether your program succeeded.</div>
    </div>
  </div>
</section>

<!-- ============ GCC ============ -->
<section class="topic" id="l2-gcc">
  <h2>Lesson 2 &middot; Compiling and Running with <code>gcc</code></h2>

  <div class="card">
    <ol class="muted" style="line-height:2">
      <li>Write your program.</li>
      <li>Save it with a <b><code>.c</code></b> extension — say <code>hello.c</code>.</li>
      <li>Open a terminal and <code>cd</code> to the directory where the program lives.</li>
      <li>Compile and assemble: <code>gcc hello.c</code></li>
      <li>Run it: <code>./a.out</code></li>
    </ol>
    <p><code>gcc</code> invokes the <b>G</b>NU <b>C</b> <b>C</b>ompiler. It converts your human-readable C
    code into a machine-readable <b>executable file</b>.</p>
    <table class="cmp">
      <tr><th>Command</th><th>Executable produced</th></tr>
      <tr><td><code>gcc hello.c</code></td><td><code>a.out</code> &nbsp;(the default)</td></tr>
      <tr><td><code>gcc hello.c -o hello</code></td><td><code>hello</code></td></tr>
      <tr><td><code>gcc -o hello hello.c</code></td><td><code>hello</code></td></tr>
      <tr><td><code>gcc hello.c -o hi</code></td><td><code>hi</code></td></tr>
    </table>
    <div class="warn"><b>The <code>-o</code> rule.</b> The executable name must <b>immediately follow</b>
    <code>-o</code>. Everything else about the ordering is flexible — notice rows 2 and 3 produce the same
    result with <code>-o hello</code> on either side of the source file. What you cannot do is separate
    <code>-o</code> from its argument.</div>
  </div>

  <h3>Why <code>./</code>?</h3>
  <div class="card">
    <p><code>.</code> means the <b>current directory</b> (straight from Lesson 1), so <code>./a.out</code>
    says "run the <code>a.out</code> that is right here."</p>
    <div class="concept">The <code>./</code> is <b>required</b> because the current directory is not in your
    <code>PATH</code> — the list of directories the shell searches for commands. Type a bare
    <code>a.out</code> and the shell searches <code>PATH</code>, does not find it, and reports "command not
    found," even though the file is sitting right in front of you. This is a deliberate security decision:
    if <code>.</code> were on the PATH, dropping a malicious file named <code>ls</code> into a directory
    would hijack the real <code>ls</code>.</div>
    <p class="muted">If you named the executable <code>hello</code>, run it with <code>./hello</code>.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">In-class problem &mdash; multiple select</h3>
    <p>Which of these sets of commands compile, assemble, and execute the program in
    <code>my_program.c</code>? Tick every one that works.</p>
    <div class="q" data-multi="2,3">
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> <code>gcc my_program.c</code> then <code>./my_program.c</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>gcc my_program.c -o my_program</code> then <code>./a.out</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> <code>gcc my_program.c -o my_prog</code> then <code>./my_prog</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> <code>gcc my_program.c</code> then <code>./a.out</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="4"><span><b>E.</b> <code>gcc my_program.c -o my_program</code> then <code>./my_program.c</code></span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>C and D.</b> The single idea being tested: <b>you run the executable, never the
      <code>.c</code> source file.</b>
      <br>&nbsp;&nbsp;<b>A</b> and <b>E</b> both try to execute <code>my_program.c</code> — that is source
      code, not a program.
      <br>&nbsp;&nbsp;<b>B</b> renames the executable to <code>my_program</code> with <code>-o</code>, so
      <code>a.out</code> was never created; <code>./a.out</code> fails.
      <br>&nbsp;&nbsp;<b>D</b> uses the default name <code>a.out</code> and runs <code>a.out</code>.
      <b>C</b> names it <code>my_prog</code> and runs <code>my_prog</code>. Both are consistent.</div>
    </div>
  </div>
</section>

<!-- ============ VARIABLES ============ -->
<section class="topic" id="l2-vars">
  <h2>Lesson 2 &middot; Variables and Types</h2>

  <div class="card">
    <table class="cmp">
      <tr><th>Property</th><th>Meaning</th></tr>
      <tr><td><b>Scope</b></td><td>Where in a program you can use a variable</td></tr>
      <tr><td><b>Lifetime</b></td><td>When the variable exists in memory</td></tr>
      <tr><td><b>Type</b></td><td>The <b>range of values</b> the variable can represent, and <b>how the value will be interpreted</b></td></tr>
    </table>
    <p class="muted">That second half of "type" is the one worth underlining. A type does not only bound the
    values — it decides <i>what the bits mean</i>. The same byte is 65 or <code>'A'</code> depending on how
    you read it, which is the entire subject of the next tab.</p>
  </div>

  <h3>C numeric types</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Type</th><th>Usual size</th><th>Values stored</th><th>Declaration</th></tr>
      <tr><td><code>char</code></td><td>1 byte</td><td>integers</td><td><code>char x;</code></td></tr>
      <tr><td><code>short</code></td><td>2 bytes</td><td>signed integers</td><td><code>short x;</code></td></tr>
      <tr><td><code>int</code></td><td>4 bytes</td><td>signed integers</td><td><code>int x;</code></td></tr>
      <tr><td><code>long</code></td><td>4 <i>or</i> 8 bytes</td><td>signed integers</td><td><code>long x;</code></td></tr>
      <tr><td><code>long long</code></td><td>8 bytes</td><td>signed integers</td><td><code>long long x;</code></td></tr>
      <tr><td><code>float</code></td><td>4 bytes</td><td>signed real numbers</td><td><code>float x;</code></td></tr>
      <tr><td><code>double</code></td><td>8 bytes</td><td>signed real numbers</td><td><code>double x;</code></td></tr>
    </table>
    <p class="muted"><b>8 bits = 1 byte.</b> So an <code>int</code> is 32 bits, and a <code>char</code> is 8.</p>
    <div class="warn"><b>"Usual" is doing real work in that table.</b> The exact number of bytes for each C
    type <b>might vary from one architecture to the next</b> — which is why <code>long</code> is listed as
    "4 or 8." Never hard-code a size you did not measure.</div>
    <h4>Measuring with <code>sizeof</code></h4>
    <p>The <code>sizeof</code> operator takes the name of a type and evaluates to the number of bytes used to
    store it.</p>
<pre><span class="fn">printf</span>(<span class="st">"number of bytes in an int: %lu\\n"</span>, <span class="kw">sizeof</span>(<span class="ty">int</span>));
<span class="fn">printf</span>(<span class="st">"number of bytes in a short: %lu\\n"</span>, <span class="kw">sizeof</span>(<span class="ty">short</span>));</pre>
    <p class="muted"><code>sizeof</code> evaluates to an <b>unsigned long</b>, so print it with
    <b><code>%lu</code></b> — not <code>%d</code>. This is a real compiler warning you will hit.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which placeholder should you use to print <code>sizeof(int)</code>?</div>
      <button class="opt" data-i="0"><code>%d</code></button>
      <button class="opt" data-i="1"><code>%s</code></button>
      <button class="opt" data-i="2"><code>%lu</code></button>
      <button class="opt" data-i="3"><code>%c</code></button>
      <div class="fb"><code>sizeof</code> evaluates to an <b>unsigned long</b>, so <code>%lu</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>How many <b>bits</b> are in a typical <code>int</code>?</div>
      <button class="opt" data-i="0">4</button>
      <button class="opt" data-i="1">32</button>
      <button class="opt" data-i="2">8</button>
      <button class="opt" data-i="3">64</button>
      <div class="fb">4 <i>bytes</i> &times; 8 bits per byte = <b>32 bits</b>. The "4" in the table is bytes,
      not bits — read that column carefully.</div>
    </div>
  </div>
</section>

<!-- ============ PRINTF ============ -->
<section class="topic" id="l2-printf">
  <h2>Lesson 2 &middot; <code>printf</code></h2>

  <div class="concept">C's <code>printf</code> is very similar to Java's <code>System.out.printf</code>:
  the caller supplies a <b>format string</b> to print. The format string contains <b>formatting
  specifiers</b> — special characters that print tabs (<code>\\t</code>) or newlines (<code>\\n</code>), and
  <b>placeholders</b> for values. A placeholder is <b><code>%</code> followed by a type-specifier letter</b>,
  and <b>for each placeholder, <code>printf</code> expects an additional argument</b>.</div>

  <h3>Placeholders</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Placeholder</th><th>Used for</th><th>Example</th><th>Output</th></tr>
      <tr><td><code>%d</code></td><td>Signed integer</td><td><code>printf("%d", 25);</code></td><td><code>25</code></td></tr>
      <tr><td><code>%u</code></td><td>Unsigned integer</td><td><code>printf("%u", 25);</code></td><td><code>25</code></td></tr>
      <tr><td><code>%f</code></td><td>Floating-point number</td><td><code>printf("%f", 3.14);</code></td><td><code>3.14</code></td></tr>
      <tr><td><code>%c</code></td><td>Single character</td><td><code>printf("%c", 'A');</code></td><td><code>A</code></td></tr>
      <tr><td><code>%s</code></td><td>String</td><td><code>printf("%s", "Hello");</code></td><td><code>Hello</code></td></tr>
      <tr><td><code>%lu</code></td><td>Unsigned long (e.g. <code>sizeof</code>)</td><td><code>printf("%lu", sizeof(int));</code></td><td><code>4</code></td></tr>
    </table>
  </div>

  <h3>Special characters (escape sequences)</h3>
  <div class="card">
    <p>A <b>special character</b> has a specific meaning or function in the language rather than simply
    representing ordinary text. In C, <b>escape sequences use a backslash (<code>\\</code>)</b> to represent
    them — which lets you include characters that are difficult to type or represent directly.</p>
    <table class="cmp">
      <tr><th>Sequence</th><th>Name</th><th>Meaning</th><th>Example</th></tr>
      <tr><td><code>\\n</code></td><td>Newline</td><td>Moves to the next line</td><td><code>"Hello\\nWorld"</code></td></tr>
      <tr><td><code>\\t</code></td><td>Tab</td><td>Inserts a horizontal tab</td><td><code>"Name:\\tJohn"</code></td></tr>
      <tr><td><code>\\\\</code></td><td>Backslash</td><td>Prints a <code>\\</code></td><td><code>"C:\\\\Users"</code></td></tr>
      <tr><td><code>\\"</code></td><td>Double quote</td><td>Prints a <code>"</code> inside a string</td><td><code>"He said \\"Hello\\""</code></td></tr>
      <tr><td><code>\\0</code></td><td>Null character</td><td>Marks the <b>end of a C string</b></td><td><code>"Hello\\0"</code></td></tr>
      <tr><td><code>%%</code></td><td>Percent sign</td><td>Prints a <code>%</code> when using printf</td><td><code>printf("50%%");</code></td></tr>
    </table>
    <div class="concept">Two different escape characters doing two different jobs. <b><code>\\</code>
    introduces a special character; <code>%</code> introduces a placeholder.</b> That is why a literal
    percent sign is <code>%%</code> and not <code>\\%</code> — it is escaping within printf's own notation,
    not C's.</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each specifier</h3>
    <table class="match" id="match-spec">
      <tr><td class="match-term"><code>%d</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">signed integer</option><option value="chr">single character</option><option value="str">string</option><option value="nl">newline</option><option value="tab">tab</option><option value="pct">a literal percent sign</option></select></td></tr>
      <tr><td class="match-term"><code>%c</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">signed integer</option><option value="chr">single character</option><option value="str">string</option><option value="nl">newline</option><option value="tab">tab</option><option value="pct">a literal percent sign</option></select></td></tr>
      <tr><td class="match-term"><code>%s</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">signed integer</option><option value="chr">single character</option><option value="str">string</option><option value="nl">newline</option><option value="tab">tab</option><option value="pct">a literal percent sign</option></select></td></tr>
      <tr><td class="match-term"><code>\\n</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">signed integer</option><option value="chr">single character</option><option value="str">string</option><option value="nl">newline</option><option value="tab">tab</option><option value="pct">a literal percent sign</option></select></td></tr>
      <tr><td class="match-term"><code>\\t</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">signed integer</option><option value="chr">single character</option><option value="str">string</option><option value="nl">newline</option><option value="tab">tab</option><option value="pct">a literal percent sign</option></select></td></tr>
      <tr><td class="match-term"><code>%%</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="int">signed integer</option><option value="chr">single character</option><option value="str">string</option><option value="nl">newline</option><option value="tab">tab</option><option value="pct">a literal percent sign</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-spec','fb-match-spec',['int','chr','str','nl','tab','pct'])">Check</button>
    <div class="fb" id="fb-match-spec"></div>
  </div>
</section>

<!-- ============ ASCII ============ -->
<section class="topic" id="l2-ascii">
  <h2>Lesson 2 &middot; Characters and ASCII</h2>

  <div class="concept"><b>ASCII</b> stands for <b>American Standard Code for Information Interchange</b>.
  It is a code that lets computers represent text using numbers. The C <code>char</code> type stores a
  <b>numeric value</b> — but it is most often used to hold the value of an ASCII character.</div>

  <div class="card">
    <div class="two">
      <div>
        <h4>Values worth memorizing</h4>
        <table class="cmp">
          <tr><th>Character</th><th>ASCII value</th></tr>
          <tr><td><code>'A'</code></td><td><b>65</b></td></tr>
          <tr><td><code>'B'</code></td><td>66</td></tr>
          <tr><td><code>'a'</code></td><td><b>97</b></td></tr>
          <tr><td><code>'0'</code></td><td><b>48</b></td></tr>
          <tr><td>space</td><td>32</td></tr>
          <tr><td><code>'!'</code></td><td>33</td></tr>
        </table>
        <p class="muted">Learn <b>65, 97, 48</b> and the rest follow: letters and digits run consecutively,
        and lowercase is exactly <b>32</b> above uppercase.</p>
      </div>
      <div>
        <h4>With 8 bits</h4>
        <p>An <code>unsigned char</code> holds the values <b>[0, 2<sup>8</sup>&minus;1] = [0, 255]</b>. That
        is comfortably more than enough for the ASCII set.</p>
        <div class="concept"><b>Bits are just bits.</b> To give bits meaning you must assign them a
        <b>representation</b>, which defines how they correspond to meaningful information.
        <br><br>Take the value <code>0b0100 0001</code>:
        <br>&bull; as a <b>decimal integer</b> it reads as <b>65</b>
        <br>&bull; as an <b>ASCII character</b> it reads as <b>'A'</b>
        <br><br>Nothing about the bits changed. Only the interpretation did.</div>
      </div>
    </div>
  </div>

  <h3><code>%c</code> vs <code>%d</code> — the same value, two readings</h3>
  <div class="card">
    <div class="two">
      <div>
<pre><span class="fn">printf</span>(<span class="st">"%c\\n"</span>, <span class="st">'A'</span>);   <span class="cm">// A</span>
<span class="fn">printf</span>(<span class="st">"%d\\n"</span>, <span class="st">'A'</span>);   <span class="cm">// 65</span></pre>
        <p class="muted">Give it a <b>character</b> and ask for a number: you get the ASCII code.</p>
      </div>
      <div>
<pre><span class="fn">printf</span>(<span class="st">"%c\\n"</span>, <span class="nm">67</span>);    <span class="cm">// C</span>
<span class="fn">printf</span>(<span class="st">"%d\\n"</span>, <span class="nm">87</span>);    <span class="cm">// 87</span></pre>
        <p class="muted">Give it a <b>number</b> and ask for a character: you get the character with that
        ASCII encoding.</p>
      </div>
    </div>
    <p><b>The placeholder chooses the interpretation.</b> The value being passed is a number either way.</p>
  </div>

  <h3>Character arithmetic</h3>
  <div class="card">
    <p>Because a <code>char</code> <i>is</i> a number, you can do arithmetic with characters.</p>
<pre><span class="fn">printf</span>(<span class="st">"%d\\n"</span>, <span class="st">'a'</span> - <span class="st">'C'</span>);</pre>
    <p class="muted">The ASCII value of <code>'C'</code> is 67 and of <code>'a'</code> is 97, so this prints
    <b>30</b>.</p>
    <div class="concept">The genuinely useful version of this trick is the constant <b><code>'a' - 'A'</code>
    = 32</b>, the gap between lowercase and uppercase. Subtract it from a lowercase letter and you get the
    uppercase one — which is exactly how the in-class echo program works.</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Why we are learning this</h3>
    <p class="muted">The slides make the point explicitly: <b>ASCII is not specific to C.</b> Computers
    ultimately represent all data using binary, including letters, digits, and symbols. Regardless of the
    language you use, characters must be represented numerically so the computer can store and process them.
    Learning ASCII is how you internalize the relationship between characters and their numeric
    representations — the same "bits are just bits" idea that runs through the entire course.</p>
  </div>
</section>

<!-- ============ BITS LAB ============ -->
<section class="topic" id="l2-bits">
  <h2>Bits Lab &mdash; one byte, three readings</h2>
  <div class="concept">Flip bits, or type a character, and watch the same 8 bits reported as binary, as a
  decimal integer, and as an ASCII character.</div>

  <div class="card">
    <div class="toolbar">
      <label class="muted">type a character:</label>
      <input type="text" id="bx-char" maxlength="1" style="width:60px;text-align:center" oninput="bxFromChar()">
      <label class="muted">or a number 0&ndash;255:</label>
      <input type="text" id="bx-num" style="width:80px" oninput="bxFromNum()">
      <button class="btn small ghost" onclick="bxSet(65)">'A' = 65</button>
      <button class="btn small ghost" onclick="bxSet(97)">'a' = 97</button>
      <button class="btn small ghost" onclick="bxSet(48)">'0' = 48</button>
      <button class="btn small ghost" onclick="bxSet(32)">space = 32</button>
    </div>
    <div class="bits" id="bx-bits"></div>
    <div class="readout">
      <div class="ro"><div class="lbl">binary</div><div class="val" id="bx-bin">&mdash;</div></div>
      <div class="ro"><div class="lbl">printf("%d", c)</div><div class="val" id="bx-dec">&mdash;</div></div>
      <div class="ro"><div class="lbl">printf("%c", c)</div><div class="val" id="bx-chr">&mdash;</div></div>
    </div>
    <div class="step-desc" id="bx-note"></div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Case-conversion check</h3>
    <p class="muted">Set the lab to <code>'a'</code> (97) and then to <code>'A'</code> (65), and compare the
    binary. Only <b>one bit</b> differs.</p>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is <code>'a' - 'A'</code>?</div>
      <button class="opt" data-i="0">26</button>
      <button class="opt" data-i="1">32</button>
      <button class="opt" data-i="2">1</button>
      <button class="opt" data-i="3">65</button>
      <div class="fb"><b>32</b> — 97 &minus; 65. In binary that is the single bit worth 32 (the third from
      the left in a byte). Uppercase <code>0b0100 0001</code> vs lowercase <code>0b0110 0001</code>: one bit
      apart.</div>
    </div>
  </div>
</section>

<!-- ============ IO ============ -->
<section class="topic" id="l2-io">
  <h2>Lesson 2 &middot; <code>getchar</code>, <code>putchar</code>, and EOF</h2>

  <div class="card">
    <table class="cmp">
      <tr><th>Function</th><th>What it does</th></tr>
      <tr><td><code>getchar()</code></td><td>Reads <b>one character</b> from the input (a keyboard or a file) and <b>returns it as an integer</b></td></tr>
      <tr><td><code>putchar(c)</code></td><td>Takes the character stored in <code>c</code> and prints it to the output</td></tr>
    </table>
    <p class="muted">Both live in <code>&lt;stdio.h&gt;</code>, so you need that include.</p>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> my_char = <span class="fn">getchar</span>();
    <span class="fn">printf</span>(<span class="st">"The user entered: %c\\n"</span>, my_char);
}</pre>
  </div>

  <h3>EOF, and why <code>getchar</code> returns an <code>int</code></h3>
  <div class="card">
    <p><b>EOF</b> stands for <b>End of File</b>. It is a special value returned by <code>getchar()</code>
    when there is no more input to read.</p>
    <div class="concept"><b>EOF is the reason <code>getchar()</code> returns an <code>int</code> instead of a
    <code>char</code>.</b> EOF must be distinguishable from <i>any</i> valid character. In the ASCII
    character set all valid characters are encoded as integers from <b>0 to 255</b>; if EOF were encoded as
    a <code>char</code> it could collide with a real character value. The slides give the concrete case: if
    EOF were represented as 255 on a system where <code>char</code> is unsigned, it would conflict with the
    ASCII value for the <b>&yuml;</b> character.</div>
    <p class="muted">An <code>int</code> is wider than a <code>char</code>, so there is room for a value
    outside 0&ndash;255 that no real character can ever equal. You signal EOF manually with
    <kbd>Ctrl</kbd>+<kbd>D</kbd> on Linux/macOS, or <kbd>Ctrl</kbd>+<kbd>Z</kbd> on Windows.</p>
  </div>

  <h3>The echo loop, two ways</h3>
  <div class="card">
    <p>This reads characters until EOF and prints each one — it copies input to output, one character at a
    time.</p>
    <div class="two">
      <div>
        <h4>Explicit</h4>
<pre><span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> c = <span class="fn">getchar</span>();
    <span class="kw">while</span> (c != EOF) {
        <span class="fn">putchar</span>(c);
        c = <span class="fn">getchar</span>();
    }
}</pre>
      </div>
      <div>
        <h4>Concise (the idiom)</h4>
<pre><span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> c;
    <span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
        <span class="fn">putchar</span>(c);
    }
}</pre>
      </div>
    </div>
    <p class="muted">The right-hand version reads inside the condition: <b>first</b> <code>c</code> gets the
    next character, <b>then</b> the <code>while</code> checks whether that character is EOF. The inner
    parentheses around <code>(c = getchar())</code> are <b>required</b> — without them, precedence would
    compare <code>getchar()</code> to <code>EOF</code> first and assign the resulting 0 or 1 to
    <code>c</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does <code>getchar()</code> return an <code>int</code> rather than a <code>char</code>?</div>
      <button class="opt" data-i="0">Because <code>int</code> is faster on modern hardware</button>
      <button class="opt" data-i="1">Because characters can be larger than one byte</button>
      <button class="opt" data-i="2">So EOF can be a value distinguishable from every valid character (0&ndash;255)</button>
      <button class="opt" data-i="3">Because <code>putchar</code> requires an <code>int</code></button>
      <div class="fb">EOF has to be a value that <b>no real character can equal</b>. A <code>char</code> has
      no spare values left; an <code>int</code> does.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>In <code>while ((c = getchar()) != EOF)</code>, the inner parentheses are optional style.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">They are <b>required</b>. <code>!=</code> binds tighter than <code>=</code>, so
      <code>c = getchar() != EOF</code> would compare first and then assign the <i>comparison result</i>
      (0 or 1) into <code>c</code> — the loop would run, but <code>c</code> would never hold a character.</div>
    </div>
  </div>
</section>

<!-- ============ IN-CLASS ============ -->
<section class="topic" id="l2-inclass">
  <h2>Lesson 2 &middot; In-Class Problems</h2>

  <div class="card">
    <h3 style="margin-top:0">Problem 1 &mdash; is this character a letter?</h3>
    <p>Fill in the blank so the program reports whether the user entered <b>any</b> letter.</p>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> my_char = <span class="fn">getchar</span>();
    <span class="kw">if</span> (________________) {
        <span class="fn">printf</span>(<span class="st">"The user entered a letter.\\n"</span>);
    } <span class="kw">else</span> {
        <span class="fn">printf</span>(<span class="st">"The user did not enter a letter.\\n"</span>);
    }
}</pre>
    <div class="q" data-mc="2">
      <button class="opt" data-i="0"><b>A.</b> <code>my_char &gt;= 'A' &amp;&amp; my_char &lt;= 'z'</code></button>
      <button class="opt" data-i="1"><b>B.</b> <code>my_char &gt;= 'A' || my_char &lt;= 'z'</code></button>
      <button class="opt" data-i="2"><b>C.</b> <code>(my_char &gt;= 'A' &amp;&amp; my_char &lt;= 'Z') || (my_char &gt;= 'a' &amp;&amp; my_char &lt;= 'z')</code></button>
      <button class="opt" data-i="3"><b>D.</b> <code>(my_char &gt;= 'A' &amp;&amp; my_char &lt;= 'Z') &amp;&amp; (my_char &gt;= 'a' &amp;&amp; my_char &lt;= 'z')</code></button>
      <div class="fb"><b>C.</b> You need <i>two separate ranges</i> joined by OR, because uppercase and
      lowercase are not adjacent in ASCII.
      <br>&nbsp;&nbsp;<b>A</b> looks tempting but the range 65&ndash;122 also swallows the six characters
      between <code>'Z'</code> (90) and <code>'a'</code> (97): <code>[ \\ ] ^ _ \`</code>.
      <br>&nbsp;&nbsp;<b>B</b> is true for almost every input — <code>||</code> makes it far too permissive.
      <br>&nbsp;&nbsp;<b>D</b> uses <code>&amp;&amp;</code>, asking the character to be uppercase
      <i>and</i> lowercase at once. Always false.
      <br><br>The C standard library also has <b><code>isalpha()</code></b> in <code>&lt;ctype.h&gt;</code>,
      which does exactly this.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Problem 2 &mdash; trace the echo program</h3>
    <p>Given the input <code>HeLlO, WorLD!</code>, what does this print?</p>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> c;
    <span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
        <span class="kw">if</span> (c &gt;= <span class="st">'a'</span> &amp;&amp; c &lt;= <span class="st">'z'</span>) {
            c = c - (<span class="st">'a'</span> - <span class="st">'A'</span>);
        }
        <span class="fn">putchar</span>(c);
    }
}</pre>
    <div class="q" data-mc="2">
      <button class="opt" data-i="0"><b>A.</b> <code>hello, world!</code></button>
      <button class="opt" data-i="1"><b>B.</b> <code>HLO, WLD</code></button>
      <button class="opt" data-i="2"><b>C.</b> <code>HELLO, WORLD!</code></button>
      <button class="opt" data-i="3"><b>D.</b> <code>el, or!</code></button>
      <div class="fb"><b>C — <code>HELLO, WORLD!</code></b>. Walk it: the <code>if</code> catches only
      lowercase letters and subtracts <code>'a' - 'A'</code> = <b>32</b>, converting them to uppercase.
      Characters that are already uppercase, plus the comma, space and <code>!</code>, fail the test and are
      passed through unchanged by <code>putchar</code>. <b>Nothing is ever dropped</b> — <code>putchar</code>
      sits outside the <code>if</code> — which rules out B and D immediately.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Write it yourself</h3>
    <p>Write a complete C program that reads one character and prints both its ASCII code and the character
    itself, in the form <code>A has code 65</code>.</p>
    <textarea placeholder="#include ..."></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> c = <span class="fn">getchar</span>();
    <span class="fn">printf</span>(<span class="st">"%c has code %d\\n"</span>, c, c);   <span class="cm">// same value, two placeholders</span>
    <span class="kw">return</span> <span class="nm">0</span>;
}</pre>
      <p class="muted">Compile and run it:</p>
<pre>$ gcc code.c -o code
$ ./code</pre>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Write it yourself &mdash; lowercase echo</h3>
    <p>Modify the echo loop so it converts <b>uppercase</b> letters to lowercase instead.</p>
    <textarea placeholder="int main() { ... }"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> c;
    <span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
        <span class="kw">if</span> (c &gt;= <span class="st">'A'</span> &amp;&amp; c &lt;= <span class="st">'Z'</span>) {
            c = c + (<span class="st">'a'</span> - <span class="st">'A'</span>);   <span class="cm">// ADD 32 this time</span>
        }
        <span class="fn">putchar</span>(c);
    }
}</pre>
      <p class="muted">Two changes: test the <b>uppercase</b> range, and <b>add</b> 32 rather than
      subtracting it. Writing <code>('a' - 'A')</code> instead of a bare <code>32</code> keeps the intent
      readable.</p>
    </div>
  </div>
</section>

<!-- ============ RD01 ============ -->
<section class="topic" id="l2-rd01">
  <h2>RD01 &middot; Intro to C — Self-Check</h2>
  <p class="muted">Covers the four RD01 readings: <i>Dive into Systems</i> &sect;16.1 (getting started),
  &sect;16.2 (input/output), &sect;16.3 (conditionals), &sect;16.5 (arrays &amp; strings).</p>

  <h3>Part 1 &middot; Getting started (&sect;16.1)</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q1</span>Conventional file extension for a C source file?</div>
      <button class="opt" data-i="0"><code>.java</code></button><button class="opt" data-i="1"><code>.class</code></button>
      <button class="opt" data-i="2"><code>.c</code></button><button class="opt" data-i="3"><code>.exe</code></button>
      <div class="fb"><b><code>.c</code></b>. <code>.class</code> is compiled Java bytecode and <code>.exe</code> is a Windows executable — both outputs, not source.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>How are libraries included in C?</div>
      <button class="opt" data-i="0">Using <code>import</code></button><button class="opt" data-i="1">Inside the main function</button>
      <button class="opt" data-i="2">Using <code>#include</code> at the top of the file</button><button class="opt" data-i="3">Automatically by the runtime system</button>
      <div class="fb"><b><code>#include</code> at the top</b>, outside any function body. <code>import</code> is Java's keyword.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>Which statement about <code>main</code> is true for C?</div>
      <button class="opt" data-i="0">It must be a void function</button><button class="opt" data-i="1">There can be multiple <code>main</code> functions</button>
      <button class="opt" data-i="2">It must return an <code>int</code></button><button class="opt" data-i="3">It must be part of a class</button>
      <div class="fb"><b>It must return an <code>int</code></b> — the exit status. C has no classes at all.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>Programming paradigms of Java and C?</div>
      <button class="opt" data-i="0">Both purely object-oriented</button><button class="opt" data-i="1">Both purely procedural</button>
      <button class="opt" data-i="2">Java is object-oriented; C is procedural</button><button class="opt" data-i="3">Java is procedural; C is object-oriented</button>
      <div class="fb">"Java is a purely object oriented language... C is a purely imperative and procedural language, and thus there are no classes in C."</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>Valid C variable declaration?</div>
      <button class="opt" data-i="0"><code>x int;</code></button><button class="opt" data-i="1"><code>int x;</code></button>
      <button class="opt" data-i="2"><code>declare int x;</code></button><button class="opt" data-i="3"><code>x = int;</code></button>
      <div class="fb"><code>type_name variable_name;</code> — type first, same as Java.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>Key difference between <code>'h'</code> and <code>"h"</code>?</div>
      <button class="opt" data-i="0">No difference</button><button class="opt" data-i="1"><code>'h'</code> is a string, <code>"h"</code> is a char</button>
      <button class="opt" data-i="2"><code>'h'</code> is a char, <code>"h"</code> is a string literal</button><button class="opt" data-i="3">Both represent integers</button>
      <div class="fb">One byte (value 104) versus a two-byte array holding <code>'h'</code> and <code>'\\0'</code>. Option 1 has the pairing backwards.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span>Result of <code>11 / 2</code> in C?</div>
      <button class="opt" data-i="0">5.5</button><button class="opt" data-i="1">5</button>
      <button class="opt" data-i="2">6</button><button class="opt" data-i="3">A compiler error</button>
      <div class="fb"><b>5</b> — int / int is integer division, <b>truncated</b>, not rounded.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q8</span><code>int x = 6; int y = x++ + 2;</code> — value of <code>y</code>?</div>
      <button class="opt" data-i="0">6</button><button class="opt" data-i="1">7</button>
      <button class="opt" data-i="2">8</button><button class="opt" data-i="3">9</button>
      <div class="fb"><b>8.</b> Post-increment hands over the <i>old</i> value 6, so y = 6 + 2, and only then does x become 7. (<code>++x</code> would give 9.)</div>
    </div>
  </div>

  <h3>Part 2 &middot; Input / Output (&sect;16.2)</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What does a format string do in <code>printf</code>?</div>
      <button class="opt" data-i="0">Specifies how many variables exist</button><button class="opt" data-i="1">Defines how output should be formatted</button>
      <button class="opt" data-i="2">Stores user input</button><button class="opt" data-i="3">Converts strings to integers</button>
      <div class="fb">Literal text + escape sequences + placeholders for the values that follow.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>What character begins a placeholder?</div>
      <button class="opt" data-i="0"><code>\\</code></button><button class="opt" data-i="1"><code>$</code></button>
      <button class="opt" data-i="2"><code>%</code></button><button class="opt" data-i="3"><code>#</code></button>
      <div class="fb"><b><code>%</code></b>. The backslash is the <i>escape</i> character — a different job.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q3</span>Placeholder to print an integer?</div>
      <button class="opt" data-i="0"><code>%f</code></button><button class="opt" data-i="1"><code>%g</code></button>
      <button class="opt" data-i="2"><code>%s</code></button><button class="opt" data-i="3"><code>%d</code></button>
      <div class="fb"><b><code>%d</code></b> — d for decimal.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>Placeholder to print a string?</div>
      <button class="opt" data-i="0"><code>%c</code></button><button class="opt" data-i="1"><code>%d</code></button>
      <button class="opt" data-i="2"><code>%s</code></button><button class="opt" data-i="3"><code>%g</code></button>
      <div class="fb"><b><code>%s</code></b>. <code>%c</code> is a single character — one char is not a string.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q5</span>Escape sequence for a newline?</div>
      <button class="opt" data-i="0"><code>\\t</code></button><button class="opt" data-i="1"><code>\\b</code></button>
      <button class="opt" data-i="2"><code>\\n</code></button><button class="opt" data-i="3"><code>\\r</code></button>
      <div class="fb"><b><code>\\n</code></b>. <code>\\t</code> tab, <code>\\b</code> backspace, <code>\\r</code> carriage return.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>What does <code>%c</code> print?</div>
      <button class="opt" data-i="0">A string</button><button class="opt" data-i="1">A floating-point value</button>
      <button class="opt" data-i="2">A character corresponding to a numeric ASCII value</button><button class="opt" data-i="3">A memory address</button>
      <div class="fb"><code>printf("%c", 65)</code> prints <code>A</code> — this is the whole "bits are just bits" idea in one placeholder.</div>
    </div>
  </div>

  <h3>Part 3 &middot; Conditionals (&sect;16.3)</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q1</span>True about Boolean types in C?</div>
      <button class="opt" data-i="0">C has a built-in boolean type like Java</button><button class="opt" data-i="1">C has true and false keywords by default</button>
      <button class="opt" data-i="2">C uses integers as Boolean values in conditionals</button><button class="opt" data-i="3">C only allows Boolean expressions in if statements</button>
      <div class="fb">"C doesn't provide a Boolean type with true or false values."</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>The integer <code>0</code> evaluates to:</div>
      <button class="opt" data-i="0">true</button><button class="opt" data-i="1">false</button>
      <button class="opt" data-i="2">depends on the compiler</button><button class="opt" data-i="3">depends on whether it is signed</button>
      <div class="fb"><b>false</b> — the one and only false value.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q3</span>Any nonzero integer evaluates to:</div>
      <button class="opt" data-i="0">true</button><button class="opt" data-i="1">false</button>
      <button class="opt" data-i="2">only positive values are true</button><button class="opt" data-i="3">only negative values are true</button>
      <div class="fb"><b>true</b> — "any positive <i>or negative</i> value." <code>-1</code> is true.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q4</span>What does "short-circuiting" mean for <code>&amp;&amp;</code>?</div>
      <button class="opt" data-i="0">Evaluation stops when the result is already known to be false</button><button class="opt" data-i="1">Both operands are always evaluated</button>
      <button class="opt" data-i="2">The second operand is evaluated first</button><button class="opt" data-i="3">Evaluation stops only if both operands are true</button>
      <div class="fb">If the first operand is false the answer must be false, so the second is never evaluated. This is what makes <code>i &lt; size &amp;&amp; arr[i] == 0</code> a safe guard.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q5</span>Why does the text recommend parentheses around complex Boolean expressions?</div>
      <button class="opt" data-i="0">They make the program run faster</button><button class="opt" data-i="1">They are required in C but not Java</button>
      <button class="opt" data-i="2">They prevent short-circuit evaluation</button><button class="opt" data-i="3">They make expressions easier to read and less error-prone</button>
      <div class="fb">Readability only. Parentheses change nothing about speed, are not required, and do not disable short-circuiting.</div>
    </div>
  </div>

  <h3>Part 4 &middot; Arrays (&sect;16.5)</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>Valid C syntax for an array of 10 integers?</div>
      <button class="opt" data-i="0"><code>int[] nums = new int[10];</code></button><button class="opt" data-i="1"><code>int nums[10];</code></button>
      <button class="opt" data-i="2"><code>array&lt;int&gt; nums(10);</code></button><button class="opt" data-i="3"><code>int nums = [10];</code></button>
      <div class="fb">Brackets go after the <i>name</i>. Option 0 is Java, option 2 is C++.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>Java vs C on invalid array indices?</div>
      <button class="opt" data-i="0">Both throw runtime exceptions</button><button class="opt" data-i="1">Java allows invalid indices, but C does not</button>
      <button class="opt" data-i="2">Java throws an exception, while C has undefined behavior</button><button class="opt" data-i="3">Both prevent compilation</button>
      <div class="fb">Java raises <code>ArrayIndexOutOfBoundsException</code>; C does no bounds checking at all.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>What happens in C on an invalid index like <code>array[10]</code> when the size is 10?</div>
      <button class="opt" data-i="0">The compiler always catches the error</button><button class="opt" data-i="1">The program always crashes immediately</button>
      <button class="opt" data-i="2">The behavior is undefined and could vary across runs</button><button class="opt" data-i="3">C throws an exception</button>
      <div class="fb">Watch the word <i>always</i> in the wrong options. It "can lead to your program crashing, it can change another variable's value, or it might have no effect."</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span><code>int array[10]; array[10] = 100;</code> — what happens?</div>
      <button class="opt" data-i="0">Compiler error</button><button class="opt" data-i="1">The program always crashes</button>
      <button class="opt" data-i="2">The program behavior is undefined</button><button class="opt" data-i="3">The assignment is ignored safely</button>
      <div class="fb">Valid indices are <b>0 through 9</b>. Index 10 is one past the end — the write happens, it just lands somewhere it shouldn't.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q5</span>Who ensures array indices are valid in C?</div>
      <button class="opt" data-i="0">The compiler</button><button class="opt" data-i="1">The operating system</button>
      <button class="opt" data-i="2">The runtime system</button><button class="opt" data-i="3">The programmer</button>
      <div class="fb">"As a C programmer, it's up to you to ensure that your array accesses refer to valid positions!"</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>In <code>void print_array(int arr[], int size);</code>, what does <code>arr[]</code> indicate?</div>
      <button class="opt" data-i="0">A single integer</button><button class="opt" data-i="1">An array of fixed size</button>
      <button class="opt" data-i="2">An array of any capacity</button><button class="opt" data-i="3">Passed by reference</button>
      <div class="fb">Empty brackets carry <b>no size</b> — which is exactly why the separate <code>size</code> parameter exists.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span><code>void test(int a[], int size) { a[3] = 8; }</code> — what happens when called with an array?</div>
      <button class="opt" data-i="0">Only the local copy is changed</button><button class="opt" data-i="1">The original array's element at index 3 is changed</button>
      <button class="opt" data-i="2">The program crashes</button><button class="opt" data-i="3">Nothing unless <code>size</code> &gt; 3</button>
      <div class="fb">No copy of the elements is ever made — "the changes <i>will</i> persist when the function returns." Option 3 is a trap: the function ignores <code>size</code> entirely.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q8</span>Why does modifying <code>a[3]</code> affect <code>arr[3]</code> in <code>main</code>?</div>
      <button class="opt" data-i="0">Arrays are passed by reference in C</button><button class="opt" data-i="1">Arrays are global by default</button>
      <button class="opt" data-i="2">Both <code>a</code> and <code>arr</code> refer to the same memory</button><button class="opt" data-i="3">The compiler optimizes the code</button>
      <div class="fb">The parameter received a copy of the array's <b>base address</b>. "Passed by reference" is tempting, but C has no reference parameters — copying an address is still pass-by-value.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q9</span>Why do C functions taking arrays usually also take a size parameter?</div>
      <button class="opt" data-i="0">Arrays cannot be indexed without it</button><button class="opt" data-i="1"><code>printf</code> requires it</button>
      <button class="opt" data-i="2">The function cannot determine the array's size from the array variable alone</button><button class="opt" data-i="3">Arrays in C can store different types</button>
      <div class="fb">"There is no way to get an array's size or capacity just from the array variable." There is no <code>arr.length</code> in C.</div>
    </div>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET 1 — compilation pipeline stepper
   ============================================================ */
var PIPE = [
  { on: 0, title: 'hello.c  (what you write)',
    body: '#include <stdio.h>\n\nint main() {\n    printf("Hello, world!\\n");\n    return 0;\n}',
    desc: 'A <b>high-level language</b>. Easy for humans to read and write, and not tied to any particular processor. Save it with the <b>.c</b> extension.' },
  { on: 1, title: '$ gcc hello.c        [compiler]',
    body: 'main:\n    push    rbp\n    mov     rbp, rsp\n    lea     rdi, [rip + .L.str]\n    call    printf\n    xor     eax, eax\n    pop     rbp\n    ret',
    desc: 'The <b>compiler</b> translates your C into <b>assembly language</b> — a <b>low-level</b> language. Still human readable, but now specific to this processor family.' },
  { on: 2, title: '$ gcc hello.c        [assembler]',
    body: '0010011110111101111111111111000\n1010111110111110000000000000100\n0000001110100000111100000010010\n1010111110001000000000000001000\n0000000000000000000000000000000',
    desc: 'The <b>assembler</b> translates assembly into <b>machine code</b> — binary instructions the processor actually executes. Machines can read <i>only</i> this.' },
  { on: 3, title: 'a.out  (the executable)',
    body: '$ ls\na.out    hello.c\n\n(gcc hello.c -o hello  would have named it "hello" instead)',
    desc: 'The output is an <b>executable file</b>. By default it is named <b>a.out</b>; <code>-o</code> renames it. Note that <code>gcc</code> printed nothing — silence means success.' },
  { on: 4, title: '$ ./a.out',
    body: 'Hello, world!\n\n$ echo $?\n0',
    desc: 'Run it with <b>./</b> because the current directory is not on your <code>PATH</code>. The program starts at <b>main</b>, and its <code>return 0</code> becomes the <b>exit status</b> — 0 for success.' }
];
var plStep = 0;
function pipeStep(d) { plStep = Math.max(0, Math.min(PIPE.length - 1, plStep + d)); pipeRender(); }
function pipeReset() { plStep = 0; pipeRender(); }
function pipeRender() {
  var labels = [
    ['C source', 'hello.c'], ['Compiler', 'gcc'], ['Assembler', 'gcc'],
    ['Executable', 'a.out'], ['Run', './a.out']
  ];
  var s = PIPE[plStep];
  document.getElementById('pl-stages').innerHTML = labels.map(function (l, i) {
    return '<div class="stage' + (i === s.on ? ' on' : '') + '"><div class="t">' + l[0] +
      '</div><div class="s">' + l[1] + '</div></div>';
  }).join('');
  document.getElementById('pl-code').textContent = s.title + '\n\n' + s.body;
  document.getElementById('pl-desc').innerHTML = s.desc;
  document.getElementById('pl-count').textContent = 'step ' + (plStep + 1) + ' of ' + PIPE.length;
}

/* ============================================================
   WIDGET 2 — one byte, three readings
   ============================================================ */
var bxBits = [0, 0, 0, 0, 0, 0, 0, 0];
function bxVal() { var v = 0; for (var i = 0; i < 8; i++) if (bxBits[i]) v += Math.pow(2, 7 - i); return v; }
function bxSet(v) { v = Math.max(0, Math.min(255, v | 0)); for (var i = 0; i < 8; i++) bxBits[7 - i] = (v >> i) & 1; bxRender(); }
function bxFlip(i) { bxBits[i] = bxBits[i] ? 0 : 1; bxRender(); }
function bxFromChar() {
  var s = document.getElementById('bx-char').value;
  if (s.length) bxSet(s.charCodeAt(0));
}
function bxFromNum() {
  var n = parseInt(document.getElementById('bx-num').value, 10);
  if (!isNaN(n)) bxSet(n);
}
function bxName(v) {
  if (v === 32) return 'space';
  if (v === 0) return 'NUL  (the null character, \\0)';
  if (v === 10) return 'LF  (newline, \\n)';
  if (v === 9) return 'TAB  (\\t)';
  if (v < 32 || v === 127) return 'a non-printing control character';
  return "'" + String.fromCharCode(v) + "'";
}
function bxRender() {
  var v = bxVal(), html = '';
  for (var i = 0; i < 8; i++) {
    html += '<div class="bit' + (bxBits[i] ? ' on' : '') + '" onclick="bxFlip(' + i + ')">' +
      bxBits[i] + '<span class="pv">' + Math.pow(2, 7 - i) + '</span></div>';
  }
  document.getElementById('bx-bits').innerHTML = html;
  document.getElementById('bx-bin').textContent = '0b' + bxBits.slice(0, 4).join('') + ' ' + bxBits.slice(4).join('');
  document.getElementById('bx-dec').textContent = v;
  document.getElementById('bx-chr').textContent = (v >= 33 && v !== 127) ? String.fromCharCode(v) : '\u00b7';
  document.getElementById('bx-num').value = v;
  document.getElementById('bx-char').value = (v >= 33 && v !== 127) ? String.fromCharCode(v) : '';

  var note = 'These 8 bits are <b>' + v + '</b> read as a decimal integer, and ' + bxName(v) +
    ' read as an ASCII character. <b>Nothing about the bits changed</b> &mdash; only the interpretation did.';
  if (v >= 65 && v <= 90) note += ' This is an <b>uppercase</b> letter; add 32 to reach ' + "'" + String.fromCharCode(v + 32) + "'.";
  else if (v >= 97 && v <= 122) note += ' This is a <b>lowercase</b> letter; subtract 32 to reach ' + "'" + String.fromCharCode(v - 32) + "'.";
  else if (v >= 48 && v <= 57) note += ' This is the <b>digit character</b> ' + "'" + String.fromCharCode(v) + "'" + ' &mdash; note that it is not the number ' + (v - 48) + '. Subtract 48 to get the numeric value.';
  document.getElementById('bx-note').innerHTML = note;
}

function initL2() { pipeRender(); bxSet(65); }
