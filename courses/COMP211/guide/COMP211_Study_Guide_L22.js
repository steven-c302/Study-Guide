/* ============================================================
   LESSON 22 — HW04 · Debugging (homework review). Six problems: breakpoints & Debug
   Console, conditional breakpoints, step into/over/out, call stack, launch.json,
   debugger detective. Fresh example programs. Pairs with Mastery unit u17.
   Injects into #l22. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l22').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l22-intro')">1 &middot; What HW04 Asks</button>
  <button onclick="showTopic(this,'l22-p1')">2 &middot; P1 Breakpoints &amp; Console</button>
  <button onclick="showTopic(this,'l22-p2')">3 &middot; P2 Conditional Breakpoints</button>
  <button onclick="showTopic(this,'l22-p3')">4 &middot; P3 Step Into / Over / Out</button>
  <button onclick="showTopic(this,'l22-p4')">5 &middot; P4 The Call Stack</button>
  <button onclick="showTopic(this,'l22-p5')">6 &middot; P5 launch.json</button>
  <button onclick="showTopic(this,'l22-p6')">7 &middot; P6 Debugger Detective</button>
</nav>
<main>

<section class="topic active" id="l22-intro">
  <h2>HW04 &middot; Debugging: What the Homework Asks</h2>
  <div class="concept">HW04 is a <b>practice-the-debugger</b> homework: instead of finding bugs by reading source, you use the debugger to <i>observe</i> what the program does and let the evidence point at the bug. Every problem follows the same loop from CL10:</div>

  <div class="card">
    <ol><li><b>Run the program normally</b> and notice what is wrong (wrong output, failing test).</li><li><b>Write down what you expected</b> (a prediction table).</li><li><b>Set a breakpoint</b> (conditional if the loop is long) and start the debugger.</li><li><b>Step</b> (over / into / out), reading the Variables panel, the Watch panel or the Debug Console.</li><li>The <b>first line where reality differs from your prediction</b> is the bug. Fix it, restart the debugger, rerun.</li></ol>
  </div>

  <div class="card">
    <table class="cmp">
      <tr><th>HW04 problem</th><th>Skill</th><th>Tab</th></tr>
      <tr><td>1 &middot; Breakpoints, Continue, Debug Console</td><td>pause, resume, evaluate expressions</td><td>2</td></tr>
      <tr><td>2 &middot; Conditional breakpoints</td><td>pause only on the iteration you care about</td><td>3</td></tr>
      <tr><td>3 &middot; Step into / over / out</td><td>walk through nested calls</td><td>4</td></tr>
      <tr><td>4 &middot; Reading the call stack</td><td>inspect variables in other frames</td><td>5</td></tr>
      <tr><td>5 &middot; Modifying <code>launch.json</code></td><td>redirect stdin from a file</td><td>6</td></tr>
      <tr><td>6 &middot; Debugger detective</td><td>choose your own tools (bit flags)</td><td>7</td></tr>
    </table>
  </div>

  <div class="card">
    <p class="muted">Why this matters beyond the homework: Checkoff 2 (the debugging practical) asks you to <b>predict before you act</b> and explain how you can tell. See the Checkoff 2 Prep lesson.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which is the <b>best first step</b> when a program prints a wrong answer?</div>
      <button class="opt" data-i="0">Rewrite the function</button>
      <button class="opt" data-i="1">Write down what you expected, then use a breakpoint and step until reality differs from the prediction</button>
      <button class="opt" data-i="2">Add random printf calls everywhere</button>
      <button class="opt" data-i="3">Recompile with -O3</button>
      <div class="fb">Predicting first gives the debugger session a target: the first mismatch is the bug.</div>
    </div>
  </div>
</section>

<section class="topic" id="l22-p1">
  <h2>HW04 &middot; Problem 1: Breakpoints, Continue and the Debug Console</h2>
  <div class="concept">A <b>breakpoint</b> pauses the program <b>before</b> the marked line runs. <b>Continue</b> resumes until the next time a breakpoint is hit (in a loop, the next iteration). The <b>Debug Console</b> evaluates any C expression against the paused state, e.g. <code>temps[i] &gt; max</code> (1 = true, 0 = false).</div>

  <h3>Example program (not the homework's): highest temperature</h3>

  <div class="card">
<pre>int temps[6] = {58, 61, 66, 63, 70, 62};
int max = temps[0];
for (int i = 1; i &lt; 6; i++) {
    if (temps[i] &gt; max) {        // &lt;-- breakpoint here
        max = temps[i - 1];
    }
}
printf("%d", max);</pre>
    <p>Run normally: it prints <b>63</b>, but the highest temperature is <b>70</b>. Set a breakpoint on the <code>if</code>. The debugger pauses each iteration:</p>
    <table class="cmp">
      <tr><th>Pause #</th><th>i</th><th>temps[i]</th><th>max</th></tr>
      <tr><td>1st</td><td>1</td><td>61</td><td>58</td></tr>
      <tr><td>after Continue</td><td>2</td><td>66</td><td>58</td></tr>
      <tr><td>after Continue</td><td>3</td><td>63</td><td>61</td></tr>
      <tr><td>after Continue</td><td>4</td><td>70</td><td>66</td></tr>
    </table>
    <p>At the 2nd pause <code>max</code> is still 58 even though the first comparison (61 &gt; 58) was true: the body assigned <code>temps[i - 1]</code> (= 58) instead of <code>temps[i]</code> (= 61). The first statement that gives <code>max</code> a wrong value is <code>max = temps[i - 1];</code>. Fix: <code>max = temps[i];</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the program above print when run normally?</div>
      <input class="fillblank sm" data-answer="63">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The final max is temps[3] = 63 because each assignment lags one element behind.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>When it first pauses at the breakpoint, what is <code>max</code>?</div>
      <input class="fillblank sm" data-answer="58">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">max starts as temps[0] = 58.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>After pressing Continue once, what is <code>max</code>?</div>
      <input class="fillblank sm" data-answer="58">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The first iteration set max = temps[0] = 58 (the old value), so it is still 58.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>At the 2nd pause, what does <code>temps[i] &gt; max</code> evaluate to in the Debug Console?</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">66 &gt; 58 is true, so the console shows 1.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which statement first makes <code>max</code> incorrect?</div>
      <button class="opt" data-i="0"><code>int max = temps[0];</code></button>
      <button class="opt" data-i="1"><code>if (temps[i] &gt; max)</code></button>
      <button class="opt" data-i="2"><code>max = temps[i - 1];</code></button>
      <button class="opt" data-i="3"><code>printf("%d", max);</code></button>
      <div class="fb">It stores the previous element rather than the current one.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <b>Continue</b> do?</div>
      <button class="opt" data-i="0">Runs one line</button>
      <button class="opt" data-i="1">Resumes until the next breakpoint is hit (or the program ends)</button>
      <button class="opt" data-i="2">Restarts the program</button>
      <button class="opt" data-i="3">Steps into a function</button>
      <div class="fb">Continue resumes normal execution until a breakpoint pauses it again.</div>
    </div>
  </div>
</section>

<section class="topic" id="l22-p2">
  <h2>HW04 &middot; Problem 2: Conditional Breakpoints</h2>
  <div class="concept">A <b>conditional breakpoint</b> pauses only when its <b>expression is true</b>. In VS Code, right-click the breakpoint (or the gutter) and choose <b>Edit Breakpoint &rarr; Expression</b>. Use <code>==</code> (comparison), never <code>=</code> (assignment). Typical conditions: <code>i==3</code>, <code>weights[i]&gt;25</code>, <code>c=='x'</code>.</div>

  <h3>Example program: parcel shipping</h3>

  <div class="card">
    <p>Rules: up to 8 lb costs $4; over 8 up to 20 lb costs $7; over 20 lb costs $11.</p>
<pre>int cost(int w) {
    int c = 4;
    if (w &gt; 8)  c = 7;
    if (w &gt; 20) c = 7;     // bug?
    return c;
}
int weights[5] = {3, 14, 9, 31, 22};</pre>
    <p>Running it shows costs 4, 7, 7, 7, 7. Package index 3 (31 lb) costs $7 but should be $11. Set a <b>conditional breakpoint</b> on <code>int c = 4;</code> with the condition <code>w==31</code> (or in the caller, <code>i==3</code>) so you do not step through the earlier packages.</p>
    <table class="cmp">
      <tr><th>Step</th><th>Line just executed</th><th>c</th></tr>
      <tr><td>pause</td><td>(before <code>int c = 4;</code>)</td><td>garbage</td></tr>
      <tr><td>step 1</td><td>int c = 4;</td><td>4</td></tr>
      <tr><td>step 2</td><td>if (w &gt; 8) c = 7;</td><td>7</td></tr>
      <tr><td>step 3</td><td>if (w &gt; 20) c = 7;</td><td>7  &larr; should be 11</td></tr>
    </table>
    <p>The last line assigns 7 again instead of 11. Fix: <code>c = 11;</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write the condition (no spaces) that pauses only when <code>i</code> is 3.</div>
      <input class="fillblank sm" data-answer="i==3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Use the equality operator <code>==</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write the condition (no spaces) that pauses only when <code>weights[i]</code> is greater than 20.</div>
      <input class="fillblank sm" data-answer="weights[i]>20">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A relational expression on the array element.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the example, what is <code>c</code> after the <b>second</b> step (<code>if (w &gt; 8) c = 7;</code>) for w = 31?</div>
      <input class="fillblank sm" data-answer="7">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">w &gt; 8 is true, so c becomes 7.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the example, what does <code>cost(22)</code> return (buggy code)?</div>
      <input class="fillblank sm" data-answer="7">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">22 &gt; 8 sets 7; 22 &gt; 20 sets 7 again.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What should <code>cost(31)</code> return according to the rules?</div>
      <input class="fillblank sm" data-answer="11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Over 20 lb costs $11.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why use a conditional breakpoint inside a loop?</div>
      <button class="opt" data-i="0">It runs the program faster</button>
      <button class="opt" data-i="1">It pauses only for the iteration you care about instead of every iteration</button>
      <button class="opt" data-i="2">It changes the loop condition</button>
      <button class="opt" data-i="3">It prevents crashes</button>
      <div class="fb">Otherwise you would press Continue through every earlier iteration.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which condition pauses only for index 2?</div>
      <button class="opt" data-i="0"><code>i=2</code></button>
      <button class="opt" data-i="1"><code>i==2</code></button>
      <button class="opt" data-i="2"><code>i&lt;2</code></button>
      <button class="opt" data-i="3"><code>2</code></button>
      <div class="fb"><code>=</code> assigns (and would change i); <code>==</code> compares.</div>
    </div>
  </div>
</section>

<section class="topic" id="l22-p3">
  <h2>HW04 &middot; Problem 3: Step Into, Step Over and Step Out</h2>
  <div class="concept"><b>Step Over</b>: run the whole line (including any function it calls) and pause on the next line of the <i>same</i> function. <b>Step Into</b>: if the line calls a function, pause on that function's first line. <b>Step Out</b>: run the rest of the current function and pause back in the caller. Typical use: step <b>over</b> trusted functions, step <b>into</b> the suspect function, step <b>out</b> when you accidentally went into library code (e.g. <code>strlen</code>).</div>

  <h3>Example program: password strength</h3>

  <div class="card">
    <p>Score = 1 per character + 1 per digit, +2 if the length is at least 8, +2 if there are at least 2 digits.</p>
<pre>int digits(const char *s) {          // counts digit characters
    int c = 0;
    for (int i = 0; s[i]; i++)
        if (s[i] &gt;= '0' &amp;&amp; s[i] &lt;= '9') c++;
    return c;
}
int strength(const char *pw) {
    int len = strlen(pw);
    int d = digits(pw);
    int s = len + d;
    if (len &gt;= 8)      s += 2;
    else if (d &gt;= 2)   s += 2;      // bug?
    return s;
}</pre>
    <p>For <code>"abc12345"</code>: length 8, digits 5, base 13. Both bonuses apply, so the correct score is <b>17</b>; the program returns <b>15</b>.</p>
    <table class="cmp">
      <tr><th>Action (paused at <code>int actual = strength(pw);</code>)</th><th>Result</th></tr>
      <tr><td>Step Over</td><td><code>actual</code> is 15 (the call ran in one step)</td></tr>
      <tr><td>Step Into</td><td>pauses on <code>int len = strlen(pw);</code> inside <code>strength</code></td></tr>
      <tr><td>Step Into on <code>strlen</code>, then Step Out</td><td>back in <code>strength</code>; <code>len</code> is 8</td></tr>
      <tr><td>Step Into <code>digits</code>, Step Out, Step Over</td><td><code>d</code> is 5</td></tr>
    </table>
    <p>After <code>int s = len + d;</code> the debugger shows <code>s = 13</code>. Both <code>len &gt;= 8</code> and <code>d &gt;= 2</code> are true, but the <code>else if</code> skips the second bonus. Fix: make the second test its own <code>if</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Using Step Over on <code>int actual = strength(pw);</code>, what value does <code>actual</code> get?</div>
      <input class="fillblank sm" data-answer="15">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The call executes completely and returns 15 (wrong; should be 17).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>After <code>int s = len + d;</code>, what is <code>s</code>?</div>
      <input class="fillblank sm" data-answer="13">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">8 + 5.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What should <code>strength("abc12345")</code> return by the rules?</div>
      <input class="fillblank sm" data-answer="17">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">8 + 5 + 2 (length) + 2 (digits) = 17.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>You are on <code>int d = digits(pw);</code> and want to watch inside <code>digits</code>. Which control?</div>
      <button class="opt" data-i="0">Step Over</button>
      <button class="opt" data-i="1">Step Into</button>
      <button class="opt" data-i="2">Step Out</button>
      <button class="opt" data-i="3">Continue</button>
      <div class="fb">Step Into pauses on the first line of the called function.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>You pressed Step Into on <code>strlen(pw)</code> by mistake. What returns you to <code>strength</code>?</div>
      <button class="opt" data-i="0">Step Out</button>
      <button class="opt" data-i="1">Restart</button>
      <button class="opt" data-i="2">Step Over</button>
      <button class="opt" data-i="3">Delete the breakpoint</button>
      <div class="fb">Step Out finishes the current (library) function and pauses in the caller.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which is true of Step Over on a line that calls your own function?</div>
      <button class="opt" data-i="0">It pauses inside the function</button>
      <button class="opt" data-i="1">It skips the line</button>
      <button class="opt" data-i="2">The function runs to completion and you pause on the next line</button>
      <button class="opt" data-i="3">It restarts the program</button>
      <div class="fb">You see the result of the call but not the steps inside.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which fix repairs the scoring bug?</div>
      <button class="opt" data-i="0">Change <code>&gt;=</code> to <code>&gt;</code> in the length test</button>
      <button class="opt" data-i="1">Replace <code>else if</code> by a separate <code>if</code></button>
      <button class="opt" data-i="2">Initialize <code>s</code> to 0</button>
      <button class="opt" data-i="3">Remove the length bonus</button>
      <div class="fb">The two bonuses are independent; <code>else</code> made them mutually exclusive.</div>
    </div>
  </div>
</section>

<section class="topic" id="l22-p4">
  <h2>HW04 &middot; Problem 4: Reading the Call Stack</h2>
  <div class="concept">When paused inside a function, the <b>Call Stack panel</b> lists the active calls: the function you are in at the <b>top</b>, its caller below, ending with <code>main</code> at the bottom. <b>Clicking a frame</b> shows <i>that frame's</i> local variables in the Variables panel. It only changes what you inspect: <b>no instructions execute</b>. Variables that have not been assigned yet show garbage.</div>

  <h3>Example program: a checkout</h3>

  <div class="card">
<pre>int tax(int amount, int pct) {
    int t = amount * pct / 100;     // breakpoint after this line
    return t;
}
int total(int qty, int unit) {
    int sub = qty * unit;
    int t = tax(sub, 8);
    return sub + t;
}
int main(void) {
    int q = 5, u = 12;
    int bill = total(q, u);
    printf("%d", bill);
}</pre>
    <p>Pause in <code>tax</code> after <code>t</code> is set:</p>
    <table class="cmp">
      <tr><th>Frame</th><th>Variables</th></tr>
      <tr><td><b>tax</b> (top)</td><td>amount = 60, pct = 8, t = 4</td></tr>
      <tr><td><b>total</b></td><td>qty = 5, unit = 12, sub = 60 (t not yet assigned)</td></tr>
      <tr><td><b>main</b></td><td>q = 5, u = 12, bill = not yet assigned</td></tr>
    </table>
    <p>The program prints <b>64</b> (60 + 4).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the <code>tax</code> frame, what is <code>amount</code>?</div>
      <input class="fillblank sm" data-answer="60">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">total computed sub = 5 &times; 12 = 60 and passed it as amount.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the <code>tax</code> frame, what is <code>t</code>?</div>
      <input class="fillblank sm" data-answer="4">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">60 &times; 8 / 100 = 480 / 100 = 4 (integer division).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Select the <code>total</code> frame. What is <code>sub</code>?</div>
      <input class="fillblank sm" data-answer="60">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">qty &times; unit = 5 &times; 12.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Select the <code>main</code> frame. What is <code>q</code>?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">main's local q.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Check</span>Selecting a different stack frame makes the program execute more instructions.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> You are only changing which frame's variables you look at; the program stays paused.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which frame is at the <b>top</b> of the call stack while paused in <code>tax</code>?</div>
      <button class="opt" data-i="0">main</button>
      <button class="opt" data-i="1">total</button>
      <button class="opt" data-i="2">tax</button>
      <button class="opt" data-i="3">printf</button>
      <div class="fb">The innermost active call is at the top; callers are below it.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Has <code>bill</code> in <code>main</code> received its final value when you are paused in <code>tax</code>?</div>
      <button class="opt" data-i="0">Yes: 64</button>
      <button class="opt" data-i="1">Yes: 60</button>
      <button class="opt" data-i="2">No: <code>total</code> has not returned yet</button>
      <button class="opt" data-i="3">It is always 0</button>
      <div class="fb">The assignment happens only after total returns.</div>
    </div>
  </div>
</section>

<section class="topic" id="l22-p5">
  <h2>HW04 &middot; Problem 5: Modifying <code>launch.json</code> to Redirect Input</h2>
  <div class="concept">A program that reads <code>stdin</code> normally waits for you to type. To debug it with <b>input from a file</b> you use the second launch configuration, <b>Debug with input redirected</b>, which starts <code>/bin/bash -lc "&lt;program&gt; &lt; &lt;file&gt;"</code>. VS Code first replaces its variables using the <b>active file</b>.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Variable</th><th>Meaning (active file <code>/home/sam/hw/p5/avg.c</code>)</th><th>Value</th></tr>
      <tr><td><code>\${file}</code></td><td>full path of the file</td><td><code>/home/sam/hw/p5/avg.c</code></td></tr>
      <tr><td><code>\${fileDirname}</code></td><td>directory containing it</td><td><code>/home/sam/hw/p5</code></td></tr>
      <tr><td><code>\${fileBasenameNoExtension}</code></td><td>file name without path or extension</td><td><code>avg</code></td></tr>
    </table>
    <p>So <code>"\${fileDirname}/\${fileBasenameNoExtension}" &lt; "\${fileDirname}/temp.in"</code> becomes</p>
<pre>"/home/sam/hw/p5/avg" &lt; "/home/sam/hw/p5/temp.in"</pre>
    <p>Run from a terminal the same way: <code>./avg &lt; temp.in</code>. To use another file, change the path in <code>launch.json</code> (e.g. <code>\${fileDirname}/data/example.in</code>).</p>
  </div>

  <div class="card">
    <p>Example program: it should print the average of the 4 numbers in <code>temp.in</code> (<code>70 74 66 62</code>, average 68) but divides by <code>(n + 1)</code>:</p>
<pre>int total = 0, n = 4, x;
for (int i = 0; i &lt; n; i++) {
    scanf("%d", &amp;x);
    total += x;               // breakpoint here
}
printf("%d", total / (n + 1));</pre>
    <p>Debugging shows <code>total</code> climbing 70, 144, 210, 272 and <code>n = 4</code>. After the loop, <code>total / (n + 1)</code> is 272 / 5 = <b>54</b> but the average is 272 / 4 = <b>68</b>. A breakpoint after the loop (removing the one in the loop, then Continue) shows the final total without stepping through every iteration.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With active file <code>/home/sam/hw/p5/avg.c</code>, what is <code>\${fileDirname}</code>?</div>
      <input class="fillblank sm" data-answer="/home/sam/hw/p5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The directory part of the path.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is <code>\${fileBasenameNoExtension}</code> for that file?</div>
      <input class="fillblank sm" data-answer="avg">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The name without the directory and without <code>.c</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the example, what is <code>total</code> after the loop?</div>
      <input class="fillblank sm" data-answer="272">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">70 + 74 + 66 + 62.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the buggy program print?</div>
      <input class="fillblank sm" data-answer="54">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">272 / (4 + 1) = 54 with integer division.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does the <code>&lt;</code> in the launch arguments do?</div>
      <button class="opt" data-i="0">Compares two numbers</button>
      <button class="opt" data-i="1">Redirects the program's standard input from the file</button>
      <button class="opt" data-i="2">Pipes output to another program</button>
      <button class="opt" data-i="3">Redirects standard output to the file</button>
      <div class="fb">Input redirection: <code>scanf</code>/<code>getchar</code> read from the file.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>After editing <code>launch.json</code> you must&hellip;</div>
      <button class="opt" data-i="0">Recompile with -O3</button>
      <button class="opt" data-i="1">Select the "Debug with input redirected" configuration in the debug dropdown</button>
      <button class="opt" data-i="2">Delete tasks.json</button>
      <button class="opt" data-i="3">Restart the computer</button>
      <div class="fb">Each configuration has a name; select the one you edited.</div>
    </div>
  </div>
</section>

<section class="topic" id="l22-p6">
  <h2>HW04 &middot; Problem 6: Debugger Detective</h2>
  <div class="concept">The last problem leaves the tools to <b>you</b>: a program (here with bit flags) produces a wrong final state and you must find the <b>first statement</b> where the state becomes incorrect. Predict the value after each function, then break after each call or step into each function and compare.</div>

  <h3>Example program: print/save/lock flags</h3>

  <div class="card">
<pre>#define PRINT 1
#define SAVE  2
#define LOCK  8
int enable_save(int f) { return f | SAVE; }
int unlock(int f)      { return f ^ LOCK; }     // bug?
int main(void) {
    int flags = PRINT;           // 1
    flags = enable_save(flags);
    flags = unlock(flags);
    printf("%d", flags);
}</pre>
    <p>Expected: PRINT and SAVE on, LOCK off &rarr; <b>3</b>. The program prints <b>11</b>.</p>
    <table class="cmp">
      <tr><th>After</th><th>Expected</th><th>Actual</th></tr>
      <tr><td>start</td><td>1</td><td>1</td></tr>
      <tr><td>enable_save</td><td>3</td><td>3</td></tr>
      <tr><td>unlock</td><td>3</td><td><b>11</b></td></tr>
    </table>
    <p>The first mismatch is inside <code>unlock</code>: <code>f ^ LOCK</code> <b>toggles</b> LOCK, so a lock that was off is switched <i>on</i> (3 ^ 8 = 11). To <b>clear</b> a flag use <code>f &amp; ~LOCK</code> (3 &amp; ~8 = 3).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the program print?</div>
      <input class="fillblank sm" data-answer="11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1 | 2 = 3, then 3 ^ 8 = 11.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the value of <code>flags</code> after <code>enable_save</code>?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1 | 2.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What should <code>return f ^ LOCK;</code> be changed to (use <code>f</code> and <code>LOCK</code>, no spaces)?</div>
      <input class="fillblank sm" data-answer="return f&amp;~LOCK;~~~f&amp;~LOCK">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">AND with the inverted mask clears the flag.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which function first makes the flag state incorrect?</div>
      <button class="opt" data-i="0"><code>main</code></button>
      <button class="opt" data-i="1"><code>enable_save</code></button>
      <button class="opt" data-i="2"><code>unlock</code></button>
      <button class="opt" data-i="3">None</button>
      <div class="fb">After enable_save the state is right (3); after unlock it is wrong (11).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why did XOR not &ldquo;clear&rdquo; the lock?</div>
      <button class="opt" data-i="0">XOR cannot be used on integers</button>
      <button class="opt" data-i="1">XOR toggles: when the bit is already 0 it turns it on</button>
      <button class="opt" data-i="2">LOCK is not a power of two</button>
      <button class="opt" data-i="3">The mask must be 0</button>
      <div class="fb">Clearing needs AND with the inverted mask; XOR flips whatever state the bit is in.</div>
    </div>
  </div>
</section>

</main>
`;
