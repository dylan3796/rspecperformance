# RSpec Performance — rspecperformance.com

Marketing site for RSpec Performance, a Nissan / JDM specialty performance shop in Sacramento, CA. Next.js 16 (App Router) + TypeScript + Tailwind v4, deployed on Vercel.

## Audience-specific entry points

- **You're an AI agent (Claude, Cursor, Copilot, etc.)?** Read **[CLAUDE.md](./CLAUDE.md)** first. It's your map.
- **You're a human developer?** Keep reading this README, then skim [CLAUDE.md](./CLAUDE.md) and [docs/](./docs).
- **You're Rav (the owner)?** Open **[HANDOFF_FOR_RAV.md](./HANDOFF_FOR_RAV.md)** — plain English, no code.
- **You need to deploy or debug hosting?** **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

---

## Quick start

```bash
pnpm install
cp .env.local.example .env.local   # fill in Resend key + contact email
pnpm dev                           # http://localhost:3000
```

### Scripts

| Command       | What it does                 |
| ------------- | ---------------------------- |
| `pnpm dev`    | Dev server with Turbopack    |
| `pnpm build`  | Production build             |
| `pnpm start`  | Run the built app            |
| `pnpm lint`   | ESLint                       |

### Environment variables

See [`.env.local.example`](./.env.local.example). Required in production:

- `RESEND_API_KEY` — contact form email delivery
- `CONTACT_TO_EMAIL` — where inquiries land
- `CONTACT_FROM_EMAIL` — must be on a Resend-verified domain
- `NEXT_PUBLIC_SITE_URL` — e.g. `https://rspecperformance.com`

---

## Documentation map

All the context a new contributor (human or AI) needs, grouped:

### Always-relevant

- **[CLAUDE.md](./CLAUDE.md)** — AI / developer entry point. Stack, single-source-of-truth rule, 10 conventions.
- **[AGENTS.md](./AGENTS.md)** — tool-agnostic agent instructions (Cursor, Copilot, Continue, etc.).

### Deeper references (in `docs/`)

- **[docs/BUSINESS.md](./docs/BUSINESS.md)** — company identity, audience, brand voice, positioning.
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — file-by-file tour, request flow, routing map.
- **[docs/CONVENTIONS.md](./docs/CONVENTIONS.md)** — deep coding patterns with rationale.
- **[docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md)** — voice, tone, SEO rules, copy templates.
- **[docs/ROADMAP.md](./docs/ROADMAP.md)** — what's planned (now / next / later), what's deferred.
- **[docs/GLOSSARY.md](./docs/GLOSSARY.md)** — JDM / Nissan / tuning terminology.

### Operational

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Vercel + Porkbun DNS + Resend walkthrough, ~30 min.
- **[ASSETS_NEEDED.md](./ASSETS_NEEDED.md)** — checklist of photos/copy Rav owes the devs.
- **[HANDOFF_FOR_RAV.md](./HANDOFF_FOR_RAV.md)** — non-technical owner guide.
- **[GOOGLE_DOC.md](./GOOGLE_DOC.md)** — how to mirror handoff docs into a shared Google Doc.

---

## Architecture (skim version)

```
app/        Next.js App Router pages, API routes, metadata (sitemap/robots/OG/icons)
components/ React components — Server Components by default
lib/        Domain: site config, services/builds/faqs arrays, zod schemas, JSON-LD
public/     Static assets
docs/       Deeper internal documentation (see map above)
```

Full tour: **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**.

---

## Deploy

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full step-by-step walkthrough (Vercel + Porkbun DNS + Resend domain verification). Budget ~30 minutes.

Every push to `main` auto-deploys to production. Every PR gets a preview URL.

---

## License

Private. © RSpec Performance.
