/* UNIT TEMPLATE. Copy to uNN-name.js (NN = next number), fill in, then:
     1. add  <script src="../mastery/uNN-name.js"></script>  to guide/index.html (before mastery-hub.js)
     2. run  node tools/validate-mastery.mjs
   Files named _*.js are ignored by the validator and are never loaded.

   Helpers (Mastery.h): mc, multi, trace, mem, fill, bug, parsons, free, explain.
   Every item: (topic, prompt, ...args, why, extra).  `extra` may hold
     hint:'...'                        a nudge shown before the answer can be revealed
     x:['u02','u05']                   other units this item mixes (cross-topic items)
     verify:{ src:'<C program>', expect:['line',...] }   compiled + run by the validator
     verify:{ sh:'<bash>', expect:[...] }                run in a temp dir by the validator
     verify:{ js:'["84"]' }                              evaluated (helpers: bin hex s8 u8 wrap)
   The validator fails the build if the answer key disagrees with the real output.
*/
(function () {
  var h = Mastery.h;
  Mastery.unit({
    id: 'uNN', title: 'Full unit title', short: 'Short name',
    blurb: 'One or two sentences on what this unit covers.',
    lessons: [{ id: 'l20', label: 'CL13 · Lecture name' }],     // ids of guide lessons (for "source lessons" links)
    learn: {
      big: ['The 5-7 ideas to know cold. HTML allowed.'],
      traps: ['The mistakes students actually make.'],
      examples: [
        { kind: 'worked', title: 'A fully worked example.', code: '/* optional */', steps: [['1', 'what happens', 'why']], takeaway: 'the reusable rule' },
        { kind: 'complete', item: h.mem('topic', 'You finish it. First cell given.', 'code', [['given', '1', 'given'], ['you fill', '2']], 'why') },
        { kind: 'solo', item: h.mem('topic', 'You do it alone.', 'code', [['a', '1']], 'why') }
      ]
    },
    cards: [['Front: a question answerable from memory', 'Back: the answer']],
    tiers: {                         // any tier may be empty
      recognize: [],                 // pick the right idea from options
      trace: [],                     // predict output / memory state: NO options
      debug: [],                     // bug hunts, arrange-the-code, fill-the-code
      integrate: [],                 // exam-level: several ideas in one problem
      produce: []                    // write it / explain it back (rubric self-grade + optional AI)
    }
  });
})();
