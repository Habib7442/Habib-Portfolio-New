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
`landingPage` (video previews, featured flag, detail page at `/work/landing/[slug]`), `project`,
`product`, `testimonial`,
`design`, `blog` (Markdown body, rendered with `react-markdown`), `carouselTemplate` (see "Carousel templates" below).

`contactMessage` has no read path here — the contact form POSTs to the admin's
`/api/contact` and messages are triaged in the admin's Messages inbox.

## Deliberately out of scope (this pass)
- **Per-design detail pages** — designs open in a lightbox.

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

## Home page restructure, video previews, products — 2026-10-07
- **Sanity (habib_admin/studio)**: `landingPage` gained `slug`, `plainDescription`,
  `previewVideo` (mp4), `previewVideoWebm`, `previewPoster`, `featured` + `featuredOrder`,
  `techStack`; rating fields hidden. `project` gained `plainDescription`. New types
  `product` (name, oneLiner, plainDescription, image, previewVideo, link, status
  live|beta|hackathon, order) and `testimonial` (quote, name, role, business, image,
  linkedProject → project|landingPage|product, order).
- **Home order**: Hero → FeaturedLanding (top `featured` landing page, big video) →
  LandingShowcase "Websites that move" → FeaturedWork (client work, compact 3-card row) →
  Products → Testimonials (hidden when none) → Services → GalleryBand → Writing → FAQ
  (all collapsed) → Contact. About, CategoryBar and the marquees were dropped from the
  home page; the "About" nav/footer links went with them.
- **Hero** is one DOM tree for every breakpoint (was two copies → two h1s, two priority
  images) and a server component; entrance is a CSS `animate-fade-up`, not framer-motion,
  so it paints without waiting for hydration. Portrait uses `fetchPriority="high"`
  (`priority` is deprecated in Next 16).
- **VideoPreview** (`components/ui/VideoPreview.tsx`): poster = next/image underneath,
  `<video preload="none">` on top, plays at ≥40% visible, pauses otherwise; reduced
  motion / Save-Data → poster only. Verified: zero video bytes on page load.
- **WorkCard** (`components/ui/WorkCard.tsx`) is the one card used by landing, project and
  product cards. Cards show `cardDescription()` (`lib/plain-text.ts`): plainDescription, or
  the first sentence of the long description; text starting `[Placeholder]` is ignored.
- **Ratings removed** from the public site (StarRating deleted). `/review` stays; approved
  reviews are no longer shown on the home page — curated `testimonial`s replace them.
- **/work grid** is single-DOM CSS columns (was 3 hidden copies of every card).
- **/hire** for hiring teams; "Download resume" appears only if
  `public/resume-habib-tanwir.pdf` exists at build time (`HAS_RESUME` in next.config.ts).
- **Detail pages**: `/work/landing/[slug]` with "How it's built"; project pages now have
  "About the project" + a "How it's built" aside (stack + source link).
- `scripts/compress-preview.sh` makes 1280px, 12–15s, silent H.264 (CRF 26, auto-raised to
  stay < 3 MB) + VP9 WebM + first-frame poster JPG.
- Lighthouse mobile (local, simulated 4G): LCP ≈ 3.8–4.1s both before and after this change
  (portrait from Sanity CDN; image itself loads in ~0.6s unthrottled), CLS 0, A11y 100,
  BP 100, SEO 92 (robots.txt audit). Not yet at the 95 target — main-thread JS is the lever.

## Uncropped card thumbnails — 2026-10-09
- `VideoPreview` has `fit="cover" | "contain"`. WorkCard (project, landing-page, product cards) uses
  `contain`: the whole screenshot/video sits inset 6% in the 16:10 frame, on a blurred, saturated
  copy of its own poster (loaded at `sizes="96px"`, so it costs almost nothing). Hover lifts the shot.
- Blog covers are never cropped either: the query returns `coverDims`, and the home Writing cards,
  /blogs list and post hero size their frame to the cover's own ratio (`coverRatio()`, fallback
  16:9) with `object-contain`. Design cards and project detail heroes still use `cover`.

## On-demand revalidation — 2026-10-07
- Every Sanity fetch is tagged `sanity` (`SANITY_TAG`, lib/sanity.ts); `/` has `revalidate = 60`.
- `POST /api/revalidate` (Bearer `REVALIDATE_SECRET`) expires the tag and revalidates `/`, `/work`,
  `/blogs`, `/hire`, sitemap, llms.txt, every detail route pattern, plus any `paths` sent.
