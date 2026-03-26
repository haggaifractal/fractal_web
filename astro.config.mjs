import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // הגדרת הדומיין הרשמי או כתובת השרת האוטומטית
  site: process.env.URL || 'https://www.fractal.co.il',
  integrations: [tailwind()],
});
