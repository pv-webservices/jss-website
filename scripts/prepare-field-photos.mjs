import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Real photographs supplied by JSS Elite Group India. Sources live in assets/field/;
// responsive WebP variants are written to public/images/field/ and registered in
// src/data/field-photos.json, which <Photo> consults before generated or stock imagery.
const SOURCES = ['valet-1', 'valet-2', 'valet-3', 'bouncer-1', 'bouncer-2', 'bouncer-3', 'security-1', 'pso-1', 'pso-2', 'pso-3', 'pso-4', 'driver-1'];
// Photo names the site already uses (service images, homepage collage) mapped to the real photo that replaces them.
const ALIASES = { valet: 'valet-3', bouncer: 'bouncer-1', pso: 'pso-1', security: 'security-1', driver: 'driver-1', team: 'security-1' };
const WIDTHS = [480, 960, 1600];

await mkdir('public/images/field', { recursive: true });
const registry = {};
for (const id of SOURCES) {
  const source = `assets/field/${id}.jpg`;
  const { width, height } = await sharp(source).metadata();
  const widths = [...WIDTHS.filter(w => w < width), width > WIDTHS.at(-1) ? WIDTHS.at(-1) : width].filter((w, i, all) => all.indexOf(w) === i);
  for (const w of widths) {
    await sharp(source).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: w <= 480 ? 78 : 82 }).toFile(`public/images/field/${id}-${w}.webp`);
  }
  const outWidth = widths.at(-1);
  registry[`field-${id}`] = { src: `field/${id}`, widths, width: outWidth, height: Math.round(height * outWidth / width) };
}
for (const [alias, id] of Object.entries(ALIASES)) registry[alias] = registry[`field-${id}`];
await writeFile('src/data/field-photos.json', `${JSON.stringify(registry, null, 2)}\n`);
console.log(`Prepared ${SOURCES.length} field photos and ${Object.keys(ALIASES).length} aliases.`);
