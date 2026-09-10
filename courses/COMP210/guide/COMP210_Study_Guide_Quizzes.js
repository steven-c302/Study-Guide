/* ============================================================
   PAST QUIZZES + PRACTICE EXAMS
   The 4 in-class quizzes (real questions + correct answers) plus
   two original practice finals matching their style & difficulty.
   Injects into #lquiz. Loaded before the main engine.
   ============================================================ */
document.getElementById('lquiz').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'qz-1')">Quiz 1</button>
  <button onclick="showTopic(this,'qz-2')">Quiz 2</button>
  <button onclick="showTopic(this,'qz-3')">Quiz 3</button>
  <button onclick="showTopic(this,'qz-4')">Quiz 4</button>
  <button onclick="showTopic(this,'qz-exA')">★ Practice Exam A</button>
  <button onclick="showTopic(this,'qz-exB')">★ Practice Exam B</button>
  <button onclick="showTopic(this,'qz-exC')">★★ Exam C (harder)</button>
  <button onclick="showTopic(this,'qz-exD')">★★ Exam D (harder)</button>
  <button onclick="showTopic(this,'qz-exE')">★★ Exam E (harder)</button>
</nav>
<main>

  <!-- ===================== QUIZ 1 ===================== -->
  <section class="topic active" id="qz-1">
    <h2>Quiz 1 — Intro, Memory, Java Basics (L1–L7)</h2>
    <div class="card">
      <div class="q" data-tf="T"><div class="prompt"><span class="tag">Q1 · T/F</span>Primary storage holds data temporarily and is very fast to access, while secondary storage is for long-term storage and is slower to access.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb">True. Primary (RAM/cache) = fast, volatile, temporary; secondary (SSD/HDD) = slower, non-volatile, long-term.</div></div>
      <div class="q"><p><span class="tag">Q2 · Fill</span>Convert <code>0x2B</code> to binary (with prefix): <input type="text" class="fillblank sm" data-answer="0b00101011~~~0b101011~~~00101011~~~101011" placeholder="?" style="width:150px"></p>
        <button class="btn small" onclick="checkFill(this)">Check</button>
        <div class="fb"><b>0b00101011</b>. 0x2B: 2→0010, B→1011 → 00101011 (= 43).</div></div>
      <div class="q"><p><span class="tag">Q3 · Fill</span>What language does the JVM read and execute? <input type="text" class="fillblank sm" data-answer="bytecode" placeholder="?" style="width:120px"></p>
        <button class="btn small" onclick="checkFill(this)">Check</button>
        <div class="fb"><b>Bytecode</b> — the <code>.class</code> intermediate representation produced by <code>javac</code>.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q4 · Primitive sizes (write size in bytes; nothing for reference types)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>boolean = 1 (bit)   char = 2B
byte = 1B   short = 2B   int = 4B   long = 8B
float = 4B   double = 8B
class, String, array = reference types (no primitive size)</pre></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">Q5 · MC</span>What is the value of a reference type variable?</div>
        <button class="opt" data-i="0">null</button><button class="opt" data-i="1">The object's address (in heap memory)</button><button class="opt" data-i="2">The object itself</button>
        <div class="fb"><b>The object's address.</b> A reference variable stores the heap address of the object; that address value lives in stack memory.</div></div>
      <div class="q"><p><span class="tag">Q6 · Fill</span>Declare and initialize a String array of three favorite foods:</p>
        <p><input type="text" class="fillblank" data-answer='string[] foods = {"sushi", "mango", "noodle"};|string[] x = {"a", "b", "c"};' placeholder="String[] ... = { ... };" style="width:100%"></p>
        <button class="btn small" onclick="checkFill(this)">Check</button>
        <div class="fb">e.g. <code>String[] foods = {"sushi", "mango", "noodle"};</code> — type <code>String[]</code>, braces for the literal, quoted strings.</div></div>
      <div class="q"><p><span class="tag">Q7 · Fill</span>Data abstraction increases security and simplicity by <input type="text" class="fillblank sm" data-answer="hiding" placeholder="?" style="width:100px"> certain data from the user.</p>
        <button class="btn small" onclick="checkFill(this)">Check</button>
        <div class="fb"><b>hiding</b> — encapsulation hides internal data/implementation behind an interface.</div></div>
      <div class="concept" style="margin-top:6px">Q8–12 use: <code>protected String[] args(int x, int y) { }</code></div>
      <div class="q"><p><span class="tag">Q8 · Fill</span>Name of the method? <input type="text" class="fillblank sm" data-answer="args" placeholder="?" style="width:90px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>args</b>.</div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">Q9 · MC</span>Instance method or class method?</div>
        <button class="opt" data-i="0">Instance</button><button class="opt" data-i="1">Class</button>
        <div class="fb"><b>Instance</b> — there's no <code>static</code>, so it's an instance method (called on an object).</div></div>
      <div class="q"><p><span class="tag">Q10 · Fill</span>Return type (write "none" if no return)? <input type="text" class="fillblank sm" data-answer="string[]" placeholder="?" style="width:110px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>String[]</b> (capital S).</div></div>
      <div class="q"><p><span class="tag">Q11 · Fill</span>How many arguments does a call require? <input type="text" class="fillblank sm" data-answer="2~~~two" placeholder="?" style="width:70px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>2</b> (int x, int y).</div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">Q12 · MC</span>Could this method be called by code outside the class where it is defined?</div>
        <button class="opt" data-i="0">Yes</button><button class="opt" data-i="1">No</button>
        <div class="fb"><b>Yes</b> — <code>protected</code> allows access from the same package and subclasses, which are outside the class itself.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">Q13 · MC</span><code>"rip" == "Triple T".substring(1,4)</code> evaluates to?</div>
        <button class="opt" data-i="0">true</button><button class="opt" data-i="1">false</button>
        <div class="fb"><b>false.</b> <code>substring(1,4)</code> does give "rip", but <code>==</code> on Strings compares <b>references (addresses)</b>, not contents — they're different objects. (Use <code>.equals()</code> for value comparison.)</div></div>
      <div class="q"><p><span class="tag">Q14 · Fill</span>Big O notation expresses the <input type="text" class="fillblank sm" data-answer="upper" placeholder="?" style="width:90px"> bound of an algorithm's time or space complexity.</p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>upper</b> bound.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q15 · What is printed?</h3>
        <pre>String[] words1 = {"a", "b", "c"};
String[] words2 = {"x", "y", "z"};
words2 = words1;
words1[2] = "hello";
words2[0] = "world";
System.out.println(words1[0]);
System.out.println(words1[2]);
System.out.println(words2[0]);
System.out.println(words2[2]);</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>world
hello
world
hello</pre><div class="concept"><code>words2 = words1</code> makes both names point to the <b>same array</b>. So <code>words1[2]="hello"</code> and <code>words2[0]="world"</code> both modify that one array. Aliasing!</div></div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q16 · Write a program that prints 1–10 using a loop (from scratch)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre><span class="kw">public class</span> <span class="ty">Program</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="nm">1</span>; i &lt; <span class="nm">11</span>; i++) {
            System.out.println(i);
        }
    }
}</pre><div class="concept">Watch for: capital class name, the <b>main</b> method header <code>public static void main(String[] args)</code>, and <code>int i</code> (declare the type) in the loop.</div></div></div>
    </div>
  </section>

  <!-- ===================== QUIZ 2 ===================== -->
  <section class="topic" id="qz-2">
    <h2>Quiz 2 — Memory, OOP, ADTs, Big-O (L4–L8)</h2>
    <div class="card">
      <div class="card" style="background:none;border:none;padding:0"><h3>Q1 · Stack &amp; heap at a breakpoint (5 pts)</h3>
        <pre>main: int time=1400; checkWatch(time); boolean atSchool=true;
