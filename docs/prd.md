# PRD — Habibfolio Redesign
**Author:** Design audit by Hyperagent · **For:** Habib Tanwir · **Date:** 2026-05-02 · **Target site:** https://www.habibfolio.tech

---

## 1. Executive Summary

The current portfolio has solid bones (Next.js, real client work, hybrid dev + visual identity) but reads like an over-styled creative-agency template rather than the work of a thoughtful senior engineer. The fix is **not more design** — it's **less, but considered**. Restraint is what reads as senior.

This PRD specifies a redesign that:

1. Replaces five-color confetti with a single warm accent (saffron) on a disciplined neutral palette, in **both** light and dark themes (currently light-only).
2. Swaps the trendy Syne display face for **Instrument Serif**, pairs it with **Inter** and **JetBrains Mono**, and applies a true editorial type scale.
3. Rewrites the hero and about copy from "category-defining digital experiences" bombast into specific, confident sentences.
4. Reorganizes information architecture so the work — not the navigation — is the first thing a visitor judges.
5. Ships dark mode with proper contrast and theme parity, not just an inverted palette.

Aesthetic direction: **Refined Editorial-Dev with warm accents.** Reference points: Linear, Vercel, Rauno.me (precision, density of taste), Brian Lovin and Paco Coursey (warmth, voice), Geist (modern dev minimal). The portfolio should feel like a personal site engineers bookmark, not a Dribbble shot.

---

## 2. Current-State Audit

### 2.1 What's working
- **Hybrid positioning** (code + visual/AI design) is genuinely differentiated. Most engineers can't ship a poster; Habib can. Lean into this.
- **Real shipped projects** with case-study potential (ImageStudioLab, IntegratePDF, SnapLens AI, Om Sai Gym, Quizllo, dental AI).
- **Active GitHub** — 692 contributions/year is meaningful proof of work.
- **Drag-to-explore visual carousel** is a memorable interaction, worth keeping.
- **Performance basics in place** — Next.js, image preloading, OG tags, structured meta.

### 2.2 What's hurting the impression

| # | Issue | Why it matters |
|---|---|---|
| 1 | No dark mode | A senior-engineer audience defaults to dark; absence reads as "didn't ship the basics." |
| 2 | Too many accent colors (cyan, green, purple, pink, yellow on cream) | Reads as junior/Dribbble. Senior portfolios use 1-2 accents max. |
| 3 | Syne + ALL CAPS labels everywhere | Syne is overexposed and trend-coded. ALL CAPS at small sizes is hard to read and feels like brand-template language. |
| 4 | Overwrought copy ("category-defining," "every pixel… opportunity to craft") | High-effort adjectives with low specificity. Senior engineers use plain language with strong nouns. |
| 5 | "Hire Me" + "Leave a Review" buttons in main nav | Reads as freelancer-marketplace, not engineer's site. Move to dedicated page or footer. |
| 6 | No real case studies | Project cards have descriptions but no architecture diagrams, decision rationale, metrics, or "what I'd do differently." That's the line between portfolio and case study. |
| 7 | "2+ YEARS EXPERIENCE" stat tile | Counterproductive. Numbers under 5 hurt the "senior" framing. Either drop or replace with something stronger (commits/year, projects shipped, users impacted). |
| 8 | Testimonials section first-person initials ("M", "E", "D") | Anonymous-looking. If real, show photos and full names; if fictional, remove. |
| 9 | No writing/blog | Nav promises "BLOGS" but moving the bar requires content. Either ship 3-5 essays or remove. |
| 10 | No clear technical contact path (resume, /uses, GitHub-prominent CTA) | Recruiters and engineering managers can't find what they need in 3 seconds. |

### 2.3 Quantified gaps
- Color tokens: **9 distinct hues observed**, target **2 (neutral + accent)**.
- Font families: **3 (Syne, Inter, mono)** — keeping the count, swapping families.
- Themes: **1**, target **2** (light + dark) with proper token parity.
- Voice register: ~**5 superlatives per paragraph** in About/Hero, target **0**.

