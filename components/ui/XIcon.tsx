import { siX } from "simple-icons";

/** The current X (formerly Twitter) logo — lucide only ships the old bird. */
export default function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siX.path} />
    </svg>
  );
}
