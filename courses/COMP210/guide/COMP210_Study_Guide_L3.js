/* ============================================================
   LESSON 3 — Java II (Scanner, docs, methods, access modifiers, pair programming).
   Injects into #l3. Loaded before the main engine.
   ============================================================ */
document.getElementById('l3').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l3-scanner')">Scanner</button>
  <button onclick="showTopic(this,'l3-methods')">Methods &amp; Modifiers</button>
  <button onclick="showTopic(this,'l3-pair')">Pair Programming</button>
</nav>
<main>

  <!-- ===================== SCANNER ===================== -->
  <section class="topic active" id="l3-scanner">
    <h2>Lesson 3 · Scanner (user input)</h2>
    <div class="concept"><code>java.util.Scanner</code> reads user input like a <b>pipe</b>: input goes in, and <code>next()</code> / <code>nextInt()</code> / <code>nextLine()</code> pull pieces out. <code>next()</code> and <code>nextInt()</code> grab a single token <b>delimited by whitespace</b>; <code>nextLine()</code> grabs the rest of the current line (including leading spaces). (Slides 7–8.)</div>
    <div class="card">
      <h3>Fill in — nextInt delimiter (your quiz)</h3>
      <p>The Scanner method <code>nextInt()</code> gets a single
        <input type="text" class="fillblank sm" data-answer="integer~~~int" placeholder="?" style="width:100px"> (delimited by
        <input type="text" class="fillblank sm" data-answer="whitespace" placeholder="?" style="width:120px">) input from the user.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>integer</b>, delimited by <b>whitespace</b>. ⚠ Note: the answer is "whitespace," not "space" — a space is just <i>one kind</i> of whitespace. Whitespace also includes tabs (<code>\\t</code>), newlines (<code>\\n</code>), and carriage returns (<code>\\r</code>).</div>
    </div>
    <div class="card">
      <h3>Trace the Scanner (your quiz)</h3>
