/* ============================================================
   READING ASSIGNMENT 02 — C Strings (DiS 16.5), I/O Redirection
   (DiS 17.12), and Pipes (DiS 17.13).
   Injects into #r02. Loaded BEFORE the shared engine.
   NOTE: inside the template literal below, a literal backslash
   must be written as \\ (so the null char prints as \\0).
   ============================================================ */
document.getElementById('r02').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'r02-strings')">1 &middot; C Strings</button>
  <button onclick="showTopic(this,'r02-strlab')">String Memory Lab</button>
  <button onclick="showTopic(this,'r02-redirect')">2 &middot; I/O Redirection</button>
  <button onclick="showTopic(this,'r02-fdlab')">Redirection Lab</button>
  <button onclick="showTopic(this,'r02-pipes')">3 &middot; Pipes</button>
  <button onclick="showTopic(this,'r02-quiz')">&#9733; Assignment Q&amp;A</button>
  <button onclick="showTopic(this,'r02-code')">Code Writing</button>
</nav>
<main>

<!-- ===================================================================
     TOPIC 1 — C STRINGS
     =================================================================== -->
<section class="topic active" id="r02-strings">
  <h2>Reading 02 &middot; Part 1 — Strings in C</h2>

  <div class="concept">
    Java gives you a <code>String</code> <b>class</b> with a rich interface (<code>.length()</code>,
    <code>.equals()</code>, <code>+</code>). <b>C has no string type at all.</b> A C string is just an
    <b>array of <code>char</code> values</b> that ends with the <b>null character <code>'\\0'</code></b>.
    Everything else — the length, the safety, the memory — is your job.
  </div>

  <h3>The one rule that generates every other rule</h3>
  <div class="card">
    <p>A <code>char</code> array is only a <b>string</b> if it contains a <code>'\\0'</code>. The terminator is
    how every string function knows where to stop, because <b>nothing else in the array records the length</b>.</p>
    <div class="two">
      <div>
        <h4>Array <i>capacity</i> vs string <i>length</i></h4>
        <p class="muted">These are different numbers and mixing them up is the classic C bug.</p>
        <table class="cmp">
          <tr><th>Term</th><th>Meaning</th><th>For <code>char s[10] = "hi";</code></th></tr>
          <tr><td><b>Capacity</b></td><td>How many <code>char</code> slots were allocated</td><td><b>10</b></td></tr>
          <tr><td><b>Length</b></td><td><code>strlen(s)</code> — chars <i>before</i> the <code>'\\0'</code></td><td><b>2</b></td></tr>
          <tr><td><b>Bytes used</b></td><td>length + 1 (the terminator)</td><td><b>3</b></td></tr>
        </table>
      </div>
      <div>
        <h4>Sizing an array for a literal</h4>
        <p class="muted">Minimum capacity = number of characters <b>+ 1</b>.</p>
        <table class="cmp">
          <tr><th>String</th><th>Chars</th><th>Minimum array size</th></tr>
          <tr><td><code>"hi"</code></td><td>2</td><td><b>3</b></td></tr>
          <tr><td><code>"hello"</code></td><td>5</td><td><b>6</b></td></tr>
          <tr><td><code>""</code> (empty)</td><td>0</td><td><b>1</b></td></tr>
        </table>
        <p class="muted">Forgetting the "+1" is the single most common C string mistake.</p>
      </div>
    </div>
  </div>

  <h3>The book's example program</h3>
  <div class="card">
<pre><span class="cm">// from Dive into Systems 16.5 — strings and the C string library</span>
<span class="cm">#include</span> <span class="st">&lt;stdio.h&gt;</span>
<span class="cm">#include</span> <span class="st">&lt;string.h&gt;</span>   <span class="cm">// needed for strlen, strcpy, ...</span>

<span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {
    <span class="ty">char</span> str1[<span class="nm">10</span>];
    <span class="ty">char</span> str2[<span class="nm">10</span>];
    <span class="ty">int</span> len;

    str1[<span class="nm">0</span>] = <span class="st">'h'</span>;
    str1[<span class="nm">1</span>] = <span class="st">'i'</span>;
    str1[<span class="nm">2</span>] = <span class="st">'\\0'</span>;      <span class="cm">// without this line str1 is NOT a string</span>

    len = <span class="fn">strlen</span>(str1);   <span class="cm">// 2  — chars before the '\\0', not the capacity</span>
    <span class="fn">printf</span>(<span class="st">"%s %d\\n"</span>, str1, len);

    <span class="fn">strcpy</span>(str2, str1); <span class="cm">// copies through and including the '\\0'</span>
    <span class="fn">printf</span>(<span class="st">"%s\\n"</span>, str2);

    <span class="fn">strcpy</span>(str2, <span class="st">"hello"</span>);
    len = <span class="fn">strlen</span>(str2);   <span class="cm">// 5</span>
    <span class="fn">printf</span>(<span class="st">"%s has %d chars\\n"</span>, str2, len);
}</pre>
    <p class="muted" style="margin-top:10px">Note <code>"%s"</code> — the placeholder for a string.
    <code>printf</code> walks the array from the pointer you gave it and emits bytes <b>until it hits
    <code>'\\0'</code></b>. It has no idea how big your array is.</p>
  </div>

  <h3>The string library (<code>&lt;string.h&gt;</code>)</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Function</th><th>What it does</th><th>What it assumes about you</th></tr>
      <tr><td><code>strlen(s)</code></td><td>Counts chars up to (not including) <code>'\\0'</code></td><td><code>s</code> really is null-terminated</td></tr>
      <tr><td><code>strcpy(dst, src)</code></td><td>Copies <code>src</code> into <code>dst</code>, terminator included</td><td><code>dst</code> is big enough <b>and</b> <code>src</code> is terminated</td></tr>
    </table>
    <div class="warn"><b>Why <code>strcpy</code> is dangerous.</b> It takes no size argument, so it cannot
    check anything. If <code>dst</code> is too small it writes straight past the end of the array —
    <b>undefined behavior</b> (silent corruption, a crash, or a buffer-overflow exploit). If <code>src</code>
    is missing its <code>'\\0'</code>, the copy keeps running through whatever memory follows. The book
    flags this and points to bounded alternatives (<code>strncpy</code>, <code>strlcpy</code>) later on.</div>
  </div>

  <h3>C vs Java, in one table</h3>
  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Java</th><th>C</th></tr>
      <tr><td>What a string <i>is</i></td><td>A <code>String</code> object</td><td>A <code>char</code> array</td></tr>
      <tr><td>Length</td><td>Stored in the object; <code>O(1)</code></td><td>Recomputed by scanning for <code>'\\0'</code>; <code>O(n)</code></td></tr>
      <tr><td>Bounds</td><td>Checked; throws an exception</td><td>Unchecked; undefined behavior</td></tr>
      <tr><td>Who guarantees safety</td><td>The language/runtime</td><td><b>The programmer</b></td></tr>
    </table>
    <p class="muted">Java is "safer" not because it is faster or smaller but because it <b>hides the memory
    and termination details</b> that C hands to you.</p>
  </div>

  <h3>Quick checks</h3>
  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Every <code>char</code> array is a C string.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">The implication only runs <b>one way</b>: every C string is a <code>char</code> array, but a
      <code>char</code> array is only a string once it contains a <code>'\\0'</code>. A buffer of raw bytes with no
      terminator is a perfectly legal <code>char</code> array and a completely invalid string.</div>
    </div>
    <div class="q" data-tf="F" style="margin-top:16px">
      <div class="prompt"><span class="tag">True / False</span><code>strlen(s)</code> tells you how many bytes the array occupies.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><code>strlen</code> returns the number of characters <b>before</b> the terminator. For
      <code>char s[10] = "hello";</code> the array occupies 10 bytes, the string needs 6 bytes, and
      <code>strlen</code> returns <b>5</b>. Three different numbers.</div>
    </div>
  </div>
  <div class="card">
    <h3 style="margin-top:0">Fill in the vocabulary</h3>
    <div class="q">
      <p>A C string is an array of <input type="text" class="fillblank sm" data-answer="char|chars|character|characters" placeholder="?" style="width:110px"> values that must end with the
      <input type="text" class="fillblank sm" data-answer="null|null character|nul|\\0|'\\0'|0" placeholder="?" style="width:130px"> character, written
      <input type="text" class="fillblank sm" data-answer="\\0|'\\0'" placeholder="?" style="width:90px">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>char</b> &rarr; <b>null</b> &rarr; <b>\\0</b>. That terminator is the only thing
      marking where the string ends.</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     STRING MEMORY LAB
     =================================================================== -->
