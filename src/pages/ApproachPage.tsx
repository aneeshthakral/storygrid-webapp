import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import PageCTA from "@/components/sections/PageCTA";
import { SectionHeading, SectionShell } from "@/components/sections/SectionShell";
import { usePageTitle } from "@/hooks/usePageTitle";

const stages = [
  {
    n: "01",
    title: "Input",
    body: "We go deep before we write a word. Founder interviews, market landscape, competitor messaging audit. We learn how you actually talk, think, and sell.",
  },
  {
    n: "02",
    title: "Audit",
    body: "We map what's working and what's bleeding attention. Where the narrative breaks. Where the story contradicts itself across your site, your deck, and your team's mouths.",
  },
  {
    n: "03",
    title: "Architecture",
    body: "The core story. Messaging pillars. The voice system. A content framework that any channel can be built from. This is the foundation everything else stands on.",
  },
  {
    n: "04",
    title: "System",
    body: "We build the production engine. AI-augmented workflows, channel strategy, the cadence. This is where AI-first stops being a slogan and becomes infrastructure.",
  },
  {
    n: "05",
    title: "Execution",
    body: "Content ships. Posts go live, sales assets get built, the founder brand starts moving. Consistent, in-voice, on-strategy.",
  },
  {
    n: "06",
    title: "Compound",
    body: "The system runs. Narrative compounds. Authority and pipeline build together, month over month. This is the rung most agencies never reach because they sold you content, not a system.",
  },
];

const differentiators = [
  {
    title: "Practitioner credibility",
    body: "Our founder closed $6M+ in B2B enterprise deals. We understand narrative as a sales tool because we sold with one for eight years. This isn't theory borrowed from a book.",
  },
  {
    title: "AI-first, not AI-added",
    body: "AI is inside the methodology, not bolted onto it. That means premium strategy delivered 2-3x faster. The efficiency is real, and it's why our work is accessible to founders a traditional boutique would price out.",
  },
  {
    title: "Systems over campaigns",
    body: "A campaign ends. A system compounds. We build the asset, not the one-off. That's the difference between spending on marketing and owning narrative infrastructure.",
  },
];

export default function ApproachPage() {
  usePageTitle("Approach — StoryGrid & Co");

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Approach"
        title={<>Narrative is infrastructure. Not a marketing tactic.</>}
        intro="We don't write posts. We build the narrative system that turns your story into pipeline. Here's exactly how that works."
      />

      <SectionShell variant="light">
        <Reveal>
          <SectionHeading
            label="The core idea"
            title="The Compound Story Effect"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 max-w-3xl text-2xl leading-snug md:text-3xl">
            Most content is produced. Then it decays. A post does its work in 48 hours and
            disappears. We work differently. We architect narrative as a system, so every piece
            compounds on the last. Authority builds. Trust builds. Pipeline follows. One-off
            content is a cost. A narrative system is an asset.
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell variant="grain">
        <Reveal>
          <SectionHeading
            label="Methodology"
            title="The 6-stage framework"
            intro="From deep input to compounding narrative. Every stage builds on the last."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {stages.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="h-full">
              <article className="card-tech group flex h-full flex-col p-7 lg:p-8">
                <span className="font-display text-5xl text-ember/30 transition-colors duration-500 group-hover:text-ember/60">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl text-foreground md:text-2xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell variant="light">
        <Reveal>
          <SectionHeading label="Differentiation" title="Why this is different" />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 90} className="h-full">
              <article className="card-tech flex h-full flex-col p-7">
                <h3 className="text-lg text-foreground">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <PageCTA
        title="See where your narrative system starts."
        links={[
          { to: "/services", label: "View services & pricing", primary: true },
          { to: "/contact", label: "Book a discovery call" },
        ]}
      />
    </PageLayout>
  );
}
