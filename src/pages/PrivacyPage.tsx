import PolicyDocument, { type PolicySection } from "@/components/sections/PolicyDocument";
import { usePageTitle } from "@/hooks/usePageTitle";

const sections: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction and scope",
    body: "This Privacy Policy describes how StoryGrid & Co. collects, uses, and protects personal data when you visit our website, subscribe to our newsletter, download resources, or contact us. This policy applies to visitors worldwide and is structured to align with India's Digital Personal Data Protection Act 2023, the EU GDPR, and the California CCPA/CPRA.",
  },
  {
    id: "data-collect",
    title: "Data we collect",
    body: "We may collect your name, email address, company name, service interest selections, and any information you submit through our contact form. No analytics tools currently run on this site and no analytics data is collected.",
  },
  {
    id: "how-we-use",
    title: "How we use data",
    body: "We use your data to respond to inquiries, deliver newsletters and downloads you request, improve our website, and communicate about StoryGrid & Co. services. We do not sell your personal data.",
  },
  {
    id: "lawful-basis",
    title: "Lawful basis for processing",
    body: "Where GDPR applies, we process data based on consent (newsletter, downloads), legitimate interests (website security and improvement), and contractual necessity when you engage our services.",
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    body: "No analytics tool currently runs on this site. No tracking cookies are set. This site uses only cookies that are essential for basic site functionality. You may control cookies through your browser settings.",
  },
  {
    id: "third-party",
    title: "Third-party processors and data sharing",
    body: "We share data with service providers who help us operate our website and communications. Contact form submissions are processed by Web3Forms (web3forms.com/privacy), operated in the United States. Newsletter subscriptions are managed by Substack (substack.com/privacy), operated in the United States. These processors are bound by contractual obligations to protect your data.",
  },
  {
    id: "retention",
    title: "Data retention periods",
    body: "Contact form submissions are retained for up to 12 months. Newsletter subscriber data is managed by Substack per their retention policy. No analytics data is collected.",
  },
  {
    id: "transfers",
    title: "International data transfers",
    body: "Your data may be processed in countries other than your own. Where required, we implement appropriate safeguards for cross-border transfers.",
  },
  {
    id: "rights",
    title: "Your rights",
    body: "Depending on your location, you may have rights to access, correct, delete, restrict, or port your data, and to withdraw consent or opt out of certain processing. Under India's DPDP Act, GDPR, and CCPA/CPRA, you may also lodge complaints with relevant authorities. Contact hello@storygrid.co to exercise your rights.",
  },
  {
    id: "security",
    title: "Data security",
    body: "We implement reasonable technical and organizational measures to protect personal data. No method of transmission over the internet is fully secure.",
  },
  {
    id: "children",
    title: "Children's privacy",
    body: "Our services are not directed to individuals under 18. We do not knowingly collect data from children.",
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be posted on this page with an updated effective date.",
  },
  {
    id: "contact",
    title: "Contact for data requests",
    body: (
      <>
        Email{" "}
        <a href="mailto:hello@storygrid.co">hello@storygrid.co</a> for privacy-related requests.
        Registered address available on request. Contact: hello@storygrid.co. Effective date: 6 July 2026.
      </>
    ),
  },
];

export default function PrivacyPage() {
  usePageTitle("Privacy Policy — StoryGrid & Co.");

  return (
    <PolicyDocument
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How StoryGrid & Co. collects, uses, and protects your personal data."
      notice="This policy should be reviewed by qualified legal counsel before being relied upon for compliance purposes."
      sections={sections}
    />
  );
}
