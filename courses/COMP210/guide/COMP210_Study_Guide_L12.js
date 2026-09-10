/* ============================================================
   LESSON 12 — Heaps, Priority Queues, Binary Min Trees & Binary Heaps.
   Injects into #l12. Loaded before the main engine.
   Includes an interactive binary min-heap visualizer (array + tree)
   with insert (sift-up), removeMin (sift-down), and buildHeap.
   ============================================================ */
document.getElementById('l12').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l12-pq')">Priority Queue</button>
  <button onclick="showTopic(this,'l12-bmt')">Binary Min Tree</button>
  <button onclick="showTopic(this,'l12-heap')">Binary Heap (array)</button>
  <button onclick="showTopic(this,'l12-ops')">Operations &amp; BuildHeap</button>
  <button onclick="showTopic(this,'l12-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l12-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== PRIORITY QUEUE ===================== -->
  <section class="topic active" id="l12-pq">
    <h2>Lesson 12 · Priority Queue (the ADT)</h2>
    <div class="concept">A <b>Priority Queue</b> is a queue where elements come out by <b>priority</b>, not insertion order. A <b>min</b>-priority queue always dequeues the <b>smallest</b> priority first. Operations (from <code>PriorityQueue.java</code>): <code>enqueue(value, priority)</code>, <code>dequeue()</code> (removes &amp; returns the min-priority value), <code>getMin()</code>, and <code>size()</code>.</div>
    <div class="card">
      <h3>The interface</h3>
