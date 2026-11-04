# V1.1 validation — 2026-09-07

## Final V1 production pass — 2026-09-07

This pass was performed locally against the existing clean `main` baseline, b0ee8d7. No commit, push, or deployment was performed.

- Inspected App Router layout/page, all section/UI components, Three.js implementation, theme bootstrap/store, contact adapter, responsive CSS, dependencies/scripts, prior tests, and Git history.
- Added a centralized production origin, concise description, canonical URL, explicit Open Graph URL, large-image Twitter card, static social PNG, SVG favicon, Apple icon, robots.txt, and single-page sitemap. Retained the approved title, page content, layout, and palette.
- Verified the local production server: homepage, social PNG, SVG favicon, Apple PNG, robots.txt, and sitemap.xml return HTTP 200 with the correct content types; an unknown route returns 404. Inspected the served HTML for absolute production metadata, image dimensions/alt text, and icon links. Exactly one H1; all internal fragment targets exist.
- Visually inspected the generated 1200 × 630 social image and 180 × 180 icon. Both render cleanly. Preview PNG is approximately 49 KB. All new routes are statically prerendered; no new client JavaScript or dependencies were added.
- Accessibility source review: skip link, semantic sections/headings, labeled theme toggle, native menu/contribution buttons, collapsed panel inert state, visible focus styles, labeled form fields, and reduced-motion branches remain intact. Hero has an accessible image label and no keyboard controls. No UI accessibility changes were needed based on this review.
- Targeted contrast calculation across body text tokens (text, muted, secondary-text, accent-muted) and primary/secondary/card/hover surfaces: minimum 7.02:1 in dark mode and 4.69:1 in light mode. This is not a full WCAG audit.
- Verified configured email, GitHub, and LinkedIn destinations against the requested values. External social links use noopener/noreferrer. Contact draft encoding and native validation were inspected; no message was sent. External destinations were not independently fetched during this pass.
- Existing lazy Three.js loading, capped DPR/shadows, hidden/off-screen render suspension, static mobile/reduced-motion/WebGL fallback, font display swap, and pre-paint theme bootstrap retained. No speculative performance refactor. JSON-LD omitted: existing semantic content and metadata are sufficient for this lightweight V1; no rich-result benefit is asserted.
- ESLint passes with zero warnings; TypeScript passes; all nine existing automated theme/motion tests pass; production build passes and prerenders all routes. No build warnings observed. Earlier notes record an upstream Three.js Clock browser warning; its current runtime status was not rechecked.
- Limitation: fresh interactive desktop/mobile (390px/430px), theme, WebGL, hydration, browser-console, and social-platform crawler QA was not completed. Earlier browser access was rejected by automatic approval review because of a usage limit. The historical browser results below are prior evidence, not a fresh verification of this pass. CSS/layout were unchanged.
- Remaining: perform a fresh browser interaction check when browser access is restored, then inspect live sharing previews after a separately authorized deployment. No manual assets or required new Vercel settings are pending; check an existing NEXT_PUBLIC_SITE_URL override if present.

## Historical V1.1 checks (before this pass)

- ESLint: passes with zero warnings.
- Strict TypeScript: passes.
- Next.js production build: passes; homepage statically prerendered.
- Nine automated tests: both OS theme defaults, manual preference precedence, invalid/blocked storage, live OS updates, cross-tab synchronization, listener cleanup, and reduced-motion/static-scene behavior.
- Browser: desktop 1280px, mobile 390px and 430px, tablet 820px, in light and dark themes. No horizontal overflow observed. Tablet headline wrapping adjusted after visual review.
- Theme toggles with mouse and keyboard; selected theme survives reload. Initial browser OS preference was dark and rendered dark. Bootstrap confirmed in the document head before the body. Light OS behavior and reduced-motion variants were tested in isolation without changing the computer's settings; they were not forced through browser media emulation.
- All four work panels expand and collapse. Expanded-state labels and inert collapsed regions verified; Enter/Space keyboard operation checked.
- Navigation destinations, active underlines, heading clearance, mobile menu, and Escape dismissal verified.
- Contact controls and focus states reviewed; mailto submission intentionally not sent.
- Body/metadata foreground tokens meet 4.5:1 against their tested main, secondary, card, and hover surfaces in both themes. This is a targeted contrast check, not a full WCAG audit.
- Desktop WebGL rendering and theme-specific sculpture materials visually reviewed; mobile uses the themed CSS sculpture. Reduced-motion branch and WebGL-unavailable branch covered by tests.
- No browser errors in the final build. A pre-existing React Three Fiber / Three.js Clock deprecation warning remains. The shadow-map deprecation encountered during development was fixed.
- No new client identities, proprietary names, fabricated projects, metrics, or phone number introduced. No deployment, commits, or pushes.

