import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import TemplateGrid from "@/components/sections/TemplateGrid";
import { templateListSchema } from "@/lib/schema";
import { templatePath, templateTypeByPath } from "@/lib/template-types";
import { getSiteSettings, getTemplateBySlug, getTemplates, imgUrl } from "@/lib/sanity";

type Params = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { type: path } = await params;
  const type = templateTypeByPath(path);
  if (!type) return { title: "Templates" };
  const items = (await getTemplates()).filter((t) => t.templateType === type.value);
  const image = items[0] ? imgUrl(items[0].slides[0].url, 1200) : undefined;
  return {
    title: type.seoTitle,
    description: type.description,
    alternates: { canonical: `/templates/${type.path}` },
    openGraph: { type: "website", url: `/templates/${type.path}`, title: type.seoTitle, description: type.description, ...(image && { images: [image] }) },
    twitter: { card: "summary_large_image", ...(image && { images: [image] }) },
  };
}

/**
 * A template-type section, e.g. /templates/carousels. Old one-segment template links
 * (/templates/<slug>) land here too and are sent permanently to /templates/<type>/<slug>.
 */
export default async function TemplateTypePage({ params, searchParams }: Params & { searchParams: Promise<{ category?: string }> }) {
  const { type: path } = await params;
  const type = templateTypeByPath(path);

  if (!type) {
    const template = await getTemplateBySlug(path);
    if (template) permanentRedirect(templatePath(template));
    notFound();
  }

  const [{ category }, settings, all] = await Promise.all([searchParams, getSiteSettings(), getTemplates()]);
  const items = all.filter((t) => t.templateType === type.value);
  // No thin, empty pages in search: a section only exists once it has templates.
  if (items.length === 0) notFound();

  return (
    <>
      <JsonLd data={templateListSchema(items, type)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader eyebrow={`Templates  ·  ${type.label}`} title={type.heading} intro={type.intro} />

        <section className="py-14 md:py-20">
          <div className="container-app">
            <Link href="/templates" className="eyebrow mb-10 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All templates
            </Link>
            <TemplateGrid templates={items} basePath={`/templates/${type.path}`} category={category} />
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
