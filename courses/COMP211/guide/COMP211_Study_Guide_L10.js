/* ============================================================
   LESSON 6 — CL06 Number Representation (+ RD05, DiS 4.1 & 4.3).
   Injects into #l10. Loaded BEFORE the shared engine.
   Plain content lesson — no interactive widget, no initL10().
   ============================================================ */
document.getElementById('l10').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l10-notation')">1 &middot; Decimal &amp; Binary Notation</button>
  <button onclick="showTopic(this,'l10-conv')">2 &middot; Binary &lt;-&gt; Decimal Conversion</button>
  <button onclick="showTopic(this,'l10-hex')">3 &middot; Hexadecimal</button>
  <button onclick="showTopic(this,'l10-unsigned')">4 &middot; Unsigned &amp; the Problem of Negatives</button>
  <button onclick="showTopic(this,'l10-ones')">5 &middot; One's Complement</button>
  <button onclick="showTopic(this,'l10-twos')">6 &middot; Two's Complement</button>
  <button onclick="showTopic(this,'l10-rd05')">7 &middot; Practice &amp; RD05 Self-Check</button>
</nav>
<main>

<!-- ============ DECIMAL & BINARY NOTATION ============ -->
<section class="topic active" id="l10-notation">
  <h2>Lesson 6 &middot; Decimal &amp; Binary Notation</h2>

  <div class="concept">Both decimal and binary are <b>positional</b> number systems: the value of a digit
  depends on <i>where</i> it sits, not just what symbol it is. In decimal, each position is a power of
  <b>10</b>; in binary, each position is a power of <b>2</b>.</div>

  <h3>Decimal, recapped</h3>
  <div class="card">
    <p>Take 5072. Each digit is multiplied by the power of 10 for its position, and the results are summed:</p>
<pre>5072 = (5 &times; 10<sup>3</sup>) + (0 &times; 10<sup>2</sup>) + (7 &times; 10<sup>1</sup>) + (2 &times; 10<sup>0</sup>)
     = 5000 + 0 + 70 + 2</pre>
    <p class="muted">If you don't see a prefix on a number at all, the default interpretation is
    <b>decimal</b> &mdash; that's the "unmarked" base.</p>
  </div>

  <h3>Binary: the same idea, base 2</h3>
  <div class="card">
    <p>Binary digits are called <b>bits</b>, and each position is a power of <b>2</b> instead of 10. Bits are
    numbered starting from the <b>rightmost</b> bit, which is <b>bit 0</b> (written d<sub>0</sub>) &mdash; also
    called the <b>least significant bit (LSB)</b>. For an <i>n</i>-bit number, the leftmost bit is
    <b>bit n&minus;1</b>, the <b>most significant bit (MSB)</b>.</p>
<pre>1011<sub>2</sub> = (1 &times; 2<sup>3</sup>) + (0 &times; 2<sup>2</sup>) + (1 &times; 2<sup>1</sup>) + (1 &times; 2<sup>0</sup>)
      =    8    +    0    +    2    +    1   =  11 (decimal)</pre>
    <p class="muted">Binary is written two ways: prefixed with <code>0b</code> (e.g. <code>0b1001</code>) or
    subscripted with a 2 (e.g. <code>1001<sub>2</sub></code>). Both mean exactly the same thing.</p>
  </div>

  <h3>Grouping bits for readability</h3>
  <div class="card">
    <p>Long strings of bits are hard to read, so binary is conventionally grouped in <b>4s</b>:</p>
    <table class="cmp">
      <tr><th>Context</th><th>Separator</th><th>Example</th></tr>
      <tr><td>Handwritten</td><td>space</td><td><code>0b1010 1111 0101</code></td></tr>
      <tr><td>Typed / in code</td><td>underscore</td><td><code>0b1010_1111_0101</code></td></tr>
    </table>
    <p class="muted">If the total number of bits doesn't divide evenly into groups of 4, build the groups from
    the <b>right</b>, letting the leftmost group be short: <code>0b10_1010_0011</code> (a leading group of just
    2 bits, then two full groups of 4).</p>
  </div>

  <h3>The 0&ndash;15 binary reference table</h3>
  <div class="card">
    <div class="warn">You are expected to know this table <b>by heart</b> &mdash; it's the foundation for every
    conversion and every hex digit that follows.</div>
    <table class="cmp">
      <tr><th>Decimal</th><th>Binary</th><th>Decimal</th><th>Binary</th></tr>
      <tr><td>0</td><td><code>0000</code></td><td>8</td><td><code>1000</code></td></tr>
      <tr><td>1</td><td><code>0001</code></td><td>9</td><td><code>1001</code></td></tr>
      <tr><td>2</td><td><code>0010</code></td><td>10</td><td><code>1010</code></td></tr>
      <tr><td>3</td><td><code>0011</code></td><td>11</td><td><code>1011</code></td></tr>
      <tr><td>4</td><td><code>0100</code></td><td>12</td><td><code>1100</code></td></tr>
      <tr><td>5</td><td><code>0101</code></td><td>13</td><td><code>1101</code></td></tr>
      <tr><td>6</td><td><code>0110</code></td><td>14</td><td><code>1110</code></td></tr>
      <tr><td>7</td><td><code>0111</code></td><td>15</td><td><code>1111</code></td></tr>
    </table>
  </div>

  <h3>What "unsigned" means, and why 9+1 needs a new digit</h3>
  <div class="card">
    <div class="concept">A number is <b>unsigned</b> when it can only represent <b>zero or positive
    values</b> &mdash; never negative. Plain binary, as introduced so far, is unsigned.</div>
    <p>In decimal, a single digit can only store the values 0&ndash;9. Add 1 to 9 and there is no single digit
    left to represent "10" &mdash; you must <b>carry</b> into a new, more-significant digit. Binary works
    identically: a single bit can only store 0 or 1. Add 1 to a bit that is already 1, and it <b>overflows</b>
    into the next bit position, exactly the way decimal digits overflow into the next column.</p>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>In the binary number <code>10110</code>, which bit is bit 0?</div>
      <button class="opt" data-i="0">The leftmost bit</button>
      <button class="opt" data-i="1">The middle bit</button>
      <button class="opt" data-i="2">The rightmost bit</button>
      <button class="opt" data-i="3">Whichever bit is a 1</button>
      <div class="fb">Bits are numbered starting from the <b>rightmost</b> bit as bit 0 (the least significant
      bit). The leftmost bit of an <i>n</i>-bit number is bit n&minus;1, the most significant bit.</div>
    </div>
    <div class="q" data-tf="T">
      <div class="prompt"><span class="tag">True / False</span>An unsigned number can represent zero, but never a negative value.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">True &mdash; "unsigned" means the encoding is restricted to zero and positive values.</div>
    </div>
  </div>
