# Portfolio V2 content and embedding evidence

Reviewed 2026-10-31. Application repositories were read only. No credentials, account files, environment secrets, mailbox messages, or private application data were copied into the portfolio. This document records provenance, not a claim of application certification. Feature labels distinguish inspected local code from publicly exercised behavior.

## Kitchain

Local source: sibling `kitchain-app`, latest inspected commit `410bfa6` (paddle comparison). Recent history attributes the implementation to John Marie Naidas; the portfolio does not claim exclusive authorship.

- `frontend/package.json`, `backend/Kitchain.Api/Kitchain.Api.csproj`, and `backend/Kitchain.Infrastructure/Kitchain.Infrastructure.csproj`: Angular 22, TypeScript, SCSS/RxJS, .NET 8, EF Core, PostgreSQL/Npgsql, SignalR, Vitest/xUnit. `frontend/vercel.json` confirms the Vercel-to-Render API rewrite. Docker and layering are documented in README/architecture.
- `frontend/src/app/app.routes.ts`: Courts, detail/submission/review, Play session, Gear catalog/detail/comparison routes.
- `backend/Kitchain.Api/Play/PlaySessionsController.cs` and `PlayHub.cs`: session/guest/game/scoring operations and post-commit SignalR notifications. Source explicitly says organizer/player authorization is not implemented in this foundation.
- `backend/Kitchain.Api/Gear/GearPaddlesController.cs`: published catalog and detail reads.
- `docs/gear-paddle-comparison.md`: G4 local acceptance, two/three variant selection, URL restoration, difference/evidence rules, and planned G5 PaddleMatch. No recommendation/scoring completion claim.
- README, `docs/architecture.md`, `docs/gear-catalog.md`, and `docs/gear-foundation.md` provide context. README still describes Phase 2B and says Gear/Play are unimplemented; that is superseded by actual routes/controllers and later Gear documentation. No fabricated single overall phase is assigned.

Public check: `/courts` returns 200 without X-Frame-Options or CSP frame-ancestors. Actual iframe renders the application; entering Makati and applying filters changes the embedded URL and returns an explicit zero-results state. No booking, submission, session mutation, authentication, or populated venue acceptance test was performed. Local Gear/Play implementation is not labeled publicly verified.

## Elio

Local source: sibling `Invoice`, latest inspected commit `850dabe` (secure read-only portfolio demo), following gateway and deployment preparation commits. Recent history attributes work to John Marie Naidas without establishing exclusive authorship.

- `frontend/package.json`, backend Infrastructure project: Angular 22, Signals/TypeScript, .NET 10, EF Core/Npgsql, ASP.NET Identity, PDFsharp-MigraDoc, Vitest/xUnit. `Email/ResendEmailSender.cs` implements the email transport boundary.
- `backend/src/Elio.Api/Invoices/InvoicesController.cs`: draft editing, finalization, delivery history and PDFs.
- `Identity/IdentityConfiguration.cs`: HttpOnly secure production session cookie with SameSite=Lax; antiforgery cookie SameSite=Strict. Existing CSRF protections remain necessary.
- `Identity/DemoAccess.cs` and `docs/demo-mode.md`: dedicated Demo identity/membership, reviewed endpoint allowlist, mutation guards, absolute expiry, synthetic data and operator acceptance requirements. Local completion does not prove deployed seed/settings.
- `docs/architecture.md`: tenant checks, domain issuance, frozen financial records, durable delivery history, manual payments, due-date/aging projections and dashboard. README describes V1 exclusions; deferred items are not promised releases.
- `frontend/vercel.json`: authenticated gateway routing and X-Frame-Options=DENY. README's claim that deployment has not occurred is stale relative to the owner's live URL and observed deployment. The latest source milestone is Phase 9C; authenticated production workflow acceptance is not asserted.

Public `/login` returns 200 and **X-Frame-Options: DENY** (no CSP in the checked response). A temporary local iframe test failed to render Elio; the test file was removed. The shipped portfolio never attempts an Elio iframe. Its external link opens the real sign-in page. Try Demo successfully entered a clearly labeled synthetic read-only dashboard after a service wait; no credentials or real-account data were used. This supports public availability of that limited demo, not full production/security acceptance.

Enabling Elio embedding would require separately approved application work: evaluate a narrowly scoped `frame-ancestors https://johnmarienaidas.vercel.app` policy and reconcile conflicting X-Frame-Options at the frontend/gateway/API layers. That alone is insufficient: cross-site session and antiforgery cookie behavior, OAuth/login navigation, clickjacking and third-party-cookie restrictions need a complete design and browser acceptance test. Do not simply change SameSite or remove protections. No such change is authorized or implemented here.

## Avenor

Local source: sibling `executive-automation`, inspected commit `979852e` plus current documentation. Recent history attributes the foundation and AI implementation to John Marie Naidas; independent evaluation is a separate responsibility.

- `frontend/package.json`, Infrastructure project and README: Angular 22, .NET/EF Core 10, PostgreSQL, ASP.NET Identity, Worker, Docker, xUnit, Vitest and Playwright.
- `JobProcessor.cs`: SKIP LOCKED claims, leasing/fencing, persisted dispatch, bounded retry and uncertain-outcome handling. Sending remains simulated.
- `AiProviders.cs`: local Ollama provider and deterministic demo provider. Gemini is reserved/non-live; AI is disabled by default.
- `GmailService.cs`: read-only OAuth, preview/confirmed imports, local analysis, review, retention and disconnect boundaries. No mailbox content was inspected or published for this portfolio task.
- README and `docs/05-development-roadmap.md`: M1 foundation, M2 email intelligence, later calendar/approved sending/actions/Telegram/briefings. Later milestones are plans, not implemented features.
- `docs/17-m2d-benchmark-freeze-procedure.md` and `docs/17-m2d-final-adjudication-checklist.md`: latest Phase 1E reconciliation distinguishes owner approval, technical review and independent adjudication. Benchmark remains unfrozen; M2 quality remains FAIL and Phase 2 is not authorized. Earlier completion language cannot establish acceptance.

No live URL or preview action. No model run, benchmark freeze, sending, production authorization or application change was performed.

## Portfolio preview boundary

- A single native dialog switches between detail and preview modes; standalone pages create that dialog only on request. Iframes unmount on return/close. No automatic iframe request occurs on the homepage or detail page.
- `getPreviewUrl` requires deployed status, verified embedding, matching slug and an exact approved HTTPS URL. Only Kitchain is approved. Query parameters cannot supply an arbitrary iframe URL.
- Sandbox permits scripts, same-origin identity within the **cross-origin** application, and forms. Popups, top-level navigation, downloads and privileged device permissions are not granted. External browsing is a separate visitor action. No proxy, credentials, cookies, tokens, postMessage trust, or login workaround is introduced.
- Cross-origin content cannot be introspected by portfolio JavaScript. A load event is not proof of successful rendering. A delayed help/reload control and an always-available external link handle browser/network failures without claiming automatic health detection.
- Browser Back/Forward retains native project-route behavior. Navigation inside a cross-origin iframe can add joint-history entries; Back may first traverse those application entries. Explicit Close always leaves the overlay, and Project details destroys the frame and restores launcher focus.
- Escape works when focus is in portfolio controls. Key events inside a cross-origin application do not propagate to the parent; Tab/Shift+Tab can return to the persistent controls and explicit Close is available. No security restriction is bypassed to intercept application input.
- Kitchain is unauthenticated for the exercised public flow. No claim is made about third-party authenticated sessions, OAuth, Safari/Firefox, or physical mobile devices.

Browser behavior references: [MDN iframe events and sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe), [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy).
