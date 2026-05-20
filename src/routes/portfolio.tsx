import { createFileRoute } from "@tanstack/react-router";
import PageLayout, { PageHeader, WhereToGoNext } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Portfolio — StoryGrid & Co" },
      { name: "description", content: "Proof of work. Before-and-after metrics. Case studies and narrative transformations." },
    ],
  }),
});

const work = [
  { client: "Fintech Series B", category: "Narrative Engine", metric: "+412% inbound", color: "from-orange-500/30 to-red-700/20" },
  { client: "AI Devtools Seed", category: "Founder Voice Sprint", metric: "21k LinkedIn followers in 6mo", color: "from-rose-500/30 to-amber-700/20" },
  { client: "Healthtech Growth", category: "Full Narrative System", metric: "3 category-creating campaigns", color: "from-red-500/30 to-orange-700/20" },
  { client: "Climate SaaS", category: "Narrative Architecture", metric: "Series A closed in 9 weeks", color: "from-amber-500/30 to-red-700/20" },
  { client: "B2B Marketplace", category: "Narrative Engine", metric: "2.4x SQL conversion", color: "from-orange-600/30 to-rose-700/20" },
  { client: "Cybersecurity Co.", category: "Full Narrative System", metric: "Acquired in 14 months", color: "from-red-600/30 to-amber-700/20" },
];

function Portfolio() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Portfolio"
        title={<>Proof of work.</>}
        intro="Before-and-after metrics from real engagements. Narrative is infrastructure — these are the buildings we've helped raise."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {work.map((w, i) => (
            <Reveal key={w.client} delay={i * 90}>
              <a href="#" className="card-tech group block overflow-hidden">
                <div className={"relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br " + w.color}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,90,46,0.25),transparent_60%)]" />
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 12px)" }} />
                  <span className="absolute left-4 top-4 label-mono">{w.category}</span>
                  <span className="absolute bottom-4 right-4 font-display text-2xl text-foreground">→</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-foreground">{w.client}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.metric}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <WhereToGoNext />
    </PageLayout>
  );
}