</section>

<!-- ============ BINARY <-> DECIMAL CONVERSION ============ -->
<section class="topic" id="l10-conv">
  <h2>Lesson 6 &middot; Binary &lt;-&gt; Decimal Conversion</h2>

  <h3>Binary &rarr; decimal</h3>
  <div class="card">
    <p>Multiply each bit by its power of 2, and sum the results:</p>
<pre>1011<sub>2</sub> = (1&times;2<sup>3</sup>) + (0&times;2<sup>2</sup>) + (1&times;2<sup>1</sup>) + (1&times;2<sup>0</sup>) = 8+0+2+1 = 11</pre>
  </div>

  <h3>Decimal &rarr; binary: the subtraction algorithm</h3>
  <div class="card">
    <p>The textbook's algorithm, repeated until the remainder hits 0:</p>
    <ol class="muted" style="line-height:2">
      <li>Find the <b>largest power of 2</b> that is &le; the current number.</li>
      <li>Place a <b>1</b> in that bit position of the answer.</li>
      <li><b>Subtract</b> that power of 2 from the current number.</li>
      <li><b>Repeat</b> with the remainder, until it reaches 0.</li>
    </ol>
    <h4>Worked example: 114 &rarr; binary</h4>
<pre>114 - 64 = 50    bit set: 64  (2<sup>6</sup>)
 50 - 32 = 18    bit set: 32  (2<sup>5</sup>)
 18 - 16 =  2    bit set: 16  (2<sup>4</sup>)
  2 -  2 =  0    bit set:  2  (2<sup>1</sup>)

     2<sup>6</sup> 2<sup>5</sup> 2<sup>4</sup> 2<sup>3</sup> 2<sup>2</sup> 2<sup>1</sup> 2<sup>0</sup>
      1  1  1  0  0  1  0   =  0b1110010</pre>
    <p class="muted">Every power of 2 not used along the way gets a 0 in the answer &mdash; that's why bit
    positions 2<sup>3</sup>, 2<sup>2</sup>, and 2<sup>0</sup> are 0 above.</p>
  </div>

  <h3>Alternate mental-math approach: powers of 2 that add up</h3>
  <div class="card">
    <p>Lecture also shows a quicker, informal shortcut for small numbers: think of the value as a sum of
    distinct powers of 2 you already recognize, then flip on those bits directly. This is <b>not</b> the
    primary algorithm above &mdash; it's a mental-math shortcut once you're comfortable with the powers of 2.</p>
<pre>7  = 4 + 2 + 1        &rarr;  0b0111
13 = 8 + 4 + 1        &rarr;  0b1101</pre>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Converting decimal 114 to binary, after subtracting 64 you're left with 50. What's the next step?</div>
      <button class="opt" data-i="0">Immediately write down the answer</button>
      <button class="opt" data-i="1">Find the largest power of 2 &le; 50, mark that bit, and subtract it</button>
      <button class="opt" data-i="2">Divide 50 by 2 and round</button>
      <button class="opt" data-i="3">Start over from 114</button>
      <div class="fb">The algorithm repeats step 1&ndash;3 on the <b>remainder</b> each time: largest power of 2
      &le; 50 is 32, so you set that bit and subtract, leaving 18.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert 1011<sub>2</sub> to decimal (unsigned).</div>
      <input type="text" class="fillblank" data-answer="11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">(1&times;8)+(0&times;4)+(1&times;2)+(1&times;1) = 8+0+2+1 = 11.</div>
    </div>
  </div>
