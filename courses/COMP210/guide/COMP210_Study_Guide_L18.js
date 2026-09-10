/* ============================================================
   LESSON 18 — Graphs (properties & representations).
   Injects into #l18. Loaded before the main engine.
   Includes an interactive graph <-> adjacency matrix/list tool.
   ============================================================ */
document.getElementById('l18').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l18-sort')">Sorting Recap</button>
  <button onclick="showTopic(this,'l18-basics')">Graph Basics</button>
  <button onclick="showTopic(this,'l18-props')">Properties</button>
  <button onclick="showTopic(this,'l18-matrix')">Adjacency Matrix</button>
  <button onclick="showTopic(this,'l18-list')">Adjacency List</button>
  <button onclick="showTopic(this,'l18-compare')">Matrix vs List</button>
  <button onclick="showTopic(this,'l18-diagram')">Diagram It</button>
</nav>
<main>

  <!-- ===================== SORTING RECAP ===================== -->
  <section class="topic active" id="l18-sort">
    <h2>Lesson 18 · Sorting Recap (Heap Sort & Quick Sort)</h2>
    <div class="concept">L18 opens by finishing sorting. <b>Heap sort</b> = BuildHeap (make a max-heap, O(n)) then repeatedly swap the root to the end and bubble down (O(n log n)) — all <b>in place</b>, O(1) space. <b>Quick sort</b> is O(n log n) average but O(n²) worst (presorted input, bad pivots).</div>
    <div class="card">
      <h3>Fill in — heap sort complexity (your quiz)</h3>
      <p>Heap sort turns an unordered array into a max heap in
        <input type="text" class="fillblank sm" data-answer="o(n)~~~n" placeholder="?" style="width:70px"> time via BuildHeap, then sorts in
        <input type="text" class="fillblank sm" data-answer="o(nlogn)~~~o(n log n)~~~nlogn~~~n log n" placeholder="?" style="width:100px"> time by bubbling down n times. Total <b>space</b> complexity is
        <input type="text" class="fillblank sm" data-answer="o(1)~~~1~~~constant" placeholder="?" style="width:70px">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>O(n)</b> (BuildHeap is linear — slide 13), <b>O(n log n)</b> (n sift-downs × O(log n) — slide 17), <b>O(1)</b> space (sorts in place, no extra array). Total time O(n)+O(n log n) = O(n log n).</div>
    </div>
    <div class="card">
      <h3>Sort comparison</h3>
      <table class="cmp">
        <tr><th>Sort</th><th>Time (avg)</th><th>Time (worst)</th><th>Space</th></tr>
        <tr><td>Quick sort</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n) stack</td></tr>
        <tr><td>Heap sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1) in place</td></tr>
      </table>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What triggers quick sort's O(n²) worst case?</div>
        <button class="opt" data-i="0">A random pivot.</button>
        <button class="opt" data-i="1">A presorted (or nearly presorted) array, so each partition is maximally unbalanced.</button>
        <button class="opt" data-i="2">An array of all equal elements only.</button>
        <div class="fb">Presorted input with a naive pivot makes every partition split into sizes 0 and n−1 → n levels of O(n) work → O(n²). (Slides 6–7.) Heap sort avoids this — it's O(n log n) even in the worst case.</div>
      </div>
    </div>
  </section>

  <!-- ===================== GRAPH BASICS ===================== -->
  <section class="topic" id="l18-basics">
    <h2>Lesson 18 · Graph Basics</h2>
    <div class="concept">A <b>graph</b> G = (V, E) is a set of <b>vertices</b> connected by <b>edges</b>. You already know one: a <b>tree</b> is a graph (nodes = vertices, pointers = edges). Graphs model anything defined by relationships — road maps, social networks, web links, dependencies.</div>
    <div class="card">
      <h3>Fill in — the notation (your quiz)</h3>
      <p>Vertices are represented by the letter
        <input type="text" class="fillblank sm" data-answer="v" placeholder="?" style="width:50px">, while the <b>number</b> of vertices is the letter
        <input type="text" class="fillblank sm" data-answer="n" placeholder="?" style="width:50px">. Edges are represented by the letter
        <input type="text" class="fillblank sm" data-answer="e" placeholder="?" style="width:50px">, while the <b>number</b> of edges is the letter
        <input type="text" class="fillblank sm" data-answer="m" placeholder="?" style="width:50px">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>V</b>ertices = V (count <b>n</b> = |V|); <b>E</b>dges = E (count <b>m</b> = |E|). Slide 22. That's why graph complexities read O(n + m). Note n−1 ≤ m ≤ n(n−1)/2.</div>
    </div>
    <div class="card">
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>A Binary Search Tree is a graph — specifically a directed, acyclic, connected graph (a DAG / tree).</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True (slides 21, 33). A BST's nodes are vertices and parent→child pointers are directed edges. It's connected and acyclic → a tree, which is a special DAG.</div>
      </div>
    </div>
  </section>

  <!-- ===================== PROPERTIES ===================== -->
  <section class="topic" id="l18-props">
    <h2>Lesson 18 · Graph Properties</h2>
    <div class="concept">Graphs are classified along three axes (slide 22): properties of the <b>edges</b>, the overall <b>structure</b>, and the <b>density</b>.</div>
    <div class="card">
      <h3>Categorize the graph properties (your quiz)</h3>
      <table class="match" id="match-gp18">
        <tr><td class="match-term">Directed vs undirected</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Weighted vs unweighted</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Connected vs disconnected</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Cyclic vs acyclic</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Tree</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
        <tr><td class="match-term">Dense vs sparse</td><td><select class="match-def"><option value="">— choose —</option><option value="e">Edge-Related</option><option value="s">Structural</option><option value="d">Density-Related</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-gp18','fb-match-gp18',['e','e','s','s','s','d'])">Check</button>
      <div class="fb" id="fb-match-gp18"></div>
    </div>
    <div class="card">
      <h3>Key definitions</h3>
      <div class="concept"><b>Directed</b> (edges are ordered pairs, (u,v) ≠ (v,u)) vs <b>undirected</b> ({u,v} = {v,u}). <b>Weighted</b> (edges carry a cost) vs unweighted (all weights = 1). <b>Cyclic</b> (has a cycle) vs <b>acyclic</b>. <b>Connected</b> (a path exists between every pair) vs disconnected. A <b>tree</b> = connected + acyclic. <b>Dense</b> (m near n²) vs <b>sparse</b> (m near n).</div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>A tree is best defined as a graph that is…</div>
        <button class="opt" data-i="0">Directed and weighted</button>
        <button class="opt" data-i="1">Dense and cyclic</button>
        <button class="opt" data-i="2">Connected and acyclic</button>
        <div class="fb"><b>Connected and acyclic</b> (usually undirected) — slide 30. Exactly n−1 edges connect n vertices with no cycles.</div>
      </div>
    </div>
  </section>

  <!-- ===================== ADJACENCY MATRIX ===================== -->
  <section class="topic" id="l18-matrix">
    <h2>Lesson 18 · Adjacency Matrix</h2>
    <div class="concept">An <b>adjacency matrix</b> is an <b>n × n</b> 2D array. Entry <code>[i][j]</code> stores the edge from vertex i to vertex j (1/weight if present, 0/∞ if not). For an <b>undirected</b> graph the matrix is <b>symmetric</b> (edge {i,j} sits in both [i][j] and [j][i]).</div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>How much <b>space</b> does an adjacency matrix use?</div>
        <button class="opt" data-i="0">O(n + m)</button>
        <button class="opt" data-i="1">O(n²) — always, regardless of edge count</button>
        <button class="opt" data-i="2">O(m)</button>
        <div class="fb"><b>O(n²)</b>. It reserves a cell for every possible pair of vertices, even ones with no edge. That's wasteful for sparse graphs but great for dense ones. (Slide 49.)</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>Checking "is there an edge from i to j?" in an adjacency matrix is…</div>
        <button class="opt" data-i="0">O(1) — just read [i][j]</button>
        <button class="opt" data-i="1">O(n)</button>
        <button class="opt" data-i="2">O(m)</button>
        <div class="fb"><b>O(1)</b> — direct array access. But finding <i>all</i> neighbors of i means scanning the whole row → O(n). (Slide 49.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== ADJACENCY LIST ===================== -->
  <section class="topic" id="l18-list">
    <h2>Lesson 18 · Adjacency List</h2>
    <div class="concept">An <b>adjacency list</b> stores, for each vertex, a list of just its actual edges. Slides 44–50 implement it as a <b>hash table</b> (key = vertex) mapping to a <b>linked list</b> of edge objects (source, destination, weight). Only real edges are stored, so space is <b>O(n + m)</b>.</div>
    <div class="card">
      <h3>Fill in — the best data structures (your quiz)</h3>
      <p>The most efficient data structure(s) for an adjacency list are
        <input type="text" class="fillblank sm" data-answer="a hash table~~~hash table~~~hashtable~~~hashmap~~~hash map~~~hash-table" placeholder="?" style="width:130px"> to store the vertices and
        <input type="text" class="fillblank sm" data-answer="linked lists~~~linked list~~~linkedlist~~~linkedlists~~~linked-list" placeholder="?" style="width:130px"> to store the edges.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: a <b>hash table</b> (vertices as keys → O(1) vertex lookup) and <b>linked lists</b> (each vertex's edges). Slides 44, 50: "HashMap with Vertex as key and LinkedList as value." Each list node is an Edge object with source/destination/weight.</div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Adjacency-list space is O(n + m). Why is that better than O(n²) for a <b>sparse</b> graph?</div>
        <button class="opt" data-i="0">Sparse graphs have more edges.</button>
        <button class="opt" data-i="1">A sparse graph has m ≈ n edges, so O(n + m) ≈ O(n) ≪ O(n²) — you don't waste cells on absent edges.</button>
        <button class="opt" data-i="2">Lists are always faster than arrays.</button>
        <div class="fb">A list only stores edges that exist. With m ≈ n, that's O(n) space vs the matrix's O(n²). Facebook example (slide 53): ~10⁹ users × 100 friends → lists use O(10¹¹), a matrix would need O(10¹⁸).</div>
      </div>
    </div>
  </section>

  <!-- ===================== MATRIX VS LIST ===================== -->
  <section class="topic" id="l18-compare">
    <h2>Lesson 18 · Matrix vs List &amp; Sparsity</h2>
    <div class="card">
      <table class="cmp">
        <tr><th></th><th>Adjacency Matrix</th><th>Adjacency List</th></tr>
        <tr><td>Space</td><td>O(n²)</td><td>O(n + m)</td></tr>
        <tr><td>Edge exists? (i,j)</td><td>O(1)</td><td>O(m/n) avg</td></tr>
        <tr><td>All neighbors of i</td><td>O(n)</td><td>O(m/n) avg</td></tr>
        <tr><td>Best for</td><td><b>Dense</b> graphs</td><td><b>Sparse</b> graphs</td></tr>
      </table>
      <div class="q" data-tf="F">
        <div class="prompt"><span class="tag">T / F</span>Adjacency matrices are better for sparse graphs while adjacency lists are better for dense graphs. <span class="muted">(your quiz)</span></div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>False — it's reversed.</b> <b>Matrices</b> suit <b>dense</b> graphs (the O(n²) space is filled anyway, and you get O(1) edge lookups). <b>Lists</b> suit <b>sparse</b> graphs (O(n+m) space avoids wasting cells on absent edges). (Slides 49, 53.)</div>
      </div>
    </div>
    <div class="card">
      <h3>Sparsity</h3>
      <div class="concept"><b>Density = m / (max possible edges)</b> ≈ m/n². <b>Dense:</b> m ≈ n(n−1)/2 = O(n²). <b>Sparse:</b> m ≈ n−1 = O(n) (like a tree), so the ratio m/n² ≪ 1. (Slide 34.)</div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>A graph with n = 10⁹ vertices and m = 10¹¹ edges (Facebook) is…</div>
        <button class="opt" data-i="0">Dense — use a matrix</button>
        <button class="opt" data-i="1">Sparse — m/n² = 10¹¹/10¹⁸ = 10⁻⁷ ≪ 1, so use an adjacency list</button>
        <button class="opt" data-i="2">Neither</button>
        <div class="fb"><b>Sparse.</b> The density ratio is ~10⁻⁷, far below 1. A matrix would need O(10¹⁸) space; the list needs O(10¹¹). (Slide 53.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l18-diagram">
    <h2>Lesson 18 · Diagram It — Graph ↔ Matrix ↔ List</h2>
    <div class="concept">Click a cell in the <b>adjacency matrix</b> to toggle a directed edge <code>i → j</code>. The <b>graph</b> and the <b>adjacency list</b> update live so you can see all three representations of the same graph at once. Watch how the matrix stays n×n while the list only grows with real edges.</div>
    <div class="card">
      <div class="toolbar">
        <button class="btn ghost small" onclick="amPreset()">Load example</button>
        <button class="btn ghost small" onclick="amClear()">Clear</button>
        <label style="font-size:13px;display:flex;align-items:center;gap:6px"><input type="checkbox" id="am-undirected" onchange="amRender()"> undirected (symmetric)</label>
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start">
        <div>
          <div class="muted" style="font-size:12px;margin-bottom:4px">Adjacency matrix (click cells):</div>
          <div id="am-matrix"></div>
        </div>
        <div>
          <div class="muted" style="font-size:12px;margin-bottom:4px">Graph:</div>
          <div id="am-graph" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:8px"></div>
        </div>
      </div>
      <div class="muted" style="font-size:12px;margin:10px 0 4px">Adjacency list (hash table → linked lists):</div>
      <div id="am-list" style="background:#0b1119;border:1px solid var(--line);border-radius:8px;padding:10px;font-family:monospace;font-size:13px"></div>
      <div class="step-desc" id="am-note">n = 5 vertices. Edge count m updates as you toggle. Space: matrix always O(n²) = 25 cells; list = O(n + m).</div>
    </div>
  </section>
</main>`;

/* ============================================================
   Interactive graph <-> adjacency matrix/list explorer
   ============================================================ */
const AM_N=5;
const AM_POS=[[130,30],[235,105],[195,215],[65,215],[25,105]]; // pentagon for 5 nodes
let AM=[];
function amInit(){ AM=[]; for(let i=0;i<AM_N;i++){ AM.push([]); for(let j=0;j<AM_N;j++) AM[i].push(0); } }
function amToggle(i,j){
  if(i===j) return;
  AM[i][j]=AM[i][j]?0:1;
  if(document.getElementById('am-undirected').checked) AM[j][i]=AM[i][j];
  amRender();
}
function amPreset(){ amInit(); [[0,1],[0,3],[1,2],[2,3],[3,4],[4,0]].forEach(([i,j])=>AM[i][j]=1); document.getElementById('am-undirected').checked=false; amRender(); }
function amClear(){ amInit(); amRender(); }
function amRender(){
  const undirected=document.getElementById('am-undirected').checked;
  if(undirected){ for(let i=0;i<AM_N;i++)for(let j=0;j<AM_N;j++) if(AM[i][j]) AM[j][i]=1; }
  // matrix table
  let mh='<table style="border-collapse:collapse;font-family:monospace;font-size:13px"><tr><td style="padding:4px 7px;color:var(--muted)"></td>';
  for(let j=0;j<AM_N;j++) mh+='<td style="padding:4px 7px;color:#c9a13b;text-align:center;font-weight:700">'+j+'</td>';
  mh+='</tr>';
  for(let i=0;i<AM_N;i++){
    mh+='<tr><td style="padding:4px 7px;color:#c9a13b;font-weight:700">'+i+'</td>';
    for(let j=0;j<AM_N;j++){
      const on=AM[i][j], diag=i===j;
      mh+='<td onclick="amToggle('+i+','+j+')" style="width:26px;height:26px;text-align:center;border:1px solid var(--line);cursor:'+(diag?'default':'pointer')+';font-weight:700;background:'+(diag?'#161e29':(on?'rgba(21,153,87,.3)':'transparent'))+';color:'+(on?'#7bd88f':'#54637a')+'">'+(diag?'·':on)+'</td>';
    }
    mh+='</tr>';
  }
  mh+='</table>';
  document.getElementById('am-matrix').innerHTML=mh;
  // graph
  let e='',n='';
  const defs='<defs><marker id="amar" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#7f93a8"/></marker></defs>';
  let m=0;
  for(let i=0;i<AM_N;i++)for(let j=0;j<AM_N;j++){ if(!AM[i][j]) continue; m++;
    if(undirected && j<i) continue; // draw each undirected edge once
    const A=AM_POS[i],B=AM_POS[j],dx=B[0]-A[0],dy=B[1]-A[1],len=Math.hypot(dx,dy),r=15;
    const x1=A[0]+dx/len*r,y1=A[1]+dy/len*r,x2=B[0]-dx/len*r,y2=B[1]-dy/len*r;
    e+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#5f7a9a" stroke-width="1.8"'+(undirected?'':' marker-end="url(#amar)"')+'/>';
  }
  for(let i=0;i<AM_N;i++){ const p=AM_POS[i];
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" fill="rgba(46,134,222,.2)" stroke="#2e86de" stroke-width="2"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+4)+'" text-anchor="middle" fill="#e8eef5" font-size="12" font-weight="700">'+i+'</text>';
  }
  document.getElementById('am-graph').innerHTML='<svg viewBox="0 0 260 245" style="width:230px;height:auto">'+defs+e+n+'</svg>';
  // adjacency list
  let lh='';
  const realM = undirected ? m/2 : m;
  for(let i=0;i<AM_N;i++){
    const nbrs=[]; for(let j=0;j<AM_N;j++) if(AM[i][j]) nbrs.push(j);
    lh+='<div style="margin:2px 0"><span style="color:#c9a13b;font-weight:700">'+i+'</span> → '+(nbrs.length?nbrs.map(x=>'<span style="background:rgba(46,134,222,.2);border:1px solid #2e86de;border-radius:5px;padding:1px 7px;margin:0 2px">'+x+'</span>').join('')+'':'<span style="color:var(--muted)">(none)</span>')+'</div>';
  }
  document.getElementById('am-list').innerHTML=lh;
  document.getElementById('am-note').innerHTML='n = 5 vertices, m = '+realM+' edge'+(realM===1?'':'s')+'. Matrix space = O(n²) = 25 cells (fixed). List space = O(n + m) = '+(AM_N+realM)+' entries — only grows with real edges.';
}
amInit(); amPreset();
