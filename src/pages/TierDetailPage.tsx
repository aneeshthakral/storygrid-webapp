import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import CurrencyToggle from "@/components/CurrencyToggle";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCurrency } from "@/hooks/useCurrency";
import { formatMinimumLabel, getTierById } from "@/data/pricing";

export default function TierDetailPage() {
  const { tierId } = useParams<{ tierId: string }>();
  const tier = getTierById(tierId);
  const [currency, setCurrency] = useCurrency();

  usePageTitle(
    tier ? `${tier.name} — StoryGrid & Co.` : "Services — StoryGrid & Co.",
  );

  if (!tier) {
    return <Navigate to="/services" replace />;
  }

  const isCustom = tier.prices === null;
  const isFeatured = !!tier.badge;

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-5 pt-6 lg:px-10">
        <Reveal>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition hover:text-blaze"
          >
            <ArrowLeft size={14} aria-hidden />
            All services & pricing
          </Link>
        </Reveal>
      </div>

      <PageHeader
        eyebrow={`Tier ${tier.tier}`}
        title={
          <>
            {tier.name}
            {tier.badge && (
              <span className="mt-4 block font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-blaze">
                {tier.badge}
              </span>
            )}
          </>
        }
        intro={tier.detail.overview}
      />

      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-10">
        <Reveal>
          <div className="card-tech flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              {!isCustom && tier.minimum && (
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-blaze">
                  {formatMinimumLabel(tier.minimum)}
                </p>
              )}
              {isCustom ? (
                <p className="mt-2 font-display text-3xl text-foreground md:text-4xl">
                  Custom pricing
                </p>
              ) : (
                <p className="mt-2 font-display text-4xl tracking-tight text-foreground md:text-5xl">
                  {tier.prices[currency]}
                  <span className="ml-2 text-2xl font-normal text-foreground/70">/ mo</span>
                </p>
              )}
            </div>
            {!isCustom && (
              <CurrencyToggle value={currency} onChange={setCurrency} />
            )}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/5 bg-grain">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="label-mono">Who it&apos;s for</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {tier.detail.whoItsFor}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="label-mono">How it works</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tier.detail.howItWorks.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="h-full">
              <article className="card-tech h-full p-7">
                <span className="font-display text-4xl text-blaze/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-xl text-foreground">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="label-mono">Deliverables</p>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Everything included in {tier.name}:
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {tier.items.map((item, i) => (
              <Reveal key={item} delay={i * 35}>
                <li className="card-tech flex gap-4 p-5">
                  <Check size={16} className="mt-0.5 shrink-0 text-blaze" />
                  <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/5 bg-grain">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="label-mono">Outcomes</p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {tier.detail.outcomes.map((outcome, i) => (
              <Reveal key={outcome} delay={i * 60}>
                <p className="max-w-3xl text-xl leading-snug text-foreground md:text-2xl">
                  <span className="text-blaze">→ </span>
                  {outcome}
                </p>
              </Reveal>
            ))}
          </div>
          {tier.detail.note && (
            <Reveal delay={180}>
              <p className="mt-12 max-w-2xl border-l-2 border-blaze/50 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                {tier.detail.note}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-10">
          <Reveal>
            <h2 className="text-3xl text-balance md:text-4xl">
              {isCustom
                ? "Let's scope Narrative Command for your team"
                : `Ready to start with Tier ${tier.tier}?`}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm text-muted-foreground md:text-base">
              {tier.bestFor}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className={
                  "btn-radial inline-flex " + (isFeatured ? "btn-radial-solid" : "")
                }
              >
                {isCustom ? "Book a discovery call" : `Start with Tier ${tier.tier}`}
              </Link>
              <Link to="/services" className="btn-radial inline-flex">
                Compare all tiers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
