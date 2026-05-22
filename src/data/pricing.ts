export type Currency = "USD" | "INR";

export const currencies: Currency[] = ["USD", "INR"];

export type PriceMap = Record<Currency, string>;

export type TierDetailContent = {
  overview: string;
  whoItsFor: string;
  howItWorks: { title: string; body: string }[];
  outcomes: string[];
  note?: string;
};

export type MonthlyRetainer = {
  id: string;
  tier: string;
  name: string;
  badge: string | null;
  prices: PriceMap | null;
  minimum: string | null;
  bestFor: string;
  items: readonly string[];
  detail: TierDetailContent;
};

export const oneTimeEngagements = [
  {
    id: "audit",
    name: "The Narrative Audit",
    prices: { USD: "$499", INR: "₹39,950" },
    description:
      "A complete audit of your current narrative, positioning, and content. Strengths, gaps, and a 30-day path forward. Delivered in two weeks.",
    cta: "Book your engagement",
  },
  {
    id: "sprint",
    name: "The Narrative Sprint",
    prices: { USD: "$1,999", INR: "₹1,64,950" },
    description:
      "Two-week intensive voice extraction, positioning, and a 30-day LinkedIn strategy you can hand to any operator. Delivered ready to ship.",
    cta: "Book this engagement",
  },
] as const;

