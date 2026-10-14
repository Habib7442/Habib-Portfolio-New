import type { SiteServiceText } from "@/lib/sanity";

export type ServiceText = { title: string; description: string; points: string[] };

/**
 * Built-in "My services" text: one plain-language sentence and three short bullets each. The admin's
 * Settings page edits these (siteSettings.services); any field left empty there falls back to this.
 * Keep in sync with SERVICE_DEFAULTS in habib_admin/src/components/admin/SettingsForm.tsx.
 */
export const DEFAULT_SERVICES: ServiceText[] = [
  {
    title: "Full-stack development",
    description: "Web apps and SaaS products built end to end — database, API, auth, and a fast, polished front end.",
    points: ["Next.js, React & TypeScript", "APIs, auth & databases", "Deployed, monitored, handed over cleanly"],
  },
  {
    title: "Landing pages",
    description: "A one-page website that explains what you offer and gets visitors to call, book or buy.",
    points: ["Written and laid out around your offer", "Loads fast on every phone", "Set up to be found on Google"],
  },
  {
    title: "Posters & social media",
    description: "Posters and social media posts that match your brand and make people stop scrolling.",
    points: ["Event and offer posters", "Instagram & LinkedIn posts", "Carousels and story formats"],
  },
  {
    title: "Branding & visual identity",
    description: "A logo, colours and fonts that make everything your business puts out look like it belongs together.",
    points: ["Logo design", "Brand colours & fonts", "Templates your team can reuse"],
  },
];

/** Admin text over the defaults, field by field, so a half-filled row still has a full set. */
export function mergeServices(fromAdmin?: SiteServiceText[] | null): ServiceText[] {
  return DEFAULT_SERVICES.map((fallback, i) => {
    const s = fromAdmin?.[i] ?? {};
    const points = (s.points ?? []).map((p) => p.trim()).filter(Boolean);
    return {
      title: s.title?.trim() || fallback.title,
      description: s.description?.trim() || fallback.description,
      points: points.length ? points.slice(0, 3) : fallback.points,
    };
  });
}