checkWatch(int hour): int time=1500; String[] tasks={"quiz","hw","sleep"}; checkClock(time);
checkClock(int hour): int time=1600; println(time);</pre>
        <p class="muted">Breakpoint on the println line — what do stack &amp; heap look like, and what prints?</p>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept"><b>Stack</b> (bottom → top = main, checkWatch, checkClock frames):
          <br>· main: time=1400, atSchool=true
          <br>· checkWatch: hour=1400, time=1500, tasks=(reference →)
          <br>· checkClock: hour=1500, time=1600
          <br><b>Heap:</b> the <code>String[]</code> object {0:"quiz", 1:"hw", 2:"sleep"} that <code>tasks</code> points to.
          <br><b>Output: 1600</b> (checkClock's local time). Note each method has its own local <code>time</code>; passing <code>time</code> copies the value into <code>hour</code>.</div></div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q2 · The 5 components of a class, top to bottom (2 pts)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept"><b>Instance Field → Class Field → Constructor → Instance Method → Class Method.</b></div></div></div>
      <div class="q"><p><span class="tag">Q3 · Fill</span>What is the universal reference type? <input type="text" class="fillblank sm" data-answer="object" placeholder="?" style="width:110px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>Object</b> — every reference type is a subclass of Object.</div></div>
      <div class="q"><p><span class="tag">Q4 · Fill</span>What is the universal reference value? <input type="text" class="fillblank sm" data-answer="null" placeholder="?" style="width:90px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>null</b> — any reference variable can hold null.</div></div>
      <div class="q"><p><span class="tag">Q5 · Fill</span>The purpose of an ADT is to separate the abstract <input type="text" class="fillblank sm" data-answer="behavior" placeholder="?" style="width:110px"> of a data type from its concrete <input type="text" class="fillblank sm" data-answer="implementation~~~implementation." placeholder="?" style="width:140px">.</p><button class="btn small" onclick="checkFillGroup(this)">Check both</button><div class="fb">To separate the abstract <b>behavior</b> (what) from its concrete <b>implementation</b> (how).</div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">Q6 · MC</span>A single ADT can have how many implementations?</div>
        <button class="opt" data-i="0">Exactly 1</button><button class="opt" data-i="1">At most 2</button><button class="opt" data-i="2">Infinitely many (∞)</button>
        <div class="fb"><b>Infinitely many.</b> e.g. the List ADT → ArrayList, LinkedList, and any other valid implementation.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q7 · An object has an is-a relationship with (can be typed as) which 3 things? (2 pts)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept"><b>Its class, any interfaces its class implements, and its class' superclasses.</b></div></div></div>
      <div class="q" data-tf="F"><div class="prompt"><span class="tag">Q8 · T/F</span>To reference a static field, one would first need an instance of that class to be constructed.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>False.</b> Static (class) members belong to the class itself — access them via <code>ClassName.field</code> with no instance.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">Q9 · MC</span>Best-case time complexity of quick sort?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n log n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n log n)</b> — balanced partitions give log n levels of O(n) work.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">Q10 · MC</span>Average-case time complexity of quick sort?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n log n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n log n)</b>.</div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">Q11 · MC</span>Worst-case time complexity of quick sort?</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n log n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n²)</b> — presorted input with a bad pivot gives maximally unbalanced partitions.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q12 · Time complexity of the method in terms of n and x (3 pts)</h3>
        <pre>if (n % 2 == 0) {
    for (i = 0; i &lt; n; i++)        // O(n)
        for (j = i; j &gt; 0; j--)    // O(n)
            counter++;                // → O(n²)
} else {
    for (k = x; k &lt; x*3; k++)      // O(x³ region)
        for (m = ...; ...; m++)      // O(x²)
            counter++;                // → O(x⁵)
}</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept"><b>O(n² + x⁵).</b> The two branches are independent; for worst-case Big-O you sum the dominant term of each: the <code>if</code> branch is O(n²), the <code>else</code> branch's nested loops multiply to O(x⁵). Combined: <b>O(n² + x⁵)</b>.</div></div></div>
    </div>
  </section>

  <!-- ===================== QUIZ 3 ===================== -->
  <section class="topic" id="qz-3">
    <h2>Quiz 3 — Generics, Lists, Stacks/Queues, Trees, Heaps (L8–L12)</h2>
    <div class="card">
      <div class="concept">Q1 uses: <code>interface Flower&lt;T&gt;</code> and <code>class Tulip implements Flower&lt;Bee&gt;</code>.</div>
      <div class="q"><p><span class="tag">Q1 · Fill</span>Declare a Flower object instantiated as a Tulip:</p>
        <p><input type="text" class="fillblank" data-answer="flower<bee> x = new tulip<>();~~~flower<bee> x = new tulip();" placeholder="Flower<...> x = new Tulip<>();" style="width:100%"></p>
        <button class="btn small" onclick="checkFill(this)">Check</button>
        <div class="fb"><code>Flower&lt;Bee&gt; x = new Tulip&lt;&gt;();</code> — declared type is the interface with its type argument; instantiated as the concrete Tulip.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q2 · Which of the following are ADTs? (categorize)</h3>
        <table class="match" id="qz3-adt">
          <tr><td class="match-term">List</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">ArrayList</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">LinkedList</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">Stack</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">Queue</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">Binary Tree</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">Binary Search Tree</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">Priority Queue</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">Binary Min Tree</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
          <tr><td class="match-term">Binary Heap</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation / structure</option></select></td></tr>
        </table>
        <button class="btn small" style="margin-top:8px" onclick="checkMatch('qz3-adt','fb-qz3-adt',['a','i','i','a','a','i','i','a','i','i'])">Check</button>
        <div class="fb" id="fb-qz3-adt">The ADTs are <b>List, Stack, Queue, Priority Queue</b>. Everything else is a concrete structure/implementation.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q3 · Worst-case time complexities (8 pts)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><table class="cmp"><tr><th>Method</th><th>ArrayList</th><th>LinkedList (singly, no tail)</th></tr>
          <tr><td>get(0)</td><td>O(1)</td><td>O(1)</td></tr>
          <tr><td>get(i)</td><td>O(1)</td><td>O(n)</td></tr>
          <tr><td>add(0)</td><td>O(n)</td><td>O(1)</td></tr>
          <tr><td>add(i)</td><td>O(n)</td><td>O(n)</td></tr></table></div></div>
      <div class="q"><p><span class="tag">Q4 · Explain</span>Why is worst-case <code>add(i)</code> on an ArrayList O(n)?</p>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept">You might add to a <b>full</b> array, forcing a new (larger) array to be allocated and every element <b>copied over</b> — O(n). (Also, inserting at index i shifts the elements after it.)</div></div></div>
      <div class="q"><p><span class="tag">Q5 · Explain</span>Why is worst-case <code>add(i)</code> on a LinkedList O(n)?</p>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept">You may have to <b>traverse the entire list</b> to reach index i (no random access), and only then relink the pointers.</div></div></div>
      <div class="concept" style="margin-top:6px">Q6–7 use: <code>push(5); push(10); pop(); push(7); pop();</code></div>
      <div class="q"><p><span class="tag">Q6 · Fill</span>What element is returned by the 2nd pop (line 5)? <input type="text" class="fillblank sm" data-answer="7" placeholder="?" style="width:60px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>7</b> — stack is LIFO. After push5,push10,pop(→10),push7, top is 7; pop returns 7.</div></div>
      <div class="q"><p><span class="tag">Q7 · Fill</span>Contents of the stack after line 5? <input type="text" class="fillblank sm" data-answer="5" placeholder="?" style="width:60px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>5</b> — only the original 5 remains.</div></div>
      <div class="q" data-mc="3"><div class="prompt"><span class="tag">Q8 · MC</span>Best implementation of a Queue?</div>
        <button class="opt" data-i="0">ArrayList that enqueues at the head and dequeues at the tail</button>
        <button class="opt" data-i="1">ArrayList that enqueues at the tail and dequeues at the head</button>
        <button class="opt" data-i="2">LinkedList that enqueues at the head and dequeues at the tail</button>
        <button class="opt" data-i="3">LinkedList that enqueues at the tail and dequeues at the head</button>
        <div class="fb"><b>LinkedList, enqueue at tail, dequeue at head</b> — both ends are O(1) on a linked list (with a tail pointer). An ArrayList would be O(n) at the head.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q9 · Which are invariants of a BST? (2 pts)</h3>
        <table class="match" id="qz3-bst">
          <tr><td class="match-term">Root value smaller than all values in the left subtree</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
          <tr><td class="match-term">Root value smaller than all values in the right subtree</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
          <tr><td class="match-term">Root value larger than all values in the left subtree</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
          <tr><td class="match-term">Root value larger than all values in the right subtree</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
          <tr><td class="match-term">The left child is non-empty</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
          <tr><td class="match-term">The right child is non-empty</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
          <tr><td class="match-term">The left child is a BST</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
          <tr><td class="match-term">The right child is a BST</td><td><select class="match-def"><option value="">—</option><option value="y">Invariant</option><option value="n">Not an invariant</option></select></td></tr>
        </table>
        <button class="btn small" style="margin-top:8px" onclick="checkMatch('qz3-bst','fb-qz3-bst',['n','y','y','n','n','n','y','y'])">Check</button>
        <div class="fb" id="fb-qz3-bst">Invariants: root &lt; all right-subtree values, root &gt; all left-subtree values, and both children are themselves BSTs. Children need not be non-empty.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q10 · Insert 10, 90, 5, 45, 1, 70 into an empty BST (3 pts)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>        10
       /    \\
      5      90
     /      /
    1      45
             \\
             70</pre></div></div>
      <div class="q"><p><span class="tag">Q11 · Fill</span>In-order traversal of that tree: <input type="text" class="fillblank" data-answer="1,5,10,45,70,90~~~1, 5, 10, 45, 70, 90" placeholder="?" style="width:230px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>1, 5, 10, 45, 70, 90</b> — in-order of a BST is sorted ascending.</div></div>
      <div class="q"><p><span class="tag">Q12 · Fill</span>Post-order traversal: <input type="text" class="fillblank" data-answer="1,5,70,45,90,10~~~1, 5, 70, 45, 90, 10" placeholder="?" style="width:230px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>1, 5, 70, 45, 90, 10</b> (left, right, root).</div></div>
      <div class="q"><p><span class="tag">Q13 · Fill</span>Breadth-first (level-order) traversal: <input type="text" class="fillblank" data-answer="10,5,90,1,45,70~~~10, 5, 90, 1, 45, 70" placeholder="?" style="width:230px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>10, 5, 90, 1, 45, 70</b> (level by level, using a FIFO queue).</div></div>
      <div class="q"><p><span class="tag">Q14 · Fill</span>Binary heap node at index i — index of its parent? <input type="text" class="fillblank sm" data-answer="(i-1)/2~~~floor((i-1)/2)~~~(i - 1) / 2" placeholder="?" style="width:130px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>⌊(i − 1) / 2⌋</b> (integer division).</div></div>
      <div class="q"><p><span class="tag">Q15 · Fill</span>Index of its right child? <input type="text" class="fillblank sm" data-answer="2i+2~~~2*i+2~~~(i*2)+2~~~2i + 2" placeholder="?" style="width:120px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>2i + 2</b> (left child is 2i + 1).</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q16 · Draw the result of remove(10) on the BST (3 pts)</h3>
        <pre>Before:            10
                 /    \\
                7      20
               / \\    /  \\
              4   9  16   24
               \\       \\
                5       18</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>After (replace 10 with in-order successor 16;
       16's old right child 18 takes its place):
                   16
                 /    \\
                7      20
               / \\    /  \\
              4   9  18   24
               \\
                5</pre><div class="concept">Removing a node with two children: replace its value with the <b>in-order successor</b> (smallest value in the right subtree = 16), then delete that successor from the right subtree.</div></div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q17 · Draw the result of dequeue() on the Binary Min Tree (3 pts)</h3>
        <pre>Before:          3
               /   \\
              13     9
             /  \\     \\
            14   26    20
            /
           35</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>After (remove min root 3; move last node 35 up,
       then sift down swapping with smaller child):
                 9
               /   \\
              13     20
             /  \\    /
            14   26 35</pre><div class="concept">dequeue removes the min (root 3). The last node (35) moves to the root and sifts down: 35↔9 (9 up), then 35↔20 (20 up), leaving 35 as a leaf under 20.</div></div></div>
    </div>
  </section>

  <!-- ===================== QUIZ 4 ===================== -->
  <section class="topic" id="qz-4">
    <h2>Quiz 4 — BuildHeap, AVL, Red-Black, Hashing (L12–L17)</h2>
    <div class="card">
      <div class="card" style="background:none;border:none;padding:0"><h3>Q1 · Basic pseudocode for BuildHeap (5 pts) — may call bubbleDown</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre><span class="kw">public static void</span> <span class="fn">buildHeap</span>(List&lt;Integer&gt; list) {
    <span class="cm">// start at the last parent, go up to the root</span>
    <span class="kw">for</span> (<span class="ty">int</span> i = list.size()/<span class="nm">2</span> - <span class="nm">1</span>; i &gt;= <span class="nm">0</span>; i--) {
        bubbleDown(i);
    }
}</pre><div class="concept">Bottom-up: heapify from the last parent index down to 0, sifting each node down. This is O(n).</div></div></div>
      <div class="concept">Q2–3 use this AVL tree: root 14; left 8 (child 3); right 33 (left 18→right 22, right 67→children 48, 70).</div>
      <div class="q"><p><span class="tag">Q2 · Fill</span>If you insert 20, at which node does the first imbalance appear? (write "none" if balanced) <input type="text" class="fillblank sm" data-answer="18" placeholder="?" style="width:80px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>18.</b> 20 becomes the left child of 22 (right child of 18); node 18 becomes unbalanced (an RL case).</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q3 · Draw the resulting tree after 40 is inserted (3 pts)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Insert 40 → left of 48. Node 14 becomes -2 (right-heavy,
RR case) → rotate left at 14. Result:
              33
            /    \\
          14      67
         /  \\    /  \\
        8   18  48   70
       /     \\  /
      3      22 40</pre><div class="concept">(Confirmed by the graded rubric.) Only one rotation — a single left rotation at the root 14 — restores balance; 33 becomes the new root.</div></div></div>
      <div class="concept">Q4–6 use a red-black tree: root 16(B); 10, 30; 5, 14, 22, 90; 90→57, 98; 57→42, 60.</div>
      <div class="q"><p><span class="tag">Q4 · Fill</span>What is the black height of the tree? <input type="text" class="fillblank sm" data-answer="2~~~3" placeholder="?" style="width:70px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>2</b> (accepted: 2 or 3 depending on whether you count the root/NIL). Black height = number of black nodes on a root-to-NIL path, not counting the start.</div></div>
      <div class="q"><p><span class="tag">Q5 · Fill</span>Black height of node 30 (not including node 30)? <input type="text" class="fillblank sm" data-answer="1~~~2" placeholder="?" style="width:70px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>1</b> (accepted: 1 or 2).</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q6 · Draw the resulting tree after 16 is deleted (4 pts)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept">Delete root 16 → replace with in-order successor 22, then repair red-black invariants (recolor / rotate to resolve any double-black). The result is a valid red-black tree rooted at 22 with 10 (children 5, 14) on the left and the 30/90/57/98/42/60 structure rebalanced on the right. This is a full RB-deletion drawing problem — practice it with the animated deletion walkthrough in <b>Lesson 14</b>.</div></div></div>
      <div class="q" data-tf="T"><div class="prompt"><span class="tag">Q7 · T/F</span>Red-black trees are used more commonly than AVL trees because they are faster.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>True</b> (per this course) — red-black trees rebalance with <b>fewer rotations</b>, making insert/delete faster, so they're the common default (e.g. TreeMap). Nuance: AVL trees are actually faster for <i>search</i> because they're more tightly balanced.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q8 · Chaining hash table, insert at head. h(k)=k mod 7; insert 1, 5, 12, 8, 15 (3 pts)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>index 0: (empty)
