/* ============================================================
   LESSON 8 — Recursion Practice & Generics.
   Injects into #l8. Loaded before the main engine.
   Includes self-contained multiple-answer widgets and an
   interactive Fibonacci recursion-tree visualizer.
   ============================================================ */
document.getElementById('l8').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l8-reciter')">Recursion vs Iteration</button>
  <button onclick="showTopic(this,'l8-recpractice')">Recursion Practice</button>
  <button onclick="showTopic(this,'l8-generics')">Generics</button>
  <button onclick="showTopic(this,'l8-gencode')">Generic Class/Method/Interface</button>
  <button onclick="showTopic(this,'l8-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l8-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== RECURSION VS ITERATION ===================== -->
  <section class="topic active" id="l8-reciter">
    <h2>Lesson 8 · Recursion vs. Iteration</h2>
    <div class="concept">Many problems can be solved either <b>recursively</b> (a method calling itself) or <b>iteratively</b> (loops). Recursion is often more <b>concise</b> and closer to the problem's definition, but can have <b>worse time complexity</b> when it recomputes overlapping subproblems.</div>
    <div class="card">
      <h3>Fill in — the trade-off (your quiz)</h3>
      <p>For complex recursive problems, recursive approaches are often more
        <input type="text" class="fillblank sm" data-answer="concise~~~simpler" placeholder="?"> and have a
        <input type="text" class="fillblank sm" data-answer="greater~~~worse~~~higher" placeholder="?"> time complexity than iterative approaches.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>concise</b> and <b>greater</b>. Recursion reads cleaner, but the naive recursive version can blow up (see Fibonacci below).</div>
    </div>
    <div class="card">
      <h3>Fibonacci — two versions, same result</h3>
      <div class="two">
        <div><p class="muted">Recursive — concise but <b>O(2ⁿ)</b></p>
<pre><span class="kw">static int</span> <span class="fn">fib</span>(<span class="ty">int</span> x) {
    <span class="kw">if</span> (x == <span class="nm">0</span>) <span class="kw">return</span> <span class="nm">0</span>;
    <span class="kw">if</span> (x == <span class="nm">1</span>) <span class="kw">return</span> <span class="nm">1</span>;
    <span class="kw">return</span> <span class="fn">fib</span>(x-<span class="nm">1</span>) + <span class="fn">fib</span>(x-<span class="nm">2</span>);
}</pre></div>
        <div><p class="muted">Iterative — a bit longer but <b>O(n)</b></p>
<pre><span class="kw">static int</span> <span class="fn">fib</span>(<span class="ty">int</span> x) {
    <span class="kw">if</span> (x == <span class="nm">0</span>) <span class="kw">return</span> <span class="nm">0</span>;
    <span class="kw">if</span> (x == <span class="nm">1</span>) <span class="kw">return</span> <span class="nm">1</span>;
    <span class="ty">int</span>[] f = <span class="kw">new</span> <span class="ty">int</span>[x];
    f[<span class="nm">1</span>] = <span class="nm">1</span>;
    <span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">2</span>; i&lt;f.length; i++)
        f[i] = f[i-<span class="nm">1</span>] + f[i-<span class="nm">2</span>];
    <span class="kw">return</span> f[x-<span class="nm">1</span>];
}</pre></div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Why is the recursive Fibonacci O(2ⁿ) while the iterative one is O(n)?</div>
        <button class="opt" data-i="0">Recursion is always slower than loops.</button>
        <button class="opt" data-i="1">The iterative version skips the base cases.</button>
        <button class="opt" data-i="2">The recursive version recomputes the same <code>fib(k)</code> values over and over (overlapping subproblems); the iterative version computes each once and stores it.</button>
        <div class="fb">The recursion tree for <code>fib</code> branches twice per call and recomputes shared subtrees. The iterative version fills an array once, left to right — each value computed a single time. See it in the <b>Diagram It</b> tab.</div>
      </div>
    </div>
    <div class="card">
      <h3>Dynamic Programming</h3>
      <div class="concept"><b>Dynamic Programming (DP)</b> = solving a complex problem by breaking it into <b>overlapping subproblems</b>, solving each <b>exactly once</b>, and <b>storing</b> the results (e.g. in an array) to avoid redundant work.</div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>A good strategy is to write the <b>recursive</b> solution first (since finding the base/recursive cases is the hard part), then convert it to an <b>iterative</b> one to cut the time complexity.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 6). Think recursively to get it correct, then add storage / convert to iteration for speed — that's the DP mindset (the iterative Fibonacci above is exactly this).</div>
      </div>
    </div>
  </section>

  <!-- ===================== RECURSION PRACTICE ===================== -->
  <section class="topic" id="l8-recpractice">
    <h2>Lesson 8 · Recursion Practice</h2>
    <div class="concept">Recipe: break the problem into smaller subproblems, identify the <b>base case(s)</b> and <b>recursive case(s)</b>, then compute the time complexity (linear? divide-and-conquer? exponential?).</div>
    <div class="card">
      <h3>Find the bug</h3>
      <p class="muted">This divide-and-conquer <code>sum</code> (sum of <code>data[start..end]</code>) has a bug. Trace it on a size-2 range and draw the recursion tree.</p>
