import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-01-01',
  useCdn: false, // freshness comes from Next's fetch cache (revalidate) below
  perspective: 'published', // never leak Studio drafts to the public site
})

/** Public, read-only fetch with Next's ISR cache. No token: only published content is ever reachable this way. */
function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params, {
    cache: 'force-cache',
    next: { revalidate: 60 },
  })
}

export type SiteSettings = {
  name?: string
  tagline?: string
  bio?: string
  email?: string
  resumeUrl?: string
  githubUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  seoTitle?: string
  seoDescription?: string
  profileUrl?: string
  shareUrl?: string
}

export type ImageDims = { width: number; height: number }

export type LandingPage = {
  _id: string
  title: string
  description?: string
  liveUrl?: string
  imageUrl?: string
  imageAlt?: string
  imageDims?: ImageDims
  ratingCount?: number
  ratingTotal?: number
}

export type ProjectImage = { url: string }

export type Project = {
  _id: string
  _updatedAt: string
  title: string
  slug: string
  shortDescription: string
  fullDescription?: string
  thumbnailUrl?: string
  thumbnailDims?: ImageDims
  images: ProjectImage[]
  liveUrl?: string
  githubUrl?: string
  techStack: string[]
  category: 'web' | 'mobile' | 'design' | 'other'
  status: 'completed' | 'in_progress' | 'planning'
  featured: boolean
  sortOrder: number
}

export type Design = {
  _id: string
  title: string
  category: string
  imageUrl?: string
  imageDims?: ImageDims
  images: ProjectImage[]
  description?: string
  tools: string[]
  tags: string[]
  featured: boolean
}

export type BlogSummary = {
  _id: string
  _updatedAt: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  tags: string[]
  featured: boolean
  publishedAt?: string
  coverUrl?: string
}

export type Blog = BlogSummary & {
  content?: string
  seoTitle?: string
  seoDescription?: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return (
    (await sanityFetch<SiteSettings | null>(
      `*[_id == "siteSettings"][0]{
        name, tagline, bio, email, resumeUrl, githubUrl, linkedinUrl, twitterUrl, instagramUrl,
        seoTitle, seoDescription,
        "profileUrl": profileImage.asset->url,
        "shareUrl": shareImage.asset->url
      }`
    )) ?? {}
  )
}

export async function getLandingPages(): Promise<LandingPage[]> {
  return sanityFetch<LandingPage[]>(
    `*[_type == "landingPage"] | order(_createdAt desc) {
      _id, title, description, liveUrl, ratingCount, ratingTotal,
      "imageUrl": image.asset->url, "imageAlt": image.alt,
      "imageDims": image.asset->metadata.dimensions{width, height}
    }`
  )
}

const PROJECT_FIELDS = `
  _id, _updatedAt, title, "slug": slug.current, shortDescription, fullDescription,
  liveUrl, githubUrl, techStack, category, status, featured, sortOrder,
  "thumbnailUrl": thumbnail.asset->url,
  "thumbnailDims": thumbnail.asset->metadata.dimensions{width, height},
  "images": images[]{ "url": asset->url }
`

export async function getProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>(`*[_type == "project"] | order(sortOrder asc, _createdAt desc) { ${PROJECT_FIELDS} }`)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project | null>(`*[_type == "project" && slug.current == $slug][0]{ ${PROJECT_FIELDS} }`, { slug })
}

export async function getDesigns(): Promise<Design[]> {
  return sanityFetch<Design[]>(
    `*[_type == "design"] | order(_createdAt desc) {
      _id, title, category, description, tools, tags, featured,
      "imageUrl": image.asset->url,
      "imageDims": image.asset->metadata.dimensions{width, height},
      "images": images[]{ "url": asset->url }
    }`
  )
}

const BLOG_SUMMARY_FIELDS = `
  _id, _updatedAt, title, "slug": slug.current, excerpt, category, tags, featured, publishedAt,
  "coverUrl": coverImage.asset->url
`

export async function getBlogs(): Promise<BlogSummary[]> {
  return sanityFetch<BlogSummary[]>(
    `*[_type == "blog" && status == "published"] | order(publishedAt desc) { ${BLOG_SUMMARY_FIELDS} }`
  )
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return sanityFetch<Blog | null>(
    `*[_type == "blog" && status == "published" && slug.current == $slug][0]{
      ${BLOG_SUMMARY_FIELDS}, content, seoTitle, seoDescription
    }`,
    { slug }
  )
}

/** Appends Sanity's image-CDN resize params. `url` must be a raw asset->url. */
export function imgUrl(url: string, width: number, quality = 80) {
  return `${url}?w=${width}&auto=format&q=${quality}`
}
