#!/usr/bin/env node
/* ============================================================
   build-rag-index.mjs

   Offline indexing script for the study guide's "Ask" (RAG) feature.
   Run this locally whenever lesson content changes:

     node tools/build-rag-index.mjs [COURSE_CODE] [--no-embed]

   COURSE_CODE (optional) limits the run to one course, e.g.
   `node tools/build-rag-index.mjs COMP210`. Omit it to (re)index
   every course that has a guide/ folder with lesson files.

   Also indexes any .txt under courses/<CODE>/materials/ (except private/) and the Mastery units.
   Existing embeddings are reused when a chunk's text is unchanged.

   --no-embed skips the embeddings API call and only (re)writes the
   chunk text — useful for iterating on chunk boundaries for free
   before spending API calls on embeddings.

   What it does (two passes over the same output file):
     1. Chunking (always runs, no API calls, no network):
        walks each course's courses/<CODE>/guide/*_L*.js /
        Practice.js / Quizzes.js / Final.js files, pulls the HTML
        each one injects via `.innerHTML = \`...\``, and extracts:
          - one "section" chunk per <section class="topic" id="...">
            block (a whole lesson topic — the coarse, primary chunk)
          - one "qa" chunk per .q / answer-card block inside a section
            (a single question + its explanation — finer-grained,
            often a closer match to how a student actually asks)
        Writes courses/<CODE>/guide/rag-chunks.json.

     2. Embedding (skipped without a VOYAGE_API_KEY, or with --no-embed):
        calls Voyage AI's embeddings API once per chunk and adds an
        `embedding` array to each chunk entry in the same JSON file.
        Only ever run locally/offline — the key never ships to the
        client or to the Netlify function bundle.

   Dependency note: HTML is stripped with a small regex-based
   tag-stripper rather than a real HTML parser package. This repo's
   lesson markup is simple and hand-authored (not arbitrary web
   content), so that trade-off is fine here and keeps this the only
   dependency-free step in an otherwise dependency-free repo. A real
   parser (e.g. node-html-parser) would be more robust to malformed
   markup but isn't needed for content this well-behaved.
   ============================================================ */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COURSES_DIR = join(ROOT, 'courses');

