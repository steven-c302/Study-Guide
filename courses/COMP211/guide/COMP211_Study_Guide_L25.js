/* ============================================================
   LESSON 25 — CL16 Intro to Pointers (program memory, addresses, pointers, &, *, NULL,
   aliasing, double pointers), incl. RD14. Pairs with Mastery unit u25.
   Injects into #l25. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l25').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l25-mem')">1 &middot; Parts of Program Memory</button>
  <button onclick="showTopic(this,'l25-addr')">2 &middot; Memory Addresses</button>
  <button onclick="showTopic(this,'l25-ptr')">3 &middot; Pointers: &amp; and *</button>
  <button onclick="showTopic(this,'l25-alias')">4 &middot; Aliasing &amp; Double Pointers</button>
  <button onclick="showTopic(this,'l25-rd14')">RD14 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l25-mem">
  <h2>CL16 &middot; Parts of Program Memory</h2>
  <div class="concept">A running program's memory is divided into regions. From the <b>lowest address</b> (0, reserved for the operating system) to the <b>highest</b>:</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Region</th><th>Holds</th><th>Behaviour</th></tr>
      <tr><td><b>Text</b></td><td>program instructions (the machine code of <code>main</code>, <code>max</code>, &hellip;)</td><td>fixed size</td></tr>
      <tr><td><b>Data</b></td><td>global and static variables</td><td>exists for the whole run</td></tr>
      <tr><td><b>Heap</b></td><td>dynamically allocated memory</td><td>grows as needed (later lectures)</td></tr>
      <tr><td><b>Stack</b></td><td>function stack frames: parameters, return address, local variables</td><td>grows toward <b>lower</b> addresses on each call, shrinks on return</td></tr>
    </table>
    <p>The stack is also called <b>automatic memory</b>: every call pushes a frame and every return pops it, <b>without the programmer doing anything</b>.</p>
  </div>

  <div class="card">
<pre>Highest address   +-----------------------+
                  |  Stack  (grows down)  |  &larr; function frames
                  |         ...           |
                  |  Heap   (grows up)    |  &larr; dynamic memory
                  |  Data                 |  &larr; globals, statics
                  |  Text                 |  &larr; instructions
Lowest address 0  |  Operating system     |
                  +-----------------------+</pre>
  </div>

  <div class="concept"><b>Scope and lifetime of a local variable.</b> A local variable is visible only in the <b>function body</b> where it is declared, and it exists only while that function's stack frame is on the stack. That is why two functions can both have a local named <code>val</code>: their scopes do not overlap and each has its own slot in its own frame. When a function returns its frame is deallocated and its locals become inaccessible. <b>Global</b> variables live for the entire program, but they reduce modularity and make debugging harder, so they are discouraged.</div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Where are the <b>instructions</b> of <code>main</code> stored?</div>
      <button class="opt" data-i="0">Stack</button>
      <button class="opt" data-i="1">Heap</button>
      <button class="opt" data-i="2">Text (code) segment</button>
      <button class="opt" data-i="3">Data segment</button>
      <div class="fb">Instructions live in the text segment.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which variable exists for the <b>entire</b> run of the program?</div>
      <button class="opt" data-i="0">A parameter of a function</button>
      <button class="opt" data-i="1">A local variable in a function</button>
      <button class="opt" data-i="2">A global variable</button>
      <button class="opt" data-i="3">A loop counter in main</button>
      <div class="fb">Globals live in the data segment.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>When <code>change(10)</code> is called, where is space for its parameter and locals allocated?</div>
      <button class="opt" data-i="0">The heap</button>
      <button class="opt" data-i="1">The stack (a new frame)</button>
      <button class="opt" data-i="2">The data segment</button>
      <button class="opt" data-i="3">Nowhere: they already exist</button>
      <div class="fb">Each call pushes a stack frame.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What happens to a function's locals when it returns?</div>
      <button class="opt" data-i="0">They move to the heap</button>
      <button class="opt" data-i="1">They become globals</button>
      <button class="opt" data-i="2">Its stack frame is deallocated and they become inaccessible</button>
      <button class="opt" data-i="3">They stay accessible forever</button>
      <div class="fb">The frame is popped.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>In which direction does the stack grow?</div>
      <button class="opt" data-i="0">Toward higher addresses</button>
      <button class="opt" data-i="1">Toward lower addresses</button>
      <button class="opt" data-i="2">It does not grow</button>
      <button class="opt" data-i="3">Alternately up and down</button>
      <div class="fb">Frames are pushed at progressively lower addresses.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can <code>max</code> and <code>change</code> both use a local named <code>val</code>?</div>
      <button class="opt" data-i="0">C renames them internally</button>
      <button class="opt" data-i="1">Because their scopes do not overlap</button>
      <button class="opt" data-i="2">One shadows the other</button>
      <button class="opt" data-i="3">Because they are stored on the heap</button>
      <div class="fb">Each local is visible only inside its own function.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Check</span>Global variables are generally encouraged because they are easy to access from every function.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> They reduce modularity and make debugging harder.</div>
    </div>
  </div>
</section>

<section class="topic" id="l25-addr">
  <h2>CL16 &middot; Memory Addresses and Address Size</h2>
  <div class="concept">Memory is a long row of <b>bytes</b>. Each byte has a numbered <b>address</b> (the addresses are not stored anywhere &mdash; they are just positions). With <i>n</i> address bits you can name <b>2<sup>n</sup></b> bytes, so naming <i>N</i> bytes needs <b>log<sub>2</sub>(N)</b> bits.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Memory size</th><th>Address bits</th></tr>
      <tr><td>8 bytes</td><td>log<sub>2</sub>(8) = 3 (<code>0b000</code>&hellip;<code>0b111</code>)</td></tr>
      <tr><td>16 bytes</td><td>log<sub>2</sub>(16) = 4</td></tr>
      <tr><td>1 GB = 2<sup>30</sup> bytes</td><td>30</td></tr>
      <tr><td>256 TB = 2<sup>48</sup> bytes</td><td>48</td></tr>
    </table>
  </div>

  <div class="card">
    <p><b>32-bit addresses</b> can name 2<sup>32</sup> bytes = <b>4 GB</b>. <b>64-bit addresses</b> can name 2<sup>64</sup> bytes (16 exabytes). 32-bit machines dominated from the mid-1980s through the 1990s; the move to 64-bit began in the early 2000s and was largely complete by 2010 &mdash; <b>this is why pointers are 8 bytes</b>. Most 64-bit CPUs use only 48&ndash;52 of the 64 bits (2<sup>48</sup> bytes = 256 TB is plenty and leaves room to grow).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many address bits are needed for a 1 GB memory (1 GB = 2<sup>30</sup> bytes)?</div>
      <input class="fillblank sm" data-answer="30">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">log<sub>2</sub>(2<sup>30</sup>) = 30.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many address bits to address 32 bytes?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2<sup>5</sup> = 32.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many GB can a 32-bit address space name?</div>
      <input class="fillblank sm" data-answer="4">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2<sup>32</sup> bytes / 2<sup>30</sup> = 4 GB.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many GB can a 35-bit address space name?</div>
      <input class="fillblank sm" data-answer="32">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2<sup>35&minus;30</sup> = 32 GB.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why are pointers 8 bytes on a modern machine?</div>
      <button class="opt" data-i="0">They store a double</button>
      <button class="opt" data-i="1">Modern machines use 64-bit addresses (8 bytes)</button>
      <button class="opt" data-i="2">Pointers always include the size of the variable</button>
      <button class="opt" data-i="3">The compiler pads them</button>
      <div class="fb">64 bits = 8 bytes.</div>
    </div>
  </div>
</section>

<section class="topic" id="l25-ptr">
  <h2>CL16 &middot; What a Pointer Is, <code>&amp;</code>, <code>*</code> and NULL</h2>
  <div class="concept">A <b>pointer</b> is a variable that stores a <b>memory address</b> &mdash; where a value lives, not the value itself. Declaration: <code>type *name;</code>.</div>

  <div class="card">
<pre>int    *p;     // p is a pointer to an int
char   *c;     // c is a pointer to a char
double *d;     // d is a pointer to a double</pre>
    <p><b>Pointer types matter</b>: an <code>int8_t *</code> can point only at <code>int8_t</code> variables, <code>int16_t *</code> only at <code>int16_t</code>, and so on. <b>All pointers are 8 bytes</b> (they all hold a 64-bit address) no matter what they point to.</p>
  </div>

  <h3>Address-of and dereference</h3>

  <div class="card">
<pre>int x = 5;
int *p = &amp;x;     // &amp; gets the address of x; p now holds it
*p = 10;         // * follows the address: x is now 10
int y = *p;      // reading through the pointer: y is 10</pre>
    <p><code>&amp;</code> (<b>address-of</b>) gives where a variable lives. <code>*</code> (<b>dereference</b>) follows an address to <b>read</b> (right-hand side) or <b>write</b> (left-hand side) the value there. In a memory diagram: <b>follow the arrow once, then read or write that location.</b></p>
  </div>

  <div class="card">
<pre>main frame             value of p is "pointer to stack":
  RA(8):  0
  x(4):   5  &rarr; 10   &larr;------+
  p(8):   ----------------+   (the arrow points at x)</pre>
  </div>

  <h3>NULL</h3>

  <div class="card">
    <p><code>NULL</code> marks an invalid or uninitialized pointer: <code>int *p = NULL;</code>. <b>Never dereference it</b>: <code>*p = 6;</code> crashes with a <b>segmentation fault</b>.</p>
  </div>

  <h3>Worked traces (compiled and run)</h3>

  <div class="card">
<pre>int x = 5;
int *p = &amp;x;
*p = 8;
printf("%d", x);       // 8</pre>
<pre>int32_t x = 1;  int32_t y = 2;
int32_t *p = &amp;x;
*p = *p + y;           // read x (1) + y (2); write 3 into x
printf("%d %d", x, y); // 3 2</pre>
<pre>int8_t a = 3;  int8_t b = 7;
int8_t *p = &amp;a;
p = &amp;b;                // p now points to b (a is untouched)
*p = 10;               // writes b
printf("%d %d", a, b); // 3 10</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the first trace above print?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The write through p changed x.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What do <code>x</code> and <code>y</code> print in the second trace (like <code>3 2</code>)?</div>
      <input class="fillblank sm" data-answer="3 2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The right side reads x (1) + y (2) = 3 and writes it into x.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What do <code>a</code> and <code>b</code> print in the third trace?</div>
      <input class="fillblank sm" data-answer="3 10">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Only b changes: <code>p = &amp;b</code> retargets p first.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which operator obtains the <b>address</b> of a variable?</div>
      <button class="opt" data-i="0">*</button>
      <button class="opt" data-i="1">&amp;</button>
      <button class="opt" data-i="2">-&gt;</button>
      <button class="opt" data-i="3">#</button>
      <div class="fb"><code>&amp;x</code> is the address of x.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which operator accesses the value at the address a pointer holds?</div>
      <button class="opt" data-i="0">&amp;</button>
      <button class="opt" data-i="1">*</button>
      <button class="opt" data-i="2">@</button>
      <button class="opt" data-i="3">-&gt;</button>
      <div class="fb"><code>*p</code> dereferences p.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>int *ptr;</code> mean?</div>
      <button class="opt" data-i="0">ptr is an integer multiplied by something</button>
      <button class="opt" data-i="1">ptr is a pointer to an integer</button>
      <button class="opt" data-i="2">ptr is the value at an integer address</button>
      <button class="opt" data-i="3">ptr is an integer</button>
      <div class="fb">The star in a declaration makes ptr a pointer.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which is a valid initialization of a pointer?</div>
      <button class="opt" data-i="0">int *p = 5;</button>
      <button class="opt" data-i="1">int x; int *p = &amp;x;</button>
      <button class="opt" data-i="2">int *p = *x;</button>
      <button class="opt" data-i="3">int p = &amp;x;</button>
      <div class="fb">A pointer must be initialized with an address (or NULL).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does assigning NULL to a pointer mean?</div>
      <button class="opt" data-i="0">The pointer points to the value 0</button>
      <button class="opt" data-i="1">The pointer does not point to a valid location</button>
      <button class="opt" data-i="2">The pointer points to a function</button>
      <button class="opt" data-i="3">The pointer is deleted</button>
      <div class="fb">It marks an invalid/uninitialized pointer.</div>
    </div>
  </div>
</section>

<section class="topic" id="l25-alias">
  <h2>CL16 &middot; Aliasing and Double Pointers</h2>
  <div class="concept"><b>Aliasing</b> happens when two or more pointers point to the <b>same location</b>. Writing through one changes what the other sees. A <b>double pointer</b> (<code>int **dp</code>) is a pointer to a pointer: <code>dp</code> stores the address of an <code>int *</code>; <code>*dp</code> is that <code>int *</code>; <code>**dp</code> is the <code>int</code>. <b>Follow the arrow twice.</b></div>

  <div class="card">
<pre>int16_t x = 5;  int16_t y = 10;
int16_t *p = &amp;x;
int16_t *q = p;        // q is an alias of p: both point to x
*q = 20;
printf("%d, %d, %d, %d", x, *p, y, *q);   // 20, 20, 10, 20</pre>
  </div>

  <div class="card">
<pre>int64_t x = 4;  int64_t y = 7;
int64_t *p = &amp;x;  int64_t *q = &amp;y;
*p = *q;               // copies the VALUE 7 into x (p still points to x)
*q = 10;               // y becomes 10
printf("%ld, %ld, %ld, %ld", x, *p, y, *q);   // 7, 7, 10, 10</pre>
  </div>

  <div class="card">
<pre>int16_t x = 5;
int16_t *p = &amp;x;
int16_t **dp = &amp;p;     // dp holds the address of p
**dp = 30;             // follow dp to p, follow p to x, write 30
printf("%d %d %d", x, *p, **dp);              // 30 30 30</pre>
  </div>

  <div class="card">
    <p><b>Harder: change where a pointer points through a double pointer.</b></p>
<pre>int32_t a = 10, b = 20;
int32_t *p = &amp;a, *q = &amp;b;
int32_t **pp = &amp;p;
*pp = q;               // writes into p: p now points to b
**pp = *p + a;         // reads b (20) + a (10) = 30; writes 30 into b
printf("a = %d, b = %d, *p = %d, *q = %d", a, b, *p, *q);
// a = 10, b = 30, *p = 30, *q = 30</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the aliasing example print? (four values, comma separated like the output above)</div>
      <input class="fillblank sm" data-answer="20, 20, 10, 20">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">q is an alias for p, so the write through q changes x: 20, 20, 10, 20.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the <code>*p = *q</code> example print?</div>
      <input class="fillblank sm" data-answer="7, 7, 10, 10">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>*p = *q</code> copies 7 into x; then y becomes 10.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the double-pointer write example print?</div>
      <input class="fillblank sm" data-answer="30 30 30">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">**dp follows two arrows and writes x.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the chained example, what does <code>b</code> end as?</div>
      <input class="fillblank sm" data-answer="30">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>*pp = q</code> makes p point at b, then <code>**pp = *p + a</code> writes 20 + 10 into b.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is <code>int **pp</code>?</div>
      <button class="opt" data-i="0">A pointer to an int</button>
      <button class="opt" data-i="1">A pointer to a pointer to an int</button>
      <button class="opt" data-i="2">A 2-D array</button>
      <button class="opt" data-i="3">A reference to an int</button>
      <div class="fb">Two levels of indirection.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>After <code>int *q = p;</code>, which statement is true?</div>
      <button class="opt" data-i="0">q and p hold the same address (aliases)</button>
      <button class="opt" data-i="1">q holds a copy of the value p points to</button>
      <button class="opt" data-i="2">q and p are the same variable</button>
      <button class="opt" data-i="3">q points to p</button>
      <div class="fb">Both point at the same target.</div>
    </div>
  </div>
</section>

<section class="topic" id="l25-rd14">
  <h2>RD14 Self-Check &middot; Parts of Program Memory and Pointers (DiS 2.1, 2.2)</h2>
  <p class="muted">Fresh questions on the two RD14 sections: program memory and the stack (2.1) and pointer basics (2.2).</p>

  <div class="card">
  <h3>Section 2.1 &middot; Memory and the stack</h3>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>What best describes the <b>scope</b> of a local variable?</div>
      <button class="opt" data-i="0">The entire program</button>
      <button class="opt" data-i="1">The function body in which it is declared</button>
      <button class="opt" data-i="2">The file it appears in</button>
      <button class="opt" data-i="3">All functions called after its declaration</button>
      <div class="fb">Local variables are visible only inside their function.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>Which variable exists for the entire duration of the program?</div>
      <button class="opt" data-i="0">A local variable in main</button>
      <button class="opt" data-i="1">A parameter of a function</button>
      <button class="opt" data-i="2">A global variable (e.g. <code>g_x</code>)</button>
      <button class="opt" data-i="3">A loop variable</button>
      <div class="fb">Globals live for the whole run.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>Which statement best describes the stack?</div>
      <button class="opt" data-i="0">It stores dynamically allocated memory</button>
      <button class="opt" data-i="1">It stores function instructions</button>
      <button class="opt" data-i="2">It stores local variables and parameters for active function calls</button>
      <button class="opt" data-i="3">It stores global variables</button>
      <div class="fb">Frames of active calls.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q4</span>What happens when a function returns?</div>
      <button class="opt" data-i="0">Its locals move to the heap</button>
      <button class="opt" data-i="1">Its stack frame is deallocated</button>
      <button class="opt" data-i="2">Its parameters become global</button>
      <button class="opt" data-i="3">Its locals stay accessible</button>
      <div class="fb">The frame is popped.</div>
    </div>
  </div>

  <div class="card">
  <h3>Section 2.2 &middot; Pointers</h3>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>What does a pointer variable store?</div>
      <button class="opt" data-i="0">A primitive value like an int</button>
      <button class="opt" data-i="1">The address of a variable</button>
      <button class="opt" data-i="2">The size of a memory location</button>
      <button class="opt" data-i="3">A function reference</button>
      <div class="fb">An address.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q6</span>Which is the dereference operator?</div>
      <button class="opt" data-i="0">&amp;</button>
      <button class="opt" data-i="1">*</button>
      <button class="opt" data-i="2">-&gt;</button>
      <button class="opt" data-i="3">#</button>
      <div class="fb"><code>*p</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q7</span>Write the declaration of a pointer to a <code>double</code> named <code>d</code> (include the semicolon, e.g. <code>int *p;</code>).</div>
      <input class="fillblank sm" data-answer="double *d;~~~double* d;~~~double * d;">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>double *d;</code></div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q8</span>What does <code>int *p = NULL; *p = 6;</code> cause? (one or two words)</div>
      <input class="fillblank sm" data-answer="segmentation fault~~~segfault~~~crash~~~a segmentation fault">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Dereferencing NULL accesses invalid memory.</div>
    </div>
  </div>
</section>

</main>
`;
