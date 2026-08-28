# HANDOFF — COMP 211 Study Guide (paste into a new session)

You are continuing an **interactive HTML study guide for COMP 211 (Systems Fundamentals)** at
`Projects/Study-Guide/courses/COMP211/`. Textbook: **Dive into Systems** (free, https://diveintosystems.org/book/).

## Where things live

```
courses/COMP211/
  config.js        ← course info, notes, resource links (shows on the course page)
  course.html      ← the course page (do not edit; it just loads config.js + shared/course.js)
  guide/
    index.html                  ← shell: CSS, header, lesson bar, empty .lesson divs, script tags
    COMP211_Study_Guide_R02.js  ← Reading 02 module (injects into #r02)
    COMP211_Study_Guide.js      ← shared engine, MUST load last
    README.md                   ← engine API + authoring rules — read this first
```

## Current status

- **Reading 01** is complete: getting started (§16.1), input/output (§16.2), conditionals (§16.3),
  arrays (§16.5). Nine topics, three interactive labs (integer division + pre/post-increment stepper;
  a working `printf` simulator; an array pass-by-base-address stepper with an out-of-bounds scenario),
  all 28 handout questions graded, and five code-writing exercises.
- **Reading 02** is complete: C strings & null termination (§16.5), I/O redirection & file descriptors
  (§17.12), pipes (§17.13). Seven topics including two interactive labs, a pipeline stepper, all 33
  questions from the handout with worked explanations, and five code-writing exercises.
- 78 graded items total. The lecture series is still open.

## Adding a unit

1. Read the assigned sections (WebFetch the Dive into Systems URLs) and any slides/quiz screenshots the
   user provides. Build questions from **the user's actual handout first**, then add your own.
2. Edit `guide/index.html`: add a lesson-bar button
   `<button data-l="rNN" onclick="showLesson('rNN',this)">Reading NN · Title</button>`,
   an empty `<div class="lesson" id="rNN"></div>`, and a
   `<script src="COMP211_Study_Guide_RNN.js"></script>` **before** the engine script.
3. Write `guide/COMP211_Study_Guide_RNN.js` following the R02 pattern: a `<nav class="topics">`, several
   `<section class="topic">`, concept cards, active-recall questions, at least one **interactive
   widget**, a graded pass over every handout question, and a **code-writing** section.
4. If the module renders widgets, define `initRNN()` and add `if (typeof initRNN === 'function') initRNN();`
   to the engine's INIT block.
5. `node --check` every JS file, then render-test headlessly (Playwright + the preinstalled Chromium)
   for console errors before shipping.
6. Update `guide/README.md` and the "what's in it so far" note in `config.js`.

## Hard-won rules

- Injected HTML lives in a **template literal**: no backticks, no `${`, and a literal backslash must be
  written `\\` (writing `\0` injects a real NUL byte into the page).
- Write files with the Write/Edit tools, then deliver with `SendUserFile` + `device_commit_files`.
  Do not try to edit the user's local repo through a shell.
- Tone: concise and warm; explain *why*, not just *what*. Verify every answer against the reading and
  correct any mistake the user made on their handout rather than echoing it.

## After each change

Tell the user to `git add . && git commit -m "..." && git push` from `Projects/Study-Guide`.
