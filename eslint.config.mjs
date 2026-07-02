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
      "react-hooks/set-state-in-effect": "off"
    }
  },
  {
    files: ["src/components/layout/Navbar.tsx"],
    rules: {
      "react-hooks/exhaustive-deps": "off"
    }
  },
  {
    files: ["src/components/pricing/PricingExperience.tsx"],
    rules: {
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
