#!/usr/bin/env node
/* Offline tests for netlify/functions/study-ai.mjs (mocked Anthropic; no network, no cost).
     node tools/test-study-ai.mjs
   Verifies: access code, origin check, budget metering + hard cap, per-action behavior,
   and that variants whose independent re-solve disagrees are dropped. */
import assert from 'node:assert/strict';
process.env.ANTHROPIC_API_KEY = 'test'; process.env.STUDY_ACCESS_CODE = 'letmein';
process.env.MONTHLY_BUDGET_USD = '0.01';            // tiny cap so we can hit it
let queue = [], seen = [];
globalThis.fetch = async (url, opts) => {
  const body = JSON.parse(opts.body); seen.push({ url, body });
  const text = queue.shift();
  if (text === undefined) throw new Error('unexpected extra API call');
  return { ok: true, json: async () => ({ content: [{ text }], usage: { input_tokens: 1000, output_tokens: 200 } }) }; // = $0.002 at $1/$5
};
const { default: handler } = await import('../netlify/functions/study-ai.mjs');
const req = (b, h = {}) => new Request('https://x.app/.netlify/functions/study-ai', { method: 'POST', headers: { host: 'x.app', 'x-study-code': 'letmein', ...h }, body: JSON.stringify(b) });
const call = async (b, h) => { const r = await handler(req(b, h)); return { status: r.status, json: await r.json() }; };

// auth
assert.equal((await call({ action: 'status' }, { 'x-study-code': 'nope' })).status, 401);
assert.equal((await call({ action: 'status' }, { origin: 'https://evil.com' })).status, 403);
assert.equal((await call({ action: 'status' })).json.cap, 0.01);
console.log('ok  access code + origin');

// explain: parses fenced JSON, meters cost
queue = ['```json\n{"hit":["a"],"missed":["b"],"misconception":"","followup":"why?"}\n```'];
let r = await call({ action: 'explain', prompt: 'q', points: ['p1', 'p2'], answer: 'x'.repeat(40) });
assert.equal(r.status, 200); assert.deepEqual(r.json.hit, ['a']); assert.ok(Math.abs(r.json.budget.spent - 0.002) < 1e-9);
assert.equal((await call({ action: 'explain', prompt: 'q', points: ['p1'], answer: 'short' })).status, 400);
console.log('ok  explain + metering');

// variants: 3 generated, solver agrees with 2 -> 2 returned
const v = (a) => ({ type: 'mc', topic: 't', prompt: 'p' + a, options: [{ t: 'a', why: 'w' }, { t: 'b', why: 'w' }, { t: 'c', why: 'w' }], answer: a, why: 'y' });
queue = [JSON.stringify([v(0), v(1), v(2)]), JSON.stringify([{ n: 0, answer: 0 }, { n: 1, answer: 2 }, { n: 2, answer: 2 }])];
r = await call({ action: 'variants', item: { type: 'mc', topic: 't', prompt: 'orig', options: [{ t: 'a' }, { t: 'b' }, { t: 'c' }], answer: 1 } });
assert.equal(r.status, 200); assert.equal(r.json.generated, 3); assert.equal(r.json.variants.length, 2);
assert.deepEqual(r.json.variants.map(x => x.answer), [0, 2]);                       // the disagreeing one (n=1) was dropped
assert.equal(seen.at(-1).body.messages[0].content.includes('"answer"'), false);        // solver never saw the claimed answers
console.log('ok  variants: independent re-solve filters wrong items');

// tutor: no chunks file in test env -> still works; last message must be from user
queue = ['What do you think `p` holds?'];
r = await call({ action: 'tutor', course: 'COMP211', messages: [{ role: 'user', content: 'why does arr change?' }] });
assert.equal(r.status, 200); assert.ok(r.json.reply.includes('think'));
assert.equal((await call({ action: 'tutor', course: 'COMP211', messages: [{ role: 'assistant', content: 'hi' }] })).status, 400);
console.log('ok  tutor');

// budget cap: spent is now 0.002*? -> push over, then everything but status is refused with 429 and NO API call
queue = ['{"hit":[],"missed":[],"misconception":"","followup":""}', '{"hit":[],"missed":[],"misconception":"","followup":""}', '{"hit":[],"missed":[],"misconception":"","followup":""}'];
const body = { action: 'explain', prompt: 'q', points: ['p1'], answer: 'x'.repeat(40) };
let blocked = 0, calls0 = seen.length;
for (let i = 0; i < 6; i++) { const x = await call(body); if (x.status === 429) blocked++; }
assert.ok(blocked >= 1, 'cap must eventually block');
const before = seen.length; queue = ['SHOULD NOT BE USED'];
assert.equal((await call(body)).status, 429); assert.equal(seen.length, before);        // refused without calling the API
assert.equal((await call({ action: 'status' })).status, 200);                          // status still works
console.log('ok  monthly budget cap blocks calls without spending');
console.log('\nall study-ai tests passed');
