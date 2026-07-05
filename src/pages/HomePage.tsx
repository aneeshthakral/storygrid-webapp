import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotField from "@/components/DotField";
import HomeLightZone from "@/components/HomeLightZone";
import Reveal from "@/components/Reveal";
import ShowreelScroll from "@/components/ShowreelScroll";
import PageRoutingCards from "@/components/PageRoutingCards";
import { usePageTitle } from "@/hooks/usePageTitle";

const painPoints = [
  "Your website gets traffic. Nobody converts.",
  "You lose deals you should be winning.",
  "Every team member describes what you do differently.",
  "You've hired copywriters. The messaging still doesn't stick.",
  "You can't write one sentence that makes someone want to learn more.",
  "Marketing spend goes up. Pipeline stays flat.",
];

export default function HomePage() {
  usePageTitle("StoryGrid & Co — Build the story that builds your pipeline");

  return (
    <div className="home-page relative min-h-screen bg-background text-foreground">
      <div className="home-light-rise" aria-hidden="true" />
      <Navbar />

      <section className="relative isolate z-[1] overflow-hidden pt-[68px]">
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

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-32">
          <Reveal>
            <p className="label-mono">AI-First Narrative Strategy Firm</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-7 max-w-5xl text-[2.75rem] leading-[1.02] text-balance md:text-7xl lg:text-[5.4rem]">
              Your story is costing you deals. <span className="text-ember">We fix that.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              StoryGrid &amp; Co. is an AI-first narrative strategy firm. We help founders and
              commercial teams build the story that builds their pipeline.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/approach" className="btn-radial">
                See how we work
              </Link>
              <Link to="/contact" className="btn-radial btn-radial-solid">
                Book a discovery call
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ShowreelScroll />

      <section className="relative z-[1] mx-auto max-w-7xl px-5 pb-24 pt-12 lg:px-10 lg:pb-32 lg:pt-16">
        <Reveal>
          <p className="label-mono">Sound familiar?</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-4xl text-balance md:text-5xl">The problem frame</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p, i) => (
            <Reveal key={p} delay={i * 80}>
              <article className="card-tech p-6 md:p-7">
                <p className="text-sm leading-relaxed text-foreground/90 md:text-base">{p}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-14 max-w-2xl text-xl leading-snug text-foreground md:text-2xl">
            The problem is rarely your product. It&apos;s your narrative.
          </p>
        </Reveal>
      </section>

      <HomeLightZone>
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="label-mono">The Compound Story Effect</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-2xl leading-snug md:text-3xl">
              Narrative, when architected as a system rather than produced as content, compounds
              over time. It builds authority, trust, and pipeline simultaneously. One-off posts
              decay. Systems compound.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <Link to="/approach" className="btn-radial mt-10 inline-flex">
              See the full approach
            </Link>
          </Reveal>
        </section>

        <section className="">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
            <Reveal>
              <p className="label-mono">Your path</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-4xl md:text-5xl">Audit → Sprint → Retainer</h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Start with a narrative audit, move into a sprint, or commit to a retainer that
                compounds your story into pipeline. Every engagement is scoped before we start.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <Link to="/services" className="btn-radial mt-8 inline-flex">
                View services
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="label-mono">AI-first. Not AI-added.</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-2xl leading-snug md:text-3xl">
              Most agencies bolt AI onto existing workflows. We built our entire methodology around
              it. AI sits inside the narrative process, from research to production to distribution.
              The result: 2-3x faster output at equivalent or higher quality. You get premium
              strategy at startup speed.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="home-stats-grid mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl md:grid-cols-3">
              {[
                ["2-3x", "Faster production"],
                ["AI-augmented", "At every stage"],
                ["$6M+", "In deals closed using narrative"],
              ].map(([v, l]) => (
                <div key={l} className="home-stats-cell p-6 md:p-8">
                  <p className="font-display text-3xl text-foreground md:text-4xl">{v}</p>
                  <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="label-mono">Built by a salesman. Not a marketer.</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed md:text-xl">
              Aneesh Thakral spent 8 years in B2B enterprise sales, closing $6M+ across US, EMEA,
              and APAC. He didn&apos;t learn narrative from a textbook. He learned it deal by deal.
              StoryGrid &amp; Co. exists because he saw what most agencies miss: story isn&apos;t a
              marketing tactic. It&apos;s the sales infrastructure.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <Link to="/story" className="btn-radial mt-10 inline-flex">
              Read the full story
            </Link>
          </Reveal>
        </section>

        <PageRoutingCards />

        <section className="border-t border-border bg-grain home-light-cta">
          <div className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-10 lg:py-32">
            <Reveal>
              <h2 className="text-4xl text-balance md:text-5xl lg:text-6xl">
                Your competitors are telling better stories. Let&apos;s change that.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="btn-radial btn-radial-solid">
                  Book a discovery call
                </Link>
                <Link to="/services" className="btn-radial">
                  See services &amp; pricing
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </HomeLightZone>
    </div>
  );
}
