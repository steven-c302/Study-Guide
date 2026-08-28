window.COURSE = {
  code: "COMP 211",
  title: "Systems Fundamentals",
  credits: 3,
  term: "Next semester",
  color: "#159957",
  desc: "Systems programming fundamentals: data representation, pointers, execution models, memory management, and runtime environments. The process model, input/output, and system calls. Lexical analysis, parsing, interpretation, and translation. CLI tools including shell, editor, compiler, linker, test harness, debugger, version control, and build tooling. Bridges the gap between high-level programming (COMP 110, 210) and computer organization (COMP 311).",
  requisites: "Prerequisite: COMP 210; COMP 283 or MATH 381 or STOR 315; a grade of C or better in both prerequisite courses.",

  guide: "guide/index.html",

  lectures: [],
  exams: [],
  notes: [
    { title: "Study guide — what's in it so far",
      body: "<b>Reading 01</b> (C basics, <code>printf</code>, conditionals, arrays) and <b>Reading 02</b> (C strings, I/O redirection, pipes) are both built — 78 graded items, including every question from both handouts with worked explanations, plus five interactive labs: integer division &amp; increment, a working <code>printf</code> simulator, array pass-by-address and out-of-bounds writes, a string-memory strip, a file-descriptor redirection builder, and a pipeline stepper. Open the <b>Study Guide</b> tab." },
    { title: "Adding more",
      body: "Drop lecture slides into <code>materials/lectures/</code> and past exams into <code>materials/exams/</code>, then list them in this course's <code>config.js</code>. Ask Claude to build the next reading or lecture into the Study Guide the same way (see <code>HANDOFF.md</code>)." }
  ],
  resources: [
    { title: "Dive into Systems — Getting Started in C (§16.1)", url: "https://diveintosystems.org/book/Appendix1/getting_started.html", note: "Reading 01 · Q1" },
    { title: "Dive into Systems — Input / Output (§16.2)", url: "https://diveintosystems.org/book/Appendix1/input_output.html", note: "Reading 01 · Q2" },
    { title: "Dive into Systems — Conditionals & Loops (§16.3)", url: "https://diveintosystems.org/book/Appendix1/conditionals.html", note: "Reading 01 · Q3" },
    { title: "Dive into Systems — Arrays & Strings in C (§16.5)", url: "https://diveintosystems.org/book/Appendix1/arrays_strings.html", note: "Reading 01 · Q4  ·  Reading 02 · Q1" },
    { title: "Dive into Systems — I/O Redirection (§17.12)", url: "https://diveintosystems.org/book/Appendix2/ioredirect.html", note: "Reading 02 · Q2" },
    { title: "Dive into Systems — Pipes (§17.13)", url: "https://diveintosystems.org/book/Appendix2/pipe.html", note: "Reading 02 · Q3" },
    { title: "Dive into Systems — full text (free online)", url: "https://diveintosystems.org/book/", note: "the course textbook" }
  ]
};
