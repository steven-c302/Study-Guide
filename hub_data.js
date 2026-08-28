/* ============================================================
   COURSE REGISTRY — edit this to add / reorder courses.
   Each course needs a folder at  courses/<slug>/  containing
   course.html + config.js (copy courses/_TEMPLATE to start).
   ============================================================ */
window.HUB = {
  student: "Steven",
  subtitle: "One hub for every course — study guides, lectures, and past exams.",
  courses: [
    {
      code: "COMP 210", slug: "COMP210",
      title: "Data Structures & Algorithms",
      credits: 3, term: "Completed", color: "#2e86de",
      desc: "Stacks & heaps, recursion, OOP, Big-O, sorting, generics, lists, stacks/queues, trees (BST/AVL/Red-Black), heaps, hashing, and graph algorithms.",
      guide: true
    },
    {
      code: "COMP 211", slug: "COMP211",
      title: "Systems Fundamentals",
      credits: 3, term: "Next semester", color: "#159957",
      desc: "Systems programming: data representation, pointers, execution models, memory management, runtime environments, the process model, I/O, system calls, and CLI tooling (shell, compiler, linker, debugger, version control).",
      guide: true
    },
    {
      code: "COMP 301", slug: "COMP301",
      title: "Foundations of Programming",
      credits: 3, term: "Next semester", color: "#a78bfa",
      desc: "Reasoning about how code is structured, judging whether a structure is effective in context, and organizing units of code to support larger programs — design patterns and software design.",
      guide: true
    },
    {
      code: "STOR 155", slug: "STOR155",
      title: "Introduction to Data Models and Inference",
      credits: 3, term: "Next semester", color: "#e0913a",
      desc: "Data analysis; correlation and regression; sampling and experimental design; probability (random variables, expected values, normal & binomial); hypothesis testing and confidence intervals; spreadsheet software.",
      guide: true
    },
    {
      code: "LEETCODE", slug: "LEETCODE",
      title: "LeetCode / NeetCode Pro",
      credits: 0, term: "Ongoing", color: "#f5a623",
      desc: "Pattern-based interview prep using NeetCode Pro's roadmap. Notes organized by pattern (triggers, key insights, gotchas) rather than by problem number.",
      guide: true
    },
    {
      code: "SWE PROJECTS", slug: "SWE-PROJECTS",
      title: "Project & Software Learning",
      credits: 0, term: "Ongoing", color: "#60a5fa",
      desc: "Self-directed guide for web-stack fundamentals (MERN, Next.js) and AI-engineering concepts (RAG, embeddings, structured output, MCP) used in Steven's real projects — Court Vision, FileButler, Larder.",
      guide: true
    }
  ]
};
