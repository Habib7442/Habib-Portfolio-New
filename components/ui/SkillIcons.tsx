import { siNextdotjs, siNodedotjs, siReact, siSupabase, siTypescript, type SimpleIcon } from "simple-icons";

// Adobe had its logos removed from simple-icons, so Photoshop's badge is drawn by hand
// in Adobe's own colours (navy square, blue "Ps").
function PhotoshopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#001E36" />
      <text x="12" y="16.4" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="11" fill="#31A8FF">
        Ps
      </text>
    </svg>
  );
}

// simple-icons is single-colour; the real Figma mark is five colours.
function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" className={className} aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={`#${icon.hex}`} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

const SKILLS: { name: string; icon: SimpleIcon | "photoshop" | "figma" }[] = [
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "TypeScript", icon: siTypescript },
  { name: "Node.js", icon: siNodedotjs },
  { name: "React Native", icon: siReact },
  { name: "Supabase", icon: siSupabase },
  { name: "Figma", icon: "figma" },
  { name: "Photoshop", icon: "photoshop" },
];

export default function SkillIcons() {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-3.5">
      {SKILLS.map((s) => (
        <li
          key={s.name}
          className="flex items-center gap-3 rounded-full border border-border bg-bg-elevated py-2.5 pr-5 pl-3 text-sm font-medium text-fg transition-transform hover:-translate-y-0.5"
        >
          {s.icon === "photoshop" ? (
            <PhotoshopIcon className="size-5" />
          ) : s.icon === "figma" ? (
            <FigmaIcon className="size-5" />
          ) : (
            <BrandIcon icon={s.icon} className="size-5" />
          )}
          {s.name}
        </li>
      ))}
    </ul>
  );
}
