"use client";

import posthog from "posthog-js";
import type { ComponentProps } from "react";

/**
 * An external link that also records a PostHog event on click (e.g. which template someone tried to buy).
 * posthog-js is a no-op when analytics isn't configured, so this is safe everywhere.
 */
export default function TrackedLink({
  event,
  properties,
  onClick,
  ...props
}: ComponentProps<"a"> & { event: string; properties?: Record<string, string | number | boolean> }) {
  return (
    <a
      target="_blank"
      rel="noopener"
      {...props}
      onClick={(e) => {
        posthog.capture(event, properties);
        onClick?.(e);
      }}
    />
  );
}
