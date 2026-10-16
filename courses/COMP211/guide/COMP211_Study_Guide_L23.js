/* ============================================================
   LESSON 23 — HW05 · Floating Point Representation (homework review): fractional binary
   numbers, the 8-bit minifloat, and a second (2-exponent-bit, bias 1) design. Fresh
   numbers. Pairs with Mastery units u20 and u21.
   Injects into #l23. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l23').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l23-intro')">1 &middot; Overview &amp; Toolkit</button>
  <button onclick="showTopic(this,'l23-q1')">2 &middot; Q1 Fractional Binary</button>
  <button onclick="showTopic(this,'l23-q2')">3 &middot; Q2 8-bit Minifloat</button>
  <button onclick="showTopic(this,'l23-q3')">4 &middot; Q3 A 7-bit Design</button>
</nav>
<main>

<section class="topic active" id="l23-intro">
  <h2>HW05 &middot; Floating Point Representation: Overview</h2>
  <div class="concept">HW05 has three question groups: <b>Q1</b> fractional binary numbers (mixed numbers and binary place format), <b>Q2</b> decoding and encoding in the 8-bit <b>minifloat</b> (1 sign, 3 exponent bits with bias 3, 4 significand bits), and <b>Q3</b> a second design (<b>1 sign, 2 exponent bits with bias 1, 4 significand bits</b>) where you classify each pattern or value as normalized, denormalized, not enough precision or not enough range, and give the stored value.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Tool</th><th>Rule</th></tr>
      <tr><td>Bias</td><td><code>2<sup>n&minus;1</sup> &minus; 1</code> for an n-bit exponent field (3 bits &rarr; 3, 2 bits &rarr; 1)</td></tr>
      <tr><td>Normalized value</td><td><code>(&minus;1)<sup>s</sup> &times; 1.f &times; 2<sup>E &minus; bias</sup></code></td></tr>
      <tr><td>Denormalized (E = 0, f &ne; 0)</td><td><code>(&minus;1)<sup>s</sup> &times; 0.f &times; 2<sup>1 &minus; bias</sup></code></td></tr>
      <tr><td>Zero</td><td>E = 0, f = 0</td></tr>
      <tr><td>Infinity / NaN</td><td>E all ones, f = 0 / f &ne; 0</td></tr>
      <tr><td>Rounding</td><td>nearest representable value; exact ties go to the even one (last bit 0)</td></tr>
    </table>
  </div>

  <div class="card">
<pre>Encoding checklist
 1. sign bit            2. normalize |x| = 1.f &times; 2<sup>e</sup>         3. field = e + bias
 4. field &ge; all-ones?  &rarr; infinity (not enough range)
 5. field &le; 0?         &rarr; denormalized: x / 2<sup>(1&minus;bias)</sup> as 0.f
 6. more fraction bits than fit? &rarr; round to nearest, ties to even
    (if rounding changes the value, the value is "not enough precision" but you still store the rounded one)</pre>
  </div>

  <div class="card">
    <p class="muted">Use the <b>Floating Point II</b> explorer to build bit patterns and see the formula applied. The Mastery checkpoints for HW5 (on the CL13 and CL14 units) test the same question types with different numbers.</p>
  </div>
  <h3>Explorer</h3>
  <div class="card"><div id="l23-explorer"></div></div>
</section>

<section class="topic" id="l23-q1">
  <h2>HW05 &middot; Q1: Fractional Binary Numbers</h2>
  <div class="concept">Two directions: <b>binary &rarr; mixed number</b> (add place values, leave the fraction in lowest terms: <code>1111.1111 = 15 15/16</code>) and <b>fraction/decimal &rarr; binary place format</b> (<code>5/8 = 0b0.101</code>). Negatives keep the sign in front: <code>-0b0.101</code>.</div>

  <div class="card">
<pre>0b11.0101 = 2 + 1 + 1/4 + 1/16 = 3 5/16
7/8     = 1/2 + 1/4 + 1/8      = 0b0.111
-3/8    = -(1/4 + 1/8)         = -0b0.011
1 11/32 = 1 + 8/32 + 2/32 + 1/32 = 0b1.01011
9/32    = 8/32 + 1/32          = 0b0.01001</pre>
    <p>Tip: for a fraction with denominator 2<sup>k</sup>, write the numerator in binary, pad it to k bits, and put the binary point in front: 9/32 &rarr; 9 = 01001 (5 bits) &rarr; <code>0.01001</code>. For 11/16: 11 = 1011 (4 bits) &rarr; <code>0.1011</code>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write <code>0b101.11</code> as a mixed number (like <code>9 1/4</code>).</div>
      <input class="fillblank sm" data-answer="5 3/4">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4 + 1 + &frac12; + &frac14; = 5 3/4.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write <code>0b1010.001</code> as a mixed number.</div>
      <input class="fillblank sm" data-answer="10 1/8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">8 + 2 + 1/8 = 10 1/8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write <code>0b110.1101</code> as a mixed number.</div>
      <input class="fillblank sm" data-answer="6 13/16">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6 + &frac12; + &frac14; + 1/16 = 6 13/16.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Represent 11/16 in binary place format (e.g. <code>0b10.1011</code>).</div>
      <input class="fillblank sm" data-answer="0.1011~~~0b0.1011">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">11 = 1011 over 16 &rarr; 0.1011.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Represent &minus;7/8 in binary place format.</div>
      <input class="fillblank sm" data-answer="-0.111~~~-0b0.111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">7/8 = 0.111, so &minus;0b0.111.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Represent 5.625 in binary place format.</div>
      <input class="fillblank sm" data-answer="101.101~~~0b101.101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">5 = 101; 0.625 = &frac12; + 1/8 = .101 &rarr; 101.101.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Represent 1.34375 (1 11/32) in binary place format.</div>
      <input class="fillblank sm" data-answer="1.01011~~~0b1.01011">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">11/32 = 01011 over 32 &rarr; 1.01011.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Represent 9/32 in binary place format.</div>
      <input class="fillblank sm" data-answer="0.01001~~~0b0.01001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">9 = 01001 over 32 &rarr; 0.01001.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which decimal value is <code>0b0.101</code>?</div>
      <button class="opt" data-i="0">0.101</button>
      <button class="opt" data-i="1">0.5</button>
      <button class="opt" data-i="2">0.625</button>
      <button class="opt" data-i="3">0.75</button>
      <div class="fb">&frac12; + 1/8 = 0.625 = 5/8.</div>
    </div>
  </div>
</section>

<section class="topic" id="l23-q2">
  <h2>HW05 &middot; Q2: The 8-bit Minifloat</h2>
  <div class="concept">Layout <code>s eee ffff</code>, bias 3. <b>Decode</b> by deciding the kind first (E all ones &rarr; &infin;/NaN, E = 0 &rarr; zero/denormal, else normalized), then applying the matching formula. <b>Encode</b> with the checklist. Always give the sign with decoded answers when asked (<code>+0.015625</code>, <code>-1.0625</code>, <code>+Inf</code>, <code>NaN</code>).</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Pattern</th><th>Kind</th><th>Computation</th><th>Value</th></tr>
      <tr><td>1 011 0010</td><td>normalized</td><td>&minus;1.0010 &times; 2<sup>0</sup></td><td>&minus;1.125</td></tr>
      <tr><td>0 111 0000</td><td>infinity</td><td>E all ones, f = 0</td><td>+Inf</td></tr>
      <tr><td>0 111 0110</td><td>NaN</td><td>E all ones, f &ne; 0</td><td>NaN</td></tr>
      <tr><td>0 000 0010</td><td>denormalized</td><td>0.0010 &times; 2<sup>&minus;2</sup></td><td>0.03125</td></tr>
      <tr><td>0 110 1111</td><td>normalized (largest)</td><td>1.1111 &times; 2<sup>3</sup></td><td>15.5</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.1</span>What decimal number is encoded by <code>1 001 0100</code>? (sign explicit; +Inf / -Inf / NaN as needed)</div>
      <input class="fillblank sm" data-answer="-0.3125">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Normalized: exponent 1 &minus; 3 = -2; value -0.3125.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.2</span>What decimal number is encoded by <code>0 010 0110</code>? (sign explicit; +Inf / -Inf / NaN as needed)</div>
      <input class="fillblank sm" data-answer="0.6875~~~+0.6875">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Normalized: exponent 2 &minus; 3 = -1; value 0.6875.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.3</span>What decimal number is encoded by <code>0 000 0011</code>? (sign explicit; +Inf / -Inf / NaN as needed)</div>
      <input class="fillblank sm" data-answer="0.046875~~~+0.046875">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Denormalized: 0.0011 &times; 2<sup>&minus;2</sup> = 0.046875.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.4</span>What decimal number is encoded by <code>0 111 1001</code>? (sign explicit; +Inf / -Inf / NaN as needed)</div>
      <input class="fillblank sm" data-answer="NaN~~~nan">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent all ones with a nonzero significand: NaN.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.5</span>What decimal number is encoded by <code>1 111 0000</code>? (sign explicit; +Inf / -Inf / NaN as needed)</div>
      <input class="fillblank sm" data-answer="-Inf~~~-inf~~~-infinity">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent all ones with a zero significand: infinity.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.6</span>What decimal number is encoded by <code>0 110 0000</code>? (sign explicit; +Inf / -Inf / NaN as needed)</div>
      <input class="fillblank sm" data-answer="8~~~+8">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Normalized: exponent 6 &minus; 3 = 3; value 8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.7</span>Represent <b>10.5</b> in the minifloat as <code>0bXXXX_XXXX</code>.</div>
      <input class="fillblank sm" data-answer="01100101~~~0b01100101~~~0110_0101~~~0b0110_0101~~~0_110_0101~~~0b0_110_0101~~~0 110 0101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Encoding: <code>0 110 0101</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.8</span>Represent <b>-0.75</b> in the minifloat as <code>0bXXXX_XXXX</code>.</div>
      <input class="fillblank sm" data-answer="10101000~~~0b10101000~~~1010_1000~~~0b1010_1000~~~1_010_1000~~~0b1_010_1000~~~1 010 1000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Encoding: <code>1 010 1000</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.9</span>Represent <b>1/8</b> in the minifloat as <code>0bXXXX_XXXX</code>.</div>
      <input class="fillblank sm" data-answer="00001000~~~0b00001000~~~0000_1000~~~0b0000_1000~~~0_000_1000~~~0b0_000_1000~~~0 000 1000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Encoding: <code>0 000 1000</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.10</span>Represent <b>-13</b> in the minifloat as <code>0bXXXX_XXXX</code>.</div>
      <input class="fillblank sm" data-answer="11101010~~~0b11101010~~~1110_1010~~~0b1110_1010~~~1_110_1010~~~0b1_110_1010~~~1 110 1010">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Encoding: <code>1 110 1010</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2.11</span>Represent <b>40</b> in the minifloat as <code>0bXXXX_XXXX</code>.</div>
      <input class="fillblank sm" data-answer="01110000~~~0b01110000~~~0111_0000~~~0b0111_0000~~~0_111_0000~~~0b0_111_0000~~~0 111 0000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">40 exceeds 15.5: overflow to +Inf. Encoding: <code>0 111 0000</code>.</div>
    </div>
  </div>
</section>

<section class="topic" id="l23-q3">
  <h2>HW05 &middot; Q3: Another Design (2 exponent bits, bias 1, 4 significand bits)</h2>
  <div class="concept">Same rules, different widths: <code>s ee ffff</code> (7 bits), <b>bias 1</b>. Exponent field 00 &rarr; zero/denormalized (fixed exponent 1 &minus; 1 = <b>0</b>: value <code>0.ffff &times; 2<sup>0</sup></code>); 01 and 10 &rarr; normalized (true exponents 0 and 1); 11 &rarr; &infin;/NaN. For each value you must decide <b>normalized / denormalized / not enough precision / not enough range</b> and state the encoding stored.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Landmark</th><th>Pattern</th><th>Value</th></tr>
      <tr><td>smallest positive denormal</td><td>0 00 0001</td><td>0.0625</td></tr>
      <tr><td>largest denormal</td><td>0 00 1111</td><td>0.9375</td></tr>
      <tr><td>smallest positive normalized</td><td>0 01 0000</td><td>1</td></tr>
      <tr><td>largest finite</td><td>0 10 1111</td><td>3.875</td></tr>
      <tr><td>+Infinity</td><td>0 11 0000</td><td>+Inf</td></tr>
    </table>
    <p>Largest finite = 1.1111 &times; 2<sup>1</sup> = 3.875. Anything beyond that overflows. Denormals have spacing 1/16 and run seamlessly into the normalized values at 1.</p>
  </div>

  <div class="card">
<pre>decode 1 10 1010:  E=10 (normalized), exponent 2&minus;1 = 1, &minus;1.1010 &times; 2<sup>1</sup> = &minus;3.25
decode 0 00 0110:  E=00, f&ne;0 &rarr; denormalized, 0.0110 &times; 2<sup>0</sup> = 0.375
encode &minus;2.25: &minus;10.01 = &minus;1.001 &times; 2<sup>1</sup>, E = 1+1 = 2 = 10 &rarr; <b>1 10 0010</b> (exact, normalized)
encode 0.625: 0.101 = 1.01 &times; 2<sup>&minus;1</sup>, E = &minus;1+1 = 0 &rarr; denormalized: 0.625 = 0.1010 &times; 2<sup>0</sup> &rarr; <b>0 00 1010</b>
encode 2.15625 = 1.000101 &times; 2<sup>1</sup>: six fraction bits, only 4 fit &rarr; <b>not enough precision</b>; tie between 2.125 and 2.1875 &rarr; ties-to-even &rarr; <b>0 10 0001</b> (2.125)
encode &minus;30: exponent 4 &rarr; E = 5 does not fit in 2 bits &rarr; <b>not enough range</b> &rarr; &minus;Inf = 1 11 0000</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.1a</span><code>1 01 0100</code>: is it <code>normalized</code> or <code>denormalized</code>? (then decimal in the next question)</div>
      <input class="fillblank sm" data-answer="normalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent field is 01 or 10: normalized.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.2a</span><code>0 00 0100</code>: is it <code>normalized</code> or <code>denormalized</code>? (then decimal in the next question)</div>
      <input class="fillblank sm" data-answer="denormalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent field 00 with a nonzero significand: denormalized.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.3a</span><code>0 10 0110</code>: is it <code>normalized</code> or <code>denormalized</code>? (then decimal in the next question)</div>
      <input class="fillblank sm" data-answer="normalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent field is 01 or 10: normalized.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.4a</span><code>0 01 1000</code>: is it <code>normalized</code> or <code>denormalized</code>? (then decimal in the next question)</div>
      <input class="fillblank sm" data-answer="normalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent field is 01 or 10: normalized.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.1b</span>Decimal value of <code>1 01 0100</code>:</div>
      <input class="fillblank sm" data-answer="-1.25">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Value -1.25.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.2b</span>Decimal value of <code>0 00 0100</code>:</div>
      <input class="fillblank sm" data-answer="0.25~~~+0.25">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Value 0.25.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.3b</span>Decimal value of <code>0 10 0110</code>:</div>
      <input class="fillblank sm" data-answer="2.75~~~+2.75">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Value 2.75.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.4b</span>Decimal value of <code>0 01 1000</code>:</div>
      <input class="fillblank sm" data-answer="1.5~~~+1.5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Value 1.5.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.5</span>Encode <b>1.75</b> in the 7-bit design as <code>0bXXX_XXXX</code> (round to nearest, ties to even; infinity if out of range).</div>
      <input class="fillblank sm" data-answer="0011100~~~0b0011100~~~001_1100~~~0b001_1100~~~0_01_1100~~~0b0_01_1100~~~0 01 1100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Classification: <b>normalized</b>. Stored: <code>0 01 1100</code> = 1.75.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.6</span>Encode <b>-1.3125</b> in the 7-bit design as <code>0bXXX_XXXX</code> (round to nearest, ties to even; infinity if out of range).</div>
      <input class="fillblank sm" data-answer="1010101~~~0b1010101~~~101_0101~~~0b101_0101~~~1_01_0101~~~0b1_01_0101~~~1 01 0101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Classification: <b>normalized</b>. Stored: <code>1 01 0101</code> = -1.3125.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.7</span>Encode <b>0.4375</b> in the 7-bit design as <code>0bXXX_XXXX</code> (round to nearest, ties to even; infinity if out of range).</div>
      <input class="fillblank sm" data-answer="0000111~~~0b0000111~~~000_0111~~~0b000_0111~~~0_00_0111~~~0b0_00_0111~~~0 00 0111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Classification: <b>denormalized</b>. Stored: <code>0 00 0111</code> = 0.4375.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.8</span>Encode <b>3.0625</b> in the 7-bit design as <code>0bXXX_XXXX</code> (round to nearest, ties to even; infinity if out of range).</div>
      <input class="fillblank sm" data-answer="0101000~~~0b0101000~~~010_1000~~~0b010_1000~~~0_10_1000~~~0b0_10_1000~~~0 10 1000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Classification: <b>not enough precision (rounded)</b>. Stored: <code>0 10 1000</code> = 3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3.9</span>Encode <b>-5</b> in the 7-bit design as <code>0bXXX_XXXX</code> (round to nearest, ties to even; infinity if out of range).</div>
      <input class="fillblank sm" data-answer="1110000~~~0b1110000~~~111_0000~~~0b111_0000~~~1_11_0000~~~0b1_11_0000~~~1 11 0000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Classification: <b>not enough range (overflow)</b>. Stored: <code>1 11 0000</code> = -Inf.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>2.15625 in the 7-bit design is&hellip;</div>
      <button class="opt" data-i="0">representable exactly as a normalized value</button>
      <button class="opt" data-i="1">representable as a denormalized value</button>
      <button class="opt" data-i="2">not enough precision (it must be rounded)</button>
      <button class="opt" data-i="3">not enough range</button>
      <div class="fb">It needs six fraction bits; with four it is a tie between 2.125 and 2.1875, rounded to 2.125.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>&minus;30 in the 7-bit design is&hellip;</div>
      <button class="opt" data-i="0">not enough precision</button>
      <button class="opt" data-i="1">not enough range</button>
      <button class="opt" data-i="2">denormalized</button>
      <button class="opt" data-i="3">normalized</button>
      <div class="fb">The largest finite magnitude is 3.875, so &minus;30 overflows to &minus;&infin;.</div>
    </div>
  </div>
</section>

</main>
`;
fpExplorer('l23-explorer', [
  { name: 'Minifloat (1-3-4, bias 3)', sb: 1, eb: 3, mb: 4, bias: 3, special: true },
  { name: '7-bit design (1-2-4, bias 1)', sb: 1, eb: 2, mb: 4, bias: 1, special: true }
]);
