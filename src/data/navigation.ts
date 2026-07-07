export type NavLink = { to: string; label: string };
export type NavGroup = { label: string; children: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

export const mainNavEntries: NavEntry[] = [
  { to: "/", label: "Home" },
  { to: "/approach", label: "Approach" },
  {
    label: "Services",
    children: [
      { to: "/services", label: "Narrative Building" },
      { to: "/ai-automation", label: "AI Automation" },
      { to: "/digital-marketing", label: "Digital Marketing" },
    ],
  },
  { to: "/for-teams", label: "For Teams" },
  { to: "/story", label: "Story" },
  { to: "/resources", label: "Resources" },
];

export const footerNavLinks = [
  { to: "/", label: "Home" },
  { to: "/approach", label: "Approach" },
  { to: "/services", label: "Narrative Building" },
  { to: "/ai-automation", label: "AI Automation" },
  { to: "/digital-marketing", label: "Digital Marketing" },
  { to: "/for-teams", label: "For Teams" },
  { to: "/story", label: "Story" },
  { to: "/resources", label: "Resources" },
] as const;

export const policyLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/work-policy", label: "Work Policy" },
] as const;
