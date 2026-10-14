# Asset source register

## Supplied assets

- `public/website logo.jpeg`: supplied company logo, preserved unchanged. WebP and social-preview derivatives use the same artwork and aspect ratio.
- `F:/Z-Clients/Indian Clients/Business Website Clients/jss-website/JSS Elite Group Homepage UI.png`: supplied visual reference. Used for composition, palette, curved gold section transitions, overlapping service navigation and emerald service grid. Its incidental text, testimonials, credentials and location claims were not copied.
- Pasted development document: treated as reference material accompanying the user's build request. The user's directly supplied company name, services, contacts and service area remain the factual source of truth.

## Company photography

Twelve photographs supplied by JSS Elite Group India are used for the service heroes, the homepage collage and a "From the field" gallery on the valet, bouncer and PSO pages. Originals are in `assets/field/`; `npm run images:field` writes responsive WebP files to `public/images/field/` and `src/data/field-photos.json`. `<Photo>` prefers these over generated or stock images, so the names `valet`, `bouncer`, `pso`, `security`, `driver` and `team` now resolve to company photos. Gallery selection and alt text live in `src/data/field-gallery.ts`. Several photos show vehicle number plates and one shows armed personnel; confirm the client is comfortable with both before launch.

## Illustrative stock photography

Stock images communicate service settings; they do not identify JSS employees, clients, owned vehicles or actual company events. Images are downloaded locally and served as responsive WebP files. None are relabelled as company photography.

Pexels permits website use under its [Pexels License](https://www.pexels.com/license/). Photography is used as contextual editorial imagery, without claims of endorsement or ownership. Source images are retained in `assets/stock/` and responsive derivatives in `public/images/`.

| Photo | Photographer | Use |
| --- | --- | --- |
| [8425027 — chauffeur assisting at a car door](https://www.pexels.com/photo/man-in-a-gray-suit-opening-a-car-door-for-a-woman-in-black-suit-8425027/) | Pavel Danilyuk | Homepage hero, chauffeur service, About page |
| [8425405 — professionals beside a vehicle](https://www.pexels.com/photo/a-man-in-black-suit-standing-beside-black-car-8425405/) | Pavel Danilyuk | Executive service setting, corporate/personal driver page, homepage introduction |
| [8425021 — professionals outside a hospitality venue](https://www.pexels.com/photo/8425021/) | Pavel Danilyuk | Valet service setting, not a claim that the people pictured are actual valet staff |
| [9519973 — professional driver and passenger](https://www.pexels.com/photo/close-up-shot-of-a-man-in-black-suit-driving-a-car-9519973/) | Ron Lach | Professional driver service |
| [9519225 — professional driver seated in a car](https://www.pexels.com/photo/man-in-black-suit-sitting-on-car-seat-9519225/) | Ron Lach | Monthly drivers and homepage service approach |
| [9519034 — professional at the wheel](https://www.pexels.com/photo/man-metal-car-driving-9519034/) | Ron Lach | Outstation driver service |
| [9519221 — professionals inside a car](https://www.pexels.com/photo/people-inside-a-car-9519221/) | Ron Lach | Hourly driver service, time-oriented travel setting |
| [18275559 — suited security guard](https://www.pexels.com/photo/security-guard-in-suit-18275559/) | Patrick | PSO and personal security setting |
| [2990765 — back view of a bouncer](https://www.pexels.com/photo/back-view-of-a-bouncer-2990765/) | energepic.com | Bouncer and event security setting |
| [31282369 — uniformed security guard](https://www.pexels.com/photo/uniformed-security-guard-standing-outdoors-31282369/) | Murat IŞIK | General security service |
| [261102 — hospitality venue](https://www.pexels.com/photo/261102/) | See source photo credit | Hospitality and valet setting |

Unused candidate images are retained in the source folder but are not referenced by the website. No testimonial identities are used.

## AI-generated imagery

14 illustrative images were generated with the OpenAI Images API (`scripts/images/manifest.mjs`): hero, team, portrait, ten service visuals (including corporate) and the Delhi NCR skyline. Five used `gpt-image-2.5-sunburst` (hero, team, valet, bouncer, corporate — multi-person or complex scenes); nine used `gpt-image-2.5-flare`. Prompts forbid text, logos and brand badges, so no generated person is presented as a named JSS employee or wears company branding; alt text describes the scene without claiming it shows real staff.

Lossless masters are in `assets/generated/`; responsive WebP variants (≈24 KB at 480w, ≈76 KB at 960w, ≈142 KB at 1536w) are in `public/images/gen/`; `src/data/generated-images.json` records each file's model and quality. If an entry is removed, the site falls back to the stock image named in the manifest's `fallback` field. Stock photography remains in `assets/stock/` and `public/images/` for those fallbacks.

Fonts are bundled from Fontsource under their included SIL Open Font License files. SVG interface icons are simple inline line drawings. The favicon is an original typographic monogram; the supplied company logo remains the primary brand mark.