/* ---------------- tiny .env loader (no dependency) ---------------- */
function loadDotEnv() {
  const envPath = join(ROOT, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

/* ---------------- HTML helpers ---------------- */

/** Strip tags + decode the handful of entities this markup actually uses. */
function stripHtml(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Find the matching closing tag for an already-open tag, tracking nesting
 * depth of that same tag name (so a <div> containing other <div>s is
 * still extracted whole). `openEnd` is the index right after the opening
 * tag's `>`. Returns the index right after the matching `</tagName>`, or
 * -1 if unterminated.
 */
function findMatchingClose(html, tagName, openEnd) {
  const openRe = new RegExp('<' + tagName + '(?:\\s[^>]*)?>', 'gi');
  const closeRe = new RegExp('<\\/' + tagName + '\\s*>', 'gi');
  let depth = 1;
  let pos = openEnd;
  while (depth > 0) {
    openRe.lastIndex = pos;
    closeRe.lastIndex = pos;
    const o = openRe.exec(html);
    const c = closeRe.exec(html);
    if (!c) return -1;
    if (o && o.index < c.index) { depth++; pos = o.index + o[0].length; }
    else { depth--; pos = c.index + c[0].length; }
  }
  return pos;
}

/** Extract every top-level `<tagName class="...cls...">...</tagName>` block. */
function extractBlocks(html, tagName, cls) {
  const blocks = [];
  const openRe = new RegExp('<' + tagName + '\\s+class="([^"]*\\b' + cls + '\\b[^"]*)"([^>]*)>', 'gi');
  let m;
  while ((m = openRe.exec(html))) {
    const openEnd = m.index + m[0].length;
    const closeEnd = findMatchingClose(html, tagName, openEnd);
    if (closeEnd === -1) continue;
    const inner = html.slice(openEnd, closeEnd - (tagName.length + 3));
    blocks.push({ attrs: m[0], inner, start: m.index, end: closeEnd });
    openRe.lastIndex = closeEnd;
  }
  return blocks;
}

/** Pull the raw HTML out of a lesson file's `innerHTML = \`...\`;` write. */
function extractInnerHtml(source) {
  const m = source.match(/\.innerHTML\s*=\s*`/);
  if (!m) return null;
  const start = m.index + m[0].length;
  // Lesson templates are plain HTML strings with no `${}` interpolation and
  // no escaped backticks in this codebase, so the next backtick closes it.
  const end = source.indexOf('`', start);
  if (end === -1) return null;
  return source.slice(start, end);
}

/* ---------------- chunking ---------------- */

function chunkLessonFile(course, lessonId, html) {
  const chunks = [];
  const sections = extractBlocks(html, 'section', 'topic');
  for (const sec of sections) {
    const idMatch = sec.attrs.match(/id="([^"]+)"/);
    const sectionId = idMatch ? idMatch[1] : `${lessonId}-${chunks.length}`;
    const h2 = sec.inner.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = h2 ? stripHtml(h2[1]) : sectionId;

    chunks.push({
      id: sectionId,
      section: sectionId, // the real, navigable DOM anchor for this chunk
      course,
      lesson: lessonId,
      type: 'section',
      title,
      text: stripHtml(sec.inner),
    });

    // Secondary, finer-grained QA chunks: one per .q block (prompt + fb)
    // and one per answer-card that has its own .fb (fill-blank cards).
    const qBlocks = extractBlocks(sec.inner, 'div', 'q');
    qBlocks.forEach((q, i) => {
      const prompt = q.inner.match(/<div\s+class="prompt"[^>]*>([\s\S]*?)<\/div>/i);
      const fb = q.inner.match(/<div\s+class="fb"[^>]*>([\s\S]*?)<\/div>/i);
      const question = prompt ? stripHtml(prompt[1]) : '';
      const answer = fb ? stripHtml(fb[1]) : '';
      if (!question && !answer) return;
      chunks.push({
        id: `${sectionId}-q${i}`,
        section: sectionId, // the real, navigable DOM anchor for this chunk
        course,
        lesson: lessonId,
        type: 'qa',
        title,
        text: [question, answer].filter(Boolean).join(' — '),
      });
    });

    const cardBlocks = extractBlocks(sec.inner, 'div', 'card');
    cardBlocks.forEach((card, i) => {
      if (card.inner.includes('class="q"')) return; // already covered above
      const h3 = card.inner.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const fb = card.inner.match(/<div\s+class="fb"[^>]*>([\s\S]*?)<\/div>/i);
      if (!h3 && !fb) return;
      const question = h3 ? stripHtml(h3[1]) : '';
      const answer = fb ? stripHtml(fb[1]) : '';
      if (!answer) return; // a card with no .fb has nothing distinct to retrieve
      chunks.push({
        id: `${sectionId}-card${i}`,
        section: sectionId, // the real, navigable DOM anchor for this chunk
        course,
        lesson: lessonId,
        type: 'qa',
        title,
        text: [question, answer].filter(Boolean).join(' — '),
      });
    });
  }
  return chunks;
}

function lessonIdFromFilename(courseCode, filename) {
  // e.g. COMP210_Study_Guide_L19.js -> "L19", COMP210_Study_Guide_Practice.js -> "Practice"
  const prefix = `${courseCode}_Study_Guide_`;
  return filename.slice(prefix.length, filename.length - 3);
}

function buildCourseIndex(courseCode) {
  const guideDir = join(COURSES_DIR, courseCode, 'guide');
  if (!existsSync(guideDir)) return null;
  const files = readdirSync(guideDir).filter(f =>
    f.startsWith(`${courseCode}_Study_Guide_`) && f.endsWith('.js')
  );
  if (!files.length) return null;

  const allChunks = [];
  for (const file of files.sort()) {
    const source = readFileSync(join(guideDir, file), 'utf8');
    const html = extractInnerHtml(source);
    if (!html) continue;
    const lessonId = lessonIdFromFilename(courseCode, file);
    allChunks.push(...chunkLessonFile(courseCode, lessonId, html));
  }
  return allChunks;
}

/* ---------------- extra sources: course materials text + Mastery units ---------------- */

/**
 * Any text file under courses/<CODE>/materials/ (EXCEPT the git-ignored private/
 * folder) is chunked on slide/paragraph boundaries so slides and readings you
 * add later are searchable. Convention: save a text extraction next to the PDF
 * (CL01-unix-basics.pdf + CL01-unix-basics.txt).
 */
function walkTxt(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'private') continue;                                  // never index graded/personal files
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkTxt(p, out);
    else if (name.endsWith('.txt')) out.push(p);
  }
  return out;
}
function chunkMaterials(courseCode) {
  const chunks = [];
  for (const file of walkTxt(join(COURSES_DIR, courseCode, 'materials'))) {
    const raw = readFileSync(file, 'utf8');
    const base = file.split('/').pop().replace(/\.txt$/, '');
    const title = (raw.split('\n')[0] || base).replace(/ - text extracted.*$/, '').trim();
    const parts = raw.split(/\n(?=\[Slide \d+\])/);                    // slide-by-slide when present
    let cur = '', n = 0;
    const flush = () => {
      const text = cur.replace(/\s+/g, ' ').trim();
      if (text.length > 80) chunks.push({ id: `mat-${base}-${n++}`, section: '', course: courseCode, lesson: 'MATERIALS', type: 'material', title: `${title} (part ${n})`, text });
      cur = '';
    };
    for (const part of parts) { if (cur.length + part.length > 1500) flush(); cur += '\n' + part; }
    flush();
  }
  return chunks;
}

/** Load the course's mastery unit files in a stub browser and turn them into chunks. */
function chunkMastery(courseCode) {
  const dir = join(COURSES_DIR, courseCode, 'mastery');
  if (!existsSync(dir)) return [];
  const noop = () => {};
  const sb = { console, setTimeout, clearTimeout,
    document: { createElement: () => ({ className: '', style: {}, classList: { add: noop, remove: noop, toggle: noop }, appendChild: noop, setAttribute: noop, addEventListener: noop }), addEventListener: noop, querySelector: () => null, querySelectorAll: () => [] },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop }, location: { pathname: '/', hostname: 'localhost', protocol: 'http:' } };
  sb.window = sb; vm.createContext(sb);
  vm.runInContext(readFileSync(join(ROOT, 'shared', 'mastery.js'), 'utf8'), sb);
  for (const f of readdirSync(dir).filter(f => f === 'config.js' || /^u\d+.*\.js$/.test(f)).sort((a, b) => (/checkpoint/.test(a) - /checkpoint/.test(b)) || a.localeCompare(b)))
    vm.runInContext(readFileSync(join(dir, f), 'utf8'), sb, { filename: f });
  const out = [];
  for (const u of sb.Mastery.units) {
    const L = u.learn || {};
    out.push({ id: `mastery-${u.id}-learn`, section: 'lmastery', course: courseCode, lesson: 'MASTERY', type: 'section', title: `Mastery: ${u.title}`,
      text: stripHtml([u.blurb, ...(L.big || []), ...(L.traps || []).map(t => 'Common trap: ' + t)].join(' ')) });
    u.cards.forEach((c, i) => out.push({ id: `mastery-${u.id}-card${i}`, section: 'lmastery', course: courseCode, lesson: 'MASTERY', type: 'qa', title: `Mastery: ${u.short}`, text: stripHtml(c.f) + ' \u2014 ' + stripHtml(c.b) }));
    u.items.concat(u.checkpoint || []).forEach((it, i) => {
      const why = it.why || it.model; if (!why) return;
      out.push({ id: `mastery-${u.id}-q${i}`, section: 'lmastery', course: courseCode, lesson: 'MASTERY', type: 'qa', title: `Mastery: ${u.short}`,
        text: stripHtml(it.prompt + (it.code ? ' ' + it.code : '')) + ' \u2014 ' + stripHtml(why) });
    });
  }
  return out;
}

