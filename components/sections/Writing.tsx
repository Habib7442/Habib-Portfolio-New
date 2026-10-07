import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { imgUrl, type BlogSummary } from "@/lib/sanity";

export function formatDate(iso?: string, month: "short" | "long" = "short") {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month, day: "numeric", year: "numeric" });
}

export default function Writing({ posts }: { posts: BlogSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border bg-bg-alt py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-accent-hover">✦ Writing</p>
            <h2 className="font-display text-display-md font-bold leading-[1.02] tracking-tight">
              Notes for business owners
            </h2>
          </div>
          <Link href="/blogs" className="eyebrow inline-flex items-center gap-1.5 text-fg hover:text-accent-hover">
            All posts <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post._id} delay={i * 0.06}>
              <Link href={`/blogs/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-muted">
                  {post.coverUrl && (
                    <Image
                      src={imgUrl(post.coverUrl, 700)}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="eyebrow mt-5 text-fg-subtle">
                  {[post.category, formatDate(post.publishedAt)].filter(Boolean).join("  ·  ")}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-snug transition-colors group-hover:text-accent-hover">
                  {post.title}
                </h3>
                {post.excerpt && <p className="mt-2 line-clamp-2 text-fg-muted">{post.excerpt}</p>}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
