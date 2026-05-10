<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Synkro. The following changes were made:

- **`instrumentation-client.ts`** — PostHog client-side SDK initialized via `posthog-js`, using a reverse proxy (`/ingest`), with exception capture enabled. Placed alongside existing Sentry initialization.
- **`lib/posthog-server.ts`** — New file: singleton server-side PostHog client using `posthog-node`, with `flushAt: 1` and `flushInterval: 0` for immediate event flushing in short-lived server functions.
- **`next.config.js`** — Added PostHog reverse proxy rewrites (`/ingest/static/*`, `/ingest/array/*`, `/ingest/*`) and `skipTrailingSlashRedirect: true`.
- **`.env.local`** — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` set.
- **`app/login/page.tsx`** — Added `login_succeeded` and `login_failed` capture, `posthog.identify()` on success, and `posthog.captureException()` on unexpected errors.
- **`app/signup/page.tsx`** — Added `account_created` capture with `sector` and `currency` properties, `posthog.identify()` on success, and `posthog.captureException()` on errors.
- **`app/(dashboard)/sales/actions.ts`** — Added server-side `sale_created`, `sale_with_products_created`, and `expense_created` events via `posthog-node`.
- **`app/(dashboard)/sante/consultations/actions.ts`** — Added `consultation_created` and `consultation_paid` server-side events.
- **`app/(dashboard)/sante/patients/actions.ts`** — Added `patient_created` server-side event.
- **`app/(dashboard)/sante/appointments/actions.ts`** — Added `appointment_created` and `appointment_status_updated` server-side events.
- **`app/(dashboard)/commerce/products/actions.ts`** — Added `product_created` and `stock_adjusted` server-side events.
- **`app/api/bug-report/route.ts`** — Added `bug_report_submitted` server-side event.

## Events

| Event | Description | File |
|-------|-------------|------|
| `account_created` | User successfully created a new account with company info and sector | `app/signup/page.tsx` |
| `login_succeeded` | User successfully authenticated via credentials | `app/login/page.tsx` |
| `login_failed` | User attempted to login but authentication failed | `app/login/page.tsx` |
| `sale_created` | A new sale was created (server action), including total, payment method, and payment status | `app/(dashboard)/sales/actions.ts` |
| `sale_with_products_created` | A sale with product line items was created and stock was deducted (server action) | `app/(dashboard)/sales/actions.ts` |
| `expense_created` | A new expense was recorded (server action), including amount and category | `app/(dashboard)/sales/actions.ts` |
| `consultation_created` | A new medical consultation was created (server action), including fee and payment status | `app/(dashboard)/sante/consultations/actions.ts` |
| `consultation_paid` | A consultation was marked as paid (server action) | `app/(dashboard)/sante/consultations/actions.ts` |
| `patient_created` | A new patient record was created (server action) | `app/(dashboard)/sante/patients/actions.ts` |
| `appointment_created` | A new appointment was scheduled (server action), including type and duration | `app/(dashboard)/sante/appointments/actions.ts` |
| `appointment_status_updated` | An appointment status was changed (e.g., confirmed, cancelled, completed) | `app/(dashboard)/sante/appointments/actions.ts` |
| `product_created` | A new product was added to the catalogue (server action) | `app/(dashboard)/commerce/products/actions.ts` |
| `stock_adjusted` | Product stock was manually adjusted (server action), including direction and reason | `app/(dashboard)/commerce/products/actions.ts` |
| `bug_report_submitted` | User submitted a bug report via the bug report API route | `app/api/bug-report/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1566900)
- [Signup & Login Conversion Funnel](/insights/czWt780f) — funnel from account creation to first login
- [New Accounts Over Time](/insights/p2LOWSzp) — daily trend of new signups
- [Sales & Revenue Actions](/insights/VWhwN3oQ) — simple sales vs sales with products over time
- [Medical Consultations: Created vs Paid](/insights/XHcjcnEE) — consultation volume and payment collection rate
- [Login Success vs Failure Rate](/insights/Dcc8kt3E) — login success/failure trend to detect authentication friction

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
