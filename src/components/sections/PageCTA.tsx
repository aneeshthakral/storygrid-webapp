import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

type CtaLink = { to: string; label: string; primary?: boolean };

export default function PageCTA({
  title,
  links,
}: {
  title: ReactNode;
  links: CtaLink[];
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full bg-ember/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-28 text-center lg:px-10 lg:py-40">
        <Reveal>
          <h2 className="text-balance text-4xl font-extrabold leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={"btn-radial " + (l.primary ? "btn-radial-solid" : "")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