<pre><span class="kw">static int</span> <span class="fn">sum</span>(<span class="ty">int</span> start, <span class="ty">int</span> end, <span class="ty">int</span>[] data) {
    <span class="kw">if</span> (start == end) <span class="kw">return</span> data[start];
    <span class="ty">int</span> firstHalf  = <span class="fn">sum</span>(start, (start+end)/<span class="nm">2</span>, data);
    <span class="ty">int</span> secondHalf = <span class="fn">sum</span>((start+end)/<span class="nm">2</span>, end, data);   <span class="cm">// &lt;-- ?</span>
    <span class="kw">return</span> firstHalf + secondHalf;
}</pre>
      <button class="btn ghost small" onclick="toggleReveal(this)">Show the bug &amp; fix</button>
      <div class="reveal"><div class="concept"><b>Bug:</b> the second call starts at the <b>same</b> index the first call ended on: <code>mid = (start+end)/2</code>. So the middle element is counted in <b>both</b> halves, and worse — for a size-2 range <code>(start, start+1)</code>, <code>mid = start</code>, so the second call <code>sum(start, start+1, ...)</code> is <b>identical to the original call</b> → infinite recursion → <code>StackOverflowError</code>.<br><b>Fix:</b> start the second half one past the middle:<br><code>int secondHalf = sum((start+end)/2 + 1, end, data);</code></div></div>
    </div>
    <div class="card">
      <h3>Time complexity of the fixed <code>sum</code></h3>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Once fixed, what's the time complexity in terms of <code>n</code> (the range size)?</div>
        <button class="opt" data-i="0">O(n) — each element is visited once at the leaves; the split tree has ~2n nodes doing O(1) work</button>
        <button class="opt" data-i="1">O(n²)</button>
        <button class="opt" data-i="2">O(2ⁿ) — like naive Fibonacci</button>
        <div class="fb"><b>O(n)</b>. It splits the range in half and recurses on <b>non-overlapping</b> halves (<code>T(n)=2T(n/2)+O(1)</code>), so every element is summed exactly once → linear. (Unlike Fibonacci, the subproblems here don't overlap.)</div>
      </div>
    </div>
    <div class="card">
      <h3>String recursion — <code>upgrade</code></h3>
      <p>Write <code>upgrade(String s)</code>: replace every <code>"110"</code> with <code>"210"</code> (left to right, non-overlapping), leaving everything else unchanged.</p>
      <textarea placeholder="public static String upgrade(String s) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static</span> String <span class="fn">upgrade</span>(String s) {
    <span class="kw">if</span> (s.length() &lt; <span class="nm">3</span>) <span class="kw">return</span> s;                 <span class="cm">// base: too short to match</span>
    <span class="kw">if</span> (s.startsWith(<span class="st">"110"</span>))
        <span class="kw">return</span> <span class="st">"210"</span> + <span class="fn">upgrade</span>(s.substring(<span class="nm">3</span>)); <span class="cm">// match: consume 3 chars</span>
    <span class="kw">return</span> s.charAt(<span class="nm">0</span>) + <span class="fn">upgrade</span>(s.substring(<span class="nm">1</span>)); <span class="cm">// no match: keep 1 char, recurse on rest</span>
}</pre>
        <div class="concept">Two recursive cases: on a match, emit "210" and skip 3 chars; otherwise keep the first char and recurse on the rest. The <b>substring</b> is the shrinking argument that reaches the base case.</div>
      </div>
    </div>
    <div class="card">
      <h3>String recursion — <code>pairCount</code></h3>
      <p>Write <code>pairCount(String s)</code>: count how many characters equal the character <b>two positions</b> after them (i.e. <code>s[i] == s[i+2]</code>).</p>
      <textarea placeholder="public static int pairCount(String s) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static int</span> <span class="fn">pairCount</span>(String s) {
    <span class="kw">if</span> (s.length() &lt; <span class="nm">3</span>) <span class="kw">return</span> <span class="nm">0</span>;                 <span class="cm">// base: no i+2 to compare</span>
    <span class="kw">if</span> (s.charAt(<span class="nm">0</span>) == s.charAt(<span class="nm">2</span>))
        <span class="kw">return</span> <span class="nm">1</span> + <span class="fn">pairCount</span>(s.substring(<span class="nm">1</span>));   <span class="cm">// count it + recurse</span>
    <span class="kw">return</span> <span class="fn">pairCount</span>(s.substring(<span class="nm">1</span>));            <span class="cm">// just recurse</span>
}</pre>
        <div class="concept">Linear recursion: check the front pair, add 1 if it matches, then slide forward by one character. Base case when fewer than 3 chars remain.</div>
      </div>
    </div>
    <div class="card">
      <h3>Divide the search — <code>sumToTarget</code></h3>
      <p>Write <code>sumToTarget(int[] nums, int index, int target)</code>: return <code>true</code> if some subset of <code>nums[index..]</code> sums to <code>target</code>. (Classic "include it or skip it" recursion.)</p>
      <textarea placeholder="boolean sumToTarget(int[] nums, int index, int target) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">boolean</span> <span class="fn">sumToTarget</span>(<span class="ty">int</span>[] nums, <span class="ty">int</span> index, <span class="ty">int</span> target) {
    <span class="kw">if</span> (target == <span class="nm">0</span>) <span class="kw">return</span> <span class="kw">true</span>;                 <span class="cm">// hit it exactly</span>
    <span class="kw">if</span> (index == nums.length || target &lt; <span class="nm">0</span>) <span class="kw">return</span> <span class="kw">false</span>;
    <span class="kw">return</span> <span class="fn">sumToTarget</span>(nums, index+<span class="nm">1</span>, target)             <span class="cm">// SKIP nums[index]</span>
        || <span class="fn">sumToTarget</span>(nums, index+<span class="nm">1</span>, target - nums[index]); <span class="cm">// INCLUDE it</span>
}</pre>
        <div class="concept">Two recursive calls = try every subset: one branch skips the current number, the other includes it (subtracting it from the target). Exponential in the worst case, but a clean, correct way to explore all combinations.</div>
      </div>
    </div>
  </section>

  <!-- ===================== GENERICS ===================== -->
  <section class="topic" id="l8-generics">
    <h2>Lesson 8 · Generics</h2>
    <div class="concept">A <b>generic type</b> <code>&lt;T&gt;</code> is a <b>placeholder for a type</b>, written in angle brackets. The letter doesn't matter (<code>&lt;E&gt;</code>, <code>&lt;K, V&gt;</code>, …). It lets one class/method/interface work for <b>any type</b>; you fill in the real type when you use it: <code>Box&lt;String&gt;</code>, <code>Box&lt;Integer&gt;</code>. You can declare several at once: <code>&lt;K, V&gt;</code>.</div>
    <div class="card">
      <h3>Select all — what can declare a generic type? (your quiz)</h3>
      <div id="ma-gen">
        <label class="ma-item"><input type="checkbox"> argument</label>
        <label class="ma-item"><input type="checkbox"> import statement</label>
        <label class="ma-item"><input type="checkbox"> method</label>
        <label class="ma-item"><input type="checkbox"> interface</label>
        <label class="ma-item"><input type="checkbox"> loop</label>
        <label class="ma-item"><input type="checkbox"> class</label>
      </div>
      <button class="btn small" style="margin-top:8px" onclick="maGen()">Check</button>
      <div class="fb" id="fb-ma-gen"></div>
    </div>
    <div class="card">
      <h3>Wrappers &amp; autoboxing</h3>
      <div class="concept"><code>T</code> can only be an <b>object</b> (reference type), never a primitive. To store a primitive, use its <b>wrapper class</b> (<code>int → Integer</code>, <code>double → Double</code>, <code>char → Character</code>…). <b>Autoboxing</b> converts between them automatically.</div>