- The admin (separate Vercel project, so its own revalidatePath can't reach this cache) calls it
  from every save/delete/status change via `revalidatePortfolio()` (habib_admin/src/lib/portfolio.ts).
  Env on the admin: `PORTFOLIO_URL`, `PORTFOLIO_REVALIDATE_SECRET` (= this site's `REVALIDATE_SECRET`).
- Studio publishes don't go through the admin: they still show within 60s (or add a Sanity webhook
  to /api/revalidate).

## Analytics (PostHog) — 2026-10-07
- `instrumentation-client.ts` inits posthog-js (US region, `defaults: "2026-05-30"`) only when
  `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set. It's inlined at build time, so it must be set on
  Vercel before the build.
- Events go through `/ingest` (rewrites in next.config.ts, `skipTrailingSlashRedirect`), never
  straight to posthog.com. PostHog ignores headless browsers, so Lighthouse/Playwright runs don't
  pollute analytics.

## Home page: About back, editable services, admin for products/testimonials/videos — 2026-10-14
- **Home order** now: Hero → About → FeaturedLanding → LandingShowcase → FeaturedWork (client work) →
  Testimonials → Products → Services → GalleryBand → Writing → FAQ → Contact.
- **About** (`components/sections/About.tsx`) is back as a short block: round photo (admin profile photo),
  the admin bio, and a "Founder of Locallify Agency" link. `#about` anchor exists again.
- **Services** text is editable: `siteSettings.services` (4 rows: title, one sentence, up to 3 bullets),
  merged field-by-field over `DEFAULT_SERVICES` in `lib/services.ts`. 02–04 rewritten in plain language.
  Admin defaults mirror that file (`SERVICE_DEFAULTS` in habib_admin SettingsForm) — keep them in sync.
  Images are still picked from the work itself in `app/page.tsx`.
- **FAQ** "What has … built?" says "N client projects, N landing pages and N designs" (live counts,
  singular/plural handled).
- **Admin (habib_admin)**: new Products and Testimonials pages (list/new/edit/delete); landing-page form
  now uploads an MP4/WebM preview video + poster and a card description; `/api/upload` accepts MP4/WebM
  up to 4MB as Sanity file assets, and unused video assets are cleaned up like images.
- Verified at 390px and 1440px: no horizontal overflow, no console errors; Testimonials/Products checked
  with temporary mock data (none published yet, so both stay hidden).

## Carousel templates — 2026-11-06
- **Content type** `carouselTemplate` (habib_admin `studio/schemaTypes/carouselTemplate.ts`): title, slug,
  description, category (fashion / personal-brand / business / tech / other), ordered `slides[]` images, size
  label, `isFree`, price label, `buyLink` (Etsy/Gumroad), `canvaLink` (Canva template link), `featured`, `order`.
  Category labels are mirrored in `lib/template-categories.ts` here and `src/lib/template-categories.ts` in the admin.
- **Admin**: Templates section (list/new/edit/delete) like Products. Slides upload one by one through
  `/api/upload`, ordered by file name (slide-2 before slide-10). Free needs a Canva link, paid needs a buy link.
- **Portfolio**: `/templates` (grid, `?category=` filter chips only for categories in use), `/templates/[slug]`
  (full slide strip, "What's included", hire CTA, Product JSON-LD with an Offer when the price label parses as
  ₹/$/€/£ + number), home `TemplatesTeaser` after GalleryBand (featured only, max 3, hidden if none), Navbar +
  Footer links, sitemap entries, `/api/revalidate` covers both routes.
- `getTemplates` only returns templates with a slug, ≥1 slide and a usable link (Canva link if free, buy link
  if paid). The Canva link is never sent to the page for paid templates.
- `SlideStrip` (client): native scroll-snap swipe + prev/next buttons + counter. Card variant shows one slide,
  counter top-right (slides print their own counter bottom-right); full variant peeks the next slide.
- PostHog events via `TrackedLink`: `template_buy_clicked`, `template_canva_clicked` (slug, title, category, free).
- Verified with temporary mock data (since removed) at 390px and 1440px: no horizontal overflow, no console
  errors, swipe buttons advance the counter, filter + home teaser render. No templates are published yet, so
  `/templates` shows its empty state until the first one is added in the admin.

## Template types + SEO URLs — 2026-11-07
- `carouselTemplate` gained `templateType` (carousel / reel / story / post; missing = carousel). Studio title is now
  "Template"; the document name stays `carouselTemplate` so existing entries keep working.
- **URLs**: `/templates` (hub, one band per type that has templates) → `/templates/<type>` (`carousels`, `reels`,
  `stories`, `posts`; category chips via `?category=`, nofollow, canonical stays the clean section URL) →
  `/templates/<type>/<slug>`. A section with no templates 404s (no thin pages). `/templates/<slug>` and a wrong type
  segment 308-redirect to the canonical URL. Type info + SEO copy live in `lib/template-types.ts`; the admin mirrors
  value/path in `src/lib/template-categories.ts`.
- SEO: per-section title/description/OG, CollectionPage + ItemList JSON-LD, 4-level BreadcrumbList, Product JSON-LD
  on detail pages, visible breadcrumb nav, "More <type> templates" internal links, sitemap entries per section,
  llms.txt lists the sections and templates.
- Admin: Type picker (sets the default size: carousel 1080×1440, reel/story 1080×1920, post 1080×1350);
  `generateSlug` now strips accents (SAVRÉ → savre) instead of dropping the letter.

## Website templates — 2026-11-07
- New template type `website` → `/templates/websites` (unit "previews", default size "1440 px wide" in the admin).
  Slides for a website are landscape section previews (1440×1080); `SlideStrip` shows landscape slides as wider tiles
  on the detail page, and the detail page uses larger image `sizes` for them.
- Hub copy is no longer Instagram-only ("Canva Templates for Instagram & Websites"); llms.txt section renamed
  "Canva templates". Detail page: website-specific "What's included", hire box and "All <singular> templates" link.
- First entry: ORVO — Sneaker Store Landing Page (`orvo-sneaker-landing-page`, Sanity `jO2F5vwG6bRNFfc5FKUyHX`).
  Free, but stays hidden until a Canva **template link** is added in the admin (free templates need `canvaLink`).

## Next up
0. Add the SAVRÉ fashion carousel in admin → Templates (slides + Etsy/Gumroad link), tick "Show on home page".
1. Add real content via `/admin` (Sanity Studio or the custom admin) — the site is
   fully wired but has no content until then.
2. Deploy, set the env vars above on Vercel, and set `PUBLIC_SITE_ORIGINS` on the
   admin's Vercel project to this site's production domain.
3. Publish the VAELORA draft and product drafts once video/poster/descriptions are in.
4. Give the other landing pages slugs + plainDescriptions in Studio.
5. Add MockMate, Sarah and Apprizely in admin → Products (links/images), and 2–3 testimonials.
6. Upload preview videos for VAELORA, Ridgeline and NOIR//FORM in admin → Landing pages.
