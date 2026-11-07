import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import TemplateCard from "@/components/ui/TemplateCard";
import { templateListSchema } from "@/lib/schema";
import { TEMPLATE_TYPES } from "@/lib/template-types";
import { getSiteSettings, getTemplates } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Instagram Templates for Canva",
  description:
    "Editable Instagram templates for Canva by Habib Tanwir: carousels, reels, stories and posts for brands, boutiques and creators. Swap in your photos and words and post the same day.",
  alternates: { canonical: "/templates" },
  openGraph: { type: "website", url: "/templates" },
};

/** Hub: one band per template type that has templates, each linking to its own section page. */
export default async function TemplatesHub() {
  const [settings, templates] = await Promise.all([getSiteSettings(), getTemplates()]);
  const sections = TEMPLATE_TYPES.map((type) => ({ type, items: templates.filter((t) => t.templateType === type.value) })).filter(
    (s) => s.items.length > 0
  );

  return (
    <>
      <JsonLd data={templateListSchema(templates)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow="Templates"
          title={
            <>
              Instagram templates, <span className="italic text-sun">ready to post</span>
            </>
          }
          intro="Carousels, reels, stories and posts I designed in Canva. Swap in your photos and words, and post the same day."
        >
          {sections.length > 1 && (
            <nav aria-label="Template types" className="mt-8 flex flex-wrap gap-2">
              {sections.map(({ type, items }) => (
                <Link
                  key={type.value}
                  href={`/templates/${type.path}`}
                  className="eyebrow rounded-full border border-on-forest/30 px-4 py-2 text-[0.62rem] text-on-forest transition-colors hover:border-sun hover:text-sun"
                >
                  {type.label} <span className="text-on-forest-muted">({items.length})</span>
                </Link>
              ))}
            </nav>
          )}
        </PageHeader>

        {sections.length === 0 ? (
          <section className="py-14 md:py-20">
            <p className="container-app text-fg-muted">The first templates are on their way — check back soon.</p>
          </section>
        ) : (
          sections.map(({ type, items }, si) => (
            <section key={type.value} aria-labelledby={`type-${type.value}`} className="border-b border-border py-14 last:border-b-0 md:py-20">
              <div className="container-app">
                <Reveal className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 id={`type-${type.value}`} className="font-display text-display-md font-bold leading-[1.05] tracking-tight">
                      {type.heading}
                    </h2>
                    <p className="mt-3 max-w-xl text-fg-muted">{type.intro}</p>
                  </div>
                  <Link
                    href={`/templates/${type.path}`}
                    className="eyebrow inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border px-6 py-3.5 transition-colors hover:border-fg md:self-auto"
                  >
                    All {type.label.toLowerCase()} ({items.length}) <ArrowUpRight className="size-4" />
                  </Link>
                </Reveal>
                <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {items.slice(0, 3).map((t, i) => (
                    <Reveal key={t._id} delay={i * 0.05} className="h-full">
                      <TemplateCard template={t} priority={si === 0 && i < 3} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          ))
        )}

        <section className="container-app pb-24">
          <p className="max-w-xl text-fg-muted">
            Need a carousel series or launch visuals in your own brand style?{" "}
            <Link href="/hire" className="text-fg underline decoration-sun underline-offset-4 hover:text-accent-hover">
              I design custom sets too.
            </Link>
          </p>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
