import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import PricingRetainerCard from "@/components/PricingRetainerCard";
import Reveal from "@/components/Reveal";
import CurrencyToggle from "@/components/CurrencyToggle";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCurrency } from "@/hooks/useCurrency";
import {
  monthlyRetainers,
  oneTimeEngagements,
  teamWorkshop,
  tierDetailPath,
  type Currency,
} from "@/data/pricing";

const pricedTiers = monthlyRetainers.filter((t) => t.prices !== null);
const commandTier = monthlyRetainers.find((t) => t.id === "command");

export default function ServicesPage() {
  usePageTitle("Services & Pricing — StoryGrid & Co");
  const [currency, setCurrency] = useCurrency();

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Services"
        title={<>Clear pricing. Real deliverables. No guessing.</>}
        intro="Every engagement is scoped, priced, and structured before we start."
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="label-mono !text-muted-foreground">Select currency</p>
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className="label-mono mt-16">Monthly retainers</p>
        </Reveal>
        <div className="mt-8 grid gap-6 pt-6 lg:grid-cols-3 lg:gap-5">
          {pricedTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 70} className="h-full overflow-visible">
              <PricingRetainerCard tier={tier} currency={currency} />
            </Reveal>
          ))}
        </div>

        {commandTier && (
          <Reveal delay={220}>
            <CommandTierCard tier={commandTier} />
          </Reveal>
        )}

        <Reveal delay={100}>
          <p className="label-mono mt-20">One-time engagements</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {oneTimeEngagements.map((engagement, i) => (
            <Reveal key={engagement.id} delay={i * 80} className="h-full">
              <OneTimeCard engagement={engagement} currency={currency} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="label-mono mt-20">Adjacent offer</p>
          <div className="card-tech mt-6 flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
            <div>
              <p className="font-display text-lg text-foreground">{teamWorkshop.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{teamWorkshop.bestFor}</p>
            </div>
            <p className="font-display text-2xl text-blaze md:text-3xl">
              {teamWorkshop.prices[currency]}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/5 bg-grain">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="label-mono">Client journey</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground md:text-[0.75rem]">
              {["Audit", "Sprint", "Starter", "Engine", "System"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-blaze/40 px-4 py-2 text-blaze">
                    {step}
                  </span>
                  {i < arr.length - 1 && <span className="text-blaze/60">→</span>}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Start wherever makes sense. The audit cost credits toward any retainer.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Ready to build a story that builds your pipeline?
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <Link to="/contact" className="btn-radial btn-radial-solid mt-10 inline-flex">
              Book a discovery call
            </Link>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

function CommandTierCard({ tier }: { tier: (typeof monthlyRetainers)[number] }) {
  return (
    <article className="card-tech group relative mt-8 p-7 transition duration-300 hover:-translate-y-1 md:p-10">
      <Link
        to={tierDetailPath(tier.id)}
        className="absolute inset-0 z-0 rounded-[inherit]"
        aria-label={`View ${tier.name} details`}
      />
      <div className="relative z-[1]">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="label-mono !text-muted-foreground">Tier {tier.tier}</span>
          <h3 className="text-2xl text-foreground transition-colors group-hover:text-blaze-glow md:text-3xl">
            {tier.name}
          </h3>
        </div>
        <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-blaze">
          Custom · Discovery call only
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{tier.bestFor}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {tier.items.slice(0, 6).map((it) => (
            <li key={it} className="flex gap-3 text-[0.86rem] leading-relaxed text-foreground/85">
              <Check size={14} className="mt-1 shrink-0 text-blaze" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground group-hover:text-blaze">
          View full tier details →
        </p>
        <div className="relative z-10 mt-8 flex justify-center">
          <Link to="/contact" className="btn-radial btn-radial-solid inline-flex">
            Book a discovery call
          </Link>
        </div>
      </div>
    </article>
  );
}

function OneTimeCard({
  engagement,
  currency,
}: {
  engagement: (typeof oneTimeEngagements)[number];
  currency: Currency;
}) {
  return (
    <article className="card-tech flex h-full flex-col p-7 md:p-8">
      <h3 className="font-display text-xl text-foreground md:text-2xl">{engagement.name}</h3>
      <p className="mt-4 font-display text-3xl text-blaze md:text-4xl">
        {engagement.prices[currency]}
      </p>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {engagement.description}
      </p>
      <div className="mt-8 flex justify-center">
        <Link to="/contact" className="btn-radial inline-flex">
          {engagement.cta}
        </Link>
      </div>
    </article>
  );
}
