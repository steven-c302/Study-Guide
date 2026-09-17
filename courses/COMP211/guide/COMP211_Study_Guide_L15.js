/* ============================================================
   LESSON 15 — CL10 Debugging (VS Code / gdb), incl. RD09.
   Injects into #l15. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l15').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l15-basics')">1 &middot; Breakpoints, Stepping &amp; Watch</button>
  <button onclick="showTopic(this,'l15-buffer')">2 &middot; I/O Buffering &amp; fflush</button>
  <button onclick="showTopic(this,'l15-config')">3 &middot; launch.json &amp; tasks.json</button>
  <button onclick="showTopic(this,'l15-process')">4 &middot; The Debugging Process</button>
  <button onclick="showTopic(this,'l15-rd09')">RD09 Self-Check</button>
</nav>
<main>

<!-- ============ BASICS ============ -->
<section class="topic active" id="l15-basics">
  <h2>CL10 &middot; Breakpoints, Stepping &amp; the Watch Panel</h2>

  <div class="concept">A <b>debugger</b> lets you pause a running program and inspect its state, instead of
  guessing from <code>printf</code> output alone. VS Code's debugger for C is <b>GDB</b>, driven through the
  Microsoft C/C++ extension.</div>

  <h3>Breakpoints</h3>
  <div class="card">
    <p>Click in the <b>gutter</b> (the strip to the left of the line numbers) to drop a breakpoint — a red dot
    appears. When you launch the debugger, execution runs normally until it reaches that line, then pauses
    <i>before</i> that line executes.</p>
<pre>#include &lt;stdio.h&gt;
int main() {
    int my_char;
&#9679;   while ((my_char = getchar()) != EOF) {   &lt;- breakpoint here
        if (my_char &gt;= 'a' &amp;&amp; my_char &lt;= 'z') {
            my_char = my_char - ('a' - 'A');
        }
        putchar(my_char);
        fflush(stdout);
    }
}</pre>
  </div>

  <h3>Launching &amp; stepping</h3>
  <div class="card">
    <p>Click the debug button in the upper-right, then choose <b>Debug active file</b>. Once paused at a
    breakpoint, the stepping toolbar controls execution one line (or one function) at a time.</p>
    <table class="cmp">
      <tr><th></th><th>Step Over</th><th>Step Into</th></tr>
      <tr><td><b>Definition</b></td><td>Executes the current line completely but skips stepping into any
      functions it calls.</td><td>Executes the current line and pauses <i>inside</i> any function it
      calls.</td></tr>
      <tr><td><b>Use case</b></td><td>You don't care about a function's internals — just move to the next
      line of the current function.</td><td>You want to examine what's happening inside the called
      function.</td></tr>
      <tr><td><b>What happens</b></td><td>If the line calls a function, that function runs to completion in
      one jump.</td><td>The debugger pauses at the first line inside the callee; you can step through it line
      by line.</td></tr>
    </table>
    <p class="muted">On the demo program's <code>getchar()</code> line, step-over and step-into behave the
    same way in practice, since there's no interesting internal logic to inspect inside
    <code>getchar</code>.</p>
  </div>

  <h3>Reading variables — the Variables and Watch panels</h3>
  <div class="card">
    <p>The <b>Variables</b> panel (left side) shows local variables live as you step. A variable declared
    <code>int</code> is shown in <b>decimal</b>, even if it's conceptually holding a character — after
    <code>getchar()</code> reads <code>'a'</code>, the panel shows <code>c = 97</code>, not <code>'a'</code>.</p>
    <div class="concept">To see a variable's <b>char</b> interpretation, add a <b>watch expression</b>: open
    the <b>Watch</b> panel (just below Variables), click <b>+</b>, and type a cast like <code>(char)c</code>.
    A watchpoint lets you monitor a specific variable or memory location as the program runs, and casting is
    how you re-interpret the same bits in a more useful type.</div>
<pre>WATCH
  (char)c = 97 'a'</pre>
    <p>As you keep stepping, watch this same expression update: after the code uppercases it,
    <code>(char)c</code> becomes <code>65 'A'</code>; on the next loop iteration reading a newline,
    it becomes <code>10 '\\n'</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does the Variables panel show <code>c = 97</code> instead of <code>c = 'a'</code> after reading a lowercase 'a'?</div>
      <button class="opt" data-i="0">The debugger made a mistake</button>
      <button class="opt" data-i="1"><code>c</code> is declared as <code>int</code>, so the panel displays it in decimal — the same bits interpreted as a different type</button>
      <button class="opt" data-i="2">'a' can't be stored in a variable</button>
      <button class="opt" data-i="3">Only <code>char</code>-typed variables show numeric values</button>
      <div class="fb">The debugger displays a variable according to its declared type. Since <code>c</code> was
      declared <code>int</code>, its bits are shown as a decimal integer — a watch expression that casts to
      <code>char</code> is what re-interprets those same bits as an ASCII character.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Step Over and Step Into always behave differently, no matter what line you're stepping from.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> They only diverge when the current line calls a function. On a line with
      no function call (or a call with nothing interesting to inspect inside), both do the same thing.</div>
    </div>
  </div>
</section>

<!-- ============ BUFFERING ============ -->
<section class="topic" id="l15-buffer">
  <h2>CL10 &middot; Input/Output Buffering &amp; <code>fflush</code></h2>

  <div class="concept">Terminal I/O is <b>buffered</b> — data doesn't move character-by-character between your
  program and the terminal. It sits in memory until something forces it through.</div>

  <h3>Input buffering</h3>
  <div class="card">
    <p>Input from stdin is stored in a buffer before it's handed to your program. When you type at the
    terminal, nothing reaches your program until:</p>
    <ul>
      <li>you press <b>Enter</b>, or</li>
      <li>the buffer fills up.</li>
    </ul>
    <p>This is why, when stepping through <code>getchar()</code>, the program appears to "hang" waiting on the
    terminal — it isn't stuck, it's genuinely waiting for you to press Enter before the buffer flushes and
    <code>getchar()</code> can return the first character.</p>
  </div>

  <h3>Output buffering</h3>
  <div class="card">
    <p>Text you send with <code>printf</code> (or <code>putchar</code>) is also stored temporarily in a
    buffer, and only actually sent to the terminal — <b>flushed</b> — when:</p>
    <ul>
      <li>a newline character (<code>\\n</code>) is encountered,</li>
      <li>the buffer fills up, or</li>
      <li>the program explicitly flushes it with <code>fflush(stdout)</code>.</li>
    </ul>
    <p class="muted">Example: the buffer can be holding <code>"Apples\\n"</code> internally before it's ever
    written out — the newline is what triggers the flush.</p>
  </div>

  <div class="card">
    <h3>Why the demo program calls <code>fflush(stdout)</code> every iteration</h3>
    <p><code>printf</code>/<code>putchar</code> use buffered I/O — text is stored internally and only sent to
    the terminal when the buffer is flushed (newline, full buffer, or program exit). If you don't call
    <code>fflush(stdout)</code> while debugging, you may not see your program's output <i>immediately</i> as
    you step through the code, which makes it much harder to observe intermediate states one character at a
    time. Calling <code>fflush(stdout)</code> forces the buffer out right away, so each character appears the
    moment it's produced.</p>
    <div class="q">
      <p>Fill in: without <code>fflush(stdout)</code>, output can sit in the ____ until a newline is printed, the buffer fills, or the program ends.</p>
      <input class="fillblank" data-answer="buffer~~~output buffer">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"></div>
    </div>
  </div>
</section>

<!-- ============ LAUNCH/TASKS CONFIG ============ -->
<section class="topic" id="l15-config">
  <h2>CL10 &middot; <code>launch.json</code> &amp; <code>tasks.json</code></h2>

  <div class="concept">These are both <b>hidden files</b> (name starts with <code>.</code>, like
  <code>.vscode</code>, <code>.git</code>, <code>.gitignore</code>, <code>.bashrc</code>) — not shown by a
  normal directory listing, used for configuration and metadata you don't usually touch directly.</div>

  <h3><code>tasks.json</code> — how the build happens</h3>
  <div class="card">
    <p>Before the debugger configuration starts, VS Code runs the task named by
    <code>"preLaunchTask": "build"</code>, which is defined in <code>.vscode/tasks.json</code>:</p>
<pre>"command": "gcc",
"args": [
  "-fdiagnostics-color=always", "-g", "-Wall", "-Wextra", "-Wpedantic",
  "\${file}", "-o", "\${fileDirname}/\${fileBasenameNoExtension}"
]</pre>
    <table class="cmp">
      <tr><th>Variable</th><th>Meaning</th></tr>
      <tr><td><code>\${file}</code></td><td>the currently active file in VS Code</td></tr>
      <tr><td><code>\${fileDirname}</code></td><td>the directory containing the active file</td></tr>
      <tr><td><code>\${fileBasenameNoExtension}</code></td><td>the active file's name, without its extension</td></tr>
    </table>
    <p class="muted">For active file <code>/home/student/project/main.c</code>, this expands to:</p>
<pre>gcc -fdiagnostics-color=always -g -Wall -Wextra -Wpedantic \\
    /home/student/project/main.c -o /home/student/project/main</pre>
    <p>The executable takes the source file's base name — <code>main.c</code> produces <code>main</code>.</p>
  </div>

  <h3><code>launch.json</code> — how the debugger runs it</h3>
  <div class="card">
    <p>After the build finishes, VS Code reads <code>.vscode/launch.json</code> to decide how to actually run
    the program under the debugger.</p>
    <table class="cmp">
      <tr><th>Field</th><th>Meaning</th></tr>
      <tr><td><code>"type": "cppdbg"</code></td><td>use Microsoft's <b>C/C++ extension</b> as the debug adapter for this configuration</td></tr>
      <tr><td><code>"MIMode": "gdb"</code></td><td>the debug adapter should talk to <b>GDB</b> — "MI" stands for Machine Interface, GDB's programmatic control interface</td></tr>
      <tr><td><code>"preLaunchTask": "build"</code></td><td>run the <code>build</code> task from tasks.json first</td></tr>
    </table>
    <div class="concept">Layering, top to bottom: <b>VS Code</b> (the UI you interact with) &rarr;
    <b>cppdbg</b> (the middle-layer debug adapter) &rarr; <b>GDB</b> (the program actually doing the
    debugging). GDB is the thing actually debugging your program; VS Code and cppdbg are the interface
    that lets you control it.</div>
  </div>

  <h3>Two debug configurations: plain vs. redirected input</h3>
  <div class="card">
    <p><b>Debug active file</b> launches the compiled executable directly:</p>
<pre>"program": "\${fileDirname}/\${fileBasenameNoExtension}"</pre>
    <p><b>Debug with input redirected</b> works differently — instead of launching the program directly, it
    launches <b>Bash</b> and hands Bash a command to run:</p>
<pre>"program": "/bin/bash",
"args": [
  "-lc",
  "\\"\${fileDirname}/\${fileBasenameNoExtension}\\" &lt; \\"\${fileDirname}/test\\""
]</pre>
    <p class="muted">After variable substitution, that's effectively:</p>
<pre>/home/student/project/main &lt; /home/student/project/test</pre>
    <p>which runs the program with <b>stdin redirected</b> from the file <code>test</code>, instead of reading
    from the interactive terminal. To read from a different file, or one in a subdirectory, just edit the
    path after <code>&lt;</code> in <code>args</code> — e.g. <code>\${fileDirname}/example.in</code> or
    <code>\${fileDirname}/one_dir/two_dir/new_example</code>.</p>
    <table class="cmp">
      <tr><th>Flag</th><th>Meaning</th></tr>
      <tr><td><code>-c</code></td><td>execute the command that follows, then exit (rather than starting an interactive shell that waits for typed commands)</td></tr>
      <tr><td><code>-l</code></td><td>behave as a <b>login shell</b>, which affects which shell startup files/environment get loaded</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What does <code>"Debug with input redirected"</code> actually launch under the debugger?</div>
      <button class="opt" data-i="0">The compiled executable directly, same as "Debug active file"</button>
      <button class="opt" data-i="1">GDB in a special redirected mode</button>
      <button class="opt" data-i="2"><code>/bin/bash</code>, given a <code>-c</code> command that runs the executable with <code>&lt;</code> redirection from a file</button>
      <button class="opt" data-i="3">A Python wrapper script</button>
      <div class="fb">It launches Bash with <code>-lc "&lt;program&gt; &lt; &lt;file&gt;"</code> — Bash performs
      the redirection, then runs your program with stdin already pointed at the file.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span><code>tasks.json</code> controls how the program is built, while <code>launch.json</code> controls how it's run under the debugger.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> <code>tasks.json</code> defines the <code>build</code> task (the
      <code>gcc</code> invocation); <code>launch.json</code>'s <code>preLaunchTask</code> field is what wires
      that build to run automatically before each debug session starts.</div>
    </div>
  </div>
</section>

<!-- ============ DEBUGGING PROCESS ============ -->
<section class="topic" id="l15-process">
  <h2>CL10 &middot; The Debugging Process (worked example)</h2>

  <div class="card">
    <p>Buggy function — meant to set bit 3, toggle bit 2, clear bit 1, and set bit 0:</p>
<pre>int modifyBits(int x) {
    // Step 1: Set bit 3
    x = x | (1 &lt;&lt; 3);
    // Step 2: Toggle bit 2
    x = x ^ (1 &lt;&lt; 2);
    // Step 3: Clear bit 1
    // BUG: XOR toggles instead of clears
    x = x ^ (1 &lt;&lt; 1);
    // Step 4: Set bit 0
    x = x | 1;
    return x;
}</pre>
<pre>int main(void) {
    int result;
    result = modifyBits(2); printf("Test 1: expected 13, got %d\\n", result);
    result = modifyBits(6); printf("Test 2: expected 9, got %d\\n", result);
    result = modifyBits(0); printf("Test 3: expected 13, got %d\\n", result);
    return 0;
}</pre>
  </div>

  <div class="card">
    <h3>Step 1 &middot; Run the tests to see which one fails</h3>
    <p><code>modifyBits(2)</code>: <code>x=0b010</code> starts with bit 1 already set. Step 3's
    <code>x ^ (1&lt;&lt;1)</code> <b>toggles</b> bit 1 — since it's already 1, XOR flips it to 0, which is what
    the test happens to expect. Same story for <code>modifyBits(6)</code>: bit 1 of <code>6 = 0b110</code>
    starts at 1, so toggling it also happens to clear it. But <code>modifyBits(0)</code> starts with bit 1
    already 0 — toggling a 0 <b>sets</b> it to 1 instead of leaving it clear. <b>Test 3 fails.</b></p>

    <h3>Step 2 &middot; Predict, then compare against actual</h3>
    <table class="cmp">
      <tr><th>Operation</th><th>Prediction</th></tr>
      <tr><td>Initial value of <code>num</code></td><td><code>0x0 = 0b0000_0000</code></td></tr>
      <tr><td>Set bit 3</td><td><code>0x8 = 0b0000_1000</code></td></tr>
      <tr><td>Toggle bit 2</td><td><code>0xC = 0b0000_1100</code></td></tr>
      <tr><td>Clear bit 1 <i>(intended)</i></td><td><code>0xC = 0b0000_1100</code> &mdash; unchanged, bit 1 was already 0</td></tr>
      <tr><td>Set bit 0</td><td><code>0xD = 0b0000_1101</code></td></tr>
    </table>
    <p class="muted">Set a breakpoint at the start of the failing test, and watch <code>num</code> (or
    <code>x</code>) — ideally in hex, since bit patterns are far more readable as hex than decimal. Step
    through line by line and find exactly where the actual value stops matching the prediction.</p>

    <h3>Step 3 &middot; Where it diverges</h3>
    <p>Stepping past the "Clear bit 1" line with <code>x = 0b0000_1100</code>: <code>x ^ (1&lt;&lt;1)</code>
    XORs in <code>0b0000_0010</code>. Since bit 1 of <code>x</code> is currently 0, XOR <b>flips it to 1</b>
    instead of leaving it at 0 — giving <code>0b0000_1110</code>, which does not match the
    <code>0b0000_1100</code> prediction. That's the exact line where behavior departs from intent.</p>

    <h3>Step 4 &middot; Fix</h3>
    <p>"Clear" should use AND with an inverted mask, not XOR:</p>
<pre>x = x &amp; ~(1 &lt;&lt; 1);   // correctly clears bit 1 regardless of its current value</pre>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does <code>modifyBits(2)</code> pass even though the "clear bit 1" line is buggy?</div>
      <button class="opt" data-i="0">Bit 1 of the input happens to already be 1, so toggling it with XOR happens to produce the same result that clearing it would</button>
      <button class="opt" data-i="1">The test comparison is wrong</button>
      <button class="opt" data-i="2">XOR and AND are interchangeable for clearing bits</button>
      <button class="opt" data-i="3">The bug only affects bit 0</button>
      <div class="fb">This is exactly why writing multiple test cases with different inputs matters — a bug
      that toggles instead of clears is invisible on inputs where the bit was already 1, and only shows up
      once you test an input where it starts at 0.</div>
    </div>
    <div class="q">
      <p>Fill in the corrected line 12 of <code>modifyBits</code> (clear bit 1 of <code>x</code>):</p>
      <input class="fillblank" data-answer="x = x & ~(1 << 1);~~~x=x&~(1<<1);~~~x &= ~(1 << 1);~~~x&=~(1<<1);">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"></div>
    </div>
  </div>
</section>

<!-- ============ RD09 SELF-CHECK ============ -->
<section class="topic" id="l15-rd09">
  <h2>RD09 Self-Check &middot; Debugging</h2>

  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Clicking in the gutter next to a line number deletes that line.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> Clicking the gutter toggles a <b>breakpoint</b> (a red dot) on that line.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You want to see the character value of an <code>int</code> variable <code>c</code> that's holding an ASCII code. What do you do?</div>
      <button class="opt" data-i="0">Redeclare <code>c</code> as <code>char</code> and restart</button>
      <button class="opt" data-i="1">Add a Watch expression <code>(char)c</code></button>
      <button class="opt" data-i="2">It's impossible to view without recompiling</button>
      <button class="opt" data-i="3">Rename the variable</button>
      <div class="fb">A Watch expression can cast a variable to any type on the fly, letting you re-interpret
      the same bits without changing the source code.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Your program seems to "hang" right after a <code>getchar()</code> call when stepping in the debugger. What's most likely happening?</div>
      <button class="opt" data-i="0">The debugger crashed</button>
      <button class="opt" data-i="1">Input is buffered — it's waiting for you to type in the terminal and press Enter</button>
      <button class="opt" data-i="2"><code>getchar()</code> is broken</button>
      <button class="opt" data-i="3">A breakpoint is stuck</button>
      <div class="fb">Input from the terminal doesn't reach the program until Enter is pressed (or the buffer
      fills) — this is expected behavior, not a bug.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which file tells VS Code what command to run before starting the debugger (i.e., how to build the program)?</div>
      <button class="opt" data-i="0"><code>launch.json</code></button>
      <button class="opt" data-i="1"><code>.gitignore</code></button>
      <button class="opt" data-i="2"><code>tasks.json</code></button>
      <button class="opt" data-i="3"><code>.bashrc</code></button>
      <div class="fb"><code>tasks.json</code> defines the <code>build</code> task; <code>launch.json</code>
      references it via <code>"preLaunchTask": "build"</code>.</div>
    </div>
    <div class="q" data-multi="0,1,3">
      <div class="prompt"><span class="tag">Select all that apply</span>Which of these will flush the stdout output buffer?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> Printing a newline character</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> Calling <code>fflush(stdout)</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Declaring a variable as <code>volatile</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> The buffer filling up</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A, B, and D.</b> A newline, an explicit <code>fflush(stdout)</code>, or a full buffer
      all trigger a flush. <code>volatile</code> is unrelated to I/O buffering.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>A file or directory whose name starts with a period (e.g. <code>.vscode</code>) is a hidden file, not normally shown by a plain directory listing.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> <code>.vscode</code>, <code>.git</code>, <code>.gitignore</code>, and
      <code>.bashrc</code> are all hidden files used for configuration/metadata you don't usually interact
      with directly.</div>
    </div>
  </div>
</section>

</main>
`;
