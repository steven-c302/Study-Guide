/* ============================================================
   LESSON — HW03: Number Representation, Binary Arithmetic, and
   Bitwise Operators. Built from the HW03 assignment (Gradescope-
   style autograded homework): conversions, unsigned/1's-comp/2's-
   comp interpretation, sign- & zero-extension, unsigned & 2's
   complement addition/subtraction with overflow, bitwise ops,
   shifts, and bitmasks.
   Injects into #l13. Loaded BEFORE the shared engine.
   No interactive widget — defines no initL13().
   ============================================================ */
document.getElementById('l13').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l13-conv')">1 &middot; Conversions &amp; Bit Basics</button>
  <button onclick="showTopic(this,'l13-twos')">2 &middot; 2's Complement &amp; Interpretations</button>
  <button onclick="showTopic(this,'l13-ext')">3 &middot; Sign- &amp; Zero-Extension</button>
  <button onclick="showTopic(this,'l13-add')">4 &middot; Addition &amp; Overflow</button>
  <button onclick="showTopic(this,'l13-sub')">5 &middot; 2's Complement Subtraction</button>
  <button onclick="showTopic(this,'l13-bit')">6 &middot; Bitwise Ops, Shifts &amp; Masks</button>
</nav>
<main>

<!-- ============ CONVERSIONS & BIT BASICS ============ -->
<section class="topic active" id="l13-conv">
  <h2>HW03 &middot; Q1&ndash;Q2: Conversions &amp; Bit Basics</h2>
  <p class="muted">Six conversions between unsigned binary, decimal, and hex, plus the vocabulary
  (hexit, byte, word, bit numbering) that every later question in this HW leans on.</p>

  <h3>Q1.1 &middot; Unsigned binary &rarr; decimal</h3>
  <div class="card">
    <p class="muted">Read the bits right-to-left as powers of two and add up the ones that are set.</p>
    <table class="cmp">
      <tr><th>Binary</th><th>Work</th><th>Decimal</th></tr>
      <tr><td><code>0b101</code></td><td>4+0+1</td><td><b>5</b></td></tr>
      <tr><td><code>0b10010</code></td><td>16+0+0+2+0</td><td><b>18</b></td></tr>
      <tr><td><code>0b1010101</code></td><td>64+0+16+0+4+0+1</td><td><b>85</b></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>Convert <code>0b101</code>, <code>0b10010</code>, and <code>0b1010101</code> to decimal (comma-separated).</div>
      <input class="fillblank" data-answer="5, 18, 85~~~5,18,85">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">5, 18, 85.</div>
    </div>
  </div>

  <h3>Q1.2 &middot; Decimal &rarr; unsigned binary (fewest bits)</h3>
  <div class="card">
    <p class="muted">Use the largest power of two that fits, subtract, repeat &mdash; then group from the
    <b>right</b> into nibbles and underscore between them (the example given: 25 = <code>0b1_1001</code>).</p>
    <table class="cmp">
      <tr><th>Decimal</th><th>Work</th><th>Binary (fewest bits)</th></tr>
      <tr><td>42</td><td>32+8+2</td><td><code>0b10_1010</code></td></tr>
      <tr><td>89</td><td>64+16+8+1</td><td><code>0b101_1001</code></td></tr>
    </table>
    <div class="warn">"Fewest bits possible" just means <b>no leading zero nibble</b> &mdash; 42 needs 6 bits
    (<code>10_1010</code>), not padded out to 8.</div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>42 in unsigned binary (fewest bits, underscored, <code>0b</code>-prefixed):</div>
      <input class="fillblank" data-answer="0b10_1010~~~0b101010">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b10_1010 &mdash; 32+8+2 = 42.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>89 in unsigned binary (fewest bits, underscored, <code>0b</code>-prefixed):</div>
      <input class="fillblank" data-answer="0b101_1001~~~0b1011001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b101_1001 &mdash; 64+16+8+1 = 89.</div>
    </div>
  </div>

  <h3>Q1.3 &middot; Hex &rarr; decimal</h3>
  <div class="card">
    <p class="muted">Each hex digit is worth 16&times; the one to its right.</p>
    <table class="cmp">
      <tr><th>Hex</th><th>Work</th><th>Decimal</th></tr>
      <tr><td><code>0x2A</code></td><td>2&times;16 + 10</td><td><b>42</b></td></tr>
      <tr><td><code>0x7C</code></td><td>7&times;16 + 12</td><td><b>124</b></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0x2A</code> and <code>0x7C</code> in decimal (comma-separated):</div>
      <input class="fillblank" data-answer="42, 124~~~42,124">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">42, 124.</div>
    </div>
  </div>

  <h3>Q1.4 &middot; Decimal &rarr; hex (fewest bits)</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Decimal</th><th>Hex</th></tr>
      <tr><td>64</td><td><code>0x40</code></td></tr>
      <tr><td>127</td><td><code>0x7F</code></td></tr>
      <tr><td>255</td><td><code>0xFF</code></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>64, 127, and 255 in hex (comma-separated, <code>0x</code>-prefixed):</div>
      <input class="fillblank" data-answer="0x40, 0x7f, 0xff~~~0x40,0x7f,0xff">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0x40, 0x7F, 0xFF.</div>
    </div>
  </div>

  <h3>Q1.5 &middot; Binary &rarr; hex</h3>
  <div class="card">
    <p class="muted">Split into nibbles (groups of 4, from the right) and convert each nibble independently
    &mdash; this only works cleanly because 16 = 2<sup>4</sup>.</p>
    <table class="cmp">
      <tr><th>Binary</th><th>Nibbles</th><th>Hex</th></tr>
      <tr><td><code>0b1101_0101</code></td><td>1101 &middot; 0101</td><td><code>0xD5</code></td></tr>
      <tr><td><code>0b1_0111_1000</code></td><td>0001 &middot; 0111 &middot; 1000</td><td><code>0x178</code></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0b1101_0101</code> and <code>0b1_0111_1000</code> in hex (comma-separated):</div>
      <input class="fillblank" data-answer="0xd5, 0x178~~~0xd5,0x178">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0xD5, 0x178.</div>
    </div>
  </div>

  <h3>Q1.6 &middot; Hex &rarr; binary</h3>
  <div class="card">
    <p class="muted">Each hex digit expands to exactly 4 bits &mdash; <b>don't</b> drop leading zeros within a
    digit's nibble, even though you do drop them for a whole number in Q1.2.</p>
    <table class="cmp">
      <tr><th>Hex</th><th>Binary</th></tr>
      <tr><td><code>0xA7</code></td><td><code>0b1010_0111</code></td></tr>
      <tr><td><code>0x3C9</code></td><td><code>0b0011_1100_1001</code></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0xA7</code> and <code>0x3C9</code> in binary (underscored nibbles, comma-separated):</div>
      <input class="fillblank" data-answer="0b1010_0111, 0b0011_1100_1001~~~0b1010_0111,0b0011_1100_1001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b1010_0111, 0b0011_1100_1001 &mdash; note the leading <code>0011</code> for the 3, kept as a full nibble.</div>
    </div>
  </div>

  <h3>Q2.1 &middot; Vocabulary</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Question</th><th>Answer</th></tr>
      <tr><td>Bits in a single hex digit (hexit)</td><td><b>4</b></td></tr>
      <tr><td>Bits in a byte</td><td><b>8</b></td></tr>
      <tr><td>If a word is 32 bits, bytes in <i>two</i> words</td><td>32&times;2 / 8 = <b>8</b></td></tr>
      <tr><td>Distinct values representable with 7 bits</td><td>2<sup>7</sup> = <b>128</b></td></tr>
    </table>
    <div class="q" data-multi="0,1">
      <div class="prompt"><span class="tag">Select all that apply</span>Which of these are correct?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> A hexit is 4 bits</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> A byte is 8 bits</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Two 32-bit words total 4 bytes</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> 7 bits can represent 256 distinct values</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb">Two 32-bit words = 64 bits = <b>8</b> bytes (not 4), and 7 bits give 2<sup>7</sup> = <b>128</b>
      values (not 256 &mdash; that's 8 bits).</div>
    </div>
  </div>

  <h3>Q2.2 &middot; Bit &amp; byte numbering</h3>
  <div class="card">
    <p class="muted">Number: <code>0b0100_1101_0101_1001</code>. Bit 0 is always the <b>rightmost</b>
    (least significant) bit, and bit numbering counts up from there &mdash; it never depends on how many bits
    the number happens to have.</p>
    <table class="cmp">
      <tr><th>Ask</th><th>Answer</th></tr>
      <tr><td>Least significant bit</td><td><code>0b1</code></td></tr>
      <tr><td>Most significant bit</td><td><code>0b0</code></td></tr>
      <tr><td>Value of bit 1</td><td><code>0b0</code></td></tr>
      <tr><td>Value of bit 2</td><td><code>0b0</code></td></tr>
      <tr><td>Least significant byte</td><td><code>0b0101_1001</code></td></tr>
      <tr><td>Most significant byte</td><td><code>0b0100_1101</code></td></tr>
    </table>
    <div class="warn">Common trap: bit 1 and bit 2 are read off the <i>original</i> number's bit positions
    (counting 0,1,2,&hellip; from the right), not off the least-significant byte you just wrote down.</div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>In a 4-bit number, which bit is the least significant bit?</div>
      <button class="opt" data-i="0">bit 0</button>
      <button class="opt" data-i="1">bit 1</button>
      <button class="opt" data-i="2">bit 2</button>
      <button class="opt" data-i="3">bit 3</button>
      <div class="fb"><b>bit 0</b> &mdash; the rightmost bit is always bit 0, regardless of the number's width.</div>
    </div>
  </div>
</section>

<!-- ============ 2'S COMPLEMENT & INTERPRETATIONS ============ -->
<section class="topic" id="l13-twos">
  <h2>HW03 &middot; Q3&ndash;Q4: 2's Complement Range &amp; Multi-Representation Interpretation</h2>

  <h3>Q3.1 &middot; 4-bit 2's complement range</h3>
  <div class="card">
    <div class="concept">An <i>n</i>-bit 2's complement range is always <b>&minus;2<sup>n&minus;1</sup></b> to
    <b>2<sup>n&minus;1</sup> &minus; 1</b>. For n = 4: &minus;8 to 7. The negative side gets one extra value
    because <code>1000</code> (the pattern that would be "negative zero" in sign-magnitude) is repurposed as
    the most negative number instead.</div>
    <table class="cmp">
      <tr><th>Ask</th><th>Answer</th></tr>
      <tr><td>Most negative 4-bit value</td><td><b>&minus;8</b> (<code>0b1000</code>)</td></tr>
      <tr><td>Most positive 4-bit value</td><td><b>7</b> (<code>0b0111</code>)</td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>Most negative, then most positive 4-bit 2's complement value (decimal, comma-separated):</div>
      <input class="fillblank" data-answer="-8, 7~~~-8,7">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">&minus;8, 7.</div>
    </div>
  </div>

  <h3>Q3.2 &middot; Same bits, different meaning</h3>
  <div class="card">
    <p class="muted">Candidates: <code>0b1111_1111</code>, <code>0b1000_0000</code>, <code>0b0111_1111</code>,
    <code>0b0000_0001</code>, <code>0b0000_0000</code>.</p>
    <table class="cmp">
      <tr><th>Bits</th><th>Signed (2's comp)</th><th>Unsigned</th></tr>
      <tr><td><code>1111_1111</code></td><td>&minus;1</td><td>255</td></tr>
      <tr><td><code>1000_0000</code></td><td>&minus;128</td><td>128</td></tr>
      <tr><td><code>0111_1111</code></td><td><b>127</b> &larr; signed max</td><td>127</td></tr>
      <tr><td><code>0000_0001</code></td><td>1</td><td>1</td></tr>
      <tr><td><code>0000_0000</code></td><td>0</td><td>0</td></tr>
    </table>
    <div class="warn">The pattern with the largest <i>unsigned</i> value (<code>1111_1111</code> = 255) is the
    same bits as the smallest-magnitude-near-max <i>signed</i> value (&minus;1) &mdash; the leading 1 that
    makes a number huge unsigned is exactly what makes it negative signed.</div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>Which pattern is the <b>signed</b> maximum? Which is the <b>unsigned</b> maximum? (comma-separated)</div>
      <input class="fillblank" data-answer="0b0111_1111, 0b1111_1111~~~0b0111_1111,0b1111_1111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Signed max: 0b0111_1111 (127). Unsigned max: 0b1111_1111 (255).</div>
    </div>
  </div>

  <h3>Q4 &middot; One bit pattern, three interpretations</h3>
  <div class="card">
    <p class="muted">Every row below is the <i>same 6 bits</i>, read four different ways. Sign-magnitude and
    1's complement both use the leading bit purely as a sign flag and then either read the rest as-is
    (sign-magnitude) or invert it if negative (1's complement); 2's complement inverts <i>and adds one</i> if
    negative.</p>
    <table class="cmp">
      <tr><th>Bits</th><th>a) sign-mag</th><th>b) unsigned</th><th>c) 1's comp</th><th>d) 2's comp</th></tr>
      <tr><td><code>00_1111</code></td><td>+15</td><td>15</td><td>15</td><td>15</td></tr>
      <tr><td><code>10_0001</code></td><td>&minus;1</td><td>33</td><td>&minus;30</td><td>&minus;31</td></tr>
      <tr><td><code>01_0101</code></td><td>+21</td><td>21</td><td>21</td><td>21</td></tr>
      <tr><td><code>11_1111</code></td><td>&minus;31</td><td>63</td><td>&minus;0 &rarr; 0</td><td>&minus;1</td></tr>
    </table>
    <div class="card" style="margin-top:10px">
      <p class="muted"><b>Worked: <code>10_0001</code></b></p>
      <ul>
        <li><b>Sign-magnitude:</b> leading bit 1 = negative; remaining 5 bits <code>00001</code> = 1 &rarr; <b>&minus;1</b>.</li>
        <li><b>Unsigned:</b> just read the value &mdash; 32+1 = <b>33</b>.</li>
        <li><b>1's complement:</b> leading bit 1 = negative; invert all bits (<code>01_1110</code> = 30) &rarr; <b>&minus;30</b>.</li>
        <li><b>2's complement:</b> invert then add 1 (<code>01_1110</code>+1 = <code>01_1111</code> = 31) &rarr; <b>&minus;31</b>.</li>
      </ul>
      <p class="muted"><b>Worked: <code>11_1111</code></b></p>
      <ul>
        <li><b>Sign-magnitude:</b> magnitude <code>1_1111</code> = 31, negative &rarr; <b>&minus;31</b>.</li>
        <li><b>Unsigned:</b> 63.</li>
        <li><b>1's complement:</b> invert (<code>00_0000</code>) = 0, negative &rarr; <b>&minus;0</b>, i.e. <b>0</b> &mdash; 1's complement's famous "two zeros" quirk.</li>
        <li><b>2's complement:</b> invert+1 (<code>00_0000</code>+1 = <code>00_0001</code>) &rarr; <b>&minus;1</b>.</li>
      </ul>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0b10_0001</code>: sign-magnitude, unsigned, 1's complement, 2's complement (comma-separated, in that order):</div>
      <input class="fillblank" data-answer="-1, 33, -30, -31~~~-1,33,-30,-31">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">&minus;1, 33, &minus;30, &minus;31.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0b11_1111</code>: sign-magnitude, unsigned, 1's complement, 2's complement (comma-separated):</div>
      <input class="fillblank" data-answer="-31, 63, 0, -1~~~-31,63,0,-1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">&minus;31, 63, 0 (1's complement's "negative zero"), &minus;1.</div>
    </div>
  </div>
