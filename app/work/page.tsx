import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import WorkGrid from "@/components/sections/WorkGrid";
import JsonLd from "@/components/seo/JsonLd";
import { workSchema } from "@/lib/schema";
import { getSiteSettings, getProjects, getDesigns, getLandingPages } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Web projects, landing pages and visual design by Habib Tanwir — screenshots, tech stack and live links for every piece.",
  alternates: { canonical: "/work" },
};

const TYPES = ["project", "design", "landing"] as const;

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const [{ type }, settings, projects, designs, landingPages] = await Promise.all([
    searchParams,
    getSiteSettings(),
    getProjects(),
    getDesigns(),
    getLandingPages(),
  ]);
  const initial = TYPES.find((t) => t === type) ?? "all";

  return (
    <>
      <JsonLd data={workSchema(projects)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow="Work"
          title={
            <>
              Projects, landing pages &amp; <span className="italic text-sun">visual design</span>
            </>
          }
          intro="Everything I've built and designed, in one place. Filter by type, tap a design to see it full size."
        />
        <section className="py-14 md:py-20">
          <div className="container-app">
            {/* key: re-init the filter when ?type= changes via client navigation */}
            <WorkGrid key={initial} projects={projects} designs={designs} landingPages={landingPages} initialFilter={initial} />
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
