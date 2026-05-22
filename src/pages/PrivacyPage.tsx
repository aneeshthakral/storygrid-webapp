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
    body: "We may collect your name, email address, company name, service interest selections, and any information you submit through our contact form, newsletter signup, or resource download forms. We also collect technical data such as IP address, browser type, and pages visited through cookies and analytics tools.",
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
    body: "We use cookies and similar technologies for essential site functionality and analytics. You may control cookies through your browser settings. [TO CONFIRM: Analytics tool name, cookie type, IP anonymization status]",
  },
  {
    id: "third-party",
    title: "Third-party processors and data sharing",
    body: "We share data with service providers who help us operate our website and communications, including [TO CONFIRM: Contact form provider name + country] and [TO CONFIRM: Email/newsletter provider name + country]. These processors are bound by contractual obligations to protect your data.",
  },
  {
    id: "retention",
    title: "Data retention periods",
    body: "Contact form submissions: [TO CONFIRM retention period]. Newsletter subscribers: [TO CONFIRM retention period]. Analytics data: [TO CONFIRM — GA4 default is 14 months].",
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
        Physical address: [TO CONFIRM]. Effective date: [TO CONFIRM].
      </>
    ),
  },
];

export default function PrivacyPage() {
  usePageTitle("Privacy Policy — StoryGrid & Co");

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
