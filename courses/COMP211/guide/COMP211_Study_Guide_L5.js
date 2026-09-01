/* ============================================================
   LESSON 5 — Unix Basics COMP211 FA26 ($PATH, Globbing, Regex, find, grep).
   Injects into #l5. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l5').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l5-path')">1 &middot; $PATH</button>
  <button onclick="showTopic(this,'l5-glob')">2 &middot; Globbing</button>
  <button onclick="showTopic(this,'l5-regex')">3 &middot; Regular Expressions</button>
  <button onclick="showTopic(this,'l5-cmp')">4 &middot; Glob vs Regex</button>
  <button onclick="showTopic(this,'l5-find')">5 &middot; find</button>
  <button onclick="showTopic(this,'l5-grep')">6 &middot; grep</button>
  <button onclick="showTopic(this,'l5-check')">Self-Check</button>
</nav>
<main>

<!-- ============ PATH ============ -->
<section class="topic active" id="l5-path">
  <h2>Lesson 5 &middot; <code>$PATH</code></h2>

  <div class="concept">The shell does <b>not</b> search the current working directory for executables. This
  is why <code>./hello</code> requires the <code>./</code> even when <code>hello</code> is sitting right
  there &mdash; and it's a deliberate <b>security</b> decision, not an oversight.</div>

  <h3>Why the shell won't search <code>.</code></h3>
  <div class="card">
    <p>Imagine your current directory is <code>~/Downloads</code>, and it contains
    <code>~/Downloads/suspicious-stuff</code>, which in turn happens to contain a malicious script named
    <code>ls</code>. If the shell searched the current directory first (or at all), simply running
    <code>ls</code> from inside <code>suspicious-stuff</code> could execute the <b>fake</b> <code>ls</code>
    instead of the real <code>/bin/ls</code> &mdash; silently, with no warning.</p>
    <div class="danger">Because <code>.</code> is never searched, that attack doesn't work: typing
    <code>ls</code> always searches <code>$PATH</code> and finds the real one. Running a program in the
    current directory always requires the explicit <code>./</code>.</div>
  </div>

  <h3>What <code>$PATH</code> actually is</h3>
  <div class="card">
    <p><code>$PATH</code> is a shell environment variable holding a <b>colon-separated list of directories</b>
    the shell <i>does</i> search for executables, in order, <b>left to right, stopping at the first match</b>.</p>
<pre>$ echo $PATH
/home/student/bin:/usr/local/bin:/usr/bin:/bin</pre>
    <h4>Worked example</h4>
    <p>Suppose <code>PATH=/home/student/bin:/usr/bin</code>, and <b>both</b> directories contain an
    executable named <code>foo</code>:</p>
    <table class="cmp">
      <tr><th>Directory (search order)</th><th>Has <code>foo</code>?</th><th>Used when you type <code>foo</code>?</th></tr>
      <tr><td>1. <code>/home/student/bin</code></td><td>yes</td><td><b>Yes &mdash; first match wins</b></td></tr>
      <tr><td>2. <code>/usr/bin</code></td><td>yes</td><td>No &mdash; never reached</td></tr>
    </table>
    <p class="muted">Running <code>foo</code> executes <code>/home/student/bin/foo</code>, simply because that
    directory is listed <b>first</b> in <code>$PATH</code>. This is also how you can intentionally shadow a
    system command with your own version, by putting your own directory earlier in <code>$PATH</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why doesn't the shell search the current directory for executables by default?</div>
      <button class="opt" data-i="0">It would be too slow</button>
      <button class="opt" data-i="1">Current-directory files can't be executable</button>
      <button class="opt" data-i="2">Security &mdash; it would let a maliciously named file (e.g. a fake <code>ls</code>) in the current directory hijack a common command</button>
      <button class="opt" data-i="3">The current directory is always already in <code>$PATH</code></button>
      <div class="fb">If <code>.</code> were searched, dropping a file named <code>ls</code> (or any common command) into a directory could silently run instead of the real program.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span><code>PATH=/home/student/bin:/usr/bin</code>, and both directories have an executable named <code>foo</code>. Which one runs when you type <code>foo</code>?</div>
      <button class="opt" data-i="0">The one in <code>/home/student/bin</code>, because it's listed first</button>
      <button class="opt" data-i="1">The one in <code>/usr/bin</code>, because system directories take priority</button>
      <button class="opt" data-i="2">Both run, one after another</button>
      <button class="opt" data-i="3">Neither &mdash; ambiguous names cause an error</button>
      <div class="fb">The shell searches <code>$PATH</code> <b>left to right</b> and stops at the <b>first</b> match.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>$PATH</code> entries are separated by spaces.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False</b> &mdash; entries are separated by <b>colons</b> (<code>:</code>), not spaces.</div>
    </div>
  </div>
</section>

<!-- ============ GLOBBING ============ -->
<section class="topic" id="l5-glob">
  <h2>Lesson 5 &middot; Globbing</h2>

  <div class="concept"><b>Globbing</b> is filename expansion performed by the <b>shell itself</b>, <i>before</i>
  a command even runs. The shell looks at actual filenames in a directory and replaces the glob pattern with
  every name that matches it.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Pattern</th><th>Matches</th><th>Example</th></tr>
      <tr><td><code>*</code></td><td>any number of characters (including zero)</td><td><code>*.c</code> matches <code>dog.c</code>, <code>a.c</code>, <code>.c</code></td></tr>
      <tr><td><code>?</code></td><td>exactly one character</td><td><code>lab?.c</code> matches <code>lab0.c</code>, <code>lab1.c</code>, not <code>lab.c</code> or <code>lab10.c</code></td></tr>
      <tr><td><code>[abc]</code></td><td>one character from the given set</td><td><code>lab[01].c</code> matches <code>lab0.c</code> or <code>lab1.c</code> only</td></tr>
      <tr><td><code>[a-z]</code></td><td>one character in the given range</td><td><code>[a-z]og.c</code> matches <code>dog.c</code>, <code>log.c</code></td></tr>
    </table>
    <p class="muted">Glob expansion happens <b>before</b> the command sees its arguments &mdash; by the time
    <code>ls *.c</code> runs, the shell has already replaced <code>*.c</code> with the literal list of
    matching filenames.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does <code>?</code> match in a glob pattern?</div>
      <button class="opt" data-i="0">Zero or more characters</button>
      <button class="opt" data-i="1">Exactly one character</button>
      <button class="opt" data-i="2">One or more characters</button>
      <button class="opt" data-i="3">A literal question mark</button>
      <div class="fb"><code>?</code> matches exactly <b>one</b> character &mdash; no more, no less.</div>
    </div>
    <div class="q" data-multi="0,2">
      <div class="prompt"><span class="tag">Select all that apply</span>Given files <code>lab0.c lab1.c lab10.c labX.c</code>, which does the glob <code>lab?.c</code> match?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> <code>lab0.c</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>lab10.c</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> <code>labX.c</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> <code>lab.c</code></span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A and C.</b> <code>?</code> matches exactly one character, so <code>lab10.c</code> (two extra characters) and <code>lab.c</code> (zero) don't match.</div>
    </div>
  </div>
</section>

<!-- ============ REGEX ============ -->
<section class="topic" id="l5-regex">
  <h2>Lesson 5 &middot; Regular Expressions</h2>

  <div class="concept">A <b>regular expression</b> is a pattern-matching language used by a <b>program</b>
  (like <code>grep</code>) to match against <b>text content</b> &mdash; not filenames.</div>

  <div class="card">
    <h4>Character classes</h4>
    <table class="cmp">
      <tr><th>Pattern</th><th>Meaning</th></tr>
      <tr><td><code>[abc]</code></td><td>one character from the set</td></tr>
      <tr><td><code>[a-z]</code></td><td>one character in the range</td></tr>
      <tr><td><code>[0-9]</code></td><td>one digit</td></tr>
    </table>
    <h4>Quantifiers</h4>
    <table class="cmp">
      <tr><th>Pattern</th><th>Meaning</th></tr>
      <tr><td><code>*</code></td><td>zero or more of the preceding character/group</td></tr>
      <tr><td><code>+</code></td><td>one or more of the preceding character/group</td></tr>
      <tr><td><code>?</code></td><td>zero or one of the preceding character/group</td></tr>
      <tr><td><code>{n}</code></td><td>exactly <code>n</code></td></tr>
      <tr><td><code>{n,}</code></td><td><code>n</code> or more</td></tr>
      <tr><td><code>{n,m}</code></td><td>between <code>n</code> and <code>m</code>, inclusive</td></tr>
    </table>
    <h4>Anchors and escaping</h4>
    <table class="cmp">
      <tr><th>Pattern</th><th>Meaning</th></tr>
      <tr><td><code>^</code></td><td>start of line</td></tr>
      <tr><td><code>$</code></td><td>end of line</td></tr>
      <tr><td><code>\\.</code>, <code>\\*</code>, etc.</td><td>escape a special character to match it <b>literally</b></td></tr>
    </table>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Match the regex piece to its meaning</h3>
    <table class="match" id="match-regex">
      <tr><td class="match-term"><code>^</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="start">start of line</option><option value="end">end of line</option><option value="zero-more">zero or more</option><option value="one-more">one or more</option><option value="range">between n and m</option></select></td></tr>
      <tr><td class="match-term"><code>$</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="start">start of line</option><option value="end">end of line</option><option value="zero-more">zero or more</option><option value="one-more">one or more</option><option value="range">between n and m</option></select></td></tr>
      <tr><td class="match-term"><code>*</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="start">start of line</option><option value="end">end of line</option><option value="zero-more">zero or more</option><option value="one-more">one or more</option><option value="range">between n and m</option></select></td></tr>
      <tr><td class="match-term"><code>+</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="start">start of line</option><option value="end">end of line</option><option value="zero-more">zero or more</option><option value="one-more">one or more</option><option value="range">between n and m</option></select></td></tr>
      <tr><td class="match-term"><code>{2,3}</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="start">start of line</option><option value="end">end of line</option><option value="zero-more">zero or more</option><option value="one-more">one or more</option><option value="range">between n and m</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-regex','fb-match-regex',['start','end','zero-more','one-more','range'])">Check</button>
    <div class="fb" id="fb-match-regex">Anchors (<code>^ $</code>) fix a position; quantifiers (<code>* + {n,m}</code>) control repetition of whatever came right before them.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Who evaluates a regular expression?</div>
      <button class="opt" data-i="0">The shell, before the command runs</button>
      <button class="opt" data-i="1">A program (like <code>grep</code>), against text content</button>
      <button class="opt" data-i="2">The filesystem</button>
      <button class="opt" data-i="3">The compiler</button>
      <div class="fb">Regex matching is done by the <b>program</b> reading the text &mdash; unlike globbing, which the <b>shell</b> does against filenames before the command even starts.</div>
    </div>
  </div>
</section>

<!-- ============ GLOB VS REGEX ============ -->
<section class="topic" id="l5-cmp">
  <h2>Lesson 5 &middot; Globbing vs Regular Expressions</h2>

  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Globbing</th><th>Regular expressions</th></tr>
      <tr><td>What it is</td><td>filename expansion</td><td>text pattern matching</td></tr>
      <tr><td>Who performs it</td><td>the <b>shell</b></td><td>a <b>program</b> (e.g. <code>grep</code>)</td></tr>
      <tr><td>What it operates on</td><td>filenames that exist in a directory</td><td>the content/text of files or strings</td></tr>
      <tr><td>Example pattern</td><td><code>*.c</code></td><td><code>^[a-z].*_[0-9]{2,3}$</code></td></tr>
      <tr><td>Pattern language power</td><td>simpler &mdash; <code>* ? [abc] [a-z]</code></td><td>more powerful &mdash; adds quantifiers (<code>+ ? {n,m}</code>) and anchors (<code>^ $</code>)</td></tr>
    </table>
  </div>

  <div class="concept" style="font-size:15px"><b>The classic confusion: <code>*</code> means something completely
  different in each context.</b>
  <br><br>
  In a <b>glob</b>, <code>*</code> means <b>"any characters"</b> all by itself &mdash; <code>*.c</code> matches
  any filename ending in <code>.c</code>.
  <br><br>
  In a <b>regex</b>, <code>*</code> never stands alone conceptually &mdash; it means <b>"zero or more of the
  character or group immediately before it."</b> A bare <code>*</code> at the start of a regex, or after
  nothing meaningful, is either an error or matches literally nothing useful. To say "any characters" in
  regex you need <code>.*</code> (any single character, repeated zero or more times) &mdash; <b>two symbols</b>,
  not one.</div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>In a regular expression, what does a bare <code>*</code> quantify?</div>
      <button class="opt" data-i="0">Nothing &mdash; it means "any characters," same as in a glob</button>
      <button class="opt" data-i="1">The character or group that comes immediately before it</button>
      <button class="opt" data-i="2">The entire rest of the line</button>
      <button class="opt" data-i="3">Exactly one character</button>
      <div class="fb">Unlike glob's <code>*</code>, regex's <code>*</code> is a <b>quantifier</b> attached to whatever precedes it &mdash; it says "zero or more of that."</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>To match "any sequence of characters" in a <b>regex</b> (the equivalent of a glob's bare <code>*</code>), you write which two-character sequence?</div>
      <input class="fillblank sm" data-answer=".*">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>.*</code> &mdash; "any character" (<code>.</code>) repeated "zero or more times" (<code>*</code>).</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>find</code> uses regular expressions for its <code>-name</code> patterns.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> <code>find -name</code> uses <b>shell-style glob</b> patterns, not regex &mdash; that's exactly why it's easy to confuse the two.</div>
    </div>
  </div>
</section>

<!-- ============ FIND ============ -->
<section class="topic" id="l5-find">
  <h2>Lesson 5 &middot; <code>find</code></h2>

  <div class="concept"><code>find &lt;where to search&gt; -name &lt;pattern&gt;</code> searches the filesystem
  <b>recursively</b> for files/directories by name. <code>find</code> can also filter by type, size, time, and
  permissions &mdash; but the core idea here is name matching. <b>Crucially, <code>find</code> uses
  shell-style glob patterns, not regex.</b></div>

  <h3>Basic examples</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Command</th><th>What it finds</th></tr>
      <tr><td><code>find ./ -name dog.c</code></td><td>searches recursively from the current directory; finds <code>./dog.c</code>, <code>./src/dog.c</code>, <code>./tests/dog.c</code> &mdash; anywhere under <code>.</code></td></tr>
      <tr><td><code>find ./src -name dog.c</code></td><td>scoped to just <code>src/</code>; finds only <code>./src/dog.c</code></td></tr>
    </table>
  </div>

  <h3>Worked exercise set</h3>
  <div class="card">
    <p>Given a directory tree under <code>/home</code> containing <code>john</code> and <code>carla</code>,
    where <code>carla</code> has <code>comp211/labs/lab0.c</code>, <code>comp211/labs/lab1.c</code>, and
    <code>comp301/</code>, and <code>john</code> has <code>psyc101/notes/lec1.note</code>,
    <code>lec2.note</code>, <code>lec3.note</code> (no <code>.c</code> files anywhere under <code>john</code>):</p>
    <table class="cmp">
      <tr><th>Command</th><th>Output</th></tr>
      <tr><td><code>find ./carla -name "*.c"</code></td><td><code>./carla/comp211/labs/lab0.c</code>, <code>./carla/comp211/labs/lab1.c</code></td></tr>
      <tr><td><code>find . -name "comp*"</code></td><td><code>./carla/comp211</code>, <code>./carla/comp301</code></td></tr>
      <tr><td><code>find ./john -name "*.c"</code></td><td><b>no output</b> &mdash; there are no <code>.c</code> files under <code>john</code></td></tr>
      <tr><td><code>find ./carla -name "lab?.c"</code></td><td><code>lab0.c</code> <b>and</b> <code>lab1.c</code> &mdash; <code>?</code> matches exactly one character, and both digits qualify</td></tr>
      <tr><td><code>find ./home/john -name "*.note"</code> (run from <code>/</code>)</td><td>all three: <code>lec1.note</code>, <code>lec2.note</code>, <code>lec3.note</code> under <code>john/psyc101/notes/</code></td></tr>
    </table>
    <div class="warn">Note the second row: <code>comp*</code> matches both <code>comp211</code> <b>and</b>
    <code>comp301</code> &mdash; <code>*</code> just means "any characters," it does not care that the two
    names differ after "comp".</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span><code>find ./carla -name "lab?.c"</code> against files <code>lab0.c</code>, <code>lab1.c</code>, <code>lab10.c</code> — what does it return?</div>
      <button class="opt" data-i="0">All three files</button>
      <button class="opt" data-i="1"><code>lab0.c</code> and <code>lab1.c</code> only</button>
      <button class="opt" data-i="2">Only <code>lab10.c</code></button>
      <button class="opt" data-i="3">Nothing</button>
      <div class="fb"><code>?</code> is exactly one character, so <code>lab10.c</code> (two extra chars) doesn't match &mdash; only <code>lab0.c</code> and <code>lab1.c</code> do.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>What kind of pattern does <code>find -name</code> expect?</div>
      <button class="opt" data-i="0">A regular expression</button>
      <button class="opt" data-i="1">A Python string method</button>
      <button class="opt" data-i="2">SQL <code>LIKE</code> syntax</button>
      <button class="opt" data-i="3">A shell-style glob pattern</button>
      <div class="fb"><code>find</code> uses glob patterns (<code>* ? [abc]</code>), the same language as filename expansion &mdash; not regex.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Write a <code>find</code> command that recursively searches from the current directory (<code>.</code>) for any file whose name ends in <code>.c</code>.</div>
      <input class="fillblank" data-answer="find . -name &quot;*.c&quot;|find . -name '*.c'|find ./ -name &quot;*.c&quot;|find ./ -name '*.c'">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>find . -name "*.c"</code> &mdash; <code>.</code> (or <code>./</code>) as the search root, <code>-name</code> with a glob pattern. Single or double quotes around the pattern both work.</div>
    </div>
  </div>
</section>

<!-- ============ GREP ============ -->
<section class="topic" id="l5-grep">
  <h2>Lesson 5 &middot; <code>grep</code></h2>

  <div class="concept"><code>grep &lt;pattern&gt; &lt;file&gt;</code> searches a file's <b>contents</b>, line
  by line, for text matching a pattern, and prints the matching lines. <b>Unlike <code>find</code>,
  <code>grep</code> uses regular expressions</b> &mdash; a plain string is just a simple, valid regex.</div>

  <h3>Basic and extended regex</h3>
  <div class="card">
<pre>$ grep "ERROR" log.txt</pre>
    <p class="muted">A literal string is itself a valid (simple) regex &mdash; this finds every line containing
    the text <code>ERROR</code>.</p>
<pre>$ grep -E "_[0-9]{2}$" users.txt</pre>
    <p class="muted">The <code>-E</code> flag turns on <b>extended</b> regular expressions, which is required
    for <code>{2}</code> to work as a quantifier (in basic/default regex it would be treated literally). This
    finds usernames ending in exactly two digits preceded by an underscore &mdash; e.g. <code>alice_01</code>.</p>
  </div>

  <h3>Piece-by-piece: <code>grep -E "^[a-z].*_[0-9]{2,3}$" project/data/users.txt</code></h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Piece</th><th>Meaning</th></tr>
      <tr><td><code>^</code></td><td>start of line</td></tr>
      <tr><td><code>[a-z]</code></td><td>the line starts with a lowercase letter</td></tr>
      <tr><td><code>.*</code></td><td>any characters in between (including other underscores)</td></tr>
      <tr><td><code>_</code></td><td>a literal underscore appears somewhere</td></tr>
      <tr><td><code>[0-9]{2,3}</code></td><td>the line ends with 2 or 3 digits</td></tr>
      <tr><td><code>$</code></td><td>end of line</td></tr>
    </table>
    <p class="muted">So the whole pattern means: <i>"a line that starts with a lowercase letter, contains an
    underscore somewhere, and ends with 2 or 3 digits."</i> A username like <code>steven_302</code> matches;
    <code>Steven_302</code> (capital S) does not.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does a plain string like <code>"ERROR"</code> mean as a <code>grep</code> pattern?</div>
      <button class="opt" data-i="0">It's invalid &mdash; grep requires special regex syntax</button>
      <button class="opt" data-i="1">A simple, valid regex that matches the literal text "ERROR" anywhere on the line</button>
      <button class="opt" data-i="2">It matches only lines that are exactly "ERROR" and nothing else</button>
      <button class="opt" data-i="3">It's treated as a glob pattern</button>
      <div class="fb">A plain string is itself a valid (trivial) regular expression &mdash; it matches that literal text anywhere in the line.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why is <code>-E</code> needed for <code>grep -E "_[0-9]{2}$"</code> to work as intended?</div>
      <button class="opt" data-i="0"><code>-E</code> makes grep case-insensitive</button>
      <button class="opt" data-i="1"><code>-E</code> is required before any regex will work at all</button>
      <button class="opt" data-i="2"><code>-E</code> enables extended regex, so <code>{2}</code> is treated as a quantifier instead of literal text</button>
      <button class="opt" data-i="3"><code>-E</code> searches multiple files</button>
      <div class="fb">Without <code>-E</code>, basic regex treats <code>{2}</code> as literal characters, not a repeat-count quantifier.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>grep</code> uses shell-style glob patterns, the same as <code>find</code>.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> <code>grep</code> uses <b>regular expressions</b>; <code>find -name</code> uses <b>globs</b>. Mixing these up is the most common error in this unit.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Write a <code>grep</code> (extended, <code>-E</code>) command that prints lines from <code>users.txt</code> starting with a lowercase letter and ending in exactly 2 or 3 digits.</div>
      <input class="fillblank" data-answer="grep -e &quot;^[a-z].*[0-9]{2,3}$&quot; users.txt|grep -E &quot;^[a-z].*[0-9]{2,3}$&quot; users.txt|grep -E '^[a-z].*[0-9]{2,3}$' users.txt|grep -e '^[a-z].*[0-9]{2,3}$' users.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Something like <code>grep -E "^[a-z].*[0-9]{2,3}$" users.txt</code> &mdash; anchors at both ends, <code>[a-z]</code> for the first character, and <code>[0-9]{2,3}</code> for 2&ndash;3 trailing digits.</div>
    </div>
  </div>
</section>

<!-- ============ SELF-CHECK ============ -->
<section class="topic" id="l5-check">
  <h2>Lesson 5 &middot; Self-Check</h2>
  <p class="muted">Synthesizing <code>$PATH</code>, globbing, regex, <code>find</code>, and <code>grep</code>.</p>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q1</span>Which tool performs its pattern matching against <b>filenames</b>, done by the <b>shell</b>?</div>
      <button class="opt" data-i="0">Globbing</button>
      <button class="opt" data-i="1"><code>grep</code></button>
      <button class="opt" data-i="2">Regular expressions</button>
      <button class="opt" data-i="3"><code>$PATH</code></button>
      <div class="fb">Globbing is filename expansion performed by the shell, before the command runs.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>Which tool searches file <b>contents</b> using regular expressions?</div>
      <button class="opt" data-i="0"><code>find</code></button>
      <button class="opt" data-i="1"><code>ls</code></button>
      <button class="opt" data-i="2"><code>grep</code></button>
      <button class="opt" data-i="3"><code>cd</code></button>
      <div class="fb"><code>grep</code> reads a file's text, line by line, and reports lines matching a regex.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">Q3</span><code>find</code> uses glob patterns and <code>grep</code> uses regex &mdash; two different pattern languages.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> This distinction is the core of the lesson.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q4</span>In a glob pattern, what does <code>[a-z]</code> mean?</div>
      <button class="opt" data-i="0">The literal text <code>a-z</code></button>
      <button class="opt" data-i="1">Exactly one character, any lowercase letter</button>
      <button class="opt" data-i="2">One or more lowercase letters</button>
      <button class="opt" data-i="3">Zero or more lowercase letters</button>
      <div class="fb">Character classes like <code>[a-z]</code> mean the same thing (one character from a set/range) in <b>both</b> globs and regex &mdash; it's <code>*</code> that differs between them.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q5</span>Which regex quantifier means "one or more"?</div>
      <button class="opt" data-i="0"><code>*</code></button>
      <button class="opt" data-i="1"><code>?</code></button>
      <button class="opt" data-i="2"><code>{0,}</code></button>
      <button class="opt" data-i="3"><code>+</code></button>
      <div class="fb"><code>+</code> = one or more. (<code>{0,}</code> would mean "zero or more" &mdash; same as <code>*</code>.)</div>
    </div>
    <div class="q" data-multi="0,3">
      <div class="prompt"><span class="tag">Q6 &middot; Select all</span>Which are true about <code>$PATH</code>?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> It's searched left to right, and the first match wins.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> The current directory is always included automatically.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Entries are separated by semicolons.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> You can shadow a system command by putting your own directory earlier in <code>$PATH</code>.</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A and D.</b> <code>.</code> is never auto-included (B is false, and that's deliberate), and entries are colon-separated, not semicolon-separated (C is false).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q7 &middot; Fill in the blank</span>Write a <code>find</code> command that searches recursively under <code>./src</code> for files named exactly <code>main.c</code>.</div>
      <input class="fillblank" data-answer="find ./src -name &quot;main.c&quot;|find ./src -name 'main.c'">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>find ./src -name "main.c"</code> — search root first, then <code>-name</code> with the glob pattern (a literal name is also a valid glob).</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q8</span>In the regex <code>^[a-z].*_[0-9]{2,3}$</code>, what does the trailing <code>$</code> anchor?</div>
      <button class="opt" data-i="0">A literal dollar sign in the text</button>
      <button class="opt" data-i="1">The start of the line</button>
      <button class="opt" data-i="2">The end of the line</button>
      <button class="opt" data-i="3">A digit</button>
      <div class="fb"><code>$</code> anchors to the <b>end</b> of the line, pairing with <code>^</code> at the start.</div>
    </div>
  </div>
</section>

</main>
`;
