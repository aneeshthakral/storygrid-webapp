import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";

export type PolicySection = {
  id: string;
  title: string;
  body: ReactNode;
};

export default function PolicyDocument({
  eyebrow,
  title,
  subtitle,
  notice,
  sections,
  contactEmail = "hello@storygrid.co",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  notice?: ReactNode;
  sections: PolicySection[];
  contactEmail?: string;
}) {
  return (
    <PageLayout>
      <PageHeader eyebrow={eyebrow} title={title} intro={subtitle} />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <Reveal className="lg:hidden">
          <nav className="card-tech mb-8 p-5" aria-label="Table of contents">
            <p className="label-mono !text-muted-foreground mb-3">On this page</p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground transition hover:border-ember/40 hover:text-ember"
                >
                  {String(i + 1).padStart(2, "0")} · {s.title}
                </a>
              ))}
            </div>
          </nav>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <Reveal className="hidden lg:block">
            <nav
              className="card-tech sticky top-[88px] max-h-[calc(100vh-120px)] overflow-y-auto p-5"
              aria-label="Table of contents"
            >
              <p className="label-mono !text-muted-foreground mb-4">On this page</p>
              <ol className="space-y-2">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground transition hover:text-ember"
                    >
                      {String(i + 1).padStart(2, "0")} · {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <div className="min-w-0">
            {notice && (
              <Reveal>
                <div className="card-tech border-ember/30 p-6 md:p-7">
                  <p className="label-mono mb-3">Legal notice</p>
                  <div className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {notice}
                  </div>
                </div>
              </Reveal>
            )}

            <div className="mt-8 space-y-6">
              {sections.map((s, i) => (
                <Reveal key={s.id} delay={i * 35}>
                  <section id={s.id} className="card-tech scroll-mt-28 p-6 md:p-8">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-display text-3xl text-ember/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl text-foreground md:text-2xl">{s.title}</h2>
                    </div>
                    <div className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base [&_a]:text-ember [&_a]:hover:underline">
                      {s.body}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <div className="card-tech mt-8 p-6 md:p-7">
                <p className="label-mono">Contact</p>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  Questions about this policy:{" "}
                  <a href={`mailto:${contactEmail}`} className="text-ember hover:underline">
                    {contactEmail}
                  </a>
                </p>
                <Link to="/contact" className="btn-radial mt-6 inline-flex">
                  Talk to us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