</section>

<!-- ============ SIGN- & ZERO-EXTENSION ============ -->
<section class="topic" id="l13-ext">
  <h2>HW03 &middot; Q5&ndash;Q6: Sign-Extension &amp; Zero-Extension</h2>

  <h3>Q5.1 &middot; Sign-extend to 8 bits</h3>
  <div class="card">
    <div class="concept">Sign-extension copies the <b>existing sign bit</b> into every new bit added on the
    left, so the value's magnitude and sign are preserved. Zero-extension always pads with 0s instead, which
    only preserves value for <i>non-negative</i> numbers.</div>
    <table class="cmp">
      <tr><th>Original</th><th>Sign bit</th><th>Sign-extended to 8 bits</th></tr>
      <tr><td><code>0b0110</code></td><td>0 (positive)</td><td><code>0b0000_0110</code></td></tr>
      <tr><td><code>0b1011</code></td><td>1 (negative)</td><td><code>0b1111_1011</code></td></tr>
      <tr><td><code>0b1_0001</code></td><td>1 (negative)</td><td><code>0b1111_0001</code></td></tr>
      <tr><td><code>0b010_1111</code></td><td>0 (positive)</td><td><code>0b0010_1111</code></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>Sign-extend <code>0b0110</code>, <code>0b1011</code>, <code>0b1_0001</code>, <code>0b010_1111</code> to 8 bits (comma-separated, underscored):</div>
      <input class="fillblank" data-answer="0b0000_0110, 0b1111_1011, 0b1111_0001, 0b0010_1111~~~0b0000_0110,0b1111_1011,0b1111_0001,0b0010_1111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b0000_0110, 0b1111_1011, 0b1111_0001, 0b0010_1111.</div>
    </div>
  </div>

  <h3>Q5.2 &middot; Why sign-extension matters</h3>
  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>What happens if you zero-extend a negative two's complement number instead of sign-extending it?</div>
      <button class="opt" data-i="0">The value remains the same</button>
      <button class="opt" data-i="1">The value becomes zero</button>
      <button class="opt" data-i="2">The value may change sign</button>
      <button class="opt" data-i="3">The value becomes invalid</button>
      <div class="fb">Padding a negative number's leading 1s with 0s instead turns the sign bit into a plain
      0 &mdash; the pattern is now read as a (large) <b>positive</b> number, so the value's <b>sign flips</b>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>A 16-bit signed value is stored as <code>0b1111_1111_1000_0101</code>. Sign-extended to 32 bits, what will the top 16 bits be?</div>
      <button class="opt" data-i="0">All zeros</button>
      <button class="opt" data-i="1">All ones</button>
      <button class="opt" data-i="2">Half zeros, half ones</button>
      <button class="opt" data-i="3">Alternating zeros and ones</button>
      <div class="fb">The sign bit is 1 (negative), so sign-extension fills the new top 16 bits with <b>all ones</b>.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>In C, an <code>int16_t</code> holding &minus;3 is promoted to <code>int32_t</code>. What happens?</div>
      <button class="opt" data-i="0">The compiler flips all bits and adds one</button>
      <button class="opt" data-i="1">The compiler zero-extends the value</button>
      <button class="opt" data-i="2">The compiler sign-extends the value</button>
      <button class="opt" data-i="3">The compiler leaves the bits unchanged</button>
      <div class="fb">Widening a <b>signed</b> type in C always <b>sign-extends</b> &mdash; that's exactly what
      keeps &minus;3 reading as &minus;3 at the wider width.</div>
    </div>
  </div>

  <h3>Q6 &middot; Sign- vs. zero-extension, worked twice</h3>
  <div class="card">
    <p class="muted"><b>Starting number: <code>0b111</code></b> (3-bit 2's complement)</p>
    <table class="cmp">
      <tr><th>Step</th><th>Result</th></tr>
      <tr><td>Decimal value of <code>0b111</code></td><td>&minus;1</td></tr>
      <tr><td>Sign-extended to 8 bits</td><td><code>0b1111_1111</code></td></tr>
      <tr><td>Decimal value of that</td><td>&minus;1 &mdash; <b>same</b> as original</td></tr>
      <tr><td>Zero-extended to 8 bits instead</td><td><code>0b0000_0111</code></td></tr>
      <tr><td>Decimal value of that</td><td>7 &mdash; <b>not</b> the same as original</td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>Decimal value of <code>0b111</code> (2's complement):</div>
      <input class="fillblank" data-answer="-1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">&minus;1 &mdash; (2&sup2;+2+1) &minus; 2&sup3; = 7 &minus; 8.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>Sign-extended 8-bit form of <code>0b111</code>, then its decimal value, then is it the same as the original (yes/no) &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b1111_1111, -1, yes~~~0b1111_1111,-1,yes">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b1111_1111, &minus;1, yes.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>Zero-extended 8-bit form of <code>0b111</code>, then its decimal value, then is it the same as the original (yes/no) &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b0000_0111, 7, no~~~0b0000_0111,7,no">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b0000_0111, 7, no &mdash; zero-extension silently changed the value because the number was negative.</div>
    </div>

    <p class="muted" style="margin-top:14px"><b>A positive number: <code>0b0110</code></b> (4-bit 2's complement, value 6)</p>
    <table class="cmp">
      <tr><th>Step</th><th>Result</th></tr>
      <tr><td>Sign-extended to 7 bits</td><td><code>0b000_0110</code></td></tr>
      <tr><td>Decimal value (2's comp)</td><td>6 &mdash; same</td></tr>
      <tr><td>Zero-extended to 7 bits</td><td><code>0b000_0110</code> &mdash; <b>identical</b> bits</td></tr>
      <tr><td>Decimal value (2's comp)</td><td>6 &mdash; same</td></tr>
    </table>
    <div class="concept">For a <b>positive</b> number the sign bit is already 0, so sign-extension and
    zero-extension produce the exact same bit pattern &mdash; the whole distinction only bites when the
    original number is negative.</div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0b0110</code>'s decimal value, its 7-bit sign-extended form, that form's decimal value, is it the same (yes/no), its 7-bit zero-extended form, that form's decimal value, is it the same (yes/no) &mdash; comma-separated, in order:</div>
      <input class="fillblank" data-answer="6, 0b000_0110, 6, yes, 0b000_0110, 6, yes~~~6,0b000_0110,6,yes,0b000_0110,6,yes">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6, 0b000_0110, 6, yes, 0b000_0110, 6, yes &mdash; sign- and zero-extension agree because the number is positive.</div>
    </div>
  </div>
</section>

<!-- ============ ADDITION & OVERFLOW ============ -->
<section class="topic" id="l13-add">
  <h2>HW03 &middot; Q7&ndash;Q8: Binary Addition &amp; Overflow</h2>

  <h3>Q7 &middot; Unsigned addition (5-bit)</h3>
  <div class="card">
    <div class="concept"><b>Unsigned overflow</b> happens exactly when the true sum needs more bits than the
    representation has &mdash; i.e. there's a carry <i>out of</i> the leftmost bit. Add normally, then check
    whether the answer needed a 6th bit.</div>
    <table class="cmp">
      <tr><th>a</th><th>b</th><th>Sum (5 bits)</th><th>Overflow?</th></tr>
      <tr><td><code>0_1101</code> (13)</td><td><code>0_0111</code> (7)</td><td><code>0b1_0100</code> (20)</td><td>No &mdash; 20 fits in 5 bits</td></tr>
      <tr><td><code>1_1010</code> (26)</td><td><code>1_0101</code> (21)</td><td><code>0b0_1111</code> (truncated; true sum 47)</td><td><b>Yes</b> &mdash; 47 &gt; 31</td></tr>
      <tr><td><code>0_0101</code> (5)</td><td><code>0_1001</code> (9)</td><td><code>0b0_1110</code> (14)</td><td>No</td></tr>
      <tr><td><code>1_0001</code> (17)</td><td><code>0_1111</code> (15)</td><td><code>0b0_0000</code> (truncated; true sum 32)</td><td><b>Yes</b> &mdash; 32 &gt; 31 (max is 2<sup>5</sup>&minus;1 = 31)</td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>5-bit sum and overflow (yes/no) for <code>0b0_1101 + 0b0_0111</code> &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b1_0100, no~~~0b1_0100,no">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b1_0100 (20), no overflow &mdash; 13+7=20 fits in 5 unsigned bits.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>5-bit sum and overflow (yes/no) for <code>0b1_1010 + 0b1_0101</code> &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b0_1111, yes~~~0b0_1111,yes">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b0_1111 (truncated), yes &mdash; 26+21=47 needs 6 bits; the carry out of bit 4 is lost.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>5-bit sum and overflow (yes/no) for <code>0b1_0001 + 0b0_1111</code> &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b0_0000, yes~~~0b0_0000,yes">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b0_0000 (truncated), yes &mdash; 17+15=32 = 2<sup>5</sup>, one bit too many.</div>
    </div>
  </div>

  <h3>Q8 &middot; 2's complement addition</h3>
  <div class="card">
    <div class="concept"><b>Signed (2's complement) overflow</b> is a completely different test from unsigned
    overflow: it happens exactly when <b>both operands share a sign</b> but the <b>result comes out the
    opposite sign</b>. A carry out of the leftmost bit is irrelevant here &mdash; two operands with
    <i>different</i> signs can never overflow, no matter what carry happens.</div>
    <table class="cmp">
      <tr><th>a</th><th>b</th><th>Sum</th><th>Overflow?</th><th>Why</th></tr>
      <tr><td><code>01_0000</code> (16)</td><td><code>11_1111</code> (&minus;1)</td><td><code>0b00_1111</code> (15)</td><td>No</td><td>signs differ</td></tr>
      <tr><td><code>01_1111</code> (31)</td><td><code>00_0001</code> (1)</td><td><code>0b10_0000</code> (&minus;32)</td><td><b>Yes</b></td><td>pos+pos &rarr; negative result</td></tr>
      <tr><td><code>11_1011</code> (&minus;5)</td><td><code>11_0001</code> (&minus;15)</td><td><code>0b10_1100</code> (&minus;20)</td><td>No</td><td>neg+neg &rarr; still negative &mdash; consistent</td></tr>
      <tr><td><code>11_1111</code> (&minus;1)</td><td><code>11_1111</code> (&minus;1)</td><td><code>0b11_1110</code> (&minus;2)</td><td>No</td><td>neg+neg &rarr; still negative</td></tr>
      <tr><td><code>1_1010</code> (&minus;6, 5-bit)</td><td><code>1_0101</code> (&minus;11, 5-bit)</td><td><code>0b0_1111</code> (truncated)</td><td><b>Yes</b></td><td>neg+neg &rarr; positive result</td></tr>
      <tr><td><code>0_0101</code> (5, 5-bit)</td><td><code>0_1001</code> (9, 5-bit)</td><td><code>0b0_1110</code> (14)</td><td>No</td><td>pos+pos &rarr; still positive</td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>6-bit sum and overflow (yes/no) for <code>0b01_1111 + 0b00_0001</code> (both positive) &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b10_0000, yes~~~0b10_0000,yes">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b10_0000, yes &mdash; two positives (31 + 1) produced a negative-looking result (&minus;32):
      classic signed overflow, even though no unsigned carry left the 6-bit field in a way that matters here.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>6-bit sum and overflow (yes/no) for <code>0b11_1011 + 0b11_0001</code> (both negative) &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b10_1100, no~~~0b10_1100,no">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b10_1100, no &mdash; (&minus;5)+(&minus;15)=&minus;20, and the result is still negative, so no overflow.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>5-bit sum, overflow, and decimal result for <code>0b1_0001 + 0b0_1111</code> (2's complement) &mdash; comma-separated:</div>
      <input class="fillblank" data-answer="0b0_0000, no, 0~~~0b0_0000,no,0">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b0_0000, no, 0 &mdash; (&minus;15)+15=0; opposite signs can never overflow.</div>
    </div>
  </div>
</section>

<!-- ============ 2'S COMPLEMENT SUBTRACTION ============ -->
<section class="topic" id="l13-sub">
  <h2>HW03 &middot; Q9: Two's Complement Subtraction</h2>
  <div class="card">
    <div class="concept">2's complement hardware has <b>no subtractor</b> &mdash; every subtraction
    <code>a &minus; b</code> is done as <code>a + (&minus;b)</code>, where <code>&minus;b</code> is found by
    <b>inverting b's bits and adding 1</b>. This is exactly why 2's complement is the representation almost
    every real machine uses: one adder circuit handles both operations.</div>
    <table class="cmp">
      <tr><th>a &minus; b</th><th>Negate b</th><th>a + (&minus;b)</th><th>Result</th></tr>
      <tr><td>25 &minus; 15 <code>(01_1001, 00_1111)</code></td><td>invert 00_1111&rarr;11_0000, +1 = 11_0001</td><td>01_1001+11_0001</td><td><code>0b00_1010</code> (10)</td></tr>
      <tr><td>22 &minus; 21 <code>(01_0110, 01_0101)</code></td><td>invert 01_0101&rarr;10_1010, +1 = 10_1011</td><td>01_0110+10_1011</td><td><code>0b00_0001</code> (1)</td></tr>
      <tr><td>9 &minus; 12, 5-bit <code>(0_1001, 0_1100)</code></td><td>invert 0_1100&rarr;1_0011, +1 = 1_0100</td><td>0_1001+1_0100</td><td><code>0b1_1101</code> (&minus;3)</td></tr>
      <tr><td>10 &minus; 5, 5-bit <code>(0_1010, 0_0101)</code></td><td>invert 0_0101&rarr;1_1010, +1 = 1_1011</td><td>0_1010+1_1011</td><td><code>0b0_0101</code> (5)</td></tr>
      <tr><td>14 &minus; (&minus;1), 5-bit <code>(0_1110, 1_1111)</code></td><td>invert 1_1111&rarr;0_0000, +1 = 0_0001</td><td>0_1110+0_0001</td><td><code>0b0_1111</code> (15)</td></tr>
    </table>
    <div class="warn">Negating a number is a two-step recipe every time, <b>including negating a negative
    number</b> (which flips it back positive) &mdash; there's no shortcut for "the second number happens to
    already be negative."</div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>6-bit result of <code>0b01_1001 &minus; 0b00_1111</code>:</div>
      <input class="fillblank" data-answer="0b00_1010">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b00_1010 (10) &mdash; 25 &minus; 15.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>6-bit result of <code>0b01_0110 &minus; 0b01_0101</code>:</div>
      <input class="fillblank" data-answer="0b00_0001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b00_0001 (1) &mdash; 22 &minus; 21.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>5-bit result of <code>0b0_1001 &minus; 0b0_1100</code>:</div>
      <input class="fillblank" data-answer="0b1_1101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b1_1101 (&minus;3) &mdash; 9 &minus; 12.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>5-bit result of <code>0b0_1010 &minus; 0b0_0101</code>:</div>
      <input class="fillblank" data-answer="0b0_0101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b0_0101 (5) &mdash; 10 &minus; 5.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>5-bit result of <code>0b0_1110 &minus; 0b1_1111</code>:</div>
      <input class="fillblank" data-answer="0b0_1111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b0_1111 (15) &mdash; 14 &minus; (&minus;1) = 15; negating <code>1_1111</code> (&minus;1) gives <code>0_0001</code> (+1).</div>
    </div>
  </div>
</section>

<!-- ============ BITWISE OPS, SHIFTS & MASKS ============ -->
<section class="topic" id="l13-bit">
  <h2>HW03 &middot; Q10&ndash;Q11: Bitwise Operators, Shifts &amp; Masks</h2>

  <h3>Q10.1 &middot; OR / AND / XOR</h3>
  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Bits</th></tr>
      <tr><td>a</td><td><code>01_0110</code></td></tr>
      <tr><td>b</td><td><code>11_1000</code></td></tr>
      <tr><td>OR</td><td><code>0b11_1110</code></td></tr>
      <tr><td>AND</td><td><code>0b01_0000</code></td></tr>
      <tr><td>XOR</td><td><code>0b10_1110</code></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>OR, AND, XOR of <code>0b01_0110</code> and <code>0b11_1000</code> (comma-separated):</div>
      <input class="fillblank" data-answer="0b11_1110, 0b01_0000, 0b10_1110~~~0b11_1110,0b01_0000,0b10_1110">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">OR = 0b11_1110, AND = 0b01_0000, XOR = 0b10_1110.</div>
    </div>
  </div>

  <h3>Q10.2 &middot; XOR as a "difference detector"</h3>
  <div class="card">
    <div class="concept">XOR-ing a value with a mask <b>flips exactly the bits that are 1 in the mask</b>. So
    "what should I XOR with 0b0101 to get output X" is just <code>X XOR 0b0101</code> &mdash; XOR is its own
    inverse.</div>
    <table class="cmp">
      <tr><th>Target output</th><th>Mask needed (XOR with <code>0b0101</code>)</th></tr>
      <tr><td>0b1111</td><td><code>0b1010</code></td></tr>
      <tr><td>0b0101</td><td><code>0b0000</code></td></tr>
      <tr><td>0b1010</td><td><code>0b1111</code></td></tr>
      <tr><td>0b0000</td><td><code>0b0101</code></td></tr>
    </table>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span>What to XOR with <code>0b0101</code> to get 0b1111, 0b0101, 0b1010, 0b0000 (comma-separated, in order):</div>
      <input class="fillblank" data-answer="0b1010, 0b0000, 0b1111, 0b0101~~~0b1010,0b0000,0b1111,0b0101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0b1010, 0b0000, 0b1111, 0b0101.</div>
    </div>
  </div>

  <h3>Q10.3 &middot; Which operator does what</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Goal</th><th>Operator</th></tr>
      <tr><td>Turn specific bits <b>on</b></td><td><code>|</code> (OR)</td></tr>
      <tr><td>Turn specific bits <b>off</b></td><td><code>&amp;</code> (AND, with an inverted mask)</td></tr>
      <tr><td><b>Flip / toggle</b> specific bits</td><td><code>^</code> (XOR)</td></tr>
    </table>
    <div class="q" data-multi="1,0,2">
      <div class="prompt"><span class="tag">Match the goal to the operator</span>OR turns bits on, AND turns bits off, XOR flips bits &mdash; which one flips bits?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> <code>&amp;</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> <code>|</code></span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> <code>^</code></span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb"><code>^</code> (XOR) toggles bits; <code>|</code> sets them on; <code>&amp;</code> (with a
      0-mask) clears them off.</div>
    </div>
  </div>

  <h3>Q10.4&ndash;Q10.7 &middot; Shifts</h3>
  <div class="card">
    <table class="cmp">
      <tr><th>Expression</th><th>Result</th><th>Why</th></tr>
      <tr><td><code>0b0011 &lt;&lt; 2</code></td><td><b>12</b></td><td>0011=3, shift left 2 = &times;4 &rarr; 0b1100 = 12</td></tr>
      <tr><td><code>0b1010 &gt;&gt; 1</code> (arithmetic, nibble)</td><td><b>&minus;3</b></td><td>1010 is negative (&minus;6); arithmetic shift refills with the sign bit: 1101 = &minus;3</td></tr>
      <tr><td><code>0b1010 &gt;&gt;&gt; 1</code> (logical, nibble)</td><td><b>5</b></td><td>logical shift always refills with 0: 0101 = 5</td></tr>
      <tr><td><code>x &lt;&lt; 2</code></td><td>shift x left by 2 bits <b>and</b> multiply x by 4</td><td>each left shift by 1 doubles the value; two shifts = &times;4</td></tr>
    </table>
    <div class="concept">Arithmetic right shift (<code>&gt;&gt;</code>) preserves sign by refilling with copies
    of the original MSB &mdash; it's the shift used for signed numbers. Logical right shift (<code>&gt;&gt;&gt;</code>)
    always refills with 0s &mdash; used for unsigned numbers, where there's no sign bit to preserve.</div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0b0011 &lt;&lt; 2</code> as a base-10 unsigned integer:</div>
      <input class="fillblank" data-answer="12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">12.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0b1010 &gt;&gt; 1</code> (arithmetic, 4-bit) as base-10:</div>
      <input class="fillblank" data-answer="-3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">&minus;3 &mdash; sign bit (1) is copied in: 1010&rarr;1101 = &minus;3.</div>
    </div>
    <div class="q">
      <div class="prompt"><span class="tag">Fill in</span><code>0b1010 &gt;&gt;&gt; 1</code> (logical, 4-bit) as base-10:</div>
      <input class="fillblank" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">5 &mdash; zero-fill: 1010&rarr;0101 = 5.</div>
    </div>
    <div class="q" data-multi="1,3">
      <div class="prompt"><span class="tag">Select all that apply</span>What does <code>x &lt;&lt; 2</code> do?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> shift x right by 2 bits</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> shift x left by 2 bits</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> divide x by 4</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> multiply x by 4</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb">Both B and D are correct &mdash; "shift left 2" and "multiply by 4" describe the exact
      same operation.</div>
    </div>
  </div>

  <h3>Q11 &middot; Masks</h3>
  <div class="card">
    <p class="muted">A byte packs several independent flags: <code>bit0</code>=alive, <code>bit1</code>=key,
    <code>bit2</code>=shield, <code>bit3</code>=invisible. <code>if (player &amp; 0b00000100)</code> checks
    just the shield bit.</p>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>What is the purpose of <code>0b00000100</code> in <code>if (player &amp; 0b00000100)</code>?</div>
      <button class="opt" data-i="0">It changes the player's shield status.</button>
      <button class="opt" data-i="1">It selects the player's shield status so the program can check it.</button>
      <button class="opt" data-i="2">It removes all of the player's other statuses.</button>
      <button class="opt" data-i="3">It checks whether any player status is active.</button>
      <div class="fb">A mask used with <code>&amp;</code> inside an <code>if</code> is <b>read-only</b> &mdash;
      it isolates one bit so the program can test it, without touching <code>player</code> at all.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Multiple choice</span>Why not just write <code>if (player) { showShield(); }</code>?</div>
      <button class="opt" data-i="0">player contains information about several different states, but we only care about the shield state.</button>
      <button class="opt" data-i="1">player cannot be used in an if statement.</button>
      <button class="opt" data-i="2">The mask converts player from binary to decimal.</button>
      <button class="opt" data-i="3">The mask changes the value stored in player.</button>
      <div class="fb"><code>if (player)</code> is true whenever <b>any</b> bit is set (alive OR key OR shield
      OR invisible) &mdash; the mask is what narrows the check down to just the shield bit.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Multiple choice</span>A robot's sensor byte: bit0 = obstacle front, bit1 = behind, bit2 = left, bit3 = right. It should turn right when there's an obstacle to its <b>left</b>. What belongs in <code>if (sensors &amp; ________)</code>?</div>
      <button class="opt" data-i="0">0b00000001</button>
      <button class="opt" data-i="1">0b00000010</button>
      <button class="opt" data-i="2">0b00000100</button>
      <button class="opt" data-i="3">0b00001000</button>
      <div class="fb">"Left" is bit 2, so the mask needs exactly bit 2 set: <code>0b00000100</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>A byte packs device type (bits 7&ndash;4) and device ID (bits 3&ndash;0). Extracting the ID uses <code>data &amp; 0b00001111</code>. Why are bits 7&ndash;4 of the mask 0?</div>
      <button class="opt" data-i="0">The programmer knows those bits of data are always zero.</button>
      <button class="opt" data-i="1">The programmer wants to ignore the device type when determining the ID.</button>
      <button class="opt" data-i="2">The programmer wants to change the device type to zero permanently.</button>
      <button class="opt" data-i="3">Those bits are not part of the data.</button>
      <div class="fb">AND-ing with 0 <b>clears</b> those bit positions in the result (without touching
      <code>data</code> itself) so only the ID bits survive into the extracted value.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Multiple choice</span>Error flags: bit0=battery, bit1=temperature, bit2=network, bit3=storage. <code>if (errors &amp; 0b00000101)</code> &mdash; which description best explains the mask?</div>
      <button class="opt" data-i="0">Check specifically for a temperature or storage error.</button>
      <button class="opt" data-i="1">Check specifically for a battery or network error.</button>
      <button class="opt" data-i="2">Turn on the battery and network errors.</button>
      <button class="opt" data-i="3">Ignore the battery and network errors.</button>
      <div class="fb"><code>0b00000101</code> has bit0 (battery) and bit2 (network) set &mdash; the AND is true
      if either of those is set in <code>errors</code>.</div>
    </div>
    <div class="q" data-multi="1,3,4">
      <div class="prompt"><span class="tag">Select all that apply</span>Using <code>if (errors &amp; 0b00000101)</code>, which values of <code>errors</code> cause <code>alertUser()</code> to run?</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> 0b00000000</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> 0b00000001</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> 0b00000010</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> 0b00000100</span></label>
      <label class="ma-item"><input type="checkbox" data-i="4"><span><b>E.</b> 0b00000101</span></label>
      <label class="ma-item"><input type="checkbox" data-i="5"><span><b>F.</b> 0b00001010</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb">B, D, E &mdash; any value with bit0 <i>or</i> bit2 set produces a nonzero AND with
      <code>0b00000101</code>. A (all zero), C (only bit1), and F (only bits1,3) share no set bit with the mask,
      so their AND is 0 and the alert does not fire.</div>
    </div>
  </div>
</section>

</main>
`;
