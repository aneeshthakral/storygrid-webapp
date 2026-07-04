import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotField from "@/components/DotField";
import HomeLightZone from "@/components/HomeLightZone";
import Reveal from "@/components/Reveal";
import ShowreelScroll from "@/components/ShowreelScroll";
// import ClientLogosMarquee from "@/components/ClientLogosMarquee";
import PageRoutingCards from "@/components/PageRoutingCards";
import { usePageTitle } from "@/hooks/usePageTitle";

const painPoints = [
  ["Your website gets traffic.", "Nobody converts."],
  ["You lose deals", "you should be winning."],
  ["Every team member describes what you do", "differently."],
  ["You've hired copywriters. The messaging", "still doesn't stick."],
  ["You can't write one sentence that makes someone", "want to learn more."],
  ["Marketing spend goes up.", "Pipeline stays flat."],
];

export default function HomePage() {
  usePageTitle("StoryGrid & Co — Build the story that builds your pipeline");

  return (
    <div className="home-page relative min-h-screen bg-background text-foreground">
      <div className="home-light-rise" aria-hidden="true" />
      <Navbar />

      {/* ============ HERO — centered monolithic ============ */}
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

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-16 pt-20 text-center lg:pb-20 lg:pt-28">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-ember/30 bg-ember/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">
                AI-First Narrative Strategy Firm
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-10 text-balance text-5xl font-extrabold leading-[0.88] tracking-tighter md:text-7xl lg:text-[5.8rem]">
              Your story is costing you deals.{" "}
              <span className="text-ember">We fix that.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-10 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              StoryGrid &amp; Co. is an AI-first narrative strategy firm. We help founders and
              commercial teams build the story that builds their pipeline.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
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

      {/* ============ PROBLEM FRAME — technical grid ============ */}
      <section className="relative z-[1] mx-auto max-w-7xl px-5 pb-28 pt-16 lg:px-10 lg:pb-40 lg:pt-20">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="max-w-2xl">
              <p className="label-mono">Sound familiar?</p>
              <h2 className="mt-6 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                The problem frame
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-xl italic leading-snug text-muted-foreground md:text-2xl">
              The problem is rarely your product. It&apos;s your narrative.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px border border-white/[0.06] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
          {painPoints.map(([lead, emph], i) => (
            <Reveal key={lead + emph} delay={i * 70}>
              <article className="group relative h-full bg-background p-10 transition-colors duration-500 hover:bg-white/[0.02] md:p-12">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 transition-colors group-hover:text-ember">
                  // {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-12 text-lg font-light leading-relaxed text-foreground/80 transition-colors group-hover:text-foreground/95 md:text-xl">
                  {lead}{" "}
                  <span className="font-medium text-foreground">{emph}</span>
                </p>
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-3 w-3 border-r border-t border-ember/0 transition-colors duration-500 group-hover:border-ember/60"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* <ClientLogosMarquee /> */}

      <HomeLightZone>
        {/* ============ COMPOUND STORY — 12 col editorial ============ */}
        <section className="mx-auto max-w-7xl px-5 pb-28 pt-28 lg:px-10 lg:pb-40 lg:pt-40">
          <Reveal>
            <div className="mb-14 flex items-center gap-4">
              <span className="h-px w-12 bg-ember" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-ember">
                The Compound Story Effect
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="max-w-5xl text-balance text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Narrative, when architected as a{" "}
              <span className="decoration-ember underline decoration-4 underline-offset-8">
                system
              </span>{" "}
              rather than produced as content, compounds over time.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal delay={200}>
              <p className="text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                It builds authority, trust, and pipeline simultaneously. One-off posts decay.
                Systems compound.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="flex md:justify-end">
                <Link to="/approach" className="btn-radial w-fit">
                  See the full approach
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ AUDIT → SPRINT → RETAINER ============ */}
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <div className="flex flex-col gap-8 border-t border-foreground/10 pt-16 md:flex-row md:items-baseline md:justify-between">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-ember">
                Engagement Framework
              </span>
              <h3 className="text-3xl font-bold md:text-4xl">
                Audit <span className="text-ember">→</span> Sprint{" "}
                <span className="text-ember">→</span> Retainer
              </h3>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {[
                ["01. Narrative Audit", "Start with a narrative audit to map exactly where signal is being lost."],
                ["02. Strategy Sprint", "Move into a focused sprint that installs the core narrative system."],
                ["03. Pipeline Retainer", "Commit to a retainer that compounds your story into pipeline, every month."],
              ].map(([title, body]) => (
                <div key={title} className="border-l border-foreground/10 pl-6">
                  <h4 className="text-xl font-bold">{title}</h4>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={260}>
            <Link to="/services" className="btn-radial mt-12 inline-flex">
              View services
            </Link>
          </Reveal>
        </section>

        {/* ============ AI-FIRST — stats monolithic ============ */}
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="label-mono">AI-first. Not AI-added.</p>
                <h2 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                  Premium strategy at startup speed.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Most agencies bolt AI onto existing workflows. We built our entire methodology
                around it. AI sits inside the narrative process, from research to production to
                distribution. The result: 2-3x faster output at equivalent or higher quality.
              </p>
            </Reveal>
          </div>

          <Reveal delay={240}>
            <div className="mt-20 grid grid-cols-1 border-t border-foreground/10 md:grid-cols-3">
              {[
                { label: "Scale Factor", value: "2-3", suffix: "X", caption: "Faster production" },
                { label: "Methodology", value: "AI-AUG.", suffix: "", caption: "Integrated at every stage" },
                { label: "Capital Influence", value: "$6M", suffix: "+", caption: "In deals closed via narrative" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={
                    "py-14 " +
                    (i === 0 ? "md:pr-10" : i === 1 ? "md:px-10" : "md:pl-10") +
                    (i < 2 ? " border-b md:border-b-0 md:border-r border-foreground/10" : "")
                  }
                >
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </span>
                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="font-display text-6xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl">
                      {s.value}
                    </span>
                    {s.suffix && (
                      <span className="font-display text-3xl font-bold text-ember md:text-4xl">
                        {s.suffix}
                      </span>
                    )}
                  </div>
                  <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {s.caption}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ============ FOUNDER ============ */}
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-ember">
              Built by a salesman. Not a marketer.
            </span>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-4xl text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Aneesh Thakral closed $6M+ in B2B enterprise sales across the US, EMEA, and APAC.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              He didn&apos;t learn narrative from a textbook. He learned it deal by deal.
              StoryGrid &amp; Co. exists because he saw what most agencies miss: story isn&apos;t a
              marketing tactic. It&apos;s the sales infrastructure.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <Link to="/story" className="btn-radial mt-10 inline-flex">
              Read the full story
            </Link>
          </Reveal>
        </section>

        <PageRoutingCards />

        {/* ============ FINAL CTA — glow accent ============ */}
        <section className="relative overflow-hidden border-t border-foreground/10 home-light-cta">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full bg-ember/10 blur-[120px]"
          />
          <div className="relative z-10 mx-auto max-w-5xl px-5 py-28 text-center lg:px-10 lg:py-40">
            <Reveal>
              <h2 className="text-balance text-5xl font-extrabold leading-[0.9] tracking-tighter md:text-7xl lg:text-[6rem]">
                Your competitors are telling{" "}
                <span className="text-muted-foreground">better stories.</span>
                <br />
                <span className="font-light italic">Let&apos;s change that.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
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