<pre>Integer x = <span class="nm">5</span>;   <span class="cm">// autobox: int -> Integer</span>
<span class="ty">int</span> y = x;       <span class="cm">// auto-unbox: Integer -> int</span>
List&lt;Integer&gt; nums = <span class="kw">new</span> ArrayList&lt;&gt;();  <span class="cm">// List&lt;int&gt; is illegal</span></pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why is <code>List&lt;int&gt;</code> illegal but <code>List&lt;Integer&gt;</code> fine?</div>
        <button class="opt" data-i="0">Because int is bigger than Integer.</button>
        <button class="opt" data-i="1">A generic type argument must be a reference type (an object); <code>int</code> is a primitive, so you use its wrapper <code>Integer</code>.</button>
        <button class="opt" data-i="2">Because lists can't hold numbers.</button>
        <div class="fb">Generics only work with objects, so primitives ride in as their wrapper classes — and autoboxing makes it feel seamless (<code>nums.add(5)</code> boxes the 5 into an <code>Integer</code>).</div>
      </div>
    </div>
  </section>

  <!-- ===================== GENERIC CLASS/METHOD/INTERFACE ===================== -->
  <section class="topic" id="l8-gencode">
    <h2>Lesson 8 · Generic Class, Method &amp; Interface</h2>
    <div class="concept">Where the <code>&lt;T&gt;</code> goes tells you what it belongs to: after the <b>class</b> name, after the <b>interface</b> name, or (for a generic <b>method</b>) right <b>before the return type</b>.</div>
    <div class="card">
      <h3>The three declarations</h3>
      <div class="two">
        <div><p class="muted">Generic class</p>
