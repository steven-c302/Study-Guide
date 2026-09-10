/* ============================================================
   LESSON 19 — Graph Algorithms (Topological Sort & BFS).
   Injects into #l19. Loaded before the main engine.
   Includes an interactive step-through BFS visualizer.
   ============================================================ */
document.getElementById('l19').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l19-topo')">Topological Sort</button>
  <button onclick="showTopic(this,'l19-topoalg')">Topo Algorithm</button>
  <button onclick="showTopic(this,'l19-bfs')">BFS</button>
  <button onclick="showTopic(this,'l19-bfsex')">BFS Shortest Path</button>
  <button onclick="showTopic(this,'l19-complexity')">Complexity</button>
  <button onclick="showTopic(this,'l19-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l19-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== TOPO SORT ===================== -->
  <section class="topic active" id="l19-topo">
    <h2>Lesson 19 · Topological Sort</h2>
    <div class="concept">A <b>topological sort</b> orders the vertices of a <b>DAG</b> (Directed Acyclic Graph) so that for every edge <code>(u, v)</code>, <b>u comes before v</b>. Think course prerequisites: you must take the prereq before the course. <b>Every DAG has at least one</b> topo order; some have many. A graph <b>with a cycle has none</b> — no vertex in the cycle can legally come first.</div>
    <div class="card">
      <h3>In-degree &amp; out-degree</h3>
      <div class="concept"><b>In-degree</b> = number of edges pointing <b>into</b> a vertex. <b>Out-degree</b> = number of edges pointing <b>out</b>. Key cycle check (slide 3): <b>if no vertex has in-degree 0, the graph must contain a cycle</b> — because a topo sort has to start somewhere with nothing before it.</div>
      <div class="q" data-tf="F">
        <div class="prompt"><span class="tag">T / F</span>If a graph has at least one vertex with no in-edge and at least one vertex with no out-edge, it has a topo sort. <span class="muted">(your quiz)</span></div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>False.</b> A source (in-degree 0) and a sink (out-degree 0) do <b>not</b> rule out a cycle elsewhere in the graph. Topo sort exists <b>only for DAGs</b> — the graph must be <b>completely acyclic</b>. The in-degree-0 rule is <i>necessary</i> (no such vertex ⇒ cycle) but not <i>sufficient</i>. (Slide 3.)</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why is a topo sort impossible when the graph has a cycle?</div>
        <button class="opt" data-i="0">Cycles make the graph undirected.</button>
        <button class="opt" data-i="1">Every vertex in the cycle depends on another in the cycle, so none can come first.</button>
        <button class="opt" data-i="2">Cycles remove all edges.</button>
        <div class="fb">In a cycle A→B→C→A, A must precede B, B precede C, and C precede A — a contradiction. No valid "first" vertex exists. (Slide 3.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== TOPO ALGORITHM ===================== -->
  <section class="topic" id="l19-topoalg">
    <h2>Lesson 19 · Topo Sort Algorithm (Kahn's)</h2>
    <div class="concept">Repeatedly pull off vertices that have nothing left before them:
      <br>1. Compute every vertex's in-degree; put all <b>in-degree-0</b> vertices in a queue.
      <br>2. Dequeue a vertex <code>v</code>, append it to the output list.
      <br>3. "Remove" <code>v</code>: for each edge <code>v→w</code>, <b>decrement</b> w's in-degree. If w hits <b>0</b>, enqueue it.
      <br>4. Repeat until the queue is empty. If the output has fewer than |V| vertices → a <b>cycle</b> exists.</div>
    <div class="card">
      <h3>Order the algorithm steps</h3>
      <table class="match" id="match-topo">
        <tr><td class="match-term">Step 1</td><td><select class="match-def"><option value="">— choose —</option><option value="a">Enqueue all in-degree-0 vertices</option><option value="b">Dequeue v, add it to the topo list</option><option value="c">Decrement in-degree of v's neighbors; enqueue any that reach 0</option><option value="d">When queue empties, check the list has all |V| vertices (else cycle)</option></select></td></tr>
        <tr><td class="match-term">Step 2</td><td><select class="match-def"><option value="">— choose —</option><option value="a">Enqueue all in-degree-0 vertices</option><option value="b">Dequeue v, add it to the topo list</option><option value="c">Decrement in-degree of v's neighbors; enqueue any that reach 0</option><option value="d">When queue empties, check the list has all |V| vertices (else cycle)</option></select></td></tr>
        <tr><td class="match-term">Step 3</td><td><select class="match-def"><option value="">— choose —</option><option value="a">Enqueue all in-degree-0 vertices</option><option value="b">Dequeue v, add it to the topo list</option><option value="c">Decrement in-degree of v's neighbors; enqueue any that reach 0</option><option value="d">When queue empties, check the list has all |V| vertices (else cycle)</option></select></td></tr>
        <tr><td class="match-term">Step 4</td><td><select class="match-def"><option value="">— choose —</option><option value="a">Enqueue all in-degree-0 vertices</option><option value="b">Dequeue v, add it to the topo list</option><option value="c">Decrement in-degree of v's neighbors; enqueue any that reach 0</option><option value="d">When queue empties, check the list has all |V| vertices (else cycle)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-topo','fb-match-topo',['a','b','c','d'])">Check</button>
      <div class="fb" id="fb-match-topo"></div>
    </div>
    <div class="card">
      <h3>Counting topo sorts (your quiz)</h3>
      <p class="muted">Edges: 1→2, 1→3, 2→4, 2→5, 3→4, 3→6, 4→5, 4→6.</p>
      <svg viewBox="0 0 300 180" style="width:100%;max-width:320px;background:#0b1119;border:1px solid var(--line);border-radius:8px">
        <defs><marker id="ar19" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#7f93a8"/></marker></defs>
        <g stroke="#7f93a8" stroke-width="1.5" marker-end="url(#ar19)" fill="none">
          <line x1="55" y1="90" x2="120" y2="45"/>
          <line x1="55" y1="90" x2="120" y2="135"/>
          <line x1="140" y1="45" x2="245" y2="45"/>
          <line x1="140" y1="52" x2="185" y2="83"/>
          <line x1="140" y1="128" x2="185" y2="97"/>
          <line x1="140" y1="135" x2="245" y2="135"/>
          <line x1="205" y1="83" x2="245" y2="52"/>
          <line x1="205" y1="97" x2="245" y2="128"/>
        </g>
        <g font-size="13" font-weight="700" text-anchor="middle">
          <circle cx="45" cy="90" r="15" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="45" y="95" fill="#e8eef5">1</text>
          <circle cx="130" cy="45" r="15" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="130" y="50" fill="#e8eef5">2</text>
          <circle cx="130" cy="135" r="15" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="130" y="140" fill="#e8eef5">3</text>
          <circle cx="195" cy="90" r="15" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="195" y="95" fill="#e8eef5">4</text>
          <circle cx="258" cy="45" r="15" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="258" y="50" fill="#e8eef5">5</text>
          <circle cx="258" cy="135" r="15" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="258" y="140" fill="#e8eef5">6</text>
        </g>
      </svg>
      <div class="q" data-mc="3" style="margin-top:8px">
        <div class="prompt"><span class="tag">Multiple choice</span>How many distinct topological sorts does this graph have?</div>
        <button class="opt" data-i="0">1</button><button class="opt" data-i="1">2</button><button class="opt" data-i="2">3</button>
        <button class="opt" data-i="3">4</button><button class="opt" data-i="4">6</button><button class="opt" data-i="5">8</button>
        <div class="fb"><b>4.</b> Only vertex <b>1</b> has in-degree 0, so it's always first. Vertex 4 needs both 2 and 3 first; vertices 5 and 6 both need 4 first. So every order looks like <code>1 · (2,3 in either order) · 4 · (5,6 in either order)</code> = 2 × 2 = <b>4</b>. E.g. 1,2,3,4,5,6 and 1,3,2,4,6,5.</div>
      </div>
    </div>
    <div class="card">
      <h3>Animated walkthrough — Kahn's algorithm step-by-step</h3>
      <p class="muted">Same graph. Each step dequeues an in-degree-0 vertex (orange), adds it to the topo order, and "removes" its out-edges — decrementing each neighbor's in-degree. When a neighbor hits 0, it turns amber and joins the queue. The number above each vertex is its current in-degree.</p>
      <div id="ts-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;overflow-x:auto"></div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-top:10px">
        <div><div class="muted" style="font-size:12px;margin-bottom:4px">0-in-degree queue (front → back):</div><div id="ts-queue" style="font-family:monospace;font-weight:700"></div></div>
        <div style="flex:1;min-width:180px"><div class="muted" style="font-size:12px;margin-bottom:4px">Topological order so far:</div><div id="ts-out" style="font-family:monospace;font-weight:700;color:#7bd88f"></div></div>
      </div>
      <div class="toolbar" style="margin-top:8px">
        <button class="btn small" onclick="tsStep()">Next ▶</button>
        <button class="btn ghost small" onclick="tsStart()">⟲ Restart</button>
      </div>
      <div class="step-desc" id="ts-note"></div>
    </div>
  </section>

  <!-- ===================== BFS ===================== -->
  <section class="topic" id="l19-bfs">
    <h2>Lesson 19 · Breadth-First Search</h2>
    <div class="concept"><b>BFS</b> finds the <b>shortest path</b> (fewest hops) from a source <code>s</code> to every other vertex in an <b>unweighted</b> graph. It explores level by level using a <b>FIFO queue</b> — exactly like a tree's level-order traversal, but graphs can have cycles, so you must track which vertices you've already <b>visited</b>.</div>
    <div class="card">
      <h3>The algorithm (slides 24–26)</h3>
<pre><span class="cm">// d(v)=distance, p(v)=predecessor</span>
<span class="kw">for each</span> v: d(v) = ∞
d(s) = <span class="nm">0</span>; mark s visited; enqueue s
<span class="kw">while</span> Q not empty:
    u = dequeue()
    <span class="kw">for each</span> unvisited neighbor v of u:
        mark v visited
        d(v) = d(u) + <span class="nm">1</span>
        p(v) = u
        enqueue v</pre>
    </div>
    <div class="card">
      <h3>What BFS tracks per vertex (your quiz)</h3>
      <p>When running BFS, we track for each vertex whether it is
        <input type="text" class="fillblank sm" data-answer="visited~~~marked" placeholder="?">, its
        <input type="text" class="fillblank sm" data-answer="distance~~~distance estimate~~~d(v)~~~distance from source~~~hop count" placeholder="?"> from the source, and its
        <input type="text" class="fillblank sm" data-answer="predecessor~~~parent~~~p(v)~~~predecessor along the path" placeholder="?"> along the path.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>visited</b>, <b>distance</b> (d(v)), <b>predecessor</b> (p(v)). Slides 23–24 list exactly these three: "Visited?", "d(v) = distance estimate from source", "p(v) = predecessor of v along the path". Distance gives shortest hop-count; predecessors let you reconstruct the actual path.</div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why does BFS need a "visited" flag but a tree's level-order traversal doesn't?</div>
        <button class="opt" data-i="0">Graphs are always weighted.</button>
        <button class="opt" data-i="1">A graph can have cycles, so without marking visited you'd revisit vertices forever.</button>
        <button class="opt" data-i="2">Trees don't use a queue.</button>
        <div class="fb">A tree has no cycles, so you never reach the same node twice. A graph "is not a tree anymore ⇒ may be cyclic" (slide 22), so the visited set stops infinite revisiting and keeps each vertex's <b>first</b> (shortest) distance.</div>
      </div>
    </div>
    <div class="card">
      <h3>Insertion order (slides 29–30)</h3>
      <div class="concept">If you enqueue a vertex's neighbors in a <b>different order</b> (e.g. reverse-alphabetical instead of alphabetical), the <b>shortest-path tree</b> can change — a vertex reachable from two vertices at the same level may get a different predecessor. But the <b>distances</b> d(v) stay the <b>same</b>, because the shortest hop-count doesn't depend on tie-breaking.</div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>You rerun BFS enqueuing neighbors in reverse order. What changes?</div>
        <button class="opt" data-i="0">Both the tree and the distances change.</button>
        <button class="opt" data-i="1">Neither changes.</button>
        <button class="opt" data-i="2">The shortest-path <b>tree</b> may change, but the <b>distances</b> stay the same.</button>
        <div class="fb">Slide 30: tree = <b>NO</b> (not the same), distances = <b>YES</b> (same). Tie-breaking on enqueue order only affects <i>which</i> equal-length path you record (the predecessor), never the length itself.</div>
      </div>
    </div>
  </section>

  <!-- ===================== BFS SHORTEST PATH ===================== -->
  <section class="topic" id="l19-bfsex">
    <h2>Lesson 19 · BFS Shortest Path (your quiz)</h2>
    <div class="concept">Undirected graph. Find the shortest path from <b>V</b> to <b>Y</b>. Neighbors enqueued alphabetically. Try it, then check — or step through it live in <b>Diagram It</b>.</div>
    <div class="card">
      <svg viewBox="0 0 340 220" style="width:100%;max-width:360px;background:#0b1119;border:1px solid var(--line);border-radius:8px">
        <g stroke="#7f93a8" stroke-width="1.5">
          <line x1="60" y1="55" x2="150" y2="55"/>   <!-- R-S -->
          <line x1="60" y1="55" x2="60" y2="160"/>   <!-- R-V -->
          <line x1="150" y1="55" x2="150" y2="160"/> <!-- S-W -->
          <line x1="240" y1="55" x2="300" y2="55"/>  <!-- T-U -->
          <line x1="240" y1="55" x2="150" y2="160"/> <!-- T-W -->
          <line x1="240" y1="55" x2="240" y2="160"/> <!-- T-X -->
          <line x1="300" y1="55" x2="300" y2="160"/> <!-- U-Y -->
          <line x1="150" y1="160" x2="240" y2="160"/><!-- W-X -->
          <line x1="240" y1="160" x2="300" y2="160"/><!-- X-Y -->
        </g>
        <g font-size="12" font-weight="700" text-anchor="middle">
          <circle cx="60" cy="55" r="14" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="60" y="59" fill="#e8eef5">R</text>
          <circle cx="150" cy="55" r="14" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="150" y="59" fill="#e8eef5">S</text>
          <circle cx="240" cy="55" r="14" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="240" y="59" fill="#e8eef5">T</text>
          <circle cx="300" cy="55" r="14" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="300" y="59" fill="#e8eef5">U</text>
          <circle cx="60" cy="160" r="14" fill="rgba(21,153,87,.3)" stroke="#159957"/><text x="60" y="164" fill="#e8eef5">V</text>
          <circle cx="150" cy="160" r="14" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="150" y="164" fill="#e8eef5">W</text>
          <circle cx="240" cy="160" r="14" fill="rgba(46,134,222,.2)" stroke="#2e86de"/><text x="240" y="164" fill="#e8eef5">X</text>
          <circle cx="300" cy="160" r="14" fill="rgba(214,137,16,.35)" stroke="#d68910"/><text x="300" y="164" fill="#e8eef5">Y</text>
        </g>
      </svg>
      <p style="margin-top:10px">Shortest path: V,
        <input type="text" class="fillblank sm" data-answer="r" placeholder="?" style="width:44px">,
        <input type="text" class="fillblank sm" data-answer="s" placeholder="?" style="width:44px">,
        <input type="text" class="fillblank sm" data-answer="w" placeholder="?" style="width:44px">,
        <input type="text" class="fillblank sm" data-answer="x" placeholder="?" style="width:44px">, Y.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check path</button>
      <div class="fb">Path: <b>V, R, S, W, X, Y</b> (distance 5). V's only neighbor is R, so BFS is forced: V→R→S→W→X→Y. From R you reach S, from S you reach W, from W you reach X, and X connects to Y. (Any other route — e.g. through T or U — is longer.)</div>
    </div>
  </section>

  <!-- ===================== COMPLEXITY ===================== -->
  <section class="topic" id="l19-complexity">
    <h2>Lesson 19 · Time Complexity</h2>
    <div class="concept">Both topo sort and BFS are <b>O(|V| + |E|)</b> — linear in the size of the graph. Each vertex is handled once (dequeued once), and across the whole run each edge is examined once (when you scan a vertex's neighbors). With <code>n = |V|</code> and <code>m = |E|</code>: <b>O(n + m)</b>.</div>
    <div class="card">
      <h3>Fill in — BFS complexity (your quiz)</h3>
      <p>The time complexity of BFS is
        <input type="text" class="fillblank sm" data-answer="o(v+e)~~~o(v + e)~~~o(n+m)~~~o(n + m)~~~o(|v|+|e|)~~~o(|v| + |e|)~~~v+e~~~n+m" placeholder="?" style="width:130px">.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <b>O(|V| + |E|)</b> = O(n + m). Slide 31: setup is O(n), and the while-loop touches each vertex O(1) and each edge O(1), giving O(n + m) overall.</div>
    </div>
    <div class="card">
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>For a <b>dense</b> graph where <code>m ≈ n²</code>, BFS is effectively…</div>
        <button class="opt" data-i="0">O(n)</button>
        <button class="opt" data-i="1">O(log n)</button>
        <button class="opt" data-i="2">O(n²)</button>
        <div class="fb">O(n + m) with m ≈ n² becomes <b>O(n²)</b>. Slide 31: "Sparse: O(n), Dense: O(n²)." The bound O(n+m) captures both — it just depends how many edges the graph has (n−1 ≤ m ≤ n(n−1)/2).</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Topo sort can degrade to <code>O(|V|² + |E|)</code> if…</div>
        <button class="opt" data-i="0">The graph is a DAG.</button>
        <button class="opt" data-i="1">Finding the next in-degree-0 vertex requires scanning all vertices each time (instead of using a queue).</button>
        <button class="opt" data-i="2">You use adjacency lists.</button>
        <div class="fb">Slide 12: if "find vertex with in-degree 0" isn't O(1) and you rescan the whole vertex list each round, it's O(|V|) per pick → O(|V|²+|E|). The <b>queue</b>-based version (slide 13) keeps it O(|V|+|E|).</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l19-diagram">
    <h2>Lesson 19 · Diagram It — BFS Step-Through</h2>
    <div class="concept">Pick a <b>source</b> and step through BFS on the quiz graph. Watch the <b>FIFO queue</b>, the <b>distances</b> d(v), and the <b>shortest-path tree</b> (bold edges = predecessor links). Neighbors are enqueued alphabetically. The current vertex being processed is ringed in orange; queued vertices are amber; finished are blue; the source is green.</div>
    <div class="card">
      <div class="toolbar">
        <span class="muted" style="font-size:13px">Source:</span>
        <button class="btn small" id="gsrc-V" onclick="gbStart('V')">V</button>
        <button class="btn ghost small" id="gsrc-A" onclick="gbStart('A')">A (from lecture)</button>
        <button class="btn small" onclick="gbStep()">Next ▶</button>
        <button class="btn ghost small" onclick="gbStart(GB_SRC)">⟲ Restart</button>
      </div>
      <div id="gb-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;overflow-x:auto"></div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-top:10px">
        <div><div class="muted" style="font-size:12px;margin-bottom:4px">Queue (front → back):</div><div id="gb-queue" style="font-family:monospace;font-weight:700"></div></div>
        <div style="flex:1;min-width:200px"><div class="muted" style="font-size:12px;margin-bottom:4px">Distances d(v) / predecessor p(v):</div><div id="gb-table" style="font-family:monospace;font-size:13px"></div></div>
      </div>
      <div class="step-desc" id="gb-note"></div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l19-code">
    <h2>Lesson 19 · Code Writing</h2>
    <div class="card">
      <h3>1. BFS shortest distances</h3>
      <p>Given an adjacency list <code>Map&lt;V, List&lt;V&gt;&gt; adj</code> and a source <code>s</code>, return a map of shortest hop-distances.</p>
      <textarea placeholder="Map<V,Integer> bfs(Map<V,List<V>> adj, V s) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="ty">Map</span>&lt;V,Integer&gt; <span class="fn">bfs</span>(<span class="ty">Map</span>&lt;V,List&lt;V&gt;&gt; adj, V s) {
    <span class="ty">Map</span>&lt;V,Integer&gt; dist = <span class="kw">new</span> HashMap&lt;&gt;();
    <span class="ty">Queue</span>&lt;V&gt; q = <span class="kw">new</span> LinkedList&lt;&gt;();
    dist.put(s, <span class="nm">0</span>);              <span class="cm">// source distance 0 = "visited"</span>
    q.add(s);
    <span class="kw">while</span> (!q.isEmpty()) {
        V u = q.remove();          <span class="cm">// FIFO dequeue</span>
        <span class="kw">for</span> (V v : adj.get(u)) {
            <span class="kw">if</span> (!dist.containsKey(v)) {  <span class="cm">// unvisited</span>
                dist.put(v, dist.get(u) + <span class="nm">1</span>);
                q.add(v);
            }
        }
    }
    <span class="kw">return</span> dist;
}</pre>
        <div class="concept">Using the <code>dist</code> map itself as the visited-set (a key exists ⇔ visited) is a common trick. Add a parallel <code>Map&lt;V,V&gt; pred</code> and set <code>pred.put(v,u)</code> to also recover the path. O(|V|+|E|).</div>
      </div>
    </div>
    <div class="card">
      <h3>2. Topological sort (Kahn's algorithm)</h3>
      <p>Return a topo order, or an empty list if a cycle exists.</p>
      <textarea placeholder="List<V> topoSort(Map<V,List<V>> adj) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="ty">List</span>&lt;V&gt; <span class="fn">topoSort</span>(<span class="ty">Map</span>&lt;V,List&lt;V&gt;&gt; adj) {
    <span class="ty">Map</span>&lt;V,Integer&gt; indeg = <span class="kw">new</span> HashMap&lt;&gt;();
    <span class="kw">for</span> (V v : adj.keySet()) indeg.putIfAbsent(v, <span class="nm">0</span>);
    <span class="kw">for</span> (V u : adj.keySet())              <span class="cm">// count in-degrees</span>
        <span class="kw">for</span> (V v : adj.get(u)) indeg.merge(v, <span class="nm">1</span>, Integer::sum);

    <span class="ty">Queue</span>&lt;V&gt; q = <span class="kw">new</span> LinkedList&lt;&gt;();
    <span class="kw">for</span> (V v : indeg.keySet())            <span class="cm">// all in-degree-0 vertices</span>
        <span class="kw">if</span> (indeg.get(v) == <span class="nm">0</span>) q.add(v);

    <span class="ty">List</span>&lt;V&gt; order = <span class="kw">new</span> ArrayList&lt;&gt;();
    <span class="kw">while</span> (!q.isEmpty()) {
        V u = q.remove();
        order.add(u);
        <span class="kw">for</span> (V v : adj.get(u)) {          <span class="cm">// "remove" edge u->v</span>
            indeg.merge(v, -<span class="nm">1</span>, Integer::sum);
            <span class="kw">if</span> (indeg.get(v) == <span class="nm">0</span>) q.add(v);
        }
    }
    <span class="kw">return</span> order.size() == indeg.size() ? order : <span class="kw">new</span> ArrayList&lt;&gt;();  <span class="cm">// cycle?</span>
}</pre>
        <div class="concept">Decrementing in-degree as you "remove" each source is the whole trick — a vertex becomes enqueue-able exactly when its <b>last</b> incoming edge is removed. If the final list is short of |V|, some vertices were stuck in a cycle. O(|V|+|E|).</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Interactive BFS step-through visualizer
   ============================================================ */
const GB_POS={R:[60,45],S:[150,45],T:[240,45],U:[300,45],V:[60,150],W:[150,150],X:[240,150],Y:[300,150],
              A:[60,45],B:[150,45],C:[240,45],D:[150,150],E:[300,150]};
// Two graphs share positions loosely; we use the quiz graph (R..Y) and the lecture graph (A..E).
const GB_ADJ_RY={R:['S','V'],S:['R','W'],T:['U','W','X'],U:['T','Y'],V:['R'],W:['S','T','X'],X:['T','W','Y'],Y:['U','X']};
const GB_ADJ_AE={A:['B'],B:['A','C','D'],C:['B','D'],D:['B','C','E'],E:['D']};
const GB_EDGES_RY=[['R','S'],['R','V'],['S','W'],['T','U'],['T','W'],['T','X'],['U','Y'],['W','X'],['X','Y']];
const GB_EDGES_AE=[['A','B'],['B','C'],['B','D'],['C','D'],['D','E']];
let GB_SRC='V', GB_ADJ=GB_ADJ_RY, GB_EDGES=GB_EDGES_RY, GB_NODES=Object.keys(GB_ADJ_RY);
let gb={};
function gbStart(src){
  if(src==='A'){ GB_ADJ=GB_ADJ_AE; GB_EDGES=GB_EDGES_AE; GB_NODES=Object.keys(GB_ADJ_AE); }
  else { GB_ADJ=GB_ADJ_RY; GB_EDGES=GB_EDGES_RY; GB_NODES=Object.keys(GB_ADJ_RY); }
  GB_SRC=src;
  gb={queue:[src], visited:{}, d:{}, p:{}, cur:null, done:false};
  GB_NODES.forEach(v=>gb.d[v]=Infinity);
  gb.d[src]=0; gb.visited[src]=true;
  ['V','A'].forEach(x=>{ const b=document.getElementById('gsrc-'+x); if(b) b.className='btn small'+(x===src?'':' ghost'); });
  gbRender('Initialized: d('+src+') = 0, marked visited, enqueued '+src+'. Press Next to dequeue and explore its neighbors.');
}
function gbStep(){
  if(gb.done){ gbRender('BFS complete — every reachable vertex has its shortest distance. Press Restart to run again.'); return; }
  if(gb.queue.length===0){ gb.cur=null; gb.done=true; gbRender('Queue empty — BFS is done.'); return; }
  const u=gb.queue.shift(); gb.cur=u;
  const nbrs=GB_ADJ[u].slice().sort();
  const added=[];
  nbrs.forEach(v=>{ if(!gb.visited[v]){ gb.visited[v]=true; gb.d[v]=gb.d[u]+1; gb.p[v]=u; gb.queue.push(v); added.push(v); } });
  let msg='Dequeued <b>'+u+'</b>. ';
  msg += added.length ? 'Enqueued unvisited neighbor'+(added.length>1?'s':'')+' '+added.join(', ')+' at distance '+(gb.d[u]+1)+' (predecessor '+u+'). ' : 'All its neighbors were already visited. ';
  if(gb.queue.length===0){ gb.done=true; msg+='Queue is now empty — BFS complete.'; }
  gbRender(msg);
}
function gbRender(note){
  // tree edges = predecessor links
  const treeSet=new Set(); GB_NODES.forEach(v=>{ if(gb.p&&gb.p[v]) treeSet.add([gb.p[v],v].sort().join('-')); });
  let e='',n='';
  GB_EDGES.forEach(pr=>{ const A=GB_POS[pr[0]],B=GB_POS[pr[1]];
    const tree=treeSet.has(pr.slice().sort().join('-'));
    e+='<line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="'+(tree?'#159957':'#3a4d63')+'" stroke-width="'+(tree?3.5:1.5)+'"/>'; });
  GB_NODES.forEach(v=>{ const p=GB_POS[v];
    let fill='rgba(46,134,222,.14)',stroke='#2e86de',sw=2;
    if(gb.visited&&gb.visited[v]){ fill='rgba(46,134,222,.28)'; }
    if(gb.queue&&gb.queue.indexOf(v)!==-1){ fill='rgba(214,137,16,.3)'; stroke='#d68910'; }
    if(v===GB_SRC){ fill='rgba(21,153,87,.34)'; stroke='#159957'; }
    if(v===gb.cur){ stroke='#e07b00'; sw=4.5; }
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+4)+'" text-anchor="middle" fill="#e8eef5" font-size="12" font-weight="700">'+v+'</text>';
    const dv=gb.d&&gb.d[v]; if(dv!==undefined&&dv!==Infinity) n+='<text x="'+p[0]+'" y="'+(p[1]-20)+'" text-anchor="middle" fill="#7bd88f" font-size="11" font-weight="700">'+dv+'</text>';
  });
  document.getElementById('gb-canvas').innerHTML='<svg viewBox="0 0 360 200" style="width:100%;max-width:420px">'+e+n+'</svg>';
  document.getElementById('gb-queue').innerHTML = (gb.queue&&gb.queue.length) ? gb.queue.map(v=>'<span style="display:inline-block;background:rgba(214,137,16,.25);border:1px solid #d68910;border-radius:6px;padding:2px 9px;margin:2px">'+v+'</span>').join('') : '<span class="muted">(empty)</span>';
  document.getElementById('gb-table').innerHTML = GB_NODES.slice().sort().map(v=>{
    const dv=gb.d[v]===Infinity?'∞':gb.d[v]; const pv=gb.p[v]||'—';
    return v+': d='+dv+', p='+pv;
  }).join(' &nbsp;·&nbsp; ');
  document.getElementById('gb-note').innerHTML=note||'';
}
gbStart('V');

