# Roadmap

What's planned, what's in progress, what's deliberately deferred. A future AI session should read this before proposing "new" features — many are already scoped.

Organized by **Now** (foundation-polish), **Next** (growth features), and **Later** (scale).

---

## Now — foundation polish

These are unblocking items that turn the shell into a real site. Everything here is small and safe.

### Content / assets

- [ ] Replace `BuildArt` placeholders with real photos. When Rav delivers, drop into `public/images/builds/<slug>/hero.jpg` and swap `<BuildArt />` for `<Image>` in `app/builds/page.tsx` and `app/builds/[slug]/page.tsx`.
- [ ] Replace the About-page headshot placeholder. Same pattern: `public/images/headshot/rav.jpg`, swap the SVG for `<Image>`.
- [ ] Hero photo on homepage — currently styled-gradient / grid. Replace with a real hero shot when available.
- [ ] Replace the `components/ui/Logo.tsx` wordmark with the real SVG when Rav delivers.
- [ ] Swap placeholder testimonials in `components/home/Testimonials.tsx` with real quotes. Keep the same 3-card shape.
- [ ] Populate real contact info in `lib/site.ts` (phone, email, precise street address once the shop location is confirmed).

### Reliability / infra

- [ ] Upgrade contact-form rate limit from in-memory `Map` to Upstash Redis or Vercel KV. Interface is ~10 lines (see `app/api/contact/route.ts`). Needed once the site serves from multiple regions.
- [ ] Add Vercel Analytics (cookieless). One-click in the Vercel dashboard.
- [ ] Wire up Google Search Console → submit `sitemap.xml`.
- [ ] Create + claim Google Business Profile. This is the #1 local-SEO move; unblocks map-pack presence.

### Small UX

- [ ] Add a visible `PT` timezone tag next to business hours.
- [ ] Add a "cities we serve" chip row on `/contact` — list the 12 Sacramento-metro cities from `lib/schema.ts` `areaServed`.
- [ ] Add a "directions" link on `/contact` once the street address is finalized.

---

## Next — growth features

Ship these in order. Each one moves the business forward and builds on the previous.

### 1. Real photography integration

Once Rav has 20–30 good photos, swap every placeholder and add a per-build gallery. Use `next/image` with sizes attribute + `priority` on above-the-fold.

### 2. Build log / blog

Every finished car becomes a build log page. Build logs are the single biggest SEO asset over time. Current typed-array approach (`lib/builds.ts`) gets us started; when there are 10+ builds, consider MDX so Rav's friends can write richer stories without editing TS.

**Scope:**
- Keep the typed array as the registry.
- Each build can optionally reference an MDX file in `content/builds/<slug>.mdx` for rich long-form copy.
- Render via `next-mdx-remote` or `@next/mdx`.
- **Deferral condition:** don't add MDX until we have 10+ builds; typed strings are fine until then.

### 3. Google Reviews integration

Pull reviews from Google Business Profile and render on the homepage. Replaces the placeholder testimonials eventually.

**Options:**
- Google Places API → serverless route → cache response for 1 hour.
- Or manually curate + update quarterly (simpler, no API key rot).

Start with manual.

### 4. Online booking / quote request

Current contact form is general-purpose. Next step: structured "book a service" flow that captures car details, service type, and ideal dates.

**Options (ranked by recommendation):**
1. Extend existing form with date / service-type fields → still emails Rav. No dashboard. (Recommended to start.)
2. Cal.com embed — free, self-hosted option, per-service availability.
3. Calendly — fastest to ship but paid for the good features.

### 5. Customer photo galleries / IG integration

Currently `InstagramStrip` is 6 static colored tiles linking to IG. Upgrade:
- Fetch latest 6 posts server-side via Instagram Basic Display API or a static list of curated images in `/public/images/ig/`.
- **Do not embed the official IG iframe.** It tanks Lighthouse (-20 Perf, layout shift). Worth preserving the static approach.

### 6. Service pricing (maybe)

Currently no pricing shown. Rav's preference is to scope builds in conversation. Could add **starting-at** prices for bolt-on/common services only.

**Decision criterion:** add only if Rav finds that 50%+ of inbound inquiries are price-tire-kicking. Otherwise, the current model (engage on inquiry) is healthier.

---

## Later — scale / opportunistic

Don't build these until there's a clear need.

- **Customer portal** — login, see your car's service history, download tune files and dyno graphs. High LTV for repeat customers. High cost to build.
- **Merch / apparel shop** — if brand recognition grows, a small apparel drop is light effort via Shopify or Printful embed.
- **Event calendar** — track days, dyno days, meets hosted at the shop. `FullCalendar` or a typed array of events.
- **Multilingual** — if a meaningful fraction of audience prefers Spanish. Can tackle later with `next-intl`.
- **Secondary blog / editorial** — long-form tuning education. Only if Rav wants to write / record regularly.
- **Multi-brand expansion** — RSpec is Nissan/JDM-first. If that expands explicitly, a BRANDS or PLATFORMS page can highlight which platforms we work on.

---

## Explicitly out of scope (for now)

- Building a headless CMS (Sanity, Contentful, etc.) — typed arrays in `lib/` are simpler and sufficient until Rav has a dedicated content person.
- User-generated reviews on-site — Google reviews + testimonials curated by Rav is enough. On-site reviews attract spam.
- E-commerce (selling parts) — different business model; would dominate the roadmap. Out until explicitly requested.
- Native mobile app — zero demand signal. Don't build until data says otherwise.
- Tailwind downgrade to v3 — no reason. v4 works and is the modern path.
- Framework switch (to Astro, Remix, SvelteKit, etc.) — no reason. Next.js is working and the ecosystem is strong.

---

## How to suggest a new item

Add it to the bottom of the relevant section with:

1. One-sentence goal
2. Why now (what changed?)
3. Rough scope (hours or complexity)
4. A clear "deferral condition" if there's any reason to not do it immediately.
