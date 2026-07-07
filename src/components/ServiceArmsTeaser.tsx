import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { serviceCategories, type ServiceCategoryId } from "@/data/services";

const cardCopy: Record<ServiceCategoryId, string> = {
  narrative: "The story, the voice, and the content system that turns both into pipeline.",
  "ai-automation": "The workflow automation and AI systems that run your business day to day.",
  "digital-marketing": "The distribution that carries the story to market and brings demand back.",
};

export default function ServiceArmsTeaser({ currentId }: { currentId?: ServiceCategoryId }) {
  const cards = serviceCategories.filter((c) => c.id !== currentId);

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <p className="label-mono">Three ways we work</p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-4 text-4xl md:text-5xl">One story. Three arms to carry it.</h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Narrative is the core. Surface and Signal make it land, in the build and in the market.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.id} delay={i * 80} className="h-full">
            <Link to={c.path} className="card-tech group flex h-full flex-col p-7">
              <h3 className="text-lg text-foreground">{c.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {cardCopy[c.id]}
              </p>
              <span className="label-mono mt-6 inline-flex items-center gap-2">
                Explore{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
