# Deviations from EXPANSION_PLAN.md

All deviations below are sequencing/build-ability corrections, not scope changes. Every file the
plan named was created or modified as specified; only *which stage* a few edits landed in changed,
because the plan's Stage E/F/G split (Section 11) would have produced non-building intermediate
commits if followed literally. The mandatory per-stage gate (`npm run lint` + `npm run build` clean
before every commit) forced these three re-sequencings. No copy, data, route, or feature was added,
removed, or reinterpreted.

## 1. `src/data/navigation.ts` restructuring moved from Stage E to Stage G

**Plan said:** Stage E modifies `src/data/navigation.ts` (flat `mainNavLinks` → `mainNavEntries`).

**Problem:** `src/components/Navbar.tsx` imports `{ mainNavLinks }` from that file and is not
modified until Stage G. If `navigation.ts` drops the `mainNavLinks` export in Stage E while
`Navbar.tsx` still imports it, `vite build` fails immediately (confirmed: this was hit and reverted
during execution, see build error `"mainNavLinks" is not exported by "src/data/navigation.ts"`).

**Resolution:** `navigation.ts` was restructured in Stage G, in the same commit as `Navbar.tsx` (its
only consumer). Stage E shipped only `src/data/services.ts` and the `sitemap.xml` update — both
buildable in isolation.

## 2. Route wiring in `src/StoryGridApp.tsx` / `src/App.tsx` moved from Stage E to Stage F

**Plan said:** Stage E adds the `/ai-automation` and `/digital-marketing` `<Route>` entries.

**Problem:** Those routes reference `AIAutomationPage` and `DigitalMarketingPage`, which are not
created until Stage F. Wiring the routes before the pages exist is a compile error by construction.

**Resolution:** Route wiring (in both files, kept byte-identical per the plan's Section 2.3 finding)
happens in Stage F, alongside the two new page components.

## 3. `src/components/ServiceArmsTeaser.tsx` creation moved from Stage G to Stage F

**Plan said:** Stage G creates `ServiceArmsTeaser` and uses it on `HomePage` and `ServicesPage`.

**Problem:** The plan's own File-by-File Change Map (Section 5) specifies that
`AIAutomationPage.tsx` and `DigitalMarketingPage.tsx` (both Stage F) each render
`<ServiceArmsTeaser currentId="..." />`. The component must exist before those Stage F pages do.

**Resolution:** `ServiceArmsTeaser` was created in Stage F (its two hardest dependents), and Stage G
only adds its two additional usages (`HomePage.tsx`, `ServicesPage.tsx`) plus the nav/navigation.ts
work. No change to the component's design, props, or copy from Section 5/7's spec.

## 4. `armName` data field: em dash replaced with parenthetical

**Plan said (Section 6):** `armName: "Surface — Build Arm"` / `armName: "Signal — Digital Marketing Arm"`.

**Problem:** The mandatory QA pass (search-the-diff, "zero em dashes in new copy") flagged these two
literal string values. `armName` is not part of the verbatim Copy Deck (Section 7) — it is an
internal data-model field from Section 6 that is not currently rendered anywhere in either new page
(both pages use `category.eyebrow`, not `category.armName`, for their displayed kicker). Since the
QA gate is explicit and absolute and this field has zero current visual impact, the em dash was
replaced with the codebase's existing parenthetical convention (matching the pre-existing contact
dropdown style, e.g. `"Surface (Build & AI Automation)"`).

**Resolution:** `armName: "Surface (Build Arm)"` / `armName: "Signal (Digital Marketing Arm)"`. If a
future stage renders `armName` as visible copy, this wording should be revisited with Aneesh before
shipping, since it was not part of his approved Copy Deck sign-off.

**Not a deviation, flagged for clarity:** The page `<title>` values (e.g.
`` `${category.name} — StoryGrid & Co.` ``) still use an em dash. These are Section 7 Copy Deck
verbatim content and match the em-dash title convention already used by every existing page in the
codebase (`"Services & Pricing — StoryGrid & Co."`, `` `${tier.name} — StoryGrid & Co.` ``, etc.), so
they were left as specified rather than "fixed."

## 5. QA verification could not include live browser/console checks

The execution guardrails and QA checklist ask for `npm run preview` to "serve without console
errors" and for interactive checks (nav dropdown open/close, mobile drawer, form submit flow,
currency toggle click-through). This environment has no headless browser or Playwright/Puppeteer
installed, and installing one was out of scope (it would add an unrelated devDependency not named
in the plan). What was actually verified, and how, is detailed in `SUMMARY.md`'s QA section —
HTTP-level route checks, static content/grep audits, JSON-LD parse validation, and code-level
diffing were used instead of a live browser pass. This is disclosed rather than silently assumed
clean; Aneesh should click through the Vercel preview deployment himself before merging.
