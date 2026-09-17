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
      body: "<b>CL00&ndash;CL05</b> are built so far: <b>CL00 Welcome</b> (course structure, policies, binary &amp; bases), <b>CL01 Unix Basics</b> (terminal vs shell vs CLI, the file system tree, paths, commands) with the <b>RD00</b> self-check, <b>CL02 Intro to C</b> (compiling &amp; assembling, gcc, types, printf, ASCII, getchar/EOF) with the <b>RD01</b> self-check, <b>CL03 IO Redirection and Strings</b> (arrays, #define, redirection, pipes, C strings) with the <b>RD02</b> self-check, <b>CL04 Function Stack Frames</b> (stack frames, stdint.h types, pass-by-value vs pass-by-pointer, array passing) with the <b>RD03</b> self-check, and a later <b>Unix Basics (FA26)</b> lecture on <b>$PATH, globbing, regex, find, and grep</b>. Plus a <b>Checkoff 1 Prep</b> module &mdash; a CLI practical drill built from a released sample checkoff, with logistics, a 24-task worked walkthrough, and a fresh command-typing drill. And an <b>RD07 &middot; Bitwise Operators</b> reading self-check (bitwise vs. logical operators, AND/OR/XOR/NOT, left &amp; right shifts, logical vs. arithmetic right shift), plus <b>HW03</b> (Number Representation, Binary Arithmetic &amp; Bitwise Operators) reviewed question by question: conversions, unsigned/1&rsquo;s-comp/2&rsquo;s-comp interpretation, sign-/zero-extension, unsigned &amp; 2&rsquo;s complement addition/subtraction with overflow, bitwise ops, shifts, and bitmasks. 211+ graded items, every in-class problem worked through, plus a working <b>shell simulator</b>, a <b>compilation pipeline stepper</b>, and bit/ASCII labs. Also new: <b>CL09 &middot; Applications of Bitwise Operators</b> (clear_bit/update_bit, shift-based performance tricks, bit-packing, and RGB hex color-channel extraction) with the <b>RD08</b> self-check, and <b>CL10 &middot; Debugging</b> (VS Code/GDB breakpoints, step over vs. step into, the Watch panel, I/O buffering &amp; fflush, launch.json/tasks.json, and a full worked bug-hunt example) with an RD09 self-check. Newest: <b>CL11 &middot; Unix Basics: Shell Config &amp; Env Vars</b> (shell prompt configuration/PS1, environment variables &amp; export, $PATH search order and modification, .bashrc &amp; the Bash startup sequence, aliases) with the <b>RD10</b> self-check, <b>CL12 &middot; Quiz 1 Applied Review</b> (character array sizeof/strlen, a bitwise image-filter problem, a stack-diagram trace, and glob practice), and a <b>Quiz 1 Study Guide</b> hub tab (logistics, review sessions, full coverage checklist with jump-links, and a gap tracker) for the 9/18 quiz. Note: <b>RD04</b> does not exist in this course &mdash; the reading numbering skips from RD03 to RD05. Open the <b>Study Guide</b> tab." },
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
    { title: "Dive into Systems — Arrays & Strings in C (§16.5)", url: "https://diveintosystems.org/book/Appendix1/arrays_strings.html", note: "RD01 · Q4 / RD02" },
    { title: "Dive into Systems — I/O Redirection", url: "https://diveintosystems.org/book/Appendix2/ioredirect.html", note: "RD02" },
    { title: "Dive into Systems — Pipes", url: "https://diveintosystems.org/book/Appendix2/pipe.html", note: "RD02" },
    { title: "Dive into Systems — Functions", url: "https://diveintosystems.org/book/Appendix1/functions.html", note: "RD03" },
    { title: "Dive into Systems — Bitwise Operators (§4.6)", url: "https://diveintosystems.org/book/C4-Binary/bitwise.html", note: "RD07" },
    { title: "Dive into Systems — Dot Files & .bashrc (§17.14)", url: "https://diveintosystems.org/book/Appendix2/dotfiles.html", note: "RD10" },
    { title: "Dive into Systems — full text (free online)", url: "https://diveintosystems.org/book/", note: "the course textbook" }
  ]
};
