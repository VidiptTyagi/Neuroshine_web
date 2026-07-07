# NeuroShine — Public Marketing Website

> **Bringing out the best in every mind.**
> The public, SEO-optimized marketing site for the NeuroShine child-development
> therapy clinic.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · ShadCN UI**.

## 🏛️ Where this fits (hybrid architecture)

NeuroShine runs as three coordinated projects:

| Project | Tech | Role |
|---------|------|------|
| **`neuroshine-web`** (this repo) | Next.js | **Public marketing site** (SEO) + a thin server-side proxy for forms |
| `neuroshine_app` | Flutter (Web + Mobile) | Authenticated **portals + admin** |
| `neuroshine-backend` | Spring Boot + MySQL | Shared **API + JWT auth + email** for both |

This site is **public only** — there is no login, admin or database here. Forms
(contact, appointment, newsletter, careers) are validated and rate-limited at
the edge, then **proxied server-side to the Spring Boot backend**, which persists
the data and sends email. That keeps the marketing pages fully static/SSR for
**SEO**, with the backend URL and key never exposed to the browser.

## ✨ Features

- **Marketing pages** — home, about, 18 service pages, 7 assessments,
  therapists, blog (search + categories), resources, success stories, gallery,
  careers, contact, appointment, legal.
- **SEO** — dynamic metadata, Open Graph/Twitter, JSON-LD (LocalBusiness, FAQ,
  Breadcrumb, Article), `sitemap.xml`, `robots.txt`, PWA manifest.
- **A11y & UX** — WCAG-minded, keyboard nav, dark mode, reduced-motion support,
  glassmorphism, scroll animations, WhatsApp button, cookie consent, back-to-top.
- **Forms** — React Hook Form + Zod, proxied to Spring Boot.

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local     # set SPRING_API_URL (+ FORM_API_KEY in prod)
npm run dev                    # http://localhost:3000
```

The public site renders fully without the backend; form **submissions** need the
Spring Boot backend running (default `http://localhost:8080`).

```bash
# backend (separate repo)
cd ../neuroshine-backend && ./mvnw spring-boot:run
```

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## 🗂️ Structure

See **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**. In short:

```
src/
├── app/(marketing)/  # all public pages (route group)
├── app/api/          # form proxies → Spring Boot (contact/appointments/newsletter/careers/reviews)
├── components/       # ui (ShadCN) · layout · sections · shared · forms · seo · providers
├── content/          # type-safe content (services, assessments, therapists, blog…)
├── lib/              # api/spring · validations (Zod) · rate-limit · seo · utils
└── config/           # site + navigation
```

## 🔧 Configuration

Clinic identity (name, tagline, contact, address, hours, socials) lives in
**`src/config/site.ts`** — update it with the real clinic details.

## 🚢 Deploy

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** (Vercel + pointing at the Spring Boot backend).

## 📄 License

Proprietary — © NeuroShine Child Development Centre.
