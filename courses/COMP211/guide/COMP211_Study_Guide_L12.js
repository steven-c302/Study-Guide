/* ============================================================
   LESSON — HW2: Function Stack Frames, Pass by Value/Pointer,
   $PATH, Shell Globbing & Regex. Built from a completed/graded
   HW2 submission (33/33).
   Injects into #l12. Loaded BEFORE the shared engine.
   Plain content lesson — no interactive widget, no initL12().
   ============================================================ */
document.getElementById('l12').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l12-frames')">1 &middot; Stack Frames Deep-Dive</button>
  <button onclick="showTopic(this,'l12-passing')">2 &middot; Pass by Value vs. Pass by Pointer</button>
  <button onclick="showTopic(this,'l12-path')">3 &middot; $PATH &amp; Running Programs</button>
  <button onclick="showTopic(this,'l12-glob')">4 &middot; Shell Globbing Practice</button>
  <button onclick="showTopic(this,'l12-regex')">5 &middot; Regex Practice</button>
</nav>
<main>

<!-- ============ STACK FRAMES DEEP-DIVE ============ -->
<section class="topic active" id="l12-frames">
  <h2>HW02 &middot; Stack Frames Deep-Dive</h2>
  <p class="muted">Reinforces Lesson 4's memory-diagram model of function calls: where frames are drawn,
  how the stack pointer (sp) moves, and what "returning" actually does to the diagram.</p>

  <h3>The basics, reinforced</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Question</th><th>Answer</th></tr>
      <tr><td>Where is a callee's frame drawn relative to the caller's?</td><td><b>Below</b> the caller's frame</td></tr>
      <tr><td>Which direction does the stack grow in our memory diagrams?</td><td>From <b>higher</b> memory addresses toward <b>lower</b> memory addresses</td></tr>
      <tr><td>What does the stack pointer (sp) represent?</td><td>The memory address marking the <b>current end</b> of the stack</td></tr>
      <tr><td>What happens to sp when a new frame is created?</td><td>It moves <b>down</b>, toward lower memory addresses</td></tr>
      <tr><td>What does the return address (RA) represent?</td><td>Where execution should <b>continue after the function returns</b></td></tr>
    </table>
  </div>

  <h3>Reading a frame entry</h3>
  <div class="card">
    <p class="muted">Given a memory-diagram entry like <code>x (4): 12</code>:</p>
    <div class="concept">The parenthesized number (<code>4</code>) is <b>the number of bytes occupied by
    <code>x</code></b> &mdash; not its value, not its address, and not a line number. The value after the colon
    (<code>12</code>) is the actual stored value.</div>
    <p class="muted">If <code>main</code> calls a function <code>add</code> whose return value <code>main</code>
    needs, the label used for that return-value slot in <code>main</code>'s frame is
    <code><b>RV(add)</b></code> &mdash; distinct from <code>RA</code> (the return <i>address</i>) and
    <code>SP</code> (the stack pointer).</p>
  </div>

  <h3>What happens when a function returns</h3>
  <div class="card">
    <div class="concept">Two things happen to the memory diagram when a function returns: <b>sp moves back up</b>
    (toward higher addresses, undoing the down-move that created the frame), and the returning function's
    <b>old frame gets an X put through it</b>. Nothing is erased byte-by-byte and the memory doesn't stop
    existing &mdash; the X just marks that <b>the frame is no longer valid</b>, even though its old data may
    still physically remain in memory until something overwrites it.</div>
  </div>

  <h3>What belongs in a stack frame?</h3>
  <div class="card">
    <p class="muted">A function's stack frame holds its <b>parameters</b>, its <b>local variables</b>, and
    <b>information about where execution should return</b> (RA/RV) &mdash; but <i>not</i> every global
    variable in the program (globals live elsewhere, not on the stack).</p>
    <div class="warn"><b>A <code>#define</code>d constant does not get its own stack slot.</b> Given
    <code>#define SIZE 5</code> used to declare <code>int values[SIZE];</code>, <code>SIZE</code> itself does
    <b>not</b> receive a location in the frame, because <code>#define</code> is a <b>preprocessor
    directive</b> &mdash; it's textually substituted before compilation even begins, so there's no
    <code>SIZE</code> variable left to store by the time the program runs.</div>
  </div>

  <h3>Arrays and pointers in frames</h3>
  <div class="card">
    <p class="muted">When an array like <code>numbers</code> is passed to a function <code>foo(int arr[])</code>,
    the memory diagram should show a <b>pointer in <code>foo</code>'s frame with an arrow drawn back to the
    original array</b> in the caller's frame &mdash; the array itself is never copied into the callee's frame.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Where should a callee's stack frame be drawn relative to its caller's?</div>
      <button class="opt" data-i="0">Above the caller's frame</button>
      <button class="opt" data-i="1">Below the caller's frame</button>
      <button class="opt" data-i="2">Inside the caller's frame</button>
      <button class="opt" data-i="3">Either above or below</button>
      <div class="fb">The callee's frame is always drawn <b>below</b> the caller's &mdash; the stack grows
      toward lower memory addresses as new calls are made.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why put an X through a stack frame after its function returns, rather than treating that memory as gone?</div>
      <button class="opt" data-i="0">The memory no longer physically exists</button>
      <button class="opt" data-i="1">Every byte in the frame has automatically become zero</button>
      <button class="opt" data-i="2">The frame is no longer valid, although its old data may still physically remain in memory</button>
      <button class="opt" data-i="3">The function encountered an error</button>
      <div class="fb">The X is a <b>validity</b> marker, not proof of erasure &mdash; the bytes can still be sitting
      in memory (this is exactly why using a pointer to a returned-from frame is undefined behavior: the data
      might look fine, or might already be overwritten).</div>
    </div>
    <div class="q" data-multi="0,1,2">
      <div class="prompt"><span class="tag">Select all that apply</span>Which of the following may be stored in a function's stack frame?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> Parameters to the function</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> Local variables</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Information about where execution should return after the function finishes</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> Every global variable in the program</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A, B, and C.</b> Globals (<b>D</b>) live in a separate region of memory, not inside any
      individual function's frame.</div>
    </div>
  </div>

  <h3>Tracing frame order across calls</h3>
  <div class="card">
    <p class="muted">Suppose active frames are arranged, highest address first: <code>main, foo, bar</code>. While
    <code>bar</code> is executing, what do the active frames look like right after <code>bar</code> returns to
    <code>foo</code>?</p>
    <div class="concept">Only <code>bar</code>'s frame is removed &mdash; the frames left are, from highest to
    lowest address, <b><code>main, foo</code></b>. Nothing about <code>main</code> or <code>foo</code> changes;
    a return only ever removes the single frame that's returning.</div>
    <p class="muted">Second example &mdash; given <code>doubleIt(int n)</code> called from <code>compute(int x)</code>
    called from <code>main()</code>, while <code>doubleIt</code> is executing, the active frames from highest to
    lowest memory address are:</p>
    <p><code><b>main &rarr; compute &rarr; doubleIt</b></code> &mdash; each caller's frame sits above (higher
    address than) the frame of the function it called.</p>
  </div>

  <h3>Ordering the events of a function call</h3>
  <div class="card">
    <p class="muted">For <code>int foo() { return 5; } int main() { int x = foo(); }</code>, put these five events
    in execution order: (1) foo's frame is deallocated, (2) main's frame is created, (3) foo's return value is
    placed in RV(foo), (4) foo's frame is created, (5) sp moves back up.</p>
    <input class="fillblank" data-answer="2, 4, 3, 1, 5~~~2,4,3,1,5">
    <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
    <div class="fb"><code>main</code>'s frame must exist first (2) before it can call <code>foo</code>, whose
    frame is then created (4); <code>foo</code> computes its result and places it in <code>RV(foo)</code> (3)
    <i>before</i> its frame is torn down (1) and sp moves back up (5).</div>

    <p style="margin-top:20px" class="muted">For <code>doubleIt(int n)</code> called as <code>doubleIt(4)</code>
    from <code>main</code>, order these seven events: (1) doubleIt's return value is placed in
    RV(doubleIt), (2) main's stack frame is created, (3) doubleIt's stack frame is deallocated, (4)
    doubleIt's stack frame is created, (5) result is assigned the value 8, (6) sp moves back up after doubleIt
    returns, (7) the argument n receives the value 4.</p>
    <input class="fillblank" data-answer="2, 4, 7, 5, 1, 3, 6~~~2,4,7,5,1,3,6">
    <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
    <div class="fb"><code>main</code>'s frame exists first (2), then <code>doubleIt</code>'s frame is created (4)
    and its parameter <code>n</code> receives 4 (7); inside the body, <code>result</code> is computed as 8 (5)
    and placed in the return slot (1); only then is the frame torn down (3) and sp restored (6).</div>

    <p style="margin-top:20px" class="muted">For <code>addOne(int x)</code> called from <code>calculate(int n)</code>
    called from <code>main</code> as <code>calculate(5)</code>, order these eleven events: (1) calculate's return
    value is placed in RV(calculate), (2) addOne's stack frame is deallocated, (3) calculate's stack frame is
    created, (4) addOne's return value is placed in RV(addOne), (5) main's stack frame is created, (6)
    calculate's stack frame is deallocated, (7) addOne's stack frame is created, (8) addOne's local variable
    result is assigned 6, (9) calculate's local variable answer is assigned 6, (10) sp moves back up after
    addOne returns, (11) sp moves back up after calculate returns.</p>
    <input class="fillblank" data-answer="5, 3, 7, 8, 4, 2, 10, 9, 1, 6, 11~~~5,3,7,8,4,2,10,9,1,6,11">
    <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
    <div class="fb">Each call nests one level deeper before anything unwinds:
    <code>main</code>&rarr;<code>calculate</code>&rarr;<code>addOne</code> all get created and run to completion
    of <code>addOne</code> first (5, 3, 7, 8, 4), <i>then</i> <code>addOne</code> unwinds (2, 10) before
    <code>calculate</code> finishes its own work (9, 1) and unwinds (6, 11).</div>
  </div>
