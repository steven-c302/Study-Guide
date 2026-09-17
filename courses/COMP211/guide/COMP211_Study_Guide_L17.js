/* ============================================================
   CL11 — Unix Basics: Shell Config, Env Vars & $PATH, incl. RD10
   (.bashrc / dot files). Injects into #l17.
   Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l17').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l17-prompt')">1 &middot; Shell Prompt &amp; PS1</button>
  <button onclick="showTopic(this,'l17-envvars')">2 &middot; Environment Variables</button>
  <button onclick="showTopic(this,'l17-path')">3 &middot; $PATH</button>
  <button onclick="showTopic(this,'l17-bashrc')">4 &middot; .bashrc, Aliases &amp; RD10</button>
</nav>
<main>

<!-- ============ SHELL PROMPT ============ -->
<section class="topic active" id="l17-prompt">
<h2>CL11 &middot; Shell Prompt Configuration</h2>

<div class="card">
  <h3>CLI, Terminal, Shell &mdash; quick recap</h3>
  <ul>
    <li><b>CLI (Command Line Interface):</b> a text-based way to interact with a computer, typing commands instead of clicking.</li>
    <li><b>Terminal:</b> the program/window that lets you type commands and see output.</li>
    <li><b>Shell:</b> the program that actually interprets and runs your commands (Bash is the shell used in this course).</li>
  </ul>
  <p>Written instructions often show a <code>$</code> at the start of a line to represent the shell prompt &mdash; you don't
  type the <code>$</code> itself, just what comes after it.</p>
</div>

<div class="card concept">
  <h3>PS1 &mdash; the prompt variable</h3>
  <p><code>PS1</code> is the environment variable that controls what your shell prompt looks like. You can build a custom
  prompt out of format specifiers:</p>
  <table class="cmp">
    <tr><th>Specifier</th><th>Meaning</th></tr>
    <tr><td><code>%n</code></td><td>Username</td></tr>
    <tr><td><code>@</code></td><td>Literal "at" separator</td></tr>
    <tr><td><code>%m</code></td><td>Hostname (machine name)</td></tr>
    <tr><td><code>%1~</code></td><td>Current directory (abbreviated to the last component)</td></tr>
    <tr><td><code>%#</code></td><td>A prompt symbol that differs for a regular user vs. root</td></tr>
  </table>
  <p class="muted">Bash's own <code>PS1</code> syntax uses specifiers like <code>\\u</code> (user), <code>\\h</code> (host),
  and <code>\\w</code> (working directory) &mdash; different characters, same underlying idea: a variable that controls
  what gets displayed before every command.</p>
</div>

<div class="card">
  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">Multiple choice</span>The <code>$</code> shown at the start of a line in course
    instructions means:</div>
    <button class="opt" data-i="0">Part of the command you must type</button>
    <button class="opt" data-i="1">A special Bash variable</button>
    <button class="opt" data-i="2">The shell prompt &mdash; don't type it</button>
    <button class="opt" data-i="3">A syntax error marker</button>
    <div class="fb">The <code>$</code> just represents the prompt so instructions read naturally; only what follows it
    should actually be typed.</div>
  </div>
</div>
</section>

<!-- ============ ENVIRONMENT VARIABLES ============ -->
<section class="topic" id="l17-envvars">
<h2>CL11 &middot; Environment Variables</h2>

<div class="card concept">
  <h3>What's an environment variable?</h3>
  <p>An <b>environment variable</b> is a named piece of data stored by the shell that programs (including child processes)
  can read. Example:</p>
  <pre>export COURSE="COMP 211"</pre>
  <p>This creates (or promotes) a variable named <code>COURSE</code> and marks it as an <b>environment</b> variable,
  meaning it's passed along to any child processes the shell starts.</p>
</div>

<div class="card">
  <h3>Common environment variables</h3>
  <table class="cmp">
    <tr><th>Variable</th><th>Holds</th></tr>
    <tr><td><code>PATH</code></td><td>Directories the shell searches for executables</td></tr>
    <tr><td><code>HOME</code></td><td>Your home directory</td></tr>
    <tr><td><code>USER</code></td><td>Your username</td></tr>
    <tr><td><code>SHELL</code></td><td>Path to your default shell (e.g. <code>/bin/bash</code>)</td></tr>
    <tr><td><code>OLDPWD</code></td><td>The previous working directory (before your last <code>cd</code>)</td></tr>
    <tr><td><code>PS1</code></td><td>Your prompt format string</td></tr>
  </table>
  <p>View them all with <code>printenv</code> or <code>env</code>. View one with <code>echo "$VAR"</code>.</p>
</div>

<div class="card">
  <h3>$VAR vs. &#36;{VAR} vs. bare VAR</h3>
  <table class="cmp">
    <tr><th>Form</th><th>Meaning</th></tr>
    <tr><td><code>VAR</code></td><td>Just the literal text "VAR" &mdash; <b>not</b> expanded</td></tr>
    <tr><td><code>$VAR</code></td><td>Expands to the variable's value</td></tr>
    <tr><td><code>${VAR}</code></td><td>Same expansion, but with explicit boundaries &mdash; needed when the variable
    name is immediately followed by more text, e.g. <code>${VAR}suffix</code> (without braces, Bash would try to expand
    a variable literally named <code>VARsuffix</code>).</td></tr>
  </table>
</div>

<div class="card warn">
  <h3>Setting, exporting, modifying, unsetting</h3>
  <ul>
    <li><b>Assign a shell variable</b> (no spaces around <code>=</code>): <code>VAR=value</code>. Only visible in the
    current shell, not in child processes.</li>
    <li><b>Promote it to an environment variable:</b> <code>export VAR</code> (or combine: <code>export VAR=value</code>).
    Now child shells/processes can see it too.</li>
    <li><b>Modify an existing variable</b> (append to it): <code>export PATH="$PATH:$HOME/bin"</code> &mdash; the old
    value is referenced with <code>$PATH</code> so nothing is lost.</li>
    <li><b>Remove a variable:</b> <code>unset VAR</code>.</li>
  </ul>
</div>

<div class="card concept">
  <h3>Child shells &amp; what they inherit</h3>
  <p>Running <code>bash</code> from inside a shell starts a <b>child shell</b>. A child shell inherits <b>environment
  variables</b> (anything <code>export</code>ed) from its parent, but does <b>not</b> inherit plain shell variables that
  were never exported. Use <code>exit</code> to leave the child shell and return to the parent.</p>
  <div class="two">
    <div class="card">
      <p><b>In the parent shell:</b></p>
      <pre>export COURSE="COMP 211"
EDITOR=nano
bash          # start a child shell</pre>
    </div>
    <div class="card">
      <p><b>In the child shell:</b></p>
      <pre>echo "$COURSE"   # -&gt; COMP 211 (inherited, exported)
echo "$EDITOR"    # -&gt; (empty, never exported)
exit               # back to parent</pre>
    </div>
  </div>
  <p class="muted"><code>COURSE</code> was exported, so the child shell can see it. <code>EDITOR</code> was only ever a
  plain shell variable in the parent (never exported), so the child shell has no idea it exists.</p>
</div>

<div class="card">
  <div class="q">
    <p>To make a shell variable visible to child processes, you must ______ it.</p>
    <input class="fillblank" data-answer="export~~~export it">
    <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
    <div class="fb"></div>
  </div>
</div>
</section>

<!-- ============ $PATH ============ -->
<section class="topic" id="l17-path">
<h2>CL11 &middot; $PATH</h2>

<div class="card concept">
  <h3>What $PATH is for</h3>
  <p><code>$PATH</code> is a colon-separated list of directories. When you type a command name (not a path), the shell
  searches each directory in <code>$PATH</code>, <b>in order</b>, and runs the first matching executable it finds.</p>
  <p>A typical Linux <code>$PATH</code>: <code>/usr/bin:/bin</code></p>
  <table class="cmp">
    <tr><th>Directory</th><th>Purpose</th><th>Examples</th></tr>
    <tr><td><code>/usr/bin</code></td><td>Many standard system commands</td><td><code>gcc</code>, <code>python3</code>, <code>git</code></td></tr>
    <tr><td><code>/bin</code></td><td>Essential system commands</td><td><code>ls</code>, <code>cp</code>, <code>mv</code>, <code>cat</code>, <code>mkdir</code>, <code>pwd</code>, <code>rm</code></td></tr>
  </table>
  <p>The <code>which</code> command tells you which executable would actually run: <code>which python3</code> &rarr;
  <code>/usr/bin/python3</code>.</p>
</div>

<div class="card">
  <h3>Worked example: which <code>hello</code> runs?</h3>
  <p>You're in <code>/home/student/project</code>, and <code>$PATH</code> is
  <code>/home/student/bin:/usr/bin:/bin</code>. There's a <code>hello</code> executable in <code>/usr/bin</code>, in
  <code>/home/student/bin</code>, and in the current directory.</p>
  <table class="cmp">
    <tr><th>Command</th><th>Which <code>hello</code> runs?</th></tr>
    <tr><td><code>./hello</code></td><td><code>/home/student/project/hello</code> &mdash; explicit relative path, no $PATH search</td></tr>
    <tr><td><code>/usr/bin/hello</code></td><td><code>/usr/bin/hello</code> &mdash; explicit absolute path</td></tr>
    <tr><td><code>../bin/hello</code></td><td><code>/home/student/bin/hello</code> &mdash; explicit relative path</td></tr>
    <tr><td><code>hello</code></td><td><code>/home/student/bin/hello</code> &mdash; bare name, so $PATH is searched
    <b>in order</b>, and <code>/home/student/bin</code> comes first</td></tr>
  </table>
  <p class="muted">Key idea: giving any kind of path (<code>./</code>, <code>../</code>, or an absolute path starting with
  <code>/</code>) skips the $PATH search entirely. Only a bare command name triggers a $PATH search.</p>
</div>

<div class="card warn">
  <h3>Modifying $PATH &mdash; order matters, and don't nuke it</h3>
  <div class="two">
    <div class="card">
      <p><b>Add to the front</b> (higher priority):</p>
      <pre>export PATH="/home/student/bin:$PATH"</pre>
      <p class="muted">Now <code>/home/student/bin</code> is searched first.</p>
    </div>
    <div class="card">
      <p><b>Add to the end</b> (lower priority):</p>
      <pre>export PATH="$PATH:/home/student/bin"</pre>
      <p class="muted">Existing directories are searched first; <code>/home/student/bin</code> is the fallback.</p>
    </div>
  </div>
  <p><b>Careful:</b> <code>export PATH="/home/student/bin"</code> (no <code>$PATH</code> on the right side)
  <b>replaces</b> the entire PATH, which can break basic commands like <code>ls</code>, <code>cat</code>, and
  <code>grep</code> because the shell can no longer find them!</p>
</div>

<div class="card">
  <h3>Worked example: building a new $PATH</h3>
  <p>Suppose <code>$PATH</code> is <code>/usr/local/bin:/usr/bin:/bin</code> and you run:</p>
  <pre>export PATH="/home/student/bin:$PATH"</pre>
  <p>The new value of <code>$PATH</code> is:</p>
  <button class="btn small" onclick="toggleReveal(this)">Show answer</button>
  <div class="reveal"><code>/home/student/bin:/usr/local/bin:/usr/bin:/bin</code></div>
</div>

<div class="card">
  <h3>Worked example: braces needed</h3>
  <p>Current PATH: <code>/usr/local/bin:/usr/bin:/bin</code>, home directory: <code>/home/student</code>. You run:</p>
  <pre>export PATH="${PATH}:${HOME}/mybin"</pre>
  <p>New value of <code>$PATH</code>:</p>
  <button class="btn small" onclick="toggleReveal(this)">Show answer</button>
  <div class="reveal"><code>/usr/local/bin:/usr/bin:/bin:/home/student/mybin</code></div>
</div>

<div class="card concept">
  <h3>Pipeline example: which programs use $PATH?</h3>
  <p>Given the pipeline: <code>./producer | sort | ./consumer | wc -l</code></p>
  <table class="cmp">
    <tr><th>Command</th><th>Search $PATH or use specified path?</th></tr>
    <tr><td><code>./producer</code></td><td>Specified path (starts with <code>./</code>)</td></tr>
    <tr><td><code>sort</code></td><td>Search $PATH (bare name)</td></tr>
    <tr><td><code>./consumer</code></td><td>Specified path (starts with <code>./</code>)</td></tr>
    <tr><td><code>wc</code></td><td>Search $PATH (bare name)</td></tr>
  </table>
</div>

<div class="card danger">
  <h3>Temporary vs. persistent $PATH changes</h3>
  <p><code>export PATH="$PATH:/home/student/bin"</code> only changes <b>the current shell session</b>. Verify it with
  <code>echo $PATH</code>. Close the terminal and open a new one, and the change is <b>gone</b>. To make it permanent, put
  the <code>export</code> command in your <code>~/.bashrc</code> (next topic).</p>
</div>
</section>

<!-- ============ .bashrc / RD10 ============ -->
<section class="topic" id="l17-bashrc">
<h2>CL11 &middot; .bashrc, Aliases &amp; RD10</h2>

<div class="card concept">
  <h3>What is <code>.bashrc</code>?</h3>
  <p><code>~/.bashrc</code> is a <b>configuration file for Bash</b>. It's not just a list of settings &mdash; it literally
  contains Bash <b>commands</b> that get executed every time you start a new interactive Bash shell.</p>
  <ul>
    <li>Located in your <b>home directory</b>: <code>~/.bashrc</code>.</li>
    <li>The leading <code>.</code> makes it a <b>hidden file</b> &mdash; it won't show up with a plain <code>ls</code>.
    See it with <code>ls -a ~</code>.</li>
  </ul>
</div>

<div class="card">
  <h3>Bash startup sequence</h3>
  <p>Start Bash &rarr; Read <code>~/.bashrc</code> &rarr; Execute the commands in <code>.bashrc</code> &rarr; Display
  your prompt &rarr; Wait for you to enter commands.</p>
  <p class="muted">This is why anything you put in <code>.bashrc</code> &mdash; a custom <code>PS1</code>, an
  <code>export</code>, an <code>alias</code> &mdash; is automatically in effect every time you open a new terminal.</p>
</div>

<div class="card">
  <h3>A typical <code>.bashrc</code></h3>
  <pre># Change the prompt
PS1="learncli$ "

# Create a shortcut
alias ll="ls -al"

# Set an environment variable
export EDITOR="vim"

# Add a directory containing programs to PATH
export PATH="${PATH}:${HOME}/bin"</pre>
</div>

<div class="card concept">
  <h3><code>source</code> &mdash; reloading without a new shell</h3>
  <p>If you edit <code>.bashrc</code> while a shell is already running, the change generally <b>won't</b> affect that
  already-running shell (it only re-reads <code>.bashrc</code> at startup). You have two options:</p>
  <ul>
    <li>Close the terminal and open a new one, or</li>
    <li>Tell the <b>current</b> shell to re-read the file: <code>source ~/.bashrc</code></li>
  </ul>
  <p>The <code>source</code> command tells Bash to read a file and execute the commands in it <b>in the current shell</b>
  (rather than in a new child process). You've likely used this before: activating a Python virtual environment is
  exactly this pattern &mdash; <code>source .venv/bin/activate</code> runs a shell script that modifies your <b>current
  shell's</b> <code>$PATH</code> (and prompt) so that <code>python</code>/<code>pip</code> point inside <code>.venv</code>
  instead of the system Python. That's also why activating a venv has to be done with <code>source</code> (or the
  shorthand <code>.</code>) rather than just running the script directly &mdash; running it normally would modify a
  child shell's environment, which disappears the instant that child shell exits.</p>
</div>

<div class="card">
  <h3>Alias</h3>
  <p>An <b>alias</b> creates a shortcut for a shell command:</p>
  <pre>alias ll='ls -al'
alias c='clear'</pre>
  <p>After adding these (and reloading, e.g. via <code>source ~/.bashrc</code>), typing <code>ll</code> runs
  <code>ls -al</code>, and typing <code>c</code> clears the terminal. A very common safety alias:</p>
  <pre>alias rm='rm -i'</pre>
  <p>This makes plain <code>rm somefile</code> prompt you to confirm before deleting &mdash; it doesn't rename anything
  or block <code>rm</code> outright, it just adds the <code>-i</code> (interactive/confirm) option automatically.</p>
</div>

<div class="card danger">
  <h3>RD10 self-check &mdash; Dot Files &amp; .bashrc</h3>
  <p class="muted">Questions mirror the actual graded RD10 reading quiz (Dive Into Systems &sect;17.14).</p>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">1.1</span>What is the primary purpose of dot files, such as
    <code>.bashrc</code> and <code>.vimrc</code>?</div>
    <button class="opt" data-i="0">To store deleted files</button>
    <button class="opt" data-i="1">To configure the behavior of applications</button>
    <button class="opt" data-i="2">To store executable programs</button>
    <button class="opt" data-i="3">To prevent users from accessing files</button>
    <div class="fb">Dot files like <code>.bashrc</code> and <code>.vimrc</code> hold configuration/settings for an
    application or shell.</div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">1.1</span>A student edits their <code>.bashrc</code> file, but the changes do
    not appear in their currently running Bash shell. What could they do to apply the changes?</div>
    <button class="opt" data-i="0"><code>ls -a</code></button>
    <button class="opt" data-i="1"><code>source ~/.bashrc</code></button>
    <button class="opt" data-i="2"><code>which .bashrc</code></button>
    <button class="opt" data-i="3"><code>env .bashrc</code></button>
    <div class="fb"><code>source</code> re-reads and executes the file in the current shell, applying the change
    immediately without opening a new terminal.</div>
  </div>

  <div class="q" data-mc="0">
    <div class="prompt"><span class="tag">1.1</span>What does the <code>env</code> command display?</div>
    <button class="opt" data-i="0">All environment variables</button>
    <button class="opt" data-i="1">All hidden files</button>
    <button class="opt" data-i="2">All executable programs</button>
    <button class="opt" data-i="3">All command aliases</button>
    <div class="fb"><code>env</code> (and <code>printenv</code>) lists every environment variable currently set.</div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">1.1</span>Which command can you use to determine which version of
    <code>gcc</code> will be executed?</div>
    <button class="opt" data-i="0"><code>where gcc</code></button>
    <button class="opt" data-i="1"><code>echo gcc</code></button>
    <button class="opt" data-i="2"><code>which gcc</code></button>
    <button class="opt" data-i="3"><code>path gcc</code></button>
    <div class="fb"><code>which</code> searches $PATH and reports the exact executable that would run.</div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">1.2</span>Which command displays the current value of the
    <code>PATH</code> environment variable?</div>
    <button class="opt" data-i="0"><code>env PATH</code></button>
    <button class="opt" data-i="1"><code>which PATH</code></button>
    <button class="opt" data-i="2"><code>echo $PATH</code></button>
    <button class="opt" data-i="3"><code>ls $PATH</code></button>
    <div class="fb"><code>$</code> expands the variable so <code>echo</code> can print its value.</div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">1.2</span>What is the purpose of the <code>PATH</code> environment variable?</div>
    <button class="opt" data-i="0">It specifies the current working directory</button>
    <button class="opt" data-i="1">It lists directories where the shell should search for programs</button>
    <button class="opt" data-i="2">It specifies where hidden files are stored</button>
    <button class="opt" data-i="3">It stores the full path of every file on the system</button>
    <div class="fb">The shell walks these directories, in order, looking for a matching executable.</div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">1.2</span>Consider: <code>PATH=$PATH:/home/sarita/mybin</code>. What does it do?</div>
    <button class="opt" data-i="0">Replaces the existing PATH with /home/sarita/mybin</button>
    <button class="opt" data-i="1">Adds /home/sarita/mybin to the beginning of PATH</button>
    <button class="opt" data-i="2">Adds /home/sarita/mybin to the end of the existing PATH</button>
    <button class="opt" data-i="3">Changes the current directory to /home/sarita/mybin</button>
    <div class="fb">Putting <code>$PATH</code> first preserves the old value; the new directory is appended after it,
    so it's searched last.</div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">1.2</span>Why might a user add a directory containing their own programs to
    PATH?</div>
    <button class="opt" data-i="0">So the programs become hidden</button>
    <button class="opt" data-i="1">So the programs can be run without typing their full path</button>
    <button class="opt" data-i="2">So Bash automatically compiles the programs</button>
    <button class="opt" data-i="3">So the programs cannot be deleted</button>
    <div class="fb">Once its directory is on PATH, a bare command name is enough &mdash; no <code>./</code> or full path
    needed.</div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">1.2</span>A user's PATH is <code>/usr/bin:/bin:/home/alex/mybin</code>.
    There's a program named <code>testprog</code> in both <code>/bin</code> and <code>/home/alex/mybin</code>. Which
    version runs when the user types <code>testprog</code>?</div>
    <button class="opt" data-i="0">/home/alex/mybin/testprog</button>
    <button class="opt" data-i="1">/bin/testprog</button>
    <button class="opt" data-i="2">Both programs</button>
    <button class="opt" data-i="3">Whichever was created most recently</button>
    <div class="fb">The shell searches PATH left to right and stops at the first match; <code>/bin</code> comes before
    <code>/home/alex/mybin</code>.</div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">1.3</span>What is the purpose of a Bash alias?</div>
    <button class="opt" data-i="0">To rename a file</button>
    <button class="opt" data-i="1">To create another user account</button>
    <button class="opt" data-i="2">To provide shorthand for a command or automatically add options to it</button>
    <button class="opt" data-i="3">To add a directory to PATH</button>
    <div class="fb">An alias is a text substitution the shell performs before running the command.</div>
  </div>

  <div class="q" data-mc="2">
    <div class="prompt"><span class="tag">1.3</span>Given <code>alias rm="rm -i"</code> in .bashrc, what happens when
    the user enters <code>rm notes</code>?</div>
    <button class="opt" data-i="0">notes is immediately deleted</button>
    <button class="opt" data-i="1">Bash refuses to run rm</button>
    <button class="opt" data-i="2">The user is prompted to confirm before notes is removed</button>
    <button class="opt" data-i="3">The file is renamed to notes-i</button>
    <div class="fb">The alias expands <code>rm notes</code> into <code>rm -i notes</code>, adding the interactive/confirm
    flag.</div>
  </div>

  <div class="q" data-mc="1">
    <div class="prompt"><span class="tag">1.3</span>Sam adds <code>alias gt31="cd ~/classes/CS31"</code> to .bashrc.
    After the alias is loaded, what does entering <code>gt31</code> do?</div>
    <button class="opt" data-i="0">Lists the contents of the CS31 directory</button>
    <button class="opt" data-i="1">Changes the current directory to ~/classes/CS31</button>
    <button class="opt" data-i="2">Adds CS31 to PATH</button>
    <button class="opt" data-i="3">Creates a directory named gt31</button>
    <div class="fb">The alias is just shorthand for the literal <code>cd ~/classes/CS31</code> command.</div>
  </div>
</div>
</section>

</main>
`;
