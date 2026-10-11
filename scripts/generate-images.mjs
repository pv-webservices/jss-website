// Generate, optimise and register the site's AI imagery.
//
//   npm run images:plan                    show routing (model / quality / size) — no API calls
//   npm run images:generate                generate every asset that does not exist yet
//   npm run images:generate -- hero valet  generate only these assets
//   npm run images:generate -- --force     regenerate even if a master exists
//   npm run images:generate -- --escalate hero   retry an asset on the premium model
//   npm run images:optimise                rebuild WebP variants from existing masters
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import sharp from 'sharp';
import { imageConfig } from './images/config.mjs';
import { manifest } from './images/manifest.mjs';
import { routeImage } from './images/router.mjs';
import { generateImage, requireApiKey } from './images/openai-client.mjs';

try { process.loadEnvFile('.env'); } catch { /* .env is optional; the shell environment may provide the key */ }

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith('--')));
const escalateIndex = args.indexOf('--escalate');
const escalate = new Set(escalateIndex >= 0 ? args.slice(escalateIndex + 1).filter(a => !a.startsWith('--')) : []);
const named = new Set(args.filter(a => !a.startsWith('--') && !escalate.has(a)));
const selected = manifest.filter(item => (named.size === 0 && escalate.size === 0) || named.has(item.name) || escalate.has(item.name));
const unknown = [...named, ...escalate].filter(name => !manifest.some(item => item.name === name));
if (unknown.length) { console.error(`Unknown asset(s): ${unknown.join(', ')}`); process.exit(1); }

const exists = path => access(path).then(() => true, () => false);
const masterPath = name => `${imageConfig.paths.masters}/${name}.png`;

async function loadRegistry() {
  try { return JSON.parse(await readFile(imageConfig.paths.registry, 'utf8')); } catch { return {}; }
}

async function optimise(item, route) {
  const widths = imageConfig.variants[item.traits.orientation];
  const master = sharp(masterPath(item.name));
  const { width, height } = await master.metadata();
  for (const w of widths) {
    await sharp(masterPath(item.name))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: w <= 480 ? imageConfig.webpQuality - 4 : imageConfig.webpQuality, effort: 5 })
      .toFile(`${imageConfig.paths.public}/${item.name}-${w}.webp`);
  }
  return { src: `gen/${item.name}`, widths, width, height, alt: item.alt, model: route?.model, quality: route?.quality };
}

async function main() {
  const plan = selected.map(item => ({ item, route: routeImage(item.traits, { escalate: escalate.has(item.name) }) }));

  if (flags.has('--plan')) {
    console.table(plan.map(({ item, route }) => ({ asset: item.name, model: route.model, quality: route.quality, size: route.size, why: route.reasons.join('; ') })));
    const premium = plan.filter(p => p.route.tier === 'sunburst').length;
    console.log(`${plan.length} assets · ${premium} premium (Sunburst) · ${plan.length - premium} standard (Flare)`);
    return;
  }

  await mkdir(imageConfig.paths.masters, { recursive: true });
  await mkdir(imageConfig.paths.public, { recursive: true });
  const registry = await loadRegistry();
  const optimiseOnly = flags.has('--optimise');
  if (!optimiseOnly) requireApiKey();

  const failures = [];
  for (const { item, route } of plan) {
    try {
      const hasMaster = await exists(masterPath(item.name));
      const shouldGenerate = !optimiseOnly && (!hasMaster || flags.has('--force') || escalate.has(item.name));
      if (shouldGenerate) {
        console.log(`→ ${item.name}: ${route.model} · ${route.quality} · ${route.size}`);
        const bytes = await generateImage({ model: route.model, prompt: item.prompt, size: route.size, quality: route.quality });
        await writeFile(masterPath(item.name), bytes);
      } else if (!hasMaster) {
        console.log(`· ${item.name}: no master yet, skipped`);
        continue;
      } else {
        console.log(`· ${item.name}: master exists, optimising only`);
      }
      // Keep the recorded model/quality of an existing master; record the new route for fresh output.
      registry[item.name] = await optimise(item, shouldGenerate ? route : (registry[item.name] ?? route));
      await writeFile(imageConfig.paths.registry, `${JSON.stringify(registry, null, 2)}\n`);
    } catch (error) {
      failures.push(item.name);
      console.error(`✗ ${item.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  console.log(failures.length ? `Done with ${failures.length} failure(s): ${failures.join(', ')}` : 'All selected assets are ready.');
  if (failures.length) process.exitCode = 1;
}

main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
