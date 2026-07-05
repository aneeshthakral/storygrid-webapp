import { useEffect, useId, useRef, type ReactNode } from "react";
import { useSectionLightContext } from "@/context/SectionLightContext";
import { useSectionLightScroll } from "@/hooks/useSectionLightScroll";

export default function LightSection({
  children,
  className = "",
  innerClassName = "mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28",
}: {
  children: ReactNode;
  className?: string;
  /** Pass `false` to render children without an inner wrapper */
  innerClassName?: string | false;
}) {
  const ref = useRef<HTMLElement>(null);
  const active = useSectionLightScroll(ref);
  const { setSectionLit } = useSectionLightContext();
  const sectionId = useId();

  useEffect(() => {
    setSectionLit(sectionId, active);
    return () => setSectionLit(sectionId, false);
  }, [active, sectionId, setSectionLit]);

  const content =
    innerClassName === false ? (
      children
    ) : (
      <div className={innerClassName}>{children}</div>
    );

  return (
    <section
      ref={ref}
      className={
        "section-light" +
        (active ? " section-light--active" : "") +
        (className ? " " + className : "")
      }
    >
      {content}
    </section>
  );
}
