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
  const isCenter = align === "center";
  return (
    <div className={"max-w-3xl " + (isCenter ? "text-center mx-auto" : "")}>
      <div
        className={
          "flex items-center gap-4 " + (isCenter ? "justify-center" : "")
        }
      >
        <span className="h-px w-12 bg-ember" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-ember">
          {label}
        </span>
      </div>
      <h2
        className={
          "mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl " +
          (isCenter ? "mx-auto" : "")
        }
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-7 text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
          {intro}
        </p>
      )}
    </div>
  );
}