<pre><span class="kw">public class</span> <span class="ty">Box</span>&lt;T&gt; {
    <span class="kw">private</span> T _item;
    <span class="kw">public</span> T <span class="fn">getItem</span>() { <span class="kw">return</span> _item; }
}</pre></div>
        <div><p class="muted">Generic interface</p>
<pre><span class="kw">public interface</span> <span class="ty">Package</span>&lt;T&gt; {
    T <span class="fn">getItem</span>();
    <span class="kw">boolean</span> <span class="fn">equals</span>(Package&lt;T&gt; other);
}</pre></div>
      </div>
<pre><span class="cm">// Generic method: &lt;T&gt; goes BEFORE the return type</span>
<span class="kw">public static</span> &lt;T&gt; T <span class="fn">pack</span>(T item) {
    <span class="kw">return</span> item;
}</pre>
      <table class="match" id="match-gen">
        <tr><td class="match-term"><code>class Box&lt;T&gt;</code></td><td><select class="match-def"><option value="">— choose —</option><option value="cls">&lt;T&gt; declared by a CLASS — usable anywhere in the class</option><option value="int">&lt;T&gt; declared by an INTERFACE — usable anywhere in it</option><option value="mth">&lt;T&gt; declared by a METHOD — before the return type, usable in that method</option></select></td></tr>
        <tr><td class="match-term"><code>interface Package&lt;T&gt;</code></td><td><select class="match-def"><option value="">— choose —</option><option value="cls">&lt;T&gt; declared by a CLASS — usable anywhere in the class</option><option value="int">&lt;T&gt; declared by an INTERFACE — usable anywhere in it</option><option value="mth">&lt;T&gt; declared by a METHOD — before the return type, usable in that method</option></select></td></tr>
        <tr><td class="match-term"><code>public static &lt;T&gt; T pack(...)</code></td><td><select class="match-def"><option value="">— choose —</option><option value="cls">&lt;T&gt; declared by a CLASS — usable anywhere in the class</option><option value="int">&lt;T&gt; declared by an INTERFACE — usable anywhere in it</option><option value="mth">&lt;T&gt; declared by a METHOD — before the return type, usable in that method</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-gen','fb-match-gen',['cls','int','mth'])">Check</button>
      <div class="fb" id="fb-match-gen"></div>
    </div>
    <div class="card">
      <h3>Implementing a generic interface — the Cat / Panther quiz</h3>
