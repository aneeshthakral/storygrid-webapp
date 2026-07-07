# Service Expansion — Execution Summary

**Branch:** `feature/service-expansion` (pushed to origin, not merged)
**Base:** `master` at `ffc98df` (which itself is `master` at `5170a02` + `EXPANSION_PLAN.md`)
**Contract:** `EXPANSION_PLAN.md` (committed to `master` before branching — see note below)
**Deviations:** See `DEVIATIONS.md` (4 build-ability resequencings, 1 QA-driven copy fix, 1 disclosed
verification gap — no scope changes)

## What changed

Promoted the two embryonic "Surface" and "Signal" sections on `/services` into two full public
service categories, **AI Automation** (`/ai-automation`) and **Digital Marketing**
(`/digital-marketing`), each with its own page, SEO/JSON-LD, and branch in a rebuilt category-aware
contact questionnaire. Narrative Building's existing names, prices, currency toggle, and URLs are
untouched. Neither new category shows a price anywhere; both CTA to the same discovery-call flow
with the correct `?service=` preselect.

Nav gained a "Services" dropdown (desktop, Radix `NavigationMenu`) / expand-collapse group (mobile)
listing all three categories. Footer expanded to 8 flat links. Homepage gained a three-card teaser
section between the founder-story blurb and "Where to Go Next." The contact form now leads with a
category selector that branches its remaining fields, tags Web3Forms/mailto subjects by category,
and reads `?service=`/`&tier=` from the URL to preselect from any CTA.

## Note on `EXPANSION_PLAN.md` placement

The plan was written during a prior read-only phase when git wasn't yet installed in this
environment, so it only ever existed in a local scratch copy — never actually pushed to GitHub.
Before executing, this was surfaced to Aneesh, who chose to have it committed to `master` in its own
commit (`ffc98df`) before branching, the same tier as `PLAN.md`/`HANDOFF.md`. `feature/service-expansion`
branches from that commit.

## File list

**Created:**
- `src/data/services.ts` — `ServiceCategory` data model (narrative / ai-automation / digital-marketing)
- `src/pages/AIAutomationPage.tsx`
- `src/pages/DigitalMarketingPage.tsx`
- `src/hooks/useSeo.ts`
- `src/components/ServiceArmsTeaser.tsx`

**Modified:**
- `src/StoryGridApp.tsx`, `src/App.tsx` — new routes, kept byte-identical (confirmed via `diff` after every stage)
- `src/data/navigation.ts` — Services becomes a nav group; footer expands to 8 links
- `src/components/Navbar.tsx` — desktop dropdown, mobile expand/collapse
- `src/pages/HomePage.tsx` — `ServiceArmsTeaser` inserted per the plan's exact section order
- `src/pages/ServicesPage.tsx` — Surface/Signal inline sections removed, replaced with `ServiceArmsTeaser`; CTAs pass `?service=narrative`
- `src/pages/TierDetailPage.tsx` — CTA passes `?service=narrative&tier=<id>`
- `src/pages/ContactPage.tsx` — category selector, branch fields, query param preselect, subject tags, env-driven access key
- `index.html` — static Organization JSON-LD added
- `public/sitemap.xml` — 12 → 14 URLs

**Explicitly not touched:** `src/data/pricing.ts`, `src/hooks/useCurrency.ts`,
`src/components/CurrencyToggle.tsx`, `src/components/PricingRetainerCard.tsx`,
`src/hooks/usePageTitle.ts`, `src/components/Footer.tsx`, `public/robots.txt`, `vercel.json`,
`src/routes/*`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `src/routeTree.gen.ts`, `PLAN.md`,
`HANDOFF.md` — confirmed via `git diff origin/master...HEAD --stat` against each of these paths
(zero output = zero changes).

7 commits on the branch: plan commit on master, then one per execution stage (E, F, G, H) plus one
QA fix commit.

## How to review

```bash
git fetch origin
git checkout feature/service-expansion
npm install
npm run dev        # or: npm run build && npm run preview
```

