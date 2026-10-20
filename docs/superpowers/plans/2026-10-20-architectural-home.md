# Architectural Homepage Implementation Plan

**Goal:** Give the homepage an immersive architectural hero inspired by the Velorah reference, with clear access to shopping.

**Approved direction:** Full-width architectural still image, the headline “Every great build starts right here.”, elegant serif display typography, transparent navigation becoming white on scroll, Shop materials and Explore categories actions, pure white shopping sections, restrained motion. Assume a finished building rather than an active site.

**Architecture:** Retain the server-rendered homepage and all catalog sections. Adapt the existing client Header only on `/`; preserve search suggestions, cart, account, and mobile navigation. Use a local optimized original image and system Georgia for the display face; retain locally hosted Inter elsewhere. No new dependencies.

## Tasks

- [x] Create and save an original architectural image in `public/images/`, with its generation prompt recorded in docs.
- [x] Replace the homepage hero in `src/app/page.tsx`; retain catalog links and products, add `#essentials` anchor.
- [x] Add homepage transparent/solid header states in `src/components/Header.tsx`; retain internal navigation and keyboard/mobile behavior.
- [x] Add scoped hero styles, readable overlays, responsive sizing and reduced-motion behavior in `src/app/globals.css`.
- [x] Run lint, typecheck, unit tests, HTTP smoke checks, production build; inspect desktop/mobile header, search, navigation, and cart.

## Review focus

- A visitor restoring scroll position must receive the solid header.
- Opening mobile navigation over the hero must provide opaque readable links.
- Home-to-category navigation must restore the existing internal header.
- Long mobile headlines and search controls must not overflow.
- Reduced-motion users must receive visible content without animation.

## Execution notes

Implement directly in the user's existing checkout for the active preview; no deployment or publishing. Existing approved design and “Yes Please” authorize implementation without another approval round. Visual changes use browser verification rather than tests mirroring CSS classes.

## Verification results

- ESLint, TypeScript, changed-file Prettier check and `git diff --check`: passed.
- Vitest: 11 tests passed. HTTP smoke suite: 6 tests passed, including the new hero image availability check.
- Production: `npm run build -- --webpack` passed. Default Turbopack build could not bind its CSS helper process port in this environment (EPERM); no bundler settings or package scripts were changed.
- Browser: desktop 1280px, mobile 390px and 320px without horizontal overflow; hero image loaded. Search suggestions, keyboard focus, opaque mobile menu, scrolled white header, restored scroll, category action and internal header confirmed. Pure-white body and scrolled header verified.
- Source review: fixed white-on-white menu hover. Browser review: fixed search placeholder color after switching to the solid header.
- Original hero image is 344KB, stored locally; full prompt recorded in `docs/architectural-hero.md`.
