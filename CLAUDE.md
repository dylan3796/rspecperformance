# CLAUDE.md — entry point for AI agents working on RSpec Performance

> You (the AI) just opened this repo. Read this file first. It's your map.

## What this repo is

The marketing website for **RSpec Performance** — a Nissan / JDM specialty performance shop in **Sacramento, CA** run by **Rav**, a Nissan master technician (7+ years at the dealer, 10+ years wrenching). Live at https://rspecperformance.com.

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
| Services list + detail content | `lib/services.ts` |
| Builds / portfolio | `lib/builds.ts` |
| FAQ entries | `lib/faqs.ts` |
| JSON-LD (schema.org) builders | `lib/schema.ts` |
| Shared zod schemas | `lib/validation.ts` |
| Fonts | `lib/fonts.ts` |
| Brand tokens (colors, spacing, typography) | `app/globals.css` → `@theme` block |

**If you find yourself hardcoding a company fact in a page or component, stop.** Add it to `lib/site.ts` and reference it.

## The 10 rules

1. **React Server Components by default.** Only add `"use client"` when a component needs browser APIs, state, or effects. Currently only `Nav.tsx` and `ContactForm.tsx` are client components.
2. **No CSS-in-JS libraries.** Tailwind utilities + CSS custom properties (e.g. `text-[--color-accent]`) are the entire styling system.
3. **Brand is CSS variables.** Change colors by editing one line in `app/globals.css` `@theme`. Never hardcode hex in components.
4. **Validation is shared.** `lib/validation.ts` exports one zod schema used by both the client form and the server route.
5. **Metadata lives in the page.** Each route exports `metadata` or `generateMetadata`. Root defaults are in `app/layout.tsx`.
6. **JSON-LD is centralized.** Build with helpers from `lib/schema.ts`, render via `<script type="application/ld+json">`.
7. **New services / builds / FAQs = append to the array.** No new page files needed — detail pages auto-generate via `generateStaticParams`.
8. **Keep components small (<~150 lines).** If it's bigger, it's doing too much.
9. **Performance budget.** Lighthouse: Perf ≥ 90, SEO 100, A11y ≥ 95. Anything > 30 KB gzipped needs justification.
10. **Preserve Sacramento context.** We're a Sacramento shop. Copy, SEO keywords, and schema.org `areaServed` all reflect that. Don't revert to generic or to wrong cities.

## Common tasks — direct links

- Add a service → `lib/services.ts`, append an object. Icons live in `components/ui/Icon.tsx`.
- Add a build → `lib/builds.ts`, append an object. Drop photos in `public/images/builds/<slug>/` when available.
- Change brand color → `app/globals.css` → edit `--color-accent`.
- Update phone/email/hours → `lib/site.ts`.
- Add a page → create `app/<route>/page.tsx`, export `metadata`, add to `lib/site.ts.nav`, add entry to `app/sitemap.ts`.
- Add an FAQ → `lib/faqs.ts` array; auto-renders on `/faq` with JSON-LD.

## Do not

- Don't add styled-components / emotion / MUI / Chakra. We own our primitives in `components/ui/`.
- Don't put secrets in `lib/site.ts` — only public info.
- Don't embed the official Instagram iframe on the homepage (tanks Lighthouse). The curated static strip stays.
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
