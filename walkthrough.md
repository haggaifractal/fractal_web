# Executive Summary: Production Hardening & Amendment 13 Compliance

This walkthrough details all the architectural changes, compliance updates, and build fixes implemented to prepare the Fractal website for a secure, SEO-optimized production deployment.

## 1. Privacy & Amendment 13 Compliance (Strict Opt-In)

To comply with the Israeli Privacy Protection Law (Amendment 13) and GDPR, we implemented a strict "Opt-In" architecture for Google Tag Manager (GTM).

**What changed:**
Third-party tracking scripts are no longer loaded automatically. They are dynamically injected into the DOM **only** if the user explicitly grants consent via the cookie banner (`cookie-consent === 'granted'`).

```html
<!-- src/layouts/Layout.astro -->
<script is:inline>
  function loadAnalytics() {
    // Strict Opt-In check before injecting Google Tag Manager
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'granted') {
      const gtmId = 'GTM-XXXXXXX'; // TODO: Replace with Real GTM ID
      
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', gtmId);
    }
  }

  // Listen for consent granted by the cookie banner
  document.addEventListener('consentGranted', loadAnalytics);

  // Check immediately on load in case consent was already given
  if (localStorage.getItem('cookie-consent') === 'granted') {
    loadAnalytics();
  }
</script>
```

> [!WARNING]
> **Action Required:** You must replace `GTM-XXXXXXX` with your actual Google Tag Manager container ID before going live.

---

## 2. Content Security Policy (CSP) Hardening

We tightened the website's security by updating the Content Security Policy to explicitly whitelist only the required Google Analytics and Tag Manager domains. We intentionally excluded Facebook and LinkedIn to minimize the attack surface, pending future requirements.

```text
# public/_headers
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
```

---

## 3. SEO & Open Graph bilingual support

We added advanced `og:locale` meta tags to ensure that when the website link is shared on WhatsApp, LinkedIn, or Facebook, the preview correctly identifies whether the page is in Hebrew or English.

```astro
<!-- src/layouts/Layout.astro -->
<meta property="og:type" content="website" />
<meta property="og:locale" content={lang === 'he' ? 'he_IL' : 'en_US'} />
<meta property="og:locale:alternate" content={lang === 'he' ? 'en_US' : 'he_IL'} />
```

We also integrated the official `@astrojs/sitemap` plugin to automatically generate an XML sitemap (`sitemap-index.xml`) on every build, and created a `robots.txt` file to point search engines directly to it.

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fractal-computers.com',
  integrations: [
    sitemap(),
    // ...other integrations
  ],
});
```

---

## 4. Fixing the Astro Compiler Build Crash

### The Problem
During `npm run build`, the Astro compiler crashed with `ReferenceError: i is not defined`. 
This is a known bug in the Astro compiler: when a map loop exposes an index variable `(client, i)` and uses it inside a short-circuit logical expression `&&` within a Fragment `<>`, Astro's AST parser erroneously hoists the `i` to the global scope of the file where it is undefined.

### The Solution
We implemented a robust two-part bypass in `src/templates/CustomersTemplate.astro` and `src/components/ClientsMarquee.astro`:

1. **Dummy Variable Hoisting Trap:** We added `let i;` to the top of the component scripts so that the hoisted compiler reference points to a valid local variable rather than crashing.
2. **Ternary Operator Conversion:** We replaced the `<>` fragments with `<div class="contents">` and swapped the `&&` short-circuit logic for a full ternary operator (`? : null`). This forces the compiler to evaluate the block safely as a closed Javascript expression.

```diff
- <>
-     {(i === 0 || i === Math.floor(col1.length / 2)) && (
-         <a href={tc.ctaBoxLink} class="...">Contact Us</a>
-     )}
-     <a href={client.url} ...>...</a>
- </>

+ <div class="contents">
+     {(i === 0 || i === Math.floor(col1.length / 2)) ? (
+         <a href={tc.ctaBoxLink} class="...">Contact Us</a>
+     ) : null}
+     <a href={client.url} ...>...</a>
+ </div>
```

> [!SUCCESS]
> The build process `npm run build` now completes flawlessly in local testing, generating the static HTML and the automated sitemap without errors.