<pre><span class="ty">int</span> i = s.nextInt();
String str = s.next();
String line = s.nextLine();</pre>
      <p class="muted">User enters: <code>24 79 12 50 60</code></p>
      <p>i is <input type="text" class="fillblank sm" data-answer="24" placeholder="?" style="width:60px"></p>
      <p>str is <input type="text" class="fillblank sm" data-answer='"79"|79' placeholder="?" style="width:80px"></p>
      <p>line is <input type="text" class="fillblank" data-answer='" 12 50 60"| 12 50 60|"12 50 60"' placeholder="?" style="width:160px"> <span class="muted">(hint: first char is a space)</span></p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>i = 24</b>, <b>str = "79"</b>, <b>line = " 12 50 60"</b>. <code>nextInt()</code> takes 24, <code>next()</code> takes the token 79, then <code>nextLine()</code> grabs everything left on that line — starting with the <b>space</b> right after 79, so it's <code>" 12 50 60"</code> with a leading space.</div>
    </div>
    <div class="card">
      <h3>Fill in — reading docs for LocalTime (your quiz)</h3>
      <p>To print the current local time (from <code>java.time.LocalTime</code>):</p>
      <p><code>System.out.println(</code>
        <input type="text" class="fillblank sm" data-answer="java" placeholder="?" style="width:60px">.
        <input type="text" class="fillblank sm" data-answer="time" placeholder="?" style="width:60px">.
        <input type="text" class="fillblank sm" data-answer="localtime" placeholder="?" style="width:90px">.
        <input type="text" class="fillblank sm" data-answer="now()~~~now" placeholder="?" style="width:70px"><code>);</code></p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answer: <code>java.time.LocalTime.now()</code>. The doc URL is <code>docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html</code>; <code>now()</code> is a <b>static</b> method (called on the class) that returns the current time. Reading docs to find the right method is the skill being tested.</div>
    </div>
  </section>

  <!-- ===================== METHODS ===================== -->
  <section class="topic" id="l3-methods">
    <h2>Lesson 3 · Methods &amp; Access Modifiers</h2>
    <div class="concept">A <b>method</b> is a function that belongs to a class:
      <code>accessModifier modifier returnType methodName(pType pName, ...) { }</code>.
      <b>static</b> → class method (<code>Class.method()</code>); no static → instance method (<code>obj.method()</code>). The <b>access modifier</b> controls where the method can be used. (Slides 11–13.)</div>
    <div class="card">
      <h3>Match the access modifier to its reach (your quiz)</h3>
      <table class="match" id="match-access">
        <tr><td class="match-term">[none] (default / package-private)</td><td><select class="match-def"><option value="">— choose —</option><option value="pkg">Same class or package</option><option value="prot">Same class, same package, or subclass</option><option value="priv">Same class</option><option value="pub">Anywhere</option></select></td></tr>
        <tr><td class="match-term">protected</td><td><select class="match-def"><option value="">— choose —</option><option value="pkg">Same class or package</option><option value="prot">Same class, same package, or subclass</option><option value="priv">Same class</option><option value="pub">Anywhere</option></select></td></tr>
        <tr><td class="match-term">private</td><td><select class="match-def"><option value="">— choose —</option><option value="pkg">Same class or package</option><option value="prot">Same class, same package, or subclass</option><option value="priv">Same class</option><option value="pub">Anywhere</option></select></td></tr>
        <tr><td class="match-term">public</td><td><select class="match-def"><option value="">— choose —</option><option value="pkg">Same class or package</option><option value="prot">Same class, same package, or subclass</option><option value="priv">Same class</option><option value="pub">Anywhere</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-access','fb-match-access',['pkg','prot','priv','pub'])">Check</button>
      <div class="fb" id="fb-match-access"></div>
    </div>
    <div class="card">
      <div class="concept">From most to least restrictive: <b>private</b> (same class only) → <b>[none]</b> (class + package) → <b>protected</b> (class + package + subclasses) → <b>public</b> (anywhere). This is why fields are usually <code>private</code> and accessed through <code>public</code> getters/setters.</div>
    </div>
  </section>

  <!-- ===================== PAIR PROGRAMMING ===================== -->
  <section class="topic" id="l3-pair">
    <h2>Lesson 3 · Pair Programming Roles</h2>
    <div class="concept">Two roles: the <b>Driver</b> is at the keyboard, focused on the immediate task; the <b>Navigator</b> watches the bigger picture — reviewing, catching bugs, planning next steps. They swap regularly. (Slide on pair programming roles.)</div>
    <div class="card">
      <h3>Match each characteristic to its role (your quiz)</h3>
      <table class="match" id="match-pair">
        <tr><td class="match-term">Focused on the tiny goal at hand, ignoring larger issues for now</td><td><select class="match-def"><option value="">— choose —</option><option value="d">Driver</option><option value="n">Navigator</option></select></td></tr>
        <tr><td class="match-term">The person at the wheel (keyboard)</td><td><select class="match-def"><option value="">— choose —</option><option value="d">Driver</option><option value="n">Navigator</option></select></td></tr>
        <tr><td class="match-term">Talks through what they are doing while doing it</td><td><select class="match-def"><option value="">— choose —</option><option value="d">Driver</option><option value="n">Navigator</option></select></td></tr>
        <tr><td class="match-term">Keeps an eye on larger issues, bugs, and next steps</td><td><select class="match-def"><option value="">— choose —</option><option value="d">Driver</option><option value="n">Navigator</option></select></td></tr>
        <tr><td class="match-term">Reviews the code on-the-go, gives directions, shares thoughts</td><td><select class="match-def"><option value="">— choose —</option><option value="d">Driver</option><option value="n">Navigator</option></select></td></tr>
        <tr><td class="match-term">Observes while the driver is typing</td><td><select class="match-def"><option value="">— choose —</option><option value="d">Driver</option><option value="n">Navigator</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-pair','fb-match-pair',['d','d','d','n','n','n'])">Check</button>
      <div class="fb" id="fb-match-pair"></div>
    </div>
  </section>
</main>`;
