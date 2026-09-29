import type { MetadataRoute } from "next";
import { getBlogs, getProjects } from "@/lib/sanity";
import { absoluteUrl } from "@/lib/site";

// Rebuilt at most once an hour, so new projects and posts from the admin show up automatically.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getBlogs()]);
  const latest = (dates: string[]) =>
    dates.length ? new Date(Math.max(...dates.map((d) => new Date(d).getTime()))) : new Date();

  return [
    { url: absoluteUrl("/"), lastModified: latest(projects.map((p) => p._updatedAt)), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/work"), lastModified: latest(projects.map((p) => p._updatedAt)), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/blogs"), lastModified: latest(posts.map((p) => p._updatedAt)), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/llms.txt"), changeFrequency: "weekly", priority: 0.3 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blogs/${p.slug}`),
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
