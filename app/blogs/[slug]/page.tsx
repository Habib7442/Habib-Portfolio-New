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
import { PERSON_NAME, SITE_URL } from "@/lib/site";
import MarkdownContent from "@/components/ui/MarkdownContent";
import { formatDate } from "@/components/sections/Writing";
import { getSiteSettings, getBlogBySlug, imgUrl } from "@/lib/sanity";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getBlogBySlug(slug), getSiteSettings()]);
  if (!post) return { title: "Post not found" };
  const image = post.coverUrl ?? settings.shareUrl;
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
      images: [image ? imgUrl(image, 1200) : "/og.png"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, post] = await Promise.all([getSiteSettings(), getBlogBySlug(slug)]);
  if (!post) notFound();

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
              <div className="relative aspect-video translate-y-10 overflow-hidden rounded-3xl shadow-2xl shadow-black/20 md:translate-y-14">
                <Image src={imgUrl(post.coverUrl, 1400)} alt={post.title} fill sizes="(min-width: 896px) 816px, 100vw" priority className="object-cover" />
              </div>
            </div>
          </div>
        )}

        <article className="container-app max-w-3xl pt-24 pb-24 md:pt-28">
          <Link href="/blogs" className="eyebrow mb-10 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
            <ArrowLeft className="size-4" /> All writing
          </Link>
          {post.content ? (
            <MarkdownContent content={post.content} />
          ) : (
            <p className="text-fg-muted">This post doesn&apos;t have any content yet.</p>
          )}
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}
