import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import WorkGrid from "@/components/sections/WorkGrid";
import JsonLd from "@/components/seo/JsonLd";
import { designListSchema } from "@/lib/schema";
import { getDesigns, getSiteSettings } from "@/lib/sanity";

// Served from the cache; /api/revalidate refreshes it on every admin save.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Designs",
  description:
    "Posters, social media campaigns, AI-generated key art and brand visuals by Habib Tanwir. Open any design for every image, the full brief and the tools used.",
  alternates: { canonical: "/work/design" },
};

export default async function DesignsPage() {
  const [settings, designs] = await Promise.all([getSiteSettings(), getDesigns()]);

  return (
    <>
      <JsonLd data={designListSchema(designs)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow="Work  ·  Designs"
          title={
            <>
              Posters, campaigns &amp; <span className="italic text-sun">visual design</span>
            </>
          }
          intro="Campaign visuals, social posts, posters and AI key art. Open any piece to see every image and how it was made."
        />
        <section className="py-14 md:py-20">
          <div className="container-app">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex flex-wrap items-center gap-2 text-fg-subtle">
              <Link href="/work" className="hover:text-fg">Work</Link>
              <span aria-hidden>/</span>
              <span className="text-fg-muted" aria-current="page">Designs</span>
            </nav>
            <WorkGrid projects={[]} designs={designs} landingPages={[]} showFilters={false} />
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