---

## 3. Target Persona & Positioning

### 3.1 Who this site is for (in priority order)
1. **Engineering managers / tech leads** evaluating Habib for a senior IC role. Want: real projects, technical depth, code quality signals, decision-making evidence. Spend ~30s on the hero, ~2min if interested.
2. **Founders / startup CTOs** evaluating for contract or founding-engineer roles. Want: shipping velocity, full-stack range, AI experience.
3. **Other engineers / designers** linking to the site as inspiration or referral. Want: craft, taste, something to bookmark.
4. **Recruiters** running keyword scans. Want: stack, role, location, contactable links.

What we are **not** optimizing for: drive-by clients shopping for a $500 landing page. Those leads can come through LinkedIn or a separate `/services` page.

### 3.2 Positioning statement (copy north star)
> Habib Tanwir builds AI-powered SaaS products and the brand identity that ships with them — full-stack engineering with a designer's eye. Based in Silchar, India. Working with founders building category-defining tools.

(That last line is the one place "category-defining" earns its keep — applied to *what he builds for clients*, not to himself.)

### 3.3 Aesthetic decision (committed)

**Refined Editorial-Dev with warm accents.**

- **Refined**: small details done well. Optical alignment, monospace tabular numerals, considered hover states.
- **Editorial**: serif headlines, generous line-height, magazine-grade hierarchy. Reads like content, not a brochure.
- **Dev**: monospace tags for tech stacks and metadata. Code-blocks treated as design elements. Dark mode native.
- **Warm accents**: a single saffron orange (`#E07A29`) carries through. Nods to Indian heritage without being literal. Replaces the rainbow.

Rejected alternatives:
- *Bold-Creative (Bruno Simon style)*: would compete with Habib's own visual/poster work, which deserves to be the loudest thing on the page.
- *Editorial-Warm only (Brian Lovin style)*: insufficient technical signal for an AI/SaaS engineering audience.
- *Pure Linear-Vercel minimalism*: too cold, erases personality, loses the visual-design half of his identity.

---

## 4. Design System

### 4.1 Typography

**Families** (all free, available via `next/font/google` or self-hosted):

| Role | Family | Rationale |
|---|---|---|
| Display / Headlines | **Instrument Serif** | Modern transitional serif with subtle italic personality. Editorial gravitas without dating like Playfair. Looks expensive, costs nothing. |
| UI / Body | **Inter** (keep) | Best-in-class neutral sans, optical sizes, OpenType features. Already loaded. |
| Code / Labels / Numbers | **JetBrains Mono** | Programming-ligature mono with strong tabular figures. Better hinting than IBM Plex Mono at small sizes. |

Optional alternative for display if you want even more warmth: **Fraunces** (variable serif with grade and softness axes).

**Type scale** (modular — 1.250 minor third on mobile, 1.333 perfect fourth on desktop):

| Token | Mobile | Desktop | Family / Weight | Use |
|---|---|---|---|---|
| `display-2xl` | 56 / 60 | 96 / 96 | Instrument Serif 400, italic optional | Hero headline, only one per page |
| `display-xl` | 44 / 48 | 72 / 76 | Instrument Serif 400 | Section titles (H1/H2) |
| `display-lg` | 32 / 38 | 48 / 54 | Instrument Serif 400 | Project titles, large quotes |
| `text-xl` | 20 / 32 | 24 / 36 | Inter 400 | Lead paragraph, intro copy |
| `text-lg` | 18 / 30 | 18 / 30 | Inter 400 | Body |
| `text-md` | 16 / 26 | 16 / 26 | Inter 400 | Default body |
| `text-sm` | 14 / 22 | 14 / 22 | Inter 500 | Captions, metadata |
| `mono-sm` | 13 / 20 | 13 / 20 | JetBrains Mono 500 | Tags, kbd, file paths |
| `mono-xs` | 11 / 16 | 11 / 16 | JetBrains Mono 500, tracking +0.04em | Eyebrow labels, section numbers |

