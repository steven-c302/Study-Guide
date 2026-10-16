/* ============================================================
   LESSON 26 — CL17 Pointers and Functions (pass-by-pointer, swap, bytes and endianness,
   arrays in memory, address calculation, array decay, pointer arithmetic), incl. RD15.
   Pairs with Mastery unit u26.
   Injects into #l26. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l26').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l26-frames')">1 &middot; Pointers &amp; Stack Frames</button>
  <button onclick="showTopic(this,'l26-code')">2 &middot; Writing addOne &amp; swap</button>
  <button onclick="showTopic(this,'l26-bytes')">3 &middot; Bytes, Addresses &amp; Endianness</button>
  <button onclick="showTopic(this,'l26-arrays')">4 &middot; Arrays in Memory &amp; Decay</button>
  <button onclick="showTopic(this,'l26-arith')">5 &middot; Pointer Arithmetic</button>
  <button onclick="showTopic(this,'l26-rd15')">RD15 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l26-frames">
  <h2>CL17 &middot; Passing Pointers to Functions</h2>
  <div class="concept"><b>Frame layout.</b> The caller places the <b>parameters</b> on the stack, the call places the <b>return address (RA)</b>, then the callee allocates its <b>locals</b>. Because the stack grows toward lower addresses the frame reads, from higher to lower addresses: <b>Parameters &rarr; Return Address &rarr; Local variables</b>.</div>

  <div class="card">
<pre>Higher addresses
 +------------------+
 |   Parameters     |   (pushed by the caller)
 +------------------+
 |  Return Address  |   (pushed by the call)
 +------------------+
 |  Local Variables |   (allocated by the callee)
 +------------------+
Lower addresses</pre>
  </div>

  <h3>Example 1 &mdash; correct pointer usage</h3>

  <div class="card">
<pre>void fun(int8_t *a, int8_t *b) {
    *a = 10;
    *b = 20;
}
int main(void) {
    int8_t a = 5;
    int8_t b = 6;
    fun(&amp;a, &amp;b);
    printf("a: %d, b: %d\\n", a, b);   // a: 10, b: 20
}</pre>
    <p>main's frame holds <code>a(1) = 5</code>, <code>b(1) = 6</code>. <code>fun</code>'s frame holds the <b>parameters</b> <code>a(8)</code> and <code>b(8)</code>: pointers <b>to a and b in main</b>. <code>*a = 10</code> follows the pointer and writes main's a. After fun returns, main prints the changed values.</p>
  </div>

  <h3>Example 2 &mdash; incorrect: assigning the pointer instead of the pointee</h3>

  <div class="card">
<pre>void fun(int8_t *a, int8_t *b) {
    a = 10;        // changes only fun's LOCAL pointer (not even a valid address!)
    b = 20;
}
// called as fun(&amp;a, &amp;b):  main's a and b are untouched   -&gt; a: 5, b: 6</pre>
    <p>Without the <code>*</code> you overwrite the <b>local pointer copy</b> inside fun's frame. The caller's variables never change: output <code>a: 5, b: 6</code>.</p>
  </div>

  <h3>Example 3 &mdash; incorrect: passing values instead of addresses</h3>

  <div class="card">
<pre>void fun(int8_t *a, int8_t *b) { *a = 10; *b = 20; }
...
fun(a, b);         // passes the VALUES 5 and 6 where addresses are expected</pre>
    <p>The parameters <code>a</code> and <code>b</code> now hold <b>5</b> and <b>6</b>. <code>*a = 10</code> writes to address 5, which the program may not access: <b>Segmentation fault</b>. A segmentation fault (segfault) happens when your program tries to access memory it is not allowed to use.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does Example 1 print (format <code>a: 10, b: 20</code>)?</div>
      <input class="fillblank sm" data-answer="a: 10, b: 20">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The writes go through the pointers into main's variables.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In Example 2, what does main print?</div>
      <input class="fillblank sm" data-answer="a: 5, b: 6">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">fun only reassigns its local pointer copies.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What happens when Example 3 runs? (one or two words)</div>
      <input class="fillblank sm" data-answer="segmentation fault~~~segfault~~~crash">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The values 5 and 6 are used as addresses.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>In pass-by-pointer, what value is actually copied into the parameter?</div>
      <button class="opt" data-i="0">The value stored in the variable</button>
      <button class="opt" data-i="1">The variable's name</button>
      <button class="opt" data-i="2">The address of the variable</button>
      <button class="opt" data-i="3">The caller's whole stack frame</button>
      <div class="fb">The address is copied; dereferencing it reaches the caller's variable.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can pass-by-value <b>not</b> modify the caller's variable?</div>
      <button class="opt" data-i="0">Parameters are read-only</button>
      <button class="opt" data-i="1">The parameter is copied into a new memory location</button>
      <button class="opt" data-i="2">Values are immutable in C</button>
      <button class="opt" data-i="3">Stack memory cannot change</button>
      <div class="fb">The function works on its own copy.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which call lets <code>void f(int *p)</code> modify <code>int x</code>?</div>
      <button class="opt" data-i="0">f(x);</button>
      <button class="opt" data-i="1">f(*x);</button>
      <button class="opt" data-i="2">f(&amp;x);</button>
      <button class="opt" data-i="3">f(x&amp;);</button>
      <div class="fb">Pass the address of x: the parameter is an int pointer.</div>
    </div>
  </div>
</section>

<section class="topic" id="l26-code">
  <h2>CL17 &middot; Short Code-Writing Examples: addOne and swap</h2>
  <div class="concept">Two patterns to know cold. <b>addOne</b> increments the caller's variable; <b>swap</b> exchanges two caller variables using a temporary.</div>

  <div class="card">
<pre>void addOne(int *n) {
    *n = *n + 1;
}
int main(void) {
    int x = 10;
    addOne(&amp;x);
    printf("x = %d\\n", x);      // x = 11
}</pre>
<pre>void swap(int16_t *a, int16_t *b) {
    int16_t temp = *a;     // save a's target
    *a = *b;               // copy b's target into a's
    *b = temp;             // restore the saved value into b's
}
int main(void) {
    int16_t x = 10, y = 20;
    swap(&amp;x, &amp;y);
    // before: x: 10, y: 20
    // after:  x: 20, y: 10
}</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Fill in the body of <code>addOne(int *n)</code>: write the single statement (e.g. <code>*n = ...;</code>).</div>
      <input class="fillblank sm" data-answer="*n = *n + 1;~~~*n=*n+1;~~~(*n)++;~~~*n += 1;~~~*n+=1;~~~++*n;">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Read through the pointer, add one, and write back through it.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In swap, what does <code>x</code> and <code>y</code> print after the call (format <code>x: 20, y: 10</code>)?</div>
      <input class="fillblank sm" data-answer="x: 20, y: 10">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The three statements exchange the pointees.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which swap body is correct?</div>
      <button class="opt" data-i="0">int temp = a; a = b; b = temp;</button>
      <button class="opt" data-i="1">int temp = *a; *a = *b; *b = temp;</button>
      <button class="opt" data-i="2">int temp = &amp;a; &amp;a = &amp;b; &amp;b = temp;</button>
      <button class="opt" data-i="3">*a = *b; *b = *a;</button>
      <div class="fb">Only the second dereferences the pointers and uses a temporary. The last loses the original *a.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which call to <code>swap(int16_t *a, int16_t *b)</code> swaps x and y?</div>
      <button class="opt" data-i="0">swap(x, y);</button>
      <button class="opt" data-i="1">swap(*x, *y);</button>
      <button class="opt" data-i="2">swap(&amp;x, &amp;y);</button>
      <button class="opt" data-i="3">swap(&amp;&amp;x, &amp;&amp;y);</button>
      <div class="fb">Pass the addresses.</div>
    </div>
  </div>
</section>

<section class="topic" id="l26-bytes">
  <h2>CL17 &middot; Low-level Memory Diagrams: Bytes, Addresses and Endianness</h2>
  <div class="concept">In a low-level diagram each row is <b>one byte</b> (8 bits) at one <b>byte address</b> (written in hex, 64-bit addresses in this class, e.g. <code>0x0000FFFFFFFF20</code>). Addresses are <b>not stored</b> anywhere; they are just the position of each row. Variables larger than a byte span <b>several consecutive addresses</b>. Sometimes diagrams show <b>4 bytes per row</b> (addresses go up by 4 per row) to be more compact.</div>

  <div class="card">
    <p>Storing the <code>int32_t</code> value <b>329,421</b> = <code>0b 0000 0000 0000 0101 0000 0110 1100 1101</code> = <code>0x000506CD</code>. Which byte goes where?</p>
    <table class="cmp">
      <tr><th></th><th>Rule</th><th>Address 0</th><th>1</th><th>2</th><th>3</th></tr>
      <tr><td><b>Little endian</b></td><td>least significant byte at the <b>lowest</b> address</td><td><code>1100 1101</code> (CD)</td><td><code>0000 0110</code> (06)</td><td><code>0000 0101</code> (05)</td><td><code>0000 0000</code> (00)</td></tr>
      <tr><td><b>Big endian</b></td><td>least significant byte at the <b>highest</b> address</td><td><code>0000 0000</code> (00)</td><td><code>0000 0101</code> (05)</td><td><code>0000 0110</code> (06)</td><td><code>1100 1101</code> (CD)</td></tr>
    </table>
    <p>Little endian is dominant in modern processors (and in this class). Running the C on this machine confirms it: <code>CD 06 05 00</code>.</p>
  </div>

  <div class="card">
    <p><b>Reading bytes from a word dump (little endian).</b> If memory shows <code>0x1000: 0x12345678</code>, then the <b>byte</b> at 0x1000 is <code>0x78</code>, at 0x1001 is <code>0x56</code>, at 0x1002 is <code>0x34</code>, at 0x1003 is <code>0x12</code>. The 32-bit <b>word</b> (halfword in the HW6 wording, where a word is 64 bits) at 0x1000 reads back as <code>0x12345678</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>The int32_t value <code>0x0A0B0C0D</code> is stored little endian starting at address 0. What byte (2 hex digits) is at address 0?</div>
      <input class="fillblank sm" data-answer="0D~~~0x0D~~~0d~~~d">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Least significant byte at the lowest address.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Same value: what byte is at address 3?</div>
      <input class="fillblank sm" data-answer="0A~~~0x0A~~~0a~~~a">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The most significant byte sits at the highest address in little endian.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Memory holds the word <code>0x12345678</code> at 0x1000 (little endian). What byte is at 0x1001?</div>
      <input class="fillblank sm" data-answer="56~~~0x56">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Byte 1 of the word: 0x56.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>In little endian, where is the least significant byte of an int stored?</div>
      <button class="opt" data-i="0">At the highest address</button>
      <button class="opt" data-i="1">At the lowest address</button>
      <button class="opt" data-i="2">In the middle</button>
      <button class="opt" data-i="3">In a register</button>
      <div class="fb">Little endian: lowest address holds the LSB.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>In big endian, where is the least significant byte stored?</div>
      <button class="opt" data-i="0">At the largest address</button>
      <button class="opt" data-i="1">At the lowest address</button>
      <button class="opt" data-i="2">At address 0</button>
      <button class="opt" data-i="3">It is not stored</button>
      <div class="fb">Big endian: MSB first.</div>
    </div>
  </div>
</section>

<section class="topic" id="l26-arrays">
  <h2>CL17 &middot; Arrays in Memory, Address Calculation and Array Decay</h2>
  <div class="concept"><b>Arrays are stored contiguously</b>: all elements sit in consecutive memory locations. The <b>address of an element is its starting byte</b>. With <b>base address</b> = address of element 0:<br><code>address of element i = base + sizeof(element) &times; i</code></div>

  <div class="card">
<pre>int32_t nums[5] = {5, 90, 100, 40, 11};   (little endian, 4 bytes each)
Index  Value  Address (offset from base)
  0      5       0
  1     90       4
  2    100       8
  3     40      12
  4     11      16</pre>
    <p>Worked: a 10-element <code>int16_t</code> array at <code>0x00000034002C</code>. Element 9 = base + sizeof(int16_t) &times; 9 = <code>0x34002C + 2(9) = 0x34002C + 0x12 = <b>0x34003E</b></code>.</p>
  </div>

  <h3>Arrays as arguments decay to pointers</h3>

  <div class="card">
    <p>When you pass an array to a function it <b>decays</b> to a <b>pointer to its first element</b>: the callee receives the <b>address</b>, so it can modify the caller's elements, while scalar parameters like <code>length</code> are copies.</p>
<pre>void modify_values(int8_t arr[], int8_t length) {
    length = 99;     // does NOT affect length in main (a copy)
    arr[0] = 99;     // DOES affect nums[0] in main (same array)
}</pre>
    <table class="cmp">
      <tr><th></th><th>Pass-by-value</th><th>Pass-by-pointer</th></tr>
      <tr><td>What is passed</td><td>a copy of the variable</td><td>a pointer (address) to the variable</td></tr>
      <tr><td>Changes affect original?</td><td>no</td><td>yes</td></tr>
      <tr><td>Pros</td><td>safe, no side effects</td><td>allows modification; efficient for large data (no copy)</td></tr>
      <tr><td>Cons</td><td>copying large objects costs time and memory</td><td>risk of unintended modification</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>A 10-element <code>int16_t</code> array has base address <code>0x00000034002C</code>. What is the address of element 9? (hex digits)</div>
      <input class="fillblank sm" data-answer="34003E~~~0x34003E~~~34003e~~~0x34003e">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x34002C + 2 &times; 9 = 0x34002C + 0x12 = 0x34003E.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>An <code>int32_t</code> array has base <code>0x1000</code>. Address of element 6 (hex)?</div>
      <input class="fillblank sm" data-answer="1018~~~0x1018~~~1018~~~0x1018">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x1000 + 4 &times; 6 = 0x1018.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>An <code>int64_t</code> array has base <code>0x2000</code>. Address of element 5 (hex)?</div>
      <input class="fillblank sm" data-answer="2028~~~0x2028~~~2028~~~0x2028">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x2000 + 8 &times; 5 = 0x2028.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What is passed to a function when an array is used as the argument?</div>
      <button class="opt" data-i="0">A copy of the array</button>
      <button class="opt" data-i="1">The number of elements</button>
      <button class="opt" data-i="2">A pointer to the first element</button>
      <button class="opt" data-i="3">The array's total size</button>
      <div class="fb">Arrays decay to a pointer to element 0.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>In the callee, <code>sizeof(arr)</code> for the parameter <code>int32_t arr[]</code> is&hellip;</div>
      <button class="opt" data-i="0">the array's total bytes</button>
      <button class="opt" data-i="1">4</button>
      <button class="opt" data-i="2">8 (a pointer)</button>
      <button class="opt" data-i="3">0</button>
      <div class="fb">The parameter is just a pointer.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Check</span>After the call <code>modify_values(nums, length)</code>, <code>length</code> in main is 99.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> <code>length</code> was passed by value.</div>
    </div>
  </div>
</section>

<section class="topic" id="l26-arith">
  <h2>CL17 &middot; Pointer Arithmetic</h2>
  <div class="concept">When an array name is used in an expression it <b>decays</b> to a pointer to its first element: <code>int *p = arr;</code> is the same as <code>&amp;arr[0]</code>. <b>Pointer arithmetic moves by element size automatically</b>: <code>p + 1</code> adds <code>sizeof(*p)</code> bytes, not 1. And <code>arr[i]</code> is exactly <code>*(arr + i)</code>.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Expression</th><th>Meaning</th><th>Result (int arr[3] = {10,20,30})</th></tr>
      <tr><td><code>p</code></td><td>address of arr[0]</td><td>points to 10</td></tr>
      <tr><td><code>p + 1</code></td><td>address of arr[1]</td><td>points to 20</td></tr>
      <tr><td><code>*(p + 2)</code></td><td>value at arr[2]</td><td>30</td></tr>
    </table>
    <table class="cmp">
      <tr><th>Operation</th><th>Description</th></tr>
      <tr><td><code>p + n</code></td><td>move forward n elements</td></tr>
      <tr><td><code>p - n</code></td><td>move backward n elements</td></tr>
      <tr><td><code>p1 - p2</code></td><td>number of elements between two pointers</td></tr>
      <tr><td><code>p++ / p--</code></td><td>move to next / previous element</td></tr>
    </table>
    <p>Only valid <b>within the same array</b> (undefined outside). Increments depend on the data type size, and it works for all pointer types (<code>int *</code>, <code>double *</code>, &hellip;).</p>
  </div>

  <div class="card">
<pre>int arr[3] = {10, 20, 30};
int *p = arr;
printf("%d %d %d", *p, *(p + 1), *(p + 2));    // 10 20 30</pre>
<pre>int16_t arr[] = {1, 2, 3, 4, 5};
int16_t *ptr = arr;
*(ptr + 1) = *ptr;          // arr[1] = arr[0]
*(ptr + 2) = *(ptr + 1);    // arr[2] = arr[1]
// arr is now: 1 1 1 4 5</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>int32_t *p</code> holding <code>0x1000</code>, what is <code>p + 3</code> (hex)?</div>
      <input class="fillblank sm" data-answer="100C~~~0x100C~~~100c~~~0x100c">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Adds 3 &times; 4 = 12 bytes: 0x100C.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>int16_t *p</code> holding <code>0x1000</code>, what is <code>p + 3</code> (hex)?</div>
      <input class="fillblank sm" data-answer="1006~~~0x1006~~~1006~~~0x1006">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Adds 3 &times; 2 = 6 bytes: 0x1006.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the second example leave in <code>arr</code> (five values separated by spaces)?</div>
      <input class="fillblank sm" data-answer="1 1 1 4 5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">arr[1] and arr[2] both become 1.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>Which expression is equivalent to <code>nums[2]</code>?</div>
      <button class="opt" data-i="0">*(nums + 2)</button>
      <button class="opt" data-i="1">*nums + 2</button>
      <button class="opt" data-i="2">nums + 2</button>
      <button class="opt" data-i="3">&amp;nums[2]</button>
      <div class="fb">Indexing is pointer arithmetic then dereference.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>p1 - p2</code> give for two pointers into the same <code>int</code> array?</div>
      <button class="opt" data-i="0">The number of bytes between them</button>
      <button class="opt" data-i="1">The number of elements between them</button>
      <button class="opt" data-i="2">The sum of the addresses</button>
      <button class="opt" data-i="3">Always 1</button>
      <div class="fb">Pointer subtraction is in elements.</div>
    </div>
  </div>
</section>

<section class="topic" id="l26-rd15">
  <h2>RD15 Self-Check &middot; Pointers and Functions (DiS 2.3)</h2>
  <p class="muted">Fresh questions in the style of the RD15 reading quiz on pass-by-pointer.</p>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>Which prototype lets a function modify an <code>int</code> passed by the caller?</div>
      <button class="opt" data-i="0">void f(int x);</button>
      <button class="opt" data-i="1">void f(int *x);</button>
      <button class="opt" data-i="2">void f(int x[]) only</button>
      <button class="opt" data-i="3">int f(void);</button>
      <div class="fb">A pointer parameter plus a call with &amp;variable.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>Given <code>void f(int *p) { p = NULL; }</code>, what is true?</div>
      <button class="opt" data-i="0">It sets the caller's pointer to NULL</button>
      <button class="opt" data-i="1">It only changes the local copy of p</button>
      <button class="opt" data-i="2">It crashes</button>
      <button class="opt" data-i="3">It frees the memory</button>
      <div class="fb">p is a copy of the address.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q3</span>Given <code>void f(int *p) { *p = 50; }</code>, what is true?</div>
      <button class="opt" data-i="0">It changes the value in the caller's variable</button>
      <button class="opt" data-i="1">It changes only a local copy</button>
      <button class="opt" data-i="2">It changes the address of the caller's variable</button>
      <button class="opt" data-i="3">It always causes undefined behavior</button>
      <div class="fb">It writes through the address.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q4</span>Which statement does <b>not</b> change the caller's variable (where <code>input</code> is an <code>int *</code> parameter)?</div>
      <button class="opt" data-i="0">*input = 5;</button>
      <button class="opt" data-i="1">input = &amp;y;</button>
      <button class="opt" data-i="2">(*input)++;</button>
      <button class="opt" data-i="3">*input = *input + 1;</button>
      <div class="fb"><code>input = &amp;y</code> only retargets the local copy of the pointer.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q5</span>In the example, which part of memory does <code>input</code> point to?</div>
      <button class="opt" data-i="0">Heap</button>
      <button class="opt" data-i="1">Code segment</button>
      <button class="opt" data-i="2">The stack frame of main</button>
      <button class="opt" data-i="3">Data segment</button>
      <div class="fb">It points at a local variable in main's frame.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q6</span>Why does dereferencing a pointer parameter allow a function to modify a caller's variable?</div>
      <button class="opt" data-i="0">The pointer and the argument share the same frame</button>
      <button class="opt" data-i="1">The pointer stores the address of the caller's variable</button>
      <button class="opt" data-i="2">The parameter is global</button>
      <button class="opt" data-i="3">C passes everything by reference</button>
      <div class="fb">The copied value is the address of the caller's variable.</div>
    </div>
  </div>
</section>

</main>
`;
