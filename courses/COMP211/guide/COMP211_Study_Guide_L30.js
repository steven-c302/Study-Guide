/* ============================================================
   LESSON 30 — CL20 Arrays of Strings: the heap manager (free list, first fit, coalescing), realloc,
   char ** arrays, fgets, growing a list of words. Pairs with Mastery unit u29.
   Injects into #l30. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l30').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l30-heap')">1 &middot; The Heap Manager & First Fit</button>
  <button onclick="showTopic(this,'l30-practice')">2 &middot; Trace More Sequences</button>
  <button onclick="showTopic(this,'l30-realloc')">3 &middot; Resizing Arrays: realloc</button>
  <button onclick="showTopic(this,'l30-strings')">4 &middot; Arrays of Strings (char **)</button>
  <button onclick="showTopic(this,'l30-growing')">5 &middot; Growing a List of Words</button>
</nav>
<main>

<section class="topic active" id="l30-heap">
  <h2>CL20 &middot; Heap Memory Management: Free List and First Fit</h2>
  <div class="concept">The heap manager keeps a <b>free list</b>: the <b>start address and size</b> of every contiguous unallocated block. At the start the heap is <b>one big free block</b>. After a series of <code>malloc</code> and <code>free</code> calls the heap becomes <b>fragmented</b>: free space scattered among allocated blocks.</div>

  <div class="card">
  <div class="concept"><b>First fit</b>: on <code>malloc(n)</code> the allocator <b>starts at the beginning of the free list</b>, checks each free block in turn, and takes the <b>first block large enough</b>. If the block is larger than needed it is <b>split</b>: one part is allocated, the remainder stays in the free list. On <code>free</code> the block rejoins the list, and <b>adjacent free blocks are coalesced</b> (merged) into one.</div>
  </div>

  <h3>The lecture example (a simplified 1000-byte heap)</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Operation</th><th>Free list after (address order)</th></tr>
      <tr><td><code>ptr1 = malloc(200);</code></td><td>200&ndash;999</td></tr>
      <tr><td><code>ptr2 = malloc(300);</code></td><td>500&ndash;999</td></tr>
      <tr><td><code>free(ptr1);</code></td><td>0&ndash;199, 500&ndash;999</td></tr>
      <tr><td><code>ptr3 = malloc(100);</code></td><td>100&ndash;199, 500&ndash;999</td></tr>
      <tr><td><code>ptr4 = malloc(200);</code></td><td>100&ndash;199, 700&ndash;999</td></tr>
      <tr><td><code>free(ptr2);</code></td><td>100&ndash;499, 700&ndash;999</td></tr>
    </table>
    <p>Key moments: <code>ptr3 = malloc(100)</code> takes 0&ndash;99 (first fit, splitting 0&ndash;199). <code>ptr4 = malloc(200)</code> skips the 100-byte block and takes 500&ndash;699. <code>free(ptr2)</code> frees 200&ndash;499, <b>coalescing</b> with 100&ndash;199 into <b>100&ndash;499</b>.</p>
  </div>

  <h3>Practice sequence from class</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Operation</th><th>Free list after (address order)</th></tr>
      <tr><td><code>ptr1 = malloc(100);</code></td><td>100&ndash;999</td></tr>
      <tr><td><code>free(ptr1);</code></td><td>0&ndash;999</td></tr>
      <tr><td><code>ptr2 = malloc(200);</code></td><td>200&ndash;999</td></tr>
      <tr><td><code>ptr3 = malloc(400);</code></td><td>600&ndash;999</td></tr>
      <tr><td><code>free(ptr2);</code></td><td>0&ndash;199, 600&ndash;999</td></tr>
      <tr><td><code>ptr4 = malloc(300);</code></td><td>0&ndash;199, 900&ndash;999</td></tr>
      <tr><td><code>ptr5 = malloc(50);</code></td><td>50&ndash;199, 900&ndash;999</td></tr>
    </table>
    <p>Final free list: <b>50-199, 900-999</b>. Note how <code>free(ptr1)</code> returned the block to the single big free block (coalescing with 100&ndash;999), and how <code>ptr5</code> went to the first fit, the hole at the start.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>After the lecture example, what is the free list? (format <code>a-b,c-d</code>)</div>
      <input class="fillblank sm" data-answer="100-499,700-999">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">ptr1 0&ndash;199, ptr2 200&ndash;499, free ptr1, ptr3 0&ndash;99, ptr4 500&ndash;699, free ptr2 &rarr; 100&ndash;499 and 700&ndash;999.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>In the practice sequence which bytes does <code>ptr4 = malloc(300)</code> receive?</div>
      <input class="fillblank sm" data-answer="600-899">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The hole 0&ndash;199 is too small; first fit takes 600&ndash;899.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does first fit do?</div>
      <button class="opt" data-i="0">Picks the smallest block that fits</button>
      <button class="opt" data-i="1">Scans from the start of the free list and picks the first block big enough</button>
      <button class="opt" data-i="2">Picks the largest block</button>
      <button class="opt" data-i="3">Always allocates at address 0</button>
      <div class="fb">It stops at the first adequate block.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>A 300-byte free block serves <code>malloc(100)</code>. What happens to the other 200 bytes?</div>
      <button class="opt" data-i="0">They are allocated too</button>
      <button class="opt" data-i="1">They stay in the free list as a smaller free block (the block is split)</button>
      <button class="opt" data-i="2">They are discarded</button>
      <button class="opt" data-i="3">They are zeroed</button>
      <div class="fb">Splitting.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is coalescing?</div>
      <button class="opt" data-i="0">Moving allocated blocks together</button>
      <button class="opt" data-i="1">Merging adjacent free blocks into one larger free block</button>
      <button class="opt" data-i="2">Zeroing freed memory</button>
      <button class="opt" data-i="3">Returning memory to the OS</button>
      <div class="fb">It reduces fragmentation.</div>
    </div>
  </div>
</section>

<section class="topic" id="l30-practice">
  <h2>CL20 &middot; Practice: Draw the Heap and the Free List</h2>
  <div class="concept">Method: keep the <b>address-ordered free list</b>. For each <code>malloc(n)</code> scan from the front, take the first block &ge; n, shrink it from the front. For each <code>free</code> add the block back and <b>merge touching neighbours</b>.</div>

  <div class="card">
    <p><b>Sequence A</b> (1000-byte heap):</p>
    <table class="cmp">
      <tr><th>Operation</th><th>Free list after (address order)</th></tr>
      <tr><td><code>a = malloc(150);</code></td><td>150&ndash;999</td></tr>
      <tr><td><code>b = malloc(250);</code></td><td>400&ndash;999</td></tr>
      <tr><td><code>c = malloc(100);</code></td><td>500&ndash;999</td></tr>
      <tr><td><code>free(b);</code></td><td>150&ndash;399, 500&ndash;999</td></tr>
      <tr><td><code>d = malloc(200);</code></td><td>350&ndash;399, 500&ndash;999</td></tr>
      <tr><td><code>free(a);</code></td><td>0&ndash;149, 350&ndash;399, 500&ndash;999</td></tr>
    </table>
    <p>Placements: <code>a</code> = 0&ndash;149, <code>b</code> = 150&ndash;399, <code>c</code> = 400&ndash;499, <code>d</code> = 150&ndash;349.</p>
  </div>

  <div class="card">
    <p><b>Sequence B</b>:</p>
    <table class="cmp">
      <tr><th>Operation</th><th>Free list after (address order)</th></tr>
      <tr><td><code>a = malloc(300);</code></td><td>300&ndash;999</td></tr>
      <tr><td><code>b = malloc(300);</code></td><td>600&ndash;999</td></tr>
      <tr><td><code>free(a);</code></td><td>0&ndash;299, 600&ndash;999</td></tr>
      <tr><td><code>free(b);</code></td><td>0&ndash;999</td></tr>
      <tr><td><code>c = malloc(500);</code></td><td>500&ndash;999</td></tr>
      <tr><td><code>d = malloc(200);</code></td><td>700&ndash;999</td></tr>
    </table>
    <p>After <code>free(a)</code> then <code>free(b)</code> the two adjacent freed blocks merge with each other (0&ndash;599), so a 500-byte request fits at the start.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Sequence A: final free list?</div>
      <input class="fillblank sm" data-answer="0-149,350-399,500-999">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">a freed at 0&ndash;149; b's old block left 350&ndash;399 after d; the tail 500&ndash;999.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Sequence A: which bytes does <code>d</code> receive (format <code>a-b</code>)?</div>
      <input class="fillblank sm" data-answer="150-349">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The first free block large enough is b's old 150&ndash;399.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Sequence B: final free list?</div>
      <input class="fillblank sm" data-answer="700-999">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">c takes 0&ndash;499, d takes 500&ndash;699; remaining 700&ndash;999.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Sequence B: which bytes does <code>c</code> receive?</div>
      <input class="fillblank sm" data-answer="0-499">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Coalesced 0&ndash;599 is the first block that fits 500 bytes.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does the order of malloc and free calls change which addresses a pointer gets?</div>
      <button class="opt" data-i="0">It does not</button>
      <button class="opt" data-i="1">First fit depends on the current free list, which depends on earlier frees and merges</button>
      <button class="opt" data-i="2">Because pointers are random</button>
      <button class="opt" data-i="3">The OS shuffles blocks</button>
      <div class="fb">The state of the free list decides.</div>
    </div>
  </div>
</section>

<section class="topic" id="l30-realloc">
  <h2>CL20 &middot; Resizing Arrays with <code>realloc</code></h2>
  <div class="concept">Arrays are <b>contiguous</b>. A <b>stack array</b> cannot be resized (the memory next to it may already be in use), but a <b>heap array</b> can: <code>void *realloc(void *ptr, size_t new_size);</code> returns a pointer to the start of the resized block. Two cases:</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Case</th><th>What realloc does</th></tr>
      <tr><td><b>1. Room to grow in place</b></td><td>there is free space directly after the block, so it simply <b>expands the block</b>; the address is unchanged</td></tr>
      <tr><td><b>2. No room: must move</b></td><td>(1) allocate a new block of the requested size, (2) <b>copy</b> the old contents, (3) <b>free</b> the old block, (4) <b>return the new pointer</b> &mdash; so the pointer value may change</td></tr>
    </table>
    <p>Existing data is preserved (up to the smaller of old and new sizes). On failure realloc returns <b>NULL</b> and the original block is still valid. That is why you assign to a temporary and only replace the old pointer when it is not NULL.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Can a stack array be resized?</div>
      <button class="opt" data-i="0">Yes, with realloc</button>
      <button class="opt" data-i="1">No: its size is fixed in the frame</button>
      <button class="opt" data-i="2">Yes, with malloc</button>
      <button class="opt" data-i="3">Only global ones</button>
      <div class="fb">Only heap blocks can be resized.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does realloc do when there is no room after the block?</div>
      <button class="opt" data-i="0">Returns NULL and keeps the data</button>
      <button class="opt" data-i="1">Allocates a new block, copies the contents, frees the old block, returns the new pointer</button>
      <button class="opt" data-i="2">Overwrites the following block</button>
      <button class="opt" data-i="3">Frees everything</button>
      <div class="fb">The block moves.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why must you not keep using the <b>old</b> pointer after a successful realloc?</div>
      <button class="opt" data-i="0">It becomes NULL</button>
      <button class="opt" data-i="1">The block may have moved, so the old pointer may dangle</button>
      <button class="opt" data-i="2">realloc zeroes it</button>
      <button class="opt" data-i="3">It is read-only</button>
      <div class="fb">Use the returned pointer.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Check</span>If realloc fails (returns NULL) the original block has been freed.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> The original block is still valid; that is why a temporary pointer is used.</div>
    </div>
  </div>
</section>

<section class="topic" id="l30-strings">
  <h2>CL20 &middot; Arrays of Strings: <code>char **</code> on the Heap</h2>
  <div class="concept">Each string is itself an array of char. An array of strings is a <b>char **</b>: an array of <code>char *</code> pointers, each pointing at its own heap-allocated string. For the names <code>"Eliza"</code>, <code>"Aileen"</code>, <code>"Akshan"</code>, <code>"Avi"</code>: the outer array holds four pointers = <b>4 &times; 8 = 32 bytes</b>; each string needs its characters <b>plus the NUL</b>: <b>6, 7, 7 and 4 bytes</b> (<code>strlen + 1</code>).</div>

  <div class="card">
<pre>HEAP
 names (32 bytes)  [ ptr0 | ptr1 | ptr2 | ptr3 ]
                      |      |      |      |
                      v      v      v      v
                   "Eliza" "Aileen" "Akshan" "Avi"
                    (6)     (7)      (7)     (4)</pre>
    <p>Total heap memory for the four names and the array: 32 + 6 + 7 + 7 + 4 = <b>56</b> bytes.</p>
  </div>

  <h3>Buffers and fgets</h3>

  <div class="card">
    <p>A <b>buffer</b> is just a chunk of memory used to store data, like an array. <code>char name[5];</code> can hold a string of up to <b>4 characters plus the NUL</b>.</p>
    <p><code>fgets(buffer, sizeof(buffer), stdin)</code> reads a line into the buffer. The 2nd argument is the <b>maximum number of characters to read including the NUL</b>. If the input fits it is stored as a NUL-terminated string; if it is longer only part is read and the <b>rest stays in the input stream</b>. It returns the buffer on success and <b>NULL</b> at end-of-file or on error.</p>
  </div>

  <h3><code>read_names</code>: allocate, check, fill</h3>

  <div class="card">
<pre>char **read_names(int num_names, int name_len) {
    char **names = malloc(num_names * sizeof(char *));   // outer array
    if (!names) { fprintf(stderr, "Memory allocation failed!\\n"); exit(EXIT_FAILURE); }
    for (int i = 0; i &lt; num_names; i++) {
        names[i] = malloc(name_len + 1);                // chars + NUL
        if (!names[i]) { fprintf(stderr, "Memory allocation failed!\\n"); exit(EXIT_FAILURE); }
        fgets(names[i], name_len + 1, stdin);
    }
    return names;       // the CALLER must free every names[i] and then names
}</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many bytes does the pointer array for 4 names need?</div>
      <input class="fillblank sm" data-answer="32">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4 &times; 8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many bytes must be allocated for the string "Aileen"?</div>
      <input class="fillblank sm" data-answer="7">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">strlen + 1 = 6 + 1.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Total heap bytes for the four names plus the pointer array?</div>
      <input class="fillblank sm" data-answer="56">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">32 + (6 + 7 + 7 + 4).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>In <code>read_names(n, len)</code>, how much should each inner string get?</div>
      <button class="opt" data-i="0">len</button>
      <button class="opt" data-i="1">len + 1</button>
      <button class="opt" data-i="2">n</button>
      <button class="opt" data-i="3">sizeof(char *)</button>
      <div class="fb">len characters plus the NUL.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>fgets(name, sizeof(name), stdin)</code> return at end of input?</div>
      <button class="opt" data-i="0">name</button>
      <button class="opt" data-i="1">NULL</button>
      <button class="opt" data-i="2">EOF as a char</button>
      <button class="opt" data-i="3">0 as an int</button>
      <div class="fb">NULL means nothing was read.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Who must free the result of <code>read_names</code>?</div>
      <button class="opt" data-i="0">Nobody</button>
      <button class="opt" data-i="1">The caller: every names[i] and then names</button>
      <button class="opt" data-i="2">The function before it returns</button>
      <button class="opt" data-i="3">The OS only</button>
      <div class="fb">The caller owns the memory.</div>
    </div>
  </div>
</section>

<section class="topic" id="l30-growing">
  <h2>CL20 &middot; A Dynamically Growing Array of Strings (array_of_strings.c)</h2>
  <div class="concept">The program repeatedly asks for words and stores each on the heap in a <b>dynamically resized array of <code>char *</code></b>. State: <code>char **words</code>, <code>size_t count</code>, <code>size_t capacity</code>. When <code>count == capacity</code> it <b>doubles</b> the capacity with <code>realloc</code>. Each word is stored in its own block of <code>strlen(buffer) + 1</code> bytes.</div>

  <div class="card">
<pre>words = malloc(capacity * sizeof(char *));          // 1. initial array of pointers
if (!words) { fprintf(stderr, "alloc failed\\n"); exit(1); }
...
if (count == capacity) {                            // 2. full: double it
    capacity *= 2;
    char **temp = realloc(words, capacity * sizeof(char *));
    if (!temp) { /* error: words is still valid */ }
    words = temp;
}
words[count] = malloc((strlen(buffer) + 1) * sizeof(char));   // 3. room for the NUL
if (!words[count]) { /* error */ }
strcpy(words[count], buffer);
count++;
...
for (size_t i = 0; i &lt; count; i++) {
    printf("%zu: %s\\n", i, words[i]);
    free(words[i]);                                 // 4. free each string
}
free(words);                                        // 5. then the array of pointers</pre>
  </div>

  <div class="card">
    <table class="cmp">
      <tr><th>Words added so far (initial capacity 2)</th><th>Capacity afterwards</th></tr>
      <tr><td>1&ndash;2</td><td>2</td></tr>
      <tr><td>3&ndash;4</td><td>4</td></tr>
      <tr><td>5&ndash;8</td><td>8</td></tr>
      <tr><td>9&ndash;16</td><td>16</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Starting with capacity 2 and doubling when count == capacity, what is the capacity after adding 5 words?</div>
      <input class="fillblank sm" data-answer="8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The 3rd word forces 4; the 5th forces 8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Capacity after adding 9 words?</div>
      <input class="fillblank sm" data-answer="16">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The 9th word forces 8 &rarr; 16.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which statement correctly allocates storage for a copy of <code>buffer</code>?</div>
      <button class="opt" data-i="0">malloc(strlen(buffer))</button>
      <button class="opt" data-i="1">malloc(strlen(buffer) + 1)</button>
      <button class="opt" data-i="2">malloc(sizeof(buffer))</button>
      <button class="opt" data-i="3">malloc(sizeof(char *))</button>
      <div class="fb">Characters plus the NUL.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>At the end of the program, what is the correct cleanup order?</div>
      <button class="opt" data-i="0">free(words); then each words[i]</button>
      <button class="opt" data-i="1">free each words[i]; then free(words)</button>
      <button class="opt" data-i="2">free(words) only</button>
      <button class="opt" data-i="3">No cleanup needed</button>
      <div class="fb">Inner strings first, then the pointer array.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why use <code>char **temp = realloc(words, &hellip;)</code> instead of assigning to words directly?</div>
      <button class="opt" data-i="0">It is faster</button>
      <button class="opt" data-i="1">If realloc fails words must remain valid (not NULL)</button>
      <button class="opt" data-i="2">realloc requires a char ** temporary</button>
      <button class="opt" data-i="3">To avoid casts</button>
      <div class="fb">Failure would otherwise lose the original pointer.</div>
    </div>
  </div>
</section>

</main>
`;
