import posthog from "posthog-js";

// Analytics (PostHog). Next runs this file in the browser once, before the app hydrates; posthog-js
// then loads its extras (replay, surveys…) in the background, so it never holds up the hero / LCP.
// Events go through /ingest on this domain (rewrites in next.config.ts), which ad blockers don't block.
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
  });
}
