# Northern Modulus — website

Marketing site for Northern Modulus, an engineering-led 3D printing company in Riga, Latvia. Deployed on Vercel from `main` (repo: github.com/Kurlanders/northern-modulus).

## Stack

- **Next.js 14.2.35, App Router** (`app/` directory, no `pages/`). React 18, TypeScript.
- **Node 24.x** (pinned in `package.json` `engines`; Vercel no longer supports Node 20). No `.nvmrc` / `.node-version`.
- **Styling: Tailwind CSS 3.4** with custom `nm-*` design tokens. `darkMode: 'class'`.
- **Themes (light + dark):** `next-themes@0.4.6` (pinned) in `components/theme/ThemeProvider.tsx`.
  - Setup: `attribute="class"` on `<html>`, `defaultTheme="system"`, `enableSystem`, `storageKey="nm-theme"`. The default follows `prefers-color-scheme`; a visitor's toggle choice persists in localStorage.
  - No flash: next-themes' blocking script sets the class before paint. `<html>` has `suppressHydrationWarning`.
  - Toggle: `components/theme/ThemeToggle.tsx` (sun/moon, 40x40, `aria-label` "Switch to light/dark mode"). It sits in the Header before "Get a Quote" and in the mobile menu, and renders a same-size placeholder until mounted.
  - `<meta name="theme-color">` comes from `THEME_COLOR_META` in `lib/theme.ts` (must match `--nm-bg`). `ThemeColorSync` updates it after a manual switch.
  - Logo: `new-logo-light.svg` (dark lettering, no background box) and `new-logo_svg.svg` (dark mode) are both rendered in the Header/Footer; `dark:hidden` / `hidden dark:block` pick one, so there's no layout shift.
  - The 3D hero reads `useTheme().resolvedTheme` and scales its lights by 0.55 in light mode. It uses the dark rig while the theme is still `undefined`. The canvas is transparent.
- **Color tokens: single source of truth in `app/globals.css`.** RGB channels: light values on `:root`, dark values on `.dark`.
  - `tailwind.config.ts` maps each `nm-*` color to `rgb(var(--nm-…) / <alpha-value>)`, so opacity modifiers work (`bg-nm-bg/95`, `bg-nm-green-accent/[0.06]`).
  - Tokens:
    - surfaces: `bg`, `s1`–`s3`
    - borders: `border`, `border-mid`, `border-light`, `field` (input borders, ≥3:1)
    - green: `green-deep/mid/accent/bright/text/dim`
    - text: `on-green` (text on green buttons), `text-p/s/t`
    - other: `steel`, `steel-l`, `error`, `error-bg`, `error-border`
  - **Never hard-code colors** in `app/` or `components/`: no hex, `rgb()/rgba()` literals, `text-white` or Tailwind palette colors (`red-400` etc.). Use `nm-*` classes, or `rgb(var(--nm-…))` in inline styles. To add a color, add a token with values for both themes and check its contrast.
  - Exceptions: the enquiry email HTML in `app/api/contact/route.ts` (email clients can't use CSS variables) and the 3D light colors in `HeroModel.tsx`.
  - Green buttons: `bg-nm-green-text text-nm-on-green hover:bg-nm-green-bright transition-colors`. Green links hover with `hover:text-nm-green-bright`. Don't use opacity for hover or disabled states; it drops contrast below WCAG. Disabled buttons use `bg-nm-s3 text-nm-text-s`.
- **Readability minimums (both themes):**
  - Body and paragraph text ≥ **15px** (`text-[15px]` / `text-body-sm`+), with line-height 1.6–1.8.
  - Labels and eyebrows ≥ **12px**; nothing below 12px anywhere. Buttons, nav links and fine print (footer copyright and legal row) are 13px.
  - Contrast: body text ≥ 4.5:1 and large text (≥24px, or ≥18.66px bold) ≥ 3:1, in BOTH themes. Check new color pairs before shipping.
  - `site-container` utility = `max-w-[1440px] mx-auto px-6 md:px-12`. Every section uses it for left-edge alignment.
  - Newer pages and sections (homepage, `/shop`, `/work`, `/about`, Footer, Header) use explicit pixel sizes (`text-[13px]`, `text-[clamp(...)]`) and `// Label` eyebrows. Older pages (`/3d-printing`, `/contact`, 404, ContactForm) still use legacy tokens like `text-disp-xl`, `text-body-md`, `section-py`, `rounded-sm2` and `SectionLabel`. Prefer the newer style for new work.
  - In JSX, write eyebrows as `{'// Label'}`. Bare `// Label` text fails lint (`react/jsx-no-comment-textnodes`).
  - Fonts: Outfit (sans) and JetBrains Mono, loaded via `next/font/google` in `app/layout.tsx`.
- **3D hero:** `@react-three/fiber` + `@react-three/drei` + `three` in `components/sections/HeroModel.tsx`; model is `public/models/hero-object.glb`.
  - It's simplified to ~190k triangles, with 1024px WebP textures and meshopt compression (`useGLTF(path, false, true)`; the decoder is bundled, there's no `public/draco`).
  - The original 1.16M-triangle Draco mesh rendered as shards in Safari on macOS. Keep hero models under ~200k triangles and use meshopt, not Draco. Rebuild with `npx @gltf-transform/cli weld → simplify → resize → meshopt`.
  - The canvas is wrapped in an error boundary (renders nothing on failure), and `dpr` is capped at 1.5.
