/* U14 checkpoint: HW3-style mini-checker, extension, unsigned/two's complement addition, subtraction.
   Original operands; every stored result and overflow answer is machine-verified. */
(function () {
  var h = Mastery.h;
  var EX = 'Sign & zero extension', UA = 'Unsigned addition', TA = 'Two’s complement addition', SB = 'Subtraction';
  function B(bits) { var g = bits.replace(/(?=(?:[01]{4})+$)/g, '_').replace(/^_/, ''); return bits + '~~~' + g + '~~~0b' + bits + '~~~0b' + g; }
  function yn(b) { return b ? 'yes' : 'no'; }
  function bin(n, w) { return ((n >>> 0).toString(2).padStart(w, '0')).slice(-w); }
  function wrapS(n, w) { var m = Math.pow(2, w); var v = ((n % m) + m) % m; return v >= m / 2 ? v - m : v; }
  function sv(s) { return wrapS(parseInt(s, 2), s.length); }
  function sp(s) { return s.length > 4 ? s.slice(0, s.length - 4) + '_' + s.slice(-4) : s; }
  /* unsigned add: a + b in w bits */
  function addU(a, b) {
    var w = a.length, t = parseInt(a, 2) + parseInt(b, 2);
    return h.mem(UA, 'Add these <b>unsigned</b> ' + w + '-bit numbers: <code>0b' + sp(a) + ' + 0b' + sp(b) + '</code>. Give the stored ' + w + '-bit result and whether it overflowed.', '',
      [['result (' + w + ' bits)', B(bin(t, w))], ['overflow? (yes/no)', yn(t >= Math.pow(2, w))]],
      parseInt(a, 2) + ' + ' + parseInt(b, 2) + ' = ' + t + '. ' + (t >= Math.pow(2, w) ? 'That needs ' + (w + 1) + ' bits, so there is a carry out of the top column and the stored result wraps.' : 'It fits in ' + w + ' bits, so no carry out of the top column.'),
      { verify: { js: '[bin(' + t + ',' + w + '), "' + yn(t >= Math.pow(2, w)) + '"]' } });
  }
  /* two's complement add */
  function addS(a, b) {
    var w = a.length, x = sv(a), y = sv(b), t = x + y, ov = wrapS(t, w) !== t;
    return h.mem(TA, 'Add these <b>two’s complement</b> ' + w + '-bit numbers: <code>0b' + sp(a) + ' + 0b' + sp(b) + '</code>. Give the stored ' + w + '-bit result and whether it overflowed.', '',
      [['result (' + w + ' bits)', B(bin(t, w))], ['overflow? (yes/no)', yn(ov)]],
      x + ' + (' + y + ') = ' + t + '. ' + (ov ? 'The range is [' + (-Math.pow(2, w - 1)) + ', ' + (Math.pow(2, w - 1) - 1) + '] so the sum does not fit and the stored bits show the wrong value (' + wrapS(t, w) + ').' : 'It fits in the range, so no overflow' + ((x < 0) !== (y < 0) ? ' (opposite signs can never overflow).' : '.')),
      { verify: { js: '[bin(' + t + ',' + w + '), "' + yn(ov) + '"]' } });
  }
  /* two's complement subtraction a - b via negate and add */
  function sub(a, b) {
    var w = a.length, x = sv(a), y = sv(b), t = x - y;
    return h.mem(SB, 'Subtract the second operand from the first by negating it and adding, in ' + w + '-bit two’s complement: <code>0b' + sp(a) + ' − 0b' + sp(b) + '</code>. Give the stored result.', '',
      [['result (' + w + ' bits)', B(bin(t, w))]],
      x + ' − (' + y + ') = ' + t + (wrapS(t, w) !== t ? ' but that is outside the ' + w + '-bit range, so the stored bits wrap to ' + wrapS(t, w) + '.' : '.') + ' Negate the second operand (flip, add 1) and add; discard the carry out of the top.',
      { verify: { js: '[bin(' + t + ',' + w + ')]' } });
  }
  function ext(kind, bits, to) {
    var w = bits.length, v = kind === 'sign' ? bin(sv(bits), to) : bin(parseInt(bits, 2), to);
    return h.mem(EX, kind === 'sign' ? 'Sign-extend the two’s complement number <code>0b' + sp(bits) + '</code> to ' + to + ' bits.' : 'Zero-extend the unsigned number <code>0b' + sp(bits) + '</code> to ' + to + ' bits.', '',
      [['result', B(v)]],
      kind === 'sign' ? 'Copy the MSB (' + bits[0] + ') into every new high bit.' : 'Fill the new high bits with 0s.',
      { verify: { js: '[bin(' + (kind === 'sign' ? sv(bits) : parseInt(bits, 2)) + ',' + to + ')]' } });
  }
  var items = [
    ext('sign', '0101', 8), ext('sign', '1010', 8), ext('sign', '10011', 8), ext('sign', '011010', 8), ext('zero', '1011', 8),
    h.mc(EX, 'What happens if you <b>zero-extend</b> a negative two’s complement number instead of sign-extending it?', ['It turns into a different, positive value', ['Nothing, the value stays the same', 'Only sign extension preserves a negative value.'], ['It becomes zero', 'The bits are still there.'], ['The program crashes', 'No crash; the value is simply wrong.']], 0, 'For example 4-bit 1010 (−6) zero-extended to 8 bits is 0000_1010 = 10.'),
    h.mc(EX, 'A 16-bit signed value is stored as <code>0b1000_0000_0111_0011</code>. When sign-extended to 32 bits, what are the top 16 bits?', ['All ones', ['All zeros', 'That would only be correct if the MSB were 0.'], ['Half zeros, half ones', 'Every new bit copies the MSB.'], ['The same as the low 16 bits', 'The new bits all equal the MSB.']], 0, 'The MSB is 1, so all 16 new high bits are 1.'),
    h.mc(EX, 'In C an <code>int16_t</code> holds −7 and is promoted to <code>int32_t</code>. What happens?', ['The value stays −7 because it is sign-extended', ['The value becomes 7', 'Sign extension keeps the sign.'], ['The value becomes 65529', 'That would be zero extension of the bit pattern.'], ['The value is invalid', 'Promotion is routine in C.']], 0, 'Signed types are sign-extended, preserving the value.'),
    addU('01101', '01011'), addU('10110', '01001'), addU('1110', '0100'), addU('11001', '10111'),
    addS('001101', '110010'), addS('011100', '001100'), addS('101001', '100110'), addS('11010', '10101'), addS('01110', '00101'), addS('10001', '01111'),
    sub('010110', '001001'), sub('000101', '001110'), sub('01100', '10100'), sub('10010', '00011'), sub('00110', '11110'), sub('11000', '01100')
  ];
  Mastery.checkpoint('u14', items, {
    title: 'HW3-style mini-checker, extension, addition and subtraction',
    source: 'Mirrors HW3 Q5–Q9',
    blurb: 'Same shapes as HW3’s sign/zero-extension, unsigned addition, two’s complement addition (with overflow) and subtraction questions, with fresh operands. Work the columns on paper first, then type the stored result. Every answer was computed independently and checked by the validator. Auto-graded, unlimited retries, best score kept.'
  });
})();
