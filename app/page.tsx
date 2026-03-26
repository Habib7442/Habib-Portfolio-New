import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Designs from "@/components/sections/Designs";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import { getProjects, getDesigns, getTestimonials } from "@/lib/data";

// Set revalidate to time in seconds if you want ISR or leave as dynamic
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  const designs = await getDesigns();
  const testimonials = await getTestimonials();

  return (
    <>
      <Navbar />
      <main className="w-full h-full text-[#111] bg-[#FDFBF7]">
        <Hero />
        <Marquee />
        <About />
        {designs && designs.length > 0 && <Designs designs={designs} />}
        <Projects projects={projects} />
        {testimonials && testimonials.length > 0 ? (
          <Reviews testimonials={testimonials} />
        ) : (
          <Reviews testimonials={[]} />
        )}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
