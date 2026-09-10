/* ============================================================
   LESSON 17 — Hashing II (load factor, table resizing, complexity).
   Injects into #l17. Loaded before the main engine.
   ============================================================ */
document.getElementById('l17').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l17-load')">Load Factor</button>
  <button onclick="showTopic(this,'l17-resize')">Table Resizing</button>
  <button onclick="showTopic(this,'l17-complexity')">Complexity</button>
  <button onclick="showTopic(this,'l17-compare')">Chaining vs Probing</button>
  <button onclick="showTopic(this,'l17-ds')">Structure Comparison</button>
  <button onclick="showTopic(this,'l17-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== LOAD FACTOR ===================== -->
  <section class="topic active" id="l17-load">
    <h2>Lesson 17 · Load Factor</h2>
    <div class="concept">The <b>load factor</b> measures how full the table is: <b>load = N / M</b> (number of elements ÷ table size). It's the main driver of collision probability — the fuller the table, the more collisions. Example: N = 60, M = 100 → load = <b>0.6</b>.</div>
    <div class="card">
      <h3>Fill in — the load factor formula (your quiz)</h3>
      <p>Load factor is
        <input type="text" class="fillblank sm" data-answer="n~~~# of elements in table~~~number of elements~~~# elements~~~elements in table" placeholder="?">
        /
        <input type="text" class="fillblank sm" data-answer="m~~~table size~~~size of table~~~size" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answer: <b>N</b> (# of elements in table) / <b>M</b> (table size). Higher load → higher collision probability.</div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>A table of size <code>M = 40</code> holds <code>N = 30</code> elements. What is the load?</div>
        <button class="opt" data-i="0">1.33</button>
        <button class="opt" data-i="1">0.75</button>
        <button class="opt" data-i="2">10</button>
        <div class="fb"><b>0.75</b> (= 30/40). For probing this has hit the recommended resize threshold — time to grow the table.</div>
      </div>
    </div>
  </section>

  <!-- ===================== RESIZING ===================== -->
  <section class="topic" id="l17-resize">
    <h2>Lesson 17 · Table Resizing</h2>
    <div class="concept">When the load gets too high (or too low), <b>resize</b> the table: allocate a new, larger (or smaller) array and <b>reinsert every element</b>. Because M changed, every hash value must be <b>recomputed</b> — you can't just copy the slots over. This is a lot like <b>ArrayList doubling</b>, but with re-hashing.</div>
    <div class="card">
      <h3>Recommended thresholds</h3>
      <div class="concept">Resize when <code>N/M &gt; T</code> for a threshold <b>T</b>. Chaining tolerates a fuller table than probing, so it gets a higher threshold:
        <br>• <b>Chaining: T<sub>c</sub> = 1.0</b> (100%) — chains still work past load 1.
        <br>• <b>Probing: T<sub>p</sub> = 0.75</b> (75%) — clustering makes probing break down before the table is full.</div>
      <div class="q" data-mc="3">
        <div class="prompt"><span class="tag">Multiple choice</span>What does <code>T<sub>p</sub> = 0.75</code> mean? (your quiz)</div>
        <button class="opt" data-i="0">Load of the hash table is 0.75</button>
        <button class="opt" data-i="1">Average number of probes per operation is 0.75</button>
        <button class="opt" data-i="2">Probability of collision is 0.75 when probing</button>
        <button class="opt" data-i="3">Resize if load &gt; 0.75 when probing</button>
        <div class="fb"><b>Resize if load &gt; 0.75 when probing.</b> T<sub>p</sub> is the <b>threshold</b> that triggers a resize — when the probing table passes 75% full, double it and reinsert.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why must resizing <b>recompute</b> every hash value?</div>
        <button class="opt" data-i="0">The keys change during resizing.</button>
        <button class="opt" data-i="1">The hash function uses <code>mod M</code>, and M just changed — so old indices are no longer valid.</button>
        <button class="opt" data-i="2">It doesn't; you can copy slots directly.</button>
        <div class="fb">Since <code>h(k) = … mod M</code>, changing M changes where every key belongs. You reinsert each element through the hash function against the <b>new</b> M.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Tables also need to be resized <b>smaller</b> if the load becomes too low.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 5). A mostly-empty table wastes memory, so resizing shrinks it when load drops too far — just like ArrayList can shrink.</div>
      </div>
    </div>
  </section>

  <!-- ===================== COMPLEXITY ===================== -->
  <section class="topic" id="l17-complexity">
    <h2>Lesson 17 · Time Complexity</h2>
    <div class="concept">The key distinction is <b>worst case</b> vs <b>amortized</b>. Worst case assumes everything collided into one slot/cluster. <b>Amortized</b> averages the occasional expensive resize (O(n) to reinsert all) across the many cheap operations, and — with a good hash function keeping the load bounded — comes out to <b>O(1)</b>.</div>
    <div class="card">
      <table class="cmp">
        <tr><th>With resizing</th><th>Worst case</th><th>Amortized</th></tr>
        <tr><td>Insert / Search / Delete</td><td><code>O(n)</code></td><td><code>O(1)</code></td></tr>
      </table>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>With resizing, all operations (insert, search, delete) have what <b>worst-case</b> time? (your quiz)</div>
        <button class="opt" data-i="0">O(1)</button>
        <button class="opt" data-i="1">O(log n)</button>
        <button class="opt" data-i="2">O(n)</button>
        <button class="opt" data-i="3">O(n²)</button>
        <div class="fb"><b>O(n)</b>. In the worst case every key collided into one chain/cluster (and a resize reinserts all n elements), so a single operation can touch all n.</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>With resizing, all operations have what <b>amortized</b> time? (your quiz)</div>
        <button class="opt" data-i="0">O(1)</button>
        <button class="opt" data-i="1">O(log n)</button>
        <button class="opt" data-i="2">O(n)</button>
        <button class="opt" data-i="3">O(n²)</button>
        <div class="fb"><b>O(1)</b>. Resizing keeps the load bounded, so the average chain length / probe count stays constant. The rare O(n) resize is spread across many O(1) operations — exactly like ArrayList's amortized O(1) add.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>With a good hash function and resizing, the amortized average number of elements per chain is…</div>
        <button class="opt" data-i="0">N</button>
        <button class="opt" data-i="1">N/M, which stays bounded (≈ constant) because resizing caps the load → O(1) search</button>
        <button class="opt" data-i="2">M/N, which grows without bound</button>
        <div class="fb">A uniform hash spreads N keys over M slots → <b>N/M</b> per chain on average. Resizing keeps N/M under the threshold, so it's effectively constant → O(1) amortized search.</div>
      </div>
    </div>
  </section>

  <!-- ===================== CHAINING VS PROBING ===================== -->
  <section class="topic" id="l17-compare">
    <h2>Lesson 17 · Chaining vs Probing</h2>
    <div class="concept"><b>Chaining</b> wins at high load and has better worst-case behavior, but needs extra linked-list memory. <b>Probing</b> is faster at low load (cache-friendly, all in one array) and uses less memory, but adds complexity from clustering (needing tricks like double hashing).</div>
    <div class="card">
      <h3>Categorize each feature (your quiz)</h3>
      <table class="match" id="match-cvp">
        <tr><td class="match-term">Faster at higher loads</td><td><select class="match-def"><option value="">— choose —</option><option value="c">Chaining</option><option value="p">Probing</option></select></td></tr>
        <tr><td class="match-term">Generally has better worst-case performance</td><td><select class="match-def"><option value="">— choose —</option><option value="c">Chaining</option><option value="p">Probing</option></select></td></tr>
        <tr><td class="match-term">Requires an additional Linked List</td><td><select class="match-def"><option value="">— choose —</option><option value="c">Chaining</option><option value="p">Probing</option></select></td></tr>
        <tr><td class="match-term">Requires additional complexity due to clustering issues</td><td><select class="match-def"><option value="">— choose —</option><option value="c">Chaining</option><option value="p">Probing</option></select></td></tr>
        <tr><td class="match-term">Requires less memory</td><td><select class="match-def"><option value="">— choose —</option><option value="c">Chaining</option><option value="p">Probing</option></select></td></tr>
        <tr><td class="match-term">Faster at low loads (cache-friendly)</td><td><select class="match-def"><option value="">— choose —</option><option value="c">Chaining</option><option value="p">Probing</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-cvp','fb-match-cvp',['c','c','c','p','p','p'])">Check</button>
      <div class="fb" id="fb-match-cvp"></div>
    </div>
  </section>

  <!-- ===================== DATA STRUCTURE COMPARISON ===================== -->
  <section class="topic" id="l17-ds">
    <h2>Lesson 17 · Comparing Data Structures</h2>
    <div class="concept">Choosing a structure is about which guarantee you need — amortized speed vs a hard worst-case bound vs ordering.</div>
    <div class="card">
      <table class="cmp">
        <tr><th>Structure</th><th>Insert/Search/Delete</th><th>Best for…</th></tr>
        <tr><td>Hash Table</td><td>O(1) amortized, O(n) worst</td><td>Fastest when <b>amortized</b> time is acceptable and order doesn't matter</td></tr>
        <tr><td>Balanced BST (AVL/RB)</td><td>O(log n) worst</td><td>When <b>worst-case</b> guarantees or <b>sorted order</b> matter</td></tr>
        <tr><td>Heap</td><td>O(log n)</td><td>Priority queues — easier to implement, lower constants than balanced BSTs</td></tr>
      </table>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>You need guaranteed fast lookups <b>and</b> to iterate keys in sorted order. Best pick?</div>
        <button class="opt" data-i="0">Hash table</button>
        <button class="opt" data-i="1">Balanced BST (AVL / Red-Black)</button>
        <button class="opt" data-i="2">Heap</button>
        <div class="fb">A hash table has no order and only <b>amortized</b> guarantees. A balanced BST gives O(log n) <b>worst-case</b> and in-order traversal for free.</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Why prefer a heap over a balanced BST for a priority queue?</div>
        <button class="opt" data-i="0">Easier to implement and lower constant factors, when amortized/average time is acceptable</button>
        <button class="opt" data-i="1">Heaps give sorted iteration</button>
        <button class="opt" data-i="2">Heaps are O(1) for everything</button>
        <div class="fb">Both are O(log n) for the PQ operations, but heaps (array-backed) are simpler and have smaller constants — ideal when you only need min/max, not full ordering.</div>
      </div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l17-code">
    <h2>Lesson 17 · Code Writing</h2>
    <div class="concept">Resizing is the mechanism that keeps a hash table's amortized operations O(1).</div>
    <div class="card">
      <h3>1. Decide when to resize</h3>
      <p>Write <code>needsResize()</code> for a probing table (threshold 0.75) with fields <code>int n</code> and <code>int m</code>.</p>
      <textarea placeholder="boolean needsResize() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">boolean</span> <span class="fn">needsResize</span>() {
    <span class="kw">return</span> (<span class="ty">double</span>) n / m &gt; <span class="nm">0.75</span>;   <span class="cm">// load past Tp → grow</span>
}</pre>
        <div class="concept">Cast to <code>double</code> so you don't do integer division. For chaining, use <code>1.0</code> instead of <code>0.75</code>.</div>
      </div>
    </div>
    <div class="card">
      <h3>2. Resize &amp; rehash</h3>
      <p>Write <code>resize()</code> that doubles the table and reinserts every key (chaining table = array of linked lists). Assume a working <code>put(key)</code> that hashes against the current <code>m</code>.</p>
      <textarea placeholder="void resize() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">void</span> <span class="fn">resize</span>() {
    List&lt;Integer&gt;[] old = table;   <span class="cm">// keep a handle on old contents</span>
    m = m * <span class="nm">2</span>;                   <span class="cm">// grow (a prime near 2m is even better)</span>
    table = <span class="kw">new</span> List[m];        <span class="cm">// fresh, empty, larger table</span>
    n = <span class="nm">0</span>;                        <span class="cm">// put() will re-count</span>
    <span class="kw">for</span> (List&lt;Integer&gt; chain : old)
        <span class="kw">if</span> (chain != <span class="kw">null</span>)
            <span class="kw">for</span> (<span class="ty">int</span> key : chain)
                put(key);          <span class="cm">// re-hash against the NEW m</span>
}</pre>
        <div class="concept">The whole operation is O(n) — but it only happens after ~n cheap inserts, so it amortizes to <b>O(1)</b> per insert (same argument as ArrayList doubling). The crucial line is re-running <code>put</code> so each key is hashed against the new M.</div>
      </div>
    </div>
  </section>
</main>`;