Format: `font-size / line-height` in pixels.

**Tracking (letter-spacing)**:
- Display sizes: `-0.02em` (tighten)
- Body: `0`
- Mono eyebrows / labels: `+0.04em`
- Avoid ALL CAPS at body sizes; if you must use uppercase, restrict to `mono-xs` only.

**Pairing rules**:
- Never pair the serif with itself across two sizes in the same paragraph block.
- Mono is for *metadata only*: tech stack tags, dates, section numbers (e.g. `01 / WORK`), URLs, file paths, kbd shortcuts.
- Body is always Inter. No exceptions.

### 4.2 Color system

Two themes, full token parity. Saffron accent identical in both. Tokens use semantic names so you can swap the palette later without renaming components.

#### Light theme — "Paper"

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FAFAF7` | Page background — warm off-white, not pure |
| `bg-elevated` | `#FFFFFF` | Cards, surfaces |
| `bg-subtle` | `#F2F1EC` | Quiet sections, code blocks |
| `bg-muted` | `#E9E7E0` | Hover states, dividers (filled) |
| `border` | `#E1DED5` | Default borders |
| `border-strong` | `#C7C2B6` | Emphasized borders |
| `fg` | `#1A1A1A` | Primary text |
| `fg-muted` | `#5C5A55` | Secondary text |
| `fg-subtle` | `#8A8780` | Tertiary text, captions |
| `accent` | `#E07A29` | Saffron — links, focus rings, key UI |
| `accent-hover` | `#C8651A` | Hover state |
| `accent-subtle` | `#FBE6D2` | Accent backgrounds, badges |
| `success` | `#3F7A3F` | |
| `warning` | `#A66800` | |
| `danger` | `#A6321A` | |

#### Dark theme — "Ink"

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0E0E0C` | Page background — near-black, slightly warm, never `#000` |
| `bg-elevated` | `#16161300` | Cards, surfaces (use `#161613` plus 8% noise overlay if you can) |
| `bg-subtle` | `#1E1D1A` | Code blocks, quiet panels |
| `bg-muted` | `#2A2925` | Hover states |
| `border` | `#2D2C28` | Default borders |
| `border-strong` | `#454340` | Emphasized borders |
| `fg` | `#F5F4F0` | Primary text — soft white, not `#FFF` |
| `fg-muted` | `#A8A59E` | Secondary text |
| `fg-subtle` | `#73706A` | Tertiary text |
| `accent` | `#F08A3A` | Saffron, slightly brightened for dark bg |
| `accent-hover` | `#FF9D4D` | |
| `accent-subtle` | `#3A2516` | Accent backgrounds, badges |
| `success` | `#7BC57B` | |
| `warning` | `#D4A547` | |
| `danger` | `#E07560` | |

**Contrast verification (WCAG AA target):**
- `fg` on `bg`: light 16.1:1, dark 14.6:1 — both pass AAA.
- `fg-muted` on `bg`: light 6.8:1, dark 6.1:1 — both pass AA.
- `accent` on `bg`: light 4.6:1, dark 5.4:1 — pass AA for non-text UI; for body text on accent backgrounds use `fg` not `accent`.

**Theme rules:**
- The accent saffron is the **only** chromatic color in the system. Borders, dividers, and surfaces are always neutral.
- Never use pure white (`#FFF`) as text on dark, or pure black (`#000`) on light. Off-whites and warm off-blacks read as crafted.
- No gradients except a single optional radial wash behind the hero (10% opacity max).
- No drop shadows in dark mode — use borders and `bg-elevated` instead.

### 4.3 Spacing scale

4px base, modular. Use in Tailwind via custom theme or just stick to default `0/0.5/1/2/3/4/6/8/10/12/16/20/24/32/40/48/64`.

