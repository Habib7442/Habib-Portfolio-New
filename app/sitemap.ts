import type { MetadataRoute } from "next";
import { getBlogs, getDesigns, getLandingPages, getProjects, getSiteSettings } from "@/lib/sanity";
import { absoluteUrl } from "@/lib/site";

// Rebuilt at most once an hour, so new projects and posts from the admin show up automatically.
// /review is left out on purpose: it's a form page marked noindex.
export const revalidate = 3600;

// Image sitemap entries help your work show up in Google Images. Plain asset URLs only: Next writes
// image URLs into the XML unescaped, so a "?w=…&auto=…" query would break the sitemap.
const img = (url?: string) => (url ? [url] : []);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, projects, designs, landingPages, posts] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getDesigns(),
    getLandingPages(),
    getBlogs(),
  ]);
  const latest = (dates: string[]) =>
    dates.length ? new Date(Math.max(...dates.map((d) => new Date(d).getTime()))) : undefined;
  const allDates = [...projects.map((p) => p._updatedAt), ...posts.map((p) => p._updatedAt)];

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest(allDates),
      changeFrequency: "weekly",
      priority: 1,
      images: img(settings.profileUrl),
    },
    {
      url: absoluteUrl("/work"),
      lastModified: latest(projects.map((p) => p._updatedAt)),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [
        ...designs.flatMap((d) => img(d.imageUrl)),
        ...landingPages.flatMap((l) => img(l.imageUrl)),
      ],
    },
    {
      url: absoluteUrl("/blogs"),
      lastModified: latest(posts.map((p) => p._updatedAt)),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [...img(p.thumbnailUrl), ...p.images.flatMap((i) => img(i.url))],
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blogs/${p.slug}`),
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: img(p.coverUrl),
    })),
  ];
}
