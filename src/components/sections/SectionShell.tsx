import type { ReactNode } from "react";

type Variant = "dark" | "light" | "grain";

const variantClass: Record<Variant, string> = {
  dark: "bg-background",
  light: "border-t border-white/5 bg-background",
  grain: "border-t border-white/5 bg-grain",
};

export function SectionShell({
  children,
  variant = "dark",
  className = "",
  bordered = false,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      className={
        variantClass[variant] +
        (bordered ? " border-t border-white/5" : "") +
        " " +
        className
      }
    >
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">{children}</div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={"max-w-3xl " + alignClass}>
      <p className="label-mono">{label}</p>
      <h2 className={"mt-5 text-4xl text-balance md:text-5xl " + (align === "center" ? "mx-auto" : "")}>
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
      )}
    </div>
  );
}
