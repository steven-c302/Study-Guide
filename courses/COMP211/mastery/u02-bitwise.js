/* U02 · Bitwise operators, shifts, masks, bit-packing  (CL08, CL09, CL12, RD07/RD08) */
(function () {
  var h = Mastery.h;
  var P = '#include <stdio.h>\n#include <stdint.h>\n';
  function C(body, expect) { return { src: P + body, expect: expect }; }
  Mastery.unit({
    id: 'u02', title: 'Bitwise operators, shifts & masks', short: 'Bitwise & masks',
    blurb: 'AND, OR, XOR, NOT, shifts, and the get / set / clear / update / pack / extract idioms built from them.',
    lessons: [{ id: 'l7', label: 'CL08 · Bitwise Operators' }, { id: 'l14', label: 'CL09 · Applications' }, { id: 'l18', label: 'CL12 · Applied Review' }],
    learn: {
      big: [
        'Bitwise (<code>&amp; | ^ ~</code>) work <b>one bit position at a time</b> and return a same-width result. Logical (<code>&amp;&amp; || !</code>) collapse each operand to one truth value first.',
        'The mask toolkit: <b>get</b> <code>num &amp; mask</code> · <b>set</b> <code>num | mask</code> · <b>clear</b> <code>num &amp; ~mask</code> · <b>toggle</b> <code>num ^ mask</code>, with <code>mask = 1 &lt;&lt; i</code>.',
        '<b>Left shift</b> fills with 0s and equals ×2 per shift unless bits fall off the top. Bits shifted out are lost, never wrapped.',
        '<b>Right shift</b> depends on the <i>type</i>: unsigned is <b>logical</b> (0s in), signed is usually <b>arithmetic</b> (copies the sign bit).',
        'To write a field: <b>clear first, then OR</b>. OR can only turn bits on. To read a field: <b>shift down, then mask</b>.',
        '<code>~x</code> only makes sense once you know the <b>width</b> of <code>x</code>.'
      ],
      traps: [
        'Writing <code>&amp;&amp;</code> when you meant <code>&amp;</code> (and the reverse). <code>5 &amp; 2</code> is 0 but <code>5 &amp;&amp; 2</code> is 1.',
        '<b>Precedence:</b> <code>==</code> binds tighter than <code>&amp;</code>. <code>num &amp; 1 &lt;&lt; i == 0</code> does not mean what it looks like. Parenthesize.',
        'Cast order: <code>(uint8_t)(d &gt;&gt; 1)</code> and <code>(uint8_t)d &gt;&gt; 1</code> give different results because the first shifts <i>arithmetically</i>, the second <i>logically</i>.',
        'Using <code>update_bit = num | (x &lt;&lt; i)</code>: it can never write a 0 into a bit that is already 1.',
        'Assuming bits shifted off the left “wrap around.” They are discarded.'
      ],
      examples: [
        { kind: 'worked', title: 'Extract the green channel of <code>0x7BAFD4</code> (packed 0xRRGGBB).', code: 'uint32_t color = 0x7BAFD4;\nuint32_t green = (color >> 8) & 0xFF;',
          steps: [
            ['1', '<code>color &gt;&gt; 8</code> gives <code>0x007BAF</code>', 'Shifting right by 8 bits (2 hex digits) drops the blue byte and slides green to the bottom.'],
            ['2', '<code>&amp; 0xFF</code> keeps only the low byte: <code>0xAF</code>', 'Red is still sitting above green; the mask zeroes it out.']
          ], takeaway: 'Read a field = shift it to the bottom, then mask off everything above it.' },
        { kind: 'complete', item: h.mem('extract channel', 'Same recipe. Extract the <b>green</b> channel of <code>0x3C5A9E</code>. (The first step is given.)', 'uint32_t color = 0x3C5A9E;\nuint32_t t = color >> 8;\nuint32_t green = t & 0xFF;', [['t', '0x3C5A', 'given'], ['green', '0x5A']], '<code>t</code> is 0x3C5A (red and green). Masking with 0xFF keeps just green: 0x5A.', { verify: { js: '["0x"+hex(0x3C5A&0xFF)]' } }) },
        { kind: 'solo', item: h.mem('mask toolkit', 'With <code>num = 0b0101_0001</code> (81), find the decimal result of each, applied to the original <code>num</code>: set bit 3, clear bit 0, and toggle bit 6.', '', [['set bit 3', '89'], ['clear bit 0', '80'], ['toggle bit 6', '17']], 'set: OR 0000_1000 → 0101_1001 = 89. clear: AND ~0000_0001 → 0101_0000 = 80. toggle: XOR 0100_0000 → 0001_0001 = 17.', { verify: { js: '[String(81|8), String(81&~1), String(81^64)]' } }) }
      ]
    },
    cards: [
      ['When is each bit of <code>a &amp; b</code>, <code>a | b</code>, <code>a ^ b</code> equal to 1?', 'AND: both bits 1. OR: at least one is 1. XOR: exactly one is 1 (the bits differ).'],
      ['<code>&amp;</code> vs <code>&amp;&amp;</code>?', '<code>&amp;</code> works bit by bit and returns a same-width number. <code>&amp;&amp;</code> collapses each side to true/false and returns 0 or 1. <code>5 &amp; 2 = 0</code>, <code>5 &amp;&amp; 2 = 1</code>.'],
      ['Build a mask with a single 1 at bit i.', '<code>1 &lt;&lt; i</code>'],
      ['Get / set / clear / toggle bit i of <code>num</code>.', 'get: <code>(num &amp; (1&lt;&lt;i)) != 0</code> · set: <code>num | (1&lt;&lt;i)</code> · clear: <code>num &amp; ~(1&lt;&lt;i)</code> · toggle: <code>num ^ (1&lt;&lt;i)</code>'],
      ['Why does <code>update_bit</code> clear before OR-ing?', 'OR can only turn bits on. If bit i is 1 and x is 0, plain OR leaves it 1. Clear it, then OR in <code>x &lt;&lt; i</code>.'],
      ['What fills in on a left shift? On a right shift?', 'Left: always 0s on the right. Right: 0s if the value is unsigned (logical); a copy of the sign bit if signed (arithmetic).'],
      ['What happens to bits shifted off either end?', 'They are discarded. Nothing wraps around.'],
      ['<code>x &lt;&lt; n</code> equals what arithmetic, and when does it break?', 'Multiplication by 2<sup>n</sup>, unless significant bits fall off the top of the fixed width.'],
      ['Multiply <code>n</code> by 20 using only shifts and addition.', '<code>(n &lt;&lt; 4) + (n &lt;&lt; 2)</code> since 20 = 16 + 4.'],
      ['Pack two 4-bit values into one byte.', '<code>(high &lt;&lt; 4) | low</code>'],
      ['Extract the green byte from <code>0xRRGGBB</code>.', '<code>(color &gt;&gt; 8) &amp; 0xFF</code> (shift into position, then mask).'],
      ['Why is <code>~x</code> ambiguous without a width?', '<code>~</code> flips <i>every</i> bit, and how many bits there are depends on the type of <code>x</code>.'],
      ['Precedence trap: <code>num &amp; 1 &lt;&lt; i == 0</code>?', '<code>==</code> binds tighter than <code>&amp;</code>, so it is <code>num &amp; ((1&lt;&lt;i) == 0)</code>. Always parenthesize: <code>(num &amp; (1&lt;&lt;i)) == 0</code>.']
    ],
    tiers: {
      recognize: [
        h.mc('& vs &&', 'What do <code>5 &amp; 2</code> and <code>5 &amp;&amp; 2</code> evaluate to?', ['0 and 1', ['1 and 1', '<code>&amp;</code> ANDs the bits (101 &amp; 010 = 000), so it is 0, not 1.'], ['0 and 0', '<code>&amp;&amp;</code> asks “are both operands nonzero?” and both are, so it is 1.'], ['2 and 1', '101 &amp; 010 shares no 1-bit, so the bitwise result is 0.']], 0, 'Bitwise AND sees 101 and 010 share no set bit (0). Logical AND sees two nonzero values (1).',
          { verify: C('int main(void){printf("%d\\n%d\\n",5&2,5&&2);}', ['0', '1']) }),
        h.mc('XOR', 'A bit position of <code>a ^ b</code> is 1 exactly when…', ['the two bits differ', ['both bits are 1', 'That is AND.'], ['at least one bit is 1', 'That is OR.'], ['both bits are 0', 'XOR gives 0 when the bits are equal.']], 0, 'XOR detects difference: 0^0 = 0, 1^1 = 0, 0^1 = 1.'),
        h.mc('clear a bit', 'Which expression clears bit <code>i</code> of <code>num</code> and leaves every other bit alone?', [['<code>num | (1 &lt;&lt; i)</code>', 'That sets the bit.'], ['<code>num &amp; (1 &lt;&lt; i)</code>', 'That keeps only bit i and clears everything else.'], '<code>num &amp; ~(1 &lt;&lt; i)</code>', ['<code>num ^ (1 &lt;&lt; i)</code>', 'That toggles the bit (0 becomes 1).']], 2, '<code>~(1&lt;&lt;i)</code> is all 1s except position i, so the AND zeroes only that bit.'),
        h.mc('arithmetic vs logical shift', 'With <code>int8_t d = -2;</code>, what is <code>d &gt;&gt; 1</code>?', [['127', 'That would be a logical shift filling with 0. Signed values use arithmetic shift here.'], '-1', ['-4', 'That is a <i>left</i> shift (×2).'], ['1', 'The sign bit is copied in, so the result stays negative.']], 1, '1111_1110 shifted right arithmetically copies the sign bit: 1111_1111 = −1.', { verify: C('int main(void){int8_t d=-2;printf("%d\\n",d>>1);}', ['-1']) })
      ],
      trace: [
        h.trace('left shift', 'What does this print?', 'uint8_t a = 0b00101101;\nuint8_t b = a << 2;\nprintf("%d", b);', '180', '0010_1101 shifted left twice is 1011_0100 = 180 (= 45 × 4). Nothing fell off, so it equals ×4.', { verify: C('int main(void){uint8_t a=0x2D;uint8_t b=a<<2;printf("%d",b);}') }),
        h.trace('bits fall off', 'What does this print?', 'uint8_t a = 0b11001101;\nuint8_t b = a << 2;\nprintf("%d", b);', '52', '1100_1101 &lt;&lt; 2 would need 10 bits; the top two (11) are discarded, leaving 0011_0100 = 52. This is why “×2” fails once bits fall off.', { verify: C('int main(void){uint8_t a=0xCD;uint8_t b=a<<2;printf("%d",b);}') }),
        h.mem('logical vs arithmetic', 'Both <code>d</code> and <code>u</code> hold the same bits <code>1110_1100</code>. Fill in each result.', 'int8_t  d = -20;\nuint8_t u = 236;\nint r1 = d >> 2;\nint r2 = u >> 2;', [['r1 (d &gt;&gt; 2)', '-5'], ['r2 (u &gt;&gt; 2)', '59']], 'Signed <code>d</code> shifts arithmetically: 1111_1011 = −5. Unsigned <code>u</code> shifts logically: 0011_1011 = 59. Same bits, different shift, because the <b>type</b> decides.', { verify: C('int main(void){int8_t d=-20;uint8_t u=236;int r1=d>>2;int r2=u>>2;printf("%d\\n%d\\n",r1,r2);}') }),
        h.mem('cast order', 'With <code>int8_t d = -2;</code> (bits 1111_1110), what do these print as decimal?', 'int8_t d = -2;\nint a = (uint8_t)(d >> 1);\nint b = (uint8_t)(d) >> 1;', [['a', '255'], ['b', '127']], '<code>a</code>: shift first on the signed value (arithmetic, 1111_1111), then cast: 255. <code>b</code>: cast first (254), then a logical shift: 0111_1111 = 127.', { verify: C('int main(void){int8_t d=-2;int a=(uint8_t)(d>>1);int b=(uint8_t)(d)>>1;printf("%d\\n%d\\n",a,b);}') }),
        h.mem('bit-by-bit operators', 'For 4-bit values <code>1100</code> and <code>1010</code>, give the 4-bit result of each operator.', '', [['1100 &amp; 1010', '1000'], ['1100 | 1010', '1110'], ['1100 ^ 1010', '0110']], 'Column by column: AND keeps positions where both are 1; OR keeps any 1; XOR keeps positions that differ.', { verify: { js: '[bin(12&10,4), bin(12|10,4), bin(12^10,4)]' } }),
        h.mem('mask toolkit', 'Given <code>num = 0b0110_1001</code> (105), find the decimal result of each, each applied to the original <code>num</code>.', 'int8_t num = 0b01101001;\nint s = num | (1 << 1);\nint c = num & ~(1 << 0);\nint t = num ^ (1 << 6);', [['s: set bit 1', '107'], ['c: clear bit 0', '104'], ['t: toggle bit 6', '41']], 's: 0110_1001 | 0000_0010 = 0110_1011 = 107. c: clear bit 0 gives 0110_1000 = 104. t: flip bit 6 gives 0010_1001 = 41.', { verify: C('int main(void){int8_t num=0x69;int s=num|(1<<1);int c=num&~(1<<0);int t=num^(1<<6);printf("%d\\n%d\\n%d\\n",s,c,t);}') })
      ],
      debug: [
        h.bug('update_bit', '<code>update_bit(num, i, x)</code> should set bit <code>i</code> to <code>x</code> (0 or 1), but <code>update_bit(0b0101, 2, 0)</code> returns 5, not 1. Find the root cause.', ['int8_t update_bit(int8_t num, int8_t i, int8_t x) {', '    int8_t mask = ~(1 << i);', '    return num | (x << i);', '}'], 2,
          [['<code>~(1 &lt;&lt; i)</code> builds the wrong mask', 'The mask is correct, it is just never applied.'], 'It ORs in <code>x &lt;&lt; i</code> without clearing bit <code>i</code> first, and OR can never turn a 1 into a 0', ['<code>x &lt;&lt; i</code> should be <code>x &gt;&gt; i</code>', 'Shifting left moves x into position i, which is right.']], 1, 'The mask is computed and then ignored. Apply it first (<code>num &amp; mask</code>), then OR in <code>x &lt;&lt; i</code>.', { hint: 'Compare with the clear-then-set recipe. Which half is missing?' }),
        h.bug('precedence', '<code>is_clear(5, 1)</code> should return 1 (bit 1 of 0b101 is 0) but returns 0. Which line is the root cause?', ['int is_clear(int8_t num, int8_t i) {', '    return num & 1 << i == 0;', '}'], 1,
          [['<code>1 &lt;&lt; i</code> overflows an int8_t', 'The shift happens in int; that is not the issue.'], '<code>==</code> binds tighter than <code>&amp;</code>, so it evaluates <code>num &amp; ((1 &lt;&lt; i) == 0)</code>, which is always 0', ['The function should return <code>void</code>', 'The return type is not the problem.']], 1, 'Precedence: shifts, then <code>==</code>, then <code>&amp;</code>. Write <code>(num &amp; (1 &lt;&lt; i)) == 0</code>.',
          { verify: C('int is_clear(int8_t num,int8_t i){return num & 1 << i == 0;}\nint main(void){printf("%d",is_clear(5,1));}', ['0']), hint: 'Which operator among &, <<, == is evaluated last?' }),
        h.parsons('update_bit', 'Arrange a correct <code>update_bit</code>. Two lines do not belong.', ['int8_t update_bit(int8_t num, int8_t i, int8_t x) {', '    int8_t mask = ~(1 << i);', '    int8_t cleared = num & mask;', '    return cleared | (x << i);', '}'], ['    int8_t cleared = num | mask;', '    return cleared & (x << i);'], 'Clear bit i with AND (using the inverted mask), then OR the new value into position i. Using OR to clear or AND to set reverses the roles.'),
        h.fill('bit-packing', 'Pack two 4-bit values into one byte, high nibble first.', 'uint8_t packed = (high __0__ 4) __1__ low;', ['<<', '|'], 'Shift the high nibble into the top four bits, then OR in the low nibble. The low nibble only occupies the bottom four bits, so nothing collides.'),
        h.fill('multiply by shifts', 'Using only shifts and addition, multiply <code>n</code> by 20 (20 = 16 + 4). Put the larger shift first.', 'n = (n << __0__) + (n << __1__);', ['4', '2'], '<code>n &lt;&lt; 4</code> is ×16 and <code>n &lt;&lt; 2</code> is ×4; 16 + 4 = 20.')
      ],
      integrate: [
        h.mem('color filter', 'This function brightens the <b>blue</b> channel of a packed <code>0xRRGGBB</code> color, clamping at 0xFF. Give each output as hex (e.g. <code>0x1020FF</code>).', 'uint32_t cool(uint32_t c) {\n    uint32_t blue = c & 0xFF;\n    uint32_t nb = (blue + 0x30 > 0xFF) ? 0xFF : blue + 0x30;\n    return (c & 0xFFFF00) | nb;\n}',
          [['cool(0x1020F0)', '0x1020FF~~~1020FF'], ['cool(0x10EE00)', '0x10EE30~~~10EE30']], '0xF0 + 0x30 = 0x120 overflows a byte, so it clamps to 0xFF (0x1020FF). 0x00 + 0x30 = 0x30 fits (0x10EE30). Clearing the old blue (<code>c &amp; 0xFFFF00</code>) before OR-ing is the same clear-then-set pattern as update_bit.',
          { verify: C('uint32_t cool(uint32_t c){uint32_t blue=c&0xFF;uint32_t nb=(blue+0x30>0xFF)?0xFF:blue+0x30;return (c&0xFFFF00)|nb;}\nint main(void){printf("0x%06X\\n0x%06X\\n",cool(0x1020F0),cool(0x10EE00));}') }),
        h.mem('pack then unpack', 'Fill in the decimal value of each variable.', 'uint8_t packed = (0b0101 << 4) | 0b1100;\nuint8_t hi = packed >> 4;\nuint8_t lo = packed & 0x0F;', [['packed', '92'], ['hi', '5'], ['lo', '12']], 'packed = 0101_1100 = 92. Shifting right by 4 recovers 0101 = 5. Masking with 0x0F keeps the low nibble 1100 = 12. Pack and unpack are exact inverses.', { verify: C('int main(void){uint8_t packed=(0x5<<4)|0xC;uint8_t hi=packed>>4;uint8_t lo=packed&0x0F;printf("%d\\n%d\\n%d\\n",packed,hi,lo);}') }),
        h.trace('shifts as arithmetic', 'What does this print?', 'int n = 5;\nn = (n << 4) + (n << 2);\nprintf("%d", n);', '100', '5 × 16 + 5 × 4 = 80 + 20 = 100, which is 5 × 20.', { verify: C('int main(void){int n=5;n=(n<<4)+(n<<2);printf("%d",n);}') }),
        h.mc('choose the idiom', 'You must overwrite just the <b>middle four bits</b> (bits 5 to 2) of a byte <code>b</code> with a 4-bit value <code>v</code>, leaving the other bits alone. Which is correct?', [['<code>b = b | (v &lt;&lt; 2);</code>', 'OR cannot clear the old bits, so stale 1s leak through.'], ['<code>b = (b &amp; 0x3C) | v;</code>', 'That keeps the <i>old</i> middle bits and clears everything else; v is not even shifted.'], '<code>b = (b &amp; ~0x3C) | (v &lt;&lt; 2);</code>', ['<code>b = b ^ (v &lt;&lt; 2);</code>', 'XOR toggles; it only writes v if the old field was zero.']], 2, '0x3C is 0011_1100, the field. <code>b &amp; ~0x3C</code> clears it, <code>v &lt;&lt; 2</code> moves the new value into place, OR merges. Clear first, then set.', { hint: 'Clear the field, then OR in the shifted value.' })
      ],
      produce: [
        h.free('bit counting', 'Write <code>int count_ones(uint8_t x)</code> that returns how many bits of <code>x</code> are 1, using only shifts and masks (no library calls). Say why your loop terminates correctly for every input, including 0 and 255.',
          '<pre><code>int count_ones(uint8_t x) {\n    int count = 0;\n    for (int i = 0; i &lt; 8; i++) {\n        count += (x &gt;&gt; i) &amp; 1;\n    }\n    return count;\n}</code></pre>It examines each of the 8 bit positions exactly once, so it terminates for every input. Shifting right and masking with 1 reads bit i; summing those reads counts the set bits.',
          ['Examines every bit position (loop over 8 positions, or shift until zero)', 'Reads a bit with a shift and a mask (<code>&amp; 1</code>) rather than a division or library call', 'Accumulates a count and returns it', 'Correct for 0 and 255 / explains why the loop is bounded', 'Uses an unsigned type so the shift is logical'], 4),
        h.explain('clear before set', 'Explain how to overwrite a multi-bit field inside an integer, and why you must clear the old field before OR-ing in the new value.',
          ['Build a mask covering the field (shifted into position)', 'AND with the inverted mask to clear the old field', 'Shift the new value into the field position', 'OR it in', 'OR can only turn bits on, so stale 1s from the old value would remain if you skipped the clear'],
          'Clear the field with <code>num &amp; ~mask</code>, then merge with <code>| (v &lt;&lt; shift)</code>. Skipping the clear lets old 1 bits survive the OR.', 4),
        h.explain('right shifts', 'A friend says “<code>&gt;&gt;</code> divides by two.” Explain exactly what a right shift does, including what changes between unsigned and signed values and what happens to bits that fall off.',
          ['Every bit slides toward the least significant end by the shift amount', 'Bits that fall off the right are discarded, never saved or wrapped', 'Unsigned values: logical shift, 0s enter on the left', 'Signed values: arithmetic shift copies the sign bit so negatives stay negative', 'It equals division by 2<sup>n</sup> only in the sense of rounding toward negative infinity, and only if the right kind of shift is used'],
          'A shift slides all bits right; the ones that fall off are lost. The type decides what enters on the left: 0s for unsigned, a copy of the sign bit for signed. That is why -2 &gt;&gt; 1 is -1 but the same bits as unsigned give 127.', 4)
      ]
    }
  });
})();
