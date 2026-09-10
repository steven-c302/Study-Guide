/* ============================================================
   LESSON 11 — Binary Trees, Tree Traversals & BSTs.
   Injects into #l11. Loaded before the main engine.
   Interactive SVG tree-traversal visualizer that ALSO draws the
   stack (DFS) / queue (BFS) at every step.
   ============================================================ */
document.getElementById('l11').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l11-trees')">Binary Trees</button>
  <button onclick="showTopic(this,'l11-traversals')">Traversals</button>
  <button onclick="showTopic(this,'l11-bst')">Binary Search Trees</button>
  <button onclick="showTopic(this,'l11-diagram')">Diagram It</button>
  <button onclick="showTopic(this,'l11-code')">Code Writing</button>
</nav>
<main>

  <!-- ===================== BINARY TREES ===================== -->
  <section class="topic active" id="l11-trees">
    <h2>Lesson 11 · Binary Trees</h2>
    <div class="concept">A <b>tree</b> is a <b>non-linear</b> data structure of nodes. A <b>binary tree</b> restricts each node to <b>at most 2</b> children — a <b>left</b> and a <b>right</b>. The structure is <b>recursive</b>: each node is itself the root of a binary tree, so operations (<code>contains</code>, <code>height</code>, …) are written recursively and can be called on the nodes directly — no separate "manager" class needed.</div>
    <div class="card">
      <h3>Fill in — how many children</h3>
      <p>Binary trees can have up to <input type="text" class="fillblank sm" data-answer="2~~~two" placeholder="?"> children.</p>
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Answer: <b>2</b> (a left child and a right child). A node with 0 children is a <b>leaf</b>.</div>
    </div>
    <div class="card">
      <h3>Fill in — the fields of a tree node</h3>
      <p class="muted">This is the quiz question — note the leading-underscore field convention it wanted.</p>
      <p>The fields of a binary tree node are
        <input type="text" class="fillblank sm" data-answer="_value~~~value" placeholder="?">,
        <input type="text" class="fillblank sm" data-answer="_left~~~left~~~left reference" placeholder="?">,
        <input type="text" class="fillblank sm" data-answer="_right~~~right~~~right reference" placeholder="?">, and
        <input type="text" class="fillblank sm" data-answer="_parent~~~parent~~~parent reference" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check all</button>
      <div class="fb">Answers: <b>_value</b>, <b>_left</b>, <b>_right</b>, and <b>_parent</b> (references). The value, plus references to the left child, right child, and — so you can move <i>up</i> the tree — the parent. ("Value"/"Left Reference" without the underscore was marked wrong; the field convention uses <code>_</code>.)</div>
    </div>
    <div class="card">
      <h3>Terminology</h3>
      <table class="match" id="match-tree">
        <tr><td class="match-term">Root</td><td><select class="match-def"><option value="">— choose —</option><option value="root">The single top node — the whole tree hangs from it</option><option value="leaf">A node with no children (empty left and empty right)</option><option value="height">Number of edges from the root down to the deepest leaf</option><option value="parent">A node directly above another (its child)</option></select></td></tr>
        <tr><td class="match-term">Leaf</td><td><select class="match-def"><option value="">— choose —</option><option value="root">The single top node — the whole tree hangs from it</option><option value="leaf">A node with no children (empty left and empty right)</option><option value="height">Number of edges from the root down to the deepest leaf</option><option value="parent">A node directly above another (its child)</option></select></td></tr>
        <tr><td class="match-term">Height</td><td><select class="match-def"><option value="">— choose —</option><option value="root">The single top node — the whole tree hangs from it</option><option value="leaf">A node with no children (empty left and empty right)</option><option value="height">Number of edges from the root down to the deepest leaf</option><option value="parent">A node directly above another (its child)</option></select></td></tr>
        <tr><td class="match-term">Parent</td><td><select class="match-def"><option value="">— choose —</option><option value="root">The single top node — the whole tree hangs from it</option><option value="leaf">A node with no children (empty left and empty right)</option><option value="height">Number of edges from the root down to the deepest leaf</option><option value="parent">A node directly above another (its child)</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-tree','fb-match-tree',['root','leaf','height','parent'])">Check</button>
      <div class="fb" id="fb-match-tree"></div>
    </div>
    <div class="card">
      <h3>Height ↔ number of nodes</h3>
      <div class="concept">For a binary tree of height <code>h</code>, the number of nodes <code>n</code> is between <code>h + 1</code> (a straight "stick") and <code>2<sup>h+1</sup> − 1</code> (completely full). Flipping it: for <code>n</code> nodes, the height is between <code>⌊log₂(n+1)⌋ − 1</code> (balanced) and <code>n − 1</code> (a stick).</div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Which tree shape gives the <b>smallest</b> height for n nodes (and therefore the fastest search)?</div>
        <button class="opt" data-i="0">A "stick" — every node has one child (like a linked list)</button>
        <button class="opt" data-i="1">A balanced tree — each level filled before the next</button>
        <button class="opt" data-i="2">Height doesn't depend on shape</button>
        <div class="fb">A <b>balanced</b> tree packs n nodes into ~log₂ n levels, so its height is minimal. A stick degenerates to height n−1 — no better than a list.</div>
      </div>
    </div>
  </section>

  <!-- ===================== TRAVERSALS ===================== -->
  <section class="topic" id="l11-traversals">
    <h2>Lesson 11 · Tree Traversals</h2>
    <div class="concept">A <b>traversal</b> visits every node in some order. <b>Depth-first (DFS)</b> plunges down before backtracking; <b>breadth-first (BFS)</b> processes a whole level before going deeper. The three DFS orders differ only in <b>when you process the node</b> relative to recursing on its children.</div>
    <div class="card">
      <h3>The three depth-first orders</h3>
      <table class="match" id="match-dfs">
        <tr><td class="match-term">Pre-order</td><td><select class="match-def"><option value="">— choose —</option><option value="pre">Process the value, THEN recurse on children</option><option value="in">Recurse on the left, process the value, THEN recurse on the right</option><option value="post">Recurse on children, THEN process the value</option></select></td></tr>
        <tr><td class="match-term">In-order</td><td><select class="match-def"><option value="">— choose —</option><option value="pre">Process the value, THEN recurse on children</option><option value="in">Recurse on the left, process the value, THEN recurse on the right</option><option value="post">Recurse on children, THEN process the value</option></select></td></tr>
        <tr><td class="match-term">Post-order</td><td><select class="match-def"><option value="">— choose —</option><option value="pre">Process the value, THEN recurse on children</option><option value="in">Recurse on the left, process the value, THEN recurse on the right</option><option value="post">Recurse on children, THEN process the value</option></select></td></tr>
      </table>
      <button class="btn small" style="margin-top:8px" onclick="checkMatch('match-dfs','fb-match-dfs',['pre','in','post'])">Check</button>
      <div class="fb" id="fb-match-dfs"></div>
      <p class="muted" style="margin-top:8px">➡ Watch all four traversals run node-by-node <b>with the stack/queue drawn</b> in the <b>Diagram It</b> tab.</p>
    </div>
    <div class="card">
      <h3>Fill in — which data structure implements each</h3>
      <p>Depth-first traversals are implemented using a
        <input type="text" class="fillblank sm" data-answer="stack" placeholder="?"> while the breadth-first traversal is implemented using a
        <input type="text" class="fillblank sm" data-answer="queue" placeholder="?">.</p>
      <button class="btn small" onclick="checkFillGroup(this)">Check both</button>
      <div class="fb">Answers: <b>stack</b> and <b>queue</b> (matches your quiz). DFS: push root, then loop — pop, process, push children (LIFO dives deep). BFS: enqueue root, then loop — dequeue, process, enqueue children (FIFO sweeps each level). Note: these are <i>data-structure</i> stacks/queues (which themselves live on the heap) — separate from the L4 stack/heap memory model. The tree's node objects always live on the heap.</div>
    </div>
    <div class="card">
      <h3>The n-ary in-order question from your quiz</h3>
      <p class="muted">For the general tree in your quiz (nodes can have &gt; 2 children), the rule is: recurse on the <b>first half</b> of the children (middle child counts as first half), process the value, then recurse on the rest.</p>
      <button class="btn ghost small" onclick="toggleReveal(this)">Show the in-order sequence</button>
      <div class="reveal"><div class="concept">In-order: <b>E, B, M, J, F, K, C, A, G, N, L, O, H, D, I</b>.<br>
      Reading it: under root A the children are B (first half), C (middle → first half), D (second half). You fully in-order B's subtree, then C's, then <b>process A</b>, then D's subtree. The same "first-half → value → rest" rule applies recursively at every node.</div></div>
    </div>
  </section>

  <!-- ===================== BST ===================== -->
  <section class="topic" id="l11-bst">
    <h2>Lesson 11 · Binary Search Trees</h2>
    <div class="concept">A <b>Binary Search Tree (BST)</b> is a binary tree with an ordering <b>invariant</b>: for every node, all values in its <b>left</b> subtree are <b>smaller</b>, and all values in its <b>right</b> subtree are <b>larger</b> — and each subtree is itself a BST. Values must be comparable. Every BST is a binary tree, but not every binary tree is a BST.</div>
    <div class="card">
      <h3>The invariants</h3>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>In a BST, where do you look for a value <b>smaller</b> than the current node?</div>
        <button class="opt" data-i="0">The right subtree</button>
        <button class="opt" data-i="1">The left subtree</button>
        <button class="opt" data-i="2">Either — order doesn't matter</button>
        <div class="fb"><b>Left</b> = smaller, <b>right</b> = larger. That single rule is what lets <code>contains</code> discard half the tree at each step (when balanced).</div>
      </div>
      <div class="q" data-tf="T">
        <div class="prompt"><span class="tag">T / F</span>An <b>in-order</b> traversal of a BST visits the values in <b>sorted</b> order.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True — in-order is "left, self, right," and in a BST left &lt; self &lt; right at every node, so the whole traversal comes out ascending. (Try it in Diagram It: in-order of the sample BST gives 2, 5, 6, 8, 10, 12, 14.)</div>
      </div>
    </div>
    <div class="card">
      <h3>Search cost depends on shape</h3>
      <p class="muted">Slide 51 — same values, two insert orders, very different trees:</p>
      <div class="two">
        <div><p class="muted">insert(8, 5, 12, 2, 6, 10, 14) → balanced</p>
