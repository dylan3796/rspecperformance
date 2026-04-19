# AGENTS.md

> Canonical agent instructions for this repo. Tool-agnostic (Claude Code, Cursor, Copilot, Continue, Cline, Windsurf, etc.).
>
> For Claude Code specifically, see [`CLAUDE.md`](./CLAUDE.md) — it's the richer version of this file and the authoritative entry point.

## What you're working on

Marketing website for **RSpec Performance**, a Nissan / JDM specialty performance shop in Sacramento, CA. Live at https://rspecperformance.com.

Owner: Rav (Nissan master technician). Maintainers: Dylan, Edrick. This is a shell the team iterates on — prefer small, focused, shippable changes over large refactors.

## Read before coding

1. [`CLAUDE.md`](./CLAUDE.md) — stack summary, single-source-of-truth rule, 10 conventions
2. [`docs/BUSINESS.md`](./docs/BUSINESS.md) — company identity and brand voice
3. [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — file-by-file map
4. [`docs/CONVENTIONS.md`](./docs/CONVENTIONS.md) — patterns and anti-patterns
5. [`docs/ROADMAP.md`](./docs/ROADMAP.md) — what's planned; don't rebuild something already on the list

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (`@theme` in `app/globals.css`) · Resend · Zod · pnpm · deployed to Vercel from `main`.

## Hard rules

- Server Components by default; `"use client"` only when needed.
- No CSS-in-JS libraries. Tailwind utilities + CSS custom properties only.
- Brand colors / spacing / typography live in `@theme` in `app/globals.css` — never hardcode.
- Company facts live in `lib/site.ts` — never duplicate.
- Services / builds / FAQs are typed arrays in `lib/`; new entries auto-generate pages.
- Shared zod schemas (`lib/validation.ts`) for both client and server form handling.
- Sacramento is the service area. Don't change that unless the user explicitly asks.
- Lighthouse targets: Perf ≥ 90, SEO 100, A11y ≥ 95. Justify any dep > 30 KB gzipped.

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm lint
```

## Workflow

1. Confirm intent with the user if the change is non-trivial.
2. Make the change on a branch; push; a Vercel preview URL is auto-generated.
3. For small safe changes, committing directly to `main` is acceptable — Vercel deploys instantly.
4. Always run `pnpm lint && pnpm build` locally before pushing.
5. Never force-push `main`. Never skip hooks.
