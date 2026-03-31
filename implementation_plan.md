# Enterprise Flawless Optimizations

This implementation plan addresses the senior-level review points to take the Fractal Website from "excellent" to "Enterprise Flawless". The focus is on performance, type safety, and seamless UX without FOUC.

## User Review Required

> [!WARNING]
> Moving the redirect to Cloudflare Pages edge (`functions/_middleware.ts`) requires that the site is actually hosted on Cloudflare Pages. Please confirm that we are deploying to Cloudflare and will be using Cloudflare Functions.

> [!NOTE]
> We will be moving static logo images from `public/images/clients/` to `src/assets/images/clients/` so Astro's image optimization engine can process them at build time. 

## Proposed Changes

### 1. Edge/Server-Side Redirection (FOUC Fix)
We will implement a Cloudflare Pages middleware that inspects a `lang` cookie and the `Accept-Language` header to perform HTTP 302 redirects *before* the browser receives HTML.
- Update `Layout.astro` and `Navbar` components to set a `lang` cookie rather than (or alongside) `localStorage`.
- Remove the client-side `<script is:inline>` redirect block in `Layout.astro`.

#### [NEW] functions/_middleware.ts
Create a Cloudflare Pages function to intercept root requests (`/`) and english route requests (`/en/*`), check the `lang` cookie, and redirect immediately if needed.

### 2. Image Optimization (Astro:assets)
Move images to `src/assets` and use the built-in `<Image />` component. Since paths are dynamic, we will use `import.meta.glob`.

#### [MODIFY] src/components/ClientsMarquee.astro
- Import `<Image>` from `astro:assets`.
- Add `const images = import.meta.glob('/src/assets/images/clients/*.{jpeg,jpg,png,gif}');`
- Replace `<img>` tags with `<Image src={images[`/src/assets/images/clients/${client.domain}.png`]()} ... />`.

#### [MODIFY] src/templates/CustomersTemplate.astro
- Apply the same `<Image>` and `import.meta.glob` approach used in the Marquee.

### 3. Type Safety (TypeScript + Zod)
Ensure full type safety for the `clients.json` import to prevent runtime errors.

#### [NEW] src/types.ts
- Define a Zod schema `clientSchema` and infer its TypeScript interface.
- Create a utility or just type the import where `clients.json` is loaded.

#### [MODIFY] src/data/clients.json (Implicit)
- Validate the JSON against the new Zod schema dynamically in a shared utility or directly in components.

### 4. Non-Blocking Accessibility Script
Delay the execution of the accessibility widget so it doesn't block the Main Thread or delay the Time to Interactive (TTI).

#### [MODIFY] src/layouts/Layout.astro
- Change `import { Accessibility } from 'accessibility';` to a dynamic import initialization strategy or `requestIdleCallback`. Ensure this delays initialization and yields to the main thread first, improving Lighthouse Performance scores.

## Open Questions

1. **Host Migration Confirmation**: Are we definitely deploying to Cloudflare Pages? (Previous setups initially used Netlify). 
2. **Cookie Implementation**: We will use a standard cookie `lang` with values `he` or `en`. Are there any edge cases we need to consider for cookies vs localStorage?

## Verification Plan

### Automated Tests
- Run `npm run build` to verify that `astro:assets` successfully optimizes images.
- Ensure TypeScript (`tsc`) passes with the new `types.ts` schemas.

### Manual Verification
- Test Edge redirection locally using Cloudflare Wrangler (`npx wrangler pages dev ./dist`).
- Verify the accessibility widget loads asynchronously without blocking initial rendering.
- Verify image formats in Chrome DevTools (should be WebP/AVIF instead of PNG).
