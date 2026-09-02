# Deployment — NeuroShine public website

Live at **https://neuroshine.in**, self-hosted as a Node process (Next.js
`output: "standalone"`) under systemd on the same Lightsail box as
`neuroshine-backend` — see `neuroshine-backend/deploy/README.md` §2.8 for the
server side, `deploy/deploy-website.sh` in this repo for shipping a build.

**DNS stays where it already is — Vercel's nameservers** — only the hosting
moved off Vercel. The domain is registered through HostingRaja, but its DNS
zone lives at Vercel (see §3); that didn't change, only what the root A
record points at.

The site is **database-less**. All content is static and lives in `src/content/`
and `src/config/site.ts`; the four forms (contact, appointment, careers,
newsletter) email the clinic through **Resend**. There is no backend and no
database to deploy.

---

## 1. Environment variables

Two different places now, because build-time and runtime vars go to
different machines:

| Variable | Required | Where | Value |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | build machine, `.env.production.local` | `https://neuroshine.in` — no `www`, no trailing slash |
| `NEXT_PUBLIC_GSC_VERIFICATION` | optional | build machine | Search Console HTML-tag token; the live property is verified by DNS instead |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | optional | build machine | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | unused | build machine | The contact map is a keyless iframe embed. Nothing reads this today |
| `RESEND_API_KEY` | ✅ | server, `/etc/neuroshine-website/website.env` | From [resend.com](https://resend.com). **Without it every form silently succeeds and sends nothing** (see `src/lib/email/resend.ts`) |
| `RESEND_FROM_EMAIL` | ✅ | server | `NeuroShine <noreply@neuroshine.in>` — the domain must be verified in Resend |
| `CONTACT_NOTIFY_EMAIL` | ✅ | server | `neuroshinecdc@gmail.com` — where enquiries land |

`.env.example` is the template for local work; `deploy/website.env.example`
is the template for the server file.

### `NEXT_PUBLIC_*` values are baked in at build time

They are compiled into the bundle, not read at runtime — which now matters
more than it used to: `deploy-website.sh` builds **on your laptop or in CI**,
so `.env.production.local` (gitignored) must be correct *before* running it.
There is no dashboard redeploy step to fix a wrong value after the fact
anymore — you rebuild and re-run `deploy-website.sh`.

`NEXT_PUBLIC_SITE_URL` in particular drives the canonical tag, `og:url`,
`robots.txt` and every URL in the sitemap. If it is wrong, Google indexes the
wrong hostname.

---

## 2. Deploying

```bash
npm run typecheck && npm run build   # sanity check locally first
DEPLOY_HOST=<lightsail-static-ip> ./deploy/deploy-website.sh
```

`deploy-website.sh` builds the standalone output, ships it over SSH, restarts
`neuroshine-website.service`, health-checks `https://neuroshine.in`, and rolls
back to the previous build if it doesn't come up — see
`neuroshine-backend/deploy/README.md` §2.8 for the one-time server setup this
depends on.

Local production preview: `npm run build && npm run start` → http://localhost:3000

---

## 3. DNS

**Nameservers stay Vercel's** (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) —
moving hosting off Vercel does not need a nameserver change, just different
records inside the same zone. Add and edit every record in
**Vercel → Domains → neuroshine.in → DNS Records**. Names there are
*relative*: `send`, `resend._domainkey`, or blank for the root — never the
full domain, never a trailing dot.

The domain is **registered** through HostingRaja (registrar: OVI Hosting Pvt
Ltd). Only two things happen there: renewal, and the nameserver delegation —
neither changes with this move.

### Cutting over from Vercel hosting to Lightsail

1. In the Lightsail console, note the instance's **static IP** (created in
   `neuroshine-backend/deploy/README.md` §1.1).
2. **Vercel → Domains → neuroshine.in → DNS Records**: change the root (`@`)
   record from Vercel's own hosting entry to `A neuroshine.in → <static-ip>`,
   and add `A www.neuroshine.in → <static-ip>` (or a `CNAME www → neuroshine.in`
   — Vercel's own DNS, unlike HostingRaja's, allows CNAME).
3. **Vercel → Project (`neuroshine-web`) → Settings → Domains**: remove
   `neuroshine.in` / `www.neuroshine.in` from the project once the A records
   above are live, so Vercel stops trying to serve them. Leave the *DNS zone*
   (step 2) alone — that's a separate thing from the project's domain
   assignment.
4. Wait for propagation, then run certbot on the server (§2.8 of the backend
   runbook) — it needs the A record resolving to this instance first.
5. Verify before relying on it:

   ```bash
   dig +short neuroshine.in
   dig +short www.neuroshine.in
   ```

The three Resend records (§4 below) and the Search Console TXT record (§5)
are untouched by any of this — they don't point at a host, so cutting over
hosting doesn't affect them, and staying on Vercel DNS is exactly what keeps
DKIM working (see the HostingRaja caveat just below).

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
