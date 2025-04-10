import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Your supported locales
  locales: ["en", "ar"],

  // Default locale when no match
  defaultLocale: "en",

  // Optional: locale detection
  localeDetection: true,

  // Optional: pathnames configuration if you're using localized paths
  // pathnames: {...}
});