<pre><span class="kw">public interface</span> <span class="ty">PriorityQueue</span>&lt;V, P <span class="kw">extends</span> Comparable&lt;P&gt;&gt; {
    <span class="kw">void</span> <span class="fn">enqueue</span>(V value, P priority);
    V <span class="fn">dequeue</span>();   <span class="cm">// removes and returns the MIN-priority value</span>
    V <span class="fn">getMin</span>();    <span class="cm">// peek the min without removing</span>
    <span class="ty">int</span> <span class="fn">size</span>();
}</pre>
      <p class="muted">Note the two generics: <code>V</code> = the value's type, <code>P</code> = the priority's type (must be <code>Comparable</code> so priorities can be ordered).</p>
    </div>
    <div class="card">
      <h3>Select all — the two main ways to implement a Priority Queue (your quiz)</h3>
      <div id="ma-pq">
        <label class="ma-item"><input type="checkbox"> ArrayList</label>
        <label class="ma-item"><input type="checkbox"> LinkedList</label>
        <label class="ma-item"><input type="checkbox"> Stack</label>
        <label class="ma-item"><input type="checkbox"> Queue</label>
        <label class="ma-item"><input type="checkbox"> Binary Search Tree</label>
        <label class="ma-item"><input type="checkbox"> Binary Min Tree</label>
        <label class="ma-item"><input type="checkbox"> Binary Heap</label>
      </div>
      <button class="btn small" style="margin-top:8px" onclick="maPQ()">Check</button>
      <div class="fb" id="fb-ma-pq"></div>
    </div>
    <div class="card">
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>A min-priority queue holds tasks with priorities 3, -4, 100, 32. What does the first <code>dequeue()</code> return?</div>
        <button class="opt" data-i="0">The value with priority 3 (first enqueued)</button>
        <button class="opt" data-i="1">The value with priority -4 (the smallest)</button>
        <button class="opt" data-i="2">The value with priority 100 (the largest)</button>
        <div class="fb"><b>-4</b> — a min-priority queue always removes the <b>smallest</b> priority first, regardless of insertion order. (That's the <code>Main.java</code> example: Banana, priority -4, comes out first.)</div>
      </div>
    </div>
  </section>

  <!-- ===================== BINARY MIN TREE ===================== -->
  <section class="topic" id="l12-bmt">
    <h2>Lesson 12 · Binary Min Tree (BMT)</h2>
    <div class="concept">A <b>Binary Min Tree</b> is one implementation of a priority queue: a <b>balanced</b> binary tree where every node's value is <b>smaller</b> than all values in <b>both</b> its subtrees. So the <b>minimum is always at the root</b> — <code>getMin()</code> is O(1). It stays balanced by always inserting into the <b>shorter</b> subtree.</div>
    <div class="card">
      <h3>Fill in — the BMT invariant (your quiz)</h3>
      <p>A BMT's value is
        <input type="text" class="fillblank sm" data-answer="smaller~~~smallest~~~less" placeholder="?"> than all values in both the left and right subtrees.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <b>smaller</b>. Each node is the minimum of its whole subtree → the root is the global minimum. (This is the <b>min-heap property</b>: parent ≤ every descendant.)</div>
    </div>
    <div class="card">
      <h3>True or False — balance (your quiz)</h3>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>BMTs are balanced binary trees.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. The <code>enqueue</code> logic inserts into whichever subtree is shorter (<code>if (_left.getHeight() &lt;= _right.getHeight())</code>), keeping the tree balanced — which keeps its height O(log n) and its operations fast.</div>
      </div>
      <div class="q" data-mc="0">
        <div class="prompt"><span class="tag">Multiple choice</span>How does a BMT keep the minimum at the root during <code>enqueue</code>?</div>
        <button class="opt" data-i="0">If the new value is smaller than the root, it swaps them, then pushes the larger old root down into a subtree.</button>
        <button class="opt" data-i="1">It sorts the whole tree after each insert.</button>
        <button class="opt" data-i="2">It puts the new value at a leaf and never moves it.</button>
        <div class="fb">From <code>BinaryMinTree.enqueue</code>: if the new priority is smaller than the root's, swap so the smaller stays on top, then recurse the larger one down into the shorter subtree. That "bubble the small one up / push the big one down" is the heart of a heap.</div>
      </div>
    </div>
  </section>

  <!-- ===================== BINARY HEAP ===================== -->
  <section class="topic" id="l12-heap">
    <h2>Lesson 12 · Binary Heap (array-based)</h2>
    <div class="concept">A <b>Binary Heap</b> is the other implementation: a <b>complete</b> binary tree (every level full, last level filled left-to-right) stored compactly in an <b>array</b> — no node objects or pointers. A <b>min-heap</b> keeps parent ≤ children, so the min sits at index 0. The tree shape is implied by <b>array index arithmetic</b>.</div>
    <div class="card">
      <h3>Fill in — child indices (your quiz)</h3>
      <p class="muted">For a 0-indexed array heap:</p>
      <p>In a binary heap, the index of the <b>left</b> child is the parent index &times;
        <input type="text" class="fillblank sm" data-answer="2" placeholder="?"> +
        <input type="text" class="fillblank sm" data-answer="1" placeholder="?">. The index of the <b>right</b> child is the parent index &times;
        <input type="text" class="fillblank sm" data-answer="2" placeholder="?"> +
        <input type="text" class="fillblank sm" data-answer="2" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>left = 2·i + 1</b>, <b>right = 2·i + 2</b>. And going the other way, a child at index <code>j</code> has parent at <code>(j − 1) / 2</code> (integer division). These formulas <i>are</i> the tree structure — no pointers needed.</div>
    </div>
    <div class="card">
      <h3>Index practice</h3>
      <p class="muted">Heap array: <code>[ 3, 8, 5, 12, 10, 7, 6 ]</code> &nbsp;(indices 0–6)</p>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>The node at index <b>1</b> (value 8) has which children?</div>
        <button class="opt" data-i="0">indices 2 and 3 (values 5, 12)</button>
        <button class="opt" data-i="1">index 0 (value 3)</button>
        <button class="opt" data-i="2">indices 3 and 4 (values 12, 10)</button>
        <div class="fb">left = 2·1 + 1 = <b>3</b> (value 12), right = 2·1 + 2 = <b>4</b> (value 10). Its parent is (1−1)/2 = 0 (value 3), and indeed 3 ≤ 8 ≤ its children — the min-heap property holds.</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>Storing a heap in an array is possible <b>because</b> it's a <b>complete</b> tree (no gaps), so every index 0..n-1 maps to a real node.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. Completeness is what lets the array be packed with no holes and the index formulas work. A non-complete tree would leave gaps in the array.</div>
      </div>
    </div>
  </section>

  <!-- ===================== OPERATIONS ===================== -->
  <section class="topic" id="l12-ops">
    <h2>Lesson 12 · Operations &amp; BuildHeap</h2>
    <div class="concept"><b>getMin / peek</b> → O(1) (it's the root). <b>insert</b> → add at the end, then <b>sift up</b> (swap with parent while smaller) → O(log n). <b>removeMin</b> → move the last element to the root, then <b>sift down</b> (swap with the smaller child while larger) → O(log n). Each op touches at most the tree height, which is O(log n).</div>
    <div class="card">
      <h3>Match each operation to its cost</h3>
      <table class="match" id="match-heapops">
        <tr><td class="match-term"><code>getMin()</code> / peek</td><td><select class="match-def"><option value="">— choose —</option><option value="o1">O(1) — it's just the root</option><option value="olog">O(log n) — sift up/down the height</option><option value="on">O(n) — one pass over all elements</option></select></td></tr>
        <tr><td class="match-term"><code>insert</code> (sift up)</td><td><select class="match-def"><option value="">— choose —</option><option value="o1">O(1) — it's just the root</option><option value="olog">O(log n) — sift up/down the height</option><option value="on">O(n) — one pass over all elements</option></select></td></tr>
        <tr><td class="match-term"><code>removeMin</code> (sift down)</td><td><select class="match-def"><option value="">— choose —</option><option value="o1">O(1) — it's just the root</option><option value="olog">O(log n) — sift up/down the height</option><option value="on">O(n) — one pass over all elements</option></select></td></tr>
        <tr><td class="match-term"><code>buildHeap</code> (heapify an array)</td><td><select class="match-def"><option value="">— choose —</option><option value="o1">O(1) — it's just the root</option><option value="olog">O(log n) — sift up/down the height</option><option value="on">O(n) — one pass over all elements</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-heapops','fb-match-heapops',['o1','olog','olog','on'])">Check</button>
      <div class="fb" id="fb-match-heapops"></div>
    </div>
    <div class="card">
      <h3>BuildHeap complexity (your quiz)</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>What is the time complexity of the build-heap algorithm (heapify a whole array)?</div>
        <button class="opt" data-i="0">O(1)</button>
        <button class="opt" data-i="1">O(n)</button>
        <button class="opt" data-i="2">O(log n)</button>
        <button class="opt" data-i="3">O(n log n)</button>
        <button class="opt" data-i="4">O(n²)</button>
        <div class="fb"><b>O(n)</b>. This surprises people! You'd guess O(n log n) (n sift-downs of O(log n) each), but most nodes are near the bottom with tiny sift-downs — the sum works out to O(n). Building by <b>n separate inserts</b> <i>would</i> be O(n log n); the bottom-up <b>buildHeap</b> is O(n).</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l12-diagram">
    <h2>Lesson 12 · Diagram It — Binary Min-Heap</h2>
    <div class="concept">Insert values and watch them <b>sift up</b>; <code>removeMin</code> moves the last element to the root and <b>sifts down</b>. The <b>array</b> and the <b>tree</b> are two views of the same heap — index <code>i</code>'s children are <code>2i+1</code> and <code>2i+2</code>. The root (index 0) is always the minimum.</div>
    <div class="card">
      <div class="toolbar">
        <input type="text" id="hp-val" placeholder="value" style="width:80px">
        <button class="btn small" onclick="hpInsert()">insert (sift up)</button>
        <button class="btn ghost small" onclick="hpRemoveMin()">removeMin (sift down)</button>
        <button class="btn ghost small" onclick="hpBuild()">buildHeap (random)</button>
        <button class="btn ghost small" onclick="hpClear()">clear</button>
      </div>
      <div class="muted" style="font-size:12px;margin-bottom:6px">Array view (index above each cell):</div>
      <div id="hp-array" style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px"></div>
      <div id="hp-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;min-height:120px;overflow-x:auto"></div>
      <div class="step-desc" id="hp-note"></div>
    </div>
    <div class="card">
      <h3>buildHeap — step-by-step (bottom-up, O(n))</h3>
      <p class="muted">Heapify <code>[100, 17, 36, 25, 19, 7, 3, 2, 1]</code> in place. Start at the last parent and sift-down each node up to the root. Watch the min (1) bubble all the way to index 0.</p>
      <div class="muted" style="font-size:12px;margin-bottom:6px">Array (index above each cell); the two swapped cells are highlighted:</div>
      <div id="bh-array" style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px"></div>
      <div id="bh-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;min-height:180px;overflow-x:auto"></div>
      <div class="step-desc" id="bh-note"></div>
      <div class="toolbar" style="justify-content:space-between">
        <div><button class="btn ghost small" onclick="bhStep(-1)">◀ Prev</button>
        <button class="btn small" onclick="bhStep(1)">Next ▶</button>
        <button class="btn ghost small" onclick="bhStep(-99)">⟲ Restart</button></div>
        <span class="score-badge" id="bh-step"></span>
      </div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l12-code">
    <h2>Lesson 12 · Code Writing — Array Heap</h2>
    <div class="concept">An array min-heap needs three tiny index helpers, then <code>insert</code> (sift up) and <code>removeMin</code> (sift down). Assume the heap lives in <code>int[] _data</code> with <code>_size</code> elements.</div>

    <div class="card">
      <h3>1. Index helpers</h3>
      <p>Write <code>leftChild(int i)</code>, <code>rightChild(int i)</code>, and <code>parent(int i)</code>.</p>
      <textarea placeholder="int leftChild(int i) { ... } ..."></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">private int</span> <span class="fn">leftChild</span>(<span class="ty">int</span> i)  { <span class="kw">return</span> <span class="nm">2</span>*i + <span class="nm">1</span>; }
<span class="kw">private int</span> <span class="fn">rightChild</span>(<span class="ty">int</span> i) { <span class="kw">return</span> <span class="nm">2</span>*i + <span class="nm">2</span>; }
<span class="kw">private int</span> <span class="fn">parent</span>(<span class="ty">int</span> i)     { <span class="kw">return</span> (i - <span class="nm">1</span>) / <span class="nm">2</span>; }</pre>
        <div class="concept">These three formulas <i>are</i> the tree structure — no node objects, no pointers. From index i you can reach its children and parent in O(1).</div>
      </div>
    </div>

    <div class="card">
      <h3>2. insert (sift up)</h3>
      <p>Write <code>insert(int value)</code>: put it at the end, then swap it up while it's smaller than its parent.</p>
      <textarea placeholder="public void insert(int value) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public void</span> <span class="fn">insert</span>(<span class="ty">int</span> value) {
    _data[_size] = value;          <span class="cm">// add at the end</span>
    <span class="ty">int</span> i = _size;
    _size++;
    <span class="kw">while</span> (i &gt; <span class="nm">0</span> &amp;&amp; _data[i] &lt; _data[<span class="fn">parent</span>(i)]) {  <span class="cm">// sift up</span>
        <span class="fn">swap</span>(i, <span class="fn">parent</span>(i));
        i = <span class="fn">parent</span>(i);
    }
}</pre>
        <div class="concept">Add at the first free slot, then bubble it toward the root as long as it's smaller than its parent. It rises at most the tree's height → O(log n).</div>
      </div>
    </div>

    <div class="card">
      <h3>3. removeMin (sift down)</h3>
      <p>Write <code>removeMin()</code>: save the root, move the last element to the root, then swap it down with its <b>smaller</b> child while it's larger.</p>
      <textarea placeholder="public int removeMin() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public int</span> <span class="fn">removeMin</span>() {
    <span class="ty">int</span> min = _data[<span class="nm">0</span>];
    _size--;
    _data[<span class="nm">0</span>] = _data[_size];        <span class="cm">// last element to the root</span>
    <span class="ty">int</span> i = <span class="nm">0</span>;
    <span class="kw">while</span> (<span class="fn">leftChild</span>(i) &lt; _size) {   <span class="cm">// sift down</span>
        <span class="ty">int</span> smaller = <span class="fn">leftChild</span>(i);
        <span class="ty">int</span> r = <span class="fn">rightChild</span>(i);
        <span class="kw">if</span> (r &lt; _size &amp;&amp; _data[r] &lt; _data[smaller]) smaller = r;
        <span class="kw">if</span> (_data[i] &lt;= _data[smaller]) <span class="kw">break</span>;   <span class="cm">// heap property restored</span>
        <span class="fn">swap</span>(i, smaller);
        i = smaller;
    }
    <span class="kw">return</span> min;
}</pre>
        <div class="concept">Take the root (the min), fill the hole with the last element, then push it down — always swapping toward the <b>smaller</b> child — until both children are ≥ it. O(log n).</div>
      </div>
    </div>
  </section>
