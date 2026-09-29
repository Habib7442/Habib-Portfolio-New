# Implementation Prompt: Hero Section Redesign

## Goal
Redesign the Hero section of **habibfolio.tech** into a bright, playful-but-premium, work-first hero featuring a lively collage of visual work thumbnails (landing pages, photo edits, posters), bold display typography, high-impact value proposition, and conversion-focused CTAs, strictly adhering to the Coral & Teal palette locked in `DESIGN.md` and inspired by the user's reference board.

---

## References Read
- `AGENTS.md` (Role, 10-step workflow, invariants, tech stack)
- `DESIGN.md` (Coral & Teal palette, typography, hero collage concept, 85% rule, design principles, global-client trust layer)
- `context/architecture.md` (Layer boundaries, zero CLS, semantic HTML)
- `context/code-standards.md` (Strict TypeScript, token usage, performance)
- `context/ui-context.md` (Theme tokens, spacing, typography)
- User's reference board: Modern, energetic e-commerce & portfolio hero collage featuring staggered cards, preview thumbnails, sticker badges ("⭐ 4.9", "High-Converting", "Landing Pages"), and punchy headline layout.

---

## Existing Code Inspected
- `components/sections/Hero.tsx` (Outdated headline with forbidden "01 / BUILDING HIGH-PERFORMANCE..." eyebrow, missing visual collage).
- `app/page.tsx` (Hero invocation and data passing).
- `app/layout.tsx` (Font loading and theme setup).
- `app/globals.css` (CSS variables and theme tokens).
- `public/projects/` and `public/ads/` (Available real image assets: `imagestudiolab.png`, `integrate-pdf.png`, `link4coders.png`, `sneaker store/1-p.png`, `kolkin-coffee/1-p.png`, `watch-house/1-p.png`).

---

## Decisions & Assumptions
1. **Scope Restriction:** Scope strictly to the **Hero Section** only, as requested by the user ("now design only hero section ok").
2. **Coral & Teal Tokens:** Apply the locked palette tokens for the hero:
   - Base (`#E6FAF5` aqua-mint tint background for the hero)
   - Ink (`#10302E` deep teal-black text)
   - Primary Accent (`#0FA3A3` deep teal for primary CTA button and active tags)
   - Secondary Accent (`#FF5A4D` hot coral for the single standout badge/accent)
   - Pop (`#FFC833` sunny yellow for micro-highlights: star rating, badge glow)
3. **Typography:** Load and integrate `Space_Grotesk` (bold display sans) from `next/font/google` for the chunky hero headline, paired with `Inter` for clean body copy and `JetBrains Mono` for meta tags.
4. **Hero Collage Composition (Desktop & Mobile):**
   - **Left Column:**
     - Availability/trust pill: Live pulse dot + "Available for remote contracts & design systems" + Hot coral badge.
     - Headline: Expressive, bold sentence-case headline ("I design landing pages, photo edits & posters that people stop for.")
     - Subtitle: Clear value prop ("Full-stack engineer with a designer's eye. Crafting high-converting digital interfaces and AI software.")
     - Actions: Primary CTA ("See My Work" linking to `#work`) + Secondary ghost CTA ("Let's Talk" linking to `#contact`).
     - Social Proof / Trust Mini-Strip: Rating badge ("⭐ 5.0 / 50+ projects shipped for US & EU clients") with avatar thumbnails.
   - **Right Column (Lively Visual Collage):**
     - Staggered, slightly angled cards with rounded corners (`rounded-2xl`), subtle borders, and soft shadows:
       1. **Featured Landing Page Card** (e.g. `ImageStudioLab` or `Link4Coders` screenshot) with category badge ("Landing Page").
       2. **Creative Poster Card** (e.g. Sneaker / Coffee poster ad) angled with a playful tilt (`rotate-2`), with tag ("Poster Design").
       3. **Photo Edit / AI Visual Card** with comparison/grading badge ("Photo Edit").
       4. **Floating Pop Sticker / Stat Pill** in sunny yellow (`#FFC833` / `#10302E`) emphasizing measurable outcome ("+34% Conversion Lift").
5. **Motion:** Single coordinated load reveal using Framer Motion (fade + slight y-translate, 0.5s duration) with smooth spring-like feel. Subtle hover-lift (`-translate-y-1`) on individual collage cards.

---

## Files to Modify / Create
- **[MODIFY]** `components/sections/Hero.tsx`: Complete overhaul into the lively visual collage hero.
- **[MODIFY]** `app/layout.tsx`: Add `Space_Grotesk` Google Font for bold display typography.
- **[MODIFY]** `app/globals.css`: Define and integrate Coral & Teal tokens (`--color-base`, `--color-ink`, `--color-teal`, `--color-coral`, `--color-yellow`).

---

## Design & UI Specifications
- **Background:** `#E6FAF5` base with subtle ambient gradient glow.
- **Spacing:** `pt-28 pb-16 lg:pt-36 lg:pb-24` with `max-w-7xl` container.
- **Grid Layout:** 2-column responsive layout (`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`).
  - Left column: `lg:col-span-6`
  - Right column: `lg:col-span-6`
- **Breakpoints:**
  - Mobile (< 768px): Stacked layout with headline first, CTA buttons, and a responsive swipeable or multi-card preview grid.
  - Desktop (>= 1024px): Full floating collage with overlapping cards, micro-stickers, and subtle interactive tilts.

---

## Security & Performance Requirements
- Optimized Next.js `next/image` with `sizes` and `priority` on above-the-fold hero imagery to prevent CLS.
- Accessible semantic markup: single `h1`, accessible interactive buttons with focus rings.
- Zero layout shift during font hydration (`display: "swap"`).

---

## Acceptance Criteria
- [ ] Headline reads naturally in sentence case without generic buzzwords or "01 / 02" numbering.
- [ ] Coral & Teal color system is strictly applied with the 85% rule (Base + Ink dominant, Teal primary, Coral standout, Yellow pop).
- [ ] Right-side visual collage showcases real thumbnails of landing pages, photo edits, and posters.
- [ ] Micro-stickers and trust indicators ("⭐ 5.0", "+34% Conversion") present without cluttering.
- [ ] Flawless responsive behavior across mobile (375px) and desktop (1280px+).
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npm run build` compiles with 0 errors.

---

## Checks to Run
- `npm run lint`
- `npm run build`
- `npm run dev` with browser inspection of `/`

---

## Manual Test Steps
1. Navigate to `http://localhost:3000/`.
2. Verify hero loads with lively, staggered visual cards matching the reference aesthetic.
3. Check contrast and readability of headline, body copy, and CTA buttons.
4. Hover over collage cards to verify subtle lift interaction.
5. Test responsive resizing from mobile viewport (375px) to desktop (1440px).