</section>

<!-- ============ PASS BY VALUE VS. PASS BY POINTER ============ -->
<section class="topic" id="l12-passing">
  <h2>HW02 &middot; Pass by Value vs. Pass by Pointer</h2>

  <div class="concept">Passing <b>by value</b> gives the called function a <b>copy</b> of the argument, stored
  in its <i>own</i> frame slot &mdash; changing the parameter can never affect the caller's original variable.
  Passing <b>by pointer</b> gives the called function a pointer that can <b>refer back to</b> the original
  variable, so writes through that pointer <i>do</i> affect the caller's data.</div>

  <h3>Pass by value</h3>
  <div class="card">
<pre>void change(int32_t x) {
    x = 20;
}

int main() {
    int32_t x = 10;
    change(x);
}   // main's x is still 10 &mdash; change() only modified its own copy</pre>
    <p class="muted">Correct statements about pass by value: the function receives a copy of the argument's
    value; the parameter has its own location in the called function's stack frame; changing the parameter does
    <b>not</b> change the caller's original variable. ("Changing the parameter changes the caller's original
    variable" is <b>false</b> &mdash; that's what makes pass by value pass by <i>value</i>.)</p>
  </div>

  <h3>Arrays are effectively passed by pointer</h3>
  <div class="card">
<pre>void update(int32_t arr[]) {
    arr[0] = 100;
}

