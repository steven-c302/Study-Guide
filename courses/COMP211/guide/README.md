# COMP 211 · Systems Fundamentals — Study Guide

Open **`index.html`** in any browser. No server, no build step.

## Files

| File | Role |
|---|---|
| `index.html` | Shell — all CSS, the header, the lesson bar, the progress bar, and one empty `<div class="lesson" id="...">` per unit. Loads the modules, then the engine. |
| `COMP211_Study_Guide_R01.js` | **Reading 01** module — C basics, `printf`, conditionals, arrays. Injects into `#r01`. |
| `COMP211_Study_Guide_R02.js` | **Reading 02** module — C strings, I/O redirection, pipes. Injects into `#r02`. |
| `COMP211_Study_Guide.js` | Shared **engine**. Must load **last**. |

## Engine API (available to every module)

- `showLesson(id, btn)` / `showTopic(btn, sectionId)` — navigation
- **True/False:** `<div class="q" data-tf="T">` + `<button class="opt" data-v="T">` + `<div class="fb">`
- **Multiple choice:** `<div class="q" data-mc="2">` (index of the correct option) + `<button class="opt" data-i="0">` + `<div class="fb">`
- **Fill-in:** `<input class="fillblank" data-answer="a|b">` + a button calling `checkFill(this)` (one blank) or `checkFillGroup(this)` (all blanks in the enclosing `.q`/`.card`). `|` separates accepted answers.
- **Matching:** `<table class="match" id="X">` of `.match-term` + `<select class="match-def">`, then `checkMatch('X','fb-X',[...keys])` and `<div class="fb" id="fb-X">`.
- **Multiple-answer:** `<div class="q" data-multi="0,2">` with `.ma-item` checkboxes carrying `data-i`, graded by `checkMulti(this)`.
- **Reveal:** `<textarea>` + `<button onclick="toggleReveal(this)">Show solution</button>` + `<div class="reveal"><pre>…</pre></div>`.
- Progress bar counts every `.q` and every `table.match`.

## Authoring rules (learned the hard way on COMP 210)

1. Each unit lives in its **own module file**; keep `index.html` small.
2. Module content is injected from a **template literal** — it must contain **no backticks** and **no `${`**.
3. A literal backslash inside that template literal must be written **`\\`** (so the null character prints as `\\0` in source, `\0` on screen). Writing `\0` would inject a real NUL byte.
4. Modules load **before** the engine so the engine can wire their questions.
5. If a module needs to render widgets after injection, define `initR02()`-style init and call it from the engine's INIT block.
6. Verify with `node --check <module>.js` before shipping.

## Style classes

`.card` `.concept` `.warn` `.two` `.toolbar` `.btn` `.btn.ghost` `.btn.small` `.muted` `.step-desc`
`table.cmp` · code spans: `.kw .ty .fn .nm .cm .st` · CSS vars: `--brand --green --amber --red --accent --ink --muted --line --panel2`

## Units built

- **Reading 01** — Getting started (*Dive into Systems* §16.1), Input/Output (§16.2), Conditionals (§16.3), Arrays (§16.5).
  Topics: C vs Java Basics · Operator Lab (integer division + a pre/post-increment stepper) · printf & Format Strings · printf Lab (a working `%d %c %s %g %%` / `\n \t` simulator) · Conditionals · Arrays · Array Lab (pass-by-base-address stepper + an out-of-bounds write that clobbers a neighbouring variable) · Assignment Q&A (all 28 handout questions, graded) · Code Writing.
- **Reading 02** — C Strings (§16.5), I/O Redirection (§17.12), Pipes (§17.13).
  Topics: C Strings · String Memory Lab · I/O Redirection · Redirection Lab · Pipes · Assignment Q&A (all 33 handout questions, graded, with explanations) · Code Writing.

78 graded items in total across the two units.