<section class="topic" id="r02-strlab">
  <h2>String Memory Lab</h2>
  <div class="concept">Type a string, choose an array capacity, and toggle the terminator on and off. Watch
  what <code>strlen</code> counts and where <code>printf("%s", str)</code> stops. This is the whole reading in
  one picture.</div>

  <div class="card">
    <div class="toolbar">
      <label class="muted">Characters written:</label>
      <input type="text" id="sl-text" value="hi" maxlength="9" style="width:140px" oninput="renderStrip()">
      <label class="muted">Array capacity:</label>
      <select id="sl-cap" onchange="renderStrip()">
        <option>2</option><option>3</option><option>4</option><option>5</option>
        <option>6</option><option selected>10</option>
      </select>
      <label class="muted" style="display:flex;align-items:center;gap:6px">
        <input type="checkbox" id="sl-nul" checked onchange="renderStrip()" style="width:auto"> write the <code>'\\0'</code>
      </label>
    </div>

    <div id="sl-decl" class="muted" style="font-family:'SF Mono',monospace;margin:8px 0"></div>
    <div class="strip" id="sl-strip"></div>
    <div class="legend">
      <span class="l-chr">characters you wrote</span>
      <span class="l-nul">the '\\0' terminator</span>
      <span class="l-junk">uninitialized / past the end</span>
    </div>
    <div class="step-desc" id="sl-out"></div>
    <div class="toolbar">
      <button class="btn small ghost" onclick="slPreset('hi',10,true)">char s[10] = "hi"</button>
      <button class="btn small ghost" onclick="slPreset('hi',2,false)">the broken str[2] example</button>
      <button class="btn small ghost" onclick="slPreset('hello',6,true)">char s[6] = "hello"</button>
      <button class="btn small ghost" onclick="slPreset('hello',5,true)">"hello" in only 5 slots</button>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Predict before you click</h3>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Set the lab to <code>"hi"</code>, capacity 2, terminator <b>off</b>. What does <code>printf("%s", str)</code> do?</div>
      <button class="opt" data-i="0">Prints exactly <code>hi</code> and stops — the array is full</button>
      <button class="opt" data-i="1">Prints <code>hi</code> and then keeps reading past the array until it happens to find a zero byte</button>
      <button class="opt" data-i="2">Prints nothing</button>
      <button class="opt" data-i="3">The compiler refuses to build it</button>
      <div class="fb"><code>printf</code> only stops at <code>'\\0'</code>. With no terminator it runs off the end of
      the array into whatever bytes follow — <b>undefined behavior</b>. It may print garbage, print nothing,
      or crash, and the compiler will happily build it.</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     TOPIC 2 — I/O REDIRECTION
     =================================================================== -->
<section class="topic" id="r02-redirect">
  <h2>Reading 02 &middot; Part 2 — I/O Redirection</h2>

  <div class="concept">Every Unix process starts life with <b>three</b> open file streams:
  <b>stdin</b>, <b>stdout</b>, and <b>stderr</b>. By default stdin comes from the <b>keyboard</b> and
  stdout + stderr go to the <b>terminal</b>. Redirection just re-points those streams at files.</div>

  <h3>The three streams and their file descriptors</h3>
  <div class="card">
    <p>A <b>file descriptor</b> is a small integer the OS uses to refer to an open file. (Unix treats a great
    many non-file things — devices, terminals, pipes — as files, so this one abstraction covers everything.)
    The three standard streams always get the same three numbers:</p>
    <table class="cmp">
      <tr><th>Stream</th><th>File descriptor</th><th>Default source / destination</th><th>Carries</th></tr>
      <tr><td><code>stdin</code></td><td><b>0</b></td><td>the keyboard</td><td>input to the program</td></tr>
      <tr><td><code>stdout</code></td><td><b>1</b></td><td>the terminal</td><td>normal output</td></tr>
      <tr><td><code>stderr</code></td><td><b>2</b></td><td>the terminal</td><td>error messages</td></tr>
    </table>
    <p class="muted">Memorize <b>0, 1, 2</b> in that order — the operators below are literally these numbers.
    <code>stdout</code> and <code>stderr</code> both land on your screen by default, which is exactly why you
    need two separate descriptors to pull them apart.</p>
  </div>

  <h3>The operators</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Operator</th><th>Redirects</th><th>Behavior</th><th>Example</th></tr>
      <tr><td><code>&lt;</code></td><td>stdin (0)</td><td>read input from a file instead of the keyboard</td><td><code>wc &lt; quote</code></td></tr>
      <tr><td><code>&gt;</code></td><td>stdout (1)</td><td><b>overwrites</b> / creates the file</td><td><code>cat quote &gt; another</code></td></tr>
      <tr><td><code>1&gt;</code></td><td>stdout (1)</td><td>identical to <code>&gt;</code> — the <code>1</code> is just explicit</td><td><code>cat quote 1&gt; yetanother</code></td></tr>
      <tr><td><code>&gt;&gt;</code></td><td>stdout (1)</td><td><b>appends</b> to the file</td><td><code>echo "Again:" &gt;&gt; another</code></td></tr>
      <tr><td><code>2&gt;</code></td><td>stderr (2)</td><td>error messages to a file</td><td><code>cat blah 2&gt; error_out</code></td></tr>
      <tr><td><code>&amp;&gt;</code></td><td>stdout <b>and</b> stderr</td><td>both streams to one file</td><td><code>cat blah quote &amp;&gt; err_out</code></td></tr>
    </table>
    <div class="warn"><b>&gt; destroys.</b> <code>&gt;</code> truncates the destination to empty before writing, so
    <code>cat quote &gt; another</code> replaces whatever <code>another</code> held. Use <code>&gt;&gt;</code> when you
    mean "add to the end."</div>
    <p class="muted">You can redirect all three at once:
    <code>grep teach &lt; another 1&gt; grep_out 2&gt; grep_error</code> — input from <code>another</code>, matches to
    <code>grep_out</code>, errors to <code>grep_error</code>, and nothing at all on your terminal.</p>
  </div>

  <h3>Quick checks</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You run <code>cat quote &gt; out</code> twice, then <code>cat quote &gt;&gt; out</code> once. How many copies of the quote are in <code>out</code>?</div>
      <button class="opt" data-i="0">Three</button>
      <button class="opt" data-i="1">Two</button>
      <button class="opt" data-i="2">One</button>
      <button class="opt" data-i="3">None — the file was truncated last</button>
      <div class="fb"><b>Two.</b> The second <code>&gt;</code> wipes the file and writes one copy; the
      <code>&gt;&gt;</code> then appends a second. Every <code>&gt;</code> throws away what came before it.</div>
    </div>
    <div class="q" data-mc="2" style="margin-top:16px">
      <div class="prompt"><span class="tag">Multiple choice</span><code>cat blah &gt; out</code> where <code>blah</code> does not exist. What ends up on your screen?</div>
      <button class="opt" data-i="0">Nothing — everything went to <code>out</code></button>
      <button class="opt" data-i="1">The file contents</button>
      <button class="opt" data-i="2">The error message, because <code>&gt;</code> only redirects stdout</button>
      <button class="opt" data-i="3">A shell syntax error</button>
      <div class="fb"><code>&gt;</code> moves <b>fd 1 only</b>. The "No such file" complaint travels on <b>fd 2</b>,
      which is still pointed at the terminal. Use <code>2&gt;</code> to capture it, or <code>&amp;&gt;</code> for both.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match each operator to what it redirects</h3>
    <table class="match" id="match-redir">
      <tr><td class="match-term"><code>&lt;</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="in">stdin from a file</option><option value="out">stdout, overwriting</option><option value="app">stdout, appending</option><option value="err">stderr to a file</option><option value="both">stdout AND stderr</option></select></td></tr>
      <tr><td class="match-term"><code>&gt;</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="in">stdin from a file</option><option value="out">stdout, overwriting</option><option value="app">stdout, appending</option><option value="err">stderr to a file</option><option value="both">stdout AND stderr</option></select></td></tr>
      <tr><td class="match-term"><code>1&gt;</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="in">stdin from a file</option><option value="out">stdout, overwriting</option><option value="app">stdout, appending</option><option value="err">stderr to a file</option><option value="both">stdout AND stderr</option></select></td></tr>
      <tr><td class="match-term"><code>&gt;&gt;</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="in">stdin from a file</option><option value="out">stdout, overwriting</option><option value="app">stdout, appending</option><option value="err">stderr to a file</option><option value="both">stdout AND stderr</option></select></td></tr>
      <tr><td class="match-term"><code>2&gt;</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="in">stdin from a file</option><option value="out">stdout, overwriting</option><option value="app">stdout, appending</option><option value="err">stderr to a file</option><option value="both">stdout AND stderr</option></select></td></tr>
      <tr><td class="match-term"><code>&amp;&gt;</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="in">stdin from a file</option><option value="out">stdout, overwriting</option><option value="app">stdout, appending</option><option value="err">stderr to a file</option><option value="both">stdout AND stderr</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-redir','fb-match-redir',['in','out','out','app','err','both'])">Check</button>
    <div class="fb" id="fb-match-redir"></div>
  </div>