int main() {
    int32_t values[3] = {1, 2, 3};
    update(values);
}   // values[0] is now 100 &mdash; update() wrote through to the original array</pre>
    <div class="warn">In C, an array argument decays to a pointer to its first element. So even though there's no
    explicit <code>*</code> or <code>&amp;</code> in the call, <code>update</code> can still modify the
    caller's original array: the entire array is <b>not</b> copied, the original stays in the caller's frame,
    the callee can change its elements, and those changes are still visible after the callee returns.</div>
  </div>

  <h3>Mixing value and array parameters</h3>
  <div class="card">
    <p class="muted">Given <code>void update(int32_t x, int32_t arr[]) { x = 100; arr[0] = 100; }</code> called
    as <code>update(x, nums)</code> where <code>main</code> has <code>x = 5</code> and
    <code>nums = {1, 2, 3}</code>:</p>
    <p>After <code>update</code> returns: <code><b>x = 5, nums = {100, 2, 3}</b></code> &mdash; the plain
    <code>int32_t x</code> parameter is pass-by-value (caller's <code>x</code> untouched), while the array
    parameter still refers back to the caller's original <code>nums</code> (its first element changes).</p>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>What does it mean to pass an argument by value?</div>
      <button class="opt" data-i="0">The called function receives a copy of the argument's value</button>
      <button class="opt" data-i="1">The called function receives the memory address of the original variable</button>
      <button class="opt" data-i="2">The original variable is moved into the called function's stack frame</button>
      <button class="opt" data-i="3">Both functions use the same variable</button>
      <div class="fb">A copy, stored in the callee's own frame slot &mdash; the caller's variable is never
      touched.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does it mean to pass a variable by pointer?</div>
      <button class="opt" data-i="0">The called function receives a copy of the variable's value</button>
      <button class="opt" data-i="1">The called function receives a pointer that can refer to the original variable</button>
      <button class="opt" data-i="2">The original variable is copied into the called function's stack frame</button>
      <button class="opt" data-i="3">The caller's stack frame is removed</button>
      <div class="fb">A pointer refers back to the original storage location, so writes through it are visible
      to the caller.</div>
    </div>
    <div class="q">
      <p>Given <code>void change(int32_t x){ x = 20; } int main(){ int32_t x = 10; change(x); }</code> &mdash;
      what is <code>main</code>'s <code>x</code> after <code>change</code> returns?</p>
      <input class="fillblank" data-answer="10">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb">Still <b>10</b>. <code>change</code>'s parameter <code>x</code> is a separate copy in its
      own frame &mdash; assigning to it never reaches back into <code>main</code>.</div>
    </div>
    <div class="q">
      <p>Given <code>void update(int32_t arr[]){ arr[0] = 100; }</code> called on
      <code>int32_t values[3] = {1,2,3}; update(values);</code> &mdash; what is <code>values[0]</code> after
      <code>update</code> returns?</p>
      <input class="fillblank" data-answer="100">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb">Arrays decay to a pointer when passed &mdash; <code>arr</code> refers to the same memory
      as <code>values</code>, so the write through <code>arr[0]</code> is visible in <code>main</code> as
      <b>100</b>.</div>
    </div>
  </div>
</section>

<!-- ============ $PATH & RUNNING PROGRAMS ============ -->
<section class="topic" id="l12-path">
  <h2>HW02 &middot; $PATH &amp; Running Programs</h2>

  <div class="concept">Whether you type an <b>explicit path</b> (<code>./analyze</code>) or a <b>bare
  name</b> (<code>analyze</code>) changes how the shell decides which program actually runs.</div>

  <h3>Worked scenario</h3>
  <div class="card">
    <p class="muted">Current directory: <code>/home/student/lab</code>. Three executable files named
    <code>analyze</code> exist: <code>/usr/local/bin/analyze</code>, <code>/home/student/tools/analyze</code>,
    and <code>/home/student/lab/analyze</code>. <code>$PATH</code> is
    <code>/usr/local/bin:/home/student/tools:/usr/bin:/bin</code>.</p>
    <table class="cmp">
      <tr><th>You type&hellip;</th><th>What runs</th><th>Why</th></tr>
      <tr><td><code>./analyze</code></td><td><code>/home/student/lab/analyze</code></td><td>An explicit relative path always wins &mdash; <code>$PATH</code> is never consulted</td></tr>
      <tr><td><code>analyze</code></td><td><code>/usr/local/bin/analyze</code></td><td>A bare name is searched for in <code>$PATH</code> order; <code>/usr/local/bin</code> is listed first</td></tr>
      <tr><td><code>../tools/analyze</code></td><td><code>/home/student/tools/analyze</code></td><td>Another explicit (relative) path &mdash; again, <code>$PATH</code> is irrelevant</td></tr>
    </table>
    <div class="warn"><b>Any slash in what you type makes it an explicit path.</b> The moment a command contains
    a <code>/</code> (whether <code>./</code>, <code>../</code>, or a full absolute path), the shell resolves it
    directly and never searches <code>$PATH</code> at all. Only a bare name with no slash triggers a
    <code>$PATH</code> search.</div>
  </div>

  <h3>Changing $PATH changes what a bare name resolves to</h3>
  <div class="card">
    <p class="muted">If <code>$PATH</code> is changed to
    <code>/home/student/tools:/usr/local/bin:/usr/bin:/bin</code> (tools now listed <b>first</b>), then typing
    <code>analyze</code> now runs <code><b>/home/student/tools/analyze</b></code> instead &mdash; the search
    order changed, so the first match along the new <code>$PATH</code> changed too, even though nothing about
    the files themselves moved.</p>
  </div>

  <div class="card">
    <div class="q">
      <p>You're in <code>/home/student/lab</code> with an executable at that same path; typing
      <code>./analyze</code> runs which absolute path?</p>
      <input class="fillblank" data-answer="/home/student/lab/analyze">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb">Explicit relative paths (anything with a <code>/</code>) are resolved directly, never
      through <code>$PATH</code>.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>Typing a bare command name with no slash triggers a search through <code>$PATH</code>, in order, for the first matching executable.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> The shell walks the colon-separated directories in <code>$PATH</code> left to
      right and runs the first executable match it finds.</div>
    </div>
  </div>
</section>

<!-- ============ SHELL GLOBBING PRACTICE ============ -->
<section class="topic" id="l12-glob">
  <h2>HW02 &middot; Shell Globbing Practice</h2>
  <p class="muted">Two complementary skill sets: writing <code>find -name</code> patterns (which use a
  restricted glob-style syntax), and writing plain shell globs for <code>ls</code>/<code>cp</code>/<code>rm</code>
  directly on the command line.</p>

  <h3><code>find -name</code> patterns</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Goal</th><th>Command</th></tr>
      <tr><td>Files named exactly <code>notes.txt</code></td><td><code>find . -name "notes.txt"</code></td></tr>
      <tr><td>Files ending in <code>.md</code></td><td><code>find . -name "*.md"</code></td></tr>
      <tr><td>Files whose names begin with <code>test</code></td><td><code>find . -name "test*"</code></td></tr>
      <tr><td>All <code>.txt</code> files inside <code>docs/</code> and its subdirectories</td><td><code>find docs -name "*.txt"</code></td></tr>
      <tr><td>Files beginning with <code>test</code>, then exactly one character, then <code>.c</code></td><td><code>find . -name "test?.c"</code></td></tr>
    </table>
    <div class="concept">In <code>find -name</code> patterns, <code>*</code> matches <b>any number of
    characters</b> (including zero) and <code>?</code> matches <b>exactly one</b> character &mdash; and because
    <code>find</code> already recurses into subdirectories on its own, pointing it at a starting directory
    (like <code>docs</code>) is enough to reach nested files without any extra flags.</div>
  </div>

  <h3>Plain shell globs</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Goal</th><th>Command</th></tr>
      <tr><td>List every <code>.txt</code> file</td><td><code>ls *.txt</code></td></tr>
      <tr><td>List files beginning with <code>data</code> and ending in <code>.csv</code></td><td><code>ls data*.csv</code></td></tr>
      <tr><td>List all <code>.c</code> files inside <code>src/</code></td><td><code>ls src/*.c</code></td></tr>
      <tr><td>List all <code>.c</code> and <code>.h</code> files inside <code>src/</code></td><td><code>ls src/*.[ch]</code></td></tr>
      <tr><td>Copy every <code>.txt</code> file into <code>backup/</code></td><td><code>cp *.txt backup/</code></td></tr>
      <tr><td>Copy all files beginning with <code>report</code> into <code>backup/</code></td><td><code>cp report* backup/</code></td></tr>
      <tr><td>Display the contents of all <code>.md</code> files</td><td><code>cat *.md</code></td></tr>
      <tr><td>Delete every <code>.png</code> file</td><td><code>rm *.png</code></td></tr>
    </table>
    <div class="concept"><code>[ch]</code> is a <b>bracket set</b> &mdash; it matches a single character that is
    <i>either</i> <code>c</code> <i>or</i> <code>h</code>, which is exactly what's needed to glob both
    <code>.c</code> and <code>.h</code> files with one pattern (<code>*.[ch]</code>) instead of writing two
    separate commands.</div>
  </div>

  <div class="card">
    <div class="q">
      <p>Write the <code>find</code> command to list every file whose name ends in <code>.md</code>, anywhere
      under the current directory.</p>
      <input class="fillblank" data-answer="find . -name &quot;*.md&quot;~~~find . -name '*.md'~~~find . -name *.md">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>find . -name "*.md"</code> &mdash; <code>*</code> matches any run of characters
      before <code>.md</code>.</div>
    </div>
    <div class="q">
      <p>Write the shell glob command to list all <code>.c</code> and <code>.h</code> files inside
      <code>src/</code> in one command.</p>
      <input class="fillblank" data-answer="ls src/*.[ch]">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb">The bracket set <code>[ch]</code> matches either letter in that single position, covering
      both extensions at once: <code>ls src/*.[ch]</code>.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>find . -name "test?.c"</code> matches a file named <code>test.c</code> (no character between <code>test</code> and <code>.c</code>).</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> <code>?</code> requires <b>exactly one</b> character in that position, so
      it matches <code>test1.c</code> or <code>testX.c</code> but not <code>test.c</code> (zero characters) or
      <code>test12.c</code> (two characters).</div>
    </div>
  </div>
</section>

<!-- ============ REGEX PRACTICE ============ -->
<section class="topic" id="l12-regex">
  <h2>HW02 &middot; Regex Practice</h2>
  <p class="muted">All ten patterns below are <code>grep</code> commands against a file <code>students.txt</code>
  &mdash; the same anchor (<code>^</code>/<code>$</code>), character-class, and repetition (<code>*</code>)
  syntax from Lesson 5, now drilled against concrete matching goals.</p>

  <div class="card">
    <table class="cmp">
      <tr><th>Goal</th><th>Command</th><th>Key idea</th></tr>
      <tr><td>Every line containing <code>Alice</code></td><td><code>grep "Alice" students.txt</code></td><td>Plain substring match &mdash; no metacharacters needed</td></tr>
      <tr><td>Every line that starts with <code>A</code></td><td><code>grep "^A" students.txt</code></td><td><code>^</code> anchors to the <b>start</b> of the line</td></tr>
      <tr><td>Every line that ends with <code>a</code></td><td><code>grep "a$" students.txt</code></td><td><code>$</code> anchors to the <b>end</b> of the line</td></tr>
      <tr><td>Lines starting with <code>A</code> and ending with <code>a</code>, anything between</td><td><code>grep "^A.*a$" students.txt</code></td><td><code>.*</code> = any number of any character</td></tr>
      <tr><td>Lines containing <code>Bob</code> followed by zero or more <code>b</code> characters</td><td><code>grep "Bobb*" students.txt</code></td><td><code>*</code> repeats the <b>single character right before it</b> (here, the second <code>b</code>) zero or more times</td></tr>
      <tr><td>Lines containing <code>student</code> followed by exactly one character</td><td><code>grep "student." students.txt</code></td><td>Unescaped <code>.</code> = exactly one <b>any</b> character</td></tr>
      <tr><td>Lines containing any digit 0&ndash;9</td><td><code>grep "[0-9]" students.txt</code></td><td><code>[0-9]</code> is a character-class <b>range</b></td></tr>
      <tr><td>Lines beginning with A, B, or C</td><td><code>grep "^[ABC]" students.txt</code></td><td>Combine an anchor with a character class</td></tr>
      <tr><td>Lines ending with a digit</td><td><code>grep "[0-9]$" students.txt</code></td><td>Combine a character class with the end anchor</td></tr>
      <tr><td>Lines containing at least one lowercase vowel</td><td><code>grep "[aeiou]" students.txt</code></td><td>Character classes don't need ranges &mdash; an explicit list works too</td></tr>
    </table>
    <div class="warn"><b><code>Bobb*</code>, not <code>Bob*</code>.</b> A common mistake is writing
    <code>grep "Bob*"</code> for "Bob followed by zero or more <i>b</i>s" &mdash; but that pattern actually means
    "Bo, followed by zero or more <i>b</i>s" (the <code>*</code> only repeats the single character immediately
    to its left, which is the second <code>b</code> in <code>Bob</code>, not the whole word). Writing
    <code>Bobb*</code> correctly repeats the <i>extra</i> b's after "Bob".</div>
  </div>

  <div class="card">
    <div class="q">
      <p>Write a <code>grep</code> command to find every line that starts with <code>A</code>.</p>
      <input class="fillblank" data-answer="grep &quot;^A&quot; students.txt~~~grep '^A' students.txt">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>grep "^A" students.txt</code> &mdash; <code>^</code> anchors the match to the very
      start of the line.</div>
    </div>
    <div class="q">
      <p>Write a <code>grep</code> command to find lines containing <code>student</code> followed by exactly one
      character.</p>
      <input class="fillblank" data-answer="grep &quot;student.&quot; students.txt~~~grep 'student.' students.txt">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>grep "student."</code> &mdash; the trailing unescaped <code>.</code> matches exactly
      one arbitrary character right after "student" (e.g. <code>student1</code>, <code>student2</code>).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does the regex <code>Bob*</code> actually match?</div>
      <button class="opt" data-i="0">"Bob" followed by zero or more additional b's</button>
      <button class="opt" data-i="1">"Bo" followed by zero or more b's (so "Bo", "Bob", "Bobb", ...)</button>
      <button class="opt" data-i="2">Exactly the literal string "Bob*"</button>
      <button class="opt" data-i="3">Any line containing the letter B</button>
      <div class="fb"><code>*</code> applies only to the <b>single character immediately preceding it</b> &mdash;
      here, the second <code>b</code> in "Bob" &mdash; so it matches "Bo", "Bob", "Bobb", etc. To require
      "Bob" plus zero-or-more extra b's, you need <code>Bobb*</code>.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span><code>[0-9]</code> and <code>[aeiou]</code> are both examples of character classes &mdash; the first uses a range, the second an explicit list.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> A character class matches exactly one character from whatever set is inside
      the brackets, whether that set is written as a range (<code>0-9</code>) or spelled out
      (<code>aeiou</code>).</div>
    </div>
  </div>
</section>

</main>
`;
