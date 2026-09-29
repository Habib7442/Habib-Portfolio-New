# Implementation Prompt: Aeline-Inspired Sky Gradient Hero Section

## Goal
Design and implement an exact match of the modern "Aeline" reference design provided by the user: a rich sky-blue gradient hero section with integrated floating pill navigation, bold white display typography, Habib's portrait blending seamlessly into the atmosphere, an electric lime pill CTA button with arrow icon, client rating social proof, and a bottom row of floating bento preview cards.

---

## References Read
- User's reference screenshot ("Aeline" hero section with vibrant sky gradient, floating top navigation, bold left headline, portrait on the right, and bottom row of bento cards).
- `AGENTS.md` (Workflow, standards, tech stack).
- `DESIGN.md` & `context/ui-context.md`.
- `public/habib.png` (Real portrait asset in suit).
- `public/projects/` & `public/ads/` (Project imagery for bento cards).

---

## Existing Code Inspected
- `components/sections/Hero.tsx`
- `components/layout/Navbar.tsx`
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`

---

## Decisions & Assumptions
1. **Hero Visual Style**:
   - Outer container with large rounded bottom corners (`rounded-b-[40px] md:rounded-b-[56px]`) and rich azure-to-sky gradient (`from-[#1470D2] via-[#2188E8] to-[#4AA5F4]`) with subtle atmospheric radiance.
   - **Embedded Floating Navigation Bar**:
     - Logo + "Habib Tanwir" in crisp white sans.
     - Centered links: "Home", "Work", "Services", "About", "Blog".
     - Standout electric lime CTA button (`#D4F754` / `#C8FF2E`) with dark text: "Let's Talk".
   - **Left Column**:
     - Headline: "Building the future with code and design" (in bold white sans).
     - Subtitle: "I help global startups and teams build high-performance AI SaaS, high-converting landing pages, and memorable brand visuals."
     - Electric lime pill button (`bg-[#D4F754] text-black font-semibold px-6 py-3.5 rounded-full`) with circular black arrow icon `↗`.
     - Social Proof: "Rated 5.0/5 by 50+ global clients" with 5 yellow stars ★★★★★.
   - **Right Column**:
     - Habib's portrait (`/habib.png`), masked with smooth bottom/side fade into the sky gradient.
   - **Bottom Floating Bento Cards Row**:
     - 5 interactive cards overlapping the bottom curve of the hero:
       1. **Tag Cloud Card**: White pill tags ("Full-Stack", "AI-Native", "Next.js", "Design Systems") + "Projects: 50+".
       2. **Project Outcome Card**: Featuring ImageStudioLab with "Conv. Lift: +32%", "Speed: 99".
       3. **Dark Expertise Card**: Black background with neon green pulse dot: "Expertise that Combines Full-Stack Engineering, AI, and Visual Design".
       4. **Performance Metric Card**: Clean white card with "Lighthouse: 100/100", progress indicator, and performance metrics.
       5. **Status Pill Card**: Soft gradient background with floating badges ("Calendar: Available", "100% Remote US/EU").
2. **Component Integration**:
   - Replace the current hero in `components/sections/Hero.tsx` with this Aeline-style layout.
   - When Hero is rendered on the homepage, hide or merge the duplicate top navbar so the hero's sleek top navigation bar is the primary header on initial view.

---

## Files to Modify / Create
- **[MODIFY]** `components/sections/Hero.tsx`: Implement the exact Aeline-style sky gradient hero and bottom bento cards.
- **[MODIFY]** `components/layout/Navbar.tsx`: Ensure theme and smooth scroll integration.

---

## Security & Performance Requirements
- Optimized images with `next/image`, proper `sizes`, and `priority` for the portrait.
- Accessible heading structure (`h1`), high-contrast text on blue background (white on `#1877F2` passes WCAG AA).
- Responsive down to 375px mobile screen.

---

## Acceptance Criteria
- [ ] Vibrant sky-blue atmospheric gradient hero container with rounded bottom corners.
- [ ] Integrated floating top navbar with logo, nav links, and lime pill button.
- [ ] Left column headline, subtitle, electric lime CTA button with circular arrow, and 5-star rating.
- [ ] Right column portrait of Habib smoothly integrated into the sky backdrop.
- [ ] Row of 5 bento cards along the bottom matching the reference layout.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npm run build` compiles cleanly.

---

## Checks to Run
- `npm run lint`
- `npm run build`
- `npm run dev` with browser inspection

---

## Manual Test Steps
1. Open `http://localhost:3000/`.
2. Verify sky gradient hero matching the Aeline reference image.
3. Check portrait integration, typography, and electric lime CTA.
4. Verify all 5 bottom bento cards render with crisp layout.
5. Check responsive behavior on mobile and desktop.
