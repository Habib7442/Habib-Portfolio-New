import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

// Branded 404. Next sends it with a real 404 status (and noindex), which Search Console expects.
export default async function NotFound() {
  const settings = await getSiteSettings();
  return (
    <>
      <Navbar name={settings.name} />
      <main id="main-content">
        <section className="flex min-h-[80vh] items-center bg-forest pt-28 pb-20 text-on-forest">
          <div className="container-app">
            <p className="eyebrow mb-5 text-sun">Error 404</p>
            <h1 className="max-w-2xl font-serif text-display-lg leading-[1.02]">
              This page doesn&apos;t <span className="italic text-sun">exist</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-on-forest-muted">
              The link may be old or mistyped. Here are some places to go instead.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="eyebrow rounded-full bg-sun px-6 py-4 text-fg">
                Back to home
              </Link>
              <Link href="/work" className="eyebrow rounded-full border border-on-forest/30 px-6 py-4 text-on-forest">
                See my work
              </Link>
              <Link href="/blogs" className="eyebrow rounded-full border border-on-forest/30 px-6 py-4 text-on-forest">
                Read the blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
