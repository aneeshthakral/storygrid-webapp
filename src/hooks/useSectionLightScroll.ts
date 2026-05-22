import { useEffect, useRef, useState, type RefObject } from "react";

/** Section top must be above this line to count as "in" the light zone */
const ENTER_TOP_RATIO = 0.82;
/** Section bottom must be below this line to enter (scrolling up into section) */
const ENTER_BOTTOM_RATIO = 0.14;
/** Section bottom must stay below this line to remain lit (leaving = smooth revert) */
const EXIT_BOTTOM_RATIO = 0.2;

export function shouldSectionBeLit(
  rect: DOMRect,
  viewportHeight: number,
  wasLit: boolean,
): boolean {
  const topOk = rect.top < viewportHeight * ENTER_TOP_RATIO;
  const bottomEnter = rect.bottom > viewportHeight * ENTER_BOTTOM_RATIO;
  const bottomStay = rect.bottom > viewportHeight * EXIT_BOTTOM_RATIO;

  if (wasLit) {
    return topOk && bottomStay;
  }

  return topOk && bottomEnter;
}

export function useSectionLightScroll(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);
  const litRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = shouldSectionBeLit(rect, vh, litRef.current);

      if (next !== litRef.current) {
        litRef.current = next;
        setActive(next);
      }
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
