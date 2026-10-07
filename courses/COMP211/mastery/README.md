# COMP211 · Mastery (how it works, how to add to it)

The **★ Mastery** tab in the COMP211 guide is the practice engine. The lecture tabs teach; Mastery makes you
retrieve, trace, debug, combine and explain until it is automatic. It is built from research on how people learn
programming (below), and it is meant to grow as the semester does.

## What is in it

| View | What it does |
|---|---|
| **Today** | One-click ~10 min session: due recall cards + questions you missed + a stretch question, shuffled together. 14-day activity strip, weak spots (misses you were *sure* about count double), exam countdown. |
| **Learn** | Per unit: big ideas, common traps, links to the source lessons, and worked examples that fade (fully worked, then you finish one, then you do one alone). |
| **Practice** | A 5-tier ladder per unit (plus a **★ Checkpoint** when the unit has one): Recognize, Trace, Debug & Build, Integrate, Produce. 80% of a tier opens the next. Wrong answers never reveal the right one; hints come before reveals; rate your confidence. |
| **Cards** | Spaced-repetition recall cards (right answers return after 1, 3, 7, 14, 30 days; misses return now). |
| **Exam** | Timed, interleaved, no feedback until you submit; skews to trace/debug/integrate like real exam problems; results by unit and tier; misses queue for tomorrow. |
| **Tutor ★** | AI: Socratic chat grounded in this guide, Teach-it-back, and fresh variants of questions you missed. |

Units are listed in lecture order first, then topic reviews:
`u08` CL01 Unix basics · `u09` CL02 Intro to C · `u10` CL03 I/O redirection, pipes & strings · `u11` CL04 stack frames · `u12` CL05 $PATH, globbing, regex, find & grep; then cumulative reviews `u01` number systems, `u02` bitwise, `u03` shell, `u04` C basics, `u05` stack & pointers, `u06` debugging, `u07` cross-topic integration (the "putting it together" problems). RD04 (file permissions) is not covered yet.

## Why it is built this way (research)

* **Retrieval practice and spacing** beat rereading and highlighting (Dunlosky et al., 2013).
* **Tracing and explaining code come before writing it**, and together predict writing ability (Lopez, Lister et al.; ITiCSE multi-national studies). Tier 2 is all tracing; Tier 5 includes explain-it-back.
* **Worked examples faded to solo problems** reduce load for novices (Sweller; Renkl). Learn tabs do this; **Parsons problems** give the same learning as writing code in less time.
* **Interleaving and multiple contexts** improve transfer to new problems. Sessions, exams and unit `u07` mix topics on purpose.
* **Misconceptions in the notional machine** (what is a copy, what is an address) cause most pointer errors. Wrong options carry a "why", and "sure but wrong" misses are tracked.


## Homework checkpoints (mini-checkers)

Each homework covers one unit, so each unit can carry a **checkpoint**: a HW-style mini-checker with the homework's own
topics and question styles but *fresh* questions. It is auto-graded with no hints, unlimited retries and best score kept, shows a
per-topic breakdown, and queues misses for review. Units with one: `u08` (HW00 Unix basics, 21 questions), `u09` (HW1 Intro to C, 34 questions), and HW2, which spans two units: `u11`
(stack frames, 17 questions) and `u12` ($PATH, find, globbing and regex, 27 questions). To add one for a new homework:

1. Put the graded PDF in `materials/private/` (git-ignored; it has your name and grades) and extract its text
   (PDFKit via a tiny Swift script works on this Mac).
2. Create `uNN-hwX-checkpoint.js` calling `Mastery.checkpoint('uNN', [items], { title, source, blurb })`, one `topic` per homework section
   (items must be auto-gradable: no `free`/`explain`). Add its `<script>` after the unit's own file in `guide/index.html`.
3. `node tools/validate-mastery.mjs`: it compiles and runs every `verify:` snippet. Original questions only; never copy homework text.

The course page and hub home read a progress snapshot the guide writes to localStorage (`mastery-summary:COMP211`), so your due
count, per-unit progress and checkpoint scores appear there. Deep links: `guide/index.html#mastery`, `#mastery:session`,
`#mastery:learn:u09`, `#mastery:practice:u09`.

