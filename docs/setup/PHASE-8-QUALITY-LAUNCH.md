# Phase 8 — quality and launch

This phase adds automated checks and production safeguards, but several vendor-dashboard and manual review tasks must still be completed before launch.

## 1. Apply the database migration

Apply:

```text
supabase/migrations/202606260001_phase8_quality_launch.sql
```

It creates the service-role-only rate-limit ledger and atomic rate-limit functions used by the public lead endpoint.

For local validation:

```powershell
npm run supabase:start
npm run supabase:reset
npm run supabase:test
```

The pgTAP suite verifies that sensitive operational tables have RLS enabled, anonymous users cannot read webhook/email/rate-limit ledgers, and the invoice membership policy exists.

## 2. Bot protection and rate limiting

Create a Cloudflare Turnstile widget for:

- Production hostname: `gridspellstudio.com`
- Development hostname: `localhost`

Set:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
TURNSTILE_EXPECTED_HOSTNAME=gridspellstudio.com
RATE_LIMIT_SALT=
```

Generate the salt:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The lead endpoint also uses:

- A hidden honeypot field
- Minimum and maximum completion-time checks
- Request-body size limits
- Connection/fingerprint throttling
- Email-address throttling
- Server-side Zod validation

Turnstile is optional in development when its keys are absent, but production should not launch without the keys.

## 3. Error monitoring

Create a Sentry Next.js project and configure:

```text
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
SENTRY_TRACES_SAMPLE_RATE=0.1
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
```

The repository includes server, edge, and browser initialization, App Router request-error capture, user-facing route error boundaries, and source-map upload support when the auth token is present.

After deployment, deliberately trigger a safe test error in Preview, confirm it appears in Sentry, then remove the test.

## 4. Analytics and search verification

Create a GA4 web data stream and set:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

The application sends manual page-view events for App Router navigation and disables the automatic initial page view to avoid double-counting.

Verify these events in GA4 DebugView or Realtime:

- `page_view`
- `generate_lead` after a successful project inquiry

Submit `https://gridspellstudio.com/sitemap.xml` in Google Search Console after domain verification.

## 5. Stripe webhook verification

Production webhook endpoint:

```text
https://gridspellstudio.com/api/stripe/webhook
```

Subscribe to:

```text
checkout.session.completed
checkout.session.async_payment_succeeded
checkout.session.async_payment_failed
checkout.session.expired
payment_intent.succeeded
payment_intent.payment_failed
charge.refunded
```

Local test flow:

```powershell
stripe listen --forward-to localhost:3000/api/stripe/webhook
npm run dev
npm run stripe:test-webhook
```

The scripted test verifies rejection of unsigned requests, acceptance of a valid signature, and duplicate-event idempotency. Complete one additional Stripe CLI trigger or Dashboard test payment that references a real test invoice to verify database synchronization and the confirmation email.

## 6. Responsive, keyboard, focus, and reduced-motion checks

Install the Playwright browser once:

```powershell
npm run test:e2e:install
```

Run:

```powershell
npm run test:responsive
npm run test:accessibility
npm run test:reduced-motion
npm run test:performance
npm run performance:assets
```

The automated suite checks:

- Public routes at desktop, tablet, and phone viewports
- Horizontal viewport overflow
- Skip-link behavior
- Navigation focus trapping and Escape behavior
- Accessible client-side form errors
- Serious/critical Axe findings on the homepage
- Reduced-motion rendering
- Failed first-party requests and basic navigation timing

Manual checks are still required on real Safari/iOS, Chrome/Android, keyboard-only desktop navigation, 200% browser zoom, and a screen reader.

## 7. Performance review

Use a production Preview deployment, not the development server, for final performance measurements.

Review at minimum:

- Homepage
- Work
- Services
- About
- Insights
- Start project
- Login and portal entry

Pay special attention to MP4 previews, animated SVG scenes, image dimensions, layout shifts, and third-party scripts. The repository videos have been re-encoded for fast start and reduced from roughly 117 MB to about 16 MB in total. Keep the asset-budget check in CI, use posters, and avoid preloading every project video.

## 8. Database backup review

In the Supabase dashboard:

1. Confirm the project plan and automatic backup retention.
2. Confirm whether point-in-time recovery is enabled or required.
3. Record the restore procedure and responsible person.
4. Perform a restore drill into a separate non-production project before launch.
5. Keep source-controlled migrations and verify they reproduce the schema locally.

Do not treat a successful migration as proof that a backup can be restored.

## 9. Metadata and crawl controls

Implemented:

- Per-page titles, descriptions, canonical URLs, and Open Graph metadata
- Dynamic article Open Graph images
- Root Open Graph image
- Sitemap including services, projects, insights, and legal pages
- Robots rules excluding admin, portal, auth, API, and monitoring routes
- Google verification environment variable

Before launch, preview representative links in social-sharing debuggers and confirm `gridspellstudio.com` is the production `NEXT_PUBLIC_SITE_URL`.

## 10. Legal review

The Privacy Policy and Terms of Use now describe the actual GridSpell workflow and providers. They are operational drafts, not legal advice.

Before accepting production clients or paid transactions:

- Have an Ontario-qualified lawyer review the public terms, privacy policy, client agreement, proposal language, payment/refund terms, and data-retention practices.
- Confirm whether cookie consent is required for the final analytics/advertising configuration and target jurisdictions.
- Keep vendor names and data practices updated when services change.

## 11. Production environment checklist

Set all production variables in Vercel and ensure Preview uses test credentials where appropriate:

```text
NEXT_PUBLIC_SITE_URL=https://gridspellstudio.com
NEXT_PUBLIC_SITE_NAME=GridSpell Studio
NEXT_PUBLIC_CONTACT_EMAIL=hello@gridspellstudio.com

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_BILLING_PORTAL_CONFIGURATION_ID=

RESEND_API_KEY=
RESEND_FROM_EMAIL=GridSpell Studio <notifications@send.gridspellstudio.com>
RESEND_REPLY_TO=hello@gridspellstudio.com
ADMIN_NOTIFICATION_EMAIL=hello@gridspellstudio.com

RATE_LIMIT_SALT=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
TURNSTILE_EXPECTED_HOSTNAME=gridspellstudio.com

NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
SENTRY_TRACES_SAMPLE_RATE=0.1
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
```

## 12. Final release gate

Run:

```powershell
npm run quality:phase8
npm run test:reduced-motion
npm run test:performance
npm audit
```

Then verify manually:

- Production contact form and both emails
- Invitation acceptance
- Client portal access boundaries
- Deposit invoice payment
- Stripe billing portal
- Payment status and payment confirmation
- Milestone, approval, and launch emails
- 404 and error pages
- Sitemap and robots output
- Analytics page views and lead conversion
- Sentry production event
- Database backup and restore procedure

## Current dependency audit note

At the time of this review, `npm audit --omit=dev` reports three moderate findings through the PostCSS version bundled inside the current latest stable Next.js package. The automated `--force` proposal would downgrade Next.js to 9.3.3 and must not be used. Keep Next.js and Sentry current, review this advisory during each release, and upgrade when the upstream stable package includes the patched PostCSS dependency.
