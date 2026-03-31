# Fractal Website Modernization Tasks

- [x] 1. Define Type Safety for `clients.json` (`src/types.ts`).
- [x] 2. Move client images from `public/images/clients/` to `src/assets/images/clients/`.
- [x] 3. Apply Edge Redirection (Cloudflare `_middleware.ts`).
- [x] 4. Update `Layout.astro`: Set lang cookie, remove inline localStorage redirect, and make accessibility script async.
- [x] 5. Update `ClientsMarquee.astro`: Use `astro:assets` and `<Image />` component with `import.meta.glob`.
- [x] 6. Update `CustomersTemplate.astro`: Use `astro:assets` and `<Image />` component with `import.meta.glob`.
