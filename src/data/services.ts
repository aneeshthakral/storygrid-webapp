export type PricingMode = "listed" | "scoped";

export type ServiceOffering = {
  id: string;
  name: string;
  description: string;
};

export type ServiceStep = {
  title: string;
  body: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceProofPoint = {
  label: string;
  body: string;
};

export type ServiceCategoryId = "narrative" | "ai-automation" | "digital-marketing";

export type ServiceCategory = {
  id: ServiceCategoryId;
  slug: string;
  path: string;
  name: string;
  armName: string | null;
  navLabel: string;
  eyebrow: string;
  heroTitle: string;
  heroIntro: string;
  positioning: string;
  offerings: ServiceOffering[];
  howItWorks: ServiceStep[];
  faqs: ServiceFaq[];
  proofPoint: ServiceProofPoint | null;
  pricingMode: PricingMode;
  ctaLabel: string;
  metaDescription: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "narrative",
    slug: "",
    path: "/services",
    name: "Narrative Building",
    armName: "Story",
    navLabel: "Narrative Building",
    eyebrow: "Services",
    heroTitle: "Clear pricing. Real deliverables. No guessing.",
    heroIntro: "Every engagement is scoped, priced, and structured before we start.",
    positioning:
      "Narrative Building is the core arm of StoryGrid & Co. Story is the core. Surface and Signal make it land.",
    offerings: [],
    howItWorks: [],
    faqs: [],
    proofPoint: null,
    pricingMode: "listed",
    ctaLabel: "Book a discovery call",
    metaDescription:
      "Narrative strategy, ghostwriting, and content systems from StoryGrid & Co. Clear pricing across Audit, Sprint, Starter, Engine, and System tiers.",
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    path: "/ai-automation",
    name: "AI Automation",
    armName: "Surface — Build Arm",
    navLabel: "AI Automation",
    eyebrow: "AI Automation",
    heroTitle: "The systems that run your business without you standing over them.",
    heroIntro:
      "Workflow automation, integrations, and AI-powered operations. Built by the same team that builds your narrative, for founders who want their story and their systems moving together.",
    positioning:
      "AI Automation is part of Surface, the build arm of StoryGrid & Co. Story is the core. Surface and Signal make it land. This is where we build the operational systems that carry your business day to day: workflow automation, tool integrations, and AI-augmented processes that remove manual work from your team's plate. Every project is scoped and documented before work begins. No published pricing, no rate-card numbers.",
    offerings: [
      {
        id: "workflow-automation",
        name: "Workflow Automation",
        description:
          "Manual processes turned into automated systems. The repetitive work your team does by hand every week, mapped and automated.",
      },
      {
        id: "tool-integrations",
        name: "Tool & API Integrations",
        description:
          "Your existing tools connected so data moves between them without manual re-entry. CRM, email, calendars, and internal tools, wired together.",
      },
      {
        id: "ai-augmented-operations",
        name: "AI-Augmented Operations",
        description:
          "AI models integrated into real operational workflows: lead qualification, document processing, internal reporting, and customer support triage.",
      },
      {
        id: "legacy-modernization",
        name: "Legacy Process Modernization",
        description:
          "Old spreadsheets, manual handoffs, and outdated tools replaced with systems built for how the business runs today.",
      },
    ],
    howItWorks: [
      {
        title: "Discovery & mapping",
        body: "We map your current tools, workflows, and the manual work costing your team time. Every engagement starts with understanding what actually happens day to day.",
      },
      {
        title: "Scope & build",
        body: "We scope the exact systems and integrations needed, then build and test them against your real workflows, not a generic template.",
      },
      {
        title: "Handoff & support",
        body: "Documentation, training, and support so your team can run the systems day to day. No dependency on us to keep the lights on.",
      },
    ],
    faqs: [
      {
        question: "Do you work with industries outside tech?",
        answer:
          "Yes. Automation work spans manufacturing, logistics, professional services, and other conventional industries where legacy processes and disconnected tools cost the most time.",
      },
      {
        question: "How is this priced?",
        answer:
          "Every AI Automation engagement is scoped and priced after a discovery call. Pricing depends on the systems involved and the integrations required, so no published rate applies here.",
      },
      {
        question: "Do I need an existing narrative engagement to start?",
        answer:
          "No. AI Automation can start on its own. Many clients sequence it alongside or after narrative work, but it is not a requirement.",
      },
      {
        question: "What if my team has no AI experience?",
        answer:
          "That's normal. Discovery includes an honest look at your team's current tools and comfort level, and we scope training into the engagement where it's needed.",
      },
    ],
    proofPoint: {
      label: "One example, among many industries",
      body: "A leading OEM manufacturer used AI automation to replace manual order processing and reporting workflows that had run unchanged for years. This is one example among the industries we support. Conventional-industry operators, not just tech companies, are often where automation has the most room to compound.",
    },
    pricingMode: "scoped",
    ctaLabel: "Book a discovery call",
    metaDescription:
      "AI automation and workflow systems from StoryGrid & Co. Scoped and built after a discovery call, for founders who want their operations to run like their narrative reads.",
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    path: "/digital-marketing",
    name: "Digital Marketing",
    armName: "Signal — Digital Marketing Arm",
    navLabel: "Digital Marketing",
    eyebrow: "Digital Marketing",
    heroTitle: "Distribution that carries the story to market and brings demand back.",
    heroIntro:
      "Signal is the distribution arm of StoryGrid & Co. Sequenced after the narrative and the surfaces are in place, so demand generation runs on a story worth spreading.",
    positioning:
      "Digital Marketing is part of Signal, the distribution arm of StoryGrid & Co. Priced per scope on discovery. This work runs after the narrative and the surfaces are in place: distribution without a settled story and a built surface to send traffic to is lower-leverage.",
    offerings: [
      {
        id: "aeo",
        name: "Answer-Engine Optimization (AEO)",
        description:
          "Visibility inside AI answers and assistants. Position the brand where buyers are increasingly looking first.",
      },
      {
        id: "search-optimization",
        name: "Search Optimization",
        description:
          "Organic discovery and intent capture. Built on the narrative infrastructure already in place.",
      },
      {
        id: "digital-media-services",
        name: "Digital Media Services",
        description:
          "Content distribution, creative production, and media planning. The story reaches the right audience at the right moment.",
      },
      {
        id: "meta-paid-social",
        name: "Meta & Paid Social",
        description:
          "Targeted demand across Meta and beyond. Signal runs after the narrative and the surfaces are in place.",
      },
    ],
    howItWorks: [
      {
        title: "Discovery & audit",
        body: "We review your current channels, existing SEO and AEO footprint, and where demand is and isn't converting today.",
      },
      {
        title: "Scope & sequence",
        body: "We scope the channels that matter most for your stage and sequence them against the narrative and surface work already underway.",
      },
      {
        title: "Run & report",
        body: "Campaigns and optimization work run on a discovery-scoped cadence, with reporting tied to pipeline, not vanity metrics.",
      },
    ],
    faqs: [
      {
        question: "What is AEO and why does it matter now?",
        answer:
          "Answer-Engine Optimization is visibility inside AI assistants and answer engines, not just search results. Buyers increasingly ask an AI before they open a search engine, and AEO positions your brand to show up in that answer.",
      },
      {
        question: "Do I need an existing website or narrative in place first?",
        answer:
          "Generally yes. Digital Marketing runs after the narrative and the surfaces are in place. Distribution without a settled story and a place to send traffic is lower-leverage.",
      },
      {
        question: "Is pricing published anywhere?",
        answer:
          "No. Every Digital Marketing engagement is priced per scope on discovery, based on the channels and cadence involved.",
      },
      {
        question: "Can I start with just one channel, like AEO or paid social?",
        answer:
          "Yes. Engagements are scoped to the channels that make sense for your stage, not sold as an all-or-nothing package.",
      },
    ],
    proofPoint: null,
    pricingMode: "scoped",
    ctaLabel: "Book a discovery call",
    metaDescription:
      "AEO, search, and paid distribution from StoryGrid & Co. Signal carries the story to market after the narrative and surfaces are in place.",
  },
];

export function getServiceCategoryById(id: string | undefined) {
  if (!id) return undefined;
  return serviceCategories.find((c) => c.id === id);
}
