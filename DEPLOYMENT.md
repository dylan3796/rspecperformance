# Deployment — get rspecperformance.com live

Step-by-step. Follow top-to-bottom. Start-to-finish is ~30 minutes (most of it waiting for DNS).

> **You'll need accounts at:** GitHub, Vercel (sign in with GitHub), Resend, Porkbun. All free tiers are enough for launch.

---

## 0. Prerequisites (one-time)

- [ ] Confirm the repo is on GitHub: https://github.com/dylan3796/rspecperformance
- [ ] Confirm `main` is the default branch (we push `main` during the "Deploy code" step below).
- [ ] You have admin access to the Porkbun account that owns `rspecperformance.com`.

---

## 1. Deploy the code to Vercel

1. Go to https://vercel.com/new.
2. **Import Git Repository** → select `dylan3796/rspecperformance`.
3. Leave framework detection at **Next.js** (auto-detected).
4. **Build & Output Settings** → leave defaults. (`pnpm build` / `pnpm install`.)
5. **Environment Variables** — add these before clicking Deploy:

   | Name                    | Value (example)                                           |
   | ----------------------- | --------------------------------------------------------- |
   | `RESEND_API_KEY`        | `re_xxx` (get from Resend, Step 3)                        |
   | `CONTACT_TO_EMAIL`      | `info@rspecperformance.com` *(or Rav's inbox)*            |
   | `CONTACT_FROM_EMAIL`    | `RSpec Performance <no-reply@rspecperformance.com>`       |
   | `NEXT_PUBLIC_SITE_URL`  | `https://rspecperformance.com`                            |

   > You can leave `RESEND_API_KEY` blank for now — the form will fall back to a dev-friendly no-op in preview. Fill it in before launch.

6. Click **Deploy**. Vercel gives you a URL like `rspecperformance-xxxx.vercel.app`. Visit it — the site should load.

---

## 2. Point rspecperformance.com at Vercel

### 2a. Add the domain in Vercel

1. Vercel project → **Settings → Domains**.
2. Add `rspecperformance.com` → click **Add**.
3. Add `www.rspecperformance.com` → click **Add**. Vercel will ask which is the "primary" — choose the **apex** (`rspecperformance.com`). Vercel auto-redirects `www` → apex.
4. Vercel will show the exact DNS records it wants. Keep that tab open.

### 2b. Update Porkbun DNS

1. https://porkbun.com → log in → **Account → Domain Management**.
2. Find `rspecperformance.com` → click **Details → DNS Records**.
3. **Delete** any existing `A`, `AAAA`, `CNAME`, or `ALIAS` records on `@` or `www` that Porkbun added for parking. Keep `NS` and `SOA` records.
4. **Add** two records:

   | Type    | Host  | Answer                   | TTL |
   | ------- | ----- | ------------------------ | --- |
   | `A`     | *(blank)* | `76.76.21.21`        | 600 |
   | `CNAME` | `www` | `cname.vercel-dns.com.`  | 600 |

   > Porkbun treats the apex as a blank/empty Host field. Some Porkbun UIs show `@` — either works.

5. Save. Propagation is usually < 5 minutes; can take up to 60.
6. Back in Vercel → Domains → the entries should flip from "Invalid" to **Valid Configuration** with a green check. SSL auto-provisions via Let's Encrypt once DNS resolves.

---

## 3. Set up Resend for the contact form

### 3a. Create the account + API key

1. https://resend.com → sign up.
2. **API Keys → Create API Key** → name it `rspecperformance-prod` → permission **Sending access** → scope **Full access**.
3. **Copy the key** (starts with `re_`). You'll paste it into Vercel in step 3c.

### 3b. Verify the domain

1. Resend → **Domains → Add Domain** → `rspecperformance.com`.
2. Resend shows 3 TXT records (SPF, DKIM, sometimes DMARC). Copy them.
3. Back at Porkbun → DNS Records → add each TXT record exactly as Resend gave it.

   | Type  | Host              | Answer            |
   | ----- | ----------------- | ----------------- |
   | `TXT` | *(blank or @)*    | *(SPF value)*     |
   | `TXT` | `resend._domainkey` | *(DKIM value)*  |

   > Paste the DKIM record **without** wrapping quotes; Porkbun adds them automatically.

4. Save at Porkbun. Back in Resend → click **Verify DNS Records**. Usually verifies in 2–5 minutes. If it says "pending," give it 10 more minutes.
5. Once all records show ✅ **Verified**, the domain is live for sending.

### 3c. Paste the API key into Vercel

1. Vercel → your project → **Settings → Environment Variables**.
2. Edit `RESEND_API_KEY` → paste the `re_xxx` key → save.
3. **Re-deploy** the project: go to the **Deployments** tab → click the ⋯ on the latest deployment → **Redeploy** → confirm.

---

## 4. Smoke test

Visit **https://rspecperformance.com** and:

- [ ] Home page loads in < 2 seconds on mobile.
- [ ] Nav works on mobile (hamburger opens, closes on link click).
- [ ] `/services` lists all 12 services; click one — detail page renders.
- [ ] `/builds` lists 3 builds; click one — detail page renders.
- [ ] `/faq` — click a question, answer expands.
- [ ] `/contact` — submit a real test inquiry to yourself. Email arrives in the `CONTACT_TO_EMAIL` inbox within 30 seconds.
- [ ] Share the URL in iMessage or Slack — the link preview shows the branded OG image.
- [ ] Run https://pagespeed.web.dev on the home page — Performance ≥ 85, SEO 100, Accessibility ≥ 90.

---

## 5. Make it discoverable

1. **Google Search Console** → https://search.google.com/search-console → add `rspecperformance.com` → verify via DNS TXT at Porkbun → submit `https://rspecperformance.com/sitemap.xml`.
2. **Google Business Profile** → https://business.google.com → create (or claim) a profile for RSpec Performance. This is the #1 source of local leads. Add website, phone, hours, photos.
3. **Bing Webmaster Tools** → https://www.bing.com/webmasters → add the site (Bing will auto-import from GSC).
4. Update the Instagram bio at @r.specperformance to include `rspecperformance.com`.

---

## 6. Optional but highly recommended

- [ ] **Vercel Analytics** → project → **Analytics** tab → enable. Free, privacy-friendly, shows real traffic.
- [ ] **Email forwarding at Porkbun** → set `info@rspecperformance.com` to forward to Rav's Gmail. Settings → Email → add forward.
- [ ] **Auto-renew** on the domain at Porkbun — don't let it lapse.
- [ ] Add a budget alert in Vercel (not strictly needed on free tier, but good hygiene).

---

## Troubleshooting

**"Invalid Configuration" stuck in Vercel Domains for > 1 hour.**
Check Porkbun DNS records match exactly. Run `dig rspecperformance.com` and confirm it resolves to `76.76.21.21`. If Porkbun still serves parking, you missed deleting a parking `A` record.

**Contact form returns "Email service not configured."**
`RESEND_API_KEY` isn't set in Vercel (or is set for Preview only but not Production). Fix in Settings → Environment Variables → ensure it's checked for Production.

**Contact form sends but email never arrives.**
Check https://resend.com/emails — if it's there with status "Delivered," check the recipient's spam folder and confirm SPF/DKIM verified green in Resend. If "Bounced," the recipient address is wrong.

**Hitting rate limit testing the form.**
The route handler caps 5 submits per IP per hour. Restart the Vercel deployment to clear in-memory state (or wait an hour).

---

## Who does what going forward

| Task                              | Who     |
| --------------------------------- | ------- |
| Push code changes (features/fixes)| Dev (Dylan / Edrick / Claude sessions) |
| Merge PRs into `main`             | Repo admin |
| Monitor contact-form inbox        | Rav     |
| Post new builds / services        | Dev, triggered by Rav sending assets |
| Renew domain                      | Rav (Porkbun auto-renew) |
| Respond to customer inquiries     | Rav     |