Section vertical rhythm:
- Mobile: 96px (top/bottom of major sections)
- Desktop: 160px

Container max-width: **1140px**, centered, with a 24-32px gutter. The site should feel calm — never edge-to-edge content blocks except for full-bleed imagery.

### 4.4 Radius

Tight. Senior engineering aesthetic favors small radii.

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 4px | Buttons, inputs, tags |
| `radius-md` | 8px | Cards |
| `radius-lg` | 12px | Modals, large surfaces |
| `radius-full` | 9999px | Pills, avatars |

Never use 16px+ rounded corners. They read consumer-app, not engineer.

### 4.5 Elevation

| Token | Light | Dark |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(20,18,12,0.06)` | none — use border |
| `shadow-md` | `0 4px 12px rgba(20,18,12,0.08)` | none — use border + `bg-elevated` |
| `shadow-lg` | `0 12px 32px rgba(20,18,12,0.12)` | `0 12px 32px rgba(0,0,0,0.4)` (only for modals) |

In dark mode, prefer borders over shadows. Real materials don't glow.

### 4.6 Motion

| Token | Value |
|---|---|
| `duration-fast` | 150ms |
| `duration-base` | 250ms |
| `duration-slow` | 450ms |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` (snappy, decelerating) |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |

Principles:
- **Hover**: 150ms, color/opacity only. No scale transforms on cards (consumer-app tic).
- **Page transitions**: 250ms fade + 8px Y translate. Use `view-transition-name` if shipping in modern browsers.
- **Scroll-driven**: subtle. Reveal at 0.95 threshold, 16px Y offset, 350ms ease-out. Once per element.
- **Avoid**: parallax on the hero, Locomotive Scroll smoothing (kills accessibility and Core Web Vitals), bouncy easing.

### 4.7 Grid

12-column desktop (1024px+), 6-column tablet, 4-column mobile. 24px gutters. Use CSS Grid via Tailwind `grid-cols-12` only inside the 1140px container — outside that, single column with vertical rhythm.

---

## 5. Section-by-Section Recommendations

Order matters. The current order is hero → about → visual design → web work → testimonials → contact. The proposed order optimizes for an engineering manager skim:

> hero → selected work (web) → selected work (visual/branding) → about → writing → contact

About after work, not before. Show, then tell.

### 5.1 Global navigation
**Current:** HT. / HOME / ABOUT / PROJECTS / REVIEWS / BLOGS / LEAVE A REVIEW / Hire Me.

**Proposed:** `Habib Tanwir` (logotype, left) / `Work · About · Writing · Contact` (right) / theme toggle.

- Drop "Reviews" and "Leave a Review" — move to a `/clients` page if needed.
- Drop "Hire Me" CTA from nav — replace with a single email link in the hero and footer.
- Sticky on scroll, with a subtle backdrop-blur and bottom border that appears after 80px scroll.
- Theme toggle as an inline `<button>` with a small sun/moon SVG (12px). Place it in the nav, far right.

### 5.2 Hero

**Layout:** left-aligned, single column inside the 1140px container. No image. Whitespace is the hero.

**Copy** (replacement for "I Build Digital Experiences."):

```
Habib Tanwir
Engineer & designer. I build AI-powered SaaS
products and the brand identity they ship with.
Currently freelance, based in Silchar, India.

→ See work    → Get in touch
```

- Display headline = name (`display-2xl`, Instrument Serif).
- Subhead = the two sentences of positioning (`text-xl`, Inter, `fg-muted`).
- Two text-only links separated by an em-dash, accent saffron arrows. No buttons in the hero.
- A single line of `mono-xs` above the name: `01 / Currently building Quizllo + dr-abdus-sahid` (use real, shipped, recent work — not "AVAILABLE FOR NEW PROJECTS").

**Reasoning:** the current hero is loud and generic. The proposed hero is quiet and specific. Specificity is what reads as senior.

