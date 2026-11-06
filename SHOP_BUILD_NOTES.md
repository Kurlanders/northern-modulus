# Shop build notes: NM Mast System (preview, do not merge)

Branch: `feat/webshop-v2-mast`. Nothing went to production: `main`, Vercel settings, domains and environment variables were not touched.

## Links

- **Vercel preview, built from commit 56cc625:** https://northern-modulus-jmlag5ugc-rihardsvasuks1-9307s-projects.vercel.app (open `/shop`). Taken from GitHub's public deployment status, not opened by me. It may ask you to log in to Vercel. The commit that adds this file creates a newer preview with the same site; find it on the branch in the Vercel dashboard.
- **Draft PR: not opened, one manual step.** No `gh` CLI is installed and the GitHub connector isn't authorised in this session. I did not pull your stored git credential to call the API, because that goes beyond what a push needs. Open it here: https://github.com/Kurlanders/northern-modulus/pull/new/feat/webshop-v2-mast
  - Choose **Create draft pull request**.
  - Title: `Webshop v2: NM Mast System (preview, do not merge)`
  - Description: copy the "PR description" section at the end of this file.

## What was built

| Page | What it has |
|---|---|
| `/shop` | Dark hero with a festoon scene at dusk; "One mast. Many jobs." tiles linking with `?top=` preselected; catalogue with kits first and filter chips; trust strip; custom-work band. The "launching soon" placeholder now shows only if no product is published. |
| `/shop/nm-mast-event` | Gallery with 6 views, including the 3D viewer; sticky buy box with configurator, live total and Festoon Set nudge; key specs; rated-loads placeholder; exploded view with 4 setup steps; 5 use cases; GFRP vs steel vs aluminium; collapsible engineering notes; safety; what's in the box; 9 FAQs; related products. Sticky price and Reserve bar on mobile. |
| Other 10 product pages | Same template, simpler. Configurator is the quantity only. |
| `/shop/nm-mast-metal-free` | No buy box. "Request configuration" opens the quote form pre-filled. |
| `/shop/reserve` | Order summary plus a short form (name, email, phone, pickup or delivery city, notes). Not indexed by search engines. |
| Home | One-line "New: NM Mast System" announcement under the hero. Nothing else changed. |

Also added:
- `Product` JSON-LD
- static OG cards in `public/pictures/shop/og/`
- analytics events `shop_view`, `product_view`, `configurator_change`, `reserve_click`, `reserve_submit`, all through the existing cookieless Vercel Analytics
- an updated `CLAUDE.md`

## Decisions I made

