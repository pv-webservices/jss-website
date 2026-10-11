# Local development and QA report

Verified 11 October 2026 against the static production build served at `http://127.0.0.1:4322/`. The editable local preview is `http://127.0.0.1:4321/` while its development server is running.

## Delivered website

16 HTML pages: Home, About Us, Our Services, ten individual service pages, Contact Us, Privacy Information and a custom 404. The sitemap contains the 15 public content pages.

The homepage follows the supplied green, gold and ivory reference with the actual company logo, a chauffeur hero, overlapping service navigation, curved section transitions, a ten-service grid, company introduction, service approach, four-step process, coverage and enquiry sections. The inner pages carry the same visual system with distinct service content and photography. Telephone, WhatsApp and email links use the supplied contacts. The layout includes accessible mobile navigation, keyboard-operated service navigation, breadcrumbs, hover and scroll reveals, a scroll progress indicator, reduced-motion support and mobile contact actions.

The user's supplied details are the factual source of truth. The reference image's sample reviews, personnel credentials and unsupplied locations were omitted. Photography is illustrative licensed stock; sources and usage are recorded in [ASSETS.md](ASSETS.md). No stock subject is presented as a company employee or client.

## Build and automated verification

| Check | Result |
| --- | --- |
| `npm run check` | Passed: no Astro/TypeScript errors |
| `npm run build` | Passed: static output generated |
| `npm run verify` | Passed: 16 unique titles and descriptions, canonical/schema checks, 1,349 local links and assets checked, 129 asset references, 15 sitemap URLs |
| `npm audit` | Zero reported vulnerabilities at verification time |
| Chromium responsive matrix | 80 passing checks: 16 pages at 1440, 1024, 768, 390 and 320 pixels |
| Axe accessibility scans | 32 scans, zero violations under WCAG 2 A/AA and WCAG 2.1 AA rules |
| Interactive checks | 13 passed: navigation, keyboard/Escape/focus, FAQs and enquiry preparation |
| Reduced motion | Passed: content remains visible and hero entrance animation is disabled |
| JavaScript disabled | Two checks passed: core content, telephone links, native fallback navigation and disabled form submission |
| Firefox and WebKit | Six mobile smoke checks passed across Home, Our Services and Contact Us |
| Browser errors | None recorded during the final Chromium matrix |

Responsive checks cover heading structure, horizontal overflow, image loading and empty destinations. Static checks cover internal links and anchors, metadata, canonical URLs, sitemap, robots and structured data. The browser suite uses synthetic form details and does not open or send the outgoing WhatsApp draft.

Full-page desktop/mobile screenshots are saved for Home, Chauffeur Services, PSO & Personal Security and Contact Us. Reports are preserved in [browser results](output/playwright/qa-report.json) and [static results](output/static-verification.json). These automated checks supplement visual review; they are not a formal accessibility certification.

## Lighthouse measurements

Lighthouse 13.5.0, Chromium 153.0.8010.12, local production preview. The final run was performed sequentially after the browser matrix completed.

| Page and mode | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Home, mobile | 81 | 100 | 100 | 100 | 2.8 s | 540 ms | 0 |
| Home, desktop | 99 | 100 | 100 | 100 | 0.8 s | 50 ms | 0.01 |
| Chauffeur, mobile | 97 | 100 | 100 | 100 | 2.3 s | 0 ms | 0 |
| Contact, mobile | 99 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |

The homepage mobile result falls below the brief's 90+ performance target. Measurements varied across this resource-constrained Windows host; an earlier isolated run measured 95 mobile and 100 desktop. The table reports the saved final run, rather than selecting the highest result. Performance remains an item to reassess on the deployed site and a controlled test host. These local simulated scores do not establish field Core Web Vitals or production performance.

The final reports have no run warnings or runtime errors. The back/forward cache restoration audit reported a navigation limitation during testing. The initial Lighthouse CLI encountered Windows `EPERM` during temporary-profile cleanup after writing reports; the final programmatic runner closed its browser successfully.

Saved evidence: [summary](output/lighthouse-summary.json), [homepage mobile](output/lighthouse-home-mobile-final.html), [homepage desktop](output/lighthouse-home-desktop-final.html), [chauffeur mobile](output/lighthouse-chauffeur-mobile-final.html), [contact mobile](output/lighthouse-contact-mobile-final.html).

## Enquiry behavior and remaining external items

The form validates the visitor's details and prepares an encoded WhatsApp enquiry. It explicitly says the message has not been sent; the visitor must open WhatsApp and send it. Editing the details removes the prepared draft. Invalid mobile numbers, missing values and honeypot input are rejected. No website database or browser storage retains those details.

Live email delivery and automated callbacks are not configured or verified. A backend or form provider must be selected, activated and tested with an actual delivered enquiry before claiming submission delivery.

Instagram, Facebook and Google Business Profile links are ready for confirmed profile URLs through `.env.example`; they are hidden until supplied. A map needs a confirmed business address. Other-location availability, charges and service arrangements are discussed directly with the business rather than promised by the website.

The supplied www domain is used consistently for SEO metadata. Deployment, HTTPS, domain redirects, mailbox delivery, live enquiry delivery, Google Business Profile activation and search indexing have not been verified. The staging build can be made non-indexable with `PUBLIC_INDEXABLE=false`. No deployment, commit or push was performed.

Frontend Design and Playwright were used. Scroll World, Scroll Craft and Design DNA were not available in this session; their use is not claimed.
