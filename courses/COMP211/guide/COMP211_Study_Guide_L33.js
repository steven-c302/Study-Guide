/* ============================================================
   LESSON 33 — Lab 1 · make & Bash scripting (Quiz 2 practice material): Makefile rules, rebuild logic,
   clean, missing dependencies; shell scripts, if/for, comparisons, globs. Pairs with Mastery unit u31.
   Injects into #l33. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be written \\ .
   ============================================================ */
document.getElementById('l33').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l33-make')">1 &middot; Makefiles</button>
  <button onclick="showTopic(this,'l33-rebuild')">2 &middot; What Rebuilds?</button>
  <button onclick="showTopic(this,'l33-bash')">3 &middot; Bash Scripts</button>
  <button onclick="showTopic(this,'l33-glob')">4 &middot; Globs &amp; Loops</button>
  <button onclick="showTopic(this,'l33-xeh')">5 &middot; Lab 1 Part 0: xeh &amp; Testing</button>
  <button onclick="showTopic(this,'l33-hex')">6 &middot; Lab 1 Part 1: hex</button>
</nav>
<main>

<section class="topic active" id="l33-make">
  <h2>Lab 1 &middot; make and Makefiles</h2>
  <div class="concept">A Makefile is a list of <b>rules</b>: <code>target: dependencies</code> followed by a <b>tab-indented recipe</b>. <code>make</code> with no argument builds the <b>first target</b> (the default). It builds the dependencies first, then runs a target's recipe only if the target is missing or older than a dependency. <code>make clean</code> is just another target whose recipe removes files.</div>
  <div class="card">
    <pre>all: stats filter merge
stats: stats.o util.o
	gcc -o stats stats.o util.o
clean:
	rm -f stats filter merge *.o</pre>
    <p>Running <code>make</code> builds <code>all</code>, which depends on three programs, each depending on its own object files. <code>make stats</code> builds only <code>stats</code> and what it needs.</p>
  </div>
  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>You type <code>make</code> with no target. Which target is built?</div>
      <button class="opt" data-i="0">The one named <code>all</code>, always</button>
      <button class="opt" data-i="1">The first target in the Makefile</button>
      <button class="opt" data-i="2">The last target in the Makefile</button>
      <button class="opt" data-i="3">Every target</button>
      <div class="fb">The default is the first target; it is conventionally named <code>all</code>.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">Check</span>True or false: the recipe lines of a rule must begin with a tab character.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Spaces cause a &ldquo;missing separator&rdquo; error.</div>
    </div>
  </div>
</section>

<section class="topic" id="l33-rebuild">
  <h2>Lab 1 &middot; What Gets Rebuilt?</h2>
  <div class="concept">Order of reasoning: (1) start at the requested target, (2) recursively handle each dependency, (3) rebuild a target if it does not exist or <b>any</b> dependency is newer. Editing one source file triggers the object that uses it, then everything above it in the chain &mdash; and nothing else.</div>
  <div class="card">
    <ul>
      <li>All up to date, nothing edited: make reports nothing to do.</li>
      <li>You edit <code>util.c</code>, used by <code>stats.o</code> only: <code>util.o</code>, then <code>stats</code> rebuild; <code>filter</code> and <code>merge</code> do not.</li>
      <li>After <code>make clean</code> then <code>make</code>: everything rebuilds.</li>
      <li>A listed dependency that does not exist and has no rule: make stops with <code>No rule to make target</code>.</li>
    </ul>
  </div>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span><code>app: main.o lib.o</code>. You edit only <code>lib.c</code> (lib.o is built from lib.c). Which steps run on the next <code>make</code>?</div>
      <button class="opt" data-i="0">Only linking <code>app</code></button>
      <button class="opt" data-i="1">Everything, including main.o</button>
      <button class="opt" data-i="2">Compile lib.o, then link app</button>
      <button class="opt" data-i="3">Nothing: make cannot see .c changes</button>
      <div class="fb">lib.o is out of date, so it rebuilds; app depends on lib.o, so it relinks. main.o is untouched.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>The error make prints when a dependency file is missing and no rule builds it begins with &ldquo;No rule to make ___&rdquo;. Fill in the next word.</div>
      <input class="fillblank sm" data-answer="target">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">&ldquo;No rule to make target &lsquo;x&rsquo;, needed by &lsquo;y&rsquo;.&rdquo;</div>
    </div>
  </div>
