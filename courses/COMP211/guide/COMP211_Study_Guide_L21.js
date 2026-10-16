/* ============================================================
   LESSON 21 — CL14 Floating Point II (bias, 8-bit minifloat, special values, rounding,
   denormalized numbers), incl. RD12. Pairs with Mastery unit u21.
   Injects into #l21. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l21').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l21-bias')">1 &middot; Bias &amp; the Minifloat</button>
  <button onclick="showTopic(this,'l21-encode')">2 &middot; Encoding</button>
  <button onclick="showTopic(this,'l21-special')">3 &middot; Zero, Infinity &amp; NaN</button>
  <button onclick="showTopic(this,'l21-round')">4 &middot; Rounding, Overflow &amp; Underflow</button>
  <button onclick="showTopic(this,'l21-denorm')">5 &middot; Denormalized Numbers</button>
  <button onclick="showTopic(this,'l21-rd12')">RD12 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l21-bias">
  <h2>CL14 &middot; The Bias and the 8-bit Minifloat</h2>
  <div class="concept"><b>Bias.</b> To represent negative exponents we store <code>exponent + bias</code>. For an exponent field of <i>n</i> bits, <code>bias = 2<sup>n&minus;1</sup> &minus; 1</code>. With 3 exponent bits the bias is <b>3</b>, the field runs 0&ndash;7 and the true exponent runs &minus;3&hellip;4. (Slight asymmetry: one more negative exponent than positive.) A biased exponent also lets you compare floats as unsigned integers; two's complement exponents would break that ordering.</div>

  <div class="card">
    <p><b>Minifloat layout (8 bits):</b></p>
<pre>bit:   7      6 5 4          3 2 1 0
       s      e e e          f f f f
     sign   exponent       significand
            (bias 3)       (implicit leading 1)

normalized value = (&minus;1)<sup>s</sup> &times; 1.ffff &times; 2<sup>eee &minus; 3</sup></pre>
  </div>

  <div class="card">
<pre>0 101 1011   s=0, eee=5 &rarr; exponent 5&minus;3 = 2, 1.1011 &times; 2<sup>2</sup> = 110.11 = <b>6.75</b>
1 001 1000   s=1, eee=1 &rarr; exponent 1&minus;3 = &minus;2, &minus;1.1 &times; 2<sup>&minus;2</sup> = &minus;0.011 = <b>&minus;0.375</b></pre>
  </div>

  <h3>Explorer</h3>

  <div class="card">
    <div id="l21-explorer"></div>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the bias for a 3-bit exponent field?</div>
      <input class="fillblank sm" data-answer="3">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2<sup>3&minus;1</sup> &minus; 1 = 3.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the bias for a 2-bit exponent field?</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2<sup>2&minus;1</sup> &minus; 1 = 1.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode minifloat <code>0 100 0000</code> (decimal).</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent field 4 &minus; 3 = 1: 1.0 &times; 2<sup>1</sup> = 2.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode minifloat <code>0 101 0110</code> (decimal).</div>
      <input class="fillblank sm" data-answer="5.5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent 5 &minus; 3 = 2: 1.0110 &times; 2<sup>2</sup> = 101.10 = 5.5.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode minifloat <code>1 011 1000</code> (decimal).</div>
      <input class="fillblank sm" data-answer="-1.5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Sign 1, exponent 3 &minus; 3 = 0: &minus;1.1 &times; 2<sup>0</sup> = &minus;1.5.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why use a biased exponent instead of two's complement?</div>
      <button class="opt" data-i="0">It saves a bit</button>
      <button class="opt" data-i="1">Larger numbers get larger bit patterns, so floats compare like unsigned integers</button>
      <button class="opt" data-i="2">It makes the significand larger</button>
      <button class="opt" data-i="3">Two's complement cannot store negatives</button>
      <div class="fb">With two's complement, negative exponents have leading 1s and would look larger than positive ones.</div>
    </div>
  </div>
</section>

<section class="topic" id="l21-encode">
  <h2>CL14 &middot; Encoding a Value in Minifloat</h2>
  <div class="concept"><b>Procedure:</b> (1) sign bit; (2) write |value| in binary and normalize to <code>1.f &times; 2<sup>e</sup></code>; (3) exponent field = e + 3; (4) store the fraction bits after the point (without the leading 1); (5) if the field is not in the valid range or the fraction does not fit, see <i>special values</i> and <i>rounding</i> in the next tabs.</div>

  <div class="card">
    <p>The four slide examples:</p>
<pre><b>15</b>      = 1111       = 1.111 &times; 2<sup>3</sup>        field 3+3 = 6 = 110  &rarr; <b>0 110 1110</b>
<b>&minus;4.25</b>   = &minus;100.01   = &minus;1.0001 &times; 2<sup>2</sup>    field 2+3 = 5 = 101  &rarr; <b>1 101 0001</b>
<b>&minus;32</b>     = &minus;100000   = &minus;1 &times; 2<sup>5</sup>         field 5+3 = 8 = 1000 &rarr; too big for 3 bits: <b>not enough range</b>
<b>12.25</b>   = 1100.01    = 1.10001 &times; 2<sup>3</sup>     needs 5 fraction bits: <b>not enough precision</b> (must round)</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 6.75 in the minifloat. Answer like <code>0b0101_1011</code>.</div>
      <input class="fillblank sm" data-answer="01011011~~~0b01011011~~~0101_1011~~~0b0101_1011~~~0_101_1011~~~0b0_101_1011~~~0 101 1011">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6.75 = 110.11 = 1.1011 &times; 2<sup>2</sup>; field 2 + 3 = 5 = 101: <code>0 101 1011</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 1 in the minifloat.</div>
      <input class="fillblank sm" data-answer="00110000~~~0b00110000~~~0011_0000~~~0b0011_0000~~~0_011_0000~~~0b0_011_0000~~~0 011 0000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1 = 1.0 &times; 2<sup>0</sup>; field 0 + 3 = 3 = 011: <code>0 011 0000</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode &minus;2.5 in the minifloat.</div>
      <input class="fillblank sm" data-answer="11000100~~~0b11000100~~~1100_0100~~~0b1100_0100~~~1_100_0100~~~0b1_100_0100~~~1 100 0100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2.5 = 10.1 = 1.01 &times; 2<sup>1</sup>; field 4 = 100; sign 1: <code>1 100 0100</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 0.75 in the minifloat.</div>
      <input class="fillblank sm" data-answer="00101000~~~0b00101000~~~0010_1000~~~0b0010_1000~~~0_010_1000~~~0b0_010_1000~~~0 010 1000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0.75 = 0.11 = 1.1 &times; 2<sup>&minus;1</sup>; field &minus;1 + 3 = 2 = 010: <code>0 010 1000</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode &minus;15.5 in the minifloat.</div>
      <input class="fillblank sm" data-answer="11101111~~~0b11101111~~~1110_1111~~~0b1110_1111~~~1_110_1111~~~0b1_110_1111~~~1 110 1111">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">15.5 = 1111.1 = 1.1111 &times; 2<sup>3</sup>; field 6 = 110; the largest finite magnitude: <code>1 110 1111</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>The exponent field for a value with true exponent &minus;2 is&hellip;</div>
      <button class="opt" data-i="0">000</button>
      <button class="opt" data-i="1">001</button>
      <button class="opt" data-i="2">101</button>
      <button class="opt" data-i="3">011</button>
      <div class="fb">&minus;2 + 3 = 1 = <code>001</code>.</div>
    </div>
  </div>
</section>

<section class="topic" id="l21-special">
  <h2>CL14 &middot; Special Values: Zero, Infinity and NaN</h2>
  <div class="concept">A few bit patterns are <b>reserved</b> for special cases. Normalized numbers use exponent fields <code>001</code>&ndash;<code>110</code> (1&ndash;6); the two extreme exponent fields are special.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>Value</th><th>Exponent bits</th><th>Significand bits</th></tr>
      <tr><td>Normalized number</td><td>neither all zeros nor all ones</td><td>anything</td></tr>
      <tr><td>Zero</td><td>all zeros</td><td>all zeros</td></tr>
      <tr><td>Infinity</td><td>all ones</td><td>all zeros</td></tr>
      <tr><td>NaN</td><td>all ones</td><td>nonzero</td></tr>
      <tr><td>Denormalized number</td><td>all zeros</td><td>nonzero</td></tr>
    </table>
    <pre>+0   = 0 000 0000        &minus;0 = 1 000 0000
+Inf = 0 111 0000        &minus;Inf = 1 111 0000
NaN  = x 111 (any nonzero significand), e.g. 0 111 0101</pre>
  </div>

  <div class="card">
    <p><b>NaN (Not a Number)</b> is the result of undefined or unrepresentable operations such as <code>0/0</code>, <code>&infin;/&infin;</code>, &radic;&minus;1 or log(&minus;5). It <b>propagates</b>: if <code>x</code> is NaN then <code>x + 5</code> is NaN, so an error is not silently lost. There are <b>many</b> NaN encodings so programs can tell different error sources apart.</p>
    <p>The largest <i>finite</i> value is therefore <code>0 110 1111</code> = 1.1111 &times; 2<sup>3</sup> = <b>15.5</b>, and the smallest positive normalized value is <code>0 001 0000</code> = 1.0 &times; 2<sup>&minus;2</sup> = <b>0.25</b>.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode <code>0 111 0000</code> (write +Inf, -Inf or NaN as appropriate).</div>
      <input class="fillblank sm" data-answer="+Inf~~~inf~~~infinity~~~+infinity">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent all ones with a zero significand is +&infin;.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode <code>1 111 0000</code>.</div>
      <input class="fillblank sm" data-answer="-Inf~~~-inf~~~-infinity">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Sign 1, exponent all ones, significand zero: &minus;&infin;.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode <code>0 111 0101</code>.</div>
      <input class="fillblank sm" data-answer="NaN~~~nan">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent all ones with a <b>nonzero</b> significand is NaN.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the largest finite minifloat value?</div>
      <input class="fillblank sm" data-answer="15.5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>0 110 1111</code> = 1.1111 &times; 2<sup>3</sup> = 15.5.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>What happens to NaN in <code>NaN + 5</code>?</div>
      <button class="opt" data-i="0">5</button>
      <button class="opt" data-i="1">0</button>
      <button class="opt" data-i="2">NaN</button>
      <button class="opt" data-i="3">&infin;</button>
      <div class="fb">NaN propagates through calculations so the error is not lost.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why does the format have many different NaN encodings?</div>
      <button class="opt" data-i="0">Hardware bugs</button>
      <button class="opt" data-i="1">So different error sources can be distinguished</button>
      <button class="opt" data-i="2">To store extra digits of pi</button>
      <button class="opt" data-i="3">They are all positive infinity</button>
      <div class="fb">Any nonzero significand with an all-ones exponent is a NaN, so a program can tag why the result is undefined.</div>
    </div>
    <div class="q" data-multi="0,2,3">
      <div class="prompt"><span class="tag">Check</span>Select <b>all</b> correct statements.</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> Exponent all ones and significand zero is infinity</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> Exponent all zeros and significand zero is NaN</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> Exponent all zeros and significand nonzero is denormalized</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> Normalized numbers use exponent fields 1 through 6</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb">All-zeros exponent with a zero significand is <b>zero</b>, not NaN.</div>
    </div>
  </div>
</section>

<section class="topic" id="l21-round">
  <h2>CL14 &middot; Rounding, Overflow and Underflow</h2>
  <div class="concept">If a value cannot be represented exactly, the hardware stores the <b>closest representable value</b>. If it is in range but needs more fraction bits it is <b>rounded</b>; if its magnitude is too large it <b>overflows</b> to &plusmn;infinity; if it is so close to zero that nothing smaller exists it <b>underflows</b> (to zero, or to a denormal).</div>

  <div class="card">
    <p><b>Round to nearest, ties to even:</b> pick the nearest candidate; if the value is exactly halfway between two candidates, pick the one whose <b>last significand bit is 0</b> (even).</p>
<pre><b>12.25</b>  = 1.10001 &times; 2<sup>3</sup>
        neighbours: 1.1000 &times; 2<sup>3</sup> = 12.0   and   1.1001 &times; 2<sup>3</sup> = 12.5
        exactly halfway &rarr; ties-to-even &rarr; <b>12.0</b>   (0 110 1000)

<b>5.3125</b> = 1.010101 &times; 2<sup>2</sup>
        neighbours: 5.25 and 5.5;  5.3125 &minus; 5.25 = 0.0625  vs  5.5 &minus; 5.3125 = 0.1875
        nearer to 5.25 &rarr; <b>5.25</b>   (0 101 0101)

<b>5.125</b>  = 1.01001 &times; 2<sup>2</sup>
        neighbours: 5.0 (1.0100) and 5.25 (1.0101); exactly halfway
        &rarr; ties-to-even picks 1.0100 = <b>5.0</b>   (0 101 0100)</pre>
  </div>

  <div class="card">
<pre>Overflow:  &minus;32 &rarr; &minus;1 &times; 2<sup>5</sup> needs field 8 &rarr; stored as &minus;Inf = 1 111 0000
Underflow: a value smaller than every denormal rounds to 0</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What value is actually stored when you encode 12.25 in the minifloat?</div>
      <input class="fillblank sm" data-answer="12">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">12.25 is halfway between 12.0 and 12.5; ties-to-even gives 12.0.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What value is stored for 5.3125?</div>
      <input class="fillblank sm" data-answer="5.25">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Closer to 5.25 (0.0625 away) than to 5.5 (0.1875 away).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What value is stored for 5.125?</div>
      <input class="fillblank sm" data-answer="5">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">An exact tie between 5.0 and 5.25; ties-to-even picks 5.0 (last bit 0).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What value is stored for 9.1?</div>
      <input class="fillblank sm" data-answer="9">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Above 8 the spacing is 0.5 (9.0, 9.5). 9.1 is closer to 9.0.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 6.1875 (= 110.0011) in the minifloat.</div>
      <input class="fillblank sm" data-answer="01011001~~~0b01011001~~~0101_1001~~~0b0101_1001~~~0_101_1001~~~0b0_101_1001~~~0 101 1001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">6.1875 = 1.100011 &times; 2<sup>2</sup>. The extra bits <code>11</code> are over half a unit in the last place, so round up to 1.1001 = 6.25: <code>0 101 1001</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does 100 become in the minifloat? (decimal; +Inf, -Inf or NaN as appropriate)</div>
      <input class="fillblank sm" data-answer="+Inf~~~inf~~~infinity">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">100 exceeds the largest finite value (15.5), so it overflows to +Inf.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which statement about 12.25 in the minifloat is true?</div>
      <button class="opt" data-i="0">It is stored exactly</button>
      <button class="opt" data-i="1">It is a tie between 12.0 and 12.5, so it is stored as 12.0</button>
      <button class="opt" data-i="2">It overflows</button>
      <button class="opt" data-i="3">It becomes NaN</button>
      <div class="fb">Round to nearest, ties to even.</div>
    </div>
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Check</span>Underflow is when&hellip;</div>
      <button class="opt" data-i="0">a value is too large to represent</button>
      <button class="opt" data-i="1">an operation is undefined</button>
      <button class="opt" data-i="2">a value is too close to zero to represent and becomes zero (or a denormal)</button>
      <button class="opt" data-i="3">the sign bit is wrong</button>
      <div class="fb">Overflow is too large; underflow is too small in magnitude.</div>
    </div>
  </div>
</section>

<section class="topic" id="l21-denorm">
  <h2>CL14 &middot; Denormalized Numbers</h2>
  <div class="concept"><b>The gap problem.</b> The smallest positive normalized minifloat is <code>0 001 0000</code> = 0.25, and the next is 0.265625 (a step of 1/64). But between 0 and 0.25 there is <b>nothing</b>: the implicit 1 that buys precision also leaves a big hole around zero.</div>

  <div class="card">
    <p><b>Denormalized numbers</b> (exponent field <b>all zeros</b>, significand <b>nonzero</b>) fill the hole by <b>dropping the hidden 1</b> and using a <b>fixed exponent</b> of <code>1 &minus; bias</code> (= &minus;2 for bias 3):</p>
    <pre>value = (&minus;1)<sup>s</sup> &times; 0.ffff &times; 2<sup>1 &minus; bias</sup> = (&minus;1)<sup>s</sup> &times; 0.ffff &times; 2<sup>&minus;2</sup></pre>
<pre>0 000 0001 = 0.0001 &times; 2<sup>&minus;2</sup> = 2<sup>&minus;6</sup> = 1/64 = <b>0.015625</b>   (smallest positive denormal)
0 000 1111 = 0.1111 &times; 2<sup>&minus;2</sup> = 15/64   = <b>0.234375</b>   (largest denormal)</pre>
    <p>The largest denormal (0.234375) is exactly one 1/64 step below the smallest normalized value (0.25), so the number line is continuous with evenly spaced values near zero.</p>
  </div>

  <div class="card">
    <table class="cmp">
      <tr><th>Pattern</th><th>Kind</th><th>Value</th></tr>
      <tr><td>0 000 0000</td><td>zero</td><td>0</td></tr>
      <tr><td>0 000 0001</td><td>denormalized</td><td>0.015625</td></tr>
      <tr><td>0 000 1000</td><td>denormalized</td><td>0.125</td></tr>
      <tr><td>0 000 1111</td><td>denormalized</td><td>0.234375</td></tr>
      <tr><td>0 001 0000</td><td>normalized</td><td>0.25</td></tr>
      <tr><td>0 001 0001</td><td>normalized</td><td>0.265625</td></tr>
    </table>
  </div>

  <h3>Normalized or denormalized? Encoding steps</h3>

  <div class="card">
    <p>Try normalized first. If the exponent field (e + bias) is <b>&le; 0</b>, the value is too small to be normalized: divide by 2<sup>&minus;2</sup> (i.e. multiply by 4) and write the result as <code>0.ffff</code> for a denormalized encoding.</p>
<pre>1/32 = 1.0 &times; 2<sup>&minus;5</sup>:  field &minus;5+3 = &minus;2 &le; 0 &rarr; denormalized.
       (1/32) &times; 4 = 1/8 = 0.0010   &rarr;  <b>0 000 0010</b>     (check: 0.0010 &times; 2<sup>&minus;2</sup> = 1/8 &times; 1/4 = 1/32)
&minus;3/8 = &minus;1.1 &times; 2<sup>&minus;2</sup>:  field &minus;2+3 = 1 &rarr; normalized  &rarr;  <b>1 001 1000</b></pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode <code>0 000 0100</code> (decimal).</div>
      <input class="fillblank sm" data-answer="0.0625">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Denormalized: 0.0100 &times; 2<sup>&minus;2</sup> = 0.25 &times; 0.25 = 1/16 = 0.0625.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode <code>0 000 1111</code> (decimal).</div>
      <input class="fillblank sm" data-answer="0.234375">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0.1111 &times; 2<sup>&minus;2</sup> = 15/16 &times; 1/4 = 15/64 = 0.234375.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What exponent do denormalized minifloat values use?</div>
      <input class="fillblank sm" data-answer="-2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Fixed: 1 &minus; bias = 1 &minus; 3 = &minus;2.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 1/16 in the minifloat.</div>
      <input class="fillblank sm" data-answer="00000100~~~0b00000100~~~0000_0100~~~0b0000_0100~~~0_000_0100~~~0b0_000_0100~~~0 000 0100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1/16 is below 0.25: denormalized. 0.0625 / 2<sup>&minus;2</sup> = 0.25 = 0.0100 &rarr; <code>0 000 0100</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode &minus;9/64 in the minifloat.</div>
      <input class="fillblank sm" data-answer="10001001~~~0b10001001~~~1000_1001~~~0b1000_1001~~~1_000_1001~~~0b1_000_1001~~~1 000 1001">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">9/64 = 0.140625; &divide; 2<sup>&minus;2</sup> = 0.5625 = 0.1001 &rarr; <code>1 000 1001</code>.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why do denormalized numbers drop the implicit 1?</div>
      <button class="opt" data-i="0">To add more range at the top</button>
      <button class="opt" data-i="1">To place values between zero and the smallest normalized number</button>
      <button class="opt" data-i="2">To make NaNs</button>
      <button class="opt" data-i="3">To save a bit</button>
      <div class="fb">Without the hidden 1 the significand can be smaller than 1, filling the gap near zero.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>The smallest positive normalized value is 0.25. What is the next <i>smaller</i> positive value?</div>
      <button class="opt" data-i="0">0.234375 (the largest denormal)</button>
      <button class="opt" data-i="1">0.125</button>
      <button class="opt" data-i="2">0.1</button>
      <button class="opt" data-i="3">0</button>
      <div class="fb">Denormals run up to 15/64 = 0.234375, then 0.25 begins.</div>
    </div>
  </div>
</section>

<section class="topic" id="l21-rd12">
  <h2>RD12 Self-Check &middot; Minifloat</h2>
  <p class="muted">The RD12 reading slides cover the minifloat and then ask whether each value can be represented, and its encoding. These are fresh values of the same kind (format <code>0b0000_0000</code>, or N/A).</p>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q1</span>Encode <b>7.5</b> in the minifloat. If it cannot be represented <i>exactly</i>, write the encoding of the value the hardware actually stores (round to nearest, ties to even; in range).</div>
      <input class="fillblank sm" data-answer="01011110~~~0b01011110~~~0101_1110~~~0b0101_1110~~~0_101_1110~~~0b0_101_1110~~~0 101 1110">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">7.5 fits: <code>0 101 1110</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2</span>Encode <b>-9.5</b> in the minifloat. If it cannot be represented <i>exactly</i>, write the encoding of the value the hardware actually stores (round to nearest, ties to even; in range).</div>
      <input class="fillblank sm" data-answer="11100011~~~0b11100011~~~1110_0011~~~0b1110_0011~~~1_110_0011~~~0b1_110_0011~~~1 110 0011">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">-9.5 fits: <code>1 110 0011</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3</span>Encode <b>31</b> in the minifloat. If it cannot be represented <i>exactly</i>, write the encoding of the value the hardware actually stores (round to nearest, ties to even; out of range becomes infinity).</div>
      <input class="fillblank sm" data-answer="01110000~~~0b01110000~~~0111_0000~~~0b0111_0000~~~0_111_0000~~~0b0_111_0000~~~0 111 0000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">|31| exceeds 15.5, so there is not enough range (overflow to infinity).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q4</span>Encode <b>3.0625</b> in the minifloat. If it cannot be represented <i>exactly</i>, write the encoding of the value the hardware actually stores (round to nearest, ties to even; in range).</div>
      <input class="fillblank sm" data-answer="01001000~~~0b01001000~~~0100_1000~~~0b0100_1000~~~0_100_1000~~~0b0_100_1000~~~0 100 1000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3.0625 needs more fraction bits than four; it can only be stored after rounding to 3 (<code>0 100 1000</code>).</div>
    </div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Q5</span>Which value is represented by <code>0 110 1110</code>?</div>
      <button class="opt" data-i="0">14</button>
      <button class="opt" data-i="1">15</button>
      <button class="opt" data-i="2">15.5</button>
      <button class="opt" data-i="3">16</button>
      <div class="fb">1.1110 &times; 2<sup>3</sup> = 1111 = 15.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q6</span>Which best describes <code>1 101 0001</code>?</div>
      <button class="opt" data-i="0">&minus;4.25</button>
      <button class="opt" data-i="1">+4.25</button>
      <button class="opt" data-i="2">&minus;2.125</button>
      <button class="opt" data-i="3">&minus;8.5</button>
      <div class="fb">Sign 1; exponent 5 &minus; 3 = 2; &minus;1.0001 &times; 2<sup>2</sup> = &minus;100.01 = &minus;4.25.</div>
    </div>
  </div>
</section>

</main>
`;
fpExplorer('l21-explorer', [{ name: 'Minifloat (1-3-4, bias 3)', sb: 1, eb: 3, mb: 4, bias: 3, special: true }], '01101110');
