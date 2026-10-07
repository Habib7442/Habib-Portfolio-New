import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import VideoPreview from "@/components/ui/VideoPreview";
import JsonLd from "@/components/seo/JsonLd";
import { landingPageSchema } from "@/lib/schema";
import { cardDescription } from "@/lib/plain-text";
import { getSiteSettings, getLandingPageBySlug, imgUrl } from "@/lib/sanity";
import { OG_IMAGE } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);
  if (!page) return { title: "Landing page not found" };
  const description = cardDescription(page.plainDescription, page.description);
  const image = page.imageUrl ? imgUrl(page.imageUrl, 1200) : OG_IMAGE;
  return {
    title: page.title,
    description,
    alternates: { canonical: `/work/landing/${slug}` },
    openGraph: { type: "article", url: `/work/landing/${slug}`, title: page.title, description, images: [image] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function LandingPageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, page] = await Promise.all([getSiteSettings(), getLandingPageBySlug(slug)]);
  if (!page) notFound();
  const hasShot = Boolean(page.imageUrl || page.video.poster);

  return (
    <>
      <JsonLd data={landingPageSchema({ ...page, slug })} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader eyebrow="Landing page" title={page.title} intro={cardDescription(page.plainDescription, page.description)}>
          {page.liveUrl && (
            <div className="mt-8">
              <a
                href={page.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="eyebrow inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-fg transition-transform hover:-translate-y-0.5"
              >
                View live site <ArrowUpRight className="size-4" />
              </a>
            </div>
          )}
        </PageHeader>

        {hasShot && (
          <div className="bg-forest">
            <div className="container-app">
              <div className="relative aspect-[16/10] translate-y-10 overflow-hidden rounded-3xl bg-bg-muted shadow-2xl shadow-black/20 md:aspect-video md:translate-y-16">
                <VideoPreview
                  video={page.video}
                  image={page.imageUrl}
                  alt={page.imageAlt || page.title}
                  sizes="(min-width: 1568px) 1440px, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        <section className="container-app grid gap-12 pt-24 pb-24 md:pt-32 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Link href="/work?type=landing" className="eyebrow mb-8 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All landing pages
            </Link>
            <h2 className="mb-6 font-serif text-display-md leading-[1.05]">How it&apos;s built</h2>
            {page.description ? (
              <p className="prose-blog whitespace-pre-line">{page.description}</p>
            ) : (
              <p className="prose-blog">Build notes coming soon.</p>
            )}
          </div>
          {page.techStack.length > 0 && (
            <aside className="lg:col-span-4">
              <div className="rounded-3xl bg-bg-alt p-6 md:p-8">
                <p className="eyebrow mb-4 text-accent-hover">✦ Built with</p>
                <div className="flex flex-wrap gap-2">
                  {page.techStack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