</section>

<section class="topic" id="l33-bash">
  <h2>Lab 1 &middot; Bash Scripts</h2>
  <div class="concept">A script is a text file starting with a <b>shebang</b> (<code>#!/bin/bash</code>), made runnable with <code>chmod +x</code> and run as <code>./script.sh</code>. Arguments are <code>$1 $2 &hellip;</code>. Numeric comparisons use <code>-eq -ne -lt -gt -le -ge</code> inside <code>[ ]</code>; string comparisons use <code>=</code> and <code>!=</code>; file tests include <code>-e</code> (exists) and <code>-f</code> (regular file). Arithmetic uses <code>$(( ))</code>.</div>
  <div class="card">
    <pre>#!/bin/bash
n=$1
if [ $((n % 2)) -eq 0 ]; then
    echo "even"
else
    echo "odd"
fi</pre>
  </div>
  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What command makes <code>script.sh</code> executable?</div>
      <input class="fillblank" data-answer="chmod +x script.sh~~~chmod u+x script.sh~~~chmod a+x script.sh">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Then run it with <code>./script.sh</code>.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>Which test is true when <code>$x</code> is exactly 7?</div>
      <button class="opt" data-i="0"><code>[ $x -eq 7 ]</code></button>
      <button class="opt" data-i="1"><code>[ $x == 7 ] only works in C</code></button>
      <button class="opt" data-i="2"><code>[ $x =&lt; 7 ]</code></button>
      <button class="opt" data-i="3"><code>if $x = 7</code></button>
      <div class="fb">Use <code>-eq</code> for numbers inside <code>[ ]</code>, with spaces around the brackets.</div>
    </div>
  </div>
</section>

<section class="topic" id="l33-glob">
  <h2>Lab 1 &middot; Globs and Loops</h2>
  <div class="concept"><code>*</code> matches any characters, <code>?</code> exactly one, <code>[0-9]</code> one character from a set. The <b>shell</b> expands the glob before the command runs. <code>for f in data*.txt; do &hellip; done</code> loops over the matches; <code>while [ $i -lt 5 ]; do &hellip; i=$((i+1)); done</code> loops on a condition.</div>
  <div class="card">
    <p>Files: <code>data1.txt data2.txt data10.txt notes.txt</code>. <code>data*.txt</code> matches 3 files; <code>data?.txt</code> matches 2 (<code>data10</code> has two characters).</p>
  </div>
  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>x=1</code> and the loop <code>while [ $x -lt 20 ]; do x=$((x*2)); done</code>, what is x afterward?</div>
      <input class="fillblank sm" data-answer="32">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1, 2, 4, 8, 16 (still &lt; 20) then 32 stops the loop.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which pattern matches <code>img3.png</code> but not <code>imgA.png</code>?</div>
      <button class="opt" data-i="0"><code>img?.png</code></button>
      <button class="opt" data-i="1"><code>img[0-9].png</code></button>
      <button class="opt" data-i="2"><code>img*.png</code></button>
      <button class="opt" data-i="3"><code>*.png</code></button>
      <div class="fb">Only the bracket range limits the character to a digit.</div>
    </div>
  </div>
  <div class="card"><p class="muted">Practice with real output checks: <a href="#" onclick="showLesson('l34',document.querySelector('[data-l=l34]'));return false;">Quiz 2 hub</a> &rarr; Mastery unit &ldquo;Lab 1 &middot; make &amp; Bash scripts&rdquo;.</p></div>
</section>

<section class="topic" id="l33-xeh">
  <h2>Lab 1 Part 0 &middot; The xeh Decoder and Its Test Script</h2>
  <div class="concept">Part 0 of Lab 1 ("Mysterious Parody Bits") asks you to write <code>xeh.c</code>: read hex text such as <code>48656C6C6F</code> and print the decoded ASCII text <code>Hello</code>. It is built in small steps, then tested with <code>diff</code> and an automated Bash loop. Both halves are Quiz 2 material: the C part uses bitwise operators, the testing part is the Bash script reading (loops, <code>chmod</code>, redirection).</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Step</th><th>What the code does</th><th>Key idea</th></tr>
      <tr><td>1</td><td>Read with <code>getchar()</code> until <code>EOF</code>, ignore <code>'\\n'</code></td><td>Each character is an ASCII code, not a number yet</td></tr>
      <tr><td>2</td><td><code>c - '0'</code> for digits, <code>c - 'A' + 10</code> or <code>c - 'a' + 10</code> for letters</td><td>Digits and letters are consecutive ASCII codes; <code>'A'</code> is 10</td></tr>
      <tr><td>3</td><td><code>combined = (hi &lt;&lt; 4) | low;</code></td><td>The first digit is the high nibble (4 bits), the second is the low nibble</td></tr>
      <tr><td>4</td><td><code>putchar(combined);</code></td><td>The byte already is the ASCII code of the character</td></tr>
    </table>
    <p class="muted">A <b>byte is 8 bits</b>, a <b>nibble is 4 bits</b>, and one hex digit (a hexit) is 4 bits, so two hex digits make one byte. The lab forbids library converters (<code>strtol</code>, <code>sscanf</code>) and magic numbers.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">The test script</h3>
    <pre>#!/bin/bash
input_dir="tests/xeh/input"
expected_dir="tests/xeh/expected"
actual_dir="tests/xeh/actual"
for input in "$input_dir"/*.hex; do
    base=$(basename "$input" .hex)
    expected="$expected_dir/$base.expected"
    actual="$actual_dir/$base.actual"
    ./xeh &lt; "$input" &gt; "$actual"
    diff "$actual" "$expected" \\
        &amp;&amp; echo "$base: PASS" \\
        || echo "$base: FAIL"
done</pre>
    <ul>
      <li><code>for input in "$input_dir"/*.hex</code> runs once per matching file (a glob, expanded in sorted order).</li>
      <li><code>basename "$input" .hex</code> strips the directory and the <code>.hex</code> suffix, so <code>tests/xeh/input/hello.hex</code> becomes <code>hello</code>; <code>$(...)</code> captures that output.</li>
      <li><code>./xeh &lt; "$input" &gt; "$actual"</code>: input redirection feeds the file to the program, output redirection saves what it prints.</li>
      <li><code>diff</code> prints nothing and succeeds when the files match; <code>A &amp;&amp; B || C</code> runs B on success and C on failure.</li>
      <li>The script itself needs <code>chmod +x</code> before <code>./xeh_tests.sh</code> will run.</li>
    </ul>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>hi = 6</code> and <code>low = 12</code>. What does <code>(hi &lt;&lt; 4) | low</code> equal, in hex? (two hex digits)</div>
      <input class="fillblank sm" data-answer="6c~~~0x6c">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6 shifted left by 4 is 0x60; OR with 12 (0xC) gives 0x6C, the letter <code>l</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What number does <code>'B' - 'A' + 10</code> evaluate to? (decimal)</div>
      <input class="fillblank sm" data-answer="11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">'B' is one after 'A', so 1 + 10 = 11, the value of the hex digit B.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span><code>diff actual.txt expected.txt</code> prints nothing. What does that mean?</div>
      <button class="opt" data-i="0">The command failed</button>
      <button class="opt" data-i="1">The two files are identical, so the test passed</button>
      <button class="opt" data-i="2">One of the files is empty</button>
      <button class="opt" data-i="3">The files differ only in whitespace</button>
      <div class="fb">diff only prints when there is a difference.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>tests/xeh/input</code> holds 7 <code>.hex</code> files. How many times does the body of <code>for input in tests/xeh/input/*.hex; do ... done</code> run? (a number)</div>
      <input class="fillblank sm" data-answer="7">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A for loop over a glob runs once per matching file.</div>
    </div>
  </div>
</section>

<section class="topic" id="l33-hex">
  <h2>Lab 1 Part 1 &middot; The hex Encoder (xeh in Reverse)</h2>
  <div class="concept">Part 1 asks for <code>hex.c</code>, the opposite of <code>xeh.c</code>: it reads plain ASCII text and prints each character as two hex digits, ending with a newline. Where xeh combined two nibbles into a byte, hex <b>splits one byte into two nibbles</b>. The testing reuses the Part 0 files in reverse.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Piece</th><th>Code idea</th></tr>
      <tr><td>High nibble</td><td><code>hi = c &gt;&gt; 4;</code></td></tr>
      <tr><td>Low nibble</td><td><code>low = c &amp; 0x0F;</code> (the mask keeps only the lowest 4 bits)</td></tr>
      <tr><td>Nibble to character</td><td>0&ndash;9: <code>'0' + n</code> &nbsp; 10&ndash;15: <code>'A' + (n - 10)</code></td></tr>
      <tr><td>Wrapping</td><td>after every 80 hex digits (40 input characters) print <code>'\\n'</code></td></tr>
    </table>
    <pre>$ echo "Hello" | ./hex
48656C6C6F0A
$ echo -n "Hello" | ./hex
48656C6C6F
$ echo "Hello" | ./hex | ./xeh
Hello</pre>
    <p class="muted"><code>echo</code> adds a newline, which shows up as <code>0A</code> in the hex. <code>echo -n</code> leaves it off. Piping hex into xeh round-trips back to the original text.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Shell tricks in the Part 1 testing steps</h3>
    <ul>
      <li><code>mkdir -p tests/hex/{input,expected,actual}</code>: <b>brace expansion</b> turns it into three paths, one per item. <code>-p</code> makes missing parent directories.</li>
      <li><code>cp tests/xeh/expected/*.expected tests/hex/input/</code>: a glob copies every expected file; the Part 0 outputs become the Part 1 inputs, and the Part 0 hex inputs become the Part 1 expected outputs.</li>
      <li><code>for f in *.expected; do mv "$f" "\${f%.expected}.in"; done</code>: <code>\${f%.expected}</code> strips the suffix, so <code>digits.expected</code> is renamed <code>digits.in</code>.</li>
      <li>The test script is the Part 0 script with the directories, the <code>.in</code> suffix (<code>basename "$input" .in</code>) and <code>./hex</code> changed. Make it executable with <code>chmod +x</code>.</li>
    </ul>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>For the byte <code>0x6C</code>, what is <code>0x6C &gt;&gt; 4</code>? (decimal)</div>
      <input class="fillblank sm" data-answer="6">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x6C = 0110 1100; shifting right by 4 leaves the high nibble 0110 = 6.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>For the byte <code>0x6C</code>, what is <code>0x6C &amp; 0x0F</code>? (decimal)</div>
      <input class="fillblank sm" data-answer="12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The mask keeps only the low nibble 1100 = 12, which prints as the hex digit C.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>echo -n "Hi" | ./hex</code> print?</div>
      <input class="fillblank sm" data-answer="4869">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">H is 0x48 and i is 0x69. Without <code>-n</code> the output would end in 0A.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>The encoder wraps after 80 hex digits. How many input characters is that?</div>
      <button class="opt" data-i="0">80</button>
      <button class="opt" data-i="1">160</button>
      <button class="opt" data-i="2">40</button>
      <button class="opt" data-i="3">20</button>
      <div class="fb">Each character needs 2 hex digits, so 80 digits is 40 characters.</div>
    </div>
  </div>
</section>

</main>
`;
