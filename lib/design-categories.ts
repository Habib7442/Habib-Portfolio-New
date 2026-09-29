// Mirrors studio/schemaTypes/design.ts in habib_admin — keep labels in sync.
const LABELS: Record<string, string> = {
  poster: "Poster",
  social_media: "Social media",
  branding: "Branding",
  ui: "UI",
  illustration: "Illustration",
  ai_generated: "AI generated",
  photoshoot: "Photoshoot",
  other: "Other",
};

export const designCategoryLabel = (value?: string) => (value ? LABELS[value] ?? value : "");
