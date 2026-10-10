// Counts the claims ledger. Dependency-free: node docs/ai-evals/count.mjs [--json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  const bad = body.filter(r => r.length !== head.length).map(r => r[0]);
  if (bad.length) throw new Error('Malformed ledger rows (wrong number of fields): ' + bad.join(', '));
  return body.map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

export function summarise(rows) {
  const tally = rs => rs.reduce((o, r) => ((o[r.verdict] = (o[r.verdict] || 0) + 1), o), {});
  const audit = rows.filter(r => r.pass === '1' || r.pass === '2');
  const t = tally(audit);
  const n = k => t[k] || 0;
  return {
    audit: {
      checked: audit.length,
      pass1: audit.filter(r => r.pass === '1').length,
      pass2: audit.filter(r => r.pass === '2').length,
      supported: n('supported'),
      noSource: n('no_source'),
      overstated: n('overstated'),
      contradicted: n('contradicted'),
      unsupported: n('no_source') + n('overstated') + n('contradicted'),
      inconsistent: n('inconsistent'),
      notCheckable: n('not_checkable'),
      brief: (() => { const b = audit.filter(r => r.pass === '2'); const u = b.filter(r => ['no_source', 'overstated', 'contradicted'].includes(r.verdict)).length; return { checked: b.length, supported: b.filter(r => r.verdict === 'supported').length, unsupported: u, notCheckable: b.filter(r => r.verdict === 'not_checkable').length }; })(),
    },
    orig: (() => { const ro = rows.filter(r => r.pass === 'A'); const to = tally(ro); return { entries: ro.length, noSource: to.no_source || 0, overstated: to.overstated || 0, inconsistent: to.inconsistent || 0, defect: to.defect || 0 }; })(),
    pass3: (() => { const r3 = rows.filter(r => r.pass === '3'); const t3 = tally(r3); return { entries: r3.length, supported: 0, open: 0, ...t3, fixed: (t3.contradicted || 0) + (t3.overstated || 0) + (t3.no_source || 0) }; })(),
  };
}

export function loadLedger(file = path.join(path.dirname(fileURLToPath(import.meta.url)), 'claims-ledger.csv')) {
  return parseCsv(fs.readFileSync(file, 'utf8'));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const s = summarise(loadLedger());
  console.log(process.argv.includes('--json') ? JSON.stringify(s, null, 2) : s);
}
