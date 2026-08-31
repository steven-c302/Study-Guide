/* ============================================================
   LESSON 1 — CL01 Unix Basics (+ RD00, DiS 17.1 cmdln basics).
   Injects into #l1. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l1').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l1-terminal')">1 &middot; Terminal, Shell, CLI</button>
  <button onclick="showTopic(this,'l1-fs')">2 &middot; The Unix File System</button>
  <button onclick="showTopic(this,'l1-paths')">3 &middot; Paths</button>
  <button onclick="showTopic(this,'l1-cmds')">4 &middot; Commands</button>
  <button onclick="showTopic(this,'l1-shell')">&#9733; Shell Simulator</button>
  <button onclick="showTopic(this,'l1-inclass')">In-Class Problems</button>
  <button onclick="showTopic(this,'l1-rd00')">RD00 Self-Check</button>
</nav>
<main>

<!-- ============ TERMINAL / SHELL / CLI ============ -->
<section class="topic active" id="l1-terminal">
  <h2>Lesson 1 &middot; Terminal, Shell, and CLI</h2>

  <div class="concept">Three words that get used interchangeably and shouldn't be. <b>CLI</b> is the
  <i>interaction style</i>. <b>Terminal</b> is the <i>app you type into</i>. <b>Shell</b> is the <i>program
  that actually understands and runs your commands</i>.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Term</th><th>What it is</th><th>Examples</th></tr>
      <tr><td><b>Command-line interface (CLI)</b></td><td>A text-based way to interact with a system — a <i>style</i>, not a program</td><td>Bash CLI, PowerShell CLI, Git's command-line usage</td></tr>
      <tr><td><b>Terminal</b></td><td>The application/window that displays text, sends your keystrokes to a shell, and shows the shell's output</td><td>Terminal.app (macOS), Windows Terminal, GNOME Terminal, iTerm2</td></tr>
      <tr><td><b>Shell</b></td><td>The <b>command interpreter</b> — the program that reads your command and executes it</td><td><b>bash</b> (this course), zsh, fish, sh, PowerShell, cmd.exe</td></tr>
    </table>
    <p class="muted">This course uses <b>Bash</b>, the default shell on Linux. When you open a terminal for
    the class it auto-launches bash and shows a <b>shell prompt</b> — the shell's way of saying "I'm ready
    for a command."</p>
  </div>

  <h3>The interaction loop</h3>
  <div class="card">
<pre>prompt appears  ->  you type a command  ->  you press Enter
       ^                                          |
       |                                          v
       +--------  computer responds with text  ----+</pre>
    <p class="muted">That loop is the whole idea of a CLI. Contrast it with a GUI, where you click.</p>
  </div>

  <h3>Why the terminal is still here</h3>
  <div class="card">
    <div class="two">
      <div>
        <h4>How we got here</h4>
        <table class="cmp">
          <tr><th>Era</th><th>What changed</th></tr>
          <tr><td>Early computers (ENIAC, EDSAC)</td><td><b>Batch processing</b> — punched cards in, printout hours or days later. No interaction; one mistake meant re-running the entire job.</td></tr>
          <tr><td>Teletypes (TTYs)</td><td>The first <b>interactive text interface</b>: type characters, get characters back, printed line by line on paper.</td></tr>
          <tr><td>CRTs (e.g. VT100)</td><td>Cursor movement, overwriting text, screen-based editing, faster feedback. The word <b>"terminal" stuck</b> even though the technology changed.</td></tr>
          <tr><td>Late 1970s&ndash;80s</td><td>Cheaper memory, better displays, the mouse &rarr; <b>GUIs</b>, and computers became usable by non-experts.</td></tr>
        </table>
      </div>
      <div>
        <h4>Why it survived the GUI</h4>
        <ul class="muted" style="line-height:1.9">
          <li><b>Scriptable</b> — a command you can type is a command you can automate</li>
          <li><b>Remote-friendly</b> — text travels well over a network</li>
          <li><b>Extremely powerful</b></li>
          <li>Servers frequently have <b>no GUI at all</b></li>
        </ul>
        <div class="concept">The philosophical shift the slides highlight: computers went from
        <b>"machines that run jobs"</b> to <b>"systems you work with"</b> — which is what made interactive
        programming, real-time debugging, exploratory computing, networking, and remote login possible.</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>You open Terminal.app on a Mac and type <code>ls</code>. Which component actually interprets and executes that command?</div>
      <button class="opt" data-i="0">Terminal.app</button>
      <button class="opt" data-i="1">The CLI</button>
      <button class="opt" data-i="2">The shell (bash or zsh)</button>
      <button class="opt" data-i="3">The operating system kernel, directly</button>
      <div class="fb">The <b>shell</b> is the command interpreter. Terminal.app only <i>displays</i> text and
      forwards your keystrokes; "CLI" names the interaction style, not a program. (The shell does ask the
      kernel to do the work, but it is the shell that parses and runs the command.)</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>"Terminal" and "shell" are two names for the same program.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">Different layers. You can run <b>different shells inside the same terminal</b> (bash,
      zsh, fish), and the same shell inside different terminals. The terminal is the window; the shell is the
      interpreter.</div>
    </div>
  </div>
</section>

<!-- ============ FILE SYSTEM ============ -->
<section class="topic" id="l1-fs">
  <h2>Lesson 1 &middot; The Unix File System</h2>

  <div class="concept"><b>Unix</b> is a family of operating systems, and the <b>operating system</b> is the
  "boss" of your computer — it manages memory, files, programs, and hardware. macOS is a Unix operating
  system. A <b>file system</b> is the way an OS organizes and stores files, and Unix organizes them as a
  <b>hierarchical tree</b>.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Piece</th><th>Role in the tree</th><th>Notation</th></tr>
      <tr><td><b>Root</b></td><td>The single directory at the very top — the only one with no parent</td><td><code>/</code> on Mac/Linux (a drive letter like <code>C:\\</code> on Windows)</td></tr>
      <tr><td><b>Directories</b> (folders)</td><td>The <b>branches</b>. They contain files and other directories (subdirectories)</td><td>drawn as rectangles in the slides</td></tr>
      <tr><td><b>Files</b></td><td>The <b>leaves</b>. A file stores data — text, images, source code, executables</td><td>drawn as ovals in the slides</td></tr>
    </table>
    <p class="muted"><code>/home</code> stores each user's <b>home directory</b>, and each one is named after
    the username. So user <code>carla</code> gets <code>/home/carla</code>.</p>
  </div>

  <h3>The course's example tree</h3>
  <div class="card">
    <p class="muted">This exact tree runs through the whole lecture — and it is the tree loaded into the
    simulator two tabs over. Two users, <code>john</code> and <code>carla</code>:</p>
<pre>/
\`-- home
    |-- john
    |   \`-- psyc101
    |       \`-- notes
    |           |-- lec1.note
    |           |-- lec2.note
    |           \`-- lec3.note
    \`-- carla
        |-- comp211
        |   |-- labs
        |   |   \`-- lab0.c
        |   \`-- notes
        |       |-- lec1.note
        |       \`-- lec2.note
        \`-- comp301          (empty)</pre>
    <div class="concept"><b>Every directory is identified by a unique pathname.</b> The <code>psyc101</code>
    directory above is <code>/home/john/psyc101</code> — spell out the path from the root and there is
    exactly one thing it can mean. Note that there are two different directories named <code>notes</code>
    here; the <i>name</i> is not unique, the <i>path</i> is.</div>
  </div>

  <h3>Hidden files</h3>
  <div class="card">
    <p>A <b>hidden</b> file or directory is one whose name <b>begins with a dot</b>. Plain <code>ls</code>
    will not show them; <code>ls -a</code> will.</p>
    <table class="cmp">
      <tr><th>Example</th><th>What it is</th></tr>
      <tr><td><code>.git/</code></td><td>Git's repository data</td></tr>
      <tr><td><code>.vscode/</code></td><td>Editor configuration for a project</td></tr>
      <tr><td><code>.bashrc</code></td><td>Your bash startup configuration</td></tr>
    </table>
    <p class="muted">The purpose is to store user/application <b>configuration</b> and keep clutter out of
    normal listings. Nothing is actually secret — the dot is a convention, not a permission.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>In the tree above, how many directories are named <code>notes</code>?</div>
      <button class="opt" data-i="0">One</button>
      <button class="opt" data-i="1">Two, with different pathnames</button>
      <button class="opt" data-i="2">Two, and that is an error</button>
      <button class="opt" data-i="3">None — <code>notes</code> is a file</button>
      <div class="fb">Two: <code>/home/john/psyc101/notes</code> and <code>/home/carla/comp211/notes</code>.
      Perfectly legal — names only have to be unique <b>within</b> a directory, which is exactly why the
      <i>pathname</i> is the thing that identifies a directory uniquely.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does <code>ls</code> in your project folder not show <code>.git</code>?</div>
      <button class="opt" data-i="0">Because <code>.git</code> is encrypted</button>
      <button class="opt" data-i="1">Because it belongs to another user</button>
      <button class="opt" data-i="2">Because its name starts with a dot, and plain <code>ls</code> hides those</button>
      <button class="opt" data-i="3">Because directories are never listed by <code>ls</code></button>
      <div class="fb">The leading dot marks it <b>hidden</b>. Run <code>ls -a</code> and it appears — along
      with <code>.</code> and <code>..</code> themselves.</div>
    </div>
  </div>
</section>

<!-- ============ PATHS ============ -->
<section class="topic" id="l1-paths">
  <h2>Lesson 1 &middot; Absolute and Relative Paths</h2>

  <div class="two">
    <div class="card">
      <h3 style="margin-top:0">Absolute path</h3>
      <p>Starts from the <b>root directory</b>. <b>Always unique</b> — it means the same thing no matter
      where you currently are.</p>
      <p class="muted">Recognize it by the leading <code>/</code>.</p>
<pre>/home/carla/comp211/labs
/home/john/psyc101/notes/lec1.note</pre>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Relative path</h3>
      <p>Starts from the <b>current working directory</b>. What it means depends on where you are standing.</p>
      <p class="muted">Recognize it by the <i>absence</i> of a leading <code>/</code>.</p>
<pre>comp211/labs        (from /home/carla)
../comp301          (from /home/carla/comp211)
notes/lec1.note</pre>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">The two dots that do all the work</h3>
    <table class="cmp">
      <tr><th>Symbol</th><th>Means</th><th>Typical use</th></tr>
      <tr><td><code>..</code> (two dots)</td><td>the <b>parent</b> directory</td><td><code>cd ..</code> to go up one level; <code>../comp301</code> to reach a sibling</td></tr>
      <tr><td><code>.</code> (one dot)</td><td>the <b>current</b> directory</td><td><code>./a.out</code> to run a program in the directory you are standing in</td></tr>
      <tr><td><code>~</code> (tilde)</td><td>your <b>home</b> directory</td><td><code>cd ~</code> or plain <code>cd</code></td></tr>
    </table>
    <p class="muted">You can chain them: <code>cd ../..</code> goes up two levels. From
    <code>/home/carla/comp301/labs/lab00</code> that lands you back in <code>/home/carla/comp301</code>.</p>
    <div class="concept">Both forms reach the same place — pick whichever is shorter and clearer.
    From <code>/home/carla</code>, these are identical:
    <br><code>cd /home/carla/comp211/labs</code> &nbsp;(absolute) &nbsp;&middot;&nbsp;
    <code>cd comp211/labs</code> &nbsp;(relative)</div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Classify each path</h3>
    <table class="match" id="match-paths">
      <tr><td class="match-term"><code>/home/carla/comp211</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="abs">Absolute</option><option value="rel">Relative</option></select></td></tr>
      <tr><td class="match-term"><code>comp211/labs</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="abs">Absolute</option><option value="rel">Relative</option></select></td></tr>
      <tr><td class="match-term"><code>../comp301</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="abs">Absolute</option><option value="rel">Relative</option></select></td></tr>
      <tr><td class="match-term"><code>/</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="abs">Absolute</option><option value="rel">Relative</option></select></td></tr>
      <tr><td class="match-term"><code>./a.out</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="abs">Absolute</option><option value="rel">Relative</option></select></td></tr>
      <tr><td class="match-term"><code>notes/lec1.note</code></td><td><select class="match-def"><option value="">&mdash; choose &mdash;</option><option value="abs">Absolute</option><option value="rel">Relative</option></select></td></tr>
    </table>
    <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-paths','fb-match-paths',['abs','rel','rel','abs','rel','rel'])">Check</button>
    <div class="fb" id="fb-match-paths"></div>
    <p class="muted" style="margin-top:8px">The whole test is one character: <b>does it start with
    <code>/</code>?</b></p>
  </div>
</section>

<!-- ============ COMMANDS ============ -->
<section class="topic" id="l1-cmds">
  <h2>Lesson 1 &middot; File System Commands</h2>

  <div class="card">
    <table class="cmp">
      <tr><th>Command</th><th>Name</th><th>What it does</th></tr>
      <tr><td><code>pwd</code></td><td>print working directory</td><td>Prints the full pathname of the directory you are currently in</td></tr>
      <tr><td><code>cd &lt;path&gt;</code></td><td>change directory</td><td>Changes the current working directory. Plain <code>cd</code> goes home.</td></tr>
      <tr><td><code>ls</code></td><td>list</td><td>Lists the contents of the cwd; with an argument, of the directory you name</td></tr>
      <tr><td><code>ls -a</code></td><td>list all</td><td>Also shows hidden (dot) files</td></tr>
      <tr><td><code>mkdir &lt;dir&gt;</code></td><td>make directory</td><td>Creates a new directory</td></tr>
      <tr><td><code>touch &lt;file&gt;</code></td><td>&mdash;</td><td>Creates a new empty file</td></tr>
      <tr><td><code>cp &lt;src&gt; &lt;dst&gt;</code></td><td>copy</td><td>Copies a file or directory. <b>Two arguments: source, then destination.</b></td></tr>
      <tr><td><code>mv &lt;src&gt; &lt;dst&gt;</code></td><td>move</td><td>Moves <i>or renames</i> a file or directory</td></tr>
      <tr><td><code>rm &lt;file&gt;</code></td><td>remove</td><td>Deletes a file — <b>permanently</b></td></tr>
      <tr><td><code>rmdir &lt;dir&gt;</code></td><td>remove directory</td><td>Deletes a directory, but <b>only if it is empty</b></td></tr>
      <tr><td><code>rm -r &lt;dir&gt;</code></td><td>recursive remove</td><td>Removes a directory <i>and everything inside it</i></td></tr>
      <tr><td><code>rm -rf &lt;dir&gt;</code></td><td>recursive + force</td><td>Same, with all prompting suppressed</td></tr>
    </table>
  </div>

  <h3><code>cp</code> and <code>mv</code>: one difference</h3>
  <div class="card">
    <p>Both take <b>source</b> then <b>destination</b>. The difference is whether the original survives.</p>
<pre>$ pwd
/home/carla/comp211
$ cp notes/lec1.note ../comp301     <span class="cm"># lec1.note now exists in BOTH places</span>
$ mv notes/lec2.note ../comp301     <span class="cm"># lec2.note is GONE from notes</span></pre>
    <div class="concept">Neither command moves <i>you</i>. After both of those, <code>pwd</code> still
    prints <code>/home/carla/comp211</code>. Only <code>cd</code> changes the current working directory.</div>
    <p class="muted"><code>mv</code> is also how you <b>rename</b>: moving a file to a new name in the same
    directory is a rename. <code>mv Code/app.py /Projects/Dev/Code/main.py</code> renames
    <code>app.py</code> to <code>main.py</code>.</p>
  </div>

  <h3>Removing things</h3>
  <div class="card">
    <div class="danger"><b>Be careful.</b> <code>rm</code> <b>permanently deletes</b> a file with no option
    for recovery. There is no recycle bin, no undo, no "are you sure" by default.</div>
<pre>$ pwd
/home/carla/comp211
$ ls
labs    notes
$ ls labs
lab0.c
$ rmdir labs
rmdir: failed to remove labs: Directory not empty     <span class="cm"># this is a FEATURE</span>
$ rm -rf labs
$ ls
notes</pre>
    <p><code>rmdir</code> refusing to delete a non-empty directory is a safety net: it stops you from
    destroying content you forgot was in there. <code>rm -rf</code> deliberately removes that safety net —
    <code>-r</code> recurses into the directory, <code>-f</code> silences every prompt.</p>
    <div class="warn"><b>Habit worth building now.</b> Before you ever type <code>rm -rf</code>, run
    <code>pwd</code> and <code>ls</code> first. Confirm where you are and what you are about to destroy. The
    command does not ask twice.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Your cwd is <code>/home/carla/comp211</code>. You run <code>cp notes/lec1.note ../comp301</code>. What is your cwd afterwards?</div>
      <button class="opt" data-i="0"><code>/home/carla/comp301</code></button>
      <button class="opt" data-i="1"><code>/home/carla/comp211</code> — unchanged</button>
      <button class="opt" data-i="2"><code>/home/carla/comp211/notes</code></button>
      <button class="opt" data-i="3"><code>/home/carla</code></button>
      <div class="fb"><b>Unchanged.</b> <code>cp</code> and <code>mv</code> move <i>files</i>, not you. Only
      <code>cd</code> changes the current working directory.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span><code>rmdir labs</code> fails with "Directory not empty." What is the right reading of that?</div>
      <button class="opt" data-i="0">A bug — <code>rmdir</code> should have worked</button>
      <button class="opt" data-i="1">You lack permission to delete the directory</button>
      <button class="opt" data-i="2">Expected behavior: <code>rmdir</code> only removes empty directories, which prevents accidental deletion</button>
      <button class="opt" data-i="3"><code>labs</code> is a file, not a directory</button>
      <div class="fb">Working as designed. The slides put it plainly: this "prevents the user from
      accidentally removing content that they did not intend." If you truly mean it, <code>rm -r</code>
      (or <code>rm -rf</code>) is the escape hatch — used deliberately, not reflexively.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span><code>mv oldname.txt newname.txt</code> renames a file.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True — in Unix, renaming <i>is</i> moving. There is no separate <code>rename</code>
      command; you move the file to a new name in the same directory.</div>
    </div>
  </div>
</section>

<!-- ============ SHELL SIMULATOR ============ -->
<section class="topic" id="l1-shell">
  <h2>Shell Simulator</h2>
  <div class="concept">A real bash-style shell running on the lecture's file tree. Type commands on the left;
  the tree on the right updates live, with your <span style="background:rgba(164,93,235,.35);padding:0 5px;border-radius:4px">current working directory</span>
  highlighted. Supports <code>pwd cd ls mkdir touch cp mv rm rmdir</code> plus <code>help</code>,
  <code>clear</code>, and <code>reset</code>.</div>

  <div class="card">
    <div class="two-wide">
      <div>
        <div class="term" id="sh-out"></div>
        <div class="term-input">
          <span id="sh-ps">carla$</span>
          <input type="text" id="sh-in" autocomplete="off" spellcheck="false"
                 placeholder="type a command and press Enter" onkeydown="shKey(event)">
        </div>
        <div class="toolbar">
          <button class="btn small ghost" onclick="shReset()">reset tree</button>
          <button class="btn small ghost" onclick="shRun('pwd')">pwd</button>
          <button class="btn small ghost" onclick="shRun('ls')">ls</button>
          <button class="btn small ghost" onclick="shRun('ls -a')">ls -a</button>
          <button class="btn small ghost" onclick="shRun('cd ..')">cd ..</button>
          <button class="btn small ghost" onclick="shDemo()">run the in-class sequence</button>
        </div>
      </div>
      <div>
        <div class="tree" id="sh-tree"></div>
        <p class="muted" style="margin-top:8px">Blue = directory &middot; grey = file &middot; purple = cwd</p>
      </div>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Try these</h3>
    <ol class="muted" style="line-height:2">
      <li><code>pwd</code> &mdash; where do you start? (The prompt shows only the directory name; <code>pwd</code> shows the full path.)</li>
      <li><code>cd comp211/labs</code> then <code>pwd</code> &mdash; a relative path.</li>
      <li><code>cd /home/john/psyc101/notes</code> &mdash; an absolute path from anywhere.</li>
      <li><code>cd ../..</code> &mdash; up two levels at once.</li>
      <li><code>ls -a</code> in any directory &mdash; find <code>.</code>, <code>..</code>, and the hidden <code>.bashrc</code> in carla's home.</li>
      <li><code>rmdir comp211</code> &mdash; watch it refuse. Then <code>rm -rf comp211</code> and watch it not.</li>
      <li><code>touch a.c</code>, <code>mkdir build</code>, <code>cp a.c build</code>, <code>mv a.c main.c</code> &mdash; build something and rename it.</li>
    </ol>
  </div>
</section>

<!-- ============ IN-CLASS PROBLEMS ============ -->
<section class="topic" id="l1-inclass">
  <h2>Lesson 1 &middot; In-Class Problems</h2>
  <p class="muted">The two active-learning problems from the slides, with worked answers.</p>

  <div class="card">
    <h3 style="margin-top:0">Problem 1 &mdash; draw the resulting tree</h3>
    <p>The current working directory is <code>carla</code>. Run these commands and draw the new tree,
    labelling the cwd at the end.</p>
<pre>$ cd comp301
$ mkdir labs
$ mkdir labs/lab00
$ touch labs/lab00/file1.java
$ cd labs/lab00
$ touch file2.java
$ cd ..
$ mkdir lab01
$ cd ../..
$ mkdir temp
$ cd ..</pre>
    <textarea placeholder="sketch the tree, and say where you end up"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre>home                       &lt;-- cwd at the end
\`-- carla
    |-- comp211
    |   |-- labs
    |   |   \`-- lab0.c
    |   \`-- notes
    |       |-- lec1.note
    |       \`-- lec2.note
    |-- comp301
    |   \`-- labs
    |       |-- lab00
    |       |   |-- file1.java
    |       |   \`-- file2.java
    |       \`-- lab01
    \`-- temp</pre>
      <h4>Walking it</h4>
      <table class="cmp">
        <tr><th>Command</th><th>Effect</th><th>cwd after</th></tr>
        <tr><td><code>cd comp301</code></td><td>&mdash;</td><td><code>comp301</code></td></tr>
        <tr><td><code>mkdir labs</code></td><td>creates <code>comp301/labs</code></td><td><code>comp301</code></td></tr>
        <tr><td><code>mkdir labs/lab00</code></td><td>creates it <b>without moving you</b></td><td><code>comp301</code></td></tr>
        <tr><td><code>touch labs/lab00/file1.java</code></td><td>new empty file</td><td><code>comp301</code></td></tr>
        <tr><td><code>cd labs/lab00</code></td><td>down two levels</td><td><code>lab00</code></td></tr>
        <tr><td><code>touch file2.java</code></td><td>created <i>here</i></td><td><code>lab00</code></td></tr>
        <tr><td><code>cd ..</code></td><td>up one</td><td><code>labs</code></td></tr>
        <tr><td><code>mkdir lab01</code></td><td>sibling of <code>lab00</code>, <b>not</b> inside it</td><td><code>labs</code></td></tr>
        <tr><td><code>cd ../..</code></td><td>up two</td><td><code>carla</code></td></tr>
        <tr><td><code>mkdir temp</code></td><td>created in <code>carla</code></td><td><code>carla</code></td></tr>
        <tr><td><code>cd ..</code></td><td>up one</td><td><b><code>home</code></b></td></tr>
      </table>
      <p class="muted">The two easy mistakes: putting <code>lab01</code> inside <code>lab00</code> (the
      <code>cd ..</code> before it moved you up first), and forgetting the final <code>cd ..</code>, which
      leaves you in <code>home</code> rather than <code>carla</code>. Replay the whole thing with the
      <b>"run the in-class sequence"</b> button in the simulator.</p>
    </div>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Problem 2 &mdash; write the command</h3>
    <p>Directory structure on the right; the current working directory is <code>/Projects/Dev</code>.</p>
    <div class="two">
      <div>
        <p><b>Q1.</b> Move <code>test_app.py</code> to the <code>Code</code> directory, using <b>relative</b>
        paths for both source and destination.</p>
        <p><b>Q2.</b> Copy <code>readme.md</code> from <code>Docs</code> to <code>Dev</code>, using
        <b>absolute</b> paths for both.</p>
        <p><b>Q3.</b> Rename <code>app.py</code> to <code>main.py</code>, using a <b>relative</b> path for the
        source and an <b>absolute</b> path for the destination.</p>
      </div>
      <div>
<pre>/Projects
|-- Dev
|   \`-- Code
|       \`-- app.py
|-- Docs
|   \`-- readme.md
\`-- Tests
    \`-- test_app.py</pre>
      </div>
    </div>
    <textarea placeholder="one command per line"></textarea>
    <button class="btn small ghost" style="margin-top:8px" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre>Q1.  mv ../Tests/test_app.py Code
Q2.  cp /Projects/Docs/readme.md /Projects/Dev
Q3.  mv Code/app.py /Projects/Dev/Code/main.py</pre>
      <p class="muted"><b>Q1</b> — you are in <code>Dev</code>, and <code>Tests</code> is a sibling, so you go
      up with <code>..</code> and back down. <code>Code</code> is directly beneath you, so it needs no prefix.
      <br><b>Q2</b> — "absolute" means both paths start at <code>/</code>, and the answer is then identical
      no matter where you are standing.
      <br><b>Q3</b> — renaming is moving. The source is relative (<code>Code/app.py</code>), the destination
      is the full path with the new filename on the end. Note the destination names the <i>file</i>, not just
      a directory — that is what makes it a rename rather than a move.</p>
    </div>
  </div>
</section>

<!-- ============ RD00 SELF CHECK ============ -->
<section class="topic" id="l1-rd00">
  <h2>RD00 &middot; Unix File System — Self-Check</h2>
  <p class="muted">Questions over the RD00 reading (<i>Dive into Systems</i> &sect;17.1, Command Line Basics)
  and the CL01 slides. Answer cold, then read the explanation.</p>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What is a file system?</div>
      <button class="opt" data-i="0">A program that runs commands you type</button>
      <button class="opt" data-i="1">The way an operating system organizes and stores files</button>
      <button class="opt" data-i="2">The physical hard drive</button>
      <button class="opt" data-i="3">A list of all running programs</button>
      <div class="fb">Option 0 describes the <b>shell</b>; option 2 is hardware. The file system is the
      <b>organization</b> the OS imposes on stored data.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>What structure does the Unix file system use?</div>
      <button class="opt" data-i="0">A flat list of files</button>
      <button class="opt" data-i="1">A linked list</button>
      <button class="opt" data-i="2">A hierarchical tree with a single directory at the top</button>
      <button class="opt" data-i="3">A hash table keyed by filename</button>
      <div class="fb">A <b>hierarchical tree</b> rooted at a single top directory. Directories are branches,
      files are leaves.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q3</span>What symbol represents the root directory, and what is special about it?</div>
      <button class="opt" data-i="0"><code>~</code> — it is the user's home directory</button>
      <button class="opt" data-i="1"><code>/</code> — it is the only directory with no parent</button>
      <button class="opt" data-i="2"><code>.</code> — it is where you always start</button>
      <button class="opt" data-i="3"><code>C:\\</code> — it is the top of the drive</button>
      <div class="fb"><code>/</code> is the root, and it is <b>the only one without a parent directory</b>.
      <code>~</code> is home, <code>.</code> is the current directory, and <code>C:\\</code> is the Windows
      convention.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>What does the <code>/home</code> directory contain?</div>
      <button class="opt" data-i="0">System programs</button>
      <button class="opt" data-i="1">System library code</button>
      <button class="opt" data-i="2">Each user's home directory, named after their username</button>
      <button class="opt" data-i="3">Temporary files</button>
      <div class="fb">System programs live in <code>/bin</code> and library code in <code>/lib</code>.
      <code>/home</code> holds one subdirectory per user, each matching that user's username.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>Which of these is an <b>absolute</b> path?</div>
      <button class="opt" data-i="0"><code>comp211/labs</code></button>
      <button class="opt" data-i="1"><code>/home/carla/comp211</code></button>
      <button class="opt" data-i="2"><code>../comp301</code></button>
      <button class="opt" data-i="3"><code>notes/lec1.note</code></button>
      <div class="fb">An absolute path <b>starts from the root</b>, so it starts with <code>/</code>. The
      other three all depend on where you currently are.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>A relative path starts from:</div>
      <button class="opt" data-i="0">the root directory</button>
      <button class="opt" data-i="1">the user's home directory</button>
      <button class="opt" data-i="2">the current working directory</button>
      <button class="opt" data-i="3">the directory containing the program being run</button>
      <div class="fb">The <b>current working directory</b> — which is why the same relative path can mean
      different things at different times, and why an absolute path is always unique.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span>What does <code>..</code> refer to?</div>
      <button class="opt" data-i="0">The current directory</button>
      <button class="opt" data-i="1">The parent of the current directory</button>
      <button class="opt" data-i="2">The root directory</button>
      <button class="opt" data-i="3">The home directory</button>
      <div class="fb"><b>Parent.</b> Two dots go up; one dot stays put. <code>cd ../..</code> goes up twice.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q8</span>What does a single <code>.</code> refer to?</div>
      <button class="opt" data-i="0">The current directory</button>
      <button class="opt" data-i="1">The parent directory</button>
      <button class="opt" data-i="2">The root directory</button>
      <button class="opt" data-i="3">A hidden file</button>
      <div class="fb"><b>The current directory.</b> This is why you run a program you just compiled as
      <code>./a.out</code> — you are saying "the <code>a.out</code> right here."</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q9</span>Which command prints the full pathname of the directory you are in?</div>
      <button class="opt" data-i="0"><code>ls</code></button>
      <button class="opt" data-i="1"><code>cd</code></button>
      <button class="opt" data-i="2"><code>pwd</code></button>
      <button class="opt" data-i="3"><code>mkdir</code></button>
      <div class="fb"><b><code>pwd</code></b> — print working directory.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q10</span>Which command creates a new <b>empty file</b>?</div>
      <button class="opt" data-i="0"><code>mkdir</code></button>
      <button class="opt" data-i="1"><code>touch</code></button>
      <button class="opt" data-i="2"><code>cp</code></button>
      <button class="opt" data-i="3"><code>ls -a</code></button>
      <div class="fb"><code>touch</code> makes a file; <code>mkdir</code> makes a <i>directory</i>. Easy pair
      to swap under time pressure.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q11</span>Which option makes <code>ls</code> show hidden files?</div>
      <button class="opt" data-i="0"><code>-h</code></button>
      <button class="opt" data-i="1"><code>-r</code></button>
      <button class="opt" data-i="2"><code>-a</code></button>
      <button class="opt" data-i="3"><code>-f</code></button>
      <div class="fb"><code>ls -a</code> — <b>a</b> for <i>all</i>. It also reveals <code>.</code> and
      <code>..</code> themselves.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q12</span>What makes a file "hidden" in Unix?</div>
      <button class="opt" data-i="0">A permission bit set by the owner</button>
      <button class="opt" data-i="1">Its name begins with a dot</button>
      <button class="opt" data-i="2">It is stored outside <code>/home</code></button>
      <button class="opt" data-i="3">It has no file extension</button>
      <div class="fb">Purely a <b>naming convention</b>: a leading dot. Nothing is protected or encrypted —
      <code>ls -a</code> shows everything.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q13</span><code>cp p1 p2</code> does what?</div>
      <button class="opt" data-i="0">Moves the file at <code>p1</code> to <code>p2</code>, deleting the original</button>
      <button class="opt" data-i="1">Makes a new copy of the file at <code>p1</code> and names it <code>p2</code></button>
      <button class="opt" data-i="2">Compares the two files</button>
      <button class="opt" data-i="3">Copies <code>p2</code> onto <code>p1</code></button>
      <div class="fb">Source first, destination second — and the original stays. Option 0 describes
      <code>mv</code>; option 3 has the argument order backwards.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q14</span>Which is true of <code>rmdir</code>?</div>
      <button class="opt" data-i="0">It removes a directory and everything inside it</button>
      <button class="opt" data-i="1">It moves a directory to a recycle bin</button>
      <button class="opt" data-i="2">It only removes a directory that is empty</button>
      <button class="opt" data-i="3">It works on files as well as directories</button>
      <div class="fb"><b>Empty only.</b> That restriction is deliberate protection. Removing a directory with
      contents takes <code>rm -r</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q15</span>What does <code>rm</code> do with a deleted file?</div>
      <button class="opt" data-i="0">Moves it to a recycle bin, recoverable later</button>
      <button class="opt" data-i="1">Permanently deletes it, with no option for recovery</button>
      <button class="opt" data-i="2">Marks it hidden</button>
      <button class="opt" data-i="3">Asks for confirmation every time</button>
      <div class="fb"><b>Permanent.</b> The reading is explicit that it does <i>not</i> move the file to a
      recycle bin "like deleting files on some other operating systems may do," and it does not prompt by
      default. Hence: <code>pwd</code> and <code>ls</code> before <code>rm -rf</code>, every time.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q16</span>In <code>rm -rf</code>, what do the two flags do?</div>
      <button class="opt" data-i="0"><code>-r</code> renames, <code>-f</code> finds</button>
      <button class="opt" data-i="1"><code>-r</code> restores, <code>-f</code> forces</button>
      <button class="opt" data-i="2"><code>-r</code> recurses into the directory, <code>-f</code> forces (suppresses prompts)</button>
      <button class="opt" data-i="3">They are the same flag written two ways</button>
      <div class="fb"><b>Recursive</b> and <b>force</b>. Together they remove a whole directory tree without
      asking — the most dangerous two characters you will type this semester.</div>
    </div>
  </div>
</section>

</main>`;

/* ============================================================
   WIDGET — bash-style shell simulator over a virtual file tree
   ============================================================ */
