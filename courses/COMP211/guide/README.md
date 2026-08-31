# COMP 211 · Systems Fundamentals — Study Guide

Fall 2026 · Connor McMahon. Open **`index.html`** in any browser. No server, no build step.

## Files

| File | Role |
|---|---|
| `index.html` | Shell — all CSS, the header, the lesson bar, the progress bar, and one empty `<div class="lesson" id="lN">` per lecture. Loads the modules, then the engine. |
| `COMP211_Study_Guide_L0.js` | **Lesson 0** — CL00 Welcome: course structure, policies, AI rules, binary & bases. |
| `COMP211_Study_Guide_L1.js` | **Lesson 1** — CL01 Unix Basics + RD00. Includes the shell simulator. |
| `COMP211_Study_Guide_L2.js` | **Lesson 2** — CL02 Intro to C + RD01. Includes the pipeline and bits labs. |
| `COMP211_Study_Guide.js` | Shared **engine**. Must load **last**. |

## Lessons built

- **Lesson 0 · Welcome & Binary** — how the course works (readings/homework/labs/quizzes/checkoffs and their very different policies), honor code and AI rules, binary and bases, the `0b` prefix. Interactive **binary lab** (clickable bit strip, 4- or 8-bit) plus the in-class 4-bit table drill.
- **Lesson 1 · Unix Basics** — terminal vs shell vs CLI, the history from batch processing to TTYs to CRTs to GUIs, the Unix file system tree, absolute vs relative paths, `.` `..` `~`, hidden files, and every command from the slides. **Shell simulator**: a working bash-style shell over the lecture's own file tree with a live tree view, supporting `pwd cd ls ls -a mkdir touch cp mv rm rm -r rm -rf rmdir`, command history, and a one-click replay of the in-class command sequence. Both in-class problems worked through, plus a 16-question RD00 self-check.
- **Lesson 2 · Intro to C** — machine code → assembly → high-level languages, compiler vs assembler, the first C program, the standard library and header files, `gcc` and `-o` and `./a.out`, variables (scope/lifetime/type), numeric types and `sizeof`, `printf` placeholders and escape sequences, `char` and ASCII, "bits are just bits", `getchar`/`putchar`/EOF. **Pipeline lab** (5-step compile-and-run stepper) and **bits lab** (one byte shown as binary, decimal, and ASCII at once). All three in-class problems plus a 28-question RD01 self-check.

**74 graded items** across the three lessons.

## Grading behaviour

The engine deliberately **never reveals a correct answer when you get one wrong**:

- A wrong choice is marked red and taken out of play; every other option stays live and you try again. The feedback says only how many options remain.
- The explanation is stashed on load (`fb._explain`) and the `.fb` starts empty, so nothing leaks before it is earned. It appears only when you answer correctly — with the attempt count if it took more than one — or when you press **Reveal answer**.
- Every question grows a control row on first attempt: **↻ Try again** (clears marks, inputs, checkboxes, feedback, and re-arms the options) and **Reveal answer**.
- Fill-in and matching report *how many* are right without saying which answer is correct; wrong multiple-select boxes reveal nothing at all, just a count.
- Progress counts a question only once it is answered **correctly**. Revealing does not count, and Try again removes it from the tally.

These controls are injected by the engine, so **lesson modules need no changes** to get them.

## Engine API (available to every module)

- `showLesson(id, btn)` / `showTopic(btn, sectionId)` — navigation
- **True/False:** `<div class="q" data-tf="T">` + `<button class="opt" data-v="T">` + `<div class="fb">`
- **Multiple choice:** `<div class="q" data-mc="2">` (index of the correct option) + `<button class="opt" data-i="0">` + `<div class="fb">`
- **Multiple select:** `<div class="q" data-multi="2,3">` with `.ma-item` checkboxes carrying `data-i`, graded by `checkMulti(this)`
- **Fill-in:** `<input class="fillblank" data-answer="a|b">` + `checkFill(this)` (one blank) or `checkFillGroup(this)` (all blanks in the enclosing `.q`/`.card`)
- **Matching:** `<table class="match" id="X">` of `.match-term` + `<select class="match-def">`, then `checkMatch('X','fb-X',[...keys])`
- **Reveal:** `<textarea>` + `<button onclick="toggleReveal(this)">Show solution</button>` + `<div class="reveal">`
- Progress counts every `.q` and every `table.match`.
- Modules that render widgets define `initL0()`, `initL1()`, … — the engine calls `initL0` through `initL8` automatically if they exist.

## Authoring rules (learned the hard way)

1. Each lecture lives in its **own module file**; keep `index.html` small.
2. Module content is injected from a **template literal** — no unescaped backticks, no `${`.
3. A literal backslash inside that template literal must be written **`\\`** (writing `\0` injects a real NUL byte). ASCII tree art needs `` \` `` for backticks.
4. Modules load **before** the engine so it can wire their questions.
5. Verify with `node --check` **and** a headless render pass before shipping.

## Style classes

`.card` `.concept` `.warn` `.danger` `.two` `.two-wide` `.toolbar` `.btn` `.btn.ghost` `.btn.small` `.muted` `.step-desc`
`table.cmp` · code spans `.kw .ty .fn .nm .cm .st .pp` · widgets `.term .tree .bits .bit .readout .ro .pipe .stage`
CSS vars: `--brand --green --amber --red --accent --dir --purple --ink --muted --line --panel2`