<pre>        8
      /   \\
     5     12
    / \\    / \\
   2   6  10  14</pre>
        <p class="muted"><code>contains(14)</code> → <b>O(log n)</b></p></div>
        <div><p class="muted">insert(2, 4, 6, 8, 10, 12, 14) → a "stick"</p>
<pre>2
 \\
  4
   \\
    6
     \\
      8  ...  → 14</pre>
        <p class="muted"><code>contains(14)</code> → <b>O(n)</b></p></div>
      </div>
      <div class="q" data-mc="2">
        <div class="prompt"><span class="tag">Multiple choice</span>Why is <code>contains(14)</code> O(n) on the second tree?</div>
        <button class="opt" data-i="0">Because 14 isn't in the tree.</button>
        <button class="opt" data-i="1">Because BST search is always O(n).</button>
        <button class="opt" data-i="2">Inserting already-sorted values makes a one-sided "stick," so search must walk all n nodes — no halving happens.</button>
        <div class="fb">The BST's speed comes from halving, which needs a balanced shape. Inserting sorted data degenerates it into a linked list (height n−1), so search is O(n). <b>You don't control the shape — it depends on insert order.</b></div>
      </div>
    </div>
    <div class="card">
      <h3>The reassignment pattern for insert / remove</h3>
      <div class="concept">Insert and remove may <b>mutate the tree or return a new one</b>, so they <b>return the tree</b>, and when you recurse on a child you must <b>replace the child with the result</b>:<br><code>_left = _left.insert(element);</code> &nbsp;or&nbsp; <code>_right = _right.remove(x);</code></div>
      <div class="q" data-mc="3">
        <div class="prompt"><span class="tag">Multiple choice</span>You're removing value <code>x</code> from a BST. If <code>x</code> is <b>greater</b> than the current node's value, what is the next line? (Your quiz question.)</div>
        <button class="opt" data-i="0"><code>_left.remove(x);</code></button>
        <button class="opt" data-i="1"><code>_left = _left.remove(x);</code></button>
        <button class="opt" data-i="2"><code>_right.remove(x);</code></button>
        <button class="opt" data-i="3"><code>_right = _right.remove(x);</code></button>
        <div class="fb"><b><code>_right = _right.remove(x);</code></b>. Two things must be right: (1) <code>x</code> is <b>greater</b> → go <b>right</b>; (2) you must <b>reassign</b> <code>_right</code> to the returned tree, or the change is lost. <code>_right.remove(x);</code> without the assignment throws away the result.</div>
      </div>
      <div class="q" data-mc="1">
        <div class="prompt"><span class="tag">Multiple choice</span>Removing a node with <b>two</b> children is the tricky case. What's the standard fix?</div>
        <button class="opt" data-i="0">Delete the whole subtree.</button>
        <button class="opt" data-i="1">Find the <b>min of the right subtree</b>, copy it into this node, then remove that min from the right subtree.</button>
        <button class="opt" data-i="2">Swap the node with the root.</button>
        <div class="fb">Slide 49: replace the value with the smallest value in the right subtree (the next-largest overall), then recursively remove that min — which is guaranteed to be a leaf or have only a right child, i.e. an easy case.</div>
      </div>
    </div>
  </section>

  <!-- ===================== DIAGRAM IT ===================== -->
  <section class="topic" id="l11-diagram">
    <h2>Lesson 11 · Diagram It — Traversal + Stack / Queue</h2>
    <div class="concept">The sample BST is <code>insert(8,5,12,2,6,10,14)</code>. Pick a traversal and step through it — each node lights up in visit order <b>and the stack (DFS) or queue (BFS) is drawn at every step</b>, exactly like the whiteboard battles. Watch: DFS pushes/pops on a <b>stack</b>; BFS enqueues/dequeues on a <b>queue</b>; in-order comes out <b>sorted</b>.</div>
    <div class="card">
      <div class="toolbar">
        <button class="btn small" onclick="tvStart('pre')">Pre-order</button>
        <button class="btn small" onclick="tvStart('in')">In-order</button>
        <button class="btn small" onclick="tvStart('post')">Post-order</button>
        <button class="btn small" onclick="tvStart('level')">Level-order (BFS)</button>
      </div>
      <div id="tv-info" class="step-desc" style="min-height:0"></div>
      <div id="tv-canvas" style="background:#0b1119;border:1px solid var(--line);border-radius:10px;padding:14px;text-align:center"></div>
      <div class="two" style="margin-top:12px">
        <div class="mem-col" style="min-height:0">
          <h4 id="tv-ds-title" style="text-align:center;margin:0 0 8px">▮ STACK</h4>
          <div id="tv-ds" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;min-height:42px;justify-content:center"></div>
          <div id="tv-ds-note" class="muted" style="font-size:11px;margin-top:8px;text-align:center"></div>
        </div>
        <div class="step-desc" id="tv-action" style="margin-top:0"></div>
      </div>
      <div id="tv-seq" class="step-desc"></div>
      <div class="toolbar" style="justify-content:space-between">
        <div><button class="btn ghost small" onclick="tvStep(-1)">◀ Back</button>
        <button class="btn small" onclick="tvStep(1)">Next ▶</button>
        <button class="btn ghost small" onclick="tvStart(tvType)">⟲ Restart</button></div>
        <span class="score-badge" id="tv-counter"></span>
      </div>
    </div>
  </section>

  <!-- ===================== CODE WRITING ===================== -->
  <section class="topic" id="l11-code">
    <h2>Lesson 11 · Code Writing</h2>
    <div class="concept">Trees are recursive, so most methods follow the shape: handle the base/empty case, then combine results from the left and right children. Write each, then reveal.</div>

    <div class="card">
      <h3>1. The tree node class</h3>
      <p>Write <code>BinaryTreeImpl&lt;T&gt;</code> with private <code>_value</code>, <code>_left</code>, and <code>_right</code> (each a <code>BinaryTree&lt;T&gt;</code>), a constructor taking all three, and getters/setters.</p>
      <textarea placeholder="public class BinaryTreeImpl<T> implements BinaryTree<T> { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public class</span> <span class="ty">BinaryTreeImpl</span>&lt;T&gt; <span class="kw">implements</span> <span class="ty">BinaryTree</span>&lt;T&gt; {
    <span class="kw">private</span> T _value;
    <span class="kw">private</span> BinaryTree&lt;T&gt; _left;
    <span class="kw">private</span> BinaryTree&lt;T&gt; _right;

    <span class="kw">public</span> <span class="fn">BinaryTreeImpl</span>(T value, BinaryTree&lt;T&gt; left, BinaryTree&lt;T&gt; right) {
        _value = value;
        _left  = left;
        _right = right;
    }

    <span class="kw">public</span> T <span class="fn">getValue</span>()            { <span class="kw">return</span> _value; }
    <span class="kw">public void</span> <span class="fn">setValue</span>(T value)   { _value = value; }
    <span class="kw">public</span> BinaryTree&lt;T&gt; <span class="fn">getLeft</span>()  { <span class="kw">return</span> _left; }
    <span class="kw">public void</span> <span class="fn">setLeft</span>(BinaryTree&lt;T&gt; l)  { _left = l; }
    <span class="kw">public</span> BinaryTree&lt;T&gt; <span class="fn">getRight</span>() { <span class="kw">return</span> _right; }
    <span class="kw">public void</span> <span class="fn">setRight</span>(BinaryTree&lt;T&gt; r) { _right = r; }
}</pre>
        <div class="concept">Just like a LinkedList node, but with <b>two</b> forward references (<code>_left</code>, <code>_right</code>) instead of one <code>_next</code>. That second branch is what makes it a tree.</div>
      </div>
    </div>

    <div class="card">
      <h3>2. height()</h3>
      <p>Write <code>height()</code> — the number of edges from this node to its deepest leaf. A node with no children has height 0. (<code>null</code> child = empty.)</p>
      <textarea placeholder="public int height() { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public int</span> <span class="fn">height</span>() {
    <span class="kw">if</span> (_left == <span class="kw">null</span> &amp;&amp; _right == <span class="kw">null</span>) <span class="kw">return</span> <span class="nm">0</span>;   <span class="cm">// leaf</span>
    <span class="kw">else if</span> (_right == <span class="kw">null</span>) <span class="kw">return</span> _left.height() + <span class="nm">1</span>;
    <span class="kw">else if</span> (_left == <span class="kw">null</span>)  <span class="kw">return</span> _right.height() + <span class="nm">1</span>;
    <span class="kw">else</span> <span class="kw">return</span> Math.max(_left.height(), _right.height()) + <span class="nm">1</span>;
}</pre>
        <div class="concept">Recursive shape: a node's height is 1 + the taller of its two children's heights. The base case is a leaf (height 0). This is <code>BinaryTreeImpl.height()</code> from the L11 code.</div>
      </div>
    </div>

    <div class="card">
      <h3>3. contains() — plain binary tree</h3>
      <p>Write <code>contains(T value)</code> for a <b>general</b> binary tree (no ordering) — it must search <b>both</b> sides.</p>
      <textarea placeholder="public boolean contains(T value) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public boolean</span> <span class="fn">contains</span>(T value) {
    <span class="kw">if</span> (value.equals(_value)) <span class="kw">return</span> <span class="kw">true</span>;
    <span class="kw">if</span> (_left == <span class="kw">null</span> &amp;&amp; _right == <span class="kw">null</span>) <span class="kw">return</span> <span class="kw">false</span>;
    <span class="kw">if</span> (_right == <span class="kw">null</span>) <span class="kw">return</span> _left.contains(value);
    <span class="kw">if</span> (_left  == <span class="kw">null</span>) <span class="kw">return</span> _right.contains(value);
    <span class="kw">return</span> _left.contains(value) || _right.contains(value);   <span class="cm">// check BOTH</span>
}</pre>
        <div class="concept">Because a plain binary tree has no ordering, you have to look left <b>and</b> right → O(n). The whole point of a BST is to replace this with a single-direction search.</div>
      </div>
    </div>

    <div class="card">
      <h3>4. contains() — BST version (uses ordering)</h3>
      <p>Now write <code>contains</code> for a <b>BST</b>: compare, then recurse into only <b>one</b> side. Assume <code>T</code> is <code>Comparable</code> (use <code>compareTo</code>).</p>
      <textarea placeholder="public boolean contains(T value) { ... }"></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public boolean</span> <span class="fn">contains</span>(T value) {
    <span class="ty">int</span> cmp = value.compareTo(_value);
    <span class="kw">if</span> (cmp == <span class="nm">0</span>) <span class="kw">return</span> <span class="kw">true</span>;              <span class="cm">// found it</span>
    <span class="kw">if</span> (cmp &lt; <span class="nm">0</span>)                             <span class="cm">// smaller → go left</span>
        <span class="kw">return</span> _left != <span class="kw">null</span> &amp;&amp; _left.contains(value);
    <span class="kw">else</span>                                    <span class="cm">// larger → go right</span>
        <span class="kw">return</span> _right != <span class="kw">null</span> &amp;&amp; _right.contains(value);
}</pre>
        <div class="concept">One comparison tells you which single side to search, so you throw away half the tree each step — O(log n) when balanced. That's the payoff of the BST invariant.</div>
      </div>
    </div>

    <div class="card">
      <h3>5. Recursive traversals (print)</h3>
      <p>Write pre-, in-, and post-order print methods. Notice they differ by <b>one line's position</b>.</p>
      <textarea placeholder="preOrder / inOrder / postOrder ..."></textarea>
      <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show solution</button></div>
      <div class="reveal">
