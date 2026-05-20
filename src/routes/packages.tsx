import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import PageLayout, { PageHeader, WhereToGoNext } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/packages")({
  component: Packages,
  head: () => ({
    meta: [
      { title: "Packages — StoryGrid & Co" },
      { name: "description", content: "Five-tier model: three monthly retainers and two one-time engagements." },
    ],
  }),
});

const retainers = [
  {
    tier: "Tier 01",
    name: "Narrative Architecture",
    price: "₹49,950",
    cadence: "/ mo",
    minimum: "3-month minimum",
    fit: "For early-stage founders who need a clear, ownable narrative before they scale content volume.",
    items: [
      "Brand narrative document: core story, positioning, messaging pillars",
      "Founder voice extraction (2 deep-dive interviews)",
      "LinkedIn content system: 8 posts per month, ghostwritten in your voice",
      "Monthly strategy call (60 minutes)",
      "Dedicated Slack channel, 48-hour response",
    ],
  },
  {
    tier: "Tier 02",
    name: "Narrative Engine",
    price: "₹69,950",
    cadence: "/ mo",
    minimum: "3-month minimum",
    badge: "Most Chosen",
    fit: "For growth-stage founders building a content system that compounds into pipeline over time.",
    items: [
      "Full narrative strategy and brand story framework",
      "LinkedIn content system: 16 posts per month (founder + company page)",
      "AI-augmented content production pipeline",
      "Weekly strategy calls (30 minutes)",
      "Founder brand development: LinkedIn plus long-form thought leadership",
      "One designed content format per month (carousel, infographic, or newsletter)",
    ],
  },
  {
    tier: "Tier 03",
    name: "Full Narrative System",
    price: "₹99,950",
    cadence: "/ mo",
    minimum: "6-month minimum",
    fit: "For growth-stage companies ready to own their narrative category across every channel they show up in.",
    items: [
      "Full narrative audit and multi-channel rebuild",
      "24 posts per month across LinkedIn, Instagram, and long-form",
      "AI integration into existing marketing stack",
      "Dedicated narrative strategist, single point of contact",
      "Executive and founder brand programs (up to 2 founders)",
      "Campaign and launch narrative support",
      "Bi-weekly strategy sessions",
    ],
  },
];

const oneTime = [
  {
    name: "Narrative Audit",
    price: "₹24,950",
    body: "A complete audit of your current narrative, positioning, and content. Strengths, gaps, and a 90-day path forward. Delivered in two weeks.",
  },
  {
    name: "Founder Voice Sprint",
    price: "₹34,950",
    body: "Two-week intensive: voice extraction, positioning, and a 30-day LinkedIn runway you can hand to any operator. Delivered ready to ship.",
  },
];

function Packages() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Packages"
        title={<>Pricing</>}
        intro="Five-tier model: three monthly retainers and two one-time engagements. Natural client journey from low-friction audit to full narrative category ownership."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <p className="label-mono">Monthly Retainers</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {retainers.map((r, i) => {
            const isFeatured = !!r.badge;
            return (
              <Reveal key={r.name} delay={i * 100} className="h-full">
                <article
                  className={
                    "card-tech relative flex h-full flex-col p-7 lg:p-8 " +
                    (isFeatured ? "!border-ember/60 shadow-[0_30px_80px_-30px_rgba(255,90,46,0.4)]" : "")
                  }
                >
                  {r.badge && (
                    <span className="absolute -top-3 right-6 rounded-sm bg-ember px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white">
                      {r.badge}
                    </span>
                  )}
                  <span className="label-mono !text-muted-foreground">{r.tier}</span>
                  <h3 className="mt-3 text-2xl text-foreground">{r.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl text-foreground">{r.price}</span>
                    <span className="text-muted-foreground">{r.cadence}</span>
                  </div>
                  <p className="label-mono mt-3 !text-muted-foreground">{r.minimum}</p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{r.fit}</p>
                  <ul className="mt-6 space-y-3">
                    {r.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[0.86rem] leading-relaxed text-foreground/85">
                        <Check size={14} className="mt-1 shrink-0 text-ember" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={"btn-radial mt-8 self-start " + (isFeatured ? "btn-radial-solid" : "")}
                  >
                    Start with {r.tier}
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24">
          <p className="label-mono">One-Time Engagements</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {oneTime.map((o, i) => (
              <Reveal key={o.name} delay={i * 100}>
                <article className="card-tech p-7 md:p-9">
                  <h3 className="text-xl text-foreground">{o.name}</h3>
                  <p className="mt-3 font-display text-3xl text-ember">{o.price}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                  <Link to="/contact" className="btn-radial mt-6 inline-flex">Book this engagement</Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhereToGoNext />
    </PageLayout>
  );
}
