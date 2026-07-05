# StoryGrid & Co. — Site Update 2026 Handoff

**Branch:** `site-update-2026`  
**Planning date:** 2026-07-06  
**Status:** Planning locked. Awaiting Stage A execution.

---

## Resume Rule

Read PLAN.md and this file. Continue from the first unchecked stage below. Do not repeat completed work or overwrite existing changes.

---

## Environment Findings

| Item | Status | Notes |
|---|---|---|
| Git repo | Initialized | `git init` run in codebase root. Remote set to `https://github.com/aneeshthakral/storygrid-webapp.git`. Fetched from origin. |
| Branch | Created | `site-update-2026` active. |
| Vercel auth | **NOT AUTHENTICATED** | `vercel whoami` returned: "The specified token is not valid. Use `vercel login` to generate a new token." |
| Vercel project name | **UNKNOWN** | Cannot run `vercel projects ls` without auth. Record project name here after authenticating. |
| OG image download | Not yet attempted | URL: `https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/80248fd6-a5fb-4749-b9c5-a84b725c1a25/id-preview-ccfc6fa9--bb749efb-f8e2-4723-a584-40c40ef39de3.lovable.app-1779120850940.png` |
| Checklist MD | Not found | No separate checklist MD exists in the projects directory. PDF will be built from Appendix A of the master doc (10 ICP Validation Questions). |

### Vercel Project (fill in after `vercel login`)

```
Vercel project name: ___________________________
Verified serves: storygrid.co
```

---

## Stage Checklist

