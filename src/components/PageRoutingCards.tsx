import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

const cards = [
  {
    to: "/approach",
    title: "Approach",
    desc: "The 6-stage methodology and why narrative systems beat one-off content.",
  },
  {
    to: "/services",
    title: "Services",
    desc: "Clear pricing, real deliverables, and the path from audit to full narrative system.",
  },
  {
    to: "/for-teams",
    title: "For Teams",
    desc: "Team Narrative Workshop for sales and marketing teams who write for your brand every day.",
  },
  {
    to: "/story",
    title: "Story",
    desc: "Built by a salesman, not a marketer. The brand story behind StoryGrid & Co.",
  },
  {
    to: "/resources",
    title: "Resources",
    desc: "Newsletter, free frameworks, and tools to sharpen your narrative.",
  },
  {
    to: "/contact",
    title: "Contact",
    desc: "Book a discovery call and tell us where your narrative needs to go.",
  },
];

export default function PageRoutingCards() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <p className="label-mono">Explore</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-4 text-4xl md:text-5xl">Where to Go Next</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.to} delay={i * 80} className="h-full">
            <Link to={c.to} className="card-tech group flex h-full flex-col p-7">
              <h3 className="text-lg text-foreground">{c.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <span className="label-mono mt-6 inline-flex items-center gap-2">
                Explore <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
