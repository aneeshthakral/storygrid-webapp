import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram } from "lucide-react";
import Logo from "./Logo";

const nav = [
  ["/services", "Services"],
  ["/packages", "Packages"],
  ["/company", "Company"],
  ["/portfolio", "Portfolio"],
  ["/case-studies", "Case Studies"],
  ["/resources", "Resources"],
  ["/contact", "Talk to Us"],
] as const;

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="border-b border-white/5 py-10">
        <p className="label-mono flicker text-center">
          Build the story that builds your pipeline.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-3 lg:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Where narrative meets intelligence.
          </p>
          <a
            href="mailto:hello@storygrid.co"
            className="mt-4 inline-block text-sm text-foreground/85 transition hover:text-ember"
          >
            hello@storygrid.co
          </a>
        </div>

        <div>
          <p className="label-mono mb-5 !text-muted-foreground">Navigation</p>
          <ul className="space-y-3">
            {nav.map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to as string}
                  className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-ember"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-mono mb-5 !text-muted-foreground">Follow</p>
          <ul className="space-y-3">
            <li>
              <a href="#" className="inline-flex items-center gap-2.5 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-ember">
                <Linkedin size={14} /> LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="inline-flex items-center gap-2.5 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-ember">
                <Instagram size={14} /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-white/5 px-5 py-6 text-[0.7rem] text-muted-foreground md:flex-row md:items-center lg:px-10">
        <p>© 2026 StoryGrid &amp; Co. All rights reserved.</p>
        <div className="flex gap-6 font-mono uppercase tracking-[0.22em]">
          <a href="#" className="hover:text-ember">Privacy Policy</a>
          <a href="#" className="hover:text-ember">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
