# Northern Modulus — website

Marketing site for Northern Modulus, a one-founder engineering 3D printing business in Riga, Latvia. Deployed on Vercel from `main` (repo: github.com/Kurlanders/northern-modulus).

## Stack

- **Next.js 14.2.35, App Router** (`app/` directory, no `pages/`). React 18, TypeScript.
- **Node 24.x** (pinned in `package.json` `engines`; Vercel no longer supports Node 20). No `.nvmrc` / `.node-version`.
- **Styling: Tailwind CSS 3.4** with custom `nm-*` design tokens.
  - Tokens live in `tailwind.config.ts` (colors such as `nm-bg`, `nm-s1`–`nm-s3`, `nm-border`, `nm-text-p/s/t`, `nm-green-text`) and are mirrored as CSS custom properties in `app/globals.css`. Change both together.
  - `site-container` utility = `max-w-[1440px] mx-auto px-6 md:px-12`. Every section uses it for left-edge alignment.
  - Newer sections (homepage, `/projects`, Footer, Header, TeamSection) use explicit pixel sizes (`text-[13px]`, `text-[clamp(...)]`) and `// Label` eyebrows. Older pages (`/about` body, `/process`, `/solutions`, `/contact`, ContactForm) still use legacy tokens like `text-disp-xl`, `text-body-md`, `section-py`, `rounded-sm2` and `SectionLabel`. Prefer the newer style for new work.
  - Fonts: Outfit (sans) and JetBrains Mono, loaded via `next/font/google` in `app/layout.tsx`.
- **3D hero:** `@react-three/fiber` + `@react-three/drei` + `three` in `components/sections/HeroModel.tsx`; model and Draco decoder files are in `public/models` and `public/draco`.
- **Other deps:** `motion`, `resend`.
- **`next.config.mjs` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` to `true`.** `npm run build` will therefore pass even with type or lint errors, so run `npx tsc --noEmit` and `npm run lint` explicitly.
- Images live in `public/pictures/`. Project content lives in `lib/data/projects.ts`; solution-page content in `lib/data/solutions.ts`.

### Contact form

- UI: `components/sections/ContactForm.tsx` (client component), used only on `/contact`.
- Submits with `fetch('POST /api/contact')` as JSON: name, company, email, phone, serviceArea, help, description, challenge, timeline, fileLink, referral. There is no file upload; users paste a share link or email files.
- Handler: `app/api/contact/route.ts`. Requires name, company, email, description, a valid email format and an http(s) file link if one is given (400 otherwise). Fields are HTML-escaped and truncated (description 5000 chars, others 300). Sends an HTML email through **Resend** to **northernmodulus@gmail.com**, with `replyTo` set to the submitter.
- Sender is `CONTACT_FROM` env var, falling back to `onboarding@resend.dev` (no verified domain yet).
- A failed send returns 500; the form then shows "Something went wrong — please email northernmodulus@gmail.com directly." The success screen only appears when the API returns `{ success: true }`.
- Nothing is stored; the email is the only record. `RESEND_API_KEY` and `CONTACT_FROM` come from the environment (Vercel env vars / `.env*`, which are gitignored).

## Routes

| Route | File | Linked from nav (Header) | Linked from footer |
|---|---|---|---|
| `/` | `app/page.tsx` | Logo | Logo |
| `/3d-printing` | `app/3d-printing/page.tsx` | Yes ("3D Printing" dropdown + Overview) | No |
| `/projects` | `app/projects/page.tsx` | Yes ("Portfolio") | No |
| `/about` | `app/about/page.tsx` | Yes ("About") | No |
| `/contact` | `app/contact/page.tsx` | Yes ("Get a Quote" button) | No |
| `/process` | `app/process/page.tsx` | No | No |
| `/solutions` | `app/solutions/page.tsx` | No | No |
| `/solutions/product-development` | `app/solutions/product-development/page.tsx` | No | No |
| `/solutions/tooling-fixtures` | `app/solutions/tooling-fixtures/page.tsx` | No | No |
| `/solutions/transport-handling` | `app/solutions/transport-handling/page.tsx` | No | No |
| `/solutions/automation-control` | `app/solutions/automation-control/page.tsx` | No | No |
| `POST /api/contact` | `app/api/contact/route.ts` | n/a | n/a |
| 404 | `app/not-found.tsx` | n/a | n/a |

- The footer (`components/layout/Footer.tsx`) only links the logo to `/` plus external Instagram and LinkedIn.
- The 3D Printing dropdown links to `/3d-printing#how-it-works`, `#capabilities`, `#prototypes`, `#functional`, `#batch`. Only `how-it-works` and `capabilities` exist as ids on that page; the other three anchors go nowhere.
- `/process` is reachable only from the `/about` CTA and the 404 page. `/solutions` and its subpages are reachable only from the 404 page, the `/process` CTA and each other. These pages are leftovers from an earlier "industrial engineering services" positioning.
- There is **no Shop route yet**.
- Unused components (not imported anywhere): `AboutSection`, `ProcessSection`, `SolutionsOverview`, `PositioningStrip`, `WhyClients`, `ui/Divider`.

## Brand rules (apply to all future work)

- **Who we are:** Northern Modulus is a **one-founder** engineering-led 3D printing business in **Riga, Latvia**.
- **Founder:** Rihards Vašuks. Background in composites manufacturing, mechanical design and SolidWorks.
- **Production:** one custom-built, in-house-modified **350 mm Voron**. That is the entire print fleet.
- **Two equal offers.** Give them equal weight; neither is a footnote to the other:
  1. **Shop**: standard parts.
  2. **Custom printing**: prototypes, functional parts, small batches, jigs/fixtures, moulds.
- **Tone:** precise, confident, honest.
  - Never claim scale, a team, or industrial hardware we don't have. No "industrial-grade machines", "print farm", "our engineers", "industrial engineering company".
  - "I" and "we" are fine. **"The team" is not.**
  - Don't invent capabilities, certifications, clients, lead times or statistics.

### Existing copy that breaks these rules

Don't fix these unless asked, but don't copy their wording into new work:

- `components/sections/TeamSection.tsx`: "// The Team", "The people behind every project".
- `components/sections/MeetTheTeamBanner.tsx`: "Meet the team →".
- `components/sections/PrintCapabilities.tsx`: "Industrial-grade hardware".
- `app/about/page.tsx`: "industrial engineering company" positioning; capabilities list includes PLC/HMI, Beckhoff TwinCAT 3, ISO 13849 machine safety and automation build.
- `lib/data/solutions.ts` and all `/solutions/*` pages: automation and PLC integration, "industrial-grade integration".
- `components/sections/ContactForm.tsx`: UK phone placeholder (`+44 (0)...`); service-area chips still list the old solution areas.
- `app/layout.tsx` metadata keywords include "industrial 3D printing".

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
