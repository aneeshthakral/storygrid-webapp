import { createFileRoute } from "@tanstack/react-router";
import PageLayout, { PageHeader, WhereToGoNext } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/company")({
  component: Company,
  head: () => ({
    meta: [
      { title: "Company — StoryGrid & Co" },
      { name: "description", content: "AI-First Narrative Strategy Firm. We treat storytelling as a foundational business system." },
    ],
  }),
});

const principles = [
  ["Strategic over tactical", "Every artifact ladders to a positioning thesis."],
  ["Creative over formulaic", "Templates accelerate work, they don't replace voice."],
  ["Vibrant over muted", "Warmth, depth, and sustained energy — not loud bursts."],
  ["Premium over accessible", "We serve a narrow band of growth-stage founders."],
  ["AI-forward over AI-skeptical", "AI as a production accelerant, not a thinking replacement."],
  ["Precise over verbose", "Every sentence earns its place on the page."],
];

function Company() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Company"
        title={<>The Story Behind the Firm</>}
        intro="AI-First Narrative Strategy Firm. StoryGrid & Co. treats storytelling not as a marketing tactic but as a foundational business system. The layer between a founder's vision and their market's perception."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="label-mono">Brand Philosophy</p>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-7 max-w-3xl text-2xl leading-snug md:text-3xl">
            The brand operates under the creative direction of{" "}
            <span className="text-ember">"Controlled Combustion."</span> Warmth,
            depth, and sustained energy rather than loud, singular bursts.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map(([t, body], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="card-tech p-6">
                <p className="font-display text-base text-foreground">{t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-12 border-t border-white/5 pt-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="label-mono">Origin</p>
              <h3 className="mt-4 text-3xl text-balance md:text-4xl">
                Founded at the intersection of strategy and machine-speed production.
              </h3>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                StoryGrid & Co. was founded on a single observation: AI did not
                kill content marketing — it killed undifferentiated content
                marketing. The companies winning today are the ones whose
                narrative is so specific, so owned, so structurally distinct,
                that no LLM can generate a flattering imitation.
              </p>
              <p>
                We build that layer. We extract the founder's voice, architect
                the positioning thesis, then run the engine that ships it to
                market every week. The result is not "more content." It is a
                category position that compounds.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <WhereToGoNext />
    </PageLayout>
  );
}
