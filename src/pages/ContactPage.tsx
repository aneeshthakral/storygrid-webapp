import { useState } from "react";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { usePageTitle } from "@/hooks/usePageTitle";

const serviceOptions = [
  "Narrative Audit",
  "Narrative Sprint",
  "Narrative Starter",
  "Narrative Engine",
  "Narrative System",
  "Team Workshop",
  "Enterprise",
];

export default function ContactPage() {
  usePageTitle("Talk to Us — StoryGrid & Co");
  const [sent, setSent] = useState(false);

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Talk to Us"
        title={<>Book a discovery call</>}
        intro="Tell us where you are and where you want your narrative to be. We respond within 48 hours."
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="label-mono">Direct</p>
                <a
                  href="mailto:hello@storygrid.co"
                  className="mt-3 block text-lg text-foreground transition hover:text-blaze"
                >
                  hello@storygrid.co
                </a>
              </div>
              <div>
                <p className="label-mono">Follow</p>
                <SocialLinks className="mt-4" />
              </div>
              <div>
                <p className="label-mono">Response window</p>
                <p className="mt-3 text-foreground/85">Within 24 hours.</p>
              </div>
              <div>
                <p className="label-mono">Best fit</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Growth-stage B2B founders, Series A–C, looking to own a narrative category rather
                  than rent attention.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="card-tech space-y-5 p-7 md:p-9"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Company" name="company" />
              </div>
              <Field label="Email" name="email" type="email" />
              <div>
                <label htmlFor="service" className="label-mono !text-muted-foreground">
                  Service interest
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-blaze focus:ring-1 focus:ring-blaze"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an engagement
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-mono !text-muted-foreground">
                  Tell us about your narrative
                </label>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-blaze focus:ring-1 focus:ring-blaze"
                />
              </div>
              <button type="submit" className="btn-radial btn-radial-solid">
                {sent ? "Sent — talk soon" : "Book a discovery call"}
              </button>
              {sent && (
                <p className="text-sm text-muted-foreground">
                  Thanks — we&apos;ll be back within 48 hours.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-mono !text-muted-foreground">
        {label}
      </label>
      <input
        required
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-blaze focus:ring-1 focus:ring-blaze"
      />
    </div>
  );
}
