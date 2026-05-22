import { useEffect, useState } from "react";
import type { Currency } from "@/data/pricing";

const STORAGE_KEY = "storygrid-currency";

export function useCurrency(initial: Currency = "USD") {
  const [currency, setCurrency] = useState<Currency>(() => {
    if (typeof sessionStorage === "undefined") return initial;
    const stored = sessionStorage.getItem(STORAGE_KEY) as Currency | null;
    return stored === "USD" || stored === "INR" ? stored : initial;
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  return [currency, setCurrency] as const;
}
