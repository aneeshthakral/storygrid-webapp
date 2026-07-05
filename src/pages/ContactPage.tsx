import { useState } from "react";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { usePageTitle } from "@/hooks/usePageTitle";

const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_KEY";

const serviceOptions = [
  "Narrative Audit",
  "Narrative Sprint",
  "Narrative Starter",
  "Narrative Engine",
  "Narrative System",
  "Team Workshop",
  "Surface (Build & AI Automation)",
  "Signal (AEO, Search & Paid Media)",
  "Enterprise",
];

export default function ContactPage() {
  usePageTitle("Talk to Us — StoryGrid & Co");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const service = data.get("service") as string;
    const narrative = data.get("narrative") as string;

    if (WEB3FORMS_ACCESS_KEY === "REPLACE_WITH_KEY") {
      openMailto(name, company, email, service, narrative);
      setSent(true);
      setSending(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          company,
          email,
          service,
          message: narrative,
        }),
      });
      if (!res.ok) throw new Error("Web3Forms error");
      setSent(true);
    } catch {
      openMailto(name, company, email, service, narrative);
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Talk to Us"
        title={<>Book a discovery call</>}
        intro="Tell us where you are and where you want your narrative to be. We respond within 24 hours."
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
              <div>
                <p className="label-mono">Book directly</p>
                <a
                  href="https://topmate.io/aneeshthakral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-radial mt-3 inline-flex"
                >
                  Open Topmate
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="card-tech space-y-5 p-7 md:p-9"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="name" placeholder="Alex Morgan" />
                <Field label="Company" name="company" placeholder="Meridian Technologies" />
              </div>
              <Field label="Email" name="email" type="email" placeholder="alex@meridiantech.co" />
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
                    Choose a service or engagement type
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="narrative" className="label-mono !text-muted-foreground">
                  Tell us about your narrative
                </label>
                <textarea
                  id="narrative"
                  name="narrative"
                  required
                  rows={5}
                  placeholder="What do you sell, who is it for, and where does your story break down today? Share pipeline goals, team size, or anything else that helps us prepare."
                  className="mt-2 w-full resize-none rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-blaze focus:ring-1 focus:ring-blaze"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-radial btn-radial-solid disabled:opacity-60"
              >
                {sending ? "Sending..." : sent ? "Sent — talk soon" : "Send message"}
              </button>
              {sent && (
                <p className="text-sm text-muted-foreground">
                  Thanks — we respond within 24 hours.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

function openMailto(
  name: string,
  company: string,
  email: string,
  service: string,
  narrative: string,
) {
  const subject = encodeURIComponent(`Inquiry from ${name} at ${company}`);
  const body = encodeURIComponent(
    `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nService: ${service}\n\n${narrative}`,
  );
  window.location.href = `mailto:hello@storygrid.co?subject=${subject}&body=${body}`;
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
        className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-blaze focus:ring-1 focus:ring-blaze"
      />
    </div>
  );
}