Click through: `/`, `/services`, `/ai-automation`, `/digital-marketing`, `/services/starter`,
`/contact` (try all 3 categories in the selector, and try arriving via
`/contact?service=ai-automation` and `/services/starter`'s "Start with Tier 01" button). Resize to
mobile width and check the Services group in the nav drawer.

## QA performed and results

| Check | Result |
|---|---|
| `npm run build` | Clean, 0 errors, after every one of the 5 commits |
| `npm run lint` | 0 new errors introduced (pre-existing baseline: 139 formatting issues across files this branch never touches, matching `HANDOFF.md`'s own precedent that lint carries pre-existing formatting debt) |
| `App.tsx` / `StoryGridApp.tsx` parity | Confirmed byte-identical via `Compare-Object`/`diff` after every stage that touched them |
| All 12 pre-existing routes + 2 new routes | All return HTTP 200 from `vite preview` (`/`, `/approach`, `/services`, `/services/{starter,engine,system,command}`, `/ai-automation`, `/digital-marketing`, `/story`, `/for-teams`, `/resources`, `/contact`, `/privacy`, `/work-policy`) |
| Unknown route | Returns 200 with client-side SPA fallback (same behavior as before — `NotFoundPage` renders client-side, no server 404, matching the existing `vercel.json` rewrite behavior) |
| `sitemap.xml` | 14 `<url>` entries served correctly, includes both new URLs |
| `robots.txt` | Unchanged, still only disallows `/work-policy` |
| Organization JSON-LD in `index.html` | Parsed successfully as valid JSON |
| Service/FAQPage JSON-LD on new pages | Not runtime-verified in a browser (no headless browser available — see below); constructed via `JSON.stringify` over plain data from `services.ts`, which cannot produce malformed JSON, and the shape was code-reviewed against schema.org's `Service`/`FAQPage`/`Question`/`Answer` structure |
| No pricing symbols on new pages | Confirmed via grep (`$`, `₹`, `€`) — zero real matches (only false-positive hits on the `${...}` JS template syntax) |
| No `CurrencyToggle` on new pages | Confirmed via grep — zero matches |
| Brand casing ("StoryGrid & Co.") | Confirmed — all instances correctly cased |
| Zero em dashes in new copy | One violation found and fixed (`armName` field, not part of the rendered Copy Deck — see `DEVIATIONS.md` #4) |
| No real API key committed | Confirmed — only the `REPLACE_WITH_KEY` sentinel and the `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` reference appear |
| `[TO CONFIRM]`/`TODO` placeholders | Zero in shipped copy; `REPLACE_WITH_KEY` remains as the intentional, guardrail-mandated fallback sentinel, never rendered to a user |
| Pre-existing untouched files | Confirmed zero diff against `origin/master` for `pricing.ts`, `useCurrency.ts`, `CurrencyToggle.tsx`, `PricingRetainerCard.tsx`, the TanStack scaffold, `PLAN.md`, `HANDOFF.md`, `robots.txt`, `vercel.json` |

**Not verified (disclosed, not silently skipped):** live browser interaction — clicking the desktop
nav dropdown open/closed, the mobile drawer's expand/collapse animation, actually submitting the
contact form through each branch, and the currency toggle's click-through behavior on `/services`
and `/services/:tierId`. This environment has no headless browser or Playwright/Puppeteer, and
installing one was treated as out of scope (unrelated devDependency, not named in the plan). These
are exactly the kind of checks the Vercel preview deployment is for — please click through them
there before merging.

## Vercel preview

`HANDOFF.md` records that this repo is linked to Vercel project `storygrid-webapp` with git
integration already set up (`vercel link` completed in the prior phase). If that GitHub↔Vercel
integration auto-deploys branches, pushing `feature/service-expansion` should produce a preview at
a URL following Vercel's standard pattern, approximately:

```
https://storygrid-webapp-git-feature-service-expansion-<vercel-team-or-username>.vercel.app
```

This URL is **inferred from Vercel's naming convention, not confirmed** — this session has no
access to the Vercel dashboard/API to verify the integration fired or to read back the actual URL.
Check the Vercel dashboard or the GitHub PR checks (if one is opened) for the actual link.

## Outstanding owner actions

1. **Web3Forms access key (carried over from the prior phase, still open).** The form now reads
   `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`, falling back to the same `REPLACE_WITH_KEY` sentinel
   and mailto behavior as before. Get a key at web3forms.com, set `VITE_WEB3FORMS_ACCESS_KEY` in
   Vercel's project environment variables, and redeploy. No code change is needed once that's done.
2. **AI Automation proof point copy sign-off** (Open Question 1 in `EXPANSION_PLAN.md`) — the
   anonymized OEM manufacturer outcome block on `/ai-automation` needs your confirmation that the
   phrasing is accurate and doesn't reveal more than intended.
3. The remaining 4 open questions from `EXPANSION_PLAN.md` Section 13 (SEO prerendering roadmap,
   inquiry routing/notification preferences, dedicated OG images for the new pages) are still open
   and weren't decisions this execution phase was authorized to make.

## Not done, by design

No merge to `master`. No production deploy. `PLAN.md` and `HANDOFF.md` were not touched.
`routeTree.gen.ts` and `src/routes/*` were not touched. No new npm dependencies were added (Radix
`navigation-menu` was already an installed, unused dependency — this expansion is its first real
usage, per the plan's Section 2.8).
