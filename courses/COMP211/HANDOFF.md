# COMP 211 Study Guide: maintainer notes

This is an **interactive HTML study guide for COMP 211 (Systems Fundamentals)**, UNC, **Fall 2026**,
taught by **Connor McMahon**. Files live at `Projects/Study-Guide/courses/COMP211/`.

## Course facts worth having

- Textbook: **Dive into Systems** (free, https://diveintosystems.org/book/).
- Work: **readings (RD)** on Gradescope due 10 AM on class day (5 drops) · **homework (HW)** autograded,
  unlimited submissions, *no late work / no drops / no regrades* · **labs** up to 2 days late, first 2 free
  then &minus;20% · **quizzes** 50 min, paper, closed-book · **checkoffs**, short oral assessments.
- Final exam: Section 1 Tue Dec 8 2026 8–11 AM; Section 2 Sat Dec 5 2026 4–7 PM.
- Slides on Canvas before class; a **solutions version** is posted after class — always get
  that one, it is the answer key to the in-class active-learning problems.
- Honor code: **no posting assignments on GitHub or other public websites.** Course notes are fine;
  **lab/homework code must not go into this repo**, which is public.

## Structure

The guide is organized **by lecture** (`l0`, `l1`, `l2`, …), matching how the COMP 210 guide is built.
Each lecture's paired reading (RD00 with CL01, RD01 with CL02) lives as a topic tab *inside* that lecture.

```
courses/COMP211/
  config.js        ← course info, notes, resource links
  course.html      ← the course page (do not edit)
  guide/
    index.html                  ← shell: CSS, lesson bar, empty .lesson divs, script tags
    COMP211_Study_Guide_L0.js   ← CL00 Welcome + binary
    COMP211_Study_Guide_L1.js   ← CL01 Unix Basics + RD00 (shell simulator)
    COMP211_Study_Guide_L2.js   ← CL02 Intro to C + RD01 (pipeline + bits labs)
    COMP211_Study_Guide_L3.js   ← CL03 IO Redirection and Strings + RD02
    COMP211_Study_Guide_L4.js   ← CL04 Function Stack Frames + RD03
    COMP211_Study_Guide_L5.js   ← Unix Basics (FA26): $PATH, globbing, regex, find, grep
    COMP211_Study_Guide_L6.js   ← Checkoff 1 Prep: CLI practical (drill, from a released sample checkoff)
    COMP211_Study_Guide_L7.js   ← RD07: Bitwise Operators (DiS §4.6, §4.6.5)
    COMP211_Study_Guide.js      ← shared engine, MUST load last
    README.md                   ← engine API + authoring rules — read this first
```

## Current status

Lessons **0–5**, a **Checkoff 1 Prep (CLI practical)** module, and an **RD07 (Bitwise Operators)** reading
self-check are complete — 211 graded items, interactive labs (shell simulator, compilation pipeline,
bits/ASCII), every in-class active-learning problem worked through, self-checks for RD00–RD03 and RD07, and a
drill module built from a released sample checkoff. Lesson 6 (numbered) does not exist — L6 is the Checkoff 1
Prep module and L7 is RD07; nothing covering the lecture(s) between Checkoff 1 Prep and RD07 exists yet.

**Update:** `COMP211_Study_Guide_L19.js` is the **Checkoff 2 Prep (Debugging practical)** module (sample checkoff's 10 sections, fresh `ship.c` drill, oral prompts, common mistakes); it sits after CL10 in the lesson bar.

## Adding a lecture

1. Get the slides (`.pdf`/`.pptx`) and any reading-quiz screenshots, and extract the text (see the PDF tip below).
2. Build questions from the **actual handouts and in-class problems first**, then add your own.
3. Edit `guide/index.html`: add a lesson-bar button
   `<button data-l="lN" onclick="showLesson('lN',this)">Lesson N · Title</button>`, an empty
   `<div class="lesson" id="lN"></div>`, and `<script src="COMP211_Study_Guide_LN.js"></script>`
   **before** the engine script.
4. Write `guide/COMP211_Study_Guide_LN.js` following the existing pattern: a `<nav class="topics">`, several
   `<section class="topic">`, concept cards, active-recall questions, at least one **interactive widget**, the
   lecture's in-class problems with worked answers, and a reading self-check.
5. If it renders widgets, define `initLN()` — the engine already calls `initL0`…`initL8`.
6. `node --check` every JS file, then render-test headlessly (Playwright + the preinstalled Chromium) for
   console errors and undefined `onclick` handlers before shipping.
7. Update `guide/README.md` and the status note in `config.js`.

## Hard-won rules

- Injected HTML lives in a **template literal**: no unescaped backticks, no `${`, and a literal backslash must
  be written `\\` (writing `\0` injects a real NUL byte into the page). ASCII tree art needs `` \` ``.
- Keep each module under ~78 KB so files stay manageable and editors/tools don't truncate them.
- Tone: concise and warm; explain *why*, not just *what*. Verify every answer against the slides and the
  reading, and correct any mistake on a handout rather than echoing it.

## After each change

Commit and push from `Projects/Study-Guide`.
The site auto-deploys via GitHub Pages at `https://steven-c302.github.io/Study-Guide/`.

## Mastery section (added Oct 2026)

`guide/` is the lecture-by-lecture reference. **`mastery/`** is the practice engine behind the **★ Mastery** tab
(Today / Learn / Practice / Cards / Exam / Tutor). Read `courses/COMP211/mastery/README.md` first.

- New lecture material → add or extend a unit file (`uNN-*.js`, copy `_TEMPLATE.js`), add its `<script>` to `guide/index.html`
  before `shared/mastery-hub.js`, then run `node tools/validate-mastery.mjs`. Answer keys with `verify:` are compiled/run, so wrong keys fail.
- Cross-topic exam-style problems go in `u07-integration.js`.
- AI (tutor, teach-it-back, variants) is `netlify/functions/study-ai.mjs`; needs `ANTHROPIC_API_KEY` + `STUDY_ACCESS_CODE` in Netlify and a
  $5 limit in the Anthropic Console. Code-level cap is $4/month. `node tools/test-study-ai.mjs` tests it offline.
- Theme is `shared/theme.css` (Mono light / Night dark); don't hardcode colors.

### Adding slides and readings (materials library + search)

- Put slides in `materials/lectures/` (e.g. `CL02-intro-to-c.pdf`) and list them in `materials.js`. Save a text extraction next to the PDF
  (`CL02-intro-to-c.txt`; first line is the title, `[Slide N]` markers optional). `node tools/build-rag-index.mjs COMP211 [--no-embed]` then makes
  it searchable by the Ask feature and the AI tutor (existing embeddings are kept; new chunks get embedded when `VOYAGE_API_KEY` is set).
- **Graded work / anything with your name or grades** goes in `materials/private/` (git-ignored, never indexed or deployed). The honor code
  forbids posting assignments publicly and this repo is public. Turn it into original practice questions in `mastery/` instead.
- PDF tip: `pdftotext` (poppler) works if installed; on macOS without it, a ~10-line Swift script using PDFKit extracts the text with no installs.
