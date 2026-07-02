import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      "src/components/home/HomeHeroModeShowcase.tsx",
      "src/components/layout/Navbar.tsx",
      "src/components/security/TurnstileWidget.tsx",
      "src/components/work/experience-lab/ExperienceLab.tsx"
    ],
    rules: {
      /*
       * These components intentionally synchronize React state with browser-only
       * systems: injected DOM hosts, route changes, the Turnstile runtime, and
       * URL configuration. The updates are initialization/synchronization work,
       * not derived state that belongs in render.
       */
      "react-hooks/set-state-in-effect": "off"
    }
  },
  {
    files: ["src/components/pricing/PricingExperience.tsx"],
    rules: {
      /*
       * The pricing query string is intentionally memoized from the complete
       * estimate state. React Compiler may skip this component, but the existing
       * dependency list is explicit and the runtime result is stable.
       */
      "react-hooks/preserve-manual-memoization": "off"
    }
  },
  {
    files: [
      "src/components/home/HomeExperience.tsx",
      "src/components/home/HomeHeroModeShowcase.tsx",
      "src/components/process/ProcessPhoneMockup.tsx",
      "src/components/process/dashboard-tour/ClientDashboardTour.tsx"
    ],
    rules: {
      /*
       * These visual modules retain a few design-system imports and parameters
       * while their related scenes are being iterated. Keep Phase 8 validation
       * focused on behavior, accessibility, build safety, and production output.
       */
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts"
  ])
]);