- **Conflict with `CLAUDE.md`:** the brief gave hex colours; `CLAUDE.md` forbids hard-coded colours. I used the existing `nm-*` tokens, whose dark values (#0C0D0F to #1A1C1F) are close to the brief.
- **Theme:** the shop follows the site's theme toggle, dark by default. The `/shop` hero and dusk scenes stay dark in light mode too.
- **New colour token:** `--nm-bulb`, a warm light colour for the festoon bulbs, because no token fitted.
- **New dependencies:** none. Lighthouse ran through `npx` and was not added to the project.
- **Reserve page:** a dedicated page, not a change to the long quote form. It posts to the same `/api/contact`, and the configuration travels as structured text in the description. The backend is unchanged.
- **Quote form change:** one optional prop to pre-fill the description, used only for the metal-free mast. Other enquiries behave as before.
- **Metal-free fields:** height, payload and use are lines in the pre-filled description, not new form fields, so the backend contract stays the same.
- **Prices on Reserve:** recalculated from `products.ts`. The URL can't change a price, and quantity is capped at 10.
- **Parts wording:** parts also use "Reserve", labelled "Order via enquiry (made to order)" in your email.
- **Part page notes:** a part's "Fits" row and its specs are my wording, based on the tube sizes in the brief.
- **`MadeToOrder`:** JSON-LD uses this for parts and the metal-free mast, not `InStock`, because they aren't in stock. Kits use `PreOrder`.
- **"from €450" in JSON-LD:** it is published as price 450 for the metal-free mast.
- **Setup time FAQ:** says one person can do it and that a measured time comes later, because you gave no figure.
- **Winter FAQ:** says to use the tripod base on frozen ground. That is my reasoning, not from the brief: please check it.
- **Safety wording:** I added "Until then, take the mast down in strong wind" so the wind rule is usable before a limit exists.
- **3D viewer:** built from the real tube sizes. It loads by itself on desktop after 1.2 s; on phones it waits for a tap. Its code is about 226 kB gzipped, loaded only on demand, under the 250 kB limit.
- **OG images:** static PNGs, because `next/og` fails to build on Windows. `metadataBase` is now `https://northernmodulus.com`, so OG links on previews point at production and won't resolve until merge.
- **Sitemap:** none exists, so none was added, as the brief says.
- **`CLAUDE.md` response times:** quotes stay "within one business day"; reservations say "within 2 business days", as the brief says.
- **Removed:** `ProductActions.tsx` and `ProductGallery.tsx`, no longer used.

## Owner to-do before launch

**Photos.** Save to `public/pictures/products/`, then replace the matching `illustration:` entry in `images[]` in `lib/data/products.ts`. Remove the "Illustration" note once the last one is replaced.

| Product | Shots | File names |
|---|---|---|
| Event Mast | Assembled and guyed outdoors; collar close-up; spike base in ground; 4 tops in a row; packed bundle next to something for scale | `nm-mast-event-1.jpg` to `-5.jpg` |
| Festoon Set | 4 masts with lights at dusk; contents laid out | `nm-festoon-set-4-1.jpg`, `-2.jpg` |
| Extension | Fitted at 4.5 m, guyed; collar close-up | `nm-mast-extension-1.jpg`, `-2.jpg` |
| Festoon Top | Close-up with lights attached | `nm-top-festoon-1.jpg` |
| Banner Arm | Close-up with a flag or banner | `nm-top-banner-1.jpg` |
| Camera Top | Close-up with camera or light | `nm-top-camera-1.jpg` |
| Sail Clamp | Close-up with sail corner | `nm-top-sail-1.jpg` |
| Tripod Base | On paving | `nm-base-tripod-1.jpg` |
| Cross Clamp | With crossbar between two masts | `nm-cross-clamp-1.jpg` |
| Lock Collar | On a cut tube | `nm-collar-60-38-1.jpg` |
| Metal-Free Mast | With antenna; nylon fastener close-up | `nm-mast-metal-free-1.jpg`, `-2.jpg` |

**Other items:**
- [ ] Add load-test results and rated loads (`SHOP_COPY.ratedLoads`), plus the wind limit in the safety text
- [ ] Confirm all prices
- [ ] **Confirm the returns policy for pre-orders.** `/returns` and `/terms` don't mention pre-orders or reservations. The FAQ repeats the 14-day withdrawal for standard shop products.
- [ ] **Review `/terms` wording.** It says prices "include all applicable taxes"; the shop says "No VAT added (seller not VAT-registered)". They don't conflict, but you may want one phrasing. I left legal pages unchanged, as instructed.
- [ ] Decide `TUBE_SUPPLIER_NAME` (empty hides the name)
- [ ] Create Stripe links; a filled `stripePaymentLink` turns the CTA into "Buy now". The Buy now path was not clicked through, because all links are empty.
- [ ] LV translation
- [ ] Check CE or other marking for event poles
- [ ] Have someone check the engineering copy, especially the printed-parts materials and the steel and aluminium comparison

## Known issues and skipped items

- **One real reservation not sent:** the Reserve flow was tested with `/api/contact` intercepted in the browser, so no email was sent. The payload was checked by eye against the API's validation rules. The email itself is unverified: send one test reservation on the preview and check how it looks.
- **Illustrations are schematic:** part shapes are my interpretation of your description, not your CAD. Check that they match the real parts.
- **Header accessibility issue, not from this work:** Lighthouse flags the closed mobile menu for having focusable links inside `aria-hidden`. Left unchanged.
- **Screenshot artefact:** full-page mobile screenshots show the sticky bar partway down the page. On a real phone it stays at the bottom of the screen.
- **Not tested on:** real phones or Safari. Testing used headless Edge with phone emulation.

## Checks

- `npm run lint`, `npx tsc --noEmit` and `npm run build`: no errors
- Configurator, `?top=` preselect, nudge, quantity cap, tampered URL, Reserve up to confirmation, metal-free pre-fill, plain `/contact`, filters: all passed in the browser test
- Text contrast and 12 px minimum, 15 pages, both themes, 1440 and 390 px: no issues and no sideways scrolling (HTML text only, not labels inside SVGs)
- Existing routes return 200; the draft and unknown slugs return 404. The upload and UTM code was not changed or re-tested.
- Banned-word grep on new copy: no matches

**Lighthouse, mobile, on the local production build:**

| Page | Performance | Accessibility | SEO |
|---|---|---|---|
| `/shop` | 94 | 96 | 100 |
| `/shop/nm-mast-event` | 93 | 96 | 100 |
| `/shop/nm-top-festoon` | 93 | 96 | 100 |
| `/shop/nm-mast-metal-free` | 93 | 96 | 100 |

Scores were taken just before the last small copy fix. Screenshots are in `docs/shop-screenshots/`: `<page>-1440.png` and `<page>-390.png`, plus light-mode and 3D viewer shots.

## PR description

**Preview only. Do not merge.**

Turns `/shop` into a webshop with the NM Mast System as its first product: 11 published products, a flagship page with configurator and 3D viewer, and a Reserve flow on the existing enquiry endpoint. No payment is taken.

- All prices and copy are in `lib/data/products.ts`
- No new dependencies, backend changes or trackers
- No load ratings: a placeholder shows until February 2027; calculated figures appear only under "Engineering notes (calculated, not tested)"
- Illustrations are labelled as illustrations
- Lint, type-check and build pass; Lighthouse mobile 93+ / 96 / 100

Before launch: see the owner to-do and known issues in `SHOP_BUILD_NOTES.md`. In particular, send one real test reservation on the preview, since testing intercepted the API.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
