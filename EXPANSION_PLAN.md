# StoryGrid & Co. — Service Expansion Plan (AI Automation + Digital Marketing)

**Status:** Planning phase complete. Zero source edits made. This document is the sole deliverable.
**Prior context read:** `HANDOFF.md`, `PLAN.md` (July 2026 site update, all stages complete, live at storygrid.co). Neither file is modified by this plan.
**Mode:** Surgical addition to the existing Vite + React SPA. No framework migration, no redesign.

---

## 1. Executive Summary

StoryGrid & Co. currently sells one public service line: Narrative (Audit, Sprint, Starter, Engine, System, Command, Team Workshop), all priced and listed on `/services`. Two more arms already exist in the codebase in embryonic form: **Surface** (build + AI automation) and **Signal** (AEO, search, paid media) — both live today only as unpriced, no-CTA-differentiated sections bolted onto the bottom of `/services`, added in the July 2026 update (`PLAN.md` Stage B) as a first mention, not a full offering.

This expansion promotes those two arms into two full public service categories — **AI Automation** and **Digital Marketing** — each with its own top-level URL, its own page (hero, positioning, offerings, how-it-works, FAQ), its own JSON-LD, and its own branch in a rebuilt category-aware contact questionnaire. Narrative Building keeps its existing name, prices, URLs, and currency toggle completely untouched. Neither new arm ever shows a price; both route to the same "Talk to Us" discovery-call flow with no published rate.

The single most important repo finding (Section 2) is that **`src/App.tsx` — not `src/StoryGridApp.tsx` — is what Vercel actually serves**, despite `src/StoryGridApp.tsx` being the file this brief's architecture note names as canonical. Both currently hold identical route trees. Every route change in this plan must land in **both** files or the expansion will build clean, pass local checks, and still 404 in production.

---

## 2. Repo Audit Findings

### 2.1 Full route map (as of `master`, current)

Declared identically in `src/App.tsx` (production, see 2.3) and `src/StoryGridApp.tsx` (dormant, see 2.3):

| Path | Element | Notes |
|---|---|---|
| `/` | `HomePage` | |
| `/approach` | `ApproachPage` | |
| `/services` | `ServicesPage` | Narrative tiers + Surface/Signal teaser sections (see 2.5) |
| `/services/:tierId` | `TierDetailPage` | `tierId` ∈ `starter, engine, system, command` via `getTierById` |
| `/story` | `StoryPage` | |
| `/for-teams` | `ForTeamsPage` | Team Narrative Workshop |
| `/resources` | `ResourcesPage` | |
| `/contact` | `ContactPage` | |
| `/privacy` | `PrivacyPage` | |
| `/work-policy` | `WorkPolicyPage` | `noindex, nofollow` via `usePageTitle` robots option; excluded from sitemap and disallowed in robots.txt |
| `*` | `NotFoundPage` | |

`sitemap.xml` lists 12 URLs (home + 11 routes, `/services/:tierId` expanded to its 4 concrete slugs, `/work-policy` excluded). `robots.txt` disallows only `/work-policy`.

### 2.2 TanStack Start scaffold is present but inert — do not mistake it for the live app

`src/routes/index.tsx`, `src/routes/$.tsx`, `src/routes/__root.tsx`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, and `src/routeTree.gen.ts` implement a TanStack Start file-based router that lazy-mounts `src/StoryGridApp.tsx` inside `ClientOnlyApp`. This is a leftover from the Lovable project template (`.lovable/project.json` → `"template": "tanstack_start_ts_2026-05-29"`).

