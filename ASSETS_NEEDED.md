# ASSETS_NEEDED — what to send to replace placeholders

This is everything the developers need from Rav to make the site 100% real. Until these are delivered, the site uses tasteful placeholders flagged with `TODO(Rav)` comments in the code.

## Priority 1 — needed for launch

- [ ] **Logo SVG** (ideally light + dark variants). Drop at `/public/logo.svg` and `/public/logo-mark.svg`.
- [ ] **Business phone number** — update in `lib/site.ts` (`phone`, `phoneHref`).
- [ ] **Business email** — update in `lib/site.ts` (`email`, `bookingEmail`).
- [ ] **Service area / address** — update `lib/site.ts` (`address`, `serviceArea`) and `lib/schema.ts` (`areaServed` cities).
- [ ] **Hours of operation** — update `lib/site.ts` (`hours`) and the opening-hours spec in `lib/schema.ts`.
- [ ] **Hero photo** (landscape, ≥2400px wide, clean shot of a tuned Nissan). Drop at `/public/images/hero/hero.jpg` and swap the placeholder in `components/home/Hero.tsx` for `<Image>`.
- [ ] **Headshot of Rav** at `/public/images/headshot/rav.jpg`. Swap placeholder in `app/about/page.tsx`.

## Priority 2 — needed soon after

- [ ] **3 real testimonials** — quote + first name + car. Replace the dummies in `components/home/Testimonials.tsx`.
- [ ] **3–5 build photo sets**, one folder per build at `/public/images/builds/<slug>/hero.jpg` + supporting shots. Replace `<BuildArt />` with `<Image>` in `app/builds/page.tsx` and `app/builds/[slug]/page.tsx`.
- [ ] **Shop interior/exterior photos** for the About page gallery (once we add one).
- [ ] **Google Business Profile URL** — add to `lib/site.ts` socials.
- [ ] **Final services list** — trim or expand `lib/services.ts`.

## Priority 3 — growth assets

- [ ] **TikTok / YouTube / Facebook links** if you launch any of them — add to `lib/site.ts` socials.
- [ ] **6 curated Instagram thumbnails** for the homepage strip — drop at `/public/images/ig/1..6.jpg` and wire them in `components/home/InstagramStrip.tsx`.
- [ ] **FAQ updates** — review `lib/faqs.ts` and add real questions customers ask you.
- [ ] **Dyno graph images** for featured builds (builds pages can host these).

## How to deliver

1. **Photos:** share a Google Drive folder with the devs.
2. **Logo:** SVG is best. If you only have a PNG or JPG, send the highest-res version you can find.
3. **Text/copy:** paste it in a Google Doc or text it — whatever is easiest.
4. **Phone/email/address:** just text the devs. 30-second change.
