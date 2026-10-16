/* ============================================================
   LESSON 29 — CL19 2D Arrays (memory has no types, indexing as pointer arithmetic, static
   row-major arrays, dynamic Method 1 and Method 2, byte views), incl. RD17. Pairs with Mastery unit u28.
   Injects into #l29. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l29').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l29-index')">1 &middot; Memory Has No Types; Indexing</button>
  <button onclick="showTopic(this,'l29-static')">2 &middot; Static 2D Arrays</button>
  <button onclick="showTopic(this,'l29-m1')">3 &middot; Dynamic 2D: Method 1</button>
  <button onclick="showTopic(this,'l29-m2')">4 &middot; Dynamic 2D: Method 2</button>
  <button onclick="showTopic(this,'l29-views')">5 &middot; Same Bytes, Different Pointers</button>
  <button onclick="showTopic(this,'l29-rd17')">RD17 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l29-index">
  <h2>CL19 &middot; Working with Memory: Indexing and Pointer Arithmetic</h2>
  <div class="concept"><b>You cannot tell from memory alone</b> whether a row is a one-byte value or part of a larger number: main memory is just a sequence of bytes. The meaning (a char, an int, part of an array) comes from the <b>declaration</b>, which the program and processor use. Whenever the CPU or a program accesses memory it specifies <b>both</b> the <b>starting address</b> and the <b>size</b> of the data to read or write.</div>

  <div class="card">
    <p>Arrays are contiguous. With <code>int32_t nums[] = {5, 90, 100, 40, -4}</code> each element is 4 bytes: addresses 0, 4, 8, 12, 16 (offsets). An <code>int8_t</code> array of the same numbers would use one byte per element.</p>
  </div>

  <h3>Array indexing = pointer arithmetic</h3>

  <div class="card">
  <div class="concept">In C, array indexing and pointer arithmetic are <b>two views of the same thing</b>: <code>p[i]</code> is equivalent to <code>*(p + i)</code> &mdash; &ldquo;the element <i>i</i> positions after what p points to&rdquo;.</div>
    <table class="cmp">
      <tr><th>Expression (<code>int arr[] = {10,20,30,40}; int *p = arr;</code>)</th><th>Meaning</th><th>Value</th></tr>
      <tr><td><code>p</code></td><td>address of arr[0]</td><td>points to 10</td></tr>
      <tr><td><code>p + 2</code></td><td>address of arr[2]</td><td>points to 30</td></tr>
      <tr><td><code>*(p + 2)</code></td><td>value at that address</td><td>30</td></tr>
      <tr><td><code>p[2]</code></td><td>shorthand for <code>*(p + 2)</code></td><td>30</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>Which expression is equivalent to <code>p[i]</code>?</div>
      <button class="opt" data-i="0">*(p + i)</button>
      <button class="opt" data-i="1">*p + i</button>
      <button class="opt" data-i="2">&amp;p + i</button>
      <button class="opt" data-i="3">*(i + *p)</button>
      <div class="fb">Offset then dereference.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>How does the program know whether 4 consecutive bytes are an int or four chars?</div>
      <button class="opt" data-i="0">Memory stores a type tag</button>
      <button class="opt" data-i="1">The declaration/access determines the size used; memory itself has no types</button>
      <button class="opt" data-i="2">The CPU guesses</button>
      <button class="opt" data-i="3">The addresses encode it</button>
      <div class="fb">Types live in the program, not in the bytes.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>int a[] = {10, 20, 30, 40, 50}; int *p = a;</code> what is <code>*(p + 3)</code>?</div>
      <input class="fillblank sm" data-answer="40">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">p + 3 is a[3].</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Same array: what is <code>p[1] + *(p + 2)</code>?</div>
      <input class="fillblank sm" data-answer="50">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">20 + 30.</div>
    </div>
  </div>
</section>

<section class="topic" id="l29-static">
  <h2>CL19 &middot; Statically Allocated 2D Arrays and Row-Major Order</h2>
  <div class="concept"><code>int matrix[50][100];</code> is a 2D array of ints with <b>50 rows</b> and <b>100 columns</b>. Access an element with both indices: <code>val = matrix[3][7];</code> (row 3, column 7). Programs usually traverse it with nested loops (<code>for i in rows { for j in cols { &hellip; } }</code>).</div>

  <div class="card">
    <p>In memory the array is one long block in <b>row-major order</b>: all the elements of row 0, then all of row 1, and so on.</p>
<pre>3 rows x 3 columns, matrix[i][j] = i :

        col 0  col 1  col 2
row 0     0      0      0
row 1     1      1      1
row 2     2      2      2

memory: 0 0 0 | 1 1 1 | 2 2 2      (linear indices 0 1 2 | 3 4 5 | 6 7 8)</pre>
  </div>

  <h3>The two formulas</h3>

  <div class="card">
  <div class="concept"><b>Linear index</b> of <code>[i][j]</code> with <i>R</i> rows and <i>C</i> columns: <code>i &times; C + j</code>.<br><b>Address</b> of any element: <code>base address + element size &times; (i &times; C + j)</code>.</div>
    <table class="cmp">
      <tr><th>Question</th><th>Work</th><th>Answer</th></tr>
      <tr><td>Linear index of [1][1] with 3 columns</td><td>1 &times; 3 + 1</td><td>4</td></tr>
      <tr><td>Linear index of [2][2] with 3 columns</td><td>2 &times; 3 + 2</td><td>8</td></tr>
      <tr><td>20 &times; 30 array, element [15][20]</td><td>15 &times; 30 + 20</td><td><b>470</b></td></tr>
      <tr><td><code>int32_t A[100][5]</code>, base <code>0xFFFF00000000</code>, element <code>A[3][2]</code></td><td>index 3 &times; 5 + 2 = 17; 17 &times; 4 = 68 = 0x44</td><td><code>0xFFFF00000044</code></td></tr>
    </table>
    <p>When a 2D array is a <b>function parameter</b> the <b>column dimension must be written</b> (<code>int a[][5]</code>): the compiler needs C to compute <code>i &times; C + j</code>. The row count is not needed.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What is the layout order of a statically allocated 2D array?</div>
      <button class="opt" data-i="0">Column-major</button>
      <button class="opt" data-i="1">Diagonal-major</button>
      <button class="opt" data-i="2">Row-major</button>
      <button class="opt" data-i="3">Random</button>
      <div class="fb">Row after row.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Linear index of <code>[2][5]</code> in an array with 6 columns?</div>
      <input class="fillblank sm" data-answer="17">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2 &times; 6 + 5.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Linear index of <code>[3][4]</code> in an array with 7 columns?</div>
      <input class="fillblank sm" data-answer="25">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3 &times; 7 + 4.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>int32_t grid[10][8]</code> has base <code>0x2000</code>. Address of <code>grid[2][1]</code> (hex)?</div>
      <input class="fillblank sm" data-answer="2044~~~0x2044~~~2044~~~0x2044">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Index 17 &times; 4 = 68 = 0x44.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span><code>int16_t B[8][6]</code> has base <code>0x1000</code>. Address of <code>B[5][4]</code> (hex)?</div>
      <input class="fillblank sm" data-answer="1044~~~0x1044~~~1044~~~0x1044">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Index 34 &times; 2 = 68 = 0x44: 0x1044.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why must the column dimension be specified in a 2D array function parameter?</div>
      <button class="opt" data-i="0">To allocate memory</button>
      <button class="opt" data-i="1">So the compiler can compute element offsets</button>
      <button class="opt" data-i="2">To free memory</button>
      <button class="opt" data-i="3">To allow pointer arithmetic</button>
      <div class="fb">The offset needs C.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which declaration creates 50 rows and 100 columns?</div>
      <button class="opt" data-i="0">int a[100][50];</button>
      <button class="opt" data-i="1">int a[50][100];</button>
      <button class="opt" data-i="2">int a[50*100];</button>
      <button class="opt" data-i="3">int a[50]; int a2[100];</button>
      <div class="fb">Rows first.</div>
    </div>
  </div>
</section>

<section class="topic" id="l29-m1">
  <h2>CL19 &middot; Dynamically Allocated 2D Array, Method 1 (One Contiguous Block)</h2>
  <div class="concept"><b>Method 1</b> allocates the whole grid as <b>one contiguous block</b>: <code>int *grid = malloc(sizeof(int) * rows * cols);</code>. The pointer's type is a pointer to the <b>element type</b>. A 4 &times; 3 grid is 12 ints = 48 bytes holding the rows back to back. Because grid is a plain <code>int *</code>, you cannot write <code>grid[i][j]</code>: you compute the index yourself with a helper such as <code>idx(i, j, cols)</code> = <code>i * cols + j</code>.</div>

  <div class="card">
<pre>static inline int idx(int i, int j, int cols) { return i * cols + j; }
static inline int in_bounds(int i, int j, int rows, int cols) {
    return i &gt;= 0 &amp;&amp; i &lt; rows &amp;&amp; j &gt;= 0 &amp;&amp; j &lt; cols;
}
void init_zero(int *g, int rows, int cols) {
    for (int k = 0; k &lt; rows * cols; k++) g[k] = 0;
}
void grid_set(int *g, int rows, int cols, int i, int j, int v) {
    if (!in_bounds(i, j, rows, cols)) error_oob(i, j);   // report and exit
    g[idx(i, j, cols)] = v;
}
int grid_get(int *g, int rows, int cols, int i, int j) {
    if (!in_bounds(i, j, rows, cols)) error_oob(i, j);
    return g[idx(i, j, cols)];
}</pre>
    <p><code>static inline</code> is for small, frequently used helpers: <b>inline</b> suggests the compiler expand the code at the call site (no call overhead); <b>static</b> keeps the function local to this file (avoids linker conflicts in headers).</p>
  </div>

  <div class="card">
    <p>Worked questions: a 4 &times; 6 grid &rarr; <b>24 ints</b> allocated; <code>idx(2, 3, 6)</code> = 15; if grid points to address 1000 and an int is 4 bytes, <code>grid[2][3]</code> lives at <code>1000 + 4 &times; 15 = 1060</code>. <code>in_bounds(1, 4, 4, 6)</code> is true; <code>in_bounds(4, 0, 4, 6)</code> is false (row 4 does not exist).</p>
<pre>int *a = malloc(sizeof(int) * 2 * 3);
for i, j: a[i * 3 + j] = 10 * i + j;
int *p = a + 1;
printf("%d %d", *(p + 3), a[4]);          // 11 11</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many ints does a Method 1 grid with 4 rows and 6 columns allocate?</div>
      <input class="fillblank sm" data-answer="24">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4 &times; 6.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>idx(2, 3, 6)</code> return?</div>
      <input class="fillblank sm" data-answer="15">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2 &times; 6 + 3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>grid points to 1000 (sizeof(int) = 4). What address holds <code>grid[2][3]</code> in a grid with 6 columns?</div>
      <input class="fillblank sm" data-answer="1060">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1000 + 4 &times; 15.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the pointer-walk example print?</div>
      <input class="fillblank sm" data-answer="11 11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">p = a + 1, so p + 3 = a + 4 = row 1, column 1 = 11.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can't you write <code>grid[i][j]</code> with Method 1?</div>
      <button class="opt" data-i="0">It uses N+1 mallocs</button>
      <button class="opt" data-i="1">grid is a plain int *; the compiler does not know the column size</button>
      <button class="opt" data-i="2">The memory is not contiguous</button>
      <button class="opt" data-i="3">The memory is read-only</button>
      <div class="fb">Use grid[i * cols + j].</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which expression accesses element (i, j) with M columns in Method 1?</div>
      <button class="opt" data-i="0">arr[i][j]</button>
      <button class="opt" data-i="1">arr[j][i]</button>
      <button class="opt" data-i="2">arr[i * M + j]</button>
      <button class="opt" data-i="3">arr[j * M + i]</button>
      <div class="fb">Row-major linear index.</div>
    </div>
  </div>
</section>

<section class="topic" id="l29-m2">
  <h2>CL19 &middot; Dynamically Allocated 2D Array, Method 2 (Array of Row Pointers)</h2>
  <div class="concept"><b>Method 2</b> builds an <b>array of pointers</b>, each pointing to its own separately allocated row: <code>int **a = malloc(sizeof(int *) * rows);</code> then <code>a[i] = malloc(sizeof(int) * cols);</code> for every row &mdash; <b>rows + 1</b> calls to malloc. For 4 rows &times; 3 int32 columns: the pointer array is <b>4 &times; 8 = 32 bytes</b> and each row is <b>12 bytes</b>. Types: <code>a</code> is <code>int **</code>, <code>a[i]</code> is <code>int *</code> (a row), <code>a[i][j]</code> is an <code>int</code>.</div>

  <div class="card">
<pre>STACK            HEAP
a (8) ---------> [ ptr0 | ptr1 | ptr2 | ptr3 ]   (32 bytes)
                    |      |      |      |
                    v      v      v      v
                 [1 2 3] [4 5 6] [7 8 9] [10 11 12]   (12 bytes each, separate blocks)</pre>
    <p>Only the elements <b>within a row</b> are contiguous &mdash; the rows can be anywhere in the heap. So pointer arithmetic across the whole 2D array is <b>not valid</b>; a pointer walking one row must be <b>reset</b> to the start of the next row. And because the layouts and types differ (<code>int *</code> vs <code>int **</code>), a function cannot accept both Method 1 and Method 2 grids with one parameter type.</p>
  </div>

  <h3>free2d and swap_rows</h3>

  <div class="card">
<pre>static void free2d(int **a, int rows) {
    if (a == NULL) return;
    for (int i = 0; i &lt; rows; i++) free(a[i]);   // free each row first
    free(a);                                     // then the array of row pointers
}
void swap_rows(int **a, int rows, int r1, int r2) {
    /* validate NULL and both row indices (error_bad_row) ... */
    int *tmp = a[r1];      // swap the POINTERS, not the elements
    a[r1] = a[r2];
    a[r2] = tmp;
}</pre>
    <p>Example: <code>m[0][2], m[1][0], *(m[1] + 2)</code> print <b>2 3 5</b>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many calls to malloc build a Method 2 grid with 4 rows?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1 for the pointer array plus 4 rows.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many bytes is the row-pointer array for 4 rows (pointers are 8 bytes)?</div>
      <input class="fillblank sm" data-answer="32">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4 &times; 8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many bytes is one row of 3 <code>int32_t</code>s?</div>
      <input class="fillblank sm" data-answer="12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3 &times; 4.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does the <code>m[0][2], m[1][0], *(m[1] + 2)</code> example print?</div>
      <input class="fillblank sm" data-answer="2 3 5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">m[0][2] = 2, m[1][0] = 3, *(m[1] + 2) = m[1][2] = 5.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>In Method 2, what is the type of <code>two_d_array[i]</code>?</div>
      <button class="opt" data-i="0">int</button>
      <button class="opt" data-i="1">int *</button>
      <button class="opt" data-i="2">int **</button>
      <button class="opt" data-i="3">int []</button>
      <div class="fb">A row pointer.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which statement about Method 2 is true?</div>
      <button class="opt" data-i="0">All elements are contiguous</button>
      <button class="opt" data-i="1">Only the elements within a row are contiguous</button>
      <button class="opt" data-i="2">Only columns are contiguous</button>
      <button class="opt" data-i="3">Nothing is contiguous</button>
      <div class="fb">Each row is its own block.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which situation requires resetting a pointer for each row?</div>
      <button class="opt" data-i="0">Static 2D arrays</button>
      <button class="opt" data-i="1">Method 1 dynamic 2D arrays</button>
      <button class="opt" data-i="2">Method 2 dynamic 2D arrays</button>
      <button class="opt" data-i="3">All 2D arrays</button>
      <div class="fb">Rows are separate blocks.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is the right way to free a Method 2 grid?</div>
      <button class="opt" data-i="0">free(a) only</button>
      <button class="opt" data-i="1">free each row then free(a)</button>
      <button class="opt" data-i="2">free(a) then each row</button>
      <button class="opt" data-i="3">nothing</button>
      <div class="fb">Inner blocks first.</div>
    </div>
  </div>
