# StoryGrid & Co. — Site Update 2026 Execution Plan

**Branch:** `site-update-2026`  
**Source of truth:** `StoryGrid_Co_Master_2026.md`  
**Audit map:** `STORYGRID_WEBSITE_AUDIT_2026.md`  
**Planning locked:** 2026-07-06  
**Mode:** Surgical patch of existing Vite + React SPA. No Next.js rebuild, no redesign.

---

## Audit Item → Stage Map

| # | Issue | Stage |
|---|---|---|
| 1 | Privacy [TO CONFIRM] placeholders (8) | C |
| 2 | Contact form silently discards data | C |
| 3 | Newsletter form is a UI facade | C |
| 4 | Download form is a UI facade | C |
| 5 | twitter:description is Lovable leftover | A |
| 6 | Response time inconsistency (48h vs 24h) | C |
| 7 | EUR currency toggle absent | A |
| 8 | INR prices don't match master doc | A |
| 9 | Subscriber count hardcoded 0 | B |
| 10 | Newsletter frequency wrong (Friday → Thursday) | B |
| 11 | Showreel placeholder | **DEFERRED — owner's explicit call** |
| 12 | Blog placeholder | B (note only — stays as coming soon) |
| 13 | Surface and Signal arms absent | B |
| 14 | OG image on Lovable R2 CDN | A |
| 15 | WhereToGoNext dead route links | B |
| 16 | founder.png unused duplicate | A |
| 17 | Footer commented-out ToS link | B |
| 18 | recharts unused | Not in scope (not in locked decisions) |
| 19 | Unused shadcn deps | Not in scope (not in locked decisions) |
| 20 | motion usage unclear | Not in scope (not in locked decisions) |
| 21 | No sitemap.xml | A |
| 22 | No robots.txt | A |
| 23 | No vercel.json | A |

---

## Stage A — Foundation

**Scope:** Design tokens, fonts, meta, OG image, infrastructure files, pricing data, EUR toggle, journey fix, founder.png deletion.

### Files and changes

#### `src/styles.css`

