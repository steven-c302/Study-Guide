/* ============================================================
   LESSON 7 — RD07 Bitwise Operators (DiS 4.6, 4.6.5).
   Injects into #l7. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l7').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l7-bitwise')">1 &middot; Bitwise vs. Logical Operators</button>
  <button onclick="showTopic(this,'l7-shifts')">2 &middot; Bit Shifts</button>
  <button onclick="showTopic(this,'l7-rd07')">RD07 Self-Check</button>
</nav>
<main>

<!-- ============ BITWISE VS LOGICAL ============ -->
<section class="topic active" id="l7-bitwise">
  <h2>Lesson 7 &middot; Bitwise vs. Logical Operators</h2>

  <div class="concept"><b>Bitwise operators</b> operate on the <b>individual bits</b> of a number's binary
  representation, one bit position at a time, producing a result of the <b>same width</b>. This is
  fundamentally different from <b>logical operators</b> (<code>&amp;&amp;</code>, <code>||</code>,
  <code>!</code>), which treat each operand as a single <b>truth value</b> (nonzero = true, zero = false) and
  produce one true/false result. <code>&amp;</code> and <code>&amp;&amp;</code> are not interchangeable —
  one walks every bit, the other collapses the whole operand to a single boolean first.</div>

  <h3>The four bitwise operators</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Operator</th><th>Name</th><th>Result bit is 1 when&hellip;</th><th>Arity</th></tr>
      <tr><td><code>&amp;</code></td><td>AND</td><td><b>both</b> input bits are 1</td><td>binary</td></tr>
      <tr><td><code>|</code></td><td>OR</td><td><b>at least one</b> input bit is 1</td><td>binary</td></tr>
      <tr><td><code>^</code></td><td>XOR</td><td>the input bits <b>differ</b> (exactly one is 1)</td><td>binary</td></tr>
      <tr><td><code>~</code></td><td>NOT</td><td>&mdash; flips <b>every</b> bit of its one operand</td><td>unary</td></tr>
    </table>
    <p class="muted">Each operates <b>column by column</b>: line the two operands up bit-for-bit and compute
    each result bit independently of every other position.</p>
  </div>

  <h3>AND (<code>&amp;</code>)</h3>
  <div class="card">
    <div class="two">
      <div>
        <table class="cmp">
          <tr><th>A</th><th>B</th><th>A &amp; B</th></tr>
          <tr><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td>0</td></tr>
          <tr><td>1</td><td>0</td><td>0</td></tr>
          <tr><td>1</td><td>1</td><td><b>1</b></td></tr>
        </table>
      </div>
      <div>
        <p class="muted">Worked example: <code>0b011010 &amp; 0b110110</code></p>
<pre> 011010
&amp;110110
-------
 010010</pre>
        <p>Result: <code><b>0b010010</b></code></p>
      </div>
    </div>
    <div class="concept">A common use: AND-ing with a mask of 1s and 0s <b>clears</b> the bits lined up with a
    0 in the mask, and <b>preserves</b> the bits lined up with a 1 — nothing but a 1&amp;1 in that column can
    survive.</div>
  </div>

  <h3>OR (<code>|</code>)</h3>
  <div class="card">
    <div class="two">
      <div>
        <table class="cmp">
          <tr><th>A</th><th>B</th><th>A | B</th></tr>
          <tr><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td><b>1</b></td></tr>
          <tr><td>1</td><td>0</td><td><b>1</b></td></tr>
          <tr><td>1</td><td>1</td><td><b>1</b></td></tr>
        </table>
      </div>
      <div>
        <p class="muted">Worked example: <code>0b011010 | 0b110110</code></p>
<pre> 011010
|110110
-------
 111110</pre>
        <p>Result: <code><b>0b111110</b></code></p>
      </div>
    </div>
  </div>

  <h3>XOR (<code>^</code>)</h3>
  <div class="card">
    <div class="two">
      <div>
        <table class="cmp">
          <tr><th>A</th><th>B</th><th>A ^ B</th></tr>
          <tr><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td><b>1</b></td></tr>
          <tr><td>1</td><td>0</td><td><b>1</b></td></tr>
          <tr><td>1</td><td>1</td><td>0</td></tr>
        </table>
      </div>
      <div>
        <p class="muted">Worked example: <code>0b011010 ^ 0b110110</code></p>
<pre> 011010
^110110
-------
 101100</pre>
        <p>Result: <code><b>0b101100</b></code></p>
      </div>
    </div>
    <p class="muted">XOR is the only one of the three where a bit position with <b>two equal inputs</b>
    (0&amp;0 or 1&amp;1) always produces 0 — it detects <i>difference</i>, not presence.</p>
  </div>

  <h3>NOT (<code>~</code>)</h3>
  <div class="card">
    <p>Unlike AND/OR/XOR, <code>~</code> is <b>unary</b> — it takes a single operand and flips every bit:
    1&rarr;0 and 0&rarr;1.</p>
    <p class="muted">Worked example (treating this as a 6-bit value): <code>~0b011010</code></p>
<pre>0 1 1 0 1 0   (start)
1 0 0 1 0 1   (each bit flipped)</pre>
    <p>Result: <code><b>0b100101</b></code></p>
    <div class="warn"><b>Width matters for NOT.</b> Flipping all the bits of an <b>8-bit</b> representation of
    a value gives a different-looking result than flipping the same value's <b>6-bit</b> representation —
    there are simply more leading bits to flip. There is no "the" answer for <code>~x</code> without first
    knowing how many bits <code>x</code> is stored in.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>Why can't you just use <code>&amp;&amp;</code> where you meant <code>&amp;</code>?</div>
      <button class="opt" data-i="0"><code>&amp;&amp;</code> is only for characters</button>
      <button class="opt" data-i="1"><code>&amp;&amp;</code> is slower</button>
      <button class="opt" data-i="2"><code>&amp;&amp;</code> collapses each operand to a single truth value first, so it can never combine bits position-by-position</button>
      <button class="opt" data-i="3">There is no difference</button>
      <div class="fb">Bitwise operators walk the bits; logical operators evaluate "is this operand nonzero"
      once per side and combine two booleans. <code>5 &amp; 2</code> is <code>0</code>; <code>5 &amp;&amp; 2</code>
      is <code>1</code> (true) — same inputs, very different question.</div>
    </div>
  </div>
</section>

<!-- ============ BIT SHIFTS ============ -->
<section class="topic" id="l7-shifts">
  <h2>Lesson 7 &middot; Bit Shifts (&sect;4.6.5)</h2>

  <div class="concept">A <b>bit shift</b> moves every bit in a number's binary representation <b>left</b> or
  <b>right</b> by a specified number of positions. It is still a bitwise operation — the output has the same
  width as the input — but instead of combining two operands bit-by-bit, it slides one operand's bits along
  and has to decide what to do at both ends.</div>

  <h3>Left shift (<code>&lt;&lt;</code>)</h3>
  <div class="card">
    <p>Shifts bits toward the more-significant (left) end. <b>Zeros are always added on the right</b> to fill
    in behind the bits that moved. If no significant bits fall off the left end, this is equivalent to
    <b>multiplying by 2</b> for every position shifted.</p>
    <p class="muted">Worked example, as an <b>8-bit</b> number: <code>0b00101101 &lt;&lt; 2</code></p>
<pre>00101101   (start)
shift left 1 &rarr; 01011010
shift left 2 &rarr; 10110100   (leading "00" fell off and is discarded; two 0s added on the right)</pre>
    <p>Result: <code><b>0b10110100</b></code></p>
    <div class="warn"><b>Bits that fall off the left are gone.</b> Because a stored value has a <b>fixed
    width</b> (here, 8 bits), any bits pushed past the leftmost position are permanently discarded — they do
    not wrap around. This is exactly why left-shifting does not always match "multiply by 2": the
    mathematical product may need more bits than the type has, and the width truncates the answer.</div>
  </div>

  <h3>Right shift (<code>&gt;&gt;</code>)</h3>
  <div class="card">
    <p>Shifts bits toward the less-significant (right) end. Bits that fall off the right are <b>discarded</b>
    — always lost, never wrapped around or saved. The open question is what fills in on the <b>left</b>, and
    the answer depends on <i>which kind</i> of right shift is used and whether the number is signed or
    unsigned.</p>
    <table class="cmp">
      <tr><th></th><th>Logical right shift</th><th>Arithmetic right shift</th></tr>
      <tr><td>Fills in on the left with</td><td><b>0</b>, always</td><td>a copy of the <b>original leftmost bit</b> (the sign bit), repeatedly</td></tr>
      <tr><td>Used for</td><td><b>unsigned</b> numbers</td><td><b>signed</b> (two's complement) numbers</td></tr>
      <tr><td>Preserves sign of a negative number?</td><td>n/a &mdash; unsigned has no sign bit</td><td><b>yes</b> &mdash; a negative value shifted right stays negative</td></tr>
    </table>
    <div class="concept">Whether zeros or the sign bit get copied in on a right shift is determined entirely
    by the number's <b>type</b> (signed vs. unsigned) and which of the two right-shift operations the
    hardware/language performs — not by the value being shifted.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>You right-shift a negative signed number and it stays negative. Which kind of shift happened?</div>
      <button class="opt" data-i="0">Left shift</button>
      <button class="opt" data-i="1">Logical right shift</button>
      <button class="opt" data-i="2">Arithmetic right shift</button>
      <button class="opt" data-i="3">Neither — this is impossible</button>
      <div class="fb"><b>Arithmetic right shift</b> copies the original sign bit into the vacated left
      positions, so a negative value's sign is preserved. A logical right shift would fill with 0s and the
      value would read as positive (and much larger in magnitude) instead.</div>
    </div>
  </div>
</section>

<!-- ============ RD07 ============ -->
<section class="topic" id="l7-rd07">
  <h2>RD07 &middot; Bitwise Operators — Self-Check</h2>
  <p class="muted">Covers <i>Dive into Systems</i> &sect;4.6 (Bitwise Operators) and &sect;4.6.5 (Bit Shifts).</p>

  <h3>Q1 &middot; Bitwise Operators (&sect;4.6)</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q1</span>What is the main difference between bitwise operators and logical operators?</div>
      <button class="opt" data-i="0">Bitwise operators are faster</button>
      <button class="opt" data-i="1">Logical operators work only on integers</button>
      <button class="opt" data-i="2">Bitwise operators operate on individual bits, logical operators operate on truth values</button>
      <button class="opt" data-i="3">Logical operators can only be used in conditionals</button>
      <div class="fb">Bitwise: one bit position at a time, same-width result. Logical: whole operand collapses
      to nonzero=true / zero=false, and the result is a single true/false.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q2</span>When does a bitwise AND operation produce a 1 in a given bit position?</div>
      <button class="opt" data-i="0">When at least one input bit is 1</button>
      <button class="opt" data-i="1">When both input bits are 1</button>
      <button class="opt" data-i="2">When the input bits differ</button>
      <button class="opt" data-i="3">When both input bits are 0</button>
      <div class="fb">AND is the strictest of the three: <b>both</b> bits must be 1.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q3</span>What is the result of <code>0b011010 &amp; 0b110110</code>?</div>
      <button class="opt" data-i="0"><code>0b111110</code></button>
      <button class="opt" data-i="1"><code>0b010010</code></button>
      <button class="opt" data-i="2"><code>0b101100</code></button>
      <button class="opt" data-i="3"><code>0b000000</code></button>
      <div class="fb">Column by column: only positions where both operands have a 1 survive &rarr;
      <code>0b010010</code>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>Which C operator performs a bitwise AND?</div>
      <button class="opt" data-i="0"><code>&amp;&amp;</code></button>
      <button class="opt" data-i="1"><code>|</code></button>
      <button class="opt" data-i="2"><code>&amp;</code></button>
      <button class="opt" data-i="3"><code>^</code></button>
      <div class="fb">Single <code>&amp;</code>. <code>&amp;&amp;</code> is the <i>logical</i> AND.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>When does a bitwise OR operation produce a 1 in a given bit position?</div>
      <button class="opt" data-i="0">Only when both input bits are 1</button>
      <button class="opt" data-i="1">When at least one input bit is 1</button>
      <button class="opt" data-i="2">Only when exactly one input bit is 1</button>
      <button class="opt" data-i="3">Only when both input bits are 0</button>
      <div class="fb">OR is the most permissive: <b>at least one</b> 1 is enough.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>What is the result of <code>0b011010 | 0b110110</code>?</div>
      <button class="opt" data-i="0"><code>0b010010</code></button>
      <button class="opt" data-i="1"><code>0b101100</code></button>
      <button class="opt" data-i="2"><code>0b111110</code></button>
      <button class="opt" data-i="3"><code>0b000000</code></button>
      <div class="fb">Every column with at least one 1 becomes 1 &rarr; <code>0b111110</code>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q7</span>When does a bitwise XOR operation produce a 1 in a given bit position?</div>
      <button class="opt" data-i="0">When both input bits are 1</button>
      <button class="opt" data-i="1">When neither input bit is 1</button>
      <button class="opt" data-i="2">When exactly one input bit is 1</button>
      <button class="opt" data-i="3">When at least one input bit is 1</button>
      <div class="fb">XOR fires only when the bits <b>differ</b> — exactly one is 1.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q8</span>What is the result of <code>0b011010 ^ 0b110110</code>?</div>
      <button class="opt" data-i="0"><code>0b010010</code></button>
      <button class="opt" data-i="1"><code>0b111110</code></button>
      <button class="opt" data-i="2"><code>0b101100</code></button>
      <button class="opt" data-i="3"><code>0b000000</code></button>
      <div class="fb">Columns where the two bits differ become 1 &rarr; <code>0b101100</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q9</span>What does the bitwise NOT operator do?</div>
      <button class="opt" data-i="0">Negates a number mathematically</button>
      <button class="opt" data-i="1">Flips every bit in the operand</button>
      <button class="opt" data-i="2">Converts a number to binary</button>
      <button class="opt" data-i="3">Clears all bits</button>
      <div class="fb"><code>~</code> is unary and flips <b>every</b> bit: 1&rarr;0, 0&rarr;1. It is not the
      same as arithmetic negation.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q10</span>What is the result of <code>~0b011010</code>?</div>
      <button class="opt" data-i="0"><code>0b011010</code></button>
      <button class="opt" data-i="1"><code>0b100101</code></button>
      <button class="opt" data-i="2"><code>0b111111</code></button>
      <button class="opt" data-i="3"><code>0b000000</code></button>
      <div class="fb">Flip each of the six bits: <code>011010</code> &rarr; <code>100101</code>.</div>
    </div>
  </div>

  <h3>Q2 &middot; Bit Shifts (&sect;4.6.5)</h3>
  <div class="card">
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q1</span>What does a bit shift do to a number?</div>
      <button class="opt" data-i="0">Converts it from binary to decimal</button>
      <button class="opt" data-i="1">Flips all its bits</button>
      <button class="opt" data-i="2">Reverses the bits</button>
      <button class="opt" data-i="3">Moves its bits left or right by a certain number of places</button>
      <div class="fb">A shift slides every bit the same number of positions in one direction.</div>
    </div>
    <div class="q" data-mc="3">
      <div class="prompt"><span class="tag">Q2</span>What happens when you shift a binary number to the left?</div>
      <button class="opt" data-i="0">Ones are added to the left</button>
      <button class="opt" data-i="1">Ones are added to the right</button>
      <button class="opt" data-i="2">Zeros are added to the left</button>
      <button class="opt" data-i="3">Zeros are added to the right</button>
      <div class="fb">Left shift always fills the vacated <b>low</b> (right) bits with <b>0</b>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q3</span>If no bits are lost, what usually happens to the value when you shift left?</div>
      <button class="opt" data-i="0">It gets smaller</button>
      <button class="opt" data-i="1">It stays the same</button>
      <button class="opt" data-i="2">It gets larger</button>
      <button class="opt" data-i="3">It becomes negative</button>
      <div class="fb">Each left shift is equivalent to <b>&times;2</b>, provided nothing significant falls off
      the left end.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q4</span>Why might shifting left make a number smaller instead of larger?</div>
      <button class="opt" data-i="0">Because the bits flip</button>
      <button class="opt" data-i="1">Because the left shift divides the number</button>
      <button class="opt" data-i="2">Because some bits are thrown away</button>
      <button class="opt" data-i="3">Because zeros are added</button>
      <div class="fb">With a fixed width, high-order bits pushed past the left edge are permanently
      discarded — the "&times;2" rule breaks once that happens.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>What is <code>0b00101101 &lt;&lt; 2</code> (assume 8-bit numbers)?</div>
      <button class="opt" data-i="0"><code>0b00001011</code></button>
      <button class="opt" data-i="1"><code>0b10110100</code></button>
      <button class="opt" data-i="2"><code>0b11010000</code></button>
      <button class="opt" data-i="3"><code>0b00101100</code></button>
      <div class="fb">Shift left twice, dropping the leading "00" and adding two trailing 0s:
      <code>00101101</code> &rarr; <code>10110100</code>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q6</span>What happens to bits that move past the right end of the number?</div>
      <button class="opt" data-i="0">They wrap around to the left</button>
      <button class="opt" data-i="1">They are saved for later</button>
      <button class="opt" data-i="2">They are lost (discarded)</button>
      <button class="opt" data-i="3">They flip to 1</button>
      <div class="fb">Bits shifted off <b>either</b> end are gone for good — no wraparound in C.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q7</span>When shifting right, what decides whether zeros or ones are added on the left?</div>
      <button class="opt" data-i="0">The size of the number</button>
      <button class="opt" data-i="1">Whether the number is signed or unsigned</button>
      <button class="opt" data-i="2">The current value of the number</button>
      <button class="opt" data-i="3">The operating system</button>
      <div class="fb">Signed types use arithmetic right shift (copies the sign bit); unsigned types use
      logical right shift (fills with 0).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q8</span>What kind of right shift adds zeros to the left?</div>
      <button class="opt" data-i="0">Arithmetic right shift</button>
      <button class="opt" data-i="1">Logical right shift</button>
      <button class="opt" data-i="2">Left shift</button>
      <button class="opt" data-i="3">Circular shift</button>
      <div class="fb"><b>Logical</b> right shift — used for unsigned numbers, always fills with 0.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q9</span>What kind of right shift copies the leftmost bit when shifting?</div>
      <button class="opt" data-i="0">Arithmetic right shift</button>
      <button class="opt" data-i="1">Logical right shift</button>
      <button class="opt" data-i="2">Circular shift</button>
      <button class="opt" data-i="3">Left shift</button>
      <div class="fb"><b>Arithmetic</b> right shift copies the original sign bit into the vacated left
      positions, preserving the sign of a signed number.</div>
    </div>
  </div>

  <h3>Mixed practice</h3>
  <div class="card">
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>Bitwise AND with 0 always clears a bit to 0.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>True.</b> 0&amp;0=0 and 1&amp;0=0 — ANDing any bit with 0 forces that position to 0,
      regardless of the other operand's value. This is the basis of a "clear mask."</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>An arithmetic right shift always fills with zeros.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> That describes a <b>logical</b> right shift. Arithmetic right shift
      copies the original leftmost (sign) bit — which is 1s, not 0s, for a negative number.</div>
    </div>
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Left-shifting a fixed-width number is always exactly equivalent to multiplying it by 2, with no exceptions.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> That equivalence only holds when no significant bits fall off the left
      end. Once the width is exceeded, the high bits are truncated and the result no longer matches the true
      product.</div>
    </div>
    <div class="q">
      <p>What is <code>0b1010 &amp; 0b0110</code>? (write as <code>0bXXXX</code>)</p>
      <input class="fillblank" data-answer="0b0010~~~0b010~~~0b10">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"></div>
    </div>

    <div class="q">
      <p style="margin-top:16px">And <code>0b1100 | 0b0011</code>? (write as <code>0bXXXX</code>)</p>
      <input class="fillblank" data-answer="0b1111">
      <button class="btn small" style="margin-top:8px" onclick="checkFill(this)">Check</button>
      <div class="fb"></div>
    </div>

    <h3 style="margin-top:22px">Select all that apply</h3>
    <p>Which of these statements about bitwise operators are <b>true</b>?</p>
    <div class="q" data-multi="0,2,4">
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> Bitwise operators produce a result with the same width as their operands.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>&amp;&amp;</code> and <code>&amp;</code> always produce the same result.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> XOR produces a 1 exactly when its two input bits differ.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> Bits shifted off the end of a number wrap around to the other end.</span></label>
      <label class="ma-item"><input type="checkbox" data-i="4"><span><b>E.</b> Whether a right shift fills with 0s or the sign bit depends on signed vs. unsigned.</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><b>A, C, and E.</b>
      <br>&nbsp;&nbsp;<b>B</b> is false — <code>&amp;&amp;</code> is logical (collapses to one truth value)
      while <code>&amp;</code> is bitwise; e.g. <code>5 &amp;&amp; 2</code> is <code>1</code> but
      <code>5 &amp; 2</code> is <code>0</code>.
      <br>&nbsp;&nbsp;<b>D</b> is false — shifted-off bits are <b>discarded</b>, never wrapped around, in C's
      <code>&lt;&lt;</code>/<code>&gt;&gt;</code>.</div>
    </div>
  </div>
</section>

</main>
`;
