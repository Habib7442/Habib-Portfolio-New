import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import TemplateCard from "@/components/ui/TemplateCard";
import { templateListSchema } from "@/lib/schema";
import { TEMPLATE_CATEGORIES } from "@/lib/template-categories";
import { getSiteSettings, getTemplates } from "@/lib/sanity";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carousel Templates",
  description:
    "Editable Instagram and LinkedIn carousel templates for Canva by Habib Tanwir — fashion, personal brand and business layouts you can make your own in minutes.",
  alternates: { canonical: "/templates" },
};

export default async function TemplatesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category }, settings, templates] = await Promise.all([searchParams, getSiteSettings(), getTemplates()]);

  // Only offer filters for categories that actually have templates.
  const used = TEMPLATE_CATEGORIES.filter((c) => templates.some((t) => t.category === c.value));
  const active = used.some((c) => c.value === category) ? category : undefined;
  const shown = active ? templates.filter((t) => t.category === active) : templates;

  const chip = (selected: boolean) =>
    cn(
      "eyebrow rounded-full border px-4 py-2 text-[0.62rem] transition-colors",
      selected ? "border-fg bg-fg text-bg" : "border-border text-fg-muted hover:border-fg hover:text-fg"
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
              Carousel templates, <span className="italic text-sun">ready to post</span>
            </>
          }
          intro="Instagram and LinkedIn carousels I designed in Canva. Swap in your photos and words, and post the same day."
        />

        <section className="py-14 md:py-20">
          <div className="container-app">
            {templates.length === 0 ? (
              <p className="text-fg-muted">The first templates are on their way — check back soon.</p>
            ) : (
              <>
                {used.length > 1 && (
                  <nav aria-label="Filter templates by category" className="mb-10 flex flex-wrap gap-2 md:mb-14">
                    <Link href="/templates" scroll={false} className={chip(!active)} aria-current={!active ? "page" : undefined}>
                      All
                    </Link>
                    {used.map((c) => (
                      <Link
                        key={c.value}
                        href={`/templates?category=${c.value}`}
                        scroll={false}
                        className={chip(active === c.value)}
                        aria-current={active === c.value ? "page" : undefined}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </nav>
                )}

                <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {shown.map((t, i) => (
                    <Reveal key={t._id} delay={(i % 3) * 0.05} className="h-full">
                      <TemplateCard template={t} priority={i < 3} />
                    </Reveal>
                  ))}
                </div>
              </>
            )}

            <p className="mt-20 max-w-xl text-fg-muted">
              Need a carousel series in your own brand style?{" "}
              <Link href="/hire" className="text-fg underline decoration-sun underline-offset-4 hover:text-accent-hover">
                I design custom sets too.
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
