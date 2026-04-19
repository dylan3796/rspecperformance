# Content Guide

Anything customer-facing — service descriptions, build stories, FAQ answers, blog posts, OG titles, meta descriptions, Instagram captions referenced on-site — follows this guide.

## Voice, in one sentence

A calm, confident master technician who drives the same cars you do.

## Voice attributes

| Trait | Meaning | Example |
|---|---|---|
| **Direct** | Short sentences. Active voice. No throat-clearing. | *"We tune to a reliability target first."* |
| **Specific** | Numbers, platforms, and parts by name. Not vague adjectives. | *"720 whp on E85 with clean knock behavior."* |
| **Literate** | Uses the right platform and part terminology. No over-explaining to insiders, no gatekeeping beginners. | *"EcuTek calibration on an R35 VR38DETT."* |
| **Honest** | Calls out trade-offs and limitations. Doesn't oversell. | *"Bolt-ons without a tune leave power on the table."* |
| **Quietly proud** | Lets the work speak. No hype, no exclamation points. | *"Built on JDM."* |

## Forbidden patterns

- ❌ `ALL CAPS` marketing (yelling).
- ❌ Exclamation points. Ever.
- ❌ 🚀 / 🔥 / 💪 emojis. (Emojis in IG captions are fine; website copy, no.)
- ❌ Cliches: "unleash," "beast mode," "passion for excellence," "your car's potential," "next level."
- ❌ Hedging: "up to," "as much as," "we might be able to," "feel free to."
- ❌ Pricing on the site. Scope conversations happen in the contact flow.
- ❌ Cringe auto-industry tropes: "We treat every car like it was our own" (everyone says this). Be specific about what we actually do differently.

## Length

- **Hero headlines:** 5–9 words. Two lines max on mobile.
- **Section titles:** 4–8 words.
- **Service taglines:** ≤ 20 words, one sentence.
- **Service body paragraphs:** 2–4 per service, 2–3 sentences each.
- **Build subtitles:** ≤ 15 words.
- **Build stories:** 2–4 short paragraphs.
- **FAQ answers:** 2–4 sentences. Get to the point.
- **Meta descriptions:** 150–160 characters, lead with the value.

## SEO writing rules

1. **Lead with the platform + location.** "Nissan GT-R tuning in Sacramento" beats "Tuning Services — RSpec Performance."
2. **Natural keyword density.** Write for humans first; Google is better than it was in 2012 at recognizing good content.
3. **One H1 per page.** That H1 is the page's promise.
4. **Descriptive link text.** "See our R35 GT-R build" not "click here."
5. **Schema.org via `lib/schema.ts`.** Every key page already emits structured data — don't inline JSON-LD strings manually.
6. **Canonical URLs** — every page exports `alternates.canonical`. Don't skip this.

## Local-SEO priorities

We're a Sacramento shop. Our non-negotiable target queries:

- `Nissan tuner Sacramento`
- `JDM shop Sacramento`
- `GT-R tune Sacramento` / `GT-R tune Roseville`
- `350Z 370Z tune Folsom`
- `Nissan master tech near me` (for people in Sacramento metro)
- `Consult-III+ diagnostic Sacramento`
- `ECU tune EcuTek Sacramento`

These show up naturally if service-page copy and JSON-LD are Sacramento-aware. **Don't hardcode city names in component copy** — the `areaServed` list in `lib/schema.ts` + the site config in `lib/site.ts` already handle it.

## Copy templates

### Service page tagline template

> **[Service name]** — [concrete action or outcome] for [platform set]. [Trust-building proof point].

Example:
> ECU tuning — custom, dyno-verified calibrations on EcuTek, Cobb, UpRev, and factory Nissan platforms. Built from your datalogs, not a canned file.

### Build subtitle template

> **[Year Make Model] — [build philosophy in 3–5 words]. [Context or result].**

Example:
> 2017 R35 GT-R — Street-build Stage 2. Turbo-back, E85, and a calibration that actually drives well.

### FAQ answer template

Start with the direct answer. Follow with the one relevant nuance. End with a CTA only if natural.

> **Q:** Do you work on cars other than Nissan?
> **A:** Yes. Our specialty is Nissan and JDM platforms, but we regularly work on Subaru, Toyota/Lexus, Ford, and modern performance cars on Cobb, EcuTek, and dyno. If you're not sure, ask us.

### Homepage hero template

Two lines:
- Line 1 — a promise about standards. (*"Dealer-level precision."*)
- Line 2 — a gradient-accented promise about ambition. (*"Tuner-level ambition."*)

Don't deviate without a strong reason.

## Build-log structure

Each build on `/builds/[slug]` should tell a story in this order:

1. **Customer's context** — what they drive, what they wanted, how they use the car.
2. **The plan** — what we scoped, what we deprioritized, what the reliability target was.
3. **The build** — the parts, tune philosophy, anything unusual.
4. **The result** — numbers, drivability notes, customer feedback.

Not all sections need to be labeled — weave into 2–4 paragraphs (see the existing 3 builds for format).

## CTAs

Primary CTA throughout the site: **"Book a consult."**
Secondary CTA: **"See builds."**

Avoid "Contact us" — it's generic. *Book a consult* implies a real conversation and signals seriousness.

## Images

- **Hero images** — landscape, ≥ 2400px wide, low-noise (no cluttered backgrounds), car centered or lower-third.
- **Build images** — ≥ 1600px on the long side. Shoot in dealer-quality lighting (overcast, indoor shop light, or golden hour).
- **Alt text** — describe the car + what's shown, not "photo of car." *"2017 Nissan GT-R on dyno, front-quarter view, shop interior."*
- File names: `kebab-case` and meaningful. `r35-gtr-dyno-front.jpg` beats `IMG_4832.jpg`.

## Instagram synergy

- The site exists to convert IG followers. Every build we post to IG should eventually become a build log on the site.
- Captions on IG can be looser (emojis fine, hashtags fine). The site is the cleaned-up version.
- If a caption on IG has a great story, ask Rav if it can become the build log body.
