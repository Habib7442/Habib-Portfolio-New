# UI Context: Habibfolio Redesign

## Aesthetic: Refined Editorial-Dev
A mix of magazine-grade typography (Instrument Serif) and technical precision (JetBrains Mono). High contrast, neutral palette, saffron accents.

## Color Tokens

### Shared Accent
- **Accent (Saffron)**: `#E07A29` (Light) / `#F08A3A` (Dark)
- **Accent Hover**: `#C8651A` (Light) / `#FF9D4D` (Dark)

### Light Theme (Paper)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#FAFAF7` | Page background |
| `bg-elevated` | `#FFFFFF` | Cards, surfaces |
| `bg-muted` | `#E9E7E0` | Hover states |
| `border` | `#E1DED5` | Default borders |
| `fg` | `#1A1A1A` | Primary text |
| `fg-muted` | `#5C5A55` | Secondary text |

### Dark Theme (Ink)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0E0E0C` | Page background |
| `bg-elevated` | `#161613` | Cards, surfaces |
| `bg-muted` | `#2A2925` | Hover states |
| `border` | `#2D2C28` | Default borders |
| `fg` | `#F5F4F0` | Primary text |
| `fg-muted` | `#A8A59E` | Secondary text |

## Typography

| Style | Family | Weight | Size (Mobile/Desktop) |
|---|---|---|---|
| **Hero Headline** | Instrument Serif | 400 | 56px / 96px |
| **Section Title** | Instrument Serif | 400 | 44px / 72px |
| **Body Text** | Inter | 400 | 16px / 16px |
| **Labels / Tech** | JetBrains Mono | 500 | 11px / 11px |

- **Letter Spacing**: `-0.02em` for serif headlines, `+0.04em` for mono labels.

## Radius & Spacing
- **Radius-sm**: 4px (Buttons, tags)
- **Radius-md**: 8px (Cards)
- **Container**: 1140px max-width.
- **Section Padding**: 96px (Mobile) / 160px (Desktop).

## Motion & Transitions
- **Hover Transitions**: 150ms, color/opacity only.
- **Reveal Animations**: 350ms, 16px Y offset, fade in (once per element).
- **Reduced Motion**: Respect `@media (prefers-reduced-motion: reduce)`.