index 1: 15 → 8 → 1
index 2: (empty)   index 3: (empty)   index 4: (empty)
index 5: 12 → 5
index 6: (empty)</pre><div class="concept">1→1, 5→5, 12→5 (collision, prepend), 8→1, 15→1. Head insertion puts the newest at the front of each chain.</div></div></div>
      <div class="q"><p><span class="tag">Q9 · Fill</span>Load factor of that table? <input type="text" class="fillblank sm" data-answer="5/7~~~0.71~~~.71" placeholder="?" style="width:80px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>5/7</b> (N = 5 elements, M = 7 slots).</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q10 · Double hashing table (4 pts). h1(k)=k mod 7, h2(k)=1+(k mod 3), h(i,k)=(h1(k)+i·h2(k)) mod 7; insert 1, 5, 12, 8, 15</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>1  → h1=1                          → index 1
5  → h1=5                          → index 5
12 → h1=5 (taken); i=1: h2=1+(12%3)=1 → (5+1)%7=6 → index 6
8  → h1=1 (taken); i=1: h2=1+(8%3)=3  → (1+3)%7=4 → index 4
15 → h1=1 (taken); i=1: h2=1+(15%3)=1 → (1+1)%7=2 → index 2

index: 0(-) 1:1  2:15  3(-)  4:8  5:5  6:12</pre><div class="concept">Each collision re-probes by adding i·h2(k). Double hashing gives each key its own step size, avoiding clustering.</div></div></div>
      <div class="q"><p><span class="tag">Q11 · Fill</span>Load factor of that table? <input type="text" class="fillblank sm" data-answer="5/7~~~0.71~~~.71" placeholder="?" style="width:80px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>5/7</b>.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">Q12 · MC</span>In a chaining hash table, the load factor tells us the…</div>
        <button class="opt" data-i="0">Max chain length</button><button class="opt" data-i="1">Average chain length</button><button class="opt" data-i="2">Probability of collisions</button><button class="opt" data-i="3">Fraction of table space used</button>
        <div class="fb"><b>Average chain length</b> = N/M (elements per bucket on average).</div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">Q13 · MC</span>In a chaining hash table, a table with load factor greater than 1 is…</div>
        <button class="opt" data-i="0">Possible, because each slot can store a chain of multiple keys</button><button class="opt" data-i="1">Only possible if there are no collisions</button><button class="opt" data-i="2">Impossible</button>
        <div class="fb"><b>Possible</b> — chaining lets each slot hold a linked list, so N can exceed M. (Probing, by contrast, caps load at ≤ 1.)</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>Q14 · Complexity table — fill in amortized (left) / worst case (right) (9 pts)</h3>
        <p class="muted">Type each Big-O from memory (e.g. <code>O(1)</code>, <code>O(log n)</code>, <code>O(n)</code>). Spelling of spaces doesn't matter.</p>
        <table class="cmp">
          <tr><th></th><th>Heaps (resizing)<br>amort / worst</th><th>Balanced BSTs<br>amort / worst</th><th>Hash Tables (resizing)<br>amort / worst</th></tr>
          <tr><td>Insert</td>
            <td><input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(n)~~~n" placeholder="?"></td>
            <td><input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"></td>
            <td><input type="text" class="q14-blank" data-answer="O(1)~~~1~~~constant" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(n)~~~n" placeholder="?"></td></tr>
          <tr><td>Search</td>
            <td><input type="text" class="q14-blank" data-answer="O(n)~~~n" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(n)~~~n" placeholder="?"></td>
            <td><input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"></td>
            <td><input type="text" class="q14-blank" data-answer="O(1)~~~1~~~constant" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(n)~~~n" placeholder="?"></td></tr>
          <tr><td>Delete (min)</td>
            <td><input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(n)~~~n" placeholder="?"></td>
            <td><input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(log n)~~~logn~~~log n" placeholder="?"></td>
            <td><input type="text" class="q14-blank" data-answer="O(1)~~~1~~~constant" placeholder="?"> / <input type="text" class="q14-blank" data-answer="O(n)~~~n" placeholder="?"></td></tr>
        </table>
        <div class="toolbar" style="margin-top:8px">
          <button class="btn small" onclick="q14Check()">Check all</button>
          <button class="btn ghost small" onclick="q14Reveal()">Reveal answers</button>
          <button class="btn ghost small" onclick="q14Clear()">Clear</button>
        </div>
        <div class="fb" id="fb-q14"></div>
        <div class="toolbar" style="margin-top:6px"><button class="btn ghost small" onclick="toggleReveal(this)">Explain the reasoning</button></div>
        <div class="reveal"><div class="concept">
          <b>Heaps (resizing).</b> <u>Insert</u> = add at the end + sift up along the height → <b>O(log n)</b>; the <b>worst case O(n)</b> happens only when the backing array is full and must be resized (copy all n elements) — but that resize is rare, so it <b>amortizes back to O(log n)</b>. <u>Search</u> (for an arbitrary value) is <b>O(n)</b> either way — a heap only orders parent-vs-child, not left-vs-right, so there's no way to prune; you may scan every node. <u>Delete-min</u> = remove the root, move the last element up, sift down → <b>O(log n)</b>, with the same O(n) resize worst case.
          <br><br><b>Balanced BSTs (AVL / Red-Black).</b> Every operation follows a single root-to-leaf path, and the balancing keeps the height at O(log n). There's <b>no array to resize</b>, so amortized and worst case are <b>both O(log n)</b> for insert, search, and delete.
          <br><br><b>Hash tables (resizing).</b> With a good hash function and a bounded load factor, each bucket holds ~a constant number of items, so insert/search/delete are <b>O(1) amortized</b>. The <b>worst case is O(n)</b> — either every key collides into one bucket/cluster, or an insert triggers a resize that rehashes all n elements. Because resizing only happens occasionally (doubling), it amortizes away to O(1).
          <br><br><b>The pattern:</b> the two <i>resizing</i> structures (heap, hash table) show a gap between amortized and worst case because of the rare O(n) resize; the balanced BST needs no resizing, so its two columns match.
        </div></div></div>
    </div>
  </section>

  <!-- ===================== PRACTICE EXAM A ===================== -->
  <section class="topic" id="qz-exA">
    <h2>★ Practice Exam A — Comprehensive (new questions, quiz-style)</h2>
    <div class="concept">Original questions in the same style and difficulty as the four quizzes, spanning L1–L21. Work them on paper first, then reveal.</div>
    <div class="card">
      <div class="q"><p><span class="tag">A1 · Fill</span>Convert <code>0b1101001</code> to hexadecimal: <code>0x</code><input type="text" class="fillblank sm" data-answer="69" placeholder="?" style="width:70px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>0x69.</b> Group in 4s from right: 110 1001 → 0110 1001 = 6, 9. (= 105.)</div></div>
      <div class="q"><p><span class="tag">A2 · Fill</span>"Hi" in decimal ASCII is <input type="text" class="fillblank sm" data-answer="72" placeholder="H" style="width:55px"> <input type="text" class="fillblank sm" data-answer="105" placeholder="i" style="width:55px"></p><button class="btn small" onclick="checkFillGroup(this)">Check</button><div class="fb"><b>72, 105.</b> H = 72 (uppercase start 65, H is 8th letter → 72). i = 105 (lowercase start 97, i is 9th → 105).</div></div>
      <div class="q" data-tf="F"><div class="prompt"><span class="tag">A3 · T/F</span>Primitive values are stored in heap memory, while reference variables are stored in stack memory.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>False.</b> Primitives and reference <i>variables</i> both live in the stack; the reference variable holds an <b>address</b> that points to the object in the <b>heap</b>.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">A4 · MC</span>What does <code>javac</code> produce, and what runs it?</div>
        <button class="opt" data-i="0">Native machine code, run by the CPU directly</button>
        <button class="opt" data-i="1">Bytecode (.class), run by the JVM (java interpreter + JIT)</button>
        <button class="opt" data-i="2">An interpreted script, run line-by-line by javac</button>
        <div class="fb"><b>Bytecode</b>, executed at runtime by the JVM — the <code>java</code> interpreter plus the JIT compiler.</div></div>
      <div class="q"><p><span class="tag">A5 · Fill</span>Write a getter for a private field <code>int _age</code>: <input type="text" class="fillblank" data-answer="public int getage() { return _age; }~~~public int getage(){return _age;}~~~public int getage() {return _age;}" placeholder="public ... { ... }" style="width:100%"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><code>public int getAge() { return _age; }</code></div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">A6 · MC</span>What is the average-case time complexity of binary search?</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(log n)</button>
        <div class="fb"><b>O(log n)</b> — it halves the search space each step (requires a sorted array).</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>A7 · Time complexity in terms of n</h3>
        <pre>for (int i = 0; i &lt; n; i++)
    for (int j = 0; j &lt; n; j++)
        for (int k = 0; k &lt; 100; k++)
            sum++;</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept"><b>O(n²).</b> The outer two loops are n·n; the innermost runs a constant 100 times → drops out of Big-O. n·n·100 = O(n²).</div></div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>A8 · Insert 50, 30, 70, 20, 40, 60 into an empty BST; give the in-order and level-order traversals</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>        50
       /    \\
      30     70
     /  \\    /
    20   40 60

