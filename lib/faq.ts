import type { Project } from "@/lib/sanity";
import { LOCALLIFY, PERSON_NAME } from "@/lib/site";

export type Faq = { question: string; answer: string };

/**
 * Answer-first, self-contained Q&As (what answer engines quote). Shown on the home page and
 * mirrored in FAQPage JSON-LD and llms.txt. Counts come live from Sanity.
 */
export function buildFaqs({
  name = PERSON_NAME, // from admin Settings
  projects,
  designCount,
  landingCount,
}: {
  name?: string;
  projects: Pick<Project, "title">[];
  designCount: number;
  landingCount: number;
}): Faq[] {
  const examples = projects.slice(0, 3).map((p) => p.title);
  const shipped = [
    projects.length && `${projects.length} web projects`,
    landingCount && `${landingCount} landing pages`,
    designCount && `${designCount} visual design campaigns`,
  ].filter(Boolean);

  const faqs: Faq[] = [
    {
      question: `Who is ${name}?`,
      answer: `${name} is a web developer and designer based in Silchar, Assam, India. He builds web apps, SaaS products and high-converting landing pages, and designs the posters, social media creatives and brand visuals that go with them. He is also the founder of ${LOCALLIFY.name}, a software studio serving clients worldwide.`,
    },
    {
      question: `What services does ${name} offer?`,
      answer: `He offers four services: full-stack web and app development (Next.js, React, TypeScript, Node.js), landing page design and development, poster and social media design, and branding and visual identity. One person can cover the whole job: the product, the page that sells it, and the visuals around it.`,
    },
  ];

  if (shipped.length) {
    faqs.push({
      question: `What has ${name} built?`,
      answer: `So far he has shipped ${shipped.join(", ")}${examples.length ? `, including ${examples.join(", ")}` : ""}. Every piece is listed with screenshots, the tech stack used and a live link on the Work page of habibtanwir.com.`,
    });
  }

  faqs.push(
    {
      question: `What technologies does ${name} use?`,
      answer: `For development he uses Next.js, React, TypeScript, Node.js, React Native, Supabase and Sanity. For design he uses Figma and Photoshop. Websites are built in code rather than with page builders, so they load fast, are search-engine friendly and are easy to extend later.`,
    },
    {
      question: `Does ${name} work with clients outside India?`,
      answer: `Yes. ${name} works remotely with clients worldwide, on both freelance projects and full-time roles. Projects are run over WhatsApp, email and video calls, with work shared as live preview links so clients can review progress at any time.`,
    },
    {
      question: `What is ${LOCALLIFY.name}?`,
      answer: `${LOCALLIFY.name} is a software studio in Silchar, Assam, India, founded by ${name}. It builds custom software, web apps and SaaS platforms, mobile apps, AI features and workflow automation for businesses around the world. Its website is locallifyagency.com.`,
    },
    {
      question: `How can I hire ${name}?`,
      answer: `The fastest way is WhatsApp: tap "Chat on WhatsApp" on habibtanwir.com and describe your project. Mention what you are building, your timeline and any examples you like. ${name} usually replies the same day.`,
    }
  );

  return faqs;
}