<pre><span class="kw">public void</span> <span class="fn">preOrder</span>() {
    System.out.print(_value + <span class="st">" "</span>);           <span class="cm">// value FIRST</span>
    <span class="kw">if</span> (_left != <span class="kw">null</span>)  _left.preOrder();
    <span class="kw">if</span> (_right != <span class="kw">null</span>) _right.preOrder();
}
<span class="kw">public void</span> <span class="fn">inOrder</span>() {
    <span class="kw">if</span> (_left != <span class="kw">null</span>)  _left.inOrder();
    System.out.print(_value + <span class="st">" "</span>);           <span class="cm">// value in the MIDDLE</span>
    <span class="kw">if</span> (_right != <span class="kw">null</span>) _right.inOrder();
}
<span class="kw">public void</span> <span class="fn">postOrder</span>() {
    <span class="kw">if</span> (_left != <span class="kw">null</span>)  _left.postOrder();
    <span class="kw">if</span> (_right != <span class="kw">null</span>) _right.postOrder();
    System.out.print(_value + <span class="st">" "</span>);           <span class="cm">// value LAST</span>
}</pre>
        <div class="concept">Same three lines every time — only the <b>position of the "process value" line</b> changes: first (pre), between the two recursions (in), or last (post). Note: this recursive version uses the <b>JVM call stack</b> instead of an explicit stack object — but it produces the exact same order.</div>
      </div>
    </div>
  </section>
