import { useEffect, useId, useRef, type ReactNode } from "react";
import { useSectionLightContext } from "@/context/SectionLightContext";
import { useHomeLightZoneScroll } from "@/hooks/useHomeLightZoneScroll";

/**
 * Wraps all home-page content from the Compound Story section downward.
 * Scroll into this zone triggers the global site-light theme (home only).
 */
export default function HomeLightZone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prevActive = useRef(false);
  const active = useHomeLightZoneScroll(ref);
  const { setSectionLit } = useSectionLightContext();
  const triggerId = useId();

  useEffect(() => {
    const instant = prevActive.current && !active;
    prevActive.current = active;
    setSectionLit(triggerId, active, { instant });
  }, [active, triggerId, setSectionLit]);

  useEffect(() => {
    return () => setSectionLit(triggerId, false, { instant: true });
  }, [triggerId, setSectionLit]);

  return (
    <div
      ref={ref}
      className={
        "home-light-zone relative z-[1]" + (active ? " home-light-zone--active" : "")
      }
    >
      {children}
    </div>
  );
}