in-order:    20, 30, 40, 50, 60, 70
level-order: 50, 30, 70, 20, 40, 60</pre></div></div>
      <div class="q"><p><span class="tag">A9 · Fill</span>In a 0-indexed array heap, the left child of index i is at <input type="text" class="fillblank sm" data-answer="2i+1~~~2*i+1~~~(i*2)+1~~~2i + 1" placeholder="?" style="width:110px">.</p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>2i + 1</b> (right child 2i + 2, parent ⌊(i−1)/2⌋).</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">A10 · MC</span>buildHeap on an array of n elements is…</div>
        <button class="opt" data-i="0">O(n log n)</button><button class="opt" data-i="1">O(n)</button><button class="opt" data-i="2">O(log n)</button>
        <div class="fb"><b>O(n)</b> bottom-up — most nodes are near the bottom with tiny sift-downs.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>A11 · AVL: insert 10, 20, 30 into an empty AVL tree. What rotation happens, and what's the result?</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Inserting 30 makes 10 right-heavy (BF -2), 20 right-heavy →
RR case → single LEFT rotation at 10:
        20
       /  \\
      10   30</pre></div></div>
      <div class="q"><p><span class="tag">A12 · Fill</span>The maximum height of a red-black tree with n nodes is <input type="text" class="fillblank sm" data-answer="2log2(n+1)~~~2log(n+1)~~~2*log2(n+1)~~~2log₂(n+1)" placeholder="?" style="width:150px">.</p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>2·log₂(n + 1)</b> — the longest path is at most twice the shortest.</div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">A13 · MC</span>M = 8, quadratic probing h(k,i) = (k + i²) mod 8. Insert 4, 12, 20. Where does 20 land?</div>
        <button class="opt" data-i="0">index 4</button><button class="opt" data-i="1">index 5</button><button class="opt" data-i="2">index 0</button>
        <div class="fb"><b>index 0.</b> 4→4. 12→ 4 taken; i=1: (12+1)%8=5. 20→ (20)%8=4 taken; i=1: (20+1)%8=5 taken; i=2: (20+4)%8=0 → free.</div></div>
      <div class="q" data-tf="F"><div class="prompt"><span class="tag">A14 · T/F</span>An adjacency matrix uses O(n + m) space.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>False.</b> A matrix is always O(n²). Adjacency <i>lists</i> use O(n + m).</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>A15 · BFS from A (neighbors alphabetical). Edges: A-B, A-C, B-D, C-D, D-E. Give d(v) for all vertices.</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>d(A)=0, d(B)=1, d(C)=1, d(D)=2, d(E)=3</pre><div class="concept">A→{B,C} at 1; B→D and C→D give D at 2 (first reached wins); D→E gives E at 3.</div></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">A16 · MC</span>Your graph is weighted with some negative edges (no negative cycle). Which shortest-path algorithm?</div>
        <button class="opt" data-i="0">Dijkstra's</button><button class="opt" data-i="1">Bellman-Ford</button><button class="opt" data-i="2">BFS</button>
        <div class="fb"><b>Bellman-Ford</b> — handles negative weights (O(nm)). Dijkstra breaks on negatives; BFS ignores weights.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">A17 · MC</span>Kruskal's algorithm is generally preferred for which graphs, and why?</div>
        <button class="opt" data-i="0">Dense graphs, because it grows one tree</button>
        <button class="opt" data-i="1">Sparse graphs, because sorting few edges (O(m log m)) is cheap</button>
        <button class="opt" data-i="2">Cyclic graphs, because it detects cycles</button>
        <div class="fb"><b>Sparse graphs</b> — its cost is dominated by sorting the m edges. Prim's is preferred for dense graphs.</div></div>
    </div>
  </section>

  <!-- ===================== PRACTICE EXAM B ===================== -->
  <section class="topic" id="qz-exB">
    <h2>★ Practice Exam B — Comprehensive (new questions, quiz-style)</h2>
    <div class="concept">A second full-length practice set. Different numbers and angles on the same skills.</div>
    <div class="card">
      <div class="q"><p><span class="tag">B1 · Fill</span>Convert <code>0x3F</code> to decimal: <input type="text" class="fillblank sm" data-answer="63" placeholder="?" style="width:70px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>63.</b> 3×16 + 15 = 63.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">B2 · MC</span>Which best describes an ADT?</div>
        <button class="opt" data-i="0">A specific data structure with a fixed memory layout</button>
        <button class="opt" data-i="1">An interface defining behavior, separate from any concrete implementation</button>
        <button class="opt" data-i="2">A primitive type built into Java</button>
        <div class="fb"><b>An interface defining behavior</b> (the "what"), separate from implementation (the "how"). e.g. List, Stack, Queue, Map, Priority Queue.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>B3 · Categorize: ADT or Implementation?</h3>
        <table class="match" id="exB-adt">
          <tr><td class="match-term">Priority Queue</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation</option></select></td></tr>
          <tr><td class="match-term">Binary Heap</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation</option></select></td></tr>
          <tr><td class="match-term">Map</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation</option></select></td></tr>
          <tr><td class="match-term">HashMap</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation</option></select></td></tr>
          <tr><td class="match-term">Graph</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation</option></select></td></tr>
          <tr><td class="match-term">Adjacency List</td><td><select class="match-def"><option value="">—</option><option value="a">ADT</option><option value="i">Implementation</option></select></td></tr>
        </table>
        <button class="btn small" style="margin-top:8px" onclick="checkMatch('exB-adt','fb-exB-adt',['a','i','a','i','a','i'])">Check</button>
        <div class="fb" id="fb-exB-adt">ADTs: Priority Queue, Map, Graph. Implementations: Binary Heap, HashMap, Adjacency List.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">B4 · MC</span><code>"cat".equals("cat")</code> vs <code>"cat" == "cat"</code> — which reliably compares contents?</div>
        <button class="opt" data-i="0"><code>==</code></button><button class="opt" data-i="1"><code>.equals()</code></button><button class="opt" data-i="2">Both identical</button>
        <div class="fb"><b>.equals()</b> compares character contents; <code>==</code> compares references (addresses).</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>B5 · Worst-case complexity table — fill from memory</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><table class="cmp"><tr><th>Method</th><th>ArrayList</th><th>LinkedList (singly, no tail)</th></tr>
          <tr><td>get(i)</td><td>O(1)</td><td>O(n)</td></tr>
          <tr><td>add(0)</td><td>O(n)</td><td>O(1)</td></tr>
          <tr><td>add(end), amortized</td><td>O(1)</td><td>O(n) (no tail)</td></tr>
          <tr><td>remove(0)</td><td>O(n)</td><td>O(1)</td></tr></table></div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">B6 · MC</span>A stack is best described as…</div>
        <button class="opt" data-i="0">LIFO — last in, first out</button><button class="opt" data-i="1">FIFO — first in, first out</button><button class="opt" data-i="2">Sorted by priority</button>
        <div class="fb"><b>LIFO.</b> push/pop/peek at one end. (A queue is FIFO.)</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>B7 · Insert 8, 3, 10, 1, 6, 14, 4 into a BST. Give the post-order traversal.</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>        8
       / \\
      3    10
     / \\     \\
    1   6     14
       /
      4