<pre><span class="kw">public interface</span> <span class="ty">Cat</span>&lt;T&gt; {
    T <span class="fn">lick</span>();
    Cat&lt;T&gt; <span class="fn">mate</span>(Cat&lt;T&gt; other);
}
<span class="kw">public class</span> <span class="ty">Panther</span>&lt;T&gt; <span class="kw">implements</span> <span class="ty">Cat</span>&lt;T&gt; { <span class="cm">/* body omitted */</span> }</pre>
      <p>Select the <b>valid</b> statement(s) in a <code>main</code> method:</p>
      <div id="ma-cat">
        <label class="ma-item"><input type="checkbox"> Cat&lt;T&gt; cat = new Panther&lt;&gt;();</label>
        <label class="ma-item"><input type="checkbox"> Cat&lt;String&gt; cat = new Cat&lt;&gt;();</label>
        <label class="ma-item"><input type="checkbox"> Cat&lt;String&gt; cat = new Panther&lt;&gt;();</label>
        <label class="ma-item"><input type="checkbox"> Panther&lt;T&gt; cat = new Panther&lt;&gt;();</label>
      </div>
      <button class="btn small" style="margin-top:8px" onclick="maCat()">Check</button>
      <div class="fb" id="fb-ma-cat"></div>
    </div>
    <div class="card">
      <h3>Setting the generic to a specific type</h3>
      <div class="concept">An implementing class can <b>keep</b> the generic (<code>class Box&lt;T&gt; implements Package&lt;T&gt;</code>) <b>or set it to a concrete type</b> (<code>class Box implements Package&lt;String&gt;</code>). Your quiz's <code>BallpointPen</code> does the latter.</div>
      <div class="q">
        <div class="prompt"><span class="tag">Fill in</span><code>Pen</code> is a generic interface. <code>BallpointPen</code> implements <code>Pen</code> and sets <code>T</code> to <code>Color</code>. Write its class header (no curly brace):
          <br><input type="text" class="fillblank lg" data-answer="public class BallpointPen implements Pen<Color>" placeholder="public class ..." style="margin-top:6px">
          <button class="btn small" onclick="checkFill(this)">Check</button></div>
        <div class="fb">Answer: <code>public class BallpointPen implements Pen&lt;Color&gt;</code> — you plug the concrete type <code>Color</code> into the interface's <code>&lt;T&gt;</code>. (Matches your quiz.)</div>
      </div>
      <div class="q">
        <div class="prompt"><span class="tag">Fill in</span><code>Pen</code> declares <code>T refill(T ink);</code>. Since <code>BallpointPen</code> set <code>T = Color</code>, write its <code>refill</code> method header (no curly brace):
          <br><input type="text" class="fillblank lg" data-answer="public Color refill(Color ink)" placeholder="public ..." style="margin-top:6px">
          <button class="btn small" onclick="checkFill(this)">Check</button></div>
        <div class="fb">Answer: <code>public Color refill(Color ink)</code> — every <code>T</code> in the interface method becomes <code>Color</code> in the implementation. (Matches your quiz.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l8-diagram">
    <h2>Lesson 8 · Diagram It — the Fibonacci Recursion Tree</h2>
    <div class="concept">This is why naive recursive <code>fib</code> is O(2ⁿ). Pick an <code>n</code> and see the full call tree: nodes with the <b>same value repeat</b> (same color) — that's redundant recomputation. Count the calls and watch them roughly double as <code>n</code> grows. Dynamic programming removes the repeats.</div>
    <div class="card">
      <div class="toolbar">
        <label class="muted">Draw the recursion tree for fib(</label>
        <button class="btn small" onclick="ftDraw(3)">3</button>
        <button class="btn small" onclick="ftDraw(4)">4</button>
        <button class="btn small" onclick="ftDraw(5)">5</button>
        <button class="btn small" onclick="ftDraw(6)">6</button>
        <label class="muted">)</label>
      </div>
      <div id="ft-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;overflow-x:auto;text-align:center"></div>
      <div class="step-desc" id="ft-info"></div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l8-code">
    <h2>Lesson 8 · Code Writing — Generics</h2>
    <div class="concept">Practice putting the <code>&lt;T&gt;</code> in the right spot. Write each, then reveal.</div>

    <div class="card">
      <h3>1. A generic Pair class</h3>
      <p>Write <code>Pair&lt;K, V&gt;</code> holding a <code>_key</code> (type K) and <code>_value</code> (type V), with a constructor. (Two type parameters!)</p>
      <textarea placeholder="public class Pair<K, V> { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">Pair</span>&lt;K, V&gt; {
    <span class="kw">private</span> K _key;
    <span class="kw">private</span> V _value;

    <span class="kw">public</span> <span class="fn">Pair</span>(K key, V value) {
        _key = key;
        _value = value;
    }

    <span class="kw">public</span> K <span class="fn">getKey</span>()   { <span class="kw">return</span> _key; }
    <span class="kw">public</span> V <span class="fn">getValue</span>() { <span class="kw">return</span> _value; }
}</pre>
        <div class="concept">This is the L8 <code>Pair</code> example. Two placeholders <code>&lt;K, V&gt;</code> let one class pair up <i>any</i> two types: <code>new Pair&lt;String, Integer&gt;("age", 21)</code>.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. A generic Box class + interface</h3>
      <p>Write interface <code>Package&lt;T&gt;</code> with <code>T getItem();</code>, then <code>Box&lt;T&gt; implements Package&lt;T&gt;</code> with a private <code>_item</code>, a constructor, and <code>getItem()</code>.</p>
      <textarea placeholder="public interface Package<T> { ... }  /  public class Box<T> implements Package<T> { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public interface</span> <span class="ty">Package</span>&lt;T&gt; {
    T <span class="fn">getItem</span>();
}

