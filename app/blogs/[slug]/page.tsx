import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.seo_title || blog.title} | Habib Tanwir`,
    description: blog.seo_description || blog.excerpt,
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt,
      images: blog.cover_url ? [{ url: blog.cover_url }] : [],
    }
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  return (
    <>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: "var(--bg)" }}>
        <article className="pt-40 pb-32">
          <div className="container-editorial">
            {/* Header */}
            <header className="max-w-4xl mb-16">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link href="/blogs" className="eyebrow hover:text-[var(--fg)] transition-colors">
                  ← Back to Writing
                </Link>
                <span className="text-[var(--border-strong)]">/</span>
                <span className="eyebrow" style={{ color: "var(--fg)" }}>
                  {blog.category || "ENGINEERING"}
                </span>
                <span className="text-[var(--border-strong)]">/</span>
                <span className="eyebrow">
                  {formattedDate}
                </span>
              </div>

              <h1 className="text-display-xl font-display italic leading-tight mb-8" style={{ color: "var(--fg)" }}>
                {blog.title}
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed italic" style={{ color: "var(--fg-muted)" }}>
                {blog.excerpt}
              </p>
            </header>

            {/* Featured Image */}
            {blog.cover_url && (
              <div className="w-full aspect-[21/9] mb-20 overflow-hidden rounded-sm border border-[var(--border-color)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={blog.cover_url} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-20 items-start">
              <div 
                className="prose-editorial"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Sidebar */}
              <aside className="hidden lg:flex flex-col gap-12 sticky top-32">
                <div className="flex flex-col gap-4">
                  <p className="eyebrow" style={{ fontSize: "10px" }}>Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags && blog.tags.map((tag: string) => (
                      <span key={tag} className="tech-tag">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-8 border-t border-[var(--border-color)]">
                  <p className="eyebrow" style={{ fontSize: "10px" }}>Ready to talk?</p>
                  <a 
                    href="https://wa.me/919707370886" 
                    className="arrow-link"
                    style={{ fontSize: "14px" }}
                  >
                    Book a project <span>→</span>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
