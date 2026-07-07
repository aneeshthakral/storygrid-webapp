import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout, { PageHeader } from "@/components/PageLayout";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { usePageTitle } from "@/hooks/usePageTitle";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "REPLACE_WITH_KEY";

type Category = "narrative" | "ai-automation" | "digital-marketing";

const categoryLabels: Record<Category, string> = {
  narrative: "Narrative Building",
  "ai-automation": "AI Automation",
  "digital-marketing": "Digital Marketing",
};

const narrativeServiceOptions = [
  "Narrative Audit",
  "Narrative Sprint",
  "Narrative Starter",
  "Narrative Engine",
  "Narrative System",
  "Narrative Command",
  "Team Narrative Workshop",
];

const tierLabels: Record<string, string> = {
  audit: "Narrative Audit",
  sprint: "Narrative Sprint",
  starter: "Narrative Starter",
  engine: "Narrative Engine",
  system: "Narrative System",
  command: "Narrative Command",
};

const timelineOptions = ["Immediately", "Within 3 months", "Within 6 months", "Just exploring"];

const narrativeIntroByCategory: Record<Category, string> = {
  narrative: "Tell us about your narrative",
  "ai-automation": "Tell us about your operations",
  "digital-marketing": "Tell us about your marketing today",
};

export default function ContactPage() {
  usePageTitle("Talk to Us — StoryGrid & Co.");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [category, setCategory] = useState<Category>("narrative");
  const [selectedTier, setSelectedTier] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const service = searchParams.get("service");
    if (service === "narrative" || service === "ai-automation" || service === "digital-marketing") {
      setCategory(service);
    }
    const tier = searchParams.get("tier");
    if (tier && tierLabels[tier]) {
      setSelectedTier(tierLabels[tier]);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const narrative = data.get("narrative") as string;
    const service = category === "narrative" ? (data.get("service") as string) : undefined;

    const branchFields: Record<string, string> = {};
    if (category === "ai-automation") {
      branchFields.industry = data.get("industry") as string;
      branchFields.companySize = data.get("companySize") as string;
      branchFields.automateFunctions = data.get("automateFunctions") as string;
      branchFields.currentTools = (data.get("currentTools") as string) || "";
      branchFields.aiFamiliarity = data.get("aiFamiliarity") as string;
      branchFields.trainingInScope = data.get("trainingInScope") as string;
      branchFields.timeline = data.get("timeline") as string;
    } else if (category === "digital-marketing") {
      branchFields.websiteStatus = data.get("websiteStatus") as string;
      branchFields.currentChannels = (data.get("currentChannels") as string) || "";
      branchFields.seoAeoStatus = data.get("seoAeoStatus") as string;
      branchFields.primaryGoal = data.get("primaryGoal") as string;
      branchFields.timeline = data.get("timeline") as string;
    }

    const mailtoArgs = { category, name, company, email, service, narrative, branchFields };

    if (WEB3FORMS_ACCESS_KEY === "REPLACE_WITH_KEY") {
      openMailto(mailtoArgs);
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
          subject: `[${categoryLabels[category]}] New inquiry - ${name}`,
          category: categoryLabels[category],
          name,
          company,
          email,
          service,
          message: narrative,
          ...branchFields,
        }),
      });
      if (!res.ok) throw new Error("Web3Forms error");
      setSent(true);
    } catch {
      openMailto(mailtoArgs);
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
            <form onSubmit={handleSubmit} className="card-tech space-y-5 p-7 md:p-9">
              <div>
                <label htmlFor="category" className="label-mono !text-muted-foreground">
                  What do you need?
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-blaze focus:ring-1 focus:ring-blaze"
                >
                  <option value="narrative">Narrative Building</option>
                  <option value="ai-automation">AI Automation</option>
                  <option value="digital-marketing">Digital Marketing</option>
                </select>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="name" placeholder="Alex Morgan" />
                <Field label="Company" name="company" placeholder="Meridian Technologies" />
              </div>
              <Field label="Email" name="email" type="email" placeholder="alex@meridiantech.co" />

              {category === "narrative" && (
                <div>
                  <label htmlFor="service" className="label-mono !text-muted-foreground">
                    Service interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-blaze focus:ring-1 focus:ring-blaze"
                  >
                    <option value="" disabled>
                      Choose a service or engagement type
                    </option>
                    {narrativeServiceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {category === "ai-automation" && (
                <>
                  <Field
                    label="Industry"
                    name="industry"
                    placeholder="Manufacturing, logistics, professional services..."
                  />
                  <SelectField
                    label="Company size"
                    name="companySize"
                    options={["1–10", "11–50", "51–200", "200+"]}
                  />
                  <TextareaField
                    label="Functions to automate"
                    name="automateFunctions"
                    placeholder="Order processing, reporting, customer support triage..."
                  />
                  <TextareaField
                    label="Current tools and legacy processes"
                    name="currentTools"
                    placeholder="What you use today, and what's held together manually"
                    required={false}
                  />
                  <SelectField
                    label="Team AI familiarity"
                    name="aiFamiliarity"
                    options={["New to AI", "Some familiarity", "Actively using AI tools"]}
                  />
                  <SelectField
                    label="Staff training in scope"
                    name="trainingInScope"
                    options={["Yes", "No", "Not sure yet"]}
                  />
                  <SelectField label="Timeline" name="timeline" options={timelineOptions} />
                </>
              )}

              {category === "digital-marketing" && (
                <>
                  <SelectField
                    label="Website status"
                    name="websiteStatus"
                    options={["Live and active", "Live but outdated", "No website yet"]}
                  />
                  <TextareaField
                    label="Current channels"
                    name="currentChannels"
                    placeholder="LinkedIn organic, paid social, SEO..."
                    required={false}
                  />
                  <SelectField
                    label="SEO/AEO work today"
                    name="seoAeoStatus"
                    options={["Yes, active work", "Some, informally", "No"]}
                  />
                  <SelectField
                    label="Primary goal"
                    name="primaryGoal"
                    options={[
                      "More qualified leads",
                      "Brand visibility",
                      "AEO / AI-answer visibility",
                      "Other",
                    ]}
                  />
                  <SelectField label="Timeline" name="timeline" options={timelineOptions} />
                </>
              )}

              <div>
                <label htmlFor="narrative" className="label-mono !text-muted-foreground">
                  {narrativeIntroByCategory[category]}
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
                  Thanks. We respond within 24 hours. Every inquiry gets a discovery call before any
                  proposal. Pricing and scope are defined after that call, not before.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}

function openMailto({
  category,
  name,
  company,
  email,
  service,
  narrative,
  branchFields,
}: {
  category: Category;
  name: string;
  company: string;
  email: string;
  service?: string;
  narrative: string;
  branchFields: Record<string, string>;
}) {
  const subject = encodeURIComponent(
    `[${categoryLabels[category]}] Inquiry from ${name} at ${company}`,
  );
  const lines = [
    `Category: ${categoryLabels[category]}`,
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
  ];
  if (service) lines.push(`Service: ${service}`);
  Object.entries(branchFields).forEach(([key, value]) => {
    if (value) lines.push(`${key}: ${value}`);
  });
  const body = encodeURIComponent(`${lines.join("\n")}\n\n${narrative}`);
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

function SelectField({
  label,
  name,
  options,
  required = true,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-mono !text-muted-foreground">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="mt-2 w-full rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-blaze focus:ring-1 focus:ring-blaze"
      >
        <option value="" disabled>
          Choose an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-mono !text-muted-foreground">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={3}
        placeholder={placeholder}
        className="mt-2 w-full resize-none rounded-md border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-blaze focus:ring-1 focus:ring-blaze"
      />
    </div>
  );
}