post-order (left, right, root): 1, 4, 6, 3, 14, 10, 8</pre></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">B8 · MC</span>removeMin on a binary min-heap is…</div>
        <button class="opt" data-i="0">O(1)</button><button class="opt" data-i="1">O(log n)</button><button class="opt" data-i="2">O(n)</button>
        <div class="fb"><b>O(log n)</b> — swap the last element to the root and sift down. (peek is O(1).)</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>B9 · AVL: insert 30, 20, 10 into an empty AVL tree. Rotation and result?</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Inserting 10 makes 30 left-heavy (LL case) →
single RIGHT rotation at 30:
        20
       /  \\
      10   30</pre></div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">B10 · MC</span>Which rotation fixes an AVL "left-right" (LR) imbalance?</div>
        <button class="opt" data-i="0">Rotate the child left, then rotate the node right</button>
        <button class="opt" data-i="1">A single left rotation</button>
        <button class="opt" data-i="2">A single right rotation</button>
        <div class="fb"><b>Left on the child, then right on the node</b> — a double rotation. (RL is the mirror: right on child, then left on node.)</div></div>
      <div class="q" data-tf="T"><div class="prompt"><span class="tag">B11 · T/F</span>When collision probability is high, chaining generally degrades more gracefully than linear probing.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>True.</b> At high load, probing suffers heavy clustering (and can fail), while chaining just grows its linked lists.</div></div>
      <div class="q"><p><span class="tag">B12 · Fill</span>A hash table resizes when the load factor N/M exceeds a threshold T. For probing, the recommended T is <input type="text" class="fillblank sm" data-answer="0.75~~~.75~~~75%" placeholder="?" style="width:80px">.</p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>0.75</b> (chaining uses 1.0).</div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">B13 · MC</span>A DAG's topological sort is found in… time.</div>
        <button class="opt" data-i="0">O(n²)</button><button class="opt" data-i="1">O(n log n)</button><button class="opt" data-i="2">O(n + m)</button>
        <div class="fb"><b>O(n + m)</b> with Kahn's algorithm (queue of in-degree-0 vertices). Each vertex and edge is handled once.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>B14 · Dijkstra from A. Edges (directed, weighted): A→B(1), A→C(4), B→C(2), B→D(5), C→D(1). Give final shortest distances.</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>d(A)=0