</section>

<!-- ===================================================================
     REDIRECTION LAB
     =================================================================== -->
<section class="topic" id="r02-fdlab">
  <h2>Redirection Lab</h2>
  <div class="concept">Build a command from the parts below and watch where each of the three file
  descriptors ends up. Anything still pointing at <b>the terminal</b> is what you will actually see.</div>

  <div class="card">
    <div class="toolbar">
      <label class="muted">Command:</label>
      <select id="fd-cmd" onchange="renderFD()">
        <option value="cat quote">cat quote</option>
        <option value="wc">wc</option>
        <option value="grep teach">grep teach</option>
        <option value="cat blah">cat blah &nbsp;(file missing &rarr; error)</option>
        <option value="sort quote">sort quote</option>
      </select>
      <label class="muted">stdin:</label>
      <select id="fd-in" onchange="renderFD()">
        <option value="">keyboard (default)</option>
        <option value="&lt; quote">&lt; quote</option>
        <option value="&lt; another">&lt; another</option>
      </select>
      <label class="muted">stdout:</label>
      <select id="fd-out" onchange="renderFD()">
        <option value="">terminal (default)</option>
        <option value="&gt; another">&gt; another &nbsp;(overwrite)</option>
        <option value="&gt;&gt; another">&gt;&gt; another &nbsp;(append)</option>
        <option value="1&gt; out.txt">1&gt; out.txt</option>
      </select>
      <label class="muted">stderr:</label>
      <select id="fd-err" onchange="renderFD()">
        <option value="">terminal (default)</option>
        <option value="2&gt; error_out">2&gt; error_out</option>
      </select>
      <label class="muted" style="display:flex;align-items:center;gap:6px">
        <input type="checkbox" id="fd-both" onchange="renderFD()" style="width:auto"> use <code>&amp;&gt; err_out</code> for both
      </label>
    </div>

    <h4>Resulting command</h4>
    <pre id="fd-cmdline" style="margin-top:4px"></pre>

    <div class="fdbox">
      <div class="fdrow"><div class="fdtag fd0">stdin &middot; fd 0</div><div class="arrow">&larr;&larr;&larr;</div><div class="dest" id="fd-d0"></div></div>
      <div class="fdrow"><div class="fdtag fd1">stdout &middot; fd 1</div><div class="arrow">&rarr;&rarr;&rarr;</div><div class="dest" id="fd-d1"></div></div>
      <div class="fdrow"><div class="fdtag fd2">stderr &middot; fd 2</div><div class="arrow">&rarr;&rarr;&rarr;</div><div class="dest" id="fd-d2"></div></div>
    </div>
    <div class="step-desc" id="fd-note"></div>
  </div>
</section>

<!-- ===================================================================
     TOPIC 3 — PIPES
     =================================================================== -->
<section class="topic" id="r02-pipes">
  <h2>Reading 02 &middot; Part 3 — Pipes</h2>

  <div class="concept">A <b>pipe (<code>|</code>)</b> redirects the <b>stdout</b> of the command before it into
  the <b>stdin</b> of the command after it. Redirection connects a program to a <i>file</i>; a pipe connects
  a program to <i>another program</i>, with no file in between.</div>

  <div class="card">
<pre>$ cmd1 | cmd2            <span class="cm"># cmd1's stdout becomes cmd2's stdin</span>
$ cmd1 | cmd2 | ... | cmdN   <span class="cm"># chain as many as you like</span></pre>
    <p class="muted">Only <b>stdout</b> travels through the pipe. <code>stderr</code> is untouched, so errors
    from <code>cmd1</code> still appear on your terminal rather than flowing into <code>cmd2</code>.</p>
  </div>

  <h3>Worked examples from the reading</h3>
  <div class="card">
<pre>$ cat quote | grep th        <span class="cm"># only the lines containing "th"</span>
to think intensively and to think critically.
Intelligence plus character - that is the

$ cat quote | wc             <span class="cm"># lines, words, characters of the quote</span>
  4      26     160

$ cat quote | grep th | wc   <span class="cm"># two pipes: filter, then count</span>
  2      14      93</pre>
    <p class="muted" style="margin-top:10px">Read left to right: <code>cat</code> emits the file,
    <code>grep</code> keeps the matching lines, <code>wc</code> counts what survives.</p>
  </div>

  <h3>Pipeline stepper</h3>
  <div class="card">
    <p class="muted">Step through <code>cat quote | grep th | wc</code> and watch what each stage receives
    and emits.</p>
    <div class="toolbar">
      <button class="btn small ghost" onclick="stepPipe(-1)">&larr; Back</button>
      <button class="btn small ghost" onclick="stepPipe(1)">Next &rarr;</button>
      <button class="btn small ghost" onclick="resetPipe()">Reset</button>
      <span class="muted" id="pipe-count"></span>
    </div>
    <pre id="pipe-stage" style="min-height:120px"></pre>
    <div class="step-desc" id="pipe-desc"></div>
  </div>

  <h3><code>xargs</code>: the pipe that is not quite a pipe</h3>
  <div class="card">
    <p>A plain pipe hands the previous command's output to the next command <b>as input data</b>.
    <code>xargs</code> instead turns that output into <b>command-line arguments</b>.</p>