### Stage A — Foundation
- [ ] CSS tokens updated (--blaze = #E8451A, 11 new tokens)
- [ ] Fonts swapped (Bricolage Grotesque display, Satoshi body)
- [ ] twitter:description fixed
- [ ] OG image downloaded to public/og-image.png (or failure noted below)
- [ ] og:image and twitter:image pointing to https://storygrid.co/og-image.png
- [ ] INR prices corrected in pricing.ts (all end in 950)
- [ ] EUR added to pricing.ts and useCurrency.ts
- [ ] ServicesPage toggle order INR / USD / EUR
- [ ] Journey text: Audit > Sprint > Starter > Engine > System
- [ ] vercel.json created
- [ ] robots.txt created
- [ ] sitemap.xml created (12 routes)
- [ ] founder.png deleted
- [ ] vite build exits 0
- [ ] Stage A committed

**OG image note (fill if download failed):**  
`___________________________________________________`

---

### Stage B — Content
- [ ] Surface arm section added to ServicesPage (4 offerings, no prices)
- [ ] Signal arm section added to ServicesPage (4 offerings, no prices)
- [ ] Contact dropdown: Surface and Signal options added
- [ ] Contact form placeholders: professional values
- [ ] StoryPage: day-job line removed
- [ ] ResourcesPage: newsletter form replaced with Substack link
- [ ] ResourcesPage: "0 founders" removed
- [ ] ResourcesPage: "Thursday" frequency correct
- [ ] Footer: commented ToS link removed
- [ ] WhereToGoNext: dead routes removed
- [ ] vite build exits 0
- [ ] Stage B committed

---

### Stage C — Function and Legal
- [ ] Web3Forms key constant in ContactPage
- [ ] Mailto fallback logic in ContactPage (fires when key = placeholder or POST fails)
- [ ] Topmate secondary CTA on ContactPage
- [ ] Response time = "24 hours" in both locations on ContactPage
- [ ] Download button wired to /narrative-audit-checklist.pdf
- [ ] public/narrative-audit-checklist.pdf exists (valid PDF, > 5KB)
- [ ] PrivacyPage: all 8 [TO CONFIRM] replaced
- [ ] PrivacyPage: effective date set to deployment date
- [ ] PrivacyPage: Web3Forms and Substack named as processors
- [ ] PrivacyPage: no analytics statement present
- [ ] vite build exits 0
- [ ] Stage C committed

---

### Stage D — QA and Deploy
- [ ] **`vercel login` completed** (BLOCKING — do not proceed without this)
- [ ] `vercel projects ls` run — Vercel project name recorded above
- [ ] `npm run build` exits 0
- [ ] `npm run lint` — no errors
- [ ] Grep audit: no #000000 or #FFFFFF in src/
- [ ] Grep audit: no [TO CONFIRM] in src/
- [ ] Grep audit: no "Dynamic Canvas" in index.html
- [ ] Grep audit: INR prices end in 950
- [ ] Grep audit: EUR prices present
- [ ] Grep audit: no "0 founders"
- [ ] Grep audit: no "Every Friday"
- [ ] Grep audit: no "48 hours" on ContactPage
- [ ] Grep audit: no "Associate Director International Sales" in StoryPage
- [ ] public/narrative-audit-checklist.pdf exists
- [ ] vercel.json has SPA rewrite
- [ ] Currency toggle verified in `npm run preview`
- [ ] `vercel link` completed
- [ ] `vercel deploy --prod` completed
- [ ] Live: storygrid.co loads
- [ ] Live: storygrid.co/approach loads directly
- [ ] Live: storygrid.co/services shows 3 arms
- [ ] Live: currency toggle cycles INR → USD → EUR
- [ ] Live: storygrid.co/story no day-job line
- [ ] Live: storygrid.co/contact has Surface/Signal dropdown
- [ ] Live: storygrid.co/resources shows Substack link
- [ ] Live: storygrid.co/privacy no [TO CONFIRM]
- [ ] Live: storygrid.co/sitemap.xml returns XML
- [ ] Live: storygrid.co/robots.txt returns text
- [ ] Live: storygrid.co/narrative-audit-checklist.pdf downloads
- [ ] OG card validator: image + title + description correct
- [ ] Stage D committed

---

## Hard Blockers

| Blocker | Severity | Resolution |
|---|---|---|
| Vercel not authenticated | **BLOCKING for Stage D** | Owner must run `vercel login` and complete browser OAuth. Run `! vercel login` in the terminal prompt. |
| OG image R2 URL down | Stage A only — non-blocking | Note failure here and continue. Update og:image to local path anyway. |

---

## Deferred Items

| Item | Reason |
|---|---|
| Showreel (audit item 11) | Owner's explicit call. Untouched. |
| recharts removal (audit item 18) | Not in locked decisions. Not in scope. |
| Unused shadcn deps (audit item 19) | Not in locked decisions. Not in scope. |
| motion usage (audit item 20) | Not in locked decisions. Not in scope. |

---

## Key File Locations

| File | Purpose |
|---|---|
| `src/styles.css` | All tokens, fonts, CSS vars |
| `src/data/pricing.ts` | All prices (INR, USD, EUR) |
| `src/hooks/useCurrency.ts` | Currency toggle logic |
| `src/pages/ServicesPage.tsx` | Main services + new Surface/Signal sections |
| `src/pages/TierDetailPage.tsx` | Per-tier detail pages |
| `src/pages/ContactPage.tsx` | Contact form + Web3Forms |
| `src/pages/ResourcesPage.tsx` | Newsletter + download |
| `src/pages/PrivacyPage.tsx` | Privacy policy |
| `src/pages/StoryPage.tsx` | Founder story |
| `src/components/Footer.tsx` | Footer (ToS cleanup) |
| `src/components/PageLayout.tsx` | WhereToGoNext dead routes |
| `index.html` | Meta tags, font links, OG image |
| `vercel.json` | SPA rewrite rule |
| `public/robots.txt` | Crawl rules |
| `public/sitemap.xml` | 12 routes |
| `public/narrative-audit-checklist.pdf` | Lead magnet PDF |
| `public/og-image.png` | Social preview image |
| `scripts/generate-checklist-pdf.js` | PDF generation script |
