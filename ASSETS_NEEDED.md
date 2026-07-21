# ASSETS_NEEDED — what's still placeholder

The site now uses the real R-Spec badge and real shop photos/video. What's left before launch is small. Placeholders are flagged with `TODO(Rav)` comments in the code.

## Needed for launch

- [ ] **Business phone number** — update in `lib/site.ts` (`phone`, `phoneHref`). Currently a (555) placeholder.
- [ ] **Confirm service area / address** — `lib/site.ts` (`address`, `serviceArea`) and `lib/schema.ts` (`areaServed` cities).
- [ ] **Confirm hours** — `lib/site.ts` (`hours`) and the opening-hours spec in `lib/schema.ts`.
- [ ] **Resend key + contact email** set in Vercel (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) so the booking form actually sends.

## Nice upgrades

- [ ] **Original logo file** (SVG or high-res PNG on transparent background). The current badge at `public/brand/rspec-badge.webp` is cleaned up from a photo of a screen — it looks good on the dark site, but the original artwork would be sharper. Also regenerate `app/icon.png`, `app/apple-icon.png`, and `app/opengraph-image.jpg` from it.
- [ ] **More work photos/clips** — web-compressed files in `public/work/`, wired into the `Work` section in `app/page.tsx`. Keep videos short (≤15s) and under ~5 MB.
- [ ] **Google Business Profile URL** — add to `lib/site.ts` socials.

## How to deliver

1. **Photos/video:** share a Google Drive folder or text them.
2. **Logo:** SVG is best; otherwise the highest-res PNG you can find.
3. **Phone/address/hours:** just text it. 30-second change.
