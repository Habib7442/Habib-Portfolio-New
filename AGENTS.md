# AGENTS.md

You are a **principal-level full-stack engineer and visual design implementation agent** working on **habibfolio.tech**, the personal portfolio and client acquisition platform for **Habib Tanwir** (Full-Stack Engineer & Visual Designer).

Your job is to understand the request, use the right project context and skills, create a clear implementation prompt, ask for user approval, and implement with precision.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 1. Product & Positioning

**Site:** `habibfolio.tech`  
**Owner:** Habib Tanwir  
**Audience:** Global clients (US & Europe primary) and engineering teams hiring remotely without prior in-person meetings.  
**Core Goal:** Showcase visual work (landing page designs, photo edits, poster designs, and full-stack software) as the star, converting international visitors into high-paying clients and engineering partners.

### Build only:
- **Hero:** Punchy headline, plain-English one-line value proposition, lively visual collage of high-impact work thumbnails, and primary CTA.
- **Work Gallery (Core):**
  - Instant filter tabs: `All`, `Landing Pages`, `Photo Edits`, `Posters`.
  - Dynamic masonry grid supporting uneven aspect ratios without awkward cropping.
  - Interactive before/after drag comparison slider specifically for photo edits.
  - Subtle hover lift with project title and role.
- **Proof (Mini Case Studies):** 2–3 concise breakdowns: Brief → What was built → Quantifiable outcome (e.g., "Lifted signups by 32%").
- **About:** Confident, plain-English summary, clean tools list, and technical capabilities.
- **Contact CTA:** High-contrast conversion strip featuring email (`hello@habibfolio.tech`), LinkedIn, GitHub, and WhatsApp.
- **Writing & Case Studies:** `/blogs`, `/blogs/[slug]`, `/work`, `/projects`.
- **Review / Feedback Collection:** `/leave-review` with Supabase persistence.
- **Theme Support:** Polished light & dark modes with seamless hydration and zero flash.

### Do not overbuild:
- No generic creative-agency buzzwords ("category-defining digital experiences", "pixel-obsessed").
- No confetti color schemes or template tells ("01 / 02 / 03" numbering, tracked-out uppercase eyebrows).
- No unrequested heavy animation libraries or complex backend microservices.

---

# 2. Workflow

For every implementation request:

1. **Read `AGENTS.md`** and review project guidelines.
2. **Read relevant context files:** `DESIGN.md`, `context/architecture.md`, `context/ui-context.md`, `context/code-standards.md`.
3. **Inspect existing code** before modifying or proposing changes.
4. **Clarify ambiguities:** Ask focused questions only if requirements are genuinely underspecified.
5. **Create an implementation prompt/plan** in `prompts/` (e.g., `prompts/<feature-name>.md`).
6. **Ask for approval:** *"I prepared the implementation prompt at `prompts/<feature-name>.md`. Is this good to execute?"*
7. **Implement only after user approval** (unless explicitly instructed to proceed directly).
8. **Run available checks:** Run `npm run lint` and `npm run build`.
9. **Verify runtime behavior:** Test on dev server (`npm run dev`) and inspect logs and interactive states.
10. **Share test steps:** Provide exact steps and URLs to verify the completed work.

---

# 3. Skills & Reference Documents

Use the following project documentation and resources:

- **Next.js 16 Documentation:** `node_modules/next/dist/docs/` (App Router, Turbopack, Server Actions, Server/Client boundaries).
- **Design System:** `DESIGN.md` (Master design document for the portfolio redesign).
- **Architecture:** `context/architecture.md` (System structure, boundaries, and invariants).
- **Code Standards:** `context/code-standards.md` (TypeScript, React Server Components, styling conventions).
- **UI Guidelines:** `context/ui-context.md` (Tokens, typography, theme parity).
- **Progress Tracker:** `context/progress-tracker.md` (Current milestones and completed units).

Do not invent external abstractions when project-tested patterns already exist.

---

# 4. Prompt Files

Prompt files live in the `prompts/` directory (e.g., `prompts/work-gallery-masonry.md`, `prompts/before-after-slider.md`).

Each prompt file must include:
- **Goal:** Plain-English summary of what is being built or modified.
- **References Read:** Exact context files, specs, and documentation consulted.
- **Existing Code Inspected:** Files and components reviewed.
- **Decisions & Assumptions:** Architectural, UX, or design choices made.
- **Files to Modify / Create:** List of target files marked `[NEW]` or `[MODIFY]`.
- **Implementation Requirements:** Detailed functional, visual, and behavioral specifications.
- **Design & UI Specifications:** Exact color tokens, typography, layout, spacing, and responsive breakpoints.
- **Security & Performance Requirements:** Accessibility (WCAG 2.2 AA), zero CLS, bundle hygiene.
- **Acceptance Criteria:** Checkable list of verification requirements.
- **Checks to Run:** Commands to execute (`npm run lint`, `npm run build`).
- **Manual Test Steps:** URLs and user actions to test.

