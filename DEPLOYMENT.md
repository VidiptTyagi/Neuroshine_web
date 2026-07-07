# Deployment Guide — NeuroShine public website

Deploy target: **Vercel**. This is the public marketing site; it talks to the
**Spring Boot backend** (server-side only) for form submissions.

---

## 0. Prerequisites
- A Git repo with this project.
- A **Vercel** account.
- The **Spring Boot backend** (`neuroshine-backend`) deployed and reachable over
  HTTPS (e.g. Railway / Render / a VM), with MySQL.

## 1. Deploy the backend first
The site's forms proxy to the backend, so deploy it before (or alongside) the
site. Note its public URL (e.g. `https://api.neuroshine.care`) and set a shared
form key on it via `APP_FORM_API_KEY`. See `neuroshine-backend` for details.

## 2. Import into Vercel
1. Push this repo to Git.
2. Vercel → **Add New → Project** → import. Framework auto-detects **Next.js**;
   no build-setting changes needed.
3. Add the environment variables below, then **Deploy**.

## 3. Environment variables
Copy from `.env.example`:

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Spring Boot backend (server-side only — never exposed to the browser)
SPRING_API_URL=https://api.your-domain.com
FORM_API_KEY=<same value as the backend's APP_FORM_API_KEY>   # secret

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION=
```

> `FORM_API_KEY` is a **secret** (no `NEXT_PUBLIC_` prefix) — it's only ever used
> in server-side API routes, so it never reaches the browser. It must match the
> backend's `APP_FORM_API_KEY` so form submissions are accepted.

## 4. Real clinic details
Before launch, update **`src/config/site.ts`** with the real name, tagline,
phone, WhatsApp, email, address, business hours and social links (these flow to
the header, footer, contact page, SEO metadata and JSON-LD).

## 5. SEO checklist
- `NEXT_PUBLIC_SITE_URL` matches the live domain (canonical, OG, sitemap).
- `https://your-domain.com/sitemap.xml` and `/robots.txt` load.
- Submit the sitemap in Google Search Console (verify via `NEXT_PUBLIC_GSC_VERIFICATION`).
- Public pages still render server-side (view-source shows real content).

## 6. Post-deploy checks
- [ ] Submit the contact form → confirm the record + email land at the clinic.
- [ ] Book a test appointment → confirm backend receives it.
- [ ] Backend CORS: not required for these forms (server-to-server), but if you
      also call the backend from the browser elsewhere, allow the site origin.

## 7. Custom domain
Vercel → Project → **Domains** → add domain + DNS. Update `NEXT_PUBLIC_SITE_URL`,
then redeploy.

## Local production preview
```bash
npm run build && npm run start   # http://localhost:3000
```
