# John Marie Naidas — Portfolio

Next.js App Router portfolio with React, strict TypeScript, Tailwind CSS, Motion, Three.js, React Three Fiber, and Drei. Existing production site: https://johnmarienaidas.vercel.app/.

## Run

Requires Node.js 20.9+ and pnpm (the lockfile is authoritative).

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Production checks: `pnpm lint`, `pnpm typecheck`, `pnpm build`. Serve the production build using `pnpm start`.

## Content and structure

- `data/portfolio.ts`: capabilities, anonymized professional work, career history, principles. Work slugs are ready for future `/work/[slug]` routes; V1.1 uses keyboard-accessible Motion contribution panels.
- `components/three/`: lazy-loaded custom five-layer sculpture. Restrained damped pointer response and idle signal motion; animation pauses off-screen and in hidden tabs. Mobile, reduced motion, WebGL failure, and loading use a static CSS sculpture. No textures or postprocessing; DPR capped at 1.5.
- `components/sections/`: work and contact UI.
- `lib/contact.ts`: isolated mailto adapter. The form validates and opens an email draft; it never claims delivery. No data is stored or transmitted to a server.
- `app/globals.css`: responsive visual system, focus states, reduced-motion rules.
- `app/layout.tsx`: metadata and self-hosted-at-build Geist via Next Font.

## Before eventual publishing

`lib/site.ts` defaults to the existing production origin. Set `NEXT_PUBLIC_SITE_URL` only to override it (for example, after moving to a custom domain). Canonical, Open Graph, sitemap, and robots metadata share this configuration. Contact intentionally uses an email draft without a backend. A résumé link is omitted until a public PDF is supplied and approved. Independent work contains no fictional projects. Confirm career dates and availability remain current before publication.

The 1200 × 630 social preview (`app/opengraph-image.tsx`) and 180 × 180 Apple icon (`app/apple-icon.tsx`) are generated as static PNGs during the build. `app/icon.svg` supplies the browser favicon. No manual asset upload or new Vercel configuration is required. If Vercel already defines `NEXT_PUBLIC_SITE_URL`, ensure it matches the public origin. Social services may cache old previews until their next refresh after an approved deployment.

Compatible with standard Vercel Next.js hosting. No domain, paid service, credentials, or deployment configuration is required for local use.

## V1.1 refinements

Semantic dark/light tokens live in `app/globals.css`; `lib/theme.ts` applies the saved or OS preference before body paint. `components/ui/theme.tsx` observes OS and cross-tab changes, persists manual choices, and keeps the navbar toggle and Three.js materials synchronized. No theme dependency was added.

The sculpture uses varied, offset planes and two signal routes, with distinct light/dark materials and bounded shadow resolution. Mobile, reduced-motion, loading, and WebGL failure use a themed static sculpture. The navigation tracks active sections; contribution panels use labeled buttons, expanded state, inert collapsed regions, and reduced-motion transitions. Independent work remains intentionally unpublished; contact still opens an email draft.

Run `node --test tests/theme.test.mjs` for theme preference and fallback checks. Browser validation covers desktop, 390px, 430px, and 820px in both themes. OS preference combinations are additionally exercised in isolated tests without changing the computer’s settings.