### 5.3 Selected Work (web/product)

Section eyebrow: `02 / SELECTED WORK`.

**Card pattern (one per row on desktop, stacked mobile):**
```
[Year]    [Project Name]                    [→]
[Tech stack mono tags]
[1-2 sentence description with concrete metric]
[Optional: small image, full-bleed inside card, 16:9]
```

- 4-6 projects max. Quality over quantity.
- Each card links to a dedicated `/work/{slug}` case-study page (P1 work, see roadmap).
- Tech tags in JetBrains Mono, separated by `·` (middle dot), colored `fg-subtle`.
- Hover state: card border becomes `border-strong`, year and arrow shift to `accent`. No transform.

**Project copy upgrade — example for ImageStudioLab:**

> Current: "ImageStudioLab: AI-Powered Brand Identity & Asset Studio."
> Proposed: "An AI-powered brand identity studio. Generates logo systems, color palettes, and asset variations in under 30 seconds. Built with Next.js, Supabase, and a custom prompt-routing layer over GPT-4 and Flux."

State what it does, who it's for, the technically interesting bit, and one number.

### 5.4 Selected Work (visual / AI design)

Keep the drag-to-explore horizontal scroll — it's a memorable interaction and shows the design-engineer hybrid skill.

Refinements:
- Eyebrow: `03 / VISUAL & AI DESIGN`.
- Section intro, one sentence: "Posters, brand systems, and AI compositing work. Some commissioned, some experiments."
- Limit to 8-10 pieces, your strongest. The current set has the right energy.
- Each tile gets a `mono-xs` tag (`POSTER` / `BRANDING` / `AI COMPOSITE`) and a project title. No descriptions in-line; reveal on click/tap into a lightbox with 1-2 sentence context.
- Drag affordance: small `mono-xs` "drag →" indicator below the carousel, fades after first interaction.

### 5.5 About

Section eyebrow: `04 / ABOUT`.

**Layout:** two-column on desktop. Left = portrait photo (square, ~480x480, slight grain treatment for editorial feel). Right = three short paragraphs + meta block.

**Copy** (replaces "Building things that matter."):

```
I'm Habib. I write code and design things.

For the past two years I've been building AI-powered
SaaS — most recently a quiz platform (Quizllo), a
dental AI receptionist, and identity systems for
clinics and studios in Silchar.

I work mostly in TypeScript, Next.js, React Native,
and Supabase. I also design — logos, posters, the
occasional editorial composite. The two skills
share more than people think: both are about
deciding what to leave out.

Outside of code: cricket, photography, family.
```

**Meta block** (mono-sm, two columns):
```
NOW       Building Quizllo
LOCATION  Silchar, IN
STACK     Next.js · TypeScript · Supabase · React Native
WRITING   /writing
ELSEWHERE GitHub · LinkedIn · X · Email
```

**Drop the four-stat tiles** ("20+ projects, 62 repos, 2+ years, 11+ technologies"). Numbers under 5 hurt seniority framing. If you want quantified credibility, use it inline ("~700 commits in the last year") or in the case studies.

### 5.6 Writing (new section, P1)

Section eyebrow: `05 / WRITING`.

Even 3 essays on technical decisions you've made (e.g., "Why I switched from Firebase to Supabase mid-project," "Building a prompt-routing layer for ImageStudioLab," "What I learned shipping a dental AI receptionist") would shift the seniority signal more than any visual change.

**Card pattern:**
```
[Date · mono-xs]
[Title — display-lg]
[1-line dek — text-md, fg-muted]
```

If empty at launch, replace with `Coming soon — first essays late 2026.` and remove from nav until ready. **Don't ship a blog with one post and a "lorem ipsum" placeholder.**

### 5.7 Testimonials — drop or rebuild

Current implementation (initials-only, generic quotes) reads as fabricated whether or not it is. Two options:

