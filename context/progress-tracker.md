# Progress Tracker: Habibfolio

## Current Phase
- **Rebuild complete (v2): "Obsidian" design system, Sanity-backed content.**

## What changed (this pass)
The site previously had three conflicting visual languages layered on top of each
other (a cream/saffron "Paper" editorial theme in `globals.css`/`ui-context.md`, a
blue-gradient/lime bento hero, and a neo-brutalist yellow `/projects` page) and read
all its content from Supabase tables that the admin panel had already moved off of.

Both are now resolved:
- **One coherent design system** — see "Design system (current)" below. `DESIGN.md`
  and `ui-context.md` describe the *previous* two attempts and are kept for history,
  not as current spec.
- **Content now comes from Sanity** (`lib/sanity.ts`), the same project the admin
  app (`habib_admin`) writes to. Supabase and Firebase are fully removed.

## Design system (current)
- **Shell**: near-black "Obsidian" dark theme by default (`#0a0a0c`), a crisp cool
  "Daylight" light theme as the alternate (never cream/beige). One signature accent,
  flame orange-red (`--accent`), used sparingly — the work's own color is the point.
- **Type**: Bricolage Grotesque (display/headlines), Inter (body), JetBrains Mono
  (labels/meta/dates).
- **Principle carried over from the original `DESIGN.md`**: work first, chrome
  second. The gallery is a real masonry (CSS columns) using each Sanity image's
  actual aspect ratio — no forced cropping.

## Content model
Everything is fetched from Sanity (`lib/sanity.ts`): `siteSettings` (singleton),
`landingPage` (rated by visitors via the admin's `/api/rate`), `project`,
`design`, `blog` (Markdown body, rendered with `react-markdown`).

`contactMessage` has no read path here — the contact form POSTs to the admin's
`/api/contact` and messages are triaged in the admin's Messages inbox.

## Deliberately out of scope (this pass)
- **Testimonials / `/leave-review`** — removed. No Sanity schema for testimonials
  yet (also already listed as out-of-scope in `project-overview.md`). Re-add once
  the admin has a testimonials type.
- **Per-design and per-landing-page detail pages** — designs open in a lightbox,
  landing pages link out to their live URL. Only projects get a full `/work/[slug]`
  case-study page (they have `fullDescription` + a gallery in the schema).
- **Cross-site "already voted" is soft** — the rating widget posts to a different
  origin (the admin app), so the enforced cookie-based guard there can't apply
  cross-site. The portfolio uses localStorage as a UX-level guard only.

## Environment
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` / `_API_VERSION` — same project as
  the admin, public read, no token needed.
- `NEXT_PUBLIC_ADMIN_URL` — the admin app's own URL (`/api/rate`, `/api/contact`
  live there). Must also be added to `PUBLIC_SITE_ORIGINS` in the admin's env for
  CORS.
- Dev runs on port **3001** (`npm run dev`) so it doesn't collide with the admin's
  own dev server on 3000.

## Hero (forest, editorial) — layout pass, 2026-09-30
- Desktop (`lg+`) three columns — name / arch portrait / pitch — are vertically
  centred on the portrait, which is capped at 26rem wide so it doesn't balloon
  after the container widening (bottom-aligning left a tall empty band above the text).
- Portrait width now tracks viewport height (`calc((100svh - 21rem) * 0.8)`, clamped
  18–26rem) so the whole hero incl. the meta strip fits above the fold on laptops.
- Name grows to `clamp(6rem, 7vw, 8rem)` at `xl`.
- Desktop row is a `flex justify-between` (not a 12-col grid): name and portrait are
  fixed-width, the pitch has a 30rem basis and shrinks. Leftover space splits
  equally, so the gaps either side of the portrait always match. The spark badge
  lives inside the portrait wrapper and is offset down onto the meta-strip rule.
- Right column slimmed to tagline + two actions (WhatsApp "Contact me", "See my
  work"). The big orange WhatsApp card was removed; the navbar already carries it.
- Availability line + socials moved to a divider strip under the columns; the spark
  badge sits on that rule, centred under the portrait.
- Tablets (`md`, 768–1023px) now use the single centred column; the three-column
  layout was too cramped there.

## Container width — 2026-09-30
- `.container-app` content max widened 1160px → 1440px; side padding is now fluid
  `clamp(20px, 4vw, 64px)` (was 20px / 40px). Wide laptops no longer get ~190px
  empty gutters. Image `sizes` hints updated to match (WorkGrid, work/[slug]).

## Sanity null-safety — 2026-09-30
- GROQ returns `null` for never-filled fields. Queries in `lib/sanity.ts` now
  `coalesce` arrays to `[]` (techStack, images, tools, tags) and defaults for
  category/status/featured/sortOrder, and drop gallery images with no asset.

## Icons & share image — 2026-09-30
- Favicon pack wired via Next file conventions: `app/favicon.ico`, `app/icon1.png`
  (16), `app/icon2.png` (32), `app/apple-icon.png` (180); Android 192/512 in
  `public/`, listed in `app/manifest.ts`.
- Default OG/X card is `public/habib_og.png` (`OG_IMAGE` in `lib/site.ts`, 1733×907).
  Projects/posts use their own cover and fall back to it. The Sanity `shareImage`
  field is no longer used for this, and the dead `/og.png` fallback is gone.

## Canonical domain — 2026-09-30
- `SITE_URL` switched to `https://www.habibtanwir.com` to match Vercel (www is
  primary, apex 301s to it). Canonicals previously pointed at the apex, which
  redirected back to www — conflicting signals for Google. robots.txt `Sitemap:`
  line and `docs/search-console.md` updated to match.
- Added `app/icon3.png` (192×192): Google prefers favicons in multiples of 48px.

## Blog Markdown tables — 2026-09-30
- `MarkdownContent` now uses `remark-gfm` (tables, strikethrough, task lists,
  autolinks). Without it, table rows rendered as one run-on paragraph.
- Tables are wrapped in `.table-wrap` (rounded card, horizontal scroll on phones);
  forest header row in the `.eyebrow` style, zebra rows, bold first column.

## Business-owner positioning copy — 2026-10-02
- Role is now "Web Developer & Designer" (`JOB_TITLE` in `lib/site.ts`): hero (mobile + desktop),
  footer, FAQ, Person JSON-LD `jobTitle`, llms.txt heading.
- New `SITE_TITLE` constant keeps the default page title ("Habib Tanwir — Full-Stack Engineer & Visual
  Designer") stable; layout metadata, manifest name and WebSite/ProfilePage JSON-LD names use it.
- `DEFAULT_DESCRIPTION`, hero tagline fallback and availability line rewritten for business owners.
- Sanity `siteSettings.tagline` / `seoDescription` / `bio` override the code fallbacks — edit those in Studio.

## Next up
1. Add real content via `/admin` (Sanity Studio or the custom admin) — the site is
   fully wired but has no content until then.
2. Deploy, set the env vars above on Vercel, and set `PUBLIC_SITE_ORIGINS` on the
   admin's Vercel project to this site's production domain.
3. Testimonials, once the admin has a schema for them.