export const monthlyRetainers = [
  {
    id: "starter",
    tier: "01",
    name: "Narrative Starter",
    badge: null as string | null,
    prices: { USD: "$999", INR: "₹79,950" },
    minimum: "3 mo",
    bestFor:
      "Early-stage founders who need a clear, ownable narrative before scaling content.",
    items: [
      "Brand narrative document",
      "Founder voice extraction",
      "8 LinkedIn posts/month, ghostwritten",
      "Founder profile rewrite",
      "Monthly strategy call",
      "Dedicated Slack channel",
    ],
    detail: {
      overview:
        "Narrative Starter is the foundation tier. We extract your founder voice, document the core story, and ship consistent LinkedIn presence so you stop improvising messaging every week.",
      whoItsFor:
        "Pre-seed to Series A founders who have product-market fit signals but no repeatable narrative. You need clarity before you scale content volume or hire a marketing team.",
      howItWorks: [
        {
          title: "Voice & narrative extraction",
          body: "Deep founder interviews and positioning work produce a brand narrative document and voice guide your whole team can use.",
        },
        {
          title: "Profile & presence rebuild",
          body: "We rewrite your founder profile and establish a credible, in-voice posting cadence on LinkedIn.",
        },
        {
          title: "Monthly rhythm",
          body: "Eight ghostwritten posts per month plus a strategy call and Slack access keep narrative aligned as the business evolves.",
        },
      ],
      outcomes: [
        "One clear story your team tells consistently",
        "Founder LinkedIn that sounds like you, not a generic agency",
        "Messaging ready for sales calls, hiring, and investor conversations",
      ],
      note: "Audit fees credit toward this tier when you upgrade within 60 days.",
    },
  },
  {
    id: "engine",
    tier: "02",
    name: "Narrative Engine",
    badge: "Most Chosen",
    prices: { USD: "$2,499", INR: "₹1,99,950" },
    minimum: "3 mo",
    bestFor:
      "Growth-stage founders building a content system that compounds into pipeline.",
    items: [
      "Full narrative strategy + brand story framework",
      "16 posts/month (founder + company page)",
      "AI-augmented content production pipeline",
      "Weekly strategy calls",
      "One designed format/month",
      "Monthly performance reports",
    ],
    detail: {
      overview:
        "Narrative Engine is our most chosen retainer. It pairs full narrative strategy with an AI-augmented production system so content compounds into authority and pipeline—not one-off posts.",
      whoItsFor:
        "Growth-stage founders and lean marketing leads who need a system, not more freelancers. You want founder and company channels moving in sync with weekly strategic oversight.",
      howItWorks: [
        {
          title: "Strategy & framework",
          body: "We build your brand story framework, messaging pillars, and channel plan so every asset pulls in the same direction.",
        },
        {
          title: "Production engine",
          body: "Sixteen posts per month across founder and company pages, powered by workflows that blend AI speed with human strategy and editing.",
        },
        {
          title: "Iterate with data",
          body: "Weekly calls, monthly reports, and one designed format per month sharpen what resonates with your ICP.",
        },
      ],
      outcomes: [
        "Predictable content output without founder time drain",
        "Narrative that supports sales cycles, not just top-of-funnel vanity",
        "A system your team can run and extend after the engagement matures",
      ],
      note: "Most clients start here after an audit or sprint, or move up from Tier 01 within two quarters.",
    },
  },
  {
    id: "system",
    tier: "03",
    name: "Narrative System",
    badge: null,
    prices: { USD: "$4,999", INR: "₹3,99,950" },
    minimum: "6 mo",
    bestFor:
      "Growth-stage companies ready to own their narrative category across every channel.",
    items: [
      "Multi-channel rebuild (LinkedIn, Instagram, long-form)",
      "24 posts/month across channels",
      "AI stack integration",
      "Dedicated narrative strategist",
      "Executive brand programs (up to 2 founders)",
      "Campaign/launch support",
      "Bi-weekly strategy sessions",
      "Quarterly narrative review",
    ],
    detail: {
      overview:
        "Narrative System is for companies ready to own a category narrative across every channel. Multi-channel production, executive programs, and dedicated strategic leadership—in one retainer.",
      whoItsFor:
        "Series A–C companies with multiple customer-facing leaders, launch calendars, and channels beyond LinkedIn. You need narrative infrastructure, not a single founder ghostwriter.",
      howItWorks: [
        {
          title: "Multi-channel architecture",
          body: "LinkedIn, Instagram, and long-form are rebuilt from the same story system so positioning stays coherent everywhere.",
        },
        {
          title: "Scale & specialists",
          body: "Twenty-four posts per month, AI stack integration, and a dedicated narrative strategist embedded in your rhythm.",
        },
        {
          title: "Executive & launch support",
          body: "Up to two founder/executive brand tracks, campaign support, bi-weekly sessions, and quarterly narrative reviews.",
        },
      ],
      outcomes: [
        "Category-level story presence across channels",
        "Executive brands that reinforce the company narrative",
        "Launch-ready narrative assets tied to revenue moments",
      ],
      note: "Six-month minimum reflects the build-and-compound arc this tier requires.",
    },
  },
  {
    id: "command",
    tier: "04",
    name: "Narrative Command",
    badge: null,
    prices: null,
    minimum: null,
    bestFor:
      "Companies needing full narrative transformation across brand, sales, and leadership communications. No published price.",
    items: [
      "Brand narrative document",
      "Founder voice extraction",
      "8 LinkedIn posts/month, ghostwritten",
      "Founder profile rewrite",
      "Monthly strategy call",
      "Dedicated Slack channel",
      "Full narrative strategy + brand story framework",
      "16 posts/month (founder + company page)",
      "AI-augmented content production pipeline",
      "Weekly strategy calls",
      "One designed format/month",
      "Monthly performance reports",
      "Multi-channel rebuild (LinkedIn, Instagram, long-form)",
      "24 posts/month across channels",
      "AI stack integration",
      "Dedicated narrative strategist",
      "Executive brand programs (up to 2 founders)",
      "Campaign/launch support",
      "Bi-weekly strategy sessions",
      "Quarterly narrative review",
    ],
    detail: {
      overview:
        "Narrative Command is a bespoke engagement for organizations undertaking full narrative transformation—brand, sales, leadership communications, and often multiple business units.",
      whoItsFor:
        "Established B2B companies, PE-backed platforms, or category leaders who need a partner embedded in narrative change across teams, not a single-channel retainer.",
      howItWorks: [
        {
          title: "Discovery & scope",
          body: "We map stakeholders, channels, sales motions, and existing assets before proposing a phased transformation plan.",
        },
        {
          title: "Embedded delivery",
          body: "Custom team structure, cadence, and deliverables—often combining strategy, training, content systems, and sales narrative work.",
        },
        {
          title: "Governance & handoff",
          body: "Playbooks, workshops, and internal enablement so narrative capability stays inside the company after the engagement.",
        },
      ],
      outcomes: [
        "Aligned narrative from boardroom to SDR scripts",
        "Reduced friction between marketing, sales, and product story",
        "Durable internal systems—not dependency on an agency retainer",
      ],
      note: "Pricing and timeline are defined after a discovery call. No published rate.",
    },
  },
] as const satisfies readonly MonthlyRetainer[];

export type MonthlyRetainerId = (typeof monthlyRetainers)[number]["id"];

export function getTierById(tierId: string | undefined) {
  if (!tierId) return undefined;
  return monthlyRetainers.find((t) => t.id === tierId);
}

export const teamWorkshop = {
  name: "Team Narrative Workshop",
  prices: { USD: "$2,499", INR: "₹1,99,950" },
  bestFor: "Teams of 5–25 in sales, marketing, or customer-facing roles.",
};

export function formatMonthlyPrice(prices: PriceMap, currency: Currency): string {
  return `${prices[currency]}/mo`;
}

export function formatMinimumLabel(minimum: string): string {
  return minimum.replace(/\s*mo$/i, "-MONTH MINIMUM").toUpperCase();
}

export function tierDetailPath(tierId: string) {
  return `/services/${tierId}`;
}
