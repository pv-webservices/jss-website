import { chromium, firefox, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://127.0.0.1:4322';
const routes = ['/', '/about-us/', '/our-services/', '/driver-services/', '/chauffeur-services/', '/valet-parking/', '/pso-security-services/', '/bouncer-event-security/', '/security-services/', '/monthly-driver/', '/outstation-driver/', '/hourly-driver/', '/corporate-personal-drivers/', '/contact-us/', '/privacy-policy/', '/404.html'];
const widths = [1440, 1024, 768, 390, 320];
await mkdir('output/playwright', { recursive: true });
const report = { matrices: [], accessibility: [], interactions: [], reducedMotion: [], noJavaScript: [], crossBrowser: [], errors: [], screenshotPaths: [] };
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
let current = '';
page.on('pageerror', error => report.errors.push(`${current}: ${error.message}`));
page.on('console', message => { if (message.type() === 'error') report.errors.push(`${current}: console: ${message.text()}`); });
page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/404.html')) report.errors.push(`${current}: HTTP ${response.status()} ${response.url()}`); });
async function revealAll(target) {
  await target.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise(resolve => setTimeout(resolve, 45)); }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await target.waitForTimeout(800);
}
async function pageFacts(target) { return target.evaluate(() => ({
  h1: document.querySelectorAll('h1').length,
  overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  missingImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')),
  emptyLinks: [...document.querySelectorAll('a')].filter(link => link.getAttribute('href') === '#').length,
  title: document.title,
})); }
for (const route of routes) {
  for (const width of widths) {
    current = `${route} @ ${width}`;
    await page.setViewportSize({ width, height: 950 });
    const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await revealAll(page);
    const facts = await pageFacts(page);
    const pass = facts.h1 === 1 && !facts.overflow && !facts.missingImages.length && !facts.emptyLinks;
    report.matrices.push({ route, width, status: response.status(), ...facts, pass });
    if (!pass) console.log('FAIL', current, JSON.stringify(facts));
    if ([1440, 390].includes(width)) {
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      report.accessibility.push({ route, width, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
      if (axe.violations.length) console.log('AXE', current, axe.violations.map(v => v.id).join(', '));
    }
    if (['/', '/chauffeur-services/', '/pso-security-services/', '/contact-us/'].includes(route) && [1440,390].includes(width)) {
      const path = `output/playwright/${route === '/' ? 'home' : route.split('/')[1]}-${width}.png`;
      await page.screenshot({ path, fullPage: true }); report.screenshotPaths.push(path);
      if (route === '/') await page.screenshot({ path: `output/playwright/home-viewport-${width}.png` });
    }
  }
  console.log(`Checked ${route} at ${widths.length} widths.`);
  await writeFile('output/playwright/qa-report-in-progress.json', JSON.stringify(report, null, 2));
}
await page.setViewportSize({ width: 390, height: 844 });
current = 'mobile menu';
await page.goto(base, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Open navigation' }).click();
report.interactions.push({ name: 'Mobile menu opens as modal', pass: await page.locator('#mobile-menu').evaluate(el => el.open) });
await page.keyboard.press('Escape');
report.interactions.push({ name: 'Escape closes menu and restores focus', pass: await page.locator('#mobile-menu').evaluate(el => !el.open) && await page.getByRole('button', { name: 'Open navigation' }).evaluate(el => document.activeElement === el) });
await page.getByRole('button', { name: 'Open navigation' }).click();
await page.getByRole('navigation', { name: 'Mobile main navigation' }).getByRole('link', { name: /Contact Us/ }).click();
await page.waitForURL('**/contact-us/');
report.interactions.push({ name: 'Mobile menu navigation reaches Contact Us', pass: page.url().endsWith('/contact-us/') });
await page.setViewportSize({ width: 1440, height: 950 });
await page.goto(base, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Show all services' }).focus();
await page.keyboard.press('Enter');
report.interactions.push({ name: 'Keyboard opens service dropdown', pass: await page.locator('#services-dropdown').isVisible() });
await page.keyboard.press('Escape');
report.interactions.push({ name: 'Escape closes service dropdown', pass: await page.locator('#services-dropdown').isHidden() });
await page.locator('.faq-list summary').first().click();
report.interactions.push({ name: 'FAQ expands', pass: await page.locator('.faq-list details').first().evaluate(el => el.open) });
current = 'enquiry form';
await page.goto(`${base}/contact-us/?service=Monthly%20Driver`, { waitUntil: 'networkidle' });
report.interactions.push({ name: 'Service query prefills form', pass: await page.locator('#service-required').inputValue() === 'Monthly Driver' });
await page.getByRole('button', { name: 'Prepare WhatsApp enquiry' }).click();
report.interactions.push({ name: 'Empty form cannot prepare a draft', pass: await page.locator('.draft-actions').isHidden() });
await page.getByLabel('Full name').fill('QA Synthetic Enquiry');
await page.getByLabel('Mobile number').fill('123');
await page.getByLabel('Service location').fill('Delhi NCR - QA only');
await page.getByRole('button', { name: 'Prepare WhatsApp enquiry' }).click();
report.interactions.push({ name: 'Invalid phone rejected', pass: await page.locator('#mobile-number').evaluate(el => !el.validity.valid) && await page.locator('.draft-actions').isHidden() });
await page.getByLabel('Mobile number').fill('+91 90000 00000');
await page.getByLabel('Your requirement').fill('Synthetic local QA. No message is sent.');
await page.getByRole('button', { name: 'Prepare WhatsApp enquiry' }).click();
const draftHref = await page.locator('.draft-link').getAttribute('href');
const draft = draftHref ? new URL(draftHref) : null;
report.interactions.push({ name: 'Valid enquiry prepares correct WhatsApp destination and details', pass: draft?.pathname === '/919711161009' && draft.searchParams.get('text').includes('QA Synthetic Enquiry') && draft.searchParams.get('text').includes('Monthly Driver') && draft.searchParams.get('text').includes('+919000000000') });
report.interactions.push({ name: 'Draft clearly says not sent', pass: (await page.locator('.form-feedback').textContent()).includes('has not been sent') });
await page.getByLabel('Full name').fill('QA Updated Synthetic Name');
report.interactions.push({ name: 'Editing invalidates stale draft', pass: await page.locator('.draft-actions').isHidden() && (await page.locator('.draft-link').getAttribute('href')) === 'https://wa.me/919711161009' });
await page.locator('#website').fill('spam-example');
await page.getByRole('button', { name: 'Prepare WhatsApp enquiry' }).click();
report.interactions.push({ name: 'Honeypot blocks draft preparation', pass: await page.locator('.draft-actions').isHidden() });
await context.close();
const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
const reducedPage = await reduced.newPage();
await reducedPage.goto(base, { waitUntil: 'networkidle' });
report.reducedMotion.push({ name: 'Reduced motion exposes all content without pending reveals', pass: await reducedPage.locator('.reveal-pending').count() === 0 && await reducedPage.locator('.hero-copy h1').evaluate(el => getComputedStyle(el).animationName === 'none') });
await reduced.close();
const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
const nojsPage = await nojs.newPage();
await nojsPage.goto(base, { waitUntil: 'networkidle' });
report.noJavaScript.push({ name: 'Core content and telephone links exist without JavaScript', pass: await nojsPage.locator('h1').count() === 1 && await nojsPage.locator('.service-card').count() === 10 && await nojsPage.locator('a[href="tel:+919711161009"]').count() > 0 });
report.noJavaScript.push({ name: 'Native fallback navigation works and form cannot submit accidentally', pass: await nojsPage.locator('.nojs-menu').count() === 1 && await nojsPage.locator('.form-submit').isDisabled() });
await nojs.close();
await browser.close();
for (const [name, engine] of [['Firefox', firefox], ['WebKit', webkit]]) {
  let alternate;
  try {
    alternate = await engine.launch(); const altPage = await alternate.newPage({ viewport: { width: 390, height: 844 } });
    for (const route of ['/', '/our-services/', '/contact-us/']) {
      await altPage.goto(`${base}${route}`, { waitUntil: 'networkidle' }); await revealAll(altPage);
      const facts = await pageFacts(altPage); report.crossBrowser.push({ browser: name, route, ...facts, pass: !facts.overflow && !facts.missingImages.length && facts.h1 === 1 });
    }
  } catch (error) { report.crossBrowser.push({ browser: name, unavailable: String(error).slice(0,250) }); }
  finally { await alternate?.close(); }
}
await writeFile('output/playwright/qa-report.json', JSON.stringify(report, null, 2));
const fails = report.matrices.filter(r => !r.pass).length + report.accessibility.filter(r => r.violations.length).length + report.interactions.filter(r => !r.pass).length + report.errors.length + report.crossBrowser.filter(r => r.pass === false).length;
console.log(JSON.stringify({ viewportChecks: report.matrices.length, axeScans: report.accessibility.length, interactions: report.interactions, reducedMotion: report.reducedMotion, noJavaScript: report.noJavaScript, crossBrowser: report.crossBrowser, errors: report.errors, failedChecks: fails }, null, 2));
if (fails) process.exitCode = 1;