d(B)=1  (A→B)
d(C)=3  (A→B→C = 1+2, better than A→C = 4)
d(D)=4  (A→B→C→D = 3+1, better than A→B→D = 6)</pre></div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">B15 · MC</span>What does Bellman-Ford return if it finds an edge that can still be relaxed after n−1 passes?</div>
        <button class="opt" data-i="0">FALSE — a negative-weight cycle exists</button>
        <button class="opt" data-i="1">TRUE — the shortest paths are valid</button>
        <button class="opt" data-i="2">The shortest path tree</button>
        <div class="fb"><b>FALSE</b> — still-improving after n−1 passes means a negative cycle, so no shortest path is defined.</div></div>
      <div class="q"><p><span class="tag">B16 · Fill</span>A greedy algorithm makes the best <input type="text" class="fillblank sm" data-answer="local" placeholder="?" style="width:80px"> choice at each step to reach the best <input type="text" class="fillblank sm" data-answer="global" placeholder="?" style="width:80px"> solution.</p><button class="btn small" onclick="checkFillGroup(this)">Check both</button><div class="fb"><b>local → global.</b> Kruskal's, Prim's, and Dijkstra's are all greedy.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">B17 · MC</span>Which pair correctly matches ADT → an implementation?</div>
        <button class="opt" data-i="0">HashMap → Map</button>
        <button class="opt" data-i="1">Priority Queue → Binary Heap</button>
        <button class="opt" data-i="2">Adjacency List → Graph</button>
        <div class="fb"><b>Priority Queue → Binary Heap</b> (ADT → implementation). The others are written backwards: it's HashMap implements Map, and Adjacency List implements Graph.</div></div>
    </div>
  </section>

  <!-- ===================== EXAM C ===================== -->
  <section class="topic" id="qz-exC">
    <h2>★★ Practice Exam C — Harder (memory, complexity, trees)</h2>
    <div class="concept">Tougher, multi-step questions. Work them fully on paper before revealing.</div>
    <div class="card">
      <div class="q"><p><span class="tag">C1 · Fill</span>Convert <code>0b11011010</code> to hex: <code>0x</code><input type="text" class="fillblank sm" data-answer="da" placeholder="?" style="width:70px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>0xDA.</b> 1101→D, 1010→A. (= 218.)</div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">C2 · MC</span>Which line compiles <b>without</b> a cast? <code>int i; double d;</code></div>
        <button class="opt" data-i="0"><code>d = i;</code> (int → double)</button>
        <button class="opt" data-i="1"><code>i = d;</code> (double → int)</button>
        <button class="opt" data-i="2">Both</button>
        <div class="fb"><b><code>d = i;</code></b> — widening (int→double) is implicit. Narrowing (double→int) loses precision and requires an explicit cast <code>(int)</code>.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>C3 · What is printed?</h3>
        <pre>int[] a = {1, 2, 3};
