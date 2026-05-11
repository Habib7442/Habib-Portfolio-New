# Architecture: Habibfolio Redesign

## Stack Table

| Layer | Technology | Role |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Core application logic and routing |
| **Styling** | Tailwind CSS 4 | Utility-first styling with custom design tokens |
| **Content** | MDX (@next/mdx) | Case studies and blog posts documentation |
| **Theming** | next-themes | Theme persistence and system preference sync |
| **Motion** | Framer Motion | Subtle, high-performance transitions and reveals |
| **Fonts** | next/font | Optimized loading for Instrument Serif, Inter, and JetBrains Mono |
| **Hosting** | Vercel | Deployment, edge functions, and image optimization |

## System Boundaries

- `app/`: Contains the App Router structure. RSC by default.
- `components/`: Reusable UI components. Organized by feature (e.g., `hero/`, `work/`).
- `content/`: MDX files for work and writing.
- `lib/`: Shared utilities, font configurations, and metadata helpers.
- `styles/`: Global CSS and Tailwind token definitions.
- `types/`: Shared TypeScript interfaces.

## Storage Model
- **Local Files**: Content (MDX), images, and assets.
- **External Data**: GitHub API for contribution stats (optional/P2).
- **Client State**: Theme preference (localStorage via next-themes).

## Auth & Access Model
- No user authentication required for the portfolio.
- Access is public; SEO-optimized for search engine crawlers.

## Invariants (Rules to never violate)
1. **No Theme Flash**: The site must never flash the wrong theme on initial load (synchronous script in `<head>`).
2. **Strict Typography**: Only use the defined font pairs (Instrument Serif + Inter + JetBrains Mono).
3. **No Layout Shift**: All images must have reserved aspect ratios; zero CLS target.
4. **Semantic Hierarchy**: Always use a single H1 and follow strict heading levels (H2 -> H3).
5. **No Heavy Scroll Libraries**: Avoid Locomotive Scroll or similar libraries that break native accessibility.
