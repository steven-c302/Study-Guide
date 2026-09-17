/* ============================================================
   LESSON 14 — CL09 Applications of Bitwise Operators, incl. RD08
   (masks recap, clear/update bit, performance, bit-packing).
   Injects into #l14. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l14').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l14-masks')">1 &middot; Masks Recap &amp; clear_bit</button>
  <button onclick="showTopic(this,'l14-update')">2 &middot; update_bit</button>
  <button onclick="showTopic(this,'l14-perf')">3 &middot; Performance &amp; Bit-Packing</button>
  <button onclick="showTopic(this,'l14-rd08')">RD08 Self-Check</button>
</nav>
<main>

<!-- ============ MASKS RECAP + CLEAR ============ -->
<section class="topic active" id="l14-masks">
  <h2>CL09 &middot; Masks Recap &amp; <code>clear_bit</code></h2>

  <div class="concept">A <b>mask</b> is a binary pattern used to <b>select (get), set, clear, or toggle</b>
  specific bits within a number.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Operation</th><th>Meaning</th><th>Operator</th></tr>
      <tr><td><b>Select</b> (get)</td><td>read a bit's value</td><td><code>&amp;</code></td></tr>
      <tr><td><b>Set</b></td><td>make a bit 1</td><td><code>|</code></td></tr>
      <tr><td><b>Clear</b></td><td>make a bit 0</td><td><code>&amp;</code> with <code>~mask</code></td></tr>
      <tr><td><b>Toggle</b></td><td>flip 0&rarr;1 or 1&rarr;0</td><td><code>^</code></td></tr>
    </table>
  </div>

  <h3><code>clear_bit2</code>: clear one fixed bit</h3>
  <div class="card">
    <p>Clear bit 2 of an <code>int8_t</code>: build a mask that is 0 everywhere except bit 2, then invert it
    so it's <b>1 everywhere except bit 2</b>, and AND it in.</p>
<pre>int8_t clear_bit2(int8_t number) {
    int8_t mask = ~(0b100);
    return number &amp; mask;
}</pre>
    <p class="muted">Worked example: <code>number = 0b0000_1111</code></p>
<pre>mask = ~(0b0000_0100) = 0b1111_1011

  0b0000_1111
&amp; 0b1111_1011
-------------
  0b0000_1011</pre>
    <p>Bit 2 (value 4) is gone; every other bit survives — that's exactly what AND-with-a-1-elsewhere mask
    guarantees.</p>
  </div>

  <h3><code>clear_bit</code>: clear <em>any</em> bit <code>i</code></h3>
  <div class="card">
    <p>Hard-coding <code>0b100</code> only clears bit 2. To clear an arbitrary bit <code>i</code>, build the
    single-bit mask with a <b>shift</b> instead of a literal: <code>1 &lt;&lt; i</code> places a lone 1 at
    position <code>i</code>, then <code>~</code> flips it to all-1s-except-position-<code>i</code>.</p>
<pre>int8_t clear_bit(int8_t num, int8_t i) {
    int8_t mask = ~(1 &lt;&lt; i);
    return num &amp; mask;
}</pre>
    <p class="muted">Worked example: <code>i = 5</code>, <code>num = 0b1110_1010</code></p>
<pre>mask = ~(1 &lt;&lt; 5) = ~(0b0010_0000) = 0b1101_1111

  0b1110_1010
&amp; 0b1101_1111
-------------
  0b1100_1010</pre>
    <p>This is the general pattern behind every mask in this lecture: <b>shift a 1 into place, then combine
    it with the number using the operator that matches what you want to do.</b></p>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Why does <code>clear_bit</code> use <code>1 &lt;&lt; i</code> instead of a literal like <code>0b100</code>?</div>
      <button class="opt" data-i="0">Shifting is required by the C standard for masks</button>
      <button class="opt" data-i="1">It lets the same function clear any bit position at runtime, not just one hard-coded position</button>
      <button class="opt" data-i="2">Literals don't work with <code>int8_t</code></button>
      <button class="opt" data-i="3">It makes the mask wider</button>
      <div class="fb"><code>1 &lt;&lt; i</code> places a single 1 wherever <code>i</code> says to, so the
      function generalizes from "clear bit 2" to "clear whichever bit the caller asks for."</div>
    </div>
    <div class="q">
      <p>What mask (before the <code>~</code>) would <code>clear_bit(num, 4)</code> start from? (write as <code>0bXXXXXXXX</code>, 8 bits)</p>
      <input class="fillblank" data-answer="0b00010000">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"></div>
    </div>
  </div>
</section>

<!-- ============ UPDATE BIT ============ -->
<section class="topic" id="l14-update">
  <h2>CL09 &middot; <code>update_bit</code>: Set a Bit to an Arbitrary Value</h2>

  <div class="concept">Set/clear write a <b>known constant</b> (1 or 0). <code>update_bit</code> writes
  whichever value the caller passes in — it has to work for <b>both</b> 0 and 1 with the same code.</div>

  <div class="card">
    <p>Write <code>update_bit(num, i, x)</code>: set bit <code>i</code> of <code>num</code> to <code>x</code>
    (where <code>x</code> is 0 or 1).</p>
    <div class="warn">You can't just OR in <code>x &lt;&lt; i</code> — if bit <code>i</code> is already 1 and
    <code>x</code> is 0, OR can never turn a 1 back into a 0. You need to <b>clear the bit first</b>, then
    <b>set it to the requested value</b>.</div>
<pre>int8_t update_bit(int8_t num, int8_t i, int8_t x) {
    int8_t mask = ~(1 &lt;&lt; i);
    int8_t clear_bit_i = num &amp; mask;      // step 1: force bit i to 0
    return clear_bit_i | (x &lt;&lt; i);        // step 2: OR in the new value
}</pre>
    <p class="muted">Two calls: <code>update_bit(0b0101, 2, 0)</code> and <code>update_bit(0b0101, 1, 1)</code></p>
<pre>Call 1: num=0b0101, i=2, x=0
  mask = ~(1&lt;&lt;2) = 0b1111_1011
  clear_bit_i = 0b0101 &amp; 0b1111_1011 = 0b0001
  result = 0b0001 | (0&lt;&lt;2) = 0b0001 = 1

Call 2: num=0b0101, i=1, x=1
  mask = ~(1&lt;&lt;1) = 0b1111_1101
  clear_bit_i = 0b0101 &amp; 0b1111_1101 = 0b0101
  result = 0b0101 | (1&lt;&lt;1) = 0b0111 = 7</pre>
    <p>Matches the slide's expected output: <code>1</code>, then <code>7</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why must <code>update_bit</code> clear bit <code>i</code> before ORing in <code>x &lt;&lt; i</code>?</div>
      <button class="opt" data-i="0">Clearing first is just a style convention, not required</button>
      <button class="opt" data-i="1">OR is undefined on bits that are already 1</button>
      <button class="opt" data-i="2">If bit <code>i</code> is already 1 and <code>x</code> is 0, OR alone could never turn it back to 0 — only clearing first, then ORing, works for both <code>x=0</code> and <code>x=1</code></button>
      <button class="opt" data-i="3">Clearing makes the shift faster</button>
      <div class="fb">OR can only turn bits <i>on</i>; it can never turn a 1 back into a 0. Clearing first
      guarantees bit <code>i</code> starts at 0, so the following OR reliably lands whatever <code>x</code>
      actually is.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span><code>update_bit(num, i, x)</code> could be written correctly as just <code>num | (x &lt;&lt; i)</code>.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> That works only when <code>x = 1</code> or bit <code>i</code> was already
      0. If bit <code>i</code> is 1 and <code>x = 0</code>, plain OR leaves the bit set at 1 — wrong.</div>
    </div>
  </div>
</section>

<!-- ============ PERFORMANCE + BIT PACKING ============ -->
<section class="topic" id="l14-perf">
  <h2>CL09 &middot; Performance Optimization &amp; Bit-Packing</h2>

  <h3>Shifting instead of multiplying/dividing</h3>
  <div class="card">
    <div class="concept">Bit shifting is much more efficient than multiplying or dividing, because a shift
    is a single fast hardware operation while multiplication/division circuits are more complex. This is used
    in embedded systems, game engines, and other performance-critical code.</div>
    <p class="muted">Example: multiplying <code>x</code> by 4</p>
<pre>x *= 4;      // works, but goes through general multiplication
x &lt;&lt; 2;      // same result, much faster — shifting left by 2 = &times;4</pre>
    <div class="card" style="margin-top:10px">
      <p><b>In-class problem:</b> using only bitwise operations and addition, write a line of C that multiplies
      a number <code>n</code> by 20.</p>
      <button class="btn small" onclick="toggleReveal(this)">Show solution</button>
      <div class="reveal">
        <p class="muted">Hint: what combination of powers of 2 add up to 20? &rarr; <code>20 = 16 + 4</code>,
        so <code>n &times; 20 = n &times; 16 + n &times; 4</code>.</p>
<pre>n = (n &lt;&lt; 4) + (n &lt;&lt; 2);</pre>
        <p><code>n &lt;&lt; 4</code> is <code>n &times; 16</code> and <code>n &lt;&lt; 2</code> is
        <code>n &times; 4</code>; <code>16 + 4 = 20</code>.</p>
      </div>
    </div>
  </div>

  <h3>Bit-packing</h3>
  <div class="card">
    <div class="concept"><b>Bit-packing</b> stores multiple small values (flags, booleans, short integers)
    into a single larger data type using shifts and bitwise OR. It's used in video encoding and file
    compression algorithms to avoid wasting space on values that don't need a full byte or word.</div>
    <p><b>In-class problem:</b> combine two 4-bit values (nibbles) into a single <code>uint8_t</code>,
    formatted as <code>{high_nibble, low_nibble}</code>.</p>
    <p class="muted">Example: <code>high_nibble = 0b0101</code>, <code>low_nibble = 0b1100</code> &rarr;
    <code>result = 0b0101_1100</code></p>
    <button class="btn small" onclick="toggleReveal(this)">Show solution</button>
    <div class="reveal">
<pre>uint8_t packed = (high_nibble &lt;&lt; 4) | low_nibble;</pre>
      <p>Shifting <code>high_nibble</code> left by 4 moves it into the top four bit positions; ORing in
      <code>low_nibble</code> (which only occupies the bottom four bits) fills in the rest without disturbing
      the top.</p>
    </div>
  </div>

  <h3>Extracting color channels from a packed hex color</h3>
  <div class="card">
    <p>An RGB hex color like <code>0x7BAFD4</code> ("Carolina Blue") packs three 8-bit channels into one
    <code>uint32_t</code>: red in bits 23&ndash;16, green in bits 15&ndash;8, blue in bits 7&ndash;0. Extracting
    a channel is <b>shift into position, then mask off the rest</b> — the mirror image of bit-packing.</p>
<pre>uint32_t color = 0x7BAFD4;
uint32_t red   = (color &gt;&gt; 16) &amp; 0xFF;   // 0x7B
uint32_t green = (color &gt;&gt; 8)  &amp; 0xFF;   // 0xAF
uint32_t blue  =  color         &amp; 0xFF;   // 0xD4</pre>
    <p class="muted">Isolating blue: <code>0x7BAFD4 &amp; 0x0000FF = 0x0000D4</code>. Isolating green: shift
    right 8 first (<code>0x7BAFD4 &gt;&gt; 8 = 0x007BAF</code>), <i>then</i> mask with <code>0xFF</code> to
    drop the leftover red digits, giving <code>0x0000AF</code>. Isolating red follows the same pattern with a
    shift of 16.</p>
    <div class="warn">Order matters: masking before shifting for green/red would leave the channel sitting at
    the wrong bit position instead of down at bits 7&ndash;0.</div>
  </div>

  <div class="card">
    <div class="q" data-fill="0">
      <p>For <code>color = 0x7BAFD4</code>, what expression correctly isolates the green channel?</p>
      <input class="fillblank" data-answer="(color >> 8) & 0xFF~~~(color>>8)&0xFF">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"></div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>Bit-packing and channel-extraction are inverse operations: one combines with shift+OR, the other separates with shift+AND.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> Packing shifts a value into its slot and ORs it into a bigger container;
      extracting shifts that slot down to position 0 and ANDs with a mask to strip everything else away.</div>
    </div>
  </div>
</section>

<!-- ============ RD08 SELF-CHECK ============ -->
<section class="topic" id="l14-rd08">
  <h2>RD08 Self-Check &middot; Bitwise Operators</h2>
  <p class="muted">Recreates the RD08 reading quiz (13 pts: Q1 is 9 pts on shifts and identities, Q2 is 4 pts
  on masks).</p>

  <div class="card">
    <h3>Q1 &middot; Bitwise identities &amp; shifts (9 pts)</h3>

    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">1.1</span>Which expression is always equal to <code>n</code> for any integer <code>n</code>?</div>
      <button class="opt" data-i="0"><code>n | ~n</code></button>
      <button class="opt" data-i="1"><code>n | n + 1</code></button>
      <button class="opt" data-i="2"><code>n | 0b111&hellip;1</code></button>
      <button class="opt" data-i="3"><code>n | 0b000&hellip;0</code></button>
      <div class="fb">ORing with all-zeros changes nothing — every bit of <code>n</code> is preserved exactly.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">1.2</span>Which expression always evaluates to <code>0b000&hellip;0</code>?</div>
      <button class="opt" data-i="0"><code>n &amp; 0b111&hellip;1</code></button>
      <button class="opt" data-i="1"><code>n &amp; n</code></button>
      <button class="opt" data-i="2"><code>n &amp; ~n</code></button>
      <button class="opt" data-i="3"><code>n &amp; (n &lt;&lt; 1)</code></button>
      <div class="fb">Every bit of <code>n</code> and its complement <code>~n</code> disagree at every
      position, so ANDing them can never produce a 1 anywhere.</div>
    </div>

    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">1.3</span>What is the result of <code>n ^ n</code>?</div>
      <button class="opt" data-i="0"><code>n</code></button>
      <button class="opt" data-i="1"><code>~n</code></button>
      <button class="opt" data-i="2"><code>0b111&hellip;1</code></button>
      <button class="opt" data-i="3"><code>0b000&hellip;0</code></button>
      <div class="fb">XOR produces a 1 only where bits differ. A number XORed with itself has identical bits
      at every position, so the result is all zeros.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">1.4</span>What is the effect of the expression <code>x &lt;&lt; k</code>?</div>
      <button class="opt" data-i="0">Divides <code>x</code> by <code>2^k</code></button>
      <button class="opt" data-i="1">Multiplies <code>x</code> by <code>2^k</code> (if no overflow)</button>
      <button class="opt" data-i="2">Shifts bits right and fills with zeros</button>
      <button class="opt" data-i="3">Toggles the lowest <code>k</code> bits</button>
      <div class="fb">Left shift moves every bit up <code>k</code> positions, which is equivalent to
      multiplying by <code>2^k</code> as long as no significant bits fall off the top.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">1.5</span>Logical right shift is typically used for:</div>
      <button class="opt" data-i="0">Signed integers only</button>
      <button class="opt" data-i="1">Unsigned integers</button>
      <button class="opt" data-i="2">Floating-point values</button>
      <button class="opt" data-i="3">Characters only</button>
      <div class="fb">Logical right shift always fills with 0s — correct for unsigned values, which have no
      sign bit to preserve.</div>
    </div>

    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">1.6</span>Arithmetic right shift differs from logical right shift because it:</div>
      <button class="opt" data-i="0">Fills left bits with 1s only</button>
      <button class="opt" data-i="1">Fills left bits with 0s only</button>
      <button class="opt" data-i="2">Reverses the bits</button>
      <button class="opt" data-i="3">Preserves the sign bit</button>
      <div class="fb">Arithmetic right shift copies the original leftmost (sign) bit into the vacated
      positions — 0s for a positive number, 1s for a negative one — so the sign is preserved either way.</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">1.7</span>Which statement is correct in C?</div>
      <button class="opt" data-i="0">Signed right shift is always arithmetic.</button>
      <button class="opt" data-i="1">Unsigned right shift is always arithmetic.</button>
      <button class="opt" data-i="2">Unsigned right shift is logical; signed right shift is implementation-defined.</button>
      <button class="opt" data-i="3">Both signed and unsigned right shifts are logical.</button>
      <div class="fb">The C standard guarantees unsigned <code>&gt;&gt;</code> is logical, but leaves the
      behavior of <code>&gt;&gt;</code> on negative signed values up to the implementation (in practice, almost
      always arithmetic on real compilers/hardware).</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">1.8</span><code>uint8_t b = 2; printf("%d\\n", b &gt;&gt; 1);</code> &mdash; what is printed?</div>
      <button class="opt" data-i="0">0</button>
      <button class="opt" data-i="1">1</button>
      <button class="opt" data-i="2">2</button>
      <button class="opt" data-i="3">4</button>
      <div class="fb"><code>0b0000_0010 &gt;&gt; 1 = 0b0000_0001 = 1</code>. Unsigned, so this is a logical
      shift regardless.</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">1.9</span><code>int8_t x = -5;</code> with arithmetic right shift &mdash; what is <code>x &gt;&gt; 1</code>?</div>
      <button class="opt" data-i="0">-2</button>
      <button class="opt" data-i="1">-3</button>
      <button class="opt" data-i="2">-4</button>
      <button class="opt" data-i="3">125</button>
      <div class="fb">-5 is <code>0b1111_1011</code>. Arithmetic right shift by 1 copies the sign bit in:
      <code>0b1111_1101 = -3</code>. (Right-shifting a negative number rounds toward negative infinity, not
      toward zero — so this is -3, not -2.)</div>
    </div>
  </div>

  <div class="card">
    <h3>Q2 &middot; Masks (4 pts)</h3>

    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">2.1</span>What is a bit mask used for?</div>
      <button class="opt" data-i="0">Encrypting data</button>
      <button class="opt" data-i="1">Increasing performance of multiplication</button>
      <button class="opt" data-i="2">Converting decimal to binary</button>
      <button class="opt" data-i="3">Selecting, setting, clearing, or toggling specific bits</button>
      <div class="fb">That's the definition from the reading — a mask is a binary pattern used for exactly
      those four operations.</div>
    </div>

    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">2.2</span>Which expression correctly checks whether bit <code>i</code> of <code>num</code> is set?</div>
      <button class="opt" data-i="0"><code>num &amp; (1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="1"><code>num | (1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="2"><code>num ^ (1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="3"><code>~num &amp; (1 &lt;&lt; i)</code></button>
      <div class="fb">ANDing with a single-bit mask leaves only bit <code>i</code>'s value in the result
      (nonzero means it was set, zero means it was clear).</div>
    </div>

    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">2.3</span>Which expression sets bit <code>i</code> of <code>num</code> to 1?</div>
      <button class="opt" data-i="0"><code>num &amp; (1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="1"><code>num ^ (1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="2"><code>num | (1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="3"><code>num &gt;&gt; i</code></button>
      <div class="fb">OR forces bit <code>i</code> to 1 while leaving every other bit untouched
      (<code>x|0=x</code>, <code>x|1=1</code>).</div>
    </div>

    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">2.4</span>Which operation clears bit <code>i</code> (sets it to 0)?</div>
      <button class="opt" data-i="0"><code>num | ~(1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="1"><code>num &amp; ~(1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="2"><code>num ^ ~(1 &lt;&lt; i)</code></button>
      <button class="opt" data-i="3"><code>num &lt;&lt; ~(1 &lt;&lt; i)</code></button>
      <div class="fb">AND with a mask that is 0 only at position <code>i</code> (everywhere else 1) is exactly
      <code>clear_bit</code> from this lecture.</div>
    </div>
  </div>
</section>

</main>
`;