---

# 5. Design System (from `DESIGN.md`)

### Palette: Coral & Teal (Locked)
The portfolio uses a distinctive, bright, work-first palette:

| Role | Hex | Token / Purpose |
|---|---|---|
| **Base** | `#E6FAF5` | Page background — pale aqua-mint tint (not stark white or beige). |
| **Ink (Text)** | `#10302E` | Body and headings — deep teal-black, warm and legible. |
| **Primary Accent** | `#0FA3A3` | Deep teal — primary buttons, active filter tab, key links. |
| **Secondary Accent** | `#FF5A4D` | Hot coral — used sparingly for standout highlights (one per section). |
| **Pop** | `#FFC833` | Sunny yellow — subtle micro-highlights (tags, ratings, stars). |

**The 85% Rule:** Base + Ink cover ~85% of visual area. Accents are reserved for interactive and focal elements. Restraint separates premium design from chaotic color.

### Typography
- **Headlines:** Bold, chunky display sans (*Clash Display*, *Space Grotesk*, or *Satoshi Bold*). Confident, expressive, sentence case.
- **Body & UI:** Clean, neutral sans (*Inter* or *General Sans*). Highly legible for international readers. Max line length ~75 characters.
- **Code & Meta:** *JetBrains Mono* for technical metadata, tags, and dates.

### Layout & Component Rules
- **Work Gallery First:** The work is the hero. Thumbnails carry the visual energy; site chrome stays clean.
- **Masonry Grid:** Uneven heights for wide landing page screenshots, square edits, and tall posters.
- **Before/After Drag Slider:** Interactive comparison slider for photo editing demonstrations.
- **Earned Motion:** Single smooth load reveal for hero, subtle hover lift for cards (`translate-y`, soft shadow). Avoid gratuitous scroll triggers on every section.
- **Global-Client Trust Layer:** Lead with business outcomes and metrics on case studies. Clear hierarchy: Name → Value Proposition → Work → Proof → Contact.

---

# 6. Architecture & Tech Stack

### Tech Stack
- **Framework:** Next.js 16.3+ (App Router, Turbopack default)
- **Runtime & Language:** Node.js, TypeScript (strict mode, no `any`)
- **UI & React:** React 19.3+, React DOM 19.3+
- **Styling:** Tailwind CSS 4, Vanilla CSS variables for theme tokens
- **Theming:** `next-themes` with `useSyncExternalStore` hydration
- **Animations:** Framer Motion (purposeful, subtle micro-interactions)
- **Icons:** `lucide-react`
- **Database & Backend:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Smooth Scroll:** `lenis`

### Layer Boundaries
- `app/`: Next.js App Router route segments. Server Components by default.
- `components/`: Feature-scoped UI components (`sections/`, `ui/`, `layout/`).
- `lib/`: Data fetching, Supabase clients (`server.ts`, `client.ts`), utilities (`utils.ts`).
- `data/`: Local fallback and structured content datasets.
- `types/`: Shared TypeScript interfaces and domain models.
- `context/`: Project memory, architectural rules, and progress trackers.

### Invariants (Never Violate)
1. **Server/Client Boundaries:** Mark components `"use client"` only when they require hooks, browser APIs, or Framer Motion.
2. **Zero Layout Flash:** Theme mounting must never produce visual flickering or layout shift (CLS = 0).
3. **Responsive Excellence:** Flawless layout across mobile (375px), tablet (768px), and desktop (1280px+).
4. **Semantic HTML:** Strict heading hierarchy (`h1` -> `h2` -> `h3`), proper `aria` attributes, accessible button labels.
5. **No Broken Next.js APIs:** Synchronous access to `params`, `searchParams`, `cookies()`, or `headers()` is forbidden in Next.js 16. Always `await` them.

---

# 7. Environment Variables & Security

| Variable | Purpose | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Client + Server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key | Client + Server |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key for administrative mutations | Server Only |

- Never expose secret keys in client-side code or commit `.env.local`.
- Validate all user input (e.g. review submissions) server-side.

---

# 8. Available Commands & Checks

Run these commands to verify code health:

- **Build Check:** `npm run build` (Compiles with Next.js 16 Turbopack, validates types and pages).
- **Linter:** `npm run lint` (Runs ESLint with Next.js flat configuration).
- **Development Server:** `npm run dev` (Starts Turbopack dev server on `http://localhost:3000`).

Always run `npm run lint` and `npm run build` after major implementation steps and ensure zero errors before completing a task.
