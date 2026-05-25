import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://fastr-analytics.org",
  server: { host: true },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: "FASTR",
      description: "FASTR — analytics for health systems.",
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        fr: { label: "Français", lang: "fr" },
      },
      customCss: ["./src/styles/tailwind.css"],
      components: {
        ThemeSelect: "./src/components/EmptyThemeSelect.astro",
      },
      sidebar: [
        {
          label: "Overview",
          translations: { fr: "Vue d'ensemble" },
          autogenerate: { directory: "overview" },
        },
        {
          label: "Getting started",
          translations: { fr: "Premiers pas" },
          autogenerate: { directory: "getting-started" },
        },
      ],
    }),
  ],
});
