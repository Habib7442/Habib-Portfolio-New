import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedLanding from "@/components/sections/FeaturedLanding";
import FeaturedWork from "@/components/sections/FeaturedWork";
import GalleryBand from "@/components/sections/GalleryBand";
import Services, { type Service } from "@/components/sections/Services";
import LandingShowcase from "@/components/sections/LandingShowcase";
import Products from "@/components/sections/Products";
import Testimonials from "@/components/sections/Testimonials";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import { PendingScroll } from "@/components/ui/ScrollLink";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqs } from "@/lib/faq";
import { mergeServices } from "@/lib/services";
import { homeSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { getSiteSettings, getProjects, getDesigns, getLandingPages, getBlogs, getProducts, getTestimonials } from "@/lib/sanity";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Rebuilt at most 60s after a content change; the admin also triggers /api/revalidate on every save.
export const revalidate = 60;

export default async function HomePage() {
  const [settings, projects, designs, landingPages, blogs, products, testimonials] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getDesigns(),
    getLandingPages(),
    getBlogs(),
    getProducts(),
    getTestimonials(),
  ]);

  const faqs = buildFaqs({ name: settings.name, projects, designCount: designs.length, landingCount: landingPages.length });

  const featured = projects.some((p) => p.featured) ? projects.filter((p) => p.featured) : projects;
  // Landing pages arrive featured-first; the top one gets its own section, the rest go in the grid.
  const spotlight = landingPages.find((l) => l.featured);
  const otherLandingPages = landingPages.filter((l) => l !== spotlight);

  // Each service shows a different design: first match by category preference, never reusing one.
  const usedDesigns = new Set<string>();
  const pickDesign = (...cats: string[]) => {
    const match = cats
      .flatMap((c) => designs.filter((d) => d.category === c))
      .find((d) => d.imageUrl && !usedDesigns.has(d._id));
    if (!match) return undefined;
    usedDesigns.add(match._id);
    return match.imageUrl;
  };
  // Text comes from the admin's Settings (falling back to lib/services.ts); images from the work itself.
  const serviceImages = [
    projects.find((p) => p.thumbnailUrl)?.thumbnailUrl,
    landingPages.find((l) => l.imageUrl)?.imageUrl,
    pickDesign("social_media", "photoshoot", "poster"),
    pickDesign("branding", "ui", "illustration", "photoshoot", "poster"),
  ];
  const services: Service[] = mergeServices(settings.services).map((s, i) => ({ ...s, imageUrl: serviceImages[i] }));

  return (
    <>
      <JsonLd data={homeSchema(faqs)} />
      <PendingScroll />
      <Navbar name={settings.name} />
      <main id="main-content">
        <Hero settings={settings} />
        <About settings={settings} />
        <FeaturedLanding page={spotlight} />
        <LandingShowcase pages={otherLandingPages} />
        <FeaturedWork projects={featured} />
        <Testimonials testimonials={testimonials} />
        <Products products={products} />
        <Services services={services} />
        <GalleryBand designs={designs} />
        <Writing posts={blogs} />
        <Faq faqs={faqs} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
