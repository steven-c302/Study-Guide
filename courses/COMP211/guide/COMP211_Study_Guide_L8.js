/* ============================================================
   LESSON 8 — HW01 · Intro to C (homework review).
   Injects into #l8. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l8').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l8-placeholders')">1 &middot; Placeholders</button>
  <button onclick="showTopic(this,'l8-escapes')">2 &middot; Escape Sequences</button>
  <button onclick="showTopic(this,'l8-sizeof')">3 &middot; sizeof</button>
  <button onclick="showTopic(this,'l8-bool')">4 &middot; Booleans in C</button>
  <button onclick="showTopic(this,'l8-getchar')">5 &middot; getchar/putchar</button>
  <button onclick="showTopic(this,'l8-state')">6 &middot; State Variables</button>
  <button onclick="showTopic(this,'l8-loops')">7 &middot; Nested Loops</button>
  <button onclick="showTopic(this,'l8-funcarr')">8 &middot; Functions &amp; Arrays</button>
  <button onclick="showTopic(this,'l8-strlen')">9 &middot; strlen</button>
  <button onclick="showTopic(this,'l8-garbage')">10 &middot; Garbage Values</button>
  <button onclick="showTopic(this,'l8-redirect')">11 &middot; I/O Redirection</button>
  <button onclick="showTopic(this,'l8-selfcheck')">HW01 Self-Check</button>
</nav>
<main>

<!-- ============ Q1 PLACEHOLDERS ============ -->
<section class="topic active" id="l8-placeholders">
  <h2>HW01 &middot; Placeholders Review</h2>
  <div class="concept">A quick review before the homework's trickier questions: <code>%d</code> prints an
  <code>int</code> as a plain integer, <code>%.2f</code> prints a <code>double</code> rounded to exactly
  2 decimal places, <code>%c</code> prints a <code>char</code> with <b>no surrounding quotes</b>, and
  <code>%s</code> prints a C string (<code>char[]</code>).</div>

  <h3>Rounding, not truncating</h3>
  <div class="card">
    <p>The precision on <code>%f</code> (e.g. <code>%.2f</code>, <code>%.1f</code>) <b>rounds</b> the value to
    that many decimal places &mdash; it does not just chop off the extra digits.</p>
<pre><span class="ty">int</span> apples = <span class="nm">4</span>;
<span class="ty">double</span> price = <span class="nm">1.50</span>;
<span class="fn">printf</span>(<span class="st">"I bought %d apples for $%.2f each."</span>, apples, price);
<span class="cm">// I bought 4 apples for $1.50 each.</span></pre>
    <p>A denser example, mixing all four placeholders in one call:</p>
<pre><span class="ty">int</span> quantity = <span class="nm">7</span>;
<span class="ty">double</span> price = <span class="nm">3.456</span>;
<span class="ty">char</span> grade = <span class="st">'A'</span>;
<span class="fn">printf</span>(<span class="st">"Qty: %d | Price: $%.2f | Grade: %c | Total: %.1f"</span>,
       quantity, price, grade, quantity * price);</pre>
    <table class="cmp">
      <tr><th>Piece</th><th>Value</th><th>Placeholder</th><th>Prints</th></tr>
      <tr><td><code>quantity</code></td><td>7</td><td><code>%d</code></td><td><code>7</code></td></tr>
      <tr><td><code>price</code></td><td>3.456</td><td><code>%.2f</code></td><td><code>3.46</code> &mdash; rounded, not <code>3.45</code></td></tr>
      <tr><td><code>grade</code></td><td><code>'A'</code></td><td><code>%c</code></td><td><code>A</code> &mdash; no quotes</td></tr>
      <tr><td><code>quantity * price</code></td><td>7 &times; 3.456 = 24.192</td><td><code>%.1f</code></td><td><code>24.2</code> &mdash; rounded from 24.192, not 24.192 itself and not truncated to 24.1</td></tr>
    </table>
    <div class="warn">The full exact output is <code>Qty: 7 | Price: $3.46 | Grade: A | Total: 24.2</code>.
    Every one of the four placeholders is doing a different job on the exact same kind of "round this
    number" instinct &mdash; get comfortable distinguishing <b>rounding</b> from <b>truncating</b>.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span><code>int apples = 4; double price = 1.50; printf("I bought %d apples for $%.2f each.", apples, price);</code> &mdash; what prints?</div>
      <button class="opt" data-i="0"><code>I bought 4 apples for $1.5 each.</code></button>
      <button class="opt" data-i="1"><code>I bought 4 apples for $1.50 each.</code></button>
      <button class="opt" data-i="2"><code>I bought 4.0 apples for $1.50 each.</code></button>
      <button class="opt" data-i="3"><code>I bought 4 apples for $1.500000 each.</code></button>
      <div class="fb"><code>%d</code> prints the int plainly, and <code>%.2f</code> forces exactly two
      decimal places &mdash; padding with a trailing zero when needed, unlike bare <code>%f</code> which
      would print six decimals.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span><code>int quantity = 7; double price = 3.456; char grade = 'A'; printf("Qty: %d | Price: $%.2f | Grade: %c | Total: %.1f", quantity, price, grade, quantity * price);</code> &mdash; exact output?</div>
      <button class="opt" data-i="0"><code>Qty: 7 | Price: $3.45 | Grade: A | Total: 24.1</code></button>
      <button class="opt" data-i="1"><code>Qty: 7 | Price: $3.46 | Grade: A | Total: 24.2</code></button>
      <button class="opt" data-i="2"><code>Qty: 7 | Price: $3.46 | Grade: 'A' | Total: 24.192</code></button>
      <button class="opt" data-i="3"><code>Qty: 7 | Price: $3.456 | Grade: A | Total: 24.2</code></button>
      <div class="fb"><b><code>Qty: 7 | Price: $3.46 | Grade: A | Total: 24.2</code></b>. 3.456 rounds
      up to 3.46 (option 0 truncates instead). <code>%c</code> never adds quotes (rules out option 2).
      <code>%.2f</code> on 3.456 is not 3.456 itself (rules out option 3). And 24.192 rounds to 24.2, not
      24.1.</div>
    </div>
  </div>

  <h3>Writing your own format strings</h3>
  <div class="card">
    <p class="muted">Worked example: <code>char name[] = "Jordan"; int score = 92;</code>, desired output
    <code>Jordan scored 92 points.</code> &rarr; format string:</p>
<pre><span class="st">"%s scored %d points."</span></pre>
    <p><code>%s</code> is the placeholder for a C string (a <code>char[]</code>).</p>

    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char food[] = "pizza"; int slices = 3;</code> &mdash; write a format string that produces exactly <code>I ate 3 slices of pizza.</code></div>
      <input class="fillblank" data-answer="I ate %d slices of %s.">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>"I ate %d slices of %s."</code> &mdash; the int comes first in the sentence, so
      its placeholder (<code>%d</code>) must come first in the format string too, matching the order
      <code>printf</code>'s arguments would be passed in.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char name[] = "Sam"; int assignments = 8; double average = 91.67;</code> &mdash; write a format string that produces exactly <code>Sam completed 8 assignments with an average of 91.7.</code> (the average must show exactly one digit after the decimal)</div>
      <input class="fillblank" data-answer="%s completed %d assignments with an average of %.1f.">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>"%s completed %d assignments with an average of %.1f."</code> &mdash;
      "exactly one digit after the decimal" is the tell that you need <code>%.1f</code>, not bare
      <code>%f</code> (which would print 91.670000).</div>
    </div>
  </div>
</section>

<!-- ============ Q2 ESCAPES ============ -->
<section class="topic" id="l8-escapes">
  <h2>HW01 &middot; Escape Sequences</h2>
  <div class="concept">Escape sequences let you put characters into a string that would otherwise be
  impossible or ambiguous to type directly &mdash; a literal quote inside a quoted string, a literal
  backslash, a newline, a tab. Every one of them starts with a backslash <b><code>\\</code></b>, except
  <code>%%</code>, which is <code>printf</code>'s own private escape for a literal <code>%</code> and has
  nothing to do with C's general string escaping.</div>

  <table class="cmp">
    <tr><th>Sequence</th><th>Meaning</th><th>Notes</th></tr>
    <tr><td><code>\\"</code></td><td>literal double-quote</td><td>lets a quoted string contain <code>"</code> without ending early</td></tr>
    <tr><td><code>\\\\</code></td><td>literal single backslash</td><td>one <code>\\\\</code> in source &rarr; one <code>\\</code> printed</td></tr>
    <tr><td><code>\\n</code></td><td>newline</td><td>general C string escape, works anywhere, not just printf</td></tr>
    <tr><td><code>\\t</code></td><td>horizontal tab</td><td>general C string escape</td></tr>
    <tr><td><code>%%</code></td><td>literal percent sign</td><td><b>printf-specific</b> &mdash; a format-string parsing rule, not a C string escape</td></tr>
  </table>
  <div class="warn"><b>Why isn't a literal <code>%</code> written <code>\\%</code>?</b> Because <code>%</code>
  is not special to C strings in general &mdash; it is only special inside a <code>printf</code>-family
  format string, where it introduces a placeholder. <code>printf</code> therefore needs its own private
  way to say "no, I mean a literal percent here," and that is <code>%%</code>. Contrast that with
  <code>\\n</code>/<code>\\t</code>/<code>\\\\</code>/<code>\\"</code>, which are escapes recognized by the
  C compiler itself when it reads any string literal, whether or not it's ever passed to <code>printf</code>.</div>

  <h3>Tracing a printf call character by character</h3>
  <div class="card">
<pre><span class="fn">printf</span>(<span class="st">"She said, \\"Hello!\\"\\nC:\\\\Users\\\\student\\nA\\tB"</span>);</pre>
    <table class="cmp">
      <tr><th>Source fragment</th><th>Meaning</th></tr>
      <tr><td><code>She said, </code></td><td>literal text</td></tr>
      <tr><td><code>\\"Hello!\\"</code></td><td>a literal <code>"Hello!"</code>, quotes included</td></tr>
      <tr><td><code>\\n</code></td><td>newline &mdash; starts a new line</td></tr>
      <tr><td><code>C:\\\\Users\\\\student</code></td><td>each <code>\\\\</code> collapses to one <code>\\</code>, so this prints <code>C:\\Users\\student</code></td></tr>
      <tr><td><code>\\n</code></td><td>another newline</td></tr>
      <tr><td><code>A\\tB</code></td><td>an actual tab character sits between A and B &mdash; not the two characters <code>\\</code> and <code>t</code></td></tr>
    </table>
    <p class="muted">Exact output (three lines; the tab between A and B won't render visibly here but is a
    real <code>\\t</code> character, not two literal characters):</p>
<pre>She said, "Hello!"
C:\\Users\\student
A	B</pre>
  </div>

  <div class="card">
    <h3 style="margin-top:0">A second trace, adding <code>%%</code></h3>
<pre><span class="fn">printf</span>(<span class="st">"Name:\\t\\"Alex\\"\\nScore:\\t95%%%%\\nFolder:\\tC:\\\\CS101\\\\Labs"</span>);</pre>
    <p class="muted">Exact output:</p>
<pre>Name:	"Alex"
Score:	95%
Folder:	C:\\CS101\\Labs</pre>
    <p>Notice <code>95%%</code> in the source collapses to one printed <code>%</code> &mdash; this is the
    printf-specific rule from the table above, distinct from every other escape on this page which is a
    general C string escape recognized regardless of <code>printf</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span><code>printf("She said, \\"Hello!\\"\\nC:\\\\Users\\\\student\\nA\\tB");</code> &mdash; how many lines of output does this produce?</div>
      <button class="opt" data-i="0">3</button>
      <button class="opt" data-i="1">1</button>
      <button class="opt" data-i="2">7</button>
      <button class="opt" data-i="3">2</button>
      <div class="fb">Two <code>\\n</code> escapes means the output is split across <b>3</b> lines:
      <code>She said, "Hello!"</code>, then <code>C:\\Users\\student</code>, then <code>A&lt;tab&gt;B</code>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span><code>printf("Name:\\t\\"Alex\\"\\nScore:\\t95%%\\nFolder:\\tC:\\\\CS101\\\\Labs");</code> &mdash; what does <code>95%%</code> print as?</div>
      <button class="opt" data-i="0"><code>95%%</code></button>
      <button class="opt" data-i="1">a compiler error</button>
      <button class="opt" data-i="2"><code>95%</code></button>
      <button class="opt" data-i="3"><code>95</code> followed by a newline</button>
      <div class="fb"><code>%%</code> is printf's escape for a single literal <code>%</code> &mdash;
      it always collapses two percent signs in the source into one printed percent sign.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Write a format string whose output is exactly <code>Name:&lt;tab&gt;Alex</code> (a tab between "Name:" and "Alex").</div>
      <input class="fillblank" data-answer="Name:\\tAlex~~~&quot;Name:\\tAlex&quot;~~~printf(&quot;Name:\\tAlex&quot;)~~~printf(&quot;Name:\\tAlex&quot;);">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>"Name:\\tAlex"</code> &mdash; <code>\\t</code> is the escape for a horizontal
      tab.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Write a format string whose output is exactly:<br><code>Hello!</code><br><code>Welcome to C!</code></div>
      <input class="fillblank" data-answer="Hello!\\nWelcome to C!~~~&quot;Hello!\\nWelcome to C!&quot;~~~printf(&quot;Hello!\\nWelcome to C!&quot;)~~~printf(&quot;Hello!\\nWelcome to C!&quot;);">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>"Hello!\\nWelcome to C!"</code> &mdash; one <code>\\n</code> between the two
      lines.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Write a format string whose output is exactly:<br><code>Welcome, "Sam"!</code><br><code>Your folder is:</code><br><code>C:\\Homework</code></div>
      <input class="fillblank" data-answer="Welcome, \\&quot;Sam\\&quot;!\\nYour folder is:\\nC:\\\\Homework~~~&quot;Welcome, \\&quot;Sam\\&quot;!\\nYour folder is:\\nC:\\\\Homework&quot;~~~printf(&quot;Welcome, \\&quot;Sam\\&quot;!\\nYour folder is:\\nC:\\\\Homework&quot;)~~~printf(&quot;Welcome, \\&quot;Sam\\&quot;!\\nYour folder is:\\nC:\\\\Homework&quot;);">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>"Welcome, \\"Sam\\"!\\nYour folder is:\\nC:\\\\Homework"</code> &mdash;
      three escapes stacked: <code>\\"</code> around Sam, <code>\\n</code> twice for the line breaks, and
      <code>\\\\</code> for the one literal backslash before "Homework".</div>
    </div>
  </div>
</section>

<!-- ============ Q3 SIZEOF ============ -->
<section class="topic" id="l8-sizeof">
  <h2>HW01 &middot; <code>sizeof</code></h2>
  <div class="concept"><code>sizeof</code> reports <b>the amount of memory used by a variable or data
  type, in bytes</b> &mdash; it has nothing to do with the <i>value</i> currently stored. This is the same
  operator from Lesson 2's Variables &amp; Types tab; HW01 leans harder on the distinction between
  "size of the type" and "value of the variable."</div>

  <div class="card">
    <p class="muted">8 bits = 1 byte. On a typical system, <code>int</code> is 4 bytes, so it is 32 bits.</p>
<pre><span class="ty">int</span> number = <span class="nm">100</span>;
<span class="fn">printf</span>(<span class="st">"%zu"</span>, <span class="kw">sizeof</span>(number));   <span class="cm">// 4</span></pre>
    <div class="warn"><b><code>sizeof</code> is blind to the value.</b> This prints <code>4</code>
    whether <code>number</code> holds 100, 100000, or &minus;5 &mdash; it reports the byte size of the
    <b>type</b> (<code>int</code>), completely independent of what's stored in it.</div>
    <table class="cmp">
      <tr><th>Type</th><th>Assumed size here</th></tr>
      <tr><td><code>char</code></td><td>1 byte</td></tr>
      <tr><td><code>int</code></td><td>4 bytes</td></tr>
      <tr><td><code>double</code></td><td>8 bytes</td></tr>
    </table>
<pre><span class="ty">char</span> grade = <span class="st">'A'</span>;
<span class="ty">int</span> score = <span class="nm">95</span>;
<span class="ty">double</span> average = <span class="nm">92.5</span>;
<span class="cm">// sizeof(grade)   is 1, not 4
// sizeof(score)   is 4, not 8
// sizeof(average) is 8
// the three variables do NOT all have the same size</span></pre>
  </div>

  <h3><code>%zu</code>, the correct placeholder for <code>sizeof</code></h3>
  <div class="card">
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>
<span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {
    <span class="ty">char</span> letter = <span class="st">'A'</span>;
    <span class="ty">int</span> number = <span class="nm">25</span>;
    <span class="ty">double</span> price = <span class="nm">4.99</span>;
    <span class="fn">printf</span>(<span class="st">"%zu %zu %zu\\n"</span>, <span class="kw">sizeof</span>(letter), <span class="kw">sizeof</span>(number), <span class="kw">sizeof</span>(price));
    <span class="kw">return</span> <span class="nm">0</span>;
}
<span class="cm">// 1 4 8</span></pre>
    <div class="warn"><code>sizeof</code> evaluates to a <code>size_t</code>, and <b><code>%zu</code></b>
    is the placeholder built for exactly that type. Using <code>%d</code> instead is a real type mismatch
    &mdash; technically undefined behavior &mdash; even though it often "looks fine" on a given machine.
    (Lesson 2 taught <code>%lu</code> for the same value on <code>unsigned long</code>-returning systems;
    <code>%zu</code> is the more portable, standard-mandated choice.)</div>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>How many bits are in a byte?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">8 bits = 1 byte, always, in C.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What does the <code>sizeof</code> operator in C tell you?</div>
      <button class="opt" data-i="0">The value currently stored in a variable</button>
      <button class="opt" data-i="1">The amount of memory used by a variable or data type, in bytes</button>
      <button class="opt" data-i="2">The number of characters in a string</button>
      <button class="opt" data-i="3">The maximum value the type can hold</button>
      <div class="fb">Memory <b>usage</b>, in bytes &mdash; a property of the type, not the value.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span><code>int number = 100;</code> on a system where <code>int</code> is 4 bytes &mdash; what does <code>printf("%zu", sizeof(number));</code> print?</div>
      <button class="opt" data-i="0">4</button>
      <button class="opt" data-i="1">100</button>
      <button class="opt" data-i="2">3</button>
      <button class="opt" data-i="3">It depends on the value of <code>number</code></button>
      <div class="fb"><b>4</b> &mdash; <code>sizeof</code> reports the type's byte size regardless of the
      value stored. It would still print 4 even if <code>number</code> were 100000 or &minus;5.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span><code>char grade = 'A'; int score = 95; double average = 92.5;</code> on a system where char=1, int=4, double=8 bytes &mdash; which statement is true?</div>
      <button class="opt" data-i="0"><code>sizeof(grade)</code> is 4</button>
      <button class="opt" data-i="1"><code>sizeof(average)</code> is 8</button>
      <button class="opt" data-i="2"><code>sizeof(score)</code> is 8</button>
      <button class="opt" data-i="3">All three variables have the same size</button>
      <div class="fb"><code>sizeof(average)</code> <b>is 8</b>. <code>sizeof(grade)</code> is actually 1
      (not 4), <code>sizeof(score)</code> is actually 4 (not 8), and the three are all different sizes.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Assume char=1, int=4, double=8 bytes. <code>printf("%zu %zu %zu\\n", sizeof(letter), sizeof(number), sizeof(price));</code> for <code>char letter; int number; double price;</code> &mdash; exact output?</div>
      <input class="fillblank" data-answer="1 4 8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>1 4 8</code> &mdash; one <code>%zu</code> per <code>sizeof</code> call, in
      the order the arguments were passed.</div>
    </div>
  </div>
</section>

<!-- ============ Q4 BOOLEANS ============ -->
<section class="topic" id="l8-bool">
  <h2>HW01 &middot; Booleans in C</h2>
  <div class="concept"><b>C has no dedicated boolean type</b> in standard C89/C99 without
  <code>&lt;stdbool.h&gt;</code>. Conditions are just <code>int</code>s: <b>zero is the only "false"
  value</b>, and <b>any nonzero value counts as "true,"</b> whether it's 1, 7, or &minus;3.</div>

  <div class="card">
<pre><span class="ty">int</span> number = <span class="nm">0</span>;
<span class="kw">if</span> (number) {
    <span class="fn">printf</span>(<span class="st">"True"</span>);
} <span class="kw">else</span> {
    <span class="fn">printf</span>(<span class="st">"False"</span>);
}
<span class="cm">// False — 0 is the only falsy value</span></pre>
    <p class="muted">Output: <code>False</code>. <code>number</code> is 0, so the condition is falsy and
    the <code>else</code> branch runs.</p>
  </div>

  <h3>Two separate <code>if</code>s are not an if/else-if chain</h3>
  <div class="card">
<pre><span class="ty">int</span> x = <span class="nm">0</span>;
<span class="ty">int</span> y = <span class="nm">7</span>;
<span class="kw">if</span> (x) { <span class="fn">printf</span>(<span class="st">"A"</span>); }
<span class="kw">if</span> (y) { <span class="fn">printf</span>(<span class="st">"B"</span>); }
<span class="fn">printf</span>(<span class="st">"C"</span>);</pre>
    <div class="warn">Output is <code>BC</code>. These are <b>two independent <code>if</code>
    statements</b>, not an if/else-if. <code>x</code> is 0 (falsy) so "A" is skipped. <code>y</code> is 7
    &mdash; any nonzero value, not just 1, is truthy &mdash; so "B" prints. Then "C" prints
    <b>unconditionally</b>, since it sits outside both <code>if</code>s.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span><code>int number = 0; if (number) { printf("True"); } else { printf("False"); }</code> &mdash; output?</div>
      <button class="opt" data-i="0"><code>True</code></button>
      <button class="opt" data-i="1"><code>False</code></button>
      <button class="opt" data-i="2">A compiler error &mdash; <code>if</code> needs a boolean</button>
      <button class="opt" data-i="3">Nothing prints</button>
      <div class="fb">Zero is the only falsy value in C, so the <code>else</code> branch runs, printing
      <code>False</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>int x = 0; int y = 7; if (x) { printf("A"); } if (y) { printf("B"); } printf("C");</code> &mdash; exact output?</div>
      <input class="fillblank sm" data-answer="BC">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>BC</code> &mdash; two separate ifs, not if/else-if. <code>x=0</code> is falsy
      (skip A), <code>y=7</code> is truthy (print B), and <code>C</code> is unconditional.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>In standard C, any nonzero integer &mdash; not just 1 &mdash; is treated as "true" in an <code>if</code> condition.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> 7, &minus;3, 1000000 &mdash; all truthy. Only 0 is falsy.</div>
    </div>
  </div>
</section>

<!-- ============ Q5 GETCHAR/PUTCHAR ============ -->
<section class="topic" id="l8-getchar">
  <h2>HW01 &middot; <code>getchar</code>/<code>putchar</code> Practice</h2>
  <div class="concept">Builds directly on Lesson 2's I/O tab, but with denser character-tracing programs.
  Key distinction to keep straight: looping on <code>!= '\\n'</code> stops at the end of <b>one line</b>
  (the newline is consumed but never itself printed), while looping on <code>!= EOF</code> keeps reading
  across <b>multiple lines</b> until the input stream truly ends.</div>

  <h3>Filtering: skip every 'l'</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != <span class="st">'\\n'</span>) {
    <span class="kw">if</span> (c != <span class="st">'l'</span>) {
        <span class="fn">putchar</span>(c);
    }
}</pre>
    <p class="muted">Input: <code>Hello</code> then Enter.</p>
    <table class="cmp">
      <tr><th>Char read</th><th>H</th><th>e</th><th>l</th><th>l</th><th>o</th></tr>
      <tr><td>Kept?</td><td>yes</td><td>yes</td><td>no</td><td>no</td><td>yes</td></tr>
    </table>
    <p>Output: <code>Heo</code>. Every <code>'l'</code> is filtered out; the loop stops at <code>'\\n'</code>,
    which is never itself printed.</p>
  </div>

  <h3>Doubling: trace it character by character</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != <span class="st">'\\n'</span>) {
    <span class="fn">putchar</span>(c);
    <span class="fn">putchar</span>(c);
}</pre>
    <p class="muted">Input: <code>Hello</code> then Enter.</p>
    <table class="cmp">
      <tr><th>Char read</th><th>H</th><th>e</th><th>l</th><th>l</th><th>o</th></tr>
      <tr><td>Printed</td><td>HH</td><td>ee</td><td>ll</td><td>ll</td><td>oo</td></tr>
    </table>
    <div class="warn">Concatenated: <b><code>HHeelllloo</code></b>. Every character is doubled &mdash;
    including repeats. "Hello" has two l's in a row already, and doubling <i>each one</i> gives four
    l's total in the middle (<code>ll</code> + <code>ll</code>), which is easy to undercount if you just
    eyeball it instead of tracing character by character.</div>
  </div>

  <h3>Substitution vs. filtering: <code>'a'</code> &rarr; <code>'*'</code></h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
    <span class="kw">if</span> (c == <span class="st">'a'</span>) {
        <span class="fn">putchar</span>(<span class="st">'*'</span>);
    } <span class="kw">else</span> {
        <span class="fn">putchar</span>(c);
    }
}</pre>
    <p class="muted">This loop reads until <b>EOF</b>, not <code>'\\n'</code> &mdash; it will happily read
    across several lines of input, unlike every loop above. Input: <code>banana</code> followed by EOF.</p>
    <p>Output: <code>b*n*n*</code>. Every <code>'a'</code> is replaced with <code>'*'</code>; everything
    else passes through unchanged.</p>
  </div>

  <h3>Counting newlines = counting lines</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="ty">int</span> count = <span class="nm">0</span>;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
    <span class="kw">if</span> (c == <span class="st">'\\n'</span>) {
        count++;
    }
}</pre>
    <p class="muted">Input:</p>
<pre>cat
dog
fish</pre>
    <p>followed by EOF (with a trailing newline after "fish"). <code>count</code> finishes at
    <b>3</b> &mdash; one increment per newline character, i.e. one per line, including the newline that
    ends the final "fish" line.</p>
  </div>

  <h3>Uppercase &rarr; lowercase, the classic trick</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
    <span class="kw">if</span> (c &gt;= <span class="st">'A'</span> &amp;&amp; c &lt;= <span class="st">'Z'</span>)
        c = c + (<span class="st">'a'</span> - <span class="st">'A'</span>);
    <span class="fn">putchar</span>(c);
}</pre>
    <p class="muted">Input: <code>HeLLo World!</code> followed by EOF.</p>
    <div class="concept"><code>'a' - 'A'</code> is the constant offset <b>32</b> in ASCII. Adding it only
    to characters in the uppercase range converts them to lowercase; lowercase letters, spaces, and
    punctuation fail the <code>if</code> and pass through <code>putchar</code> unchanged.</div>
    <p>Output: <code>hello world!</code></p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Loop filters out 'l' (code above) on input <code>Hello</code> + Enter. Exact output?</div>
      <input class="fillblank sm" data-answer="Heo">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>Heo</code> &mdash; both l's are skipped.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Loop doubles every char (code above) on input <code>Hello</code> + Enter. Exact output?</div>
      <input class="fillblank" data-answer="HHeelllloo">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>HHeelllloo</code> &mdash; each of the 5 characters, including both l's
      individually, is printed twice.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>The 'a' &rarr; '*' substitution loop (code above) on input <code>banana</code> followed by EOF. Exact output?</div>
      <input class="fillblank sm" data-answer="b*n*n*">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>b*n*n*</code> &mdash; every 'a' becomes '*'.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Newline-counting loop (code above) on input three lines <code>cat</code> / <code>dog</code> / <code>fish</code> (each ending in a newline) then EOF. Final value of <code>count</code>?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3 &mdash; three lines, three newline characters, three increments.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Uppercase&rarr;lowercase loop (code above) on input <code>HeLLo World!</code> then EOF. Exact output?</div>
      <input class="fillblank" data-answer="hello world!">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>hello world!</code> &mdash; uppercase letters get +32; everything else
      (lowercase, space, <code>!</code>) is unchanged.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>A loop that reads with <code>while ((c = getchar()) != '\\n')</code> will keep reading past the first line of input.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> It stops as soon as it reads a newline &mdash; that's the end of one
      line. Only looping on <code>!= EOF</code> reads across multiple lines.</div>
    </div>
  </div>
</section>

<!-- ============ Q6 STATE VARIABLES ============ -->
<section class="topic" id="l8-state">
  <h2>HW01 &middot; State Variables</h2>
  <div class="concept">A <b>state variable</b> is a variable that keeps track of the program's current
  condition or situation as it processes data. For example, when processing quotation marks:
  <code>int state = 0;</code> &mdash; you might define <code>state == 0</code> as currently
  <i>outside</i> quotation marks, <code>state == 1</code> as currently <i>inside</i> quotation marks.
  When the program encounters a <code>"</code>, it changes the state. This allows the program to
  <b>remember what happened earlier</b> while it continues processing characters.</div>

  <h3>Word counter: a 2-state boolean pattern</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="ty">int</span> in_word = <span class="nm">0</span>;
<span class="ty">int</span> count = <span class="nm">0</span>;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
    <span class="kw">if</span> (c == <span class="st">' '</span> || c == <span class="st">'\\n'</span>) {
        in_word = <span class="nm">0</span>;
    } <span class="kw">else if</span> (in_word == <span class="nm">0</span>) {
        in_word = <span class="nm">1</span>;
        count++;
    }
}</pre>
    <p class="muted">Input:</p>
<pre>cat dog
fish</pre>
    <p>followed by EOF. <code>in_word</code> is 0 when not currently inside a word, 1 when it is.
    <code>count</code> increments only on the <b>transition</b> from "not in a word" to "in a word" &mdash;
    the first character of each new word &mdash; never on later characters of the same word. Both a space
    and a newline reset the state to "not in a word." Final <code>count</code>: <b>3</b> (cat, dog, fish).</p>
  </div>

  <h3>Contrast: this one only resets on <code>\\n</code>, not spaces</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="ty">int</span> state = <span class="nm">0</span>;
<span class="ty">int</span> count = <span class="nm">0</span>;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
    <span class="kw">if</span> (c == <span class="st">'\\n'</span>) {
        state = <span class="nm">0</span>;
    } <span class="kw">else if</span> (state == <span class="nm">0</span>) {
        state = <span class="nm">1</span>;
        count++;
    }
}
<span class="fn">printf</span>(<span class="st">"%d\\n"</span>, count);</pre>
    <p class="muted">Input:</p>
<pre>apple banana
cat
dog fish</pre>
    <p>followed by EOF.</p>
    <div class="warn">This looks like the same word-counting pattern, but it is subtly <b>not</b> counting
    words: a space does <i>not</i> reset <code>state</code> to 0, only <code>'\\n'</code> does. So it's
    really counting <b>non-blank lines</b> &mdash; each transition from "start of line" to "some non-newline
    character seen." With 3 non-empty lines, it prints <b>3</b> &mdash; the same number as the word counter
    above, purely by coincidence of this particular input, even though the two programs are counting
    genuinely different things.</div>
  </div>

  <h3>Quote-pair counter</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="ty">int</span> state = <span class="nm">0</span>;
<span class="ty">int</span> count = <span class="nm">0</span>;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
    <span class="kw">if</span> (c == <span class="st">'"'</span>) {
        <span class="kw">if</span> (state == <span class="nm">0</span>) {
            state = <span class="nm">1</span>;
        } <span class="kw">else</span> {
            state = <span class="nm">0</span>;
            count++;
        }
    }
}
<span class="fn">printf</span>(<span class="st">"%d\\n"</span>, count);</pre>
    <p class="muted">Input:</p>
<pre>"red" blue "green yellow"
orange "purple"
"black" "white"</pre>
    <p>followed by EOF. <code>state</code> toggles 0&rarr;1 on an opening <code>"</code> and 1&rarr;0 on a
    closing <code>"</code>; <code>count</code> only increments on the <b>closing</b> quote of each pair
    &mdash; once per complete <code>"..."</code> pair.</p>
    <p>Count the pairs yourself: "red"(1) "green yellow"(2) "purple"(3) "black"(4) "white"(5) &mdash;
    <b>5 pairs</b>, so the program prints <b>5</b>.</p>
  </div>

  <h3>The hardest one: a 3-state variable</h3>
  <div class="card">
<pre><span class="ty">int</span> c;
<span class="ty">int</span> state = <span class="nm">0</span>;
<span class="ty">int</span> count = <span class="nm">0</span>;
<span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
    <span class="kw">if</span> (c == <span class="st">'"'</span>) {
        <span class="kw">if</span> (state == <span class="nm">0</span>)
            state = <span class="nm">1</span>;
        <span class="kw">else if</span> (state == <span class="nm">1</span>)
            state = <span class="nm">2</span>;
        <span class="kw">else</span>
            state = <span class="nm">0</span>;
    }
    <span class="kw">if</span> (state == <span class="nm">2</span>)
        count++;
}
<span class="fn">printf</span>(<span class="st">"%d\\n"</span>, count);</pre>
    <p class="muted">Input: <code>cat"dog"fish"owl"</code> followed by EOF. This one is genuinely tricky
    &mdash; <code>state</code> cycles <b>0 &rarr; 1 &rarr; 2 &rarr; 0 &rarr; 1 &rarr; &hellip;</b> on
    successive <code>"</code> characters, and the <code>if (state == 2) count++</code> check runs
    <b>after</b> the state update, on <i>every</i> loop iteration &mdash; not just on quote characters.
    Trace it character by character:</p>
    <table class="cmp">
      <tr><th>Char</th><th>c</th><th>a</th><th>t</th><th>"</th><th>d</th><th>o</th><th>g</th><th>"</th><th>f</th><th>i</th><th>s</th><th>h</th><th>"</th><th>o</th><th>w</th><th>l</th><th>"</th></tr>
      <tr><td>state after this char</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td><b>2</b></td><td><b>2</b></td><td><b>2</b></td><td><b>2</b></td><td><b>2</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
      <tr><td>count++ this iteration?</td><td>no</td><td>no</td><td>no</td><td>no</td><td>no</td><td>no</td><td>no</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td>no</td><td>no</td><td>no</td><td>no</td><td>no</td></tr>
    </table>
    <p>Walk it in words: <code>c</code>,<code>a</code>,<code>t</code> leave state at 0. The first
    <code>"</code> takes state 0&rarr;1. <code>d</code>,<code>o</code>,<code>g</code> leave state at 1.
    The second <code>"</code> takes state 1&rarr;<b>2</b>, and the check fires immediately &mdash; that's
    increment #1. Then <code>f</code>,<code>i</code>,<code>s</code>,<code>h</code> each run with state
    still 2 (nothing changed it), so the check fires on <b>each</b> of them too &mdash; increments #2, #3,
    #4, #5. The third <code>"</code> takes state 2&rarr;0, exiting the state-2 range (no increment on that
    iteration, since the state coming out of the <code>if</code> is 0, not 2). Then
    <code>o</code>,<code>w</code>,<code>l</code> leave state at 0. The fourth <code>"</code> takes state
    0&rarr;1 (no increment). Final tally: <b>count = 5</b> &mdash; one increment from the closing quote of
    "dog" itself, plus one for each of f/i/s/h while state sits at 2.</p>
    <p class="muted">This trace was verified by running the program: for input
    <code>cat"dog"fish"owl"</code> the count is indeed <b>5</b>, matching the homework's stated answer.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Word counter (2-state, resets on space or newline) on input <code>cat dog</code> newline <code>fish</code> then EOF. Final <code>count</code>?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3 words: cat, dog, fish.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>The "resets only on <code>\\n</code>" variant &mdash; what is it actually counting, contrasted with the word counter above?</div>
      <button class="opt" data-i="0">Words, exactly like the first program</button>
      <button class="opt" data-i="1">Non-blank lines (transitions from start-of-line to a non-newline character)</button>
      <button class="opt" data-i="2">The total number of characters</button>
      <button class="opt" data-i="3">The number of quotation marks</button>
      <div class="fb">Since a space never resets <code>state</code> to 0, only <code>\\n</code> does, it
      counts <b>non-blank lines</b>, not words &mdash; even though on this homework's particular input both
      programs happen to print 3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>Quote-pair counter on input <code>"red" blue "green yellow"</code> newline <code>orange "purple"</code> newline <code>"black" "white"</code> then EOF. What does it print?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">5 complete quote pairs: "red", "green yellow", "purple", "black", "white".</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>The 3-state program on input <code>cat"dog"fish"owl"</code> then EOF. Final <code>count</code>?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">5 &mdash; one for the <code>"</code> that enters state 2, plus one each for f, i, s, h
      while state stays at 2. See the character-by-character trace above.</div>
    </div>
  </div>
</section>

<!-- ============ Q7 NESTED LOOPS ============ -->
<section class="topic" id="l8-loops">
  <h2>HW01 &middot; Nested Loops &amp; Patterns</h2>
  <div class="concept">In a nested <code>for</code> loop printing a grid, the <b>outer</b> loop
  (<code>row</code>) controls which line you're on, and the <b>inner</b> loop (<code>col</code>) controls
  which character within that line. The printed character depends on comparing <code>row</code> and
  <code>col</code> &mdash; that single comparison is the lever that produces very different shapes.</div>

  <table class="cmp">
    <tr><th>Condition</th><th>Shape it produces</th></tr>
    <tr><td><code>row == col</code></td><td>a diagonal line of <code>#</code></td></tr>
    <tr><td><code>col &lt;= row</code></td><td>a left-aligned lower triangle (growing hash count per row)</td></tr>
    <tr><td><code>col &lt; row</code> (spaces) / else (<code>#</code>)</td><td>a right-aligned upper triangle (shrinking hash count per row)</td></tr>
  </table>

  <div class="card">
    <h3 style="margin-top:0">Diagonal &mdash; <code>row == col</code></h3>
<pre><span class="ty">int</span> row, col;
<span class="kw">for</span> (row = <span class="nm">0</span>; row &lt; <span class="nm">5</span>; row++) {
    <span class="kw">for</span> (col = <span class="nm">0</span>; col &lt; <span class="nm">5</span>; col++) {
        <span class="kw">if</span> (row == col)
            <span class="fn">putchar</span>(<span class="st">'#'</span>);
        <span class="kw">else</span>
            <span class="fn">putchar</span>(<span class="st">'.'</span>);
    }
    <span class="fn">putchar</span>(<span class="st">'\\n'</span>);
}</pre>
<pre>#....
.#...
..#..
...#.
....#</pre>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Left-aligned triangle &mdash; <code>col &lt;= row</code></h3>
<pre><span class="kw">if</span> (col &lt;= row)
    <span class="fn">putchar</span>(<span class="st">'#'</span>);
<span class="kw">else</span>
    <span class="fn">putchar</span>(<span class="st">'.'</span>);</pre>
<pre>#....
##...
###..
####.
#####</pre>
    <p class="muted">Row <i>N</i> prints <code>N+1</code> hashes then dots.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Right-aligned triangle &mdash; <code>col &lt; row</code> &rarr; space</h3>
<pre><span class="kw">if</span> (col &lt; row)
    <span class="fn">putchar</span>(<span class="st">' '</span>);
<span class="kw">else</span>
    <span class="fn">putchar</span>(<span class="st">'#'</span>);</pre>
<pre>#####
 ####
  ###
   ##
    #</pre>
    <p class="muted">Each row shrinks its hash-count by one and grows its leading-space count by one.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Which condition (inside a 5&times;5 nested loop, printing <code>#</code> when true and <code>.</code> when false) produces a diagonal line of <code>#</code>?</div>
      <button class="opt" data-i="0"><code>row == col</code></button>
      <button class="opt" data-i="1"><code>col &lt;= row</code></button>
      <button class="opt" data-i="2"><code>row &lt; col</code></button>
      <button class="opt" data-i="3"><code>col == 0</code></button>
      <div class="fb"><code>row == col</code> is true exactly on the diagonal, where the row index and
      column index match.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>In these nested loops, what does the <b>outer</b> loop variable control?</div>
      <button class="opt" data-i="0">Which line (row) of output you're currently on</button>
      <button class="opt" data-i="1">Which character within the current line</button>
      <button class="opt" data-i="2">Whether to print '#' or '.'</button>
      <button class="opt" data-i="3">Nothing &mdash; only the inner loop matters</button>
      <div class="fb">Outer = <b>row</b> (which line); inner = <b>col</b> (which character on that line).
      The comparison between the two decides the printed character.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>With <code>if (col &lt;= row) putchar('#'); else putchar('.');</code> in a 5&times;5 grid, how many <code>#</code> characters are on row 2 (0-indexed, so the third row)?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Row 2 (0-indexed) has <code>row + 1 = 3</code> hashes: <code>###..</code>.</div>
    </div>
  </div>
</section>

<!-- ============ Q8 FUNCTIONS & ARRAYS ============ -->
<section class="topic" id="l8-funcarr">
  <h2>HW01 &middot; Functions &amp; Arrays</h2>

  <div class="card">
    <h3 style="margin-top:0">Basic indexing (0-indexed)</h3>
<pre><span class="ty">int</span> numbers[<span class="nm">4</span>] = {<span class="nm">10</span>, <span class="nm">20</span>, <span class="nm">30</span>, <span class="nm">40</span>};
<span class="fn">printf</span>(<span class="st">"%d %d"</span>, numbers[<span class="nm">0</span>], numbers[<span class="nm">2</span>]);
<span class="cm">// 10 30</span></pre>
  </div>

  <h3>A function version of the uppercase&rarr;lowercase trick</h3>
  <div class="card">
<pre><span class="ty">void</span> <span class="fn">change</span>(<span class="ty">char</span> c) {
    <span class="kw">if</span> (c &gt;= <span class="st">'A'</span> &amp;&amp; c &lt;= <span class="st">'Z'</span>)
        <span class="fn">putchar</span>(c + (<span class="st">'a'</span> - <span class="st">'A'</span>));
    <span class="kw">else</span>
        <span class="fn">putchar</span>(c);
}
<span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {
    <span class="ty">int</span> c;
    <span class="kw">while</span> ((c = <span class="fn">getchar</span>()) != EOF) {
        <span class="fn">change</span>(c);
    }
    <span class="kw">return</span> <span class="nm">0</span>;
}</pre>
    <p class="muted">Input <code>AbCdE</code> followed by EOF. <code>change</code> is called once per
    character read in <code>main</code>'s loop &mdash; the same conversion trick from Q5.5/Q8, now factored
    into its own function taking a <code>char</code> parameter.</p>
    <p>Output: <code>abcde</code></p>
  </div>

  <h3>Two lookup patterns: mirror-index vs. cyclic-next</h3>
  <div class="card">
    <div class="two">
      <div>
        <h4>Mirror index &mdash; <code>letters[n-1-i]</code></h4>
<pre><span class="ty">void</span> <span class="fn">print_char</span>(<span class="ty">char</span> letters[], <span class="ty">int</span> n, <span class="ty">char</span> c) {
    <span class="ty">int</span> i;
    <span class="kw">for</span> (i = <span class="nm">0</span>; i &lt; n; i++) {
        <span class="kw">if</span> (c == letters[i])
            <span class="fn">putchar</span>(letters[n - <span class="nm">1</span> - i]);
    }
}
<span class="cm">// letters = {'a','b','c'}, n = 3
// input "cab" (via getchar in a loop calling print_char(letters,3,c))</span></pre>
        <p class="muted">Trace: 'c' is found at i=2, prints <code>letters[3-1-2]=letters[0]='a'</code>.
        'a' is found at i=0, prints <code>letters[3-1-0]=letters[2]='c'</code>. 'b' is found at i=1, prints
        <code>letters[3-1-1]=letters[1]='b'</code>. So input <code>cab</code> &rarr; output
        <code>acb</code>. This <b>mirrors</b> the array around its center.</p>
      </div>
      <div>
        <h4>Cyclic next &mdash; <code>letters[(i+1) % n]</code></h4>
<pre><span class="ty">void</span> <span class="fn">change</span>(<span class="ty">char</span> letters[], <span class="ty">int</span> n, <span class="ty">char</span> c) {
    <span class="ty">int</span> i;
    <span class="kw">for</span> (i = <span class="nm">0</span>; i &lt; n; i++) {
        <span class="kw">if</span> (c == letters[i]) {
            <span class="fn">putchar</span>(letters[(i + <span class="nm">1</span>) % n]);
        }
    }
}
<span class="cm">// letters = {'a','b','c','d','e'}, n = 5
// input "bed"</span></pre>
        <p class="muted">Trace: 'b' at i=1, prints <code>letters[2]='c'</code>. 'e' at i=4 &mdash; the
        wraparound case &mdash; prints <code>letters[(4+1)%5]=letters[0]='a'</code>. 'd' at i=3, prints
        <code>letters[4]='e'</code>. So input <code>bed</code> &rarr; output <code>cae</code>. This gives
        the <b>next</b> character in the array, wrapping from the last back to the first.</p>
      </div>
    </div>
    <table class="cmp">
      <tr><th></th><th>Mirror index (Q8.3)</th><th>Cyclic next (Q8.4)</th></tr>
      <tr><td>Index expression</td><td><code>letters[n - 1 - i]</code></td><td><code>letters[(i + 1) % n]</code></td></tr>
      <tr><td>Meaning</td><td>the character at the mirrored position</td><td>the character right after this one, wrapping around</td></tr>
      <tr><td>Both are</td><td colspan="2">"array as a lookup table keyed by the matching character" &mdash; only the index transformation differs</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>int numbers[4] = {10, 20, 30, 40}; printf("%d %d", numbers[0], numbers[2]);</code> &mdash; output?</div>
      <input class="fillblank sm" data-answer="10 30">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>10 30</code> &mdash; index 0 is the first element, index 2 is the third.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>The <code>change(char c)</code> function above, called once per char via <code>main</code>'s <code>getchar</code> loop, on input <code>AbCdE</code> then EOF. Output?</div>
      <input class="fillblank sm" data-answer="abcde">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>abcde</code> &mdash; every letter, uppercase or not, ends up lowercase.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>print_char</code> (mirror-index, <code>letters={'a','b','c'}</code>, <code>n=3</code>) on input <code>cab</code> then EOF. Output?</div>
      <input class="fillblank sm" data-answer="acb">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>acb</code> &mdash; 'c'&rarr;'a', 'a'&rarr;'c', 'b'&rarr;'b' via
      <code>letters[n-1-i]</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>change</code> (cyclic-next, <code>letters={'a','b','c','d','e'}</code>, <code>n=5</code>) on input <code>bed</code> then EOF. Output?</div>
      <input class="fillblank sm" data-answer="cae">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>cae</code> &mdash; 'b'&rarr;'c', 'e'&rarr;'a' (wraparound via <code>%</code>),
      'd'&rarr;'e'.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What makes <code>letters[(i + 1) % n]</code> different from <code>letters[n - 1 - i]</code>?</div>
      <button class="opt" data-i="0">One is faster at runtime</button>
      <button class="opt" data-i="1">One gives the "next" element with wraparound; the other gives the mirrored element from the opposite end</button>
      <button class="opt" data-i="2">They always produce the same result</button>
      <button class="opt" data-i="3"><code>%</code> is only valid in <code>if</code> statements</button>
      <div class="fb"><code>(i+1)%n</code> is a <b>cyclic-next</b> lookup (wraps last&rarr;first);
      <code>n-1-i</code> is a <b>mirror</b> lookup (reflects around the center). Different index
      transformations, different results in general.</div>
    </div>
  </div>
</section>

<!-- ============ Q9 STRLEN ============ -->
<section class="topic" id="l8-strlen">
  <h2>HW01 &middot; <code>strlen</code></h2>
  <div class="concept"><code>strlen()</code> is a C standard library function (from
  <code>&lt;string.h&gt;</code>) that returns the length of a null-terminated string, <b>not including</b>
  the terminating <code>'\\0'</code> character.</div>

  <div class="card">
<pre><span class="ty">char</span> word[] = <span class="st">"hello"</span>;
<span class="fn">printf</span>(<span class="st">"%lu\\n"</span>, <span class="fn">strlen</span>(word));   <span class="cm">// 5</span>

<span class="ty">char</span> message[] = <span class="st">"hi there"</span>;
<span class="fn">printf</span>(<span class="st">"%lu\\n"</span>, <span class="fn">strlen</span>(message));   <span class="cm">// 8 — the space counts</span></pre>
    <p class="muted">A space is a real character as far as <code>strlen</code> is concerned &mdash; it
    counts toward the length just like any letter.</p>
  </div>

  <h3>"Last character" idiom</h3>
  <div class="card">
<pre><span class="ty">char</span> word[] = <span class="st">"apple"</span>;
<span class="fn">putchar</span>(word[<span class="fn">strlen</span>(word) - <span class="nm">1</span>]);   <span class="cm">// 'e'</span></pre>
    <p><code>strlen(word) - 1</code> is the classic idiom for "the index of the last character": since
    <code>strlen</code> doesn't count the <code>'\\0'</code>, and array indices are 0-based, the last real
    character sits at index <code>length - 1</code>.</p>
  </div>

  <h3>Truncating a string by writing <code>'\\0'</code></h3>
  <div class="card">
<pre><span class="ty">char</span> word[] = <span class="st">"banana"</span>;
word[<span class="nm">3</span>] = <span class="st">'\\0'</span>;
<span class="fn">printf</span>(<span class="st">"%lu\\n"</span>, <span class="fn">strlen</span>(word));   <span class="cm">// 3</span></pre>
    <div class="warn">The same null-terminator concept from Lesson 3's Strings section: manually
    overwriting a byte with <code>'\\0'</code> truncates what <code>strlen</code> sees, even though the
    array itself still physically holds the remaining bytes in memory. "banana" is
    <code>b-a-n-a-n-a</code> at indices 0&ndash;5; setting index 3 (the second 'a') to <code>'\\0'</code>
    leaves "ban" as the effective string &mdash; length <b>3</b>.</div>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char word[] = "hello"; printf("%lu\\n", strlen(word));</code></div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">5 &mdash; five letters, <code>'\\0'</code> not counted.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char message[] = "hi there"; printf("%lu\\n", strlen(message));</code></div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">8 &mdash; "hi there" is h-i-space-t-h-e-r-e, 8 characters including the space.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char word[] = "apple"; putchar(word[strlen(word) - 1]);</code> &mdash; what prints?</div>
      <input class="fillblank sm" data-answer="e">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>e</code> &mdash; the last character, at index <code>strlen(word)-1 = 4</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char word[] = "banana"; word[3] = '\\0'; printf("%lu\\n", strlen(word));</code></div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3 &mdash; <code>strlen</code> now stops at index 3, seeing only "ban".</div>
    </div>
  </div>
</section>

<!-- ============ Q10 GARBAGE VALUES ============ -->
<section class="topic" id="l8-garbage">
  <h2>HW01 &middot; Garbage Values</h2>
  <div class="concept">In C, a <b>garbage value</b> is the unpredictable value you may observe when you use
  an object whose value has not been properly initialized. For example: <code>int x; printf("%d\\n", x);</code>
  &mdash; <code>int x;</code> creates a local variable but does not give it an initial value. You should
  <b>not</b> assume it starts at 0. When <code>x</code> is created, C doesn't automatically clear those
  bytes. People commonly call whatever appears to be there a garbage value. You might run it and get
  <code>32764</code>, run it again and get <code>0</code>, or something completely different. More
  precisely, for an uninitialized <code>int</code>, evaluating its value can have <b>undefined behavior</b>
  in C.</div>

  <div class="card">
    <h3 style="margin-top:0">Untouched vs. computed</h3>
<pre><span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {
    <span class="ty">int</span> numbers[<span class="nm">5</span>];
    numbers[<span class="nm">0</span>] = <span class="nm">10</span>;
    numbers[<span class="nm">1</span>] = <span class="nm">20</span>;
    numbers[<span class="nm">3</span>] = <span class="nm">40</span>;
    <span class="fn">printf</span>(<span class="st">"%d\\n"</span>, numbers[<span class="nm">2</span>]);
    <span class="kw">return</span> <span class="nm">0</span>;
}</pre>
    <p><code>numbers[2]</code> was <b>never assigned</b>. Plain local arrays are <b>not</b> automatically
    zero-initialized in C, so it holds whatever garbage bytes happened to already be on the stack &mdash;
    <b>the value cannot be reliably predicted.</b></p>

<pre><span class="ty">int</span> values[<span class="nm">4</span>];
values[<span class="nm">0</span>] = <span class="nm">2</span>;
values[<span class="nm">2</span>] = <span class="nm">6</span>;
values[<span class="nm">1</span>] = values[<span class="nm">0</span>] + values[<span class="nm">2</span>];
<span class="fn">printf</span>(<span class="st">"%d %d\\n"</span>, values[<span class="nm">1</span>], values[<span class="nm">3</span>]);</pre>
    <div class="warn"><code>values[1]</code> <b>is</b> deterministic &mdash; it's computed from two values
    that were explicitly assigned, 2+6=8. <code>values[3]</code> was never touched, so it's still garbage.
    The key insight: <b>a computed or assigned value is always predictable</b>; only genuinely untouched
    memory is garbage. Here: "the first value will be 8, but the second value cannot be reliably
    predicted."</div>

<pre><span class="ty">int</span> values[<span class="nm">6</span>];
<span class="ty">int</span> i;
<span class="kw">for</span> (i = <span class="nm">0</span>; i &lt; <span class="nm">6</span>; i += <span class="nm">2</span>) {
    values[i] = i * <span class="nm">2</span>;
}
<span class="fn">printf</span>(<span class="st">"%d %d %d\\n"</span>, values[<span class="nm">0</span>], values[<span class="nm">3</span>], values[<span class="nm">4</span>]);</pre>
    <p>The loop only touches <b>even</b> indices (0, 2, 4) since it increments by 2: <code>values[0]=0</code>,
    <code>values[2]=4</code>, <code>values[4]=8</code>. Odd indices (1, 3, 5) are never assigned. So:
    <code>values[0]=0</code> (predictable), <code>values[3]</code> is garbage (odd, never touched),
    <code>values[4]=8</code> (predictable).</p>
  </div>

  <div class="card">
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Multiple choice</span><code>int numbers[5]; numbers[0]=10; numbers[1]=20; numbers[3]=40; printf("%d\\n", numbers[2]);</code> &mdash; what will the program print?</div>
      <button class="opt" data-i="0">0</button>
      <button class="opt" data-i="1">30</button>
      <button class="opt" data-i="2">A compiler error</button>
      <button class="opt" data-i="3">The value cannot be reliably predicted</button>
      <div class="fb"><code>numbers[2]</code> was never assigned. Local arrays are not auto-zeroed in C,
      so this is a garbage value.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span><code>int values[4]; values[0]=2; values[2]=6; values[1]=values[0]+values[2]; printf("%d %d\\n", values[1], values[3]);</code></div>
      <button class="opt" data-i="0">The first value will be 8, but the second value cannot be reliably predicted</button>
      <button class="opt" data-i="1">Both values cannot be reliably predicted</button>
      <button class="opt" data-i="2">Both values will be 8</button>
      <button class="opt" data-i="3">The first value cannot be predicted, but the second will be 0</button>
      <div class="fb"><code>values[1]</code> is computed (2+6=8, deterministic). <code>values[3]</code> is
      untouched (garbage).</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span><code>int values[6]; for (i=0;i&lt;6;i+=2) values[i]=i*2; printf("%d %d %d\\n", values[0], values[3], values[4]);</code></div>
      <button class="opt" data-i="0">The first value is 0 and the third value is 8, but the second value cannot be reliably predicted</button>
      <button class="opt" data-i="1">All three values are predictable and equal 0, 6, 8</button>
      <button class="opt" data-i="2">All three values cannot be reliably predicted</button>
      <button class="opt" data-i="3">The first value cannot be predicted, but the others can</button>
      <div class="fb">Only even indices (0,2,4) are assigned by the loop. <code>values[0]=0</code> and
      <code>values[4]=8</code> are predictable; <code>values[3]</code> (odd, untouched) is garbage.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>In C, a plain local array declared without an initializer (e.g. <code>int numbers[5];</code>) automatically starts with every element set to 0.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> Its elements hold whatever garbage was already on the stack until you
      assign them yourself.</div>
    </div>
  </div>
</section>

<!-- ============ Q11 I/O REDIRECTION ============ -->
<section class="topic" id="l8-redirect">
  <h2>HW01 &middot; I/O Redirection Practice</h2>
  <div class="concept">The one genuinely new operator in this homework is <code>&amp;&gt;</code>. Everything
  else here is Lesson 3's <code>&gt;</code> / <code>2&gt;</code> redirection material, applied to a
  slightly bigger program.</div>

  <div class="card">
    <h3 style="margin-top:0"><code>demo.c</code></h3>
<pre><span class="pp">#include</span> <span class="st">&lt;stdio.h&gt;</span>
<span class="pp">#define</span> CAP <span class="nm">5</span>

<span class="ty">int</span> <span class="fn">main</span>(<span class="ty">void</span>) {
    <span class="ty">int</span> a[CAP];
    <span class="ty">int</span> n = <span class="nm">0</span>;
    <span class="ty">int</span> x;

    <span class="cm">// Read ints from stdin until EOF or until array is full</span>
    <span class="kw">while</span> (<span class="fn">scanf</span>(<span class="st">"%d"</span>, &amp;x) == <span class="nm">1</span>) {
        <span class="kw">if</span> (n &gt;= CAP) {
            <span class="fn">fprintf</span>(stderr, <span class="st">"Warning: extra value %d ignored (array full)\\n"</span>, x);
            <span class="kw">continue</span>;
        }
        a[n] = x;
        n++;
    }

    <span class="fn">printf</span>(<span class="st">"n=%d\\n"</span>, n);

    <span class="cm">// Print the array contents</span>
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nm">0</span>; i &lt; n; i++) {
        <span class="fn">printf</span>(<span class="st">"a[%d]=%d\\n"</span>, i, a[i]);
    }

    <span class="cm">// Compute sum</span>
    <span class="ty">int</span> sum = <span class="nm">0</span>;
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nm">0</span>; i &lt; n; i++) sum += a[i];
    <span class="fn">printf</span>(<span class="st">"sum=%d\\n"</span>, sum);

    <span class="kw">return</span> <span class="nm">0</span>;
}</pre>
    <p class="muted"><code>nums.txt</code> contains exactly: <code>5 10 3 8 2 7</code> &mdash; six numbers,
    but <code>CAP</code> is only 5.</p>
  </div>

  <div class="card">
    <h3 style="margin-top:0">Tracing the run</h3>
    <p><code>n=5</code> because only 5 values fit before <code>n &gt;= CAP</code> becomes true on the 6th
    read (the value 7). <code>sum = 5+10+3+8+2 = 28</code>, <b>not</b> including the rejected 7. The
    warning line goes to <b>stderr</b>, not stdout &mdash; on a plain terminal both streams interleave and
    are visible, but they are logically separate channels, which is exactly why the questions below ask
    about redirecting them independently.</p>
    <table class="cmp">
      <tr><th>Command</th><th>Redirects</th><th>Result here</th></tr>
      <tr><td><code>./demo &lt; nums.txt &gt; out.txt</code></td><td>stdout only</td><td>normal output goes to <code>out.txt</code>; warning still prints to the terminal</td></tr>
      <tr><td><code>./demo &lt; nums.txt 2&gt; err.txt</code></td><td>stderr only (fd 2)</td><td>only the warning goes to <code>err.txt</code>; normal output stays on the terminal</td></tr>
      <tr><td><code>./demo &lt; nums.txt &amp;&gt; all.txt</code></td><td>stdout <b>and</b> stderr</td><td>everything &mdash; normal output and warning &mdash; goes into <code>all.txt</code></td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which command correctly compiles <code>demo.c</code> into an executable named <code>demo</code>?</div>
      <button class="opt" data-i="0"><code>gcc demo.c</code></button>
      <button class="opt" data-i="1"><code>gcc -o demo demo.c</code></button>
      <button class="opt" data-i="2"><code>gcc demo -o demo.c</code></button>
      <button class="opt" data-i="3"><code>gcc --output demo</code></button>
      <div class="fb">Same <code>-o</code> convention from Lesson 2: the name right after <code>-o</code>
      is the executable's name. <code>gcc demo.c</code> alone produces <code>a.out</code>, not
      <code>demo</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span><code>./demo &lt; nums.txt</code> with <code>nums.txt</code> = <code>5 10 3 8 2 7</code> &mdash; what appears on stdout?</div>
      <button class="opt" data-i="0"><code>n=6</code> then all six values then <code>sum=35</code></button>
      <button class="opt" data-i="1"><code>n=5</code>, <code>a[0]=5</code> through <code>a[4]=2</code>, then <code>sum=28</code></button>
      <button class="opt" data-i="2"><code>n=5</code>, <code>a[0]=5</code> through <code>a[4]=2</code>, then <code>sum=28</code>, then the warning about 7</button>
      <button class="opt" data-i="3">Just <code>sum=28</code></button>
      <div class="fb">stdout gets <code>n=5</code>, the five stored values, and <code>sum=28</code>. The
      warning about the rejected 7 goes to <b>stderr</b>, a separate channel &mdash; not part of stdout's
      content, even though it's visible on the same terminal by default.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>What happens with <code>./demo &lt; nums.txt &gt; out.txt</code>?</div>
      <button class="opt" data-i="0"><code>out.txt</code> contains the program's normal output; the warning still appears on the terminal</button>
      <button class="opt" data-i="1">Both the normal output and the warning go into <code>out.txt</code></button>
      <button class="opt" data-i="2">Nothing is written anywhere; the warning suppresses everything</button>
      <button class="opt" data-i="3"><code>out.txt</code> contains only the warning</button>
      <div class="fb"><code>&gt;</code> redirects <b>stdout only</b>. stderr is untouched by default, so
      the warning still shows on-screen even though the printf lines are now silently written to
      <code>out.txt</code>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which command sends <b>only</b> the warning message to <code>err.txt</code>, keeping normal output on the terminal?</div>
      <button class="opt" data-i="0"><code>./demo &lt; nums.txt &gt; err.txt</code></button>
      <button class="opt" data-i="1"><code>./demo &lt; nums.txt &amp;&gt; err.txt</code></button>
      <button class="opt" data-i="2"><code>./demo &lt; nums.txt 2&gt; err.txt</code></button>
      <button class="opt" data-i="3"><code>./demo &lt; nums.txt 1&gt; err.txt</code></button>
      <div class="fb"><code>2&gt;</code> specifically targets file descriptor <b>2</b>, which is stderr,
      leaving stdout un-redirected (still visible on the terminal).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Which command puts <b>everything</b> (normal output + warning) into <code>all.txt</code>?</div>
      <button class="opt" data-i="0"><code>./demo &lt; nums.txt &gt; all.txt</code></button>
      <button class="opt" data-i="1"><code>./demo &lt; nums.txt &amp;&gt; all.txt</code></button>
      <button class="opt" data-i="2"><code>./demo &lt; nums.txt 2&gt; all.txt</code></button>
      <button class="opt" data-i="3"><code>./demo &lt; nums.txt | all.txt</code></button>
      <div class="fb"><code>&amp;&gt;</code> is bash shorthand that redirects <b>both</b> stdout and stderr
      into the same file &mdash; the one operator in this homework that's new beyond Lesson 3's
      <code>&gt;</code>/<code>2&gt;</code> material.</div>
    </div>
  </div>
</section>

<!-- ============ SELF-CHECK ============ -->
<section class="topic" id="l8-selfcheck">
  <h2>HW01 Self-Check</h2>
  <p class="muted">A short mixed-format wrap-up pulling from every section above.</p>

  <div class="card">
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span><code>%%</code> is a printf-specific escape, unlike <code>\\n</code>, <code>\\t</code>, <code>\\\\</code>, and <code>\\"</code>, which are general C string escapes.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True. <code>%%</code> only matters inside a <code>printf</code>-family format string.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>sizeof</code> returns different results depending on the current value stored in a variable.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False. <code>sizeof</code> depends only on the <b>type</b>, never the value.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span>What is the only "falsy" integer value in a C <code>if</code> condition?</div>
      <input class="fillblank sm" data-answer="0~~~zero">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0 &mdash; everything else, positive or negative, is truthy.</div>
    </div>
    <div class="q" data-multi="0,2">
      <div class="prompt"><span class="tag">Multi-select</span>Which of these loop conditions will read across <b>multiple lines</b> of input (not stop at the first newline)?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> <code>while ((c = getchar()) != EOF)</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>while ((c = getchar()) != '\\n')</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> <code>while ((c = getchar()) != EOF) { if (c == '\\n') count++; }</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> <code>if ((c = getchar()) != '\\n') putchar(c);</code></span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A and C</b> both loop on <code>!= EOF</code>, so they keep reading past any
      newline. <b>B</b> stops at the first <code>'\\n'</code>. <b>D</b> is not even a loop.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>A state variable is best described as&hellip;</div>
      <button class="opt" data-i="0">A variable that can only ever hold the values 0 or 1</button>
      <button class="opt" data-i="1">A variable that tracks the program's current condition as it processes data, letting it remember what happened earlier</button>
      <button class="opt" data-i="2">Any variable declared with <code>static</code></button>
      <button class="opt" data-i="3">A variable that resets to 0 after every loop iteration</button>
      <div class="fb">The general definition &mdash; it can have any number of states (2, as with
      <code>in_word</code>, or 3, as in the quote-tracking example) as long as it's remembering something
      about what came before.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Which redirection sends stderr <i>and</i> stdout to the same file?</div>
      <button class="opt" data-i="0"><code>&gt;</code></button>
      <button class="opt" data-i="1"><code>2&gt;</code></button>
      <button class="opt" data-i="2"><code>&amp;&gt;</code></button>
      <button class="opt" data-i="3"><code>|</code></button>
      <div class="fb"><code>&amp;&gt;</code> &mdash; the bash shorthand for redirecting both streams
      together.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Fill in the blank</span><code>char s[] = "test"; s[2] = '\\0'; printf("%lu", strlen(s));</code> &mdash; output?</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2 &mdash; <code>strlen</code> stops at the new <code>'\\0'</code> at index 2, seeing
      only "te".</div>
    </div>
  </div>
</section>

</main>
`;
