import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ReviewForm from "@/components/ui/ReviewForm";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Leave a review",
  description: "Worked with Habib Tanwir? Share a quick review of the project.",
  alternates: { canonical: "/review" },
  // A form page adds nothing to search results; keep it out of the index but let links be followed.
  robots: { index: false, follow: true },
};

export default async function ReviewPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow="Review"
          title={
            <>
              How did we <span className="italic text-sun">do?</span>
            </>
          }
          intro="If we've worked together, I'd love to hear about it. It only takes a minute, and it really helps."
        />
        <section className="bg-bg-alt py-14 md:py-20">
          <div className="container-app">
            <div className="mx-auto max-w-2xl rounded-[28px] border border-border bg-bg-elevated p-6 md:p-10">
              <ReviewForm />
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
