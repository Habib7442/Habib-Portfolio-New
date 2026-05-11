# Build Plan: Habibfolio Redesign

This plan decomposes the PRD into buildable units.

## Phase 0: Foundation (Must Ship)

### Unit 01: Design System & Tokens
- **Goal**: Implement color tokens, typography, and standard spacing in Tailwind and CSS variables.
- **Output**: Updated `tailwind.config.ts` and `globals.css`.

### Unit 02: Layout & Navigation
- **Goal**: Build the new slim nav with theme toggle and the global layout container.
- **Output**: `Nav` component and updated `layout.tsx`.

### Unit 03: Hero Section
- **Goal**: Implement the text-focused hero with new editorial typography and positioning.
- **Output**: `Hero` component.

### Unit 04: Project Cards (Web)
- **Goal**: Rebuild the project cards with technical tags, saffron arrows, and hover states.
- **Output**: `ProjectCard` component.

### Unit 05: About & Meta Section
- **Goal**: Implement the two-column about section with the technical meta block.
- **Output**: `About` component.

### Unit 06: Visual Design Carousel
- **Goal**: Refine the existing drag-carousel with new styling and typography.
- **Output**: Updated `VisualCarousel`.

### Unit 07: Footer & Contact
- **Goal**: Implement the simple "Let's talk" footer with mono-label social links.
- **Output**: `Footer` component.

## Phase 1: Content & Case Studies

### Unit 08: MDX Case Study System
- **Goal**: Set up `@next/mdx` and create the dynamic `/work/[slug]` route.
- **Output**: MDX configuration and `work/[slug]` page.

### Unit 09: Initial Case Studies
- **Goal**: Draft 2-3 real case studies with technical diagrams and rationale.
- **Output**: MDX files in `content/work/`.

## Phase 2: Polish & Performance

### Unit 10: Performance Pass
- **Goal**: Optimize images, fonts, and scripts for Lighthouse 95+ scores.
- **Output**: High performance scores.

### Unit 11: Accessibility Audit
- **Goal**: Finalize keyboard nav, screen reader labels, and focus states.
- **Output**: WCAG AA compliance.
