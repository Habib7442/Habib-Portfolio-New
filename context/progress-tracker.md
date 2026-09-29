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

## Next up
1. Add real content via `/admin` (Sanity Studio or the custom admin) — the site is
   fully wired but has no content until then.
2. Deploy, set the env vars above on Vercel, and set `PUBLIC_SITE_ORIGINS` on the
   admin's Vercel project to this site's production domain.
3. Testimonials, once the admin has a schema for them.
