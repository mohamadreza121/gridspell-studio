# GridSpell Phase 7 + Phase 8 Safe Overlay

This overlay was built against the pre-Phase-8 GridSpell project state. It deliberately does **not** contain or replace the customized homepage, About experience, Services experience, Work page, or Insights experience.

## What is protected

The overlay does not include these existing files:

- `src/app/(marketing)/page.tsx`
- `src/app/(marketing)/about/page.tsx`
- `src/app/(marketing)/work/page.tsx`
- `src/app/(marketing)/work/[slug]/page.tsx`
- `src/app/(marketing)/services/page.tsx`
- `src/app/(marketing)/services/[slug]/page.tsx`
- `src/app/(marketing)/insights/page.tsx`
- `src/app/(marketing)/insights/[slug]/page.tsx`
- `src/components/home/HomeExperience.tsx`
- `src/components/about/AboutExperience.tsx`
- `src/components/services/ServicesShowcaseScene.tsx`
- `src/components/insights/InsightsExperience.tsx`
- `src/components/insights/InsightRowVisual.tsx`
- `src/config/work.ts`
- `src/config/work-case-studies.ts`
- `src/features/admin/actions.ts`

Route-specific metadata is added through new `layout.tsx` files instead of replacing page content.

## Existing files to replace

These replacements are limited to security, accessibility, analytics, legal, quality tooling, form handling, and payment reliability:

- `.env.example`
- `.gitignore`
- `eslint.config.mjs`
- `next.config.ts`
- `package.json`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/api/leads/route.ts`
- `src/components/forms/ProjectBriefForm.tsx`
- `src/components/layout/MarketingShell.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/home/WorkCarouselScene.tsx`
- `src/components/work/DeviceShowcase.tsx`
- `src/components/work/WorkRollScene.tsx`
- `src/config/site.ts`
- `src/features/billing/actions.ts`
- `src/validations/lead.ts`
- `src/app/(marketing)/privacy/page.tsx`
- `src/app/(marketing)/terms/page.tsx`

The three visual components above retain the existing presentation and only add reduced-motion behavior for videos.

## New files and folders

- `instrumentation-client.ts`
- `instrumentation.ts`
- `sentry.edge.config.ts`
- `sentry.server.config.ts`
- `playwright.config.ts`
- `src/app/error.tsx`
- `src/app/global-error.tsx`
- `src/components/analytics/GoogleAnalytics.tsx`
- `src/components/security/TurnstileWidget.tsx`
- `src/lib/security/rate-limit.ts`
- `src/lib/security/request.ts`
- `src/lib/security/turnstile.ts`
- `scripts/check-asset-budget.mjs`
- `scripts/test-stripe-webhook.mjs`
- `supabase/migrations/202606260001_phase8_quality_launch.sql`
- `supabase/tests/database/phase8_rls.test.sql`
- `tests/e2e/accessibility.spec.ts`
- `tests/e2e/performance.spec.ts`
- `tests/e2e/reduced-motion.spec.ts`
- `tests/e2e/responsive.spec.ts`
- `docs/setup/PHASE-7-AUDIT.md`
- `docs/setup/PHASE-8-QUALITY-LAUNCH.md`
- New route metadata layouts under `src/app/(marketing)/*/layout.tsx`
- `src/app/(marketing)/insights/[slug]/opengraph-image.tsx`

## Important exclusions

- No `package-lock.json` is included. Keep the clean lockfile in your project and let `npm install` update it.
- No `.env.local` is included.
- No database credentials or vendor secrets are included.
- No admin page or admin action replacement is included.
- Optimized videos are distributed separately because they are optional and much larger.

## Safe application procedure

1. Make sure the restored website is committed.
2. Create a new branch:

   `git switch -c phase8-safe-integration`

3. Extract or copy this overlay into the project root, allowing only the listed files to merge/replace.
4. Install new packages:

   `npm install --registry=https://registry.npmjs.org/ --no-audit --no-fund`

5. Run:

   `npm run type-check`

   `npm run lint`

   `npm run build`

6. Open `/`, `/work`, `/about`, `/services`, and `/insights` before committing.
7. Apply the Supabase migration only after the code passes locally.

## Phase 7 status

Phase 7 was already implemented in the pre-Phase-8 project. This overlay does not replace the Stripe webhook, email templates, email sender, or admin actions. The only Phase 7 code adjustment included is checkout-session reuse in `src/features/billing/actions.ts`.

Dashboard configuration for Stripe and Resend remains required before production use.
