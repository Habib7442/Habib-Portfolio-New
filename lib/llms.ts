import { getBlogBySlug, getBlogs, getDesigns, getLandingPages, getProjects, getSiteSettings } from "@/lib/sanity";
import { buildFaqs } from "@/lib/faq";
import { cardDescription } from "@/lib/plain-text";
import { designCategoryLabel } from "@/lib/design-categories";
import { DEFAULT_DESCRIPTION, EXPERTISE, JOB_TITLE, LOCALLIFY, PERSON_NAME, SKILLS, absoluteUrl } from "@/lib/site";
import { whatsappUrl } from "@/lib/contact";

const oneLine = (s?: string) => (s ?? "").replace(/\s+/g, " ").trim();

/**
 * llms.txt (https://llmstxt.org): H1 site name, blockquote summary, H2 sections of
 * `- [Title](url): description` links, and an `## Optional` section. `full` adds page content.
 */
export async function buildLlmsTxt({ full = false } = {}) {
  const [settings, projects, designs, landingPages, posts] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getDesigns(),
    getLandingPages(),
    getBlogs(),
  ]);
  const name = settings.name || PERSON_NAME;
  const faqs = buildFaqs({ name, projects, designCount: designs.length, landingCount: landingPages.length });

  const out: string[] = [];
  out.push(`# ${name} — ${JOB_TITLE}`, "");
  out.push(`> ${oneLine(settings.seoDescription || settings.bio || DEFAULT_DESCRIPTION)}`, "");
  out.push(
    `${name} is based in Silchar, Assam, India and works remotely with clients worldwide. He is the founder of ${LOCALLIFY.name} (${LOCALLIFY.url}).`,
    `Expertise: ${EXPERTISE.join(", ")}. Tools: ${SKILLS.join(", ")}.`,
    `Portfolio size: ${projects.length} web projects, ${landingPages.length} landing pages, ${designs.length} visual design campaigns.`,
    ""
  );

  out.push("## Main pages", "");
  out.push(`- [Home](${absoluteUrl("/")}): About ${name}, services, selected work and FAQ`);
  out.push(`- [Work](${absoluteUrl("/work")}): Every project, landing page and design, with screenshots and live links`);
  out.push(`- [Writing](${absoluteUrl("/blogs")}): Articles and case studies`);
  out.push(`- [For hiring teams](${absoluteUrl("/hire")}): Stack, products, best landing pages, GitHub and LinkedIn`);
  out.push(`- [Contact on WhatsApp](${whatsappUrl()}): Fastest way to start a project`, "");

  if (projects.length) {
    out.push("## Projects", "");
    for (const p of projects) {
      out.push(`- [${p.title}](${absoluteUrl(`/work/${p.slug}`)}): ${oneLine(p.shortDescription)}${p.techStack.length ? ` Built with ${p.techStack.join(", ")}.` : ""}`);
    }
    out.push("");
  }

  if (landingPages.length) {
    out.push("## Landing pages", "");
    for (const l of landingPages) {
      const url = l.slug ? absoluteUrl(`/work/landing/${l.slug}`) : l.liveUrl || absoluteUrl("/work?type=landing");
      out.push(`- [${l.title}](${url}): ${cardDescription(l.plainDescription, l.description) || "Landing page design and build."}`);
    }
    out.push("");
  }

  if (posts.length) {
    out.push("## Writing", "");
    for (const b of posts) out.push(`- [${b.title}](${absoluteUrl(`/blogs/${b.slug}`)}): ${oneLine(b.excerpt)}`);
    out.push("");
  }

  out.push("## FAQ", "");
  for (const f of faqs) out.push(`### ${f.question}`, "", f.answer, "");

  if (full) {
    if (projects.some((p) => p.fullDescription)) {
      out.push("## Project details", "");
      for (const p of projects.filter((p) => p.fullDescription)) {
        out.push(`### ${p.title}`, "", `URL: ${absoluteUrl(`/work/${p.slug}`)}${p.liveUrl ? ` · Live: ${p.liveUrl}` : ""}`, "", p.fullDescription!.trim(), "");
      }
    }
    if (designs.length) {
      out.push("## Visual design", "");
      for (const d of designs) out.push(`- ${d.title} (${designCategoryLabel(d.category)})${d.description ? `: ${oneLine(d.description)}` : ""}`);
      out.push("");
    }
    if (posts.length) {
      out.push("## Articles (full text)", "");
      const fullPosts = await Promise.all(posts.map((b) => getBlogBySlug(b.slug)));
      for (const b of fullPosts) {
        if (!b?.content) continue;
        out.push(`### ${b.title}`, "", `URL: ${absoluteUrl(`/blogs/${b.slug}`)}`, "", b.content.trim(), "");
      }
    }
  }

  out.push("## Optional", "");
  if (!full) out.push(`- [Full content](${absoluteUrl("/llms-full.txt")}): Complete project descriptions and article text`);
  out.push(`- [${LOCALLIFY.name}](${LOCALLIFY.url}): ${LOCALLIFY.description}`);
  out.push(`- [Sitemap](${absoluteUrl("/sitemap.xml")}): Every page on the site`, "");

  return out.join("\n");
}
