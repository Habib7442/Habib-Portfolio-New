import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogs } from "@/lib/data";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: "var(--bg)" }}>
        <section className="pt-40 pb-24">
          <div className="container-editorial">
            {/* Header */}
            <div className="max-w-3xl mb-20">
              <p className="eyebrow mb-6">05 / Writing</p>
              <h1 className="text-display-2xl font-display italic leading-none mb-8" style={{ color: "var(--fg)" }}>
                Writing
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Thoughts on engineering, design systems, and the intersection of AI and human creativity.
              </p>
            </div>

            {/* Blog List */}
            <div className="flex flex-col">
              {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="group border-b border-[var(--border-color)] py-10 flex flex-col md:flex-row gap-8 items-start transition-colors"
                  >
                    {/* Meta info on the left for desktop */}
                    <div className="md:w-32 shrink-0 pt-1">
                      <span className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase() : '2026'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl md:text-3xl mb-4 transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--fg)" }}>
                        {blog.title}
                      </h3>
                      <p className="text-base max-w-2xl leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <span className="eyebrow" style={{ fontSize: "10px", color: "var(--fg-subtle)" }}>
                          {blog.category || "ENGINEERING"}
                        </span>
                        <span className="arrow-link" style={{ fontSize: "14px" }}>
                          Read Article <span>→</span>
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail on the right */}
                    {blog.cover_url && (
                      <div className="w-full md:w-64 aspect-video overflow-hidden rounded-sm border border-[var(--border-color)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={blog.cover_url} 
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <div className="py-20 border-t border-[var(--border-color)]">
                  <p className="text-xl italic font-display" style={{ color: "var(--fg-muted)" }}>
                    No articles found. Check back soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
