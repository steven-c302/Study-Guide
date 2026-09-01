# University Study Hub

A single, offline hub for all of Steven's courses — interactive study guides, lecture libraries, and past exams. Everything is static HTML/JS, so just open **`index.html`** in any web browser (no server or install needed).

## How to use

- Open **`index.html`** → the homepage shows a card for every course.
- Click a course → its page has tabs for **Overview**, **Study Guide**, **Lectures**, **Past Exams**, and **Notes & Resources**.
- The **COMP 210** study guide is fully built (Lessons 1–21, Final Prep, and 4 real quizzes + 5 practice exams).
- The **COMP 211** study guide is being built lecture by lecture (Fall 2026): Lessons 0–2 cover the welcome deck, Unix basics, and intro to C — with a working shell simulator, a compilation-pipeline stepper, and bit/ASCII labs.
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
courses/
  COMP210/
    course.html       ← the course page (loads config.js + shared/course.js)
    config.js         ← course info + lists of lectures/exams/notes
    guide/            ← the interactive study guide (index.html + modules)
    materials/
      lectures/       ← lecture slides/notes (PDFs, etc.)
      exams/          ← past exams & quizzes (PDFs)
  COMP211/  COMP301/  STOR155/  INLS382/   ← same layout; guides to be built
  _TEMPLATE/          ← copy this to start a new course
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

This is a static site, so **GitHub Pages** is the simplest free host and it's already tied to your repo:

1. Push this repo to GitHub.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / root**, then Save.
3. After ~1 minute your hub is live at `https://<your-username>.github.io/<repo-name>/`.
4. It auto-redeploys every time you `git push`.

To add materials to the **hosted** copy, upload the file to the repo on github.com (open the course's `materials/` folder → **Add file → Upload files** → drag it in → commit) and add one line to that course's `config.js` (edit it right in GitHub). Pages redeploys automatically. (Alternatives to GitHub Pages: Netlify, Vercel, and Cloudflare Pages — all free for static sites.)

## Build a study guide for a course

Ask Claude: *"Add Lesson 1 for COMP 211"* and upload the lecture slides (and any quiz). Claude builds an interactive lesson module (active-recall questions, code exercises, diagrams) into that course's `guide/`, the same way COMP 210 was built.

---
*Courses set up: COMP 210 (Data Structures & Algorithms), COMP 211 (Systems Fundamentals), COMP 301 (Foundations of Programming), STOR 155 (Data Models & Inference), INLS 382 (Systems Analysis), COMP 227 (Effective Peer Teaching in Computer Science).*
