# University Study Hub

A single, offline hub for all of Steven's courses — interactive study guides, lecture libraries, and past exams. The hub itself is static HTML/JS, so just open **`index.html`** in any web browser (no server or install needed). One feature — COMP210's **Ask** panel — is backed by a small live serverless function; everything else needs nothing but a browser. See [RAG-based Ask Q&A](#rag-based-ask-qa-comp210) below for that piece.

## How to use

- Open **`index.html`** → the homepage shows a card for every course.
- Click a course → its page has tabs for **Overview**, **Study Guide**, **Lectures**, **Past Exams**, and **Notes & Resources**.
- The **COMP 210** study guide is fully built (Lessons 1–21, Final Prep, and 4 real quizzes + 5 practice exams), and its guide has a **★ Ask** button — a RAG-based Q&A feature that answers questions using only the lesson content itself, with citations back to the source section.
- The **COMP 211** study guide is being built lecture by lecture (Fall 2026): Unix basics, intro to C, I/O & pipes, stack frames, number representation, and bitwise operators, plus HW00–HW02 exercise sets — with a working shell simulator, a compilation-pipeline stepper, and bit/ASCII labs.
- The **INLS 382** study guide is being built meeting by meeting (Fall 2026): Lesson 1 covers problematical situations, worldview, purposeful activity models, the SSM learning cycle, and a rich-picture preview, from Checkland & Poulter's *Learning for Action*.
- The **COMP 227** study guide is being built reading by reading (Fall 2026): Lesson 1 covers the UTA Manual's 10 steps of tutoring, trust & active listening, common tutor mistakes, tutoring ESL students, Boyer et al.'s question-asking principles, and student development & course climate from *How Learning Works* Ch. 6 — with an interactive question-difficulty ladder and climate-continuum widget.
- COMP 301 and STOR 155 start with an empty study guide you grow over the term.

## Structure

```
index.html            ← hub homepage (course grid)
hub_data.js           ← the course registry (edit to add/reorder courses)
shared/
  hub.css             ← shared dark-theme styling
  course.js           ← renders each course page from its config
  materials-manager.js ← in-hub "➕ Add" file picker for lectures/exams
  guide-engine.js      ← shared retry-until-correct grading engine (COMP211/227/INLS382)
  rag-ask.js           ← the "★ Ask" panel injected into a course guide
courses/
  COMP210/
    course.html       ← the course page (loads config.js + shared/course.js)
    config.js         ← course info + lists of lectures/exams/notes
    guide/            ← the interactive study guide (index.html + modules)
      rag-chunks.json ← precomputed lesson chunks + embeddings for Ask (generated file)
    materials/
      lectures/       ← lecture slides/notes (PDFs, etc.)
      exams/          ← past exams & quizzes (PDFs)
  COMP211/  COMP301/  STOR155/  INLS382/   ← same layout; guides to be built
  _TEMPLATE/          ← copy this to start a new course
tools/
  build-rag-index.mjs ← offline script: chunks lesson content, calls the
                         embeddings API, writes rag-chunks.json (see below)
netlify/functions/
  ask.mjs              ← the one live piece of this site: retrieval + generation
                         for the Ask feature
```

## Add a new course

1. Copy the **`courses/_TEMPLATE`** folder and rename it to your course slug (e.g. `courses/COMP311`).
2. Edit that folder's **`config.js`** (code, title, description, color, requisites).
3. Add an entry for it in **`hub_data.js`** so it shows on the homepage.

## Add lectures or past exams to a course

**Easiest — the ➕ Add buttons (in-hub).** On a course's **Lectures** or **Past Exams** tab, click **➕ Add**, pick your PDF/PPTX, and give it a title. The hub copies the file into the right folder and records it automatically.
*Requires Chrome or Edge with the hub served over http(s) or localhost* (browsers block file-writing when a page is opened directly from disk with `file://`). Run a quick local server from this folder with either:
```
python -m http.server 8000       # then open http://localhost:8000
# or
npx serve
```

**Manual (works anywhere).**
1. Drop the file into that course's **`materials/lectures/`** or **`materials/exams/`** folder.
2. Add a line to the course's **`config.js`** under `lectures` or `exams`, e.g.
   ```js
   { title: "Midterm 1", file: "materials/exams/midterm1.pdf", solution: "materials/exams/midterm1_soln.pdf", date: "Oct 2026" }
   ```

## Hosting (access it from anywhere)

**Live site:** [steven-study-hub.netlify.app](https://steven-study-hub.netlify.app), deployed via the Netlify CLI (`netlify deploy --prod`), linked to this repo's `origin`.

The hub itself is a static site and would run fine on GitHub Pages — but the **Ask** feature (below) needs a live serverless function, which GitHub Pages can't run. That's why this project is on Netlify instead: everything except `netlify/functions/ask.mjs` is still 100% static, but Netlify is what lets that one function exist alongside it.

1. `npx netlify-cli login`, then `npx netlify-cli init` (or `sites:create` — see git history for exactly how this was set up).
2. Set `VOYAGE_API_KEY` and `ANTHROPIC_API_KEY` under **Site settings → Environment variables** (needed only for the Ask function; the rest of the site doesn't touch them).
3. `npx netlify-cli deploy --prod` to publish. Deploys are currently manual (not auto-triggered by `git push`) — connecting the GitHub repo under **Site settings → Build & deploy** would enable that.

If you ever want the hub without the Ask feature on GitHub Pages instead: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / root**. Everything will work except the ★ Ask button, since Pages can't serve `/.netlify/functions/ask`.

To add materials to the hosted copy, upload the file to the repo on github.com (open the course's `materials/` folder → **Add file → Upload files** → drag it in → commit) and add one line to that course's `config.js` (edit it right in GitHub).

## Build a study guide for a course

Ask Claude: *"Add Lesson 1 for COMP 211"* and upload the lecture slides (and any quiz). Claude builds an interactive lesson module (active-recall questions, code exercises, diagrams) into that course's `guide/`, the same way COMP 210 was built.

## Engine cleanup (COMP211 / COMP227 / INLS382)

The retry-until-correct grading engine (`gradeInput`, `checkFill`, `qRetry`, `qGiveUp`, matching, progress tracking — everything a lesson's questions call into) used to be copy-pasted independently into each of these three courses' guide aggregators. It's now one shared file, **`shared/guide-engine.js`**, loaded by each course's `guide/index.html`. COMP210 predates this engine and has its own, structurally different, single-shot-grading version — it wasn't merged in, to avoid a risky behavior change across its 21 lesson files.

That duplication is also why a real bug existed: fill-in-blank answers accept multiple correct forms, separated by a delimiter in `data-answer="ans1|ans2"`. The delimiter was `|` — which silently broke any accepted answer containing a literal pipe character (COMP210 Lesson 19's BFS-complexity question accepted `O(|V|+|E|)`, which used `|` both as the delimiter *and* as literal math notation). The fix (switching to `~~~`) had already landed in COMP211 but never made it to the other three courses, because there was no single place to apply it. All four now use `~~~`.

Both engines also gained **localStorage-backed progress persistence** — previously, reloading the page reset all progress to zero.

## RAG-based Ask Q&A (COMP210)

COMP210's guide has a **★ Ask** button (next to ★ Final Prep / ★ Quizzes in the lesson bar) that answers questions using *only* that course's own lesson content, with citations back to the exact section — a retrieval-augmented generation (RAG) feature, not a plain LLM wrapper.

**How it works:**
1. **Chunking** (`tools/build-rag-index.mjs`, no API calls) — parses every lesson's `.js` file, pulls out the HTML it injects, and slices it into section-level chunks (one per `<section class="topic" id="...">`) and finer question-level chunks (one per question + explanation). COMP210 currently has 423 chunks (128 section, 295 QA).
2. **Embedding** (same script) — each chunk's text is sent to Voyage AI (`voyage-3-lite`, 512-dimensional vectors) once, offline; the vectors are written into `courses/COMP210/guide/rag-chunks.json`, checked into the repo like any other generated content and regenerated only when lesson content changes. Batches by an estimated token budget with 429 retry/backoff, since Voyage throttles free-tier accounts to 3 requests/minute.
3. **Retrieval + generation** (`netlify/functions/ask.mjs`, the one live part of this site) — embeds the incoming question, ranks all chunks by cosine similarity, takes the top 6 above a similarity threshold, and asks Claude (`claude-haiku-4-5`) to answer using *only* those excerpts — returning `{answer, sources}` so the UI can cite exactly which lesson sections it used.
4. **UI** (`shared/rag-ask.js`) — injects the ★ Ask button and panel into the guide using the same `showLesson()` mechanism the guide already uses for Final Prep/Quizzes, so no changes were needed to the course-hub page.

**To run/update it locally:**
```bash
# one-time: add your keys to a local .env (gitignored)
echo "VOYAGE_API_KEY=..." >> .env
echo "ANTHROPIC_API_KEY=..." >> .env

# (re)build the index whenever lesson content changes
node tools/build-rag-index.mjs COMP210

# serve the static site + the function together to test
npx netlify-cli dev
```
Both keys must also be set as Netlify environment variables on the deployed site (`.env` never leaves your machine).

**Status:** fully built, embedded, and verified end-to-end on the live production URL for **COMP210**. COMP211/227/INLS382 have chunk files extracted (from the same script) but no embeddings computed yet and no Ask panel wired into their guides — extending them is the same three commands above, run per course.

---
*Courses set up: COMP 210 (Data Structures & Algorithms), COMP 211 (Systems Fundamentals), COMP 301 (Foundations of Programming), STOR 155 (Data Models & Inference), INLS 382 (Systems Analysis), COMP 227 (Effective Peer Teaching in Computer Science).*
