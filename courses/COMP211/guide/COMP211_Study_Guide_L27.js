/* ============================================================
   LESSON 27 — HW06 · Pointers (homework review): basic pointers and strings, sizeof, double
   pointers, array-element addresses, bytes in a memory dump, pointer arithmetic. Fresh
   examples. Pairs with Mastery units u25 and u26.
   Injects into #l27. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l27').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l27-intro')">1 &middot; What HW06 Asks</button>
  <button onclick="showTopic(this,'l27-q12')">2 &middot; Q1&ndash;Q2 Basic Pointers</button>
  <button onclick="showTopic(this,'l27-q3')">3 &middot; Q3 sizeof</button>
  <button onclick="showTopic(this,'l27-q4')">4 &middot; Q4 Double Pointers</button>
  <button onclick="showTopic(this,'l27-q5')">5 &middot; Q5 Element Addresses</button>
  <button onclick="showTopic(this,'l27-q6')">6 &middot; Q6 Bytes in Memory</button>
  <button onclick="showTopic(this,'l27-q78')">7 &middot; Q7&ndash;Q8 Pointer Arithmetic</button>
</nav>
<main>

<section class="topic active" id="l27-intro">
  <h2>HW06 &middot; Pointers: What the Homework Covers</h2>
  <div class="concept">HW06 (28 points, autograded) has eight question groups: <b>Q1&ndash;Q2</b> basic pointer practice, <b>Q3</b> <code>sizeof</code>, <b>Q4</b> double pointers, <b>Q5</b> array-element addresses, <b>Q6</b> reading bytes from a memory dump, <b>Q7&ndash;Q8</b> pointer arithmetic.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Group</th><th>Skill</th><th>Rule to remember</th></tr>
      <tr><td>Q1&ndash;Q2</td><td>follow arrows, strings through <code>char *</code></td><td><code>*p</code> reads/writes the target; <code>p = q</code> copies an address</td></tr>
      <tr><td>Q3</td><td><code>sizeof</code></td><td>pointer = 8; array = elements &times; element size; array parameter = pointer</td></tr>
      <tr><td>Q4</td><td><code>int **</code></td><td>follow the arrow twice; <code>*pp = &amp;b</code> retargets p</td></tr>
      <tr><td>Q5</td><td>addresses of array elements</td><td><code>base + sizeof(elem) &times; i</code></td></tr>
      <tr><td>Q6</td><td>bytes/words from a dump</td><td>little endian: lowest address = least significant byte</td></tr>
      <tr><td>Q7&ndash;Q8</td><td>pointer arithmetic</td><td><code>p + n</code> adds <code>n &times; sizeof(*p)</code> bytes</td></tr>
    </table>
  </div>

  <div class="card">
    <p class="muted">The lessons behind each group: <b>CL16 Intro to Pointers</b> (Q1, Q2, Q4) and <b>CL17 Pointers and Functions</b> (Q3, Q5&ndash;Q8). These are fresh questions of the same kinds, not the graded ones.</p>
  </div>
</section>

<section class="topic" id="l27-q12">
  <h2>HW06 &middot; Q1&ndash;Q2: Basic Pointer Practice</h2>
  <div class="concept">Pointer assignment (<code>p = q</code>) copies an <b>address</b>; dereference assignment (<code>*p = v</code>) writes a <b>value</b> into the pointee. A <code>char *</code> into a string moves one character per step, and <code>%s</code> prints from the pointer to the terminating NUL.</div>

  <div class="card">
<pre>int x = 8;  int *ptr = &amp;x;  *ptr = 10;                  // x = 10
int x = 30; int *a = &amp;x; int *b = a; *b = 45;            // x = 45
int x = 5, y = 9; int *p = &amp;x, *q = &amp;y; p = q; *p = 100; // x y = 5 100</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the value of <code>x</code> after <code>int x = 8; int *ptr = &amp;x; *ptr = 10;</code>?</div>
      <input class="fillblank sm" data-answer="10">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The write goes through the pointer into x.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Value of <code>x</code> after <code>int x = 30; int *a = &amp;x; int *b = a; *b = 45;</code>?</div>
      <input class="fillblank sm" data-answer="45">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">b is an alias of a.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What do x and y hold afterwards (format <code>5 100</code>)? <code>p = q; *p = 100;</code></div>
      <input class="fillblank sm" data-answer="5 100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>p = q</code> retargets p to y; the write changes y.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What happens when <code>int *ptr = NULL; *ptr = 6;</code> executes?</div>
      <button class="opt" data-i="0">ptr points to 6</button>
      <button class="opt" data-i="1">The program prints 6</button>
      <button class="opt" data-i="2">A segmentation fault</button>
      <button class="opt" data-i="3">Nothing</button>
      <div class="fb">Dereferencing NULL is invalid.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>ptr1 = ptr2;</code> do?</div>
      <button class="opt" data-i="0">Copies the value pointed to by ptr2 into ptr1's pointee</button>
      <button class="opt" data-i="1">Makes ptr1 point to the same location as ptr2</button>
      <button class="opt" data-i="2">Dereferences ptr2</button>
      <button class="opt" data-i="3">Copies ptr2's type</button>
      <div class="fb">The addresses are copied.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which is the correct way to assign 40 to <code>x</code> using <code>int *ptr = &amp;x;</code>?</div>
      <button class="opt" data-i="0">ptr = 40;</button>
      <button class="opt" data-i="1">*ptr = 40;</button>
      <button class="opt" data-i="2">&amp;ptr = 40;</button>
      <button class="opt" data-i="3">*x = 40;</button>
      <div class="fb">Dereference the pointer.</div>
    </div>
  </div>

  <h3>Strings through pointers (Q2)</h3>

  <div class="card">
<pre>void f(char *s) { while (*s) { *s = 'X'; s++; } }
char s[] = "abc";  f(s);  printf("%s", s);      // XXX
char s[] = "wxyz"; printf("%c", *(s + 2));       // y
char *p = s + 2;   printf("%s", p + 1);          // z
char s[10] = "ok"; char *p = s; *p = 'O'; printf("%s", s);   // Ok</pre>
  </div>

  <div class="card">
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Check</span>What is passed to a function when an array is the argument?</div>
      <button class="opt" data-i="0">A copy of the entire array</button>
      <button class="opt" data-i="1">The size of the array</button>
      <button class="opt" data-i="2">The number of elements</button>
      <button class="opt" data-i="3">A pointer to the first element</button>
      <div class="fb">The array decays to a pointer.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>char s[] = "wxyz"; printf("%c", *(s + 2));</code> print?</div>
      <input class="fillblank sm" data-answer="y">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>s + 2</code> points at the third character.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>char s[] = "wxyz"; char *p = s + 2; printf("%s", p + 1);</code> print?</div>
      <input class="fillblank sm" data-answer="z">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">p + 1 points at the last letter; %s stops at the NUL.</div>
    </div>
  </div>
</section>

<section class="topic" id="l27-q3">
  <h2>HW06 &middot; Q3: The <code>sizeof</code> Operator</h2>
  <div class="concept"><code>sizeof</code> reports the number of <b>bytes</b> of a type or expression. <b>Pointers and addresses are always 8 bytes</b> (<code>sizeof(&amp;x)</code> too). An <b>array</b> reports its <b>total</b> size, and <code>sizeof(a) / sizeof(a[0])</code> is the element count &mdash; but only where <code>a</code> is the actual array, not a parameter that decayed to a pointer. A string array includes the terminating NUL: <code>char t[] = "hello"</code> is 6 bytes; <code>char *s = "hello"</code> is just a pointer (8).</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Declaration</th><th>Expression</th><th>sizeof</th></tr>
      <tr><td><code>double d;</code></td><td><code>d</code></td><td><b>8</b></td></tr>
      <tr><td><code>int *p;</code></td><td><code>p</code></td><td><b>8</b></td></tr>
      <tr><td><code>int16_t a[8];</code></td><td><code>a</code></td><td><b>16</b></td></tr>
      <tr><td><code>int64_t **pp;</code></td><td><code>*pp</code></td><td><b>8</b></td></tr>
      <tr><td><code>char c[50];</code></td><td><code>c</code></td><td><b>50</b></td></tr>
      <tr><td><code>char t[] = "hello";</code></td><td><code>t</code></td><td><b>6</b></td></tr>
      <tr><td><code>double a[5];</code></td><td><code>a</code></td><td><b>40</b></td></tr>
      <tr><td><code>int32_t x;</code></td><td><code>&x</code></td><td><b>8</b></td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>double d;</code>, what is <code>sizeof(d)</code>?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A pointer (or an address) is 8 bytes on a 64-bit machine; double is also 8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>int *p;</code>, what is <code>sizeof(p)</code>?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A pointer (or an address) is 8 bytes on a 64-bit machine; double is also 8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>int16_t a[8];</code>, what is <code>sizeof(a)</code>?</div>
      <input class="fillblank sm" data-answer="16">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Array: elements &times; element size (strings include the NUL).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>int64_t **pp;</code>, what is <code>sizeof(*pp)</code>?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A pointer (or an address) is 8 bytes on a 64-bit machine; double is also 8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>char c[50];</code>, what is <code>sizeof(c)</code>?</div>
      <input class="fillblank sm" data-answer="50">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Array: elements &times; element size (strings include the NUL).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>char t[] = "hello";</code>, what is <code>sizeof(t)</code>?</div>
      <input class="fillblank sm" data-answer="6">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Array: elements &times; element size (strings include the NUL).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>double a[5];</code>, what is <code>sizeof(a)</code>?</div>
      <input class="fillblank sm" data-answer="40">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Array: elements &times; element size (strings include the NUL).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>int32_t x;</code>, what is <code>sizeof(&x)</code>?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A pointer (or an address) is 8 bytes on a 64-bit machine; double is also 8.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Given <code>int32_t a[10]; int32_t *p = a;</code>, what is <code>sizeof(p)</code>?</div>
      <button class="opt" data-i="0">4</button>
      <button class="opt" data-i="1">8</button>
      <button class="opt" data-i="2">40</button>
      <button class="opt" data-i="3">10</button>
      <div class="fb">p is a pointer: 8 bytes. (<code>sizeof(a)</code> is 40.)</div>
    </div>
  </div>
</section>

<section class="topic" id="l27-q4">
  <h2>HW06 &middot; Q4: Double Pointers</h2>
  <div class="concept"><code>int **pp</code> holds the address of an <code>int *</code>. <b>Follow the arrow once</b> (<code>*pp</code>) to reach the pointer, <b>twice</b> (<code>**pp</code>) to reach the int. Assigning <b>through</b> a double pointer (<code>*pp = &amp;b</code>) changes <b>which variable the original pointer points to</b>. A function taking <code>int **p</code> can therefore modify the <b>caller's pointer</b>, e.g. <code>*p = NULL;</code> or <code>(*p)++;</code> (advance to the next element).</div>

  <div class="card">
<pre>int x = 5; int *p = &amp;x; int **pp = &amp;p;  printf("%d", **pp);   // 5
int a = 1, b = 2; int *p = &amp;a; int **pp = &amp;p; *pp = &amp;b; printf("%d", *p);   // 2
int x = 7; int *p = &amp;x; int **pp = &amp;p; **pp = 42; printf("%d", x);          // 42
void f(int **p) { (*p)++; }   int arr[3] = {5,6,7}; int *p = arr; f(&amp;p); printf("%d", *p);   // 6</pre>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is <code>int **p</code>?</div>
      <button class="opt" data-i="0">A pointer to an int</button>
      <button class="opt" data-i="1">A pointer to a pointer to an int</button>
      <button class="opt" data-i="2">A 3-D integer array</button>
      <button class="opt" data-i="3">A reference to an int</button>
      <div class="fb">Two stars: a pointer to an <code>int *</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is printed by the first line above (<code>**pp</code> with x = 5)?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Follow the arrows twice.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the second line print?</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>*pp = &amp;b</code> makes p point at b.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the <code>f(&amp;p)</code> example print?</div>
      <input class="fillblank sm" data-answer="6">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>(*p)++</code> advances the caller's pointer to arr[1].</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>void f(int **p) { *p = NULL; }</code> called as <code>f(&amp;ptr);</code> change?</div>
      <button class="opt" data-i="0">Sets x to 0</button>
      <button class="opt" data-i="1">Makes ptr become NULL</button>
      <button class="opt" data-i="2">Deletes x</button>
      <button class="opt" data-i="3">Causes a crash</button>
      <div class="fb"><code>*p</code> is the caller's pointer.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is wrong with <code>int **pp; **pp = 5;</code>?</div>
      <button class="opt" data-i="0">Nothing</button>
      <button class="opt" data-i="1">pp is uninitialized (it points nowhere valid)</button>
      <button class="opt" data-i="2">Cannot assign through a double pointer</button>
      <button class="opt" data-i="3">Must use malloc for ints</button>
      <div class="fb">Dereferencing an uninitialized pointer is undefined.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is wrong with <code>int x = 5; int **pp = &amp;x;</code>?</div>
      <button class="opt" data-i="0">x must be initialized</button>
      <button class="opt" data-i="1">Type mismatch: &amp;x is an <code>int *</code></button>
      <button class="opt" data-i="2">Must use malloc</button>
      <button class="opt" data-i="3">Nothing</button>
      <div class="fb">Taking the address of an int gives an int *, not an int **.</div>
    </div>
  </div>
</section>

<section class="topic" id="l27-q5">
  <h2>HW06 &middot; Q5: Addresses of Array Elements</h2>
  <div class="concept"><code>address of element i = base + sizeof(element) &times; i</code>. Do the arithmetic in <b>hex</b> (or convert to decimal and back): 4 &times; 15 = 60 = <code>0x3C</code>. An element occupies <code>sizeof(element)</code> <b>consecutive byte addresses</b> starting at its address.</div>

  <div class="card">
    <p>A 20-element <code>int32_t</code> array has base address <code>0x00030010</code> (<code>sizeof(int32_t)</code> = 4):</p>
    <table class="cmp">
      <tr><th>Element</th><th>Offset</th><th>Address</th></tr>
      <tr><td>0</td><td>4 &times; 0 = 0 = 0x0</td><td><code>0x00030010</code></td></tr>
      <tr><td>2</td><td>4 &times; 2 = 8 = 0x8</td><td><code>0x00030018</code></td></tr>
      <tr><td>9</td><td>4 &times; 9 = 36 = 0x24</td><td><code>0x00030034</code></td></tr>
      <tr><td>15</td><td>4 &times; 15 = 60 = 0x3C</td><td><code>0x0003004C</code></td></tr>
    </table>
    <p>Element 3 occupies <code>0x3001C</code>, <code>0x3001D</code>, <code>0x3001E</code>, <code>0x3001F</code> (four bytes).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>A 16-element <code>int32_t</code> array has base <code>0x0000A010</code>. Address of element 5 (hex digits)?</div>
      <input class="fillblank sm" data-answer="0000A024~~~0x0000A024~~~0000a024~~~0x0000a024~~~A024~~~0xA024">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0xA010 + 4 &times; 5 = 0xA010 + 0x14 = 0xA024.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Same array: address of element 15?</div>
      <input class="fillblank sm" data-answer="0000A04C~~~0x0000A04C~~~0000a04c~~~0x0000a04c~~~A04C~~~0xA04C">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0xA010 + 60 = 0xA010 + 0x3C = 0xA04C.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>A 10-element <code>int16_t</code> array has base <code>0x340030</code>. Address of element 4?</div>
      <input class="fillblank sm" data-answer="340038~~~0x340038~~~340038~~~0x340038">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x340030 + 2 &times; 4 = 0x340038.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>An <code>int64_t</code> array has base <code>0x5000</code>. Address of element 3 (hex)?</div>
      <input class="fillblank sm" data-answer="5018~~~0x5018~~~5018~~~0x5018">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x5000 + 8 &times; 3 = 0x5018.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which byte address is the <b>last</b> byte of element 2 of an <code>int32_t</code> array with base <code>0x1000</code>?</div>
      <button class="opt" data-i="0">0x1008</button>
      <button class="opt" data-i="1">0x100B</button>
      <button class="opt" data-i="2">0x100C</button>
      <button class="opt" data-i="3">0x1002</button>
      <div class="fb">Element 2 starts at 0x1008 and takes 4 bytes: 0x1008 to 0x100B.</div>
    </div>
  </div>
</section>

<section class="topic" id="l27-q6">
  <h2>HW06 &middot; Q6: Reading a Memory Dump (Little Endian)</h2>
  <div class="concept">A dump lists 32-bit words by address. A <b>word read</b> at an aligned address returns that row's value. A <b>byte read</b> at an address inside a row returns one byte of the row's value: in <b>little endian</b> the byte at the <b>lowest</b> address of a row is the <b>least significant</b> byte. So for <code>0x7000: 0x1A2B3C4D</code>: byte at 0x7000 = <code>4D</code>, 0x7001 = <code>3C</code>, 0x7002 = <code>2B</code>, 0x7003 = <code>1A</code>.</div>

  <div class="card">
<pre>0x7000:  0x1A2B3C4D
0x7004:  0x0F0F0F0F
0x7008:  0x00000000
0x700C:  0x7E7E7E7E
0x7010:  0xC0FFEE11
0x7014:  0x89ABCDEF
0x7018:  0x13579BDF
0x701C:  0x24681357</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Using the dump above, what 32-bit word (8 hex digits) is stored at <code>0x7010</code>?</div>
      <input class="fillblank sm" data-answer="C0FFEE11~~~0xC0FFEE11~~~c0ffee11~~~0xc0ffee11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Aligned word read: the row value.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What byte (2 hex digits) is at <code>0x7000</code>?</div>
      <input class="fillblank sm" data-answer="4D~~~0x4D~~~4d~~~0x4d">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Least significant byte of 0x1A2B3C4D.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What byte is at <code>0x7001</code>?</div>
      <input class="fillblank sm" data-answer="3C~~~0x3C~~~3c~~~0x3c">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Second least significant byte.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What byte is at <code>0x7015</code>?</div>
      <input class="fillblank sm" data-answer="CD~~~0xCD~~~cd~~~0xcd">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x7015 is byte 1 of the word at 0x7014 (0x89ABCDEF): CD.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What byte is at <code>0x701B</code>?</div>
      <input class="fillblank sm" data-answer="13~~~0x13~~~13~~~0x13">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x701B is byte 3 (most significant) of the word at 0x7018 (0x13579BDF): 13.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What byte is at <code>0x7013</code>?</div>
      <input class="fillblank sm" data-answer="C0~~~0xC0~~~c0~~~0xc0">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Byte 3 of the word at 0x7010 (0xC0FFEE11): C0.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>In this little-endian dump, which byte is at the <b>highest</b> address of the word <code>0x7004: 0x0F0F0F0F</code>?</div>
      <button class="opt" data-i="0">0x7004</button>
      <button class="opt" data-i="1">0x7007</button>
      <button class="opt" data-i="2">It depends on the byte</button>
      <button class="opt" data-i="3">Neither</button>
      <div class="fb">All four bytes are 0F; the highest address is 0x7007.</div>
    </div>
  </div>
</section>

<section class="topic" id="l27-q78">
  <h2>HW06 &middot; Q7&ndash;Q8: Pointer Arithmetic</h2>
  <div class="concept"><b>Adding n to a pointer moves it forward by n <i>elements</i>, not n bytes</b>: <code>new address = address + n &times; sizeof(type)</code>. That is why <code>nums[2]</code> is <code>*(nums + 2)</code>. For two pointers holding the same address, the one to a <b>bigger type moves farther</b> per step.</div>

  <div class="card">
    <p>Q7-style: <code>int16_t values[] = {10, 20, 30, 40, 50}; int16_t *p = values;</code> with values at <code>0x2000</code> (2 bytes per element):</p>
    <table class="cmp">
      <tr><th>Expression</th><th>Result</th></tr>
      <tr><td><code>p</code></td><td><code>0x2000</code></td></tr>
      <tr><td><code>p + 1</code></td><td><code>0x2002</code></td></tr>
      <tr><td><code>p + 4</code></td><td><code>0x2008</code></td></tr>
      <tr><td><code>*p</code></td><td>10</td></tr>
      <tr><td><code>*(p + 2)</code></td><td>30</td></tr>
    </table>
    <p>Q8-style: <code>int16_t *p16</code> and <code>int32_t *p32</code> both hold <code>0x4000</code>: <code>p16 + 1 = 0x4002</code>, <code>p16 + 3 = 0x4006</code>, <code>p32 + 1 = 0x4004</code>, <code>p32 + 3 = 0x400C</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>int32_t *p</code> holding <code>0x3000</code>, what is <code>p + 5</code> (hex)?</div>
      <input class="fillblank sm" data-answer="3014~~~0x3014~~~3014~~~0x3014">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x3000 + 5 &times; 4 = 0x3014.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>int16_t *p</code> holding <code>0x3000</code>, what is <code>p + 5</code> (hex)?</div>
      <input class="fillblank sm" data-answer="300A~~~0x300A~~~300a~~~0x300a">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x3000 + 5 &times; 2 = 0x300A.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>int8_t *p</code> holding <code>0x6000</code>, what is <code>p + 3</code>?</div>
      <input class="fillblank sm" data-answer="6003~~~0x6003~~~6003~~~0x6003">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">int8_t is 1 byte.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>double *d</code> holding <code>0x6000</code>, what is <code>d + 3</code>?</div>
      <input class="fillblank sm" data-answer="6018~~~0x6018~~~6018~~~0x6018">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">double is 8 bytes: 0x6000 + 24 = 0x6018.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>int32_t nums[] = {100, 200, 300, 400}; int32_t *p = nums; p++; p++; printf("%d", *p);</code> print?</div>
      <input class="fillblank sm" data-answer="300">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Two steps forward: nums[2].</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Given those pointers, what is <code>p - nums</code> afterwards?</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Pointer subtraction counts elements.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which expression equals <code>values[3]</code>?</div>
      <button class="opt" data-i="0">*values + 3</button>
      <button class="opt" data-i="1">*(values + 3)</button>
      <button class="opt" data-i="2">values + 3</button>
      <button class="opt" data-i="3">&amp;values + 3</button>
      <div class="fb">Indexing is pointer arithmetic then dereference.</div>
    </div>
  </div>
</section>

</main>
`;
