/* U09 deep dive: printf placeholders, from the ground up.
   Adds full teaching sections, worked examples, cards and a graded practice ladder to the CL02 unit.
   Every example output below was produced by a real compiler; every computable answer is verified. */
(function () {
  var h = Mastery.h;
  var P = '#include <stdio.h>\n#include <stdint.h>\n#include <string.h>\n';
  function C(body, expect) { return { src: P + body, expect: expect }; }
  /* number of leading / trailing spaces a printf conversion produces */
  function lead(fmt, args) { return '{char b[64];snprintf(b,64,"' + fmt + '",' + args + ');int n=0;while(b[n]==\' \')n++;printf("%d\\n",n);}'; }
  function trail(fmt, args) { return '{char b[64];snprintf(b,64,"' + fmt + '",' + args + ');int n=(int)strlen(b);int k=0;while(n>0&&b[n-1]==\' \'){n--;k++;}printf("%d\\n",k);}'; }
  var T = 'printf placeholders';

  Mastery.extend('u09', {
    sections: [
      { title: '1 \u00B7 How printf reads a format string', html: `
        <p><code>printf(format, arg1, arg2, \u2026)</code> prints the <b>format string</b>. The format string is ordinary text with <b>placeholders</b> (a <code>%</code> followed by a letter) mixed in. Everything that is not a placeholder is printed exactly as written. Each placeholder is replaced by the <b>next argument</b>, left to right.</p>
        <pre><code>int apples = 4;
double price = 1.50;
printf("I bought %d apples for $%.2f each.", apples, price);</code></pre>
        <p>Read it piece by piece:</p>
        <ol>
          <li><code>I bought </code> is plain text, printed as is.</li>
          <li><code>%d</code> takes the <b>first</b> argument, <code>apples</code>, as a whole number: <code>4</code>.</li>
          <li><code> apples for $</code> is plain text. The <code>$</code> is just a character here.</li>
          <li><code>%.2f</code> takes the <b>second</b> argument, <code>price</code>, as a decimal number with 2 digits after the point: <code>1.50</code>.</li>
          <li><code> each.</code> is plain text.</li>
        </ol>
        <p>Result: <span class="out">I bought 4 apples for $1.50 each.</span></p>
        <p><b>Three rules, always:</b> (1) one argument per placeholder, (2) in the same order, (3) each argument's <i>type</i> must suit its placeholder. Break any of these and the output is wrong or garbage. Also remember <code>printf</code> never adds a newline: write <code>\\n</code> yourself.</p>` },
      { title: '2 \u00B7 The placeholders you need', html: `
        <table>
          <tr><th>Placeholder</th><th>Prints</th><th>Argument type</th><th>Example call</th><th>Output</th></tr>
          <tr><td><code>%d</code></td><td>whole number (signed)</td><td><code>int</code> (also <code>short</code>, <code>char</code> as a number)</td><td><code>printf("%d", 25)</code></td><td><span class="out">25</span></td></tr>
          <tr><td><code>%u</code></td><td>whole number (unsigned)</td><td><code>unsigned int</code></td><td><code>printf("%u", 25u)</code></td><td><span class="out">25</span></td></tr>
          <tr><td><code>%f</code></td><td>decimal number, <b>6 digits</b> after the point by default</td><td><code>float</code>, <code>double</code></td><td><code>printf("%f", 3.14)</code></td><td><span class="out">3.140000</span></td></tr>
          <tr><td><code>%c</code></td><td>one character</td><td><code>char</code> (or a number read as an ASCII code)</td><td><code>printf("%c", 'A')</code></td><td><span class="out">A</span></td></tr>
          <tr><td><code>%s</code></td><td>a whole string</td><td><code>char</code> array / string literal</td><td><code>printf("%s", "Hello")</code></td><td><span class="out">Hello</span></td></tr>
          <tr><td><code>%x</code> / <code>%X</code></td><td>hexadecimal (lower / upper case)</td><td><code>int</code></td><td><code>printf("%x", 255)</code></td><td><span class="out">ff</span></td></tr>
          <tr><td><code>%zu</code> (or <code>%lu</code>)</td><td>unsigned long: the result of <code>sizeof</code></td><td><code>sizeof(...)</code></td><td><code>printf("%zu", sizeof(int))</code></td><td><span class="out">4</span></td></tr>
          <tr><td><code>%%</code></td><td>a literal percent sign</td><td>(none)</td><td><code>printf("95%%")</code></td><td><span class="out">95%</span></td></tr>
        </table>
        <p><b>The same bits, two views:</b> a <code>char</code> is a small number. <code>printf("%c", 66)</code> prints <span class="out">B</span> and <code>printf("%d", 'A')</code> prints <span class="out">65</span>. And <code>printf("%d %c", 'a', 'a')</code> prints <span class="out">97 a</span>.</p>
        <p><b>Which to pick:</b> look at the <i>type of the argument</i>. Whole number \u2192 <code>%d</code>. Anything with a decimal point (<code>double</code>) \u2192 <code>%f</code>. One letter \u2192 <code>%c</code>. A word or sentence in a char array \u2192 <code>%s</code>. A <code>sizeof</code> \u2192 <code>%zu</code>.</p>` },
      { title: '3 \u00B7 Controlling how a value looks: precision, width, flags', html: `
        <p>A placeholder can be written <code>%[flags][width][.precision]letter</code>. The parts are optional.</p>
        <ul>
          <li><b>Precision</b> (<code>.N</code>) on <code>%f</code> is the number of digits <i>after the decimal point</i>. The value is <b>rounded</b>, not chopped, and padded with zeros: <code>%.2f</code> prints 5.678 as <span class="out">5.68</span>, 2.5 as <span class="out">2.50</span>, and 3.14159 as <span class="out">3.14</span>. <code>%.0f</code> prints 2.6 as <span class="out">3</span>. <code>%.1f</code> prints 7/2.0 as <span class="out">3.5</span>.</li>
          <li><b>Width</b> (a number before the letter) is the <i>minimum</i> number of columns. Shorter values are padded with spaces on the <b>left</b>. <code>%5d</code> prints 42 as <span class="out">   42</span> (3 spaces then 42).</li>
          <li><b>Flag <code>-</code></b> pads on the <b>right</b> instead: <code>%-5d</code> prints 42 as <span class="out">42   </span>. <b>Flag <code>0</code></b> pads with zeros: <code>%05d</code> prints <span class="out">00042</span>.</li>
          <li>They combine: <code>%8.2f</code> prints 3.14159 as <span class="out">    3.14</span> (4 spaces, then 3.14, 8 columns total).</li>
          <li>Width works on strings too: <code>%10s</code> prints hi as <span class="out">        hi</span> (8 spaces), <code>%-10s</code> pads after it.</li>
        </ul>
        <p>Rounding is to the nearest value of the digits you ask for. A value that sits exactly halfway in binary can go either way, so exam questions use values that are clearly on one side (like 5.678 \u2192 5.68).</p>` },
      { title: '4 \u00B7 Matching rules and the usual mistakes', html: `
        <table>
          <tr><th>Mistake</th><th>What happens</th><th>Fix</th></tr>
          <tr><td><code>printf("%d", 4.5)</code> (<code>%d</code> with a double)</td><td>The bits of the double are read as an int: garbage.</td><td>Use <code>%f</code> / <code>%.1f</code>, or cast: <code>(int)4.5</code> gives 4.</td></tr>
          <tr><td><code>printf("%f", count)</code> (<code>%f</code> with an int)</td><td>Garbage, for the same reason.</td><td>Use <code>%d</code>.</td></tr>
          <tr><td><code>printf("%s scored %d", score, name)</code></td><td>Arguments in the wrong order: wrong types for the placeholders, garbage or a crash.</td><td>Arguments follow the placeholders in order: <code>name, score</code>.</td></tr>
          <tr><td>Fewer arguments than placeholders</td><td>Undefined behavior: it prints whatever happens to be there.</td><td>Count placeholders and arguments: they must match.</td></tr>
          <tr><td><code>printf("100% done")</code></td><td>The <code>%</code> starts a placeholder: broken output.</td><td>Write <code>%%</code> for a literal percent sign.</td></tr>
          <tr><td>Forgetting <code>\\n</code></td><td>The next output continues on the same line.</td><td>End lines with <code>\\n</code>.</td></tr>
          <tr><td><code>%c</code> given a whole string</td><td>Only a single character (or garbage) prints.</td><td>Use <code>%s</code> for strings.</td></tr>
        </table>
        <p><b>Expressions are fine as arguments:</b> they are computed first and their <i>type</i> decides the placeholder. <code>7/2</code> is the int <code>3</code> (use <code>%d</code>); <code>7/2.0</code> is the double <code>3.5</code> (use <code>%f</code>); <code>qty * price</code> with <code>int qty</code> and <code>double price</code> is a <b>double</b>, so it needs <code>%f</code>.</p>` },
      { title: '5 \u00B7 Special characters in a format string', html: `
        <table>
          <tr><th>Write</th><th>Prints</th></tr>
          <tr><td><code>\\n</code></td><td>a newline (move to the next line)</td></tr>
          <tr><td><code>\\t</code></td><td>a tab</td></tr>
          <tr><td><code>\\\\</code></td><td>one backslash</td></tr>
          <tr><td><code>\\"</code></td><td>one double quote (otherwise a quote ends the string)</td></tr>
          <tr><td><code>%%</code></td><td>one percent sign</td></tr>
        </table>
        <pre><code>printf("She said \\"Hi\\"\\nC:\\\\Temp\\tdone\\n");</code></pre>
        <p>prints:</p><pre><code>She said "Hi"
C:\\Temp	done</code></pre>
        <p>(the gap before <code>done</code> is a tab). Each escape sequence is <b>one character</b>.</p>` },
      { title: '6 \u00B7 A method: from the output you want to the format string', html: `
        <p>Problems give you variables and ask for a format string that produces exact text. Follow these steps every time.</p>
        <p><b>Target:</b> <span class="out">Sam completed 8 assignments with an average of 91.7.</span><br>Variables: <code>char name[] = "Sam";</code> <code>int assignments = 8;</code> <code>double average = 91.67;</code> (the average must show exactly one digit after the point)</p>
        <ol>
          <li><b>Cut the target</b> into pieces: <code>Sam</code> | <code> completed </code> | <code>8</code> | <code> assignments with an average of </code> | <code>91.7</code> | <code>.</code></li>
          <li><b>Mark the pieces that come from variables:</b> <code>Sam</code> (name), <code>8</code> (assignments), <code>91.7</code> (average). Everything else is literal text (spaces and punctuation included).</li>
          <li><b>Choose each placeholder from the variable's type:</b> string \u2192 <code>%s</code>; int \u2192 <code>%d</code>; double with one decimal \u2192 <code>%.1f</code>.</li>
          <li><b>Assemble</b> in order: <code>"%s completed %d assignments with an average of %.1f."</code> with arguments <code>name, assignments, average</code> in the same order.</li>
          <li><b>Check:</b> 3 placeholders, 3 arguments; types match; any quotes, backslashes or percent signs escaped; newline added if the output must end a line.</li>
        </ol>
        <p>Result: <span class="out">Sam completed 8 assignments with an average of 91.7.</span> (91.67 rounded to one decimal is 91.7.)</p>` }
    ],
    examples: [
      { kind: 'worked', title: 'Build the format string for the target <code>I ate 5 plates of tacos.</code> given <code>char food[] = "tacos"; int n = 5;</code>', code: 'printf("I ate %d plates of %s.", n, food);',
        steps: [
          ['1 \u00B7 cut', '<code>I ate </code> | <code>5</code> | <code> plates of </code> | <code>tacos</code> | <code>.</code>', 'Separate fixed text from the parts that come from variables.'],
          ['2 \u00B7 types', '5 comes from <code>n</code> (int) \u2192 <code>%d</code>. tacos comes from <code>food</code> (a string) \u2192 <code>%s</code>.', 'The variable\u2019s type picks the placeholder.'],
          ['3 \u00B7 assemble', '<code>"I ate %d plates of %s."</code>', 'Literal text stays exactly as in the target, spaces included.'],
          ['4 \u00B7 arguments', '<code>n, food</code>, in the order the placeholders appear.', 'The first <code>%d</code> takes the first argument, the <code>%s</code> the second.'],
          ['5 \u00B7 check', '2 placeholders, 2 arguments, int \u2192 %d, string \u2192 %s. Prints <code>I ate 5 plates of tacos.</code>', 'Count and types match.']
        ], takeaway: 'Cut, mark the variable parts, choose by type, assemble in order, then check counts and types.' },
      { kind: 'complete', item: h.fill(T, 'Same method. Variables: <code>char pet[] = "cat"; int age = 4;</code> Target: <code>My cat is 4 years old.</code> Fill in the format string (the text between the quotes).', 'printf("__0__", pet, age);', ['My %s is %d years old.'], 'Cut: My | cat | is | 4 | years old. The pet is a string (<code>%s</code>) and the age an int (<code>%d</code>), in argument order.', { verify: C('int main(void){char pet[]="cat";int age=4;printf("My %s is %d years old.",pet,age);}', ['My cat is 4 years old.']) }) },
      { kind: 'solo', item: h.fill(T, 'Variables: <code>char name[] = "Sam"; int score = 92; double average = 91.67;</code> Target (average with exactly one decimal): <code>Sam scored 92 (avg 91.7%)</code> Fill in the format string. (Remember how to print a literal percent sign.)', 'printf("__0__", name, score, average);', ['%s scored %d (avg %.1f%%)'], 'Placeholders in order: <code>%s</code> name, <code>%d</code> score, <code>%.1f</code> average, and <code>%%</code> for the literal percent sign.', { verify: C('int main(void){char name[]="Sam";int score=92;double average=91.67;printf("%s scored %d (avg %.1f%%)",name,score,average);}', ['Sam scored 92 (avg 91.7%)']) }) }
    ],
    cards: [
      ['What are the three rules for matching printf arguments?', 'One argument per placeholder, in the same order, and each argument\u2019s type must suit its placeholder.'],
      ['Which placeholder for an <code>int</code>, a <code>double</code>, a <code>char</code>, a string, a <code>sizeof</code>?', '<code>%d</code>, <code>%f</code>, <code>%c</code>, <code>%s</code>, <code>%zu</code> (or <code>%lu</code>).'],
      ['What does <code>%f</code> print by default?', 'Six digits after the decimal point: <code>printf("%f", 3.14)</code> prints <code>3.140000</code>.'],
      ['What does <code>%.2f</code> do? Is it rounded or cut?', 'Prints exactly 2 digits after the point, <b>rounded</b> to nearest and zero-padded: 5.678 \u2192 5.68, 2.5 \u2192 2.50.'],
      ['<code>%5d</code> vs <code>%-5d</code> vs <code>%05d</code> for 42?', '<code>   42</code> (padded left) \u00B7 <code>42   </code> (padded right) \u00B7 <code>00042</code> (zero padded).'],
      ['How do you print a literal percent sign?', '<code>%%</code>. A single <code>%</code> starts a placeholder.'],
      ['<code>printf("%c", 66)</code> and <code>printf("%d", \'A\')</code>?', '<code>B</code> and <code>65</code>. A char is a small number; the placeholder picks the view.'],
      ['Which placeholder does <code>qty * price</code> need, with <code>int qty</code>, <code>double price</code>?', '<code>%f</code> (e.g. <code>%.2f</code>): int times double is a double.'],
      ['What happens with <code>printf("%d", 4.5)</code>?', 'The double\u2019s bits are read as an int: garbage. Use <code>%f</code> or cast with <code>(int)</code>.'],
      ['Method to build a format string from a target?', 'Cut the target into pieces; mark the variable parts; pick placeholders by type; assemble in order with arguments in the same order; check counts and types.']
    ],
    tiers: {
      recognize: [
        h.mc(T, 'Which placeholder prints a <code>double</code> such as <code>3.14</code>?', ['<code>%f</code>', ['<code>%d</code>', '<code>%d</code> is for whole numbers (int).'], ['<code>%c</code>', '<code>%c</code> prints a single character.'], ['<code>%s</code>', '<code>%s</code> prints a string.']], 0, '<code>%f</code> handles float and double.'),
        h.mc(T, 'How many arguments must follow the format string in <code>printf("%d + %d = %d", ...)</code>?', ['Three', ['One', 'There are three placeholders, so three arguments.'], ['Two', 'The <code>=</code> result also needs a value.'], ['None, because the text is literal', 'Each placeholder consumes an argument.']], 0, 'One argument per placeholder.'),
        h.mc(T, 'What does <code>printf("%.2f", 3.14159)</code> print?', ['3.14', ['3.142', 'The precision is 2, not 3.'], ['3.1', '2 digits after the point are kept.'], ['3.14159', 'Precision limits the digits.']], 0, '<code>.2</code> keeps two digits after the decimal point, rounded.', { verify: C('int main(void){printf("%.2f",3.14159);}', ['3.14']) }),
        h.mc(T, 'What does <code>printf("%f", 3.14)</code> print by default?', ['3.140000', ['3.14', 'Without a precision, %f prints six digits after the point.'], ['3', 'That would need %d or %.0f.'], ['3.1400', 'The default is six digits, not four.']], 0, 'Add a precision (<code>%.2f</code>) to control the digits.', { verify: C('int main(void){printf("%f",3.14);}', ['3.140000']) }),
        h.mc(T, 'How do you make <code>printf</code> print a literal percent sign?', ['Write <code>%%</code>', ['Write <code>\\%</code>', 'Backslash escapes do not work for this; use %%.'], ['Write <code>%</code>', 'A single % starts a placeholder.'], ['It cannot be done', 'It can: %%.']], 0, 'In a format string <code>%%</code> prints one <code>%</code>.'),
        h.mc(T, '<code>printf("%d", \'A\')</code> prints which output?', ['65', ['A', '<code>%c</code> would print the letter; <code>%d</code> prints the number.'], ['\'A\'', 'printf never prints the quote marks.'], ['0', 'The character code of \'A\' is 65.']], 0, 'A char is a small number; <code>%d</code> shows the number.', { verify: C('int main(void){printf("%d",\'A\');}', ['65']) }),
        h.mc(T, 'What does the 5 in <code>%5d</code> mean?', ['A minimum width of 5 columns (padded with spaces on the left)', ['Print 5 digits after the decimal', 'That would be a precision (<code>.5</code>).'], ['Repeat the number 5 times', 'It sets the field width, not repetition.'], ['Print 5 characters of a string', 'That would be <code>%.5s</code>.']], 0, '42 prints as three spaces then 42.'),
        h.multi(T, 'Select <b>all</b> correct pairings of argument type and placeholder.', ['<code>int</code> with <code>%d</code>', '<code>double</code> with <code>%f</code>', '<code>char</code> printed as a letter with <code>%c</code>', ['<code>double</code> with <code>%d</code>', 'That reads the double\u2019s bits as an int: garbage.'], ['a string with <code>%c</code>', '<code>%c</code> prints one character; strings need <code>%s</code>.']], [0, 1, 2], 'Match each placeholder to the argument\u2019s type.')
      ],
      trace: [
        h.mem(T, 'Fill in what each call prints.', 'printf("%f\\n", 3.14);\nprintf("%.2f\\n", 3.14159);\nprintf("%.0f\\n", 2.6);\nprintf("%.1f\\n", 7 / 2.0);', [['%f of 3.14', '3.140000'], ['%.2f of 3.14159', '3.14'], ['%.0f of 2.6', '3'], ['%.1f of 7/2.0', '3.5']], '<code>%f</code> defaults to six digits. A precision rounds to that many digits; <code>.0</code> leaves none (2.6 rounds to 3). 7/2.0 is the double 3.5.', { verify: C('int main(void){printf("%f\\n",3.14);printf("%.2f\\n",3.14159);printf("%.0f\\n",2.6);printf("%.1f\\n",7/2.0);}', ['3.140000', '3.14', '3', '3.5']) }),
        h.mem(T, 'Fill in what each call prints.', 'printf("%c\\n", 66);\nprintf("%d\\n", \'A\');\nprintf("%c%c%c\\n", 72, 105, 33);\nprintf("%d %c\\n", \'a\', \'a\');', [['%c of 66', 'B'], ['%d of \'A\'', '65'], ['%c%c%c of 72, 105, 33', 'Hi!'], ['%d %c of \'a\', \'a\'', '97 a']], 'The number 66 is the ASCII code of B. %d shows a char\u2019s code; %c shows the character. 72, 105, 33 are H, i, !.', { verify: C('int main(void){printf("%c\\n",66);printf("%d\\n",\'A\');printf("%c%c%c\\n",72,105,33);printf("%d %c\\n",\'a\',\'a\');}', ['B', '65', 'Hi!', '97 a']) }),
        h.mem(T, 'Fill in what each call prints.', 'printf("%x\\n", 255);\nprintf("%X\\n", 255);\nprintf("%zu\\n", sizeof(int));\nprintf("%d%%\\n", 95);', [['%x of 255', 'ff'], ['%X of 255', 'FF'], ['%zu of sizeof(int)', '4'], ['%d%% of 95', '95%']], '255 is 0xFF in hex (lowercase for %x, uppercase for %X). sizeof(int) is 4 bytes. <code>%%</code> prints a percent sign after the 95.', { verify: C('int main(void){printf("%x\\n",255);printf("%X\\n",255);printf("%zu\\n",sizeof(int));printf("%d%%\\n",95);}', ['ff', 'FF', '4', '95%']) }),
        h.mem(T, 'Count the spaces each conversion produces for the value 42 (or 3.14159). Leading = before the digits, trailing = after.', 'printf("%5d", 42);\nprintf("%-5d", 42);\nprintf("%8.2f", 3.14159);', [['leading spaces for %5d', '3'], ['trailing spaces for %-5d', '3'], ['leading spaces for %8.2f', '4']], '%5d makes a 5-column field: 42 uses 2, so 3 spaces on the left. The minus flag moves the padding to the right. %8.2f prints 3.14 (4 characters) in 8 columns: 4 spaces.', { verify: C('int main(void){' + lead('%5d', '42') + trail('%-5d', '42') + lead('%8.2f', '3.14159') + '}', ['3', '3', '4']) }),
        h.mem(T, 'Fill in what each call prints.', 'printf("%05d\\n", 42);\nprintf("%d x $%.2f = $%.2f\\n", 4, 2.5, 4 * 2.5);\nprintf("%d %d\\n", 7 / 2, 7 % 2);', [['%05d of 42', '00042'], ['the receipt line', '4 x $2.50 = $10.00'], ['7/2 and 7%2', '3 1']], 'The 0 flag pads with zeros. 4 \u00D7 2.5 is the double 10.0, shown as 10.00. 7/2 is integer division (3) and 7 % 2 is the remainder (1).', { verify: C('int main(void){printf("%05d\\n",42);printf("%d x $%.2f = $%.2f\\n",4,2.5,4*2.5);printf("%d %d\\n",7/2,7%2);}', ['00042', '4 x $2.50 = $10.00', '3 1']) }),
        h.trace(T, 'What does this print?', 'char food[] = "pizza";\nint slices = 3;\nprintf("I ate %d slices of %s.", slices, food);', 'I ate 3 slices of pizza.', 'The first placeholder (<code>%d</code>) takes <code>slices</code>, the second (<code>%s</code>) takes <code>food</code>.', { verify: C('int main(void){char food[]="pizza";int slices=3;printf("I ate %d slices of %s.",slices,food);}', ['I ate 3 slices of pizza.']) }),
        h.trace(T, 'What does this print? (three items separated by spaces)', 'char w[] = "hello";\nprintf("%s %c %c", w, w[0], w[4]);', 'hello h o', '<code>%s</code> prints the whole string. <code>w[0]</code> and <code>w[4]</code> are single characters printed with <code>%c</code>.', { verify: C('int main(void){char w[]="hello";printf("%s %c %c",w,w[0],w[4]);}', ['hello h o']) }),
        h.mem(T, 'Count the spaces for the string <code>"hi"</code>.', 'printf("%10s", "hi");\nprintf("%-10s", "hi");', [['leading spaces for %10s', '8'], ['trailing spaces for %-10s', '8']], 'The field is 10 columns and \u201Chi\u201D uses 2, so 8 spaces: before it by default, after it with the minus flag.', { verify: C('int main(void){' + lead('%10s', '"hi"') + trail('%-10s', '"hi"') + '}', ['8', '8']) })
      ],
      debug: [
        h.bug(T, 'This is meant to print <code>Total: 4.5</code> but prints a strange number. Which line is the root cause?', ['double total = 4.5;', 'printf("Total: %d\\n", total);'], 1,
          [['<code>double</code> cannot store 4.5', 'A double stores it fine.'], '<code>%d</code> expects an int but the argument is a double; use <code>%f</code> (or <code>%.1f</code>)', ['The newline is wrong', '<code>\\n</code> is correct.']], 1, 'The placeholder must match the argument\u2019s type: double needs <code>%f</code>.'),
        h.bug(T, 'The program should print <code>Sam scored 92</code> but prints garbage or crashes. Which line is the root cause?', ['char name[] = "Sam";', 'int score = 92;', 'printf("%s scored %d\\n", score, name);'], 2,
          [['The array needs more room', '<code>name</code> is large enough.'], 'The arguments are in the wrong order: <code>%s</code> receives the int and <code>%d</code> receives the string', ['<code>%s</code> cannot print arrays', '%s prints char arrays; it just got the wrong argument.']], 1, 'Arguments follow the placeholders in order: <code>name, score</code>.'),
        h.bug(T, 'This prints a broken line instead of <code>100% done</code>. Which line is the problem?', ['printf("Progress report\\n");', 'printf("100% done\\n");'], 1,
          [['The newline escape', '<code>\\n</code> is fine.'], 'The <code>%</code> followed by a space starts a placeholder; a literal percent sign must be written <code>%%</code>', ['The string needs single quotes', 'Strings use double quotes in C.']], 1, '<code>printf("100%% done\\n");</code>', { verify: C('int main(void){printf("100%% done\\n");}', ['100% done']) }),
        h.bug(T, 'The program prints a nonsense number for the count of items. Which line is the root cause?', ['int count = 12;', 'printf("Items: %f\\n", count);'], 1,
          [['<code>count</code> should be a double', 'An int is the right type for a count.'], '<code>%f</code> expects a double, but <code>count</code> is an int; use <code>%d</code>', ['The text before the placeholder', 'Literal text is fine.']], 1, 'int \u2192 <code>%d</code>. Using %f with an int reads the wrong bits.'),
        h.fill(T, 'Variables: <code>char item[] = "mug"; double price = 6.5;</code> Fill in the two placeholders so it prints <code>mug costs $6.50</code>.', 'printf("%__0__ costs $%__1__", item, price);', ['s', '.2f'], 'A string is <code>%s</code>. Two decimals with a double is <code>%.2f</code>.', { verify: { src: P + 'int main(void){char item[]="mug";double price=6.5;printf("%s costs $%.2f",item,price);}', expect: ['mug costs $6.50'], outputOnly: true } }),
        h.fill(T, 'Fill in the width so that the number 42 is printed in a field of <b>5 columns</b>, padded on the left (3 spaces then 42).', 'printf("%__0__d|", 42);', ['5'], '<code>%5d</code> right-aligns in 5 columns, so there are 3 leading spaces.', { verify: { src: P + 'int main(void){printf("%5d|",42);}', expect: ['   42|'], outputOnly: true } }),
        h.mc(T, 'Variables: <code>char name[] = "Sam"; int assignments = 8; double average = 91.67;</code> Which format string prints <code>Sam completed 8 assignments with an average of 91.7.</code>?', ['<code>"%s completed %d assignments with an average of %.1f."</code>', ['<code>"%s completed %d assignments with an average of %f."</code>', '<code>%f</code> prints six digits (91.670000), not one.'], ['<code>"%s completed %d assignments with an average of %.2f."</code>', 'Two decimals would print 91.67.'], ['<code>"%d completed %s assignments with an average of %.1f."</code>', 'The first two placeholders are in the wrong order for the arguments.']], 0, 'String, int, then a double with one decimal, in argument order.', { verify: C('int main(void){char name[]="Sam";int assignments=8;double average=91.67;printf("%s completed %d assignments with an average of %.1f.",name,assignments,average);}', ['Sam completed 8 assignments with an average of 91.7.']) })
      ],
      integrate: [
        h.mem(T, 'Fill in the output of each call. (Remember: the type of an expression decides what it prints as.)', 'int qty = 4;\ndouble price = 2.5;\nprintf("%d x $%.2f = $%.2f\\n", qty, price, qty * price);\nprintf("%c %d %c\\n", \'a\' + 1, \'a\' + 1, \'A\' + 25);', [['receipt line', '4 x $2.50 = $10.00'], ['character line', 'b 98 Z']], 'qty * price is a double (10.0) so <code>%.2f</code> shows 10.00. \'a\' + 1 is 98: <code>%c</code> shows b and <code>%d</code> shows 98. \'A\' + 25 is 90, which is Z.', { verify: C('int main(void){int qty=4;double price=2.5;printf("%d x $%.2f = $%.2f\\n",qty,price,qty*price);printf("%c %d %c\\n",\'a\'+1,\'a\'+1,\'A\'+25);}', ['4 x $2.50 = $10.00', 'b 98 Z']) }),
        h.mem(T, 'This loop prints three lines. Fill them in.', 'for (int i = 1; i <= 3; i++) {\n    printf("%d^2 = %d\\n", i, i * i);\n}', [['line 1', '1^2 = 1'], ['line 2', '2^2 = 4'], ['line 3', '3^2 = 9']], 'Each pass uses the loop variable twice: once as itself and once squared.', { verify: C('int main(void){for(int i=1;i<=3;i++){printf("%d^2 = %d\\n",i,i*i);}}', ['1^2 = 1', '2^2 = 4', '3^2 = 9']) }),
        h.mc(T, 'Which call is <b>wrong</b> (undefined or garbage) for <code>int n = 7; double d = 7.0; char c = \'x\'; char s[] = "ok";</code>?', ['<code>printf("%d", d);</code>', ['<code>printf("%f", d);</code>', 'double with %f is correct.'], ['<code>printf("%c%s%d", c, s, n);</code>', 'char, string, int with %c, %s, %d: correct.'], ['<code>printf("%.1f", d / 2);</code>', 'A double expression with %f: correct.']], 0, 'A double needs %f. Reading a double with %d is the classic placeholder mismatch.'),
        h.mem(T, 'Build the output. Each placeholder below is given; fill in what prints.', 'int hits = 18, shots = 24;\nprintf("%d/%d = %.1f%%\\n", hits, shots, 100.0 * hits / shots);', [['the line printed', '18/24 = 75.0%']], '100.0 * 18 / 24 = 75.0 (a double). <code>%.1f</code> shows 75.0 and <code>%%</code> prints the percent sign.', { verify: C('int main(void){int hits=18,shots=24;printf("%d/%d = %.1f%%\\n",hits,shots,100.0*hits/shots);}', ['18/24 = 75.0%']) })
      ],
      produce: [
        h.free(T, 'Write one <code>printf</code> statement for each target, using these variables: <code>char name[] = "Maya"; int age = 19; double gpa = 3.846; char grade = \'A\';</code><br>(1) <code>Maya is 19.</code><br>(2) <code>GPA: 3.85 (grade A)</code><br>(3) <code>100% sure: Maya</code> followed by a newline',
          '<pre><code>printf("%s is %d.", name, age);\nprintf("GPA: %.2f (grade %c)", gpa, grade);\nprintf("100%% sure: %s\\n", name);</code></pre>Each has one argument per placeholder in order: string \u2192 <code>%s</code>, int \u2192 <code>%d</code>, double rounded to two decimals \u2192 <code>%.2f</code>, char \u2192 <code>%c</code>. The literal percent sign is written <code>%%</code>, and the newline is typed as <code>\\n</code>.',
          ['(1) uses %s then %d with name, age in that order', '(2) uses %.2f for gpa and %c for grade, with the literal text around them', '(3) writes %% for the percent sign, %s for name, and ends with \\n', 'Argument count equals placeholder count in every call', 'No type mismatches (no %d for the double, etc.)'], 4),
        h.free(T, 'This program has <b>five</b> placeholder bugs. Find each, say what is wrong, and write the corrected line.<pre><code>int apples = 6;\ndouble cost = 4.5;\nchar fruit[] = "pear";\nprintf("Apples: %f\\n", apples);\nprintf("Cost: %d\\n", cost);\nprintf("%s costs %.2f", cost, fruit);\nprintf("Discount: 15% off\\n");\nprintf("Count: %d");</code></pre>',
          '1) <code>%f</code> with an int: use <code>%d</code>. 2) <code>%d</code> with a double: use <code>%.1f</code> (or <code>%f</code>). 3) Arguments swapped: should be <code>printf("%s costs %.2f", fruit, cost);</code>. 4) A literal percent needs <code>%%</code>: <code>printf("Discount: 15%% off\\n");</code>. 5) Missing argument for <code>%d</code>: <code>printf("Count: %d", apples);</code>. (Also no <code>\\n</code> on lines 3 and 5 if each should end a line.)',
          ['Finds the %f with an int', 'Finds the %d with a double', 'Finds the swapped arguments', 'Finds the unescaped percent sign', 'Finds the missing argument'], 4),
        h.explain(T, '<b>Teach it.</b> Explain how <code>printf</code> turns a format string and arguments into output: what a placeholder is, how arguments are matched, how to choose the right placeholder, how <code>%.2f</code> and <code>%5d</code> change the output, and what goes wrong when types or counts do not match.',
          ['A format string is literal text plus placeholders (a % followed by a letter); non-placeholder text is printed as is', 'Each placeholder is replaced by the next argument, in order: one argument per placeholder', 'The placeholder is chosen by the argument\u2019s type: %d int, %f double, %c char, %s string, %zu sizeof', 'Precision (.2) sets digits after the decimal point and rounds; width (5) sets a minimum column count; the minus flag pads on the right and 0 pads with zeros', 'Mismatched types, wrong order or too few arguments give garbage or undefined behavior; a literal percent is %% and newlines must be written \\n'],
          'printf walks the format string, copying plain text and swapping each placeholder for the next argument formatted as that placeholder says. If the types, order or count are wrong, it reads the wrong bits and prints garbage.', 4)
      ]
    }
  });
})();