1. **Drop entirely.** Move client logos to a small "Trusted by" strip in the footer if you have real client names (e.g., dr-abdus-sahid, dreamdesign-silchar).
2. **Rebuild with real quotes** + names + photos + LinkedIn links to verify. One quote, prominently. Not a carousel of three.

Recommended: option 1 for launch, option 2 once you have real, attributable quotes.

### 5.8 Contact / footer

Section eyebrow: `06 / CONTACT`.

**Layout:** centered, generous vertical padding, `display-xl` headline.

```
Let's talk.
habibtanwir1906@gmail.com

Open to senior IC roles, founding-engineer
opportunities, and selected freelance projects.
```

- Email is the link. No form. (Forms imply lead-gen funnel; senior engineer sites use email.)
- Below: a thin divider, then a footer row in `mono-sm`:
  ```
  HT     ©2026     GITHUB · LINKEDIN · X · READ.CV     ↑ TOP
  ```
- "Read.cv" or your résumé PDF link is more useful than another social.

---

## 6. Voice & Copy Guidelines

The biggest cheap win is the rewrite. Two rules:

**Rule 1: Strong nouns, weak adjectives.**
- ❌ "Category-defining digital experiences"
- ✅ "AI-powered SaaS products"

**Rule 2: One specific number beats five superlatives.**
- ❌ "Every pixel and line of code is an opportunity to craft a category-defining digital experience"
- ✅ "Shipped 9 production projects in 18 months. ~700 commits last year."

Forbidden phrases (from current site, replace all instances): *category-defining, obsesses over, gap between good enough and exceptional, every pixel, polished mobile apps* (just say "mobile apps"), *crafts*, *cinematic* (used 4× in extracted copy).

Allowed personality moves: dry humor in microcopy, parenthetical asides in About, naming projects by their internal nicknames in case studies.

---

## 7. Accessibility (WCAG 2.2 AA, with AAA where reasonable)

| Requirement | Spec |
|---|---|
| Color contrast | All text ≥ 4.5:1 against bg; large text ≥ 3:1; non-text UI ≥ 3:1. Verified above. |
| Focus states | 2px solid `accent` outline with 2px offset, `radius-sm`. Never `outline: none` without replacement. |
| Keyboard navigation | Full tab order, skip-to-content link as first focusable, all interactive carousels accept arrow keys + space/enter. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables scroll-driven reveals and the drag-carousel auto-advance; respects user preference. |
| Theme | Use `prefers-color-scheme` for first paint; persist user toggle in `localStorage`. Avoid theme flash with a blocking script in `<head>`. |
| Alt text | Every project image has a description, not the project title duplicated. |
| Headings | Single H1 per page (the hero name). Strict H2 → H3 hierarchy. No skipping levels for visual reasons. |
| Forms | None on the site. Email link is `mailto:` with subject prefilled. |
| Language | `<html lang="en">`. |
| Touch targets | ≥ 44×44px on mobile. |

---

## 8. Performance (Core Web Vitals)

Targets at p75 mobile (4G):

| Metric | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 150ms |
| CLS | < 0.05 |
| TBT | < 150ms |
| Total transfer (homepage) | < 800KB |

Implementation:
- Next.js App Router with `next/font` (already in use).
- Hero is text-only — LCP element will be the hero headline. Should hit < 1.0s.
- Project images: `next/image` with explicit width/height, AVIF + WebP, `priority` on first 2 cards, lazy on rest. Aspect ratio reserved (no CLS).
- Carousel: lazy-mount via `next/dynamic` with `ssr: false` only if it ships heavy client JS. Otherwise inline.
- Self-host fonts via `next/font/google` to avoid third-party connection.
- Avoid Locomotive Scroll, Lenis, or any smooth-scroll library — they tank INP and accessibility.
- Run Lighthouse and PageSpeed Insights pre-launch. All categories ≥ 95.

---

## 9. SEO & metadata

