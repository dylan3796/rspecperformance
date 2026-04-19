# Architecture

File-by-file tour of the repo. When in doubt, start here.

## Directory layout

```
/
├── app/                    Next.js App Router pages, routes, metadata
│   ├── api/contact/        Contact form route handler (Resend)
│   ├── about/              /about
│   ├── builds/             /builds + /builds/[slug]
│   ├── contact/            /contact
│   ├── faq/                /faq
│   ├── services/           /services + /services/[slug]
│   ├── layout.tsx          Root layout (fonts, Nav, Footer, JSON-LD)
│   ├── page.tsx            Home
│   ├── globals.css         Tailwind v4 @theme tokens + base styles
│   ├── not-found.tsx       404 page
│   ├── sitemap.ts          MetadataRoute.Sitemap
│   ├── robots.ts           MetadataRoute.Robots
│   ├── opengraph-image.tsx Dynamic OG image via ImageResponse
│   ├── icon.tsx            Favicon
│   └── apple-icon.tsx      Apple touch icon
├── components/             All React components
│   ├── builds/             BuildArt (placeholder SVG for build images)
│   ├── contact/            ContactForm (client — only via this one file)
│   ├── home/               Homepage section components
│   ├── layout/             Nav, Footer
│   ├── services/           ServiceCard
│   └── ui/                 Primitives (Button, Card, Badge, Icon, …)
├── lib/                    Domain logic, shared across routes
│   ├── builds.ts           Builds array (source of truth for /builds)
│   ├── faqs.ts             FAQ entries
│   ├── fonts.ts            next/font/google setup (Rajdhani + Inter)
│   ├── schema.ts           JSON-LD builders
│   ├── services.ts         Services array (source of truth for /services)
│   ├── site.ts             Company info: nav, phone, email, hours, socials
│   └── validation.ts       Zod schemas (shared client + server)
├── public/                 Static assets (logo, images/, favicons)
├── docs/                   Internal docs (this folder)
└── {README, CLAUDE, AGENTS, HANDOFF_FOR_RAV, DEPLOYMENT, ASSETS_NEEDED, GOOGLE_DOC}.md
```

## Request flow

### Static pages (everything except the contact POST)

1. User visits a URL.
2. Vercel serves the pre-rendered HTML from the edge (all service and build detail pages are statically generated via `generateStaticParams`).
3. Small hydration payload runs the client components (`Nav` mobile menu, `ContactForm`).

### Contact form submission

```
ContactForm (client)
    │  zod.safeParse(data) — client-side validation
    │  POST JSON → /api/contact
    ▼
app/api/contact/route.ts (Node runtime)
    │  getIp() from x-forwarded-for / x-real-ip
    │  rateLimited(ip) — in-memory Map<ip, {count, windowStart}>, 5/hr
    │  contactSchema.safeParse(body) — server-side validation (same schema)
    │  honeypot check: `company` field must be empty
    │  min-submit-time check: Date.now() - data.startedAt > 1500ms
    │  if !RESEND_API_KEY:
    │    dev → log + return ok
    │    prod → return 500
    │  resend.emails.send({ from, to, subject, text, html, replyTo })
    ▼
JSON 200 ok | 400 validation | 429 rate-limit | 502 send failure
```

## Routing map

| Route | Source | Rendering | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Static | Assembles `components/home/*` sections |
| `/services` | `app/services/page.tsx` | Static | Reads `lib/services.ts`, groups by category |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | SSG | `generateStaticParams` iterates `services` |
| `/builds` | `app/builds/page.tsx` | Static | Grid of builds from `lib/builds.ts` |
| `/builds/[slug]` | `app/builds/[slug]/page.tsx` | SSG | Per-build detail |
| `/about` | `app/about/page.tsx` | Static | |
| `/contact` | `app/contact/page.tsx` | Static | Embeds `ContactForm` (client island) |
| `/faq` | `app/faq/page.tsx` | Static | Reads `lib/faqs.ts`; emits `FAQPage` JSON-LD |
| `/api/contact` | `app/api/contact/route.ts` | Dynamic (Node) | POST only |
| `/sitemap.xml` | `app/sitemap.ts` | Static | Enumerates pages + services + builds |
| `/robots.txt` | `app/robots.ts` | Static | |
| `/opengraph-image` | `app/opengraph-image.tsx` | Static | Dynamic PNG via `ImageResponse` |
| `/icon` | `app/icon.tsx` | Static | Favicon (PNG) |
| `/apple-icon` | `app/apple-icon.tsx` | Static | Apple touch icon |