</main>`;

/* ---- style the multiple-answer items ---- */
document.querySelectorAll('#l12 .ma-item').forEach(el=>{
  el.style.cssText='display:flex;align-items:center;gap:10px;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:6px 0;cursor:pointer;font-size:14px';
});
function maPQ(){
  const correct=[5,6];   // Binary Min Tree, Binary Heap
  const items=document.querySelectorAll('#ma-pq .ma-item');
  let all=true;
  items.forEach((item,i)=>{
    const checked=item.querySelector('input').checked;
    const should=correct.indexOf(i)!==-1;
    const ok=checked===should;
    item.style.borderColor=ok?'var(--green)':'var(--red)';
    item.style.background=ok?'rgba(21,153,87,.14)':'rgba(192,57,43,.12)';
    if(!ok)all=false;
  });
  const fb=document.getElementById('fb-ma-pq');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all
    ? '✓ Correct! The two main implementations are the <b>Binary Min Tree</b> and the <b>Binary Heap</b>.'
    : '✗ Not quite. The two main ways to implement a Priority Queue are the <b>Binary Min Tree</b> (tree of nodes) and the <b>Binary Heap</b> (array). Green rows are right as-is.';
}

/* ============================================================
   Interactive binary min-heap visualizer (array + SVG tree)
   ============================================================ */
let HEAP=[];
function hpSwap(a,b){ const t=HEAP[a]; HEAP[a]=HEAP[b]; HEAP[b]=t; }
function hpInsert(){
  const inp=document.getElementById('hp-val'); let v=parseInt(inp.value);
  if(isNaN(v)) v=Math.floor(Math.random()*98)+1;
  inp.value='';
  HEAP.push(v); const start=HEAP.length-1; let i=start, ups=0;
  while(i>0){ const p=(i-1>>1); if(HEAP[i]<HEAP[p]){ hpSwap(i,p); i=p; ups++; } else break; }
  hpRender([i], 'Inserted '+v+' at index '+start+', then sifted it up '+ups+' time'+(ups===1?'':'s')+' to index '+i+' (kept parent ≤ child). Root (min) = '+HEAP[0]+'.');
}
function hpRemoveMin(){
  if(HEAP.length===0){ hpRender([], 'Heap is empty.'); return; }
  const min=HEAP[0]; const last=HEAP.pop();
  let msg='Removed the min ('+min+') from the root. ';
  if(HEAP.length>0){
    HEAP[0]=last; msg+='Moved the last element ('+last+') to the root, then sifted down. ';
    let i=0, downs=0;
    while(true){
      const l=2*i+1, r=2*i+2; let sm=i;
      if(l<HEAP.length && HEAP[l]<HEAP[sm]) sm=l;
      if(r<HEAP.length && HEAP[r]<HEAP[sm]) sm=r;
      if(sm===i) break;
      hpSwap(i,sm); i=sm; downs++;
    }
    msg+='Sifted down '+downs+' time'+(downs===1?'':'s')+'. New min = '+HEAP[0]+'.';
    hpRender([0], msg);
  } else {
    hpRender([], msg+'Heap is now empty.');
  }
}
function hpBuild(){
  const n=7; HEAP=[]; for(let k=0;k<n;k++)HEAP.push(Math.floor(Math.random()*98)+1);
  const before=HEAP.slice();
  for(let i=(n>>1)-1;i>=0;i--){   // bottom-up heapify — O(n)
    let j=i;
    while(true){ const l=2*j+1,r=2*j+2; let sm=j;
      if(l<n && HEAP[l]<HEAP[sm]) sm=l;
      if(r<n && HEAP[r]<HEAP[sm]) sm=r;
      if(sm===j) break; hpSwap(j,sm); j=sm; }
  }
  hpRender([], 'buildHeap on ['+before.join(', ')+'] → heapified to ['+HEAP.join(', ')+']. Done bottom-up (sift-down from the last parent up to the root) in O(n). Root (min) = '+HEAP[0]+'.');
}
function hpClear(){ HEAP=[]; hpRender([], 'Cleared.'); }
function hpRender(hi, note){
  // array view
  const arr=document.getElementById('hp-array');
  if(HEAP.length===0){ arr.innerHTML='<span class="muted">(empty)</span>'; }
  else arr.innerHTML=HEAP.map((v,i)=>{
    const on=hi.indexOf(i)!==-1;
    const border=i===0?'var(--green)':(on?'var(--amber)':'var(--stack)');
    const bg=i===0?'rgba(21,153,87,.2)':(on?'rgba(214,137,16,.2)':'rgba(46,134,222,.14)');
    return '<div style="text-align:center"><div style="font-size:10px;color:var(--muted)">'+i+'</div>'
      +'<div style="background:'+bg+';border:1px solid '+border+';border-radius:6px;padding:6px 10px;font-family:monospace;font-weight:700;min-width:34px">'+v+'</div></div>';
  }).join('');
  // tree view
  const c=document.getElementById('hp-canvas');
  if(HEAP.length===0){ c.innerHTML='<span class="muted">(empty heap)</span>'; document.getElementById('hp-note').innerHTML=note||''; return; }
  const n=HEAP.length, maxD=Math.floor(Math.log2(n)), W=Math.max(360,Math.pow(2,maxD)*70), H=(maxD+1)*66+20;
  const px=i=>{ const d=Math.floor(Math.log2(i+1)); const pos=i-(Math.pow(2,d)-1); return (pos+0.5)/Math.pow(2,d)*W; };
  const py=i=>28+Math.floor(Math.log2(i+1))*66;
  let edges='', nodes='';
  for(let i=0;i<n;i++){
    if(i>0){ const p=(i-1>>1); edges+='<line x1="'+px(p)+'" y1="'+py(p)+'" x2="'+px(i)+'" y2="'+py(i)+'" stroke="#2b3c50" stroke-width="1.5"/>'; }
  }
  for(let i=0;i<n;i++){
    let fill='rgba(46,134,222,.16)', stroke='#2e86de';
    if(i===0){ fill='rgba(21,153,87,.3)'; stroke='#159957'; }
    if(hi.indexOf(i)!==-1){ fill='rgba(214,137,16,.4)'; stroke='#d68910'; }
    nodes+='<circle cx="'+px(i)+'" cy="'+py(i)+'" r="17" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2.5"/>';
    nodes+='<text x="'+px(i)+'" y="'+(py(i)+5)+'" text-anchor="middle" fill="#e8eef5" font-size="13" font-weight="700">'+HEAP[i]+'</text>';
  }
  c.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;min-width:'+Math.min(W,520)+'px;max-width:'+W+'px">'+edges+nodes+'</svg>';
  document.getElementById('hp-note').innerHTML=note||'Root (index 0) is the minimum. Children of i are 2i+1 and 2i+2.';
}
/* ============================================================
   buildHeap step-by-step animation (bottom-up heapify, O(n))
   Fixed complete-tree positions; only values/highlights change.
   ============================================================ */
const BH_POS={0:[230,28],1:[125,88],2:[335,88],3:[70,148],4:[180,148],5:[290,148],6:[400,148],7:[45,208],8:[105,208]};
const BH_EDGES=[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8]];
const BH_STEPS=[
  {arr:[100,17,36,25,19,7,3,2,1],hi:[],desc:`Start. buildHeap heapifies <b>bottom-up</b>: begin at the last parent (index 3) and sift-down each node up to the root (index 0).`},
  {arr:[100,17,36,1,19,7,3,2,25],hi:[3,8],desc:`<b>Index 3 (25):</b> its smaller child is 1 → swap. 25 sinks to a leaf; 1 rises to index 3.`},
  {arr:[100,17,3,1,19,7,36,2,25],hi:[2,6],desc:`<b>Index 2 (36):</b> its smaller child is 3 → swap. 36 sinks to index 6.`},
  {arr:[100,1,3,17,19,7,36,2,25],hi:[1,3],desc:`<b>Index 1 (17):</b> its smaller child is 1 → swap. Keep sifting 17 down from index 3.`},
  {arr:[100,1,3,2,19,7,36,17,25],hi:[3,7],desc:`Continue: index 3 (17) vs children 2, 25 → swap with 2. 17 settles at a leaf.`},
  {arr:[1,100,3,2,19,7,36,17,25],hi:[0,1],desc:`<b>Index 0 (100 — the root):</b> smaller child is 1 → swap. <b>1 becomes the root</b> (the minimum)! 100 keeps sinking.`},
  {arr:[1,2,3,100,19,7,36,17,25],hi:[1,3],desc:`Continue: index 1 (100) vs 2, 19 → swap with 2.`},
  {arr:[1,2,3,17,19,7,36,100,25],hi:[3,7],desc:`Continue: index 3 (100) vs 17, 25 → swap with 17. ✅ <b>Done</b> — valid min-heap, root = 1. buildHeap is <b>O(n)</b>, cheaper than n separate O(log n) inserts.`}
];
let bhIdx=0, bhAnimating=false;
function bhCell(v,i,hi){
  const on=hi.indexOf(i)!==-1;
  const border=i===0?'var(--green)':(on?'var(--amber)':'var(--stack)');
  const bg=i===0?'rgba(21,153,87,.2)':(on?'rgba(214,137,16,.28)':'rgba(46,134,222,.14)');
  return '<div style="text-align:center;transition:transform .5s ease"><div style="font-size:10px;color:var(--muted)">'+i+'</div><div style="background:'+bg+';border:1px solid '+border+';border-radius:6px;padding:6px 10px;font-family:monospace;font-weight:700;min-width:34px">'+v+'</div></div>';
}
function bhRenderArray(arr,hi){
  document.getElementById('bh-array').innerHTML=arr.map((v,i)=>bhCell(v,i,hi)).join('');
}
// mv (optional) = {a,b,valA,valB,t}: draw the two swapping nodes at interpolated positions
function bhDrawTree(arr,hi,mv){
  let e='',n='';
  BH_EDGES.forEach(pr=>{ const A=BH_POS[pr[0]],B=BH_POS[pr[1]]; e+='<line x1="'+A[0]+'" y1="'+A[1]+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="#2b3c50" stroke-width="1.5"/>'; });
  const drawNode=(x,y,v,on)=>{
    let fill='rgba(46,134,222,.16)',stroke='#2e86de';
    if(on){fill='rgba(214,137,16,.42)';stroke='#d68910';}
    n+='<circle cx="'+x+'" cy="'+y+'" r="17" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+(on?4:2.5)+'"/>';
    n+='<text x="'+x+'" y="'+(y+5)+'" text-anchor="middle" fill="#e8eef5" font-size="13" font-weight="700">'+v+'</text>';
  };
  arr.forEach((v,i)=>{
    if(mv && (i===mv.a||i===mv.b)) return;   // movers drawn last, on top
    const p=BH_POS[i], on=hi.indexOf(i)!==-1;
    let fill='rgba(46,134,222,.16)',stroke='#2e86de';
    if(i===0){fill='rgba(21,153,87,.3)';stroke='#159957';}
    if(on){fill='rgba(214,137,16,.42)';stroke='#d68910';}
    n+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="17" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+(on?4:2.5)+'"/>';
    n+='<text x="'+p[0]+'" y="'+(p[1]+5)+'" text-anchor="middle" fill="#e8eef5" font-size="13" font-weight="700">'+v+'</text>';
  });
  if(mv){
    const A=BH_POS[mv.a], B=BH_POS[mv.b];
    // node ending at a came from b; node ending at b came from a
    drawNode(B[0]+(A[0]-B[0])*mv.t, B[1]+(A[1]-B[1])*mv.t, mv.valA, true);
    drawNode(A[0]+(B[0]-A[0])*mv.t, A[1]+(B[1]-A[1])*mv.t, mv.valB, true);
  }
  document.getElementById('bh-canvas').innerHTML='<svg viewBox="0 0 460 245" style="width:100%;max-width:520px">'+e+n+'</svg>';
}
function bhRender(){
  const s=BH_STEPS[bhIdx];
  bhRenderArray(s.arr,s.hi);
  bhDrawTree(s.arr,s.hi,null);
  document.getElementById('bh-note').innerHTML=s.desc;
  document.getElementById('bh-step').textContent='Step '+(bhIdx+1)+' / '+BH_STEPS.length;
}
function bhAnimateArraySwap(a,b){
  const cells=document.querySelectorAll('#bh-array > div');
  const ca=cells[a], cb=cells[b]; if(!ca||!cb) return;
  const dx=cb.getBoundingClientRect().left-ca.getBoundingClientRect().left;
  ca.style.transition='none'; cb.style.transition='none';
  ca.style.transform='translateX('+dx+'px)'; cb.style.transform='translateX('+(-dx)+'px)';
  ca.style.position='relative'; cb.style.position='relative'; ca.style.zIndex='5'; cb.style.zIndex='5';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    ca.style.transition='transform .5s ease'; cb.style.transition='transform .5s ease';
    ca.style.transform='translateX(0)'; cb.style.transform='translateX(0)';
  }));
}
function bhAnimateForward(){
  const s=BH_STEPS[bhIdx], a=s.hi[0], b=s.hi[1];
  document.getElementById('bh-note').innerHTML=s.desc;
  document.getElementById('bh-step').textContent='Step '+(bhIdx+1)+' / '+BH_STEPS.length;
  bhRenderArray(s.arr,s.hi);
  bhAnimateArraySwap(a,b);
  bhAnimating=true;
  const valA=s.arr[a], valB=s.arr[b], start=performance.now(), dur=520;
  (function frame(now){
    let t=Math.min(1,(now-start)/dur);
    const te=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;   // easeInOutQuad
    bhDrawTree(s.arr,s.hi,{a,b,valA,valB,t:te});
    if(t<1) requestAnimationFrame(frame);
    else { bhAnimating=false; bhDrawTree(s.arr,s.hi,null); }
  })(performance.now());
}
function bhStep(d){
  if(bhAnimating) return;
  if(d===-99){ bhIdx=0; bhRender(); return; }
  const target=Math.max(0,Math.min(BH_STEPS.length-1,bhIdx+d));
  if(target===bhIdx) return;
  if(d>0 && BH_STEPS[target].hi.length===2){ bhIdx=target; bhAnimateForward(); }
  else { bhIdx=target; bhRender(); }
}

hpRender([]);
bhRender();
