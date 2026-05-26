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
        ThemeProvider: "./src/components/ForceLightThemeProvider.astro",
      },
      sidebar: [
        {
          label: "Overview",
          translations: { fr: "Vue d'ensemble" },
          autogenerate: { directory: "overview" },
        },
        {
          label: "Admin guide",
          translations: { fr: "Guide administrateur" },
          autogenerate: { directory: "admin-guide" },
        },
        {
          label: "User guide",
          translations: { fr: "Guide utilisateur" },
          autogenerate: { directory: "user-guide" },
        },
        {
          label: "Methodology",
          translations: { fr: "Méthodologie" },
          autogenerate: { directory: "methodology" },
        },
        {
          label: "Resources",
          translations: { fr: "Ressources" },
          autogenerate: { directory: "resources" },
        },
      ],
    }),
  ],
});