<pre>$ ls | wc            <span class="cm"># counts the lines/words/chars of ls's OUTPUT</span>
  2       2      14

$ ls | xargs wc      <span class="cm"># runs wc ON each file that ls named</span>
  9  53 327 another
  4  26 160 quote
 13  79 487 total</pre>
    <div class="q" data-mc="1" style="margin-top:12px">
      <div class="prompt"><span class="tag">Multiple choice</span>Why do those two commands give completely different numbers?</div>
      <button class="opt" data-i="0"><code>xargs</code> counts differently than <code>wc</code></button>
      <button class="opt" data-i="1"><code>wc</code> counts the text of the file <i>listing</i>; <code>xargs wc</code> counts the contents of the files themselves</button>
      <button class="opt" data-i="2"><code>xargs</code> follows subdirectories</button>
      <button class="opt" data-i="3">The pipe buffers differently</button>
      <div class="fb">With a plain pipe, <code>wc</code>'s <b>stdin</b> is the two-line text
      "another\\nquote\\n" — so it reports 2 lines. With <code>xargs</code>, the shell effectively runs
      <code>wc another quote</code>, so <code>wc</code> opens and counts each file.</div>
    </div>
  </div>

  <h3>Redirection vs pipe</h3>
  <div class="card">
    <table class="cmp">
      <tr><th></th><th><code>cmd &gt; file</code></th><th><code>cmd1 | cmd2</code></th></tr>
      <tr><td>Destination of stdout</td><td>a file on disk</td><td>another process's stdin</td></tr>
      <tr><td>Streams involved</td><td>fd 1 only</td><td>cmd1's fd 1 &rarr; cmd2's fd 0</td></tr>
      <tr><td>Leaves a file behind</td><td>yes</td><td>no</td></tr>
      <tr><td>Chainable</td><td>no (one destination)</td><td>yes, arbitrarily</td></tr>
    </table>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A pipe sends both stdout and stderr to the next command.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">A plain <code>|</code> carries <b>stdout only</b>. Errors from the left-hand command still
      surface on your terminal. (Bash offers <code>|&amp;</code> to include stderr, but that is not what the
      bare pipe does.)</div>
    </div>
  </div>
</section>

<!-- ===================================================================
     ASSIGNMENT Q&A — every question from Reading Assignment 02
     =================================================================== -->
<section class="topic" id="r02-quiz">
  <h2>Reading Assignment 02 &middot; every question, graded</h2>
  <p class="muted">These are the exact questions from Q1.1, Q2.1 and Q3.1. Answer them cold, then read the
  explanation — the explanation is where the learning is.</p>

  <h3>Q1.1 &middot; Strings (DiS 16.5)</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>How are strings implemented in C?</div>
      <button class="opt" data-i="0">As a built-in <code>String</code> type</button>
      <button class="opt" data-i="1">As arrays of <code>char</code> values</button>
      <button class="opt" data-i="2">As objects that store length automatically</button>
      <button class="opt" data-i="3">As arrays of integers</button>
      <div class="fb"><b>As arrays of <code>char</code> values.</b> C defines no string type; the
      <code>String</code> class and automatic length are Java's model.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>Which statement is true?</div>
      <button class="opt" data-i="0">Every <code>char</code> array is a C string</button>
      <button class="opt" data-i="1">Every C string is a <code>char</code> array</button>
      <button class="opt" data-i="2">C strings are not arrays</button>
      <button class="opt" data-i="3">Java strings are <code>char</code> arrays</button>
      <div class="fb"><b>Every C string is a <code>char</code> array</b> — but not the reverse. An array with no
      <code>'\\0'</code> in it is not a string.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>What special character marks the end of a C string?</div>
      <button class="opt" data-i="0"><code>'\\n'</code></button>
      <button class="opt" data-i="1"><code>'\\t'</code></button>
      <button class="opt" data-i="2"><code>'\\0'</code></button>
      <button class="opt" data-i="3"><code>' '</code></button>
      <div class="fb"><b><code>'\\0'</code></b>, the null character (byte value 0). <code>'\\n'</code> is a newline
      and <code>'\\t'</code> a tab — both are ordinary characters that can appear <i>inside</i> a string.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q4</span>A C string is described as "null-terminated" because:</div>
      <button class="opt" data-i="0">It begins with <code>'\\0'</code></button>
      <button class="opt" data-i="1">It ends with <code>'\\0'</code></button>
      <button class="opt" data-i="2">It contains no spaces</button>
      <button class="opt" data-i="3">It has a length of 0</button>
      <div class="fb"><b>It ends with <code>'\\0'</code>.</b> "Terminated" = the terminator sits at the end.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q5</span>What is the main reason C string functions require null-terminated arrays?</div>
      <button class="opt" data-i="0">To reduce memory usage</button>
      <button class="opt" data-i="1">To support Unicode</button>
      <button class="opt" data-i="2">To detect the end of the string</button>
      <button class="opt" data-i="3">To allow dynamic resizing</button>
      <div class="fb"><b>To detect the end of the string.</b> No length is stored anywhere, so functions scan
      for the terminator. That is also why <code>strlen</code> is O(n) in C but O(1) in Java.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q6</span>To store the string <code>"hi"</code> in C, what is the minimum array capacity needed?</div>
      <button class="opt" data-i="0">2</button>
      <button class="opt" data-i="1">3</button>
      <button class="opt" data-i="2">4</button>
      <button class="opt" data-i="3">5</button>
      <div class="fb"><b>3</b> — <code>'h'</code>, <code>'i'</code>, <code>'\\0'</code>. Always characters + 1.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span>What is the minimum array size needed to store the string <code>"hello"</code>?</div>
      <button class="opt" data-i="0">5</button>
      <button class="opt" data-i="1">6</button>
      <button class="opt" data-i="2">7</button>
      <button class="opt" data-i="3">10</button>
      <div class="fb"><b>6</b> — 5 characters + the terminator. (10 works too, but the question asks for the
      <i>minimum</i>.)</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q8</span>When printing a C string with <code>printf</code>, which placeholder should be used?</div>
      <button class="opt" data-i="0"><code>%c</code></button>
      <button class="opt" data-i="1"><code>%d</code></button>
      <button class="opt" data-i="2"><code>%s</code></button>
      <button class="opt" data-i="3"><code>%g</code></button>
      <div class="fb"><b><code>%s</code></b> for a string. <code>%c</code> is a single character,
      <code>%d</code> a decimal integer, <code>%g</code> a floating-point value.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q9</span>How does <code>printf("%s", str)</code> stop printing at the correct point?</div>
      <button class="opt" data-i="0">It prints exactly the array capacity</button>
      <button class="opt" data-i="1">It prints until it reaches the <code>'\\0'</code> character</button>
      <button class="opt" data-i="2">It prints until a space is found</button>
      <button class="opt" data-i="3">It prints only the first character</button>
      <div class="fb"><b>It prints until it reaches <code>'\\0'</code>.</b> <code>printf</code> receives only a
      pointer to the first character — it cannot know the array's capacity.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q10</span>What is the problem with this code?
        <pre style="margin-top:8px"><span class="ty">char</span> str[<span class="nm">2</span>];
