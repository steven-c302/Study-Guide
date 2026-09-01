# HANDOFF — COMP 211 Study Guide (paste into a new session)

You are continuing an **interactive HTML study guide for COMP 211 (Systems Fundamentals)**, UNC, **Fall 2026**,
taught by **Connor McMahon**. Files live at `Projects/Study-Guide/courses/COMP211/`.

## Course facts worth having

- Textbook: **Dive into Systems** (free, https://diveintosystems.org/book/).
- Work: **readings (RD)** on Gradescope due 10 AM on class day (5 drops) · **homework (HW)** autograded,
  unlimited submissions, *no late work / no drops / no regrades* · **labs** up to 2 days late, first 2 free
  then &minus;20% · **quizzes** 50 min, paper, closed-book · **checkoffs**, short oral assessments.
- Final exam: Section 1 Tue Dec 8 2026 8–11 AM; Section 2 Sat Dec 5 2026 4–7 PM.
- Slides on Canvas before class; a **solutions version** is posted after class — always ask the user for that
  one, it is the answer key to the in-class active-learning problems.
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
    COMP211_Study_Guide.js      ← shared engine, MUST load last
    README.md                   ← engine API + authoring rules — read this first
```

## Current status

Lessons **0–5** plus a **Checkoff 1 Prep (CLI practical)** module are complete — 184 graded items,
interactive labs (shell simulator, compilation pipeline, bits/ASCII), every in-class active-learning problem
worked through, self-checks for RD00–RD03, and a drill module built from a released sample checkoff. Nothing
past Checkoff 1 Prep exists yet.

## Adding a lecture

1. Ask the user for the slides (`.pdf`/`.pptx`) and any reading-quiz screenshots. Read the PDF with the Read
   tool using the `pages` parameter (max 20 pages per call).
2. Build questions from the user's **actual handouts and in-class problems first**, then add your own.
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
- Keep each module under ~78 KB — the Write tool truncates past that.
- Write files with the Write/Edit tools, then deliver with `SendUserFile` + `device_commit_files`.
- Tone: concise and warm; explain *why*, not just *what*. Verify every answer against the slides and the
  reading, and correct any mistake on the user's handout rather than echoing it.

## After each change

Give the user the git commands to commit and push from `Projects/Study-Guide` — they do that step themselves.
The site auto-deploys via GitHub Pages at `https://steven-c302.github.io/Study-Guide/`.
