# CLAUDE.md — entry point for AI agents working on R-Spec Auto & Performance

> You (the AI) just opened this repo. Read this file first. It's your map.

## What this repo is

The one-page marketing website for **R-Spec Auto & Performance** — a full-service JDM specialty shop in **Sacramento, CA** run by **Rav**, a Nissan master technician (7+ years at the dealer, 10+ years wrenching). Live at https://rspecperformance.com.

> **Current state: holding page.** The public site is deliberately down to the badge and a "Work in progress" line (`app/page.tsx`). The full homepage is parked, intact, in `components/home/HomePage.tsx`, and `<Nav />` / `<Footer />` are commented out of `app/layout.tsx`. `/admin` and `/portal` still work. To put the site back: re-export the parked page from `app/page.tsx` and restore the two layout components. Don't rebuild the homepage from scratch — it already exists.

This is a **foundation / shell**. Rav and a small group of contributors (cousin Dylan, friend Edrick) will iterate on it. Future AI sessions should expect to:

- Add new services or builds (typed arrays in `lib/`)
- Polish copy, swap placeholder art for real photos
- Add pages as the business grows (booking, blog, customer portal)
- Improve SEO, analytics, performance
- Never ship aggressive refactors without a good reason — this is a working product, not a playground

## Where to start reading

Read in this order:

1. **CLAUDE.md** (this file) — map + conventions summary
2. **[docs/BUSINESS.md](./docs/BUSINESS.md)** — who RSpec is, brand voice, positioning, audience. **Critical context** for any copy or content change.
3. **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — complete file-by-file tour
4. **[docs/CONVENTIONS.md](./docs/CONVENTIONS.md)** — coding patterns; do-this / don't-do-that
5. **[docs/ROADMAP.md](./docs/ROADMAP.md)** — prioritized backlog so you know what "next" means
6. **[docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md)** — voice, tone, SEO strategy for anything customer-facing
7. **[docs/GLOSSARY.md](./docs/GLOSSARY.md)** — JDM / Nissan / tuning terms so you don't hallucinate specs

For non-technical context:

- **[HANDOFF_FOR_RAV.md](./HANDOFF_FOR_RAV.md)** — the owner's guide (plain English, for Rav)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Vercel + Porkbun + Resend deployment walkthrough
- **[ASSETS_NEEDED.md](./ASSETS_NEEDED.md)** — checklist of photos/copy Rav owes the devs

## The 30-second stack summary

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** via `@theme` in `app/globals.css` (NO config file)
- **Resend** for transactional email (contact form)
- **Zod** for input validation (shared client + server schema)
- **pnpm** for installs
- **Vercel** for hosting (auto-deploys `main`)

## The single-source-of-truth rule

Every domain concept has **one file** that owns it. Edit the file, the rest regenerates.

| Concept | Owner file |
|---|---|
| Company info (phone, email, hours, socials, nav) | `lib/site.ts` |
| Services list | `lib/services.ts` |
| Bookings / customers / updates (Postgres) | `lib/db.ts` |
| Admin session + portal link tokens | `lib/auth.ts` |
| Transactional email templates | `lib/emails.ts` |
| JSON-LD (schema.org) builders | `lib/schema.ts` |
| Shared zod schemas | `lib/validation.ts` |
| Fonts | `lib/fonts.ts` |
| Brand tokens (colors, spacing, typography) | `app/globals.css` → `@theme` block |

**If you find yourself hardcoding a company fact in a page or component, stop.** Add it to `lib/site.ts` and reference it.

## The 10 rules

1. **React Server Components by default.** Only add `"use client"` when a component needs browser APIs, state, or effects. Currently only `Nav.tsx` and `ContactForm.tsx` are client components; `/admin` and `/portal` are server components built on server actions.
2. **No CSS-in-JS libraries.** Tailwind utilities + CSS custom properties (e.g. `text-[--color-accent]`) are the entire styling system.
3. **Brand is CSS variables.** Change colors by editing one line in `app/globals.css` `@theme`. Never hardcode hex in components.
4. **Validation is shared.** `lib/validation.ts` exports one zod schema used by both the client form and the server route.
5. **Metadata lives in the page.** Each route exports `metadata` or `generateMetadata`. Root defaults are in `app/layout.tsx`.
6. **JSON-LD is centralized.** Build with helpers from `lib/schema.ts`, render via `<script type="application/ld+json">`.
7. **New services = append to the array in `lib/services.ts`.** They render on the home page and in the booking form dropdown. Keep it to a handful — the whole point of the redesign is one simple page.
8. **Keep components small (<~150 lines).** If it's bigger, it's doing too much.
9. **Performance budget.** Lighthouse: Perf ≥ 90, SEO 100, A11y ≥ 95. Anything > 30 KB gzipped needs justification.
10. **Preserve Sacramento context.** We're a Sacramento shop. Copy, SEO keywords, and schema.org `areaServed` all reflect that. Don't revert to generic or to wrong cities.

## Common tasks — direct links

- Add a service → `lib/services.ts`, append an object. Icons live in `components/ui/Icon.tsx`.
- Add work photos/clips → drop web-compressed files in `public/work/` and wire them into the `Work` section in `components/home/HomePage.tsx`.
- Change brand color → `app/globals.css` → edit `--color-accent`.
- Update phone/email/hours → `lib/site.ts`.
- Add a page → think twice: the site is deliberately a one-pager. If truly needed, create `app/<route>/page.tsx`, export `metadata`, add to `app/sitemap.ts`.

## Do not

- Don't add styled-components / emotion / MUI / Chakra. We own our primitives in `components/ui/`.
- Don't put secrets in `lib/site.ts` — only public info.
- Don't embed the official Instagram iframe on the homepage (tanks Lighthouse). Link out instead.
- Don't change the Sacramento locality / `areaServed` list without being asked.
- Don't commit `.env.local`. Use Vercel env vars for production.
- Don't run `git push --force` on `main`.
- Don't add dependencies casually. If you must, read `docs/CONVENTIONS.md` first.

## You're probably here to…

- **Ship a content change** → `docs/CONTENT_GUIDE.md` for voice, then edit `lib/`.
- **Add a feature** → read `docs/ROADMAP.md` first to see if it's already scoped.
- **Debug a build/deploy** → `DEPLOYMENT.md` has the full pipeline + troubleshooting.
- **Talk about the business** → `docs/BUSINESS.md` has positioning and voice.

Good luck. Ship clean.
