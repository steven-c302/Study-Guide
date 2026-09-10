/* ============================================================
   LESSON 20 — Graph Algorithms II (Dijkstra & Bellman-Ford).
   Injects into #l20. Loaded before the main engine.
   Includes an interactive step-through Dijkstra visualizer.
   ============================================================ */
document.getElementById('l20').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l20-relax')">Relaxation</button>
  <button onclick="showTopic(this,'l20-dijkstra')">Dijkstra's</button>
  <button onclick="showTopic(this,'l20-bellman')">Bellman-Ford</button>
  <button onclick="showTopic(this,'l20-compare')">Comparison</button>
  <button onclick="showTopic(this,'l20-terms')">Graph Terms</button>
  <button onclick="showTopic(this,'l20-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l20-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== RELAXATION ===================== -->
  <section class="topic active" id="l20-relax">
    <h2>Lesson 20 · Relaxation</h2>
    <div class="concept">In a <b>weighted</b> graph, distance ≠ hop count, so BFS no longer works. The core operation for weighted shortest paths is <b>relaxing an edge</b> <code>(u, v)</code>: check whether going to v <i>through</i> u is cheaper than v's current best estimate. <code>d(v)</code> is only an <b>estimate</b> until finalized.</div>
    <div class="card">
      <h3>The relax rule (slides 4–6)</h3>
<pre>Relax(u, v):
    <span class="kw">if</span> d(u) + w(u,v) &lt; d(v):   <span class="cm">// cheaper path found?</span>
        d(v) = d(u) + w(u,v)   <span class="cm">// update the estimate</span>
        p(v) = u               <span class="cm">// remember how we got here</span></pre>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>d(u) = 5, d(v) = 9, w(u,v) = 2. After Relax(u,v), what is d(v)?</div>
        <button class="opt" data-i="0">7 — because 5 + 2 = 7 &lt; 9, so we update</button>
        <button class="opt" data-i="1">9 — no change</button>
        <button class="opt" data-i="2">2</button>
        <div class="fb"><b>7.</b> 5 + 2 = 7 is less than the old estimate 9, so we found a shorter path to v through u and update d(v) = 7. (Slide 5, example 1.)</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>d(u) = 5, d(v) = 9, w(u,v) = 6. After Relax(u,v), what is d(v)?</div>
        <button class="opt" data-i="0">11</button>
        <button class="opt" data-i="1">9 — no change, because 5 + 6 = 11 is not less than 9</button>
        <button class="opt" data-i="2">6</button>
        <div class="fb"><b>9, unchanged.</b> 5 + 6 = 11 is <i>not</i> less than 9, so the path through u isn't better and we leave d(v) alone. (Slide 5, example 2.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIJKSTRA ===================== -->
  <section class="topic" id="l20-dijkstra">
    <h2>Lesson 20 · Dijkstra's Algorithm</h2>
    <div class="concept">Dijkstra solves single-source shortest path on graphs with <b>non-negative</b> weights. It's a <b>greedy</b> algorithm: always finalize the closest unvisited vertex next, using a <b>min-heap priority queue</b> keyed on the distance estimate <code>d(v)</code>. A vertex is marked <b>visited only once its shortest path is settled</b>.</div>
    <div class="card">
      <h3>The algorithm (slide 8)</h3>