str[<span class="nm">0</span>] = <span class="st">'h'</span>;
str[<span class="nm">1</span>] = <span class="st">'i'</span>;
<span class="fn">printf</span>(<span class="st">"%s"</span>, str);</pre></div>
      <button class="opt" data-i="0">Incorrect format specifier for a string</button>
      <button class="opt" data-i="1">Array is too large</button>
      <button class="opt" data-i="2">String is not null-terminated</button>
      <button class="opt" data-i="3"><code>printf</code> cannot print arrays</button>
      <div class="fb"><b>String is not null-terminated.</b> Both slots hold real characters, leaving no room
      for <code>'\\0'</code>, so <code>printf</code> reads past the end of the array — undefined behavior.
      The fix is <code>char str[3];</code> with <code>str[2] = '\\0';</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q11</span>What does <code>strlen(str)</code> return?</div>
      <button class="opt" data-i="0">The array capacity of <code>str</code></button>
      <button class="opt" data-i="1">The number of characters before <code>'\\0'</code></button>
      <button class="opt" data-i="2">The number of bytes including <code>'\\0'</code></button>
      <button class="opt" data-i="3">The index of the last character</button>
      <div class="fb"><b>The number of characters before <code>'\\0'</code>.</b> The terminator itself is not
      counted, and the array's capacity is irrelevant.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q12</span>What does this code print?
        <pre style="margin-top:8px"><span class="ty">char</span> str[<span class="nm">10</span>] = {<span class="st">'h'</span>, <span class="st">'i'</span>, <span class="st">'\\0'</span>};
<span class="fn">printf</span>(<span class="st">"%d"</span>, <span class="fn">strlen</span>(str));</pre></div>
      <button class="opt" data-i="0">0</button>
      <button class="opt" data-i="1">2</button>
      <button class="opt" data-i="2">3</button>
      <button class="opt" data-i="3">10</button>
      <div class="fb"><b>2.</b> Two characters precede the terminator. 3 would be the bytes <i>including</i>
      <code>'\\0'</code>; 10 is the capacity.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q13</span>What is the value of <code>len</code> after this code executes?
        <pre style="margin-top:8px"><span class="ty">char</span> str[<span class="nm">10</span>] = <span class="st">"hello"</span>;
