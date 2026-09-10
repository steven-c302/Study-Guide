/* ============================================================
   HW00 · Unix Basics
   LESSON 9 — HW00 completed-quiz review (58/58). Covers file
   system commands, paths & navigating, copying/moving/removing,
   path-tracing practice, and a brief source-to-machine-code recap.
   Injects into #l9. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l9').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l9-fscmds')">1 &middot; File System Commands</button>
  <button onclick="showTopic(this,'l9-paths')">2 &middot; Paths &amp; Navigating</button>
  <button onclick="showTopic(this,'l9-cpmvrm')">3 &middot; Copying, Moving, Removing</button>
  <button onclick="showTopic(this,'l9-trace')">4 &middot; Practice: Trace the Path</button>
  <button onclick="showTopic(this,'l9-compile')">5 &middot; Source Code to Machine Code</button>
</nav>
<main>

<!-- ============ FILE SYSTEM COMMANDS ============ -->
<section class="topic active" id="l9-fscmds">
  <h2>HW00 &middot; File System Commands</h2>

  <div class="concept">The <b>current working directory (cwd)</b> is the directory you are "standing in"
  right now. Almost every command that takes a path is interpreted <b>relative to the cwd</b> unless you give
  it a path that starts with <code>/</code>. When you create a new file without specifying a path, it is
  created <b>in the cwd</b> by default.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Command</th><th>What it does</th></tr>
      <tr><td><code>cd &lt;dir&gt;</code></td><td>Changes the current working directory — the whole purpose of <code>cd</code> is to move you around the file system</td></tr>
      <tr><td><code>ls</code></td><td>Lists the contents (files and subdirectories) of a directory</td></tr>
      <tr><td><code>mkdir &lt;dir&gt;</code></td><td>Creates a new, empty directory</td></tr>
      <tr><td><code>cat &lt;file&gt;</code></td><td>Displays a file's contents in the terminal</td></tr>
      <tr><td><code>&gt;&gt;</code></td><td>Append-redirect: sends a command's output onto the <b>end</b> of a file, without erasing what was already there</td></tr>
    </table>
    <p class="muted">Example of <code>&gt;&gt;</code>: <code>echo "cd: change directory" &gt;&gt; basics</code> appends
    the line <code>cd: change directory</code> to the end of the file named <code>basics</code> — it does not
    overwrite the file, and it does not print the file's contents (that's what <code>cat basics</code> is for).</p>
  </div>

  <h3>Naming files</h3>
  <div class="card">
    <p>Unix file names are <b>case-sensitive</b>: <code>Notes.txt</code> and <code>notes.txt</code> are two
    different files. Spaces in file names are <b>discouraged</b> — the shell treats a space as an argument
    separator, so a space inside a name has to be escaped (or quoted) every single time you refer to the file,
    which is inconvenient. A file literally named <code>hello there</code> must be written
    <code>hello\ there</code> on the command line so the shell treats it as one argument instead of two.</p>
    <div class="concept">The Unix-y way to sidestep the whole problem is to just not use spaces: name the file
    <code>hello_there</code> (underscore in place of the space) instead of <code>hello there</code>.</div>
  </div>

  <h3>Parents, quickly</h3>
  <div class="card">
    <p>The <b>parent</b> of a directory is exactly one level up. The parent of
    <code>/home/sam/classes/CS31</code> is <code>/home/sam/classes</code> — drop the last path component and
    that's the parent.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the &quot;current working directory&quot; (cwd)?</div>
      <button class="opt" data-i="0">The directory where all your programs are installed</button>
      <button class="opt" data-i="1">The directory you are currently in — the one most commands are relative to</button>
      <button class="opt" data-i="2">Your home directory, always</button>
      <button class="opt" data-i="3">The root directory <code>/</code></button>
      <div class="fb">The cwd is wherever you currently "are" in the file system. It changes as you
      <code>cd</code> around, and it is not always your home directory.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>If you create a new file without giving a path, where does it end up?</div>
      <button class="opt" data-i="0">In the current working directory</button>
      <button class="opt" data-i="1">In your home directory, no matter where you are</button>
      <button class="opt" data-i="2">In the root directory</button>
      <button class="opt" data-i="3">Wherever the file was last saved before</button>
      <div class="fb">By default, everything without an explicit path is created and interpreted <b>relative
      to the cwd</b>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does the command <code>echo "cd: change directory" &gt;&gt; basics</code> do?</div>
      <button class="opt" data-i="0">Prints the contents of the file <code>basics</code> to the screen</button>
      <button class="opt" data-i="1">Appends the line <code>cd: change directory</code> to the end of the file <code>basics</code></button>
      <button class="opt" data-i="2">Overwrites <code>basics</code> so it contains only that one line</button>
      <button class="opt" data-i="3">Creates a directory named <code>basics</code></button>
      <div class="fb"><code>&gt;&gt;</code> is <b>append redirect</b> — it adds the output onto the end of the
      file, preserving what was already there. (A single <code>&gt;</code>, by contrast, would overwrite it.)</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>Unix file names are case-sensitive, so <code>notes.txt</code> and <code>Notes.txt</code> are two different files.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True. Unlike some other operating systems, Unix treats letter case as significant in
      file names.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the correct way to refer to a file literally named <code>hello there</code> on the command line?</div>
      <button class="opt" data-i="0"><code>hello there</code></button>
      <button class="opt" data-i="1"><code>"hello"there"</code></button>
      <button class="opt" data-i="2"><code>hello\\ there</code></button>
      <button class="opt" data-i="3"><code>hello-there</code></button>
      <div class="fb">The space must be <b>escaped</b> with a backslash so the shell treats
      <code>hello there</code> as a single argument rather than two separate words.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which file name follows common Unix naming conventions for avoiding the &quot;hello there&quot; problem?</div>
      <button class="opt" data-i="0"><code>hello there</code></button>
      <button class="opt" data-i="1"><code>hello\\ there</code></button>
      <button class="opt" data-i="2"><code>hello_there</code></button>
      <button class="opt" data-i="3"><code>HELLO THERE</code></button>
      <div class="fb">Using an underscore instead of a space (<code>hello_there</code>) avoids the escaping
      problem entirely — no backslashes or quoting needed to reference it.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>The parent directory of <code>/home/sam/classes/CS31</code> is
      <input type="text" class="fillblank" data-answer="/home/sam/classes"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Drop the last path component (<code>CS31</code>) and what remains,
      <code>/home/sam/classes</code>, is the parent.</div>
    </div>
  </div>
</section>

<!-- ============ PATHS & NAVIGATING ============ -->
<section class="topic" id="l9-paths">
  <h2>HW00 &middot; Paths &amp; Navigating</h2>

  <div class="two">
    <div class="card">
      <h3 style="margin-top:0">Absolute path</h3>
      <p>Starts from the <b>root directory</b> — recognizable by the leading <code>/</code>. Means the same
      thing no matter where you currently are standing.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Relative path</h3>
      <p>Starts from the <b>current working directory</b> — no leading <code>/</code>. An example:
      <code>courses/CS31</code>.</p>
    </div>
  </div>

  <div class="card">
    <div class="concept">Relative paths are generally <b>preferred</b> in everyday use because they are
    shorter and easier to type — you don't have to spell out the entire path from the root every time,
    just the part that gets you from here to there.</div>
  </div>

  <h3>Navigating commands, no arguments</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Command</th><th>With no arguments</th></tr>
      <tr><td><code>cd</code></td><td>Moves you to your <b>home directory</b></td></tr>
      <tr><td><code>ls</code></td><td>Lists the contents of the <b>current working directory</b></td></tr>
    </table>
  </div>

  <h3>Trace it</h3>
  <div class="card">
    <p>Starting cwd: <code>/home/sam</code>. Run <code>cd courses/comp211</code> (a relative path).</p>
<pre>$ pwd
/home/sam
$ cd courses/comp211
$ pwd
/home/sam/courses/comp211</pre>
    <p class="muted">The relative path <code>courses/comp211</code> is tacked onto the cwd you started from —
    you end up at <code>/home/sam/courses/comp211</code>.</p>
  </div>

  <h3><code>.</code>, <code>..</code>, and <code>~</code></h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Symbol</th><th>Means</th></tr>
      <tr><td><code>.</code></td><td>The <b>current</b> directory</td></tr>
      <tr><td><code>..</code></td><td>The <b>parent</b> directory</td></tr>
      <tr><td><code>ls -a</code></td><td>Lists <b>hidden</b> entries too — including <code>.</code> and <code>..</code> themselves, which every directory has</td></tr>
      <tr><td><code>~</code></td><td>The <b>current user's</b> home directory</td></tr>
      <tr><td><code>~sarita</code></td><td><b>Sarita's</b> home directory — NOT the current user's</td></tr>
    </table>
    <div class="concept"><code>~username</code> always refers to that named user's home directory, regardless
    of who you are. Plain <code>~</code> with no name refers to <i>your own</i> home directory.</div>
  </div>

  <h3>Trace it again</h3>
  <div class="card">
    <p>Starting cwd: <code>/home/sam/classes/CS31</code>. Run <code>cd ..</code>.</p>
<pre>$ pwd
/home/sam/classes/CS31
$ cd ..
$ pwd
/home/sam/classes</pre>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>What does an absolute path start from?</div>
      <button class="opt" data-i="0">The root directory <code>/</code></button>
      <button class="opt" data-i="1">The current working directory</button>
      <button class="opt" data-i="2">The home directory</button>
      <button class="opt" data-i="3">Wherever the shell was last invoked</button>
      <div class="fb">Absolute paths always start at the <b>root</b>, which is why they mean the same thing
      regardless of your cwd.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which of the following is an example of a <b>relative</b> path?</div>
      <button class="opt" data-i="0"><code>/home/sam/courses/CS31</code></button>
      <button class="opt" data-i="1"><code>courses/CS31</code></button>
      <button class="opt" data-i="2"><code>/</code></button>
      <button class="opt" data-i="3"><code>/courses/CS31</code></button>
      <div class="fb">No leading <code>/</code> means it's interpreted relative to wherever you currently
      are &mdash; <code>courses/CS31</code>.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Why are relative paths often preferred?</div>
      <button class="opt" data-i="0">They are typically shorter and easier to type</button>
      <button class="opt" data-i="1">They always work no matter where you are</button>
      <button class="opt" data-i="2">They are required by <code>cd</code></button>
      <button class="opt" data-i="3">Absolute paths don't work on most systems</button>
      <div class="fb">Convenience — you skip re-typing the whole path from root. (The trade-off is that a
      relative path's meaning <i>depends</i> on the cwd, unlike an absolute path.)</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>Running <code>cd</code> with no arguments takes you to your home directory.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True. Plain <code>cd</code> is shorthand for <code>cd ~</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd is <code>/home/sam</code>. You run <code>cd courses/comp211</code>. The new cwd is
      <input type="text" class="fillblank" data-answer="/home/sam/courses/comp211"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The relative path is appended to the starting cwd:
      <code>/home/sam</code> + <code>courses/comp211</code> = <code>/home/sam/courses/comp211</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd is <code>/home/sam/classes/CS31</code>. You run <code>cd ..</code>. The new cwd is
      <input type="text" class="fillblank" data-answer="/home/sam/classes"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>..</code> is the parent, so you drop <code>CS31</code> off the end and land in
      <code>/home/sam/classes</code>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What does <code>~sarita</code> refer to?</div>
      <button class="opt" data-i="0">The current user's home directory</button>
      <button class="opt" data-i="1">A directory named <code>sarita</code> inside the cwd</button>
      <button class="opt" data-i="2">Sarita's home directory, regardless of who is currently logged in</button>
      <button class="opt" data-i="3">An error — <code>~</code> can never be followed by a name</button>
      <div class="fb"><code>~username</code> always names <b>that user's</b> home directory. Plain
      <code>~</code> (no name) is the one that means "my own home."</div>
    </div>
  </div>
</section>

<!-- ============ COPYING, MOVING, REMOVING ============ -->
<section class="topic" id="l9-cpmvrm">
  <h2>HW00 &middot; Copying, Moving, Removing</h2>

  <div class="card">
    <table class="cmp">
      <tr><th>Command</th><th>Does</th></tr>
      <tr><td><code>cp &lt;src&gt; &lt;dst&gt;</code></td><td>Copies a file or directory — the original stays put, a duplicate is created</td></tr>
      <tr><td><code>mv &lt;src&gt; &lt;dst&gt;</code></td><td>Moves or renames — <b>relocates</b> the original, no duplicate is created</td></tr>
    </table>
    <div class="concept">The key distinction: <b>after <code>cp</code>, both copies exist.</b> After
    <code>mv</code>, only one does — either it changed location, or it changed name, or both. Both commands
    take exactly <b>two arguments: source first, then destination</b>.</div>
    <p class="muted">In <code>cp basics test</code>, <code>basics</code> is the <b>source</b> — the first
    argument — and <code>test</code> is the destination.</p>
  </div>

  <h3>Copying directories</h3>
  <div class="card">
    <p>Plain <code>cp</code> refuses to copy a directory. Add <code>-r</code> (recursive) to copy a directory
    and everything inside it:</p>
<pre>$ cp -r unix_notes notes_copy</pre>
    <p class="muted">This duplicates <code>unix_notes</code> — including every file and subdirectory inside
    it — into a brand-new directory named <code>notes_copy</code>.</p>
  </div>

  <h3>Renaming with <code>mv</code></h3>
  <div class="card">
<pre>$ mv old new</pre>
    <p>Renames <code>old</code> to <code>new</code> <b>without copying</b> — there is no separate
    <code>rename</code> command in Unix; renaming is just moving to a new name in the same directory.</p>
  </div>

  <h3>Removing things — carefully</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Command</th><th>Does</th></tr>
      <tr><td><code>rm &lt;file&gt;</code></td><td>Removes a file</td></tr>
      <tr><td><code>rmdir &lt;dir&gt;</code></td><td>Removes a directory, but <b>only if it is empty</b> (default behavior)</td></tr>
      <tr><td><code>rm -i</code></td><td>Prompts <b>before</b> deleting each file — a safeguard against accidental removal</td></tr>
      <tr><td><code>rm -r</code></td><td>Recursively removes a directory <i>and everything inside it</i></td></tr>
      <tr><td><code>rm -f</code></td><td>Forces removal, suppressing any confirmation prompts</td></tr>
      <tr><td><code>rm -rf</code></td><td>Recursive + force, together</td></tr>
    </table>
    <div class="danger"><b>Be careful with <code>rm</code>.</b> By default it <b>permanently deletes</b> a
    file — there is no recycle bin, and deletion cannot be undone.</div>
    <div class="warn"><code>rm -rf</code> is widely considered the most dangerous command you can run in the
    wrong directory: it deletes an entire directory tree with no confirmation at all. The recommended habit is
    to run <code>ls</code> and/or <code>pwd</code> right before it, to confirm you are exactly where — and
    only where — you intend to be.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the key difference between <code>cp</code> and <code>mv</code>?</div>
      <button class="opt" data-i="0">There is no difference — they are aliases for the same command</button>
      <button class="opt" data-i="1"><code>cp</code> creates a duplicate and leaves the original in place; <code>mv</code> relocates or renames with no duplicate</button>
      <button class="opt" data-i="2"><code>mv</code> only works on directories, <code>cp</code> only on files</button>
      <button class="opt" data-i="3"><code>cp</code> deletes the source after copying</button>
      <div class="fb">After <code>cp</code>, both the original and the copy exist. After <code>mv</code>,
      only one copy exists — it was relocated, not duplicated.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>In <code>cp basics test</code>, the <b>source</b> (first argument) is
      <input type="text" class="fillblank" data-answer="basics"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>cp</code> takes source, then destination — <code>basics</code> is being copied
      <i>into</i> a new file called <code>test</code>.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Which command correctly copies the directory <code>unix_notes</code>, including its contents, into a new directory called <code>notes_copy</code>?</div>
      <button class="opt" data-i="0"><code>cp -r unix_notes notes_copy</code></button>
      <button class="opt" data-i="1"><code>cp unix_notes notes_copy</code></button>
      <button class="opt" data-i="2"><code>mv -r unix_notes notes_copy</code></button>
      <button class="opt" data-i="3"><code>cp notes_copy unix_notes</code></button>
      <div class="fb">Plain <code>cp</code> refuses directories; <code>-r</code> (recursive) is required to
      copy a directory and everything inside it. Source (<code>unix_notes</code>) comes first.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>By default, what does <code>rmdir</code> do if the directory you name is <b>not</b> empty?</div>
      <button class="opt" data-i="0">Deletes it anyway, along with everything inside</button>
      <button class="opt" data-i="1">Moves its contents up one level, then deletes it</button>
      <button class="opt" data-i="2">Fails/refuses — <code>rmdir</code> only removes empty directories by default</button>
      <button class="opt" data-i="3">Prompts you to confirm, then deletes it</button>
      <div class="fb"><code>rmdir</code> is deliberately limited to <b>empty</b> directories. To remove a
      non-empty one, you need <code>rm -r</code>.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span><code>rm</code> should be used cautiously because, by default, deletion with it is permanent.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True — no recycle bin, no automatic undo. <code>rm -i</code> is one way to add a
      confirmation step back in.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does the <code>-i</code> flag do when passed to <code>rm</code>?</div>
      <button class="opt" data-i="0">Ignores errors and keeps deleting</button>
      <button class="opt" data-i="1">Prompts for confirmation before deleting each file, helping prevent accidental removal</button>
      <button class="opt" data-i="2">Deletes files recursively</button>
      <button class="opt" data-i="3">Only deletes files with a matching extension</button>
      <div class="fb"><code>-i</code> stands for "interactive" — it asks before each deletion, the opposite
      of <code>-f</code> (force), which silences all prompts.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span>Why is <code>rm -rf</code> often called the most dangerous command you can run in the wrong directory?</div>
      <button class="opt" data-i="0">It is slower than other delete commands</button>
      <button class="opt" data-i="1">It only works on directories owned by root</button>
      <button class="opt" data-i="2">It asks for confirmation multiple times, which is annoying</button>
      <button class="opt" data-i="3">It recursively deletes everything in the target directory with no confirmation at all — run in the wrong place, it can wipe out large amounts of data instantly</button>
      <div class="fb"><code>-r</code> recurses into every subdirectory, <code>-f</code> suppresses every
      prompt. Combined, there is nothing standing between a typo and permanent, wide-reaching data loss —
      hence the advice to run <code>pwd</code>/<code>ls</code> first to confirm your location.</div>
    </div>
  </div>
</section>

<!-- ============ PRACTICE: TRACE THE PATH ============ -->
<section class="topic" id="l9-trace">
  <h2>HW00 &middot; Practice: Trace the Path</h2>
  <p class="muted">Worked path-tracing exercises, matching the HW00 practice problems.</p>

  <div class="card">
    <h3 style="margin-top:0">Tree A</h3>
<pre>/quiz
|-- a
|   |-- c
|   |   \`-- e.md
|   \`-- f.md
\`-- b
    |-- d
    |   \`-- g.md
    \`-- h.md</pre>
    <p class="muted">cwd starts at <code>/quiz/a/c</code>.</p>

    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd = <code>/quiz/a/c</code>. Relative path to <code>/quiz/a/f.md</code>:
      <input type="text" class="fillblank" data-answer="../f.md"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>..</code> from <code>/quiz/a/c</code> lands in <code>/quiz/a</code>, and
      <code>f.md</code> is right there — <code>../f.md</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd = <code>/quiz/a/c</code>. Relative path to <code>/quiz/b/d/g.md</code>:
      <input type="text" class="fillblank" data-answer="../../b/d/g.md"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Two <code>..</code>s get you from <code>/quiz/a/c</code> up to <code>/quiz</code>, then
      descend <code>b/d/g.md</code> — <code>../../b/d/g.md</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd = <code>/quiz/a/c</code>. Canonicalized absolute path of <code>.</code>:
      <input type="text" class="fillblank" data-answer="/quiz/a/c"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>.</code> is the current directory itself — its canonical absolute form is just the
      cwd, <code>/quiz/a/c</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd = <code>/quiz/a/c</code>. Canonicalized absolute path of <code>..</code>:
      <input type="text" class="fillblank" data-answer="/quiz/a"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>..</code> is the parent of the cwd: <code>/quiz/a</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd = <code>/quiz/a/c</code>. Relative path addressing <code>/quiz</code> itself:
      <input type="text" class="fillblank" data-answer="../.."></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">One <code>..</code> reaches <code>/quiz/a</code>, a second reaches <code>/quiz</code> —
      <code>../..</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Now cwd changes to <code>/quiz/a</code>. Relative path to <code>e.md</code> (i.e. <code>/quiz/a/c/e.md</code>):
      <input type="text" class="fillblank" data-answer="c/e.md"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">From <code>/quiz/a</code>, descend into <code>c</code> and grab <code>e.md</code> —
      <code>c/e.md</code>. No leading <code>../</code> needed since <code>e.md</code> is now beneath the cwd.</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Tree B</h3>
<pre>/home/sam
|-- classes
|   \`-- COMP211
|       \`-- notes.txt
|-- letters
|   \`-- draft.txt
\`-- projects
    \`-- demo.c</pre>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>cwd = <code>/home/sam/classes/COMP211</code>. Which command prints the contents of <code>demo.c</code>?</div>
      <button class="opt" data-i="0"><code>cat ../projects/demo.c</code></button>
      <button class="opt" data-i="1"><code>cat ../../projects/demo.c</code></button>
      <button class="opt" data-i="2"><code>cat projects/demo.c</code></button>
      <button class="opt" data-i="3"><code>cat /projects/demo.c</code></button>
      <div class="fb">From <code>COMP211</code> you need <b>two</b> <code>..</code>s to reach
      <code>/home/sam</code>, then descend into <code>projects</code> — <code>../../projects/demo.c</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd = <code>/home/sam/classes/COMP211</code>. Command to copy <code>notes.txt</code> into <code>/home/sam/letters</code>:
      <input type="text" class="fillblank" data-answer="cp notes.txt ../../letters/~~~cp notes.txt ../../letters"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>notes.txt</code> is right here (source, no path needed); the destination is two
      levels up and over into <code>letters</code> &mdash; <code>cp notes.txt ../../letters/</code>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>cwd = <code>/home/sam</code>. The <code>letters</code> directory is now empty. Command to remove it:
      <input type="text" class="fillblank" data-answer="rmdir letters"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">An empty directory only needs <code>rmdir</code> — no <code>-r</code>/<code>-f</code>
      required (and <code>rm -rf</code> would be overkill/riskier here).</div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Tree C — move up, then clean up</h3>
<pre>/home/jake/comp211/labs
\`-- lab00
    |-- file1.c
    \`-- file2.c</pre>
    <p>cwd = <code>/home/jake/comp211/labs/lab00</code>. Task: move both <code>file1.c</code> and
    <code>file2.c</code> up into <code>labs</code>, then remove the now-empty <code>lab00</code> directory.</p>

    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Which command <b>sequence</b> correctly accomplishes the task?</div>
      <button class="opt" data-i="0"><code>mv file1.c file2.c ..</code> &nbsp;then&nbsp; <code>cd ..</code> &nbsp;then&nbsp; <code>rmdir lab00</code></button>
      <button class="opt" data-i="1"><code>mv file1.c file2.c ..</code> &nbsp;then&nbsp; <code>rmdir lab00</code></button>
      <button class="opt" data-i="2"><code>rmdir lab00</code> &nbsp;then&nbsp; <code>mv file1.c file2.c ..</code></button>
      <button class="opt" data-i="3"><code>mv file1.c file2.c ../lab00</code> &nbsp;then&nbsp; <code>rmdir lab00</code></button>
      <div class="fb">You must <code>cd ..</code> out of <code>lab00</code> <b>before</b> running
      <code>rmdir lab00</code> — a directory cannot remove itself while it is your current working directory.
      Skipping the <code>cd ..</code> step (option 1) fails for exactly that reason. Removing <code>lab00</code>
      before moving the files out of it (option 2) would delete the files too, since it isn't empty yet. Option
      3 moves the files right back inside <code>lab00</code> instead of up into <code>labs</code>.</div>
    </div>
  </div>
</section>

<!-- ============ SOURCE CODE TO MACHINE CODE ============ -->
<section class="topic" id="l9-compile">
  <h2>HW00 &middot; From Source Code to Machine Code</h2>
  <p class="muted">A brief recap — this topic is covered in depth in Lesson 2's "Compiling and Assembling."</p>

  <div class="card">
    <table class="cmp">
      <tr><th>Term</th><th>What it is</th></tr>
      <tr><td><b>Machine code</b></td><td>Binary instructions executed <b>directly by the CPU</b></td></tr>
      <tr><td><b>Assembly language</b></td><td>A <b>human-readable</b> representation of machine code</td></tr>
      <tr><td><b>High-level language</b> (e.g. C)</td><td>Simplifies programming by <b>abstracting away hardware details</b></td></tr>
      <tr><td><b>Compiler</b></td><td>Its primary role: convert high-level code into <b>assembly</b></td></tr>
      <tr><td><b>Assembler</b></td><td>Translates assembly language into <b>machine code</b></td></tr>
    </table>
    <p class="muted">Pipeline: high-level source (<code>.c</code>) &rarr; compiler &rarr; assembly &rarr;
    assembler &rarr; machine code (executable).</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the primary role of a compiler?</div>
      <button class="opt" data-i="0">To execute machine code directly on the CPU</button>
      <button class="opt" data-i="1">To convert high-level source code into assembly language</button>
      <button class="opt" data-i="2">To translate assembly language into machine code</button>
      <button class="opt" data-i="3">To manage files and directories</button>
      <div class="fb">The compiler's job is <b>high-level code &rarr; assembly</b>. Turning that assembly into
      machine code is a separate step, done by the <b>assembler</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Command that compiles <code>demo.c</code> into an executable named <code>demo</code>:
      <input type="text" class="fillblank" data-answer="gcc -o demo demo.c"></div>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>-o demo</code> names the output executable <code>demo</code>; <code>demo.c</code>
      is the source file being compiled. (<code>gcc demo.c demo</code> and <code>gcc demo -o demo.c</code> have
      the arguments in the wrong order/role; <code>gcc -c demo.c</code> only compiles to an object file, it
      doesn't produce a runnable executable.)</div>
    </div>
  </div>
</section>

</main>`;
