# RSpec Performance — rspecperformance.com

Marketing site for RSpec Performance. Next.js 16 (App Router) + TypeScript + Tailwind v4, deployed on Vercel.

> **Non-technical? Read [`HANDOFF_FOR_RAV.md`](./HANDOFF_FOR_RAV.md) instead.** It explains the site in plain English.

---

## Quick start

```bash
pnpm install
cp .env.local.example .env.local   # fill in Resend key + contact email
pnpm dev                           # http://localhost:3000
```

### Scripts

| Command          | What it does                 |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Dev server with Turbopack    |
| `pnpm build`     | Production build             |
| `pnpm start`     | Run the built app            |
| `pnpm lint`      | ESLint                       |

### Environment variables

See [`.env.local.example`](./.env.local.example). Required in production:

- `RESEND_API_KEY` — contact form email delivery
- `CONTACT_TO_EMAIL` — where inquiries land
- `CONTACT_FROM_EMAIL` — must be on a Resend-verified domain
- `NEXT_PUBLIC_SITE_URL` — e.g. `https://rspecperformance.com`

---

## Architecture

```
app/
  page.tsx               Home
  services/              /services and /services/[slug]
  builds/                /builds and /builds/[slug]
  about/, contact/, faq/
  api/contact/route.ts   Contact-form handler (Resend)
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.tsx
components/
  ui/        Button, Card, Section, Badge, Icon, Logo, Container
  layout/    Nav, Footer
  home/      Hero, ValueProp, ServicesPreview, FeaturedBuild, …
  services/  ServiceCard
  builds/    BuildArt (placeholder art — replace with photos)
  contact/   ContactForm
lib/
  site.ts        Contact info, hours, nav, socials — SINGLE SOURCE OF TRUTH
  services.ts    Services array — append an entry, it shows up
  builds.ts      Builds array — append an entry, it shows up
  faqs.ts        FAQ Q&A pairs
  fonts.ts       next/font setup
  schema.ts      JSON-LD (AutoRepair, Service, FAQPage, BreadcrumbList)
  validation.ts  Shared zod schema for the contact form
```

See [`CLAUDE.md`](./CLAUDE.md) for editing conventions and how to extend the site.

---

## Deploy

See **[`DEPLOYMENT.md`](./DEPLOYMENT.md)** for the full step-by-step walkthrough (Vercel + Porkbun DNS + Resend domain verification). Budget ~30 minutes.

Every push to `main` auto-deploys to production. Every PR gets a preview URL.

---

## License

Private. © RSpec Performance.