</section>

<!-- ============ HEXADECIMAL ============ -->
<section class="topic" id="l10-hex">
  <h2>Lesson 6 &middot; Hexadecimal</h2>

  <div class="concept">Hexadecimal is base <b>16</b>: sixteen digits, <code>0&ndash;9</code> then
  <code>A&ndash;F</code> standing in for 10&ndash;15. It's written with a <code>0x</code> prefix
  (<code>0x3A</code>) or subscripted with 16 (<code>3A<sub>16</sub></code>).</div>

  <h3>Why bother, if we already have decimal and binary?</h3>
  <div class="card">
    <p><b>Decimal</b> doesn't align cleanly with powers of two, which makes it a poor fit for reasoning about
    fixed-size binary data &mdash; a 16-bit address, for instance, doesn't break into tidy decimal chunks.
    <b>Hexadecimal</b> is convenient for exactly that job: each hex digit maps <i>cleanly</i> onto exactly
    <b>4 bits</b>, so a whole binary value collapses into a short, precise hex string. That's also why memory
    addresses are almost always displayed in hex &mdash; they're stored in binary, but hex is far more
    <b>compact and human-readable</b> than writing out the raw bits.</p>
  </div>

  <h3>Binary &rarr; hex</h3>
  <div class="card">
    <ol class="muted" style="line-height:2">
      <li>Group the binary digits into groups of <b>4</b>, working from <b>right to left</b>.</li>
      <li>If the leftmost group is short, <b>prepend leading zeros</b> to complete it.</li>
      <li>Convert each group of 4 bits into its single hex digit.</li>
    </ol>
    <h4>Worked example</h4>
<pre>0b111010  &rarr;  0b0011_1010   (leading zeros added to complete the left group)
            0011 = 3     1010 = A
          &rarr;  0x3A</pre>
  </div>

  <h3>Hex &rarr; binary</h3>
  <div class="card">
    <p>Convert each hex digit to its 4-bit binary equivalent; leading zeros can optionally be dropped
    afterward.</p>
<pre>0x3F54  &rarr;  0b0011_1111_0101_0100
          (or, dropping the leading zeros: 0b11_1111_0101_0100)</pre>
  </div>

  <h3>Full 0&ndash;15 reference table (decimal / binary / hex)</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Decimal</th><th>Binary</th><th>Hex</th><th>Decimal</th><th>Binary</th><th>Hex</th></tr>
      <tr><td>0</td><td><code>0000</code></td><td>0</td><td>8</td><td><code>1000</code></td><td>8</td></tr>
      <tr><td>1</td><td><code>0001</code></td><td>1</td><td>9</td><td><code>1001</code></td><td>9</td></tr>
      <tr><td>2</td><td><code>0010</code></td><td>2</td><td>10</td><td><code>1010</code></td><td>A</td></tr>
      <tr><td>3</td><td><code>0011</code></td><td>3</td><td>11</td><td><code>1011</code></td><td>B</td></tr>
      <tr><td>4</td><td><code>0100</code></td><td>4</td><td>12</td><td><code>1100</code></td><td>C</td></tr>
      <tr><td>5</td><td><code>0101</code></td><td>5</td><td>13</td><td><code>1101</code></td><td>D</td></tr>
      <tr><td>6</td><td><code>0110</code></td><td>6</td><td>14</td><td><code>1110</code></td><td>E</td></tr>
      <tr><td>7</td><td><code>0111</code></td><td>7</td><td>15</td><td><code>1111</code></td><td>F</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Why is hexadecimal especially convenient for humans working with binary data?</div>
      <button class="opt" data-i="0">Each hex digit maps cleanly onto exactly 4 bits</button>
      <button class="opt" data-i="1">Hex numbers are always shorter than decimal numbers</button>
      <button class="opt" data-i="2">Computers only understand hex internally</button>
      <button class="opt" data-i="3">Hex avoids the need for negative numbers</button>
      <div class="fb">The 4-bit-per-digit mapping is exact and lossless, which is what makes hex a compact,
      readable stand-in for raw binary &mdash; especially for things like memory addresses.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert 0b111010 to hexadecimal.</div>
      <input type="text" class="fillblank" data-answer="0x3A~~~0x3a~~~3A~~~3a">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Pad to 0b0011_1010 &rarr; 0011=3, 1010=A &rarr; <b>0x3A</b>.</div>
    </div>
  </div>
</section>

<!-- ============ UNSIGNED & THE PROBLEM OF NEGATIVES ============ -->
<section class="topic" id="l10-unsigned">
  <h2>Lesson 6 &middot; Unsigned &amp; the Problem of Negatives</h2>

  <div class="concept">Plain binary as covered so far is <b>unsigned</b>: every bit pattern maps to zero or a
  positive value, and there is no way to write a negative number. That limitation is exactly what motivates
  <b>signed</b> encodings &mdash; schemes that carve out some bit patterns to represent negative values.</div>

  <div class="card">
    <p>A key framing detail for signed encodings: they typically split the available bit patterns roughly
    <b>evenly</b> &mdash; about <b>half</b> assigned to negative values, and about <b>half</b> to non-negative
    (zero and positive) values. It is <i>not</i> the case that vastly more patterns go to one side than the
    other.</p>
  </div>

  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">True / False</span>Signed binary encodings typically assign far more bit patterns to positive values than to negative ones.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb">False &mdash; the split is roughly <b>even</b>, about half negative and half
      non-negative.</div>
    </div>
  </div>
