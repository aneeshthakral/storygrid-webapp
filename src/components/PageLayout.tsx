import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DotField from "./DotField";

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
    <section className="relative isolate overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <DotField
          dotRadius={1.4}
          dotSpacing={22}
          bulgeStrength={67}
          glowRadius={180}
          cursorRadius={420}
          cursorForce={0.12}
          gradientFrom="#FF5C2B"
          gradientTo="#D42020"
          glowColor="#0F0706"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-24 text-center lg:px-10 lg:py-32">
        <div className="inline-flex items-center gap-3 rounded-full border border-ember/30 bg-ember/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-10 text-balance text-5xl font-extrabold leading-[0.92] tracking-tighter md:text-6xl lg:text-[5.25rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            {intro}
          </p>
        )}
        <div className="mt-12 flex items-center gap-4">
          <span className="h-px w-12 bg-ember" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            StoryGrid &amp; Co
          </span>
          <span className="h-px w-12 bg-ember" />
        </div>
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
