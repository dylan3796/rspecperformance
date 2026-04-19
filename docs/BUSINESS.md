# Business Context — RSpec Performance

The single most important doc for anything customer-facing. Read before writing copy, SEO, or anything the public sees.

## The company in one paragraph

**RSpec Performance** is a Nissan / JDM specialty performance shop based in **Sacramento, California**, founded by **Rav** — a Nissan master technician with 7+ years at the Nissan dealership and 10+ years wrenching on JDM platforms. The company exists because enthusiasts deserve dealer-level discipline applied to enthusiast-level ambitions: honest diagnostics, documented work, and calibrations that actually drive well in the real world.

## Who the customer is

Primary persona: **"Alex, 28–45, owns a Nissan or JDM car worth $30K+"**

- Drives an R35 GT-R, 350Z / 370Z / Z, Silvia / 240SX, Skyline import, or Infiniti cousin (Q60, G37).
- Has been burned by a general shop that didn't know the platform, or by a "tuner" who chased a dyno number and made the car worse.
- Values: honesty over hype, reliability over peak numbers, clear documentation over vibes.
- Discovers shops via Instagram, Google, word-of-mouth, and car meets.
- Willing to wait for the right shop; not willing to risk a $60K car at the wrong one.

Secondary personas:

- **Track-day drivers** prepping for HPDE weekends (brakes, fluids, safety, alignment).
- **Pre-purchase inspection buyers** — imports and used 350Z/GT-R/Silvia market.
- **Build customers** committing to multi-week projects (turbo kits, rebuilds, resto-mods).

## Geographic reach

- **Primary:** Sacramento, Elk Grove, Roseville, Rocklin, Folsom, Citrus Heights, Rancho Cordova, Natomas, West Sacramento.
- **Secondary:** Davis, Woodland, Stockton, Vacaville, Lodi.
- **Destination/ship-in:** Bay Area builds and out-of-state customers trailering in for specialty work.

These cities are authoritative for `lib/schema.ts` (`areaServed`). Update there, not in page copy.

## Brand positioning

**"Dealer-level precision. Tuner-level ambition."**

- Not a general shop. Not a dealer. Not a tuner-shop stereotype.
- The intersection: dealer-level diagnostic rigor and documentation + enthusiast-level tuning and build experience.
- Credibility anchors: Nissan master-technician certification, Consult-III+ diagnostics, real dyno + datalogs.

### What we are

- **Honest.** We'll tell you the part you picked is wrong before we turn a wrench.
- **Specialists.** Nissan and JDM is our DNA, not a side-specialty.
- **Documented.** Every job has logs, photos, and numbers.
- **Calibrated to reality.** Tunes are built from your datalogs on your fuel, not canned files.

### What we are NOT

- A parts-cannon shop (guess and replace).
- A peak-number chaser with no reliability discipline.
- A dealer (we move faster, charge fairer, care more).
- A generalist (we don't pretend to be experts on Porsches or VWs).

## Voice and tone

### The voice in one sentence

A calm, confident master technician who drives the same cars you do — respectful of the customer, direct about trade-offs, and allergic to hype.

### Do

- Short, declarative sentences. "We tune to a reliability target first."
- Specifics over adjectives. Not "powerful" — "720 whp on E85 with clean knock behavior."
- Platform literacy. R35, VR38DETT, SR20DET, Consult-III+, EcuTek, UpRev.
- Honest trade-offs. "Bolt-ons without a tune leave power on the table."
- Quietly proud. Let the work speak.

### Don't

- ALL CAPS MARKETING VOICE.
- Exclamation points. 🚀 emojis. Military/"unleash"/"beast mode" cliches.
- Vague platitudes ("passion for excellence").
- Weasel words ("up to," "estimated," "as much as").
- Pricing on the site (we scope builds in conversation, not pre-quoted).

### Examples

**Bad:** *"Unleash the beast! 🔥 RSpec Performance delivers UNMATCHED tuning services for your Japanese dream car!!!"*

**Good:** *"Dealer-level precision. Tuner-level ambition. Nissan and JDM specialists in Sacramento."*

## Core services (short version)

1. ECU tuning (EcuTek, Cobb, UpRev) on dyno with street validation
2. Dyno tuning with before/after documentation
3. Turbo / supercharger builds (stage 1 bolt-ons → built-motor packages)
4. Suspension, brakes, and chassis work
5. Dealer-grade Nissan diagnostics (Consult-III+)
6. Scheduled maintenance and service
7. Track-day / HPDE prep
8. Pre-purchase inspections (huge value for Z / GT-R / Silvia buyers)
9. Nissan / JDM specialty work (platform-specific expertise)
10. Fabrication and custom install

Full authoritative list: `lib/services.ts`.

## Growth thesis

1. **Instagram is the top of the funnel.** Rav posts builds, dyno runs, and wrench work. Every good post drives follows; every follower is a future lead.
2. **The website is the trust moment.** Once someone sees an IG post they care about, they hit the site to validate the shop is real. Professional site = booked inquiry.
3. **Google is the long game.** Every service page and build log is a Google-ranked asset. In 6 months, organic search should be a meaningful lead source for "Nissan tuner Sacramento," "GT-R tune Roseville," etc.
4. **Google Business Profile** is the underrated #1 local-SEO move. Claim it, load it with photos, collect reviews.
5. **Build logs beat a blog.** Customers scroll build pages like Instagram. Each finished car → a build log on the site → a Google asset + IG post + text message to the customer.
6. **Reviews compound.** A simple text: *"Loved how it turned out? A quick Google review helps more than you'd think."* sent after every job.

## Competitive context (Sacramento area)

- Sacramento has a healthy enthusiast scene: meets, tracks (Thunderhill 2 hours, Sonoma Raceway 2 hours), a solid Z/GT-R owner density, and multiple general performance shops.
- Most general shops are "we do everything" — which means they're not Nissan specialists. RSpec's angle is **specialist depth** in a market that rewards it.
- Bay Area (2 hours) has bigger shops with more equipment; our angle vs. them is **closer, more personal, and Nissan-specific**.

## Team

- **Rav** — owner, master tech. Does the work.
- **Dylan** (cousin) — initial dev architect. Set up the site, handles infrastructure.
- **Edrick** (friend) — co-developer, will iterate on the site.
- **Future** — potential hire(s) for the shop; any additional web/marketing helpers.

## Constraints to keep in mind

- Rav is non-technical. All web work must be explainable in plain English (see `HANDOFF_FOR_RAV.md`).
- Budget constraint: everything lives on free tiers (Vercel, Resend, GitHub) for the foreseeable future. Total ops cost ≈ $12/year (domain).
- We don't have real photos yet. Placeholders are flagged `TODO(Rav)` and scheduled for swap as assets arrive.
- Rav's time is scarce. Any feature that adds admin burden (CMS, dashboards he has to log into) needs a high bar to justify.
