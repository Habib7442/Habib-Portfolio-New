# Code Standards: Habibfolio Redesign

## TypeScript & Logic
- **Strict Typing**: No `any`. Use interfaces for component props.
- **React Server Components**: Default to RSC. Use `"use client"` only for interactivity (Framer Motion, hooks).
- **Function Components**: Use `export default function Name()` for main components.
- **No Direct DOM**: Use React refs or standard event handlers.

## Styling (Tailwind 4 + Vanilla CSS)
- **Token First**: Always use theme tokens (e.g., `text-accent`, `bg-bg-elevated`) instead of arbitrary hex codes.
- **Layout**: Use CSS Grid (`grid`) for main layouts and Flexbox (`flex`) for components.
- **Containers**: Use the standard `container` class (max-width: 1140px) for all content.
- **Radii**: Stick to `radius-sm` (4px) and `radius-md` (8px). Avoid large rounded corners.

## Component Structure
- **Folder per component**: If a component is complex, give it a folder in `components/` with `index.tsx` and sub-components.
- **Prop Naming**: Be descriptive. Avoid abbreviations.
- **Metadata**: Every page should use the `generateMetadata` function for dynamic SEO.

## Content (MDX)
- **Frontmatter**: Every MDX file must have a consistent frontmatter (title, description, date, tech stack).
- **Components in MDX**: Use a shared `MDXComponents` mapping for consistent styling of H1-H6, code blocks, etc.

## Copy & Voice
- **Seniority**: Use plain, direct language. No "category-defining" or "pixel-obsessed".
- **Specifics**: Use numbers and concrete nouns.
- **Labels**: Use JetBrains Mono for metadata labels, technically dry.

## Performance & Accessibility
- **LCP Optimization**: Use `priority` for above-the-fold images.
- **Alt Text**: Required for all images. Must be descriptive.
- **Interactive States**: Every button/link must have a visible `accent` focus state.
