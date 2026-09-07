# V1.1 validation — 2026-09-07

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
