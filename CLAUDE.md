# CLAUDE.md — editing guide for RSpec Performance

Read this before touching code. It encodes the conventions the site was built on.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (configured via `@theme` in `app/globals.css`, **not** a config file)
- Resend for transactional email
- Zod for input validation
- pnpm for installs

## Conventions

- **React Server Components by default.** Add `"use client"` only when a component needs browser APIs or state. Currently the only client components are `components/layout/Nav.tsx` and `components/contact/ContactForm.tsx`.
- **No runtime CSS-in-JS.** Tailwind utility classes + the CSS custom properties in `globals.css` (e.g. `text-[--color-accent]`) are the whole styling system.
- **One source of truth per concept:**
  - Contact info / hours / socials → `lib/site.ts`
  - Services → `lib/services.ts` (append an object; the listing + detail page generate themselves)
  - Builds → `lib/builds.ts` (same pattern)
  - FAQs → `lib/faqs.ts`
- **Brand is CSS variables.** Re-theme by editing a single var in `@theme` (e.g. `--color-accent`). Don't hardcode colors in components.
- **Form validation is shared.** `lib/validation.ts` exports the `contactSchema` used by both `ContactForm` (client) and `app/api/contact/route.ts` (server).
- **Metadata lives in the page.** Each route exports `metadata` (or `generateMetadata`). Root defaults are in `app/layout.tsx`.
- **JSON-LD is centralized.** Build from `lib/schema.ts` helpers and drop via `<script type="application/ld+json">`.

## How to add a service

1. Open `lib/services.ts`.
2. Append a new object to the `services` array. Required fields: `slug`, `title`, `tagline`, `category`, `icon`, `highlights`, `body`. `relatedSlugs` is optional.
3. If you want a new icon, add a case to `components/ui/Icon.tsx`.
4. The service automatically gets:
   - A card on `/services`
   - A detail page at `/services/[slug]`
   - An entry in `sitemap.xml`
   - Service JSON-LD for search engines

No other code changes needed.

## How to add a build

1. Open `lib/builds.ts`.
2. Append a new object with `slug`, `title`, `subtitle`, `year`, `make`, `model`, `platform`, optional `hp`/`tq`, `specs`, `story`, `tags`, `heroImage`.
3. Drop photos in `public/images/builds/<slug>/` if you have them. Until then, `components/builds/BuildArt.tsx` renders a stylized placeholder.
4. When ready, replace the `<BuildArt />` usages in `app/builds/page.tsx` and `app/builds/[slug]/page.tsx` with `<Image>` from `next/image`.

## How to change the brand color

Edit one line in `app/globals.css`:

```css
@theme {
  --color-accent: #00e5ff;   /* ← change this */
}
```

Everything using `text-[--color-accent]`, `bg-[--color-accent]`, the gradient text, glow shadows, and the OG image updates automatically.

## Contact form

- Route: `app/api/contact/route.ts` (Node runtime).
- Anti-spam: honeypot `company` field + 1.5s minimum submit time + in-memory per-IP rate limit (5/hour).
- **To upgrade rate limiting for multi-region deploys**, swap the in-memory `Map` for Upstash Redis or Vercel KV. The interface is 10 lines; see `rateLimited()`.
- In dev without `RESEND_API_KEY`, the route logs the payload and returns success so you can test the UI. In production the route returns 500 if the key is missing — this is intentional.

## SEO

- `AutoRepair` + `LocalBusiness` JSON-LD is rendered in the root layout.
- `Service` JSON-LD on each `/services/[slug]` page.
- `FAQPage` JSON-LD on `/faq`.
- `BreadcrumbList` on service + build detail pages.
- `app/sitemap.ts` enumerates everything; keep it updated when you add new top-level routes.
- Update the `areaServed` cities in `lib/schema.ts` once Rav confirms the exact service area.

## Performance targets

Lighthouse must stay at **Perf ≥ 90, SEO 100, A11y ≥ 95**. If you add a heavy dependency (anything > ~30 KB gzipped), justify it in the PR description.

## Do-not-do

- Don't add CSS-in-JS libraries (styled-components, emotion) — use Tailwind.
- Don't add a component library (Material, Chakra) — we own our primitives in `components/ui/`.
- Don't put secrets in `lib/site.ts` — only public contact info belongs there.
- Don't embed the Instagram iframe on the homepage — it tanks Lighthouse. Keep the curated static strip.
