import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

await mkdir('public/images', { recursive: true });
await mkdir('output/playwright', { recursive: true });
const files = {
  hero: '8425027', chauffeur: '8425027', driver: '9519973', valet: '8425021', pso: '18275559',
  bouncer: '2990765', security: '31282369', monthly: '9519225', hourly: '9519221',
  outstation: '9519034', corporate: '8425405', about: '8425405', hospitality: '261102',
};
for (const [name, id] of Object.entries(files)) {
  for (const width of [480, 960, 1600]) {
    await sharp(`assets/stock/${id}.jpg`).resize({ width, withoutEnlargement: true }).webp({ quality: width === 480 ? 78 : 83 }).toFile(`public/images/${name}-${width}.webp`);
  }
}
await sharp('public/website logo.jpeg').resize({ width: 600 }).webp({ quality: 90 }).toFile('public/images/logo.webp');
const ids = [...new Set(Object.values(files))];
const tiles = [];
for (let i = 0; i < ids.length; i++) {
  const buffer = await sharp(`assets/stock/${ids[i]}.jpg`).resize(320, 210, { fit: 'cover' }).toBuffer();
  const label = Buffer.from(`<svg width="320" height="28"><rect width="320" height="28" fill="#fff"/><text x="12" y="20" font-size="16">${ids[i]}</text></svg>`);
  tiles.push({ input: buffer, left: (i % 3) * 320, top: Math.floor(i / 3) * 238 });
  tiles.push({ input: label, left: (i % 3) * 320, top: Math.floor(i / 3) * 238 + 210 });
}
await sharp({ create: { width: 960, height: Math.ceil(ids.length / 3) * 238, channels: 3, background: '#fff' } }).composite(tiles).jpeg().toFile('output/playwright/asset-review.jpg');
console.log(`Prepared responsive WebP variants for ${Object.keys(files).length} image uses and logo.`);
