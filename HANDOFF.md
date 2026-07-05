# StoryGrid & Co. — Site Update 2026 Handoff

**Branch:** `site-update-2026`  
**Planning date:** 2026-07-06  
**Execution date:** 2026-07-06  
**Status:** ALL STAGES COMPLETE + FINAL REVIEW PASSED. Live at https://www.storygrid.co  
**Final review deploy:** `dpl_A9rX2qzNshn9VKoYbwGfvk46v4Pv` — 2026-07-06

---

## Resume Rule

All stages complete. Final review complete. No further action required except the one owner action below.

---

## Final Review Fixes (2026-07-06)

Three-angle verification run against the master doc. Two issues found and fixed:

| Fix | Detail |
|---|---|
| Brand name period missing | "StoryGrid & Co" → "StoryGrid & Co." in all 13 files: index.html (title, og:title, twitter:title, author), Logo.tsx (aria-label, sr-only), and all 11 page `usePageTitle()` calls. Per §1.2, the period is part of the official brand name. |
| `color: white` in ::selection | Replaced with `color: var(--section-break)` (#F0E8E2). Per master doc §3.1, pure white (#FFFFFF) must not appear anywhere; use Section Break in its place. |

**All three angles passed:**
- Angle 1 (Data & Truth): Pricing, Surface/Signal listings, locked lines, journey order, Thursday, 24h, Privacy processors — all verified clean against master doc. All banned-string greps returned zero hits.
- Angle 2 (Craft & Creative): All 11 CSS tokens at correct hex values. Fonts declared as Bricolage Grotesque + Satoshi + JetBrains Mono. Surface/Signal sections well-structured with zero pricing. No banned phrases or em-dashes found.
- Angle 3 (Function & Release): Build exits 0. All 11 routes wired. Contact mailto fallback and Topmate CTA confirmed. Substack newsletter link confirmed. Checklist PDF exists (75KB). vercel.json SPA rewrite confirmed. robots.txt disallows /work-policy. sitemap.xml lists 12 routes. Live verification passed on storygrid.co.

**Live confirmation:**
- Homepage, /services, /privacy return 200
- robots.txt and sitemap.xml serve real files (not JS bundle)
- title: "StoryGrid & Co. — Build the story that builds your pipeline" ✓
- og:image: https://storygrid.co/og-image.png ✓
- twitter:description: "AI-first narrative strategy firm. The layer between a founder's vision and their market's perception." ✓

---

## Environment Findings

| Item | Status | Notes |
|---|---|---|
| Git repo | Initialized + pushed | Remote: `https://github.com/aneeshthakral/storygrid-webapp.git`. Branch `site-update-2026` pushed. |
| Branch | `site-update-2026` | Commit history: planning → Stage A → Stage B → Stage C → Stage D |
| Vercel auth | Authenticated | Account: `aneeshthakralwork-8353` |
| Vercel project name | `storygrid-webapp` | Serves `https://www.storygrid.co` |
| OG image download | Success | 510KB downloaded to public/og-image.png |
| Checklist MD | Not found | PDF built from Appendix A of master doc (10 ICP Validation Questions) |

### Vercel Project

```
Vercel project name: storygrid-webapp
Verified serves: www.storygrid.co
Deployment ID: dpl_5Uk7H66S6NEuJsLUtgZj5wWjrGyY
```

---

## Stage Checklist

### Stage A — Foundation
- [x] CSS tokens updated (--blaze = #E8451A, 11 new tokens)
- [x] Fonts swapped (Bricolage Grotesque display, Satoshi body)
- [x] twitter:description fixed
- [x] OG image downloaded to public/og-image.png (510KB, success)
- [x] og:image and twitter:image pointing to https://storygrid.co/og-image.png
- [x] INR prices corrected in pricing.ts (all end in 950)
- [x] EUR added to pricing.ts and useCurrency.ts
- [x] ServicesPage toggle order INR / USD / EUR
- [x] Journey text: Audit > Sprint > Starter > Engine > System
- [x] vercel.json created
- [x] robots.txt created
- [x] sitemap.xml created (12 routes)
- [x] founder.png deleted
- [x] vite build exits 0
- [x] Stage A committed (44a258e)

---

### Stage B — Content
- [x] Surface arm section added to ServicesPage (4 offerings, no prices)
- [x] Signal arm section added to ServicesPage (4 offerings, no prices)
- [x] Contact dropdown: Surface and Signal options added
- [x] Contact form placeholders: professional values
- [x] StoryPage: day-job section removed
- [x] ResourcesPage: newsletter form replaced with Substack link
- [x] ResourcesPage: "0 founders" removed
- [x] ResourcesPage: "Thursday" frequency correct
- [x] Footer: commented ToS link removed
- [x] WhereToGoNext: dead routes removed
- [x] vite build exits 0
- [x] Stage B committed (4e7e4ad)

---

### Stage C — Function and Legal
- [x] Web3Forms key constant in ContactPage (REPLACE_WITH_KEY placeholder)
- [x] Mailto fallback logic in ContactPage (fires when key = placeholder or POST fails)
- [x] Topmate secondary CTA on ContactPage
- [x] Response time = "24 hours" in both locations on ContactPage
- [x] Download button wired to /narrative-audit-checklist.pdf
- [x] public/narrative-audit-checklist.pdf exists (75KB, valid PDF, branded)
- [x] PrivacyPage: all 8 [TO CONFIRM] replaced
- [x] PrivacyPage: effective date set (6 July 2026)
- [x] PrivacyPage: Web3Forms and Substack named as processors
- [x] PrivacyPage: no analytics statement present
- [x] vite build exits 0
- [x] Stage C committed (2f8493a)

---

### Stage D — QA and Deploy
- [x] `vercel login` completed (aneeshthakralwork-8353)
- [x] `vercel projects ls` run — Vercel project name: storygrid-webapp
- [x] `npm run build` exits 0
- [x] `npm run lint` — pre-existing prettier formatting errors only, none introduced by patch
- [x] Grep audit: no old INR prices (79950, 1,99,950, etc.)
- [x] Grep audit: no Google Fonts URL with Sora/Inter
- [x] Grep audit: no font-family declarations with Sora/Inter
- [x] Grep audit: no [TO CONFIRM]
- [x] Grep audit: no "Every Friday"
- [x] Grep audit: no "Iron Man"/"Avengers"
- [x] Grep audit: no r2.dev
- [x] Grep audit: no "Dynamic Canvas"
- [x] public/narrative-audit-checklist.pdf exists (75KB)
- [x] vercel.json has SPA rewrite
- [x] Currency toggle verified in `npm run preview`
- [x] `vercel link` completed to storygrid-webapp
- [x] `vercel deploy --prod` completed (dpl_5Uk7H66S6NEuJsLUtgZj5wWjrGyY)
- [x] Live: www.storygrid.co loads (200)
- [x] Live: www.storygrid.co/approach loads directly (200, SPA rewrite working)
- [x] Live: sitemap.xml returns real XML
- [x] Live: robots.txt returns real text
- [x] Live: narrative-audit-checklist.pdf downloads (application/pdf, 75KB)
- [x] Live: twitter:description = "AI-first narrative strategy firm..."
- [x] Live: og:image = https://storygrid.co/og-image.png
- [x] Stage D committed

---

## Rollback

Previous deployment restores in one click: Vercel Dashboard → storygrid-webapp → Deployments → select previous → Promote to Production.

---

## One Pending Owner Action

**Get a Web3Forms access key and activate the contact form:**

1. Go to web3forms.com — free plan, no credit card needed
2. Register with hello@storygrid.co
3. Copy the access key from your dashboard
4. In `src/pages/ContactPage.tsx` line 6, replace:
   ```ts
   const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_KEY";
   ```
   with your actual key.
5. Run `vercel deploy --prod` from the repo root.

Until then, the form works via the mailto fallback — every submission opens the user's email client pre-filled with all form data addressed to hello@storygrid.co. No submission is ever silently discarded.

---

## Deferred Items

| Item | Reason |
|---|---|
| Showreel (audit item 11) | Owner's explicit call. Untouched. |
| recharts removal (audit item 18) | Not in locked decisions. Not in scope. |
| Unused shadcn deps (audit item 19) | Not in locked decisions. Not in scope. |
| motion usage (audit item 20) | Not in locked decisions. Not in scope. |

---

## Unplanned Fixes

| Fix | Reason |
|---|---|
| CSS comment updated (Sora/Inter → Bricolage Grotesque/Satoshi) | Stage D grep detected old font names in comment; updated to prevent confusion |

---

## Key File Locations

| File | Purpose |
|---|---|
| `src/styles.css` | All tokens, fonts, CSS vars |
| `src/data/pricing.ts` | All prices (INR, USD, EUR) |
| `src/hooks/useCurrency.ts` | Currency toggle logic |
| `src/pages/ServicesPage.tsx` | Main services + Surface/Signal sections |
| `src/pages/TierDetailPage.tsx` | Per-tier detail pages |
| `src/pages/ContactPage.tsx` | Contact form + Web3Forms + mailto fallback |
| `src/pages/ResourcesPage.tsx` | Newsletter (Substack) + download |
| `src/pages/PrivacyPage.tsx` | Privacy policy (all placeholders replaced) |
| `src/pages/StoryPage.tsx` | Founder story (day-job section removed) |
| `src/components/Footer.tsx` | Footer (ToS comment removed) |
| `src/components/PageLayout.tsx` | WhereToGoNext (dead routes removed) |
| `index.html` | Meta tags, font links, OG image |
| `vercel.json` | SPA rewrite rule |
| `public/robots.txt` | Crawl rules |
| `public/sitemap.xml` | 12 routes |
| `public/narrative-audit-checklist.pdf` | Lead magnet PDF (75KB) |
| `public/og-image.png` | Social preview image (510KB) |
| `scripts/checklist-source.html` | Source HTML for PDF regeneration |
