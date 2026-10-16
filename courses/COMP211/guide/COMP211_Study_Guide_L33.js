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

</main>
`;