- **Hero stats:** 2x2 grid below 1440px, single row at 1440px and up (`min-[1440px]:`). The row needs ~680px, so re-measure if you change a stat's text.
- **Other deps:** `motion`, `resend`, `@vercel/blob` (file uploads), `@vercel/analytics`.
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
- Submits with `fetch('POST /api/contact')` as JSON: name, company, email, phone, serviceArea, help, description, challenge, quantity, material, timeline, fileLink, fileUrls[], referral, product, utmSource, utmMedium, utmCampaign, referrer.
- **Required: name, email, description.** Everything else is optional, including company and "What do you need?".
- Option lists live in `lib/enquiry.ts`, shared by the form and the API: service areas ("Custom 3D print", "Jig / fixture / tooling", "Mould", "Shop product", "Other") and materials (PLA, PETG, ABS, ASA, TPU, PC, Not sure). The API rejects values that aren't in these lists. Quantity must be a whole number from 1 to 999999. Phone placeholder: `+371 2X XXX XXX`.
- `/contact?product=<slug>` (published products only; other values are ignored) shows an "Enquiry about: <name>" banner above the form, pre-selects "Shop product", and sends the slug as `product`. This makes `/contact` dynamically rendered.
- **File uploads (Vercel Blob, PRIVATE store, presigned client uploads):**
  - The store is connected by `BLOB_STORE_ID` and authenticates with Vercel OIDC (the per-request `x-vercel-oidc-token`). **There is no `BLOB_READ_WRITE_TOKEN`, so don't use `handleUpload` / `upload()` from `@vercel/blob/client`**; they require one.
  - The browser calls `uploadPresigned()`, which asks `app/api/upload/route.ts` (`handleUploadPresigned`) for a presigned URL, then PUTs the file directly to Blob with `access: 'private'`. This shows progress, and the user can remove a file before sending.
  - The route validates the path first, then calls `issueSignedToken` scoped to that one pathname, `put` only, 50 MB max, valid 30 minutes. The URL options repeat the size limit and set no random suffix and no overwrite. Multipart is rejected.
  - `handleUploadPresigned` requires `BLOB_WEBHOOK_PUBLIC_KEY`, which is set by the store connection.
  - Pathname: `enquiries/<uuid>/<original file name>` (no random suffix, no overwrite), so downloads keep the original name. Path and signing helpers are in `lib/file-links.ts`.
  - Rules are in `lib/enquiry.ts`: up to 5 files, 50 MB each, extensions stl, step, stp, 3mf, obj, dxf, dwg, pdf, zip, jpg, png. They're checked in the browser, when issuing the presigned URL (`isValidUploadPath` plus the size limit) and again in `/api/contact`, which accepts `filePaths[]` only in that shape, max 5.
  - **Downloads:** the email links to `GET /api/files?path=…&exp=…&sig=…`. `sig` is an HMAC-SHA256 of `path + "\n" + exp` using `FILE_LINK_SECRET`. Links are valid for 30 days (`FILE_LINK_TTL_DAYS`). The route checks the path shape, the expiry and the signature (timing-safe), returning 403 if any fails. It then streams the file from Blob with the server token as `Content-Disposition: attachment` under the original name. Links use `https://$VERCEL_PROJECT_PRODUCTION_URL`, falling back to the request origin locally. If `FILE_LINK_SECRET` is missing, the email still sends and lists the Blob path instead of a link.
  - Rotating `FILE_LINK_SECRET` invalidates every link already emailed. The files are still in Blob and can be downloaded from the Vercel dashboard.
  - Removed or abandoned uploads stay in the Blob store until deleted manually.
  - The file-link field remains as an alternative. `@vercel/blob/client` is lazy-loaded when a file is picked.
