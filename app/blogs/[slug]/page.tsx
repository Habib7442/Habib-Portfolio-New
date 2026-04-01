import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

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

  if (!blog) {
    notFound();
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen text-[#111] bg-[#FDFBF7] pt-32 pb-20 overflow-x-hidden">
        <article className="container mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Back Button */}
          <div className="w-full max-w-4xl mb-12">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase py-2 px-4 bg-white border-3 border-black rounded-xl shadow-[4px_4px_0px_#111] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#111] transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Writing
            </Link>
          </div>

          {/* Header Section */}
          <div className="w-full max-w-4xl mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs font-bold uppercase py-1.5 px-4 bg-[#C084FC] border-2 border-black rounded-lg shadow-[3px_3px_0px_#111]">
                {blog.category || "Technology"}
              </span>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#555] uppercase">
                <Calendar className="w-3 h-3 text-[#9333EA]" /> {formattedDate}
              </div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#555] uppercase">
                <Clock className="w-3 h-3 text-[#9333EA]" /> {readingTime} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-syne font-extrabold text-[#111] leading-tight mb-8 tracking-tight">
              {blog.title}
            </h1>

            <p className="text-xl md:text-2xl font-inter font-medium text-[#111] leading-relaxed border-l-6 border-[#9333EA] pl-6 py-2 bg-[#F3E8FF]/30 rounded-r-2xl">
              {blog.excerpt}
            </p>
          </div>

          {/* Hero Image */}
          {blog.cover_url && (
            <div className="w-full max-w-5xl aspect-[21/9] mb-16 relative">
              <div className="absolute inset-0 bg-black rotate-[1deg] translate-x-2 translate-y-2 rounded-3xl" />
              <div className="w-full h-full border-4 border-black rounded-3xl overflow-hidden relative z-10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={blog.cover_url} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="w-full max-w-3xl">
            <div 
              className="blog-content w-full"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            {/* Tags / Footer of Article */}
            <div className="mt-16 pt-8 border-t-4 border-black flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 font-syne font-bold text-[#111]">
                <Tag className="w-5 h-5" /> TAGS:
              </div>
              {blog.tags && blog.tags.length > 0 ? blog.tags.map((tag: string) => (
                <span key={tag} className="font-mono text-xs font-bold uppercase py-1 px-3 bg-[#BBF7D0] border-2 border-black rounded-lg">
                  #{tag}
                </span>
              )) : (
                <span className="font-mono text-xs font-bold uppercase py-1 px-3 bg-[#E5E7EB] border-2 border-black rounded-lg">
                  #Innovation
                </span>
              )}
            </div>
          </div>

          {/* Related Articles or Newsletter Placeholder */}
          <div className="w-full max-w-4xl mt-32 p-8 md:p-12 bg-[#FDE047] border-4 border-black rounded-[40px] shadow-[12px_12px_0px_#111] relative overflow-hidden group">
            <div className="absolute top-[-20px] right-[-20px] text-[150px] opacity-10 rotate-[20deg] group-hover:rotate-[10deg] transition-transform duration-500">
               ✍️
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-syne font-bold text-[#111] mb-4 uppercase tracking-tighter">
                  Love this content?
                </h3>
                <p className="text-lg font-mono font-bold text-[#111]/80 max-w-md">
                  I share weekly insights on AI, Full-Stack Development and building high-performance products.
                </p>
              </div>
              <Link 
                href="/#contact"
                className="neo-btn bg-black text-white hover:bg-[#111] whitespace-nowrap"
              >
                Let's Build Together
              </Link>
            </div>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
