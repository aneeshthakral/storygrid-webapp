import { Link } from "react-router-dom";
import { useState } from "react";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ResourcesPage() {
  usePageTitle("Resources — StoryGrid & Co");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [downloadEmail, setDownloadEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

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
                AI x Sales x Storytelling. Every Friday.
              </p>
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterDone(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-ember focus:ring-1 focus:ring-ember"
                />
                <button type="submit" className="btn-radial btn-radial-solid">
                  {newsletterDone ? "Subscribed" : "Subscribe"}
                </button>
              </form>
              <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                Join 0 founders who read this.
              </p>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="card-tech p-7 md:p-9">
              <p className="label-mono">Free download</p>
              <h2 className="mt-4 text-2xl text-foreground">The Narrative Audit Checklist</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                10 questions to diagnose whether your story is costing you deals.
              </p>
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDownloadDone(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={downloadEmail}
                  onChange={(e) => setDownloadEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-ember focus:ring-1 focus:ring-ember"
                />
                <button type="submit" className="btn-radial">
                  {downloadDone ? "Check your inbox" : "Download"}
                </button>
              </form>
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
