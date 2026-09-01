/* ============================================================
   LESSON 6 — Checkoff 1 Prep: CLI Practical.
   Injects into #l6. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l6').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l6-logistics')">Logistics &amp; What to Expect</button>
  <button onclick="showTopic(this,'l6-walk')">Walkthrough &middot; The 24 Tasks</button>
  <button onclick="showTopic(this,'l6-drill')">Drill</button>
  <button onclick="showTopic(this,'l6-mistakes')">Common Mistakes</button>
</nav>
<main>

<!-- ============ LOGISTICS ============ -->
<section class="topic active" id="l6-logistics">
  <h2>Checkoff 1 &middot; What to Expect</h2>

  <div class="concept">This is not lecture content &mdash; it is <b>drill material</b> built from a released
  sample checkoff (a blank version and its solution). The real checkoff mirrors this sample's <b>style and
  topic coverage</b>, but with different specifics: different filenames, a different repo, a different order.
  The goal here is <b>command fluency</b> &mdash; knowing which command/flag/operator solves a given spec on
  sight &mdash; not memorizing this exact sequence of 24 tasks.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Format</th><th>What that means</th></tr>
      <tr><td><b>Practical, oral, one-on-one</b></td><td>You sit with a <b>TA</b> and perform tasks live in a terminal while they watch and ask you to explain what you're doing.</td></tr>
      <tr><td><b>Time</b></td><td>Averages about <b>15 minutes</b>; you're given a <b>30-minute slot</b>.</td></tr>
      <tr><td><b>Setup is on you</b></td><td>You must have your <b>container set up beforehand</b>. <b>No extra time</b> is given if it isn't &mdash; that time comes out of your slot.</td></tr>
      <tr><td><b>Redo policy</b></td><td>You can retake it during <b>office hours the following week</b>, but a redo caps out at a <b>maximum score of 80/100</b>.</td></tr>
    </table>
    <div class="warn"><b>The practical format changes what "studying" means.</b> A quiz rewards recognizing
    the right answer among choices; a checkoff rewards <b>typing the right command from a spoken/written
    spec, under a TA's eyes, with no menu of options in front of you.</b> That is exactly why the Drill tab
    below leans heavily on fill-in-the-blank questions where you type the actual command &mdash; that's the
    closest this guide can get to checkoff conditions.</div>
  </div>
</section>

<!-- ============ WALKTHROUGH ============ -->
<section class="topic" id="l6-walk">
  <h2>Walkthrough &middot; Worked Through the Sample Checkoff's 24 Tasks</h2>
  <div class="concept">Each group below is a cluster of tasks from the released sample that test the <b>same
  underlying idea</b>. Read the task, then the command, then <i>why</i> that command/flag/operator is the one
  that's correct &mdash; that reasoning is what transfers to a checkoff with different specifics.</div>

  <h3>1&ndash;3 &middot; Getting oriented and cloning</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>1. Confirm you're in <code>/mnt/learncli/workdir</code></td><td><code>pwd</code></td></tr>
      <tr><td>2. Clone the checkoff repo</td><td><code>git clone https://github.com/COMP211-McMahon/cli-checkoff-practice.git</code></td></tr>
      <tr><td>3. Move into the cloned directory</td><td><code>cd cli-checkoff-practice</code></td></tr>
    </table>
    <p class="muted"><code>pwd</code> (print working directory) is the reflex you should have <i>before</i>
    doing anything else in a checkoff &mdash; it costs one second and prevents you from running every
    subsequent command from the wrong place. <code>git clone &lt;url&gt;</code> downloads the repo into a new
    directory named after the repo itself (here, <code>cli-checkoff-practice</code>) &mdash; you don't create
    that directory yourself, <code>git clone</code> does. Then <code>cd</code> into it like any other
    directory.</p>
  </div>

  <h3>4&ndash;5 &middot; Creating a file vs. appending to it</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>4. Create <code>student.txt</code> containing exactly <code>CLI practical ready</code></td><td><code>echo "CLI practical ready" &gt; student.txt</code></td></tr>
      <tr><td>5. Append your name to the end of the file</td><td><code>echo "[Your name]" &gt;&gt; student.txt</code></td></tr>
    </table>
    <div class="concept"><b><code>&gt;</code> overwrites/creates; <code>&gt;&gt;</code> appends.</b> Task 4
    uses <code>&gt;</code> because the file doesn't exist yet (or you're fine replacing it). Task 5 <b>must</b>
    use <code>&gt;&gt;</code> &mdash; using <code>&gt;</code> here would silently <b>destroy</b> the line from
    task 4 and replace the file with just your name. This single character is the most common way students
    lose data on a checkoff without any error message telling them so.</div>
  </div>

  <h3>6 &middot; Compiling with <code>-o</code></h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>Compile <code>io_demo.c</code> as <code>io_demo</code></td><td><code>gcc io_demo.c -o io_demo</code></td></tr>
      <tr><td>Compile <code>classify.c</code> as <code>classify</code></td><td><code>gcc -o classify classify.c</code></td></tr>
    </table>
    <p class="muted">Both compile successfully &mdash; the two examples are deliberately written in opposite
    orders to make the point: <code>-o &lt;name&gt;</code> can appear <b>before or after</b> the source file,
    but the executable name must <b>immediately follow</b> <code>-o</code>. Forgetting <code>-o</code>
    entirely leaves you with the default name <code>a.out</code>, which still runs fine but doesn't satisfy a
    task that names a specific executable.</p>
  </div>

  <h3>7a&ndash;7c &middot; The three redirection operators</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>7a. stdin from <code>sample_input.txt</code>, stdout to terminal</td><td><code>./io_demo &lt; sample_input.txt</code></td></tr>
      <tr><td>7b. stdin typed interactively, stdout to <code>output.txt</code></td><td><code>./io_demo &gt; output.txt</code> &nbsp;(or <code>1&gt; output.txt</code>), then type lines, then <b>Ctrl+D</b> (macOS/Linux) or <b>Ctrl+Z</b> (Windows) for EOF</td></tr>
      <tr><td>7c. stdin from <code>numbers.txt</code>, stdout to <code>positive.txt</code>, stderr to <code>errors.txt</code></td><td><code>./classify &lt; numbers.txt &gt; positive.txt 2&gt; errors.txt</code></td></tr>
    </table>
    <div class="concept">Three streams, three operators, and they compose: <b><code>&lt;</code></b> redirects
    <b>stdin</b> (fd 0), <b><code>&gt;</code></b> redirects <b>stdout</b> (fd 1), <b><code>2&gt;</code></b>
    redirects <b>stderr</b> (fd 2). <b>The order of the redirections after the command doesn't matter</b>
    &mdash; <code>./classify &gt; positive.txt &lt; numbers.txt 2&gt; errors.txt</code> works identically. What
    matters is that <b>each stream gets its own operator</b>: you cannot combine stdout and stderr into one
    <code>&gt;</code>. Note also there is <b>no space</b> between the file-descriptor number and the operator
    &mdash; it's <code>2&gt;</code>, not <code>2 &gt;</code> (a space there is a syntax error).</div>
  </div>

  <h3>8&ndash;9 &middot; Viewing output and command history</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>8. Display <code>output.txt</code>, <code>positive.txt</code>, <code>errors.txt</code></td><td><code>cat output.txt</code>, <code>cat positive.txt</code>, <code>cat errors.txt</code></td></tr>
      <tr><td>9. Re-run the previous command without retyping it</td><td>press <b>&uarr; (Up arrow)</b>, then <b>Enter</b></td></tr>
    </table>
    <p class="muted">The shell keeps a <b>command history</b> you can walk back through with the Up/Down
    arrows &mdash; this is worth demonstrating explicitly if a TA asks you to "run that again," since retyping
    a long command is slower and more error-prone than recalling it.</p>
  </div>

  <h3>10&ndash;12 &middot; Combining pipes and redirects</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>10. Read <code>sample_input.txt</code> into <code>io_demo</code>, its stdout to <code>piped_output.txt</code>, then display it</td><td><code>cat sample_input.txt | ./io_demo &gt; piped_output.txt</code>, then <code>cat piped_output.txt</code></td></tr>
      <tr><td>11. Read <code>sample_input.txt</code> &rarr; <code>io_demo</code> &rarr; a line-counting command &rarr; terminal</td><td><code>cat sample_input.txt | ./io_demo | wc -l</code></td></tr>
      <tr><td>12. <code>numbers.txt</code> &rarr; <code>io_demo</code> &rarr; <code>classify</code> &rarr; terminal</td><td><code>./io_demo &lt; numbers.txt | ./classify</code></td></tr>
    </table>
    <div class="concept">A <b>pipe (<code>|</code>)</b> connects one <b>running program's</b> stdout directly
    to another running program's stdin &mdash; no intermediate file. Task 11 shows pipes <b>chain</b>: as many
    <code>|</code> as there are hand-offs between programs (<code>wc -l</code> counts lines).
    <br><br><b>Task 12 is the one students most often get wrong.</b> The instinct is "three things are
    connected, so use two pipes" &mdash; but <code>numbers.txt</code> is a <b>file</b>, not a running program,
    so it cannot sit on the left of a pipe. The first hop must be a <b>redirect</b> (<code>&lt;</code>) because
    a file is feeding a program; the second hop is a <b>pipe</b> (<code>|</code>) because one running program
    is feeding another. Mixing operator types on purpose, based on what's actually on each side, is the
    skill being tested.</div>
  </div>

  <h3>13&ndash;16 &middot; Building a directory tree, then verifying it</h3>
  <div class="card">
    <p>Task 13 asks for this structure, built with directory/file-creation commands only (no text editor):</p>
<pre>cli_lab/
&#9500;&#9472;&#9472; docs/
&#9474;   &#9500;&#9472;&#9472; notes.txt
&#9474;   &#9492;&#9472;&#9472; drafts/
&#9474;       &#9492;&#9472;&#9472; outline.txt
&#9500;&#9472;&#9472; data/
&#9474;   &#9500;&#9472;&#9472; raw/
&#9474;   &#9474;   &#9492;&#9472;&#9472; input.csv
&#9474;   &#9492;&#9472;&#9472; processed/
&#9492;&#9472;&#9472; archive/
    &#9492;&#9472;&#9472; old.txt</pre>
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>13. Build the tree (dirs, then files)</td><td><code>mkdir -p cli_lab/docs/drafts cli_lab/data/raw cli_lab/data/processed cli_lab/archive</code><br><code>touch cli_lab/docs/notes.txt cli_lab/docs/drafts/outline.txt cli_lab/data/raw/input.csv cli_lab/archive/old.txt</code></td></tr>
      <tr><td>14. Return to the checkoff dir with an <b>absolute</b> path</td><td><code>cd /mnt/learncli/workdir/cli-checkoff-practice</code></td></tr>
      <tr><td>15. Verify the tree structure</td><td><code>tree cli_lab</code></td></tr>
      <tr><td>16. Clear the screen</td><td><code>clear</code></td></tr>
    </table>
    <div class="concept"><b><code>mkdir -p</code></b> creates every missing directory in a nested path <i>in
    one shot</i> &mdash; without <code>-p</code>, <code>mkdir cli_lab/docs/drafts</code> would fail unless
    <code>cli_lab/docs</code> already existed. It also doesn't error if a directory already exists, which
    makes it safe to re-run. <b><code>touch</code></b> creates any number of empty files in a single call
    &mdash; no editor needed, which is exactly what the task requires. <b><code>tree</code></b> is the command
    that visually confirms a directory structure at a glance, which is why it's the answer to "which command
    verifies this."</div>
  </div>

  <h3>17&ndash;19 &middot; Hidden files</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>17. Display contents of <code>cli_lab/docs</code></td><td><code>ls cli_lab/docs</code></td></tr>
      <tr><td>18. Create a hidden empty file <code>.review</code> in <code>cli_lab/docs</code></td><td><code>touch cli_lab/docs/.review</code></td></tr>
      <tr><td>19. Re-run step 17 &mdash; is <code>.review</code> visible?</td><td><b>No</b> with plain <code>ls</code>; visible with <code>ls -a cli_lab/docs</code></td></tr>
    </table>
    <div class="concept">A filename starting with <b><code>.</code></b> is hidden <b>by convention</b>, and
    plain <code>ls</code> omits it. It isn't invisible or special-cased by the filesystem &mdash; it's just
    that <code>ls</code>'s default behavior skips anything starting with a dot. <b><code>-a</code></b>
    ("all") tells <code>ls</code> to include hidden entries, plus the always-present <code>.</code> (current
    dir) and <code>..</code> (parent dir) entries.</div>
  </div>

  <h3>20&ndash;23 &middot; Relative vs. absolute paths in <code>cp</code>/<code>mv</code></h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>20. <code>cd</code> into <code>cli_lab/data/processed</code></td><td><code>cd cli_lab/data/processed</code></td></tr>
      <tr><td>21. From there, copy <code>cli_lab/docs/notes.txt</code> into the current dir, both paths <b>relative</b></td><td><code>cp ../../docs/notes.txt .</code></td></tr>
      <tr><td>22. Move <code>cli_lab/archive/old.txt</code> into <code>cli_lab/data/raw/</code>, both paths <b>absolute</b></td><td><code>mv /mnt/learncli/workdir/cli-checkoff-practice/cli_lab/archive/old.txt /mnt/learncli/workdir/cli-checkoff-practice/cli_lab/data/raw/</code></td></tr>
      <tr><td>23. Copy all of <code>cli_lab/docs</code> to a new <code>cli_lab/docs_backup</code></td><td><code>cp -r cli_lab/docs cli_lab/docs_backup</code></td></tr>
    </table>
    <div class="concept">From <code>cli_lab/data/processed</code>, <b><code>../../</code></b> walks up two
    levels back to <code>cli_lab</code>, then <code>docs/notes.txt</code> reaches the file &mdash;
    <code>..</code> means "parent directory," stacked once per level. The destination <b><code>.</code></b>
    means "the current directory, keep the same filename." Task 22 does the identical move with <b>absolute</b>
    paths instead &mdash; slower to type, but unambiguous regardless of where you currently are.
    <br><br>Task 23 needs <b><code>-r</code></b> (recursive) because <code>cp</code> on a bare directory
    <b>errors out</b> by default &mdash; a directory isn't a single file <code>cp</code> knows how to copy
    without being told to descend into it and copy everything inside, recursively.</div>
  </div>

  <h3>24 &middot; Cleaning up &mdash; <code>rm -rf</code></h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Task</th><th>Command</th></tr>
      <tr><td>Remove the checkoff directory and everything in it</td><td><code>cd ..</code> then <code>rm -rf cli-checkoff-practice</code></td></tr>
    </table>
    <div class="danger"><b><code>-r</code></b> (recursive) is required to remove a directory and its
    contents; <b><code>-f</code></b> (force) suppresses the "are you sure?" prompts for every file inside.
    Together, <code>rm -rf</code> is <b>irreversible</b> &mdash; there is no trash can, no undo. You must
    <code>cd ..</code> <i>out of</i> the directory first (you can't remove your current working directory out
    from under yourself), and you should always double-check <code>pwd</code>/the path before pressing enter
    &mdash; especially that you are not accidentally one level up or down from where you think you are.</div>
  </div>
</section>

<!-- ============ DRILL ============ -->
<section class="topic" id="l6-drill">
  <h2>Drill &middot; Fresh Practice, Same Style</h2>
  <div class="concept">Same command families as the sample checkoff, <b>different filenames and paths</b> so
  this isn't just recall of the walkthrough above. Most of these ask you to <b>type the actual command</b>
  &mdash; the closest thing to checkoff conditions this guide can offer. Multiple valid phrasings of a command
  are all accepted (e.g. <code>-o</code> before or after the source file).</div>

  <div class="card">
    <h3 style="margin-top:0">Setup and navigation</h3>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span><code>pwd</code> prints your current working directory.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True &mdash; and it's the first command worth running in any checkoff, before anything else.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Clone <code>https://github.com/COMP211-McMahon/cli-warmup.git</code>.</div>
      <input class="fillblank" data-answer="git clone https://github.com/COMP211-McMahon/cli-warmup.git">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>git clone &lt;url&gt;</code> downloads the repo into a new directory named after it &mdash; here, <code>cli-warmup</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Move into the directory that clone just created.</div>
      <input class="fillblank sm" data-answer="cd cli-warmup">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>cd cli-warmup</code> &mdash; the directory name matches the repo name, not the URL.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Creating vs. appending</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Create <code>feed.txt</code> containing exactly the line <code>warmup ready</code>.</div>
      <input class="fillblank" data-answer="echo &quot;warmup ready&quot; &gt; feed.txt~~~echo 'warmup ready' &gt; feed.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>&gt;</code> creates the file (or overwrites it if it exists) with exactly that content.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Now <b>append</b> the line <code>ready for review</code> to the end of <code>feed.txt</code> &mdash; without destroying what's already there.</div>
      <input class="fillblank" data-answer="echo &quot;ready for review&quot; &gt;&gt; feed.txt~~~echo 'ready for review' &gt;&gt; feed.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>&gt;&gt;</code> appends. Using <code>&gt;</code> here would erase <code>warmup ready</code> entirely.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You meant to append a line to <code>log.txt</code> but typed <code>&gt;</code> instead of <code>&gt;&gt;</code>. What happens?</div>
      <button class="opt" data-i="0">Nothing &mdash; the shell warns you and refuses</button>
      <button class="opt" data-i="1"><code>log.txt</code> is overwritten with only the new line; everything previously in it is gone</button>
      <button class="opt" data-i="2">The new line is added to the end, same as <code>&gt;&gt;</code></button>
      <button class="opt" data-i="3">A syntax error is printed</button>
      <div class="fb">Silently destructive. <code>&gt;</code> truncates the file to zero length first, then writes &mdash; there's no confirmation prompt.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Compiling with <code>-o</code></h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Compile <code>tally.c</code> into an executable named <code>tally</code> (source before the flag).</div>
      <input class="fillblank" data-answer="gcc tally.c -o tally">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The name must immediately follow <code>-o</code>; the source file's position relative to that pair is flexible.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Compile <code>parser.c</code> into an executable named <code>parser</code> (flag before the source this time).</div>
      <input class="fillblank" data-answer="gcc -o parser parser.c">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Same result as the previous question, different ordering &mdash; both are correct <code>gcc</code> usage.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>gcc -o tally.c tally</code> compiles <code>tally.c</code> into an executable named <code>tally</code>.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; this has it backwards. It would try to name the executable <code>tally.c</code> (overwriting your source file!) and treat <code>tally</code> as the source, which doesn't exist. The name always comes <i>immediately after</i> <code>-o</code>.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">The three redirection operators</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Run <code>./tally</code> with stdin coming from <code>data.txt</code>, stdout still going to the terminal.</div>
      <input class="fillblank" data-answer="./tally &lt; data.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>&lt;</code> redirects stdin (fd 0) only &mdash; stdout is untouched.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Run <code>./parser</code> with stdin from <code>data.txt</code>, stdout to <code>good.txt</code>, and stderr to <code>bad.txt</code>.</div>
      <input class="fillblank" data-answer="./parser &lt; data.txt &gt; good.txt 2&gt; bad.txt~~~./parser &gt; good.txt &lt; data.txt 2&gt; bad.txt~~~./parser 2&gt; bad.txt &lt; data.txt &gt; good.txt~~~./parser &lt; data.txt 2&gt; bad.txt &gt; good.txt~~~./parser &gt; good.txt 2&gt; bad.txt &lt; data.txt~~~./parser 2&gt; bad.txt &gt; good.txt &lt; data.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">All six orderings of <code>&lt; data.txt</code>, <code>&gt; good.txt</code>, <code>2&gt; bad.txt</code> are equivalent &mdash; order among redirections doesn't matter, only which operator pairs with which stream.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>./parser 2 &gt; bad.txt</code> (with a space before <code>&gt;</code>) correctly redirects stderr to <code>bad.txt</code>.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. That space breaks it into two separate things: stdout redirected to <code>bad.txt</code>, plus the bare word <code>2</code> passed as an <b>argument</b> to <code>parser</code>. It must be <code>2&gt;</code> with no space.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">History recall</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Display the contents of <code>good.txt</code>.</div>
      <input class="fillblank sm" data-answer="cat good.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>cat</code> prints a file's contents straight to the terminal.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>A TA asks you to run that exact same <code>cat good.txt</code> again, without retyping it. What do you do?</div>
      <button class="opt" data-i="0">Type <code>cat good.txt</code> again</button>
      <button class="opt" data-i="1">Press the Up arrow to recall it from history, then Enter</button>
      <button class="opt" data-i="2">Run <code>history cat good.txt</code></button>
      <button class="opt" data-i="3">There is no way to do this</button>
      <div class="fb">The Up arrow walks back through your shell's command history one entry at a time; Enter runs whatever's recalled.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Pipes, and pipes combined with redirects</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>One command: read <code>data.txt</code>, pipe it into <code>./tally</code>, and send <code>tally</code>'s stdout to <code>piped.txt</code>.</div>
      <input class="fillblank" data-answer="cat data.txt | ./tally &gt; piped.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">One line combining a pipe and a redirect: <code>cat</code> feeds <code>tally</code> via <code>|</code>; <code>tally</code>'s own stdout is separately redirected with <code>&gt;</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>One command: <code>data.txt</code> &rarr; <code>./tally</code> &rarr; a line-counting command &rarr; printed to the terminal.</div>
      <input class="fillblank" data-answer="cat data.txt | ./tally | wc -l">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Two pipes chained: <code>cat</code> to <code>tally</code>, <code>tally</code> to <code>wc -l</code>. Nothing here is a file after the first hop, so both connectors are <code>|</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>One command: <code>numbers.txt</code> is <code>./tally</code>'s input; <code>tally</code>'s stdout feeds <code>./parser</code>; <code>parser</code>'s output goes to the terminal.</div>
      <input class="fillblank" data-answer="./tally &lt; numbers.txt | ./parser">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>numbers.txt</code> is a <b>file</b>, so the first hop must be <code>&lt;</code>, not a pipe. Only the hop from one <i>running program</i> to another (<code>tally</code> &rarr; <code>parser</code>) is a <code>|</code>.</div>
    </div>
    <div class="q" data-multi="1,2">
      <div class="prompt"><span class="tag">Multiple select</span><code>scores.txt</code> should feed <code>./tally</code>, whose output should feed <code>./parser</code>, printing to the terminal. Which command(s) achieve this correctly?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> <code>./tally | scores.txt | ./parser</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>./tally &lt; scores.txt | ./parser</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> <code>cat scores.txt | ./tally | ./parser</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> <code>./tally | ./parser &lt; scores.txt</code></span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>B and C.</b> <b>A</b> tries to pipe a file as if it were a running program &mdash; <code>scores.txt</code> can never sit between two <code>|</code>. <b>B</b> redirects the file into <code>tally</code>'s stdin, then pipes <code>tally</code>'s output into <code>parser</code>: correct. <b>C</b> uses <code>cat</code> to turn the file into a stream first, then two pipes: also correct, just one extra process. <b>D</b> feeds <code>scores.txt</code> into <code>parser</code>'s stdin instead of <code>tally</code>'s &mdash; wrong program gets the file.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0"><code>mkdir -p</code> and <code>touch</code> fluency</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>In one command, create the nested directories <code>project/src</code>, <code>project/bin</code>, and <code>project/docs/drafts</code> (parents included), without an editor.</div>
      <input class="fillblank" data-answer="mkdir -p project/src project/bin project/docs/drafts">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>-p</code> creates every missing parent directory along each path in one call, and doesn't error if a directory already exists.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>In one command, create empty files <code>project/src/main.c</code> and <code>project/docs/readme.txt</code>.</div>
      <input class="fillblank" data-answer="touch project/src/main.c project/docs/readme.txt">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>touch</code> accepts multiple filenames in one call &mdash; no loop or separate commands needed.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>mkdir project/docs/drafts</code> succeeds even if <code>project/docs</code> doesn't exist yet, as long as you don't use <code>-p</code>.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; plain <code>mkdir</code> refuses to create a directory whose parent doesn't already exist. That's precisely what <code>-p</code> is for.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Absolute vs. relative paths</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>You're inside <code>cli-warmup</code>, cloned into <code>/mnt/learncli/workdir</code>. Return to it using an <b>absolute</b> path.</div>
      <input class="fillblank" data-answer="cd /mnt/learncli/workdir/cli-warmup">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">An absolute path always starts from <code>/</code> and works no matter where you currently are &mdash; unlike a relative path, which depends on your current directory.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Which command verifies a directory structure at a glance? Run it on <code>project</code>.</div>
      <input class="fillblank sm" data-answer="tree project">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>tree</code> prints the nested structure visually; <code>ls</code> alone only shows one level.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Clear the terminal screen.</div>
      <input class="fillblank sm" data-answer="clear">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>clear</code> wipes the visible screen; it does not erase your command history.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Hidden files</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Create a hidden empty file named <code>.cache</code> inside <code>project/docs</code>.</div>
      <input class="fillblank" data-answer="touch project/docs/.cache">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A leading <code>.</code> in the filename is what makes it hidden by convention &mdash; <code>touch</code> creates it exactly like any other file.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Plain <code>ls project/docs</code> will list <code>.cache</code> alongside the other files.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; <code>ls</code> omits dotfiles by default. Add <code>-a</code> to see them.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>List the contents of <code>project/docs</code> including hidden files.</div>
      <input class="fillblank" data-answer="ls -a project/docs">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>-a</code> ("all") shows dotfiles too, plus <code>.</code> and <code>..</code>.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0"><code>cp</code>, <code>mv</code>, and <code>cp -r</code></h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>You're inside <code>project/bin</code>. Copy <code>project/docs/readme.txt</code> into the current directory, using <b>relative</b> paths for both source and destination.</div>
      <input class="fillblank" data-answer="cp ../docs/readme.txt .">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">One <code>..</code> climbs from <code>bin</code> back up to <code>project</code>, then <code>docs/readme.txt</code> reaches the file. <code>.</code> as the destination means "here, same filename."</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>You run <code>cp project/docs project/backup_docs</code> and <code>project/docs</code> is a directory. What happens?</div>
      <button class="opt" data-i="0">It copies the directory and everything inside it, same as with <code>-r</code></button>
      <button class="opt" data-i="1"><code>cp</code> errors out &mdash; it refuses to copy a directory without <code>-r</code></button>
      <button class="opt" data-i="2">It creates an empty directory named <code>backup_docs</code></button>
      <button class="opt" data-i="3">It silently does nothing</button>
      <div class="fb">Plain <code>cp</code> only copies files. Given a directory, it reports an error (something like "omitting directory") rather than guessing what you meant.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Copy the entire <code>project/docs</code> directory (and everything inside it) to a new <code>project/docs_backup</code>.</div>
      <input class="fillblank" data-answer="cp -r project/docs project/docs_backup">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>-r</code> (recursive) tells <code>cp</code> to descend into the directory and copy every file and subdirectory inside it.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Move <code>project/src/main.c</code> into <code>project/bin/</code>, using <b>absolute</b> paths, assuming the checkoff directory is <code>/mnt/learncli/workdir/cli-warmup</code>.</div>
      <input class="fillblank" data-answer="mv /mnt/learncli/workdir/cli-warmup/project/src/main.c /mnt/learncli/workdir/cli-warmup/project/bin/">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>mv</code> both renames and relocates &mdash; here it's a pure relocation. Absolute paths work regardless of your current directory, at the cost of more typing.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Cleanup &mdash; <code>rm -rf</code> and its danger</h3>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>You're inside <code>cli-warmup</code>. Step out of it, then remove the <code>cli-warmup</code> directory and everything inside it.</div>
      <input class="fillblank" data-answer="cd .. &amp;&amp; rm -rf cli-warmup~~~cd ..; rm -rf cli-warmup">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">You can't remove your own current working directory, so <code>cd ..</code> first. <code>-r</code> handles the directory's contents; <code>-f</code> suppresses per-file confirmation prompts.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>If <code>rm -rf</code> deletes the wrong directory, you can recover the files from a trash or recycle bin.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. The command-line <code>rm</code> has <b>no trash and no undo</b> &mdash; deleted means gone. That's exactly why you double-check <code>pwd</code> and the target path before running it.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What do the two flags in <code>rm -rf</code> individually do?</div>
      <button class="opt" data-i="0">Both mean "force" &mdash; it's redundant</button>
      <button class="opt" data-i="1"><code>-r</code> forces deletion, <code>-f</code> makes it recursive</button>
      <button class="opt" data-i="2"><code>-r</code> makes it recursive (needed for a directory's contents), <code>-f</code> forces it (suppresses confirmation prompts)</button>
      <button class="opt" data-i="3">They only matter for files, not directories</button>
      <div class="fb"><code>-r</code>/recursive and <code>-f</code>/force do genuinely different jobs, and both are usually needed together to remove a non-empty directory without being prompted file by file.</div>
    </div>
  </div>
</section>

<!-- ============ COMMON MISTAKES ============ -->
<section class="topic" id="l6-mistakes">
  <h2>Common Mistakes on the CLI Checkoff</h2>
  <div class="concept">These are the errors that show up over and over &mdash; not because the commands are
  obscure, but because they look almost right. Read this tab right before your checkoff slot.</div>

  <div class="card">
    <div class="danger">
      <b>1. Forgetting <code>-r</code> on <code>cp</code> or <code>rm</code> for a directory.</b><br>
      Plain <code>cp</code> refuses to copy a directory; plain <code>rm</code> refuses to remove one. Both
      need <code>-r</code> to descend into it. For <code>rm</code>, you'll usually pair it with <code>-f</code>
      too, to skip per-file confirmation prompts.
    </div>
    <div class="danger">
      <b>2. Confusing <code>&gt;</code> (overwrite) with <code>&gt;&gt;</code> (append) and losing data.</b><br>
      <code>&gt;</code> truncates the target file to empty <i>before</i> writing &mdash; with no warning.
      If you meant to add a line without disturbing what's already there, you needed <code>&gt;&gt;</code>.
      There's no undo for this one either.
    </div>
    <div class="danger">
      <b>3. Getting the redirection syntax wrong.</b><br>
      The <b>order</b> of <code>&lt;</code>, <code>&gt;</code>, and <code>2&gt;</code> after a command doesn't
      matter &mdash; but the <b>stream number must sit directly against the operator with no space</b>.
      <code>2&gt;</code> is correct; <code>2 &gt;</code> is not (the shell reads that as "redirect stdout, and
      also pass the argument <code>2</code>").
    </div>
    <div class="danger">
      <b>4. Trying to use two pipes when one side is actually a file.</b><br>
      A pipe (<code>|</code>) can only connect two <b>running programs</b>. If the thing on one end is a
      <code>.txt</code> or <code>.csv</code> sitting on disk, that hop needs <code>&lt;</code> (or
      <code>&gt;</code>), not <code>|</code>. Watch for tasks that name a file as the very first or very last
      thing in the chain.
    </div>
    <div class="danger">
      <b>5. Running <code>rm -rf</code> from the wrong directory.</b><br>
      Because there's no trash and no confirmation once <code>-f</code> is set, a <code>pwd</code> right
      before an <code>rm -rf</code> &mdash; and reading the path in the command one more time &mdash; is cheap
      insurance against deleting the wrong tree entirely.
    </div>
  </div>
</section>

</main>`;
