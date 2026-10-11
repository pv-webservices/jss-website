import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const files = [];
async function walk(folder) { for (const entry of await readdir(folder, { withFileTypes: true })) { const path = join(folder, entry.name); if (entry.isDirectory()) await walk(path); else if (entry.name.endsWith('.html')) files.push(path); } }
await walk('dist');
const problems = [], titles = new Set(), descriptions = new Set();
let links = 0, assets = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const name = relative('dist', file);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="(.*?)"/s)?.[1];
  if (!title || titles.has(title)) problems.push(`${name}: missing or duplicate title`);
  if (!description || descriptions.has(description)) problems.push(`${name}: missing or duplicate description`);
  titles.add(title); descriptions.add(description);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) problems.push(`${name}: expected one H1`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical?.startsWith('https://www.jsselitegroupindia.com/')) problems.push(`${name}: wrong canonical`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(match[1]); } catch { problems.push(`${name}: invalid JSON-LD`); } }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const [path, hash] = match[1].split('#');
    const decoded = decodeURIComponent(path.split('?')[0]);
    const destination = decoded.endsWith('/') ? join('dist', decoded, 'index.html') : join('dist', decoded);
    links++;
    try { await stat(destination); } catch { problems.push(`${name}: missing local link or asset ${decoded}`); continue; }
    if (hash) { const linked = await readFile(destination, 'utf8'); if (!linked.includes(`id="${hash}"`)) problems.push(`${name}: missing anchor ${match[1]}`); }
    if (/\.(webp|jpg|svg|css|js)$/.test(decoded)) assets++;
  }
  for (const match of html.matchAll(/href="#([^"]+)"/g)) if (!html.includes(`id="${match[1]}"`)) problems.push(`${name}: missing anchor #${match[1]}`);
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
if (sitemapUrls.length !== files.length - 1 || new Set(sitemapUrls).size !== sitemapUrls.length) problems.push('Sitemap count does not match indexable HTML pages');
if (sitemap.includes('404')) problems.push('404 should not be in sitemap');
const robots = await readFile('dist/robots.txt', 'utf8');
if (!robots.includes('Allow: /') || !robots.includes('https://www.jsselitegroupindia.com/sitemap.xml')) problems.push('Production robots configuration unexpected');
const report = { htmlPages: files.length, uniqueTitles: titles.size, uniqueDescriptions: descriptions.size, localLinksAndAssets: links, localAssetReferences: assets, sitemapUrls: sitemapUrls.length, problems };
await mkdir('output', { recursive: true });
await writeFile('output/static-verification.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (problems.length) process.exitCode = 1;
