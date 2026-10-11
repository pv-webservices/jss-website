# JSS Elite Group India

A static, multi-page Astro + TypeScript website for **JAY SHRI SHYAM ELITE GROUP INDIA**, using the supplied homepage reference and original logo. Emerald, champagne gold and ivory styling; locally hosted Marcellus (display), Cormorant Garamond italic (accents) and Manrope (body) fonts; responsive WebP photography.

## Design system

Styles live in `src/styles/` and are loaded through `global.css`:

| File | Contents |
| --- | --- |
| `base.css` | Tokens (colours, type, radii, shadows, motion), layout primitives, typography, reveal animations, reduced-motion rules |
| `components.css` | Buttons (directional fill — no shine/glow effects), links, icon badges, chips, service cards, enquiry form, FAQ |
| `chrome.css` | Top bar, sticky header, services mega menu, mobile menu, footer, floating WhatsApp, mobile contact bar |
| `home.css` | Homepage: hero, service rail, intro collage, marquee, services bento, sticky "why" story, occasions, process, service area, contact CTA |
| `pages.css` | Inner pages: page hero, service page sections, about, contact, prose, 404 |

Content width is `min(1440px, 90vw)`; dark sections and heroes run full-bleed.

## AI imagery (OpenAI Images API)

Generation runs only in Node build tooling — never in the browser — and reads `OPENAI_API_KEY` from `.env` (git-ignored) or the shell.

```powershell
npm run images:plan                 # show model / quality / size per asset, no API calls
npm run images:generate             # generate missing assets, then optimise to WebP
npm run images:generate -- hero     # only specific assets
npm run images:generate -- --escalate hero   # retry an asset on the premium model
npm run images:optimise             # rebuild WebP variants from existing masters
```

- `scripts/images/config.mjs` — model names (`gpt-image-2.5-flare` default, `gpt-image-2.5-sunburst` premium), quality tiers, sizes (1024², 1536×1024, 1024×1536), WebP widths. All overridable through env vars listed in `.env.example`.
- `scripts/images/router.mjs` — picks the model automatically: Sunburst for the homepage hero, multi-person scenes, complex lighting/architecture, reference-based work or escalations; Flare otherwise. Hero/key images use `high` quality, supporting images `medium`.
- `scripts/images/manifest.mjs` — the 14 generated assets, each with a purpose, placement, alt text, orientation and stock fallback.
- Masters are saved to `assets/generated/`, WebP variants to `public/images/gen/`, and `src/data/generated-images.json` registers them. `src/components/Photo.astro` serves a generated asset when registered and otherwise falls back to the curated stock image, so pages never show placeholders. Rebuild the site after generating.

## Local use

```powershell
npm install
npm run dev
```

Open the printed local URL (normally http://127.0.0.1:4321/).

```powershell
npm run check
npm run build
npm run verify
npm run preview -- --port 4322
```

For the browser QA matrix, install the engines with `npx playwright install chromium firefox webkit`, leave the production preview running, then execute `node scripts/browser-qa.mjs`. The default target is http://127.0.0.1:4322; `QA_URL` can override it. Screenshots and JSON reports are saved under `output/`. Browser QA never clicks the outgoing WhatsApp send link or submits an external enquiry. Run performance measurements separately from browser matrices on a resource-constrained host.

## Pages

Home; About Us; Our Services; Professional Driver Services; Chauffeur Services; Valet Parking; PSO & Personal Security; Bouncer & Event Security; Security Services; Monthly Driver; Outstation Driver; Hourly Driver; Corporate & Personal Drivers; Contact Us; Privacy Information; custom 404.

## Content and contacts

- `src/data/business.ts`: official name, tagline, phone numbers, email, website domain, social links, shared FAQs and process.
- `src/data/services.ts`: all ten services and their distinct descriptions, use cases, enquiry briefs and FAQs.
- `src/components/`: shared navigation, service cards, image component, CTAs and enquiry form.
- `src/styles/global.css`: visual tokens, responsive layouts, hover interactions and reduced-motion rules.
- `src/scripts/site.ts`: accessible mobile dialog, keyboard-controlled service dropdown, scroll progress, once-only reveals and enquiry preparation.

The original `public/website logo.jpeg` is preserved. `public/images/logo.webp` is a resized derivative with the same aspect ratio and artwork (used in structured data). `public/images/logo-clean.webp` / `logo-clean@2x.webp` are tighter crops with the decorative corner wedges painted out, used in the header, menu and footer (`node scripts/prepare-logo.mjs`). Photography sources are in [ASSETS.md](ASSETS.md); downloaded source files are in `assets/stock/`. Rebuild responsive image variants with `node scripts/prepare-images.mjs`.

## Enquiries

Telephone actions use `tel:+919711161009` and `tel:+919911156199`. Email actions use `mailto:info@jsselitegroupindia.com`. WhatsApp actions point to `https://wa.me/919711161009`.

The form validates a name, Indian mobile number, service and location, then creates an encoded WhatsApp message. The visitor must use **Open WhatsApp & send** and send that message in WhatsApp. Preparing a message does not deliver an enquiry or request a callback automatically. Editing the form invalidates its prepared link. No contact details are saved to a website database or browser storage. A honeypot blocks automated draft preparation; there is no public submission endpoint.

A hosted email form backend is **not configured**. To change to delivered submissions, configure a service, complete its required activation, handle errors and verify actual live delivery before reporting it operational.

## SEO and external integrations

The supplied preferred domain is `https://www.jsselitegroupindia.com`. It is used consistently in `astro.config.mjs`, `src/data/business.ts`, canonical URLs, Open Graph tags, structured data, robots and sitemap output. Metadata is unique per page. Organization and Service structured data contain only supplied business details. No fabricated address, opening hours, ratings, reviews or credentials are included.

The production build defaults to indexable pages. Set `PUBLIC_INDEXABLE=false` **before building** a staging copy to emit `noindex, nofollow` and a disallowing robots file. A public domain and indexable metadata do not confirm hosting, Google discovery or indexing.

Copy `.env.example` to `.env` and provide confirmed `PUBLIC_INSTAGRAM_URL`, `PUBLIC_FACEBOOK_URL` and `PUBLIC_GOOGLE_BUSINESS_URL` values to enable those links. Rebuild after changes. Missing profiles are hidden; no accounts or locations are invented. There is no map embed because a business address was not supplied.

## Publishing

`dist/` is the static deployment output. Upload its contents to a static host. Configure the host to serve `404.html` for missing paths and redirect the alternate domain to the selected www domain. HTTPS, domain redirects, live enquiries and production indexing require separate live verification. No deployment, commit or push was performed during development.

See [QA.md](QA.md) for local verification results and remaining external requirements.