</main>`;

/* ============================================================
   Interactive tree-traversal visualizer (SVG) + stack/queue.
   Sample BST: insert(8,5,12,2,6,10,14)
   Each traversal is SIMULATED with its real auxiliary structure,
   so the stack (DFS) / queue (BFS) is shown at every step.
   ============================================================ */
const TNODES={
  n8:{v:8,x:240,y:35,l:'n5',r:'n12'},
  n5:{v:5,x:120,y:105,l:'n2',r:'n6'},
  n12:{v:12,x:360,y:105,l:'n10',r:'n14'},
  n2:{v:2,x:60,y:175},
  n6:{v:6,x:180,y:175},
  n10:{v:10,x:300,y:175},
  n14:{v:14,x:420,y:175}
};
const TROOT='n8';
function tval(id){ return TNODES[id].v; }

/* --- simulators: each returns a list of step states --- */
/* step = {ds:[ids], out:[ids], cur:id|null, act:'text', queue:bool} */
function simPre(){
  const steps=[], st=[TROOT], out=[];
  steps.push({ds:st.slice(),out:out.slice(),cur:null,act:'Push the root ('+tval(TROOT)+') onto the stack.'});
  while(st.length){
    const id=st.pop(); out.push(id);
    const n=TNODES[id], pushed=[];
    if(n.r){st.push(n.r);pushed.push(n.r);}
    if(n.l){st.push(n.l);pushed.push(n.l);}
    let act='Pop '+tval(id)+', process it (add to output).';
    if(pushed.length) act+=' Push its '+(pushed.length>1?'children':'child')+' '+pushed.map(tval).join(', ')+' (right first, so the left child ends up on top).';
    steps.push({ds:st.slice(),out:out.slice(),cur:id,act:act});
  }
  return steps;
}
function simLevel(){
  const steps=[], q=[TROOT], out=[];
  steps.push({ds:q.slice(),out:out.slice(),cur:null,act:'Enqueue the root ('+tval(TROOT)+').',queue:true});
  while(q.length){
    const id=q.shift(); out.push(id);
    const n=TNODES[id], en=[];
    if(n.l){q.push(n.l);en.push(n.l);}
    if(n.r){q.push(n.r);en.push(n.r);}
    let act='Dequeue '+tval(id)+', process it.';
    if(en.length) act+=' Enqueue its '+(en.length>1?'children':'child')+' '+en.map(tval).join(', ')+'.';
    steps.push({ds:q.slice(),out:out.slice(),cur:id,act:act,queue:true});
  }
  return steps;
}
function simIn(){
  const steps=[], st=[], out=[]; let cur=TROOT;
  steps.push({ds:[],out:[],cur:null,act:'Start with an empty stack; begin at the root.'});
  while(cur || st.length){
    while(cur){
      st.push(cur); const v=tval(cur); cur=TNODES[cur].l;
      steps.push({ds:st.slice(),out:out.slice(),cur:out.length?out[out.length-1]:null,
        act:'Go left as far as possible: push '+v+'.'});
    }
    const id=st.pop(); out.push(id); cur=TNODES[id].r;
    steps.push({ds:st.slice(),out:out.slice(),cur:id,
      act:'Pop '+tval(id)+', process it, then move to its right child.'});
  }
  return steps;
}
function simPost(){
  /* one-stack method: pop, PREPEND to output, push left then right */
  const steps=[], st=[TROOT], out=[];
  steps.push({ds:st.slice(),out:out.slice(),cur:null,
    act:'Push the root ('+tval(TROOT)+'). (One-stack post-order: pop, PREPEND to output, push left then right.)'});
  while(st.length){
    const id=st.pop(); out.unshift(id);
    const n=TNODES[id], pushed=[];
    if(n.l){st.push(n.l);pushed.push(n.l);}
    if(n.r){st.push(n.r);pushed.push(n.r);}
    let act='Pop '+tval(id)+', prepend it to the output.';
    if(pushed.length) act+=' Push '+pushed.map(tval).join(', ')+'.';
    steps.push({ds:st.slice(),out:out.slice(),cur:id,act:act});
  }
  return steps;
}

let tvType='pre', tvSteps=[], tvK=0;
const TV_LABELS={
  pre:'<b>Pre-order</b> (depth-first, uses a <b>STACK</b>): process the value, then left, then right.',
  in:'<b>In-order</b> (depth-first, uses a <b>STACK</b>): left, process the value, then right. On a BST this comes out <b>sorted</b>.',
  post:'<b>Post-order</b> (depth-first, uses a <b>STACK</b>): left, right, then process the value.',
  level:'<b>Level-order</b> (breadth-first, uses a <b>QUEUE</b>): process each level top-to-bottom, left-to-right.'
};
function tvStart(type){
  tvType=type;
  tvSteps = type==='pre'?simPre() : type==='in'?simIn() : type==='post'?simPost() : simLevel();
  tvK=0; tvRender();
}
function tvStep(d){ tvK=Math.max(0,Math.min(tvSteps.length-1,tvK+d)); tvRender(); }
function dsBox(v,cls){
  const border = cls==='top' ? 'var(--amber)' : 'var(--stack)';
  const bg = cls==='top' ? 'rgba(214,137,16,.25)' : 'rgba(46,134,222,.18)';
  return '<div style="background:'+bg+';border:1px solid '+border+';border-radius:6px;padding:6px 12px;font-family:monospace;font-weight:700;color:var(--ink)">'+v+'</div>';
}
function tvRender(){
  const step=tvSteps[tvK];
  const visited={}; step.out.forEach(id=>visited[id]=1);
  const cur=step.cur;
  /* tree */
  let s='<svg viewBox="0 0 480 205" style="width:100%;max-width:560px">';
  Object.keys(TNODES).forEach(id=>{
    const n=TNODES[id];
    [n.l,n.r].forEach(c=>{ if(c){ const cn=TNODES[c];
      s+='<line x1="'+n.x+'" y1="'+n.y+'" x2="'+cn.x+'" y2="'+cn.y+'" stroke="#2b3c50" stroke-width="2"/>'; }});
  });
  Object.keys(TNODES).forEach(id=>{
    const n=TNODES[id];
    let fill='#1d2b3a', stroke='#8e44ad';
    if(visited[id]){ fill='rgba(21,153,87,.35)'; stroke='#159957'; }
    if(id===cur){ fill='rgba(214,137,16,.5)'; stroke='#d68910'; }
    s+='<circle cx="'+n.x+'" cy="'+n.y+'" r="18" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2.5"/>';
    s+='<text x="'+n.x+'" y="'+(n.y+5)+'" text-anchor="middle" fill="#e8eef5" font-size="14" font-weight="700">'+n.v+'</text>';
  });
  s+='</svg>';
  document.getElementById('tv-canvas').innerHTML=s;
  /* stack / queue */
  const isQ=!!step.queue;
  document.getElementById('tv-ds-title').textContent = isQ ? '▮ QUEUE' : '▮ STACK';
  let dsHtml;
  if(step.ds.length===0){ dsHtml='<span class="muted">(empty)</span>'; }
  else {
    dsHtml = step.ds.map((id,i)=>{
      const isTop = !isQ && i===step.ds.length-1;   // stack top = last element
      const isFront = isQ && i===0;                 // queue front = first element
      return dsBox(tval(id), (isTop||isFront)?'top':'');
    }).join('');
  }
  document.getElementById('tv-ds').innerHTML=dsHtml;
  document.getElementById('tv-ds-note').innerHTML = isQ
    ? '← front (dequeues here) &nbsp;·&nbsp; back (enqueues here) → &nbsp; — highlighted = front'
    : 'top of stack is on the right → (pushes and pops happen here) — highlighted = top';
  /* text + sequence */
  document.getElementById('tv-info').innerHTML=TV_LABELS[tvType];
  document.getElementById('tv-action').innerHTML='<b>Step:</b> '+step.act;
  const seq=step.out.map(tval).join(', ');
  document.getElementById('tv-seq').innerHTML = seq ? '<b>Output so far:</b> '+seq : '<span class="muted">Press Next ▶ to begin.</span>';
  document.getElementById('tv-counter').textContent = (tvK+1)+' / '+tvSteps.length;
}
tvStart('pre');
