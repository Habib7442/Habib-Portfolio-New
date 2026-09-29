"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

/**
 * The form hands off to WhatsApp: it opens the visitor's WhatsApp with their message
 * already typed to Habib's number. A copy is also saved to the admin Messages inbox
 * in the background, as a record — if that fails, the WhatsApp hand-off still works.
 */
export default function ContactForm() {
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    const body = {
      name: get("name"),
      email: get("email"),
      subject: get("subject"),
      message: get("message"),
      website: get("website"), // honeypot — real visitors leave this blank
    };
    if (body.website) return; // bot

    const text = [
      `Hi Habib! 👋`,
      ``,
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      ...(body.subject ? [`Subject: ${body.subject}`] : []),
      ``,
      body.message,
    ].join("\n");
    const url = whatsappUrl(text);

    // Open synchronously, inside the click, so popup blockers allow it.
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
    formEl.reset();

    // Backup copy in the admin inbox. keepalive lets it finish even if the tab changes.
    if (ADMIN_URL) {
      fetch(`${ADMIN_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => {});
    }
  }

  if (sentUrl) {
    return (
      <div className="rounded-2xl bg-bg-alt px-6 py-8 text-fg">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 size-5 shrink-0 text-[#25D366]" />
          <div>
            <p className="font-medium">WhatsApp is opening with your message.</p>
            <p className="mt-1 text-sm text-fg-muted">Just tap Send there and I&apos;ll reply soon.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={sentUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-fg"
          >
            <WhatsAppIcon className="size-4" /> Didn&apos;t open? Tap here
          </a>
          <button onClick={() => setSentUrl(null)} className="rounded-full border border-border px-5 py-3 text-sm font-medium text-fg-muted hover:text-fg">
            Write another
          </button>
        </div>
      </div>
    );
  }

  const field =
    "w-full bg-transparent border-0 border-b border-border focus:border-accent outline-none py-3 text-fg placeholder:text-fg-subtle transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="name" placeholder="Your name" required maxLength={100} className={field} />
        <input name="email" type="email" placeholder="Email" required className={field} />
      </div>
      <input name="subject" placeholder="Subject (optional)" maxLength={150} className={field} />
      <textarea name="message" placeholder="What are you building?" required rows={4} maxLength={2000} className={field + " resize-none"} />

      <button
        type="submit"
        className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 font-medium text-fg transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="size-5" />
        Send on WhatsApp
      </button>
    </form>
  );
}
