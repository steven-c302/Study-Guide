# HANDOFF — COMP 227 Study Guide (paste into a new session)

You are continuing an **interactive HTML study guide for COMP 227 (Effective Peer Teaching in Computer
Science)**, UNC CS, **Fall 2026**, taught by **Tessa Joseph-Nicholas**. Files live at
`Projects/Study-Guide/courses/COMP227/`.

## Course facts worth having

- COMP 227 trains undergraduates who already hold a UTA position to tutor/mentor peers, via pedagogy concepts,
  effective tutoring practices, and building inclusive/accessible learning environments. It does not count
  toward the CS major/minor. Meets Tuesdays 12:30-1:45pm, SN 011.
- Readings come from two recurring sources: the department's own **UTA Manual** (practical tutoring technique)
  and academic papers/book chapters on pedagogy (e.g. Ambrose et al., *How Learning Works*; Boyer et al. on
  question-asking). Meetings often pair with a **paper reading quiz** (10 MC questions, in class, on paper) —
  check for an instructor "terms and concepts" reminder email/announcement before building a lesson; it's the
  best signal for what to emphasize.
- Reading PDFs are book/manual chapters and a research paper, not lecture slides — read them fully with the
  `pages` parameter (max 20 pages/call) before building a lesson; don't rely on a syllabus blurb alone.

## Structure

The guide is organized **by meeting/reading set**, matching how the COMP 210 / COMP 211 / INLS 382 guides are
built.

```
courses/COMP227/
  config.js        ← course info, notes, resource links
  course.html      ← the course page (do not edit)
  guide/
    index.html                  ← shell: CSS, lesson bar, empty .lesson divs, script tags
    COMP227_Study_Guide_L1.js   ← Lesson 1: UTA Manual pp.1-27, Boyer et al., How Learning Works Ch.6
    COMP227_Study_Guide.js      ← shared engine, MUST load last
    README.md                   ← engine API + authoring rules — read this first
```

## Current status

**Lesson 1 · Tutoring Basics & the Learning Environment** is complete, covering everything from Reading Quiz 1
(due Tu 9/1): the 10 steps of effective tutoring, trust-building/active listening, common tutor mistakes,
tutoring ESL students (with an interactive question-difficulty-ladder widget), Boyer et al.'s four
question-asking principles, Chickering's Seven Vectors, Perry's intellectual development stages, Hardiman &
Jackson's social identity development, and course climate/stereotype threat/strategies (with an interactive
climate-continuum widget). Ends with a Reading Quiz 1 Self-Check topic built directly from the instructor's own
terms/concepts reminder. Three matching tables, ~20 graded items, two interactive click-through diagrams.
Nothing past Lesson 1 exists yet.

## Adding a meeting

1. Ask the user for the reading (PDF/slides) for the next meeting, and any quiz screenshots or a terms/concepts
   reminder if one was circulated.
2. Read the material fully with the Read tool's `pages` parameter (max 20 pages/call) — don't skim.
3. Build questions from the actual reading first, then add your own; if a quiz or terms reminder is provided,
   make sure every item on it becomes a graded active-recall question, and note where in the lesson it's
   covered.
4. Edit `guide/index.html`: add a lesson-bar button
   `<button data-l="lN" onclick="showLesson('lN',this)">Lesson N · Title</button>`, an empty
   `<div class="lesson" id="lN"></div>`, and `<script src="COMP227_Study_Guide_LN.js"></script>`
   **before** the engine script.
5. Write `guide/COMP227_Study_Guide_LN.js` following the existing pattern: a `<nav class="topics">`, several
   `<section class="topic">`, concept cards, active-recall questions (MC/TF/fill-in as fits), at least one
   **interactive widget or diagram**, and a self-check topic mapped to any provided terms list.
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
  than general pedagogy knowledge, and flag ideas the reading itself calls out (or that are easy to mix up) as
  commonly misunderstood.

## After each change

Give the user the git commands to commit and push from `Projects/Study-Guide` — they do that step themselves.
The site auto-deploys via GitHub Pages once configured (see the hub root `README.md`).