</section>

<!-- ============ ONE'S COMPLEMENT ============ -->
<section class="topic" id="l10-ones">
  <h2>Lesson 6 &middot; One's Complement</h2>

  <div class="concept">One's complement is a way to represent negative numbers in binary. <b>Positive</b>
  values are written exactly like unsigned binary, <b>except</b> they must begin with a leading <b>0</b> bit
  &mdash; even if the plain unsigned form wouldn't otherwise need one. <b>Negative</b> values are formed by
  taking the positive counterpart and <b>flipping every bit</b> (0s become 1s, 1s become 0s).</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Value</th><th>Steps</th><th>Result</th></tr>
      <tr><td>+5</td><td>unsigned 101, add leading 0</td><td><code>0b0101</code></td></tr>
      <tr><td>&minus;5</td><td>flip every bit of <code>0b0101</code></td><td><code>0b1010</code></td></tr>
      <tr><td>&minus;10</td><td>flip every bit of <code>0b0_1010</code></td><td><code>0b1_0101</code></td></tr>
      <tr><td>&minus;15</td><td>flip every bit of <code>0b0_1111</code></td><td><code>0b1_0000</code></td></tr>
    </table>
    <div class="concept"><b>Rule:</b> in one's complement, every positive value has MSB <b>0</b>, and every
    negative value has MSB <b>1</b>. Check the leading bit and you know the sign immediately.</div>
  </div>

  <h3>Worked examples (slide style)</h3>
  <div class="card">
    <h4>Represent &minus;5 in 7-bit one's complement</h4>
    <p>Step 1: write +5 as unsigned in 7 bits &rarr; <code>0b0000101</code>. Step 2: flip every bit &rarr;
    <code>0b1111010</code>.</p>
    <h4>Represent +4 in 6-bit one's complement</h4>
    <p>It's positive, so <b>no bit flip</b> is needed &mdash; just write 4 in unsigned 6-bit form:
    <code>0b000100</code>.</p>
  </div>

  <h3>The shortcoming: two zeros</h3>
  <div class="card">
    <div class="warn">One's complement has <b>two</b> distinct representations of zero: all zeros
    (<code>000...0</code>) <b>and</b> all ones (<code>111...1</code>, which flips to "negative zero"). That
    wastes a bit pattern that could otherwise represent one additional, unique value.</div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>To write +4 in 6-bit one's complement, what do you do?</div>
      <button class="opt" data-i="0">Write 4 in unsigned 6-bit form, then flip every bit</button>
      <button class="opt" data-i="1">Just write 4 in unsigned 6-bit form &mdash; no flip, it's positive</button>
      <button class="opt" data-i="2">Flip only the MSB</button>
      <button class="opt" data-i="3">Add 1 to the unsigned form</button>
      <div class="fb">Positive values in one's complement are unsigned binary with a leading-0 sign bit
      guaranteed. The bit-flip step only applies when forming a <i>negative</i> value.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the key shortcoming of one's complement?</div>
      <button class="opt" data-i="0">It can't represent negative numbers</button>
      <button class="opt" data-i="1">It requires more bits than unsigned binary</button>
      <button class="opt" data-i="2">Zero has two distinct representations, wasting a bit pattern</button>
      <button class="opt" data-i="3">The MSB doesn't indicate sign</button>
      <div class="fb">All-zeros and all-ones both mean "zero," which is one wasted pattern that two's
      complement later reclaims.</div>
    </div>
  </div>
</section>

<!-- ============ TWO'S COMPLEMENT ============ -->
<section class="topic" id="l10-twos">
  <h2>Lesson 6 &middot; Two's Complement</h2>

  <div class="concept">Two's complement fixes one's complement's wasted double-zero: by reclaiming the extra
  all-ones pattern, an <i>n</i>-bit range gains exactly <b>one more representable negative value</b> at the low
  end. E.g. a range that maxed out at &minus;3 in one's complement can now reach &minus;4 in two's
  complement.</div>

  <h3>Decimal &rarr; two's complement</h3>
  <div class="card">
    <ol class="muted" style="line-height:2">
      <li>Find the <b>one's complement</b> representation.</li>
      <li>If the number is <b>negative</b>, add <b>1</b> to that one's complement result. (If positive, stop
      here &mdash; identical to one's complement, no further step.)</li>
    </ol>
    <h4>Worked example: express &minus;7 in 6-bit two's complement</h4>
