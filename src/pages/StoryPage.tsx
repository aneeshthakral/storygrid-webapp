import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import PageCTA from "@/components/sections/PageCTA";
import { SectionHeading, SectionShell } from "@/components/sections/SectionShell";
import { usePageTitle } from "@/hooks/usePageTitle";

const arcSections = [
  {
    n: "01",
    title: "The problem the founder kept seeing in the field",
    body: "Deals lost not on product weakness but on perception weakness. Founders who could sell in a room but could not translate that clarity into every touchpoint their market saw.",
  },
  {
    n: "02",
    title: "Why that problem demanded a new kind of firm",
    body: "Eight years in B2B enterprise sales, $6M+ closed working with CXOs across US, EMEA, and APAC. The realization that logic rarely closes a deal but a well-told story almost always does.",
  },
  {
    n: "03",
    title: "The AI-first conviction",
    body: "The robot-book tattoo as origin story: AI learning from narrative, not replacing it. StoryGrid & Co. built at the intersection of AI, sales, and storytelling.",
  },
  {
    n: "04",
    title: "Who StoryGrid serves now",
    body: "Growth-stage B2B founders and commercial teams who need narrative infrastructure, not another content calendar.",
  },
];

export default function StoryPage() {
  usePageTitle("Story — StoryGrid & Co.");

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Story"
        title={
          <>
            Built by a salesman. <span className="text-ember">Not a marketer.</span>
          </>
        }
        intro="Most narrative agencies are founded by creatives. This one was founded by someone who spent 8 years in the room, closing deals."
      />

      <SectionShell variant="dark" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.9fr)_1.1fr] lg:gap-16">
          <Reveal>
            <figure className="card-tech group overflow-hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/images/founder.jpg"
                  alt="Aneesh Thakral, founder of StoryGrid & Co."
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  width={1024}
                  height={1024}
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,92,43,0.15),transparent_50%)]" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-center md:p-8">
                  <p className="label-mono">Aneesh Thakral</p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Founder · StoryGrid &amp; Co.
                  </p>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="space-y-5">
            {arcSections.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <article className="card-tech p-6 md:p-7">
                  <span className="font-display text-3xl text-ember/35">{s.n}</span>
                  <h3 className="mt-3 text-lg text-foreground md:text-xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {s.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell variant="grain">
        <Reveal>
          <SectionHeading label="Philosophy" title="How we think about narrative" />
        </Reveal>
        <Reveal delay={120}>
          <blockquote className="card-tech mt-10 p-8 md:p-10">
            <p className="text-2xl leading-snug text-foreground md:text-3xl">
              Narrative is infrastructure. Not a marketing tactic. The layer between a
              founder&apos;s vision and the market&apos;s perception.
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m not an AI enthusiast. I&apos;m a practitioner. I implement, then I write about
            what worked and what didn&apos;t.
          </p>
        </Reveal>
      </SectionShell>

      <PageCTA
        title="Let's talk."
        links={[{ to: "/contact", label: "Book a discovery call", primary: true }]}
      />
    </PageLayout>
  );
}
