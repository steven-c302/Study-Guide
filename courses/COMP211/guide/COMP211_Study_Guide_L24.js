/* ============================================================
   LESSON 24 — CL15 Floating Point III (denormal exponent, IEEE-754, rounding error, epsilon
   comparison, absorption, FP16/BF16), incl. RD13. Pairs with Mastery unit u24.
   Injects into #l24. Loaded BEFORE the shared engine.
   NOTE: a literal backslash inside the template literal must be
   written \\ .
   ============================================================ */
document.getElementById('l24').innerHTML = `
<nav class="topics">
  <button class="active" onclick="showTopic(this,'l24-denorm')">1 &middot; Denormals Revisited</button>
  <button onclick="showTopic(this,'l24-ieee')">2 &middot; IEEE-754</button>
  <button onclick="showTopic(this,'l24-round')">3 &middot; Rounding Errors &amp; Equality</button>
  <button onclick="showTopic(this,'l24-absorb')">4 &middot; The Absorption Exercise</button>
  <button onclick="showTopic(this,'l24-llm')">5 &middot; FP16, BF16 &amp; LLMs</button>
  <button onclick="showTopic(this,'l24-rd13')">RD13 Self-Check</button>
</nav>
<main>

<section class="topic active" id="l24-denorm">
  <h2>CL15 &middot; Denormalized Numbers: Exponent 1 &minus; bias, Implicit 0</h2>
  <div class="concept">Last lecture introduced denormals; this one explains <b>why they line up</b>. A normalized value is <code>exponent = field &minus; bias</code> with an <b>implicit 1</b>. The smallest normalized field is <code>001</code>, so its exponent is <code>1 &minus; 3 = &minus;2</code>. When the field is <code>000</code> the exponent is <b>defined</b> as <code>1 &minus; bias</code> (also &minus;2), but the leading bit becomes an <b>implicit 0</b>.</div>

  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Exponent field</th><th>Form</th><th>Example</th></tr>
      <tr><td>Smallest normalized</td><td><code>001</code></td><td><code>1.xxxx &times; 2<sup>&minus;2</sup></code></td><td><code>0 001 0000</code> = 1.0 &times; 2<sup>&minus;2</sup> = 16/64</td></tr>
      <tr><td>All subnormals</td><td><code>000</code></td><td><code>0.xxxx &times; 2<sup>&minus;2</sup></code></td><td><code>0 000 1111</code> = 0.1111 &times; 2<sup>&minus;2</sup> = 15/64</td></tr>
    </table>
    <p>Both use 2<sup>&minus;2</sup>; <b>the only change is the implicit leading bit</b>. That makes the hand-off smooth: the largest subnormal is 15/16 &times; 1/4 = <b>15/64</b>, the smallest normalized is <b>16/64</b>, exactly one 1/64 step apart.</p>
  </div>

  <div class="card">
<pre>...  13/64   14/64   15/64 (largest denormal)  |  16/64 (smallest normalized)   17/64   18/64 ...
<------------ spacing 1/64 on both sides of the boundary ------------></pre>
  </div>

  <h3>Encode a small value: normalized or denormalized?</h3>

  <div class="card">
    <p>Try normalized first. If <code>exponent + bias &le; 0</code> the value is too small: divide by 2<sup>&minus;2</sup> and write the result as <code>0.ffff</code>.</p>
<pre>1/32  : 1.0 &times; 2<sup>&minus;5</sup> &rarr; field &minus;2 &le; 0 &rarr; <b>denormalized</b>; (1/32)&times;4 = 0.125 = 0.0010 &rarr; 0 000 0010
&minus;3/8  : &minus;1.1 &times; 2<sup>&minus;2</sup> &rarr; field 1 &rarr; <b>normalized</b> &rarr; 1 001 1000
9/64  : 0.001001 &rarr; field &le; 0 &rarr; <b>denormalized</b>; (9/64)&times;4 = 0.5625 = 0.1001 &rarr; 0 000 1001
&minus;3/4  : &minus;1.1 &times; 2<sup>&minus;1</sup> &rarr; field 2 &rarr; <b>normalized</b> &rarr; 1 010 1000</pre>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What exponent do minifloat denormals use?</div>
      <input class="fillblank sm" data-answer="-2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Fixed at <code>1 &minus; bias</code> = 1 &minus; 3 = &minus;2.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>The largest denormal is 0 000 1111. Give its value as a fraction over 64 (like 5/64).</div>
      <input class="fillblank sm" data-answer="15/64">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">0.1111 &times; 2<sup>&minus;2</sup> = 15/16 &times; 1/4 = 15/64.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Is 3/32 normalized or denormalized in the minifloat? (answer normalized or denormalized)</div>
      <input class="fillblank sm" data-answer="denormalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">3/32 = 0.09375 = 1.5 &times; 2<sup>&minus;4</sup>, so the exponent field would be &minus;4 + 3 = &minus;1 &le; 0: it is <b>denormalized</b> (0.09375 &times; 4 = 0.375 = 0.0110).</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What differs between the smallest normalized number and the denormalized numbers?</div>
      <button class="opt" data-i="0">The exponent used</button>
      <button class="opt" data-i="1">The implicit leading bit (1 vs 0)</button>
      <button class="opt" data-i="2">The number of fraction bits</button>
      <button class="opt" data-i="3">The sign convention</button>
      <div class="fb">Both use 2<sup>&minus;2</sup>; normalized has implicit 1, denormalized implicit 0.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>What is the gap between the largest denormal and the smallest normalized value?</div>
      <button class="opt" data-i="0">1/64</button>
      <button class="opt" data-i="1">1/16</button>
      <button class="opt" data-i="2">0.25</button>
      <button class="opt" data-i="3">There is a hole</button>
      <div class="fb">15/64 to 16/64 &mdash; the same spacing as inside the denormal range.</div>
    </div>
  </div>

  <div class="card">
    <h3>Denorm Exponent Guide: three designs for exponent field 000</h3>
    <p>Minifloat with 3 exponent bits (bias 3) and 4 fraction bits. What should the all-zeros exponent field mean?</p>
    <table class="cmp">
      <tr><th>Design</th><th>Exponent field 000 means</th><th>Smallest positive</th><th>Result</th></tr>
      <tr><td>1 &middot; no denormals</td><td>normal, exponent &minus;3</td><td>1/8</td><td>big gap between 0 and 1/8 (abrupt underflow)</td></tr>
      <tr><td>2 &middot; denormals, exponent &minus;3 (&minus;bias)</td><td>0.f &times; 2<sup>&minus;3</sup></td><td>1/128</td><td>reaches closest to 0, but a gap from 15/128 to 1/4</td></tr>
      <tr><td>3 &middot; denormals, exponent &minus;2 (1 &minus; bias)</td><td>0.f &times; 2<sup>&minus;2</sup></td><td>1/64</td><td>no gap: 15/64 is directly followed by 16/64</td></tr>
    </table>
    <p>Design 3 is the real rule. The trade-off: it cannot get as close to zero as Design 2, but the number line stays evenly spaced around the smallest normalized value.</p>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which design has a gap between its largest denormal and its smallest normalized value?</div>
      <button class="opt" data-i="0">Design 1 only</button>
      <button class="opt" data-i="1">Design 2 (exponent &minus;bias)</button>
      <button class="opt" data-i="2">Design 3 (exponent 1 &minus; bias)</button>
      <button class="opt" data-i="3">All of them</button>
      <div class="fb">Design 2 jumps from 15/128 to 1/4. Design 3 is continuous; Design 1 has no denormals at all (its gap is between 0 and 1/8).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>A format has 4 exponent bits with bias 7. What exponent do denormalized numbers use?</div>
      <input class="fillblank sm" data-answer="-6~~~2^-6">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1 &minus; bias = 1 &minus; 7 = &minus;6.</div>
    </div>
  </div>
</section>

<section class="topic" id="l24-ieee">
  <h2>CL15 &middot; IEEE-754: float and double</h2>
  <div class="concept"><b>IEEE-754</b> (1985) is the floating-point standard virtually all hardware uses. It is the minifloat design scaled up: <b>single precision</b> (<code>float</code>, 32 bits) and <b>double precision</b> (<code>double</code>, 64 bits).</div>

  <div class="card">
    <table class="cmp">
      <tr><th></th><th>Single (float)</th><th>Double (double)</th></tr>
      <tr><td>Total bits</td><td>32</td><td>64</td></tr>
      <tr><td>Sign bits</td><td>1</td><td>1</td></tr>
      <tr><td>Exponent bits</td><td>8</td><td>11</td></tr>
      <tr><td>Bias</td><td>127</td><td>1023</td></tr>
      <tr><td>Fraction (significand) bits</td><td>23</td><td>52</td></tr>
      <tr><td>Range / precision</td><td>smaller / less accurate</td><td>larger / more accurate</td></tr>
      <tr><td>Storage / speed</td><td>less space, faster</td><td>more space, slower</td></tr>
    </table>
    <p>The special-value table is unchanged: exponent <b>all ones</b> &rarr; &plusmn;&infin; (fraction 0) or NaN (fraction &ne; 0); exponent <b>all zeros</b> &rarr; &plusmn;0 or denormalized.</p>
  </div>

  <div class="card">
    <p>The <b>FPU</b> (floating-point unit) is circuitry inside the processor that adds, subtracts, multiplies, divides and takes square roots directly in hardware using these rules, so the same calculation behaves the same on different machines (at the same precision).</p>
  </div>

  <h3>Explorer</h3>

  <div class="card">
    <div id="l24-explorer"></div>
  </div>

  <h3>Decoding a float, step by step</h3>

  <div class="card">
<pre>0x44C00000 = 0100 0100 1100 0000 0000 0000 0000 0000
split 1 | 8 | 23:  0 | 10001001 | 10000000000000000000000
sign 0 (positive); exponent field 10001001 = 137; true exponent 137 &minus; 127 = 10
fraction .1  &rarr;  1.1<sub>2</sub> &times; 2<sup>10</sup> = 1.5 &times; 1024 = <b>1536</b></pre>
    <p>Handy tool for checking your work: <code>float.exposed</code> (type a hex pattern or a number).</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode the float <code>0x3F800000</code> (decimal).</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent field 127 &minus; 127 = 0, fraction 0: 1.0 &times; 2<sup>0</sup> = 1.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode the float <code>0xC1200000</code> (decimal).</div>
      <input class="fillblank sm" data-answer="-10">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Sign 1; exponent 130 &minus; 127 = 3; 1.01 &times; 2<sup>3</sup> = 10; so &minus;10.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Decode the float <code>0x3E800000</code> (decimal).</div>
      <input class="fillblank sm" data-answer="0.25">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent 125 &minus; 127 = &minus;2: 1.0 &times; 2<sup>&minus;2</sup> = 0.25.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode 1.5 as a single-precision float (8 hex digits).</div>
      <input class="fillblank sm" data-answer="3FC00000~~~0x3FC00000~~~3fc00000~~~0x3fc00000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1.5 = 1.1 &times; 2<sup>0</sup>: exponent field 127 = 0x7F, fraction .1 &rarr; <code>0x3FC00000</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>Encode &minus;2 as a single-precision float (8 hex digits).</div>
      <input class="fillblank sm" data-answer="C0000000~~~0xC0000000~~~c0000000~~~0xc0000000">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Sign 1; &minus;1.0 &times; 2<sup>1</sup>: exponent field 128 &rarr; <code>0xC0000000</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>How many exponent bits does a double have?</div>
      <input class="fillblank sm" data-answer="11">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1 sign + 11 exponent + 52 fraction = 64.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the bias of a float?</div>
      <input class="fillblank sm" data-answer="127">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">2<sup>8&minus;1</sup> &minus; 1.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>Which statement about double vs float is correct?</div>
      <button class="opt" data-i="0">Double has more range and precision but uses more space and is slower</button>
      <button class="opt" data-i="1">Double has less range but more precision</button>
      <button class="opt" data-i="2">Float is always more accurate</button>
      <button class="opt" data-i="3">They have the same precision</button>
      <div class="fb">More exponent bits give range; more fraction bits give precision.</div>
    </div>
  </div>
</section>

<section class="topic" id="l24-round">
  <h2>CL15 &middot; Precision Loss: Rounding Errors and Comparing Floats</h2>
  <div class="concept">Most decimal fractions (0.1, 0.2, 0.3) have no finite binary expansion, so a computer stores the <b>nearest representable value</b>. Small errors appear and can accumulate. <b>Do not compare floating-point values with <code>==</code>.</b></div>

  <div class="card">
<pre>double a = 0.1;  double b = 0.2;
printf("%.23f\\n", a);        // 0.10000000000000000555112
printf("%.23f\\n", b);        // 0.20000000000000001110223
printf("%.23f\\n", a + b);    // 0.30000000000000004440892</pre>
    <p>The sum is 0.300000000000000044&hellip; &mdash; not the stored 0.3 (0.29999999999999998889777), so <code>0.1 + 0.2 == 0.3</code> is <b>false</b> (prints 0).</p>
  </div>

  <h3>Use an epsilon instead</h3>

  <div class="card">
  <div class="concept">An <b>epsilon</b> (&epsilon;) is a small threshold for &ldquo;close enough&rdquo;. <code>float.h</code> defines <code>FLT_EPSILON</code> (&asymp; 1.19&times;10<sup>&minus;7</sup>) and <code>DBL_EPSILON</code> (&asymp; 2.22&times;10<sup>&minus;16</sup>), the gap between 1.0 and the next representable number.</div>
<pre>#include &lt;float.h&gt;
#include &lt;math.h&gt;
int are_equal(double a, double b) {
    return fabs(a - b) &lt; DBL_EPSILON;
}</pre>
    <p>Here <code>fabs(0.1 + 0.2 - 0.3)</code> &asymp; 5.55&times;10<sup>&minus;17</sup> &lt; 2.22&times;10<sup>&minus;16</sup>, so <code>are_equal</code> returns 1.</p>
  </div>

  <div class="card">
    <div class="q" data-tf="F">
      <div class="prompt"><span class="tag">Check</span><code>0.1 + 0.2 == 0.3</code> is true in C when all three are <code>double</code>.</div>
      <button class="opt" data-v="T">True</button>
      <button class="opt" data-v="F">False</button>
      <div class="fb"><b>False.</b> Rounding errors make the sum differ from the stored 0.3 in the last bits.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>What is the best way to test whether two doubles are &ldquo;equal&rdquo;?</div>
      <button class="opt" data-i="0">a == b</button>
      <button class="opt" data-i="1">fabs(a - b) &lt; epsilon</button>
      <button class="opt" data-i="2">a - b == 0</button>
      <button class="opt" data-i="3">a / b == 1</button>
      <div class="fb">Compare the absolute difference against a small tolerance.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why is 0.1 not stored exactly?</div>
      <button class="opt" data-i="0">It has too many digits</button>
      <button class="opt" data-i="1">It has no finite binary expansion (0.0001100110011&hellip;)</button>
      <button class="opt" data-i="2">Computers cannot store decimals</button>
      <button class="opt" data-i="3">Doubles round all numbers to integers</button>
      <div class="fb">Its binary expansion repeats, so it is truncated/rounded.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>printf("%d", fabs(0.1 + 0.2 - 0.3) &lt; DBL_EPSILON);</code> print?</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The difference (&asymp; 5.55e-17) is below DBL_EPSILON, so the comparison is true (1).</div>
    </div>
  </div>
</section>

<section class="topic" id="l24-absorb">
  <h2>CL15 &middot; Exercise: When Adding a Number Has No Effect</h2>
  <div class="concept">The in-class exercise: with <code>x = 1.0</code>, make <code>delta</code> smaller and smaller until <code>x + delta == x</code> even though <code>delta != 0</code>.</div>

  <div class="card">
<pre>float x = 1.0f;
float delta = 0.1f;                       // try 0.1, 0.01, 0.001 ...
printf("x + delta = %.23f\\n", x + delta);
if (x + delta == x) printf("Adding delta had NO effect!\\n");
else                printf("Adding delta changed x.\\n");</pre>
  </div>

  <div class="card">
    <table class="cmp">
      <tr><th>delta (float, x = 1.0f)</th><th>x + delta == x ?</th></tr>
      <tr><td>1e-6</td><td>no, x changed</td></tr>
      <tr><td>1e-7</td><td>no, x changed</td></tr>
      <tr><td>1e-8</td><td>yes (no effect)</td></tr>
    </table>
    <p><b>Q1.1:</b> the smallest power of 10 with no effect for <code>float</code> is <b>1e-8</b>. <b>Q1.2:</b> both x and delta are representable; the problem is that <b>x + delta</b> is not &mdash; there are not enough fraction bits (23), so the result rounds back to x.</p>
  </div>

  <div class="card">
    <table class="cmp">
      <tr><th>delta (double, x = 1.0)</th><th>x + delta == x ?</th></tr>
      <tr><td>1e-15</td><td>no, x changed</td></tr>
      <tr><td>1e-16</td><td>yes (no effect)</td></tr>
    </table>
    <p><b>Q2:</b> for <code>double</code> the threshold is about <b>1e-16</b>. <b>Q3:</b> a double has <b>52</b> fraction bits vs <b>23</b> for a float, so representable doubles near 1.0 are far more closely spaced (gap &asymp; 2.2&times;10<sup>&minus;16</sup> vs 1.19&times;10<sup>&minus;7</sup>); a much smaller change produces a different representable value.</p>
  </div>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>For <code>float x = 1.0f;</code> does <code>x + 1e-7f == x</code>? Answer 1 or 0.</div>
      <input class="fillblank sm" data-answer="0">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">The float gap above 1.0 is about 1.19&times;10<sup>&minus;7</sup>; half of it is the rounding threshold, and 1e-7 is above it, so x changes.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>For <code>float x = 1.0f;</code> does <code>x + 1e-8f == x</code>? Answer 1 or 0.</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">1e-8 is below half the gap, so the sum rounds back to 1.0.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>For <code>double x = 1.0;</code> does <code>x + 1e-16 == x</code>? Answer 1 or 0.</div>
      <input class="fillblank sm" data-answer="1">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A double's gap above 1.0 is 2.2e-16; 1e-16 is below half of it.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What does <code>float f = 16777217.0f; printf("%.0f", f);</code> print?</div>
      <input class="fillblank sm" data-answer="16777216">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">A float has 24 significant bits; 2<sup>24</sup> + 1 needs 25, so it rounds to 16777216.</div>
    </div>
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Why can a double absorb a much smaller delta than a float before the addition stops having an effect?</div>
      <button class="opt" data-i="0">Doubles are always bigger numbers</button>
      <button class="opt" data-i="1">A double has 52 fraction bits vs 23, so representable values near 1.0 are much more closely spaced</button>
      <button class="opt" data-i="2">Doubles use two exponent fields</button>
      <button class="opt" data-i="3">float arithmetic is done in integers</button>
      <div class="fb">More fraction bits means a finer grid of representable numbers.</div>
    </div>
  </div>
</section>

<section class="topic" id="l24-llm">
  <h2>CL15 &middot; Real-World Application: Floating Point in LLMs</h2>
  <div class="concept">A <b>large language model</b> is a program trained to predict what text comes next. It contains <b>billions of parameters (weights)</b> &mdash; learned numbers &mdash; and processes <b>activations</b> (temporary values) for every prompt and layer. All of them are floating-point numbers, so the number of bits per value decides memory use and speed.</div>

  <div class="card">
    <table class="cmp">
      <tr><th>7 billion parameters at&hellip;</th><th>Bytes each</th><th>Memory</th></tr>
      <tr><td>32 bits (FP32)</td><td>4</td><td>7B &times; 4 = 28 GB</td></tr>
      <tr><td>16 bits (FP16 / BF16)</td><td>2</td><td>7B &times; 2 = 14 GB</td></tr>
      <tr><td>8 bits</td><td>1</td><td>7B &times; 1 = 7 GB</td></tr>
    </table>
  </div>

  <div class="card">
    <table class="cmp">
      <tr><th>Field</th><th>FP32</th><th>FP16</th><th>BF16</th></tr>
      <tr><td>Sign</td><td>1</td><td>1</td><td>1</td></tr>
      <tr><td>Exponent</td><td>8</td><td>5</td><td>8</td></tr>
      <tr><td>Fraction</td><td>23</td><td>10</td><td>7</td></tr>
      <tr><td>Bias</td><td>127</td><td>15</td><td>127</td></tr>
      <tr><td>Total</td><td>32</td><td>16</td><td>16</td></tr>
      <tr><td>Character</td><td>baseline</td><td>more precision, less range</td><td>more range, less precision</td></tr>
      <tr><td>Largest finite</td><td>&asymp; 3.4&times;10<sup>38</sup></td><td>65,504</td><td>&asymp; 3.39&times;10<sup>38</sup></td></tr>
    </table>
    <p>FP16 example: exponent field <code>10000</code> = 16 &rarr; actual exponent 16 &minus; 15 = 1. <b>BF16</b> (&ldquo;brain float&rdquo;) was designed for neural networks: it keeps FP32's 8 exponent bits (same bias 127, so about the same range) but only 7 fraction bits (much less precision).</p>
    <p>Why would an LLM want range? Values vary a lot in magnitude; with too few exponent bits you hit <b>overflow</b> (too large) or <b>underflow</b> (too small to represent normally). BF16's 8-bit exponent avoids that; FP16 overflows more easily but rounds less.</p>
  </div>

  <h3>Explorer</h3>

  <div class="card">
    <div id="l24-explorer2"></div>
  </div>

  <div class="card">
    <div class="q" data-mc="1">
      <div class="prompt"><span class="tag">Check</span>Which 16-bit format has more <b>range</b>?</div>
      <button class="opt" data-i="0">FP16</button>
      <button class="opt" data-i="1">BF16</button>
      <button class="opt" data-i="2">Both the same</button>
      <button class="opt" data-i="3">Neither</button>
      <div class="fb">BF16 has 8 exponent bits (like FP32); FP16 has 5.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Check</span>Which 16-bit format has more <b>precision</b>?</div>
      <button class="opt" data-i="0">FP16 (10 fraction bits)</button>
      <button class="opt" data-i="1">BF16 (7 fraction bits)</button>
      <button class="opt" data-i="2">Both the same</button>
      <button class="opt" data-i="3">Neither</button>
      <div class="fb">FP16 spends its bits on the fraction.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>An LLM with 8 billion parameters stored as FP16 needs how many GB?</div>
      <input class="fillblank sm" data-answer="16">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">8 &times; 2 bytes = 16 GB.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>The same LLM stored as BF16 needs how many GB?</div>
      <input class="fillblank sm" data-answer="16">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">BF16 is also 16 bits: 16 GB.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the FP16 pattern <code>0x4000</code> in decimal? (1 sign, 5 exponent with bias 15, 10 fraction)</div>
      <input class="fillblank sm" data-answer="2">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Exponent 16 &minus; 15 = 1, fraction 0: 1.0 &times; 2<sup>1</sup> = 2.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Check</span>What is the largest finite FP16 value?</div>
      <input class="fillblank sm" data-answer="65504">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>0 11110 1111111111</code> = 1.9990234 &times; 2<sup>15</sup> = 65504.</div>
    </div>
    <div class="q" data-multi="0,1,2">
      <div class="prompt"><span class="tag">Check</span>Select <b>all</b> correct statements.</div>
      <label class="ma-item"><input type="checkbox" data-i="0"><span><b>A.</b> FP16 is more likely to overflow than BF16</span></label>
      <label class="ma-item"><input type="checkbox" data-i="1"><span><b>B.</b> BF16 causes more rounding than FP16</span></label>
      <label class="ma-item"><input type="checkbox" data-i="2"><span><b>C.</b> FP16 needs half the memory of FP32</span></label>
      <label class="ma-item"><input type="checkbox" data-i="3"><span><b>D.</b> BF16 needs more memory than FP16</span></label>
      <button class="btn small" style="margin-top:8px" onclick="checkMulti(this)">Check</button>
      <div class="fb">Both 16-bit formats use the same memory (half of FP32).</div>
    </div>
  </div>
</section>

<section class="topic" id="l24-rd13">
  <h2>RD13 Self-Check &middot; Minifloat Normalized vs Denormalized</h2>
  <p class="muted">The RD13 reading asks, for four values, whether each is <b>normalized</b> or <b>denormalized</b> in the minifloat and for its encoding (format <code>0b0000_0000</code>). Fresh values of the same kind: try normalized first; if exponent + 3 &le; 0, use the denormalized form (value &times; 4 = 0.ffff).</p>

  <div class="card">
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q1a</span>Will <b>1/16</b> be normalized or denormalized in the minifloat?</div>
      <input class="fillblank sm" data-answer="denormalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Its exponent field would be &le; 0, so it must be denormalized (value &times; 4 as 0.ffff).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q1b</span>Encode <b>1/16</b> as <code>0b0000_0000</code>.</div>
      <input class="fillblank sm" data-answer="00000100~~~0b00000100~~~0000_0100~~~0b0000_0100~~~0_000_0100~~~0b0_000_0100~~~0 000 0100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>0 000 0100</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2a</span>Will <b>&minus;7/8</b> be normalized or denormalized in the minifloat?</div>
      <input class="fillblank sm" data-answer="normalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Its exponent field is 1&ndash;6, so it is normalized.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q2b</span>Encode <b>&minus;7/8</b> as <code>0b0000_0000</code>.</div>
      <input class="fillblank sm" data-answer="10101100~~~0b10101100~~~1010_1100~~~0b1010_1100~~~1_010_1100~~~0b1_010_1100~~~1 010 1100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>1 010 1100</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3a</span>Will <b>5/64</b> be normalized or denormalized in the minifloat?</div>
      <input class="fillblank sm" data-answer="denormalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Its exponent field would be &le; 0, so it must be denormalized (value &times; 4 as 0.ffff).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q3b</span>Encode <b>5/64</b> as <code>0b0000_0000</code>.</div>
      <input class="fillblank sm" data-answer="00000101~~~0b00000101~~~0000_0101~~~0b0000_0101~~~0_000_0101~~~0b0_000_0101~~~0 000 0101">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>0 000 0101</code>.</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q4a</span>Will <b>&minus;3/16</b> be normalized or denormalized in the minifloat?</div>
      <input class="fillblank sm" data-answer="denormalized">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb">Its exponent field would be &le; 0, so it must be denormalized (value &times; 4 as 0.ffff).</div>
    </div>
    <div class="q" data-fill="1">
      <div class="prompt"><span class="tag">Q4b</span>Encode <b>&minus;3/16</b> as <code>0b0000_0000</code>.</div>
      <input class="fillblank sm" data-answer="10001100~~~0b10001100~~~1000_1100~~~0b1000_1100~~~1_000_1100~~~0b1_000_1100~~~1 000 1100">
      <button class="btn small" onclick="checkFill(this)">Check</button>
      <div class="fb"><code>1 000 1100</code>.</div>
    </div>
  </div>

  <div class="card">
    <div class="q" data-mc="2">
      <div class="prompt"><span class="tag">Q5</span>Which minifloat pattern is the <i>smallest positive normalized</i> value?</div>
      <button class="opt" data-i="0">0 000 0001</button>
      <button class="opt" data-i="1">0 000 1111</button>
      <button class="opt" data-i="2">0 001 0000</button>
      <button class="opt" data-i="3">0 111 0000</button>
      <div class="fb"><code>0 001 0000</code> = 1.0 &times; 2<sup>&minus;2</sup> = 0.25.</div>
    </div>
    <div class="q" data-mc="0">
      <div class="prompt"><span class="tag">Q6</span>The largest denormal is&hellip;</div>
      <button class="opt" data-i="0">0 000 1111 = 15/64</button>
      <button class="opt" data-i="1">0 001 0000 = 16/64</button>
      <button class="opt" data-i="2">0 000 0001 = 1/64</button>
      <button class="opt" data-i="3">0 111 1111</button>
      <div class="fb">All-zero exponent field with the largest fraction.</div>
    </div>
  </div>
</section>

</main>
`;
fpExplorer('l24-explorer', [
  { name: 'float (1-8-23, bias 127)', sb: 1, eb: 8, mb: 23, bias: 127, special: true }
], '01000100110000000000000000000000');
fpExplorer('l24-explorer2', [
  { name: 'FP16 (1-5-10, bias 15)', sb: 1, eb: 5, mb: 10, bias: 15, special: true },
  { name: 'BF16 (1-8-7, bias 127)', sb: 1, eb: 8, mb: 7, bias: 127, special: true }
]);
