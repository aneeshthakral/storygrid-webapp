import { createFileRoute } from "@tanstack/react-router";
import PageLayout, { PageHeader, WhereToGoNext } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
  head: () => ({
    meta: [
      { title: "Case Studies — StoryGrid & Co" },
      { name: "description", content: "Real results from narrative-led strategy across growth-stage B2B companies." },
    ],
  }),
});

const cases = [
  {
    title: "From silent operator to category voice",
    client: "Series B Fintech CEO",
    duration: "9 months",
    pillars: ["Founder voice extraction", "Weekly LinkedIn cadence", "Quarterly narrative campaigns"],
    before: "0.4% LinkedIn engagement, 1,800 followers, no inbound from founder brand",
    after: "5.8% engagement, 28k followers, 41 inbound qualified meetings sourced from posts",
  },
  {
    title: "Rebuilding a category that was no longer theirs",
    client: "AI Devtools Founder",
    duration: "6 months",
    pillars: ["Positioning rebuild", "Narrative architecture document", "Manifesto launch"],
    before: "Outranked by 4 better-funded competitors, no defining POV",
    after: "Owned 'agent-native infra' search intent, +212% organic, Series A 2.4x oversubscribed",
  },
  {
    title: "From content factory to narrative system",
    client: "Healthtech Series C CMO",
    duration: "12 months",
    pillars: ["Engine rebuild", "AI workflow integration", "Multi-channel cadence"],
    before: "5 writers, 80 posts/month, declining engagement, burned-out team",
    after: "2 strategists, 40 posts/month, 3.6x engagement, leadership pipeline up 2.1x",
  },
];

function CaseStudies() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Case Studies"
        title={<>Narrative, measured.</>}
        intro="Real results from narrative-led strategy across growth-stage B2B companies. Numbers and the moves behind them."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="space-y-6">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="card-tech p-7 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="label-mono">{c.client}</span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {c.duration}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl text-foreground md:text-3xl">{c.title}</h2>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="label-mono !text-muted-foreground">Pillars</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                      {c.pillars.map((p) => <li key={p}>— {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="label-mono !text-muted-foreground">Before</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.before}</p>
                  </div>
                  <div className="rounded-lg border border-ember/30 bg-ember/[0.04] p-5">
                    <p className="label-mono">After</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">{c.after}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <WhereToGoNext />
    </PageLayout>
  );
}