Intentional placeholders: unpublished independent work; public résumé omitted; final site origin unset; contact remains an email draft until an email adapter is configured.

## Independent project showcase — 2026-10-30

Branch: `codex/independent-project-showcase`. No push, merge, or deployment.

### Automated validation

- `pnpm lint`: passed.
- `pnpm typecheck`: passed after regenerating stale Next route types.
- `pnpm test`: 13 passed (9 existing, 4 project tests).
- `pnpm build`: attempted; failed first fetching the existing Geist font under restricted network access, then with a Turbopack CSS worker process error outside the sandbox. The script has not been silently changed.
- `pnpm exec next build --webpack`: passed on the final source, including TypeScript, static generation of all three project pages, and production optimization.
- `git diff --check`: passed.

### Browser validation against the production build

- Desktop at 1440 x 1000 and mobile at 390 x 844; dark and light visual checks.
- Cards open the intercepted native dialog over the portfolio.
- Close, Escape, Back, and Forward exercised; Back/Escape restore focus to the originating card and release body scroll locking.
- Related-project navigation replaces the modal history entry; Close returns to the portfolio.
- Initial focus lands on Close; native dialog makes background content inert. Keyboard navigation exercised within the dialog. No separate screen-reader or physical iOS/Android device audit performed.
- Kitchain, Elio, and Avenor direct pages render without a modal. Refresh of modal URL becomes a standalone detail page.
- Canonical URLs and standalone titles inspected. Unknown project displays 404.
- Mobile layouts checked for horizontal overflow; none observed. Long modal content scrolls with Close kept accessible.
- Kitchain/Elio live links match the supplied URLs; Avenor has no live action. No application repository buttons or screenshots are rendered.
- Existing enterprise work component and enterprise content data remain unchanged.

### Content provenance and limitations

Read-only documentation review found local copies in sibling `kitchain-app`, `Invoice` (Elio), and `executive-automation` (Avenor) directories. Initial descriptions remain concise. Local documentation identifies court discovery as Kitchain's current focus and Avenor sending as simulated. Elio's local README predates the deployment reported by the owner; deployed status follows the owner's supplied URL and instructions. No feature completeness or production-readiness claim is made. No other repository was modified. Detailed feature lists, technology/architecture narratives, and actual screenshots are deferred.

No dependencies were added. Browser QA was performed in the available Chromium-based in-app browser; other browser engines and physical devices remain for subsequent review. The existing reduced-motion suite passed; the dialog has no animation, and cards reuse the existing reduced-motion-aware Reveal component.

### Local review

Run `pnpm dev` (or `pnpm exec next dev --webpack` if the local Turbopack worker issue recurs), then open `http://localhost:3000/#independent`. For the verified production path, run `pnpm exec next build --webpack` and `pnpm start`. Test each card, Escape, Back/Forward, related links, theme toggling, and direct `/projects/kitchain`, `/projects/elio`, `/projects/avenor` URLs. Use `git diff` plus `git status --short` to review modified and newly added files.

## Final local review — 2026-10-31

This supersedes the October 30 build limitation above. Branch remains `codex/independent-project-showcase`; changes are uncommitted. No push, merge, deployment, or sibling application repository changes.

### Visual and functional results

