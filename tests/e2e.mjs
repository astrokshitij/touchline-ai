// Browser checks for the TouchlineAI prototype (site/index.html).
// Run:  cd tests && npm install && npm test
// Optional: SCREENSHOT_DIR=/some/dir to save screenshots, CHROMIUM_PATH=/path/to/chrome.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { loadLedger, summarise } from '../docs/ai-evals/count.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
// SITE_FILE lets you point the same checks at another build (for example an older copy).
const SITE = pathToFileURL(process.env.SITE_FILE || path.join(here, '..', 'site', 'index.html')).href;
const SHOTS = process.env.SCREENSHOT_DIR;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : '  -> ' + detail}`);
}

// Runs one block of checks; an exception in it is reported as a FAIL and the run continues.
async function section(name, fn) {
  try { await fn(); } catch (e) { check(`${name} (test aborted)`, false, String(e.message).split('\n')[0]); }
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});

// Opens a fresh page and records console errors, page errors and non-local requests.
async function openApp(viewport = { width: 375, height: 812 }) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const log = { consoleErrors: [], pageErrors: [], externalRequests: [], dialogs: [] };
  page.on('console', m => { if (m.type() === 'error') log.consoleErrors.push(m.text()); });
  page.on('pageerror', e => log.pageErrors.push(String(e)));
  page.on('request', r => {
    const u = r.url();
    if (!u.startsWith('file:') && !u.startsWith('data:') && !u.startsWith('blob:')) log.externalRequests.push(u);
  });
  page.on('dialog', async d => { log.dialogs.push(d.message()); await d.accept(); });
  await page.goto(SITE);
  return { page, context, log };
}

const clip = (page, time) => page.locator('.clip-card', { hasText: time });
const reel = (page, name) => page.locator('#reelsPreviewList .reel-card', { hasText: name });
const shot = async (page, name) => { if (SHOTS) await page.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: true }); };

async function runDetection(page) {
  await page.click('#btnRunDetection');
  await page.waitForSelector('#screen2.active', { timeout: 8000 });
}
async function overflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}
async function reassignC2ToLiam(page) {
  await clip(page, '14:22').getByRole('button', { name: /Reassign/ }).click();
  await page.click('#btnConfirmReassign');
}
// Decide every remaining unresolved clip: reassign 14:22, confirm the rest.
async function resolveAll(page) {
  await reassignC2ToLiam(page);
  while (await page.locator('.clip-card .clip-actions').count() > 0) {
    await page.locator('.clip-card .clip-actions').first().getByRole('button', { name: /Confirm/ }).click();
  }
}

// ---------------------------------------------------------------- 1. load + data integrity
await section('1. load + data integrity', async () => {
  const { page, context, log } = await openApp();
  check('page title is TouchlineAI', (await page.title()).includes('TouchlineAI'));
  check('setup: roster shows 12 children', (await page.locator('#rosterTableBody tr').count()) === 12);
  check('setup: Sofia H. shows missing consent', (await page.locator('#rosterTableBody tr', { hasText: 'Sofia' }).innerText()).includes('Missing'));
  await runDetection(page);
  check('review: 11 clips, all start unresolved', (await page.locator('.clip-card').count()) === 11 && (await page.locator('.clip-card .clip-actions').count()) === 11);
  check('review: counter reads 0 of 11 reviewed', (await page.locator('#reviewedCounter').innerText()).startsWith('0 of 11'));

  // every clip must start and end inside the 72:00 footage (read from what the page shows)
  const ends = await page.$$eval('.clip-card', cards => cards.map(c => {
    const start = c.querySelector('.clip-time').textContent.trim().slice(0, 5);
    const dur = parseInt(c.querySelector('.clip-time').nextElementSibling.textContent.replace(/\D/g, ''), 10);
    const [m, sec] = start.split(':').map(Number);
    return m * 60 + sec + dur;
  }));
  const worst = Math.max(...ends);
  check('every clip ends inside the 72:00 footage (latest end ' + worst + 's vs limit 4320s)', worst <= 72 * 60, String(worst));
  check('late clip reads 70:15-70:25', (await clip(page, '70:15').innerText()).includes('70:15\u201370:25'));
  check('cards show start and end times (FR-4)', (await page.locator('.clip-time').first().innerText()).includes('\u2013'));
  await shot(page, '01-review-mobile');
  check('review: no horizontal overflow at 375px', (await overflow(page)) <= 0, String(await overflow(page)));
  await context.close();
});

// ---------------------------------------------------------------- 2. reassignment note vs selected child
await section('2. reassignment note vs selected child', async () => {
  const { page, context, log } = await openApp();
  await runDetection(page);
  await clip(page, '14:22').getByRole('button', { name: /Reassign/ }).click();
  const selectedText = () => page.$eval('#reassignPlayerSelect', el => el.options[el.selectedIndex].text);
  const note = () => page.inputValue('#reassignNotes');

  check('reassign modal: Liam T. (#4) is the one selected option', (await selectedText()).includes('Liam T.'));
  check('reassign modal: note names Liam, not Maya', (await note()).includes('Liam T.') && !(await note()).includes('Maya'), await note());
  await shot(page, '02-reassign-modal-mobile');

  await page.selectOption('#reassignPlayerSelect', { label: '#14 Maya S.' });
  check('changing the player rewrites the note to match', (await note()).includes('Maya S.') && !(await note()).includes('Liam'), await note());

  await page.fill('#reassignNotes', 'Looks like Liam T. to me');
  check('a hand-typed note naming a different child blocks confirm', await page.locator('#btnConfirmReassign').isDisabled());
  check('...and explains why', (await page.locator('#reassignError').innerText()).includes('Liam T.'));

  await page.selectOption('#reassignPlayerSelect', { label: '#4 Liam T.' });
  check('fixing the player re-enables confirm', !(await page.locator('#btnConfirmReassign').isDisabled()));
  await page.click('#btnConfirmReassign');

  check('clip 14:22 is now assigned to Liam T. (#4)', (await clip(page, '14:22').innerText()).includes('Reassigned to Liam T. (#4)'));
  const audit = await page.evaluate(() => STATE.auditLog[0]);
  check('audit entry names Liam, the AI proposal and a version', audit.includes('Maya S.') && audit.includes('Liam T.') && audit.includes('v1'), audit);
  check('a coach-typed note that names the chosen child is kept as typed', audit.includes('Note: "Looks like Liam T. to me"'), audit);

  // Modal on a clip with no jersey match keeps the current assignee and a neutral note
  await clip(page, '04:12').getByRole('button', { name: /Reassign/ }).click();
  check('non-mismatch clip: current assignee preselected (Lucas M.)', (await selectedText()).includes('Lucas M.'));
  await page.click('#reassignModal .btn-secondary');
  check('console clean during reassignment', log.consoleErrors.length === 0 && log.pageErrors.length === 0, JSON.stringify(log));
  await context.close();
});

// ---------------------------------------------------------------- 3. removal needs a real reason
await section('3. removal needs a real reason', async () => {
  const { page, context } = await openApp();
  await runDetection(page);
  await clip(page, '29:10').getByRole('button', { name: /Remove/ }).click();
  await page.click('#removeModal .btn-danger');
  check('removal without a reason is refused', (await page.locator('#removeError').isVisible()) && (await clip(page, '29:10').locator('.clip-actions').count()) === 1);
  await page.selectOption('#removeReasonSelect', 'Unidentifiable / Heavily obscured jersey');
  await page.click('#removeModal .btn-danger');
  check('removal with a reason excludes the clip and logs it', (await clip(page, '29:10').innerText()).includes('Removed from all reels (Unidentifiable') && (await page.evaluate(() => STATE.auditLog[0])).includes('REMOVE'));
  await context.close();
});

// ---------------------------------------------------------------- 4. gates, exclusion, approval reset, zero-highlight
await section('4. gates, exclusion, approval reset, zero-highlight', async () => {
  const { page, context, log } = await openApp();
  await runDetection(page);
  await page.click('#btnGoToPreview');
  const banner = () => page.locator('#publicationGateBanner').innerText();
  check('gate: 11 unresolved clips block publication', (await banner()).includes('11 assignment(s) remain unresolved'), await banner());
  check('gate: consent block names Sofia H. (#12)', (await banner()).includes('Sofia H. (#12)'));
  check('gate: publish and approve both disabled', (await page.locator('#btnPublishBatch').isDisabled()) && (await page.locator('#btnApproveBatch').isDisabled()));
  await shot(page, '03-gate-blocked-mobile');
  check('publish: no horizontal overflow at 375px', (await overflow(page)) <= 0, String(await overflow(page)));

  await page.click('nav button:has-text("Review")');
  await resolveAll(page);
  const defaultNote = await page.evaluate(() => STATE.auditLog.find(e => e.includes('REASSIGN')));
  check('untouched default note says Liam T. (#4), the chosen child', defaultNote.includes('Note: "Frame shows jersey #4; assigned to Liam T. (#4)."'), defaultNote);
  check('all 11 clips decided', (await page.locator('#unresolvedBadge').innerText()) === 'All Decided');
  await page.click('#btnGoToPreview');
  check('gate: only the consent block remains', (await banner()).includes('Sofia H.') && !(await banner()).includes('unresolved'), await banner());
  check('gate: approve still disabled while consent missing', await page.locator('#btnApproveBatch').isDisabled());

  // Noah B.: honest zero state, nothing borrowed
  const noah = await reel(page, 'Noah B.').innerText();
  check('Noah B. shows 0 Highlights and the honest no-highlight note', noah.includes('0 Highlights') && noah.includes('No clips from other children have been substituted'));
  check('Noah B. reel lists no timestamps', !/\d\d:\d\d/.test(noah), noah);
  check('Liam T. holds the corrected clip (14:22)', (await reel(page, 'Liam T.').innerText()).includes('14:22'));
  check('Maya S. no longer holds it (0 highlights)', (await reel(page, 'Maya S.').innerText()).includes('0 Highlights'));

  // explicit exclusion path
  await page.click('text=Simulate Exclusion');
  const sofia = await reel(page, 'Sofia H.').innerText();
  check('exclusion is shown, with reason and the withheld clip count', sofia.includes('Excluded') && sofia.includes('Missing consent / opt-out') && sofia.includes('1 confirmed clip(s) are withheld'), sofia);
  check('exclusion appears in the audit log', (await page.evaluate(() => STATE.auditLog[0])).includes('ELIGIBILITY_EXCLUSION_SIMULATED'));
  check('after exclusion: approval is available but publish still needs approval', !(await page.locator('#btnApproveBatch').isDisabled()) && (await page.locator('#btnPublishBatch').isDisabled()));

  await page.click('#btnApproveBatch');
  check('approval enables publish', !(await page.locator('#btnPublishBatch').isDisabled()) && (await page.locator('#batchApprovalBadge').innerText()).includes('Approved'));

  // any change after approval resets approval (FR-20)
  await page.click('text=Back to Review Assignments');
  await clip(page, '04:12').getByRole('button', { name: /Change/ }).click();
  await page.click('#btnGoToPreview');
  check('FR-20: reopening a clip makes publish unavailable again', await page.locator('#btnPublishBatch').isDisabled());
  check('FR-20: approval invalidation is in the audit log', (await page.evaluate(() => STATE.auditLog.some(e => e.includes('APPROVAL_INVALIDATED')))));
  await page.click('nav button:has-text("Review")');
  await clip(page, '04:12').getByRole('button', { name: /Confirm/ }).click();
  await page.click('#btnGoToPreview');
  check('after re-deciding, the old approval is not reused (publish stays locked until re-approved)', await page.locator('#btnPublishBatch').isDisabled());
  await page.click('#btnApproveBatch');

  // publish, duplicate guard, lock
  await page.click('#btnPublishBatch');
  check('publish: 11 simulated deliveries (Sofia excluded)', (await page.locator('#deliveryDispatchLog .audit-entry').count()) === 11);
  check('publish: wording says simulated and not ground truth', (await page.locator('#deliverySummaryText').innerText()).includes('does not establish ground-truth accuracy'));
  const summaryText = await page.locator('#deliverySummaryText').innerText();
  check('publish: no "100%" or "zero wrong child" accuracy boast', !/100\s*%|zero wrong/i.test(summaryText), summaryText);
  check('publish: badge no longer claims an idempotency key', !(await page.locator('#deliveryIdempotencyBadge').innerText()).toLowerCase().includes('key'));
  await page.evaluate(() => handlePublishBatch());
  check('duplicate publish is blocked', log.dialogs.some(d => d.includes('Duplicate Delivery Blocked')));
  await shot(page, '04-published-mobile');

  const before = await page.evaluate(() => JSON.stringify(STATE.clips));
  await page.click('nav button:has-text("Review")');
  const buttons = await page.locator('.clip-card button').count();
  check('after publish: review actions are removed and a lock notice is shown', buttons === 0 && (await page.locator('#clipsReviewContainer').innerText()).includes('Batch already published'));
  await page.evaluate(() => confirmClip('c1'));
  await page.evaluate(() => reopenClip('c1'));
  check('after publish: programmatic changes are refused too', (await page.evaluate(() => JSON.stringify(STATE.clips))) === before);

  check('console clean across the whole flow', log.consoleErrors.length === 0 && log.pageErrors.length === 0, JSON.stringify(log));
  check('no external network requests', log.externalRequests.length === 0, JSON.stringify(log.externalRequests));
  await context.close();
});

// ---------------------------------------------------------------- 5. failed delivery retries only that child
await section('5. failed delivery retries only that child', async () => {
  const { page, context } = await openApp();
  await runDetection(page);
  await resolveAll(page);
  await page.click('#btnGoToPreview');
  await page.click('text=Simulate Consent');
  await page.click('#btnToggleSimFailure');
  await page.click('#btnApproveBatch');
  await page.click('#btnPublishBatch');
  const failed = () => page.evaluate(() => STATE.deliveryManifest.filter(d => d.status === 'failed').map(d => d.playerName));
  check('simulated failure hits Lucas M. only', JSON.stringify(await failed()) === '["Lucas M."]', JSON.stringify(await failed()));
  check('12 recipients when Sofia has consent', (await page.locator('#deliveryDispatchLog .audit-entry').count()) === 12);
  const stamps = await page.evaluate(() => STATE.deliveryManifest.filter(d => d.status === 'delivered').map(d => d.timestamp));
  await page.click('#retryBox button');
  const after = await page.evaluate(() => STATE.deliveryManifest);
  check('retry delivers Lucas M.', after.every(d => d.status === 'delivered'));
  const untouched = after.filter(d => !d.timestamp.includes('Retry')).map(d => d.timestamp);
  check('the 11 already-delivered recipients are not re-sent', JSON.stringify(untouched) === JSON.stringify(stamps));
  await context.close();
});

// ---------------------------------------------------------------- 6. thumbnail cannot hide a wrong-child confirm
await section('6. thumbnail cannot hide a wrong-child confirm', async () => {
  const { page, context } = await openApp();
  await runDetection(page);
  await clip(page, '14:22').getByRole('button', { name: /Confirm/ }).click(); // confirm the AI's wrong proposal (Maya)
  await page.click('#btnGoToPreview');
  const thumbText = await reel(page, 'Maya S.').locator('.reel-thumb svg text').textContent();
  check('wrong-child confirm: Maya\'s thumbnail shows the jersey actually in the clip (4), not 14', thumbText.trim() === '4', thumbText);
  await context.close();
});

// ---------------------------------------------------------------- 6b. jersey hint is shown, non-blocking, and tracks the decision
await section('6b. jersey hint', async () => {
  const { page, context, log } = await openApp();
  await runDetection(page);
  check('hint appears on exactly two clips at the start (14:22 mismatch, 29:10 unreadable)', (await page.locator('.jersey-hint').count()) === 2, String(await page.locator('.jersey-hint').count()));
  check('hint on 14:22 names #4 and Maya S. (#14)', (await clip(page, '14:22').locator('.jersey-hint').innerText()).includes('#4') && (await clip(page, '14:22').locator('.jersey-hint').innerText()).includes('Maya S. (#14)'));
  check('hint on 29:10 says the number is not readable', (await clip(page, '29:10').locator('.jersey-hint').innerText()).includes('not readable'));
  check('a matching clip (04:12) has no hint', (await clip(page, '04:12').locator('.jersey-hint').count()) === 0);
  check('the hint does not remove or disable any action (still 3 buttons)', (await clip(page, '14:22').locator('.clip-actions button').count()) === 3);
  await clip(page, '14:22').getByRole('button', { name: /Confirm/ }).click();
  check('confirming the mismatched clip keeps a Heads-up', (await clip(page, '14:22').locator('.jersey-hint').innerText()).includes('Heads-up'));
  await clip(page, '14:22').getByRole('button', { name: /Change/ }).click();
  await reassignC2ToLiam(page);
  check('after reassigning to Liam T. (#4) the hint disappears', (await clip(page, '14:22').locator('.jersey-hint').count()) === 0);
  check('console clean', log.consoleErrors.length === 0 && log.pageErrors.length === 0);
  await context.close();
});

// ---------------------------------------------------------------- 6c. no bulk-confirm shortcut
await section('6c. no bulk confirm', async () => {
  const { page, context } = await openApp();
  await runDetection(page);
  const controls = await page.$$eval('button, a, [role=button]', els => els.map(e => e.textContent.trim()));
  check('review: no bulk / quick / confirm-all control', !controls.some(t => /confirm all|bulk|quick confirm|approve all/i.test(t)), JSON.stringify(controls.filter(t => /all|bulk|quick/i.test(t))));
  check('review: no such function in the page code', !(await page.evaluate(() => typeof window.quickConfirmUncontested !== 'undefined')));
  await context.close();
});

// ---------------------------------------------------------------- 7. clip beyond the footage blocks publication
await section('7. clip beyond the footage blocks publication', async () => {
  const { page, context } = await openApp();
  await runDetection(page);
  await page.evaluate(() => { STATE.clips[0].time = '71:55'; STATE.clips[0].duration = '8s'; });
  await page.evaluate(() => renderReviewQueue());
  check('out-of-range clip is flagged on its card', (await clip(page, '71:55').innerText()).includes('Past end of footage'));
  const errs = await page.evaluate(() => getBatchPreflightErrors());
  check('out-of-range clip is a preflight error', errs.some(e => e.includes('past the end of the footage')), JSON.stringify(errs));
  await context.close();
});

// ---------------------------------------------------------------- 8. second match: zero moments
await section('8. second match: zero moments', async () => {
  const { page, context, log } = await openApp();
  await page.selectOption('#gameSelect', 'game-2');
  await runDetection(page);
  check('match 2: empty-state card, no clips', (await page.locator('#clipsReviewContainer').innerText()).includes('No Moments Detected') && (await page.locator('.clip-card').count()) === 0);
  check('match 2: 14-vs-4 and Noah notes are hidden', !(await page.locator('#edgeCaseCalloutBanner').isVisible()) && !(await page.locator('#zeroHighlightNoticeBanner').isVisible()));
  await page.click('#btnGoToPreview');
  check('match 2: consent gate still applies', (await page.locator('#publicationGateBanner').innerText()).includes('Sofia H.'));
  await page.click('text=Simulate Consent');
  await page.click('#btnApproveBatch');
  const zero = await page.locator('#reelsPreviewList .reel-card', { hasText: '0 Highlights' }).count();
  check('match 2: all 12 children get an honest zero-highlight card', zero === 12, String(zero));
  check('match 2: console clean', log.consoleErrors.length === 0 && log.pageErrors.length === 0);
  await context.close();
});

// ---------------------------------------------------------------- 9. start over resets everything
await section('9. start over resets everything', async () => {
  const { page, context } = await openApp();
  await runDetection(page);
  await resolveAll(page);
  await page.click('#btnGoToPreview');
  await page.click('#btnToggleSimFailure');
  await page.click('nav button:has-text("Setup")');
  await page.click('#btnStartOver');
  const state = await page.evaluate(() => ({
    unresolved: STATE.clips.filter(c => c.status === 'unresolved').length,
    failMode: STATE.simulatedDeliveryFailed, approved: STATE.batchApproved, published: STATE.isPublished,
    btn: document.getElementById('btnToggleSimFailure').innerText,
    completed: document.getElementById('tabNav2').classList.contains('completed'),
  }));
  check('start over: clips unresolved, approval and publish cleared', state.unresolved === 11 && !state.approved && !state.published);
  check('start over: fail-mode button label matches state', !state.failMode && state.btn === 'Fail Mode: OFF', JSON.stringify(state));
  check('start over: review tab no longer marked complete', !state.completed);
  await context.close();
});

// ---------------------------------------------------------------- 10. layout at other widths
for (const [w, h] of [[320, 640], [375, 812], [768, 1024], [1280, 800]]) {
  const { page, context, log } = await openApp({ width: w, height: h });
  await runDetection(page);
  const o1 = await overflow(page);
  await page.click('#btnGoToPreview');
  const o2 = await overflow(page);
  check(`layout ${w}px: no horizontal overflow on review/publish`, o1 <= 0 && o2 <= 0, `${o1}/${o2}`);
  check(`layout ${w}px: no console errors`, log.consoleErrors.length === 0 && log.pageErrors.length === 0);
  await context.close();
}

// ---------------------------------------------------------------- 11. public case-study page
await section('11. case-study page', async () => {
  const csUrl = new URL('case-study/index.html', SITE).href; // URL-relative: works on Windows and POSIX
  for (const [w, h] of [[320, 640], [375, 812], [768, 1024], [1280, 800]]) {
    const context = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await context.newPage();
    const errs = [], ext = [];
    page.on('console', m => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', e => errs.push(String(e)));
    page.on('request', r => { const u = r.url(); if (!u.startsWith('file:') && !u.startsWith('data:')) ext.push(u); });
    await page.goto(csUrl);
    await page.waitForLoadState('load');
    await page.evaluate(async () => { for (const i of document.images) { i.loading = 'eager'; } await Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))); });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const broken = await page.evaluate(() => [...document.images].filter(i => !i.naturalWidth).map(i => i.src));
    check(`case study ${w}px: no horizontal overflow`, over <= 0, String(over));
    check(`case study ${w}px: no console errors, no outside requests, no broken images`, errs.length === 0 && ext.length === 0 && broken.length === 0, JSON.stringify({ errs, ext, broken }));
    if (w === 375 && SHOTS) await page.screenshot({ path: path.join(SHOTS, 'case-study-375.png'), fullPage: true });
    if (w === 1280 && SHOTS) await page.screenshot({ path: path.join(SHOTS, 'case-study-1280.png'), fullPage: true });
    if (w === 1280) {
      check('case study: has a single h1 and the honesty notice', (await page.locator('h1').count()) === 1 && (await page.locator('.hero .notice').innerText()).includes('simulated'));
      const links = await page.$$eval('a[href^="#"]', as => as.map(a => a.getAttribute('href')));
      const missing = [];
      for (const l of links) if (l.length > 1 && !(await page.$(l))) missing.push(l);
      check('case study: every in-page link has a target', missing.length === 0, JSON.stringify(missing));
      const back = await page.getAttribute('a.btn.primary', 'href');
      check('case study: prototype button points to the prototype', back === '../index.html', back);
    }
    await context.close();
  }
  // prototype links to the case study
  const { page, context } = await openApp();
  check('prototype footer links to the case study', (await page.getAttribute('footer a[href="case-study/index.html"]', 'href')) === 'case-study/index.html');
  await context.close();
});

// ---------------------------------------------------------------- 12. AI evals section
await section('12. AI evals section', async () => {
  const siteDir = path.dirname(fileURLToPath(SITE));
  const csUrl = new URL('case-study/index.html', SITE).href;
  const sum = summarise(loadLedger());
  const a = sum.audit;
  const widths = [[320, 640], [375, 812], [768, 1024], [1280, 800]];

  for (const [w, h] of widths) {
    const context = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await context.newPage();
    const errs = [], ext = [];
    page.on('console', m => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', e => errs.push(String(e)));
    page.on('request', r => { const u = r.url(); if (!u.startsWith('file:') && !u.startsWith('data:')) ext.push(u); });
    await page.goto(csUrl + '#ai-evals');
    await page.waitForLoadState('load');
    const sec = page.locator('#ai-evals');
    check(`ai evals ${w}px: section is present and visible`, (await sec.count()) === 1 && (await sec.isVisible()));
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(`ai evals ${w}px: no horizontal overflow`, over <= 0, String(over));
    const secOver = await page.evaluate(() => { const s = document.getElementById('ai-evals'); return [...s.querySelectorAll('*')].filter(e => !e.closest('.scroll') && e.getBoundingClientRect().right > document.documentElement.clientWidth + 1).map(e => e.tagName + '.' + e.className).slice(0, 5); });
    check(`ai evals ${w}px: nothing in the section spills past the screen outside the scrolling table`, secOver.length === 0, JSON.stringify(secOver));
    check(`ai evals ${w}px: no console errors, no outside requests`, errs.length === 0 && ext.length === 0, JSON.stringify({ errs, ext }));
    if (w === 375 && SHOTS) await sec.screenshot({ path: path.join(SHOTS, 'ai-evals-375.png') });
    if (w === 1280 && SHOTS) await sec.screenshot({ path: path.join(SHOTS, 'ai-evals-1280.png') });

    if (w === 1280) {
      check('ai evals: nav links to the section', (await page.locator('nav a[href="#ai-evals"]').count()) === 1);
      // numbers on the page must equal the ledger
      const read = async k => Number((await page.locator(`#ai-evals [data-ledger="${k}"]`).first().innerText()).trim());
      const expected = { checked: a.checked, unsupported: a.unsupported, noSource: a.noSource, overstated: a.overstated, contradicted: a.contradicted, supported: a.supported, inconsistent: a.inconsistent, pass1: a.pass1, pass2: a.pass2 };
      const wrong = [];
      for (const [k, v] of Object.entries(expected)) { const got = await read(k); if (got !== v) wrong.push(`${k}: page ${got}, ledger ${v}`); }
      for (const [k, v] of Object.entries(sum.pass3)) { const got = Number((await page.locator(`#ai-evals [data-ledger3="${k}"]`).first().innerText()).trim()); if (got !== v) wrong.push(`pass3 ${k}: page ${got}, ledger ${v}`); }
      check('ai evals: every number on the page matches the claims ledger', wrong.length === 0, wrong.join('; '));
      check('ai evals: the parts of "unsupported" add up', a.unsupported === a.noSource + a.overstated + a.contradicted);
      check('ai evals: the parts of "checked" add up', a.checked === a.supported + a.unsupported + a.inconsistent + a.notCheckable, JSON.stringify(a));
      check('ai evals: passes add up to the total', a.checked === a.pass1 + a.pass2);
      const text = await sec.innerText();
      check('ai evals: states its scope and limits', /No AI model was built or evaluated/.test(text) && /Limits of this audit/.test(text) && /not an error rate/i.test(text));
      check('ai evals: no hype or guarantee wording', !/perfect|flawless|revolution|game-chang|cutting-edge|state-of-the-art|guarantee|100% accura/i.test(text), text.match(/perfect|flawless|revolution|game-chang|cutting-edge|state-of-the-art|guarantee|100% accura/i)?.[0]);

      const slopText = text + fs.readFileSync(path.join(siteDir, '..', 'docs', 'AI_EVALS.md'), 'utf8') + fs.readFileSync(path.join(siteDir, '..', 'docs', 'ai-evals', 'ORIGINAL_RUBRIC.md'), 'utf8').split('## Layer C')[0];
      check('ai evals: slop checklist on the new text (no em dashes, no stock phrases)', !/\u2014/.test(slopText) && !/enhance user experience|drive engagement|seamless|consider exploring|leverage/i.test(slopText));
      check('ai evals: says the original scores are not in the repo', /not in this repository, so none are reported/.test(text));

      // links: relative ones resolve to files; repo links resolve to files in this checkout; external ones are only checked for form
      const hrefs = await page.$$eval('a[href]', as => as.map(x => x.getAttribute('href')));
      const repoRoot = path.resolve(siteDir, '..');
      const bad = [];
      for (const h of hrefs) {
        if (h.startsWith('#') || h.startsWith('mailto:')) continue;
        const m = h.match(/^https:\/\/github\.com\/astrokshitij\/touchline-ai\/blob\/main\/(.+?)(?:#.*)?$/);
        if (m) { if (!fs.existsSync(path.join(repoRoot, decodeURIComponent(m[1])))) bad.push(h); continue; }
        if (/^https:\/\//.test(h)) continue;
        if (/^[a-z]+:/i.test(h)) { bad.push(h); continue; }
        const target = path.resolve(path.dirname(fileURLToPath(csUrl)), h.split('#')[0]);
        if (!fs.existsSync(target)) bad.push(h);
      }
      check('case study: no broken links (relative and repo links exist; external links are https)', bad.length === 0, JSON.stringify(bad));
      const imgs = await page.$$eval('img', is => is.map(i => i.getAttribute('src')));
      const missingImgs = imgs.filter(src => !fs.existsSync(path.resolve(path.dirname(fileURLToPath(csUrl)), src)));
      check('case study: every image file exists', missingImgs.length === 0, JSON.stringify(missingImgs));
    }
    await context.close();
  }

  // The public page and the audit files must not mention personal social accounts (hard boundary).
  const files = [path.join(siteDir, 'index.html'), path.join(siteDir, 'case-study', 'index.html'),
    path.join(siteDir, '..', 'docs', 'AI_EVALS.md'), path.join(siteDir, '..', 'docs', 'ai-evals', 'claims-ledger.csv'), path.join(siteDir, '..', 'docs', 'ai-evals', 'ORIGINAL_RUBRIC.md')];
  const hits = files.filter(f => /instagram|youtube|tiktok|facebook|twitter|linkedin/i.test(fs.readFileSync(f, 'utf8'))).map(f => path.basename(f));
  check('no mention of personal social-media accounts in the site or the audit files', hits.length === 0, JSON.stringify(hits));
});

await browser.close();
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
