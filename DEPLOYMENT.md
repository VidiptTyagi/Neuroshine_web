# Deployment — NeuroShine public website

Live at **https://neuroshine.in**, hosted on **Vercel** (project `neuroshine-web`,
deployed from `main`, region `bom1`/Mumbai).

The site is **database-less**. All content is static and lives in `src/content/`
and `src/config/site.ts`; the four forms (contact, appointment, careers,
newsletter) email the clinic through **Resend**. There is no backend and no
database to deploy.

---

## 1. Environment variables

Set these in Vercel → Settings → Environment Variables. `.env.example` is the
template for local work.

| Variable | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://neuroshine.in` — no `www`, no trailing slash |
| `RESEND_API_KEY` | ✅ | From [resend.com](https://resend.com). **Without it every form silently succeeds and sends nothing** (see `src/lib/email/resend.ts`) |
| `RESEND_FROM_EMAIL` | ✅ | `NeuroShine <noreply@neuroshine.in>` — the domain must be verified in Resend |
| `CONTACT_NOTIFY_EMAIL` | ✅ | `neuroshinecdc@gmail.com` — where enquiries land |
| `NEXT_PUBLIC_GSC_VERIFICATION` | optional | Search Console HTML-tag token. Only needed if verifying by meta tag; the live property is verified by DNS instead |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | optional | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | unused | The contact map is a keyless iframe embed. Nothing reads this today |

### `NEXT_PUBLIC_*` values are baked in at build time

They are compiled into the bundle, not read at runtime. **Changing one has no
effect until you redeploy**, and the redeploy must not reuse the build cache:

> Deployments → latest → `⋯` → **Redeploy** → untick **"Use existing Build Cache"**

`NEXT_PUBLIC_SITE_URL` in particular drives the canonical tag, `og:url`,
`robots.txt` and every URL in the sitemap. If it is wrong, Google indexes the
wrong hostname.

---

## 2. Deploying

Pushing to `main` deploys to production automatically. `vercel.json` pins the
region and restricts auto-deploys to `main`.

```bash
npm run typecheck && npm run build   # run both before pushing
git push origin main
```

Local production preview: `npm run build && npm run start` → http://localhost:3000

---

## 3. DNS

**Nameservers are Vercel's** (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`), so add
and edit every record in **Vercel → Domains → neuroshine.in → DNS Records**.
Names there are *relative*: `send`, `resend._domainkey`, or blank for the root —
never the full domain, never a trailing dot.

The domain is **registered** through HostingRaja (registrar: OVI Hosting Pvt
Ltd). Only two things still happen there: renewal, and the nameserver
delegation.

### If the delegation ever needs changing again

It lives in HostingRaja's **client area → My Domains → Manage Nameservers** —
*not* in cPanel. Editing NS records inside cPanel's Zone Editor appears to work
but changes nothing: HostingRaja keeps the zone's SOA, so its servers keep
answering authoritatively and return NXDOMAIN for anything not in their own
zone. Only the registrar-level change reaches the `.in` registry.

Verify against the registry, which is the source of truth (TTL 900s, so a real
change shows up within minutes):

```bash
dig @ns1.registry.in neuroshine.in NS +noall +authority
```

Also worth knowing, should the site ever move back: HostingRaja's Zone Editor
rejects CNAME records, rejects `@` as a record name (use the FQDN with a
trailing dot), and rejects underscores — which makes DKIM impossible there.

### www

`www.neuroshine.in` 308-redirects to the bare domain. That redirect is in
`next.config.ts`, not in Vercel's domain settings — so don't add a second
redirect in the dashboard.

---

## 4. Email (Resend)

The sending domain `neuroshine.in` is verified in Resend (region
`ap-northeast-1`). Three DNS records back it, all in Vercel:

| Name | Type | Value |
|---|---|---|
| `resend._domainkey` | TXT | DKIM public key |
| `send` | MX | `feedback-smtp.ap-northeast-1.amazonses.com` (priority 10) |
| `send` | TXT | `v=spf1 include:amazonses.com ~all` |

Every form sends **two** emails (`src/app/api/*/route.ts`): a notification to
`CONTACT_NOTIFY_EMAIL`, which is required — the request fails if it does not
send — and a confirmation to the visitor, which is best-effort.

Check delivery in the Resend dashboard, or:

```bash
curl -H "Authorization: Bearer $RESEND_API_KEY" "https://api.resend.com/emails?limit=5"
```

---

## 5. Search Console

The property is a **Domain** property (covers `neuroshine.in` and every
subdomain), verified by a `google-site-verification=…` TXT record on the root in
Vercel DNS. A Domain property needs the **full sitemap URL** when submitting:
`https://neuroshine.in/sitemap.xml`.

---

## 6. After deploying — what to check

- [ ] `https://neuroshine.in` returns 200 with a valid certificate
- [ ] `https://www.neuroshine.in` returns 308 to the bare domain
- [ ] View source: `rel="canonical"` and `og:url` both read `https://neuroshine.in`
- [ ] `/robots.txt` and `/sitemap.xml` load and reference the bare domain
- [ ] Submit the contact form; confirm the enquiry reaches the clinic inbox
- [ ] Book a test appointment; confirm the same

Handy one-liner:

```bash
curl -s https://neuroshine.in | grep -oE 'rel="canonical" href="[^"]*"'
```

---

## 7. Editing clinic content

Nearly everything is in two places:

- **`src/config/site.ts`** — name, tagline, phone, WhatsApp, email, address,
  coordinates, opening hours, social links. Feeds the header, footer, contact
  page, SEO metadata and JSON-LD.
- **`src/content/`** — services, therapists, blog posts, assessments,
  testimonials.

Two things there are easy to get out of sync, and both have bitten this site:

- Opening hours appear **twice** — as display strings in `site.ts` and as
  `openingHoursSpecification` in `src/lib/seo/schema.ts`. Change both.
- Therapist names appear in `src/content/therapists/index.ts`, as blog post
  `author` fields, and in the founder quote on the About page. A name removed
  from the roster must be removed everywhere.