<pre>one's complement of +7:        0b000111
one's complement of -7 (flip): 0b111000
add 1 (because negative):      0b111001</pre>
  </div>

  <h3>Two's complement binary &rarr; decimal</h3>
  <div class="card">
    <ol class="muted" style="line-height:2">
      <li>Check the <b>MSB</b>. If it's <b>0</b>, the number is positive &mdash; read it exactly like unsigned
      binary and stop.</li>
      <li>If the MSB is <b>1</b>, the number is negative. <b>Flip every bit.</b></li>
      <li><b>Add 1</b> to the flipped result.</li>
      <li>The original value is the <b>negative</b> of that final result.</li>
    </ol>
    <h4>Worked example: convert 0b1101 to decimal</h4>
<pre>MSB is 1  -&gt;  negative
flip bits:      0b0010
add 1:          0b0011  = 3
original value = -3</pre>
  </div>

  <div class="card">
    <div class="concept"><b>Key advantage:</b> two's complement has only <b>one</b> representation of zero
    (all zeros) &mdash; no wasted pattern. And in <b>both</b> one's and two's complement, the MSB alone tells
    you the sign: <b>0 = positive, 1 = negative.</b></div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is two's complement's key advantage over one's complement?</div>
      <button class="opt" data-i="0">It uses fewer bits</button>
      <button class="opt" data-i="1">It has only one representation of zero</button>
      <button class="opt" data-i="2">Negative numbers don't need a sign bit</button>
      <button class="opt" data-i="3">Addition and subtraction use different rules</button>
      <div class="fb">Reclaiming the redundant all-ones "zero" gives two's complement a single zero
      representation and one extra negative value at the low end of the range.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Express -7 in 6-bit two's complement.</div>
      <input type="text" class="fillblank" data-answer="0b111001~~~111001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">One's complement of +7 is 000111; flip to get one's complement of -7: 111000; add 1:
      <b>111001</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert two's-complement 0b1101 to decimal.</div>
      <input type="text" class="fillblank" data-answer="-3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">MSB=1 (negative). Flip &rarr; 0010, add 1 &rarr; 0011 = 3, so the value is <b>-3</b>.</div>
    </div>
  </div>
</section>

