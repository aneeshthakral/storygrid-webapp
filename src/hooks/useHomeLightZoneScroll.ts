import { useEffect, useState, type RefObject } from "react";

/** Light zone activates when its top crosses this viewport line (from top). */
const TRIGGER_RATIO = 0.78;

/**
 * Home-only scroll hook: light theme turns on once the zone top passes the trigger
 * line and stays on for all content below until the user scrolls back above it.
 */
export function useHomeLightZoneScroll(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const triggerLine = window.innerHeight * TRIGGER_RATIO;
      setActive(rect.top <= triggerLine);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return active;
}
