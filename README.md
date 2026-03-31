# Fractal IT - Corporate Website

A modern, highly performant, and secure bilingual (English/Hebrew) B2B website built for Fractal Computers and Communications 2002 Ltd.

## 🚀 Tech Stack
* **Framework:** [Astro](https://astro.build/) (v6)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.4)
* **Runtime:** Node.js (>=22.12.0)
* **Hosting / Deployment:** Cloudflare Pages

## 🛠️ Getting Started

To run this project locally, ensure you have Node.js 22+ installed.

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
3. **Open in Browser:**
   Navigate to `http://localhost:4321`

## 🏗️ Architecture & Bilingual Routing (i18n)

This project strictly adheres to a modular, dual-language architecture featuring **DRY (Don't Repeat Yourself)** principles.

* **Hebrew (RTL):** Located at the project root (`src/pages/index.astro`, `services.astro`, etc.).
* **English (LTR):** Located inside the `/en/` subdirectory (`src/pages/en/index.astro`).
* **Layout Wrapper & Templates:** Both languages share a single layout (`src/layouts/Layout.astro`) which automatically manages the document direction (`dir="rtl"` or `dir="ltr"`) based on the `lang` prop. Page structures are consolidated into reusable unified templates inside `/src/templates`.
* **Centralized i18n Dictionaries:** To maintain a clean codebase ("Enterprise-ready"), all standard UI texts are extracted into central JSON files (`/src/locales/en.json` & `/src/locales/he.json`). Massive legal texts (like Terms, Privacy, and Accessibility) are managed as pure **Markdown (`.md`) files** inside `src/pages/` (and `src/pages/en/`), wrapped dynamically by `LegalLayout.astro`. This allows legal and content teams to edit them safely without touching Astro or JSX code.

## 🎨 Design System & Styling Rules

The project does **not** use standard Tailwind colors (e.g., `bg-blue-500`). It strictly uses a highly customized Material-Design inspired theme configured in `tailwind.config.mjs`.

When developing, you must use the semantic tokens:
* Backgrounds: `bg-surface`, `bg-surface-container`, `bg-surface-container-lowest`
* Texts: `text-on-surface`, `text-on-surface-variant`
* Accents: `bg-primary`, `text-primary`, `bg-primary-fixed`
* Fonts: `font-sans` (Inter/Heebo), `font-headline` (Space Grotesk)

## 🔒 Security & Forms

* **Web3Forms:** The `ContactSection.astro` form is technically prepared to use Web3Forms to directly email inquiries to `Office@fractal.co.il` without storing data in an intermediate cloud database. **Note:** You must configure a valid Access Key to activate this functionality. Create a `.env` file (see `.env.example`) and set `WEB3FORMS_ACCESS_KEY=your_key`, or configure the environment variable in your production host (e.g. Cloudflare Pages).
* **Security Headers & CSP:** HSTS, XSS protections, and a strict `Content-Security-Policy` (CSP) are enforced in production via `public/_headers`. The CSP is aggressively tightened to only whitelist essential Google properties (`googletagmanager.com`, `google-analytics.com`) for tracking purposes, explicitly avoiding overly broad domains like Facebook or LinkedIn to minimize attack surfaces.
* **Zero-Trust Vectors:** To avoid GDPR and IP leakage conflicts, we do not fetch third-party tracking APIs (e.g., Google Favicons) for imagery. Use local material vectors.

## 🖼️ Managing Client Logos (Privacy by Design)

To strictly comply with privacy laws (GDPR / Amendment 13) and prevent User IP leakage, client logos are **not** loaded dynamically from external servers (e.g., Google's Favicon API) in production. They are hosted locally as static assets within the project.

**How to update or add new client logos:**
1. Open `scripts/download-logos.cjs`.
2. Add or modify the client's domain in the `domains` array.
3. Run `node scripts/download-logos.cjs` in your terminal. This will fetch the latest high-res favicons and save them locally to `public/images/clients/`.
4. Commit and push the newly downloaded images to Cloudflare to deploy them.

## ♿ Accessibility (WCAG 2.1 AA)

The site includes an integrated client-side accessibility solution via the `accessibility` NPM package. It's fully strictly loaded locally to prevent privacy leakages common with third-party widgets like *UserWay* or *Nagish*.
It is dynamically configured via `src/layouts/Layout.astro` and automatically translates its internal UI labels based on the active `lang` attribute. Features include text sizing, contrast modes, a big cursor, and text-to-speech tools.

## 🛡️ Privacy Law (Amendment 13) Compliance & SLA

The site implements "Privacy by Design" to comply with Israel's Privacy Law (Amendment 13):
1. **Active Cookie Consent (Strict Opt-In):** Tracking architectures are explicitly deferred. A UI banner (`CookieBanner.astro`) ensures that tracking scripts (e.g., Google Tag Manager script injection) are blocked outright. They are dynamically generated and executed **only** after the user explicitly clicks "Accept", matching the value `cookie-consent: granted` in `localStorage` without pre-emptively loading payloads.
2. **Right to be Forgotten (30-Day SLA):** 
   * **SOP for IT Administrator:** Since form submissions are emailed directly to `Office@fractal.co.il`, the administrator must configure a **Microsoft Outlook Rule** that automatically hard-deletes any incoming emails with the subject "New Inquiry from Fractal Website" after **30 to 60 days**.
   * This guarantees auto-compliance with data retention rules strictly within the SLA without requiring a custom backend deletion job.

## 📝 Content Management System (Sveltia CMS)

The project includes an integrated, Git-based headless CMS (Sveltia CMS) mapped directly to our GitHub repository. This allows content and legal editors to quickly edit translation files (`.json`) and legal pages (`.md`) without writing code.

* **Security & Zero-Trust:** Standard CMS setups depend on external CDNs (like `unpkg.com`) to fetch their core scripts, which introduces a supply-chain vulnerability. We have mitigated this by downloading and serving `sveltia-cms.js` entirely locally. This ensures our `_headers` CSP (Content-Security-Policy) remains hermetically sealed against external third-party scripts.
* **Authentication:** On Cloudflare Pages, authentication is handled natively using GitHub Personal Access Tokens (Fine-grained tokens with `Contents: Read & Write` and `Administration: Read-only` permissions), allowing a serverless, database-free architecture.
* **DRY Configuration:** The CMS configuration (`public/admin/config.yml`) extensively utilizes **YAML Anchors** (`&` and `*`) to map the exact same UI schema fields dynamically to both `he.json` and `en.json`. This prevents schema duplication and maintenance overhead when scaling the translation files.

## 📦 Deployment

The project is configured for seamless deployment on **Cloudflare Pages**.
Pushing to the `main` branch will automatically trigger a build (`npm run build`) and deploy the `dist/` directory.

*Note: NPM overrides are utilized in `package.json` to safely bypass peer dependency conflicts with `@astrojs/tailwind` without ignoring critical security checks.*

> **⚠️ CRITICAL - DOMAIN MIGRATION (robots.txt):** 
> When migrating the website from the temporary URL (`fractal-web-4pa.pages.dev`) to the official production domain (`fractal.co.il`), you **MUST** update `public/robots.txt`. Change the `Sitemap:` directive to point to the new, absolute production URL (e.g., `Sitemap: https://www.fractal.co.il/sitemap-index.xml`) so search engines can properly index the final site.

## ⚖️ Legal & Compliance Notes (READ BEFORE MODIFYING)

> **⚠️ MANDATORY DATA PRIVACY WARNING:**
> 1. **Dormant Web3Forms Integration:** The contact form infrastructure (Web3Forms) is fully built within the codebase but is currently **dormant** (inactive). It currently does NOT process or send data to third parties. **If you activate Web3Forms in the future via API Keys, you MUST immediately notify management.** The Privacy Policy will need to be legally updated to explicitly disclose this third-party data processing.
> 2. **Strict Opt-In Analytics & Personalized Ads (Amendment 13 / GDPR):** Google Analytics (GA4) / Google Ads integration is implemented with a **STRICT Opt-In** consent mechanism constraint to ensure privacy compliance. Tracking scripts MUST NEVER load before `cookie-consent === 'granted'` is verified in `localStorage`. You are expressly forbidden from bypassing or removing this mechanism during future development, including injecting tracking pixels into the `<head>`.

