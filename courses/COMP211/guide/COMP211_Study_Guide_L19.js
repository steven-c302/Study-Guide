/* ============================================================
   LESSON 19 — Checkoff 2 Prep: Debugging Practical.
   Injects into #l19. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ , and every ${...} must be written \${...} .
   ============================================================ */
document.getElementById('l19').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l19-logistics')">Logistics &amp; What to Expect</button>
  <button onclick="showTopic(this,'l19-walk')">Walkthrough &middot; The 10 Sections</button>
  <button onclick="showTopic(this,'l19-drill')">Drill</button>
  <button onclick="showTopic(this,'l19-aloud')">Explain It Aloud</button>
  <button onclick="showTopic(this,'l19-mistakes')">Common Mistakes</button>
</nav>
<main>

<!-- ============ LOGISTICS ============ -->
<section class="topic active" id="l19-logistics">
  <h2>Checkoff 2 &middot; Debugging &mdash; What to Expect</h2>

  <div class="concept">Same deal as Checkoff 1: this is <b>drill material</b> built from a released sample
  checkoff (blank + solution), not lecture content. The real checkoff will have the <b>same style and skill
  coverage</b> but different specifics &mdash; a different program, different variable names and values, a
  different bug. So the goal is <b>fluency with the debugger</b>: knowing which button or command answers a
  spoken prompt <i>on sight</i>, and being able to say <i>why</i> out loud.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Format</th><th>What that means</th></tr>
      <tr><td><b>When &amp; where</b></td><td>One-on-one with a TA in the <b>211 office-hour room (SN143)</b>, <b>Mon Sep 28 &ndash; Fri Oct 2</b>.</td></tr>
      <tr><td><b>Check in</b></td><td>When you arrive, submit a ticket on the <b>CSXL queue</b> (csxl.unc.edu/course/215/office-hours): type <b>Assignment Help</b>, and put your <b>name</b> and <b>scheduled appointment time</b> in the description.</td></tr>
      <tr><td><b>Style</b></td><td><b>Practical</b>, like Checkoff 1: you perform each task live while the TA watches, asks &ldquo;how can you tell?&rdquo;, and asks you to <b>predict before you act</b>.</td></tr>
      <tr><td><b>Time</b></td><td>About <b>15 minutes</b> on average, inside a <b>30-minute slot</b>. If you aren't finished when the slot ends, you're graded on what you've done by then.</td></tr>
      <tr><td><b>Redo</b></td><td>Office hours the <b>week of Oct 5</b>; a second attempt caps at <b>80/100</b>.</td></tr>
      <tr><td><b>Sign-up &amp; practice</b></td><td>The sign-up deadline was <b>Fri Sep 25, 11:59pm</b> and the optional practice sessions were <b>Thu Sep 24</b> &mdash; both have already passed. If you don't have a slot yet, ask the course staff right away.</td></tr>
    </table>
    <div class="danger"><b>Get the debugger working <i>before</i> you walk in.</b> The handout is blunt about
    this: if your debugger isn't set up when your slot starts, you get <b>no extra time</b> &mdash; the setup
    comes out of your own 30 minutes, and it is very hard to finish the checkoff while also fixing VS Code.
    Use the checklist below tonight.</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Pre-checkoff setup checklist (do this tonight)</h3>
    <table class="cmp">
      <tr><th>Check</th><th>How to confirm</th></tr>
      <tr><td>Your container / dev environment is up</td><td>Open a terminal, run <code>pwd</code>, and confirm you're where you expect (Checkoff 1 used <code>/mnt/learncli/workdir</code>).</td></tr>
      <tr><td>You can clone a repo</td><td><code>git clone https://github.com/COMP211-FA26/debugging-checkoff-practice</code> &mdash; the released sample repo; it contains <code>practice.c</code> and its <code>.vscode</code> folder.</td></tr>
      <tr><td>The C/C++ extension is installed and <code>gdb</code> exists</td><td>Open <code>practice.c</code>, click the gutter to drop a red breakpoint, then press the debug button &rarr; <b>Debug active file</b>. It must actually pause on your breakpoint.</td></tr>
      <tr><td>Both debug configurations appear</td><td>In the debug dropdown you should see <b>Debug active file</b> and <b>Debug with input redirected</b>. If the second one is missing, look at <code>.vscode/launch.json</code>.</td></tr>
      <tr><td>You know where the panes are</td><td><b>Variables</b>, <b>Watch</b>, <b>Call Stack</b>, <b>Breakpoints</b>, and the <b>Debug Console</b> tab.</td></tr>
      <tr><td>You can compile from the terminal</td><td><code>gcc practice.c -o yourname</code>, then <code>./yourname</code>.</td></tr>
    </table>
    <p class="muted"><code>.vscode</code> is a hidden folder (leading dot) &mdash; use <code>ls -a</code> if you
    can't find it in the terminal, and see <b>CL10 &middot; launch.json &amp; tasks.json</b> for what's inside.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Skills covered &mdash; and where each lives in this guide</h3>
    <p class="muted">This is the official &ldquo;Skills Covered&rdquo; list from the checkoff page. Items marked
    <b>not in the sample</b> are on the official list but never came up in the sample checkoff's ten sections
    &mdash; so they're the ones most likely to surprise you, and the Drill tab tests them on purpose.</p>
    <table class="cmp">
      <tr><th>Skill</th><th>Sample?</th><th>Practice it</th></tr>
      <tr><td>Compile and name the executable (<code>gcc -o</code>)</td><td>&#9989; &sect;1, &sect;10</td><td>Walkthrough &sect;1 &middot; Drill A</td></tr>
      <tr><td>Run with input typed on <b>stdin</b></td><td>&#9989; &sect;1</td><td>Walkthrough &sect;1 &middot; Drill A</td></tr>
      <tr><td>Redirect a file to stdin (<code>&lt;</code>)</td><td>&#9989; &sect;10</td><td>Walkthrough &sect;10 &middot; Drill H</td></tr>
      <tr><td>Write to a file: <code>&gt;&gt;</code> vs <code>&gt;</code></td><td>&#9989; &sect;10 (<code>&gt;</code> only)</td><td>Drill H &middot; also <a href="#" onclick="showLesson('l6', document.querySelector('[data-l=\\'l6\\']')); return false;">Checkoff 1 Prep</a></td></tr>
      <tr><td>What <code>launch.json</code> does; redirect input from a different file</td><td>&#9989; &sect;10</td><td>Walkthrough &sect;10 &middot; <a href="#" onclick="showLesson('l15', document.querySelector('[data-l=\\'l15\\']')); return false;">CL10</a></td></tr>
      <tr><td>What <code>tasks.json</code> does</td><td>&#10060; <b>not in the sample</b></td><td>Drill H &middot; CL10</td></tr>
      <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd> (SIGINT) and <kbd>Ctrl</kbd>+<kbd>D</kbd> (EOF)</td><td>&#10060; <b>not in the sample</b></td><td>Drill H</td></tr>
      <tr><td>Breakpoint &middot; conditional breakpoint</td><td>&#9989; &sect;2, &sect;3</td><td>Walkthrough &sect;2&ndash;3 &middot; Drill B&ndash;C</td></tr>
      <tr><td>Step Over &middot; Step Into &middot; Step Out &middot; Continue</td><td>&#9989; &sect;2, &sect;5&ndash;7</td><td>Walkthrough &sect;5&ndash;7 &middot; Drill E</td></tr>
      <tr><td>Watch point (track a variable as you run)</td><td>&#10060; <b>not in the sample</b> (see note)</td><td>Drill D &middot; CL10</td></tr>
      <tr><td>Print a variable &middot; evaluate an expression (Debug Console)</td><td>&#9989; &sect;2, &sect;4</td><td>Walkthrough &sect;4 &middot; Drill D</td></tr>
      <tr><td>Call stack &amp; stack frames <span class="muted">(in the sample; not on the skills list)</span></td><td>&#9989; &sect;8</td><td>Walkthrough &sect;8 &middot; Drill F &middot; <a href="#" onclick="showLesson('l4', document.querySelector('[data-l=\\'l4\\']')); return false;">CL04</a></td></tr>
      <tr><td>Find a logic bug with the debugger and explain the fix</td><td>&#9989; &sect;9</td><td>Walkthrough &sect;9 &middot; Drill G</td></tr>
    </table>
    <div class="concept"><b>About &ldquo;watch point.&rdquo;</b> In VS Code the <b>Watch</b> pane lets you type an
    expression (e.g. <code>total</code>) and see it update at every stop. Some setups also offer <b>Break on Value
    Change</b> when you right-click a variable, which pauses <i>the moment the value changes</i> without you
    choosing a line. Know both ideas: watching (you look at it every time you pause) vs. stopping (the program
    pauses when it changes).</div>
    <div class="warn"><b>Note the call stack is <i>not</i> on the official skills list</b> but it is section 8
    of the sample &mdash; treat the sample as the more honest guide to what's actually asked.</div>
  </div>
