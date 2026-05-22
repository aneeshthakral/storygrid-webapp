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
    <section className="border-t border-white/5 bg-grain">
      <div className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="text-3xl text-balance md:text-4xl lg:text-5xl">{title}</h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
