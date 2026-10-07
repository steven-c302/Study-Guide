/* U01 · Number systems & binary arithmetic  (CL00, CL06/07, RD05/RD06, HW03 ideas) */
(function () {
  var h = Mastery.h;
  Mastery.unit({
    id: 'u01', title: 'Number systems & binary arithmetic', short: 'Binary & arithmetic',
    blurb: 'Bits, hex, unsigned vs two’s complement, ranges, addition, overflow, and extension. Everything later (bitwise, types, memory) assumes this is automatic.',
    lessons: [{ id: 'l0', label: 'CL00 · Binary' }, { id: 'l10', label: 'CL06/07 · Number Representation & Arithmetic' }],
    learn: {
      big: [
        'A bit pattern has <b>no meaning on its own</b>. Unsigned, two’s complement and ASCII are three lenses on the same bits. Casting and <code>printf</code> specifiers change the lens, never the bits.',
        'An <b>n-bit</b> type holds exactly <b>2<sup>n</sup></b> patterns. Unsigned: 0 to 2<sup>n</sup>−1. Two’s complement: −2<sup>n−1</sup> to 2<sup>n−1</sup>−1 (one more negative than positive).',
        '<b>Negate</b> in two’s complement: flip every bit, then add 1. The MSB is the sign: 1 means negative.',
        'Two’s complement addition is <i>the same circuit</i> as unsigned addition. Only the <b>overflow rule</b> differs: unsigned = carry out of the top column; signed = result sign makes no sense for the operand signs.',
        'Widening: <b>sign-extend</b> signed values (copy the MSB), <b>zero-extend</b> unsigned values. Using the wrong one changes the value.',
        'One hex digit = exactly 4 bits, so hex is a lossless shorthand for binary (and why addresses print in hex).'
      ],
      traps: [
        'Reading bits left-to-right as if the leftmost were bit 0. Bit 0 is the <b>rightmost</b> (LSB).',
        'Applying the <b>unsigned</b> carry-out rule to signed addition (or the reverse).',
        'Believing mixed-sign addition can overflow. It cannot: the true sum lies between the operands.',
        'Forgetting that <code>−128</code> has no positive twin in 8 bits: negating it gives itself.',
        'Zero-extending a negative number. <code>1111_1101</code> widened with zeros is <b>253</b>, not −3.'
      ],
      examples: [
        { kind: 'worked', title: 'Represent −37 in 8-bit two’s complement, then read it back to check.',
          steps: [
            ['1', 'Write +37 in 8 bits: <code>0010_0101</code>', '37 = 32 + 4 + 1.'],
            ['2', 'Flip every bit: <code>1101_1010</code>', 'This is the one’s complement of +37, i.e. −37 in one’s complement.'],
            ['3', 'Add 1: <code>1101_1011</code>', 'Two’s complement adds 1 to dodge the double zero.'],
            ['4', 'Check: MSB is 1, so negative. Flip: <code>0010_0100</code>, add 1: <code>0010_0101</code> = 37, so the value is −37.', 'Converting back is the same two steps. A free self-check.']
          ], takeaway: 'Negate = flip + 1, in both directions. Always verify by converting back.' },
        { kind: 'complete', item: h.mem('negation', 'Same method, new number. Fill in the steps to represent <b>−20</b> in 8-bit two’s complement (the first is given).', '', [['20 in 8 bits', '00010100', 'given'], ['flip all bits', '11101011'], ['add 1', '11101100']], 'Flip 0001_0100 to get 1110_1011, then add 1 to get 1110_1100.', { verify: { js: '[bin(~20,8), bin(-20,8)]' } }) },
        { kind: 'solo', item: h.mem('interpretation', 'The byte <code>0b1001_1100</code> sits in memory. Give its value read as unsigned and as two’s complement.', '', [['unsigned', '156'], ['two’s complement', '-100']], 'Unsigned: 128+16+8+4 = 156. Signed: MSB is 1, so flip (0110_0011) and add 1 (0110_0100 = 100), giving −100. Same bits, two lenses.', { verify: { js: '["156", String(wrap(156,8,true))]' } }) }
      ]
    },
    cards: [
      ['Which bit is bit 0, and what is it called?', 'The <b>rightmost</b> bit, the least significant bit (LSB). The leftmost bit of an n-bit number is bit n−1, the MSB.'],
      ['How many bits does one hex digit represent?', 'Exactly <b>4</b>. So a byte is two hex digits.'],
      ['Range of an n-bit unsigned integer?', '0 to 2<sup>n</sup> − 1. (8 bits: 0 to 255.)'],
      ['Range of an n-bit two’s complement integer?', '−2<sup>n−1</sup> to 2<sup>n−1</sup> − 1. (8 bits: −128 to 127.) One more negative than positive.'],
      ['Shortcut to negate a two’s complement number?', 'Flip all bits, then add 1. (<code>~x + 1</code>)'],
      ['What is wrong with one’s complement?', 'Two representations of zero (all 0s and all 1s). Two’s complement reclaims that wasted pattern.'],
      ['How do you tell the sign of a two’s complement number?', 'The MSB: 0 positive, 1 negative.'],
      ['Sign extension vs zero extension?', 'Sign extension copies the MSB into the new leading bits (signed values). Zero extension fills with 0s (unsigned values).'],
      ['How is unsigned overflow detected when adding?', 'The carry-out of the most significant column is 1.'],
      ['How is two’s complement overflow detected?', 'Same-sign operands give a result of the opposite sign (pos+pos = negative, neg+neg = positive). Mixed-sign addition never overflows.'],
      ['Same 32 bits printed with <code>%d</code> and <code>%u</code> differ. Why?', 'The bits are identical. <code>%d</code> reads them as signed two’s complement, <code>%u</code> as unsigned.'],
      ['What is −(−128) in 8-bit two’s complement?', '−128 again. There is no +128 in 8 bits, so negating the minimum value overflows back to itself.'],
      ['How do you convert a decimal number to binary by hand?', 'Repeatedly subtract the largest power of 2 that fits, writing a 1 in that position. Unused positions are 0.']
    ],
    tiers: {
      recognize: [
        h.mc('positional notation', 'What decimal value is <code>0b1011</code>?', [['13', 'That reads the bits right-to-left as if bit 0 were the leftmost bit. Bit 0 is the rightmost.'], '11', ['1011', 'That is the digits read as a decimal number; the <code>0b</code> prefix says base 2.'], ['9', '8 + 1 drops the 2 place. Weights are 8, 4, 2, 1 for bits 3 to 0.']], 1, '8 + 0 + 2 + 1 = 11.', { verify: { js: '["11"]' } }),
        h.mc('hexadecimal', 'Why is hex used for memory addresses and raw bytes?', ['Each hex digit maps to exactly 4 bits, so it is a short, lossless shorthand for binary', ['Computers store addresses in hex internally', 'Storage is always binary. Hex is purely a human display convenience.'], ['Hex numbers use fewer bits than binary', 'Same bits either way; hex only uses fewer <i>characters</i> to write them.'], ['Hex can represent negative numbers without a sign bit', 'Hex is only a notation. Negative encoding is separate.']], 0, 'The 4-bits-per-digit mapping is exact, so hex is compact and easy to convert.'),
        h.mc('two’s complement', 'What is the main advantage of two’s complement over one’s complement?', [['It needs fewer bits', 'Both use the same number of bits.'], 'Zero has only one representation, and add/subtract hardware works the same for signed and unsigned', ['It has no sign bit', 'It still uses the MSB as the sign indicator.'], ['It can represent larger positive numbers', 'The positive range is actually the same; the extra pattern goes to one more <i>negative</i> value.']], 1, 'Reclaiming the redundant all-ones zero gives one extra negative value and lets the same adder serve both interpretations.'),
        h.multi('two’s complement facts', 'Select <b>all</b> true statements about 8-bit two’s complement.', ['There is exactly one representation of zero', 'Subtraction can be done by adding the negation', ['Adding a positive and a negative number can overflow', 'Mixed signs never overflow: the true sum lies between the two operands.'], 'The range holds one more negative value than positive', ['The unsigned carry-out rule also detects signed overflow', 'Signed overflow uses a sign-based rule, not the carry-out.']], [0, 1, 3], 'Mixed-sign addition cannot overflow, and the two overflow rules are different.')
      ],
      trace: [
        h.trace('conversion', 'Convert <code>0b0101_0100</code> to decimal (unsigned).', '', '84', '64 + 16 + 4 = 84.', { verify: { js: '["84"]' } }),
        h.trace('conversion', 'Write decimal <b>98</b> as 8-bit binary (underscores optional).', '', '01100010~~~0110_0010~~~0b01100010~~~0b0110_0010~~~0110 0010~~~1100010~~~0b1100010', '98 − 64 = 34, 34 − 32 = 2, 2 − 2 = 0, so bits 6, 5 and 1 are set: 0110_0010.', { verify: { js: '[bin(98,8)]' } }),
        h.trace('hexadecimal', 'Write <code>0b0011_1010</code> in hex (with or without <code>0x</code>).', '', '3A~~~0x3A', 'Group in 4s: 0011 = 3, 1010 = A.', { verify: { js: '[hex(0b00111010)]' } }),
        h.trace('negation', 'Write <b>−15</b> in 8-bit two’s complement (underscores optional).', '', '11110001~~~1111_0001~~~0b11110001~~~0b1111_0001~~~1111 0001', '+15 = 0000_1111. Flip: 1111_0000. Add 1: 1111_0001.', { verify: { js: '[bin(-15,8)]' } }),
        h.mem('unsigned overflow', '8-bit <b>unsigned</b> addition: <code>0b1111_1110 + 0b0000_0011</code>. Give the stored 8-bit result and the carry out of the top column.', '', [['stored result', '00000001~~~0000_0001~~~0b00000001~~~0b0000_0001'], ['carry-out (0 or 1)', '1']], '254 + 3 = 257, which needs 9 bits. The top carry of 1 is the unsigned overflow signal, and the stored value wraps to 1.', { verify: { js: '[bin(254+3,8), "1"]' } }),
        h.mem('signed overflow', '8-bit <b>two’s complement</b>: <code>100 + 100</code>. What decimal value is stored, and did signed overflow occur (yes/no)?', '', [['stored value', '-56'], ['overflow?', 'yes']], '100 + 100 = 200 is out of range [−128, 127]. Bits 1100_1000 read as signed are −56. Two positives gave a negative: the overflow signature.', { verify: { js: '[String(wrap(200,8,true)), "yes"]' } })
      ],
      debug: [
        h.bug('sign extension', 'This code is meant to widen a negative <code>int8_t</code> into an <code>int32_t</code> without changing its value. It prints 253. Find the root cause.', ['int8_t small = -3;', 'int32_t big = (uint8_t)small;', 'printf("%d", big);'], 1,
          [['<code>int32_t</code> is too small to hold −3', 'Any int32_t holds −3 comfortably.'], 'Casting through <code>uint8_t</code> reinterprets the bits as unsigned (253), then zero-extends', ['<code>%d</code> is the wrong format for a signed value', '<code>%d</code> is fine; the value is already wrong before printing.']], 1,
          '<code>0b1111_1101</code> read as <code>uint8_t</code> is 253. Widening that unsigned value zero-extends it. Assign directly (<code>int32_t big = small;</code>) so C sign-extends.', { hint: 'Ask: what does the cast to uint8_t do to the bit pattern’s meaning?' }),
        h.parsons('negation', 'Arrange the lines into a function that returns the two’s complement negation of <code>x</code>. Two lines do not belong.', ['int8_t negate(int8_t x) {', '    int8_t flipped = ~x;', '    return flipped + 1;', '}'], ['    return flipped - 1;', '    int8_t flipped = -x;'],
          'Negate = flip every bit (<code>~x</code>) then add 1. Subtracting 1 gives the wrong direction, and using <code>-x</code> would just be the answer itself.'),
        h.fill('unsigned overflow', 'After <code>uint8_t s = a + b;</code> with unsigned <code>a</code> and <code>b</code>, overflow occurred exactly when the sum is smaller than an operand. Fill the blank.', 'uint8_t a = 250, b = 10;\nuint8_t s = a + b;\nif (s __0__ a) {\n    printf("overflow");\n}', ['<'], '250 + 10 = 260 wraps to 4. A wrapped sum is smaller than either operand, so <code>s &lt; a</code> detects it.'),
        h.mc('reading signed values', 'The 4-bit pattern <code>1010</code> means which value if read as one’s complement?', [['−6', 'That is the two’s complement reading (flip then add 1).'], '−5', ['10', 'That is the unsigned reading.'], ['−2', 'That would come from reading the lower three bits as magnitude (signed-magnitude style).']], 1, 'One’s complement: MSB 1 means negative; flip 1010 to 0101 = 5, so −5.', { verify: { js: '["-5"]' }, hint: 'Flip the bits, no +1 step in one’s complement.' })
      ],
      integrate: [
        h.mem('wraparound + casts + extension', 'Fill in the values. (Think: arithmetic happens in <code>int</code>, then the assignment narrows to the target type.)', 'int8_t a = 127;\nint8_t b = a + 1;\nuint8_t c = b;\nint32_t d = b;', [['b', '-128'], ['c', '128'], ['d', '-128']], '127 + 1 = 128, which narrows into int8_t as −128 (bits 1000_0000). <code>c</code> reinterprets those bits as unsigned: 128. <code>d</code> sign-extends the signed <code>b</code>: −128.',
          { verify: { src: '#include <stdio.h>\n#include <stdint.h>\nint main(void){int8_t a=127;int8_t b=a+1;uint8_t c=b;int32_t d=b;printf("%d\\n%d\\n%d\\n",b,c,d);}', expect: ['-128', '128', '-128'] } }),
        h.trace('promotion vs narrowing', 'What does this print? (two numbers separated by a space)', 'uint8_t x = 200;\nint8_t y = x;\nprintf("%d %u", y, x + 100);', '-56 300', '<code>y</code> narrows 200 into int8_t, which wraps to −56. But <code>x + 100</code> is computed in <b>int</b> after promotion, so it is 300, not a wrapped 44. Arithmetic does not wrap until you store it into a narrow type.',
          { verify: { src: '#include <stdio.h>\n#include <stdint.h>\nint main(void){uint8_t x=200;int8_t y=x;printf("%d %u",y,x+100);}', expect: ['-56 300'] } }),
        h.multi('representation lenses', 'With <code>int8_t x = -1;</code>, which expressions evaluate to <b>255</b>?', ['<code>(uint8_t)x</code>', '<code>x &amp; 0xFF</code>', ['<code>(uint32_t)x</code>', 'Sign-extends to 32 bits first: 4294967295.'], ['<code>x &gt;&gt; 0</code>', 'Shifting by 0 changes nothing: still −1.'], '<code>(unsigned char)x</code>'], [0, 1, 4],
          '<code>x</code> is bits 1111_1111. Reading them as 8-bit unsigned gives 255; ANDing the promoted −1 with 0xFF keeps the low 8 bits. A 32-bit cast sign-extends first.',
          { verify: { src: '#include <stdio.h>\n#include <stdint.h>\nint main(void){int8_t x=-1;printf("%d\\n%d\\n%u\\n%d\\n%d\\n",(uint8_t)x,x&0xFF,(uint32_t)x,x>>0,(unsigned char)x);}', expect: ['255', '255', '4294967295', '-1', '255'] }, hint: 'Count how many bits each expression works on after promotion and casting.' }),
        h.mc('overflow detection', 'You add two <b>int8_t</b> values and get a negative result from two positive operands. What is the correct conclusion?', ['Signed overflow occurred', ['Unsigned overflow occurred', 'Unsigned overflow is the carry-out rule. A negative result from two positives is the signed overflow signature.'], ['The hardware has a bug', 'This is expected two’s complement behavior.'], ['The result is correct; sums can be negative', 'Two positives can never truly sum to a negative.']], 0, 'pos + pos should never be negative. When it is, the true sum needed more than 8 bits.')
      ],
      produce: [
        h.free('signed overflow in C', 'Write a C function <code>int add_overflows(int8_t a, int8_t b)</code> that returns 1 if <code>a + b</code> would overflow an <code>int8_t</code> and 0 otherwise. Then explain why your check is correct.',
          '<pre><code>int add_overflows(int8_t a, int8_t b) {\n    int sum = a + b;            // computed in int, no wrap yet\n    return sum &gt; 127 || sum &lt; -128;\n}</code></pre>Compute in a wider type (<code>int</code>) so the true sum is visible, then compare with the int8_t range. Equivalent: overflow iff <code>a</code> and <code>b</code> have the same sign and the narrowed result has the opposite sign.',
          ['Computes the sum in a wider type (or otherwise sees the true sum)', 'Compares against the correct limits 127 and −128', 'Returns 1/0 for both overflow directions (positive and negative)', 'Explains that mixed signs cannot overflow, or uses the same-sign/opposite-result test correctly'], 3),
        h.explain('two’s complement', 'Explain why two’s complement lets one adder circuit do both signed and unsigned addition, and how the two overflow rules differ.',
          ['The bit-level addition (column by column with carries) is identical for signed and unsigned operands', 'Two’s complement is chosen so that negatives wrap correctly: a + (−a) gives 0 with the carry discarded', 'Unsigned overflow = carry out of the most significant column', 'Signed overflow = the result sign is impossible for the operand signs (pos+pos negative or neg+neg positive)', 'Mixed-sign addition cannot overflow'],
          'The adder just adds bits and carries; whether the pattern means unsigned or two’s complement is only the interpretation afterwards. Because of how negatives are encoded, a + (−a) wraps to zero. What differs is only how we detect that the true answer did not fit.', 4),
        h.explain('sign vs zero extension', 'You widen an 8-bit value to 32 bits. Explain when to sign-extend, when to zero-extend, and what goes wrong if you pick the wrong one.',
          ['Sign extension copies the MSB into all new leading bits', 'Use sign extension for signed (two’s complement) values; it preserves the numeric value', 'Use zero extension for unsigned values (there is no sign to preserve)', 'Zero-extending a negative signed value turns it into a large positive number (e.g. 1111_1101 becomes 253, not −3)', 'Sign-extending an unsigned value with MSB 1 inflates it to a huge number'],
          'Widening must preserve the number you meant. For signed values that means repeating the sign bit; for unsigned values the new high bits are plain zeros. Mixing them up changes the value.', 4)
      ]
    }
  });
})();