<span class="kw">public class</span> <span class="ty">Box</span>&lt;T&gt; <span class="kw">implements</span> <span class="ty">Package</span>&lt;T&gt; {
    <span class="kw">private</span> T _item;
    <span class="kw">public</span> <span class="fn">Box</span>(T item) { _item = item; }
    <span class="kw">public</span> T <span class="fn">getItem</span>() { <span class="kw">return</span> _item; }
}</pre>
        <div class="concept">The class keeps the interface generic by passing its own <code>&lt;T&gt;</code> through: <code>Box&lt;T&gt; implements Package&lt;T&gt;</code>. A <code>Box&lt;String&gt;</code> can be typed as a <code>Package&lt;String&gt;</code>.</div>
      </div>
    </div>

    <div class="card">
      <h3>3. A generic method</h3>
      <p>Write a <b>static generic</b> method <code>first</code> that takes an array of any type <code>T[]</code> and returns its first element.</p>
      <textarea placeholder="public static <T> T first(T[] arr) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public static</span> &lt;T&gt; T <span class="fn">first</span>(T[] arr) {
    <span class="kw">return</span> arr[<span class="nm">0</span>];
}</pre>
        <div class="concept">For a generic <b>method</b>, the <code>&lt;T&gt;</code> goes <b>right before the return type</b>. That declares <code>T</code> just for this method — the class itself doesn't need to be generic.</div>
      </div>
    </div>
  </section>