/** Re-use embeddings from the existing index for chunks whose text is unchanged, so a rebuild never discards them. */
function reuseEmbeddings(chunks, outPath) {
  if (!existsSync(outPath)) return 0;
  let prev; try { prev = JSON.parse(readFileSync(outPath, 'utf8')); } catch { return 0; }
  const byId = new Map(prev.filter(c => Array.isArray(c.embedding)).map(c => [c.id, c]));
  let n = 0;
  for (const c of chunks) { const p = byId.get(c.id); if (p && p.text === c.text) { c.embedding = p.embedding; n++; } }
  return n;
}

/* ---------------- embedding (Voyage AI) ---------------- */

const VOYAGE_MODEL = 'voyage-3-lite';
// Accounts without a payment method on file get throttled to 3 RPM / 10K
// TPM (the free token allowance still applies either way — this is a rate
// limit, not a spend limit). Batch by an estimated token budget rather
// than a fixed chunk count, since a few outlier chunks (e.g. a long
// diagram-walkthrough section) can otherwise blow past 10K tokens alone.
const TOKEN_BUDGET_PER_BATCH = 6000; // ~60% of the 10K TPM cap, margin for estimate error
const MAX_CHUNKS_PER_BATCH = 60;
const estTokens = text => Math.ceil(text.split(/\s+/).length * 1.4); // rough words->tokens

