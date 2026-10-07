import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-01-01',
  useCdn: false, // freshness comes from Next's fetch cache (revalidate) below
  perspective: 'published', // never leak Studio drafts to the public site
})

/**
 * Public, read-only fetch with Next's ISR cache (no token). Private documents (contact messages,
 * unapproved reviews) use "private." ids, which Sanity never returns to anonymous requests.
 */
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

/** Optional looping preview (see components/ui/VideoPreview). Raw Sanity file/image URLs. */
export type PreviewVideo = { mp4?: string; webm?: string; poster?: string }

export type LandingPage = {
  _id: string
  _updatedAt: string
  title: string
  slug?: string
  plainDescription?: string
  /** Build/tech details, shown under "How it's built" on the detail page. */
  description?: string
  liveUrl?: string
  imageUrl?: string
  imageAlt?: string
  imageDims?: ImageDims
  video: PreviewVideo
  techStack: string[]
  featured: boolean
  featuredOrder: number
}

export type Product = {
  _id: string
  name: string
  oneLiner: string
  plainDescription?: string
  imageUrl?: string
  imageAlt?: string
  video: PreviewVideo
  link: string
  status: 'live' | 'beta' | 'hackathon'
}

export type Testimonial = {
  _id: string
  quote: string
  name: string
  role?: string
  business?: string
  imageUrl?: string
  /** The work it's about, already resolved to a title and a link. */
  linked?: { title: string; href: string }
}

export type ProjectImage = { url: string }

export type Project = {
  _id: string
  _updatedAt: string
  title: string
  slug: string
  shortDescription: string
  plainDescription?: string
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

// GROQ returns null (not []) for fields never filled in; coalesce keeps the non-optional types honest.
const LANDING_FIELDS = `
  _id, _updatedAt, title, "slug": slug.current, plainDescription, description, liveUrl,
  "techStack": coalesce(techStack, []),
  "featured": coalesce(featured, false),
  "featuredOrder": coalesce(featuredOrder, 0),
  "imageUrl": image.asset->url, "imageAlt": image.alt,
  "imageDims": image.asset->metadata.dimensions{width, height},
  "video": {
    "mp4": previewVideo.asset->url,
    "webm": previewVideoWebm.asset->url,
    "poster": previewPoster.asset->url
  }
`

/** Featured pages first (by featuredOrder), then newest. */
export async function getLandingPages(): Promise<LandingPage[]> {
  return sanityFetch<LandingPage[]>(
    `*[_type == "landingPage"] | order(coalesce(featured, false) desc, coalesce(featuredOrder, 0) asc, _createdAt desc) {
      ${LANDING_FIELDS}
    }`
  )
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  return sanityFetch<LandingPage | null>(`*[_type == "landingPage" && slug.current == $slug][0]{ ${LANDING_FIELDS} }`, { slug })
}

export async function getProducts(): Promise<Product[]> {
  return sanityFetch<Product[]>(
    `*[_type == "product" && defined(link)] | order(coalesce(order, 0) asc, _createdAt asc) {
      _id, name, oneLiner, plainDescription, link,
      "status": coalesce(status, "live"),
      "imageUrl": image.asset->url, "imageAlt": image.alt,
      "video": { "mp4": previewVideo.asset->url }
    }`
  )
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await sanityFetch<(Omit<Testimonial, 'linked'> & { ref?: { _type: string; title?: string; slug?: string; link?: string } })[]>(
    `*[_type == "testimonial" && defined(quote) && defined(name)] | order(coalesce(order, 0) asc, _createdAt desc) {
      _id, quote, name, role, business,
      "imageUrl": image.asset->url,
      "ref": linkedProject->{ _type, "title": coalesce(title, name), "slug": slug.current, link }
    }`
  )
  return rows.map(({ ref, ...t }) => {
    const href =
      ref?._type === 'project' && ref.slug ? `/work/${ref.slug}`
      : ref?._type === 'landingPage' && ref.slug ? `/work/landing/${ref.slug}`
      : ref?._type === 'product' ? ref.link
      : undefined
    return { ...t, linked: ref?.title && href ? { title: ref.title, href } : undefined }
  })
}

const PROJECT_FIELDS = `
  _id, _updatedAt, title, "slug": slug.current, shortDescription, plainDescription, fullDescription,
  liveUrl, githubUrl,
  "techStack": coalesce(techStack, []),
  "category": coalesce(category, "other"),
  "status": coalesce(status, "completed"),
  "featured": coalesce(featured, false),
  "sortOrder": coalesce(sortOrder, 0),
  "thumbnailUrl": thumbnail.asset->url,
  "thumbnailDims": thumbnail.asset->metadata.dimensions{width, height},
  "images": coalesce(images[defined(asset)]{ "url": asset->url }, [])
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
      _id, title, description,
      "category": coalesce(category, "other"),
      "tools": coalesce(tools, []),
      "tags": coalesce(tags, []),
      "featured": coalesce(featured, false),
      "imageUrl": image.asset->url,
      "imageDims": image.asset->metadata.dimensions{width, height},
      "images": coalesce(images[defined(asset)]{ "url": asset->url }, [])
    }`
  )
}

const BLOG_SUMMARY_FIELDS = `
  _id, _updatedAt, title, "slug": slug.current, excerpt, category, publishedAt,
  "tags": coalesce(tags, []),
  "featured": coalesce(featured, false),
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