- Started the requested `pnpm exec next dev --webpack` and reviewed the existing implementation without redesigning it.
- Reviewed Independent Work and Kitchain, Elio, and Avenor modals at 1440px, 390px, and 430px in dark and light themes. Captured 24 actual browser screenshots (six section views and eighteen modal views). No visual defect requiring a code change was found. Card alignment, typography, spacing, modal sizing, scrolling, and accessible Close placement remained consistent. No horizontal overflow in the modal matrix.
- Verified card navigation, Close, Escape, initial focus, keyboard containment, focus restoration, background scroll locking, browser Back/Forward, and related-project replacement navigation. Related navigation resets modal scroll and focuses Close; closing restores focus to the corresponding homepage card.
- Verified direct URLs for all three projects, standalone rendering on refresh, titles/canonicals, and unknown-project 404 behavior.
- Final default production build smoke: Kitchain opened as a dialog, related Avenor navigation worked, Escape returned to the homepage with focus on project-avenor and released the body scroll lock. HTTP checks returned 200 for the homepage and all three project pages; unknown project returned 404.
- Production console showed the existing THREE.Clock deprecation warning, with no error in the smoke flow. Development also emitted a React inline-script warning during 404 navigation; no visible failure occurred. Neither warning was introduced or changed in this review.
- Screenshot gallery: C:/Users/Jm/.codex/visualizations/2026/10/30/01a18cd6-b38b-7461-ae14-ff9030421ebd/final-review/index.html

### Build investigation and configuration

- Default `pnpm build` (Turbopack) passed repeatedly, including after removal of only the generated repository `.next` directory and again after the Node engine pin. Font fetching, CSS compilation, TypeScript, and static generation completed successfully.
- Earlier font network and CSS worker failures did not reproduce with normal network/process permissions. Evidence points toward an environment/transient failure, but the precise original cause is not established. No font replacement, webpack production override, dependency upgrade, or architecture change was justified.
- Added `engines.node: 24.x` to package.json to match the validated local Node 24.19.0 runtime and avoid an inherited obsolete runtime. Vercel supports this major and honors the package engine range. Build script stays `next build`.
- Vercel's standard Next.js preset uses the package build script unless dashboard settings override it. Local Windows success does not verify Vercel's Linux build or existing project settings. A separately authorized preview deployment remains the remote integration check.
- References: https://vercel.com/docs/builds/configure-a-build ; https://vercel.com/docs/functions/runtimes/node-js/node-js-versions ; https://vercel.com/changelog/node-js-20-is-being-deprecated ; https://vercel.com/docs/builds/build-image ; https://nextjs.org/docs/app/api-reference/turbopack

### Final validation and review scope

- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm test`: 13 passed, zero failed.
- `pnpm build`: passed using default Turbopack, including all latest modal implementation edits already present at the start of this review.
- `git diff --check`: passed.
- All requested validation scripts exist. Browser checks used the available Chromium-based in-app browser; no physical device, Safari/Firefox, or full screen-reader audit is claimed.
- Files changed during this review: package.json (Node engine), README.md (current instructions), VALIDATION.md (this report). Next dev also generated AGENTS.md and CLAUDE.md, retained according to the supplied repository instructions. Application source, components, CSS, dependencies, and application data were not edited during this review. Earlier showcase changes remain in the working tree for review.
- Ready for commit and a Vercel preview, subject to reviewing the uncommitted changes. No preview deployment has been performed. Temporary review servers are stopped at completion.

To review locally: use Node 24.x, run `pnpm exec next dev --webpack`, and visit http://localhost:3000/#independent. Production path: `pnpm build`, then `pnpm start`. Direct routes are /projects/kitchain, /projects/elio, and /projects/avenor. Inspect `git diff` and `git status --short` together to include the new untracked implementation files.

## Portfolio V2 release review — 2026-11-04

This entry supersedes the earlier showcase-only scope and build limitations. Feature branch: `codex/portfolio-v2-live-previews`, based on deployed commit `80d2fe7`. The owner authorized feature commit/push, preview verification, main integration and production deployment after passing checks.

### Implementation and evidence

- Added source-verified technical case studies for Kitchain, Elio and Avenor: grouped technologies, architecture, five bounded features each, current milestone, roadmap and engineering contribution. Public availability is distinguished from local implementation and planned work. See PROJECT_EVIDENCE.md for source paths and conflicting/stale documentation decisions.
- Kitchain offers an opt-in live iframe inside the existing native dialog, with return, maximize/restore, reload help and external fallback. No iframe is mounted before launch. Standalone pages support the same opt-in preview.
- Elio blocks framing with X-Frame-Options DENY; only its external action is offered. Its public synthetic read-only demo was exercised externally. Avenor remains local with no live action. No application repository links or fabricated media are displayed.
- Fixed stale parallel-slot dialogs after history restoration and explicit Close after iframe joint-history navigation. Preview return destroys the iframe and restores launcher focus.
- Selected Work, hero, enterprise data and theme implementation remain unchanged. No sibling application repository was modified.

### Final validation

- `pnpm lint`: passed; `pnpm typecheck`: passed; `pnpm test`: 22 passed, zero failed.
- `pnpm build`: passed with Next.js 16.4.1, default Turbopack and Node 24. No webpack production override. Font fetch and CSS worker failures did not recur.
- Final production server HTTP checks: homepage, all three project pages and sitemap 200; unknown project 404. Canonical URL verified after direct navigation and refresh.
- `git diff --check`: passed (only Windows line-ending conversion notices).
- Browser matrix: 1440, 768, 390 and 430px, both themes, all three project dialogs. Final production build repeated all 24 detail states: no horizontal overflow, body scroll locked, no premature iframe. Earlier section/preview matrix and deep case-study screenshots retained.
- Verified real Kitchain rendering and public filter interaction in iframe, return/unmount, maximize/restore, explicit Close, Escape from portfolio controls, focus restoration, keyboard containment, related navigation, Back/Forward, direct URLs and refresh. Final production smoke repeated preview close/history and standalone mobile preview.
- Console: existing THREE.Clock deprecation warning; no error in the final smoke flow. Chromium-based browser only; no Safari, Firefox, physical-device or full screen-reader certification.
- Screenshots and logs: C:/Users/Jm/.codex/visualizations/2026/10/30/01a18cd6-b38b-7461-ae14-ff9030421ebd/portfolio-v2/index.html.

### Dependency security assessment

The original dependency audit reported critical/high advisories in the existing Next/sharp tree. Updated Next and matching eslint-config-next to exact 16.4.1, obtaining sharp 0.35.5, and applied compatible source-map-js, brace-expansion, zod and minimatch lockfile updates. No new direct dependency or unrelated major tooling upgrade was introduced.

- `pnpm audit --prod`: zero known vulnerabilities.
- Full `pnpm audit`: one moderate development-only minimatch advisory, GHSA-g3hv-75wg-m249. It concerns attacker-controlled glob patterns with optimizationLevel >= 2; the remaining packages are in ESLint tooling, outside the production dependency tree. No visitor-controlled glob input is exposed by this portfolio. Assessed nonblocking for this deployment, not described as a clean full audit. Forcing minimatch 11 over ESLint's older API was avoided; follow an upstream-compatible tooling update.
- ESLint 9 emits an upstream deprecation notice. This is separate from runtime security and is recorded for later maintenance.
- Relevant advisories: https://github.com/advisories/GHSA-673q-mjm6-r5xr ; https://github.com/advisories/GHSA-2464-fhr4-w9xw ; https://github.com/advisories/GHSA-wq5f-xc86-pv6w ; https://github.com/advisories/GHSA-g3hv-75wg-m249.

### Browser/security limits

The iframe has an exact HTTPS allowlist and restricted sandbox/permissions. No proxy, credential handling or application security changes were introduced. Cross-origin load events cannot prove successful rendering; persistent external controls and delayed reload help remain available. Escape inside the embedded application's document cannot be intercepted by the portfolio; Tab/Shift+Tab returns to persistent parent controls. Browser Back may traverse the embedded application's joint-history entries first; explicit Close exits the overlay. Authenticated cross-site flows are not claimed as supported.

Remote preview and production verification are recorded in the final delivery report after this commit. Local success alone is not evidence of Vercel build success. Local review: Node 24.x, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm start`; visit `/`, `/projects/kitchain`, `/projects/elio` and `/projects/avenor`.
