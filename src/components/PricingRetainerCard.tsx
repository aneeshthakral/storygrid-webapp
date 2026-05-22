import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import {
  formatMinimumLabel,
  tierDetailPath,
  type Currency,
  type MonthlyRetainer,
} from "@/data/pricing";

type PricedTier = MonthlyRetainer & {
  prices: { USD: string; INR: string };
};

export default function PricingRetainerCard({
  tier,
  currency,
}: {
  tier: PricedTier;
  currency: Currency;
}) {
  const isFeatured = !!tier.badge;

  return (
    <article
      className={
        "card-tech group relative flex h-full flex-col overflow-visible p-7 transition duration-300 md:p-8 " +
        "hover:-translate-y-1 " +
        (isFeatured
          ? "z-[1] !border-blaze/60 shadow-[0_30px_80px_-30px_rgba(255,92,43,0.45)]"
          : "")
      }
    >
      <Link
        to={tierDetailPath(tier.id)}
        className="absolute inset-0 z-0 rounded-[inherit]"
        aria-label={`View ${tier.name} details`}
      />

      {isFeatured && (
        <>
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(255,92,43,0.16),transparent_58%)]"
            aria-hidden
          />
          <span className="pricing-featured-badge">{tier.badge}</span>
        </>
      )}

      <div className={isFeatured ? "relative z-[1] pt-5" : "relative z-[1]"}>
        <p className="label-mono !text-blaze">Tier {tier.tier}</p>
        <h3 className="mt-3 font-display text-2xl leading-tight text-foreground transition-colors group-hover:text-blaze-glow md:text-[1.65rem]">
          {tier.name}
        </h3>

        <p className="mt-6 font-display text-4xl tracking-tight text-foreground md:text-[2.35rem]">
          {tier.prices[currency]}
          <span className="ml-1 text-xl font-normal text-foreground/70 md:text-2xl">/ mo</span>
        </p>
        {tier.minimum && (
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-blaze">
            {formatMinimumLabel(tier.minimum)}
          </p>
        )}

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{tier.bestFor}</p>

        <ul className="mt-6 flex-1 space-y-3">
          {tier.items.map((item) => (
            <li key={item} className="flex gap-3 text-[0.86rem] leading-relaxed text-foreground/85">
              <Check size={14} className="mt-1 shrink-0 text-blaze" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-8 flex justify-center pt-2">
          <Link
            to="/contact"
            className={
              "btn-radial inline-flex " + (isFeatured ? "btn-radial-solid" : "")
            }
          >
            Start with Tier {tier.tier}
          </Link>
        </div>

        <p className="pointer-events-none mt-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-blaze">
          View full tier details →
        </p>
      </div>
    </article>
  );
}
