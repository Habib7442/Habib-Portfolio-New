// Mirrors studio/schemaTypes/carouselTemplate.ts in habib_admin — keep labels in sync.
export const TEMPLATE_CATEGORIES = [
  { value: "fashion", label: "Fashion" },
  { value: "personal-brand", label: "Personal brand" },
  { value: "business", label: "Business" },
  { value: "tech", label: "Tech" },
  { value: "other", label: "Other" },
] as const;

export const templateCategoryLabel = (value?: string) =>
  TEMPLATE_CATEGORIES.find((c) => c.value === value)?.label ?? value ?? "";

/** CSS aspect-ratio for a slide from its real pixel size, falling back to 3:4. */
export function slideRatio(dims?: { width: number; height: number }) {
  return dims?.width && dims?.height ? `${dims.width} / ${dims.height}` : "3 / 4";
}