- **Attribution:** `components/AttributionCapture.tsx` (in the root layout) stores utm_source, utm_medium, utm_campaign and `document.referrer` in sessionStorage (`nm_attribution`, via `lib/attribution.ts`) on the first page load of a session and never overwrites them. The form sends them with every submission, and the email lists them under "Source".
- Handler: `app/api/contact/route.ts`. Validates as above (400 on failure). All fields are HTML-escaped and truncated (description 5000 chars, URLs 1000, others 300). Sends an HTML email through **Resend** to **info@northernmodulus.com** (`company.email`), with `replyTo` set to the submitter.
- **The business email is `info@northernmodulus.com`, defined once as `company.email` in `lib/company.ts`.** Import it; never hard-code the address. Don't use the old Gmail address anywhere.
- Sender is `CONTACT_FROM` env var, falling back to `onboarding@resend.dev` (no verified domain yet).
- A failed send returns 500; the form then shows "Something went wrong — please email info@northernmodulus.com directly." The success screen only appears when the API returns `{ success: true }`.
- No database; the email is the record and uploaded files live in Vercel Blob. Env vars: `RESEND_API_KEY`, `CONTACT_FROM`, `BLOB_STORE_ID`, `BLOB_WEBHOOK_PUBLIC_KEY`, `FILE_LINK_SECRET` (Vercel env vars / `.env*`, which are gitignored). `VERCEL_PROJECT_PRODUCTION_URL` is a Vercel system variable, and Blob auth uses Vercel OIDC, which is automatic on Vercel. Uploads and downloads don't work locally without that OIDC token.

### Analytics

- `@vercel/analytics` (`<Analytics />` from `@vercel/analytics/next` in `app/layout.tsx`): cookieless page views. Custom events via `track()`:
  - `quote_submitted` `{ serviceArea }`, after a successful send.
  - `enquiry_clicked` `{ product }` and `buy_clicked` `{ product }`, from `components/sections/ProductActions.tsx` on product pages.
- **No cookies, no Meta Pixel or other ad trackers.** If tracking changes, update `/privacy` to match.

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
| `POST /api/upload` | `app/api/upload/route.ts` (presigned Blob upload URLs, private store) | n/a | n/a |
| `GET /api/files` | `app/api/files/route.ts` (signed, expiring download of an uploaded file) | n/a | n/a |
| 404 | `app/not-found.tsx` | n/a | n/a |

Redirected (301, no page file): `/projects` → `/work`; `/process`, `/solutions`, `/solutions/*` → `/3d-printing`.

- The nav has no dropdowns. The footer also links Instagram and LinkedIn, and has a bottom row with the legal details (from `lib/company.ts`) and links to Terms, Privacy and Returns. A guard hides the legal details if any value is empty or starts with "TODO"; the legal links always show.
- In-page anchors on `/3d-printing`: `#prototypes`, `#functional`, `#batch`, `#jigs-fixtures`, `#moulds` (one per service, from `useCases[].id`), plus `#services`, `#materials`, `#how-it-works`. The homepage links to the first three. `/work#<slug>` anchors come from `lib/data/work.ts`. When you add an anchor link, check the id exists. Ids set from data (`id={x.id}`) don't show up in a search for `id="`.

## Brand rules (apply to all future work)

- **Who we are:** Northern Modulus is an engineering-led 3D printing company in **Riga, Latvia**, founded by Rihards Vašuks.
- **Company legal details:** NORTHERN MODULUS SIA, registration number 50203734921, Marijas iela 16–17, Rīga, Latvia. Copyright line: "© {year} NORTHERN MODULUS SIA. All rights reserved."
- **Founder:** Rihards Vašuks. Industrial Engineering master's student; day-to-day background in composites manufacturing (prepreg, autoclave, CNC tooling, mould design in CAD). Don't mention flood prevention manufacturing or claim a mechanical engineering degree. Say "CAD", never "SolidWorks".
  - Present him as a strong engineer who leads the company and runs projects end to end (requirements, design, production), building Northern Modulus to grow into a team of engineers. **Don't claim staff, employees or an existing team of engineers.**
- **Production:** several in-house printers, built and tuned for precision. Say "in-house". **Never state how many printers there are, and never name or list printer models (no "Voron", no "350 mm").** No "one machine", "the machine" or "single printer" phrasing.
- **Two equal offers.** Give them equal weight; neither is a footnote to the other:
  1. **Shop**: standard parts.
  2. **Custom printing**: prototypes, functional parts, small batches, jigs/fixtures, moulds.
- **Tone:** precise, confident, honest.
  - Never claim scale, staff, or industrial hardware we don't have. No "industrial-grade machines", "print farm", "our engineers", "our team", "industrial engineering company".
  - "We" is the default voice. **"The team" is not OK.** Don't describe the business as small, one-person or one-founder either ("one engineer", "deliberately small setup").
  - Don't invent capabilities, certifications, clients, lead times or statistics.
- **Quote turnaround = 1 business day.** Write "within one business day" (hero stat: "1 day"). **Never promise 24h.**

### Existing copy that breaks these rules

None known. If you find copy that breaks the rules above, list it here rather than copying its wording.

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
