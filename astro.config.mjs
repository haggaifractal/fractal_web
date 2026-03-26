import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // הגדרת הדומיין הרשמי לצורך הפקת כתובות SEO (קנוניקל, OG)
  site: 'https://www.fractal.co.il',
  integrations: [tailwind()],
});
