# Northern Modulus — website

Marketing site for Northern Modulus, a one-founder engineering 3D printing business in Riga, Latvia. Deployed on Vercel from `main` (repo: github.com/Kurlanders/northern-modulus).

## Stack

- **Next.js 14.2.35, App Router** (`app/` directory, no `pages/`). React 18, TypeScript.
- **Node 24.x** (pinned in `package.json` `engines`; Vercel no longer supports Node 20). No `.nvmrc` / `.node-version`.
- **Styling: Tailwind CSS 3.4** with custom `nm-*` design tokens.
  - Tokens live in `tailwind.config.ts` (colors such as `nm-bg`, `nm-s1`–`nm-s3`, `nm-border`, `nm-text-p/s/t`, `nm-green-text`) and are mirrored as CSS custom properties in `app/globals.css`. Change both together.
  - `site-container` utility = `max-w-[1440px] mx-auto px-6 md:px-12`. Every section uses it for left-edge alignment.
  - Newer pages and sections (homepage, `/shop`, `/work`, `/about`, Footer, Header) use explicit pixel sizes (`text-[13px]`, `text-[clamp(...)]`) and `// Label` eyebrows. Older pages (`/3d-printing`, `/contact`, 404, ContactForm) still use legacy tokens like `text-disp-xl`, `text-body-md`, `section-py`, `rounded-sm2` and `SectionLabel`. Prefer the newer style for new work.
  - In JSX, write eyebrows as `{'// Label'}`. Bare `// Label` text fails lint (`react/jsx-no-comment-textnodes`).
  - Fonts: Outfit (sans) and JetBrains Mono, loaded via `next/font/google` in `app/layout.tsx`.