function shFreshFS() {
  var F = function () { return { t: 'f' }; };
  var D = function (kids) { return { t: 'd', c: kids || {} }; };
  return D({
    home: D({
      john: D({
        psyc101: D({ notes: D({ 'lec1.note': F(), 'lec2.note': F(), 'lec3.note': F() }) })
      }),
      carla: D({
        '.bashrc': F(),
        comp211: D({
          labs: D({ 'lab0.c': F() }),
          notes: D({ 'lec1.note': F(), 'lec2.note': F() })
        }),
        comp301: D({})
      })
    })
  });
}

var shFS, shCwd, shLines, shHist, shHistI;

function shReset() {
  shFS = shFreshFS();
  shCwd = ['home', 'carla'];
  shLines = [];
  shHist = []; shHistI = -1;
  shPrint('COMP 211 shell simulator. Type <b>help</b> for the command list, <b>reset</b> to start over.', 'dirout');
  shPrint('');
  shRender();
}

/* ---- path helpers ---- */
function shNodeAt(parts) {
  var n = shFS;
  for (var i = 0; i < parts.length; i++) {
    if (n.t !== 'd' || !Object.prototype.hasOwnProperty.call(n.c, parts[i])) return null;
    n = n.c[parts[i]];
  }
  return n;
}
function shResolve(p) {
  // returns array of path parts, or null if the path is syntactically impossible
  var parts;
  if (p === '~' || p.indexOf('~/') === 0) {
    parts = ['home', 'carla'].concat(p.slice(1).split('/'));
  } else if (p.charAt(0) === '/') {
    parts = p.split('/');
  } else {
    parts = shCwd.concat(p.split('/'));
  }
  var out = [];
  for (var i = 0; i < parts.length; i++) {
    var s = parts[i];
    if (s === '' || s === '.') continue;
    if (s === '..') { if (out.length) out.pop(); continue; }
    out.push(s);
  }
  return out;
}
function shJoin(parts) { return '/' + parts.join('/'); }
function shParentOf(parts) { return parts.slice(0, parts.length - 1); }
function shBase(parts) { return parts[parts.length - 1]; }