</section>

<section class="topic" id="l29-views">
  <h2>CL19 &middot; Reading the Same Bytes Through Different Pointer Types</h2>
  <div class="concept">Because memory has no types, <b>casting a pointer changes how the same bytes are read</b>. On a little-endian machine each multi-byte value is stored <b>least significant byte first</b>. Take <code>int32_t arr[2] = {0x0A0B0C0D, 0x11223344};</code>.</div>

  <div class="card">
    <p>Read as <code>uint8_t *</code> (one byte at a time): <code>0D 0C 0B 0A 44 33 22 11</code><br>Read as <code>uint16_t *</code> (two bytes at a time, still low half first): <code>0C0D 0A0B 3344 1122</code></p>
    <p>The rule: element <i>i</i> of the int32 array supplies the 16-bit pieces <code>p[2i]</code> (low half) and <code>p[2i+1]</code> (high half); and for a 64-bit view the lower-addressed int32 becomes the <b>low 32 bits</b> of the 64-bit value (<code>{0x11112222, 0x33334444}</code> reads as <code>0x3333444411112222</code>).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>uint8_t *p = (uint8_t *)arr;</code> what is <code>p[0]</code> (2 hex digits)?</div>
      <input class="fillblank sm" data-answer="0D~~~0x0D~~~0d~~~0x0d">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Least significant byte of 0x0A0B0C0D.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is <code>p[7]</code> (the last byte)?</div>
      <input class="fillblank sm" data-answer="11~~~0x11~~~11~~~0x11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The most significant byte of 0x11223344.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>With <code>uint16_t *q = (uint16_t *)arr;</code> what is <code>q[1]</code> (4 hex digits)?</div>
      <input class="fillblank sm" data-answer="0A0B~~~0x0A0B~~~0a0b~~~0x0a0b">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The high half of the first int32.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does reading through a different pointer type give different numbers?</div>
      <button class="opt" data-i="0">The compiler converts the values</button>
      <button class="opt" data-i="1">The same bytes are grouped differently according to the pointer type's size and the machine's byte order</button>
      <button class="opt" data-i="2">The bytes are rewritten when cast</button>
      <button class="opt" data-i="3">Only the first element is read</button>
      <div class="fb">No bytes change; only the interpretation.</div>
    </div>
  </div>