- **3D hero:** `@react-three/fiber` + `@react-three/drei` + `three` in `components/sections/HeroModel.tsx`; model and Draco decoder files are in `public/models` and `public/draco`.
- **Other deps:** `motion`, `resend`.
- **`next.config.mjs` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` to `true`.** `npm run build` will therefore pass even with type or lint errors, so run `npx tsc --noEmit` and `npm run lint` explicitly.
- Images live in `public/pictures/`.
- **Work entries** live in `lib/data/work.ts` (title, slug, images[], problem, material, quantity, result, status). Entries with `status: 'concept'` are hidden unless `showConcepts` is `true` (currently `false`). `/work` shows a "Recent work coming soon" state linking to Instagram when nothing is visible, and the homepage work section renders nothing.
- **Recent prints strip** (`components/sections/RecentPrints.tsx`, homepage) lists every image in `public/pictures/prints/` (jpg, png, webp, avif, gif), sorted by filename, with alt text taken from the filename. It is read at build time, so new images appear after the next deploy. The section is hidden when the folder has no images.
- **Shop** (no backend): products live in `lib/data/products.ts` (slug, name, shortDescription, description, priceEur, images[], material, dimensions, leadTimeDays, inStock, optional stripePaymentLink, draft). Entries with `draft: true` never render; the `example-product` entry is a draft template to copy. Use `formatPrice()` ("€12.00"). With no published products, `/shop` shows "First products launching soon" and the homepage Shop card says "Coming soon"; both switch automatically once one is published. Product pages are statically generated (`dynamicParams = false`), so a new product appears after the next deploy. A product with `stripePaymentLink` shows "Buy now" (same tab). One without it shows "Order via enquiry", linking to `/contact?product=<slug>`. Prices are final: not VAT-registered, "Price includes all applicable taxes. Shipping quoted separately." Product images go in `public/pictures/products/`.
- **Company details** (legal name, reg. no., address, email) live in `lib/company.ts`, used by the footer and the legal pages. `LEGAL_LAST_UPDATED` there sets the "Last updated" date on `/terms`, `/privacy` and `/returns`. Update it when you change those pages.
- **Page metadata:** use `pageMetadata(title, description)` from `lib/metadata.ts`. The layout template adds " — Northern Modulus", so don't put the brand in page titles. The homepage uses `title.absolute`.
- **Redirects** (301) are in `next.config.mjs`: `/projects` → `/work`; `/process`, `/solutions`, `/solutions/*` → `/3d-printing`.

### Contact form

- UI: `components/sections/ContactForm.tsx` (client component), used only on `/contact`.
- Submits with `fetch('POST /api/contact')` as JSON: name, company, email, phone, serviceArea, help, description, challenge, timeline, fileLink, referral, product. There is no file upload; users paste a share link or email files.
- `/contact?product=<slug>` (published products only; other values are ignored) shows an "Enquiry about: <name>" banner above the form and sends the slug as `product`. The email gets a Product row, and the subject says "product enquiry". This makes `/contact` dynamically rendered.
- Handler: `app/api/contact/route.ts`. Requires name, company, email, description, a valid email format and an http(s) file link if one is given (400 otherwise). Fields are HTML-escaped and truncated (description 5000 chars, others 300). Sends an HTML email through **Resend** to **northernmodulus@gmail.com**, with `replyTo` set to the submitter.
- Sender is `CONTACT_FROM` env var, falling back to `onboarding@resend.dev` (no verified domain yet).
- A failed send returns 500; the form then shows "Something went wrong — please email northernmodulus@gmail.com directly." The success screen only appears when the API returns `{ success: true }`.
- Nothing is stored; the email is the only record. `RESEND_API_KEY` and `CONTACT_FROM` come from the environment (Vercel env vars / `.env*`, which are gitignored).

## Routes

| Route | File | Linked from nav (Header) | Linked from footer |
|---|---|---|---|
| `/` | `app/page.tsx` | Logo | Logo |
| `/shop` | `app/shop/page.tsx` (product grid, or "First products launching soon" when empty) | Yes ("Shop") | Yes |
| `/shop/[slug]` | `app/shop/[slug]/page.tsx` (one static page per published product; drafts and unknown slugs 404) | Via `/shop` | No |
| `/3d-printing` | `app/3d-printing/page.tsx` | Yes ("Custom Printing") | Yes ("Custom Printing") |
| `/work` | `app/work/page.tsx` | Yes ("Work") | Yes |
| `/about` | `app/about/page.tsx` | Yes ("About") | Yes |
| `/contact` | `app/contact/page.tsx` | Yes ("Get a Quote" button) | Yes ("Contact") |
| `/terms` | `app/terms/page.tsx` | No | Yes (legal row) |
| `/privacy` | `app/privacy/page.tsx` | No | Yes (legal row) |
| `/returns` | `app/returns/page.tsx` | No | Yes (legal row); also linked from product pages |
| `POST /api/contact` | `app/api/contact/route.ts` | n/a | n/a |
| 404 | `app/not-found.tsx` | n/a | n/a |

Redirected (301, no page file): `/projects` → `/work`; `/process`, `/solutions`, `/solutions/*` → `/3d-printing`.

- The nav has no dropdowns. The footer also links Instagram and LinkedIn, and has a bottom row with the legal details (from `lib/company.ts`) and links to Terms, Privacy and Returns. A guard hides the legal details if any value is empty or starts with "TODO"; the legal links always show.
- In-page anchors on `/3d-printing`: `#prototypes`, `#functional`, `#batch`, `#jigs-fixtures`, `#moulds` (one per service, from `useCases[].id`), plus `#services`, `#materials`, `#how-it-works`. The homepage links to the first three. `/work#<slug>` anchors come from `lib/data/work.ts`. When you add an anchor link, check the id exists. Ids set from data (`id={x.id}`) don't show up in a search for `id="`.

## Brand rules (apply to all future work)

- **Who we are:** Northern Modulus is a **one-founder** engineering-led 3D printing business in **Riga, Latvia**.
- **Company legal details:** NORTHERN MODULUS SIA, registration number 50203734921, Marijas iela 16–17, Rīga, Latvia. Copyright line: "© {year} NORTHERN MODULUS SIA. All rights reserved."
- **Founder:** Rihards Vašuks. Industrial Engineering master's student; day-to-day background in composites manufacturing (prepreg, autoclave, CNC tooling, mould design in CAD). Don't mention flood prevention manufacturing or claim a mechanical engineering degree. Say "CAD", never "SolidWorks".
- **Production:** one custom-built, in-house-modified **350 mm Voron**. That is the entire print fleet.
- **Two equal offers.** Give them equal weight; neither is a footnote to the other:
  1. **Shop**: standard parts.
  2. **Custom printing**: prototypes, functional parts, small batches, jigs/fixtures, moulds.
- **Tone:** precise, confident, honest.
  - Never claim scale, a team, or industrial hardware we don't have. No "industrial-grade machines", "print farm", "our engineers", "industrial engineering company".
  - "I" and "we" are fine. **"The team" is not.**
  - Don't invent capabilities, certifications, clients, lead times or statistics.
- **Quote turnaround = 1 business day.** Write "within one business day" (hero stat: "1 day"). **Never promise 24h.**

### Existing copy that breaks these rules

Don't fix these unless asked, but don't copy their wording into new work:

- `components/sections/ContactForm.tsx`: UK phone placeholder (`+44 (0)...`); service-area chips still list the old solution areas ("Tooling, Fixtures & Production Support", "Engineered Transport, Packaging & Handling", "Product Development & Prototyping", "Targeted Automation & Control Integration").

## Workflow rules

1. **Always work on a new git branch** (`git checkout -b <short-descriptive-name>`). Never commit directly to `main`.
2. **Before finishing, run the build and lint:**
   ```bash
   npm run build
   npm run lint
   npx tsc --noEmit   # build ignores type errors, so check explicitly
   ```
   Report any failures. Don't hide them.
3. **List every changed file** at the end of each task (`git status --short`).
4. **Never read, create, edit or delete `.env` files** (`.env`, `.env.local`, etc.).
5. Run locally with `npm install` then `npm run dev` → http://localhost:3000.