function makeBatches(chunks) {
  const batches = [];
  let current = [], tokens = 0;
  for (const c of chunks) {
    const t = estTokens(c.text);
    if (current.length && (tokens + t > TOKEN_BUDGET_PER_BATCH || current.length >= MAX_CHUNKS_PER_BATCH)) {
      batches.push(current);
      current = []; tokens = 0;
    }
    current.push(c); tokens += t;
  }
  if (current.length) batches.push(current);
  return batches;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function embedBatchWithRetry(batch, apiKey, attempt = 1) {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: batch.map(c => c.text),
      model: VOYAGE_MODEL,
      input_type: 'document',
    }),
  });
  if (res.status === 429) {
    if (attempt > 5) throw new Error('Voyage embeddings API: still rate-limited after 5 retries.');
    const retryAfter = Number(res.headers.get('retry-after'));
    const waitMs = (retryAfter > 0 ? retryAfter : 25) * 1000;
    console.log(`  rate-limited (429) — waiting ${Math.round(waitMs / 1000)}s before retry ${attempt}/5...`);
    await sleep(waitMs);
    return embedBatchWithRetry(batch, apiKey, attempt + 1);
  }
  if (!res.ok) {
    throw new Error(`Voyage embeddings API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  data.data.forEach((row, j) => { batch[j].embedding = row.embedding; });
}

async function embedChunks(chunks, apiKey) {
  const batches = makeBatches(chunks);
  let done = 0;
  for (const batch of batches) {
    await embedBatchWithRetry(batch, apiKey);
    done += batch.length;
    console.log(`  embedded ${done}/${chunks.length}`);
  }
}

/* ---------------- main ---------------- */

async function main() {
  loadDotEnv();
  const args = process.argv.slice(2);
  const noEmbed = args.includes('--no-embed');
  const requestedCourse = args.find(a => !a.startsWith('--'));

  const courseCodes = requestedCourse
    ? [requestedCourse]
    : readdirSync(COURSES_DIR).filter(d => existsSync(join(COURSES_DIR, d, 'guide')));

  const apiKey = process.env.VOYAGE_API_KEY;
  if (!noEmbed && !apiKey) {
    console.log('No VOYAGE_API_KEY found (checked process.env and .env) — writing chunks only, skipping embeddings.');
    console.log('Set VOYAGE_API_KEY (e.g. in a local .env file) and rerun to add vectors.\n');
  }

  for (const courseCode of courseCodes) {
    const chunks = buildCourseIndex(courseCode);
    if (!chunks) continue;
    const lessonCount = chunks.length;
    chunks.push(...chunkMaterials(courseCode), ...chunkMastery(courseCode));
    console.log(`${courseCode}: extracted ${chunks.length} chunks` +
      ` (${lessonCount} lesson, ${chunks.filter(c => c.type === 'material').length} materials, ${chunks.filter(c => c.lesson === 'MASTERY').length} mastery)`);

    const outPath = join(COURSES_DIR, courseCode, 'guide', 'rag-chunks.json');
    const kept = reuseEmbeddings(chunks, outPath);
    if (kept) console.log(`  kept ${kept} existing embeddings (text unchanged)`);

    if (!noEmbed && apiKey) {
      const todo = chunks.filter(c => !Array.isArray(c.embedding));
      console.log(`  embedding ${todo.length} new/changed chunks`);
      await embedChunks(todo, apiKey);
    }

    writeFileSync(outPath, JSON.stringify(chunks, null, 2));
    console.log(`  wrote ${outPath}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