- `<title>` formula: `Habib Tanwir — Engineer & Designer` (homepage), `{Project} — Habib Tanwir` (case studies).
- Meta description: pull positioning statement, ≤ 155 chars.
- OG image: regenerate to match new design — Instrument Serif name, saffron accent dot, `bg-elevated` background. 1200×630.
- JSON-LD: `Person` schema with `name`, `url`, `sameAs` (GitHub, LinkedIn, X), `jobTitle`, `address.addressLocality`. Already partially in place; verify.
- Sitemap and robots.txt — Next.js can generate via `app/sitemap.ts` and `app/robots.ts`.
- Per-project case study pages get their own OG images using the project's hero shot + title overlay.

---

## 10. Tech stack & implementation (Next.js + Tailwind)

### 10.1 Stack
- **Next.js 15** (App Router, RSC default). You're already on Next — keep it.
- **Tailwind CSS 4** with custom theme tokens mapped to the design system (see 10.2).
- **next/font** for Instrument Serif, Inter, JetBrains Mono.
- **Framer Motion** for the few motion moments (hero subtle entrance, theme toggle icon swap). Keep imports tree-shaken.
- **MDX** for case studies and writing — `@next/mdx` or `contentlayer2`.
- **next-themes** for theme persistence (handles SSR flash correctly).
- **Vercel** for hosting (you already are, presumably). Image optimization for free.
- Optional: **Velite** if you want type-safe content with frontmatter validation; **Astro** if you want zero-JS by default — but Next is fine.

### 10.2 Tailwind config (essence)

```ts
// tailwind.config.ts excerpt
export default {
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--bg-elevated) / <alpha-value>)',
        // ...all tokens via CSS variables
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1' }],
        'display-xl':  ['clamp(2.75rem, 5vw, 4.5rem)', { lineHeight: '1.05' }],
        'display-lg':  ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1' }],
        // ...
      },
      maxWidth: { container: '1140px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
};
```

CSS variables in `globals.css` flip per `[data-theme="dark"]` attribute, set by `next-themes`.

### 10.3 Folder structure
```
app/
  (marketing)/
    page.tsx              # home
    work/[slug]/page.tsx  # case study
    writing/[slug]/page.tsx
  api/og/route.tsx        # dynamic OG images
content/
  work/*.mdx
  writing/*.mdx
components/
  hero.tsx
  project-card.tsx
  visual-carousel.tsx
  theme-toggle.tsx
  nav.tsx
  footer.tsx
lib/
  fonts.ts
  metadata.ts
styles/
  globals.css             # token definitions, both themes
```

### 10.4 Theme toggle implementation note
Use `next-themes` with `attribute="data-theme"` and `defaultTheme="system"`. Inline a tiny synchronous script in `<head>` (Next supports via `Script` strategy `beforeInteractive`) to set the attribute before paint and avoid the flash-of-wrong-theme that's currently happening on many sites in this category.

---

## 11. Implementation Roadmap

Effort estimates assume part-time evenings/weekends. Adjust to your pace.

### P0 — Must ship (1–2 weeks)
| # | Task | Effort |
|---|---|---|
| 1 | Set up token system: Tailwind config, CSS variables for both themes, `next-themes` toggle | 0.5d |
| 2 | Swap fonts to Instrument Serif + Inter + JetBrains Mono via `next/font` | 1h |
| 3 | Rebuild Hero with new copy, layout, mono eyebrow | 0.5d |
| 4 | Rebuild Nav (slim, theme toggle, drop Hire/Reviews) | 0.5d |
| 5 | Rebuild About section with new copy + meta block, drop stat tiles | 0.5d |
| 6 | Rebuild Footer with mono row | 0.25d |
| 7 | Rewrite project cards: tech-tag mono pattern, hover states, copy upgrade | 1d |
| 8 | Drop testimonials section (or strip to one real quote) | 0.25d |
| 9 | Verify accessibility: focus rings, contrast, keyboard nav, reduced motion | 0.5d |
| 10 | Generate new OG image | 0.5h |
| **Total P0** | | **~5 days** |

