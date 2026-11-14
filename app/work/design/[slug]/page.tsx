import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import RelatedLinks, { nextInList } from "@/components/ui/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { designSchema } from "@/lib/schema";
import { designCategoryLabel } from "@/lib/design-categories";
import { firstSentence } from "@/lib/plain-text";
import { getDesignBySlug, getDesigns, getSiteSettings, imgUrl, type DesignImage } from "@/lib/sanity";

// Served from the cache, so crawlers get a fast response. /api/revalidate refreshes it on every admin save.
export const revalidate = 60;

export async function generateStaticParams() {
  const designs = await getDesigns();
  return designs.filter((d) => d.slug && d.imageUrl).map((d) => ({ slug: d.slug! }));
}

function summary(title: string, category: string, description?: string) {
  return firstSentence(description) || `${title}: ${designCategoryLabel(category).toLowerCase()} design by Habib Tanwir.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design?.imageUrl) return { title: "Design not found" };
  const description = summary(design.title, design.category, design.description);
  const image = imgUrl(design.imageUrl, 1200);
  return {
    title: design.title,
    description,
    alternates: { canonical: `/work/design/${slug}` },
    openGraph: { type: "article", url: `/work/design/${slug}`, title: design.title, description, images: [image] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

// Every image keeps its own shape: posters stay portrait, banners stay wide.
function ratio(dims?: DesignImage["dims"]) {
  return dims && dims.width && dims.height ? dims.width / dims.height : 4 / 5;
}

const GALLERY = {
  1: { grid: "mx-auto max-w-3xl", sizes: "(min-width: 816px) 768px, 100vw" },
  2: { grid: "grid gap-5 sm:grid-cols-2", sizes: "(min-width: 1568px) 710px, (min-width: 640px) 50vw, 100vw" },
  many: { grid: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", sizes: "(min-width: 1568px) 470px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" },
};

export default async function DesignDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, design, designs] = await Promise.all([getSiteSettings(), getDesignBySlug(slug), getDesigns()]);
  if (!design?.imageUrl) notFound();

  const images: DesignImage[] = [{ url: design.imageUrl, dims: design.imageDims }, ...design.images];
  const gallery = images.length === 1 ? GALLERY[1] : images.length === 2 ? GALLERY[2] : GALLERY.many;
  const category = designCategoryLabel(design.category);
  const related = nextInList(
    designs.filter((d) => d.slug && d.imageUrl),
    design._id
  ).map((d) => ({
    href: `/work/design/${d.slug}`,
    title: d.title,
    description: designCategoryLabel(d.category),
    image: d.imageUrl,
  }));

  return (
    <>
      <JsonLd data={designSchema({ ...design, slug })} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader eyebrow={`Design  ·  ${category}`} title={design.title} intro={summary(design.title, design.category, design.description)} />

        <section className="py-14 md:py-20" aria-label="Images">
          <div className="container-app">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex flex-wrap items-center gap-2 text-fg-subtle">
              <Link href="/work" className="hover:text-fg">Work</Link>
              <span aria-hidden>/</span>
              <Link href="/work?type=design" className="hover:text-fg">Designs</Link>
              <span aria-hidden>/</span>
              <span className="text-fg-muted" aria-current="page">{design.title}</span>
            </nav>
            <div className={`${gallery.grid} items-start`}>
              {images.map((img, i) => (
                <div
                  key={img.url}
                  className="relative mb-5 overflow-hidden rounded-2xl bg-bg-muted sm:mb-0"
                  style={{ aspectRatio: ratio(img.dims) }}
                >
                  <Image
                    src={imgUrl(img.url, 1400)}
                    alt={images.length > 1 ? `${design.title}, image ${i + 1} of ${images.length}` : design.title}
                    fill
                    sizes={gallery.sizes}
                    priority={i === 0}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-app grid gap-12 border-t border-border py-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Link href="/work?type=design" className="eyebrow mb-8 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All designs
            </Link>
            <h2 className="mb-6 font-serif text-display-md leading-[1.05]">About this design</h2>
            <p className="prose-blog whitespace-pre-line">
              {design.description || `A ${category.toLowerCase()} piece by Habib Tanwir.`}
            </p>
          </div>
          <aside className="lg:col-span-4 lg:pt-14">
            <dl className="space-y-6 rounded-3xl bg-bg-alt p-6 md:p-8">
              <div>
                <dt className="eyebrow mb-2 text-accent-hover">Category</dt>
                <dd>{category}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2 text-accent-hover">Images</dt>
                <dd>{images.length}</dd>
              </div>
              {design.tools.length > 0 && (
                <div>
                  <dt className="eyebrow mb-3 text-accent-hover">Tools</dt>
                  <dd className="flex flex-wrap gap-2">
                    {design.tools.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </dd>
                </div>
              )}
              {design.tags.length > 0 && (
                <div>
                  <dt className="eyebrow mb-3 text-accent-hover">Tags</dt>
                  <dd className="flex flex-wrap gap-2">
                    {design.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </section>

        <RelatedLinks heading="More designs" links={related} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
