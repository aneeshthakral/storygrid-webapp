import { Link } from "react-router-dom";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ResourcesPage() {
  usePageTitle("Resources — StoryGrid & Co.");

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Resources"
        title={<>Free tools to sharpen your narrative</>}
        intro="We give away frameworks, not fluff."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="card-tech p-7 md:p-9">
              <p className="label-mono">Newsletter</p>
              <h2 className="mt-4 text-2xl text-foreground">The AI Salesman</h2>
              <p className="mt-2 text-sm text-muted-foreground">Weekly newsletter by Aneesh Thakral</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                AI x Sales x Storytelling. Every Thursday.
              </p>
              <div className="mt-6">
                <a
                  href="https://substack.com/@aneeshthakral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-radial btn-radial-solid inline-flex"
                >
                  Read on Substack
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="card-tech p-7 md:p-9">
              <p className="label-mono">Free download</p>
              <h2 className="mt-4 text-2xl text-foreground">The Narrative Audit Checklist</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                10 questions to diagnose whether your story is costing you deals.
              </p>
              <div className="mt-6">
                <a
                  href="/narrative-audit-checklist.pdf"
                  download
                  className="btn-radial inline-flex"
                >
                  Download
                </a>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <article className="card-tech mt-8 p-7 md:p-9">
            <p className="label-mono !text-muted-foreground">Coming soon</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Blog — Insights on narrative strategy, AI in sales, and founder brand building. Coming soon.
            </p>
          </article>
        </Reveal>
      </section>

      <section className="border-t border-white/5 bg-grain">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10">
          <Reveal>
            <p className="text-lg text-muted-foreground">
              Want us to run the audit for you?
            </p>
            <Link to="/services" className="btn-radial mt-6 inline-flex">
              View services &amp; pricing
            </Link>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