### P1 — Strong follow-up (2–3 weeks)
| # | Task | Effort |
|---|---|---|
| 11 | Build per-project case-study pages (`/work/{slug}`) with MDX, hero shot, problem/approach/decisions/outcome structure | 2-3d |
| 12 | Refine Visual Design carousel: drag affordance, keyboard arrows, lightbox with 1-2 sentence context, better mobile UX | 1d |
| 13 | Write 2-3 case studies (ImageStudioLab, IntegratePDF, Quizllo) — ~600-800 words each with diagrams | 3-5d |
| 14 | Per-project OG images via `app/api/og` | 0.5d |
| 15 | `/uses` page (stack, tools, hardware) — engineer-audience catnip | 0.5d |
| 16 | Performance pass — Lighthouse 95+ across categories | 0.5d |

### P2 — Polish (ongoing)
| # | Task | Effort |
|---|---|---|
| 17 | Writing section with 3-5 essays | 5-10d (writing dominates) |
| 18 | View-transitions API for nav between pages | 0.5d |
| 19 | Subtle scroll-driven reveals on case-study pages (respecting reduced-motion) | 0.5d |
| 20 | RSS feed for writing | 0.25d |
| 21 | Newsletter signup (optional, only if you'll send it) | 1d |

---

## 12. Acceptance criteria

The redesign ships when:

- [ ] Both themes are present, contrast verified, no theme-flash on first paint.
- [ ] Hero, About, Work cards, Footer all use new typography and copy.
- [ ] Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO (mobile and desktop).
- [ ] Zero console errors. Zero CLS-causing image loads.
- [ ] Keyboard-only navigation reaches every interactive element with visible focus.
- [ ] At least one real case-study page is live (linked from a project card) at launch.
- [ ] No fabricated testimonials or placeholder lorem.
- [ ] Forbidden phrases (section 6) absent from the codebase.
- [ ] OG image renders correctly when the URL is shared on X, LinkedIn, Slack.

---

## 13. Open questions for Habib

1. **Resume.** Public PDF, Read.cv, or no public resume? Affects footer link.
2. **Testimonials.** Are the current ones real? If yes, can we get full names + LinkedIn links + photos? If no, drop.
3. **Writing commitment.** Are you ready to ship 3 essays in the first month? Otherwise hide the section until you are.
4. **Indian heritage cues.** The saffron accent is a soft nod. Want it stronger (e.g., a Devanagari ligature in the wordmark, a reference to Silchar in the about), or kept this subtle?
5. **Domain.** `habibfolio.tech` is fine but `habibtanwir.com` (or `.dev`) reads more professional. Worth a switch when you redesign.

---

## Appendix A — Token reference card

```css
/* globals.css */
:root, [data-theme="light"] {
  --bg: 250 250 247;
  --bg-elevated: 255 255 255;
  --bg-subtle: 242 241 236;
  --bg-muted: 233 231 224;
  --border: 225 222 213;
  --border-strong: 199 194 182;
  --fg: 26 26 26;
  --fg-muted: 92 90 85;
  --fg-subtle: 138 135 128;
  --accent: 224 122 41;
  --accent-hover: 200 101 26;
  --accent-subtle: 251 230 210;
}

[data-theme="dark"] {
  --bg: 14 14 12;
  --bg-elevated: 22 22 19;
  --bg-subtle: 30 29 26;
  --bg-muted: 42 41 37;
  --border: 45 44 40;
  --border-strong: 69 67 64;
  --fg: 245 244 240;
  --fg-muted: 168 165 158;
  --fg-subtle: 115 112 106;
  --accent: 240 138 58;
  --accent-hover: 255 157 77;
  --accent-subtle: 58 37 22;
}
```

---

*End of PRD. See companion file `style-guide.html` for a visual reference of the system in both themes.*