/* ============================================================
   Interactive topological-sort (Kahn's algorithm) step-through
   Graph: 1->2,1->3,2->4,2->5,3->4,3->6,4->5,4->6
   ============================================================ */
const TS_POS={1:[45,90],2:[130,45],3:[130,135],4:[195,90],5:[262,45],6:[262,135]};
const TS_ADJ={1:[2,3],2:[4,5],3:[4,6],4:[5,6],5:[],6:[]};
const TS_NODES=[1,2,3,4,5,6];
let ts={};
function tsStart(){
  ts={indeg:{},queue:[],out:[],removed:{},cur:null,justZero:[]};
  TS_NODES.forEach(v=>ts.indeg[v]=0);
  TS_NODES.forEach(u=>TS_ADJ[u].forEach(v=>ts.indeg[v]++));
  TS_NODES.forEach(v=>{ if(ts.indeg[v]===0) ts.queue.push(v); });
  tsRender('Setup: computed every in-degree. Vertex <b>1</b> is the only one with in-degree 0, so it starts in the queue. Press Next.');
}
function tsStep(){
  if(ts.queue.length===0){
    const msg = ts.out.length===TS_NODES.length
      ? 'Queue empty and all '+TS_NODES.length+' vertices are in the order — a valid topological sort! Result: '+ts.out.join(', ')+'.'
      : 'Queue empty but only '+ts.out.length+'/'+TS_NODES.length+' vertices ordered — a cycle would cause this (not here).';
    ts.cur=null; ts.justZero=[]; tsRender(msg); return;
  }
  const u=ts.queue.shift(); ts.cur=u; ts.out.push(u); ts.removed[u]=true; ts.justZero=[];
  const dropped=[];
  TS_ADJ[u].forEach(v=>{ ts.indeg[v]--; dropped.push(v+'→'+ts.indeg[v]); if(ts.indeg[v]===0){ ts.queue.push(v); ts.justZero.push(v); } });
  let msg='Dequeued <b>'+u+'</b> → added to the order. Removed its out-edges, updating in-degrees: '+(dropped.length?dropped.join(', '):'(none)')+'. ';
  msg += ts.justZero.length ? 'Now at in-degree 0 → enqueued: '+ts.justZero.join(', ')+'.' : 'No neighbor reached 0 this step.';
  tsRender(msg);
}
function tsRender(note){
  let e='',n='';
  const defs='<defs><marker id="tsar" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#7f93a8"/></marker></defs>';
  TS_NODES.forEach(u=>TS_ADJ[u].forEach(v=>{
    const A=TS_POS[u],B=TS_POS[v],dx=B[0]-A[0],dy=B[1]-A[1],len=Math.hypot(dx,dy),r=15;
    const gone=ts.removed[u];
    const x1=A[0]+dx/len*r,y1=A[1]+dy/len*r,x2=B[0]-dx/len*r,y2=B[1]-dy/len*r;
    e+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(gone?'#22303f':'#7f93a8')+'" stroke-width="1.5" marker-end="url(#tsar)" opacity="'+(gone?0.4:1)+'"/>';
  }));
  TS_NODES.forEach(v=>{ const p=TS_POS[v];
    let fill='rgba(46,134,222,.18)',stroke='#2e86de',sw=2;
    if(ts.queue.indexOf(v)!==-1){ fill='rgba(214,137,16,.3)'; stroke='#d68910'; }
    if(ts.justZero.indexOf(v)!==-1){ sw=4; }
    if(ts.removed[v]){ fill='rgba(21,153,87,.28)'; stroke='#159957'; }
    if(v===ts.cur){ stroke='#e07b00'; sw=4.5; }
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+4)+'" text-anchor="middle" fill="#e8eef5" font-size="12" font-weight="700">'+v+'</text>';
    if(!ts.removed[v]) n+='<text x="'+p[0]+'" y="'+(p[1]-20)+'" text-anchor="middle" fill="#c9a13b" font-size="11" font-weight="700">in:'+ts.indeg[v]+'</text>';
  });
  document.getElementById('ts-canvas').innerHTML='<svg viewBox="0 0 310 180" style="width:100%;max-width:360px">'+defs+e+n+'</svg>';
  document.getElementById('ts-queue').innerHTML = ts.queue.length ? ts.queue.map(v=>'<span style="display:inline-block;background:rgba(214,137,16,.25);border:1px solid #d68910;border-radius:6px;padding:2px 9px;margin:2px">'+v+'</span>').join('') : '<span class="muted">(empty)</span>';
  document.getElementById('ts-out').innerHTML = ts.out.length ? ts.out.join(' · ') : '<span class="muted">(none yet)</span>';
  document.getElementById('ts-note').innerHTML=note||'';
}
tsStart();