<pre>Dijkstra(G, s):
    <span class="kw">for each</span> v: d(v) = ∞;  d(s) = <span class="nm">0</span>
    add all vertices to a min-heap PQ keyed on d(v)
    <span class="kw">while</span> PQ not empty:
        u = dequeueMin()        <span class="cm">// closest unvisited vertex</span>
        mark u visited
        <span class="kw">for each</span> unvisited neighbor v of u:
            Relax(u, v)         <span class="cm">// update d(v), p(v) if shorter</span></pre>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Why does Dijkstra use a <b>min</b>-heap keyed on d(v)?</div>
        <button class="opt" data-i="0">To store the graph edges.</button>
        <button class="opt" data-i="1">To always pull out the closest unvisited vertex next — the greedy choice that turns out to be globally optimal.</button>
        <button class="opt" data-i="2">Because BFS uses one.</button>
        <div class="fb">Greedy: the unvisited vertex with the smallest estimate already has its final shortest distance (with non-negative weights), so we finalize it and relax its neighbors. The min-heap makes "find closest" efficient. (Slides 6–8.)</div>
      </div>
    </div>
    <div class="card">
      <h3>Time complexity (slide 19)</h3>
      <div class="concept">With the practical "enqueue a new entry instead of updating" version: the PQ grows up to O(m), so each enqueue/dequeue is O(log m) = O(log n²) = <b>O(log n)</b>. Overall: <b>O((n + m) log n)</b>. Sparse → O(n log n); dense → O(n² log n).</div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Dijkstra's overall time complexity (heap-based) is…</div>
        <button class="opt" data-i="0">O(n + m)</button>
        <button class="opt" data-i="1">O(nm)</button>
        <button class="opt" data-i="2">O((n + m) log n)</button>
        <div class="fb"><b>O((n + m) log n).</b> Each vertex/edge triggers heap operations costing O(log n). (Slide 19.) It's slower than BFS's O(n+m) — the price of handling weights.</div>
      </div>
    </div>
  </section>

  <!-- ===================== BELLMAN-FORD ===================== -->
  <section class="topic" id="l20-bellman">
    <h2>Lesson 20 · Bellman-Ford</h2>
    <div class="concept">Dijkstra <b>fails with negative-weight edges</b> — its greedy "finalize the closest vertex" assumption breaks, because a later negative edge could still lower a distance it already locked in. <b>Bellman-Ford</b> handles negative weights by relaxing <b>every edge</b>, <b>n − 1 times</b>.</div>
    <div class="card">
      <h3>The algorithm (slides 25–29)</h3>
