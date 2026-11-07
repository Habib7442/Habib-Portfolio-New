import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import SlideStrip from "@/components/ui/SlideStrip";
import TemplateCard, { PriceTag } from "@/components/ui/TemplateCard";
import TrackedLink from "@/components/ui/TrackedLink";
import { templateSchema } from "@/lib/schema";
import { templateCategoryLabel } from "@/lib/template-categories";
import { templatePath, templateTypeInfo, type TemplateTypeInfo } from "@/lib/template-types";
import { getSiteSettings, getTemplateBySlug, getTemplates, imgUrl, type CarouselTemplate } from "@/lib/sanity";

type Params = { params: Promise<{ type: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTemplateBySlug(slug);
  if (!t) return { title: "Template not found" };
  const type = templateTypeInfo(t.templateType);
  const path = templatePath(t);
  const image = imgUrl(t.slides[0].url, 1200);
  return {
    // e.g. "SAVRÉ — Fashion Launch Carousel · Canva Carousel Template" (short enough not to be cut off in search)
    title: `${t.title} · Canva ${type.singular} Template`,
    description: t.description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: t.title, description: t.description, images: [image] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

function includedList(t: CarouselTemplate, type: TemplateTypeInfo) {
  const count = `${t.slides.length} ${type.singular.toLowerCase()} ${type.unit}`;
  const size = t.size ? `${t.size} px` : null;
  const common = ["Every text, colour and photo editable in Canva", "Photos sit in frames — drag yours in to replace them"];
  switch (type.value) {
    case "reel":
      return [count, size ? `${size}, vertical for Reels` : "Vertical, sized for Reels", ...common, "No music included — add trending audio in Instagram when you post"];
    case "story":
      return [count, size ? `${size}, full-screen for Stories` : "Full-screen, sized for Stories", ...common];
    case "post":
      return [count, size ? `${size}, ready for the Instagram feed` : "Sized for the Instagram feed", ...common];
    default:
      return [count, size ? `${size}, ready for Instagram & LinkedIn` : "Sized for Instagram & LinkedIn", ...common, "Placeholder text for your brand, handle and contact"];
  }
}

export default async function TemplateDetail({ params }: Params) {
  const { type: typePath, slug } = await params;
  const [settings, t, all] = await Promise.all([getSiteSettings(), getTemplateBySlug(slug), getTemplates()]);
  if (!t) notFound();

  // One URL per template: a wrong type section in the address redirects to the right one.
  const type = templateTypeInfo(t.templateType);
  if (typePath !== type.path) permanentRedirect(templatePath(t));

  // Free templates open straight in Canva; paid ones go to the shop listing.
  const primary = t.isFree
    ? { href: t.canvaLink!, label: "Open in Canva — free", event: "template_canva_clicked" }
    : { href: t.buyLink!, label: `Get the template${t.price ? ` · ${t.price}` : ""}`, event: "template_buy_clicked" };
  const tracking = { slug: t.slug, title: t.title, type: t.templateType, category: t.category, free: t.isFree };
  const more = all.filter((o) => o.templateType === t.templateType && o._id !== t._id).slice(0, 3);

  return (
    <>
      <JsonLd data={templateSchema(t)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow={`${type.singular} template  ·  ${templateCategoryLabel(t.category)}`}
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
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex flex-wrap items-center gap-2 text-fg-subtle">
              <Link href="/templates" className="hover:text-fg">Templates</Link>
              <span aria-hidden>/</span>
              <Link href={`/templates/${type.path}`} className="hover:text-fg">{type.label}</Link>
              <span aria-hidden>/</span>
              <span className="text-fg-muted" aria-current="page">{t.title}</span>
            </nav>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="eyebrow text-fg-subtle">
                {t.slides.length > 1 ? `Swipe through all ${t.slides.length} ${type.unit}` : "Preview"}
              </p>
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
            <Link href={`/templates/${type.path}`} className="eyebrow mb-8 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All {type.label.toLowerCase()} templates
            </Link>
            <h2 className="mb-6 font-display text-display-md font-bold leading-[1.05] tracking-tight">What&apos;s included</h2>
            <ul className="space-y-4">
              {includedList(t, type).map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-3xl bg-forest p-8 text-on-forest lg:col-span-5 lg:self-start">
            <p className="eyebrow mb-4 text-sun">Designed by Habib</p>
            <p className="font-serif text-3xl leading-tight">Want a {type.singular.toLowerCase()} series made for your brand?</p>
            <p className="mt-4 text-on-forest-muted">
              I design custom carousels, reels, posts and launch visuals in your colours and voice.
            </p>
            <Link
              href="/hire"
              className="eyebrow mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-fg transition-transform hover:-translate-y-0.5"
            >
              Work with me <ArrowUpRight className="size-4" />
            </Link>
          </aside>
        </section>

        {more.length > 0 && (
          <section className="border-t border-border py-20" aria-labelledby="more-templates">
            <div className="container-app">
              <h2 id="more-templates" className="mb-10 font-display text-2xl font-bold tracking-tight md:text-3xl">
                More {type.label.toLowerCase()} templates
              </h2>
              <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((o) => (
                  <TemplateCard key={o._id} template={o} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
