import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-[68px]">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-grain" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <p className="label-mono">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] text-balance md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function WhereToGoNext() {
  const items = [
    { to: "/services", title: "Services", desc: "Narrative architecture, content systems, and ongoing strategic execution for growth-stage companies." },
    { to: "/packages", title: "Packages", desc: "Three monthly retainers and two one-time engagements. Natural client journey from audit to full narrative system." },
    { to: "/company", title: "Company", desc: "AI-first narrative strategy firm at the intersection of AI-augmented content production and founder-led narrative architecture." },
    { to: "/portfolio", title: "Portfolio", desc: "Proof of work. Before-and-after metrics. Case studies and narrative transformations." },
    { to: "/case-studies", title: "Case Studies", desc: "Real results from narrative-led strategy across growth-stage B2B companies." },
    { to: "/resources", title: "Resources", desc: "Frameworks, guides, and tools for building narrative-led growth." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <p className="label-mono">Explore</p>
      <h2 className="mt-4 text-4xl md:text-5xl">Where to Go Next</h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Link key={i.to} to={i.to} className="card-tech group block p-7">
            <h3 className="text-lg text-foreground">{i.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
            <span className="label-mono mt-6 inline-flex items-center gap-2">
              Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
