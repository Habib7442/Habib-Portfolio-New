import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostSchema } from "@/lib/schema";
import { OG_IMAGE, PERSON_NAME, SITE_URL } from "@/lib/site";
import MarkdownContent from "@/components/ui/MarkdownContent";
import RelatedLinks, { nextInList } from "@/components/ui/RelatedLinks";
import { coverRatio, formatDate } from "@/components/sections/Writing";
import { getSiteSettings, getBlogBySlug, getBlogs, imgUrl } from "@/lib/sanity";

// Served from the cache, so crawlers get a fast response. /api/revalidate refreshes it on every admin save.
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    openGraph: {
      type: "article",
      url: `/blogs/${post.slug}`,
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      modifiedTime: post._updatedAt,
      authors: [PERSON_NAME],
      images: [post.coverUrl ? imgUrl(post.coverUrl, 1200) : OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [post.coverUrl ? imgUrl(post.coverUrl, 1200) : OG_IMAGE] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, post, posts] = await Promise.all([getSiteSettings(), getBlogBySlug(slug), getBlogs()]);
  if (!post) notFound();
  const related = nextInList(posts, post._id).map((p) => ({
    href: `/blogs/${p.slug}`,
    title: p.title,
    description: p.excerpt,
  }));

  return (
    <>
      <JsonLd data={blogPostSchema(post)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow={[post.category, formatDate(post.publishedAt, "long")].filter(Boolean).join("  ·  ") || "Writing"}
          title={post.title}
          intro={post.excerpt}
        />

        {post.coverUrl && (
          <div className="bg-forest">
            <div className="container-app max-w-4xl">
              <div
                className="relative translate-y-10 overflow-hidden rounded-3xl bg-bg-muted shadow-2xl shadow-black/20 md:translate-y-14"
                style={{ aspectRatio: coverRatio(post.coverDims) }}
              >
                <Image src={imgUrl(post.coverUrl, 1400)} alt={post.title} fill sizes="(min-width: 896px) 816px, 100vw" priority className="object-contain" />
              </div>
            </div>
          </div>
        )}

        <article className="container-app max-w-3xl pt-24 pb-24 md:pt-28">
          <Link href="/blogs" className="eyebrow mb-10 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
            <ArrowLeft className="size-4" /> All writing
          </Link>
          {post.content ? (
            <MarkdownContent content={post.content} title={post.title} />
          ) : (
            <p className="text-fg-muted">This post doesn&apos;t have any content yet.</p>
          )}
        </article>
        <RelatedLinks heading="Keep reading" links={related} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