1. **--blaze token fix:** Change `--blaze: #c43d1a` to `--blaze: #E8451A` (true primary Blaze per master doc). The old value (#C43D1A) is Blaze Muted.
2. **Add new tokens** inside the existing `@theme inline` block:
   ```css
   --blaze-muted: #C43D1A;
   --deep-base: #080507;
   --card-surface: #141012;
   --elevated: #1E181C;
   --section-break: #F0E8E2;
   --ai-teal: #2DD881;
   --ai-teal-muted: #1A6B45;
   --founder-gold: #D4912A;
   --cool-smoke: #4A6080;
   --smoke-muted: #2A3848;
   ```
   Do not disturb existing oklch semantic tokens or the scroll-driven `--site-light-progress` / `color-mix` light-zone system.
3. **--font-display:** Change from `'Sora', sans-serif` to `'Bricolage Grotesque', system-ui, sans-serif`
4. **--font-sans:** Change from `'Inter', sans-serif` to `'Satoshi', system-ui, sans-serif`
   (JetBrains Mono / --font-mono: unchanged)

**Note on color safety:** verify no `#000000` or `#FFFFFF` appears in any modified block after editing.

#### `index.html`

1. **Fonts — replace the Google Fonts link** (Sora + Inter → Bricolage Grotesque + JetBrains Mono stays on Google, add Fontshare for Satoshi):
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link rel="preconnect" href="https://api.fontshare.com" />
   <link
     href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
     rel="stylesheet"
   />
   <link
     href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
     rel="stylesheet"
   />
   ```
   **CDN failure resilience:** both font links load async at runtime. The build succeeds regardless. The system-ui fallback in --font-display and --font-sans ensures text is visible if CDN is unreachable.

2. **twitter:description:** Replace Lovable leftover with the actual meta description:
   ```html
   content="AI-first narrative strategy firm. The layer between a founder's vision and their market's perception."
   ```

3. **OG image — download to local:** Run:
   ```bash
   curl -L "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/80248fd6-a5fb-4749-b9c5-a84b725c1a25/id-preview-ccfc6fa9--bb749efb-f8e2-4723-a584-40c40ef39de3.lovable.app-1779120850940.png" \
     -o public/og-image.png
   ```
   **Failure fallback:** if curl fails or file is ≤ 1KB (broken), note in HANDOFF.md and leave og:image pointing to the R2 URL temporarily. Do not halt Stage A.

4. **og:image and twitter:image:** Update both to `https://storygrid.co/og-image.png`

#### `src/data/pricing.ts`

Fix INR prices and add EUR currency object. All INR values end in 950. EUR values hardcoded (no live conversion).

**Corrected values (INR):**
- Narrative Starter: ₹78,950/mo (was ₹79,950)
- Narrative Engine: ₹1,98,950/mo (was ₹1,99,950)
- Narrative System: ₹3,98,950/mo (was ₹3,99,950)
- Narrative Audit: ₹38,950 (was ₹39,950)
- Narrative Sprint: ₹1,64,950 (stays correct)
- Team Narrative Workshop: ₹1,98,950 (was ₹1,99,950)

**New EUR values (hardcoded):**
- Narrative Audit: €469
- Narrative Sprint: €1,899
- Team Narrative Workshop: €2,399
- Narrative Starter: €949/mo
- Narrative Engine: €2,399/mo
- Narrative System: €4,799/mo
- Narrative Command: Custom

#### `src/hooks/useCurrency.ts`

Add EUR as third currency. Toggle cycle: INR (default) → USD → EUR → INR. Update type definitions and return values to include EUR formatting (€X,XXX format, European number style).

#### `src/pages/ServicesPage.tsx`

1. **Currency toggle UI:** Add EUR pill. Toggle order pill display: INR | USD | EUR. INR is default selected state.
2. **EUR prices displayed:** formatted with € symbol, e.g., €78,950 is wrong — EUR prices are smaller: €949, €2,399, etc. Display without Indian-style grouping; use standard Western grouping (€1,899 not €1,899).
3. **Client journey text:** Change `Audit → Sprint → Architecture → Engine → System` to `Audit > Sprint > Starter > Engine > System` (remove "Architecture", insert "Starter").
4. **Display all INR prices:** use updated values from pricing.ts.

#### `src/pages/TierDetailPage.tsx`

Add EUR to currency toggle (same pill pattern, same toggle order).

#### `vercel.json` (new file, repo root)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### `public/robots.txt` (new file)

```
User-agent: *
Allow: /
Disallow: /work-policy

Sitemap: https://storygrid.co/sitemap.xml
```

#### `public/sitemap.xml` (new file)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://storygrid.co/</loc></url>
  <url><loc>https://storygrid.co/approach</loc></url>
  <url><loc>https://storygrid.co/services</loc></url>
  <url><loc>https://storygrid.co/services/starter</loc></url>
  <url><loc>https://storygrid.co/services/engine</loc></url>
  <url><loc>https://storygrid.co/services/system</loc></url>
  <url><loc>https://storygrid.co/services/command</loc></url>
  <url><loc>https://storygrid.co/story</loc></url>
  <url><loc>https://storygrid.co/for-teams</loc></url>
  <url><loc>https://storygrid.co/resources</loc></url>
  <url><loc>https://storygrid.co/contact</loc></url>
  <url><loc>https://storygrid.co/privacy</loc></url>
</urlset>
```

Routes excluded: /work-policy (noindex), /signal, /surface (not separate routes — sections on /services).

#### `public/images/founder.png` — DELETE

Unused duplicate of founder.jpg. No component references it.

### Completion criteria — Stage A

- [ ] `vite build` exits 0
- [ ] `--blaze: #E8451A` in styles.css (grep confirms)
- [ ] All 11 new tokens present in styles.css
- [ ] `--font-display` references Bricolage Grotesque
- [ ] `--font-sans` references Satoshi
- [ ] `twitter:description` matches meta description (no "Dynamic Canvas" text)
- [ ] `og:image` and `twitter:image` = `https://storygrid.co/og-image.png`
- [ ] public/og-image.png exists and is > 1KB (or failure noted in HANDOFF.md)
- [ ] All INR prices end in 950 in pricing.ts (grep: `950`)
- [ ] EUR prices present in pricing.ts
- [ ] useCurrency.ts exports EUR handling
- [ ] ServicesPage toggle order: INR / USD / EUR
- [ ] Journey text: "Audit > Sprint > Starter > Engine > System"
- [ ] vercel.json exists with SPA rewrite
- [ ] public/robots.txt exists
- [ ] public/sitemap.xml exists with all 12 routes
- [ ] public/images/founder.png deleted
- [ ] No `#000000` or `#FFFFFF` in modified files (grep confirms)
- [ ] Light-zone oklch system untouched (grep: `--site-light-progress` still present)

### Commit message — Stage A

```
feat: foundation — tokens, fonts, meta, pricing, EUR, infra

- Correct --blaze to #E8451A; rename old value to --blaze-muted
- Add 10 new brand tokens (deep-base, card-surface, elevated,
  section-break, ai-teal, ai-teal-muted, founder-gold,
  cool-smoke, smoke-muted, blaze-muted)
- Switch fonts: Bricolage Grotesque (display), Satoshi (body)
- Fix twitter:description (Lovable leftover removed)
- Download OG image to public/og-image.png, point meta tags local
- Fix INR prices to master doc values (all end in 950)
- Add EUR currency (hardcoded, 3-currency toggle INR/USD/EUR)
- Fix client journey text (Audit > Sprint > Starter > Engine > System)
- Add vercel.json SPA rewrite, robots.txt, sitemap.xml
- Delete unused public/images/founder.png

Update HANDOFF.md: Stage A complete.
```

---

## Stage B — Content

**Scope:** Surface and Signal sections on /services, three-arm page structure, nav/footer cleanup, contact dropdown, story page line removal, newsletter display fixes.

### Files and changes

#### `src/pages/ServicesPage.tsx`

Add two new sections below the existing Story section (retainers + one-time engagements):

**Section: SURFACE — Build & AI Automation**

- Section header: "Surface" with eyebrow "Build Arm"
- Locked line: "Story is the core. Surface and Signal make it land."
- Intro copy from master doc: narrative-led full stack framing. Surface is "the surfaces the story lives on, plus the systems that power them." Resourced capability the narrative leads into.
- Four offerings listed (no prices, scope-and-value language):
  1. The Narrative Site
  2. The Narrative App
  3. The Narrative Platform
  4. AI Automation & Integrations
- Scope language: "Scope-and-value engagement. Every project scoped and documented before work begins." No man-hours language. No published figures.
- CTA: "Book a discovery call" → /contact

**Section: SIGNAL — AEO, Search & Paid Media**

- Section header: "Signal" with eyebrow "Digital Marketing Arm"
- Intro copy from master doc: "The distribution that carries the story to market and brings demand back." Currently rolling out.
- Four offerings listed (no prices, per-scope discovery):
  1. Answer-Engine Optimization (AEO)
  2. Search Optimization
  3. Digital Media Services
  4. Meta & Paid Social
- Scope language: "Priced per scope on discovery. Sequenced after the narrative and the surfaces are in place."
- CTA: "Book a discovery call" → /contact

**Voice law for all new copy:** wording pulled or adapted from master doc (§4.1.3 and §4.1.4). Zero em dashes, zero semicolons, active voice, no banned phrases from §6.3. Brand name exactly "StoryGrid & Co." Locked taglines verbatim where used.

#### `src/pages/ContactPage.tsx`

**Service dropdown:** Add two new options:
- "Surface (Build & AI Automation)"
- "Signal (AEO, Search & Paid Media)"

**Form placeholder values (neutral professional):**
- Name: "Alex Morgan"
- Company: "Meridian Technologies"
- Email: "alex@meridiantech.co"
- (Message: no change or "Tell us about your project")

#### `src/pages/StoryPage.tsx`

Remove the single line that reads (approximately): "Associate Director International Sales at a manufacturing company" — the day-job disclosure. Remove only that line. Do not touch any other content on the page.

#### `src/pages/ResourcesPage.tsx`

**Newsletter section:**
- Remove the fake email input form entirely.
- Remove "Join 0 founders who read this." line.
- Change "Every Friday" to "Every Thursday."
- Replace with a styled link button: "Read The AI Salesman on Substack" → `https://substack.com/@aneeshthakral` (opens in new tab, rel="noopener noreferrer"). No embed.

**Download section:** Leave form UI in place for now — functional download logic is handled in Stage C. Just ensure the download button exists and has a clear target (href will be wired in Stage C).

#### `src/components/Footer.tsx`

Remove the commented-out Terms of Service link (lines ~82–84 per audit). Clean removal — no ToS page exists.

#### `src/components/PageLayout.tsx`

In `WhereToGoNext` component: remove the dead route links (`/packages`, `/company`, `/portfolio`, `/case-studies`). Component is not currently rendered anywhere, but these dead routes would 404 if the component is ever surfaced.

#### Navigation check

Review `src/data/navigation.ts` and `src/components/Navbar.tsx`. No new routes needed (Surface and Signal are sections on /services, not separate routes). Confirm /services link exists. No nav structural changes required unless something is broken per audit.

### Completion criteria — Stage B

- [ ] ServicesPage has Surface section with 4 offerings, no prices, scope-and-value language
- [ ] ServicesPage has Signal section with 4 offerings, no prices, discovery language
- [ ] No Surface or Signal pricing figures anywhere on page
- [ ] "Surface (Build & AI Automation)" in contact dropdown
- [ ] "Signal (AEO, Search & Paid Media)" in contact dropdown
- [ ] Contact form placeholders: professional values (no "Iron Man", "Avengers")
- [ ] StoryPage: "Associate Director International Sales at a manufacturing company" line removed
- [ ] ResourcesPage: no fake newsletter form
- [ ] ResourcesPage: no "0 founders" text
- [ ] ResourcesPage: "Thursday" (not "Friday")
- [ ] ResourcesPage: Substack link present
- [ ] Footer: commented ToS link removed
- [ ] WhereToGoNext: dead routes removed
- [ ] All new copy: zero em dashes, zero semicolons, active voice
- [ ] Locked taglines verbatim where used
- [ ] `vite build` exits 0

### Commit message — Stage B

```
feat: content — Surface/Signal sections, nav cleanup, story fix

- Add Surface arm section to /services (4 offerings, no prices)
- Add Signal arm section to /services (4 offerings, no prices)
- Add Surface and Signal options to contact form dropdown
- Fix contact form placeholder values (professional)
- Remove day-job line from StoryPage
- Replace newsletter form with Substack link on /resources
- Remove hardcoded "0 founders" and "Every Friday" text
- Remove commented ToS link from Footer
- Remove dead routes from WhereToGoNext component

Update HANDOFF.md: Stage B complete.
```

---

## Stage C — Function and Legal

**Scope:** Contact form Web3Forms integration with mailto fallback, checklist PDF, privacy policy rewrite, response time unification.

### Files and changes

#### `src/pages/ContactPage.tsx`

**Web3Forms integration:**

```typescript
const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_KEY";
```

On form submit:
1. If key equals `"REPLACE_WITH_KEY"` → fall through to mailto fallback.
2. Otherwise → POST to `https://api.web3forms.com/submit` with form data + access_key.
3. **Mailto fallback** (triggered when key is placeholder OR Web3Forms POST fails):
   ```
   mailto:hello@storygrid.co
     ?subject=Inquiry from [name] at [company]
     &body=Name: [name]%0ACompany: [company]%0AEmail: [email]%0AService: [service]%0AMessage: [message]
   ```
   Open via `window.location.href = mailtoUrl`. No submission is ever silently discarded.
4. On success (either path): show confirmation UI. Keep Topmate button as secondary ("or book a call directly" → `https://topmate.io/aneeshthakral`).
5. **Response time:** Update page intro to "We respond within 24 hours." Update sidebar to "Within 24 hours." Both must match.

#### `src/pages/ResourcesPage.tsx`

**Download section:**
- Wire the download button to `/narrative-audit-checklist.pdf` (href, download attribute).
- Replace fake `onSubmit` handler with a simple anchor click or `window.open('/narrative-audit-checklist.pdf')`.
- No email required for download (the existing gate form is a facade with no backend — per locked decisions, the file is served directly).
- Show "Download" button as a real `<a>` tag with `href="/narrative-audit-checklist.pdf"` and `download`.

**Newsletter section:** Confirm Substack button from Stage B is functional (opens new tab correctly).

#### `public/narrative-audit-checklist.pdf` (new file)

**Source:** No checklist MD was found in the projects directory. Build from Appendix A of the master doc — the 10 ICP Validation Questions that are diagnostic for "is your story costing you deals."

**The 10 questions:**
1. What does your company do, in one sentence, without jargon?
2. If your best customer described you to a friend, what would they say?
3. What makes you different from the next three competitors?
4. When did you last post on LinkedIn? What happened?
5. Have you ever lost a deal, a hire, or an investor because of low visibility?
6. What is your biggest frustration with how you show up online?
7. Have you worked with a ghostwriter, agency, or content person before? What went wrong?
8. What does good content look like to you? Share an example you admire.
9. If we start next week, who else needs to say yes?
10. What would make this investment obviously worth it in 90 days?

**PDF build approach (primary):** Node script `scripts/generate-checklist-pdf.js` using Puppeteer to render a branded HTML template to PDF.

Design: Deep Base (#080507) background, JetBrains Mono for labels/numbers, Bricolage Grotesque for heading "The Narrative Audit Checklist", Satoshi for question text. StoryGrid & Co. + storygrid.co footer. One Blaze (#E8451A) accent on the title rule.

**Fallback:** If Puppeteer is unavailable, create `scripts/checklist.html` with the same branded design and generate PDF via browser print (Cmd+P → Save as PDF, landscape off, background graphics on). Output saves to `public/narrative-audit-checklist.pdf`.

#### `src/pages/PrivacyPage.tsx`

Replace all 8 `[TO CONFIRM]` placeholders. Effective date = date of production deployment (Stage D). Write it as the actual calendar date, e.g., "6 July 2026."

| Placeholder | Replacement |
|---|---|
| Analytics tool name / cookie type | "No analytics tool currently runs on this site. No tracking cookies are set." |
| Contact form provider | "Web3Forms (form submission processing), operated in the United States. See web3forms.com/privacy." |
| Email/newsletter provider | "Substack (newsletter), operated in the United States. See substack.com/privacy." |
| Contact form retention | "Contact form submissions are retained for up to 12 months." |
| Newsletter subscriber retention | "Newsletter subscriber data is managed by Substack per their retention policy." |
| Analytics data retention | "No analytics data is collected." |
| Physical address | "Registered address available on request. Contact: hello@storygrid.co" |
| Effective date | "6 July 2026" (update to actual deployment date at Stage D) |

All replacement copy must be plain declarative statements. Zero em dashes, zero semicolons, active voice. No banned phrases.

### Completion criteria — Stage C

- [ ] Web3Forms key constant present in ContactPage
- [ ] Mailto fallback logic present: key === "REPLACE_WITH_KEY" triggers mailto
- [ ] Topmate button present as secondary CTA
- [ ] Response time = "24 hours" in both locations on ContactPage
- [ ] Download button wired to `/narrative-audit-checklist.pdf`
- [ ] `public/narrative-audit-checklist.pdf` exists and is a valid PDF (> 5KB)
- [ ] No `[TO CONFIRM]` text remains in PrivacyPage (grep confirms zero matches)
- [ ] Privacy effective date is set
- [ ] Privacy names Web3Forms and Substack as processors
- [ ] Privacy states no analytics tool currently runs
- [ ] Privacy address = "Registered address available on request" + hello@storygrid.co
- [ ] `vite build` exits 0

### Commit message — Stage C

```
feat: function and legal — form, PDF, privacy

- Wire contact form to Web3Forms with mailto fallback
- Add Topmate as secondary CTA on contact page
- Unify response time to 24 hours throughout
- Wire download button to /narrative-audit-checklist.pdf
- Generate branded narrative audit checklist PDF (10 questions)
- Rewrite PrivacyPage: replace all 8 [TO CONFIRM] placeholders
  - No analytics, Web3Forms + Substack as processors
  - Effective date, address, retention periods set

Update HANDOFF.md: Stage C complete.
```

---

## Stage D — QA and Deploy

**Scope:** Build verification, grep-based audits, Vercel link and production deploy, live smoke test.

### Prerequisites — BLOCKING

1. **`vercel login`** — Must be completed before any deploy step. If not authenticated, this stage cannot proceed. The owner must run `vercel login` in the terminal and complete the browser OAuth flow.
2. **`vercel projects ls`** — Identify the project serving storygrid.co. Record its name in HANDOFF.md.
3. **`vercel link`** — Link the codebase to the identified Vercel project. Answer prompts: existing project, select storygrid.co project.

### Verification steps

**Build:**
```bash
npm run build
```
Must exit 0 with no TypeScript errors.

**Lint:**
```bash
npm run lint
```
Fix any errors introduced by the patch. Warnings are acceptable.

**Grep audits (all must pass):**
```bash
# No pure black or pure white
grep -r "#000000\|#FFFFFF" src/ && echo "FAIL: found pure black/white" || echo "PASS"

# No TO CONFIRM placeholders
grep -r "\[TO CONFIRM\]" src/ && echo "FAIL: placeholder found" || echo "PASS"

# twitter:description matches real description (no "Dynamic Canvas")
grep "Dynamic Canvas" index.html && echo "FAIL" || echo "PASS"

# INR prices end in 950
grep -E "78[,.]?950|198[,.]?950|398[,.]?950|38[,.]?950|164[,.]?950" src/data/pricing.ts | wc -l
# Should show at least 6 matches

# EUR present
grep "EUR\|€" src/data/pricing.ts | wc -l
# Should show matches

# No "0 founders" text
grep "0 founders" src/ -r && echo "FAIL" || echo "PASS"

# No "Every Friday" newsletter text
grep -i "every friday" src/ -r && echo "FAIL" || echo "PASS"

# No "48 hours" response time
grep "48 hours\|48-hour" src/pages/ContactPage.tsx && echo "FAIL: 48h still present" || echo "PASS"

# Day-job line removed from StoryPage
grep -i "associate director international sales" src/pages/StoryPage.tsx && echo "FAIL" || echo "PASS"

# Checklist PDF exists
ls -lh public/narrative-audit-checklist.pdf

# vercel.json SPA rewrite present
grep "index.html" vercel.json && echo "PASS" || echo "FAIL"

# Blaze token corrected
grep "blaze.*#E8451A\|#E8451A" src/styles.css && echo "PASS" || echo "FAIL"
```

**Route checks:**
- Confirm sitemap.xml has 12 entries and no legacy routes
- Confirm robots.txt Disallow: /work-policy is present
- Confirm no `/signal` or `/surface` routes in App.tsx (they are sections, not routes)

**Currency check:**
- Load /services in browser preview (`npm run preview`). Confirm INR default, toggle to USD, toggle to EUR. Confirm EUR prices display (€949, €2,399, etc.).

**Privacy check:**
- Load /privacy. Confirm zero [TO CONFIRM] visible. Confirm effective date, address, processor names.

### Deploy

```bash
vercel link        # link to storygrid.co project
vercel deploy --prod
```

### Live verification (post-deploy)

- `storygrid.co` loads. Navbar renders.
- `storygrid.co/approach` loads directly (SPA rewrite working).
- `storygrid.co/services` shows all three arms (Story + Surface + Signal).
- Currency toggle cycles INR → USD → EUR.
- `storygrid.co/story` does not contain day-job line.
- `storygrid.co/contact` form has Surface and Signal dropdown options.
- `storygrid.co/resources` shows Substack link, no fake form, no "0 founders."
- `storygrid.co/privacy` shows no [TO CONFIRM] text.
- `storygrid.co/sitemap.xml` returns XML (not JS bundle).
- `storygrid.co/robots.txt` returns text (not JS bundle).
- `storygrid.co/narrative-audit-checklist.pdf` downloads a PDF.
- OG/Twitter card: check via a card validator — image, title, description all correct.

### Completion criteria — Stage D

- [ ] `npm run build` exits 0
- [ ] All grep audits pass
- [ ] Currency toggle verified in preview
- [ ] vercel link completed, project identified
- [ ] `vercel deploy --prod` completes without error
- [ ] All 12 live verification checks pass
- [ ] HANDOFF.md Stage D checked off

### Commit message — Stage D

```
chore: QA verified, deploy complete

All grep audits pass. Build clean. Live site verified:
three-arm services page, EUR toggle, corrected privacy policy,
functional contact form fallback, PDF download, SPA routing.

Update HANDOFF.md: Stage D complete. Deploy live.
```

---

## Three-Angle Self-Critique Log

### Angle 1 — Dependency Auditor

**Question:** Does any stage force rework of an earlier stage?

**Finding 1:** Stage C privacy names Web3Forms (Stage C installs it) and Substack (Stage B adds the Substack link). Stage C names only what Stage C itself puts in place. Stage B Substack URL is in place before Stage C runs. No rework required.

**Finding 2:** Sitemap (Stage A) routes checked against final architecture. Surface and Signal are sections on /services, not separate routes. Sitemap correctly omits /signal and /surface. Verified routes in sitemap match all routes defined in App.tsx per the audit.

**Finding 3:** EUR toggle (Stage A) is referenced by Surface/Signal sections (Stage B), but Surface/Signal show no pricing and thus do not use the EUR toggle directly. The toggle is visible on the STORY section only. No cross-stage dependency conflict.

**Changes from Angle 1:** None required. Plan sequencing is clean.

---

### Angle 2 — Brand Compliance Officer

**Hex values verified against master doc (Part 3, §3.2):**
- --blaze: #E8451A ✓
- --blaze-muted: #C43D1A ✓
- --deep-base: #080507 ✓
- --card-surface: #141012 ✓
- --elevated: #1E181C ✓
- --section-break: #F0E8E2 ✓
- --ai-teal: #2DD881 ✓ (NOT the stale #200881 — confirmed against Brand System v2.1 correction log §6.8.2)
- --ai-teal-muted: #1A6B45 ✓
- --founder-gold: #D4912A ✓
- --cool-smoke: #4A6080 ✓
- --smoke-muted: #2A3848 ✓

**INR prices verified (all end in 950):**
- Starter 78,950 ✓, Engine 1,98,950 ✓, System 3,98,950 ✓
- Audit 38,950 ✓, Sprint 1,64,950 ✓, Workshop 1,98,950 ✓

**EUR prices verified:**
- Audit €469 ✓, Sprint €1,899 ✓, Workshop €2,399 ✓
- Starter €949 ✓, Engine €2,399 ✓, System €4,799 ✓, Command: Custom ✓

**Toggle order: INR / USD / EUR, INR default ✓**

**Fonts:**
- Bricolage Grotesque — Google Fonts, weights 400/600/700/800 ✓
- Satoshi — Fontshare CDN URL specified exactly ✓
- JetBrains Mono — unchanged ✓

**Client journey: Audit > Sprint > Starter > Engine > System ✓**

**Newsletter: Thursday ✓, Substack URL https://substack.com/@aneeshthakral ✓**

**Surface/Signal copy rule:** new copy must be pulled or adapted from master doc §4.1.3 and §4.1.4, never invented. Sections show zero pricing figures. ✓

**Locked messaging asserted in plan:**
- "Story is the core. Surface and Signal make it land." ✓
- Surface described as "capabilities the narrative leads into" (not co-equal) ✓
- No man-hours language in Surface/Signal sections ✓

**Changes from Angle 2:** None required. All values verified.

---

### Angle 3 — Failure-Mode Hunter

**Risk 1: Vercel not authenticated**
- Detected during environment verification. BLOCKING only for Stage D.
- Stages A, B, C can proceed without Vercel auth.
- Stage D prerequisites make this the first step, explicitly labeled BLOCKING.
- **Change applied:** Stage D prerequisites section added with explicit BLOCKING label.

**Risk 2: Font CDN unavailable at deploy time**
- Fontshare and Google Fonts load at runtime, not at build time. Build is CDN-independent.
- `system-ui, sans-serif` fallbacks in --font-display and --font-sans ensure body text renders.
- **Change applied:** System font fallbacks added to Stage A CSS changes. CDN resilience note added.

**Risk 3: OG image download fails**
- Lovable R2 URL may no longer be accessible.
- Fallback: note in HANDOFF.md and continue. Do not halt Stage A.
- **Change applied:** OG image section in Stage A includes explicit failure fallback.

**Risk 4: PDF generation (puppeteer)**
- Puppeteer requires a Chromium download. May fail in restricted environments.
- Fallback: browser print from branded HTML file.
- **Change applied:** PDF fallback approach documented in Stage C.

**Risk 5: --blaze color change breaks existing UI**
- --blaze changes from #C43D1A to #E8451A. All existing usages of `--blaze` / `var(--blaze)` in styles.css and components pick up the new value.
- This is intentional — #E8451A is the true primary Blaze (CTAs). The old value was Blaze Muted (misnamed in the repo).
- Visual impact: CTAs and primary accents become slightly brighter orange-red. This is brand-correct.
- Stage D live verification checks all CTA rendering.
- **No additional mitigation needed.** Change is intentional and correct.

**Risk 6: HANDOFF.md checkpoint gaps**
- Without a checkpoint update after each stage, a session interruption loses progress context.
- **Change applied:** Each stage commit message includes "Update HANDOFF.md: Stage X complete." HANDOFF.md tracks unchecked stages.

**Changes applied from Angle 3:**
1. Stage D prerequisites section with BLOCKING label for vercel login
2. Font fallback stacks specified in Stage A
3. OG image failure fallback documented in Stage A
4. PDF generation fallback documented in Stage C
5. HANDOFF.md checkpoint update included in each stage commit

---

*Plan finalized after three-angle critique. All 22 active audit items mapped. Item 11 (showreel) deferred by owner.*
