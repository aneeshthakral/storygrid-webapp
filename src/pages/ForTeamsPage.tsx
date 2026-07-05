import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import CurrencyToggle from "@/components/CurrencyToggle";
import PageCTA from "@/components/sections/PageCTA";
import { SectionHeading, SectionShell } from "@/components/sections/SectionShell";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCurrency } from "@/hooks/useCurrency";
import { teamWorkshop } from "@/data/pricing";

const teamProblems = [
  "Every team member describes your company differently.",
  "Sales emails get rewritten three times before they go out.",
  "Your AI-generated content sounds exactly like everyone else's.",
  "You've become the bottleneck for anything client-facing.",
];

const learnings = [
  {
    n: "01",
    title: "Narrative clarity",
    body: "Explain what you do in one sentence that makes people want to hear more.",
  },
  {
    n: "02",
    title: "Problem-first communication",
    body: "Lead with the customer's problem, not your product features.",
  },
  {
    n: "03",
    title: "AI + Human",
    body: "Use AI as a production tool while bringing the strategy and voice that makes content land.",
  },
  {
    n: "04",
    title: "One voice",
    body: "Every email, pitch, and post reinforces the same clear message.",
  },
];

const includes = [
  "1-day workshop (virtual or on-site)",
  "StoryGrid's narrative framework applied to your business",
  "Team walks away with a unified messaging playbook",
  "Practical exercises with real client-facing content",
  "30-day post-workshop Slack support",
  "Up to 15 people",
];

export default function ForTeamsPage() {
  usePageTitle("For Teams — StoryGrid & Co.");
  const [currency, setCurrency] = useCurrency();

  return (
    <PageLayout>
      <PageHeader
        eyebrow="For Teams"
        title={
          <>
            Your team writes for your brand every day. Most of them were never trained to{" "}
            <span className="text-ember">do it well.</span>
          </>
        }
        intro="StoryGrid Team Workshops give your sales and marketing teams the narrative skills to communicate with clarity, sell with confidence, and speak with one voice."
      />

      <SectionShell variant="dark" bordered>
        <Reveal>
          <SectionHeading label="Sound familiar?" title="The problem" />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {teamProblems.map((p, i) => (
            <Reveal key={p} delay={i * 80}>
              <article className="card-tech p-6 md:p-7">
                <p className="text-sm leading-relaxed text-foreground/90 md:text-base">{p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell variant="grain">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Reveal>
            <SectionHeading
              label="Offering"
              title={teamWorkshop.name}
              intro={`Best for: ${teamWorkshop.bestFor}`}
            />
          </Reveal>
          <Reveal delay={100}>
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </Reveal>
        </div>

        <Reveal delay={160}>
          <article className="card-tech relative mt-10 overflow-hidden p-8 md:p-10 !border-ember/50 shadow-[0_30px_80px_-30px_rgba(255,92,43,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,92,43,0.12),transparent_55%)]" />
            <div className="relative">
              <p className="font-display text-5xl text-ember md:text-6xl">
                {teamWorkshop.prices[currency]}
              </p>
              <p className="label-mono mt-3 !text-muted-foreground">One-time engagement</p>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground/85">
                    <Check size={14} className="mt-1 shrink-0 text-ember" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-radial btn-radial-solid relative mt-10 inline-flex">
                Book a discovery call
              </Link>
            </div>
          </article>
        </Reveal>
      </SectionShell>

      <SectionShell variant="light">
        <Reveal>
          <SectionHeading label="Outcomes" title="What teams learn" />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {learnings.map((l, i) => (
            <Reveal key={l.n} delay={i * 80} className="h-full">
              <article className="card-tech flex h-full flex-col p-7">
                <span className="font-display text-4xl text-ember/35">{l.n}</span>
                <h3 className="mt-4 text-lg text-foreground">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <PageCTA
        title="Ready to align your team around one narrative?"
        links={[
          { to: "/contact", label: "Book a discovery call", primary: true },
          { to: "/services", label: "View all services" },
        ]}
      />
    </PageLayout>
  );
}