<pre>BellmanFord(G, s):
    <span class="kw">for each</span> v: d(v) = ∞;  d(s) = <span class="nm">0</span>
    <span class="kw">for</span> i = <span class="nm">1</span> <span class="kw">to</span> n - <span class="nm">1</span>:        <span class="cm">// n-1 passes</span>
        <span class="kw">for each</span> edge (u,v): Relax(u,v)
    <span class="kw">for each</span> edge (u,v):          <span class="cm">// one more pass = cycle check</span>
        <span class="kw">if</span> d(u) + w(u,v) &lt; d(v): <span class="kw">return</span> FALSE  <span class="cm">// negative cycle!</span>
    <span class="kw">return</span> TRUE</pre>
      <div class="concept">Why n − 1 passes? A shortest path visits at most n vertices, so it has at most n − 1 edges; each pass locks in one more edge of every shortest path. The final extra pass detects a <b>negative cycle</b>: if anything still improves, no shortest path exists.</div>
    </div>
    <div class="card">
      <h3>What does Bellman-Ford return? (your quiz)</h3>
      <p class="muted">Directed graph, source P. Edges: P→Q(2), P→R(4), Q→S(2), R→S(4), R→T(3), T→S(−5).</p>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Bellman-Ford returns <b>TRUE</b> for this graph from source P.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>True.</b> The graph has a <b>negative edge</b> (−5) but no <b>negative cycle</b> (you can't loop back around to keep decreasing). Bellman-Ford returns FALSE <b>only</b> when a negative cycle exists; here it computes valid shortest paths and returns TRUE. Negative <i>edges</i> are fine — negative <i>cycles</i> are the problem.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>When does Bellman-Ford return FALSE?</div>
        <button class="opt" data-i="0">Whenever any edge weight is negative.</button>
        <button class="opt" data-i="1">Only when the graph contains a negative-weight cycle reachable from the source.</button>
        <button class="opt" data-i="2">When the graph is disconnected.</button>
        <div class="fb">FALSE means "no shortest path exists" — which happens only with a <b>negative cycle</b>, where you could loop forever driving distances toward −∞. A lone negative edge is fine. (Slide 26, step c.)</div>
      </div>
    </div>
    <div class="card">
      <h3>Time complexity (slide 30)</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Bellman-Ford's time complexity is…</div>
        <button class="opt" data-i="0">O((n+m) log n)</button>
        <button class="opt" data-i="1">O(nm)</button>
        <button class="opt" data-i="2">O(n + m)</button>
        <div class="fb"><b>O(nm).</b> It does n − 1 passes, each relaxing all m edges → O(n·m). Sparse: O(n²); dense: O(n³). Slower than Dijkstra, but it's the price of handling negative weights. (Slide 30.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== COMPARISON ===================== -->
  <section class="topic" id="l20-compare">
    <h2>Lesson 20 · Comparing the Three Algorithms</h2>
    <div class="card">
      <table class="cmp">
        <tr><th>Algorithm</th><th>Works on</th><th>Time</th></tr>
        <tr><td>BFS</td><td><b>Unweighted</b> graphs</td><td>O(n + m)</td></tr>
        <tr><td>Dijkstra's</td><td>Weighted, <b>non-negative</b> weights</td><td>O((n + m) log n)</td></tr>
        <tr><td>Bellman-Ford</td><td>Weighted, <b>allows negative</b> weights</td><td>O(nm)</td></tr>
      </table>
      <p class="muted">More general = slower. Use the cheapest one your graph allows. (Slide 31.)</p>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Which single-source shortest path algorithm has the <b>best</b> time complexity? <span class="muted">(your quiz)</span></div>
        <button class="opt" data-i="0">BFS</button>
        <button class="opt" data-i="1">Dijkstra's</button>
        <button class="opt" data-i="2">Bellman-Ford</button>
        <div class="fb"><b>BFS</b> — O(n + m), the fastest. It only handles unweighted graphs, but when it applies it beats Dijkstra's O((n+m)log n) and Bellman-Ford's O(nm). (Slide 31.)</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Your graph has weighted edges, some negative, no negative cycles. Which algorithm?</div>
        <button class="opt" data-i="0">BFS</button>
        <button class="opt" data-i="1">Bellman-Ford</button>
        <button class="opt" data-i="2">Dijkstra's</button>
        <div class="fb"><b>Bellman-Ford.</b> BFS ignores weights; Dijkstra breaks on negative edges. Only Bellman-Ford correctly handles negative weights (and detects negative cycles).</div>
      </div>
    </div>
    <div class="card">
      <h3>Heapsort warm-up (your quiz Q1)</h3>
      <p>Heap sort turns an unordered array into a max heap in
        <input type="text" class="fillblank sm" data-answer="o(n)~~~n" placeholder="?" style="width:70px"> time via BuildHeap, then sorts in
        <input type="text" class="fillblank sm" data-answer="o(nlogn)~~~o(n log n)~~~nlogn~~~n log n" placeholder="?" style="width:100px"> time by bubbling down n times. Total <b>space</b> complexity is
        <input type="text" class="fillblank sm" data-answer="o(1)~~~1~~~constant" placeholder="?" style="width:70px">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>O(n)</b> (BuildHeap is linear), <b>O(n log n)</b> (n removals × O(log n) sift-down), <b>O(1)</b> space (heapsort sorts in-place, no extra array).</div>
    </div>
  </section>

  <!-- ===================== GRAPH TERMS ===================== -->
  <section class="topic" id="l20-terms">
    <h2>Lesson 20 · Graph Terminology</h2>
    <div class="card">
      <h3>Fill in — the notation (your quiz)</h3>
      <p>Vertices are represented by the letter
        <input type="text" class="fillblank sm" data-answer="v" placeholder="?" style="width:50px">, while the <b>number</b> of vertices is the letter
        <input type="text" class="fillblank sm" data-answer="n" placeholder="?" style="width:50px">. Edges are represented by the letter
        <input type="text" class="fillblank sm" data-answer="e" placeholder="?" style="width:50px">, while the <b>number</b> of edges is the letter
        <input type="text" class="fillblank sm" data-answer="m" placeholder="?" style="width:50px">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: set of <b>V</b>ertices = V (count <b>n</b>); set of <b>E</b>dges = E (count <b>m</b>). So |V| = n and |E| = m — that's why complexities read O(n + m). Recall n−1 ≤ m ≤ n(n−1)/2.</div>
    </div>
    <div class="card">
      <h3>Categorize the graph properties (your quiz)</h3>
      <table class="match" id="match-gprop">
        <tr><td class="match-term">Directed vs undirected</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Weighted vs unweighted</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Connected vs disconnected</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Cyclic vs acyclic</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Dense vs sparse</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-gprop','fb-match-gprop',['e','e','s','s','s','d'])">Check</button>
      <div class="fb" id="fb-match-gprop"></div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l20-diagram">
    <h2>Lesson 20 · Diagram It — Dijkstra Step-Through</h2>
    <div class="concept">Step through Dijkstra from source <b>A</b> on this weighted directed graph. Each step <b>dequeues the closest unvisited vertex</b> (orange ring), marks it settled (green), and <b>relaxes</b> its outgoing edges — updated estimates flash amber. Watch d(v) shrink and the shortest-path tree (bold green edges) form.</div>
    <div class="card">
      <div class="toolbar">
        <button class="btn small" onclick="dkStep()">Next ▶</button>
        <button class="btn ghost small" onclick="dkStart()">⟲ Restart</button>
      </div>
      <div id="dk-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;overflow-x:auto"></div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-top:10px">
        <div><div class="muted" style="font-size:12px;margin-bottom:4px">PQ (unvisited by d):</div><div id="dk-pq" style="font-family:monospace;font-weight:700"></div></div>
        <div style="flex:1;min-width:200px"><div class="muted" style="font-size:12px;margin-bottom:4px">d(v) / predecessor p(v):</div><div id="dk-table" style="font-family:monospace;font-size:13px"></div></div>
      </div>
      <div class="step-desc" id="dk-note"></div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l20-code">
    <h2>Lesson 20 · Code Writing</h2>
    <div class="card">
      <h3>1. Relax an edge</h3>
      <p>Write <code>relax(u, v, w)</code> updating <code>Map&lt;V,Integer&gt; d</code> and <code>Map&lt;V,V&gt; p</code>.</p>
      <textarea placeholder="void relax(V u, V v, int w) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">void</span> <span class="fn">relax</span>(V u, V v, <span class="ty">int</span> w) {
    <span class="kw">if</span> (d.get(u) + w &lt; d.get(v)) {
        d.put(v, d.get(u) + w);   <span class="cm">// shorter path found</span>
        p.put(v, u);              <span class="cm">// record predecessor</span>
    }
}</pre>
        <div class="concept">This one three-line operation is the heart of <b>both</b> Dijkstra and Bellman-Ford — they differ only in <b>what order</b> and <b>how many times</b> they relax edges.</div>
      </div>
    </div>
    <div class="card">
      <h3>2. Bellman-Ford</h3>
      <p>Return <code>false</code> if a negative cycle exists, else <code>true</code>. Edges as <code>int[]{u,v,w}</code> in list <code>edges</code>; <code>n</code> vertices.</p>
      <textarea placeholder="boolean bellmanFord(V s) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">boolean</span> <span class="fn">bellmanFord</span>(V s) {
    <span class="kw">for</span> (V v : vertices) d.put(v, INF);
    d.put(s, <span class="nm">0</span>);
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nm">1</span>; i &lt; n; i++)       <span class="cm">// n-1 passes</span>
        <span class="kw">for</span> (Edge e : edges)
            <span class="fn">relax</span>(e.u, e.v, e.w);
    <span class="kw">for</span> (Edge e : edges)               <span class="cm">// cycle-detection pass</span>
        <span class="kw">if</span> (d.get(e.u) + e.w &lt; d.get(e.v))
            <span class="kw">return</span> <span class="kw">false</span>;             <span class="cm">// still improving = negative cycle</span>
    <span class="kw">return</span> <span class="kw">true</span>;
}</pre>
        <div class="concept">n − 1 passes over all m edges → O(nm). The extra pass at the end: if any edge <i>still</i> relaxes after n−1 passes, a negative cycle exists and no shortest path is defined.</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Interactive Dijkstra step-through visualizer
   Weighted DIRECTED graph, source A, non-negative weights.
   ============================================================ */
const DK_POS={A:[45,110],B:[150,40],C:[150,185],D:[260,110],E:[370,40],F:[370,185]};
const DK_ADJ={A:[['B',4],['C',2]],B:[['D',5]],C:[['B',1],['D',8],['E',10]],D:[['E',2],['F',6]],E:[['F',3]],F:[]};
const DK_NODES=['A','B','C','D','E','F'];
let dk={};
function dkStart(){
  dk={d:{},p:{},visited:{},cur:null,relaxed:[],done:false};
  DK_NODES.forEach(v=>dk.d[v]=Infinity);
  dk.d['A']=0;
  dkRender('Initialized: d(A) = 0, all others ∞. Press Next to dequeue the closest unvisited vertex and relax its edges.');
}
function dkStep(){
  if(dk.done){ dkRender('Dijkstra complete — every vertex has its final shortest distance. Press Restart to run again.'); return; }
  // pick unvisited vertex with min finite d
  let u=null,best=Infinity;
  DK_NODES.forEach(v=>{ if(!dk.visited[v] && dk.d[v]<best){ best=dk.d[v]; u=v; } });
  if(u===null){ dk.done=true; dk.cur=null; dk.relaxed=[]; dkRender('No reachable unvisited vertices remain — done.'); return; }
  dk.visited[u]=true; dk.cur=u; dk.relaxed=[];
  let changes=[];
  DK_ADJ[u].forEach(([v,w])=>{
    if(dk.visited[v]) return;
    if(dk.d[u]+w < dk.d[v]){ dk.d[v]=dk.d[u]+w; dk.p[v]=u; dk.relaxed.push(v); changes.push(v+'→'+dk.d[v]); }
  });
  let msg='Settled <b>'+u+'</b> (shortest distance = '+dk.d[u]+', now final). ';
  msg += changes.length ? 'Relaxed edges, updating: '+changes.join(', ')+'.' : 'No neighbor estimates improved.';
  if(DK_NODES.every(v=>dk.visited[v]||dk.d[v]===Infinity)){ dk.done=true; msg+=' All vertices settled — Dijkstra complete.'; }
  dkRender(msg);
}
function dkRender(note){
  const treeSet=new Set(); DK_NODES.forEach(v=>{ if(dk.p&&dk.p[v]) treeSet.add(dk.p[v]+'-'+v); });
  let e='',n='';
  const defs='<defs><marker id="dkar" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#7f93a8"/></marker><marker id="dkart" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#159957"/></marker></defs>';
  DK_NODES.forEach(u=>DK_ADJ[u].forEach(([v,w])=>{
    const A=DK_POS[u],B=DK_POS[v];
    const tree=treeSet.has(u+'-'+v);
    // shorten to node edge
    const dx=B[0]-A[0],dy=B[1]-A[1],len=Math.hypot(dx,dy),r=17;
    const x1=A[0]+dx/len*r,y1=A[1]+dy/len*r,x2=B[0]-dx/len*r,y2=B[1]-dy/len*r;
    e+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(tree?'#159957':'#3a4d63')+'" stroke-width="'+(tree?3.5:1.5)+'" marker-end="url(#'+(tree?'dkart':'dkar')+')"/>';
    const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;
    e+='<text x="'+mx+'" y="'+(my-4)+'" text-anchor="middle" fill="#c9a13b" font-size="11" font-weight="700">'+w+'</text>';
  }));
  DK_NODES.forEach(v=>{ const p=DK_POS[v];
    let fill='rgba(46,134,222,.14)',stroke='#2e86de',sw=2;
    if(dk.relaxed&&dk.relaxed.indexOf(v)!==-1){ fill='rgba(214,137,16,.32)'; stroke='#d68910'; }
    if(dk.visited&&dk.visited[v]){ fill='rgba(21,153,87,.3)'; stroke='#159957'; }
    if(v==='A'){ stroke='#159957'; }
    if(v===dk.cur){ stroke='#e07b00'; sw=4.5; }
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="17" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+4)+'" text-anchor="middle" fill="#e8eef5" font-size="13" font-weight="700">'+v+'</text>';
    const dv=dk.d[v]; if(dv!==undefined) n+='<text x="'+p[0]+'" y="'+(p[1]-22)+'" text-anchor="middle" fill="#7bd88f" font-size="11" font-weight="700">'+(dv===Infinity?'∞':dv)+'</text>';
  });
  document.getElementById('dk-canvas').innerHTML='<svg viewBox="0 0 420 220" style="width:100%;max-width:460px">'+defs+e+n+'</svg>';
  const unv=DK_NODES.filter(v=>!dk.visited[v]&&dk.d[v]!==Infinity).sort((a,b)=>dk.d[a]-dk.d[b]);
  document.getElementById('dk-pq').innerHTML = unv.length ? unv.map(v=>'<span style="display:inline-block;background:rgba(46,134,222,.2);border:1px solid #2e86de;border-radius:6px;padding:2px 9px;margin:2px">'+v+'('+dk.d[v]+')</span>').join('') : '<span class="muted">(empty)</span>';
  document.getElementById('dk-table').innerHTML = DK_NODES.map(v=>{
    const dv=dk.d[v]===Infinity?'∞':dk.d[v]; const pv=dk.p[v]||'—';
    return v+': d='+dv+', p='+pv;
  }).join(' &nbsp;·&nbsp; ');
  document.getElementById('dk-note').innerHTML=note||'';
}
dkStart();
