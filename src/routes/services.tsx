import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout, { PageHeader, WhereToGoNext } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services — StoryGrid & Co" },
      { name: "description", content: "Narrative architecture, content systems, and ongoing strategic execution for growth-stage B2B companies." },
    ],
  }),
});

const services = [
  {
    n: "01",
    eyebrow: "Architecture",
    title: "Narrative Architecture",
    body: "Brand positioning audit, founder voice extraction (2x 60-min interviews), messaging framework, ICP-aligned narrative strategy, competitive positioning document.",
    chips: ["Positioning Document", "Voice & Tone Guide", "Competitive Narrative Map", "Story Architecture Blueprint"],
    fit: "For early-stage founders who need a clear, ownable narrative before they scale content volume.",
  },
  {
    n: "02",
    eyebrow: "Engine",
    title: "Content & Distribution Systems",
    body: "Purpose-built content systems that compound. Not a content calendar. A narrative machine that runs consistently without burning you out.",
    chips: ["Content System Design", "Channel Strategy", "Templatized Frameworks", "AI Workflow Integration"],
    fit: "For growth-stage founders building a content system that compounds into pipeline over time.",
  },
  {
    n: "03",
    eyebrow: "Distribution",
    title: "Ongoing Strategic Execution",
    body: "Strategy plus hands-on execution. We write, refine, and publish. You stay in the conversation. Your story compounds every week.",
    chips: ["Weekly Content Production", "Narrative Review Cadence", "Founder Coaching", "Story Performance Reporting"],
    fit: "For growth-stage companies ready to own their narrative category across every channel they show up in.",
  },
];

function Services() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Services"
        title={<>What We Build</>}
        intro="StoryGrid & Co. operates a three-tier service model with clear value progression."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <article className="card-tech p-7 md:p-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-4xl text-ember/40">{s.n}</span>
                  <span className="label-mono">{s.eyebrow}</span>
                </div>
                <h2 className="mt-4 text-2xl text-foreground md:text-3xl">{s.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-ember/40 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ember"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-6 max-w-2xl text-sm text-muted-foreground/80">
                  {s.fit}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              This architecture allows clients to enter at strategy-only (Tier 01)
              and expand into execution (Tier 02–03), creating natural upsell
              paths. Narrative, when architected as a system rather than produced
              as content, compounds over time — building authority, trust, and
              pipeline simultaneously.
            </p>
            <div className="mt-8">
              <Link to="/packages" className="btn-radial">View Packages</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <WhereToGoNext />
    </PageLayout>
  );
}