**It is not wired into the build.** Confirmed by:
- `vite.config.ts` has no `@tanstack/react-start` plugin — just `react()`, `tailwindcss()`, `tsconfigPaths()`.
- `package.json` scripts are plain Vite: `"dev": "vite"`, `"build": "vite build"`. No `start`/`serve` script invokes `src/server.ts` or `src/start.ts`.
- `index.html` (the actual Vite entry) loads `/src/main.tsx` directly, which imports `./App` (i.e. `src/App.tsx`), not the TanStack router.
- `routeTree.gen.ts` only knows about `/` and `/$` (the TanStack shell routes) — none of the 11 real app routes exist in it, because the real router (`react-router-dom`'s `BrowserRouter`) lives one level deeper, inside whichever of `App.tsx` / `StoryGridApp.tsx` actually gets mounted.

### 2.3 Critical finding: `App.tsx` and `StoryGridApp.tsx` are duplicate files, and only `App.tsx` ships

Both files currently contain byte-for-byte identical route trees (`SectionLightProvider` → `BrowserRouter` → `ScrollToTop` → `Routes`). But:
- `src/main.tsx` → `import App from "./App"` → renders `src/App.tsx`. This is what `vite build` bundles and what `index.html` boots. **This is production.**
- `src/StoryGridApp.tsx` is imported only by `ClientOnlyApp` inside `src/routes/index.tsx` and `src/routes/$.tsx` — both TanStack file-routes that never execute per 2.2. **`StoryGridApp.tsx` is currently unreachable dead code in the shipped app.**

This brief's Hard Constraint #4 states "real routing lives in `src/StoryGridApp.tsx`" and instructs new routes to be added there. That instruction is followed literally in this plan, but because it does not match what Vercel actually serves, **every route added to `StoryGridApp.tsx` in this plan is mirrored line-for-line into `App.tsx`** (Section 5, Section 10). This is not optional — skipping the `App.tsx` mirror means the new pages build successfully, pass `vite build`, and still don't exist on `storygrid.co`. Fixing the underlying duplication (deleting one file, or actually wiring up TanStack Start, or making `App.tsx` re-export `StoryGridApp.tsx`) is a legitimate cleanup but is out of scope for this expansion — flagged as a deferred item in Section 11, following the same "not in locked decisions" pattern `HANDOFF.md` already uses for recharts/unused shadcn deps/motion usage.

### 2.4 Service data model (current)

`src/data/pricing.ts` exports `monthlyRetainers` (starter/engine/system/command), `oneTimeEngagements` (audit/sprint), `teamWorkshop`, plus `Currency`, `PriceMap`, `getTierById`, `formatMonthlyPrice`, `formatMinimumLabel`, `tierDetailPath`. `command` tier already has `prices: null` and copy "Pricing and timeline are defined after a discovery call. No published rate." — **this, not `system` (which is fully priced), is the actual no-price precedent in the codebase.** (This brief's Hard Constraint #7 names "system" as the precedent tier; the repo shows `system` is priced at ₹3,98,950/$4,999/€4,799 per month. `command` is the correct precedent and is used as such throughout this plan, per "where the live site and the repo differ, the repo wins" — here it's the brief's assumption vs. the repo, and the repo wins.)

`currencies = ["INR", "USD", "EUR"]`, toggled via `useCurrency()` (sessionStorage key `storygrid-currency`, default `INR`) and rendered via `<CurrencyToggle />`.

### 2.5 Surface and Signal already exist — as sections, not pages

`src/pages/ServicesPage.tsx` already renders `<SurfaceSection />` and `<SignalSection />` (defined in the same file) between the "Client journey" block and the final CTA. This copy is **already brand-locked** per `HANDOFF.md` Stage B / `PLAN.md` Angle 2 sign-off:
- Surface eyebrow "Build Arm", H2 "Surface", locked line "Story is the core. Surface and Signal make it land." Four offerings: The Narrative Site, The Narrative App, The Narrative Platform, AI Automation & Integrations.
- Signal eyebrow "Digital Marketing Arm", H2 "Signal", copy "The distribution that carries the story to market and brings demand back. Currently rolling out." Four offerings: Answer-Engine Optimization (AEO), Search Optimization, Digital Media Services, Meta & Paid Social.

This means the expansion is **not** inventing new positioning from zero — it is promoting already-approved copy into full pages, and must not contradict it. This plan reuses the Signal copy verbatim (Section 7) and reframes Surface's fourth bullet ("AI Automation & Integrations") into the dedicated AI Automation category, since that bullet is the actual overlap point between "Surface" (the brand arm, which also covers plain web/app/platform build work) and "AI Automation" (this brief's requested public category, which is narrower and automation-specific).

The existing `SurfaceSection`/`SignalSection` inline components are removed from `ServicesPage.tsx` in this plan (Section 5) and replaced with a compact cross-link teaser, to avoid duplicate content living at two URLs simultaneously once dedicated pages exist.

### 2.6 Design tokens, typography, section/component patterns

- Fonts: `--font-display: 'Bricolage Grotesque'`, `--font-sans: 'Satoshi'`, `--font-mono: 'JetBrains Mono'` (all with `system-ui`/fallback stacks). No new fonts needed for this expansion.
- Color tokens relevant here: `--blaze` (#E8451A, primary CTA/accent), `--ai-teal` (#2DD881) and `--ai-teal-muted` (#1A6B45) already exist in `styles.css` and are unused anywhere in the app today — clearly reserved for AI-related UI. **Available for the AI Automation page as a secondary accent** if a visual distinction from the Blaze-only Narrative/Digital Marketing pages is wanted; not required, and not used by default in this plan's copy deck to keep visual consistency with the rest of the site (all CTAs and accents stay `--blaze` per existing `.btn-radial`/`.label-mono`/`.card-tech` utility classes, so the new pages read as native, not bolted on). Noted as an available option, not a requirement.
- Reusable structural components already in place and reused by this plan: `PageLayout` + `PageHeader` (page chrome), `SectionShell` + `SectionHeading` (light/dark/grain section variants), `Reveal` (CSS-only scroll-in animation), `PageCTA` (closing CTA block with 1–2 links), `PolicyDocument` (legal doc layout, not used here), `card-tech` utility class (bordered card with corner-tick styling used everywhere for offering/FAQ cards).
- `usePageTitle(title, { robots? })` sets `document.title` and optionally injects/removes a `meta[name="robots"]` tag on mount/unmount. No description, OG, or JSON-LD handling exists anywhere today — confirmed by grepping `index.html` (static, same meta for every route) and every page file (only `usePageTitle` calls, title-only).

### 2.7 Form flow (current)

`src/pages/ContactPage.tsx`: `WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_KEY"` (hardcoded placeholder, matches `HANDOFF.md`'s still-open "One Pending Owner Action"). On submit: if key is the placeholder, immediately builds a `mailto:hello@storygrid.co` link (`openMailto`) with URL-encoded subject `Inquiry from ${name} at ${company}` and body listing name/company/email/service/message, then shows the "Sent" confirmation. If a real key were present, it POSTs `{ access_key, name, company, email, service, message }` as JSON to `https://api.web3forms.com/submit`, falling back to the same `openMailto` on any thrown error. No `subject` field is currently sent in the Web3Forms payload. Service dropdown (`serviceOptions`) currently lists 9 flat options mixing Narrative tiers, Surface, Signal, and a generic "Enterprise" (which has no corresponding tier id — `command` is the actual enterprise-tier data, this is a small existing naming inconsistency corrected in Section 8). Response time: "24 hours" (both intro copy and sidebar), Topmate (`https://topmate.io/aneeshthakral`) as secondary CTA.

### 2.8 Deferred items from `HANDOFF.md` that intersect this expansion

| Item | Intersects how |
|---|---|
| Showreel (deferred, owner's call) | None. Not touched. |
| recharts unused, unused shadcn deps, motion usage (all "not in locked decisions") | `@radix-ui/react-navigation-menu` — one of the "unused shadcn deps" — is activated by this plan (Section 5, D3) for the desktop Services dropdown. This is the first real usage of `src/components/ui/navigation-menu.tsx`, which already exists fully built and untouched. No other deferred item is touched. |
| Web3Forms key still `"REPLACE_WITH_KEY"` | Still open. This plan changes *how* it's read (env var, Section 8) but does not obtain a key — that remains an owner action (Section 13). |

---

## 3. Decision Log

### D1 — Category naming

**Options considered:**
1. Plain-English primary everywhere ("AI Automation", "Digital Marketing"), no arm names surfaced publicly at all.
2. Arm-first everywhere ("Surface", "Signal" as the primary public labels, plain English as a subtitle).
3. Plain-English primary label (nav, URLs, page titles, meta, questionnaire) with the arm name retained as a brand sublayer (page eyebrow/kicker and contact-dropdown parenthetical only).

**Decision: Option 3.**

**Reasoning:** Prospects search "AI automation agency" or "digital marketing for B2B," never "Surface agency" or "Signal agency" — arm-first labeling in the primary nav/URL/title layer would actively hurt discoverability and force every visitor to learn brand jargon before understanding what's for sale. But the arm names aren't disposable: they're already locked into `ServicesPage.tsx` (Section 2.5) with the tagline "Story is the core. Surface and Signal make it land.," and the codebase's own existing pattern already does exactly this hybrid — the Signal section's eyebrow is literally "Digital Marketing Arm" and the Surface section's eyebrow is "Build Arm," while the contact dropdown already writes "Surface (Build & AI Automation)" and "Signal (AEO, Search & Paid Media)." Option 3 formalizes a pattern the codebase had already half-invented. Applied consistently: nav labels, URLs, page `<title>`, and meta description all use plain English; each category page's eyebrow/kicker shows the arm name (e.g., "Surface — Build Arm" on `/ai-automation`); the contact dropdown keeps the existing "(Arm — description)" parenthetical style.

### D2 — URL architecture

**Options considered:**
1. Category hubs at `/services/<category>` with tier details renamed/nested, plus redirects for the 3 existing tier URLs.
2. Top-level routes (`/ai-automation`, `/digital-marketing`), with `/services` remaining Narrative Building's home exactly as it is today.
3. A lookup that resolves category slugs before falling through to `getTierById`.

**Decision: Option 2.**

**Reasoning:** Hard Constraint #6 forbids touching Narrative's existing names/prices/currency, and the sitemap/robots/HANDOFF paper trail all reference `/services/starter`, `/services/engine`, `/services/system`, `/services/command` as final. Option 1 requires either renaming those URLs (breaking Constraint #6's spirit and any existing backlinks/bookmarks/sitemap history) or nesting them under a `/services/narrative-building/:tierId` scheme that still needs redirects for the old 4 URLs — pure downside for no upside. Option 3 (single lookup route) adds a slug-collision risk: if a future tier were ever named `system` or `command` again, or a category slug matched a tier id, the lookup order becomes a silent trap; it buys nothing here since there is no reason categories and tiers need to share a route pattern. Option 2 requires zero redirects (no URL is retired), zero `vercel.json` changes (the existing catch-all SPA rewrite `/(.*) → /index.html` already covers any new client-side path, since it doesn't care what the path is), and zero risk to any of the 4 existing tier URLs — they're on an entirely separate route (`/services/:tierId`) that `/ai-automation` and `/digital-marketing` can never intersect with, regardless of declaration order in `Routes`. `/services` keeps its URL and continues to serve as Narrative Building's page; only its *nav label* changes (D1), not its path.

**Exact route order** (both `src/StoryGridApp.tsx` and `src/App.tsx`, Section 5):

```tsx
<Route path="/" element={<HomePage />} />
<Route path="/approach" element={<ApproachPage />} />
<Route path="/services" element={<ServicesPage />} />
<Route path="/services/:tierId" element={<TierDetailPage />} />
<Route path="/ai-automation" element={<AIAutomationPage />} />
<Route path="/digital-marketing" element={<DigitalMarketingPage />} />
<Route path="/story" element={<StoryPage />} />
<Route path="/for-teams" element={<ForTeamsPage />} />
<Route path="/resources" element={<ResourcesPage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/privacy" element={<PrivacyPage />} />
<Route path="/work-policy" element={<WorkPolicyPage />} />
<Route path="*" element={<NotFoundPage />} />
```

No `vercel.json` change. No redirects.

### D3 — Navigation

**Options considered:**
1. Radix `NavigationMenu` dropdown under a "Services" trigger (component already exists, unused, at `src/components/ui/navigation-menu.tsx`).
2. Flat links — add "AI Automation" and "Digital Marketing" as two more top-level items (8 total).
3. A single "Services" hub page using routing cards instead of a dropdown, no nav change at all.

**Decision: Option 1 (dropdown), desktop only; simple expand/collapse group on mobile; footer stays flat.**

**Reasoning:** The current desktop nav is already visually tight at 6 items (`gap-7 xl:gap-9`, gets cramped below `xl`). Option 2 would push it to 8 flat items, degrading the exact "the header is clean" quality the rest of the design system protects (note the whole `bg-grain`/`card-tech`/`label-mono` system is deliberately minimal). Option 3 avoids nav growth but buries the two new categories one click deeper than "Services" itself, and the brief explicitly names Radix `navigation-menu` as available — using it activates dependency that's currently dead weight (Section 2.8). Option 1 keeps the top-level count at 6 (Home, Approach, **Services ▾**, For Teams, Story, Resources), turns "Services" from a link into a trigger, and reveals the 3 categories on hover/focus (desktop) exactly where the label already implied a services list existed. "For Teams" is deliberately left outside the dropdown — it's an audience-page (buyer type: internal teams), not a service-line page, and folding it in would conflate two different site taxonomies for no benefit.

**Desktop:** `NavigationMenu` (Radix, from `ui/navigation-menu.tsx`) renders "Services" as a `NavigationMenuTrigger` + `NavigationMenuContent` listing the 3 categories as plain links, styled to match the existing dark theme (`bg-popover`/`text-popover-foreground` tokens already resolve correctly in dark mode, no new CSS needed).

**Mobile:** the existing simple flat drawer (`useState` open/close, no Radix) gets one more piece of local state, `servicesOpen`, toggled by tapping the "Services" row (which no longer navigates directly); a `ChevronDown` (already imported pattern from `lucide-react` elsewhere in the codebase) rotates on expand; the 3 category links render indented directly beneath when open, in the same `font-mono uppercase` list-item style as every other mobile link.

**Footer:** stays a flat, non-dropdown list (footers don't collapse) — expanded from 6 to 8 entries (Section 5), since footer nav is meant to be the "everything, flat" fallback. Zero code change in `Footer.tsx` itself; it already maps over `footerNavLinks` from `src/data/navigation.ts`, so expanding that array is sufficient.

### D4 — Data model

**Options considered:**
1. Extend `src/data/pricing.ts` with the two new categories.
2. Create `src/data/services.ts` with a typed `ServiceCategory` model; Narrative maps to existing `pricing.ts` tiers untouched.

**Decision: Option 2.**

**Reasoning:** Hard Constraint #6 forbids touching `pricing.ts` values, and `pricing.ts`'s whole shape (`MonthlyRetainer`, `PriceMap`, currency-keyed prices) is built around priced, tiered retainers — it has no field for FAQs, "how it works" steps, or a proof point, and forcing those in would either bloat `pricing.ts`'s scope or require optional fields that don't apply to any existing tier. A dedicated `src/data/services.ts` (same directory, same convention as `navigation.ts`, `clientLogos.ts`, `social.ts`) keeps `pricing.ts` byte-identical to its current committed state (safest possible posture against Constraint #6) while giving the two new categories a model actually shaped for their content. The Narrative entry in `serviceCategories` is deliberately thin (used only for nav/questionnaire consistency); its real pricing/tier rendering stays 100% inside `pricing.ts` + `ServicesPage.tsx`/`TierDetailPage.tsx`, unchanged.

**Full TypeScript spec:** Section 6.

### D5 — Questionnaire

Covered in full in Section 8 (Questionnaire Spec) and D5 summary below.

**Decision:** Add a category selector as the first field in the form. It drives which block of follow-up fields renders below it: Narrative Building shows the existing (trimmed) tier dropdown; AI Automation and Digital Marketing each show their own dedicated field set (Section 8). A `?service=` query param (`narrative` | `ai-automation` | `digital-marketing`) pre-selects the category on page load, read via `useSearchParams` from `react-router-dom` (already a dependency, already used for routing elsewhere in the app). Every CTA on every service page and tier detail page is updated to pass the right value.

### D6 — Homepage rebalance

**Options considered:**
1. Insert a new 3-card teaser section reusing the exact `PageRoutingCards` component/pattern, expanded to include the 2 new categories.
2. Build a small dedicated component (`ServiceArmsTeaser`) separate from `PageRoutingCards`.
3. No new homepage section — rely on the nav dropdown and `/services` alone for discovery.

**Decision: Option 2.**

**Reasoning:** `PageRoutingCards` ("Where to Go Next") is a page-level sitemap-in-cards (Approach/Services/For Teams/Story/Resources/Contact) — it answers "where else can I go on this site," not "what does StoryGrid sell." Folding 2 more cards into it (Option 1) conflates two different jobs and pushes it from 6 to 8 cards, which no longer reads as a tidy closing grid. Option 3 under-serves the brief's explicit ask that all three arms surface on the homepage. A dedicated `ServiceArmsTeaser` component (Section 5) is small, reuses the same `card-tech`/`Reveal`/grid patterns already everywhere in the codebase (no new visual language), and is reused a second time on `/services` itself (Section 5's `ServicesPage.tsx` change) to cross-link the other two arms — one component, two placements, `currentId` prop hides whichever category the visitor is already on. This keeps the founder-narrative hero, pain points, Compound Story Effect, and founder-story blurb completely untouched above it.

**Exact homepage section order after this change** (only one new section inserted, nothing else reordered):

1. Navbar (fixed)
2. Hero (headline, DotField, CTAs)
3. `ShowreelScroll`
4. "Sound familiar?" pain points
5. *(HomeLightZone starts)* Compound Story Effect
6. "Your path" — Audit → Sprint → Retainer
7. AI-first stats
8. Founder story blurb ("Built by a salesman. Not a marketer.")
9. **NEW:** `<ServiceArmsTeaser />` — "One story. Three arms to carry it."
10. `PageRoutingCards` ("Where to Go Next")
11. Final CTA banner
12. `Footer`

### D7 — SEO and AEO for a client-rendered SPA

**Options considered:**
1. Client-side per-page meta via a new `useSeo` hook (extends `usePageTitle`'s existing DOM-mutation pattern to description, OG/Twitter tags, and injected JSON-LD `<script>` tags).
2. Migrate to SSR (revive the dormant TanStack Start scaffold, or another framework) — **explicitly out of scope** per this brief.
3. Build-time prerendering (a Playwright/Puppeteer script that snapshots each route to static HTML with correct per-route meta baked in, served instead of the SPA shell to crawlers, while the SPA still hydrates for real visitors) — no framework change, just an added build step.

**Decision: Option 1 now, Option 3 flagged as a Phase 2 recommendation (not committed in this expansion).**

**Reasoning, stated honestly:** This is a firm that sells AEO — it cannot ship a service page that AI answer-engines can't actually read. Option 1 is real and immediate for any crawler that executes JavaScript (Google's rendering wave does; so do most social-preview and general-purpose bots eventually), and it's cheap: `usePageTitle` already proves the DOM-mutation-on-mount pattern works and cleans up correctly. But it is not a complete answer — a crawler or answer-engine that does **not** execute JavaScript (many AEO-relevant bots prioritize speed over full rendering) will see only `index.html`'s static, page-agnostic meta tags, never the per-page description/OG/JSON-LD injected by `useSeo`. Same caveat for link-preview scrapers (Slack, iMessage, LinkedIn, X) — these almost universally fetch raw HTML without executing JS, so **every new page will show the homepage's OG image and description in link previews until prerendering exists** (Open Question 5, Section 13, covers whether new OG art should be commissioned for this). Option 3 is the honest fix and is scoped as a follow-up, not bundled into this expansion, because it's a build/deploy-pipeline change with its own testing surface and the brief caps this phase to page/data/nav work.

**What ships in this expansion (Section 9 has the full checklist):**
- `useSeo(title, { description, og, jsonLd })` hook, used only on the 2 new category pages (existing 9 pages keep `usePageTitle` untouched — no regression risk to working pages for a nice-to-have).
- Static Organization JSON-LD added directly to `index.html` (safe — it's identical on every route, so there's no CSR-timing problem for this one block).
- Per-category `Service` JSON-LD and `FAQPage` JSON-LD injected client-side via `useSeo` on `/ai-automation` and `/digital-marketing`.
- `sitemap.xml` gains the 2 new URLs (12 → 14).
- `robots.txt` unchanged (still only disallows `/work-policy`).

### D8 — Proof point treatment

**Decision:** One short "outcome" block on the AI Automation page only (Section 7 copy deck), directly beneath the "How engagement works" steps and above the FAQ. No client name. No metric invented — the only fact stated is the categorical one ("manual order processing and reporting workflows"), framed explicitly as "one example among the industries we support," with zero linkage to the founder's prior employment (the founder's B2B sales background is discussed only on `/story` and `/approach`, in first person, and never cross-referenced from this block). **Marked for owner sign-off** — flagged again in Section 13 as Open Question 1, since Hard Constraint #8 explicitly requires it and this is the one piece of copy in the entire deck describing a real (if anonymized) client outcome.

---

## 4. Information Architecture Map

### Before

```
/                     Home
/approach             Approach
/services             Services (Narrative tiers + Surface + Signal sections, no dedicated URLs for Surface/Signal)
/services/:tierId     Tier detail (starter | engine | system | command)
/story                Story
/for-teams            For Teams
/resources            Resources
/contact              Contact
/privacy              Privacy Policy
/work-policy          Work Policy (noindex)
```

Nav: `Home · Approach · Services · For Teams · Story · Resources` (flat, 6 items) + "Talk to Us" CTA.
Footer nav: identical 6 items, plus separate Privacy Policy / Work Policy row.

### After

```
/                     Home (+ new ServiceArmsTeaser section)
/approach             Approach (unchanged)
/services             Narrative Building (nav label change only; URL, content, prices unchanged; Surface/Signal sections removed, replaced by 2-card teaser)
/services/:tierId     Tier detail (unchanged: starter | engine | system | command)
/ai-automation        AI Automation (NEW)
/digital-marketing    Digital Marketing (NEW)
/story                Story (unchanged)
/for-teams            For Teams (unchanged)
/resources            Resources (unchanged)
/contact              Contact (category-aware questionnaire, ?service= param support)
/privacy              Privacy Policy (unchanged)
/work-policy          Work Policy (unchanged, still noindex)
```

Nav: `Home · Approach · Services ▾ (Narrative Building / AI Automation / Digital Marketing) · For Teams · Story · Resources` (dropdown desktop, expand/collapse mobile) + "Talk to Us" CTA.
Footer nav: `Home · Approach · Narrative Building · AI Automation · Digital Marketing · For Teams · Story · Resources` (flat, 8 items), plus unchanged Privacy Policy / Work Policy row.

No existing URL is retired, renamed, or redirected.

---

## 5. File-by-File Change Map

### Create

| File | Description |
|---|---|
| `src/data/services.ts` | New `ServiceCategory` model (Section 6) with 3 entries: `narrative` (thin wrapper), `ai-automation`, `digital-marketing` (full copy, offerings, FAQs, proof point). |
| `src/pages/AIAutomationPage.tsx` | New page: `PageHeader` (eyebrow "AI Automation," Section 7 copy) → positioning paragraph → 4-offering grid → 3-step "how it works" → proof point block → FAQ (`SectionShell`/`SectionHeading`/`card-tech`, same structural pattern as `ApproachPage.tsx`) → `PageCTA`. Uses `useSeo` (Service + FAQPage JSON-LD). Renders `<ServiceArmsTeaser currentId="ai-automation" />` before the closing `PageCTA`. |
| `src/pages/DigitalMarketingPage.tsx` | Same structural pattern, no proof point block, offerings reused verbatim from the existing locked `SignalSection` copy (Section 2.5, Section 7). Uses `useSeo`. Renders `<ServiceArmsTeaser currentId="digital-marketing" />`. |
| `src/hooks/useSeo.ts` | New hook (Section 9) extending `usePageTitle`'s mount/unmount DOM-mutation pattern to `meta[name=description]`, `og:title`/`og:description`, `twitter:title`/`twitter:description`, and one or more injected `<script type="application/ld+json">` tags (id-tagged for cleanup). |
| `src/components/ServiceArmsTeaser.tsx` | New homepage/cross-link section: 3-card grid (or 2, via `currentId` prop hiding the current page's own card), same `Reveal`/`card-tech` pattern as `PageRoutingCards.tsx`. Props: `{ currentId?: "narrative" \| "ai-automation" \| "digital-marketing" }`. |

### Modify

| File | Change |
|---|---|
| `src/StoryGridApp.tsx` | Add imports for `AIAutomationPage`, `DigitalMarketingPage`. Add the 2 new `<Route>` entries per D2's exact order. |
| `src/App.tsx` | **Identical** import + route additions, mirrored exactly. Required because this is the file `main.tsx`/`index.html`/`vite build` actually ships (Section 2.3). Treat these two files as one logical change applied twice. |
| `src/data/navigation.ts` | Replace flat `mainNavLinks` with `mainNavEntries: NavEntry[]` (Section 6 has the type), where `NavEntry = NavLink \| NavGroup`. "Services" becomes a `NavGroup` with 3 `children`. Expand `footerNavLinks` to 8 flat entries per Section 4's "After" map (rename "Services" row to "Narrative Building," insert "AI Automation" and "Digital Marketing" rows). `policyLinks` unchanged. |
| `src/components/Navbar.tsx` | Consume `mainNavEntries` instead of `mainNavLinks`. Desktop: render `NavLink` entries as-is; render the `NavGroup` ("Services") as a Radix `NavigationMenu` trigger + content (import from `@/components/ui/navigation-menu`) listing its 3 children as plain `Link`s styled to match. Mobile: add `const [servicesOpen, setServicesOpen] = useState(false)`; tapping the "Services" row toggles it (no navigation) and reveals the 3 child links indented below, with a `ChevronDown` (lucide-react) that rotates 180° when open, matching the existing `open`/`X`/`Menu` icon-rotation convention already in this file. |
| `src/pages/ServicesPage.tsx` | Delete the `SurfaceSection()` and `SignalSection()` function components and their two render calls (currently sit between the "Client journey" section and the final CTA section). Replace with `<ServiceArmsTeaser currentId="narrative" />` in the same position. No change to `pricedTiers`, `commandTier`, `oneTimeEngagements`, `teamWorkshop`, currency toggle, or client-journey text. Update the page's own CTA links (`Book a discovery call` → `/contact`) to `/contact?service=narrative`. `OneTimeCard`'s CTA similarly updates to `/contact?service=narrative&tier=${engagement.id}`. |
| `src/pages/TierDetailPage.tsx` | CTA link `to="/contact"` → `` to={`/contact?service=narrative&tier=${tier.id}`} ``. No other change (currency toggle, tier content, custom-pricing branch all untouched). |
| `src/pages/HomePage.tsx` | Import `ServiceArmsTeaser`; render `<ServiceArmsTeaser />` (no `currentId`, shows all 3) between the founder-story blurb section and `<PageRoutingCards />`, per D6's exact order. |
| `src/pages/ContactPage.tsx` | Full rework per Section 8: category selector state, conditional field blocks, `?service=`/`&tier=` query param read via `useSearchParams`, `WEB3FORMS_ACCESS_KEY` reads `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` with the existing string as fallback, `subject` added to the Web3Forms JSON payload, `openMailto` updated to prefix the category tag and append branch-specific fields to the body, trimmed/corrected `serviceOptions` (Section 8), new confirmation microcopy. |
| `index.html` | Add one static Organization JSON-LD `<script type="application/ld+json">` block before `</head>` (site-wide, safe to hardcode — same on every route). No other change; existing meta/font/OG tags from the July 2026 update are untouched. |
| `public/sitemap.xml` | Add `<url><loc>https://storygrid.co/ai-automation</loc></url>` and `<url><loc>https://storygrid.co/digital-marketing</loc></url>` (12 → 14 total). |

### Explicitly not modified

`src/data/pricing.ts` (Hard Constraint #6), `src/data/clientLogos.ts`, `src/data/social.ts`, `src/hooks/useCurrency.ts`, `src/components/CurrencyToggle.tsx`, `src/components/PricingRetainerCard.tsx`, `src/hooks/usePageTitle.ts` (kept for the 9 existing pages, untouched), `src/components/Footer.tsx` (data-driven off `navigation.ts`, needs no code change), `public/robots.txt`, `vercel.json`, `src/routes/*`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `src/routeTree.gen.ts` (all per Hard Constraint #3 and #4 — never touch the TanStack scaffold or the generated route tree), `PLAN.md`, `HANDOFF.md` (Hard Constraint #2).

---

## 6. Data Model Spec

`src/data/services.ts` (new file):

```ts
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
  slug: string; // "" for narrative (uses /services, not a dedicated slug route)
  path: string; // full route path, e.g. "/ai-automation"
  name: string; // plain-English public label
  armName: string | null; // brand sublayer, e.g. "Surface — Build Arm"; null for narrative
  navLabel: string; // label used in nav dropdown + footer
  eyebrow: string;
  heroTitle: string;
  heroIntro: string;
  positioning: string;
  offerings: ServiceOffering[];
  howItWorks: ServiceStep[];
  faqs: ServiceFaq[];
  proofPoint: ServiceProofPoint | null;
  pricingMode: PricingMode; // "scoped" for both new arms; "listed" for narrative
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
```

`src/data/navigation.ts` (modified — full replacement content):

```ts
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
```

`src/hooks/useSeo.ts` (new file):

```ts
import { useEffect } from "react";

type JsonLdBlock = Record<string, unknown>;

type SeoOptions = {
  description: string;
  ogTitle?: string;
  jsonLd?: JsonLdBlock[];
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo(title: string, options: SeoOptions) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", options.description);
    upsertMeta("property", "og:title", options.ogTitle ?? title);
    upsertMeta("property", "og:description", options.description);
    upsertMeta("name", "twitter:title", options.ogTitle ?? title);
    upsertMeta("name", "twitter:description", options.description);

    const scripts: HTMLScriptElement[] = [];
    (options.jsonLd ?? []).forEach((block, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `seo-jsonld-${i}`;
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [title, options.description, options.ogTitle, options.jsonLd]);
}
```

---

## 7. Copy Deck (verbatim)

### AI Automation page (`/ai-automation`)

**Nav label:** AI Automation
**Page `<title>`:** `AI Automation — StoryGrid & Co.`
**Meta description:** "AI automation and workflow systems from StoryGrid & Co. Scoped and built after a discovery call, for founders who want their operations to run like their narrative reads."

**Eyebrow:** AI Automation
**H1:** The systems that run your business without you standing over them.
**Intro:** Workflow automation, integrations, and AI-powered operations. Built by the same team that builds your narrative, for founders who want their story and their systems moving together.

**Positioning paragraph:** AI Automation is part of Surface, the build arm of StoryGrid & Co. Story is the core. Surface and Signal make it land. This is where we build the operational systems that carry your business day to day: workflow automation, tool integrations, and AI-augmented processes that remove manual work from your team's plate. Every project is scoped and documented before work begins. No published pricing, no rate-card numbers.

**What's included (4 offerings):**
- **Workflow Automation** — Manual processes turned into automated systems. The repetitive work your team does by hand every week, mapped and automated.
- **Tool & API Integrations** — Your existing tools connected so data moves between them without manual re-entry. CRM, email, calendars, and internal tools, wired together.
- **AI-Augmented Operations** — AI models integrated into real operational workflows: lead qualification, document processing, internal reporting, and customer support triage.
- **Legacy Process Modernization** — Old spreadsheets, manual handoffs, and outdated tools replaced with systems built for how the business runs today.

**How engagement works (3 steps):**
1. **Discovery & mapping** — We map your current tools, workflows, and the manual work costing your team time. Every engagement starts with understanding what actually happens day to day.
2. **Scope & build** — We scope the exact systems and integrations needed, then build and test them against your real workflows, not a generic template.
3. **Handoff & support** — Documentation, training, and support so your team can run the systems day to day. No dependency on us to keep the lights on.

**Proof point** (owner sign-off required, see Section 13): A leading OEM manufacturer used AI automation to replace manual order processing and reporting workflows that had run unchanged for years. This is one example among the industries we support. Conventional-industry operators, not just tech companies, are often where automation has the most room to compound.

**FAQ:**
- **Do you work with industries outside tech?** Yes. Automation work spans manufacturing, logistics, professional services, and other conventional industries where legacy processes and disconnected tools cost the most time.
- **How is this priced?** Every AI Automation engagement is scoped and priced after a discovery call. Pricing depends on the systems involved and the integrations required, so no published rate applies here.
- **Do I need an existing narrative engagement to start?** No. AI Automation can start on its own. Many clients sequence it alongside or after narrative work, but it is not a requirement.
- **What if my team has no AI experience?** That's normal. Discovery includes an honest look at your team's current tools and comfort level, and we scope training into the engagement where it's needed.

**Closing CTA:** Ready to automate the work that's costing your team time? → Book a discovery call (`/contact?service=ai-automation`)

### Digital Marketing page (`/digital-marketing`)

**Nav label:** Digital Marketing
**Page `<title>`:** `Digital Marketing — StoryGrid & Co.`
**Meta description:** "AEO, search, and paid distribution from StoryGrid & Co. Signal carries the story to market after the narrative and surfaces are in place."

**Eyebrow:** Digital Marketing
**H1:** Distribution that carries the story to market and brings demand back.
**Intro:** Signal is the distribution arm of StoryGrid & Co. Sequenced after the narrative and the surfaces are in place, so demand generation runs on a story worth spreading.

**Positioning paragraph:** Digital Marketing is part of Signal, the distribution arm of StoryGrid & Co. Priced per scope on discovery. This work runs after the narrative and the surfaces are in place: distribution without a settled story and a built surface to send traffic to is lower-leverage.

**What's included (4 offerings, reused verbatim from the already-locked Signal section, per Section 2.5):**
- **Answer-Engine Optimization (AEO)** — Visibility inside AI answers and assistants. Position the brand where buyers are increasingly looking first.
- **Search Optimization** — Organic discovery and intent capture. Built on the narrative infrastructure already in place.
- **Digital Media Services** — Content distribution, creative production, and media planning. The story reaches the right audience at the right moment.
- **Meta & Paid Social** — Targeted demand across Meta and beyond. Signal runs after the narrative and the surfaces are in place.

**How engagement works (3 steps):**
1. **Discovery & audit** — We review your current channels, existing SEO and AEO footprint, and where demand is and isn't converting today.
2. **Scope & sequence** — We scope the channels that matter most for your stage and sequence them against the narrative and surface work already underway.
3. **Run & report** — Campaigns and optimization work run on a discovery-scoped cadence, with reporting tied to pipeline, not vanity metrics.

**FAQ:**
- **What is AEO and why does it matter now?** Answer-Engine Optimization is visibility inside AI assistants and answer engines, not just search results. Buyers increasingly ask an AI before they open a search engine, and AEO positions your brand to show up in that answer.
- **Do I need an existing website or narrative in place first?** Generally yes. Digital Marketing runs after the narrative and the surfaces are in place. Distribution without a settled story and a place to send traffic is lower-leverage.
- **Is pricing published anywhere?** No. Every Digital Marketing engagement is priced per scope on discovery, based on the channels and cadence involved.
- **Can I start with just one channel, like AEO or paid social?** Yes. Engagements are scoped to the channels that make sense for your stage, not sold as an all-or-nothing package.

**Closing CTA:** Ready to put distribution behind a story worth spreading? → Book a discovery call (`/contact?service=digital-marketing`)

### Homepage — `ServiceArmsTeaser` section

**Eyebrow:** Three ways we work
**H2:** One story. Three arms to carry it.
**Intro:** Narrative is the core. Surface and Signal make it land, in the build and in the market.

**Cards:**
- **Narrative Building** — The story, the voice, and the content system that turns both into pipeline. → `/services`
- **AI Automation** — The workflow automation and AI systems that run your business day to day. → `/ai-automation`
- **Digital Marketing** — The distribution that carries the story to market and brings demand back. → `/digital-marketing`

### `/services` — replacement teaser (2 cards, `currentId="narrative"` hides the Narrative card)

Same section, same eyebrow/H2/intro, showing only the AI Automation and Digital Marketing cards.

### Nav labels

Home · Approach · **Services** (dropdown trigger) → Narrative Building / AI Automation / Digital Marketing · For Teams · Story · Resources

### Questionnaire microcopy (see Section 8 for full field spec)

- Category selector label: **What do you need?**
- Category options: `Narrative Building`, `AI Automation`, `Digital Marketing`
- Confirmation copy (replaces existing "Thanks — we respond within 24 hours."): **Thanks. We respond within 24 hours. Every inquiry gets a discovery call before any proposal. Pricing and scope are defined after that call, not before.**

---

## 8. Questionnaire Spec

### Category selector (new, first field in the form)

```tsx
<select id="category" name="category" required>
  <option value="narrative">Narrative Building</option>
  <option value="ai-automation">AI Automation</option>
  <option value="digital-marketing">Digital Marketing</option>
</select>
```

State: `const [category, setCategory] = useState<"narrative" | "ai-automation" | "digital-marketing">("narrative")`.

### Query param preselection

```tsx
import { useSearchParams } from "react-router-dom";
// ...
const [searchParams] = useSearchParams();
useEffect(() => {
  const service = searchParams.get("service");
  if (service === "narrative" || service === "ai-automation" || service === "digital-marketing") {
    setCategory(service);
  }
  const tier = searchParams.get("tier");
  if (tier) setSelectedTier(tier); // only meaningful when category === "narrative"
}, [searchParams]);
```

Every CTA that links to `/contact` across `ServicesPage.tsx`, `TierDetailPage.tsx`, `AIAutomationPage.tsx`, `DigitalMarketingPage.tsx`, `ForTeamsPage.tsx`, `StoryPage.tsx`, `ApproachPage.tsx`, `HomePage.tsx`, and `Navbar.tsx`'s "Talk to Us" button is updated: category-specific pages pass `?service=<id>`; category-agnostic CTAs (Navbar "Talk to Us," homepage final CTA, `ForTeamsPage`/`StoryPage`/`ApproachPage` CTAs) are left as plain `/contact` (default category `narrative`, matching current behavior — no regression for these).

### Branch: Narrative Building (`category === "narrative"`)

Existing granular dropdown, trimmed and corrected (drops "Surface"/"Signal," now redundant with the category selector; renames "Enterprise" to "Narrative Command" to match the actual tier id/name in `pricing.ts`):

```ts
const narrativeServiceOptions = [
  "Narrative Audit",
  "Narrative Sprint",
  "Narrative Starter",
  "Narrative Engine",
  "Narrative System",
  "Narrative Command",
  "Team Narrative Workshop",
];
```

If `?tier=` is present, the dropdown pre-selects the matching option (mapping `tier` slug → label, e.g. `starter` → "Narrative Starter").

### Branch: AI Automation (`category === "ai-automation"`)

| Field | Input | Name | Options / placeholder | Required |
|---|---|---|---|---|
| Industry | text | `industry` | placeholder "Manufacturing, logistics, professional services..." | yes |
| Company size | select | `companySize` | `1–10`, `11–50`, `51–200`, `200+` | yes |
| Functions to automate | textarea | `automateFunctions` | placeholder "Order processing, reporting, customer support triage..." | yes |
| Current tools and legacy processes | textarea | `currentTools` | placeholder "What you use today, and what's held together manually" | no |
| Team AI familiarity | select | `aiFamiliarity` | `New to AI`, `Some familiarity`, `Actively using AI tools` | yes |
| Staff training in scope | select | `trainingInScope` | `Yes`, `No`, `Not sure yet` | yes |
| Timeline | select | `timeline` | `Immediately`, `Within 3 months`, `Within 6 months`, `Just exploring` | yes |

### Branch: Digital Marketing (`category === "digital-marketing"`)

| Field | Input | Name | Options / placeholder | Required |
|---|---|---|---|---|
| Website status | select | `websiteStatus` | `Live and active`, `Live but outdated`, `No website yet` | yes |
| Current channels | textarea | `currentChannels` | placeholder "LinkedIn organic, paid social, SEO..." | no |
| SEO/AEO work today | select | `seoAeoStatus` | `Yes, active work`, `Some, informally`, `No` | yes |
| Primary goal | select | `primaryGoal` | `More qualified leads`, `Brand visibility`, `AEO / AI-answer visibility`, `Other` | yes |
| Timeline | select | `timeline` | `Immediately`, `Within 3 months`, `Within 6 months`, `Just exploring` | yes |

The existing "Tell us about your narrative" free-text field is relabeled per branch: "Tell us about your narrative" (Narrative Building), "Tell us about your operations" (AI Automation), "Tell us about your marketing today" (Digital Marketing) — same underlying `name="narrative"` field, kept for backward payload compatibility.

### Web3Forms payload

```ts
const categoryLabels: Record<string, string> = {
  narrative: "Narrative Building",
  "ai-automation": "AI Automation",
  "digital-marketing": "Digital Marketing",
};

const subject = `[${categoryLabels[category]}] New inquiry - ${name}`;

const payload = {
  access_key: WEB3FORMS_ACCESS_KEY,
  subject,
  category: categoryLabels[category],
  name,
  company,
  email,
  service, // narrative branch only; undefined otherwise
  message: narrative,
  ...(category === "ai-automation" && {
    industry, companySize, automateFunctions, currentTools, aiFamiliarity, trainingInScope, timeline,
  }),
  ...(category === "digital-marketing" && {
    websiteStatus, currentChannels, seoAeoStatus, primaryGoal, timeline,
  }),
};
```

### Mailto fallback

`openMailto` gains a `category` argument; subject becomes `` `[${categoryLabels[category]}] Inquiry from ${name} at ${company}` ``; body appends whichever branch-specific fields are populated, in the same `Key: value\n` format already used for name/company/email/service.

### Access key

```ts
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "REPLACE_WITH_KEY";
```

Falls through to the same placeholder-check / mailto-fallback logic already in place — no behavior change until the owner sets `VITE_WEB3FORMS_ACCESS_KEY` in Vercel's environment variables (no code redeploy required once that's done, since Vite inlines env vars at build time but Vercel rebuilds on env var changes automatically via a redeploy trigger the owner controls). **Never commit a real key to the repo.**

---

## 9. SEO/AEO Checklist

- [ ] `useSeo` hook created (Section 6), applied only to `AIAutomationPage.tsx` and `DigitalMarketingPage.tsx`. Existing 9 pages keep `usePageTitle`, untouched.
- [ ] Organization JSON-LD added statically to `index.html`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StoryGrid & Co.",
    "url": "https://storygrid.co",
    "email": "hello@storygrid.co",
    "sameAs": [
      "https://www.linkedin.com/company/storygrid-co/",
      "https://www.instagram.com/storygrid.co"
    ]
  }
  ```
- [ ] `Service` JSON-LD injected via `useSeo` on both new pages (`serviceType`, `provider`, `areaServed: "Worldwide"`, `description` from `metaDescription`).
- [ ] `FAQPage` JSON-LD injected via `useSeo` on both new pages, generated from each category's `faqs` array (`mainEntity` → `Question`/`acceptedAnswer`).
- [ ] `sitemap.xml` updated to 14 URLs (2 new).
- [ ] `robots.txt` unchanged — confirm `/ai-automation` and `/digital-marketing` are NOT disallowed (only `/work-policy` is).
- [ ] Meta descriptions set per new page via `useSeo` (Section 7 copy).
- [ ] OG/Twitter title+description updated per new page via `useSeo` — **documented limitation:** non-JS-executing crawlers and link-preview scrapers will still see `index.html`'s static, homepage-oriented OG tags and image for these URLs until prerendering (D7, Section 13 Open Question 5) exists. This is disclosed, not silently accepted.
- [ ] No framework migration attempted or recommended for this phase.

---

## 10. Regression Map

| Existing behavior | Why it could break | Verification |
|---|---|---|
| Currency toggle (INR/USD/EUR) on `/services`, `/services/:tierId`, `/for-teams` | None of `pricing.ts`, `useCurrency.ts`, or `CurrencyToggle.tsx` are touched | `npm run preview`, load `/services`, cycle INR → USD → EUR, confirm prices update and `sessionStorage["storygrid-currency"]` persists across reload |
| `/services/starter`, `/services/engine`, `/services/system` (and `/services/command`) | New routes `/ai-automation`, `/digital-marketing` are added to the same `<Routes>` list | Load all 4 URLs directly (not via client nav) post-deploy; confirm 200 and correct tier content, unaffected by new route additions |
| Contact form submit (mailto fallback + Web3Forms placeholder logic) | `ContactPage.tsx` gets the largest rework in this plan | Submit with each of the 3 categories selected; confirm `mailto:` link opens with correct category-tagged subject and all branch fields in the body; confirm the Narrative branch's trimmed dropdown still submits `service` correctly |
| Mobile nav | Services link becomes an expand/collapse group instead of a direct link | Open mobile drawer, tap Services, confirm 3 children expand/collapse and each navigates and closes the drawer on tap (existing `useEffect` closing drawer on `location.pathname` change must still fire) |
| 404s | New literal routes must not shadow the catch-all or the dynamic tier route | Visit an undefined path (e.g. `/nonexistent`), confirm `NotFoundPage` still renders; visit `/services/nonexistent-tier`, confirm `TierDetailPage`'s `<Navigate to="/services" replace />` still fires (unaffected — untouched code path) |
| `App.tsx` vs `StoryGridApp.tsx` duplication | The single highest-risk item in this plan (Section 2.3) | After deploy, load `storygrid.co/ai-automation` and `storygrid.co/digital-marketing` directly (hard refresh, not client-side nav) and confirm 200 + correct page, not a 404 — this proves the `App.tsx` mirror actually landed |
| `npm run build` / `npm run lint` | New TS file (`services.ts`), restructured `navigation.ts` type (flat array → `NavEntry[]`) | `vite build` must exit 0; `eslint .` must show no new errors (pre-existing prettier warnings are acceptable per `HANDOFF.md`'s established baseline) |
| Footer layout | `footerNavLinks` grows from 6 to 8 flat items | Visual check at mobile and desktop width — column is a simple vertical `space-y-3` list, no grid-column risk, but confirm no unexpected wrap/overflow at narrow widths |

---

## 11. Execution Sequence

Continuing the lettering convention already established by `PLAN.md` (Stages A–D, all complete).

### Stage E — Data & Routing Foundation

**Files:** `src/data/services.ts` (create), `src/data/navigation.ts` (modify), `src/StoryGridApp.tsx` + `src/App.tsx` (modify, mirrored), `public/sitemap.xml` (modify).

**Completion criteria:**
- [ ] `src/data/services.ts` exports `serviceCategories` with all 3 entries per Section 6
- [ ] `src/StoryGridApp.tsx` and `src/App.tsx` are identical again after the edit (diff them to confirm) and both include the 2 new routes in D2's exact order
- [ ] `mainNavEntries` and `footerNavLinks` updated per Section 6
- [ ] `sitemap.xml` has 14 `<url>` entries
- [ ] `vite build` exits 0

**Commit message:**
```
feat: expansion foundation — service data model, routes, nav, sitemap

- Add src/data/services.ts (ServiceCategory model: narrative, ai-automation, digital-marketing)
- Add /ai-automation and /digital-marketing routes to StoryGridApp.tsx and App.tsx (mirrored)
- Restructure navigation.ts: Services becomes a NavGroup with 3 children; footer expands to 8 links
- Add 2 new URLs to sitemap.xml (14 total)
```

### Stage F — Category Pages

**Files:** `src/pages/AIAutomationPage.tsx` (create), `src/pages/DigitalMarketingPage.tsx` (create), `src/hooks/useSeo.ts` (create), `index.html` (modify — Organization JSON-LD).

**Completion criteria:**
- [ ] Both pages render hero, positioning, offerings grid, how-it-works, FAQ (AI Automation also renders the proof point block) using Section 7 copy verbatim
- [ ] Both use `useSeo` with correct `description` + `Service`/`FAQPage` JSON-LD
- [ ] Zero pricing figures anywhere on either page (grep confirms: no `$`, `₹`, `€` on either file)
- [ ] `index.html` has the Organization JSON-LD block
- [ ] `vite build` exits 0

**Commit message:**
```
feat: AI Automation and Digital Marketing category pages

- Add AIAutomationPage.tsx and DigitalMarketingPage.tsx (hero, positioning,
  offerings, how it works, FAQ; AI Automation adds anonymized OEM proof point)
- Add useSeo hook (description, OG/Twitter, JSON-LD)
- Add site-wide Organization JSON-LD to index.html
```

### Stage G — Homepage & Services Page Integration

**Files:** `src/components/ServiceArmsTeaser.tsx` (create), `src/pages/HomePage.tsx` (modify), `src/pages/ServicesPage.tsx` (modify), `src/pages/TierDetailPage.tsx` (modify), `src/components/Navbar.tsx` (modify).

**Completion criteria:**
- [ ] `ServiceArmsTeaser` renders 3 cards with no `currentId`, 2 cards when `currentId` is passed
- [ ] Homepage section order matches D6 exactly; hero/pain-points/Compound-Story/founder-blurb unchanged above the new section
- [ ] `ServicesPage.tsx` no longer contains `SurfaceSection`/`SignalSection`; renders `<ServiceArmsTeaser currentId="narrative" />` in their place
- [ ] All CTA `to=` values updated per Section 8's query-param table
- [ ] Desktop Services dropdown (Radix `NavigationMenu`) opens/closes correctly on hover and keyboard focus; mobile Services group expands/collapses
- [ ] `vite build` exits 0

**Commit message:**
```
feat: homepage/services integration — arms teaser, nav dropdown, CTA params

- Add ServiceArmsTeaser component, used on Home (3 cards) and /services (2 cards)
- Remove inline Surface/Signal sections from ServicesPage
- Update all service-related CTAs to pass ?service= (and &tier= where applicable)
- Navbar Services becomes a dropdown (desktop) / expand-collapse group (mobile)
```

### Stage H — Questionnaire Expansion

**Files:** `src/pages/ContactPage.tsx` (modify).

**Completion criteria:**
- [ ] Category selector present and drives conditional field rendering per Section 8
- [ ] `?service=` and `&tier=` query params preselect correctly on load
- [ ] Web3Forms payload includes `subject` with the correct category tag; mailto fallback subject and body match
- [ ] `WEB3FORMS_ACCESS_KEY` reads `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` with the existing placeholder as fallback
- [ ] Narrative dropdown trimmed to 7 options (no Surface/Signal/generic Enterprise; "Narrative Command" replaces "Enterprise")
- [ ] Confirmation microcopy updated per Section 7
- [ ] `vite build` exits 0

**Commit message:**
```
feat: category-aware contact questionnaire

- Add category selector (Narrative Building / AI Automation / Digital Marketing)
- Add branch-specific fields for AI Automation and Digital Marketing
- Support ?service= and &tier= query params for CTA preselection
- Add subject tags to Web3Forms payload and mailto fallback
- Read WEB3FORMS_ACCESS_KEY from VITE_WEB3FORMS_ACCESS_KEY env var
- Trim Narrative service dropdown, correct "Enterprise" to "Narrative Command"
```

### Stage I — QA and Deploy

**Verification (mirrors `PLAN.md` Stage D's established format):**

```bash
npm run build   # must exit 0
npm run lint    # no new errors beyond pre-existing prettier baseline

# No pricing figures on new pages
grep -E "\\$|₹|€" src/pages/AIAutomationPage.tsx src/pages/DigitalMarketingPage.tsx && echo "FAIL" || echo "PASS"

# App.tsx and StoryGridApp.tsx still in sync
diff src/App.tsx src/StoryGridApp.tsx && echo "PASS: files identical" || echo "FAIL: files diverged"

# sitemap has 14 entries
grep -c "<url>" public/sitemap.xml   # expect 14

# robots.txt unchanged (still only work-policy disallowed)
cat public/robots.txt

# No committed Web3Forms key
grep "VITE_WEB3FORMS_ACCESS_KEY" .env* 2>/dev/null && echo "FAIL: key file committed" || echo "PASS"
```

Run the full Regression Map (Section 10) against `npm run preview` before deploying. Deploy via `vercel deploy --prod` (no `vercel.json` change needed — existing SPA rewrite covers the new routes). Post-deploy, hard-refresh `storygrid.co/ai-automation` and `storygrid.co/digital-marketing` directly to confirm the `App.tsx` mirror (Section 2.3) actually shipped.

**Commit message:**
```
chore: expansion QA verified, deploy complete

Build clean. All grep audits pass. App.tsx/StoryGridApp.tsx confirmed in
sync. Live verification: /ai-automation and /digital-marketing return 200
on direct load, nav dropdown functional, contact questionnaire branches
correctly for all 3 categories, no regressions in Narrative pricing/currency/
tier URLs.
```

---

## 12. Acceptance Criteria

- [ ] `/ai-automation` and `/digital-marketing` are live, reachable via direct URL load (not just client nav), and show zero pricing anywhere.
- [ ] Both pages have distinct meta descriptions, OG/Twitter tags, and `Service` + `FAQPage` JSON-LD.
- [ ] Nav shows a working Services dropdown (desktop) and expand/collapse group (mobile) with all 3 categories; footer shows all 8 flat links.
- [ ] `/services` retains its exact URL, all Narrative prices, and the INR/USD/EUR toggle, unchanged.
- [ ] `/services/starter`, `/services/engine`, `/services/system`, `/services/command` all still resolve correctly.
- [ ] Contact form's category selector branches correctly to 3 distinct field sets; `?service=`/`&tier=` query params preselect correctly from every CTA.
- [ ] Web3Forms payload and mailto fallback both carry category-tagged subjects; no submission is silently discarded (existing guarantee preserved).
- [ ] `sitemap.xml` lists 14 URLs; `robots.txt` unchanged.
- [ ] `App.tsx` and `StoryGridApp.tsx` are identical, both containing all 12 (now 14 with the 2 new) route entries.
- [ ] `vite build` and `eslint .` both pass with no new errors.
- [ ] No client name, metric, or employer linkage appears anywhere in the AI Automation proof point copy — reads as one industry example among many.
- [ ] Brand name "StoryGrid & Co." (exact casing, with the period) is used everywhere new copy appears.

---

## 13. Open Questions for Aneesh

1. **OEM proof point sign-off.** Section 7's exact wording ("A leading OEM manufacturer used AI automation to replace manual order processing and reporting workflows that had run unchanged for years...") is drafted to satisfy the anonymization and "one example among many" framing required by this brief. Please confirm this phrasing is accurate to what actually happened and doesn't reveal anything you'd rather keep unstated.
2. **Web3Forms access key.** Still not obtained (this predates this expansion, per `HANDOFF.md`). This plan switches the code to read `VITE_WEB3FORMS_ACCESS_KEY` from an environment variable so no further code deploy is needed once you have a key, but the key itself still needs to be created at web3forms.com and set in Vercel's project environment variables.
3. **SEO prerendering (Section 3, D7).** Client-side meta/JSON-LD injection ships now, but non-JS crawlers and link-preview scrapers (Slack, LinkedIn, iMessage, X) will keep showing the homepage's static OG tags for the new pages until a build-time prerender step exists. Worth scheduling as a near-term follow-up, or is the current mitigation acceptable for now?
4. **Inquiry routing.** Should AI Automation and Digital Marketing inquiries go to the same `hello@storygrid.co` inbox as Narrative inquiries, or would you want a distinct recipient, subject-based inbox rule, or Slack notification per category, now that the subject line carries a category tag that makes this easy to filter on?
5. **Dedicated OG/social preview images.** All pages currently share one `og-image.png`. Since per-page OG tags won't reach non-JS scrapers anyway (Open Question 3), is it worth commissioning distinct preview images for `/ai-automation` and `/digital-marketing` now, to prepare for when prerendering makes them visible in link previews, or should that wait until prerendering is actually scheduled?