<span class="ty">int</span> len = <span class="fn">strlen</span>(str);</pre></div>
      <button class="opt" data-i="0">4</button>
      <button class="opt" data-i="1">5</button>
      <button class="opt" data-i="2">6</button>
      <button class="opt" data-i="3">10</button>
      <div class="fb"><b>5.</b> The literal <code>"hello"</code> silently adds <code>'\\0'</code> as the 6th byte,
      but <code>strlen</code> counts only the 5 characters ahead of it.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q14</span>Why can <code>strcpy</code> be dangerous?</div>
      <button class="opt" data-i="0">It cannot copy strings with spaces</button>
      <button class="opt" data-i="1">It assumes the destination has enough capacity, which can cause undefined behavior</button>
      <button class="opt" data-i="2">It stops before copying the null terminator</button>
      <button class="opt" data-i="3">It only works for integer arrays</button>
      <div class="fb"><b>It assumes the destination has enough capacity.</b> <code>strcpy</code> takes no size
      argument, so it cannot check — this is the classic buffer-overflow vector.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q15</span>What happens if a string passed to <code>strcpy</code> is NOT null-terminated?</div>
      <button class="opt" data-i="0">The compiler reports an error</button>
      <button class="opt" data-i="1">The function stops at the array boundary</button>
      <button class="opt" data-i="2">Undefined behavior may occur</button>
      <button class="opt" data-i="3">The string is automatically fixed</button>
      <div class="fb"><b>Undefined behavior may occur.</b> Nothing checks bounds at compile time or run time;
      the copy keeps going through whatever memory follows until it stumbles on a zero byte.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q16</span>Why is string handling considered safer in Java than in C?</div>
      <button class="opt" data-i="0">Java strings use fewer bytes</button>
      <button class="opt" data-i="1">Java strings are faster</button>
      <button class="opt" data-i="2">Java hides memory and termination details</button>
      <button class="opt" data-i="3">Java allows direct memory access</button>
      <div class="fb"><b>Java hides memory and termination details.</b> The <code>String</code> class stores its
      own length and checks bounds, so the programmer never manages a terminator. (Java in fact uses
      <i>more</i> memory, and direct memory access is a C feature, not a Java one.)</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q17</span>Who is responsible for ensuring C strings are valid and safe to use?</div>
      <button class="opt" data-i="0">The compiler</button>
      <button class="opt" data-i="1">The operating system</button>
      <button class="opt" data-i="2">The C standard library</button>
      <button class="opt" data-i="3">The programmer</button>
      <div class="fb"><b>The programmer.</b> That is the through-line of the whole section: the library
      <i>trusts</i> you about capacity and termination, and the compiler will not stop you.</div>
    </div>
  </div>

  <h3>Q2.1 &middot; I/O Redirection (DiS 17.12)</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q1</span>When a Unix process starts, how many open file streams does it begin with by default?</div>
      <button class="opt" data-i="0">1</button>
      <button class="opt" data-i="1">2</button>
      <button class="opt" data-i="2">3</button>
      <button class="opt" data-i="3">4</button>
      <div class="fb"><b>3</b> — <code>stdin</code>, <code>stdout</code>, <code>stderr</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>By default, <code>stdin</code> reads from:</div>
      <button class="opt" data-i="0">the network</button>
      <button class="opt" data-i="1">the keyboard</button>
      <button class="opt" data-i="2">a file named stdin</button>
      <button class="opt" data-i="3">the printer</button>
      <div class="fb"><b>The keyboard.</b> "stdin" is a stream, not a file on disk.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q3</span>By default, <code>stdout</code> and <code>stderr</code> write to:</div>
      <button class="opt" data-i="0">the terminal</button>
      <button class="opt" data-i="1">a file named output.txt</button>
      <button class="opt" data-i="2">the keyboard</button>
      <button class="opt" data-i="3">RAM only</button>
      <div class="fb"><b>The terminal</b> — both of them, which is exactly why they look like one stream until
      you redirect one of them away.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q4</span>A file descriptor is:</div>
      <button class="opt" data-i="0">a file name stored as text</button>
      <button class="opt" data-i="1">a positive integer referring to an open file</button>
      <button class="opt" data-i="2">a type of directory listing</button>
      <button class="opt" data-i="3">a disk partition number</button>
      <div class="fb"><b>A positive integer referring to an open file.</b> Unix models terminals, devices and
      pipes as files too, so one small integer names any of them.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>What are the standard file descriptor numbers for <code>stdin</code>, <code>stdout</code>, and <code>stderr</code> (respectively)?</div>
      <button class="opt" data-i="0">1, 2, 3</button>
      <button class="opt" data-i="1">0, 1, 2</button>
      <button class="opt" data-i="2">2, 1, 0</button>
      <button class="opt" data-i="3">3, 4, 5</button>
      <div class="fb"><b>0, 1, 2.</b> Counting starts at zero — and this is why the stderr operator is
      <code>2&gt;</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q6</span>Which operator redirects stdin?</div>
      <button class="opt" data-i="0"><code>&gt;</code></button>
      <button class="opt" data-i="1"><code>&lt;</code></button>
      <button class="opt" data-i="2"><code>2&gt;</code></button>
      <button class="opt" data-i="3"><code>&gt;&gt;</code></button>
      <div class="fb"><b><code>&lt;</code></b> — the arrow points <i>into</i> the command.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q7</span>Which operator redirects <code>stdout</code> (overwriting the destination file)?</div>
      <button class="opt" data-i="0"><code>&lt;</code></button>
      <button class="opt" data-i="1"><code>2&gt;</code></button>
      <button class="opt" data-i="2"><code>&gt;</code></button>
      <button class="opt" data-i="3"><code>&gt;&gt;</code></button>
      <div class="fb"><b><code>&gt;</code></b> overwrites (and creates the file if it does not exist).
      <code>&gt;&gt;</code> would append instead.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q8</span>What is the difference between <code>&gt;</code> and <code>&gt;&gt;</code> when redirecting <code>stdout</code>?</div>
      <button class="opt" data-i="0"><code>&gt;</code> appends; <code>&gt;&gt;</code> overwrites</button>
      <button class="opt" data-i="1"><code>&gt;</code> overwrites; <code>&gt;&gt;</code> appends</button>
      <button class="opt" data-i="2"><code>&gt;</code> redirects stderr; <code>&gt;&gt;</code> redirects stdout</button>
      <button class="opt" data-i="3">No difference</button>
      <div class="fb"><b><code>&gt;</code> overwrites; <code>&gt;&gt;</code> appends.</b> Mnemonic: the doubled arrow
      keeps what was already there.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q9</span>Which operator redirects <code>stderr</code> to a file?</div>
      <button class="opt" data-i="0"><code>1&gt;</code></button>
      <button class="opt" data-i="1"><code>&lt;</code></button>
      <button class="opt" data-i="2"><code>2&gt;</code></button>
      <button class="opt" data-i="3"><code>&amp;&gt;</code></button>
      <div class="fb"><b><code>2&gt;</code></b>, because stderr is fd 2. <code>&amp;&gt;</code> sends
      <i>both</i> stdout and stderr, which is more than the question asked for.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q10</span>The redirection <code>1&gt;</code> is equivalent to:</div>
      <button class="opt" data-i="0">redirect <code>stdin</code></button>
      <button class="opt" data-i="1">redirect <code>stdout</code></button>
      <button class="opt" data-i="2">redirect <code>stderr</code></button>
      <button class="opt" data-i="3">append <code>stdout</code></button>
      <div class="fb"><b>Redirect <code>stdout</code></b> — <code>1&gt;</code> is just <code>&gt;</code> with the
      descriptor spelled out. It still overwrites, so it is not the same as appending.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q11</span>What does <code>wc &lt; quote</code> do?</div>
      <button class="opt" data-i="0">Runs <code>wc</code> and writes output into <code>quote</code></button>
      <button class="opt" data-i="1">Runs <code>wc</code> using <code>quote</code> as <code>stdin</code></button>
      <button class="opt" data-i="2">Counts words in the terminal input only</button>
      <button class="opt" data-i="3">Redirects <code>stderr</code> to <code>quote</code></button>
      <div class="fb"><b>Runs <code>wc</code> using <code>quote</code> as stdin.</b> Without the redirect,
      <code>wc</code> with no arguments would sit waiting for you to type.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q12</span>What does <code>cat quote &gt; another</code> do?</div>
      <button class="opt" data-i="0">Appends <code>quote</code> to <code>another</code></button>
      <button class="opt" data-i="1">Copies the output of <code>cat quote</code> into <code>another</code>, overwriting <code>another</code></button>
      <button class="opt" data-i="2">Redirects <code>stderr</code> to <code>another</code></button>
      <button class="opt" data-i="3">Sends <code>another</code> into <code>cat</code> as input</button>
      <div class="fb"><b>Copies it in, overwriting.</b> Whatever <code>another</code> contained is gone —
      <code>&gt;&gt;</code> is the appending version.</div>
    </div>
  </div>

  <h3>Q3.1 &middot; Pipes (DiS 17.13)</h3>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What is the primary purpose of a pipe (<code>|</code>) in the Unix shell?</div>
      <button class="opt" data-i="0">To redirect <code>stderr</code> to a file</button>
      <button class="opt" data-i="1">To connect the <code>stdout</code> of one command to the <code>stdin</code> of another</button>
      <button class="opt" data-i="2">To execute commands in parallel</button>
      <button class="opt" data-i="3">To append output to a file</button>
      <div class="fb"><b>To connect stdout to stdin.</b> (Piped commands do run concurrently, but that is a
      side effect of the plumbing, not its purpose.)</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>In <code>cmd1 | cmd2</code>, what does the pipe do?</div>
      <button class="opt" data-i="0">Redirects <code>cmd2</code>'s output to <code>cmd1</code></button>
      <button class="opt" data-i="1">Redirects <code>cmd1</code>'s stdin to <code>cmd2</code></button>
      <button class="opt" data-i="2">Sends <code>cmd1</code>'s stdout to <code>cmd2</code>'s stdin</button>
      <button class="opt" data-i="3">Sends both <code>stdout</code> and <code>stderr</code> of <code>cmd1</code> to <code>cmd2</code></button>
      <div class="fb"><b>Sends cmd1's stdout to cmd2's stdin.</b> Data flows left to right, and stderr is not
      part of it.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q3</span>Which stream is redirected by a pipe?</div>
      <button class="opt" data-i="0"><code>stdin</code> only</button>
      <button class="opt" data-i="1"><code>stdout</code> only</button>
      <button class="opt" data-i="2"><code>stderr</code> only</button>
      <button class="opt" data-i="3"><code>stdout</code> to <code>stdin</code></button>
      <div class="fb"><b><code>stdout</code> to <code>stdin</code>.</b> Two streams are involved — the left
      command's stdout and the right command's stdin — so "stdout only" describes just half the connection.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>What does <code>cat quote | grep th</code> do?</div>
      <button class="opt" data-i="0">Prints all lines from <code>quote</code></button>
      <button class="opt" data-i="1">Prints the number of lines in <code>quote</code></button>
      <button class="opt" data-i="2">Prints only lines from <code>quote</code> that contain <code>th</code></button>
      <button class="opt" data-i="3">Appends <code>th</code> to <code>quote</code></button>
      <div class="fb"><b>Prints only the lines containing <code>th</code>.</b> <code>cat</code> emits the file,
      the pipe feeds it to <code>grep</code>, and <code>grep</code> passes through only matching lines.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Answer key at a glance</h3>
    <div class="two">
      <div>
        <h4>Q1.1 — Strings</h4>
        <ol class="muted" style="line-height:1.8;font-size:13px">
          <li>arrays of <code>char</code> values</li>
          <li>Every C string is a <code>char</code> array</li>
          <li><code>'\\0'</code></li>
          <li>It ends with <code>'\\0'</code></li>
          <li>To detect the end of the string</li>
          <li>3</li>
          <li>6</li>
          <li><code>%s</code></li>
          <li>Prints until <code>'\\0'</code></li>
          <li>String is not null-terminated</li>
          <li>Number of characters before <code>'\\0'</code></li>
          <li>2</li>
          <li>5</li>
          <li>Assumes the destination has enough capacity</li>
          <li>Undefined behavior may occur</li>
          <li>Java hides memory and termination details</li>
          <li>The programmer</li>
        </ol>
      </div>
      <div>
        <h4>Q2.1 — Redirection</h4>
        <ol class="muted" style="line-height:1.8;font-size:13px">
          <li>3</li>
          <li>the keyboard</li>
          <li>the terminal</li>
          <li>a positive integer referring to an open file</li>
          <li>0, 1, 2</li>
          <li><code>&lt;</code></li>
          <li><code>&gt;</code></li>
          <li><code>&gt;</code> overwrites; <code>&gt;&gt;</code> appends</li>
          <li><code>2&gt;</code></li>
          <li>redirect <code>stdout</code></li>
          <li>Runs <code>wc</code> using <code>quote</code> as stdin</li>
          <li>Copies into <code>another</code>, overwriting it</li>
        </ol>
        <h4>Q3.1 — Pipes</h4>
        <ol class="muted" style="line-height:1.8;font-size:13px">
          <li>Connect stdout of one to stdin of another</li>
          <li>Sends <code>cmd1</code>'s stdout to <code>cmd2</code>'s stdin</li>
          <li><code>stdout</code> to <code>stdin</code></li>
          <li>Prints only lines containing <code>th</code></li>
        </ol>
      </div>
    </div>
  </div>
