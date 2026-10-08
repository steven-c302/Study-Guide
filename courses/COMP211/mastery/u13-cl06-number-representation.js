/* U13 · CL06 Number representation (+ RD05: bases, binary, hex; DiS 4.1-4.3)
   Every computed answer is checked by verify.js against real arithmetic. */
(function () {
  var h = Mastery.h;
  /* accept several spellings of a binary / hex answer; the FIRST spelling is the one verified */
  function B(bits) { var g = bits.replace(/(?=(?:[01]{4})+$)/g, '_').replace(/^_/, ''); return bits + '~~~' + g + '~~~0b' + bits + '~~~0b' + g; }
  function X(hx) { return hx + '~~~0x' + hx + '~~~' + hx.toLowerCase() + '~~~0x' + hx.toLowerCase(); }
  Mastery.unit({
    id: 'u13', order: 5, title: 'CL06 · Number representation: bases, binary & hex', short: 'CL06 Number rep',
    blurb: 'Positional notation in base 10, 2 and 16; converting by hand in every direction; bit positions, bytes and words; how many values n bits can hold.',
    lessons: [{ id: 'l10', label: 'CL06/CL07 · Number Representation & Arithmetic' }, { id: 'l13', label: 'HW03 · Number Rep, Arithmetic & Bitwise' }],
    learn: {
      big: [
        'Every positional system works the same way: each digit is multiplied by <b>base<sup>position</sup></b> and the products are added. <code>507</code> in decimal is 5×10² + 0×10¹ + 7×10⁰; <code>0b1011</code> is 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 11.',
        'Bits are numbered <b>from the right starting at 0</b>. In an n-bit number the leftmost bit is bit n−1 (the <b>most significant bit, MSB</b>) and the rightmost is bit 0 (the <b>least significant bit, LSB</b>).',
        '<b>Decimal → binary</b>: repeatedly subtract the largest power of 2 that fits and put a 1 in that position (114 = 64 + 32 + 16 + 2 = <code>0b111_0010</code>). Know 0 through 15 in binary by heart, and the powers 1, 2, 4, 8, 16, 32, 64, 128, 256.',
        '<b>Hex</b> uses digits 0–9 then A–F (A=10 … F=15). <b>One hex digit is exactly 4 bits</b>, so hex ↔ binary is a digit-by-digit lookup with no arithmetic: <code>0xA7</code> = <code>1010</code> <code>0111</code>.',
        'Group binary in fours from the <b>right</b> (<code>0b10_1010_0011</code>). When going binary → hex pad the leftmost group with leading zeros mentally; when going hex → binary keep every leading zero.',
        '<b>n bits hold 2<sup>n</sup> distinct patterns.</b> Unsigned that is 0 to 2<sup>n</sup>−1. A byte is 8 bits (two hex digits); a word here is 32 bits (4 bytes).'
      ],
      traps: [
        'Numbering bits from the left. In <code>0b1000_0001</code> the 1s are bits 7 and 0.',
        'Reading a prefix-less number as base 10 when it has <code>0b</code> or <code>0x</code> in front (and the reverse).',
        'Forgetting leading zeros in hex → binary: <code>0x3C9</code> is <code>0011_1100_1001</code>, 12 bits, not 10.',
        'Saying n bits hold 2n values. It is 2<sup>n</sup>, and the largest unsigned value is one less than that.',
        'Grouping binary from the left instead of the right when converting to hex.'
      ],
      examples: [
        { kind: 'worked', title: 'Convert 114 to unsigned binary, then to hex.',
          steps: [
            ['1', 'Largest power of 2 that is ≤ 114 is 64. Put a 1 in the 64s place; 114 − 64 = 50.', 'Powers: 64 32 16 8 4 2 1.'],
            ['2', 'Largest ≤ 50 is 32 → 1; 50 − 32 = 18. Largest ≤ 18 is 16 → 1; 18 − 16 = 2. Then 8 and 4 do not fit → 0, 0; 2 → 1; 1 does not fit → 0.', 'Remainder 0 means you are finished.'],
            ['3', 'Positions 64 32 16 8 4 2 1 hold <code>1 1 1 0 0 1 0</code>, so 114 = <code>0b111_0010</code>.', 'Seven bits, the fewest possible.'],
            ['4', 'Group from the right: <code>0111</code> <code>0010</code>, which is 7 and 2.', 'Pad the left group with a zero.'],
            ['5', 'So 114 = <code>0x72</code>. Check: 7×16 + 2 = 114.', 'Converting back is the self-check.']
          ], takeaway: 'Decimal → binary by subtracting powers of 2; binary → hex by grouping fours from the right.' },
        { kind: 'complete', item: h.mem('hex to binary and decimal', 'Convert <code>0x3C9</code>. The binary is given for you in the first row; fill in the decimal.', '', [['binary', B('001111001001'), 'given'], ['decimal', '969']], '3×256 + 12×16 + 9 = 768 + 192 + 9 = 969. In binary each hex digit keeps four bits, including the leading zeros of 3 (<code>0011</code>).', { verify: { js: '[bin(0x3C9,12), "969"]' } }) },
        { kind: 'solo', item: h.mem('your turn', 'Convert 89 to unsigned binary (fewest bits) and to hex.', '', [['binary', B('1011001')], ['hex', X('59')]], '89 = 64 + 16 + 8 + 1 = <code>0b101_1001</code>. Grouped fours: <code>0101</code> <code>1001</code> = <code>0x59</code>.', { verify: { js: '[bin(89,7), hex(89)]' } }) }
      ]
    },
    cards: [
      ['How do you read a positional number in base b?', 'Multiply each digit by <b>b<sup>position</sup></b> (position 0 on the right) and add. 0b1011 = 8+0+2+1 = 11.'],
      ['Which bit is bit 0, and which is the MSB?', 'Bit 0 is the rightmost (LSB, worth 1). The MSB is the leftmost bit, bit n−1 of an n-bit number.'],
      ['How do you write a binary number in C or by hand?', '<code>0b</code> prefix (<code>0b1001</code>) or a subscript 2. Group in fours from the right, with spaces by hand and underscores when typed: <code>0b1010_1111_0101</code>.'],
      ['Binary for 0 through 15?', '0000, 0001, 0010, 0011, 0100, 0101, 0110, 0111, 1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111. Memorize these.'],
      ['Powers of 2 to know?', '1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024. 2<sup>10</sup> = 1024.'],
      ['Decimal → binary method?', 'Find the largest power of 2 ≤ the number, put a 1 there, subtract, repeat until the remainder is 0. Unused positions are 0.'],
      ['Binary → decimal method?', 'Add the powers of 2 under every 1 bit. 0b10010 = 16 + 2 = 18.'],
      ['What digits does hex use?', '0–9 then A=10, B=11, C=12, D=13, E=14, F=15. Prefix <code>0x</code>.'],
      ['How many bits is one hex digit?', 'Exactly 4 (a “nibble”). That is why hex is the compact form of binary.'],
      ['Binary → hex?', 'Group bits in fours <b>from the right</b>, pad the left group with zeros, and translate each group: 1101 0101 → D5.'],
      ['Hex → binary?', 'Replace each hex digit by its 4 bits and keep leading zeros: 0x3C9 → 0011 1100 1001.'],
      ['Hex → decimal?', 'Multiply digits by powers of 16: 0x2A = 2×16 + 10 = 42; 0x7C = 7×16 + 12 = 124.'],
      ['How many bits in a byte? A word?', 'A byte is 8 bits (2 hex digits). In this course a word is 32 bits = 4 bytes.'],
      ['How many values can n bits represent?', '2<sup>n</sup> patterns. 7 bits → 128; 8 bits → 256; 16 bits → 65,536.'],
      ['Unsigned range of n bits?', '0 to 2<sup>n</sup> − 1. 8 bits: 0–255; 4 bits: 0–15.'],
      ['Why do we use hex for addresses and masks?', 'It is shorter and readable for humans yet maps digit-by-digit onto the bits the hardware stores. Decimal does not align with powers of two.'],
      ['What does the prefix on a number tell you?', '<code>0b</code> = binary, <code>0x</code> = hex, no prefix = decimal. Always check before converting.']
    ],
    tiers: {
      recognize: [
        h.mc('base meaning', 'What does the <code>0x</code> prefix tell you about <code>0x1A</code>?', ['It is written in hexadecimal (base 16)', ['It is written in binary', '<code>0b</code> is the binary prefix.'], ['It is a decimal number', 'Decimal numbers have no prefix.'], ['It is a negative number', 'Prefixes say nothing about sign.']], 0, '<code>0x</code> marks hex; <code>0b</code> marks binary; no prefix means decimal.'),
        h.mc('bit zero', 'In <code>0b1100</code>, which statement is true?', [['Bit 0 is the leftmost 1', 'Bit numbering starts at the right.'], 'Bit 0 is the rightmost 0 and bit 3 is the leftmost 1', ['Bit 1 is the rightmost 0', 'The rightmost bit is bit 0, not bit 1.'], ['The leftmost bit is bit 4', 'A 4-bit number has bits 3..0.']], 1, 'Bits are named n−1 down to 0 from left to right, so the rightmost is bit 0.'),
        h.mc('why hex', 'Why do programmers write memory addresses in hex rather than decimal?', ['Each hex digit maps to exactly 4 bits, so it is a compact, human-readable form of the binary', ['Computers store addresses in hex', 'Hardware stores bits; hex is only a notation.'], ['Hex can represent numbers binary cannot', 'They represent exactly the same numbers.'], ['Hex is faster to compute with', 'It is about readability, not speed.']], 0, 'Decimal does not align with powers of 2; hex does, 4 bits per digit.'),
        h.mc('hex digit', 'What is the value of the hex digit <code>C</code>?', ['12', ['13', 'D is 13.'], ['11', 'B is 11.'], ['10', 'A is 10.']], 0, 'A=10, B=11, C=12, D=13, E=14, F=15.'),
        h.mc('MSB', 'Which bit is the most significant bit of <code>0b0100_1101</code>?', ['The leftmost bit (bit 7), which is 0', ['The rightmost bit (bit 0), which is 1', 'That is the least significant bit.'], ['Bit 4', 'Position alone does not make a bit most significant.'], ['The leftmost 1 (bit 6)', 'MSB is the leftmost <i>position</i>, even if it holds a 0.']], 0, 'The MSB is the leftmost position, bit n−1, whether or not it is a 1.'),
        h.mc('carry in hex', 'What happens when you add 1 to the hex digit <code>F</code>?', ['It becomes 0 and carries 1 into the next position', ['It becomes G', 'There is no G; hex stops at F.'], ['It becomes 10 in the same position', 'A digit cannot hold two characters.'], ['It overflows and the program crashes', 'It is just arithmetic in base 16.']], 0, 'Like 9 + 1 in decimal: the digit resets to 0 and a carry goes left. 0xF + 1 = 0x10.'),
        h.multi('true facts', 'Select <b>all</b> statements about bits, bytes and bases that are true.', ['One hex digit represents exactly 4 bits', 'A byte is 8 bits', ['n bits can hold n² values', 'It is 2<sup>n</sup>, which grows exponentially.'], 'The binary number 0b1000 equals 8'], [0, 1, 3], 'n bits give 2<sup>n</sup> patterns, not n².'),
        h.multi('which are equal', 'Select <b>all</b> values equal to decimal 26.', ['0b11010', '0x1A', ['0b10110', 'That is 16 + 4 + 2 = 22.'], ['0x26', 'That is 2×16 + 6 = 38.']], [0, 1], '26 = 16 + 8 + 2 = <code>0b11010</code> = <code>0x1A</code> (1×16 + 10).')
      ],
      trace: [
        h.mem('binary to decimal', 'Convert each unsigned binary number to decimal.', '', [['0b1101', '13'], ['0b10110', '22'], ['0b1100100', '100']], 'Add the powers of 2 under the 1s: 8+4+1 = 13; 16+4+2 = 22; 64+32+4 = 100.', { verify: { js: '[parseInt("1101",2), parseInt("10110",2), parseInt("1100100",2)].map(String)' } }),
        h.mem('decimal to binary', 'Convert to unsigned binary using the fewest bits.', '', [['37', B('100101')], ['60', B('111100')], ['129', B('10000001')]], '37 = 32+4+1; 60 = 32+16+8+4; 129 = 128+1. Fewest bits means no leading zeros.', { verify: { js: '[bin(37,6), bin(60,6), bin(129,8)]' } }),
        h.mem('hex to decimal', 'Convert each hex number to decimal.', '', [['0x1F', '31'], ['0x4B', '75'], ['0xC8', '200']], '1×16+15; 4×16+11; 12×16+8.', { verify: { js: '[0x1F, 0x4B, 0xC8].map(String)' } }),
        h.mem('decimal to hex', 'Convert each decimal number to hex (fewest digits).', '', [['48', X('30')], ['100', X('64')], ['255', X('FF')]], '48 = 3×16; 100 = 6×16 + 4; 255 = 15×16 + 15.', { verify: { js: '[hex(48), hex(100), hex(255)]' } }),
        h.mem('binary to hex', 'Convert binary to hex. Group fours from the right.', '', [['0b1011_0110', X('B6')], ['0b1_0011_1010', X('13A')], ['0b111_1111', X('7F')]], '1011 0110 = B6; 0001 0011 1010 = 13A; 0111 1111 = 7F. Pad the left group.', { verify: { js: '[hex(0xB6), hex(0x13A), hex(0x7F)]' } }),
        h.mem('hex to binary', 'Convert hex to binary. Keep leading zeros (multiple of 4 bits).', '', [['0x2D', B('00101101')], ['0xF0', B('11110000')], ['0x0A5', B('000010100101')]], 'Each digit becomes its own 4 bits: 2=0010, D=1101; F=1111, 0=0000; 0=0000, A=1010, 5=0101.', { verify: { js: '[bin(0x2D,8), bin(0xF0,8), bin(0xA5,12)]' } }),
        h.mem('bit positions', 'For <code>0b1010_0110</code> give the value of each (as 0 or 1): bit 0, bit 1, bit 4, bit 7.', '', [['bit 0', '0'], ['bit 1', '1'], ['bit 4', '0'], ['bit 7', '1']], 'Count from the right starting at 0: positions 7..0 hold 1 0 1 0 0 1 1 0.', { verify: { js: '[0b10100110 & 1, (0b10100110 >> 1) & 1, (0b10100110 >> 4) & 1, (0b10100110 >> 7) & 1].map(String)' } }),
        h.mem('how many values', 'How many distinct values can each hold, and what is the largest unsigned value?', '', [['values in 6 bits', '64'], ['largest unsigned in 6 bits', '63'], ['largest unsigned in 12 bits', '4095']], '2<sup>6</sup> = 64 patterns, the largest is 63 = 0b111111; 2<sup>12</sup> − 1 = 4095.', { verify: { js: '[String(2**6), String(2**6-1), String(2**12-1)]' } })
      ],
      debug: [
        h.bug('convert wrong', 'A student converts 0b101101 to decimal and gets 52 instead of 45. Which line has the root cause?', ['bits: 1 0 1 1 0 1  (left to right)', 'position of leftmost bit: 0, rightmost bit: 5', 'value = 1x1 + 0x2 + 1x4 + 1x8 + 0x16 + 1x32', 'answer: 1 + 4 + 8 + 32 = 45... they write 52'], 1, [['They numbered the bits from the left', 'Bit 0 is the rightmost bit; the leftmost bit has the highest position.'], ['They forgot the prefix', 'The prefix is irrelevant to the arithmetic.']], 0, 'The leftmost bit is the MSB (position 5, worth 32), not position 0. Numbering bits left-to-right reverses every weight.'),
        h.bug('hex padding', 'Convert <code>0b1_0011_1010</code> to hex. The student writes <code>0x13A</code> as <code>0x1A3</code>. Find the faulty step.', ['group from the right: 1 | 0011 | 1010', 'translate groups: 1, 3, A', 'concatenate in reverse order: A 3 1', 'result: 0x1A3'], 2, [['Digits were written in reverse order', 'Groups keep the same left-to-right order as the bits.'], ['The groups were made of 3 bits', 'The groups are correctly 4 bits.']], 0, 'Hex digits stay in the same order as the bit groups: 1, 3, A → 0x13A.'),
        h.parsons('decimal to binary', 'Arrange the steps to convert 45 to binary. One step does not belong.', ['Largest power of 2 ≤ 45 is 32: write 1 in the 32s place; 45 − 32 = 13', 'Largest power ≤ 13 is 8: write 1 in the 8s place; 13 − 8 = 5', 'Largest power ≤ 5 is 4: write 1 in the 4s place; 5 − 4 = 1', 'Place 1 in the 1s place; remainder is 0', 'Fill the unused positions with 0 to get 0b10_1101'], ['Divide 45 by 16 and write the remainder as the answer'], 'Subtract powers of two from largest to smallest until the remainder is zero; unused places are zeros.')
      ],
      integrate: [
        h.mc('which is largest', 'Which value is the largest?', [['0b1111_0000', '240.'], ['0xEF', '239.'], '0xF1 (241)', ['238', 'The smallest of the four.']], 2, '0b1111_0000 = 240, 0xEF = 239, 0xF1 = 241, and decimal 238. Convert them all to one base before comparing.'),
        h.mem('mixed bases', 'A byte is written <code>0xB4</code>. Give its bits, its decimal value, and how many of its bits are 1.', '', [['binary', B('10110100')], ['decimal', '180'], ['count of 1 bits', '4']], 'B=1011, 4=0100 → 1011 0100 = 128+32+16+4 = 180, with four 1s.', { verify: { js: '[bin(0xB4,8), String(0xB4), String(bin(0xB4,8).split("1").length-1)]' } }),
        h.trace('printf bases', 'What does this print?', 'int a = 0x2A;\nint b = 0b101010;\nprintf("%d %d %d", a, b, a == b);', '42 42 1', 'Both are 42: 0x2A = 2×16 + 10 and 0b101010 = 32 + 8 + 2. Equal values compare true (1).', { verify: { src: '#include <stdio.h>\nint main(void){int a=0x2A;int b=0b101010;printf("%d %d %d",a,b,a==b);}', expect: ['42 42 1'] } }),
        h.trace('printf hex', 'What does this print? (uppercase hex digits, no prefix)', 'printf("%X %d", 200, 0xFF + 1);', 'C8 256', '200 = 12×16 + 8 = C8, and 0xFF is 255, so 255 + 1 = 256 (as an int; no wrap).', { verify: { src: '#include <stdio.h>\nint main(void){printf("%X %d",200,0xFF+1);}', expect: ['C8 256'] } })
      ],
      produce: [
        h.free('convert both ways', 'Convert 77 to binary and hex, then explain in one or two sentences why every hex digit is exactly four bits.', '77 = 64 + 8 + 4 + 1 = 0b100_1101 = 0x4D (0100 1101). Four bits give 2^4 = 16 patterns, exactly the 16 hex digits 0-F, so each digit ↔ one 4-bit group with no arithmetic.', ['Binary is 0b1001101 (7 bits) built from powers of 2', 'Hex is 0x4D (grouped from the right with padding)', 'Explains 4 bits = 16 patterns = 16 hex digits'], 3),
        h.explain('teach bases', '<b>Teach it.</b> Explain how to convert a decimal number to binary and a binary number to hex, and why we number bits from the right.', ['Positional value: each digit is weighted by base to the power of its position', 'Decimal to binary: subtract the largest power of 2 that fits and repeat', 'Binary to hex: group in fours from the right, pad, translate each group', 'Bit 0 is the rightmost because it carries weight 2^0 (positions count up leftward)'], 'Binary is positional with weights 1, 2, 4, 8… Subtract powers of two to build the pattern; group fours from the right to get hex. The rightmost bit has weight 2^0, so it is bit 0.', 3)
      ]
    }
  });
})();
