# Project Overview: Habibfolio Redesign

## Overview
A redesign of Habib Tanwir's portfolio from a creative-agency aesthetic to a refined, senior-engineer editorial-dev style. The project focuses on restraint, technical depth, and a disciplined visual language to appeal to engineering managers, founders, and other technical professionals.

## Goals
1. **Senior Positioning**: Shift the brand voice from "creative agency" to "senior full-stack engineer/designer".
2. **Technical Credibility**: Showcase real technical depth, AI-powered projects, and decision-making rationale.
3. **Refined Aesthetics**: Implement a disciplined neutral palette with a single saffron accent and high-quality typography.
4. **Full Accessibility**: Achieve WCAG 2.2 AA compliance.
5. **Performance Excellence**: Reach Lighthouse scores of 95+ across all categories.

## Core User Flow
1. **Landing**: User lands on a quiet, text-focused hero section that clearly states Habib's value proposition.
2. **Work Discovery**: User skims selected web/product work, then visual/branding work via a drag-carousel.
3. **Technical Depth**: User dives into a specific case study to see architecture diagrams and rationale.
4. **Persona Connection**: User reads the "About" section for background, stack, and personality.
5. **Contact**: User initiates contact via a professional email link.

## Features
- **Dual Themes**: Native light and dark modes with proper token parity and no flash on load.
- **Case Study System**: MDX-based pages for detailed project documentation.
- **Visual Carousel**: A drag-to-explore interaction for design and AI compositing work.
- **Editorial Typography**: Using Instrument Serif for headlines and Inter for UI.
- **SEO & Performance**: Optimized LCP, semantic HTML, and automated OG images.

## In-Scope
- Complete homepage redesign.
- New MDX-based case study system (`/work/[slug]`).
- New writing/blog section (`/writing`).
- Theme toggle implementation.
- Technical "/uses" page.

## Out-of-Scope
- Freelancer-marketplace elements (e.g., "Hire Me" buttons, "Leave a Review").
- High-adjective, low-specificity marketing copy.
- Heavy animations (Locomotive scroll, bouncy easing).
- Anonymous or unverified testimonials.

## Success Criteria
- [ ] Lighthouse scores ≥ 95 on Performance, Accessibility, Best Practices, and SEO.
- [ ] WCAG 2.2 AA compliance verified.
- [ ] Zero "forbidden phrases" from the old site remaining in the copy.
- [ ] Dark and light modes both feel native and high-contrast.
- [ ] At least one detailed case study live at launch.