## Client vs Server components

- **Server (default):** Every page and most components.
- **Client (`"use client"`):**
  - `components/layout/Nav.tsx` — needs `useState` for mobile menu + `useEffect` for scroll state.
  - `components/contact/ContactForm.tsx` — needs state for submit status + client-side validation.

**Heuristic:** if it doesn't have state, effects, or browser APIs, it's a Server Component.

## Styling system

- **Tailwind CSS v4** — no `tailwind.config.{js,ts}` file; configured via `@theme { … }` in `app/globals.css`.
- **Design tokens** are CSS custom properties: `--color-bg`, `--color-accent`, `--font-display`, etc.
- **Usage in markup**: `text-[--color-accent]`, `bg-[--color-surface]`, `font-[--font-display]`, etc.
- **No runtime CSS-in-JS** (no styled-components, emotion, etc). Never add one.
- **Rebranding:** change the variable in `@theme` — the site picks it up everywhere.

## SEO surface

- **Per-page metadata** — each route exports `metadata` or `generateMetadata()`.
- **Root defaults** — `app/layout.tsx` sets title template, OG, Twitter card, robots.
- **JSON-LD** — built from `lib/schema.ts` helpers:
  - `AutoRepair` + `LocalBusiness` on root layout (hours, address, `areaServed`, offers).
  - `Service` on each `/services/[slug]` page.
  - `FAQPage` on `/faq`.
  - `BreadcrumbList` on service and build detail pages.
- **Dynamic OG image** — `app/opengraph-image.tsx` uses `next/og`'s `ImageResponse`.
- **Sitemap + robots** — generated at build time.

## Data model

### `lib/site.ts`
Single `site` constant with all company info. Typed via `as const` so field access stays autocomplete-safe.

### `lib/services.ts`
```ts
type Service = {
  slug: string;            // URL segment
  title: string;
  tagline: string;
  category: "Performance" | "Chassis" | "Maintenance" | "Diagnostics" | "Specialty";
  icon: string;            // key into Icon.tsx switch
  highlights: string[];    // bullet list
  body: string[];          // paragraph list for detail page
  relatedSlugs?: string[]; // for "related services" module
};
```
Derived indexes: `servicesBySlug`, `servicesByCategory`, `categoryOrder`.

### `lib/builds.ts`
```ts
type Build = {
  slug, title, subtitle, year, make, model, platform,
  hp?, tq?, heroImage, gallery, specs, story, tags
};
```
Derived: `buildsBySlug`.

### `lib/validation.ts`
`contactSchema` is a `z.object({…})`. Imported by both `ContactForm` (client) and `/api/contact` (server). **Single source of truth for what a valid contact submission looks like.**

## Anti-spam layers (contact form)

1. **Zod validation** — client and server.
2. **Honeypot** — invisible `company` field; bots fill it, humans don't.
3. **Minimum submit time** — form must be on screen ≥ 1500ms before submission.
4. **Per-IP rate limit** — 5 submissions/hour, in-memory `Map`. Upgrade path to Upstash/KV documented in the route handler.

## What to open when …

- Editing copy on the homepage → `components/home/Hero.tsx` (and siblings).
- Adjusting nav items → `lib/site.ts` (`nav` array).
- Changing the primary CTA → most `<Button />` instances in `components/home/*` and `layout/Nav.tsx`.
- Adding a social link → `lib/site.ts` (`socials`) + optional icon case in `components/ui/Icon.tsx` + link in `components/layout/Footer.tsx`.
- Changing how a service detail page looks → `app/services/[slug]/page.tsx`.
- Adjusting the build detail layout → `app/builds/[slug]/page.tsx`.
- Tweaking SEO defaults → `app/layout.tsx` metadata.
- Changing OG image design → `app/opengraph-image.tsx`.
- Changing JSON-LD → `lib/schema.ts`.
