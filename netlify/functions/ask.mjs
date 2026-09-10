/* ============================================================
   /.netlify/functions/ask

   Query-time half of the RAG "Ask" feature. Receives a course +
   question, embeds the question, retrieves the most similar
   precomputed lesson chunks (built offline by
   tools/build-rag-index.mjs), and asks Claude to answer using
   ONLY those retrieved chunks — returning citations back to the
   real lesson sections so the answer is checkable, not just
   plausible-sounding.

   Required environment variables (set in the Netlify UI, and in
   a local .env for `netlify dev` — never in client code):
     VOYAGE_API_KEY     — same embeddings model used to build the index
     ANTHROPIC_API_KEY  — generation

   POST body: { course: "COMP210", question: "..." }
   Response:  { answer, sources: [{ id, lesson, title }] }
             or { answer: null, reason: "no-match" } if nothing in
             the course's index clears the similarity threshold —
             this is what keeps the feature honestly grounded
             instead of quietly falling back to Claude's general
             knowledge.
   ============================================================ */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

const VOYAGE_MODEL = 'voyage-3-lite';
// Haiku, not Sonnet/Opus: this task is bounded (answer only from the
// handful of retrieved excerpts, or decline) and latency-sensitive for an
// interactive widget — no need to pay for or wait on a bigger model.
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';
const TOP_K = 6;
const MIN_SIMILARITY = 0.3; // below this, nothing retrieved is actually relevant

/**
 * `included_files` in netlify.toml bundles each course's rag-chunks.json
 * alongside the function, preserving its repo-relative path. Netlify
 * resolves that relative to the deploy's base directory, which in
 * practice lines up with the function file's own directory walked back
 * to the repo root — try that first, then fall back to cwd for local
 * `netlify dev` runs, since the exact resolution differs between the
 * two and this is the one part of the feature that needs verifying
 * against a real deploy.
 */
function findChunksFile(course) {
  const relPath = join('courses', course, 'guide', 'rag-chunks.json');
  const candidates = [
    join(HERE, '..', '..', relPath),
    join(process.cwd(), relPath),
  ];
  return candidates.find(existsSync) || null;
}

function loadChunks(course) {
  const path = findChunksFile(course);
  if (!path) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embedQuery(question, apiKey) {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: [question], model: VOYAGE_MODEL, input_type: 'query' }),
  });
  if (!res.ok) throw new Error(`Voyage embeddings API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.data[0].embedding;
}

function retrieveTopChunks(chunks, queryVector) {
  const scored = chunks
    .filter(c => Array.isArray(c.embedding))
    .map(c => ({ chunk: c, score: cosineSimilarity(c.embedding, queryVector) }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, TOP_K).filter(s => s.score >= MIN_SIMILARITY);
}

async function generateAnswer(question, retrieved, apiKey) {
  const context = retrieved
    .map((r, i) => `[${i + 1}] (${r.chunk.title})\n${r.chunk.text}`)
    .join('\n\n');

  const prompt = `You are a study assistant answering a question about one course's lesson material. Answer ONLY using the numbered excerpts below — if they don't contain the answer, say so plainly instead of guessing or using outside knowledge. Cite which excerpt number(s) you used.

Excerpts:
${context}

Question: ${question}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content.map(block => block.text || '').join('');
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const { course, question } = body || {};
  if (!course || !question || typeof question !== 'string') {
    return new Response(JSON.stringify({ error: 'Expected { course, question }' }), { status: 400 });
  }

  const voyageKey = process.env.VOYAGE_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!voyageKey || !anthropicKey) {
    return new Response(JSON.stringify({ error: 'Server missing VOYAGE_API_KEY/ANTHROPIC_API_KEY' }), { status: 500 });
  }

  const chunks = loadChunks(course);
  if (!chunks) {
    return new Response(JSON.stringify({ answer: null, reason: 'no-index', sources: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const queryVector = await embedQuery(question, voyageKey);
    const retrieved = retrieveTopChunks(chunks, queryVector);

    if (!retrieved.length) {
      return new Response(JSON.stringify({ answer: null, reason: 'no-match', sources: [] }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const answer = await generateAnswer(question, retrieved, anthropicKey);
    const sources = retrieved.map(r => ({
      id: r.chunk.id,
      section: r.chunk.section,
      lesson: r.chunk.lesson,
      title: r.chunk.title,
    }));

    return new Response(JSON.stringify({ answer, sources }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 502 });
  }
};
