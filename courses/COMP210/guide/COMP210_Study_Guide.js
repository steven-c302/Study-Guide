/* ================= LESSON / TOPIC NAV ================= */
function showLesson(id,btn){
  document.querySelectorAll('.lesson').forEach(l=>l.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.lesson-bar button[data-l]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function showTopic(btn,sectionId){
  const lesson=btn.closest('.lesson');
  lesson.querySelectorAll('.topic').forEach(s=>s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  btn.closest('nav').querySelectorAll('button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ================= PROGRESS ================= */
let answered=new Set();
function markAnswered(el){answered.add(el);updateProgress();saveProgress();}
function updateProgress(){
  const total=document.querySelectorAll('.q').length
    + document.querySelectorAll('table.match').length
    + document.querySelectorAll('#order-class').length;
  const pct=total?Math.min(100,Math.round(answered.size/total*100)):0;
  document.getElementById('pbar').style.width=pct+'%';
  document.getElementById('ptxt').textContent=answered.size+' of '+total+' items answered';
}

/* ================= PROGRESS PERSISTENCE (localStorage) ================= */
function progressKey(){return 'guide-progress:'+(window.GUIDE_COURSE||location.pathname);}
function answeredId(el){
  if(typeof el==='string')return el; // table/order-widget ids are already strings
  if(el.id)return el.id;
  const scope=el.closest?el.closest('.topic'):null;
  const within=scope?Array.from(scope.querySelectorAll('.q,.card')):[];
  const idx=within.indexOf(el);
  return (scope?scope.id:'root')+':'+(idx===-1?'x':idx);
}
function saveProgress(){
  try{
    const ids=[]; answered.forEach(el=>ids.push(answeredId(el)));
    localStorage.setItem(progressKey(),JSON.stringify(ids));
  }catch(e){ /* private browsing / storage disabled — just skip persistence */ }
}
function loadProgress(){
  try{ const raw=localStorage.getItem(progressKey()); return raw?JSON.parse(raw):[]; }
  catch(e){ return []; }
}
function restoreProgress(){
  const saved=new Set(loadProgress());
  if(!saved.size)return;
  // T/F + multiple choice: re-mark the correct option, disable, show feedback
  document.querySelectorAll('.q[data-tf], .q[data-mc]').forEach(q=>{
    if(!saved.has(answeredId(q)))return;
    const tf=q.dataset.tf, mc=q.dataset.mc;
    q.dataset.done=1; answered.add(q);
    q.querySelectorAll('.opt').forEach(o=>{
      const isRight=(tf!==undefined)?o.dataset.v===tf:parseInt(o.dataset.i)===parseInt(mc);
      if(isRight)o.classList.add('correct');
      o.classList.add('disabled');
    });
    const fb=q.querySelector('.fb');
    if(fb && !fb.classList.contains('show')){fb.classList.add('show','ok');fb.innerHTML='✓ Correct. '+fb.innerHTML;}
  });
  // fill-in-the-blank: pre-fill the first accepted answer and show feedback
  document.querySelectorAll('.q .fillblank, .card .fillblank').forEach(inp=>{
    const scope=inp.closest('.q')||inp.closest('.card');
    if(!saved.has(answeredId(scope)))return;
    scope.dataset.done=1; answered.add(scope);
    inp.value=inp.dataset.answer.split('~~~')[0];
    inp.style.borderColor='var(--green)';
    const fb=scope.querySelector('.fb');
    if(fb && !fb.classList.contains('show')){fb.classList.add('show','ok');fb.innerHTML='✓ Correct. '+fb.innerHTML;}
  });
  // matching tables + the ordering widget: restore progress credit only
  // (re-populating dropdowns/order would need re-parsing each onclick's key
  // array, which isn't worth it for a purely-additive persistence pass)
  document.querySelectorAll('table.match').forEach(t=>{ if(saved.has(t.id))answered.add(t.id); });
  if(saved.has('order-class'))answered.add('order-class');
  updateProgress();
}

/* ================= T/F + MULTIPLE CHOICE ================= */
document.querySelectorAll('.q').forEach(q=>{
  const tf=q.dataset.tf, mc=q.dataset.mc;
  const handle=(opt,correct)=>{
    if(q.dataset.done)return;
    q.dataset.done=1; markAnswered(q);
    q.querySelectorAll('.opt').forEach(o=>o.classList.add('disabled'));
    const fb=q.querySelector('.fb');
    if(fb){fb.classList.add('show',correct?'ok':'no');fb.innerHTML=(correct?'✓ Correct. ':'✗ Not quite. ')+fb.innerHTML;}
  };
  if(tf!==undefined){
    q.querySelectorAll('.opt').forEach(opt=>opt.onclick=()=>{
      const correct=opt.dataset.v===tf;
      q.querySelectorAll('.opt').forEach(o=>{if(o.dataset.v===tf)o.classList.add('correct');});
      if(!correct)opt.classList.add('wrong');
      handle(opt,correct);
    });
  }
  if(mc!==undefined){
    const ci=parseInt(mc);
    q.querySelectorAll('.opt').forEach(opt=>opt.onclick=()=>{
      const correct=parseInt(opt.dataset.i)===ci;
      q.querySelectorAll('.opt').forEach(o=>{if(parseInt(o.dataset.i)===ci)o.classList.add('correct');});
      if(!correct)opt.classList.add('wrong');
      handle(opt,correct);
    });
  }
});

/* ================= FILL IN THE BLANK ================= */
function gradeInput(inp){
  // data-answer may list several accepted answers separated by "~~~" (not "|" —
  // some answers contain a literal pipe, e.g. "O(|V| + |E|)", which "|" as a
  // delimiter would truncate)
  const alts=inp.dataset.answer.toLowerCase().split('~~~').map(s=>s.trim().replace(/\s+/g,' '));
  let val=inp.value.trim().toLowerCase().replace(/\s+/g,' ');
  let ok=alts.indexOf(val)!==-1;
  if(alts.indexOf('superclasses')!==-1 && (val==='superclass'||val==='super classes'))ok=true;
  inp.style.borderColor=ok?'var(--green)':'var(--red)';
  return ok;
}
function checkFill(btn){
  // scope to the enclosing .q so multi-question cards grade the right input + feedback
  const scope=btn.closest('.q')||btn.closest('.card');
  const inp=scope.querySelector('.fillblank');
  const ok=gradeInput(inp);
  const fb=scope.querySelector('.fb');
  markFillFB(fb,ok,scope);
}
function checkFillGroup(btn){
  const card=btn.closest('.card');
  const inps=card.querySelectorAll('.fillblank');
  let all=true; inps.forEach(i=>{if(!gradeInput(i))all=false;});
  markFillFB(card.querySelector('.fb'),all,card);
}
function markFillFB(fb,ok,scope){
  if(scope)markAnswered(scope);
  if(!fb)return;
  fb.className='fb show '+(ok?'ok':'no');
  fb.innerHTML=(ok?'✓ Correct. ':'✗ Check the highlighted blank(s). ')
    + fb.innerHTML.replace(/^(✓ Correct\. |✗ Check the highlighted blank\(s\)\. )/,'');
}

/* ================= REVEAL ================= */
function toggleReveal(btn){
  const r=btn.closest('.card').querySelector('.reveal');
  r.classList.toggle('show');
  btn.textContent=r.classList.contains('show')?'Hide solution':'Show solution';
}

/* ================= MATCHING ================= */
function checkMatch(tableId,fbId,key){
  const rows=document.querySelectorAll('#'+tableId+' .match-def');
  let all=true,any=false;
  rows.forEach((sel,i)=>{
    if(sel.value)any=true;
    const ok=sel.value===key[i];
    sel.style.borderColor=sel.value?(ok?'var(--green)':'var(--red)'):'var(--line)';
    if(!ok)all=false;
  });
  const fb=document.getElementById(fbId);
  if(any){answered.add(tableId);updateProgress();saveProgress();}
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all?'✓ All correct!':'✗ Green = correct, red = fix these and check again.';
}

/* ================= ORDERING WIDGET ================= */
const ORDER_CLASS=["Instance fields","Class fields","Constructor","Instance methods","Class methods"];
let orderState=[];
function initOrder(){
  orderState=[ORDER_CLASS[2],ORDER_CLASS[0],ORDER_CLASS[4],ORDER_CLASS[1],ORDER_CLASS[3]];
  renderOrder();
}
function renderOrder(){
  const box=document.getElementById('order-class');
  box.innerHTML=orderState.map((item,i)=>
    '<div class="order-item"><span><span class="num">'+(i+1)+'</span>'+item+'</span>'
    +'<span class="order-btns">'
    +'<button onclick="moveOrder('+i+',-1)" '+(i===0?'disabled style=opacity:.3':'')+'>▲</button>'
    +'<button onclick="moveOrder('+i+',1)" '+(i===orderState.length-1?'disabled style=opacity:.3':'')+'>▼</button>'
    +'</span></div>').join('');
}
function moveOrder(i,d){
  const j=i+d; if(j<0||j>=orderState.length)return;
  const tmp=orderState[i]; orderState[i]=orderState[j]; orderState[j]=tmp;
  renderOrder();
}
function checkOrder(){
  const items=document.querySelectorAll('#order-class .order-item');
  let all=true;
  orderState.forEach((item,i)=>{
    const ok=item===ORDER_CLASS[i];
    items[i].classList.remove('correct','wrong');
    items[i].classList.add(ok?'correct':'wrong');
    if(!ok)all=false;
  });
  answered.add('order-class');updateProgress();saveProgress();
  const fb=document.getElementById('fb-order-class');
  fb.className='fb show '+(all?'ok':'no');
  fb.innerHTML=all
    ? '✓ Correct order: Instance fields → Class fields → Constructor → Instance methods → Class methods.'
    : '✗ Not yet. Fields first (instance then class), then the constructor, then methods (instance then class). Green rows are in the right spot.';
}

/* ================= SHARED DIAGRAM RENDERERS ================= */
function frameHTML(f){
  let v=f.vars.map(x=>'<div class="var"><span>'+x.n+'</span><span class="'+(x.ptr?'ptr':'val')+'">'+(x.ptr?x.ptr+' →':'')+(x.v!==undefined?x.v:'')+'</span></div>').join('');
  return '<div class="frame"><div class="fname">'+f.name+'</div>'+v+'</div>';
}
function objHTML(o){return '<div class="obj"><span class="addr">'+o.addr+'</span><div class="content">'+o.body+'</div></div>';}

/* ================= L4 GUIDED DIAGRAM ================= */
const PROGRAMS = {
  longest:{title:'LongestName.java',
    code:'<span class="ln">1</span> <span class="kw">public static void</span> <span class="fn">main</span>(String[] args){\n'
      +'<span class="ln">2</span>   String[] names = {"Joe","Bob","Bill"};\n'
      +'<span class="ln">3</span>   <span class="ty">int</span> longest = 0;\n'
      +'<span class="ln">4</span>   <span class="kw">for</span>(<span class="ty">int</span> i=1;i&lt;names.length;i++){\n'
      +'<span class="ln">5</span>     <span class="kw">if</span>(<span class="fn">isLonger</span>(names[i],names[longest]))\n'
      +'<span class="ln">6</span>        longest = i;\n'
      +'<span class="ln">7</span>   }\n'
      +'<span class="ln">8</span> }\n'
      +'<span class="ln">9</span> <span class="kw">static boolean</span> <span class="fn">isLonger</span>(String a,String b){\n'
      +'<span class="ln">10</span>   <span class="ty">int</span> a_len=a.length();\n'
      +'<span class="ln">11</span>   <span class="ty">int</span> b_len=b.length();\n'
      +'<span class="ln">12</span>   <span class="kw">return</span> a_len &gt; b_len;\n'
      +'<span class="ln">13</span> }',
    steps:[
      {desc:'<b>Start.</b> <code>main</code> frame pushed. The array is created on the <b>heap</b> at @100; <code>names</code> holds that address. <code>longest = 0</code>.',
        stack:[{name:'main',vars:[{n:'args',ptr:'@0'},{n:'names',ptr:'@100'},{n:'longest',v:'0'}]}],
        heap:[{addr:'@100',body:'String[] &#8594; @101,@102,@103'},{addr:'@101',body:'"Joe"'},{addr:'@102',body:'"Bob"'},{addr:'@103',body:'"Bill"'}]},
      {desc:'Loop: <code>i = 1</code>. Call <code>isLonger("Bob","Joe")</code>. New frame; <code>a</code>&#8594;@102, <code>b</code>&#8594;@101.',
        stack:[{name:'main',vars:[{n:'args',ptr:'@0'},{n:'names',ptr:'@100'},{n:'longest',v:'0'},{n:'i',v:'1'}]},
               {name:'isLonger',vars:[{n:'a',ptr:'@102'},{n:'b',ptr:'@101'}]}],
        heap:[{addr:'@100',body:'String[] &#8594; @101,@102,@103'},{addr:'@101',body:'"Joe"'},{addr:'@102',body:'"Bob"'},{addr:'@103',body:'"Bill"'}]},
      {desc:'Inside <code>isLonger</code>: <code>a_len = 3</code>, <code>b_len = 3</code>. Returns <code>3 &gt; 3 = false</code>. <code>longest</code> stays 0.',
        stack:[{name:'main',vars:[{n:'args',ptr:'@0'},{n:'names',ptr:'@100'},{n:'longest',v:'0'},{n:'i',v:'1'}]},
               {name:'isLonger',vars:[{n:'a',ptr:'@102'},{n:'b',ptr:'@101'},{n:'a_len',v:'3'},{n:'b_len',v:'3'}]}],
        heap:[{addr:'@100',body:'String[] &#8594; @101,@102,@103'},{addr:'@101',body:'"Joe"'},{addr:'@102',body:'"Bob"'},{addr:'@103',body:'"Bill"'}]},
      {desc:'<code>isLonger</code> popped (false). Loop: <code>i = 2</code>. Call <code>isLonger("Bill","Joe")</code>.',
        stack:[{name:'main',vars:[{n:'args',ptr:'@0'},{n:'names',ptr:'@100'},{n:'longest',v:'0'},{n:'i',v:'2'}]},
               {name:'isLonger',vars:[{n:'a',ptr:'@103'},{n:'b',ptr:'@101'},{n:'a_len',v:'4'},{n:'b_len',v:'3'}]}],
        heap:[{addr:'@100',body:'String[] &#8594; @101,@102,@103'},{addr:'@101',body:'"Joe"'},{addr:'@102',body:'"Bob"'},{addr:'@103',body:'"Bill"'}]},
      {desc:'Returns <code>4 &gt; 3 = true</code> &#8594; frame pops, line 6 sets <code>longest = 2</code>.',
        stack:[{name:'main',vars:[{n:'args',ptr:'@0'},{n:'names',ptr:'@100'},{n:'longest',v:'2'},{n:'i',v:'2'}]}],
        heap:[{addr:'@100',body:'String[] &#8594; @101,@102,@103'},{addr:'@101',body:'"Joe"'},{addr:'@102',body:'"Bob"'},{addr:'@103',body:'"Bill"'}]},
      {desc:'<b>End.</b> Loop ends (<code>i=3</code> fails), prints "Longest: Bill". <code>main</code> pops; heap objects become unreachable (GC-eligible).',
        stack:[{name:'main',vars:[{n:'args',ptr:'@0'},{n:'names',ptr:'@100'},{n:'longest',v:'2'}]}],
        heap:[{addr:'@100',body:'String[] &#8594; @101,@102,@103'},{addr:'@101',body:'"Joe"'},{addr:'@102',body:'"Bob"'},{addr:'@103',body:'"Bill"'}]}
    ]},
  factorial:{title:'Factorial.java - factorial(3)',
    code:'<span class="ln">1</span> <span class="kw">public static</span> <span class="ty">int</span> <span class="fn">factorial</span>(<span class="ty">int</span> n){\n'
      +'<span class="ln">2</span>   <span class="kw">if</span>(n==0) <span class="kw">return</span> 1;      <span class="cm">// base</span>\n'
      +'<span class="ln">3</span>   <span class="kw">return</span> n * <span class="fn">factorial</span>(n-1); <span class="cm">// recursive</span>\n'
      +'<span class="ln">4</span> }',
    steps:[
      {desc:'Call <code>factorial(3)</code>. <code>n=3</code>, not 0 &#8594; needs <code>3 * factorial(2)</code>.',
        stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'}]}],heap:[]},
      {desc:'<code>factorial(2)</code> pushed. Needs <code>2 * factorial(1)</code>.',
        stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'}]},{name:'factorial n=2',vars:[{n:'n',v:'2'}]}],heap:[]},
      {desc:'<code>factorial(1)</code> pushed. Needs <code>1 * factorial(0)</code>.',
        stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'}]},{name:'factorial n=2',vars:[{n:'n',v:'2'}]},{name:'factorial n=1',vars:[{n:'n',v:'1'}]}],heap:[]},
      {desc:'<b>Base case!</b> <code>factorial(0)</code> returns <b>1</b> immediately. Deepest point (4 frames).',
        stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'}]},{name:'factorial n=2',vars:[{n:'n',v:'2'}]},{name:'factorial n=1',vars:[{n:'n',v:'1'}]},{name:'factorial n=0',vars:[{n:'n',v:'0'},{n:'return',v:'1'}]}],heap:[]},
      {desc:'Unwind: f(0)&#8594;1, so <code>factorial(1)</code> = <code>1 * 1 = 1</code>, pops.',
        stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'}]},{name:'factorial n=2',vars:[{n:'n',v:'2'}]},{name:'factorial n=1',vars:[{n:'n',v:'1'},{n:'return',v:'1'}]}],heap:[]},
      {desc:'<code>factorial(2)</code> = <code>2 * 1 = 2</code>, pops.',
        stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'}]},{name:'factorial n=2',vars:[{n:'n',v:'2'},{n:'return',v:'2'}]}],heap:[]},
      {desc:'<b>Done.</b> <code>factorial(3)</code> = <code>3 * 2 = 6</code>.',
        stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'},{n:'return',v:'6'}]}],heap:[]}
    ]},
  absol:{title:'Absol.java',
    code:'<span class="ln">1</span> <span class="kw">public static void</span> <span class="fn">main</span>(String[] a){\n'
      +'<span class="ln">2</span>   <span class="ty">int</span> attack = 130;\n'
      +'<span class="ln">3</span>   String[] moves = {"slash","swordsDance"};\n'
      +'<span class="ln">4</span>   <span class="fn">megaEvolve</span>();\n'
      +'<span class="ln">5</span> }\n'
      +'<span class="ln">6</span> <span class="kw">static void</span> <span class="fn">megaEvolve</span>(){\n'
      +'<span class="ln">7</span>   <span class="ty">int</span> attack = 150;\n'
      +'<span class="ln">8</span>   <span class="fn">megaEvolveZ</span>();\n'
      +'<span class="ln">9</span>   String extraMove = "phantomForce";\n'
      +'<span class="ln">10</span> }\n'
      +'<span class="ln">11</span> <span class="kw">static void</span> <span class="fn">megaEvolveZ</span>(){\n'
      +'<span class="ln">12</span>   <span class="ty">int</span> speed = 151;\n'
      +'<span class="ln">13</span> }',
    steps:[
      {desc:'<code>main</code>: <code>attack = 130</code> (primitive in the frame). Array on <b>heap</b> at @200; <code>moves</code> holds @200.',
        stack:[{name:'main',vars:[{n:'attack',v:'130'},{n:'moves',ptr:'@200'}]}],
        heap:[{addr:'@200',body:'String[] &#8594; @201,@202'},{addr:'@201',body:'"slash"'},{addr:'@202',body:'"swordsDance"'}]},
      {desc:'Line 4 calls <code>megaEvolve()</code>. It has its <b>own</b> <code>attack = 150</code> - separate from the main frame attack.',
        stack:[{name:'main',vars:[{n:'attack',v:'130'},{n:'moves',ptr:'@200'}]},{name:'megaEvolve',vars:[{n:'attack',v:'150'}]}],
        heap:[{addr:'@200',body:'String[] &#8594; @201,@202'},{addr:'@201',body:'"slash"'},{addr:'@202',body:'"swordsDance"'}]},
      {desc:'Line 8 calls <code>megaEvolveZ()</code>. <code>speed = 151</code>. 3 frames deep. <code>extraMove</code> does NOT exist yet.',
        stack:[{name:'main',vars:[{n:'attack',v:'130'},{n:'moves',ptr:'@200'}]},{name:'megaEvolve',vars:[{n:'attack',v:'150'}]},{name:'megaEvolveZ',vars:[{n:'speed',v:'151'}]}],
        heap:[{addr:'@200',body:'String[] &#8594; @201,@202'},{addr:'@201',body:'"slash"'},{addr:'@202',body:'"swordsDance"'}]},
      {desc:'<code>megaEvolveZ</code> pops. Back in <code>megaEvolve</code>, line 9 declares <code>extraMove = "phantomForce"</code> at @210.',
        stack:[{name:'main',vars:[{n:'attack',v:'130'},{n:'moves',ptr:'@200'}]},{name:'megaEvolve',vars:[{n:'attack',v:'150'},{n:'extraMove',ptr:'@210'}]}],
        heap:[{addr:'@200',body:'String[] &#8594; @201,@202'},{addr:'@201',body:'"slash"'},{addr:'@202',body:'"swordsDance"'},{addr:'@210',body:'"phantomForce"'}]},
      {desc:'<b>End.</b> <code>megaEvolve</code> pops, then <code>main</code> pops. Heap objects unreachable (GC-eligible).',
        stack:[{name:'main',vars:[{n:'attack',v:'130'},{n:'moves',ptr:'@200'}]}],
        heap:[{addr:'@200',body:'String[] &#8594; @201,@202'},{addr:'@201',body:'"slash"'},{addr:'@202',body:'"swordsDance"'},{addr:'@210',body:'"phantomForce"'}]}
    ]}
};
let curProg='longest', curStep=0;
function initProgSelect(){
  const sel=document.getElementById('prog-select');
  Object.entries(PROGRAMS).forEach(([k,p])=>{const o=document.createElement('option');o.value=k;o.textContent=p.title;sel.appendChild(o);});
  loadProgram();
}
function loadProgram(){curProg=document.getElementById('prog-select').value;curStep=0;
  document.getElementById('prog-code').innerHTML=PROGRAMS[curProg].code;renderGuided();}
function stepGuided(d){const max=PROGRAMS[curProg].steps.length-1;curStep=Math.max(0,Math.min(max,curStep+d));renderGuided();}
function resetGuided(){curStep=0;renderGuided();}
function renderGuided(){
  const p=PROGRAMS[curProg], s=p.steps[curStep];
  document.getElementById('g-stack').innerHTML=[...s.stack].reverse().map(frameHTML).join('')||'<div class="muted">(empty)</div>';
  document.getElementById('g-heap').innerHTML=s.heap.map(objHTML).join('')||'<div class="muted">(empty)</div>';
  document.getElementById('g-desc').innerHTML=s.desc;
  document.getElementById('g-counter').textContent='Step '+(curStep+1)+' / '+p.steps.length;
}
function setDiagMode(m){
  document.getElementById('guided-panel').style.display=m==='guided'?'block':'none';
  document.getElementById('build-panel').style.display=m==='build'?'block':'none';
  document.getElementById('mode-guided').className='btn'+(m==='guided'?'':' ghost');
  document.getElementById('mode-build').className='btn'+(m==='build'?'':' ghost');
}
const BUILD_EX = {
  longest:{title:'LongestName - isLonger("Bob","Joe") executing (i=1)',
    code:'Draw the stack &amp; heap while <b>isLonger(names[1], names[0])</b> runs, with a_len/b_len computed.',
    stack:[{name:'main',vars:[{n:'args',ptr:'@0'},{n:'names',ptr:'@100'},{n:'longest',v:'0'},{n:'i',v:'1'}]},
           {name:'isLonger',vars:[{n:'a',ptr:'@102'},{n:'b',ptr:'@101'},{n:'a_len',v:'3'},{n:'b_len',v:'3'}]}],
    heap:[{addr:'@100',body:'String[] &#8594; @101,@102,@103'},{addr:'@101',body:'"Joe"'},{addr:'@102',body:'"Bob"'},{addr:'@103',body:'"Bill"'}],
    note:'main stays at the bottom (paused mid-loop); isLonger on top. Strings live on the heap; a/b hold addresses. 3&gt;3 = false, so longest stays 0.'},
  factorial:{title:'factorial(3) - deepest point',
    code:'Draw the stack when <b>factorial(3)</b> reaches the base case.',
    stack:[{name:'factorial n=3',vars:[{n:'n',v:'3'}]},{name:'factorial n=2',vars:[{n:'n',v:'2'}]},{name:'factorial n=1',vars:[{n:'n',v:'1'}]},{name:'factorial n=0',vars:[{n:'n',v:'0'},{n:'return',v:'1'}]}],
    heap:[],
    note:'4 frames. factorial(0) returns 1; unwinds 1*1=1, 2*1=2, 3*2 = 6. No heap objects.'},
  absol:{title:'Absol - megaEvolveZ() executing',
    code:'Draw the stack &amp; heap while <b>megaEvolveZ()</b> runs (deepest point).',
    stack:[{name:'main',vars:[{n:'attack',v:'130'},{n:'moves',ptr:'@200'}]},{name:'megaEvolve',vars:[{n:'attack',v:'150'}]},{name:'megaEvolveZ',vars:[{n:'speed',v:'151'}]}],
    heap:[{addr:'@200',body:'String[] &#8594; @201,@202'},{addr:'@201',body:'"slash"'},{addr:'@202',body:'"swordsDance"'}],
    note:'3 frames. The two attack variables (130 and 150) are separate locals. extraMove does NOT exist yet (declared line 9). speed=151 only in the top frame.'}
};
let curBuild='longest', myFrames=[], myObjs=[];
function initBuildSelect(){
  const sel=document.getElementById('build-select');
  Object.entries(BUILD_EX).forEach(([k,e])=>{const o=document.createElement('option');o.value=k;o.textContent=e.title;sel.appendChild(o);});
  sel.onchange=()=>{curBuild=sel.value;clearBuild();loadBuild();};
  loadBuild();
}
function loadBuild(){document.getElementById('build-code').innerHTML=BUILD_EX[curBuild].code;document.getElementById('build-answer').classList.remove('show');}
function addFrame(){const n=document.getElementById('b-frame-name').value.trim();if(!n)return;myFrames.push({name:n,vars:[]});document.getElementById('b-frame-name').value='';renderBuild();}
function addVar(fi){const n=prompt('Variable name:');if(!n)return;const v=prompt('Value - a number like 130, or an address like @200:');if(v===null)return;const p=v.trim().indexOf('@')===0;myFrames[fi].vars.push(p?{n:n,ptr:v.trim()}:{n:n,v:v.trim()});renderBuild();}
function addObj(){const a=document.getElementById('b-obj-addr').value.trim();const b=document.getElementById('b-obj-body').value.trim();if(!a&&!b)return;myObjs.push({addr:a||'@?',body:b});document.getElementById('b-obj-addr').value='';document.getElementById('b-obj-body').value='';renderBuild();}
function renderBuild(){
  const st=document.getElementById('b-stack');
  st.innerHTML=[...myFrames].reverse().map((f,ri)=>{
    const fi=myFrames.length-1-ri;
    let v=f.vars.map(x=>'<div class="var"><span>'+x.n+'</span><span class="'+(x.ptr?'ptr':'val')+'">'+(x.ptr?x.ptr+' →':'')+(x.v!==undefined?x.v:'')+'</span></div>').join('');
    return '<div class="frame"><div class="fname">'+f.name+'<span><button class="btn small ghost" onclick="addVar('+fi+')">+var</button> <button class="del-x" onclick="delFrame('+fi+')">✕</button></span></div>'+v+'</div>';
  }).join('')||'<div class="muted">Add a frame to begin...</div>';
  document.getElementById('b-heap').innerHTML=myObjs.map((o,i)=>'<div class="obj"><span class="addr">'+o.addr+'</span><button class="del-x" style="float:right" onclick="delObj('+i+')">✕</button><div class="content">'+o.body+'</div></div>').join('')||'<div class="muted">Add heap objects...</div>';
}
function delFrame(i){myFrames.splice(i,1);renderBuild();}
function delObj(i){myObjs.splice(i,1);renderBuild();}
function clearBuild(){myFrames=[];myObjs=[];renderBuild();}
function toggleBuildAnswer(){
  const e=BUILD_EX[curBuild];
  document.getElementById('ba-stack').innerHTML=[...e.stack].reverse().map(frameHTML).join('');
  document.getElementById('ba-heap').innerHTML=e.heap.map(objHTML).join('')||'<div class="muted">(empty - no heap objects)</div>';
  document.getElementById('ba-note').innerHTML='<b>Why:</b> '+e.note;
  document.getElementById('build-answer').classList.toggle('show');
}

/* ================= L5 OBJECT DIAGRAM ================= */
const L5_CODE='<span class="ln">1</span> <span class="fn">main</span>(){\n'
  +'<span class="ln">2</span>   Triangle t = <span class="kw">new</span> <span class="fn">Triangle</span>(0,0, 2,3, 4,0);\n'
  +'<span class="ln">3</span> }\n'
  +'<span class="ln">4</span> <span class="fn">Triangle</span>(ax,ay, bx,by, cx,cy){\n'
  +'<span class="ln">5</span>   _a = <span class="kw">new</span> <span class="fn">Point</span>(ax,ay);\n'
  +'<span class="ln">6</span>   _b = <span class="kw">new</span> <span class="fn">Point</span>(bx,by);\n'
  +'<span class="ln">7</span>   _c = <span class="kw">new</span> <span class="fn">Point</span>(cx,cy);\n'
  +'<span class="ln">8</span> }';
const L5_STEPS=[
  {desc:'<code>main</code> runs line 2. <code>new Triangle(...)</code> allocates a Triangle on the <b>heap</b> at @300 and pushes the constructor frame. Fields <code>_a,_b,_c</code> are not set yet (null).',
    stack:[{name:'main',vars:[{n:'t',ptr:'(pending)'}]},{name:'Triangle(ctor)',vars:[{n:'this',ptr:'@300'},{n:'ax',v:'0'},{n:'ay',v:'0'},{n:'...',v:''}]}],
    heap:[{addr:'@300',body:'Triangle<br> _a &#8594; null<br> _b &#8594; null<br> _c &#8594; null'}]},
  {desc:'Line 5: <code>_a = new Point(0,0)</code> &#8594; a Point object at @301 with <code>_x=0,_y=0</code>. Triangle field <code>_a</code> now points to @301.',
    stack:[{name:'main',vars:[{n:'t',ptr:'(pending)'}]},{name:'Triangle(ctor)',vars:[{n:'this',ptr:'@300'}]}],
    heap:[{addr:'@300',body:'Triangle<br> _a &#8594; @301<br> _b &#8594; null<br> _c &#8594; null'},{addr:'@301',body:'Point _x=0.0 _y=0.0'}]},
  {desc:'Line 6: <code>_b = new Point(2,3)</code> &#8594; Point at @302.',
    stack:[{name:'main',vars:[{n:'t',ptr:'(pending)'}]},{name:'Triangle(ctor)',vars:[{n:'this',ptr:'@300'}]}],
    heap:[{addr:'@300',body:'Triangle<br> _a &#8594; @301<br> _b &#8594; @302<br> _c &#8594; null'},{addr:'@301',body:'Point _x=0.0 _y=0.0'},{addr:'@302',body:'Point _x=2.0 _y=3.0'}]},
  {desc:'Line 7: <code>_c = new Point(4,0)</code> &#8594; Point at @303. All three fields set.',
    stack:[{name:'main',vars:[{n:'t',ptr:'(pending)'}]},{name:'Triangle(ctor)',vars:[{n:'this',ptr:'@300'}]}],
    heap:[{addr:'@300',body:'Triangle<br> _a &#8594; @301<br> _b &#8594; @302<br> _c &#8594; @303'},{addr:'@301',body:'Point _x=0.0 _y=0.0'},{addr:'@302',body:'Point _x=2.0 _y=3.0'},{addr:'@303',body:'Point _x=4.0 _y=0.0'}]},
  {desc:'<b>Constructor returns @300.</b> Its frame pops; back in <code>main</code>, <code>t &#8594; @300</code>. Notice <b>composition</b>: one Triangle object holds references to three separate Point objects on the heap.',
    stack:[{name:'main',vars:[{n:'t',ptr:'@300'}]}],
    heap:[{addr:'@300',body:'Triangle<br> _a &#8594; @301<br> _b &#8594; @302<br> _c &#8594; @303'},{addr:'@301',body:'Point _x=0.0 _y=0.0'},{addr:'@302',body:'Point _x=2.0 _y=3.0'},{addr:'@303',body:'Point _x=4.0 _y=0.0'}]}
];
let l5Step=0;
function renderL5(){
  const s=L5_STEPS[l5Step];
  document.getElementById('l5g-stack').innerHTML=[...s.stack].reverse().map(frameHTML).join('');
  document.getElementById('l5g-heap').innerHTML=s.heap.map(objHTML).join('');
  document.getElementById('l5g-desc').innerHTML=s.desc;
  document.getElementById('l5g-counter').textContent='Step '+(l5Step+1)+' / '+L5_STEPS.length;
}
function stepL5(d){l5Step=Math.max(0,Math.min(L5_STEPS.length-1,l5Step+d));renderL5();}
function resetL5(){l5Step=0;renderL5();}

/* ================= INIT ================= */
initProgSelect();
initBuildSelect();
renderBuild();
initOrder();
document.getElementById('l5-code').innerHTML=L5_CODE;
renderL5();
restoreProgress();
updateProgress();
