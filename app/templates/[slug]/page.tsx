import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import SlideStrip from "@/components/ui/SlideStrip";
import TrackedLink from "@/components/ui/TrackedLink";
import { PriceTag } from "@/components/ui/TemplateCard";
import { templateSchema } from "@/lib/schema";
import { templateCategoryLabel } from "@/lib/template-categories";
import { getSiteSettings, getTemplateBySlug, imgUrl } from "@/lib/sanity";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTemplateBySlug(slug);
  if (!t) return { title: "Template not found" };
  const image = imgUrl(t.slides[0].url, 1200);
  return {
    title: `${t.title} — Canva Carousel Template`,
    description: t.description,
    alternates: { canonical: `/templates/${slug}` },
    openGraph: { type: "website", url: `/templates/${slug}`, title: t.title, description: t.description, images: [image] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function TemplateDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, t] = await Promise.all([getSiteSettings(), getTemplateBySlug(slug)]);
  if (!t) notFound();

  // Free templates open straight in Canva; paid ones go to the shop listing.
  const primary = t.isFree
    ? { href: t.canvaLink!, label: "Open in Canva — free", event: "template_canva_clicked" }
    : { href: t.buyLink!, label: `Get the template${t.price ? ` · ${t.price}` : ""}`, event: "template_buy_clicked" };
  const tracking = { slug: t.slug, title: t.title, category: t.category, free: t.isFree };

  const included = [
    `${t.slides.length} carousel slides`,
    t.size ? `${t.size} px, ready for Instagram & LinkedIn` : "Sized for Instagram & LinkedIn",
    "Every text, colour and photo editable in Canva",
    "Photos sit in frames — drag yours in to replace them",
    "Placeholder text for your brand, handle and contact",
  ];

  return (
    <>
      <JsonLd data={templateSchema(t)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow={`Template  ·  ${templateCategoryLabel(t.category)}`}
          title={t.title}
          intro={t.description}
        >
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <TrackedLink
              href={primary.href}
              event={primary.event}
              properties={tracking}
              className="eyebrow inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-fg transition-transform hover:-translate-y-0.5"
            >
              {primary.label} <ArrowUpRight className="size-4" />
            </TrackedLink>
            {t.isFree && t.buyLink && (
              <TrackedLink
                href={t.buyLink}
                event="template_buy_clicked"
                properties={tracking}
                className="eyebrow inline-flex items-center gap-2 text-on-forest-muted hover:text-on-forest"
              >
                Also on Etsy / Gumroad <ArrowUpRight className="size-4" />
              </TrackedLink>
            )}
          </div>
        </PageHeader>

        <section className="overflow-hidden py-14 md:py-20">
          <div className="container-app">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="eyebrow text-fg-subtle">Swipe through all {t.slides.length} slides</p>
              <PriceTag template={t} />
            </div>
            <SlideStrip
              slides={t.slides}
              title={t.title}
              variant="full"
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
              priority
            />
          </div>
        </section>

        <section className="container-app grid gap-12 border-t border-border py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link href="/templates" className="eyebrow mb-8 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All templates
            </Link>
            <h2 className="mb-6 font-display text-display-md font-bold leading-[1.05] tracking-tight">What&apos;s included</h2>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-3xl bg-forest p-8 text-on-forest lg:col-span-5 lg:self-start">
            <p className="eyebrow mb-4 text-sun">Designed by Habib</p>
            <p className="font-serif text-3xl leading-tight">Want a carousel series made for your brand?</p>
            <p className="mt-4 text-on-forest-muted">
              I design custom carousels, posts and launch visuals in your colours and voice.
            </p>
            <Link
              href="/hire"
              className="eyebrow mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-fg transition-transform hover:-translate-y-0.5"
            >
              Work with me <ArrowUpRight className="size-4" />
            </Link>
          </aside>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
