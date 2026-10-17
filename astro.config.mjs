import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://spricew.github.io",
  base: "/glassmorphism-lab/",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});