<!-- ============ PRACTICE & RD05 SELF-CHECK ============ -->
<section class="topic" id="l10-rd05">
  <h2>Lesson 6 &middot; Practice &amp; RD05 Self-Check</h2>
  <p class="muted">Worked practice from the CL06 slides, plus the RD05 reading-quiz questions
  (<i>Dive Into Systems</i> &sect;4.1 and &sect;4.3). Answer cold, then read the explanation.</p>

  <h3>Slide practice: binary/decimal conversions</h3>
  <div class="card">
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert 0b0010_0011 to decimal (unsigned).</div>
      <input type="text" class="fillblank" data-answer="35">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">32+2+1 = <b>35</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert 0b0101_0100 to decimal (unsigned).</div>
      <input type="text" class="fillblank" data-answer="84">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">64+16+4 = <b>84</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert decimal 98 to binary.</div>
      <input type="text" class="fillblank" data-answer="0b0110_0010~~~0b01100010~~~1100010~~~01100010">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">98-64=34 (64), 34-32=2 (32), 2-2=0 (2) &rarr; <b>0b0110_0010</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert decimal 132 to binary.</div>
      <input type="text" class="fillblank" data-answer="0b1000_0100~~~0b10000100~~~10000100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">132-128=4 (128), 4-4=0 (4) &rarr; <b>0b1000_0100</b>.</div>
    </div>
  </div>

  <h3>Slide practice: signed representations</h3>
  <div class="card">
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Represent -15 in 7-bit two's complement.</div>
      <input type="text" class="fillblank" data-answer="0b1110001~~~1110001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">+15 = 0b0001111. One's complement (flip) = 0b1110000. Add 1 (negative) &rarr;
      <b>0b1110001</b>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the minimum number of bits needed to represent decimal 20 in two's complement?</div>
      <button class="opt" data-i="0">5 bits</button>
      <button class="opt" data-i="1">6 bits</button>
      <button class="opt" data-i="2">7 bits</button>
      <button class="opt" data-i="3">4 bits</button>
      <div class="fb">20 = <code>10100</code> in raw unsigned binary, but its MSB is already 1 &mdash; read as
      two's complement that would misread as negative. You need a leading 0 sign bit, giving
      <code>0b010100</code>: <b>6 bits</b> total.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert two's-complement 0b11111110 to decimal.</div>
      <input type="text" class="fillblank" data-answer="-2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">MSB=1 (negative). Flip &rarr; 00000001, add 1 &rarr; 00000010 = 2, so the value is
      <b>-2</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Convert two's-complement 0b0011_1000 to decimal.</div>
      <input type="text" class="fillblank" data-answer="56">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">MSB=0 (positive) &rarr; read as unsigned: 32+16+8 = <b>56</b>.</div>
    </div>
  </div>

  <h3>Interpreting the same bits three ways</h3>
  <div class="card">
    <p class="muted">The same 4-bit pattern means something different depending on which encoding you assume.</p>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Interpret 1111<sub>2</sub> as <b>unsigned</b>.</div>
      <input type="text" class="fillblank" data-answer="15">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Unsigned: 8+4+2+1 = <b>15</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Interpret 1111<sub>2</sub> as <b>one's complement</b>.</div>
      <input type="text" class="fillblank" data-answer="-0~~~0~~~negative zero">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">All ones &mdash; MSB=1, negative. This is one's complement's second representation of
      zero: <b>-0</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Interpret 1111<sub>2</sub> as <b>two's complement</b>.</div>
      <input type="text" class="fillblank" data-answer="-1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">MSB=1 (negative). Flip &rarr; 0000, add 1 &rarr; 0001 = 1, so the value is <b>-1</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Interpret 0101<sub>2</sub> as unsigned, one's complement, and two's complement (all three give the same answer here &mdash; why?).</div>
      <input type="text" class="fillblank" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">MSB=0 in all three schemes, so it's read as a plain positive value in every case:
      4+1 = <b>5</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Interpret 1010<sub>2</sub> as <b>one's complement</b>.</div>
      <input type="text" class="fillblank" data-answer="-5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">MSB=1 (negative). Flip 1010 &rarr; 0101 = 5, so the value is <b>-5</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in the blank</span>Interpret 1010<sub>2</sub> as <b>two's complement</b>.</div>
      <input type="text" class="fillblank" data-answer="-6">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">MSB=1 (negative). Flip 1010 &rarr; 0101, add 1 &rarr; 0110 = 6, so the value is
      <b>-6</b>.</div>
    </div>
  </div>

  <h3>RD05 Q1 &middot; DiS &sect;4.1 &mdash; unsigned, decimal, binary, hex</h3>
  <div class="card">
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q1</span>What does it mean for a number to be unsigned?</div>
      <button class="opt" data-i="0">It can represent zero or positive values, but not negative values</button>
      <button class="opt" data-i="1">It can represent any negative value only</button>
      <button class="opt" data-i="2">It has no fixed number of bits</button>
      <button class="opt" data-i="3">It is stored as a hexadecimal string</button>
      <div class="fb">Unsigned &rarr; zero and positive only. No bit pattern is set aside for negatives.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Q2 &middot; Fill in the blank</span>What is the base of the decimal number system?</div>
      <input type="text" class="fillblank" data-answer="10~~~ten">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Base <b>10</b> &mdash; ten digits, 0 through 9.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q3</span>Why does adding 1 to the digit 9 require an additional digit?</div>
      <button class="opt" data-i="0">Because digits cannot store values larger than 9</button>
      <button class="opt" data-i="1">Because 9 is an odd number</button>
      <button class="opt" data-i="2">Because decimal doesn't support addition</button>
      <button class="opt" data-i="3">Because 9 is the base of the system</button>
      <div class="fb">A single decimal digit is capped at 9; going past it forces a carry into a new,
      more-significant digit.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q4</span>Which expression correctly represents the decimal value 8425?</div>
      <button class="opt" data-i="0">(8&times;10<sup>2</sup>) + (4&times;10<sup>3</sup>) + (2&times;10<sup>1</sup>) + (5&times;10<sup>0</sup>)</button>
      <button class="opt" data-i="1">(8&times;10<sup>3</sup>) + (4&times;10<sup>2</sup>) + (2&times;10<sup>1</sup>) + (5&times;10<sup>0</sup>)</button>
      <button class="opt" data-i="2">(8&times;10<sup>0</sup>) + (4&times;10<sup>1</sup>) + (2&times;10<sup>2</sup>) + (5&times;10<sup>3</sup>)</button>
      <button class="opt" data-i="3">(8&times;10<sup>4</sup>) + (4&times;10<sup>3</sup>) + (2&times;10<sup>2</sup>) + (5&times;10<sup>1</sup>)</button>
      <div class="fb">Positions go from the <b>left</b>: thousands (10<sup>3</sup>), hundreds (10<sup>2</sup>),
      tens (10<sup>1</sup>), ones (10<sup>0</sup>) &mdash; matching option 1.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q5</span>What does the prefix <code>0b</code> indicate?</div>
      <button class="opt" data-i="0">The number is written in base 2 (binary)</button>
      <button class="opt" data-i="1">The number is written in base 16 (hex)</button>
      <button class="opt" data-i="2">The number is negative</button>
      <button class="opt" data-i="3">The number is a byte count</button>
      <div class="fb"><code>0b</code> marks binary, just as <code>0x</code> marks hexadecimal.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q6</span>How should the number 1000 be interpreted if no prefix is given?</div>
      <button class="opt" data-i="0">Decimal one thousand</button>
      <button class="opt" data-i="1">Binary eight</button>
      <button class="opt" data-i="2">Hexadecimal 4096</button>
      <button class="opt" data-i="3">It's ambiguous and unusable</button>
      <div class="fb">With no prefix and no subscript, the default base is <b>decimal</b>.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Q7 &middot; Fill in the blank</span>What is the base of the binary number system?</div>
      <input type="text" class="fillblank" data-answer="2~~~two">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Base <b>2</b> &mdash; just the digits 0 and 1.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Q8 &middot; Fill in the blank</span>How many unique values can a single binary digit (bit) represent?</div>
      <input type="text" class="fillblank" data-answer="2~~~two">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><b>Two</b> &mdash; 0 or 1.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q9</span>What happens when you add 1 to a binary bit that is already at its maximum value?</div>
      <button class="opt" data-i="0">The bit resets to 0 and carries to the next bit</button>
      <button class="opt" data-i="1">The bit stays the same</button>
      <button class="opt" data-i="2">An error is thrown</button>
      <button class="opt" data-i="3">The bit becomes 2</button>
      <div class="fb">Same overflow behavior as decimal digit 9 &rarr; 10: the bit resets and the carry moves
      left one position.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q10</span>When labeling bits as d<sub>0</sub>, d<sub>1</sub>, d<sub>2</sub>, &hellip;, which bit is d<sub>0</sub>?</div>
      <button class="opt" data-i="0">The rightmost bit</button>
      <button class="opt" data-i="1">The leftmost bit</button>
      <button class="opt" data-i="2">Whichever bit is 1</button>
      <button class="opt" data-i="3">The middle bit</button>
      <div class="fb">Numbering always starts from the <b>rightmost</b> bit as d<sub>0</sub>, the LSB.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q11</span>Why is binary well-suited for computer hardware?</div>
      <button class="opt" data-i="0">It aligns with how data is stored electronically</button>
      <button class="opt" data-i="1">It's easier for humans to read than decimal</button>
      <button class="opt" data-i="2">It uses fewer digits per number than decimal</button>
      <button class="opt" data-i="3">It was invented specifically for computers</button>
      <div class="fb">Two-state circuits (on/off, high/low voltage) map directly onto binary's two digits.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q12</span>Why introduce hexadecimal if decimal and binary are already sufficient?</div>
      <button class="opt" data-i="0">Hexadecimal replaces binary in hardware</button>
      <button class="opt" data-i="1">Hexadecimal is more convenient for humans working with binary data</button>
      <button class="opt" data-i="2">Hexadecimal uses fewer symbols than binary</button>
      <button class="opt" data-i="3">Hexadecimal is required for negative numbers</button>
      <div class="fb">Hex is a human convenience layer: it condenses binary while staying an exact, clean
      mapping (4 bits per digit).</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q13</span>Why is decimal a poor match for reasoning about fixed-size binary data (e.g., 16-bit addresses)?</div>
      <button class="opt" data-i="0">Decimal does not align cleanly with powers of two</button>
      <button class="opt" data-i="1">Decimal cannot represent large numbers</button>
      <button class="opt" data-i="2">Decimal has too few digits</button>
      <button class="opt" data-i="3">Decimal is only used for money</button>
      <div class="fb">Decimal's powers of 10 don't line up with binary's powers of 2, so decimal chunks don't
      correspond neatly to fixed bit-widths.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q14</span>Why is hexadecimal especially useful for representing memory addresses?</div>
      <button class="opt" data-i="0">Each digit maps cleanly to a fixed number of bits</button>
      <button class="opt" data-i="1">Memory addresses are always negative</button>
      <button class="opt" data-i="2">Hex numbers take fewer bits to store than binary</button>
      <button class="opt" data-i="3">Addresses can only be expressed in hex</button>
      <div class="fb">One hex digit = exactly 4 bits, so a hex string is a compact, exact stand-in for a longer
      binary address.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Q15 &middot; Fill in the blank</span>What is the base of the hexadecimal number system?</div>
      <input type="text" class="fillblank" data-answer="16~~~sixteen">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Base <b>16</b>.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q16</span>How does hexadecimal represent values greater than 9?</div>
      <button class="opt" data-i="0">By using letters A&ndash;F</button>
      <button class="opt" data-i="1">By using two-digit decimal numbers</button>
      <button class="opt" data-i="2">By using negative signs</button>
      <button class="opt" data-i="3">It cannot represent values greater than 9</button>
      <div class="fb">A=10 through F=15, giving hex its full 16 single-character digits.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q17</span>What happens when you add 1 to the hexadecimal digit F?</div>
      <button class="opt" data-i="0">The digit resets to 0 and carries to the next position</button>
      <button class="opt" data-i="1">The digit becomes G</button>
      <button class="opt" data-i="2">The digit stays F</button>
      <button class="opt" data-i="3">An error occurs</button>
      <div class="fb">Same overflow pattern as decimal's 9&rarr;10 and binary's 1&rarr;10: F resets to 0 and
      carries left.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q18</span>Why are memory addresses often displayed in hexadecimal even though they are stored in binary?</div>
      <button class="opt" data-i="0">Hexadecimal is more compact and human-readable</button>
      <button class="opt" data-i="1">Hardware only understands hex</button>
      <button class="opt" data-i="2">Binary cannot represent addresses</button>
      <button class="opt" data-i="3">Hex addresses use less memory</button>
      <div class="fb">The underlying storage is always binary; hex is purely a <b>display</b> convenience for
      humans.</div>
    </div>
  </div>

  <h3>RD05 Q2 &middot; DiS &sect;4.3 &mdash; signed magnitude</h3>
  <div class="card">
    <p class="muted">This course doesn't otherwise teach "signed magnitude" by name &mdash; it's the historical
    predecessor to one's and two's complement covered in the DiS reading: the simplest possible signed scheme,
    where the MSB is purely a sign flag and the remaining bits store the number's magnitude directly. It's
    included here only because RD05 assumes you've read about it.</p>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q19</span>What limitation of unsigned binary numbers motivates the introduction of signed binary encodings?</div>
      <button class="opt" data-i="0">Unsigned numbers cannot represent negative values</button>
      <button class="opt" data-i="1">Unsigned numbers take up more memory</button>
      <button class="opt" data-i="2">Unsigned numbers can't represent zero</button>
      <button class="opt" data-i="3">Unsigned numbers are slower to compute</button>
      <div class="fb">Same motivation as earlier in this lesson: unsigned is zero-or-positive only, so a signed
      scheme is needed to express negatives at all.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q20</span>How are bit patterns typically divided between negative and non-negative values in signed encodings?</div>
      <button class="opt" data-i="0">Approximately half represent negative values and half represent non-negative values</button>
      <button class="opt" data-i="1">The vast majority represent positive values</button>
      <button class="opt" data-i="2">The vast majority represent negative values</button>
      <button class="opt" data-i="3">Only one pattern represents a negative value</button>
      <div class="fb">Roughly an even 50/50 split &mdash; consistent with what you saw earlier in this lesson.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q21</span>In signed magnitude representation, what is the role of the most significant bit (MSB)?</div>
      <button class="opt" data-i="0">It indicates the sign of the number only</button>
      <button class="opt" data-i="1">It stores half the magnitude</button>
      <button class="opt" data-i="2">It is always 0</button>
      <button class="opt" data-i="3">It has no defined role</button>
      <div class="fb">In signed magnitude, the MSB is a dedicated sign flag; the remaining bits store the
      magnitude directly, unmodified.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q22</span>What does a most significant bit of 0 indicate in signed magnitude?</div>
      <button class="opt" data-i="0">The number is non-negative</button>
      <button class="opt" data-i="1">The number is negative</button>
      <button class="opt" data-i="2">The number is invalid</button>
      <button class="opt" data-i="3">The number is odd</button>
      <div class="fb">MSB 0 &rarr; non-negative, just as in one's and two's complement.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q23</span>Which of the following best describes the status of signed magnitude in modern computing systems?</div>
      <button class="opt" data-i="0">It is no longer used for integers in modern systems</button>
      <button class="opt" data-i="1">It is the standard encoding used by all modern CPUs</button>
      <button class="opt" data-i="2">It replaced two's complement in the 2000s</button>
      <button class="opt" data-i="3">It is used only for floating-point numbers</button>
      <div class="fb">Signed magnitude has been superseded by two's complement for integer representation in
      essentially all modern systems.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q24</span>What is the first major drawback of signed magnitude representation?</div>
      <button class="opt" data-i="0">It has two representations for zero</button>
      <button class="opt" data-i="1">It cannot represent odd numbers</button>
      <button class="opt" data-i="2">It requires floating-point hardware</button>
      <button class="opt" data-i="3">It uses more bits than unsigned</button>
      <div class="fb">All-zero magnitude with either sign bit gives two encodings of zero &mdash; the same
      wasted-pattern problem one's complement has.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q25</span>What is the second major drawback of signed magnitude representation?</div>
      <button class="opt" data-i="0">It cannot represent large numbers</button>
      <button class="opt" data-i="1">It has discontinuity between negative values and zero</button>
      <button class="opt" data-i="2">It requires two's complement hardware</button>
      <button class="opt" data-i="3">It cannot be extended to more bits</button>
      <div class="fb">Because the sign bit is separate from the magnitude, values don't increase/decrease
      smoothly across zero the way two's complement values do &mdash; a genuine discontinuity.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q26</span>Why does signed magnitude complicate hardware design during arithmetic operations?</div>
      <button class="opt" data-i="0">It requires special handling for transitions between negative and non-negative values</button>
      <button class="opt" data-i="1">It requires a separate multiplication circuit</button>
      <button class="opt" data-i="2">It cannot be added using existing binary adders at all</button>
      <button class="opt" data-i="3">It requires floating-point rounding</button>
      <div class="fb">The sign/magnitude split and the zero/discontinuity issues mean ordinary binary addition
      circuits can't just be reused unmodified &mdash; extra logic is needed around the sign transitions.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q27</span>Why has signed magnitude largely disappeared from modern systems?</div>
      <button class="opt" data-i="0">Its drawbacks complicate arithmetic and hardware design</button>
      <button class="opt" data-i="1">It was never actually implemented in any hardware</button>
      <button class="opt" data-i="2">It uses too much memory compared to floating point</button>
      <button class="opt" data-i="3">It was replaced by decimal encoding</button>
      <div class="fb">The double-zero and discontinuity problems make signed magnitude arithmetic harder to
      build correct, efficient hardware for &mdash; which is precisely what two's complement fixes.</div>
    </div>
  </div>
</section>

</main>`;
