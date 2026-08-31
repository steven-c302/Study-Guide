window.COURSE = {
  code: "COMP 211",
  title: "Systems Fundamentals",
  credits: 3,
  term: "Fall 2026",
  color: "#159957",
  desc: "Systems programming fundamentals: data representation, pointers, execution models, memory management, and runtime environments. The process model, input/output, and system calls. Lexical analysis, parsing, interpretation, and translation. CLI tools including shell, editor, compiler, linker, test harness, debugger, version control, and build tooling. Bridges the gap between high-level programming (COMP 110, 210) and computer organization (COMP 311).",
  requisites: "Prerequisite: COMP 210; COMP 283 or MATH 381 or STOR 315; a grade of C or better in both prerequisite courses. Instructor: Connor McMahon.",

  guide: "guide/index.html",

  lectures: [],
  exams: [],
  notes: [
    { title: "Study guide — what's in it so far",
      body: "<b>Lessons 0&ndash;2</b> are built from the Week 1 slides: <b>CL00 Welcome</b> (course structure, policies, binary &amp; bases), <b>CL01 Unix Basics</b> (terminal vs shell vs CLI, the file system tree, paths, commands) with the <b>RD00</b> self-check, and <b>CL02 Intro to C</b> (compiling &amp; assembling, gcc, types, printf, ASCII, getchar/EOF) with the <b>RD01</b> self-check. 74 graded items, every in-class problem worked through, plus a working <b>shell simulator</b>, a <b>compilation pipeline stepper</b>, and two <b>bit/ASCII labs</b>. Open the <b>Study Guide</b> tab." },
    { title: "Key dates",
      body: "<b>Final exam</b> &mdash; Section 1: Tuesday, December 8, 2026, 8&ndash;11 AM &middot; Section 2: Saturday, December 5, 2026, 4&ndash;7 PM. Quiz dates are posted on Canvas. Readings are due <b>10:00 AM on the day of class</b>." },
    { title: "Honor code reminder",
      body: "The course prohibits <b>posting assignments on GitHub or other public websites</b>. This repo is public &mdash; keep lab and homework <i>code</i> out of it. Notes and study material are fine." },
    { title: "Adding more",
      body: "Drop lecture slides into <code>materials/lectures/</code> and past quizzes into <code>materials/exams/</code>, then list them here in <code>config.js</code>. Ask Claude to build the next lecture into the Study Guide (see <code>HANDOFF.md</code>)." }
  ],
  resources: [
    { title: "Dive into Systems — Command Line Basics (§17.1)", url: "https://diveintosystems.org/book/Appendix2/cmdln_basics.html", note: "RD00 · Unix File System" },
    { title: "Dive into Systems — Getting Started in C (§16.1)", url: "https://diveintosystems.org/book/Appendix1/getting_started.html", note: "RD01 · Q1" },
    { title: "Dive into Systems — Input / Output (§16.2)", url: "https://diveintosystems.org/book/Appendix1/input_output.html", note: "RD01 · Q2" },
    { title: "Dive into Systems — Conditionals & Loops (§16.3)", url: "https://diveintosystems.org/book/Appendix1/conditionals.html", note: "RD01 · Q3" },
    { title: "Dive into Systems — Arrays & Strings in C (§16.5)", url: "https://diveintosystems.org/book/Appendix1/arrays_strings.html", note: "RD01 · Q4" },
    { title: "Dive into Systems — full text (free online)", url: "https://diveintosystems.org/book/", note: "the course textbook" }
  ]
};
