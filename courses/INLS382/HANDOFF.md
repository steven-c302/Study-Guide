# HANDOFF — INLS 382 Study Guide (paste into a new session)

You are continuing an **interactive HTML study guide for INLS 382 (Systems Analysis)**, UNC SDIS, **Fall 2026**,
taught by **Ryan Shaw**. Files live at `Projects/Study-Guide/courses/INLS382/`.

## Course facts worth having

- The course is Soft Systems Methodology (SSM), taught via Checkland & Poulter's *Learning for Action* (Wiley,
  2006). Meetings are Mondays & Wednesdays, 1:25–2:40 PM, Manning 208.
- The course's own framing: organizations are not machines with faults to diagnose but situations where people
  who see things differently must nonetheless act together. **The situation the class inquires into is the
  class itself** — students are not observers of it, but inside it, and the inquiry is part of the situation.
- The course site organizes meetings as dated **"Finding Out"** entries, each with a topic (e.g. "What a rich
  picture is and isn't") and required reading (PDFs of Checkland & Poulter chapters). Check the course's
  **guidelines** and **schedule** pages for meeting-by-meeting detail if the user shares them.
- Reading PDFs are book chapters/preambles, not lecture slides — read them fully with the `pages` parameter
  (max 20 pages/call) before building a lesson; don't rely on the syllabus blurb alone.

## Structure

The guide is organized **by meeting**, matching how the COMP 210 / COMP 211 guides are built.

```
courses/INLS382/
  config.js        ← course info, notes, resource links
  course.html      ← the course page (do not edit)
  guide/
    index.html                  ← shell: CSS, lesson bar, empty .lesson divs, script tags
    INLS382_Study_Guide_L1.js   ← Lesson 1: Preamble + Ch.1 "A Skeleton Account of SSM"
    INLS382_Study_Guide.js      ← shared engine, MUST load last
    README.md                   ← engine API + authoring rules — read this first
```

## Current status

**Lesson 1 · Rich Pictures & the Basics of SSM** is complete: problematical situations, worldview (with an
interactive worldview-lens widget), the four core systems ideas (interactive diagram), purposeful activity
models worked through the fence-painting example, the SSM learning cycle and LUMAS, hard vs. soft systems
thinking, and a preview of what a rich picture is/isn't (full technique arrives with Chapter 2, not yet
assigned). 16 graded items plus two matching tables. Nothing past Lesson 1 exists yet.

## Adding a meeting

1. Ask the user for the reading (PDF) for the next "Finding Out" entry, and any quiz screenshots if the
   syllabus schedule shows one for that meeting.
2. Read the PDF fully with the Read tool's `pages` parameter (max 20 pages/call) — this is book content, not
   slides, so don't skim.
3. Build questions from the actual reading first, then add your own; if a quiz is provided, include its
   questions with correct answers and note where in the guide each is covered.
4. Edit `guide/index.html`: add a lesson-bar button
   `<button data-l="lN" onclick="showLesson('lN',this)">Lesson N · Title</button>`, an empty
   `<div class="lesson" id="lN"></div>`, and `<script src="INLS382_Study_Guide_LN.js"></script>`
   **before** the engine script.
5. Write `guide/INLS382_Study_Guide_LN.js` following the existing pattern: a `<nav class="topics">`, several
   `<section class="topic">`, concept cards, active-recall questions (MC/TF/fill-in as fits), at least one
   **interactive widget or diagram**, and worked examples.
6. If it renders widgets, define `initLN()` — the engine already calls `initL0`…`initL8`.
7. `node --check` every JS file before shipping.
8. Update `guide/README.md` and the status note in `config.js`.

## Hard-won rules

- Injected HTML lives in a **template literal**: no unescaped backticks, no `${`, and a literal backslash must
  be written `\\` (writing `\0` injects a real NUL byte into the page).
- Keep each module well under the ~78 KB point where the Write tool starts truncating.
- Write files with the Write/Edit tools, then deliver with `SendUserFile` + `device_commit_files`. **Never
  write/edit files in the connected folder via the bash tool** — bash writes have caused host/mount desync on
  other courses in this repo that silently truncated files.
- Tone: concise and warm; explain *why*, not just *what*. Verify every claim against the actual reading rather
  than general SSM knowledge, and flag ideas the reading itself calls out as commonly misunderstood.

## After each change

Give the user the git commands to commit and push from `Projects/Study-Guide` — they do that step themselves.
The site auto-deploys via GitHub Pages once configured (see the hub root `README.md`).
