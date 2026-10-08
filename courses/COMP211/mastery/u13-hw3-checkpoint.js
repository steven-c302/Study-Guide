/* U13 checkpoint: HW3-style mini-checker, conversions, bits/bytes, ranges, interpretations.
   Original numbers; every answer is machine-verified. */
(function () {
  var h = Mastery.h;
  var CV = 'Conversions', BS = 'Bits, bytes & hex digits', RG = 'Ranges', IN = 'Interpretations';
  function B(bits) { var g = bits.replace(/(?=(?:[01]{4})+$)/g, '_').replace(/^_/, ''); return bits + '~~~' + g + '~~~0b' + bits + '~~~0b' + g; }
  function X(hx) { return hx + '~~~0x' + hx + '~~~' + hx.toLowerCase() + '~~~0x' + hx.toLowerCase(); }
  function cp(topic, prompt, cells, why, js) { return h.mem(topic, prompt, '', cells, why, { verify: { js: js } }); }
  var items = [
    cp(CV, 'Convert each <b>unsigned binary</b> number to decimal.', [['0b110', '6'], ['0b10111', '23'], ['0b1100110', '102']], 'Sum the powers of 2 under each 1: 4+2; 16+4+2+1; 64+32+4+2.', '["110","10111","1100110"].map(function(s){return String(parseInt(s,2))})'),
    cp(CV, 'Convert each decimal number to <b>unsigned binary</b> using the fewest bits.', [['21', B('10101')], ['58', B('111010')], ['75', B('1001011')]], '21 = 16+4+1; 58 = 32+16+8+2; 75 = 64+8+2+1.', '[bin(21,5), bin(58,6), bin(75,7)]'),
    cp(CV, 'Convert each <b>hex</b> number to decimal.', [['0x3B', '59'], ['0x91', '145'], ['0x5D', '93']], '3×16+11; 9×16+1; 5×16+13.', '[0x3B,0x91,0x5D].map(String)'),
    cp(CV, 'Convert each decimal number to <b>hex</b> using the fewest digits.', [['96', X('60')], ['175', X('AF')], ['254', X('FE')]], '96 = 6×16; 175 = 10×16 + 15; 254 = 15×16 + 14.', '[hex(96), hex(175), hex(254)]'),
    cp(CV, 'Convert each <b>binary</b> number to hex.', [['0b1110_0011', X('E3')], ['0b1_0101_1100', X('15C')], ['0b10_0110', X('26')]], 'Group fours from the right and pad: 1110 0011; 0001 0101 1100; 0010 0110.', '[hex(0xE3), hex(0x15C), hex(0x26)]'),
    cp(CV, 'Convert each <b>hex</b> number to binary. Keep leading zeros (a multiple of 4 bits).', [['0x9E', B('10011110')], ['0x1F4', B('000111110100')], ['0x0C', B('00001100')]], 'Each hex digit is its own 4-bit group.', '[bin(0x9E,8), bin(0x1F4,12), bin(0x0C,8)]'),
    cp(BS, 'Give each count.', [['bits in one hex digit', '4'], ['bits in a byte', '8'], ['bytes in three 32-bit words', '12'], ['distinct values in 9 bits', '512']], 'A hex digit is 4 bits, a byte 8; three words = 3×4 bytes; 2<sup>9</sup> = 512.', '["4","8",String(3*32/8),String(2**9)]'),
    cp(BS, 'For <code>0b1011_0010_0110_1001</code> give the value of each (use 0/1 or an 8-bit pattern).', [['least significant bit', '1'], ['most significant bit', '1'], ['bit 1', '0'], ['bit 2', '0'], ['least significant byte', B('01101001')], ['most significant byte', B('10110010')]], 'Bits are numbered from the right: ...1001 means bit 0 = 1, bit 1 = 0, bit 2 = 0, bit 3 = 1. The low byte is the right 8 bits, the high byte the left 8.', '(function(){var n=0xB269; return [String(n&1), String(n>>15&1), String(n>>1&1), String(n>>2&1), bin(n&255,8), bin(n>>8,8)];})()'),
    h.mc(BS, 'In a 6-bit number, which bit is the <b>most significant</b>?', [['bit 0', 'Bit 0 is the least significant.'], ['bit 1', 'Not an end bit.'], ['bit 5', null], ['bit 6', 'A 6-bit number has bits 5 down to 0.']].map(function (o, i) { return i === 2 ? 'bit 5' : o; }), 2, 'The MSB is bit n−1 = bit 5.'),
    h.mc(BS, 'Why are memory addresses usually printed in hex?', ['Each hex digit is exactly 4 bits, so it is a compact way to write the binary', ['Hex numbers are stored differently in hardware', 'Hardware stores bits; hex is notation.'], ['Hex can store larger numbers than binary', 'Same numbers, different notation.'], ['Decimal cannot represent addresses', 'It can, but it does not line up with bit boundaries.']], 0, 'The 4-bits-per-digit alignment makes hex readable for humans working with binary data.'),
    cp(RG, 'For <b>5-bit two’s complement</b>, give the most negative and the most positive value (decimal), and the largest <b>unsigned</b> value.', [['most negative', '-16'], ['most positive', '15'], ['largest unsigned', '31']], '[−2<sup>4</sup>, 2<sup>4</sup>−1] = [−16, 15]; unsigned 2<sup>5</sup>−1 = 31.', '[String(-(2**4)), String(2**4-1), String(2**5-1)]'),
    h.mc(RG, 'Which pattern has the <b>largest value when read as two’s complement</b>?', [['<code>0b1111_0000</code>', 'MSB 1 means negative (−16).'], ['<code>0b1000_0001</code>', 'Negative (−127).'], '<code>0b0111_1110</code>', ['<code>0b0000_0001</code>', 'Only 1.'], ['<code>0b1100_0000</code>', 'Negative (−64).']], 2, '0b0111_1110 is 126; the others are 1 or negative.'),
    h.mc(RG, 'Which of the same patterns has the <b>largest value when read as unsigned</b>?', ['<code>0b1111_0000</code> (240)', ['<code>0b1000_0001</code>', '129.'], ['<code>0b0111_1110</code>', '126.'], ['<code>0b0000_0001</code>', '1.'], ['<code>0b1100_0000</code>', '192.']], 0, 'Unsigned just adds powers of two; 1111_0000 = 240 is largest.'),
    cp(IN, 'Interpret the 6-bit pattern <code>0b100110</code> in each representation (decimal).', [['sign-magnitude', '-6'], ['unsigned', '38'], ['one’s complement', '-25'], ['two’s complement', '-26']], 'Sign-magnitude: −(00110) = −6. Unsigned 32+4+2 = 38. One’s: flip → 011001 = 25 → −25. Two’s: 38 − 64 = −26.', '[String(-6), String(38), String(-25), String(wrap(38,6,true))]'),
    cp(IN, 'Interpret the 6-bit pattern <code>0b111000</code> in each representation (decimal).', [['sign-magnitude', '-24'], ['unsigned', '56'], ['one’s complement', '-7'], ['two’s complement', '-8']], 'Sign-magnitude: −(11000) = −24. Unsigned 32+16+8 = 56. One’s: flip → 000111 = 7 → −7. Two’s: 56 − 64 = −8.', '[String(-24), String(56), String(-7), String(wrap(56,6,true))]'),
    cp(IN, 'Interpret the 6-bit pattern <code>0b010011</code> in each representation (decimal).', [['sign-magnitude', '19'], ['unsigned', '19'], ['one’s complement', '19'], ['two’s complement', '19']], 'When the MSB is 0 every representation agrees: 16+2+1 = 19.', '["19","19","19","19"]')
  ];
  Mastery.checkpoint('u13', items, {
    title: 'HW3-style mini-checker, conversions, bits & ranges',
    source: 'Mirrors HW3 Q1–Q4',
    blurb: 'Same question styles as HW3’s conversions, bit/byte basics, two’s complement range and “interpret the bit pattern four ways” questions, with fresh numbers. The arithmetic and bitwise parts of HW3 are checkpoints on the CL07 and CL08 units. Auto-graded, unlimited retries, best score kept.'
  });
})();