</section>

<!-- ============ WALKTHROUGH ============ -->
<section class="topic" id="l19-walk">
  <h2>Walkthrough &middot; Worked Through the Sample Checkoff's 10 Sections</h2>
  <div class="concept">The sample program (<code>practice.c</code>) is an <b>order processor</b>:
  <code>main</code> &rarr; <code>process_order()</code> &rarr; <code>calculate_item_total()</code>. It reads a
  <code>discount</code> with <code>scanf</code>, upper-cases an <code>order_code</code>, and sums an array
  <code>prices[]</code>. Answers below come from the released solution key; the &ldquo;why&rdquo; is what
  transfers to a checkoff with a different program. Each section ends with a <b>Say it aloud</b> line, because
  the TA will ask you to explain, not just click.</div>

  <div class="card">
    <h3 style="margin-top:0">Debugger controls at a glance</h3>
    <table class="cmp">
      <tr><th>Command</th><th>What it does</th><th>Default VS Code key</th></tr>
      <tr><td><b>Continue</b></td><td>Run until the next breakpoint (or the program ends)</td><td><kbd>F5</kbd></td></tr>
      <tr><td><b>Step Over</b></td><td>Run the current line fully; if it calls a function, run that function to completion without entering it</td><td><kbd>F10</kbd></td></tr>
      <tr><td><b>Step Into</b></td><td>Run the current line, and if it calls a function, pause on that function's first line</td><td><kbd>F11</kbd></td></tr>
      <tr><td><b>Step Out</b></td><td>Finish the current function and pause back in the function that called it</td><td><kbd>Shift</kbd>+<kbd>F11</kbd></td></tr>
      <tr><td><b>Restart</b></td><td>Stop and relaunch from the beginning</td><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F5</kbd></td></tr>
    </table>
    <p class="muted">On a Mac laptop you may need to hold <kbd>fn</kbd> for the F-keys &mdash; and the
    checkoff says &ldquo;<i>verbally state: step over</i>,&rdquo; so learn the <b>names</b>, not just the
    buttons. The toolbar's icons have hover labels if you blank.</p>
  </div>

  <h3>1 &middot; Run the program</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Answer</th></tr>
      <tr><td>Compile, naming the executable <code>&lt;student_name&gt;</code></td><td><code>gcc practice.c -o cece</code> <span class="muted">(with your own name instead of <code>cece</code>)</span></td></tr>
      <tr><td>Run normally</td><td><code>./cece</code>, then type <code>8</code> at the prompt</td></tr>
      <tr><td>What happened to <code>order_code</code>?</td><td><code>ord-a7</code> becomes <code>ORD-A7</code></td></tr>
    </table>
    <div class="concept">Compile-and-run is the same skill as Checkoff 1: the name goes <b>immediately after
    <code>-o</code></b>, and <code>./</code> is required because the current directory isn't on <code>$PATH</code>.
    &ldquo;Based on the code <i>and</i> output&rdquo; means: don't just eyeball the output &mdash; find the loop
    in the source that changes each character (it's the <code>toupper</code> pattern) and <b>point at it</b>.</div>
    <p><b>Say it aloud:</b> &ldquo;<code>order_code</code> starts lowercase and the code upper-cases it in place,
    so the output shows <code>ORD-A7</code>.&rdquo;</p>
  </div>

  <h3>2 &middot; Regular breakpoint</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Answer</th></tr>
      <tr><td>Where's the breakpoint?</td><td>On <code>total += prices[i];</code> inside the loop of <code>calculate_item_total()</code> &mdash; click the gutter left of the line number</td></tr>
      <tr><td>At the first stop: <code>i</code></td><td><b>0</b> &mdash; read it in the <b>Variables</b> pane</td></tr>
      <tr><td><code>prices[i]</code></td><td><b>18</b> &mdash; not a plain variable, so type it in the <b>Watch</b> pane or <b>Debug Console</b></td></tr>
      <tr><td><code>total</code></td><td><b>0</b> &mdash; Variables pane</td></tr>
      <tr><td>Already added, or about to be?</td><td><b>About to be.</b> The highlighted line is the one that <i>hasn't executed yet.</i></td></tr>
      <tr><td>Press Continue &mdash; where does it stop?</td><td><b>The same line, next iteration</b> (so <code>i = 1</code> and <code>total = 18</code>)</td></tr>
    </table>
    <div class="concept"><b>A breakpoint pauses <i>before</i> its line runs.</b> This is the single most-tested
    idea in the checkoff. The highlighted line is &ldquo;what will happen next,&rdquo; not &ldquo;what just
    happened.&rdquo; That's why <code>total</code> is still 0 while <code>prices[i]</code> is already 18: the
    <code>+=</code> is queued up, not done. Also notice where each value lives: variables that exist as plain
    locals show in <b>Variables</b>; an <b>expression</b> like <code>prices[i]</code> needs Watch or the
    Debug Console.</div>
    <p><b>Say it aloud:</b> &ldquo;The line is highlighted but not executed yet &mdash; that's how I can tell
    the current price hasn't been added.&rdquo;</p>
  </div>

  <h3>3 &middot; Conditional breakpoint</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Answer</th></tr>
      <tr><td>Only stop when the price is over 40</td><td>Right-click the red dot &rarr; <b>Edit Breakpoint&hellip;</b> &rarr; choose <b>Expression</b> &rarr; <code>prices[i] &gt; 40</code> &rarr; Enter</td></tr>
      <tr><td>Press Continue &mdash; <code>i</code> and <code>prices[i]</code>?</td><td><code>i = 3</code>, <code>prices[i] = 46</code></td></tr>
    </table>
    <div class="concept">The expression is <b>plain C</b> &mdash; no <code>if</code> keyword &mdash; and the debugger
    evaluates it <b>every time it reaches that line</b>, pausing only when it's true. Because you jumped
    straight to <code>i = 3</code>, items 1 and 2 must both be &le; 40 (indeed their prices add to 41, which the
    numbers in section 4 confirm). This is how you avoid pressing Continue 200 times in a big loop.</div>
    <p><b>Say it aloud:</b> &ldquo;I gave the breakpoint a condition, so it only pauses when
    <code>prices[i] &gt; 40</code> is true.&rdquo;</p>
  </div>

  <h3>4 &middot; Debug Console</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>What to type</th><th>Result</th></tr>
      <tr><td>Current <code>total</code></td><td><code>total</code></td><td><b>59</b></td></tr>
      <tr><td>What <code>total</code> <i>will be</i> after adding the current price (without executing)</td><td><code>total + prices[i]</code></td><td><b>105</b> (59 + 46)</td></tr>
      <tr><td>Is the current price &gt; 40?</td><td><code>prices[i] &gt; 40</code></td><td>true (C prints it as <code>1</code>)</td></tr>
      <tr><td>Did any of that change the running program?</td><td>&mdash;</td><td><b>No</b></td></tr>
    </table>
    <div class="concept">The Debug Console lets you <b>ask questions of a paused program</b>. Reading a variable or
    computing <code>total + prices[i]</code> only <i>looks</i> &mdash; nothing in the program changes. That
    second one is the checkoff's trick question: you can preview the result of a statement <b>without</b>
    running it by writing the arithmetic yourself. (Contrast: typing an <b>assignment</b> such as
    <code>total = 0</code> or <code>total++</code> into the console <i>would</i> change the running program's
    state &mdash; so the answer to &ldquo;did it change anything&rdquo; is &ldquo;no&rdquo; only because these
    were read-only expressions.)</div>
    <p><b>Say it aloud:</b> &ldquo;I added the two values in the console instead of stepping, so I got 105
    without touching the program.&rdquo;</p>
  </div>

  <h3>5&ndash;7 &middot; Step Over, Step Into, Step Out</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Answer</th></tr>
      <tr><td><b>5.</b> Breakpoint on line 47, <code>int subtotal = calculate_item_total(prices, count);</code>. Run the call but <i>don't follow it inside</i>.</td><td><b>Step Over</b></td></tr>
      <tr><td>Where will the debugger be afterwards?</td><td>The line after the call &mdash; the key says <b>line 49</b> <span class="muted">(the next executable line after the call; blank lines and comments are skipped)</span></td></tr>
      <tr><td><b>6.</b> You suspect the bug is <i>inside</i> <code>calculate_item_total()</code>.</td><td><b>Step Into</b> &rarr; you're now in <code>calculate_item_total</code></td></tr>
      <tr><td>How is that different from Step Over?</td><td>You can now step through the function line by line; Step Over ran the whole function in one jump</td></tr>
      <tr><td><b>7.</b> Enough iterations &mdash; finish this function and return to the caller.</td><td><b>Step Out</b></td></tr>
      <tr><td>Which function do you expect to land in?</td><td><code>process_order()</code> &mdash; the one that called it</td></tr>
      <tr><td>Why is Step Out useful in a larger program?</td><td>You can skip the rest of a function you've decided is fine, without stepping through every remaining line/iteration or placing another breakpoint</td></tr>
    </table>
    <div class="concept"><b>Step Over vs. Step Into matter only on a line that calls a function.</b> On a plain
    assignment they behave identically. <b>Step Out</b> is the escape hatch after you've gone in too deep.
    Two details to be ready for: (1) <b>predict before you press</b> &mdash; the TA wants your prediction spoken
    first, then you verify it; (2) after a Step Out you usually land <b>back on the call line</b>, because the
    assignment (<code>int subtotal = &hellip;</code>) hasn't finished yet &mdash; the returned value is computed
    but not stored. One more Step Over completes it.</div>
    <div class="warn"><b>Handout typo:</b> section 5c says <code>calculate_order_total()</code>, but the function
    on line 47 is <code>calculate_item_total()</code>. If the wording confuses you in the real checkoff, ask
    which function they mean &mdash; don't guess.</div>
    <div class="warn"><b>Step Into won't enter library functions</b> like <code>printf</code> or <code>toupper</code>
    (no source available) &mdash; it behaves like Step Over. Only your own functions can be stepped into.</div>
    <p><b>Say it aloud:</b> &ldquo;I'll Step Over because I trust that function and just want its result; I'll
    Step Into when I suspect the bug is inside it; and Step Out to get back to the caller.&rdquo;</p>
  </div>

  <h3>8 &middot; Call Stack</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Answer</th></tr>
      <tr><td>Call Stack pane while paused inside <code>calculate_item_total()</code></td><td>Top to bottom: <code>calculate_item_total</code>, <code>process_order</code>, <code>main</code></td></tr>
      <tr><td>Currently executing / who called it</td><td><code>calculate_item_total</code> / <code>process_order</code></td></tr>
      <tr><td>Sequence of calls</td><td><code>main</code> &rarr; <code>process_order</code> &rarr; <code>calculate_item_total</code></td></tr>
      <tr><td>Click the <code>process_order</code> frame: <code>discount</code>?</td><td><b>8</b> (what you typed in section 1)</td></tr>
      <tr><td>Click the <code>main</code> frame: what can you inspect?</td><td><code>order_code</code>, <code>prices</code>, <code>count</code>, <code>discount</code>, <code>flags</code> &mdash; the locals of <code>main</code></td></tr>
      <tr><td>Did selecting a frame execute any instructions?</td><td><b>No</b></td></tr>
      <tr><td>So what does selecting a frame change?</td><td>The <b>context being inspected</b>, not the current execution point</td></tr>
    </table>
    <div class="concept">The Call Stack pane is the <b>stack of frames from CL04, made visible</b>: each function
    that has been called but hasn't returned gets one frame with its own locals. The <b>top</b> frame is where
    execution actually is. Clicking a lower frame just changes which frame's variables the Variables pane and
    Debug Console show &mdash; the yellow current-line marker doesn't move and nothing runs. It's how you ask
    &ldquo;what were the caller's values when it made this call?&rdquo; See
    <a href="#" onclick="showLesson('l4', document.querySelector('[data-l=\\'l4\\']')); return false;">CL04 &middot; Function Stack Frames</a>.</div>
    <p><b>Say it aloud:</b> &ldquo;<code>main</code> called <code>process_order</code>, which called
    <code>calculate_item_total</code>. Clicking a frame changes what I'm looking at, not what's running.&rdquo;</p>
  </div>

  <h3>9 &middot; Find the bug</h3>
  <div class="card">
    <p><b>The spec:</b> total &gt; $50 &rarr; mark as priority; total &gt; $100 &rarr; <i>also</i> an extra $10
    discount. <b>The symptom:</b> orders over $100 never get the extra discount.</p>
    <table class="cmp">
      <tr><th>Task</th><th>Answer from the key</th></tr>
      <tr><td>Why isn't the extra discount applied?</td><td>The first <code>if</code> (<code>total &gt; 50</code>) is true for <b>every</b> value over 100, so execution enters that branch and <b>skips the <code>else if</code></b></td></tr>
      <tr><td>How would you fix it?</td><td>Make the two conditions <b>independent</b> instead of mutually exclusive</td></tr>
    </table>
<pre>// The buggy shape:                      // The fix:
if (total &gt; 50) {                        if (total &gt; 50) {
    /* mark priority */                        /* mark priority */
} else if (total &gt; 100) {   // never       }
    /* extra $10 discount */              if (total &gt; 100) {     // separate if
}                                              /* extra $10 discount */
                                          }</pre>
    <div class="concept"><b>How to use the debugger to <i>prove</i> it</b> (this is what &ldquo;use the debugger
    to determine why&rdquo; means): first remove or disable your old breakpoints (the handout says to), then put
    one on the first <code>if</code>, run with an order whose total is over 100, and
    <b>Step Over one line at a time</b>. You'll watch the arrow enter the first branch and then jump straight past
    the <code>else if</code>. The lesson: <code>else if</code> means &ldquo;only if the previous condition was
    false,&rdquo; and any number over 100 is also over 50. In general: <b>if two conditions can be true at the
    same time and you want both effects, they can't be chained with <code>else</code>.</b> (An equivalent fix is
    to test the stricter <code>&gt; 100</code> first &mdash; but then it must <i>also</i> mark priority, so
    separate <code>if</code>s are cleaner.)</div>
    <p><b>Say it aloud:</b> &ldquo;An order over $100 is also over $50, so the first branch wins and the
    <code>else if</code> never runs. I'd make them two independent <code>if</code>s.&rdquo;</p>
  </div>

  <h3>10 &middot; Input redirection and <code>launch.json</code></h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Answer</th></tr>
      <tr><td>Update the executable after your fix</td><td><code>gcc practice.c -o cece</code></td></tr>
      <tr><td>Create <code>checkoff.in</code> containing <code>10</code></td><td><code>echo 10 &gt; checkoff.in</code></td></tr>
      <tr><td>Run with stdin from that file</td><td><code>./cece &lt; checkoff.in</code></td></tr>
      <tr><td><code>\${fileDirname}</code> when <code>practice.c</code> is open</td><td>The <b>absolute path of the directory containing the open file</b> &mdash; e.g. <code>/mnt/learncli/workdir/debugging-checkoff-practice</code></td></tr>
      <tr><td><code>\${fileBasenameNoExtension}</code></td><td><code>practice</code></td></tr>
      <tr><td>Debug with stdin from <code>checkoff.in</code> &mdash; edit <code>launch.json</code> how? <span class="muted">(blank in the key)</span></td><td>Use the <b>Debug with input redirected</b> configuration and change the file after <code>&lt;</code> to <code>checkoff.in</code> (details below)</td></tr>
      <tr><td>Breakpoint after the <code>scanf</code>; value of <code>discount</code></td><td><code>discount = 10</code></td></tr>
    </table>
    <div class="concept"><b>The key leaves 10f blank &mdash; here is the full answer</b> (from
    <a href="#" onclick="showLesson('l15', document.querySelector('[data-l=\\'l15\\']')); return false;">CL10</a>).
    <b>Debug active file</b> launches your program directly, so the debugger has no way to feed it a file.
    <b>Debug with input redirected</b> instead launches <b>Bash</b> and lets Bash do the redirecting:
<pre>"program": "/bin/bash",
"args": [
  "-lc",
  "\\"\${fileDirname}/\${fileBasenameNoExtension}\\" &lt; \\"\${fileDirname}/checkoff.in\\""
]</pre>
    After substitution that's effectively <code>/mnt/.../practice &lt; /mnt/.../checkoff.in</code>. Only the
    path after <code>&lt;</code> needs editing: <code>checkoff.in</code> must sit in the <b>same folder as the
    open <code>.c</code> file</b> (because it's built from <code>\${fileDirname}</code>), or you write a longer
    path. Then <b>pick that configuration from the debug dropdown</b> &mdash; editing it doesn't help if you
    launch the other one.</div>
    <div class="warn"><b>Two rebuild paths, don't mix them up.</b> The terminal <code>./cece</code> only sees
    changes after you re-run <code>gcc</code> (10a). The debugger, though, first runs
    <code>preLaunchTask: build</code> from <code>tasks.json</code>, which recompiles <b>with <code>-g</code></b>
    every time you start it &mdash; so the debugger always uses your latest source, and you don't need a manual
    <code>gcc</code> for it.</div>
    <p><b>Say it aloud:</b> &ldquo;The redirected config runs the program through Bash so Bash can send
    <code>checkoff.in</code> to stdin; I just changed the filename after the <code>&lt;</code>.&rdquo;</p>
  </div>
</section>

<!-- ============ DRILL ============ -->
<section class="topic" id="l19-drill">
  <h2>Drill &middot; Fresh Program, Same Skills</h2>
  <div class="concept">A <b>new program</b> with different names, values, and a <b>different bug</b> than the
  sample &mdash; so this tests the debugger skills, not memory of the walkthrough. Every value below was checked
  by actually compiling this program and running it under <code>gdb</code>. <b>Best way to use it:</b> copy
  the program into a file <code>ship.c</code> in your own environment and <b>actually do each step in VS Code</b>,
  then answer here. The answers are unspoiled until you get them right (or press Reveal).</div>

  <div class="card">
    <h3 style="margin-top:0">The program: <code>ship.c</code> &mdash; a shipment cost calculator</h3>
    <p><b>Spec:</b> cost = 2 dollars per pound + a handling fee typed by the user. A shipment over 50 lb is
    flagged <i>heavy</i>. A shipment over 100 lb also gets a <b>$15 surcharge</b>. The label should print in
    upper case. Run it with a fee of <b>5</b> unless a question says otherwise.</p>
<pre> 1  #include &lt;stdio.h&gt;
 2  #include &lt;ctype.h&gt;
 3
 4  int sum_weights(int weights[], int n) {
 5      int total = 0;
 6      for (int i = 0; i &lt; n - 1; i++) {
 7          total += weights[i];
 8      }
 9      return total;
10  }
11
12  int process_shipment(char label[], int weights[], int n, int fee) {
13      for (int i = 0; label[i] != '\\0'; i++) {
14          label[i] = toupper(label[i]);
15      }
16      int weight = sum_weights(weights, n);
17      int heavy = 0;
18      int cost = weight * 2 + fee;
19      if (weight &gt; 50) {
20          heavy = 1;
21      }
22      if (weight &gt; 100) {
23          cost += 15;
24      }
25      printf("Weight: %d lb, heavy: %d\\n", weight, heavy);
26      return cost;
27  }
28
29  int main(void) {
30      char label[] = "pkg-b3";
31      int weights[5] = {12, 31, 9, 46, 30};
32      int count = 5;
33      int fee;
34      printf("Enter handling fee: ");
35      scanf("%d", &amp;fee);
36      int cost = process_shipment(label, weights, count, fee);
37      printf("Shipment %s costs $%d\\n", label, cost);
38      return 0;
39  }</pre>
    <p class="muted">Resist reading for the bug &mdash; in a checkoff you'd find it <i>with the debugger</i>.
    Section G below walks you through exactly that.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">A &middot; Compile and run</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Compile <code>ship.c</code> into an executable named <code>steven</code>.</div>
      <input class="fillblank" data-answer="gcc ship.c -o steven~~~gcc -o steven ship.c">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The name goes <b>immediately after</b> <code>-o</code>; the source file can be before or after that pair.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Run it from the terminal.</div>
      <input class="fillblank sm" data-answer="./steven">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>./</code> is required &mdash; the current directory isn't on <code>$PATH</code>. Then type <code>5</code> at the prompt.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You type <code>5</code>. The label starts as <code>"pkg-b3"</code>. What does the final line print for the label?</div>
      <button class="opt" data-i="0"><code>pkg-b3</code> (unchanged)</button>
      <button class="opt" data-i="1"><code>PKG-B3</code></button>
      <button class="opt" data-i="2"><code>Pkg-b3</code></button>
      <button class="opt" data-i="3">Nothing &mdash; it crashes</button>
      <div class="fb">The <code>toupper</code> loop on lines 13&ndash;15 rewrites each character <b>in place</b> in the caller's array &mdash; the same idea as arrays being passed by pointer in CL04.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Typing <code>steven</code> (no <code>./</code>) will run the program as long as you're in the same directory as the executable.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; the shell only searches the directories in <code>$PATH</code>, and <code>.</code> isn't one of them. That's why <code>./steven</code> is needed.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">B &middot; Regular breakpoint</h3>
    <p class="muted">Set a breakpoint on <b>line 7</b> (<code>total += weights[i];</code>), start the debugger, and type <code>5</code> at the prompt.</p>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>At the first stop, what is <code>i</code>?</div>
      <input class="fillblank sm" data-answer="0">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>0</b> &mdash; read it in the <b>Variables</b> pane. You're at the top of the first iteration.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What is <code>weights[i]</code>? (Which pane or tab would you use to see it?)</div>
      <input class="fillblank sm" data-answer="12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>12</b>. It's an expression, not a plain variable, so use the <b>Watch</b> pane or the <b>Debug Console</b>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What is <code>total</code> at this first stop?</div>
      <input class="fillblank sm" data-answer="0">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>0</b> &mdash; it was initialised on line 5 and nothing has been added yet.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Has the current <code>weights[i]</code> already been added to <code>total</code>?</div>
      <button class="opt" data-i="0">Yes &mdash; that's why the line is highlighted</button>
      <button class="opt" data-i="1">No &mdash; the highlighted line is the one that's <i>about to</i> run</button>
      <button class="opt" data-i="2">It depends on the compiler</button>
      <button class="opt" data-i="3">You can't tell without stepping</button>
      <div class="fb">A breakpoint pauses <b>before</b> its line executes. <code>total</code> is still 0 while <code>weights[i]</code> is already 12: the <code>+=</code> is queued, not done.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>You press <b>Continue</b>. What is <code>total</code> at the next stop?</div>
      <input class="fillblank sm" data-answer="12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>12</b>. Continue runs until the breakpoint is hit again &mdash; the same line, next iteration (<code>i = 1</code>). The first weight (12) has now been added.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A breakpoint pauses execution <i>after</i> its line has executed.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; it pauses <b>before</b>. The current-line highlight always means &ldquo;this is next,&rdquo; never &ldquo;this just ran.&rdquo;</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">C &middot; Conditional breakpoint</h3>
    <p class="muted">Keep the breakpoint on line 7 and restart. Now you only care about weights over 40.</p>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What expression do you put in the breakpoint so it only stops when the current weight is greater than 40?</div>
      <input class="fillblank" data-answer="weights[i] &gt; 40~~~weights[i]&gt;40">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Right-click the red dot &rarr; <b>Edit Breakpoint&hellip;</b> &rarr; <b>Expression</b>. It's a plain C expression (no <code>if</code>).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Press Continue. What is <code>i</code> at the stop?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>i = 3</code> &mdash; the first weight over 40 is <code>weights[3] = 46</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>And what is <code>weights[i]</code> at that stop?</div>
      <input class="fillblank sm" data-answer="46">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>46</b>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What is <code>total</code> at this stop? (Hint: which items were skipped over?)</div>
      <input class="fillblank sm" data-answer="52">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>52</b> = 12 + 31 + 9. The debugger didn't <i>pause</i> for those three, but the program still <i>ran</i> them &mdash; a conditional breakpoint only changes when you stop, never what executes.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A conditional breakpoint stops the program from executing iterations where the condition is false.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. Those iterations still run normally &mdash; the debugger just doesn't <i>pause</i> for them. That's why <code>total</code> already includes 12 + 31 + 9.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which is a <b>dangerous</b> way to write the condition?</div>
      <button class="opt" data-i="0"><code>weights[i] &gt; 40</code></button>
      <button class="opt" data-i="1"><code>weights[i] &gt;= 41</code></button>
      <button class="opt" data-i="2"><code>weights[i] = 46</code></button>
      <button class="opt" data-i="3"><code>weights[i] == 46</code></button>
      <div class="fb">A single <code>=</code> is an <b>assignment</b>: it would overwrite <code>weights[i]</code> with 46 every time the line is reached &mdash; corrupting the program &mdash; and evaluates true every time. Use <code>==</code> to compare.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">D &middot; Debug Console and Watch</h3>
    <p class="muted">Stay paused at the stop from section C (<code>i = 3</code>, <code>weights[i] = 46</code>).</p>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What do you type in the Debug Console to show the current value of <code>total</code>?</div>
      <input class="fillblank sm" data-answer="total">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Just the variable name &mdash; the console evaluates it as an expression. It shows <b>52</b>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Without executing the next line, what expression tells you what <code>total</code> will be <b>after</b> the current weight is added?</div>
      <input class="fillblank" data-answer="total + weights[i]~~~weights[i] + total~~~total+weights[i]~~~weights[i]+total">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">You do the addition yourself in the console: <code>total + weights[i]</code>. Nothing in the program changes.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What number does that expression evaluate to?</div>
      <input class="fillblank sm" data-answer="98">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>98</b> = 52 + 46.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Type an expression that evaluates whether the current weight is greater than 40.</div>
      <input class="fillblank" data-answer="weights[i] &gt; 40~~~weights[i]&gt;40">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A comparison yields true (C represents it as <code>1</code>). Read-only &mdash; nothing changes.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which Debug Console entry would <b>change</b> the running program?</div>
      <button class="opt" data-i="0"><code>total</code></button>
      <button class="opt" data-i="1"><code>total + weights[i]</code></button>
      <button class="opt" data-i="2"><code>total = 0</code></button>
      <button class="opt" data-i="3"><code>weights[i] &gt; 40</code></button>
      <div class="fb">Only the <b>assignment</b> changes state. Reading a variable or computing/comparing values just <i>looks</i>. This is exactly why the sample checkoff's answer to &ldquo;did it change anything?&rdquo; is <i>no</i>.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>If you add <code>total</code> to the <b>Watch</b> pane, its value is refreshed each time execution pauses.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True &mdash; Watch keeps an expression on screen and re-evaluates it at every stop, so you can step and watch it change without retyping it in the console.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">E &middot; Step Over, Step Into, Step Out</h3>
    <p class="muted">Remove the old breakpoint. Put one on <b>line 16</b> (<code>int weight = sum_weights(weights, n);</code>) and restart.</p>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You want that call to run, but you don't want to follow it inside <code>sum_weights</code>. Which command?</div>
      <button class="opt" data-i="0">Step Into</button>
      <button class="opt" data-i="1">Step Over</button>
      <button class="opt" data-i="2">Step Out</button>
      <button class="opt" data-i="3">Continue</button>
      <div class="fb"><b>Step Over</b> runs the whole call in one jump.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>After Step Over, what line number is highlighted?</div>
      <input class="fillblank sm" data-answer="17">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>17</b> (<code>int heavy = 0;</code>). Line 16 finished &mdash; <code>weight</code> now holds the function's result.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What value does <code>weight</code> hold now?</div>
      <input class="fillblank sm" data-answer="98">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>98</b>. Keep that number in mind for section G.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Restart. This time you suspect the problem is inside <code>sum_weights</code>. Which command from line 16?</div>
      <button class="opt" data-i="0">Step Into</button>
      <button class="opt" data-i="1">Step Over</button>
      <button class="opt" data-i="2">Step Out</button>
      <button class="opt" data-i="3">Restart</button>
      <div class="fb"><b>Step Into</b> pauses on <code>sum_weights</code>'s first line (line 5), so you can step through it.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>You've watched two loop iterations and want the rest of <code>sum_weights</code> to finish, returning to its caller. Which command, and where do you land?</div>
      <button class="opt" data-i="0">Step Over &mdash; you land in <code>main</code></button>
      <button class="opt" data-i="1">Continue &mdash; you land at the end of the program</button>
      <button class="opt" data-i="2">Step Out &mdash; you land back in <code>process_shipment</code></button>
      <button class="opt" data-i="3">Step Into &mdash; you land in <code>toupper</code></button>
      <div class="fb"><b>Step Out</b> finishes the current function and pauses in the function that called it: <code>process_shipment</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Right after that Step Out, has <code>weight</code> received the value returned by <code>sum_weights</code>?</div>
      <button class="opt" data-i="0">Yes &mdash; the assignment is already complete</button>
      <button class="opt" data-i="1">Not yet &mdash; you're back on the call line with the assignment still pending; one more Step Over completes it</button>
      <button class="opt" data-i="2">No &mdash; the return value is discarded by Step Out</button>
      <button class="opt" data-i="3">It depends on the value of <code>n</code></button>
      <div class="fb">Verified in <code>gdb</code>: after finishing, the value <b>98</b> is returned but <code>weight</code> still shows its old value until the rest of line 16 executes. (Exactly how VS Code highlights the line can vary a little, but the assignment is pending either way.)</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>On line 25's <code>printf</code>, Step Into will let you step through <code>printf</code>'s source code.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; there's no source for library functions, so Step Into behaves like Step Over. Only <b>your own</b> functions can be stepped into.</div>
    </div>
    <div class="q" data-multi="0,1">
      <div class="prompt"><span class="tag">Select all that apply</span>Which are true of <b>Step Out</b>?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> It finishes the rest of the current function</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> It pauses back in the function that called the current one</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> It runs the program to the end</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> It deletes all breakpoints</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A and B.</b> Continue is the one that runs until the next breakpoint or program end; Step Out only returns you to the caller.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">F &middot; Call stack</h3>
    <p class="muted">Restart and pause inside <code>sum_weights</code> (breakpoint on line 7). You typed <code>5</code> as the fee.</p>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which lists the Call Stack pane <b>top to bottom</b>?</div>
      <button class="opt" data-i="0"><code>main</code>, <code>process_shipment</code>, <code>sum_weights</code></button>
      <button class="opt" data-i="1"><code>process_shipment</code>, <code>sum_weights</code>, <code>main</code></button>
      <button class="opt" data-i="2"><code>sum_weights</code>, <code>process_shipment</code>, <code>main</code></button>
      <button class="opt" data-i="3"><code>sum_weights</code>, <code>main</code>, <code>process_shipment</code></button>
      <div class="fb">The <b>top</b> frame is the function executing now; each frame below it is the caller that's waiting. Reading the sequence <i>from</i> <code>main</code> gives you <code>main &rarr; process_shipment &rarr; sum_weights</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Which function called <code>sum_weights</code>?</div>
      <input class="fillblank sm" data-answer="process_shipment">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>process_shipment</code> &mdash; line 16.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Select the <code>process_shipment</code> frame without resuming. What is <code>fee</code> there?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>5</b> &mdash; the value you typed, passed down from <code>main</code> as an argument.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>In that same frame, what does <code>weight</code> show?</div>
      <button class="opt" data-i="0">98 &mdash; it's already been computed</button>
      <button class="opt" data-i="1">Not a meaningful value yet &mdash; line 16 hasn't finished, so it's uninitialised (often 0 or leftover junk)</button>
      <button class="opt" data-i="2">128 &mdash; the correct sum</button>
      <button class="opt" data-i="3">The debugger refuses to show it</button>
      <div class="fb">The frame for <code>process_shipment</code> is paused mid-line-16, waiting for <code>sum_weights</code> to return. Its local <code>weight</code> hasn't been assigned yet.</div>
    </div>
    <div class="q" data-multi="0,1,3,4,5">
      <div class="prompt"><span class="tag">Select all that apply</span>Select the <code>main</code> frame. Which variables can you inspect?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> <code>label</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>weights</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> <code>total</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> <code>count</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="4"><span><b>E.</b> <code>fee</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="5"><span><b>F.</b> <code>cost</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="6"><span><b>G.</b> <code>i</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="7"><span><b>H.</b> <code>n</code></span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A, B, D, E, F</b> &mdash; the locals of <code>main</code> (<code>cost</code> isn't assigned yet). <code>total</code>, <code>i</code>, and <code>n</code> belong to other functions, so they aren't in <code>main</code>'s frame.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Clicking a different stack frame executes instructions.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; nothing runs.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>What does clicking a different frame actually change?</div>
      <button class="opt" data-i="0">The current execution point</button>
      <button class="opt" data-i="1">Which breakpoint is active</button>
      <button class="opt" data-i="2">The values stored in the variables</button>
      <button class="opt" data-i="3">Which frame's context you're inspecting</button>
      <div class="fb">Only the <b>context you're looking at</b> (Variables pane and Debug Console scope). The program's real execution point stays put in the top frame.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">G &middot; Find the bug (with the debugger)</h3>
    <p><b>Symptom:</b> with a fee of 5, the program prints <code>Weight: 98 lb, heavy: 1</code> and
    <code>Shipment PKG-B3 costs $201</code>. The array's weights sum to more than 100, so the spec says there
    should be a <b>$15 surcharge</b> &mdash; but there isn't. Use the debugger; don't just stare at the code.</p>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which is the best first debugger move?</div>
      <button class="opt" data-i="0">Rewrite the <code>if</code> on line 22 to use <code>&gt;= 98</code></button>
      <button class="opt" data-i="1">Break just after line 16 and check the value of <code>weight</code> against the real sum of the array</button>
      <button class="opt" data-i="2">Keep pressing Continue until the program ends</button>
      <button class="opt" data-i="3">Change the surcharge from 15 to 20</button>
      <div class="fb">Work <b>backward from the symptom</b>: the surcharge depends on <code>weight</code>, so first check whether <code>weight</code> is right. Changing the thresholds or the surcharge hides the bug instead of finding it.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What <i>should</i> <code>weight</code> be? (Sum the array by hand.)</div>
      <input class="fillblank sm" data-answer="128">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">12 + 31 + 9 + 46 + 30 = <b>128</b>. The debugger showed 98 &mdash; <b>30 short</b>, which is exactly the last element.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>The array is correct, and the <code>if</code> on line 22 is correct for the spec, but <code>weight</code> is wrong. Where is the bug most likely?</div>
      <button class="opt" data-i="0">The array initialiser in <code>main</code></button>
      <button class="opt" data-i="1">The <code>printf</code> on line 25</button>
      <button class="opt" data-i="2">Inside <code>sum_weights</code>, which computes <code>weight</code></button>
      <button class="opt" data-i="3">The <code>toupper</code> loop</button>
      <div class="fb">Only <code>sum_weights</code> produces <code>weight</code>, so that's where the wrong value is created. Step Into it from line 16.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Step Into <code>sum_weights</code> and step through the loop. What is the <b>last</b> value of <code>i</code> for which line 7 runs?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>3.</b> After that the loop exits, and <code>weights[4]</code> (30) is never added.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does the loop stop after <code>i = 3</code> when the array has 5 elements?</div>
      <button class="opt" data-i="0">The condition is <code>i &lt; n - 1</code>, i.e. <code>i &lt; 4</code>, so <code>i = 4</code> is never processed &mdash; an <b>off-by-one</b> error</button>
      <button class="opt" data-i="1"><code>n</code> is passed in as 3</button>
      <button class="opt" data-i="2"><code>total</code> overflows at 98</button>
      <button class="opt" data-i="3">The debugger skips the last iteration</button>
      <div class="fb"><code>n</code> is 5 (you can confirm that in the Variables pane), so <code>n - 1</code> is 4 and the loop only runs while <code>i</code> is 0&ndash;3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Write the corrected loop condition.</div>
      <input class="fillblank sm" data-answer="i &lt; n~~~i&lt;n~~~i &lt;= n - 1~~~i&lt;=n-1~~~i &lt;= n-1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>i &lt; n</code> &mdash; visit every index from 0 up to <i>n &minus; 1</i>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>After the fix and a recompile, what does the last line print for the cost with a fee of 5? (128 lb &times; 2 + fee + surcharge.)</div>
      <input class="fillblank sm" data-answer="276~~~$276">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">128 &times; 2 + 5 + 15 = <b>276</b>. (Before the fix it was 98 &times; 2 + 5 = 201, with no surcharge.)</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>The <b>sample checkoff's</b> bug had this shape. For <code>x = 120</code>, which blocks run?
<pre>if (x &gt; 50)  { /* A */ }
else if (x &gt; 100) { /* B */ }</pre></div>
      <button class="opt" data-i="0">Only A</button>
      <button class="opt" data-i="1">Only B</button>
      <button class="opt" data-i="2">Both A and B</button>
      <button class="opt" data-i="3">Neither</button>
      <div class="fb">120 &gt; 50, so A runs and the <code>else if</code> is never even evaluated. Any value over 100 is also over 50, so B is unreachable &mdash; the fix is two separate <code>if</code>s.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A program that runs without crashing but prints a wrong answer can't be debugged with breakpoints &mdash; you can only find that kind of bug by adding <code>printf</code>s.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; wrong-answer bugs are exactly what the debugger is for: compare <b>expected vs. actual</b> at each step and find the first place they diverge (here, <code>weight</code> right after line 16).</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">H &middot; Input redirection, <code>launch.json</code>, and the terminal</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Create a file <code>checkoff.in</code> containing the number <code>12</code>.</div>
      <input class="fillblank" data-answer="echo 12 &gt; checkoff.in">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>&gt;</code> creates (or overwrites) the file with that content.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Run <code>./steven</code> with stdin coming from <code>checkoff.in</code>.</div>
      <input class="fillblank" data-answer="./steven &lt; checkoff.in~~~./steven&lt;checkoff.in">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>&lt;</code> redirects <b>stdin</b>. The prompt text still prints (it goes to stdout), but you don't type the fee.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Now add a second line, <code>7</code>, to the <b>end</b> of <code>checkoff.in</code> without erasing the first.</div>
      <input class="fillblank" data-answer="echo 7 &gt;&gt; checkoff.in">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>&gt;&gt;</code> appends. Using <code>&gt;</code> here would erase the <code>12</code>.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span><code>ship.c</code> is the open file at <code>/home/student/lab/ship.c</code>. What is <code>\${fileDirname}</code>?</div>
      <button class="opt" data-i="0"><code>/home/student/lab</code></button>
      <button class="opt" data-i="1"><code>/home/student/lab/ship.c</code></button>
      <button class="opt" data-i="2"><code>ship</code></button>
      <button class="opt" data-i="3"><code>lab</code></button>
      <div class="fb">The <b>absolute path of the directory</b> containing the open file.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>For that same file, what is <code>\${fileBasenameNoExtension}</code>?</div>
      <input class="fillblank sm" data-answer="ship">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>ship</code> &mdash; the file name without its directory and without <code>.c</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You want the debugger to run <code>ship</code> with stdin from <code>checkoff.in</code>. Which debug configuration do you choose (and edit)?</div>
      <button class="opt" data-i="0">Debug active file</button>
      <button class="opt" data-i="1">Debug with input redirected</button>
      <button class="opt" data-i="2">Either &mdash; they're identical</button>
      <button class="opt" data-i="3">Neither &mdash; you must run <code>gdb</code> from the terminal</button>
      <div class="fb"><b>Debug active file</b> launches the executable directly, so nothing feeds it a file. <b>Debug with input redirected</b> launches Bash, which does the <code>&lt;</code> redirection.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which <code>args</code> string in that configuration reads from <code>checkoff.in</code> in the same folder as the source file?</div>
      <button class="opt" data-i="0"><code>"\\"\${fileDirname}/checkoff.in\\" &lt; \\"\${fileDirname}/\${fileBasenameNoExtension}\\""</code></button>
      <button class="opt" data-i="1"><code>"\\"\${fileDirname}/\${fileBasenameNoExtension}\\" &lt; \\"\${fileDirname}/checkoff.in\\""</code></button>
      <button class="opt" data-i="2"><code>"\\"\${fileDirname}/\${fileBasenameNoExtension}\\" &gt; \\"\${fileDirname}/checkoff.in\\""</code></button>
      <button class="opt" data-i="3"><code>"checkoff.in"</code></button>
      <div class="fb">Program <b>then</b> <code>&lt;</code> <b>then</b> the input file. Option C uses <code>&gt;</code>, which would send output <i>into</i> <code>checkoff.in</code> and wipe it; option A is backwards.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does <code>tasks.json</code> do?</div>
      <button class="opt" data-i="0">Sets which breakpoints are active</button>
      <button class="opt" data-i="1">Defines tasks such as building/compiling (the <code>build</code> task that runs <code>gcc -g</code> before the debugger starts)</button>
      <button class="opt" data-i="2">Stores your program's input</button>
      <button class="opt" data-i="3">Lists the files in the project</button>
      <div class="fb"><code>tasks.json</code> = <b>how the program is built</b>; <code>launch.json</code> = <b>how it's run</b> under the debugger. <code>launch.json</code>'s <code>preLaunchTask</code> is what wires the two together.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Your program is stuck in an infinite loop in the terminal. What do you press?</div>
      <button class="opt" data-i="0"><kbd>Ctrl</kbd>+<kbd>C</kbd> &mdash; sends <b>SIGINT</b>, interrupting the running program</button>
      <button class="opt" data-i="1"><kbd>Ctrl</kbd>+<kbd>D</kbd> &mdash; sends end-of-file</button>
      <button class="opt" data-i="2"><kbd>Ctrl</kbd>+<kbd>S</kbd></button>
      <button class="opt" data-i="3">Close the laptop</button>
      <div class="fb"><kbd>Ctrl</kbd>+<kbd>C</kbd> = <b>interrupt</b> (<code>SIGINT</code>).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Your program reads with a <code>getchar()</code> loop from the keyboard until <code>EOF</code>. You've typed all the input. What do you press to say &ldquo;no more input&rdquo;?</div>
      <button class="opt" data-i="0"><kbd>Ctrl</kbd>+<kbd>C</kbd></button>
      <button class="opt" data-i="1"><kbd>Ctrl</kbd>+<kbd>D</kbd> &mdash; signals <b>end-of-file</b> on stdin</button>
      <button class="opt" data-i="2"><kbd>Enter</kbd> twice</button>
      <button class="opt" data-i="3"><kbd>Esc</kbd></button>
      <div class="fb"><kbd>Ctrl</kbd>+<kbd>D</kbd> = <b>EOF</b> for stdin. <kbd>Ctrl</kbd>+<kbd>C</kbd> would instead kill the program. Memorise the pair: <b>C = Cancel/interrupt, D = Done/EOF.</b></div>
    </div>
  </div>
</section>

<!-- ============ EXPLAIN IT ALOUD ============ -->
<section class="topic" id="l19-aloud">
  <h2>Explain It Aloud</h2>
  <div class="concept">A checkoff is <b>oral</b>: you'll be asked <i>how can you tell?</i>, <i>why?</i>, and
  <i>what do you expect to happen?</i> &mdash; often <b>before</b> you press anything. Practise answering out
  loud (or type your answer), <i>then</i> reveal the model answer. These are short on purpose: TAs want the
  right idea in a sentence or two, not an essay.</div>

  <div class="card">
    <p><b>1. You're stopped on <code>total += prices[i];</code> and <code>total</code> is 0 while <code>prices[i]</code> is 18. Has the 18 been added yet? How can you tell?</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal"><p>No. A breakpoint pauses <b>before</b> the highlighted line runs, so that line is <i>about to</i> execute, not finished. <code>total</code> still being 0 confirms it.</p></div>
  </div>

  <div class="card">
    <p><b>2. Why would you use a conditional breakpoint instead of a regular one?</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal"><p>When the line runs many times (like in a loop) but I only care about one situation. The condition is a C expression checked each time the line is reached; the debugger only <i>pauses</i> when it's true, but the other iterations still run normally.</p></div>
  </div>

  <div class="card">
    <p><b>3. How can you find out what a variable <i>will</i> be after the next statement, without running it?</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal"><p>Evaluate the arithmetic myself in the Debug Console &mdash; e.g. <code>total + prices[i]</code>. Evaluating an expression only reads values, so nothing in the running program changes. (An <i>assignment</i> like <code>total = 0</code> would change it.)</p></div>
  </div>

  <div class="card">
    <p><b>4. In one sentence each: Step Over, Step Into, Step Out.</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal"><p><b>Step Over:</b> run this line, including any function it calls, without entering the function. <b>Step Into:</b> if the line calls one of my functions, go inside and pause on its first line. <b>Step Out:</b> finish the current function and pause back in its caller.</p></div>
  </div>

  <div class="card">
    <p><b>5. What does the Call Stack show, and what happens when you click a lower frame?</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal"><p>It shows every function that has been called but hasn't returned yet, with the one executing now on top and <code>main</code> at the bottom. Clicking a lower frame runs nothing &mdash; it only changes which frame's variables I'm inspecting. The program's execution point stays where it was.</p></div>
  </div>

  <div class="card">
    <p><b>6. Talk me through how you'd find an unknown bug with the debugger.</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal">
      <p>A repeatable routine:</p>
      <table class="cmp">
        <tr><td><b>1. State expected vs. actual</b></td><td>&ldquo;It should have applied the surcharge; it didn't.&rdquo;</td></tr>
        <tr><td><b>2. Work backward from the symptom</b></td><td>The surcharge depends on <code>weight</code>, so check <code>weight</code> first.</td></tr>
        <tr><td><b>3. Breakpoint just before the suspect</b></td><td>Not at the top of <code>main</code> &mdash; close to where the value goes wrong.</td></tr>
        <tr><td><b>4. Predict, then step</b></td><td>Say what you expect a line to do; Step Over or Into; compare.</td></tr>
        <tr><td><b>5. Find the first divergence</b></td><td>The first place actual &ne; expected is where the bug is (or feeds it).</td></tr>
        <tr><td><b>6. Fix, save, recompile, re-run</b></td><td>Then confirm the original symptom is gone.</td></tr>
      </table>
    </div>
  </div>

  <div class="card">
    <p><b>7. What's the difference between <code>launch.json</code> and <code>tasks.json</code>?</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal"><p><code>tasks.json</code> defines <b>how the program is built</b> (the <code>gcc -g ...</code> command, using variables like <code>\${file}</code>). <code>launch.json</code> defines <b>how the debugger runs it</b> (the executable path, <code>gdb</code>, program arguments, and a <code>preLaunchTask</code> that runs the build first).</p></div>
  </div>

  <div class="card">
    <p><b>8. Why does the &ldquo;input redirected&rdquo; configuration launch <code>/bin/bash</code> instead of the program itself?</b></p>
    <textarea placeholder="Say it aloud, or type here..."></textarea>
    <button class="btn small" onclick="toggleReveal(this)">Show model answer</button>
    <div class="reveal"><p>The <code>&lt;</code> redirection is a <b>shell</b> feature, not something the program understands. So the debugger starts Bash with <code>-lc "program &lt; file"</code>; Bash points stdin at the file, then runs the program under the debugger. To use a different input file I just edit the path after the <code>&lt;</code>.</p></div>
  </div>
</section>

<!-- ============ COMMON MISTAKES ============ -->
<section class="topic" id="l19-mistakes">
  <h2>Common Mistakes on the Debugging Checkoff</h2>
  <div class="concept">Not obscure errors &mdash; the ones that <i>look</i> right. Read this tab right before
  your slot.</div>

  <div class="card">
    <div class="danger">
      <b>1. Showing up with the debugger not working.</b><br>
      The handout says it in red: <b>no extra time</b>. Do the setup checklist on the first tab and make sure a
      test breakpoint really pauses &mdash; <i>before</i> your slot.
    </div>
    <div class="danger">
      <b>2. Reading the highlighted line as &ldquo;already ran.&rdquo;</b><br>
      Breakpoints and every step stop <b>before</b> the highlighted line executes. Nearly every &ldquo;is X
      already Y?&rdquo; question in the sample depends on this.
    </div>
    <div class="danger">
      <b>3. Forgetting to restart the debugger between sections.</b><br>
      The sample says &ldquo;restart the program&rdquo; several times. If you don't, you're still paused
      somewhere mid-run &mdash; your breakpoints won't hit where you expect, and your predictions will be about
      the wrong moment. Also <b>remove or disable old breakpoints</b> when told to (section 5 and section 9), or
      the program keeps stopping in places you no longer care about.
    </div>
    <div class="danger">
      <b>4. Typing <code>=</code> instead of <code>==</code> in a breakpoint condition or in the console.</b><br>
      <code>prices[i] = 40</code> doesn't <i>test</i> anything &mdash; it <b>overwrites</b> <code>prices[i]</code>
      with 40 and is always true. Comparisons use <code>==</code>, <code>&gt;</code>, <code>&lt;</code>. Assignments
      typed in the Debug Console change the running program, which is exactly what section 4d is asking about.
    </div>
    <div class="danger">
      <b>5. Using Step Into on a library call.</b><br>
      There's no source for <code>printf</code>, <code>scanf</code>, or <code>toupper</code>, so Step Into just acts
      like Step Over. Step Into is for <b>your own</b> functions.
    </div>
    <div class="danger">
      <b>6. Editing the redirected configuration but launching the other one.</b><br>
      If you pick <b>Debug active file</b>, nothing is redirected: the program sits there waiting for you to
      type the input (it looks frozen). Choose <b>Debug with input redirected</b> from the dropdown, and make
      sure the input file is in the same folder as the source (the path is built from
      <code>\${fileDirname}</code>). Don't get <code>&lt;</code> and <code>&gt;</code> backwards either:
      <code>&gt;</code> would <i>erase</i> your input file.
    </div>
    <div class="danger">
      <b>7. Not saving or recompiling after your fix.</b><br>
      Save the file first. Then remember the two paths: the <b>terminal</b> runs whatever the last
      <code>gcc</code> produced (section 10a: re-run <code>gcc</code> to update it), while the <b>debugger</b>
      rebuilds with <code>-g</code> automatically via <code>preLaunchTask</code>. If the terminal still shows the
      old bug after you fixed it, you forgot to recompile.
    </div>
    <div class="danger">
      <b>8. Answering with the click, not the reason.</b><br>
      You'll be asked &ldquo;how can you tell?&rdquo; and to <b>predict before acting</b>. Say the expectation
      first (&ldquo;I expect to land on line 49 in <code>process_order</code>&rdquo;), then do it, then compare.
      A correct action with no explanation is worth less than one where you can say why.
    </div>
  </div>

  <div class="card">
    <p class="muted">Related: the <b>CL10 &middot; Debugging</b> lesson has the full
    <code>launch.json</code>/<code>tasks.json</code> reference and a worked bug hunt, and <b>Checkoff 1
    Prep</b> covers the redirection commands (<code>&lt;</code>, <code>&gt;</code>, <code>&gt;&gt;</code>) this
    checkoff re-tests in section 10.</p>
  </div>
</section>

</main>`;
