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
* **Centralized i18n Dictionaries:** To maintain a clean codebase ("Enterprise-ready"), all standard UI texts are extracted into central JSON files (`/src/locales/en.json` & `/src/locales/he.json`). Massive legal texts (like Terms and Privacy) are intentionally kept directly inside their respective template components to facilitate easier future editing by legal teams.

## 🎨 Design System & Styling Rules

The project does **not** use standard Tailwind colors (e.g., `bg-blue-500`). It strictly uses a highly customized Material-Design inspired theme configured in `tailwind.config.mjs`.

When developing, you must use the semantic tokens:
* Backgrounds: `bg-surface`, `bg-surface-container`, `bg-surface-container-lowest`
* Texts: `text-on-surface`, `text-on-surface-variant`
* Accents: `bg-primary`, `text-primary`, `bg-primary-fixed`
* Fonts: `font-sans` (Inter/Heebo), `font-headline` (Space Grotesk)

## 🔒 Security & Forms

* **Web3Forms:** The `ContactSection.astro` form is technically prepared to use Web3Forms to directly email inquiries to `Office@fractal.co.il` without storing data in an intermediate cloud database. **Note:** It is currently *not yet connected*; you must implement a valid Access Key in the form configuration to activate this functionality.
* **Security Headers:** HSTS, XSS protections, and strict `Content-Security-Policy` (CSP) are enforced in production via `public/_headers` (configured for Cloudflare Pages).
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
1. **Active Cookie Consent:** A UI banner (`CookieBanner.astro`) ensures that tracking scripts (e.g., Google Analytics, Meta Pixels) are forcefully blocked and injected **only** if the user explicitly clicks "Accept All", which sets `cookie-consent: granted` in `localStorage`.
2. **Right to be Forgotten (30-Day SLA):** 
   * **SOP for IT Administrator:** Since form submissions are emailed directly to `Office@fractal.co.il`, the administrator must configure a **Microsoft Outlook Rule** that automatically hard-deletes any incoming emails with the subject "New Inquiry from Fractal Website" after **30 to 60 days**.
   * This guarantees auto-compliance with data retention rules strictly within the SLA without requiring a custom backend deletion job.

## 📦 Deployment

The project is configured for seamless deployment on **Cloudflare Pages**.
Pushing to the `main` branch will automatically trigger a build (`npm run build`) and deploy the `dist/` directory.

*Note: NPM overrides are utilized in `package.json` to safely bypass peer dependency conflicts with `@astrojs/tailwind` without ignoring critical security checks.*
