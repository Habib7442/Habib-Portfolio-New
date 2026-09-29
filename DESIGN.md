> **Superseded.** This "Coral & Teal" palette was never actually shipped — the
> live code had drifted to a different cream/saffron system instead (see
> `context/ui-context.md`, also superseded). Both were replaced in the current
> rebuild by the "Obsidian" system described in `context/progress-tracker.md`.
> The structural principles here (work first, one accent, earned motion, no
> template tells) still hold — only the specific tokens changed. Kept for history.

# DESIGN.md — Portfolio Redesign

**Owner:** Habib Tanwir
**Site:** habibfolio.tech
**Audience:** Global clients (US / Europe primary), who will hire without ever meeting me
**Goal:** Show my visual work — landing page designs, photo edits, poster designs — as the star, and convert international visitors into paying clients.

---

## 1. The one-line brief

A **bright, playful-but-premium, work-first** portfolio. Light (but not cream/white/paper) background, one bold signature color, and a lively collage hero. The site chrome stays energetic; my colorful work carries the rest.

The old site (dark, text-heavy, amber accent, "01 / 02 / 03" numbering) is being replaced because it hid the work and read as a template. This flips both problems: bright, and work-first.

---

## 2. Color palette — **Coral & Teal** (locked)

Chosen for being distinctive, undeniably bright, and calm enough to let colorful posters pop against it. Blue-tinted alternates are noted below if I ever want to lean more corporate.

| Role | Hex | Use |
|------|-----|-----|
| Base | `#E6FAF5` | Page background — a pale aqua-mint tint. This is the "unique" base, not white. |
| Ink (text) | `#10302E` | Almost all text; deep teal-black, warmer than pure black. |
| Primary accent | `#0FA3A3` | Deep teal — buttons, links, active filter tab, key highlights. |
| Secondary accent | `#FF5A4D` | Hot coral — used sparingly for one standout element per section. |
| Pop | `#FFC833` | Sunny yellow — tiny highlights only (a tag, a star, an underline). |

**The 85% rule:** base + ink cover ~85% of the page. Accents appear only on interactive elements and small highlights. Restraint is what separates "designed" from "rainbow."

**Alternate palettes** (swap the tokens, keep everything else):
- *Lilac Pop* — base `#EFE9FF`, accent `#6D28D9`, secondary `#B6F500`, ink `#1E1B2E`. More playful.
- *Electric Blue & Peach* — base `#EAF1FF`, accent `#2563FF`, secondary `#FFB088`, ink `#0B1B3A`. More corporate-safe / trust-forward for global clients.

---

## 3. Typography

Two families, clearly distinct:

- **Headlines:** a bold, chunky, condensed-ish sans (e.g. *Clash Display*, *Space Grotesk*, or *Satoshi Bold*). This is the personality of the page — big and confident, like the references. Used as an active design element, not just a label.
- **Body / UI:** a clean, neutral sans (e.g. *Inter* or *General Sans*). Highly legible for international readers.

Rules:
- Sentence case for headings, not ALL CAPS.
- Don't accent a single word in a headline with a different color — treat the whole line as one design object.
- Body line length under ~75 characters.

---

## 4. Layout — section by section

Left-aligned by default (easier to read for global audiences); the hero can center.

```
┌─────────────────────────────────────────┐
│  Habib Tanwir            Work  About  ↗ │  ← minimal nav
├─────────────────────────────────────────┤
│  BIG HEADLINE          [ collage of     │
│  one-line pitch          poster/edit    │  ← HERO
│  [ See my work ]         thumbnails ]   │
├─────────────────────────────────────────┤
│  [ All | Landing Pages | Edits | Posters ] │ ← filter tabs
│  ┌────┐ ┌──────┐ ┌────┐                   │
│  │    │ │      │ │    │   masonry grid    │  ← WORK (the core)
│  └────┘ └──────┘ └────┘   (uneven heights)│
├─────────────────────────────────────────┤
│  2–3 mini case studies: brief → result   │  ← PROOF
├─────────────────────────────────────────┤
│  Short about + tools                      │  ← ABOUT
├─────────────────────────────────────────┤
│  "Let's build something bright" + contact │  ← CTA
└─────────────────────────────────────────┘
```

**Hero:** a lively collage of my best poster/edit thumbnails arranged around my name and a plain-English one-liner (e.g. "I design landing pages, edits & posters that people actually stop for."). Shows range in the first 3 seconds. One primary button.

**Work (most important):**
- Filter tabs: **All / Landing Pages / Photo Edits / Posters** — one click filters the grid.
- **Masonry grid** (uneven heights) so wide landing-page shots, square edits, and tall posters all fit without ugly cropping.
- Hover: tile lifts slightly, shows project name. Subtle, not on every card doing five things.
- **Photo edits get a before/after drag slider** — huge trust-builder for edit work.

**Proof — 2–3 mini case studies:** brief → what I made → result. For landing pages, lead with an outcome ("lifted signups 32%"). This is what makes a global client pay well instead of haggling.

**About:** short, confident, plain English. Tools shown as a simple clean list, not a long tracked-caps skills bar.

**Contact CTA:** bright strip. Email `hello@habibfolio.tech`, LinkedIn, GitHub, WhatsApp.

---

## 5. Design principles

1. **Work first, chrome second.** If a decoration competes with a thumbnail, cut it.
2. **Spend boldness in one place per section.** One coral element, everything else quiet.
3. **Motion is earned, not scattered.** One nice page-load reveal in the hero; hover feedback on tiles. No fade-up on every section.
4. **Rounded, slightly playful shapes — with restraint.** Soft corners, maybe one sticker-ish tag. Too much = amateur.
5. **No template tells.** No "01 / 02 / 03" numbering, no tracked-out ALL-CAPS eyebrows, no near-black background, no amber-on-dark.

---

## 6. Global-client trust layer (don't skip)

Because buyers are remote and won't meet me:
- **Results next to visuals**, not just pretty pictures — especially for landing pages.
- **Crisp, simple, confident English** copy. No jargon.
- **Fast + mobile-perfect.** Global clients often open the link on a phone first. Keep it light; content visible within ~1 second.
- **Clear hierarchy:** Name → what I do → work → proof → contact. Recruiters/clients scan in ~7 seconds.

---

## 7. Content checklist (gather before building)

- [ ] 8–12 best work pieces, tagged by category (landing / edit / poster), high-res
- [ ] 2–3 pieces with a real outcome or brief for case studies
- [ ] Before/after pairs for photo edits
- [ ] Final one-liner pitch
- [ ] Short about paragraph
- [ ] Tools list
- [ ] Links: email, LinkedIn, GitHub, WhatsApp

---

## 8. Stack (my call)

Next.js + Tailwind (tokens above as CSS variables) + Framer Motion for the single hero reveal and hover states. Deploy on Vercel. Optimize images (next/image), lazy-load the grid.