/* ---- terminal output ---- */
function shEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function shPrint(html, cls) {
  shLines.push(cls ? '<span class="' + cls + '">' + html + '</span>' : html);
  if (shLines.length > 400) shLines.shift();
}
function shErr(msg) { shPrint(shEsc(msg), 'err'); }

/* ---- commands ---- */
function shRun(line) {
  var raw = line.trim();
  shPrint('<span class="ps">' + shEsc(shCwd[shCwd.length - 1] || '/') + '$</span> <span class="cmdline">' + shEsc(raw) + '</span>');
  if (raw) { shHist.push(raw); shHistI = shHist.length; }
  if (!raw) { shRender(); return; }

  var tok = raw.split(/\s+/);
  var cmd = tok[0];
  var flags = [], args = [];
  for (var i = 1; i < tok.length; i++) {
    if (tok[i].charAt(0) === '-' && tok[i].length > 1) flags.push(tok[i].slice(1)); else args.push(tok[i]);
  }
  var fl = flags.join('');

  switch (cmd) {
    case 'help':
      shPrint('pwd                  print working directory');
      shPrint('cd &lt;path&gt;            change directory (cd alone -&gt; home)');
      shPrint('ls [-a] [path]       list contents (-a shows hidden)');
      shPrint('mkdir &lt;dir&gt;          make a directory');
      shPrint('touch &lt;file&gt;         create an empty file');
      shPrint('cp [-r] &lt;src&gt; &lt;dst&gt;  copy');
      shPrint('mv &lt;src&gt; &lt;dst&gt;       move or rename');
      shPrint('rm [-r] [-f] &lt;path&gt;  remove (permanent!)');
      shPrint('rmdir &lt;dir&gt;          remove an EMPTY directory');
      shPrint('clear / reset        clear the screen / rebuild the tree');
      break;

    case 'clear': shLines = []; break;
    case 'reset': shReset(); return;

    case 'pwd':
      shPrint(shJoin(shCwd) === '/' ? '/' : shJoin(shCwd));
      break;

    case 'cd': {
      var target = args.length ? args[0] : '~';
      var parts = shResolve(target);
      var node = shNodeAt(parts);
      if (!node) shErr('cd: ' + target + ': No such file or directory');
      else if (node.t !== 'd') shErr('cd: ' + target + ': Not a directory');
      else shCwd = parts;
      break;
    }

    case 'ls': {
      var lp = args.length ? shResolve(args[0]) : shCwd;
      var ln = shNodeAt(lp);
      if (!ln) { shErr('ls: cannot access \'' + args[0] + '\': No such file or directory'); break; }
      if (ln.t === 'f') { shPrint(shEsc(args[0])); break; }
      var names = Object.keys(ln.c).sort();
      if (fl.indexOf('a') === -1) names = names.filter(function (n) { return n.charAt(0) !== '.'; });
      else names = ['.', '..'].concat(names);
      if (!names.length) break;
      shPrint(names.map(function (n) {
        var kid = n === '.' || n === '..' ? { t: 'd' } : ln.c[n];
        return kid.t === 'd' ? '<span class="dirout">' + shEsc(n) + '</span>' : shEsc(n);
      }).join('   '));
      break;
    }

    case 'mkdir': {
      if (!args.length) { shErr('mkdir: missing operand'); break; }
      var mp = shResolve(args[0]);
      var mparent = shNodeAt(shParentOf(mp));
      if (!mparent || mparent.t !== 'd') { shErr('mkdir: cannot create directory \'' + args[0] + '\': No such file or directory'); break; }
      if (Object.prototype.hasOwnProperty.call(mparent.c, shBase(mp))) { shErr('mkdir: cannot create directory \'' + args[0] + '\': File exists'); break; }
      mparent.c[shBase(mp)] = { t: 'd', c: {} };
      break;
    }

    case 'touch': {
      if (!args.length) { shErr('touch: missing file operand'); break; }
      var tp = shResolve(args[0]);
      var tparent = shNodeAt(shParentOf(tp));
      if (!tparent || tparent.t !== 'd') { shErr('touch: cannot touch \'' + args[0] + '\': No such file or directory'); break; }
      if (!Object.prototype.hasOwnProperty.call(tparent.c, shBase(tp))) tparent.c[shBase(tp)] = { t: 'f' };
      break;
    }

    case 'cp':
    case 'mv': {
      if (args.length < 2) { shErr(cmd + ': missing destination file operand'); break; }
      var sp = shResolve(args[0]), src = shNodeAt(sp);
      if (!src) { shErr(cmd + ': cannot stat \'' + args[0] + '\': No such file or directory'); break; }
      if (cmd === 'cp' && src.t === 'd' && fl.indexOf('r') === -1) { shErr('cp: -r not specified; omitting directory \'' + args[0] + '\''); break; }
      var dp = shResolve(args[1]), dst = shNodeAt(dp);
      var destParent, destName;
      if (dst && dst.t === 'd') { destParent = dst; destName = shBase(sp); }
      else { destParent = shNodeAt(shParentOf(dp)); destName = shBase(dp); }
      if (!destParent || destParent.t !== 'd') { shErr(cmd + ': cannot create \'' + args[1] + '\': No such file or directory'); break; }
      var copy = JSON.parse(JSON.stringify(src));
      destParent.c[destName] = copy;
      if (cmd === 'mv') {
        var sParent = shNodeAt(shParentOf(sp));
        delete sParent.c[shBase(sp)];
        if (shCwd.join('/').indexOf(sp.join('/')) === 0) shCwd = shParentOf(sp);
      }
      break;
    }

    case 'rm': {
      if (!args.length) { shErr('rm: missing operand'); break; }
      var rp = shResolve(args[0]), rn = shNodeAt(rp);
      if (!rn) { if (fl.indexOf('f') === -1) shErr('rm: cannot remove \'' + args[0] + '\': No such file or directory'); break; }
      if (rn.t === 'd' && fl.indexOf('r') === -1) { shErr('rm: cannot remove \'' + args[0] + '\': Is a directory'); break; }
      if (!rp.length) { shErr('rm: refusing to remove the root directory'); break; }
      delete shNodeAt(shParentOf(rp)).c[shBase(rp)];
      if (shCwd.join('/').indexOf(rp.join('/')) === 0) shCwd = shParentOf(rp);
      break;
    }

    case 'rmdir': {
      if (!args.length) { shErr('rmdir: missing operand'); break; }
      var qp = shResolve(args[0]), qn = shNodeAt(qp);
      if (!qn) { shErr('rmdir: failed to remove \'' + args[0] + '\': No such file or directory'); break; }
      if (qn.t !== 'd') { shErr('rmdir: failed to remove \'' + args[0] + '\': Not a directory'); break; }
      if (Object.keys(qn.c).length) { shErr('rmdir: failed to remove ' + args[0] + ': Directory not empty'); break; }
      delete shNodeAt(shParentOf(qp)).c[shBase(qp)];
      break;
    }

    default:
      shErr(cmd + ': command not found');
  }
  shRender();
}