## Adding a new lecture / new slides

1. Decide which unit it belongs to, or copy `_TEMPLATE.js` to a new `uNN-name.js`.
2. Add questions to the right tiers. Ask for **trace and integrate** questions; recognition is the easy tier.
   Put cross-topic problems in `u07`.
3. Add `verify:` to anything with a computable answer (C output, shell output, number conversions).
4. Add the `<script>` tag to `guide/index.html` (before `mastery-hub.js`).
5. Run **`node tools/validate-mastery.mjs`**. It checks the schema and *compiles and runs* the C/shell snippets, so a
   wrong answer key fails instead of reaching you.
6. Rebuild the tutor index when lesson text changes: `node tools/build-rag-index.mjs COMP211` (needs `VOYAGE_API_KEY`; without it the tutor falls back to keyword search over the chunks file).

### Prompt for an AI coding assistant (optional)

If you use an AI coding assistant to draft new units, give it the slides plus this:

> I'm adding COMP211 lecture slides. Read them, then update the Mastery section: (1) add or extend the right unit file in
> `courses/COMP211/mastery/` using `_TEMPLATE.js` and `shared/mastery.js` helpers; (2) write ~4 Recognize, 5 Trace, 4 Debug & Build,
> 3 Integrate, 3 Produce items plus 8 recall cards, with misconception-based wrong options and a `why` on everything;
> (3) add `verify:` for every computable answer; (4) put any cross-topic problems in `u07`; (5) run
> `node tools/validate-mastery.mjs` and fix failures; (6) tell me what you added. Use the course's own naming and conventions from the slides.

## AI features: setup and cost

The static site works with no AI. The Tutor tab needs one Netlify function (`netlify/functions/study-ai.mjs`).

1. Deploy the repo to **Netlify** (the guide's existing "Ask" feature needs this too). If the guide is hosted elsewhere
   (e.g. GitHub Pages), deploy the functions to Netlify anyway and set `aiEndpoint` in `mastery/config.js` to the full URL;
   the function already allows `https://steven-c302.github.io` (add others with `ALLOWED_ORIGINS`).
2. In Netlify, set env vars: `ANTHROPIC_API_KEY`, **`STUDY_ACCESS_CODE`** (any long random string; required, the function
   refuses to run without it), optionally `VOYAGE_API_KEY`.
3. In the **Anthropic Console, set a monthly spend limit of $5.** This is the guarantee that holds no matter what.
4. Open Mastery, Tutor, paste the access code once (kept only in your browser).

**Hard limits in code** (`study-ai.mjs`): access code on every call; Claude Haiku 4.5; max output 300-1300 tokens; capped input
sizes and chat history; 20 requests/minute; and a **monthly budget cap (default $4.00, `MONTHLY_BUDGET_USD`)** metered from
the API's own token counts. At the cap every AI action returns 429 *before* contacting the API.
`node tools/test-study-ai.mjs` proves that.

**Typical cost** (Haiku 4.5, about $1 / $5 per million input / output tokens; override with `PRICE_IN_PER_MTOK`, `PRICE_OUT_PER_MTOK`):

| Action | About | Per use |
|---|---|---|
| Tutor chat turn | 3k in, 250 out | $0.004 |
| Teach-it-back / written feedback | 1k in, 250 out | $0.002 |
| 3 practice variants (generate + independent re-solve) | 1.3k in, 1.1k out | $0.007 |

A heavy day (8 tutor turns, 3 teach-backs, 2 variant sets) is about **$0.05**; a typical month is **$1 to $3**, with the cap at $4 so the
whole key (including the older Ask feature) stays under $5.

## Notes

* AI-generated variants are **not run through a compiler**. A second AI pass re-solves each one blind and mismatches are dropped, but
  treat the explanation as the real check. Authored questions *are* machine-verified.
* Progress lives in your browser's `localStorage` (per device). Clearing site data resets it.
* The tutor can retrieve from every lesson chunk. To hide lessons from it, set `EXCLUDE_LESSONS` (e.g. `L8,L9`).
