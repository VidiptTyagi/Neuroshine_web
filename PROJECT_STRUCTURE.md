# NeuroShine Web — Project Structure

**Tagline:** _Bringing out the best in every mind_
**Role:** Public, SEO-optimized **marketing website** — standalone and
database-less. No auth, no admin, no backend.
**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · ShadCN UI · Lucide · React Hook Form + Zod · Resend · Vercel

> Route groups `( )` do **not** affect the URL — they only share a layout.

```
neuroshine-web/
├── public/images/            logo, og image, media
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              Root layout: fonts (Poppins/Inter), providers, metadata
│   │   ├── globals.css             Design tokens, light/dark themes, brand utilities
│   │   ├── sitemap.ts robots.ts manifest.ts   SEO route handlers
│   │   ├── not-found.tsx           404
│   │   │
│   │   ├── (marketing)/            ── PUBLIC SITE (shared navbar + footer + floating widgets)
│   │   │   ├── page.tsx            Home (hero, stats, services, why-us, team, testimonials, FAQ, CTA)
│   │   │   ├── about/
│   │   │   ├── services/           index + [slug]  (18 service detail pages)
│   │   │   ├── assessments/        index + [slug]  (7 assessments)
│   │   │   ├── therapists/         index + [slug]
│   │   │   ├── appointment/        online booking form
│   │   │   ├── blog/               index · [slug] · category/[category]
│   │   │   ├── resources/  success-stories/  gallery/
│   │   │   ├── careers/            index + [slug] (job + apply)
│   │   │   ├── contact/            form + Google Maps
│   │   │   └── privacy-policy/  terms/
│   │   │
│   │   └── api/                    ── FORM HANDLERS → Resend (server-side)
│   │       ├── contact/            Zod + rate-limit → clinic mail + visitor receipt
│   │       ├── appointments/       same shape
│   │       ├── newsletter/         same shape
│   │       └── careers/            same shape, with resume metadata
│   │
│   ├── components/
│   │   ├── ui/            ShadCN primitives
│   │   ├── layout/        Navbar (mega-menu), Footer, MobileNav, Breadcrumbs
│   │   ├── sections/      Page sections (home/ about/ service/ blog/ gallery/)
│   │   ├── shared/        Container, Reveal, SectionHeading, cards, WhatsApp, BackToTop, CookieConsent…
│   │   ├── forms/         Appointment / Contact / Newsletter / Career forms (RHF + Zod)
│   │   ├── seo/           JsonLd
│   │   └── providers/     Theme + Tooltip + Toaster + consent-gated Analytics
│   │
│   ├── content/          Type-safe content (source of truth for pages)
│   │   ├── services/      18 services (overview, symptoms, benefits, process, faq)
│   │   ├── assessments/   7 assessments
│   │   ├── therapists/    team profiles
│   │   ├── blog/          posts
│   │   └── data/          site-content (stats, testimonials, faqs, values…) + misc (jobs, gallery…)
│   │
│   ├── lib/
│   │   ├── email/         Server-only Resend client + HTML templates
│   │   ├── validations/   Zod schemas (appointment, contact, newsletter, career)
│   │   ├── rate-limit.ts  In-memory limiter · api-response.ts  JSON helpers
│   │   ├── seo/           buildMetadata + JSON-LD builders
│   │   └── utils/         cn(), formatters
│   │
│   ├── config/           site.ts (brand/contact/hours/socials) · navigation.ts
│   └── types/            shared content types
│
├── .env.example          SITE_URL, Resend (key/from/notify), GA, GSC
├── README.md  DEPLOYMENT.md
└── next.config / tailwind / tsconfig / eslint / components.json
```

## How data flows (SEO-safe)
- **Marketing content** is static/SSG from `src/content/*` → full HTML for crawlers.
- **Forms** POST to `src/app/api/*` → validated (Zod) + rate-limited → emailed via
  **Resend**. Nothing is persisted.
- Each submission sends **two** mails: the clinic notification (required — the
  request fails if it cannot send) and a best-effort receipt to the visitor.
- `RESEND_API_KEY` is server-only and never reaches the browser.

## Not in this project
No auth, no patient/parent portal, no admin/CMS, no database. This repo is the
public marketing site and nothing else.
