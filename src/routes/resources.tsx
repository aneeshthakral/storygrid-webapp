import { createFileRoute } from "@tanstack/react-router";
import { FileText, Layers, Lightbulb, Mic } from "lucide-react";
import PageLayout, { PageHeader, WhereToGoNext } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/resources")({
  component: Resources,
  head: () => ({
    meta: [
      { title: "Resources — StoryGrid & Co" },
      { name: "description", content: "Frameworks, guides, and tools for building narrative-led growth." },
    ],
  }),
});

const items = [
  { icon: FileText, kind: "Framework", title: "The Narrative Architecture Canvas", desc: "Single-page positioning canvas for founder-led companies. Print, fill, hand to your operator." },
  { icon: Layers, kind: "Playbook", title: "Founder LinkedIn Operating System", desc: "12 post archetypes, 3 cadence models, and the AI workflow we use to keep it running weekly." },
  { icon: Lightbulb, kind: "Essay", title: "Why AI Killed Content (and What Replaces It)", desc: "The shift from content marketing to narrative architecture, explained in 14 minutes." },
  { icon: Mic, kind: "Podcast", title: "The Combustion Tape", desc: "Founders on the inside of category-defining narratives. Short episodes, no fluff." },
];

function Resources() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Resources"
        title={<>Tools for narrative builders.</>}
        intro="Frameworks, playbooks, and essays we use internally — published so founders can ship sharper narrative without us in the room."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={i * 100}>
                <a href="#" className="card-tech group flex h-full items-start gap-6 p-7 md:p-9">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ember/50 text-ember transition group-hover:bg-ember group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <span className="label-mono !text-muted-foreground">{it.kind}</span>
                    <h3 className="mt-2 font-display text-xl text-foreground">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                    <span className="label-mono mt-5 inline-block">Open →</span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <WhereToGoNext />
    </PageLayout>
  );
}
