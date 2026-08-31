# INLS 382 · Systems Analysis — Study Guide

UNC SDIS, Fall 2026 · Ryan Shaw. Open **`index.html`** in any browser. No server, no build step.

## Files

| File | Role |
|---|---|
| `index.html` | Shell — all CSS, the header, the lesson bar, the progress bar, and one empty `<div class="lesson" id="lN">` per meeting. Loads the modules, then the engine. |
| `INLS382_Study_Guide_L1.js` | **Lesson 1** — "What a rich picture is and isn't": the Preamble + Ch.1 "A Skeleton Account of SSM" (problematical situations, worldview, the four core systems ideas, purposeful activity models, the learning cycle, LUMAS, hard vs. soft systems, and a rich-picture preview). |
| `INLS382_Study_Guide.js` | Shared **engine**. Must load **last**. |

## Lessons built

- **Lesson 1 · Rich Pictures & the Basics of SSM** — problematical situations vs. "problems"; worldview (Weltanschauung) with an interactive **worldview lens** (same scenario, different worldview, different verdict — the reading's eco-warrior/capitalist, punishment/rehabilitation, and terrorism/freedom-fighting examples); the four requirements of an adaptive whole (communication, control, layered structure, emergent properties) as a clickable diagram; purposeful activity models worked through the fence-painting example (Fig. 1.2/1.3); the SSM learning cycle (Fig. 1.4–1.6) and why it's iterative, not linear; the LUMAS model; hard vs. soft systems thinking; and a preview of what a rich picture is (and isn't), sourced from the course's own framing, ahead of the full technique in Chapter 2 (not yet assigned). 16 graded items plus two matching tables.

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

## Authoring rules (learned the hard way, on COMP 210/211)

1. Each meeting lives in its **own module file**; keep `index.html` small.
2. Module content is injected from a **template literal** — no unescaped backticks, no `${`.
3. A literal backslash inside that template literal must be written **`\\`** (writing `\0` injects a real NUL byte).
4. Modules load **before** the engine so it can wire their questions.
5. Verify with `node --check` before shipping.

## Style classes

`.card` `.concept` `.warn` `.danger` `.two` `.two-wide` `.toolbar` `.btn` `.btn.ghost` `.btn.small` `.muted` `.step-desc`
`table.cmp` · widgets `.lens-scenario .lens-choices .lens-result .sysdia .req-btn .req-detail .amodel`
CSS vars: `--brand --brand-d --green --amber --red --accent --purple --ink --muted --line --panel2`

## Adding the next meeting

1. Ask the user for the reading (PDF) and any quiz screenshots for the next "Finding Out" entry on the syllabus schedule.
2. Read the PDF with the Read tool using the `pages` parameter (max 20 pages per call). Read it fully before building — don't build from the syllabus blurb alone.
3. Build questions from the actual reading first; correct any quiz answers against the source rather than echoing them.
4. Edit `guide/index.html`: add a lesson-bar button `<button data-l="lN" onclick="showLesson('lN',this)">Lesson N &middot; Title</button>`, an empty `<div class="lesson" id="lN"></div>`, and `<script src="INLS382_Study_Guide_LN.js"></script>` **before** the engine script.
5. Write `guide/INLS382_Study_Guide_LN.js` following the existing pattern: a `<nav class="topics">`, several `<section class="topic">`, concept cards, active-recall questions, at least one **interactive widget**, and a self-check.
6. If it renders widgets, define `initLN()` — the engine already calls `initL0`…`initL8`.
7. `node --check` every JS file before shipping.
8. Update this README and the status note in `../config.js`.
