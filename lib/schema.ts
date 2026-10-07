import type { Blog, BlogSummary, LandingPage, Project, SiteSettings } from "@/lib/sanity";
import { cardDescription } from "@/lib/plain-text";
import type { Faq } from "@/lib/faq";
import {
  DEFAULT_DESCRIPTION,
  EXPERTISE,
  FALLBACK_SAME_AS,
  JOB_TITLE,
  LOCALLIFY,
  PERSON_ID,
  PERSON_NAME,
  SITE_TITLE,
  SITE_URL,
  SKILLS,
  WEBSITE_ID,
  absoluteUrl,
} from "@/lib/site";

// schema.org JSON-LD builders. Entities reference each other by @id so AI engines see one graph.

export function siteGraph(settings: SiteSettings) {
  const sameAs = [settings.githubUrl, settings.linkedinUrl, settings.twitterUrl, settings.instagramUrl].filter(
    (u): u is string => !!u
  );
  const image = settings.profileUrl ?? absoluteUrl("/habib.webp");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: settings.name || PERSON_NAME,
        url: SITE_URL,
        image,
        jobTitle: JOB_TITLE,
        description: settings.bio || DEFAULT_DESCRIPTION,
        knowsAbout: [...EXPERTISE, ...SKILLS],
        worksFor: { "@id": LOCALLIFY.id },
        address: { "@type": "PostalAddress", addressLocality: "Silchar", addressRegion: "Assam", addressCountry: "IN" },
        ...(settings.email && { email: `mailto:${settings.email}` }),
        sameAs: Array.from(new Set([...(sameAs.length ? sameAs : FALLBACK_SAME_AS), LOCALLIFY.url])),
      },
      {
        "@type": "Organization",
        "@id": LOCALLIFY.id,
        name: LOCALLIFY.name,
        url: LOCALLIFY.url,
        description: LOCALLIFY.description,
        founder: { "@id": PERSON_ID },
        address: { "@type": "PostalAddress", addressLocality: "Silchar", addressRegion: "Assam", addressCountry: "IN" },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_TITLE,
        description: settings.seoDescription || DEFAULT_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function homeSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        // Parts of the page suited to voice assistants / AI answers.
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#about", "#faq"] },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export function workSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: absoluteUrl("/work"),
        name: `Work — ${PERSON_NAME}`,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/work/${p.slug}`),
            name: p.title,
          })),
        },
      },
      breadcrumbs([{ name: "Work", path: "/work" }]),
    ],
  };
}

export function projectSchema(p: Project) {
  const url = absoluteUrl(`/work/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: p.title,
        headline: p.title,
        description: p.shortDescription,
        ...(p.fullDescription && { abstract: p.fullDescription }),
        url,
        ...(p.thumbnailUrl && { image: p.thumbnailUrl }),
        ...(p.liveUrl && { sameAs: p.liveUrl }),
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        keywords: p.techStack.join(", "),
        genre: p.category,
        dateModified: p._updatedAt,
        isPartOf: { "@id": WEBSITE_ID },
      },
      breadcrumbs([
        { name: "Work", path: "/work" },
        { name: p.title, path: `/work/${p.slug}` },
      ]),
    ],
  };
}

export function landingPageSchema(l: LandingPage & { slug: string }) {
  const path = `/work/landing/${l.slug}`;
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: l.title,
        headline: l.title,
        description: cardDescription(l.plainDescription, l.description),
        ...(l.description && { abstract: l.description }),
        url,
        ...(l.imageUrl && { image: l.imageUrl }),
        ...(l.video.mp4 && { video: { "@type": "VideoObject", name: l.title, contentUrl: l.video.mp4, thumbnailUrl: l.video.poster || l.imageUrl, uploadDate: l._updatedAt } }),
        ...(l.liveUrl && { sameAs: l.liveUrl }),
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        ...(l.techStack.length && { keywords: l.techStack.join(", ") }),
        genre: "Landing page",
        dateModified: l._updatedAt,
        isPartOf: { "@id": WEBSITE_ID },
      },
      breadcrumbs([
        { name: "Work", path: "/work" },
        { name: l.title, path },
      ]),
    ],
  };
}

export function blogListSchema(posts: BlogSummary[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        url: absoluteUrl("/blogs"),
        name: `Writing — ${PERSON_NAME}`,
        author: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: absoluteUrl(`/blogs/${p.slug}`),
          ...(p.publishedAt && { datePublished: p.publishedAt }),
        })),
      },
      breadcrumbs([{ name: "Writing", path: "/blogs" }]),
    ],
  };
}

export function blogPostSchema(post: Blog) {
  const url = absoluteUrl(`/blogs/${post.slug}`);
  const wordCount = post.content ? post.content.split(/\s+/).filter(Boolean).length : undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.seoDescription || post.excerpt,
        url,
        mainEntityOfPage: url,
        ...(post.coverUrl && { image: post.coverUrl }),
        ...(post.publishedAt && { datePublished: post.publishedAt }),
        dateModified: post._updatedAt,
        author: { "@type": "Person", "@id": PERSON_ID, name: PERSON_NAME, url: SITE_URL },
        publisher: { "@id": PERSON_ID },
        ...(post.category && { articleSection: post.category }),
        ...(post.tags.length && { keywords: post.tags.join(", ") }),
        ...(wordCount && { wordCount }),
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".post-lede"] },
      },
      breadcrumbs([
        { name: "Writing", path: "/blogs" },
        { name: post.title, path: `/blogs/${post.slug}` },
      ]),
    ],
  };
}
