# Theme + Mastery engine (shared code)

**Theme** (`theme.css`, `theme.js`): Mono (light) / Night (dark) / Auto toggle. Applied to COMP210, COMP211, COMP227, COMP301, INLS382
by two lines in each guide's `<head>`. It re-skins by overriding the existing CSS variables; new colors should come from tokens
(`--green` correct, `--red` trap, `--amber` warning), never hardcoded hex.

**Mastery engine**: `mastery.js` (state, scheduling, question types, unit registry, AI client), `mastery-hub.js` (the UI),
`mastery.css`. Content is per course in `courses/<COURSE>/mastery/` (units + `config.js`); see that folder's README for authoring,
the validator (`node tools/validate-mastery.mjs [COURSE]`) and AI setup. To add Mastery to another course: create
`courses/<COURSE>/mastery/` with a `config.js` (`window.MASTERY_COURSE = { course: '<COURSE>' }`) and unit files, then add the scripts
(`mastery.js`, config, units, `mastery-hub.js`) and `mastery.css` to that course's `guide/index.html`.

**AI**: `netlify/functions/study-ai.mjs` (tutor, explain, variants) with a hard monthly budget cap. Tests: `node tools/test-study-ai.mjs`.