</section>

<!-- ===================================================================
     CODE WRITING
     =================================================================== -->
<section class="topic" id="r02-code">
  <h2>Write it yourself</h2>
  <p class="muted">Type your answer first, then reveal. Struggling for thirty seconds before looking is worth
  more than reading the solution twice.</p>

  <div class="card">
    <h3 style="margin-top:0">1 &middot; Implement <code>my_strlen</code></h3>
    <p>Write a function that returns the number of characters in a C string, without calling
    <code>strlen</code>.</p>
    <textarea placeholder="int my_strlen(char *s) { ... }"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="ty">int</span> <span class="fn">my_strlen</span>(<span class="ty">char</span> *s) {
    <span class="ty">int</span> n = <span class="nm">0</span>;
    <span class="kw">while</span> (s[n] != <span class="st">'\\0'</span>) {   <span class="cm">// walk until the terminator</span>
        n++;
    }
    <span class="kw">return</span> n;                <span class="cm">// the '\\0' itself is not counted</span>
}</pre>
      <p class="muted">This is why <code>strlen</code> is O(n): the length is not stored anywhere, it is
      discovered by scanning. And if <code>s</code> has no terminator, this loop runs off the end forever.</p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">2 &middot; Fix the broken string</h3>
    <p>This program is wrong. Rewrite it so it correctly prints <code>hi</code>.</p>
<pre><span class="ty">char</span> str[<span class="nm">2</span>];
str[<span class="nm">0</span>] = <span class="st">'h'</span>;
str[<span class="nm">1</span>] = <span class="st">'i'</span>;
<span class="fn">printf</span>(<span class="st">"%s"</span>, str);</pre>
    <textarea placeholder="your fixed version"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="ty">char</span> str[<span class="nm">3</span>];        <span class="cm">// 2 chars + 1 for the terminator</span>
str[<span class="nm">0</span>] = <span class="st">'h'</span>;
str[<span class="nm">1</span>] = <span class="st">'i'</span>;
str[<span class="nm">2</span>] = <span class="st">'\\0'</span>;    <span class="cm">// now it is a string, not just a char array</span>
<span class="fn">printf</span>(<span class="st">"%s"</span>, str);

<span class="cm">// or let the compiler do it for you:</span>
<span class="ty">char</span> str[] = <span class="st">"hi"</span>;   <span class="cm">// sized 3 automatically, terminator included</span></pre>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">3 &middot; Safer than <code>strcpy</code></h3>
    <p>Write <code>safe_copy(char *dst, int dst_cap, char *src)</code> that copies <code>src</code> into
    <code>dst</code> without ever writing past <code>dst_cap</code> bytes, and always leaves <code>dst</code>
    null-terminated.</p>
    <textarea placeholder="void safe_copy(char *dst, int dst_cap, char *src) { ... }"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre><span class="ty">void</span> <span class="fn">safe_copy</span>(<span class="ty">char</span> *dst, <span class="ty">int</span> dst_cap, <span class="ty">char</span> *src) {
    <span class="kw">if</span> (dst_cap &lt;= <span class="nm">0</span>) <span class="kw">return</span>;
    <span class="ty">int</span> i = <span class="nm">0</span>;
    <span class="cm">// leave one slot free for the terminator</span>
    <span class="kw">while</span> (src[i] != <span class="st">'\\0'</span> &amp;&amp; i &lt; dst_cap - <span class="nm">1</span>) {
        dst[i] = src[i];
        i++;
    }
    dst[i] = <span class="st">'\\0'</span>;   <span class="cm">// ALWAYS terminate, even when truncating</span>
}</pre>
      <p class="muted">The capacity argument is the whole difference. <code>strcpy</code> has no way to know
      <code>dst_cap</code>, so it cannot make this check — that is precisely the "dangerous" part.</p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">4 &middot; Shell: one command each</h3>
    <p>Write the shell command for each goal (files: <code>quote</code>, <code>another</code>).</p>
    <ol class="muted" style="line-height:2">
      <li>Save the contents of <code>quote</code> into <code>another</code>, replacing it.</li>
      <li>Add the contents of <code>quote</code> to the end of <code>another</code>.</li>
      <li>Count the words in <code>quote</code> by feeding it to <code>wc</code> on stdin.</li>
      <li>Run <code>cat blah</code> and capture <b>only</b> the error message into <code>err.txt</code>.</li>
      <li>Show only the lines of <code>quote</code> containing <code>th</code>, then count them.</li>
      <li>Run <code>grep teach</code> on <code>another</code> with output and errors in separate files.</li>
    </ol>
    <textarea placeholder="one command per line"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre>1.  cat quote &gt; another
2.  cat quote &gt;&gt; another
3.  wc &lt; quote
4.  cat blah 2&gt; err.txt          <span class="cm"># stdout still goes to the terminal</span>
5.  cat quote | grep th | wc      <span class="cm"># or: grep th quote | wc -l</span>
6.  grep teach &lt; another 1&gt; grep_out 2&gt; grep_error</pre>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">5 &middot; Explain the difference</h3>
    <p>In your own words: why does <code>ls | wc</code> print different numbers than <code>ls | xargs wc</code>?</p>
    <textarea placeholder="your explanation"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
      <p class="muted"><code>ls | wc</code> pipes <code>ls</code>'s output <b>as data</b> into <code>wc</code>'s
      stdin, so <code>wc</code> is counting the lines/words/characters of the <i>listing itself</i>.
      <code>ls | xargs wc</code> turns that same output into <b>command-line arguments</b>, so the shell
      effectively runs <code>wc another quote</code> and <code>wc</code> opens and counts each file.
      Pipe = data on stdin. <code>xargs</code> = arguments on the command line.</p>
    </div>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET 1 — string memory strip
   ============================================================ */
function slPreset(text, cap, nul) {
  document.getElementById('sl-text').value = text;
  const sel = document.getElementById('sl-cap');
  let found = false;
  for (let i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value === String(cap)) { sel.selectedIndex = i; found = true; }
  }
  if (!found) { const o = document.createElement('option'); o.value = String(cap); o.text = String(cap); sel.add(o); sel.value = String(cap); }
  document.getElementById('sl-nul').checked = nul;
  renderStrip();
}

