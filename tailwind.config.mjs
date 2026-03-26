/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-fixed": "#8cf6da",
        "surface-tint": "#006b59",
        "tertiary-container": "#007ea6",
        "on-secondary-fixed": "#101b30",
        "on-primary-fixed": "#002019",
        "surface-container-lowest": "#ffffff",
        "on-background": "#171d1b",
        "secondary-container": "#d7e2ff",
        "surface-container-high": "#e4e9e6",
        "primary-fixed-dim": "#6fd9be",
        "on-tertiary-fixed-variant": "#004d67",
        "background": "#f6fbf7",
        "surface-bright": "#f6fbf7",
        "on-secondary": "#ffffff",
        "secondary-fixed-dim": "#bbc6e2",
        "surface-dim": "#d6dbd8",
        "on-secondary-fixed-variant": "#3c475d",
        "on-tertiary-container": "#fbfcff",
        "on-primary-fixed-variant": "#005142",
        "primary-container": "#00846e",
        "tertiary-fixed": "#c2e8ff",
        "on-primary": "#ffffff",
        "outline": "#6d7a75",
        "outline-variant": "#bcc9c4",
        "secondary-fixed": "#d7e2ff",
        "on-secondary-container": "#5a647c",
        "on-surface": "#171d1b",
        "inverse-primary": "#6fd9be",
        "surface": "#f6fbf7",
        "surface-container": "#eaefeb",
        "on-error-container": "#93000a",
        "surface-container-highest": "#dfe4e0",
        "tertiary": "#006384",
        "error-container": "#ffdad6",
        "tertiary-fixed-dim": "#75d1ff",
        "on-tertiary": "#ffffff",
        "primary": "#006857",
        "error": "#ba1a1a",
        "inverse-on-surface": "#edf2ee",
        "on-tertiary-fixed": "#001e2b",
        "surface-container-low": "#f0f5f1",
        "on-error": "#ffffff",
        "on-surface-variant": "#3d4945",
        "inverse-surface": "#2c322f",
        "secondary": "#545e76",
        "surface-variant": "#dfe4e0",
        "on-primary-container": "#f4fffa"
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      }
    }
  }
}
