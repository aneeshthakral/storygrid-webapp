import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotField from "@/components/DotField";
import Reveal from "@/components/Reveal";
import ShowreelScroll from "@/components/ShowreelScroll";
import { WhereToGoNext } from "@/components/PageLayout";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "StoryGrid & Co — Build the story that builds your pipeline" },
      {
        name: "description",
        content:
          "AI-first narrative strategy firm. We architect the layer between a founder's vision and their market's perception.",
      },
    ],
  }),
});

const tiers = [
  {
    n: "01",
    title: "Architecture",
    body: "Brand positioning audit, founder voice extraction, messaging framework, ICP-aligned narrative strategy, competitive positioning document.",
  },
  {
    n: "02",
    title: "Engine",
    body: "Purpose-built content systems that compound. Not a content calendar. A narrative machine that runs consistently without burning you out.",
  },
  {
    n: "03",
    title: "Distribution",
    body: "Strategy plus hands-on execution. We write, refine, and publish. You stay in the conversation. Your story compounds every week.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-[68px]">
        {/* Dot-field bg */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <DotField
            dotRadius={1.4}
            dotSpacing={22}
            bulgeStrength={67}
            glowRadius={180}
            cursorRadius={420}
            cursorForce={0.12}
            gradientFrom="#FF6A3A"
            gradientTo="#3A0F08"
            glowColor="#0F0706"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-24 lg:px-10 lg:pb-40 lg:pt-32">
          <Reveal>
            <p className="label-mono">AI-First Narrative Strategy Firm</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-7 max-w-5xl text-[2.75rem] leading-[1.02] text-balance md:text-7xl lg:text-[5.4rem]">
              Build the story <br className="hidden md:block" />
              that builds your <span className="text-ember">pipeline.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Narrative is infrastructure. The layer between a founder's
              vision and their market's perception.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-radial btn-radial-solid">
                Talk to us
              </Link>
              <Link to="/services" className="btn-radial">
                Explore services
              </Link>
            </div>
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={520}>
            <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] md:grid-cols-4">
              {[
                ["38", "Founder narratives shipped"],
                ["4.6x", "Avg. inbound pipeline lift"],
                ["12mo", "Median engagement length"],
                ["AI-first", "Strategy + production"],
              ].map(([v, l]) => (
                <div key={l} className="bg-background/60 p-6 md:p-8">
                  <p className="font-display text-3xl text-foreground md:text-4xl">{v}</p>
                  <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="label-mono">The Problem</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl text-2xl leading-snug text-foreground md:text-3xl">
            Content saturation is at an all-time high. AI tools have made
            content production trivially easy. The average B2B company is
            drowning in generic, undifferentiated content.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Founders and senior leaders increasingly lose deals not because of
            product weakness but because of perception weakness. The narrative
            gap shows up in pipeline, talent acquisition, fundraising, and
            partnership development simultaneously.
          </p>
        </Reveal>
      </section>

      {/* FRAMEWORK */}
      <section className="border-t border-white/5 bg-grain">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="label-mono">The Framework</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 text-4xl text-balance md:text-5xl lg:text-6xl">
              Three Tiers. Clear Value Progression.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.n} delay={i * 140} className="h-full">
                <article className="card-tech group flex h-full flex-col p-7 lg:p-8">
                  <span className="font-display text-5xl text-ember/30 transition-colors duration-500 group-hover:text-ember/60">
                    {t.n}
                  </span>
                  <h3 className="mt-6 text-xl text-foreground">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                  <Link
                    to={t.n === "01" ? "/services" : t.n === "02" ? "/services" : "/services"}
                    className="label-mono mt-auto inline-flex items-center gap-2 pt-8"
                  >
                    Explore <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWREEL */}
      <ShowreelScroll />

      {/* WHERE TO GO NEXT */}
      <WhereToGoNext />

      <Footer />
    </div>
  );
}