function renderStrip() {
  const text = document.getElementById('sl-text').value;
  const cap = parseInt(document.getElementById('sl-cap').value, 10);
  const wantNul = document.getElementById('sl-nul').checked;

  const chars = text.split('');
  const fits = chars.length + (wantNul ? 1 : 0) <= cap;
  const written = chars.slice(0, cap);            // what actually lands in the array
  const nulIndex = (wantNul && written.length < cap) ? written.length : -1;

  document.getElementById('sl-decl').textContent =
    'char str[' + cap + '];   /* ' + text.length + ' characters requested' +
    (wantNul ? ' + a terminator' : ', no terminator') + ' */';

  let html = '';
  for (let i = 0; i < cap; i++) {
    if (i < written.length) {
      html += '<div class="cell chr">' + escapeCell(written[i]) + '<span class="idx">' + i + '</span></div>';
    } else if (i === nulIndex) {
      html += '<div class="cell nul">\\0<span class="idx">' + i + '</span></div>';
    } else {
      html += '<div class="cell junk">?<span class="idx">' + i + '</span></div>';
    }
  }
  // if the terminator did not fit, show the memory that follows the array
  if (nulIndex === -1) {
    for (let k = 0; k < 3; k++) {
      html += '<div class="cell junk read" style="border-style:dashed">?<span class="idx">' + (cap + k) + '</span></div>';
    }
  }
  document.getElementById('sl-strip').innerHTML = html;

  const out = document.getElementById('sl-out');
  if (nulIndex !== -1) {
    out.innerHTML = '<b>strlen(str)</b> = <b>' + written.length + '</b> &nbsp;&middot;&nbsp; ' +
      '<b>bytes used</b> = ' + (written.length + 1) + ' of ' + cap + ' &nbsp;&middot;&nbsp; ' +
      '<b>printf("%s", str)</b> prints <code>' + escapeCell(written.join('')) + '</code> and stops at index ' + nulIndex + '.' +
      (fits ? ' This is a valid string.' : ' The text was truncated to fit, but what remains is still a valid string.');
  } else {
    out.innerHTML = '<b style="color:var(--red)">No terminator in the array.</b> ' +
      'strlen and printf both keep reading past index ' + (cap - 1) + ' into the dashed cells &mdash; memory that is not yours. ' +
      'That is <b>undefined behavior</b>: it may print garbage, print nothing, or crash. ' +
      'Fix it by giving the array at least <b>' + (text.length + 1) + '</b> slots and writing <code>\\0</code>.';
  }
}
function escapeCell(c) {
  return c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&#9251;');
}

/* ============================================================
   WIDGET 2 — file-descriptor / redirection diagram
   ============================================================ */
function renderFD() {
  const cmd = document.getElementById('fd-cmd').value;
  const both = document.getElementById('fd-both').checked;
  const inSel = document.getElementById('fd-in');
  const outSel = document.getElementById('fd-out');
  const errSel = document.getElementById('fd-err');
  outSel.disabled = both;
  errSel.disabled = both;

  const inOp = inSel.value;
  const outOp = both ? '' : outSel.value;
  const errOp = both ? '' : errSel.value;

  const parts = [cmd];
  if (inOp) parts.push(decode(inOp));
  if (both) parts.push('&> err_out');
  else { if (outOp) parts.push(decode(outOp)); if (errOp) parts.push(decode(errOp)); }
  document.getElementById('fd-cmdline').textContent = '$ ' + parts.join(' ');

  const d0 = document.getElementById('fd-d0');
  const d1 = document.getElementById('fd-d1');
  const d2 = document.getElementById('fd-d2');

  setDest(d0, inOp ? 'the file ' + fileOf(inOp) : 'the keyboard (default)', !!inOp);
  if (both) {
    setDest(d1, 'the file err_out (shared)', true);
    setDest(d2, 'the file err_out (shared)', true);
  } else {
    setDest(d1, outOp ? 'the file ' + fileOf(outOp) + (outOp.indexOf('>>') !== -1 ? ' (appended)' : ' (overwritten)') : 'the terminal (default)', !!outOp);
    setDest(d2, errOp ? 'the file ' + fileOf(errOp) : 'the terminal (default)', !!errOp);
  }

  const errors = (cmd === 'cat blah');
  const notes = [];
  if (!inOp && (cmd === 'wc' || cmd === 'grep teach')) {
    notes.push('<b>' + cmd + '</b> was given no file, so it waits for you to type on stdin. Redirect stdin with <code>&lt;</code> to feed it a file instead.');
  }
  if (errors) {
    notes.push('<b>cat blah</b> fails, so its message travels on <b>fd 2</b>. ' +
      (both ? 'You chose <code>&amp;&gt;</code>, so it lands in the file along with any normal output.'
            : (errOp ? 'You redirected fd 2, so it lands in ' + fileOf(errOp) + ' and your screen stays clean.'
                     : 'fd 2 still points at the terminal, so you see the error even if you redirected stdout.')));
  }
  if (!both && outOp && outOp.indexOf('>>') === -1) {
    notes.push('<code>&gt;</code> truncates ' + fileOf(outOp) + ' first &mdash; its previous contents are gone. Use <code>&gt;&gt;</code> to keep them.');
  }
  if (!notes.length) notes.push('Everything still pointing at "the terminal" is what you will actually see on screen.');
  document.getElementById('fd-note').innerHTML = notes.join('<br><br>');
}
function setDest(el, text, changed) {
  el.textContent = text;
  el.className = 'dest' + (changed ? ' changed' : '');
}
function decode(s) { return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'); }
function fileOf(op) { const p = decode(op).trim().split(/\s+/); return p[p.length - 1]; }

/* ============================================================
   WIDGET 3 — pipeline stepper for: cat quote | grep th | wc
   ============================================================ */
const PIPE_STAGES = [
  {
    title: '$ cat quote | grep th | wc',
    body: 'the file "quote" on disk:\n\n'
      + 'The function of education is to teach one\n'
      + 'to think intensively and to think critically.\n'
      + 'Intelligence plus character - that is the\n'
      + 'goal of true education.',
    desc: 'Nothing has run yet. <b>quote</b> is a 4-line file sitting on disk.'
  },
  {
    title: 'stage 1 — cat quote',
    body: 'cat reads the file and writes all 4 lines to its STDOUT:\n\n'
      + 'The function of education is to teach one\n'
      + 'to think intensively and to think critically.\n'
      + 'Intelligence plus character - that is the\n'
      + 'goal of true education.',
    desc: '<b>cat</b> is the producer. Because a pipe follows it, its stdout is not the terminal &mdash; it is the pipe.'
  },
  {
    title: 'stage 2 — | grep th',
    body: 'grep receives those 4 lines on its STDIN and keeps only the ones containing "th":\n\n'
      + 'to think intensively and to think critically.\n'
      + 'Intelligence plus character - that is the',
    desc: '<b>grep</b> never opened a file. Its input arrived on <b>fd 0</b> through the pipe. Two lines match "th" (think, that/the), so two lines go out on its stdout.'
  },
  {
    title: 'stage 3 — | wc',
    body: 'wc receives those 2 lines on its STDIN and counts them:\n\n'
      + '  2      14      93\n\n'
      + '  lines  words   characters',
    desc: '<b>wc</b> writes to a terminal this time, because nothing follows it. Compare: <code>cat quote | wc</code> alone gives <code>4 26 160</code> &mdash; grep removed 2 lines before wc ever saw them.'
  }
];
let pipeStep = 0;
function renderPipe() {
  const s = PIPE_STAGES[pipeStep];
  document.getElementById('pipe-stage').textContent = s.title + '\n\n' + s.body;
  document.getElementById('pipe-desc').innerHTML = s.desc;
  document.getElementById('pipe-count').textContent = 'step ' + (pipeStep + 1) + ' of ' + PIPE_STAGES.length;
}
function stepPipe(d) {
  pipeStep = Math.max(0, Math.min(PIPE_STAGES.length - 1, pipeStep + d));
  renderPipe();
}
function resetPipe() { pipeStep = 0; renderPipe(); }

/* ============================================================
   INIT (called by the engine once everything is injected)
   ============================================================ */
function initR02() {
  renderStrip();
  renderFD();
  renderPipe();
}
