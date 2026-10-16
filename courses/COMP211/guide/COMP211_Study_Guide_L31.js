/* ============================================================
   LESSON 31 — CL21 Garbage Collection (Java) & Quiz 2 Review: JVM and toolchains, C vs Java memory
   management, reference counting, mark-and-sweep, Quiz 2 checklist and class problem. Pairs with
   Mastery unit u30. (No reading for this lecture.)
   Injects into #l31. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l31').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l31-jvm')">1 &middot; The JVM & Toolchains</button>
  <button onclick="showTopic(this,'l31-gc')">2 &middot; Garbage Collection</button>
  <button onclick="showTopic(this,'l31-refcount')">3 &middot; Reference Counting</button>
  <button onclick="showTopic(this,'l31-marksweep')">4 &middot; Mark-and-Sweep</button>
  <button onclick="showTopic(this,'l31-quiz2')">5 &middot; Quiz 2 Review</button>
</nav>
<main>

<section class="topic active" id="l31-jvm">
  <h2>CL21 &middot; The Java Virtual Machine vs the C Toolchain</h2>
  <div class="concept">The <b>Java Virtual Machine (JVM)</b> is the software that runs Java programs. It takes <b>compiled Java bytecode</b> and executes it on the computer.</div>

  <div class="card">
    <table class="cmp">
      <tr><th></th><th>C</th><th>Java</th></tr>
      <tr><td>Source</td><td><code>hello.c</code></td><td><code>Hello.java</code></td></tr>
      <tr><td>Compile</td><td><code>gcc</code> (compile + assemble + link)</td><td><code>javac Hello.java</code> &rarr; <code>Hello.class</code> (<b>bytecode</b>)</td></tr>
      <tr><td>Result</td><td><b>platform-specific machine code</b> (<code>hello</code>)</td><td>platform-independent bytecode</td></tr>
      <tr><td>Run</td><td><code>./hello</code>: shell starts the executable, the OS loader loads it (and shared libraries), the CPU executes the instructions</td><td><code>java Hello</code>: the <b>JVM</b> loads the .class and runs the bytecode</td></tr>
    </table>
  </div>

  <div class="card">
  <div class="concept"><b>Platform-dependent</b>: code designed for a particular architecture (x86-64, ARM); it may need to be recompiled elsewhere (a C program built for x86-64 cannot run directly on ARM). <b>Platform-independent</b>: runs on different systems without being rewritten or recompiled &mdash; Java bytecode runs wherever a compatible JVM exists.</div>
    <p><b>JVM benefits:</b> <b>portability</b> (same program on different operating systems), <b>memory management</b> (automatic allocation of objects and garbage collection), and <b>performance optimization</b> (it can find frequently executed code and compile it into optimized machine code).</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>javac Hello.java</code> produce?</div>
      <button class="opt" data-i="0">Machine code for this CPU</button>
      <button class="opt" data-i="1">Hello.class containing bytecode</button>
      <button class="opt" data-i="2">An ELF executable</button>
      <button class="opt" data-i="3">Hello.c</button>
      <div class="fb">Bytecode, run by the JVM.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>A C program compiled to x86-64 machine code is copied to an ARM computer. What happens?</div>
      <button class="opt" data-i="0">It runs unchanged</button>
      <button class="opt" data-i="1">It cannot run directly; it must be recompiled for ARM</button>
      <button class="opt" data-i="2">The JVM runs it</button>
      <button class="opt" data-i="3">It converts itself</button>
      <div class="fb">Machine code is platform dependent.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can the same <code>.class</code> file run on different operating systems?</div>
      <button class="opt" data-i="0">It holds machine code for all CPUs</button>
      <button class="opt" data-i="1">Each system has a compatible JVM that runs the same bytecode</button>
      <button class="opt" data-i="2">The OS recompiles it</button>
      <button class="opt" data-i="3">Java has no memory</button>
      <div class="fb">Platform independence via the JVM.</div>
    </div>
    <div class="q" data-multi="0,1,2">
      <div class="prompt"><span class="tag">Check</span>Select <b>all</b> JVM benefits named in lecture.</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> Portability</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> Automatic memory management</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Performance optimization of frequently run code</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> No need for any operating system</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb">The JVM still needs an OS.</div>
    </div>
  </div>
</section>

<section class="topic" id="l31-gc">
  <h2>CL21 &middot; Memory Management: C vs Java and the Garbage Collector</h2>
  <div class="concept">A big difference between C and Java is <b>who manages memory</b>. In <b>C</b>, the programmer explicitly allocates (<code>malloc</code>) and frees (<code>free</code>) dynamic memory; locals are automatic. In <b>Java</b>, the programmer creates objects with <code>new</code> and the JVM automatically reclaims memory when those objects become <b>unreachable</b>.</div>

  <div class="card">
<pre>// C                                  // Java
int *p = malloc(sizeof(int));          int[] p = new int[1];
*p = 42;                               p[0] = 42;
printf("%d\\n", *p);                    System.out.println(p[0]);
free(p);                               p = null;     // eligible for GC
p = NULL;</pre>
    <table class="cmp">
      <tr><th>Property</th><th>C</th><th>Java</th></tr>
      <tr><td>Memory allocation</td><td>automatic for locals; explicit <code>malloc()</code> for dynamic memory</td><td>automatic</td></tr>
      <tr><td>Memory reclamation</td><td>explicit <code>free()</code> for dynamic memory; automatic for locals</td><td>automatic garbage collection</td></tr>
      <tr><td>Common errors</td><td>leaks, use-after-free, double free, dangling pointers</td><td>far fewer memory errors</td></tr>
      <tr><td>Cost</td><td>programmer effort</td><td>some run-time overhead (GC time, pauses)</td></tr>
    </table>
  </div>

  <div class="card">
  <div class="concept">The <b>garbage collector (GC)</b> is a component of the runtime that automatically identifies and reclaims memory occupied by objects that are no longer needed. After <code>Person p = new Person("Alice"); p = null;</code> the object is no longer reachable (if there are no other references), so it becomes <b>eligible</b> for garbage collection &mdash; but Java does not necessarily reclaim it <b>immediately</b>.</div>
    <p>GC can slow a program: <b>stop-the-world pauses</b> (the JVM temporarily stops the program while it manages memory) and <b>CPU time</b> spent finding and removing unused objects, which competes with the program.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>In Java, who reclaims the memory of unreachable objects?</div>
      <button class="opt" data-i="0">The programmer with free()</button>
      <button class="opt" data-i="1">The JVM's garbage collector</button>
      <button class="opt" data-i="2">The compiler</button>
      <button class="opt" data-i="3">The shell</button>
      <div class="fb">GC.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>After <code>p = null;</code> (no other references) the object is&hellip;</div>
      <button class="opt" data-i="0">Immediately freed</button>
      <button class="opt" data-i="1">Eligible for garbage collection</button>
      <button class="opt" data-i="2">Still reachable</button>
      <button class="opt" data-i="3">A dangling pointer</button>
      <div class="fb">It will be reclaimed when the collector runs.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>Which is a cost of garbage collection?</div>
      <button class="opt" data-i="0">Stop-the-world pauses and CPU time</button>
      <button class="opt" data-i="1">More memory errors</button>
      <button class="opt" data-i="2">The programmer must call free</button>
      <button class="opt" data-i="3">Larger bytecode</button>
      <div class="fb">Overhead.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Check</span>Java guarantees an unreachable object's memory is reclaimed immediately.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> It is eligible; reclamation happens when the collector runs.</div>
    </div>
  </div>
</section>

<section class="topic" id="l31-refcount">
  <h2>CL21 &middot; Reference Counting and Its Circular-Reference Problem</h2>
  <div class="concept"><b>Reference counting</b> keeps a <b>count of how many references point to each object</b>. When the count reaches zero the object becomes eligible for collection.</div>

  <div class="card">
<pre>Person a = new Person("Alice");   // 1 reference to Alice
Person b = a;                      // 2 references
a = null;                          // 1 reference
b = null;                          // 0 references -&gt; eligible</pre>
  </div>

  <h3>The problem: circular references</h3>

  <div class="card">
<pre>Node a = new Node();   // Node A: 1 reference (a)
Node b = new Node();   // Node A: 1, Node B: 1 (b)
a.next = b;            // Node A: 1, Node B: 2 (b, a.next)
b.next = a;            // Node A: 2 (a, b.next), Node B: 2
a = null;              // Node A: 1 (b.next), Node B: 2
b = null;              // Node A: 1, Node B: 1</pre>
    <p>The two nodes still reference each other, so their counts are <b>non-zero</b> even though the program can no longer reach either. Simple reference counting <b>cannot reclaim the cycle</b>. This is a major reason Java uses <b>tracing</b> garbage collectors instead.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Reference count of the Alice object after <code>Person b = a;</code> (a and b both set)?</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Two variables refer to it.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Count after <code>a = null; b = null;</code>?</div>
      <input class="fillblank sm" data-answer="0">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">No references remain.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the cycle example, what is Node A's count after both variables are set to null?</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">B.next still references A.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does reference counting fail on two objects that point at each other?</div>
      <button class="opt" data-i="0">The counts become negative</button>
      <button class="opt" data-i="1">Each keeps the other's count above zero even though neither is reachable</button>
      <button class="opt" data-i="2">Objects cannot reference each other</button>
      <button class="opt" data-i="3">The JVM forbids it</button>
      <div class="fb">Circular references.</div>
    </div>
  </div>
</section>

<section class="topic" id="l31-marksweep">
  <h2>CL21 &middot; Mark-and-Sweep Garbage Collection</h2>
  <div class="concept"><b>Mark-and-sweep</b> is a <b>tracing</b> collector. A <b>GC root</b> is a starting point the collector knows is in use (for example local variables). Two phases: <b>Mark</b> &mdash; starting from the roots, follow references and mark every <b>reachable</b> object. <b>Sweep</b> &mdash; examine all allocated objects and <b>reclaim those that were not marked</b>.</div>

  <div class="card">
<pre>GC root --> A --> B --> D
              \\-> C
 E <--> F          (point at each other; nothing reaches them)
 G --> A           (G points at A, but G itself is not reachable from a root)</pre>
    <p>Mark from root A: <b>A, B, C, D</b>. Sweep reclaims <b>E, F, G</b>. E and F form a cycle that reference counting could never free, but mark-and-sweep collects it because no root reaches it. G points <i>to</i> a live object, but <b>reachability follows references from the roots</b>, so G is garbage.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Using the graph above (root A) which objects are marked? (letters in alphabetical order)</div>
      <input class="fillblank sm" data-answer="ABCD">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A, then B and C, then D.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Which objects are swept (garbage)? (alphabetical order)</div>
      <input class="fillblank sm" data-answer="EFG">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">E and F (an unreachable cycle) and G.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does the mark phase do?</div>
      <button class="opt" data-i="0">Frees unmarked objects</button>
      <button class="opt" data-i="1">Starting from the roots, marks every reachable object</button>
      <button class="opt" data-i="2">Counts references</button>
      <button class="opt" data-i="3">Copies objects</button>
      <div class="fb">Mark = reachability.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does the sweep phase do?</div>
      <button class="opt" data-i="0">Marks reachable objects</button>
      <button class="opt" data-i="1">Reclaims allocated objects that were not marked</button>
      <button class="opt" data-i="2">Finds the GC roots</button>
      <button class="opt" data-i="3">Compacts the stack</button>
      <div class="fb">Unmarked = garbage.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does Java use a tracing collector rather than simple reference counting?</div>
      <button class="opt" data-i="0">It is simpler</button>
      <button class="opt" data-i="1">Tracing can reclaim cycles of unreachable objects</button>
      <button class="opt" data-i="2">Reference counting uses less memory</button>
      <button class="opt" data-i="3">Tracing never pauses</button>
      <div class="fb">Cycles break reference counting.</div>
    </div>
  </div>
</section>

<section class="topic" id="l31-quiz2">
  <h2>CL21 &middot; Quiz 2 Review: Pointers, Arrays, the Heap and Strings</h2>
  <div class="concept">Quiz 2 covers the pointer and memory material from CL16 on. A checklist of what to be able to do on paper:</div>

  <div class="card">
    <ul><li><b>Memory diagrams</b>: draw the stack (frame: parameters, RA, locals), the heap, and where each pointer points; compute element addresses with <code>base + size &times; index</code>; remember little endian.</li><li><b>Pointer arithmetic</b>: <code>p + n</code> moves n <i>elements</i>; <code>p[i]</code> is <code>*(p + i)</code>; <code>p1 - p2</code> counts elements.</li><li><b>Pass-by-pointer</b>: swap, addOne; double pointers.</li><li><b>Heap</b>: <code>malloc(count * sizeof(type))</code> + NULL check + <code>free</code>; leaks, dangling pointers, use-after-free, double free; <code>realloc</code> with a temporary; first-fit free list with splitting and coalescing.</li><li><b>2D arrays</b>: row-major <code>i * C + j</code>; Method 1 vs Method 2 and how each is freed.</li><li><b>Strings</b>: <code>strlen + 1</code>, <code>char **</code>, <code>fgets</code>, free inner then outer.</li><li><b>Java vs C</b>: JVM/bytecode, garbage collection, reference counting cycles, mark-and-sweep.</li></ul>
  </div>

  <h3>Class problem: fill in the memory diagram (traced here)</h3>

  <div class="card">
<pre>int main() {
    int64_t arr[] = {5, 10, 15, 20, 25};
    int64_t *p = &amp;arr[2];      // p -&gt; arr[2]
    *p = 50;                   // arr[2] = 50
    p[-1] = 100;               // arr[1] = 100
    *(p + 2) = arr[0] + arr[1];// arr[4] = 5 + 100
    p = p - 2;                 // p -&gt; arr[0]
    arr[3] = *(p + 2) + p[1];  // arr[3] = arr[2] + arr[1] = 50 + 100
    arr[0] = &amp;arr[4] - p;      // arr[0] = 4 (elements between)
}
// final array: 4 100 50 150 105</pre>
    <p>Each <code>int64_t</code> is 8 bytes, so with the stack frame starting at <code>0xFFFFAAAA0040</code> and the array at the lower addresses the element addresses differ by 8 (0x8).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the final content of <code>arr</code> (five values separated by spaces)?</div>
      <input class="fillblank sm" data-answer="4 100 50 150 105">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">See the line-by-line comments above.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>&amp;arr[4] - p</code> evaluate to when <code>p = &amp;arr[0]</code>?</div>
      <input class="fillblank sm" data-answer="4">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Pointer subtraction counts elements, not bytes.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>If <code>arr</code> starts at <code>0xFFFFAAAA0000</code> and elements are <code>int64_t</code>, what is the address of <code>arr[2]</code>?</div>
      <button class="opt" data-i="0">0xFFFFAAAA0002</button>
      <button class="opt" data-i="1">0xFFFFAAAA0010</button>
      <button class="opt" data-i="2">0xFFFFAAAA0008</button>
      <button class="opt" data-i="3">0xFFFFAAAA0016</button>
      <div class="fb">2 &times; 8 = 0x10.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which program fragment leaks memory?</div>
      <button class="opt" data-i="0">char *s = malloc(8); free(s); s = NULL;</button>
      <button class="opt" data-i="1">char *s = malloc(8); s = malloc(16); free(s);</button>
      <button class="opt" data-i="2">char *s = malloc(8); free(s);</button>
      <button class="opt" data-i="3">char s[8];</button>
      <div class="fb">The first block is orphaned when s is reassigned.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which is the correct way to free a <code>char **words</code> with strings from malloc?</div>
      <button class="opt" data-i="0">free(words)</button>
      <button class="opt" data-i="1">for each i free(words[i]); then free(words)</button>
      <button class="opt" data-i="2">free(words[0])</button>
      <button class="opt" data-i="3">for each i free(words[i]) only</button>
      <div class="fb">Inner then outer.</div>
    </div>
  </div>
</section>

</main>
`;
