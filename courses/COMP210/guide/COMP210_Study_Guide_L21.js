/* ============================================================
   LESSON 21 — Minimum Spanning Trees (Kruskal's & Prim's).
   Injects into #l21. Loaded before the main engine.
   Includes an interactive Kruskal's/Prim's step-through on one graph.
   ============================================================ */
document.getElementById('l21').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l21-dsmap')">DS Overview ★</button>
  <button onclick="showTopic(this,'l21-basics')">MST Basics</button>
  <button onclick="showTopic(this,'l21-kruskal')">Kruskal's</button>
  <button onclick="showTopic(this,'l21-prim')">Prim's</button>
  <button onclick="showTopic(this,'l21-compare')">Compare</button>
  <button onclick="showTopic(this,'l21-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l21-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== DS OVERVIEW MAP ===================== -->
  <section class="topic active" id="l21-dsmap">
    <h2>Lesson 21 · Data Structures Overview ★</h2>
    <div class="concept">The big-picture map of everything in the course, grouped into four families. Read the arrows carefully: an <b>arrow points FROM an implementation TO the ADT it implements</b> (the arrowhead sits on the ADT). <b>ADT</b> = <i>what</i> it does (the interface); <b>implementation</b> = <i>how</i> it's built.</div>
    <div class="card">
      <div style="display:flex;gap:18px;flex-wrap:wrap;font-size:13px;margin-bottom:6px">
        <span><span style="display:inline-block;width:26px;height:15px;border:2px solid #ff8a80;border-radius:4px;vertical-align:middle"></span> = ADT (what)</span>
        <span><span style="display:inline-block;width:26px;height:15px;border:1.6px dashed #8aa0b6;border-radius:4px;vertical-align:middle"></span> = implementation (how)</span>
        <span style="color:#ff8a80">──▶ = implements (points to the ADT)</span>
      </div>
      <svg viewBox="0 0 1000 560" style="width:100%;background:#0b1119;border:1px solid var(--line);border-radius:10px">
        <defs><marker id="impl21" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="#ff8a80"/></marker></defs>
        <style>
          .adt{fill:#141c27;stroke:#ff8a80;stroke-width:2.5;rx:8}
          .impl{fill:#141c27;stroke:#8aa0b6;stroke-width:1.6;stroke-dasharray:5 3;rx:8}
          .bx{fill:#e8eef5;font-size:13px;font-weight:700;text-anchor:middle;font-family:sans-serif}
          .fam{fill:#e8eef5;font-size:20px;font-weight:800;text-anchor:middle;font-family:sans-serif;text-decoration:underline}
          .sub{fill:#c7d2de;font-size:14px;font-weight:700;text-anchor:middle;font-family:sans-serif}
          .arw{stroke:#ff8a80;stroke-width:2.4;fill:none;marker-end:url(#impl21);opacity:.85}
        </style>

        <!-- ===== LINEAR ===== -->
        <rect x="18" y="70" width="300" height="470" rx="14" fill="rgba(232,121,198,.07)" stroke="rgba(232,121,198,.5)"/>
        <text x="168" y="108" class="fam">Linear</text>
        <line class="arw" x1="92" y1="452" x2="76" y2="192"/>
        <line class="arw" x1="98" y1="452" x2="168" y2="192"/>
        <line class="arw" x1="104" y1="452" x2="266" y2="192"/>
        <line class="arw" x1="232" y1="452" x2="82" y2="192"/>
        <line class="arw" x1="238" y1="452" x2="174" y2="192"/>
        <line class="arw" x1="244" y1="452" x2="272" y2="192"/>
        <rect class="adt" x="38" y="148" width="76" height="42"/><text class="bx" x="76" y="174">List</text>
        <rect class="adt" x="132" y="148" width="76" height="42"/><text class="bx" x="170" y="174">Stack</text>
        <rect class="adt" x="230" y="148" width="80" height="42"/><text class="bx" x="270" y="174">Queue</text>
        <rect class="impl" x="36" y="452" width="112" height="42"/><text class="bx" x="92" y="478">ArrayList</text>
        <rect class="impl" x="176" y="452" width="120" height="42"/><text class="bx" x="236" y="478">LinkedList</text>

        <!-- ===== TREES ===== -->
        <rect x="338" y="70" width="324" height="470" rx="14" fill="rgba(167,139,250,.07)" stroke="rgba(167,139,250,.5)"/>
        <text x="500" y="108" class="fam">Trees</text>
        <!-- Binary Trees sub -->
        <rect x="352" y="128" width="298" height="168" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(167,139,250,.4)"/>
        <text x="501" y="150" class="sub">Binary Trees</text>
        <line class="arw" x1="520" y1="200" x2="470" y2="216"/>
        <line class="arw" x1="520" y1="256" x2="470" y2="240"/>
        <rect class="adt" x="368" y="200" width="100" height="52"/><text class="bx" x="418" y="222">Priority</text><text class="bx" x="418" y="240">Queue</text>
        <rect class="impl" x="520" y="182" width="116" height="34"/><text class="bx" x="578" y="203">Binary Min Tree</text>
        <rect class="impl" x="520" y="240" width="116" height="34"/><text class="bx" x="578" y="261">Binary Heap</text>
        <!-- BSTs sub -->
        <rect x="352" y="320" width="298" height="200" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(167,139,250,.4)"/>
        <text x="501" y="344" class="sub">BSTs (Binary Search Trees)</text>
        <line class="arw" x1="430" y1="452" x2="482" y2="410"/>
        <line class="arw" x1="576" y1="452" x2="524" y2="410"/>
        <rect x="446" y="366" width="110" height="40" rx="8" fill="#141c27" stroke="#a78bfa" stroke-width="2.2"/><text class="bx" x="501" y="391">BST</text>
        <rect class="impl" x="372" y="452" width="116" height="44"/><text class="bx" x="430" y="479">AVL Tree</text>
        <rect class="impl" x="516" y="452" width="128" height="44"/><text class="bx" x="580" y="479">Red-Black Tree</text>

        <!-- ===== MAPS ===== -->
        <rect x="682" y="70" width="300" height="200" rx="14" fill="rgba(96,165,250,.08)" stroke="rgba(96,165,250,.55)"/>
        <text x="832" y="108" class="fam">Maps</text>
        <line class="arw" x1="856" y1="178" x2="796" y2="178"/>
        <rect class="adt" x="708" y="156" width="86" height="46"/><text class="bx" x="751" y="184">Map</text>
        <rect class="impl" x="856" y="156" width="106" height="46"/><text class="bx" x="909" y="184">HashMap</text>

        <!-- ===== GRAPHS ===== -->
        <rect x="682" y="290" width="300" height="250" rx="14" fill="rgba(45,212,191,.08)" stroke="rgba(45,212,191,.55)"/>
        <text x="832" y="328" class="fam">Graphs</text>
        <line class="arw" x1="846" y1="388" x2="792" y2="418"/>
        <line class="arw" x1="846" y1="474" x2="792" y2="448"/>
        <rect class="adt" x="702" y="412" width="90" height="46"/><text class="bx" x="747" y="440">Graph</text>
        <rect class="impl" x="846" y="368" width="124" height="40"/><text class="bx" x="908" y="393">Adjacency Matrix</text>
        <rect class="impl" x="846" y="454" width="124" height="40"/><text class="bx" x="908" y="479">Adjacency List</text>
      </svg>
    </div>
    <div class="card">
      <h3>How to read it (the one thing everyone flips)</h3>
      <div class="concept">The <b>arrow means "implements" and points TO the ADT.</b> So <code>HashMap ──▶ Map</code> reads "HashMap implements the Map ADT," and <code>Adjacency List ──▶ Graph</code> reads "an adjacency list implements the Graph ADT." Never the other way around.
        <br><br>By family: <b>Linear</b> — List/Stack/Queue are ADTs; ArrayList &amp; LinkedList implement them (either one can implement any of the three). <b>Trees</b> — Priority Queue is an ADT implemented by a Binary Min Tree or Binary Heap; BST is a binary-tree subtype, and AVL &amp; Red-Black are self-balancing BSTs. <b>Maps</b> — Map ADT implemented by HashMap. <b>Graphs</b> — Graph ADT implemented by Adjacency Matrix or Adjacency List.</div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>The arrow <code>Binary Heap ──▶ Priority Queue</code> means:</div>
        <button class="opt" data-i="0">A Priority Queue is a kind of Binary Heap.</button>
        <button class="opt" data-i="1">A Binary Heap contains Priority Queues.</button>
        <button class="opt" data-i="2">A Binary Heap implements the Priority Queue ADT.</button>
        <div class="fb"><b>A Binary Heap implements the Priority Queue ADT.</b> The arrow points from the implementation (how) to the ADT (what). The heap is one concrete way to realize the priority-queue interface.</div>
      </div>
    </div>
    <div class="card">
      <h3>Recall practice — fill in the whole taxonomy</h3>
      <p class="muted">Type each structure from memory. Placeholder shows its role (ADT vs implementation). Then check yourself.</p>
      <div style="display:flex;flex-wrap:wrap;gap:14px">
        <div style="flex:1;min-width:230px;background:rgba(232,121,198,.07);border:1px solid rgba(232,121,198,.4);border-radius:10px;padding:12px">
          <div style="font-weight:700;color:#e879c6;margin-bottom:8px;text-decoration:underline">Linear</div>
          <div class="muted" style="font-size:12px">ADTs:</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 8px">
            <input type="text" class="ds-blank" data-answer="list~~~lists" placeholder="ADT">
            <input type="text" class="ds-blank" data-answer="stack~~~stacks" placeholder="ADT">
            <input type="text" class="ds-blank" data-answer="queue~~~queues" placeholder="ADT"></div>
          <div class="muted" style="font-size:12px">Implementations:</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">
            <input type="text" class="ds-blank" data-answer="arraylist~~~arraylists~~~array list" placeholder="impl">
            <input type="text" class="ds-blank" data-answer="linkedlist~~~linkedlists~~~linked list" placeholder="impl"></div>
        </div>
        <div style="flex:1.2;min-width:250px;background:rgba(167,139,250,.07);border:1px solid rgba(167,139,250,.4);border-radius:10px;padding:12px">
          <div style="font-weight:700;color:#a78bfa;margin-bottom:8px;text-decoration:underline">Trees</div>
          <div class="muted" style="font-size:12px">Binary Trees — PQ ADT + its 2 implementations:</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 8px">
            <input type="text" class="ds-blank" data-answer="priority queue~~~priorityqueue~~~pq" placeholder="ADT">
            <input type="text" class="ds-blank" data-answer="binary min tree~~~bmt~~~binary min tree~~~bmts" placeholder="impl">
            <input type="text" class="ds-blank" data-answer="binary heap~~~heap~~~heaps" placeholder="impl"></div>
          <div class="muted" style="font-size:12px">BSTs — the subtype + its 2 balanced forms:</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">
            <input type="text" class="ds-blank" data-answer="bst~~~binary search tree~~~bsts" placeholder="subtype">
            <input type="text" class="ds-blank" data-answer="avl tree~~~avl~~~avl trees" placeholder="impl">
            <input type="text" class="ds-blank" data-answer="red-black tree~~~red black tree~~~redblack tree~~~rb tree~~~red-black trees" placeholder="impl"></div>
        </div>
        <div style="flex:1;min-width:230px;display:flex;flex-direction:column;gap:12px">
          <div style="background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.5);border-radius:10px;padding:12px">
            <div style="font-weight:700;color:#60a5fa;margin-bottom:8px;text-decoration:underline">Maps</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <input type="text" class="ds-blank" data-answer="map~~~maps" placeholder="ADT">
              <input type="text" class="ds-blank" data-answer="hashmap~~~hashmaps~~~hash map" placeholder="impl"></div>
          </div>
          <div style="background:rgba(45,212,191,.08);border:1px solid rgba(45,212,191,.5);border-radius:10px;padding:12px">
            <div style="font-weight:700;color:#2dd4bf;margin-bottom:8px;text-decoration:underline">Graphs</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <input type="text" class="ds-blank" data-answer="graph~~~graphs" placeholder="ADT">
              <input type="text" class="ds-blank" data-answer="adjacency matrix~~~adjacency matrices~~~adj matrix" placeholder="impl">
              <input type="text" class="ds-blank" data-answer="adjacency list~~~adjacency lists~~~adj list" placeholder="impl"></div>
          </div>
        </div>
      </div>
      <div class="toolbar" style="margin-top:10px">
        <button class="btn small" onclick="dsRecallCheck()">Check all</button>
        <button class="btn ghost small" onclick="dsRecallReveal()">Reveal answers</button>
        <button class="btn ghost small" onclick="dsRecallClear()">Clear</button>
      </div>
      <div class="fb" id="fb-dsrecall"></div>
    </div>
  </section>

  <!-- ===================== BASICS ===================== -->
  <section class="topic" id="l21-basics">
    <h2>Lesson 21 · Spanning Trees &amp; MSTs</h2>
    <div class="concept">For a connected <b>undirected</b> graph, a <b>Spanning Tree (ST)</b> is a tree that uses a subset of the edges so that <b>every vertex</b> is included — exactly <b>n − 1</b> edges, no cycles. A <b>Minimum Spanning Tree (MST)</b> is the spanning tree whose <b>total edge weight is as small as possible</b>. Use case: cheapest way to wire up n cities so they're all connected. (Slide 2.)</div>
    <div class="card">
      <h3>Match the term (your quiz)</h3>
      <table class="match" id="match-mst">
        <tr><td class="match-term">Spanning Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="st">Tree formed using edges E such that all vertices in V appear in it</option><option value="tr">Connected acyclic graph</option><option value="gr">Data structure defined by vertices and edges</option><option value="mst">Spanning tree where edge weights sum as small as possible</option></select></td></tr>
        <tr><td class="match-term">Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="st">Tree formed using edges E such that all vertices in V appear in it</option><option value="tr">Connected acyclic graph</option><option value="gr">Data structure defined by vertices and edges</option><option value="mst">Spanning tree where edge weights sum as small as possible</option></select></td></tr>
        <tr><td class="match-term">Graph</td><td><select class="match-def"><option value="">— choose —</option><option value="st">Tree formed using edges E such that all vertices in V appear in it</option><option value="tr">Connected acyclic graph</option><option value="gr">Data structure defined by vertices and edges</option><option value="mst">Spanning tree where edge weights sum as small as possible</option></select></td></tr>
        <tr><td class="match-term">Minimum Spanning Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="st">Tree formed using edges E such that all vertices in V appear in it</option><option value="tr">Connected acyclic graph</option><option value="gr">Data structure defined by vertices and edges</option><option value="mst">Spanning tree where edge weights sum as small as possible</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-mst','fb-match-mst',['st','tr','gr','mst'])">Check</button>
      <div class="fb" id="fb-match-mst"></div>
    </div>
    <div class="card">
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Graphs can have more than one minimum spanning tree. <span class="muted">(your quiz)</span></div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slides 6–7). When several edges share the same weight, different choices can produce different trees that <b>all achieve the same minimum total cost</b>. So the MST cost is unique, but the tree itself may not be.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>A spanning tree of an n-vertex graph has how many edges?</div>
        <button class="opt" data-i="0">n</button>
        <button class="opt" data-i="1">n − 1</button>
        <button class="opt" data-i="2">n(n−1)/2</button>
        <div class="fb"><b>n − 1</b> — exactly enough to connect n vertices with no cycle. One fewer would disconnect it; one more would create a cycle. (Slide 2.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== KRUSKAL ===================== -->
  <section class="topic" id="l21-kruskal">
    <h2>Lesson 21 · Kruskal's Algorithm</h2>
    <div class="concept">Kruskal builds the MST by adding edges <b>smallest weight first</b>, skipping any edge that would form a <b>cycle</b>. It's a <b>greedy</b> algorithm — the locally cheapest safe edge each step gives the globally cheapest tree. It starts as a <b>forest</b> of single vertices and merges them into one tree. <b>Very fast on sparse graphs.</b> (Slides 8–9.)</div>
    <div class="card">
      <h3>The steps (slide 9)</h3>
<pre><span class="nm">1.</span> Start with all vertices, no edges (a forest).
<span class="nm">2.</span> Sort edges; repeatedly take the <b>minimum-weight</b> edge.
<span class="nm">3.</span> <span class="kw">if</span> it connects two <b>different</b> trees → add it (merge).
   <span class="kw">else</span> (both endpoints already connected) → <b>reject</b> (would make a cycle).
<span class="nm">4.</span> Repeat until all vertices are in one tree (n − 1 edges).</pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Kruskal rejects an edge when…</div>
        <button class="opt" data-i="0">Its weight is too large.</button>
        <button class="opt" data-i="1">Both of its endpoints are already in the same tree (adding it would create a cycle).</button>
        <button class="opt" data-i="2">It connects two different trees.</button>
        <div class="fb">Reject only on a <b>cycle</b> — when both endpoints are already connected. The "same tree?" test is done efficiently with a <b>union-find</b> structure. (Slide 9.)</div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Kruskal's time complexity is dominated by…</div>
        <button class="opt" data-i="0">Building the heap, O(n).</button>
        <button class="opt" data-i="1">The union-find, O(n²).</button>
        <button class="opt" data-i="2">Sorting the edges: O(m log m). Great for sparse graphs.</button>
        <div class="fb"><b>O(m log m)</b> — sorting the m edges is the bottleneck (the union-find operations are nearly O(1) each). Since m is small in a sparse graph, Kruskal shines there. (Slide 8: "very fast on sparse graphs.")</div>
      </div>
    </div>
  </section>

  <!-- ===================== PRIM ===================== -->
  <section class="topic" id="l21-prim">
    <h2>Lesson 21 · Prim's Algorithm</h2>
    <div class="concept">Prim grows <b>one</b> tree outward from a starting vertex. At each step it adds the <b>cheapest edge that leaves the tree</b> — connecting a vertex already in the tree to one that isn't. Because the new vertex is always outside the tree, it can <b>never create a cycle</b>. Also greedy. <b>Better than Kruskal on dense graphs.</b> (Slides 13–14.)</div>
    <div class="card">
      <h3>The steps (slide 14)</h3>
<pre><span class="nm">1.</span> Start with an empty tree T; pick any start vertex, add it to T.
<span class="nm">2.</span> Add the <b>min-weight edge (u, v)</b> where <b>u is in T but v is not</b>,
   and add v to T.
<span class="nm">3.</span> Repeat until all vertices are included.</pre>
      <div class="card" style="background:none;border:none;padding:0;margin:0">
        <h3>Fill in — Prim's growth rule (your quiz)</h3>
        <p>In Prim's algorithm, each step adds to the tree the
          <input type="text" class="fillblank sm" data-answer="minimum~~~min~~~smallest~~~least~~~lowest" placeholder="?" style="width:100px"> weight edge (u, v) where
          <input type="text" class="fillblank sm" data-answer="u" placeholder="?" style="width:50px"> is in the tree but
          <input type="text" class="fillblank sm" data-answer="v" placeholder="?" style="width:50px"> is not.</p>
        <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
        <div class="fb">Answers: <b>minimum</b> weight edge (u, v) where <b>u</b> is in the tree but <b>v</b> is not. Since v is always outside T, this edge never forms a cycle. (Slide 14.)</div>
      </div>
    </div>
    <div class="card">
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Prim's algorithm is better than Kruskal's algorithm on <b>dense</b> graphs. <span class="muted">(your quiz)</span></div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slide 14). Prim grows one tree and doesn't need to sort all m edges, so on a <b>dense</b> graph (m ≈ n²) it beats Kruskal's O(m log m) sort. Kruskal wins on <b>sparse</b> graphs.</div>
      </div>
    </div>
  </section>

  <!-- ===================== COMPARE ===================== -->
  <section class="topic" id="l21-compare">
    <h2>Lesson 21 · Kruskal vs Prim &amp; Greedy</h2>
    <div class="card">
      <h3>Fill in — the greedy principle (your quiz)</h3>
      <p>A greedy algorithm picks the best
        <input type="text" class="fillblank sm" data-answer="local" placeholder="?" style="width:90px"> solution to get the best
        <input type="text" class="fillblank sm" data-answer="global" placeholder="?" style="width:90px"> solution.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: best <b>local</b> → best <b>global</b>. Both Kruskal and Prim are greedy: each locally optimal edge choice builds up to a globally optimal MST. (Slide 9.)</div>
    </div>
    <div class="card">
      <table class="cmp">
        <tr><th></th><th>Kruskal's</th><th>Prim's</th></tr>
        <tr><td>Grows by</td><td>Adding globally smallest safe edge (merges a forest)</td><td>Extending one tree by its cheapest leaving edge</td></tr>
        <tr><td>Avoids cycles via</td><td>Union-find (same tree? reject)</td><td>Only adds edges to vertices <b>outside</b> the tree</td></tr>
        <tr><td>Time</td><td>O(m log m)</td><td>O(m log n) with a heap</td></tr>
        <tr><td>Best for</td><td><b>Sparse</b> graphs</td><td><b>Dense</b> graphs</td></tr>
      </table>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Both algorithms are examples of what strategy?</div>
        <button class="opt" data-i="0">Divide and conquer</button>
        <button class="opt" data-i="1">Greedy</button>
        <button class="opt" data-i="2">Dynamic programming</button>
        <div class="fb"><b>Greedy.</b> Each makes the locally cheapest safe choice, and for MSTs that provably yields the global optimum. (Slides 8, 13.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l21-diagram">
    <h2>Lesson 21 · Diagram It — Build an MST</h2>
    <div class="concept">Run <b>Kruskal's</b> or <b>Prim's</b> on the <b>same</b> weighted graph and compare. Green edges are in the MST; the orange edge is the one being considered this step; a red dashed edge was <b>rejected</b> (Kruskal, would make a cycle). Both finish at the same total cost — that's the MST. Try each mode and watch how differently they get there.</div>
    <div class="card">
      <div class="toolbar">
        <button class="btn small" id="mstm-kruskal" onclick="mstSetMode('kruskal')">Kruskal's</button>
        <button class="btn ghost small" id="mstm-prim" onclick="mstSetMode('prim')">Prim's (from A)</button>
        <button class="btn small" onclick="mstStep()">Next ▶</button>
        <button class="btn ghost small" onclick="mstStart()">⟲ Restart</button>
      </div>
      <div id="mst-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;overflow-x:auto"></div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-top:10px">
        <div style="flex:1;min-width:200px"><div class="muted" style="font-size:12px;margin-bottom:4px" id="mst-panel-label">Edges (sorted):</div><div id="mst-panel" style="font-family:monospace;font-size:13px"></div></div>
        <div><div class="muted" style="font-size:12px;margin-bottom:4px">MST cost so far:</div><div id="mst-cost" style="font-family:monospace;font-weight:700;font-size:16px;color:#7bd88f"></div></div>
      </div>
      <div class="step-desc" id="mst-note"></div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l21-code">
    <h2>Lesson 21 · Code Writing</h2>
    <div class="card">
      <h3>1. Kruskal's (with union-find)</h3>
      <p>Return the total MST weight. Edges as <code>int[]{u,v,w}</code>; <code>n</code> vertices numbered 0..n−1.</p>
      <textarea placeholder="int kruskal(List<int[]> edges, int n) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="ty">int</span>[] parent;
<span class="kw">int</span> <span class="fn">find</span>(<span class="ty">int</span> x){ <span class="kw">return</span> parent[x]==x ? x : (parent[x]=<span class="fn">find</span>(parent[x])); }

<span class="kw">int</span> <span class="fn">kruskal</span>(List&lt;int[]&gt; edges, <span class="ty">int</span> n){
    parent = <span class="kw">new</span> <span class="ty">int</span>[n];
    <span class="kw">for</span> (<span class="ty">int</span> i=<span class="nm">0</span>; i&lt;n; i++) parent[i]=i;   <span class="cm">// each vertex its own tree</span>
    edges.sort((a,b) -&gt; a[<span class="nm">2</span>] - b[<span class="nm">2</span>]);       <span class="cm">// smallest weight first</span>
    <span class="ty">int</span> cost=<span class="nm">0</span>;
    <span class="kw">for</span> (<span class="ty">int</span>[] e : edges){
        <span class="ty">int</span> ru=<span class="fn">find</span>(e[<span class="nm">0</span>]), rv=<span class="fn">find</span>(e[<span class="nm">1</span>]);
        <span class="kw">if</span> (ru != rv){          <span class="cm">// different trees → no cycle</span>
            parent[ru]=rv;      <span class="cm">// union</span>
            cost += e[<span class="nm">2</span>];
        }                       <span class="cm">// else: same tree → skip (cycle)</span>
    }
    <span class="kw">return</span> cost;
}</pre>
        <div class="concept"><code>find</code> with path compression makes the "same tree?" check nearly O(1). Sorting dominates → O(m log m).</div>
      </div>
    </div>
    <div class="card">
      <h3>2. Prim's (with a min-heap)</h3>
      <p>Grow from vertex 0; adjacency list <code>adj.get(u)</code> gives <code>int[]{v, w}</code> pairs.</p>
      <textarea placeholder="int prim(Map<Integer,List<int[]>> adj, int n) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">int</span> <span class="fn">prim</span>(<span class="ty">Map</span>&lt;Integer,List&lt;int[]&gt;&gt; adj, <span class="ty">int</span> n){
    <span class="ty">boolean</span>[] inTree = <span class="kw">new</span> <span class="ty">boolean</span>[n];
    <span class="ty">PriorityQueue</span>&lt;int[]&gt; pq =                 <span class="cm">// {vertex, edgeWeight}</span>
        <span class="kw">new</span> PriorityQueue&lt;&gt;((a,b) -&gt; a[<span class="nm">1</span>] - b[<span class="nm">1</span>]);
    pq.add(<span class="kw">new</span> <span class="ty">int</span>[]{<span class="nm">0</span>, <span class="nm">0</span>});                  <span class="cm">// start vertex, cost 0</span>
    <span class="ty">int</span> cost=<span class="nm">0</span>;
    <span class="kw">while</span> (!pq.isEmpty()){
        <span class="ty">int</span>[] top = pq.poll();
        <span class="ty">int</span> u = top[<span class="nm">0</span>];
        <span class="kw">if</span> (inTree[u]) <span class="kw">continue</span>;             <span class="cm">// already added → skip</span>
        inTree[u] = <span class="kw">true</span>;
        cost += top[<span class="nm">1</span>];
        <span class="kw">for</span> (<span class="ty">int</span>[] nb : adj.get(u))         <span class="cm">// push leaving edges</span>
            <span class="kw">if</span> (!inTree[nb[<span class="nm">0</span>]]) pq.add(<span class="kw">new</span> <span class="ty">int</span>[]{nb[<span class="nm">0</span>], nb[<span class="nm">1</span>]});
    }
    <span class="kw">return</span> cost;
}</pre>
        <div class="concept">The heap always hands back the cheapest edge leaving the current tree. Each edge is pushed once → O(m log n).</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Interactive MST builder — Kruskal's & Prim's on one graph
   ============================================================ */
const MST_POS={A:[55,55],B:[185,40],C:[115,155],D:[275,75],E:[230,195],F:[350,150]};
const MST_EDGES=[['A','B',2],['A','C',3],['B','C',1],['B','D',4],['C','E',5],['D','E',6],['D','F',7],['E','F',2]];
const MST_NODES=['A','B','C','D','E','F'];
let mstMode='kruskal', mst={};
function ekey(u,v){ return [u,v].sort().join('-'); }
function mstSetMode(m){
  mstMode=m;
  document.getElementById('mstm-kruskal').className='btn small'+(m==='kruskal'?'':' ghost');
  document.getElementById('mstm-prim').className='btn small'+(m==='prim'?'':' ghost');
  mstStart();
}
function mstStart(){
  if(mstMode==='kruskal'){
    const sorted=MST_EDGES.slice().sort((a,b)=>a[2]-b[2]);
    const parent={}; MST_NODES.forEach(v=>parent[v]=v);
    mst={mode:'kruskal',sorted,idx:0,parent,tree:[],rejected:[],cost:0,cur:null,done:false};
    mstRender('Kruskal: edges sorted smallest-first. Press Next to take the cheapest edge and add it if it connects two different trees (else reject as a cycle).');
  } else {
    mst={mode:'prim',visited:{A:true},tree:[],cost:0,cur:null,done:false};
    mstRender('Prim: started the tree at vertex A. Press Next to add the cheapest edge that leaves the tree (from a visited vertex to an unvisited one).');
  }
}
function mstFind(p,x){ while(p[x]!==x){ p[x]=p[p[x]]; x=p[x]; } return x; }
function mstStep(){
  if(mst.done){ mstRender('MST complete — total cost '+mst.cost+'. Restart or switch modes to compare.'); return; }
  if(mst.mode==='kruskal'){
    if(mst.idx>=mst.sorted.length || mst.tree.length===MST_NODES.length-1){ mst.done=true; mst.cur=null; mstRender('Done — all '+MST_NODES.length+' vertices connected with '+mst.tree.length+' edges. <b>MST cost = '+mst.cost+'</b>.'); return; }
    const [u,v,w]=mst.sorted[mst.idx]; mst.cur=[u,v,w]; mst.idx++;
    const ru=mstFind(mst.parent,u), rv=mstFind(mst.parent,v);
    let msg='Considering edge '+u+'–'+v+' (weight '+w+'): ';
    if(ru!==rv){ mst.parent[ru]=rv; mst.tree.push(ekey(u,v)); mst.cost+=w; msg+='endpoints in different trees → <b>ADD</b> it. Cost now '+mst.cost+'.'; }
    else { mst.rejected.push(ekey(u,v)); msg+='both endpoints already connected → <b>REJECT</b> (would make a cycle).'; }
    if(mst.tree.length===MST_NODES.length-1){ mst.done=true; msg+=' All vertices connected — <b>MST cost = '+mst.cost+'</b>.'; }
    mstRender(msg);
  } else {
    // prim: cheapest edge from visited to unvisited
    let best=null;
    MST_EDGES.forEach(([u,v,w])=>{
      const uv=mst.visited[u]&&!mst.visited[v], vu=mst.visited[v]&&!mst.visited[u];
      if((uv||vu) && (!best || w<best[2])){ best=uv?[u,v,w]:[v,u,w]; }
    });
    if(!best){ mst.done=true; mst.cur=null; mstRender('Done — every vertex is in the tree. <b>MST cost = '+mst.cost+'</b>.'); return; }
    const [u,v,w]=best; mst.visited[v]=true; mst.tree.push(ekey(u,v)); mst.cost+=w; mst.cur=[u,v,w];
    let msg='Cheapest edge leaving the tree is '+u+'–'+v+' (weight '+w+') → add '+v+' to the tree. Cost now '+mst.cost+'.';
    if(MST_NODES.every(x=>mst.visited[x])){ mst.done=true; msg+=' All vertices in — <b>MST cost = '+mst.cost+'</b>.'; }
    mstRender(msg);
  }
}
function mstRender(note){
  const treeSet=new Set(mst.tree||[]);
  const rejSet=new Set(mst.rejected||[]);
  const curKey=mst.cur?ekey(mst.cur[0],mst.cur[1]):null;
  let e='',n='';
  MST_EDGES.forEach(([u,v,w])=>{
    const A=MST_POS[u],B=MST_POS[v],k=ekey(u,v);
    let stroke='#3a4d63',sw=1.5,dash='';
    if(treeSet.has(k)){ stroke='#159957'; sw=4; }
    if(rejSet.has(k)){ stroke='#c0392b'; dash='stroke-dasharray="4 3"'; }
    if(k===curKey){ stroke='#e07b00'; sw=4.5; }
    e+='<line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="'+stroke+'" stroke-width="'+sw+'" '+dash+'/>';
    const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;
    e+='<text x="'+mx+'" y="'+(my-3)+'" text-anchor="middle" fill="#c9a13b" font-size="11" font-weight="700">'+w+'</text>';
  });
  MST_NODES.forEach(v=>{ const p=MST_POS[v];
    const inTree = mst.mode==='prim' ? mst.visited&&mst.visited[v] : (mst.parent && (mst.tree.some(k=>k.split('-').indexOf(v)!==-1)));
    let fill=inTree?'rgba(21,153,87,.3)':'rgba(46,134,222,.16)', stroke=inTree?'#159957':'#2e86de', sw=2;
    if(mst.cur && (v===mst.cur[0]||v===mst.cur[1])){ stroke='#e07b00'; sw=4; }
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="16" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" fill="#e8eef5" font-size="13" font-weight="700">'+v+'</text>';
  });
  document.getElementById('mst-canvas').innerHTML='<svg viewBox="0 0 410 235" style="width:100%;max-width:460px">'+e+n+'</svg>';
  // side panel
  const label=document.getElementById('mst-panel-label');
  const panel=document.getElementById('mst-panel');
  if(mst.mode==='kruskal'){
    label.textContent='Edges (sorted smallest → largest):';
    panel.innerHTML=mst.sorted.map((ed,i)=>{
      const k=ekey(ed[0],ed[1]); const inT=treeSet.has(k), rej=rejSet.has(k), isCur=(i===mst.idx-1);
      const col=inT?'#7bd88f':(rej?'#e07a6b':(isCur?'#f0a030':'#8798ab'));
      const mark=inT?'✓':(rej?'✗':(i<mst.idx?'':'·'));
      return '<span style="color:'+col+';margin-right:10px;display:inline-block">'+ed[0]+ed[1]+'('+ed[2]+')'+mark+'</span>';
    }).join('');
  } else {
    label.textContent='In tree:';
    const inv=MST_NODES.filter(v=>mst.visited&&mst.visited[v]);
    panel.innerHTML='<span style="color:#7bd88f">{ '+inv.join(', ')+' }</span>';
  }
  document.getElementById('mst-cost').textContent=(mst.cost||0);
  document.getElementById('mst-note').innerHTML=note||'';
}
mstSetMode('kruskal');

/* ============================================================
   DS taxonomy recall (fill-in-the-blank) helpers
   ============================================================ */
(function(){
  const s=document.createElement('style');
  s.textContent='#l21 .ds-blank{width:100px;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:#0b1119;color:var(--text);font-size:13px;font-weight:600}'
    +'#l21 .ds-blank::placeholder{color:var(--muted);font-weight:400;font-style:italic}';
  document.head.appendChild(s);
})();
function dsRecallCheck(){
  let all=true, filled=0;
  document.querySelectorAll('#l21 .ds-blank').forEach(inp=>{
    const alts=inp.dataset.answer.toLowerCase().split('|').map(x=>x.trim());
    const val=inp.value.trim().toLowerCase().replace(/\s+/g,' ');
    if(val) filled++;
    const ok=alts.indexOf(val)!==-1;
    inp.style.borderColor=ok?'var(--green)':'var(--red)';
    inp.style.background=ok?'rgba(21,153,87,.16)':'rgba(192,57,43,.12)';
    if(!ok) all=false;
  });
  const fb=document.getElementById('fb-dsrecall');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all ? '✓ Perfect recall — you reproduced the entire taxonomy!'
    : (filled===0 ? '✗ Try filling them in first, then check. Placeholders tell you ADT vs impl.'
                  : '✗ Red boxes are off — glance back at the diagram above and retry. (Plurals and common abbreviations like BMT/RB are accepted.)');
}
function dsRecallReveal(){
  document.querySelectorAll('#l21 .ds-blank').forEach(inp=>{
    inp.value=inp.dataset.answer.split('|')[0];
    inp.style.borderColor='var(--accent)'; inp.style.background='rgba(46,134,222,.14)';
  });
  const fb=document.getElementById('fb-dsrecall'); fb.className='fb show'; fb.innerHTML='Answers filled in. Clear and try again from memory!';
}
function dsRecallClear(){
  document.querySelectorAll('#l21 .ds-blank').forEach(inp=>{ inp.value=''; inp.style.borderColor='var(--line)'; inp.style.background='#0b1119'; });
  const fb=document.getElementById('fb-dsrecall'); fb.className='fb'; fb.innerHTML='';
}
