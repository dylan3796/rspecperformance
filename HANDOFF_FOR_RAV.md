# RSpec Performance — The Plain-English Owner's Guide

Hey Rav — this is your site. This doc explains how it works and how to manage it without touching a single line of code. **Copy this whole file into a Google Doc** so you can share it with your team, leave comments, and come back to it whenever.

## Quick links (bookmark these)

| Link | What it is |
|---|---|
| **https://rspecperformance.com** | Your live website (after deployment) |
| **https://github.com/dylan3796/rspecperformance** | The code — where devs ship changes |
| **https://porkbun.com** | Where your domain is registered |
| **https://vercel.com/dashboard** | Hosting dashboard + traffic analytics |
| **https://resend.com/emails** | Log of every contact-form email sent to you |
| **https://www.instagram.com/r.specperformance/** | Your Instagram (cross-link from site) |
| **DEPLOYMENT.md** (in the repo) | Step-by-step walkthrough to get the site live |
| **ASSETS_NEEDED.md** (in the repo) | Checklist of photos/copy the devs need from you |

---

## 1. What you own

| Thing | Where it lives | What you do |
|---|---|---|
| Your **domain** (rspecperformance.com) | [porkbun.com](https://porkbun.com) | Pay the ~$12/year bill. Nothing else. |
| Your **website code** | GitHub repo `dylan3796/rspecperformance` | Nothing — your developers manage this. |
| Your **website hosting** | [vercel.com](https://vercel.com) | Log in occasionally to see traffic. Free. |
| Your **contact-form emails** | [resend.com](https://resend.com) | Inquiries land in your inbox automatically. Free. |
| Your **Instagram** | @r.specperformance | Post builds, dyno pulls, shop content. |

**Total running cost:** about **$12/year** (just the domain). Everything else is free under current usage.

---

## 2. What this site does for you

1. **Tells your story.** A real About page, your experience, how you work.
2. **Sells your services.** Every service has its own page with its own Google search ranking.
3. **Shows off your builds.** Each build is a portfolio piece — and a page Google can rank.
4. **Collects leads.** When someone fills out the contact form, you get an email within seconds.
5. **Looks legit on social shares.** Link previews on Instagram, text messages, etc. all look clean and branded.

---

## 3. Who does what

**You (Rav):**
- Send photos, text, and info to your developers when you want to change something.
- Check the contact-form inbox daily.
- Keep Instagram posting (the site shows a link to it prominently).

**Your developers (the homies):**
- Make the changes in the code.
- Push changes — they go live in ~60 seconds, automatically.

**You do NOT need to:**
- Know how to code.
- Know what "DNS" or "deploy" means.
- Log into anything technical unless you're curious.

---

## 4. How to get changes made

Send your developer a message like this:

> "Hey — change the hero photo on the homepage to [attach photo]."
>
> "Add a new build: 2020 Supra, 650 whp, EcuTek tune. Here are 5 photos."
>
> "Update the phone number to 416-555-0123."
>
> "Add a new service: 'Engine Rebuilds' — here's the description…"

That's it. They'll handle it.

---

## 5. Your contact form

When someone fills out the form on `/contact`, here's what happens:

1. The form is checked for spam (robots and fake submissions get blocked automatically).
2. A nicely formatted email is sent to **the email you choose** (default: `info@rspecperformance.com`).
3. You hit "Reply" — it goes straight back to the customer.

**If you stop getting emails,** text your developer — the API key or DNS probably needs a refresh.

**Want the contact email to go somewhere else?** Tell your developer to change the `CONTACT_TO_EMAIL` in Vercel. Takes 30 seconds.

---

## 6. Your domain (Porkbun)

- Log in at **porkbun.com** with the email you used to buy `rspecperformance.com`.
- Porkbun will email you ~30 days before the domain renews. **Don't let it expire** — if you do, you lose the name.
- **Pro tip:** Set auto-renew to ON and put a credit card on file.
- **Enable free email forwarding** in Porkbun so `info@rspecperformance.com` forwards to your personal Gmail. Ask your developer to walk you through it if you haven't done this yet.

---

## 7. Your hosting (Vercel)

- Log in at **vercel.com** with GitHub.
- You'll see your site listed. Click it.
- **Analytics tab** shows how many visits, where they're coming from, what pages are hot.
- **Deployments tab** shows every change your devs push. Green check = live. Red X = something broke (text them).
- You'll never have to click anything to "deploy" — it happens automatically when devs push code.

---

## 8. Your emails (Resend)

- Log in at **resend.com**. Check the **Emails** tab to see every contact-form submission that was sent to you.
- If customer replies aren't reaching you, check this log first — it'll tell you if the email left Resend successfully.
- Your free tier is **3,000 emails/month** — way more than you'll ever need.

---

## 9. Social media + growth

**Instagram is your #1 growth engine.** The site links to `@r.specperformance` prominently (header, footer, contact page). Every build you post on IG should ideally also be a "build log" on the site — that's where Google traffic comes from over time.

**Simple content plan:**
- Every finished job → 3 photos + a short caption on IG.
- Every month, pick your 2 best jobs → ask the devs to turn them into Build pages.
- Every dyno day → short video on IG + Reels.

Do this for 6 months and you'll be on page 1 of Google for "Nissan tuner Toronto" (or wherever you're operating).

**Want to add TikTok / YouTube?** Just send your dev the links and they'll add them to the site.

---

## 10. Things you can change easily (just ask)

| What you want | What you need to send |
|---|---|
| New hero photo | 1 photo, landscape, at least 2000px wide |
| New build on the site | 5–10 photos + car info + what you did + HP/TQ numbers |
| New service | Short description + what's included (3–5 bullets) |
| Update phone / email / hours | Just text the new values |
| Change the accent color (cyan → something else) | Describe the vibe (e.g. "electric blue" or "safety yellow") |
| New logo | Send the SVG or high-res PNG |
| New customer testimonial | Quote + customer first name + their car |
| Add a FAQ question | The question + your answer |

---

## 11. Things to check monthly

- [ ] Did I post on Instagram this week?
- [ ] Are contact-form emails arriving in my inbox? (Send yourself a test.)
- [ ] Is my domain set to auto-renew at Porkbun?
- [ ] Any new finished jobs worth turning into a Build page?

---

## 12. Costs summary

| Service | Cost | Notes |
|---|---|---|
| Porkbun domain | ~$12/year | Auto-renew recommended. |
| Vercel hosting | $0 | Free tier — plenty for this traffic. |
| Resend email | $0 | Free up to 3,000 emails/month. |
| GitHub | $0 | Free for your repo. |
| **Total** | **~$12/year** | That's it. |

---

## 13. What's placeholder vs real

When the site first launches, these pieces are still **placeholders** you'll want to replace:

- [ ] Hero + build photos (currently stylized graphics)
- [ ] A real photo of you on the About page
- [ ] Real customer testimonials (currently dummies)
- [ ] Final phone number, email, and address/service area
- [ ] Real shop logo (currently a simple wordmark)

See **[ASSETS_NEEDED.md](https://github.com/dylan3796/rspecperformance/blob/main/ASSETS_NEEDED.md)** for the complete checklist of what to send your developers.

---

## 14. If something breaks

**DO NOT PANIC.** Text your developer. Tell them what page is broken and, if possible, attach a screenshot. They can roll back the site to the previous working version in ~30 seconds using Vercel.

---

## 15. The most important thing

**Post. Show the work.** The best website in the world doesn't matter if nobody knows you exist. This site is your home base — IG + word-of-mouth + Google are how people get to it. Keep posting, and this thing will pay for itself many times over.

Go build. ⚡

— Your cousin (and the homies)
