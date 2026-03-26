import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogs } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen text-[#111] bg-[#FDFBF7] pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
          
          <div className="w-full md:max-w-[80%] mb-20 px-6 md:px-0 flex flex-col items-start relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-5xl md:text-7xl font-syne font-bold text-[#111] uppercase tracking-tighter">
                Writing
              </h1>
              <div className="h-16 w-16 bg-[#F472B6] rounded-full border-3 border-black shadow-[4px_4px_0px_#000] rotate-[-12deg] flex items-center justify-center">
                <span className="text-3xl">✍️</span>
              </div>
            </div>
            <p className="font-mono text-lg text-[#555] uppercase tracking-widest max-w-xl font-bold">
              Thoughts on technology, design, and building the web.
            </p>
          </div>

          <div className="w-full md:max-w-[80%] grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-0">
            {blogs && blogs.length > 0 ? blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col bg-white border-3 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#111] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_#111] transition-all duration-300"
              >
                {blog.cover_url && (
                  <div className="w-full aspect-video border-2 border-black rounded-xl overflow-hidden mb-6 shadow-[4px_4px_0px_#000]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blog.cover_url} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <h3 className="font-syne font-bold text-2xl text-[#111] mb-3">
                  {blog.title}
                </h3>
                
                <p className="font-inter text-[#555] mb-6 line-clamp-3 font-medium">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase py-1 px-3 bg-[#BBF7D0] border-2 border-black rounded-sm shadow-[2px_2px_0px_#000]">
                    {blog.category || "Article"}
                  </span>
                  
                  <Link href={`/blogs/${blog.slug}`} className="font-syne font-bold text-[#9333EA] hover:text-[#06B6D4] transition-colors flex items-center gap-1 group">
                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )) : (
              <div className="col-span-full w-full p-16 text-center border-4 border-black bg-[#C084FC] shadow-[8px_8px_0px_#111] rounded-2xl flex flex-col items-center justify-center min-h-[40vh]">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="font-syne text-4xl font-bold text-[#111] mb-2 drop-shadow-[2px_2px_0px_#fff]">Coming Soon</h3>
                <p className="font-mono font-bold text-[#111] bg-white px-4 py-2 border-2 border-black inline-block rotate-[-2deg]">Articles are being published shortly.</p>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
