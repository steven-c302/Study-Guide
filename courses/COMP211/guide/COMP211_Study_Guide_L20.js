/* ============================================================
   LESSON 20 — CL13 Floating Point I (fixed point, normalized form, the implicit 1,
   microfloat V1-V4), incl. RD11. Pairs with Mastery unit u20.
   Injects into #l20. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l20').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l20-frac')">1 &middot; Fractions in Binary</button>
  <button onclick="showTopic(this,'l20-norm')">2 &middot; Normalized Form &amp; the Implicit 1</button>
  <button onclick="showTopic(this,'l20-micro')">3 &middot; Microfloat V1</button>
  <button onclick="showTopic(this,'l20-tradeoff')">4 &middot; Range vs Precision (V2, V3)</button>
  <button onclick="showTopic(this,'l20-bias')">5 &middot; Bias &amp; Microfloat V4</button>
  <button onclick="showTopic(this,'l20-rd11')">RD11 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l20-frac">
  <h2>CL13 &middot; Fractions in Binary &amp; Fixed Point</h2>
  <div class="concept">Binary works exactly like decimal, just with powers of 2. To the <b>left</b> of the binary point the places are 1, 2, 4, 8&hellip;; to the <b>right</b> they are <b>&frac12;, &frac14;, &frac18;, 1/16&hellip;</b> (that is 2<sup>&minus;1</sup>, 2<sup>&minus;2</sup>, 2<sup>&minus;3</sup>, 2<sup>&minus;4</sup>).</div>

  <div class="card">
    <table class="cmp">
      <tr><th>2<sup>3</sup></th><th>2<sup>2</sup></th><th>2<sup>1</sup></th><th>2<sup>0</sup></th><th>.</th><th>2<sup>&minus;1</sup></th><th>2<sup>&minus;2</sup></th><th>2<sup>&minus;3</sup></th><th>2<sup>&minus;4</sup></th></tr>
      <tr><td>8</td><td>4</td><td>2</td><td>1</td><td>.</td><td>0.5</td><td>0.25</td><td>0.125</td><td>0.0625</td></tr>
    </table>
    <p>Decimal does the same thing: <code>234.56</code> = (2&times;100) + (3&times;10) + (4&times;1) + (5&times;0.1) + (6&times;0.01).</p>
  </div>

  <h3>Binary &rarr; decimal</h3>

  <div class="card">
    <p>Add the place value under every 1.</p>
<pre>101.101 = (1&times;4) + (0&times;2) + (1&times;1) + (1&times;0.5) + (0&times;0.25) + (1&times;0.125)
        = 5.625

01110.1011 = 14 + 0.5 + 0.125 + 0.0625 = 14.6875</pre>
  </div>

  <h3>Decimal &rarr; binary</h3>

  <div class="card">
    <p>Convert the integer part as usual. For the fraction, build it from powers of &frac12;: take the biggest one that fits, subtract, repeat.</p>
<pre>12.75: 12 = 1100        0.75 = 0.5 + 0.25 = .11     &rarr;  1100.11
 5/8  : 5/8 = 0.5 + 0.125 = .101                       &rarr;  0.101
 3.125: 3 = 11           0.125 = .001                  &rarr;  11.001</pre>
  </div>

  <h3>Fixed point</h3>

  <div class="concept"><b>Fixed-point</b> representation keeps the binary point at a fixed spot in the bit pattern (say, 4 bits before and 4 after). It is simple, but a given number of bits buys either <b>range</b> or <b>fractional precision</b>, never both. Floating point is the fix: let the point <i>float</i>.</div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What is the place value of the <b>third</b> digit to the right of the binary point?</div>
      <button class="opt" data-i="0">1/3</button>
      <button class="opt" data-i="1">1/6</button>
      <button class="opt" data-i="2">1/8</button>
      <button class="opt" data-i="3">3/10</button>
      <div class="fb">The places are &frac12;, &frac14;, <b>&#8539;</b>: 2<sup>&minus;3</sup> = 1/8.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Convert <code>0b101.1</code> to decimal.</div>
      <input class="fillblank sm" data-answer="5.5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4 + 1 + &frac12; = 5.5.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Convert <code>0b1100.011</code> to decimal.</div>
      <input class="fillblank sm" data-answer="12.375">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">8 + 4 + &frac14; + &#8539; = 12.375.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write 3.75 as fixed-point binary (no prefix).</div>
      <input class="fillblank sm" data-answer="11.11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3 = 11 and 0.75 = &frac12; + &frac14; = .11, so <code>11.11</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write 6.625 as fixed-point binary (no prefix).</div>
      <input class="fillblank sm" data-answer="110.101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6 = 110 and 0.625 = &frac12; + &#8539; = .101, so <code>110.101</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why is fixed point a poor way to cover both very large and very small numbers?</div>
      <button class="opt" data-i="0">It cannot store fractions</button>
      <button class="opt" data-i="1">Its binary point is fixed, so the bits spent on the fraction are taken away from the range (and vice versa)</button>
      <button class="opt" data-i="2">It always needs 64 bits</button>
      <button class="opt" data-i="3">Computers cannot add fixed-point numbers</button>
      <div class="fb">With a fixed split of bits you pick a range <i>or</i> fine precision. Floating point moves the point with an exponent.</div>
    </div>
  </div>
</section>

<section class="topic" id="l20-norm">
  <h2>CL13 &middot; Scientific Notation, Normalized Form &amp; the Implicit 1</h2>
  <div class="concept"><b>Scientific notation</b> writes a number as <b>significand &times; base<sup>exponent</sup></b>: <code>9.2318 &times; 10<sup>5</sup></code>. It is <b>normalized</b> when the significand satisfies <code>1 &le; |significand| &lt; 10</code>. In binary the base is 2 and the normalized form requires <code>1 &le; |significand| &lt; 2</code>, so the digit left of the point is <b>always 1</b>.</div>

  <div class="card">
<pre>1.0101 &times; 2<sup>6</sup>
 ^^^^^^     ^
 significand  exponent        (base 2; the point is the binary point)</pre>
    <p>Convert: <code>1.0101 &times; 2<sup>6</sup></code> = <code>1010100</code> = 64 + 16 + 4 = <b>84</b> (move the point 6 places right).</p>
    <p>Normalize 10.5: <code>10.5 = 1010.1</code>; move the point 3 places left &rarr; <code>1.0101 &times; 2<sup>3</sup></code>.</p>
  </div>

  <h3>The implicit 1</h3>

  <div class="concept">Because every nonzero normalized number looks like <code>1.xxxx &times; 2<sup>e</sup></code>, the leading <b>1</b> carries no information. We do <b>not store it</b>. We store only the digits after the point (the <b>significand bits</b>, a.k.a. fraction or mantissa) and the exponent. That frees one bit for extra precision.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Number</th><th>Binary</th><th>Normalized</th><th>Stored significand bits</th><th>Exponent</th></tr>
      <tr><td>5</td><td>101</td><td>1.01 &times; 2<sup>2</sup></td><td>01</td><td>2</td></tr>
      <tr><td>10.5</td><td>1010.1</td><td>1.0101 &times; 2<sup>3</sup></td><td>0101</td><td>3</td></tr>
      <tr><td>0.375</td><td>0.011</td><td>1.1 &times; 2<sup>&minus;2</sup></td><td>1</td><td>&minus;2</td></tr>
      <tr><td>7</td><td>111</td><td>1.11 &times; 2<sup>2</sup></td><td>11</td><td>2</td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Which of these is in <b>normalized</b> binary form?</div>
      <button class="opt" data-i="0">0.10101 &times; 2<sup>7</sup></button>
      <button class="opt" data-i="1">10.101 &times; 2<sup>5</sup></button>
      <button class="opt" data-i="2">1.0101 &times; 2<sup>6</sup></button>
      <button class="opt" data-i="3">101.01 &times; 2<sup>4</sup></button>
      <div class="fb">Normalized means exactly one 1 to the left of the point: 1 &le; significand &lt; 2.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write 6 in normalized binary form: give the exponent.</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6 = 110 = 1.1 &times; 2<sup>2</sup>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Write 6 in normalized binary form: give the significand bits stored (after the point).</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1.1 &rarr; the stored bits are just <code>1</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Normalize 0.1875 (= 0.0011 in binary). What is the exponent?</div>
      <input class="fillblank sm" data-answer="-3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0.0011 = 1.1 &times; 2<sup>&minus;3</sup>. The point moves 3 places right, so the exponent is &minus;3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is <code>1.1 &times; 2<sup>3</sup></code> in decimal?</div>
      <input class="fillblank sm" data-answer="12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1.1 &times; 2<sup>3</sup> = 1100 = 12.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does a floating-point format not store the leading 1?</div>
      <button class="opt" data-i="0">It would make the number negative</button>
      <button class="opt" data-i="1">Every nonzero normalized number starts with 1, so it is implied, and the saved bit buys one more bit of precision</button>
      <button class="opt" data-i="2">The hardware cannot store a 1 there</button>
      <button class="opt" data-i="3">It is stored in the sign bit</button>
      <div class="fb">The implicit 1 is free precision.</div>
    </div>
  </div>
</section>

<section class="topic" id="l20-micro">
  <h2>CL13 &middot; Microfloat V1 (2 exponent bits, 2 significand bits)</h2>
  <div class="concept"><b>Microfloat</b> is a made-up 4-bit floating-point format for exploring design trade-offs. V1: <b>2 exponent bits</b> then <b>2 significand bits</b>, no sign bit, no bias. Value = <code>1.<i>sig</i> &times; 2<sup><i>exp</i></sup></code>, where the exponent field is read as an ordinary unsigned number (0&ndash;3).</div>

  <h3>Explorer: click bits to build a microfloat</h3>

  <div class="card">
    <div id="l20-explorer"></div>
  </div>

  <h3>Every V1 value</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Bits (exp sig)</th><th>Value form</th><th>Decimal</th></tr>
      <tr><td><code>00 00</code></td><td>1.00 &times; 2<sup>0</sup></td><td><b>1</b></td></tr>
      <tr><td><code>00 01</code></td><td>1.01 &times; 2<sup>0</sup></td><td><b>1.25</b></td></tr>
      <tr><td><code>00 10</code></td><td>1.10 &times; 2<sup>0</sup></td><td><b>1.5</b></td></tr>
      <tr><td><code>00 11</code></td><td>1.11 &times; 2<sup>0</sup></td><td><b>1.75</b></td></tr>
      <tr><td><code>01 00</code></td><td>1.00 &times; 2<sup>1</sup></td><td><b>2</b></td></tr>
      <tr><td><code>01 01</code></td><td>1.01 &times; 2<sup>1</sup></td><td><b>2.5</b></td></tr>
      <tr><td><code>01 10</code></td><td>1.10 &times; 2<sup>1</sup></td><td><b>3</b></td></tr>
      <tr><td><code>01 11</code></td><td>1.11 &times; 2<sup>1</sup></td><td><b>3.5</b></td></tr>
      <tr><td><code>10 00</code></td><td>1.00 &times; 2<sup>2</sup></td><td><b>4</b></td></tr>
      <tr><td><code>10 01</code></td><td>1.01 &times; 2<sup>2</sup></td><td><b>5</b></td></tr>
      <tr><td><code>10 10</code></td><td>1.10 &times; 2<sup>2</sup></td><td><b>6</b></td></tr>
      <tr><td><code>10 11</code></td><td>1.11 &times; 2<sup>2</sup></td><td><b>7</b></td></tr>
      <tr><td><code>11 00</code></td><td>1.00 &times; 2<sup>3</sup></td><td><b>8</b></td></tr>
      <tr><td><code>11 01</code></td><td>1.01 &times; 2<sup>3</sup></td><td><b>10</b></td></tr>
      <tr><td><code>11 10</code></td><td>1.10 &times; 2<sup>3</sup></td><td><b>12</b></td></tr>
      <tr><td><code>11 11</code></td><td>1.11 &times; 2<sup>3</sup></td><td><b>14</b></td></tr>
    </table>
    <p class="muted">Largest = 1.11 &times; 2<sup>3</sup> = 14. Smallest = 1. Nothing below 1, and the gaps widen (0.25 apart, then 0.5, 1, 2).</p>
  </div>

  <h3>Encoding &mdash; worked examples</h3>

  <div class="card">
<pre>3.5 = 11.1 = 1.11 &times; 2<sup>1</sup>     exponent 1 = 01, significand 11   &rarr;  <b>0111</b>
  7 = 111  = 1.11 &times; 2<sup>2</sup>     exponent 2 = 10, significand 11   &rarr;  <b>1011</b>
1.25 = 1.01 &times; 2<sup>0</sup>             exponent 0 = 00, significand 01   &rarr;  <b>0001</b></pre>
    <p>Recipe: <b>binary &rarr; normalize &rarr; drop the leading 1 &rarr; write exponent bits, then significand bits.</b> If the exponent needs more than 2 bits, the value is out of <b>range</b>. If the significand needs more than 2 bits, it needs more <b>precision</b> than V1 has.</p>
  </div>

  <h3>Decoding &mdash; worked examples</h3>

  <div class="card">
<pre>0101: exponent 01 = 1, significand 01  &rarr;  1.01 &times; 2<sup>1</sup> = 10.1 = <b>2.5</b>
1101: exponent 11 = 3, significand 01  &rarr;  1.01 &times; 2<sup>3</sup> = 1010 = <b>10</b></pre>
  </div>

  <h3>Representable? Four cases</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Value</th><th>Normalized</th><th>Fits?</th><th>Encoding / reason</th></tr>
      <tr><td>1.75</td><td>1.11 &times; 2<sup>0</sup></td><td>yes</td><td><code>0011</code></td></tr>
      <tr><td>2.75</td><td>1.011 &times; 2<sup>1</sup></td><td>no</td><td>needs 3 significand bits &mdash; <b>not enough precision</b></td></tr>
      <tr><td>5</td><td>1.01 &times; 2<sup>2</sup></td><td>yes</td><td><code>1001</code></td></tr>
      <tr><td>12</td><td>1.1 &times; 2<sup>3</sup></td><td>yes</td><td><code>1110</code></td></tr>
      <tr><td>16</td><td>1 &times; 2<sup>4</sup></td><td>no</td><td>exponent 4 does not fit in 2 bits &mdash; <b>not enough range</b></td></tr>
    </table>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode microfloat V1 <code>1011</code>.</div>
      <input class="fillblank sm" data-answer="7">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent 10 = 2, significand 11: 1.11 &times; 2<sup>2</sup> = 111 = 7.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode microfloat V1 <code>0110</code>.</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent 01 = 1, significand 10: 1.1 &times; 2<sup>1</sup> = 11 = 3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 6 in microfloat V1 (4 bits).</div>
      <input class="fillblank sm" data-answer="1010~~~0b1010">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6 = 110 = 1.1 &times; 2<sup>2</sup> &rarr; exponent 10, significand 10 &rarr; <code>1010</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 12 in microfloat V1 (4 bits).</div>
      <input class="fillblank sm" data-answer="1110~~~0b1110">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">12 = 1100 = 1.1 &times; 2<sup>3</sup> &rarr; exponent 11, significand 10 &rarr; <code>1110</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 9 in microfloat V1, or write N/A if it cannot be represented.</div>
      <input class="fillblank sm" data-answer="N/A~~~n/a~~~NA~~~none">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">9 = 1001 = 1.001 &times; 2<sup>3</sup>: three significand bits are needed but V1 has two (not enough precision), so <b>N/A</b>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can microfloat V1 <b>not</b> represent 4.5?</div>
      <button class="opt" data-i="0">There is not enough range</button>
      <button class="opt" data-i="1">There are not enough significand bits (4.5 = 1.001 &times; 2<sup>2</sup> needs three)</button>
      <button class="opt" data-i="2">The sign bit is missing</button>
      <button class="opt" data-i="3">4.5 is not a binary fraction</button>
      <div class="fb">The exponent 2 fits easily; the significand <code>001</code> does not. That is a <b>precision</b> failure, not a range failure.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can microfloat V1 <b>not</b> represent 16?</div>
      <button class="opt" data-i="0">Not enough precision</button>
      <button class="opt" data-i="1">Not enough range: 16 = 1.0 &times; 2<sup>4</sup> needs exponent 4, but 2 bits only reach 3</button>
      <button class="opt" data-i="2">It is even</button>
      <button class="opt" data-i="3">The significand would be negative</button>
      <div class="fb">A <b>range</b> failure: the exponent is too large for its field.</div>
    </div>
  </div>
</section>

<section class="topic" id="l20-tradeoff">
  <h2>CL13 &middot; Design Trade-offs: Range vs Precision</h2>
  <div class="concept">Four bits have to be shared between the exponent and the significand. <b>More exponent bits &rarr; more range, less precision. More significand bits &rarr; more precision, less range.</b> Both are limited by the total number of bits.</div>

  <h3>Microfloat V2: 1 exponent bit, 3 significand bits</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Bits (exp sig)</th><th>Value form</th><th>Decimal</th></tr>
      <tr><td><code>0 000</code></td><td>1.000 &times; 2<sup>0</sup></td><td><b>1</b></td></tr>
      <tr><td><code>0 001</code></td><td>1.001 &times; 2<sup>0</sup></td><td><b>1.125</b></td></tr>
      <tr><td><code>0 010</code></td><td>1.010 &times; 2<sup>0</sup></td><td><b>1.25</b></td></tr>
      <tr><td><code>0 011</code></td><td>1.011 &times; 2<sup>0</sup></td><td><b>1.375</b></td></tr>
      <tr><td><code>0 100</code></td><td>1.100 &times; 2<sup>0</sup></td><td><b>1.5</b></td></tr>
      <tr><td><code>0 101</code></td><td>1.101 &times; 2<sup>0</sup></td><td><b>1.625</b></td></tr>
      <tr><td><code>0 110</code></td><td>1.110 &times; 2<sup>0</sup></td><td><b>1.75</b></td></tr>
      <tr><td><code>0 111</code></td><td>1.111 &times; 2<sup>0</sup></td><td><b>1.875</b></td></tr>
      <tr><td><code>1 000</code></td><td>1.000 &times; 2<sup>1</sup></td><td><b>2</b></td></tr>
      <tr><td><code>1 001</code></td><td>1.001 &times; 2<sup>1</sup></td><td><b>2.25</b></td></tr>
      <tr><td><code>1 010</code></td><td>1.010 &times; 2<sup>1</sup></td><td><b>2.5</b></td></tr>
      <tr><td><code>1 011</code></td><td>1.011 &times; 2<sup>1</sup></td><td><b>2.75</b></td></tr>
      <tr><td><code>1 100</code></td><td>1.100 &times; 2<sup>1</sup></td><td><b>3</b></td></tr>
      <tr><td><code>1 101</code></td><td>1.101 &times; 2<sup>1</sup></td><td><b>3.25</b></td></tr>
      <tr><td><code>1 110</code></td><td>1.110 &times; 2<sup>1</sup></td><td><b>3.5</b></td></tr>
      <tr><td><code>1 111</code></td><td>1.111 &times; 2<sup>1</sup></td><td><b>3.75</b></td></tr>
    </table>
    <p class="muted">Fine steps (0.125) but the exponent is only 0 or 1, so the largest value is 3.75.</p>
  </div>

  <h3>Microfloat V3: 3 exponent bits, 1 significand bit</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Bits (exp sig)</th><th>Value form</th><th>Decimal</th></tr>
      <tr><td><code>000 0</code></td><td>1.0 &times; 2<sup>0</sup></td><td><b>1</b></td></tr>
      <tr><td><code>000 1</code></td><td>1.1 &times; 2<sup>0</sup></td><td><b>1.5</b></td></tr>
      <tr><td><code>001 0</code></td><td>1.0 &times; 2<sup>1</sup></td><td><b>2</b></td></tr>
      <tr><td><code>001 1</code></td><td>1.1 &times; 2<sup>1</sup></td><td><b>3</b></td></tr>
      <tr><td><code>010 0</code></td><td>1.0 &times; 2<sup>2</sup></td><td><b>4</b></td></tr>
      <tr><td><code>010 1</code></td><td>1.1 &times; 2<sup>2</sup></td><td><b>6</b></td></tr>
      <tr><td><code>011 0</code></td><td>1.0 &times; 2<sup>3</sup></td><td><b>8</b></td></tr>
      <tr><td><code>011 1</code></td><td>1.1 &times; 2<sup>3</sup></td><td><b>12</b></td></tr>
      <tr><td><code>100 0</code></td><td>1.0 &times; 2<sup>4</sup></td><td><b>16</b></td></tr>
      <tr><td><code>100 1</code></td><td>1.1 &times; 2<sup>4</sup></td><td><b>24</b></td></tr>
      <tr><td><code>101 0</code></td><td>1.0 &times; 2<sup>5</sup></td><td><b>32</b></td></tr>
      <tr><td><code>101 1</code></td><td>1.1 &times; 2<sup>5</sup></td><td><b>48</b></td></tr>
      <tr><td><code>110 0</code></td><td>1.0 &times; 2<sup>6</sup></td><td><b>64</b></td></tr>
      <tr><td><code>110 1</code></td><td>1.1 &times; 2<sup>6</sup></td><td><b>96</b></td></tr>
      <tr><td><code>111 0</code></td><td>1.0 &times; 2<sup>7</sup></td><td><b>128</b></td></tr>
      <tr><td><code>111 1</code></td><td>1.1 &times; 2<sup>7</sup></td><td><b>192</b></td></tr>
    </table>
    <p class="muted">Range up to 192, but only two values per power of two (1 and 1.5 &times; 2<sup>e</sup>), so the gaps are huge: 96, 128, 192.</p>
  </div>

  <h3>Side by side</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Format</th><th>Exp / Sig bits</th><th>Smallest</th><th>Largest</th><th>Step near 1</th></tr>
      <tr><td>V1</td><td>2 / 2</td><td>1</td><td>14</td><td>0.25</td></tr>
      <tr><td>V2</td><td>1 / 3</td><td>1</td><td>3.75</td><td>0.125</td></tr>
      <tr><td>V3</td><td>3 / 1</td><td>1</td><td>192</td><td>0.5</td></tr>
    </table>
  </div>

  <h3>Why not? Reason about it in this order</h3>

  <div class="card">
    <ol><li>Write the number in binary and normalize it: <code>1.<i>f</i> &times; 2<sup>e</sup></code>.</li><li><b>Exponent</b> too big (or, with no bias, negative)? &rarr; <b>not enough range</b>.</li><li><b>Significand</b> needs more bits than the format has? &rarr; <b>not enough precision</b>.</li><li>Otherwise it fits: write exponent then significand bits.</li></ol>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Moving one bit from the significand to the exponent generally&hellip;</div>
      <button class="opt" data-i="0">increases both range and precision</button>
      <button class="opt" data-i="1">increases range and decreases precision</button>
      <button class="opt" data-i="2">increases precision and decreases range</button>
      <button class="opt" data-i="3">changes neither</button>
      <div class="fb">Exponent bits set the range; significand bits set the precision. The total is fixed.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the largest value microfloat V3 can represent?</div>
      <input class="fillblank sm" data-answer="192">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1.1 &times; 2<sup>7</sup> = 192.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the largest value microfloat V2 can represent?</div>
      <input class="fillblank sm" data-answer="3.75">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1.111 &times; 2<sup>1</sup> = 11.11 = 3.75.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 12 in microfloat V3 (3 exponent bits, 1 significand bit).</div>
      <input class="fillblank sm" data-answer="0111~~~0b0111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">12 = 1.1 &times; 2<sup>3</sup> &rarr; exponent 011, significand 1 &rarr; <code>0111</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 1.125 in microfloat V2 (1 exponent bit, 3 significand bits).</div>
      <input class="fillblank sm" data-answer="0001~~~0b0001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1.125 = 1.001 &times; 2<sup>0</sup> &rarr; exponent 0, significand 001 &rarr; <code>0001</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>In V3, why can 1.75 not be stored?</div>
      <button class="opt" data-i="0">Not enough range</button>
      <button class="opt" data-i="1">Not enough precision: 1.75 = 1.11 needs two significand bits and V3 has one</button>
      <button class="opt" data-i="2">The exponent is negative</button>
      <button class="opt" data-i="3">It is not positive</button>
      <div class="fb">V3 only has <code>1.0</code> and <code>1.5</code> at each exponent.</div>
    </div>
  </div>
</section>

<section class="topic" id="l20-bias">
  <h2>CL13 &middot; Representing Small Values: the Bias (Microfloat V4)</h2>
  <div class="concept">V1&ndash;V3 can never store a value below 1, because the exponent field is unsigned. The fix is a <b>bias</b>: store <code>exponent + bias</code>, so the field can stand for <b>negative</b> exponents too. V4 keeps 2 exponent bits and 2 significand bits and uses <b>bias 2</b>, so exponents run &minus;2&hellip;1.</div>

  <div class="card">
    <p>Decoding: <code>value = 1.<i>sig</i> &times; 2<sup><i>exponent bits &minus; bias</i></sup></code>. Encoding: <code>exponent bits = exponent + bias</code>.</p>
<pre>Encode 0.75 = 0.11 = 1.1 &times; 2<sup>&minus;1</sup>   field = &minus;1 + 2 = 1 = 01, significand 10  &rarr;  <b>0110</b>
Encode 2.5  = 10.1 = 1.01 &times; 2<sup>1</sup>   field =  1 + 2 = 3 = 11, significand 01  &rarr;  <b>1101</b>
Decode 0111: field 01 = 1, 1.11 &times; 2<sup>1&minus;2</sup> = 0.111 = <b>0.875</b>
Decode 1110: field 11 = 3, 1.10 &times; 2<sup>3&minus;2</sup> = 11   = <b>3</b></pre>
  </div>

  <h3>Every V4 value</h3>

  <div class="card">
    <table class="cmp">
      <tr><th>Bits (exp sig)</th><th>Value form</th><th>Decimal</th></tr>
      <tr><td><code>00 00</code></td><td>1.00 &times; 2<sup>-2</sup></td><td><b>0.25</b></td></tr>
      <tr><td><code>00 01</code></td><td>1.01 &times; 2<sup>-2</sup></td><td><b>0.3125</b></td></tr>
      <tr><td><code>00 10</code></td><td>1.10 &times; 2<sup>-2</sup></td><td><b>0.375</b></td></tr>
      <tr><td><code>00 11</code></td><td>1.11 &times; 2<sup>-2</sup></td><td><b>0.4375</b></td></tr>
      <tr><td><code>01 00</code></td><td>1.00 &times; 2<sup>-1</sup></td><td><b>0.5</b></td></tr>
      <tr><td><code>01 01</code></td><td>1.01 &times; 2<sup>-1</sup></td><td><b>0.625</b></td></tr>
      <tr><td><code>01 10</code></td><td>1.10 &times; 2<sup>-1</sup></td><td><b>0.75</b></td></tr>
      <tr><td><code>01 11</code></td><td>1.11 &times; 2<sup>-1</sup></td><td><b>0.875</b></td></tr>
      <tr><td><code>10 00</code></td><td>1.00 &times; 2<sup>0</sup></td><td><b>1</b></td></tr>
      <tr><td><code>10 01</code></td><td>1.01 &times; 2<sup>0</sup></td><td><b>1.25</b></td></tr>
      <tr><td><code>10 10</code></td><td>1.10 &times; 2<sup>0</sup></td><td><b>1.5</b></td></tr>
      <tr><td><code>10 11</code></td><td>1.11 &times; 2<sup>0</sup></td><td><b>1.75</b></td></tr>
      <tr><td><code>11 00</code></td><td>1.00 &times; 2<sup>1</sup></td><td><b>2</b></td></tr>
      <tr><td><code>11 01</code></td><td>1.01 &times; 2<sup>1</sup></td><td><b>2.5</b></td></tr>
      <tr><td><code>11 10</code></td><td>1.10 &times; 2<sup>1</sup></td><td><b>3</b></td></tr>
      <tr><td><code>11 11</code></td><td>1.11 &times; 2<sup>1</sup></td><td><b>3.5</b></td></tr>
    </table>
  </div>

  <div class="card">
    <p><b>General bias:</b> for an exponent field of <i>n</i> bits, <code>bias = 2<sup>n&minus;1</sup> &minus; 1</code>. That gives almost equally many positive and negative exponents (one more negative). 2 bits &rarr; bias 1; 3 bits &rarr; bias 3. (V4 uses bias 2 just for this example.)</p>
    <p><b>Why bias and not two's complement for the exponent?</b> Comparisons become easy: with a biased exponent larger numbers have larger bit patterns, so you can compare floats as unsigned integers. With two's complement, negative exponents (leading 1s) would look <i>larger</i> than positive ones.</p>
  </div>

  <div class="card">
    <div id="l20-explorer2"></div>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode microfloat V4 <code>0111</code> (bias 2).</div>
      <input class="fillblank sm" data-answer="0.875">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Field 01 = 1, exponent 1 &minus; 2 = &minus;1: 1.11 &times; 2<sup>&minus;1</sup> = 0.111 = 0.875.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode microfloat V4 <code>1110</code> (bias 2).</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Field 11 = 3, exponent 3 &minus; 2 = 1: 1.10 &times; 2<sup>1</sup> = 11 = 3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 0.5 in microfloat V4 (bias 2).</div>
      <input class="fillblank sm" data-answer="0100~~~0b0100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0.5 = 1.0 &times; 2<sup>&minus;1</sup> &rarr; field &minus;1 + 2 = 1 = 01, significand 00 &rarr; <code>0100</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 3.5 in microfloat V4 (bias 2).</div>
      <input class="fillblank sm" data-answer="1111~~~0b1111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3.5 = 1.11 &times; 2<sup>1</sup> &rarr; field 3 = 11, significand 11 &rarr; <code>1111</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Can 0.125 be encoded in V4? Answer N/A, or the 4-bit encoding.</div>
      <input class="fillblank sm" data-answer="N/A~~~n/a~~~NA~~~none">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0.125 = 1.0 &times; 2<sup>&minus;3</sup>, but the smallest exponent is &minus;2: not enough range. <b>N/A</b>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the bias for an exponent field of 3 bits?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2<sup>3&minus;1</sup> &minus; 1 = 3.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is the main advantage of a biased exponent over a two's complement exponent?</div>
      <button class="opt" data-i="0">It uses fewer bits</button>
      <button class="opt" data-i="1">Floating-point numbers can be compared like unsigned integers</button>
      <button class="opt" data-i="2">It removes the sign bit</button>
      <button class="opt" data-i="3">It gives more significand bits</button>
      <div class="fb">Biased exponents grow with the value, so bigger numbers have bigger bit patterns.</div>
    </div>
  </div>
</section>

<section class="topic" id="l20-rd11">
  <h2>RD11 Self-Check &middot; Microfloat V1</h2>
  <p class="muted">The RD11 reading shows slides on fixed point, normalized form and microfloat V1, then asks &ldquo;can this value be represented in microfloat V1, and what is the encoding?&rdquo; These are fresh questions of the same kind, with real V1 numbers.</p>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q1</span>Can <b>4</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="1000~~~0b1000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4 = 100 = 1.0 &times; 2<sup>2</sup>: fits, encoding <code>1000</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2</span>Can <b>1.25</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="0001~~~0b0001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1.25 = 1.01 = 1.01 &times; 2<sup>0</sup>: fits, encoding <code>0001</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3</span>Can <b>4.5</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="N/A~~~n/a~~~NA~~~none">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">4.5 needs more than two significand bits &mdash; <b>not enough precision</b> (N/A).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q4</span>Can <b>15</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="N/A~~~n/a~~~NA~~~none">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">15 is outside what a 2-bit unsigned exponent can reach &mdash; <b>not enough range</b> (N/A).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q5</span>Can <b>10</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="1101~~~0b1101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">10 = 1010 = 1.01 &times; 2<sup>3</sup>: fits, encoding <code>1101</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q6</span>Can <b>7.5</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="N/A~~~n/a~~~NA~~~none">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">7.5 needs more than two significand bits &mdash; <b>not enough precision</b> (N/A).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q7</span>Can <b>3.25</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="N/A~~~n/a~~~NA~~~none">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3.25 needs more than two significand bits &mdash; <b>not enough precision</b> (N/A).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q8</span>Can <b>20</b> be represented in microfloat V1? If so write its 4-bit encoding (like <code>0b0000</code>), otherwise write <code>N/A</code>.</div>
      <input class="fillblank sm" data-answer="N/A~~~n/a~~~NA~~~none">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">20 is outside what a 2-bit unsigned exponent can reach &mdash; <b>not enough range</b> (N/A).</div>
    </div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q9</span>Which pair correctly describes why 4.5 and 16 fail in V1?</div>
      <button class="opt" data-i="0">4.5: not enough range; 16: not enough precision</button>
      <button class="opt" data-i="1">4.5: not enough precision; 16: not enough range</button>
      <button class="opt" data-i="2">both: not enough precision</button>
      <button class="opt" data-i="3">both: not enough range</button>
      <div class="fb">4.5 = 1.001 &times; 2<sup>2</sup> (needs a third significand bit); 16 = 1.0 &times; 2<sup>4</sup> (exponent 4 does not fit in two bits).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q10</span>In normalized form, which digit is never stored?</div>
      <button class="opt" data-i="0">The sign</button>
      <button class="opt" data-i="1">The leading 1 before the binary point</button>
      <button class="opt" data-i="2">The exponent</button>
      <button class="opt" data-i="3">The last significand bit</button>
      <div class="fb">It is the implicit 1.</div>
    </div>
  </div>
</section>

</main>
`;
fpExplorer('l20-explorer', [
  { name: 'V1 (2e,2m)', sb: 0, eb: 2, mb: 2, bias: 0, special: false },
  { name: 'V2 (1e,3m)', sb: 0, eb: 1, mb: 3, bias: 0, special: false },
  { name: 'V3 (3e,1m)', sb: 0, eb: 3, mb: 1, bias: 0, special: false },
  { name: 'V4 (2e,2m, bias 2)', sb: 0, eb: 2, mb: 2, bias: 2, special: false }
]);
fpExplorer('l20-explorer2', [{ name: 'V4 (bias 2)', sb: 0, eb: 2, mb: 2, bias: 2, special: false }], '0110');
