/* U25 · CL16 Intro to Pointers (+ RD14: DiS 2.1, 2.2): parts of program memory, addresses, pointers, & and *, NULL, aliasing,
   double pointers, memory-diagram traces. Every traced output is checked by compiling and running the code. */
(function () {
  var h = Mastery.h;
  var PRE = '#include <stdio.h>\n#include <stdint.h>\n';
  function C(body, expect) { return { src: PRE + body, expect: expect }; }
  Mastery.unit({
    id: 'u25', order: 16, title: 'CL16 · Intro to pointers & program memory', short: 'CL16 Pointers',
    blurb: 'Where a program’s data lives (text, data, heap, stack), what a memory address is, and how pointers store addresses: declaring, & (address-of), * (dereference), NULL, aliasing and double pointers, traced with memory diagrams.',
    lessons: [{ id: 'l25', label: 'CL16 · Intro to Pointers (RD14)' }, { id: 'l27', label: 'HW06 · Pointers' }],
    learn: {
      big: [
        '<b>Parts of program memory</b> (lowest to highest address): <b>text</b> (program instructions), <b>data</b> (global and static variables), <b>heap</b> (dynamically allocated memory, grows as needed), and the <b>stack</b> (function stack frames: parameters, return address, locals). The stack <b>grows toward lower addresses</b> when functions are called and shrinks when they return, automatically. Local variables live only in their function\'s frame; globals live for the whole run (and are generally discouraged).',
        '<b>An address is a byte number.</b> With <i>n</i> address bits you can name 2<sup>n</sup> bytes: 8 bytes need 3 bits, 16 bytes need 4, 1 GB (2<sup>30</sup> bytes) needs 30. A 32-bit address space reaches 4 GB; 64-bit addresses are why pointers are <b>8 bytes</b> (hardware actually uses 48 of the 64 bits: 2<sup>48</sup> = 256 TB).',
        'A <b>pointer is a variable that stores a memory address</b>, not a value. <code>int *p;</code> declares <code>p</code> as a pointer to an int; <code>double *d</code>, <code>char *c</code> likewise. <b>Pointer types matter</b>: an <code>int8_t *</code> points only at <code>int8_t</code>s, and so on. <b>Every pointer is 8 bytes</b> whatever it points to.',
        '<b>&amp; (address-of)</b> gets a variable\'s address: <code>int *p = &amp;x;</code>. <b>* (dereference)</b> follows the address: <code>*p</code> reads the value at that address; <code>*p = 10;</code> writes to it, changing <code>x</code>. In a diagram: follow the arrow <b>once</b>, then read or write the location.',
        '<b>NULL</b> means “points to nothing valid”. <b>Never dereference NULL</b> (or an uninitialized pointer): the program crashes with a <b>segmentation fault</b>.',
        '<b>Aliasing:</b> two pointers holding the same address (<code>q = p;</code>) refer to the same variable, so a write through one is visible through the other. <b>Double pointer:</b> <code>int **dp = &amp;p;</code> stores the address of a pointer; <code>*dp</code> is the <code>int *</code>, <code>**dp</code> is the <code>int</code> (follow the arrow twice).'
      ],
      traps: [
        'Thinking a pointer holds the value. It holds where the value lives.',
        'Writing <code>p = 10;</code> when you meant <code>*p = 10;</code> (the first changes where p points, the second changes the pointed-to variable).',
        'Writing <code>int *p = x;</code> instead of <code>&amp;x</code> (type mismatch).',
        'Dereferencing NULL or an uninitialized pointer (segmentation fault / undefined behavior).',
        'Assuming pointer size depends on the target type: it is always 8 bytes (<code>sizeof(int8_t *) == sizeof(double *) == 8</code>).',
        'Losing track of aliases: after <code>q = p;</code>, <code>*q = 20;</code> also changes <code>*p</code> and the variable behind them.'
      ],
      examples: [
        { kind: 'worked', title: 'Trace: <code>int32_t x = 1, y = 2; int32_t *p = &amp;x; *p = *p + y;</code>. What are x and y?', steps: [
          ['1', '<code>x = 1</code> and <code>y = 2</code> are two stack variables; <code>p</code> is a third (8 bytes) holding the <b>address of x</b>.', 'Draw an arrow from p to x.'],
          ['2', 'On the right side, <code>*p</code> follows the arrow once and <b>reads</b> x: 1. So the right side is 1 + 2 = 3.', 'Read before write.'],
          ['3', 'On the left side, <code>*p</code> follows the arrow once and <b>writes</b> 3 into x.', 'x becomes 3.'],
          ['4', 'y never changed. Output of <code>printf("%d %d", x, y)</code>: <b>3 2</b>.', 'p still points at x.']
        ], takeaway: 'Follow the arrow once to read or write the pointed-to variable; the pointer itself is unchanged by *p = ….' },
        { kind: 'complete', item: h.mem('retarget a pointer', 'Trace. The first row is given.', 'int8_t a = 3;\nint8_t b = 7;\nint8_t *p = &a;\np = &b;\n*p = 10;', [['p after line 4 points to', 'b', 'given'], ['a', '3'], ['b', '10']], '<code>p = &amp;b;</code> changes the address stored in p. <code>*p = 10;</code> then writes through the new target, b. a is untouched.', { verify: C('int main(void){int8_t a=3;int8_t b=7;int8_t *p=&a;p=&b;*p=10;printf("b\\n%d\\n%d\\n",a,b);}', ['b', '3', '10']), outputOnly: true }) },
        { kind: 'solo', item: h.mem('your turn', 'What do <code>x</code>, <code>*p</code>, <code>y</code>, <code>*q</code> print?', 'int16_t x = 5;\nint16_t y = 10;\nint16_t *p = &x;\nint16_t *q = p;\n*q = 20;', [['x', '20'], ['*p', '20'], ['y', '10'], ['*q', '20']], 'q is an alias of p, so writing through q changes x; y is separate.', { verify: C('int main(void){int16_t x=5;int16_t y=10;int16_t *p=&x;int16_t *q=p;*q=20;printf("%d\\n%d\\n%d\\n%d\\n",x,*p,y,*q);}', ['20', '20', '10', '20']) }) }
      ]
    },
    cards: [
      ['Name the four parts of program memory, low to high address.', 'Text (instructions), data (globals/statics), heap (dynamic memory), stack (function frames).'],
      ['Which way does the stack grow?', 'Toward lower addresses: a frame is pushed on each call and popped on return, automatically.'],
      ['What lives in a stack frame?', 'Parameters, the return address and local variables of one function call.'],
      ['Scope vs lifetime of a local variable?', 'Scope: the function body where it is declared. It exists only while that function\'s frame is on the stack.'],
      ['How many bits to address N bytes?', '<code>log<sub>2</sub>(N)</code>: 8 bytes → 3 bits, 16 → 4, 1 GB = 2<sup>30</sup> → 30 bits.'],
      ['How much memory can 32-bit and 64-bit addresses name?', '32-bit: 2<sup>32</sup> = 4 GB. 64-bit: 2<sup>64</sup> bytes (hardware uses 48 bits: 256 TB).'],
      ['Why are pointers 8 bytes?', 'Modern machines use 64-bit addresses.'],
      ['What is a pointer?', 'A variable that stores a memory address (where a value lives), not the value itself.'],
      ['Declare a pointer to an int / char / double.', '<code>int *p;</code> <code>char *c;</code> <code>double *d;</code>'],
      ['Why do pointer types matter?', 'A pointer type says what it may point to and how many bytes to read: <code>int8_t *</code> points only at int8_t.'],
      ['What does & do?', 'Address-of: <code>&amp;x</code> is the address of x. <code>int *p = &amp;x;</code>.'],
      ['What does * do on a pointer?', 'Dereference: <code>*p</code> reads (or, on the left of =, writes) the value at the address in p.'],
      ['Read vs write through a pointer?', 'Right side <code>y = *p</code> reads the target; left side <code>*p = 10</code> writes the target.'],
      ['What is NULL and why avoid dereferencing it?', 'An invalid/uninitialized pointer value. Dereferencing it crashes with a segmentation fault.'],
      ['What is aliasing?', 'Two or more pointers holding the same address, so they refer to the same variable.'],
      ['What is a double pointer?', '<code>int **dp</code> stores the address of an <code>int *</code>. <code>*dp</code> is the int pointer, <code>**dp</code> the int.'],
      ['How do you print an address?', '<code>printf("%p", (void *)p);</code> (addresses are written in hex).']
    ],
    tiers: {
      recognize: [
        h.mc('where stored', 'Where are the <b>instructions</b> of functions such as <code>main</code> stored?', ['Text (code) segment', ['Stack', 'The stack holds frames, not instructions.'], ['Heap', 'The heap holds dynamic data.'], ['Data segment', 'The data segment holds global/static variables.']], 0, 'Program instructions live in the text segment.'),
        h.mc('which region long-lived', 'Which variable exists for the entire run of the program?', ['A global variable', ['A parameter of a function', 'It disappears when the function returns.'], ['A local variable in main\'s callee', 'Its frame is popped on return.'], ['A loop counter declared in a function', 'Gone when the function returns.']], 0, 'Globals live in the data segment for the whole run.'),
        h.mc('stack direction', 'When a function is called, where does the new stack frame appear?', ['At a lower address than the caller\'s frame', ['At a higher address', 'The stack grows toward lower addresses.'], ['In the heap', 'Frames are on the stack.'], ['In the text segment', 'That holds instructions.']], 0, 'The stack grows downward (toward lower addresses).'),
        h.mc('what is pointer', 'What does a pointer variable store?', ['The memory address of another variable', ['The value of another variable', 'That would be the variable itself.'], ['The size of a memory location', 'Sizes come from sizeof.'], ['A function\'s return value', 'Unrelated.']], 0, 'A pointer holds an address.'),
        h.mc('address operator', 'Which operator obtains the address of a variable?', ['<code>&amp;</code>', ['<code>*</code>', 'That dereferences.'], ['<code>-&gt;</code>', 'That accesses struct members.'], ['<code>#</code>', 'Not an operator in C.']], 0, '<code>&amp;x</code> is the address of x.'),
        h.mc('deref operator', 'Which operator accesses the value at the address a pointer holds?', ['<code>*</code>', ['<code>&amp;</code>', 'That gets an address.'], ['<code>@</code>', 'Not C.'], ['<code>-&gt;</code>', 'Struct member access.']], 0, '<code>*p</code> dereferences p.'),
        h.mc('null deref', 'What happens when this runs? <code>int *ptr = NULL; *ptr = 6;</code>', ['A segmentation fault (crash)', ['ptr points to 6', 'That is not what * does.'], ['Nothing', 'NULL is not a valid address to write.'], ['6 is printed', 'Nothing is printed.']], 0, 'Dereferencing NULL is invalid.'),
        h.mc('double pointer meaning', 'What is <code>int **pp</code>?', ['A pointer to a pointer to an int', ['A pointer to an int', 'That is int *.'], ['A 2-D array', 'No.'], ['A reference to an int', 'C has no references.']], 0, 'Two stars: the address of an <code>int *</code>.'),
        h.multi('pointer facts', 'Select <b>all</b> true statements about pointers.', ['Every pointer is 8 bytes on a 64-bit machine', '<code>int8_t *</code> should point only at <code>int8_t</code> variables', ['<code>p = 10;</code> writes 10 into the variable p points to', 'That changes the address p stores; use *p = 10.'], 'After <code>q = p;</code> both point to the same location'], [0, 1, 3], 'Writing through a pointer needs the dereference operator.')
      ],
      trace: [
        h.mem('address bits', 'How many address bits are needed for each memory size?', '', [['8 bytes', '3'], ['16 bytes', '4'], ['1 GB (2^30 bytes)', '30'], ['256 TB (2^48 bytes)', '48']], '<code>bits = log<sub>2</sub>(bytes)</code>.', { verify: { js: '[String(Math.log2(8)),String(Math.log2(16)),String(Math.log2(2**30)),String(Math.log2(2**48))]' } }),
        h.mem('address space sizes', 'How much memory can each address width name, in GB (1 GB = 2^30 bytes)?', '', [['32-bit addresses', '4'], ['34-bit addresses', '16'], ['36-bit addresses', '64']], '2<sup>32−30</sup> = 4, 2<sup>34−30</sup> = 16, 2<sup>36−30</sup> = 64.', { verify: { js: '[String(2**(32-30)),String(2**(34-30)),String(2**(36-30))]' } }),
        h.trace('simple write', 'What does this print?', 'int x = 5;\nint *p = &x;\n*p = 8;\nprintf("%d", x);', '8', 'p holds the address of x; writing through it changes x.', { verify: C('int main(void){int x=5;int *p=&x;*p=8;printf("%d",x);}', ['8']) }),
        h.trace('add through pointer', 'What does this print?', 'int32_t x = 1;\nint32_t y = 2;\nint32_t *p = &x;\n*p = *p + y;\nprintf("%d %d", x, y);', '3 2', 'The right side reads x (1) and adds y (2); the left side writes 3 into x.', { verify: C('int main(void){int32_t x=1;int32_t y=2;int32_t *p=&x;*p=*p+y;printf("%d %d",x,y);}', ['3 2']) }),
        h.trace('swap targets', 'What does this print?', 'int64_t x = 4;\nint64_t y = 7;\nint64_t *p = &x;\nint64_t *q = &y;\n*p = *q;\n*q = 10;\nprintf("%ld, %ld, %ld, %ld", x, *p, y, *q);', '7, 7, 10, 10', '<code>*p = *q</code> copies 7 into x. Then <code>*q = 10</code> changes y. p and q still point to x and y.', { verify: C('int main(void){int64_t x=4;int64_t y=7;int64_t *p=&x;int64_t *q=&y;*p=*q;*q=10;printf("%ld, %ld, %ld, %ld",x,*p,y,*q);}', ['7, 7, 10, 10']) }),
        h.trace('double pointer write', 'What does this print?', 'int16_t x = 5;\nint16_t *p = &x;\nint16_t **dp = &p;\n**dp = 30;\nprintf("%d %d %d", x, *p, **dp);', '30 30 30', 'Follow the arrow twice (dp → p → x) and write 30 into x.', { verify: C('int main(void){int16_t x=5;int16_t *p=&x;int16_t **dp=&p;**dp=30;printf("%d %d %d",x,*p,**dp);}', ['30 30 30']) }),
        h.mem('chained pointers', 'Trace and give the final values.', 'int32_t a = 10;\nint32_t b = 20;\nint32_t *p = &a;\nint32_t *q = &b;\nint32_t **pp = &p;\n*pp = q;\n**pp = *p + a;', [['a', '10'], ['b', '30'], ['*p', '30'], ['*q', '30']], '<code>*pp = q</code> makes p point at b. Then <code>**pp = *p + a</code> reads b (20) and a (10) and writes 30 into b. a is unchanged.', { verify: C('int main(void){int32_t a=10;int32_t b=20;int32_t *p=&a;int32_t *q=&b;int32_t **pp=&p;*pp=q;**pp=*p+a;printf("%d\\n%d\\n%d\\n%d\\n",a,b,*p,*q);}', ['10', '30', '30', '30']) }),
        h.mem('sizeof pointers', 'Give the value of each (64-bit machine).', '', [['sizeof(int8_t *)', '8'], ['sizeof(double *)', '8'], ['sizeof(char **)', '8'], ['sizeof(int32_t)', '4']], 'Every pointer is 8 bytes regardless of the target type.', { verify: C('int main(void){printf("%lu\\n%lu\\n%lu\\n%lu\\n",sizeof(int8_t*),sizeof(double*),sizeof(char**),sizeof(int32_t));}', ['8', '8', '8', '4']) })
      ],
      debug: [
        h.bug('missing address-of', 'The code should make p point to x but does not compile cleanly. Find the bug.', ['int x = 5;', 'int *p = x;', '*p = 9;'], 1, [['x is an int, not an address: it should be &x', 'A pointer must be initialized with an address.'], ['The star is in the wrong place', '<code>int *p</code> is the right declaration.']], 0, 'Use <code>int *p = &amp;x;</code>.'),
        h.bug('forgot star', 'The code should set x to 20 through the pointer, but x stays 10 (and the compiler warns). Which line is wrong?', ['int x = 10;', 'int *p = &x;', 'p = 20;', 'printf("%d", x);'], 2, [['It assigns 20 to the pointer itself instead of to the variable it points to (*p = 20)', 'Without * you change where p points.'], ['p should be declared as int', 'It must be a pointer.']], 0, 'Use <code>*p = 20;</code>.'),
        h.bug('uninitialized pointer', 'The program crashes. Which line is the root cause?', ['int *p;', '*p = 7;', 'printf("%d", *p);'], 1, [['p was never given an address, so *p writes through a garbage pointer', 'Initialize p (e.g. to &x) before dereferencing.'], ['printf should print &p', 'The crash happens earlier.']], 0, 'An uninitialized pointer holds garbage; dereferencing it is undefined behavior.'),
        h.parsons('make an alias', 'Arrange lines that make <code>q</code> an alias of <code>x</code> and then set x to 20 through q. One line does not belong.', ['int x = 5;', 'int *p = &x;', 'int *q = p;', '*q = 20;'], ['int q = &p;'], 'Copy the address in p into q; then both point at x.')
      ],
      integrate: [
        h.mem('memory diagram values', 'After the code runs, give the stored values (do the stack diagram on paper first).', 'int32_t a = 5, b = 7, c = 11, d = 15;\nint32_t *ap = &a, *bp = &b, *cp = &c, *dp = &d;\n*ap = 9;\n*bp = 10;\n*cp = *bp;\ndp = ap;\n*dp = 20;', [['a', '20'], ['b', '10'], ['c', '10'], ['d', '15']], '<code>*cp = *bp</code> copies 10 into c. <code>dp = ap</code> retargets dp to a, and <code>*dp = 20</code> then overwrites a (replacing 9). d still holds 15 because the last write went to a.', { verify: C('int main(void){int32_t a=5,b=7,c=11,d=15;int32_t *ap=&a,*bp=&b,*cp=&c,*dp=&d;*ap=9;*bp=10;*cp=*bp;dp=ap;*dp=20;printf("%d\\n%d\\n%d\\n%d\\n",a,b,c,d);}', ['20', '10', '10', '15']) }),
        h.trace('string pointer', 'What does this print?', 'char s[] = "abcd";\nchar *p = s + 1;\nprintf("%s", p + 1);', 'cd', '<code>s + 1</code> points at \'b\'; <code>p + 1</code> points at \'c\'; %s prints from there to the NUL: cd.', { verify: C('int main(void){char s[]="abcd";char *p=s+1;printf("%s",p+1);}', ['cd']) })
      ],
      produce: [
        h.free('draw it', 'For <code>int8_t a = 3; int8_t b = 7; int8_t *p = &amp;a; p = &amp;b; *p = 10;</code> describe the memory diagram after each line and give the final printed values of <code>a</code> and <code>b</code>.', 'After line 3 p holds the address of a (arrow to a). Line 4 changes p to hold the address of b (arrow moves to b); a is still 3, b is still 7. Line 5 follows the arrow once and writes 10 into b. Final: a = 3, b = 10.', ['Shows p pointing at a after line 3', 'Shows the arrow moving to b after line 4 without changing a or b', 'Shows the write through p changes b', 'States a = 3 and b = 10'], 4),
        h.explain('pointers', '<b>Teach it.</b> Explain what a pointer is, what & and * do, why NULL must not be dereferenced, and what aliasing means.', ['A pointer is a variable whose value is a memory address', '& gets the address of a variable; * follows an address to read or write the value there', 'Dereferencing NULL or an uninitialized pointer accesses invalid memory and causes a segmentation fault', 'Aliasing is two pointers holding the same address, so a write through one is seen through the other'], 'A pointer stores where a value lives. &x gives that address and *p follows it. NULL means no valid target, so using it crashes. If q = p, both refer to the same variable.', 4)
      ]
    }
  });
})();