int[] b = a;
b[0] = 9;
int[] c = {1, 2, 3};
System.out.println(a[0]);
System.out.println(c[0]);
System.out.println(a == b);
System.out.println(a == c);</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>9
1
true
false</pre><div class="concept"><code>b = a</code> aliases the same array, so <code>b[0]=9</code> changes <code>a[0]</code>. <code>c</code> is a separate object with equal contents. <code>==</code> compares references: a and b are the same object (true); a and c are different objects (false).</div></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">C4 · MC</span>A recurrence <code>T(n) = 2·T(n/2) + O(n)</code> solves to…</div>
        <button class="opt" data-i="0">O(n)</button><button class="opt" data-i="1">O(n log n)</button><button class="opt" data-i="2">O(n²)</button>
        <div class="fb"><b>O(n log n).</b> log n levels of recursion, each doing O(n) total work (like merge/quick sort's best case).</div></div>
      <div class="q"><p><span class="tag">C5 · Fill</span>Using naive recursion <code>fib(n)=fib(n-1)+fib(n-2)</code> (base fib(0)=fib(1)=1), how many total calls to <code>fib</code> are made to compute <code>fib(4)</code>? <input type="text" class="fillblank sm" data-answer="9" placeholder="?" style="width:60px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>9.</b> Count nodes in the call tree: C(n)=1+C(n-1)+C(n-2); C(2)=3, C(3)=5, C(4)=9. This exponential blowup is why memoization matters.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>C6 · Big-O of this loop (careful!)</h3>
        <pre>for (int i = 1; i &lt; n; i *= 2)     // i = 1,2,4,...
    for (int j = 0; j &lt; i; j++)
        work();</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept"><b>O(n).</b> The inner loop runs i times, and i doubles: 1 + 2 + 4 + … + n/2 ≈ n. The geometric sum is O(n), <b>not</b> O(n log n) — a common trap.</div></div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>C7 · AVL: insert 30, 10, 20 into an empty AVL tree. Name the case and give the result.</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>30 left-heavy, its left child 10 is right-heavy → LR case →
rotate LEFT at 10, then RIGHT at 30:
        20
       /  \\
      10   30</pre></div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>C8 · BST: remove(50) from this tree (two children)</h3>
        <pre>          50
        /     \\
       30      70
      /  \\     /  \\
     20  40   60   80</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Replace 50 with its in-order successor (60), then remove 60:
          60
        /     \\
       30      70
      /  \\        \\
     20  40        80</pre><div class="concept">In-order successor = smallest value in the right subtree = 60 (70's left child). Copy it up, delete the old 60.</div></div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>C9 · buildHeap (min-heap) on [5, 3, 8, 1, 9, 2] — give the final array</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Final: [1, 3, 2, 5, 9, 8]

Work (last parent index 2, go down to 0):
i=2 (8): swap with child 2      → [5,3,2,1,9,8]
i=1 (3): swap with child 1      → [5,1,2,3,9,8]
i=0 (5): swap with 1, then w/3  → [1,3,2,5,9,8]</pre></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">C10 · MC</span>Inserting a node into a red-black tree whose <b>uncle is red</b> triggers…</div>
        <button class="opt" data-i="0">A rotation only</button>
        <button class="opt" data-i="1">A recolor (push blackness down from grandparent), then continue checking upward</button>
        <button class="opt" data-i="2">Nothing — red uncles are always fine</button>
        <div class="fb"><b>Recolor</b> — flip parent &amp; uncle to black and grandparent to red, then re-check at the grandparent. Rotations are for the <i>black-uncle</i> cases.</div></div>
      <div class="q"><p><span class="tag">C11 · Fill</span>In a red-black tree, both children of every <b>red</b> node must be <input type="text" class="fillblank sm" data-answer="black" placeholder="?" style="width:90px">.</p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>black</b> — the "no two reds in a row" invariant.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>C12 · Reconstruct the tree — preorder [8,3,1,6,10,14], inorder [1,3,6,8,10,14]</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Root = first preorder = 8. In inorder, left of 8 = {1,3,6}, right = {10,14}.
        8
       / \\
      3    10
       \\     \\
        6     14
     (3's left child is 1)
        8
       / \\
      3    10
     / \\    \\
    1   6    14</pre><div class="concept">Preorder gives the root first; inorder splits into left/right subtrees. Recurse on each side.</div></div></div>
      <div class="q" data-tf="T"><div class="prompt"><span class="tag">C13 · T/F</span>Quadratic probing can fail to insert a key even when the table is not full.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>True.</b> The probe sequence <code>i²</code> visits only a limited set of slots, so it can cycle among occupied cells and never reach the empty ones (secondary clustering).</div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">C14 · MC</span>Appending n items to an ArrayList is O(n) total (amortized O(1) each) because…</div>
        <button class="opt" data-i="0">Each append copies the whole array.</button>
        <button class="opt" data-i="1">The array never resizes.</button>
        <button class="opt" data-i="2">Doubling means the total copying across all resizes is n + n/2 + n/4 + … &lt; 2n.</button>
        <div class="fb"><b>Doubling</b> — the geometric series of copy costs sums to less than 2n, so the per-append average is O(1).</div></div>
    </div>
  </section>

  <!-- ===================== EXAM D ===================== -->
  <section class="topic" id="qz-exD">
    <h2>★★ Practice Exam D — Harder (hashing, heaps, graphs)</h2>
    <div class="card">
      <div class="card" style="background:none;border:none;padding:0"><h3>D1 · Linear probing, M=7, h(k)=k mod 7. Insert 10, 17, 24, then delete 17, then search for 24. Explain.</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>10→3, 17→3 taken→4, 24→3 taken,4 taken→5.
Delete 17 at index 4: mark a TOMBSTONE (not empty!).
Search 24: probe 3(10),4(tombstone→skip),5(24) → found.</pre><div class="concept">If you blanked index 4 instead of using a tombstone, the search would stop early at the gap and wrongly report 24 as missing.</div></div></div>
      <div class="q" data-mc="3"><div class="prompt"><span class="tag">D2 · MC</span>M=8, quadratic h(k,i)=(k+i²) mod 8. Insert 3, 11, 19, 27. Where does 27 go?</div>
        <button class="opt" data-i="0">index 3</button><button class="opt" data-i="1">index 4</button><button class="opt" data-i="2">index 7</button><button class="opt" data-i="3">Cannot be inserted</button>
        <div class="fb"><b>Cannot be inserted.</b> 3→3, 11→4, 19→7. Now 27: since 27 mod 8 = 3, its probes are (3 + i²) mod 8, and i² mod 8 only cycles through {0,1,4,1,…}, giving indices {3, 4, 7} — all occupied. It never reaches the empty slots. This is the secondary-clustering failure of quadratic probing.</div></div>
      <div class="q"><p><span class="tag">D3 · Fill</span>Chaining table, insert-at-head, h(k)=k mod 5, insert 6, 11, 16. After all inserts, the chain at index 1 (head → tail) is: <input type="text" class="fillblank" data-answer="16,11,6~~~16 11 6~~~16->11->6~~~16 → 11 → 6" placeholder="?" style="width:180px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>16 → 11 → 6.</b> All hash to 1; head-insertion puts the newest (16) first.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">D4 · MC</span>A probing table has M=20 and just reached N=15. With threshold Tp=0.75, what happens on the next insert?</div>
        <button class="opt" data-i="0">Nothing — load is fine</button>
        <button class="opt" data-i="1">Resize: load hit 15/20 = 0.75, so grow (e.g. double) and rehash all</button>
        <button class="opt" data-i="2">Reject the insert</button>
        <div class="fb"><b>Resize.</b> 15/20 = 0.75 meets the probing threshold, so the table doubles and every key is rehashed against the new M.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>D5 · removeMin twice on this min-heap array [1, 4, 2, 7, 5, 3]. Give the array after each.</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Start: [1,4,2,7,5,3]
removeMin (1): move last 3 to root, sift down:
  [3,4,2,7,5] → 3&gt;2 swap → [2,4,3,7,5]
removeMin (2): move last 5 to root, sift down:
  [5,4,3,7] → 5&gt;3 swap → [3,4,5,7]</pre><div class="concept">Each removeMin: take root, move last element up, sift down toward the smaller child. Both are O(log n).</div></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">D6 · MC</span>Building a heap from n items: buildHeap vs n separate inserts?</div>
        <button class="opt" data-i="0">Both O(n log n)</button>
        <button class="opt" data-i="1">buildHeap O(n); n inserts O(n log n)</button>
        <button class="opt" data-i="2">buildHeap O(n log n); n inserts O(n)</button>
        <div class="fb"><b>buildHeap is O(n)</b> (bottom-up); doing n independent inserts is <b>O(n log n)</b>.</div></div>
      <div class="q"><p><span class="tag">D7 · Fill</span>How many distinct topological orderings does this DAG have? Edges: A→B, A→C, B→D, C→D, D→E. <input type="text" class="fillblank sm" data-answer="2" placeholder="?" style="width:60px"></p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>2.</b> A first; then B and C in either order (both depend only on A); then D (needs both); then E. 2 orderings: A,B,C,D,E and A,C,B,D,E.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>D8 · Dijkstra from A. Directed edges: A→B(2), A→C(5), B→C(1), B→D(7), C→D(3). Give final d(v).</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>d(A)=0
d(B)=2   (A→B)
d(C)=3   (A→B→C = 2+1, beats A→C = 5)
d(D)=6   (A→B→C→D = 3+3, beats A→B→D = 9)</pre></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">D9 · MC</span>Why does Dijkstra's algorithm fail on graphs with negative edges?</div>
        <button class="opt" data-i="0">It runs forever.</button>
        <button class="opt" data-i="1">It finalizes a vertex greedily, but a later negative edge could still lower that "finalized" distance.</button>
        <button class="opt" data-i="2">Negative edges make the graph undirected.</button>
        <div class="fb"><b>The greedy assumption breaks</b> — once Dijkstra marks a vertex visited it never revisits it, but a negative edge could have offered a cheaper path.</div></div>
      <div class="q" data-tf="F"><div class="prompt"><span class="tag">D10 · T/F</span>Bellman-Ford returns FALSE whenever the graph contains a negative-weight edge.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>False.</b> It returns FALSE only for a negative-weight <i>cycle</i>. A lone negative edge is fine.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>D11 · Kruskal's MST total cost. Undirected edges: (A,B,1), (B,C,2), (A,C,2), (C,D,3), (B,D,4)</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>Sort: AB(1), AC(2), BC(2), CD(3), BD(4)
AB(1) add → {A,B}
AC(2) add → {A,B,C}
BC(2) REJECT (B,C already connected → cycle)
CD(3) add → {A,B,C,D}   (all 4 vertices, 3 edges)
Total MST cost = 1 + 2 + 3 = 6</pre></div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">D12 · MC</span>Match algorithm to time complexity: BFS, Dijkstra's, Bellman-Ford.</div>
        <button class="opt" data-i="0">O(n+m), O((n+m)log n), O(nm)</button>
        <button class="opt" data-i="1">O(nm), O(n+m), O((n+m)log n)</button>
        <button class="opt" data-i="2">All O(n+m)</button>
        <div class="fb"><b>BFS O(n+m), Dijkstra O((n+m)log n), Bellman-Ford O(nm).</b> More generality costs more time.</div></div>
    </div>
  </section>

  <!-- ===================== EXAM E ===================== -->
  <section class="topic" id="qz-exE">
    <h2>★★ Practice Exam E — Harder (comprehensive)</h2>
    <div class="card">
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">E1 · MC</span>Which statement is correct?</div>
        <button class="opt" data-i="0">A Binary Heap is an ADT implemented by a Priority Queue.</button>
        <button class="opt" data-i="1">A Priority Queue is an ADT implemented by a Binary Heap or Binary Min Tree.</button>
        <button class="opt" data-i="2">A HashMap is an ADT implemented by a Map.</button>
        <div class="fb"><b>Priority Queue (ADT) ← Binary Heap / Binary Min Tree (implementations).</b> The others are backwards.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>E2 · Big-O of this nested loop</h3>
        <pre>for (int i = 0; i &lt; n; i++)
    for (int j = 1; j &lt; n; j *= 2)
        work();</pre>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><div class="concept"><b>O(n log n).</b> Outer loop n times; inner loop multiplies j so it runs log₂n times. n · log n.</div></div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">E3 · MC</span>Why declare a variable with an interface type, e.g. <code>List&lt;Integer&gt; x = new ArrayList&lt;&gt;();</code>?</div>
        <button class="opt" data-i="0">It runs faster.</button>
        <button class="opt" data-i="1">It programs to the ADT, so you can swap the implementation without changing the rest of the code.</button>
        <button class="opt" data-i="2">ArrayList has no methods otherwise.</button>
        <div class="fb"><b>Program to the interface (ADT).</b> Code depending on <code>List</code> works with any List implementation.</div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">E4 · MC</span>The in-order traversal of a BST gives values in…</div>
        <button class="opt" data-i="0">Insertion order</button><button class="opt" data-i="1">Reverse order</button><button class="opt" data-i="2">Sorted (ascending) order</button>
        <div class="fb"><b>Sorted ascending.</b> That's a defining property of a BST's in-order traversal.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>E5 · AVL: insert 50, 60, 55 into an empty AVL tree. Case &amp; result?</h3>
        <div class="toolbar"><button class="btn ghost small" onclick="toggleReveal(this)">Show answer</button></div>
        <div class="reveal"><pre>50 right-heavy; its right child 60 is left-heavy → RL case →
rotate RIGHT at 60, then LEFT at 50:
        55
       /  \\
      50   60</pre></div></div>
      <div class="q"><p><span class="tag">E6 · Fill</span>A red-black tree with n nodes has height at most <input type="text" class="fillblank sm" data-answer="2log2(n+1)~~~2log(n+1)~~~2*log2(n+1)~~~2log₂(n+1)" placeholder="?" style="width:150px">, so all operations are O(<input type="text" class="fillblank sm" data-answer="log n~~~logn" placeholder="?" style="width:80px">).</p><button class="btn small" onclick="checkFillGroup(this)">Check both</button><div class="fb"><b>2·log₂(n+1)</b>, giving <b>O(log n)</b>.</div></div>
      <div class="card" style="background:none;border:none;padding:0"><h3>E7 · Match the clustering type</h3>
        <table class="match" id="exE-clust">
          <tr><td class="match-term">Primary clustering</td><td><select class="match-def"><option value="">—</option><option value="lin">Linear probing — runs of filled slots merge into big blocks</option><option value="quad">Quadratic probing — keys with the same home slot share one probe path</option></select></td></tr>
          <tr><td class="match-term">Secondary clustering</td><td><select class="match-def"><option value="">—</option><option value="lin">Linear probing — runs of filled slots merge into big blocks</option><option value="quad">Quadratic probing — keys with the same home slot share one probe path</option></select></td></tr>
        </table>
        <button class="btn small" style="margin-top:8px" onclick="checkMatch('exE-clust','fb-exE-clust',['lin','quad'])">Check</button>
        <div class="fb" id="fb-exE-clust">Primary = linear probing's merging blocks; secondary = quadratic probing's shared probe paths. Double hashing avoids both.</div></div>
      <div class="q" data-mc="2"><div class="prompt"><span class="tag">E8 · MC</span>You need shortest paths in an unweighted, undirected social graph. Best algorithm?</div>
        <button class="opt" data-i="0">Dijkstra's</button><button class="opt" data-i="1">Bellman-Ford</button><button class="opt" data-i="2">BFS</button>
        <div class="fb"><b>BFS</b> — O(n+m), optimal for unweighted shortest paths (fewest hops).</div></div>
      <div class="q"><p><span class="tag">E9 · Fill</span>The space complexity of recursion is driven by the maximum depth of the <input type="text" class="fillblank sm" data-answer="call stack~~~stack~~~callstack" placeholder="?" style="width:120px">.</p><button class="btn small" onclick="checkFill(this)">Check</button><div class="fb"><b>call stack</b> — each pending recursive call keeps a frame; depth d → O(d) space.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">E10 · MC</span>A complete binary tree with n nodes stored in an array — the node at index i has children at…</div>
        <button class="opt" data-i="0">i-1 and i+1</button><button class="opt" data-i="1">2i+1 and 2i+2</button><button class="opt" data-i="2">i/2 and i/2+1</button>
        <div class="fb"><b>2i+1 (left) and 2i+2 (right)</b>; parent is ⌊(i−1)/2⌋. This index arithmetic is why heaps need no pointers.</div></div>
      <div class="q" data-mc="0"><div class="prompt"><span class="tag">E11 · MC</span>You need a structure with O(1) average lookup by key, and order does NOT matter. Best choice?</div>
        <button class="opt" data-i="0">HashMap</button><button class="opt" data-i="1">Balanced BST</button><button class="opt" data-i="2">Binary Heap</button>
        <div class="fb"><b>HashMap</b> — O(1) average key lookup. Use a balanced BST instead only if you need sorted order / range queries.</div></div>
      <div class="q" data-tf="T"><div class="prompt"><span class="tag">E12 · T/F</span>Kruskal's and Prim's can produce different MSTs for the same graph, but the total weight is the same.</div>
        <button class="opt" data-v="T">True</button><button class="opt" data-v="F">False</button>
        <div class="fb"><b>True.</b> When edge weights tie, different valid MSTs exist; all achieve the same minimum total cost.</div></div>
      <div class="q" data-mc="1"><div class="prompt"><span class="tag">E13 · MC</span>Heap sort's space complexity is O(1) because…</div>
        <button class="opt" data-i="0">It uses a second array.</button>
        <button class="opt" data-i="1">It sorts in place — the heap lives in the same array being sorted.</button>
        <button class="opt" data-i="2">It's recursive.</button>
        <div class="fb"><b>In place</b> — buildHeap and the repeated swap-root-to-end happen within the input array, needing no extra proportional storage.</div></div>
    </div>
  </section>
</main>`;

/* ============================================================
   Q14 complexity-table fill-in helpers
   ============================================================ */
(function(){
  const s=document.createElement('style');
  s.textContent='#qz-4 .q14-blank{width:82px;padding:5px 7px;border:1px solid var(--line);border-radius:6px;background:#0b1119;color:var(--text);font-family:monospace;font-size:13px;font-weight:700}'
    +'#qz-4 .q14-blank::placeholder{color:var(--muted);font-weight:400}';
  document.head.appendChild(s);
})();
function q14Norm(x){ return x.trim().toLowerCase().replace(/\s+/g,''); }
function q14Check(){
  let all=true, filled=0;
  document.querySelectorAll('#qz-4 .q14-blank').forEach(inp=>{
    const alts=inp.dataset.answer.toLowerCase().split('|').map(q14Norm);
    const val=q14Norm(inp.value);
    if(val) filled++;
    const ok=alts.indexOf(val)!==-1;
    inp.style.borderColor=ok?'var(--green)':'var(--red)';
    inp.style.background=ok?'rgba(21,153,87,.16)':'rgba(192,57,43,.12)';
    if(!ok) all=false;
  });
  const fb=document.getElementById('fb-q14');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all ? '✓ All 18 correct — you know the comparison cold!'
    : (filled===0 ? '✗ Fill the cells first (e.g. O(1), O(log n), O(n)), then check.'
                  : '✗ Red cells are off. Reveal the answers, or open "Explain the reasoning" below.');
}
function q14Reveal(){
  document.querySelectorAll('#qz-4 .q14-blank').forEach(inp=>{
    inp.value=inp.dataset.answer.split('|')[0];
    inp.style.borderColor='var(--accent)'; inp.style.background='rgba(46,134,222,.14)';
  });
  const fb=document.getElementById('fb-q14'); fb.className='fb show'; fb.innerHTML='Answers filled in. Clear and try again from memory!';
}
function q14Clear(){
  document.querySelectorAll('#qz-4 .q14-blank').forEach(inp=>{ inp.value=''; inp.style.borderColor='var(--line)'; inp.style.background='#0b1119'; });
  const fb=document.getElementById('fb-q14'); fb.className='fb'; fb.innerHTML='';
}
