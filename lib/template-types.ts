// Template types. Each one is its own section of the site at /templates/<path>.
// Mirrors TEMPLATE_TYPE_OPTIONS in habib_admin's src/lib/template-categories.ts — keep `value`/`path` in sync.

export type TemplateTypeInfo = {
  value: string;
  path: string;
  /** Plural label for chips and nav, e.g. "Carousels". */
  label: string;
  singular: string;
  /** What one image of this type is called, e.g. "slides". */
  unit: string;
  /** <title> and H1 of the section page. Written for search: what people actually type. */
  seoTitle: string;
  heading: string;
  description: string;
  intro: string;
};

export const TEMPLATE_TYPES: TemplateTypeInfo[] = [
  {
    value: "carousel",
    path: "carousels",
    label: "Carousels",
    singular: "Carousel",
    unit: "slides",
    seoTitle: "Instagram Carousel Templates for Canva",
    heading: "Instagram carousel templates",
    description:
      "Editable Instagram and LinkedIn carousel templates for Canva. Swipe-ready slide sets for brands, creators and boutiques — swap in your photos and text and post today.",
    intro:
      "Swipe-ready carousel sets for Instagram and LinkedIn. Every slide is editable in Canva, photos sit in frames, and the text is placeholder copy you replace with your own.",
  },
  {
    value: "reel",
    path: "reels",
    label: "Reels",
    singular: "Reel",
    unit: "scenes",
    seoTitle: "Instagram Reel Templates for Canva",
    heading: "Instagram reel templates",
    description:
      "Editable Instagram Reel templates for Canva. Cinematic, beat-timed video layouts — drop in your clips, export, and add trending audio in Instagram.",
    intro:
      "Video layouts for Reels, timed to a 15–30 second hook. Edit in Canva, export as MP4, then add your trending audio inside Instagram when you post.",
  },
  {
    value: "story",
    path: "stories",
    label: "Stories",
    singular: "Story",
    unit: "frames",
    seoTitle: "Instagram Story Templates for Canva",
    heading: "Instagram story templates",
    description:
      "Editable Instagram Story templates for Canva — launch countdowns, offers, polls and product frames, sized 1080 × 1920 and ready to post.",
    intro: "Full-screen story frames for launches, offers and announcements. Edit in Canva and post straight to your story.",
  },
  {
    value: "post",
    path: "posts",
    label: "Posts",
    singular: "Post",
    unit: "designs",
    seoTitle: "Instagram Post Templates for Canva",
    heading: "Instagram post templates",
    description:
      "Editable single-image Instagram post templates for Canva — announcements, offers, quotes and product posts for brands and creators.",
    intro: "Single-image posts for announcements, offers and quotes. Edit in Canva, export and post.",
  },
];

const DEFAULT_TYPE = TEMPLATE_TYPES[0];

export const templateTypeInfo = (value?: string) => TEMPLATE_TYPES.find((t) => t.value === value) ?? DEFAULT_TYPE;
export const templateTypeByPath = (path: string) => TEMPLATE_TYPES.find((t) => t.path === path);

/** Canonical URL of a template's own page, e.g. /templates/carousels/savre-fashion-launch. */
export const templatePath = (t: { templateType: string; slug: string }) =>
  `/templates/${templateTypeInfo(t.templateType).path}/${t.slug}`;
