/* ============================================================
   LESSON 28 — CL18 Dynamic Memory Allocation (compile vs run time, stack vs heap, lifetimes,
   dangling pointers, malloc/free, leaks, realloc), incl. RD16. Pairs with Mastery unit u27.
   Injects into #l28. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l28').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l28-why')">1 &middot; Heap, Compile vs Run Time</button>
  <button onclick="showTopic(this,'l28-dangle')">2 &middot; Dangling Pointers</button>
  <button onclick="showTopic(this,'l28-malloc')">3 &middot; malloc &amp; free</button>
  <button onclick="showTopic(this,'l28-arrays')">4 &middot; Unknown-size Arrays &amp; realloc</button>
  <button onclick="showTopic(this,'l28-heapdiag')">5 &middot; Stack vs Heap Array Diagram</button>
  <button onclick="showTopic(this,'l28-rd16')">RD16 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l28-why">
  <h2>CL18 &middot; Why Dynamic Memory? Compile Time vs Run Time, Stack vs Heap</h2>
  <div class="concept"><b>Compile time</b> is when the compiler translates your source into machine code (checking syntax and types, producing the executable) &mdash; before the program runs. <b>Run time</b> is when the compiled program executes; errors such as division by zero, invalid memory access or a missing file happen then. When the memory a program needs is <b>not known until run time</b> (for example the user says how many items to store) it must be requested <b>while running</b>: that is <b>dynamic memory allocation</b>.</div>

  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Stack</th><th>Heap</th></tr>
      <tr><td>Managed</td><td><b>automatically</b></td><td><b>manually</b>, by the programmer</td></tr>
      <tr><td>Holds</td><td>function stack frames (parameters, return address, locals)</td><td>dynamically allocated memory</td></tr>
      <tr><td>Freed</td><td>when the function returns</td><td>only when you call <code>free</code> (or the program ends)</td></tr>
      <tr><td>Has a variable name?</td><td>yes</td><td><b>no</b> &mdash; &ldquo;anonymous&rdquo;; reached only through a pointer</td></tr>
    </table>
    <p>The program-memory picture from CL16: text (instructions), data (globals/statics), <b>heap</b> (dynamic, grows as needed), <b>stack</b> (frames, grows downward). A local pointer such as <code>int *p;</code> in main is itself a normal <b>stack</b> variable &mdash; it just <i>points to</i> heap memory.</p>
  </div>

  <h3>Lifetimes</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Lifetime</th><th>What</th><th>Duration</th></tr>
      <tr><td><b>Automatic</b></td><td>local variables inside a function</td><td>created at <code>{</code>, destroyed at <code>}</code></td></tr>
      <tr><td><b>Static</b></td><td>globals and variables declared <code>static</code></td><td>the entire run of the program</td></tr>
      <tr><td><b>Dynamic</b></td><td>memory from <code>malloc()</code> / <code>calloc()</code></td><td>until you call <code>free()</code></td></tr>
    </table>
    <p><b>Scope</b> is a <b>compile-time</b> idea: the region of code (set by braces) where a name is valid. <b>Lifetime</b> is a <b>run-time</b> idea: how long the memory physically exists. A <code>static</code> local is out of scope between calls but still in lifetime.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why do programs use dynamic memory allocation?</div>
      <button class="opt" data-i="0">To make local variables global</button>
      <button class="opt" data-i="1">To allocate memory whose size is only known at run time</button>
      <button class="opt" data-i="2">To store function code</button>
      <button class="opt" data-i="3">To avoid using pointers</button>
      <div class="fb">The amount of memory is decided while the program runs.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Where is the pointer variable <code>int *p;</code> (a local in main) stored?</div>
      <button class="opt" data-i="0">The heap</button>
      <button class="opt" data-i="1">The data region</button>
      <button class="opt" data-i="2">The stack</button>
      <button class="opt" data-i="3">The code region</button>
      <div class="fb">It is an automatic local; its target may be on the heap.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why is heap memory called &ldquo;anonymous&rdquo;?</div>
      <button class="opt" data-i="0">It has no address</button>
      <button class="opt" data-i="1">It is not bound to a variable name</button>
      <button class="opt" data-i="2">It is always zeroed</button>
      <button class="opt" data-i="3">It cannot be reached by pointers</button>
      <div class="fb">Only a pointer gives access.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What lifetime does a global variable have? (automatic, static or dynamic)</div>
      <input class="fillblank sm" data-answer="static">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Globals live for the entire program run.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What lifetime does memory from <code>malloc</code> have?</div>
      <input class="fillblank sm" data-answer="dynamic">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">It lives until <code>free</code> is called.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which statement is correct?</div>
      <button class="opt" data-i="0">Scope and lifetime are both run-time concepts</button>
      <button class="opt" data-i="1">Scope is compile-time; lifetime is run-time</button>
      <button class="opt" data-i="2">Scope is run-time; lifetime is compile-time</button>
      <button class="opt" data-i="3">They mean the same thing</button>
      <div class="fb">Names have scope; memory has lifetime.</div>
    </div>
  </div>
</section>

<section class="topic" id="l28-dangle">
  <h2>CL18 &middot; The Problem: Dangling Pointers</h2>
  <div class="concept">A <b>dangling pointer</b> is a pointer that <b>lives longer than the data it points to</b>. The classic way to create one is to return the address of a local variable.</div>

  <div class="card">
<pre>int32_t *get_number() {
    int32_t x = 42;      // 'x' has AUTOMATIC lifetime
    return &amp;x;           // ERROR: x dies when the function ends!
}
int main() {
    int32_t *p = get_number();
    printf("%d", *p);   // UNDEFINED BEHAVIOR
}</pre>
    <p>Stack picture: <code>get_number</code>'s frame holds <code>x = 42</code>. When the function returns that stack space is reclaimed, but the return value (a pointer to x) is copied into main's <code>p</code>. <code>p</code> now points at &ldquo;garbage&rdquo; memory that the next call may overwrite.</p>
  </div>

  <div class="card">
  <div class="concept"><b>The fix:</b> allocate on the <b>heap</b> so the data outlives the function.</div>
<pre>int *get_number() {
    int *x = malloc(sizeof(int));   // request heap memory
    *x = 42;
    return x;                       // safe: the memory persists
}
int main() {
    int *p = get_number();
    printf("%d", *p);               // 42
    free(p);                        // you MUST end the lifetime manually
    p = NULL;
}</pre>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is a dangling pointer?</div>
      <button class="opt" data-i="0">A pointer declared static</button>
      <button class="opt" data-i="1">A pointer whose target's lifetime has ended while the pointer is still in use</button>
      <button class="opt" data-i="2">A pointer to a global variable</button>
      <button class="opt" data-i="3">A pointer that equals NULL</button>
      <div class="fb">The pointer outlives the data.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Why is <code>return &amp;local;</code> a bug?</div>
      <button class="opt" data-i="0">Address-of is not allowed in return statements</button>
      <button class="opt" data-i="1">The local variable is on the heap</button>
      <button class="opt" data-i="2">The local's lifetime ends when the function returns, so the address is invalid</button>
      <button class="opt" data-i="3">The scope of the pointer is global</button>
      <div class="fb">The stack space is reclaimed.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which fix makes the value outlive the function?</div>
      <button class="opt" data-i="0">Make the variable static const</button>
      <button class="opt" data-i="1">Allocate it with malloc and return that pointer</button>
      <button class="opt" data-i="2">Return the pointer twice</button>
      <button class="opt" data-i="3">Declare it after the return</button>
      <div class="fb">Heap memory has dynamic lifetime. (A <code>static</code> local would also persist, but is shared across calls.)</div>
    </div>
  </div>
</section>

<section class="topic" id="l28-malloc">
  <h2>CL18 &middot; <code>malloc</code> and <code>free</code></h2>
  <div class="concept"><code>void *malloc(size_t size);</code> (in <code>&lt;stdlib.h&gt;</code>) reserves a block of <b>size bytes</b> on the heap and returns a pointer to the <b>beginning</b> of it, or <b>NULL</b> if the system cannot provide the memory. The returned memory is <b>uninitialized</b>. <code>void free(void *ptr);</code> releases memory from <code>malloc</code>/<code>calloc</code>/<code>realloc</code>, preventing leaks.</div>

  <div class="card">
<pre>int *x = malloc(sizeof(int));          // one int
int *arr = malloc(20 * sizeof(int));    // array of 20 ints (80 bytes)
double *d = malloc(30 * sizeof(double)); // array of 30 doubles (240 bytes)
if (arr == NULL) return 1;              // ALWAYS check: malloc can fail</pre>
    <table class="cmp">
      <tr><th>Expression</th><th>Allocates</th></tr>
      <tr><td><code>malloc(20)</code></td><td>20 <b>bytes</b> (wrong for 20 ints)</td></tr>
      <tr><td><code>malloc(sizeof(int) * 20)</code></td><td>20 ints (correct)</td></tr>
      <tr><td><code>malloc(sizeof(arr) * 20)</code></td><td>wrong: sizeof of the <i>pointer</i> (8) &times; 20</td></tr>
    </table>
  </div>

  <h3>free: rules and pitfalls</h3>

  <div class="card">
    <ul><li>Call <code>free</code> <b>once</b> on each allocated block (a second free is a <b>double free</b>, undefined behavior).</li><li>Never free memory that did not come from malloc/calloc/realloc.</li><li>After <code>free(p)</code>, <code>p</code> is a <b>dangling pointer</b>: set <code>p = NULL</code> so an accidental use fails fast (and <code>free(NULL)</code> is harmless).</li><li><code>free</code> needs no size: the allocator stores metadata (like the size) in a header before the block.</li><li><b>Memory leak</b>: allocated, never freed, and all references lost. Repeated leaks grow the heap and can slow or crash the system.</li><li><b>Use-after-free</b>: using a pointer after its block was freed.</li></ul>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many bytes does <code>malloc(20 * sizeof(int))</code> request (sizeof(int) = 4)?</div>
      <input class="fillblank sm" data-answer="80">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">20 &times; 4.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many bytes to store 12 <code>double</code>s?</div>
      <input class="fillblank sm" data-answer="96">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">12 &times; 8.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What does <code>malloc</code> return if it cannot allocate?</div>
      <button class="opt" data-i="0">0 as an int</button>
      <button class="opt" data-i="1">-1</button>
      <button class="opt" data-i="2">NULL</button>
      <button class="opt" data-i="3">an empty pointer</button>
      <div class="fb">Check for NULL before dereferencing.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>arr</code> contain after <code>arr = malloc(sizeof(int) * 20);</code>?</div>
      <button class="opt" data-i="0">The whole array</button>
      <button class="opt" data-i="1">The base address of a contiguous block in the heap</button>
      <button class="opt" data-i="2">The number of bytes allocated</button>
      <button class="opt" data-i="3">A pointer to the stack</button>
      <div class="fb">A pointer value.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can you write <code>d_array[i]</code> even though <code>d_array</code> is a pointer?</div>
      <button class="opt" data-i="0">malloc creates an array type</button>
      <button class="opt" data-i="1">Indexing is defined as offset + dereference from the base address</button>
      <button class="opt" data-i="2">Pointers are copied into arrays</button>
      <button class="opt" data-i="3">The compiler rewrites it into a loop</button>
      <div class="fb"><code>p[i]</code> is <code>*(p + i)</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does <code>free</code> not need the size passed in?</div>
      <button class="opt" data-i="0">It guesses</button>
      <button class="opt" data-i="1">malloc stores metadata (like the size) with the block</button>
      <button class="opt" data-i="2">The OS knows all sizes</button>
      <button class="opt" data-i="3">The pointer encodes the size</button>
      <div class="fb">A header precedes the block.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Check</span>Calling <code>free(p)</code> twice on the same block is safe.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> That is a double free (undefined behavior); set p = NULL after the first free.</div>
    </div>
  </div>
</section>

<section class="topic" id="l28-arrays">
  <h2>CL18 &middot; Arrays of Unknown Size and <code>realloc</code></h2>
  <div class="concept">The most common use of dynamic memory: you do not know how much data you will have until the program runs (e.g. asking how many grades to enter). A normal <code>int grades[10];</code> is stuck at 10; <code>malloc</code> lets the <b>array's size be decided at run time</b>.</div>

  <div class="card">
<pre>int *create_even_numbers(int count) {
    int *arr = malloc(count * sizeof(int));      // heap array of 'count' ints
    if (arr == NULL) return NULL;                // safety check
    for (int i = 0; i &lt; count; i++) arr[i] = i * 2;
    return arr;                                  // heap memory outlives the function
}
// create_even_numbers(5) -&gt; 0 2 4 6 8   (the caller must free it)</pre>
  </div>

  <h3>realloc</h3>

  <div class="concept"><code>ptr = realloc(ptr, new_size);</code> <b>resizes</b> a heap block: it <b>preserves existing data</b> (up to the smaller of the old and new sizes), <b>may move</b> the block to a new location, and returns <b>NULL on failure</b> (the original pointer is still valid). It is how Java's ArrayList or a Python list grows under the hood. Always use a <b>temporary pointer</b> so a failure does not lose the old block.</div>

  <div class="card">
<pre>int *list = malloc(2 * sizeof(int));
list[0] = 10;  list[1] = 20;
int *tmp = realloc(list, 4 * sizeof(int));   // grow to 4 ints
if (tmp != NULL) {
    list = tmp;                              // only now replace the old pointer
    list[2] = 30;  list[3] = 40;
}
// prints: 10 20 30 40</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>create_even_numbers(5)</code> leave in the array (five numbers, space separated)?</div>
      <input class="fillblank sm" data-answer="0 2 4 6 8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">arr[i] = i &times; 2.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the realloc example print?</div>
      <input class="fillblank sm" data-answer="10 20 30 40">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The first two values are preserved; the two new elements are filled in afterwards.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why assign <code>realloc</code>'s result to a temporary first?</div>
      <button class="opt" data-i="0">It is faster</button>
      <button class="opt" data-i="1">If realloc returns NULL the original block is still valid; assigning directly would lose it</button>
      <button class="opt" data-i="2">realloc requires a temporary</button>
      <button class="opt" data-i="3">To avoid casts</button>
      <div class="fb">Otherwise a failure leaks the old block.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What can realloc do when there is no room after the block?</div>
      <button class="opt" data-i="0">Return NULL and free the block</button>
      <button class="opt" data-i="1">Allocate a new block, copy the data, free the old block, and return the new pointer</button>
      <button class="opt" data-i="2">Truncate the data</button>
      <button class="opt" data-i="3">Crash</button>
      <div class="fb">The pointer may change.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which of these is an advantage of a heap array over <code>int a[10];</code>?</div>
      <button class="opt" data-i="0">It is always faster</button>
      <button class="opt" data-i="1">Its size can be chosen (and changed) at run time</button>
      <button class="opt" data-i="2">It needs no pointer</button>
      <button class="opt" data-i="3">It frees itself</button>
      <div class="fb">Run-time sizing.</div>
    </div>
  </div>
</section>

<section class="topic" id="l28-heapdiag">
  <h2>CL18 &middot; A Stack Array and a Heap Array Side by Side</h2>
  <div class="concept">Memory diagram for <code>int16_t stack_arr[3];</code> and <code>int16_t *heap_arr = malloc(3 * sizeof(int16_t));</code>: <code>stack_arr</code> occupies 3 &times; 2 = 6 bytes <b>inside main's frame</b>; <code>heap_arr</code> is an 8-byte pointer in the frame whose value is the address of a separate 6-byte block on the <b>heap</b>. The call <code>malloc(6)</code> shows up as a temporary frame (argument 6, return address) and returns the pointer (the return value slot RV).</div>

  <div class="card">
<pre>STACK (main)                          HEAP
  RA (8)
  stack_arr[0..2]  (2 bytes each)       +---------+
  heap_arr (8) = ptr to heap  -------&gt;  | ? ? ?   |  (6 bytes)
  i (4)                                 +---------+</pre>
<pre>for (int32_t i = 0; i &lt; 3; i++) {
    stack_arr[i] = i;          // 0 1 2   (in the frame)
    heap_arr[i]  = i * 2;      // 0 2 4   (on the heap)
}
free(heap_arr);
heap_arr = NULL;</pre>
    <p><b>Same address arithmetic for both:</b> the element address is <code>base + i &times; sizeof(int16_t)</code>; only the <i>base</i> differs (the array itself vs the address stored in the pointer).</p>
  </div>

  <div class="card">
    <p>Running a version of that program prints <code>s[2]</code>, <code>h[2]</code>, <code>sizeof(s)</code>, <code>sizeof(h)</code> as <b>2 4 6 8</b>: the stack array reports its 6 bytes; the heap pointer variable is 8 bytes.</p>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the diagram, how many bytes does the heap block hold?</div>
      <input class="fillblank sm" data-answer="6">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3 elements &times; 2 bytes.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is <code>sizeof(heap_arr)</code> (the pointer variable)?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Every pointer is 8 bytes; it does not report the block size.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is the base address used for <code>heap_arr[i]</code>?</div>
      <button class="opt" data-i="0">The address of the pointer variable</button>
      <button class="opt" data-i="1">The address stored in the pointer (the start of the heap block)</button>
      <button class="opt" data-i="2">The address of main's frame</button>
      <button class="opt" data-i="3">Always 0</button>
      <div class="fb">Indexing starts from the value of the pointer.</div>
    </div>
  </div>
</section>

<section class="topic" id="l28-rd16">
  <h2>RD16 Self-Check &middot; Dynamic Memory Allocation (DiS 2.4)</h2>
  <p class="muted">Fresh questions in the style of the RD16 reading quiz (malloc/free, arrays on the heap, free and NULL, passing heap arrays to functions).</p>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>Where does dynamically allocated memory live?</div>
      <button class="opt" data-i="0">Stack</button>
      <button class="opt" data-i="1">Heap</button>
      <button class="opt" data-i="2">Code region</button>
      <button class="opt" data-i="3">Data region</button>
      <div class="fb">The heap.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>What does <code>malloc(sizeof(int))</code> return on success?</div>
      <button class="opt" data-i="0">An int initialized to 0</button>
      <button class="opt" data-i="1">The base address of the allocated heap memory</button>
      <button class="opt" data-i="2">The number of bytes allocated</button>
      <button class="opt" data-i="3">The address of a stack variable</button>
      <div class="fb">A pointer to the block.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q3</span>Why should you check malloc's return value before dereferencing?</div>
      <button class="opt" data-i="0">malloc always returns uninitialized memory</button>
      <button class="opt" data-i="1">Dereferencing NULL can crash the program</button>
      <button class="opt" data-i="2">malloc returns a stack address</button>
      <button class="opt" data-i="3">malloc frees memory automatically</button>
      <div class="fb">It may return NULL.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q4</span>Which two expressions are equivalent?</div>
      <button class="opt" data-i="0">d[i] and d + i</button>
      <button class="opt" data-i="1">&amp;d[i] and *(d + i)</button>
      <button class="opt" data-i="2">*d and d[1]</button>
      <button class="opt" data-i="3">d[i] and *(d + i)</button>
      <div class="fb">Indexing is offset + dereference.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q5</span>What does <code>*d = 8;</code> do when d points to a heap array?</div>
      <button class="opt" data-i="0">Stores 8 into element 0</button>
      <button class="opt" data-i="1">Stores 8 into the pointer variable</button>
      <button class="opt" data-i="2">Allocates 8 bytes</button>
      <button class="opt" data-i="3">Frees the array</button>
      <div class="fb"><code>*d</code> is <code>d[0]</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q6</span>Why is it recommended to set a pointer to NULL after <code>free(p);</code>?</div>
      <button class="opt" data-i="0">It prevents leaks</button>
      <button class="opt" data-i="1">It helps catch accidental use-after-free earlier (crash on NULL dereference)</button>
      <button class="opt" data-i="2">It re-initializes the block</button>
      <button class="opt" data-i="3">It makes the heap contiguous</button>
      <div class="fb">Fail fast.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span>When you pass a dynamically allocated array to a function, what is passed?</div>
      <button class="opt" data-i="0">A full copy of the array</button>
      <button class="opt" data-i="1">The base address of the heap array (the pointer value)</button>
      <button class="opt" data-i="2">Only the first element</button>
      <button class="opt" data-i="3">The total byte size</button>
      <div class="fb">A pointer.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q8</span>Why do functions that take arrays often include a size parameter?</div>
      <button class="opt" data-i="0">The compiler requires it</button>
      <button class="opt" data-i="1">So the function knows how many elements it can safely access</button>
      <button class="opt" data-i="2">malloc needs it</button>
      <button class="opt" data-i="3">To speed up arithmetic</button>
      <div class="fb">A pointer carries no length.</div>
    </div>
  </div>
</section>

</main>
`;
