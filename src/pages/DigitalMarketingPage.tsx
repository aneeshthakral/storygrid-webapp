import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import PageCTA from "@/components/sections/PageCTA";
import { SectionHeading, SectionShell } from "@/components/sections/SectionShell";
import ServiceArmsTeaser from "@/components/ServiceArmsTeaser";
import { useSeo } from "@/hooks/useSeo";
import { getServiceCategoryById } from "@/data/services";

const category = getServiceCategoryById("digital-marketing")!;

export default function DigitalMarketingPage() {
  useSeo(`${category.name} — StoryGrid & Co.`, {
    description: category.metaDescription,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: category.name,
        provider: {
          "@type": "Organization",
          name: "StoryGrid & Co.",
          url: "https://storygrid.co",
        },
        areaServed: "Worldwide",
        description: category.metaDescription,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: category.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  });

  return (
    <PageLayout>
      <PageHeader
        eyebrow={category.eyebrow}
        title={category.heroTitle}
        intro={category.heroIntro}
      />

      <SectionShell variant="dark" bordered>
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {category.positioning}
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell variant="grain">
        <Reveal>
          <SectionHeading label="What's included" title="Four channels, sequenced with intent" />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {category.offerings.map((o, i) => (
            <Reveal key={o.id} delay={i * 70} className="h-full">
              <article className="card-tech h-full p-7">
                <h3 className="text-lg text-foreground">{o.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {o.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell variant="light">
        <Reveal>
          <SectionHeading label="How engagement works" title="From audit to reporting" />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {category.howItWorks.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="h-full">
              <article className="card-tech h-full p-7">
                <span className="font-display text-4xl text-blaze/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell variant="grain">
        <Reveal>
          <SectionHeading label="FAQ" title="Common questions" />
        </Reveal>
        <div className="mt-10 space-y-4">
          {category.faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <article className="card-tech p-6 md:p-7">
                <h3 className="text-base text-foreground md:text-lg">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.answer}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <ServiceArmsTeaser currentId={category.id} />

      <PageCTA
        title="Ready to put distribution behind a story worth spreading?"
        links={[
          { to: "/contact?service=digital-marketing", label: category.ctaLabel, primary: true },
        ]}
      />
    </PageLayout>
  );
}
