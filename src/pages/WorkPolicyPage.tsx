import PolicyDocument, { type PolicySection } from "@/components/sections/PolicyDocument";
import { usePageTitle } from "@/hooks/usePageTitle";

const sections: PolicySection[] = [
  {
    id: "purpose",
    title: "Purpose and scope",
    body: "This Work Policy outlines expectations for everyone working with or for StoryGrid & Co., including contractors, collaborators, and team members. It applies to all project work, client engagements, and internal operations.",
  },
  {
    id: "conduct",
    title: "Professional conduct",
    body: "We expect honesty, respect, and accountability in all interactions with clients, partners, and each other. Confidential client information must not be disclosed without authorization.",
  },
  {
    id: "quality",
    title: "Quality and delivery standards",
    body: "Work is delivered on agreed timelines with clear communication when scope or timing changes. All client-facing materials follow StoryGrid brand voice rules and are reviewed before publication.",
  },
  {
    id: "ai",
    title: "AI and tooling",
    body: "AI is used as a production accelerant within our methodology, not as a replacement for strategic thinking or founder voice. Team members document how AI tools are used on client work where relevant.",
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: "Client deliverables belong to clients per engagement agreements. StoryGrid retains rights to internal frameworks, templates, and methodologies unless otherwise agreed in writing.",
  },
  {
    id: "communication",
    title: "Communication",
    body: "Primary channels are email and Slack as defined per engagement. Response expectations are communicated at project start and honored on business days.",
  },
  {
    id: "escalation",
    title: "Conflicts and escalation",
    body: (
      <>
        Concerns about work quality, scope, or conduct should be raised with the project lead or{" "}
        <a href="mailto:hello@storygrid.co">hello@storygrid.co</a>. We address issues directly and
        promptly.
      </>
    ),
  },
  {
    id: "updates",
    title: "Policy updates",
    body: "This policy may be updated as StoryGrid & Co. grows. The current version is always available at this URL.",
  },
];

export default function WorkPolicyPage() {
  usePageTitle("Work Policy — StoryGrid & Co.", { robots: "noindex, nofollow" });

  return (
    <PolicyDocument
      eyebrow="Policies"
      title="Work Policy"
      subtitle="StoryGrid & Co. workplace and collaboration standards. Public via direct link for team members and collaborators."
      sections={sections}
    />
  );
}
