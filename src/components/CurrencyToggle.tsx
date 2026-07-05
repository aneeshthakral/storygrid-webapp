import type { Currency } from "@/data/pricing";
import { currencies } from "@/data/pricing";

type Props = {
  value: Currency;
  onChange: (currency: Currency) => void;
};

export default function CurrencyToggle({ value, onChange }: Props) {
  const index = currencies.indexOf(value);

  return (
    <div
      className="relative inline-flex rounded-full border border-white/10 bg-background/60 p-1"
      role="group"
      aria-label="Select currency"
    >
      <span
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-ember transition-all duration-300 ease-out"
        style={{
          width: `calc(${100 / currencies.length}% - 4px)`,
          left: `calc(${index * (100 / currencies.length)}% + 2px)`,
        }}
      />
      {currencies.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={
            "relative z-10 min-w-[4.5rem] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-300 " +
            (value === c ? "text-white" : "text-muted-foreground hover:text-foreground")
          }
        >
          {c}
        </button>
      ))}
    </div>
  );
}
