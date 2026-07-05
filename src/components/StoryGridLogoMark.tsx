import { useMemo, type CSSProperties } from "react";
import logoSvg from "@/assets/storygrid-logo.svg?raw";
import logoMeta from "@/assets/storygrid-logo-meta.json";
import type { LogoLook } from "@/hooks/useLogoLook";

const rawInner = logoSvg
  .replace(/<\?xml[^?]*\?>/, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");

/** Nest agent paths so idle float and cursor look can compose cleanly. */
const innerSvg = rawInner
  .replace(
    '<g class="logo-agent-animated">',
    '<g class="logo-agent-animated"><g class="logo-agent-float-inner"><g class="logo-agent-look-inner">',
  )
  .replace(
    "\n  </g>\n  <g class=\"logo-wordmark\">",
    "\n  </g></g></g>\n  <g class=\"logo-wordmark\">",
  );

type Props = {
  variant: "icon" | "full";
  className?: string;
  look?: LogoLook;
};

export default function StoryGridLogoMark({
  variant,
  className = "",
  look = { x: 0, y: 0 },
}: Props) {
  const viewBox = variant === "icon" ? logoMeta.iconViewBox : logoMeta.fullViewBox;

  const style = useMemo(
    () =>
      ({
        "--logo-look-x": look.x.toFixed(3),
        "--logo-look-y": look.y.toFixed(3),
      }) as CSSProperties,
    [look.x, look.y],
  );

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      style={style}
      className={"logo-mark block shrink-0 " + className}
      dangerouslySetInnerHTML={{ __html: innerSvg }}
    />
  );
}
