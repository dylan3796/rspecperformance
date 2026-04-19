# Conventions

Patterns we follow, with the reasoning. Deviate only with a reason you can defend in a PR.

## TypeScript

- **Strict mode on.** No `any` unless you're narrowing a true unknown from an external boundary (and even then, prefer `unknown`).
- Use `type` for unions and aliases; use `interface` only when extending.
- Prefer `as const` on literal data (like the services array config) so downstream code gets precise types without manual annotations.
- Zod schemas are the source of truth for runtime-validated shapes. Use `z.infer<typeof schema>` to derive TS types.

## React

- **Server Components by default.** Add `"use client"` only when required (state, effects, browser APIs, event handlers).
- Keep client components small and leaf-y. Don't convert a Server Component parent to a Client Component just to add an event handler somewhere deep — lift that piece into its own client island instead.
- Avoid `useEffect` for pure derived state. Prefer `useMemo` or just derive in render.
- Don't call impure functions (`Date.now()`, `Math.random()`) during render. Put them in `useEffect`, event handlers, or refs.
- Prefer composition over props-driven conditionals. Two clear components beat one with 8 boolean props.

## Styling

- **Tailwind utilities + `@theme` tokens.** No `style={{}}` objects except for dynamic values that can't express as classes.
- **Always use tokens.** `text-[--color-accent]`, not `text-[#00e5ff]`. Rebranding is one line; hardcoded hex is a grep-and-pray.
- **No arbitrary pixel values for brand-level spacing.** Stick to Tailwind's scale (`p-4`, `gap-6`). Per-component oddities are fine (`top-[3px]`).
- **Dark mode**: the site is single-mode (dark). Don't introduce a toggle unless the user asks — it doubles the styling surface.

## Data shapes

- **Single file owns each concept** — see the table in `CLAUDE.md`.
- **Append, don't restructure.** Adding a service = append to `services` array. Adding a build = append to `builds`. Don't rename existing slugs (breaks URLs and external links).
- If you really need to rename a slug, add a redirect in `next.config.ts` and leave a comment explaining why.

## Routing

- New pages: `app/<route>/page.tsx` with a `metadata` export. Add to `lib/site.ts.nav` if it belongs in the nav. Add to `app/sitemap.ts` if indexable.
- Dynamic routes: always implement `generateStaticParams` and `generateMetadata`. Use `notFound()` for unknown slugs.
- `params` is a `Promise` in Next 15+ / 16. `await params` in the page handler.

## Metadata and SEO

- Every page exports `metadata` (or `generateMetadata`) with at least `title` and `description`.
- Set `alternates.canonical` to avoid duplicate content issues (when the page has query params that don't change content).
- Don't inline JSON-LD strings. Build objects from `lib/schema.ts` helpers and `JSON.stringify` in a `<script type="application/ld+json">`.

## Forms

- Use the shared zod schema from `lib/validation.ts`. If a form needs extra fields, extend the schema there; don't duplicate it.
- Validate on both client and server. Client validation is UX; server is security.
- Honeypot field + min-submit-time guard: **both** required on any public-facing form.

## API routes

- Node runtime (`export const runtime = "nodejs"`) when using Node-only deps (Resend SDK uses node).
- Return `NextResponse.json({ ... }, { status })`. Never throw raw errors — catch and map to 4xx/5xx.
- Rate-limit by IP at a minimum. In-memory `Map` is fine for single-region; upgrade path (Upstash / Vercel KV) is documented inline.
- Don't log PII in plaintext. Emails are fine for debugging; don't log full message bodies in production.

## Performance

- **Lighthouse budget:** Perf ≥ 90, SEO 100, A11y ≥ 95, BP ≥ 95.
- Images: prefer `next/image` with `width`/`height` to prevent CLS. Use WebP/AVIF where possible.
- Fonts: `next/font/google` with `display: "swap"`.
- Don't import large libraries for trivial utilities. A 100 KB date library for one `toLocaleDateString` is not a trade.
- **New dependencies** — justify anything > 30 KB gzipped in the PR description. Run `pnpm why <pkg>` to check indirect weight.

## Accessibility

- Keyboard nav must work everywhere. Every interactive element has a visible focus ring (set globally in `globals.css`).
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, real `<button>`s, real `<a>`s.
- `alt` text on all images. Decorative SVGs get `aria-hidden` and no alt.
- Don't use color alone to communicate state (add icons/text).

## File + component structure

- One component per file. File name matches the default export.
- Co-locate utilities used only by one component in the same file. If shared, promote to `lib/` or a sibling component.
- Component files stay under ~150 lines. If bigger, split into sub-components or extract to `lib/`.
- Don't barrel-export from `components/`. Import from the file directly — better tree-shaking and easier to refactor.

## Naming

- **Components:** PascalCase (`ServiceCard`).
- **Files for React components:** `PascalCase.tsx`.
- **`lib/` files:** lowercase or kebab (`services.ts`, `site.ts`).
- **Routes:** lowercase, hyphenated slugs (`/services/forced-induction`).
- **Env vars:** `UPPER_SNAKE`. Prefix `NEXT_PUBLIC_` only if the client genuinely needs it.

## Git

- **Branch naming:** `feat/*`, `fix/*`, `docs/*`, `refactor/*`, or `claude/<desc>` for AI sessions.
- **Commit messages:** present-tense imperative subject line ("Add builds gallery"), blank line, then a paragraph of reasoning if the change isn't obvious.
- Never force-push `main`. Never `--no-verify` without the user's explicit OK.
- PRs into `main` get a Vercel preview URL. Use it to sanity-check before merging.

## Dependencies

- **pnpm** only. Don't commit `package-lock.json` or `yarn.lock`.
- Before adding a dependency, ask: (a) is there already a similar thing in the repo, (b) can I implement this in <50 lines, (c) is the package actively maintained?
- Pin major versions in `package.json` (`^16.0.0` is fine; `*` is not).

## Don't-ever list

- Don't introduce a CMS without the user explicitly asking.
- Don't add analytics that require a cookie banner. Vercel Analytics is fine (cookieless).
- Don't commit `.env*` files. The `.gitignore` already covers this; don't override.
- Don't ship hardcoded test data into a production deployment. Use env vars and real content.
- Don't rename files just for preference. It makes git history annoying for everyone else.
- Don't write comments that restate what the code does. Only explain *why* when the why isn't obvious.
