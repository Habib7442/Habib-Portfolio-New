import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { blogListSchema } from "@/lib/schema";
import { formatDate } from "@/components/sections/Writing";
import { getSiteSettings, getBlogs, imgUrl } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles by Habib Tanwir on building websites, landing pages and products — case studies and lessons from client work.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getBlogs()]);

  return (
    <>
      <JsonLd data={blogListSchema(posts)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow="Writing"
          title={
            <>
              Notes on building <span className="italic text-sun">things</span>
            </>
          }
          intro="Case studies, lessons from client work, and what I'm learning along the way."
        />

        <section className="py-14 md:py-20">
          <div className="container-app">
            {posts.length === 0 ? (
              <p className="text-fg-muted">Nothing published yet — check back soon.</p>
            ) : (
              <div className="border-t border-border">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blogs/${post.slug}`}
                    className="group grid gap-5 border-b border-border py-8 md:grid-cols-[240px_1fr_auto] md:items-center md:gap-10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-muted">
                      {post.coverUrl && (
                        <Image
                          src={imgUrl(post.coverUrl, 500)}
                          alt={post.title}
                          fill
                          sizes="(min-width: 768px) 240px, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div>
                      <p className="eyebrow mb-2 text-fg-subtle">
                        {[post.category, formatDate(post.publishedAt)].filter(Boolean).join("  ·  ")}
                      </p>
                      <h2 className="font-serif text-2xl leading-snug transition-colors group-hover:text-accent-hover md:text-3xl">
                        {post.title}
                      </h2>
                      {post.excerpt && <p className="mt-2 line-clamp-2 max-w-2xl text-fg-muted">{post.excerpt}</p>}
                    </div>
                    <span className="hidden size-12 items-center justify-center rounded-full border border-border transition-colors group-hover:border-sun group-hover:bg-sun md:flex">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