</section>

<section class="topic" id="l29-rd17">
  <h2>RD17 Self-Check &middot; Arrays in C (DiS 2.5)</h2>
  <p class="muted">Fresh questions in the style of RD17 (static arrays, arrays and functions, malloc arrays, contiguity, 2D arrays and Method 1 / Method 2).</p>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q1</span>Where are statically declared local arrays stored?</div>
      <button class="opt" data-i="0">Heap</button>
      <button class="opt" data-i="1">Stack</button>
      <button class="opt" data-i="2">Registers</button>
      <button class="opt" data-i="3">Code segment</button>
      <div class="fb">In the function's frame.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q2</span>When an array is passed to a function in C, what is actually passed?</div>
      <button class="opt" data-i="0">A copy of the entire array</button>
      <button class="opt" data-i="1">The size of the array</button>
      <button class="opt" data-i="2">The base address of the array</button>
      <button class="opt" data-i="3">A deep copy</button>
      <div class="fb">A pointer to the first element.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>Which expression allocates space for 50 ints?</div>
      <button class="opt" data-i="0">malloc(50)</button>
      <button class="opt" data-i="1">malloc(sizeof(int))</button>
      <button class="opt" data-i="2">malloc(sizeof(int) * 50)</button>
      <button class="opt" data-i="3">malloc(int * 50)</button>
      <div class="fb">count &times; element size.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q4</span>What does it mean that array elements are stored contiguously?</div>
      <button class="opt" data-i="0">In sorted order</button>
      <button class="opt" data-i="1">Without gaps between elements</button>
      <button class="opt" data-i="2">Only on the heap</button>
      <button class="opt" data-i="3">In increasing value</button>
      <div class="fb">Back to back.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q5</span>If int is 4 bytes, what is the address difference between <code>iarray[2]</code> and <code>iarray[3]</code>?</div>
      <button class="opt" data-i="0">1</button>
      <button class="opt" data-i="1">2</button>
      <button class="opt" data-i="2">4</button>
      <button class="opt" data-i="3">8</button>
      <div class="fb">One element.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>Why are constants often used for array sizes instead of numeric literals?</div>
      <button class="opt" data-i="0">They are faster</button>
      <button class="opt" data-i="1">They use less memory</button>
      <button class="opt" data-i="2">They improve readability and maintainability</button>
      <button class="opt" data-i="3">They allow dynamic resizing</button>
      <div class="fb">One place to change.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q7</span>What is the layout order of a statically allocated 2D array?</div>
      <button class="opt" data-i="0">Column-major</button>
      <button class="opt" data-i="1">Diagonal-major</button>
      <button class="opt" data-i="2">Row-major</button>
      <button class="opt" data-i="3">Random</button>
      <div class="fb">Row-major.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q8</span>Which statement about Method 2 is true?</div>
      <button class="opt" data-i="0">All elements are contiguous</button>
      <button class="opt" data-i="1">Only the elements within a row are contiguous</button>
      <button class="opt" data-i="2">Only columns are contiguous</button>
      <button class="opt" data-i="3">Nothing is contiguous</button>
      <div class="fb">Rows are separate blocks.</div>
    </div>
  </div>
</section>

</main>
`;