</main>`;

/* ---- style the multiple-answer items ---- */
document.querySelectorAll('#l8 .ma-item').forEach(el=>{
  el.style.cssText='display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:6px 0;cursor:pointer;font-size:14px;font-family:monospace';
});

/* ============================================================
   Self-contained multiple-answer graders
   ============================================================ */
function maGrade(containerId, correct, okMsg, noMsg){
  const items=document.querySelectorAll('#'+containerId+' .ma-item');
  let all=true;
  items.forEach((item,i)=>{
    const checked=item.querySelector('input').checked;
    const shouldCheck=correct.indexOf(i)!==-1;
    const ok=(checked===shouldCheck);
    item.style.borderColor=ok?'var(--green)':'var(--red)';
    item.style.background=ok?'rgba(21,153,87,.14)':'rgba(192,57,43,.12)';
    if(!ok)all=false;
  });
  const fb=document.getElementById('fb-'+containerId);
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all?okMsg:noMsg;
}
function maGen(){
  maGrade('ma-gen',[2,3,5],
    '✓ Correct! A generic type can be declared by a <b>method</b>, an <b>interface</b>, or a <b>class</b>.',
    '✗ Not quite. Generics are declared by a <b>method</b>, <b>interface</b>, or <b>class</b> (not an argument, import, or loop). Green rows are right as-is.');
}
function maCat(){
  maGrade('ma-cat',[2],
    '✓ Correct! Only <code>Cat&lt;String&gt; cat = new Panther&lt;&gt;();</code> is valid.',
    '✗ Not quite. Only <b>Cat&lt;String&gt; cat = new Panther&lt;&gt;();</b> works: the variable type is the interface with a real type (String), and the object is a concrete class (Panther). The others fail because <code>T</code> is not a real type in main, and you cannot instantiate the interface <code>new Cat&lt;&gt;()</code>.');
}

/* ============================================================
   Fibonacci recursion-tree visualizer (SVG)
   ============================================================ */
function ftBuild(x){ return x<=1 ? {v:x,children:[]} : {v:x,children:[ftBuild(x-1),ftBuild(x-2)]}; }
const FT_COLORS={0:'#c0392b',1:'#d68910',2:'#159957',3:'#2e86de',4:'#8e44ad',5:'#0f7a44',6:'#b06f00'};
function ftDraw(n){
  const root=ftBuild(n);
  let leaf=0, maxDepth=0, count=0;
  (function layout(node,depth){
    count++; maxDepth=Math.max(maxDepth,depth);
    if(node.children.length===0){ node.px=leaf++; }
    else { node.children.forEach(c=>layout(c,depth+1)); node.px=(node.children[0].px+node.children[node.children.length-1].px)/2; }
    node.depth=depth;
  })(root,0);
  const W=Math.max(360,(leaf)*46), H=(maxDepth+1)*70+20;
  const sx=x=>30+x*46, sy=d=>30+d*70;
  let edges='', nodes='';
  (function draw(node){
    node.children.forEach(c=>{
      edges+='<line x1="'+sx(node.px)+'" y1="'+sy(node.depth)+'" x2="'+sx(c.px)+'" y2="'+sy(c.depth)+'" stroke="#2b3c50" stroke-width="1.5"/>';
      draw(c);
    });
    const col=FT_COLORS[node.v]||'#8e44ad';
    nodes+='<circle cx="'+sx(node.px)+'" cy="'+sy(node.depth)+'" r="16" fill="'+col+'" fill-opacity="0.30" stroke="'+col+'" stroke-width="2"/>';
    nodes+='<text x="'+sx(node.px)+'" y="'+(sy(node.depth)+4)+'" text-anchor="middle" fill="#e8eef5" font-size="11" font-weight="700">fib('+node.v+')</text>';
  })(root);
  document.getElementById('ft-canvas').innerHTML='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;min-width:'+W+'px">'+edges+nodes+'</svg>';
  // count how many times fib(0)/fib(1) (the leaves / base cases) are hit
  let base=0; (function cb(nd){ if(nd.children.length===0)base++; else nd.children.forEach(cb); })(root);
  document.getElementById('ft-info').innerHTML='<b>fib('+n+')</b> makes <b>'+count+'</b> total calls ('+base+' hit a base case). Notice repeated subtrees like <b style="color:#159957">fib(2)</b> and <b style="color:#2e86de">fib(3)</b> being recomputed — that redundancy is the O(2ⁿ) blow-up. An iterative/DP version computes each fib(k) <b>once</b> → O(n).';
}
ftDraw(4);
