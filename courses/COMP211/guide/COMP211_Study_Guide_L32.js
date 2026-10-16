/* ============================================================
   LESSON 32 — HW07 · Pointer Arithmetic and Dynamic Memory (homework review): element addresses,
   pointer arithmetic, malloc/free tracing, lifetime vs scope, misaligned pointers. Fresh examples.
   Pairs with Mastery units u27 and u28.
   Injects into #l32. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l32').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l32-intro')">1 &middot; What HW07 Asks</button>
  <button onclick="showTopic(this,'l32-q1')">2 &middot; Q1 Element Addresses</button>
  <button onclick="showTopic(this,'l32-q23')">3 &middot; Q2&ndash;Q3 Pointer Arithmetic</button>
  <button onclick="showTopic(this,'l32-q45')">4 &middot; Q4&ndash;Q5 malloc &amp; Tracing</button>
  <button onclick="showTopic(this,'l32-q6')">5 &middot; Q6 Lifetime vs Scope</button>
  <button onclick="showTopic(this,'l32-q7')">6 &middot; Q7 Misaligned Pointers</button>
</nav>
<main>

<section class="topic active" id="l32-intro">
  <h2>HW07 &middot; Pointer Arithmetic and Dynamic Memory: Overview</h2>
  <div class="concept">HW07 (21 points) has seven question groups: <b>Q1</b> addresses of array elements, <b>Q2</b> pointer-arithmetic concepts (DiS 2.9.4), <b>Q3</b> pointer-arithmetic code tracing, <b>Q4</b> <code>malloc</code>/<code>free</code> facts, <b>Q5</b> dynamic-memory code tracing, <b>Q6</b> lifetime vs scope, <b>Q7</b> misaligned pointers (the same bytes read through different pointer types).</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Group</th><th>Rule to remember</th><th>Lesson</th></tr>
      <tr><td>Q1</td><td><code>address of element i = base + size &times; i</code>; element <i>i</i> occupies <code>size</code> bytes</td><td>CL17 / CL19</td></tr>
      <tr><td>Q2&ndash;Q3</td><td><code>p + n</code> moves n <i>elements</i>; <code>p[i] == *(p + i)</code>; 2D: Method 1 contiguous, Method 2 reset per row</td><td>CL17 / CL19</td></tr>
      <tr><td>Q4&ndash;Q5</td><td>check malloc; one free per block; no use-after-free; set NULL after free</td><td>CL18</td></tr>
      <tr><td>Q6</td><td>scope = compile time (names); lifetime = run time (memory)</td><td>CL18</td></tr>
      <tr><td>Q7</td><td>little endian: lowest address = least significant byte; cast changes the grouping</td><td>CL19</td></tr>
    </table>
  </div>

  <div class="card">
    <p class="muted">These are fresh questions of the same kinds as the graded ones. Undefined-behavior cases are explained rather than run.</p>
  </div>
</section>

<section class="topic" id="l32-q1">
  <h2>HW07 &middot; Q1: Addresses of Array Elements</h2>
  <div class="concept">Given the address of <b>one</b> element you can find any other: moving <i>k</i> elements changes the address by <code>k &times; sizeof(element)</code>. An element occupies <code>sizeof</code> consecutive byte addresses starting at its address.</div>

  <div class="card">
    <p>A 12-element <code>int32_t</code> array: element 5 is at <code>0xFFFF7FFF0200</code> (4 bytes each).</p>
    <table class="cmp">
      <tr><th>Element</th><th>Change</th><th>Address</th></tr>
      <tr><td>4</td><td>&minus;4</td><td><code>0xFFFF7FFF01FC</code></td></tr>
      <tr><td>0</td><td>&minus;20</td><td><code>0xFFFF7FFF01EC</code></td></tr>
      <tr><td>11</td><td>+24</td><td><code>0xFFFF7FFF0218</code></td></tr>
    </table>
    <p>Element 4 occupies <code>0xFFFF7FFF01FC</code> &hellip; <code>0xFFFF7FFF01FF</code> (four byte addresses).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Address of element 4 (hex digits, no leading 0x needed)?</div>
      <input class="fillblank sm" data-answer="FFFF7FFF01FC~~~0xFFFF7FFF01FC~~~ffff7fff01fc~~~0xffff7fff01fc">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Element 5 minus 4 bytes.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Address of element 0?</div>
      <input class="fillblank sm" data-answer="FFFF7FFF01EC~~~0xFFFF7FFF01EC~~~ffff7fff01ec~~~0xffff7fff01ec">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">5 elements &times; 4 = 20 bytes below element 5.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Address of element 11?</div>
      <input class="fillblank sm" data-answer="FFFF7FFF0218~~~0xFFFF7FFF0218~~~ffff7fff0218~~~0xffff7fff0218">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6 elements &times; 4 = 24 bytes above element 5.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the address of the <b>last byte</b> of element 4?</div>
      <input class="fillblank sm" data-answer="FFFF7FFF01FF~~~0xFFFF7FFF01FF~~~ffff7fff01ff~~~0xffff7fff01ff">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Element 4 spans 4 bytes ending just before element 5.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Element 5 is at address A and each element is 8 bytes. What is the address of element 3?</div>
      <button class="opt" data-i="0">A &minus; 2</button>
      <button class="opt" data-i="1">A &minus; 8</button>
      <button class="opt" data-i="2">A &minus; 16</button>
      <button class="opt" data-i="3">A &minus; 24</button>
      <div class="fb">2 elements &times; 8 bytes.</div>
    </div>
  </div>
</section>

<section class="topic" id="l32-q23">
  <h2>HW07 &middot; Q2&ndash;Q3: Pointer Arithmetic Concepts and Code Tracing</h2>
  <div class="concept"><code>ptr++</code> moves to the <b>next element of the pointed-to type</b> (for an <code>int *</code> with 4-byte ints, +4 bytes; for a <code>char *</code>, +1). The pointer type must match the element type so the step is right. <code>p[i]</code> is <code>*(p + i)</code>; <code>ptr = ptr + N</code> moves <b>N elements</b>. Pointer arithmetic means the same thing for every type but the <b>byte offset depends on the type</b>. The danger is <b>going out of bounds</b>. For 2D arrays: Method 1 (single malloc) is contiguous so one pointer can traverse it; Method 2 (array of rows) needs the pointer reset for each row.</div>

  <div class="card">
    <p>Tracing examples (outputs from running the code):</p>
<pre>int a[] = {11, 22, 33, 44, 55}; int *p = a;
printf("%d", *(p + 3));                           // 44

int a[] = {3, 5, 7, 9}; int *p = a; int sum = 0;
for (int i = 0; i &lt; 4; i++) { sum += *p; p++; }    // 24

int a[] = {4, 8, 12, 16}; int *p = &amp;a[2]; *p = 77;
printf("%d %d", a[2], *(a + 2));                  // 77 77

int a[] = {1,2,3,4,5,6,7,8}; int *p = &amp;a[1];
*p = -5; p += 5; *p = 888;
printf("%d %d", a[1], a[6]);                      // -5 888

char s[] = "world"; char *p = s; p += 3; printf("%c", *p);   // l</pre>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What does <code>iptr++</code> do for an <code>int *</code> (4-byte int)?</div>
      <button class="opt" data-i="0">Adds 1 to the address</button>
      <button class="opt" data-i="1">Adds 2</button>
      <button class="opt" data-i="2">Adds 4</button>
      <button class="opt" data-i="3">Adds 8</button>
      <div class="fb">One int.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which statement is true about pointer arithmetic and array indexing?</div>
      <button class="opt" data-i="0">They are different mechanisms</button>
      <button class="opt" data-i="1">They are unrelated</button>
      <button class="opt" data-i="2">They are two views of the same operation</button>
      <button class="opt" data-i="3">Pointer arithmetic is deprecated</button>
      <div class="fb"><code>p[i]</code> is <code>*(p + i)</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>iptr += 4;</code> do if iptr is an <code>int32_t *</code>?</div>
      <button class="opt" data-i="0">Move forward 4 bytes</button>
      <button class="opt" data-i="1">Move forward 16 bytes</button>
      <button class="opt" data-i="2">Move forward 32 bytes</button>
      <button class="opt" data-i="3">Move forward 64 ints</button>
      <div class="fb">4 elements &times; 4 bytes.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does <code>cptr = letters;</code> work for a <code>char letters[]</code>?</div>
      <button class="opt" data-i="0">Arrays are copied into pointers</button>
      <button class="opt" data-i="1">Arrays decay to a pointer to their first element</button>
      <button class="opt" data-i="2">letters is already a pointer</button>
      <button class="opt" data-i="3">It only works for char</button>
      <div class="fb">Decay.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which situation requires resetting a pointer for each row?</div>
      <button class="opt" data-i="0">Static 2D arrays</button>
      <button class="opt" data-i="1">Method 1 dynamic 2D arrays</button>
      <button class="opt" data-i="2">Method 2 dynamic 2D arrays</button>
      <button class="opt" data-i="3">All 2D arrays</button>
      <div class="fb">Rows are separate heap blocks.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>int a[] = {3, 6, 9, 12, 15}; int *p = a + 1; printf("%d %d", p[1], *(p + 2));</code> print?</div>
      <input class="fillblank sm" data-answer="9 12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">p points at 6; p[1] is 9 and *(p + 2) is 12.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>int a[] = {20, 30, 40, 50}; int *p = a; int *q = p + 3; *q = *p + 100; printf("%d", a[3]);</code> print?</div>
      <input class="fillblank sm" data-answer="120">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">*q is a[3], set to 20 + 100.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With a Method 1 2&times;4 grid (<code>a[i*4 + j] = 10*i + j</code>), what does <code>int *p = a + 1; printf("%d", *(p + 4));</code> print?</div>
      <input class="fillblank sm" data-answer="11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">p + 4 = a + 5 = row 1, column 1 = 11.</div>
    </div>
  </div>
</section>

<section class="topic" id="l32-q45">
  <h2>HW07 &middot; Q4&ndash;Q5: malloc, free and Dynamic-Memory Tracing</h2>
  <div class="concept">Facts: <code>void *malloc(size_t size)</code> in <code>&lt;stdlib.h&gt;</code>; returns NULL on failure; <code>malloc(10 * sizeof(int))</code> is 10 integers; heap lifetime lasts until <code>free</code> (or program end). Bugs: <b>leak</b> (forgot free), <b>double free</b>, <b>use-after-free</b>. Tracing questions combine aliases, offsets and frees.</div>

  <div class="card">
<pre>int *p = malloc(2 * sizeof(int)); p[0] = 4; p[1] = 6;
printf("%d", p[0] + p[1]); free(p);                       // 10

int *p = malloc(4 * sizeof(int));
for (int i = 0; i &lt; 4; i++) p[i] = i + 3;
int *q = p + 3; printf("%d", *q); free(p);                // 6

int *p = malloc(sizeof(int)); int *q = p; *q = 33;
printf("%d", *p); free(q);                                // 33

int *p = malloc(sizeof(int)); *p = 55;
int *q = malloc(sizeof(int)); *q = *p;
free(p); printf("%d", *q); free(q);                       // 55

int *p = malloc(3 * sizeof(int)); p[0] = 8; p[1] = 9; p[2] = 10;
p += 2; printf("%d", *p); p -= 2; free(p);                // 10</pre>
    <table class="cmp">
      <tr><th>Fragment</th><th>Result</th></tr>
      <tr><td><code>p = malloc(4); free(p); printf("%d", *p);</code></td><td>undefined behavior (use-after-free)</td></tr>
      <tr><td><code>int *q = p; free(p); free(q);</code></td><td>double free (undefined behavior)</td></tr>
      <tr><td><code>free(p); p = NULL; free(p);</code></td><td>fine: free(NULL) does nothing</td></tr>
      <tr><td><code>p = malloc(4); p = malloc(4);</code></td><td>memory leak: first block lost</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Check</span>Which header declares <code>malloc</code>?</div>
      <button class="opt" data-i="0">stdio.h</button>
      <button class="opt" data-i="1">string.h</button>
      <button class="opt" data-i="2">malloc.h</button>
      <button class="opt" data-i="3">stdlib.h</button>
      <div class="fb">stdlib.h.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>malloc(10 * sizeof(int))</code> allocate?</div>
      <button class="opt" data-i="0">10 bytes</button>
      <button class="opt" data-i="1">Space for 10 integers</button>
      <button class="opt" data-i="2">sizeof(int) integers</button>
      <button class="opt" data-i="3">10 pointers to int</button>
      <div class="fb">count &times; element size.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which causes a memory leak?</div>
      <button class="opt" data-i="0">Calling free twice on a pointer</button>
      <button class="opt" data-i="1">Forgetting to call free</button>
      <button class="opt" data-i="2">Accessing memory after free</button>
      <button class="opt" data-i="3">Freeing NULL</button>
      <div class="fb">Allocated and never freed.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is wrong with <code>int *p = malloc(8 * sizeof(int)); free(p); p[0] = 5;</code>?</div>
      <button class="opt" data-i="0">malloc must be cast</button>
      <button class="opt" data-i="1">p[0] is used after the memory is freed</button>
      <button class="opt" data-i="2">p must be NULL before freeing</button>
      <button class="opt" data-i="3">Nothing</button>
      <div class="fb">Use-after-free.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What happens with <code>int *p = malloc(sizeof(int)); int *q = p; free(p); free(q);</code>?</div>
      <button class="opt" data-i="0">It is a correct program</button>
      <button class="opt" data-i="1">A double free (undefined behavior)</button>
      <button class="opt" data-i="2">A compile error</button>
      <button class="opt" data-i="3">Only a leak</button>
      <div class="fb">q aliases p.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is printed by the first example (<code>p[0] + p[1]</code> = 4 + 6)?</div>
      <input class="fillblank sm" data-answer="10">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4 + 6.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is printed by <code>p += 2; printf("%d", *p);</code> in the last example?</div>
      <input class="fillblank sm" data-answer="10">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">p moves to p[2] = 10; it is restored with p -= 2 before free.</div>
    </div>
  </div>
</section>

<section class="topic" id="l32-q6">
  <h2>HW07 &middot; Q6: Lifetime vs Scope</h2>
  <div class="concept"><b>Scope</b> = the region of code where a variable's <b>name</b> is recognized by the compiler (compile time). <b>Lifetime</b> = how long the memory <b>physically exists</b> (run time). <b>Automatic</b> locals end at the closing brace; <b>static</b> variables (globals and <code>static</code> locals) last for the whole run; <b>heap</b> memory lives until <code>free</code>. A <code>static</code> local has function scope but program lifetime. A <b>dangling pointer</b> is a pointer whose scope is still active but whose target's lifetime has ended. <code>return &amp;local;</code> is a bug for that reason.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Declaration</th><th>Scope</th><th>Lifetime</th></tr>
      <tr><td><code>int x;</code> inside a function</td><td>that block</td><td>automatic: until the closing <code>}</code></td></tr>
      <tr><td><code>static int n;</code> inside a function</td><td>that function</td><td>static: the whole run</td></tr>
      <tr><td><code>int g;</code> outside all functions</td><td>the file (from the declaration)</td><td>static: the whole run</td></tr>
      <tr><td>block from <code>malloc</code></td><td>(no name; reached through a pointer)</td><td>dynamic: until <code>free</code></td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which best describes scope in C?</div>
      <button class="opt" data-i="0">The bytes allocated to a variable</button>
      <button class="opt" data-i="1">The address where a pointer is stored</button>
      <button class="opt" data-i="2">The region of code where a variable's name is recognized by the compiler</button>
      <button class="opt" data-i="3">The time a variable occupies RAM</button>
      <div class="fb">Scope is a compile-time notion.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>A <code>static</code> local variable has&hellip;</div>
      <button class="opt" data-i="0">global scope and function lifetime</button>
      <button class="opt" data-i="1">function scope but lifetime for the whole program run</button>
      <button class="opt" data-i="2">heap lifetime</button>
      <button class="opt" data-i="3">scope and lifetime limited to the call</button>
      <div class="fb">It keeps its value between calls.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>When does an automatic variable's lifetime end?</div>
      <button class="opt" data-i="0">When free() is called</button>
      <button class="opt" data-i="1">When the program reaches the closing brace of the block where it was defined</button>
      <button class="opt" data-i="2">When the computer is turned off</button>
      <button class="opt" data-i="3">When it is no longer used</button>
      <div class="fb">At the closing brace.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>A function ends without freeing a local pointer to malloc'd memory. What happens?</div>
      <button class="opt" data-i="0">The compiler inserts free</button>
      <button class="opt" data-i="1">The pointer's scope ends but the allocated memory lives on, a leak</button>
      <button class="opt" data-i="2">The memory lifetime ends automatically</button>
      <button class="opt" data-i="3">The pointer becomes global</button>
      <div class="fb">Heap lifetime needs free.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which is a <b>lifetime</b> error rather than a scope error?</div>
      <button class="opt" data-i="0">Using a variable declared in function A inside function B</button>
      <button class="opt" data-i="1">Dereferencing a pointer to a local variable after its function returned</button>
      <button class="opt" data-i="2">Using an undeclared variable</button>
      <button class="opt" data-i="3">Declaring a variable twice</button>
      <div class="fb">The name may be in scope but the memory is gone.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">Check</span>A variable can be within its lifetime but out of scope.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> A static local between calls.</div>
    </div>
  </div>
</section>

<section class="topic" id="l32-q7">
  <h2>HW07 &middot; Q7: Misaligned Pointers (Same Bytes, Different Pointer Types)</h2>
  <div class="concept">Cast an <code>int32_t</code> array to a pointer of another size and read it back: <b>no bytes change</b>, only how they are grouped. On a little-endian machine each element is stored <b>least significant byte first</b>, so a smaller pointer sees the <b>low pieces first</b>; a bigger pointer builds each value with the <b>lower-addressed element in its low bits</b>.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Array</th><th>Read through</th><th>Result</th></tr>
      <tr><td><code>{0x0D0C0B0A, 0x99AABBCC}</code></td><td><code>uint8_t *</code> (8 values)</td><td><code>0A 0B 0C 0D CC BB AA 99</code></td></tr>
      <tr><td><code>{0x13572468, 0xFEDCBA98}</code></td><td><code>uint16_t *</code> (4 values)</td><td><code>2468 1357 BA98 FEDC</code></td></tr>
      <tr><td><code>{0x01234567, 0x89ABCDEF, 0x0F1E2D3C}</code></td><td><code>uint16_t *</code> (6 values)</td><td><code>4567 0123 CDEF 89AB 2D3C 0F1E</code></td></tr>
      <tr><td><code>{0x10203040, 0x50607080, 0x90A0B0C0, 0xD0E0F000}</code></td><td><code>uint64_t *</code> (2 values)</td><td><code>5060708010203040 D0E0F00090A0B0C0</code></td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>int32_t arr[2] = {0x0D0C0B0A, 0x99AABBCC};</code> read as <code>uint8_t *p</code>: what is <code>p[0]</code> (2 hex digits)?</div>
      <input class="fillblank sm" data-answer="0A~~~0x0A~~~0a~~~0x0a">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Least significant byte of the first element.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Same array: <code>p[4]</code>?</div>
      <input class="fillblank sm" data-answer="CC~~~0xCC~~~cc~~~0xcc">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Least significant byte of the second element.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>{0x13572468, 0xFEDCBA98}</code> read as <code>uint16_t *p</code>: <code>p[1]</code> (4 hex digits)?</div>
      <input class="fillblank sm" data-answer="1357~~~0x1357~~~1357~~~0x1357">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The high half of the first element.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Same array: <code>p[2]</code>?</div>
      <input class="fillblank sm" data-answer="BA98~~~0xBA98~~~ba98~~~0xba98">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The low half of the second element.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>{0x01234567, 0x89ABCDEF, 0x0F1E2D3C}</code> read as <code>uint16_t *p</code>: <code>p[4]</code>?</div>
      <input class="fillblank sm" data-answer="2D3C~~~0x2D3C~~~2d3c~~~0x2d3c">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The low half of arr[2].</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>{0x10203040, 0x50607080, 0x90A0B0C0, 0xD0E0F000}</code> read as <code>uint64_t *p</code>: <code>p[0]</code> (16 hex digits)?</div>
      <input class="fillblank sm" data-answer="5060708010203040~~~0x5060708010203040~~~5060708010203040~~~0x5060708010203040">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">arr[1] becomes the high 32 bits and arr[0] the low 32 bits.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does the pointer type change what you read from the same memory?</div>
      <button class="opt" data-i="0">The compiler converts the data</button>
      <button class="opt" data-i="1">Memory has no types: the pointer type determines how many bytes are read and grouped</button>
      <button class="opt" data-i="2">The bytes are rewritten when cast</button>
      <button class="opt" data-i="3">Only the first element is read</button>
      <div class="fb">Interpretation, not data, changes.</div>
    </div>
  </div>
</section>

</main>
`;