function shKey(e) {
  var inp = document.getElementById('sh-in');
  if (e.key === 'Enter') { var v = inp.value; inp.value = ''; shRun(v); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (shHistI > 0) { shHistI--; inp.value = shHist[shHistI]; } }
  else if (e.key === 'ArrowDown') { e.preventDefault(); if (shHistI < shHist.length - 1) { shHistI++; inp.value = shHist[shHistI]; } else { shHistI = shHist.length; inp.value = ''; } }
}

function shDemo() {
  ['cd /home/carla', 'cd comp301', 'mkdir labs', 'mkdir labs/lab00', 'touch labs/lab00/file1.java',
   'cd labs/lab00', 'touch file2.java', 'cd ..', 'mkdir lab01', 'cd ../..', 'mkdir temp', 'cd ..', 'pwd'
  ].forEach(shRun);
}

/* ---- rendering ---- */
function shRender() {
  var out = document.getElementById('sh-out');
  if (!out) return;
  out.innerHTML = shLines.join('\n');
  out.scrollTop = out.scrollHeight;
  document.getElementById('sh-ps').textContent = (shCwd[shCwd.length - 1] || '/') + '$';
  document.getElementById('sh-tree').innerHTML = shTree();
}
function shTree() {
  var cwdKey = shCwd.join('/');
  var lines = [];
  function label(name, node, parts) {
    var isCwd = parts.join('/') === cwdKey;
    var cls = node.t === 'd' ? 'd' : 'f';
    if (name.charAt(0) === '.') cls = 'hid';
    var txt = shEsc(name);
    return isCwd ? '<span class="cwd">' + txt + '</span>' : '<span class="' + cls + '">' + txt + '</span>';
  }
  function walk(node, parts, prefix) {
    var names = Object.keys(node.c).sort(function (a, b) {
      var ad = node.c[a].t === 'd' ? 0 : 1, bd = node.c[b].t === 'd' ? 0 : 1;
      return ad - bd || a.localeCompare(b);
    });
    names.forEach(function (n, i) {
      var last = i === names.length - 1;
      var kid = node.c[n], kp = parts.concat(n);
      lines.push(prefix + (last ? '`-- ' : '|-- ') + label(n, kid, kp));
      if (kid.t === 'd') walk(kid, kp, prefix + (last ? '    ' : '|   '));
    });
  }
  lines.push(cwdKey === '' ? '<span class="cwd">/</span>' : '<span class="d">/</span>');
  walk(shFS, [], '');
  return lines.join('\n');
}

function initL1() { shReset(); }
