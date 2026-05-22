import { Link } from "react-router-dom";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={"group flex items-center gap-2.5 " + className}>
      <div className="relative h-9 w-9 shrink-0">
        <svg viewBox="0 0 40 40" className="h-full w-full transition-transform duration-500 group-hover:rotate-[10deg]">
          {/* Bot-head silhouette */}
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FF5C2B" />
              <stop offset="1" stopColor="#E8451A" />
            </linearGradient>
          </defs>
          <rect x="6" y="9" width="28" height="22" rx="7" fill="url(#lg)" />
          <rect x="18.5" y="3" width="3" height="6" rx="1.2" fill="url(#lg)" />
          <circle cx="20" cy="3" r="1.8" fill="#FF8040" />
          <circle cx="15" cy="19" r="2.6" fill="#1a0a08" />
          <circle cx="25" cy="19" r="2.6" fill="#1a0a08" />
          <circle cx="15" cy="19" r="1.1" fill="#FFD8C7" />
          <circle cx="25" cy="19" r="1.1" fill="#FFD8C7" />
          <rect x="14" y="25" width="12" height="1.6" rx="0.8" fill="#1a0a08" opacity="0.55" />
        </svg>
        <span className="pointer-events-none absolute -inset-1 rounded-full bg-ember/20 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex items-baseline font-display text-[1.05rem] font-bold tracking-tight">
        <span className="text-foreground">StoryGrid</span>
        <span className="text-blaze">&amp;</span>
        <span className="text-foreground">Co</span>
      </div>
    </Link>
  );
}
