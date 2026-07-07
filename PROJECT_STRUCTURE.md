# NeuroShine Web — Project Structure

**Tagline:** _Bringing out the best in every mind_
**Role:** Public, SEO-optimized **marketing website** (part of a hybrid system —
the Flutter app handles portals/admin; Spring Boot is the shared backend).
**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · ShadCN UI · Lucide · React Hook Form + Zod · Google Maps · Vercel

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
│   │   └── api/                    ── FORM PROXIES → Spring Boot (server-side, BFF)
│   │       ├── contact/            Zod + rate-limit → springPostJson('/api/contact')
│   │       ├── appointments/       → '/api/appointments'
│   │       ├── newsletter/         → '/api/newsletter'
│   │       ├── careers/            multipart forward → '/api/careers'
│   │       └── reviews/            GET proxy → '/api/reviews'
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
│   │   ├── api/spring.ts  Server-only Spring Boot client (SPRING_API_URL + X-Api-Key)
│   │   ├── validations/   Zod schemas (appointment, contact, newsletter, career)
│   │   ├── rate-limit.ts  In-memory limiter · api-response.ts  JSON helpers
│   │   ├── seo/           buildMetadata + JSON-LD builders
│   │   └── utils/         cn(), formatters
│   │
│   ├── config/           site.ts (brand/contact/hours/socials) · navigation.ts
│   └── types/            shared content types
│
├── .env.example          SPRING_API_URL, FORM_API_KEY, SITE_URL, Maps, GA, GSC
├── README.md  DEPLOYMENT.md
└── next.config / tailwind / tsconfig / eslint / components.json
```

## How data flows (SEO-safe)
- **Marketing content** is static/SSG from `src/content/*` → full HTML for crawlers.
- **Forms** POST to `src/app/api/*` → validated (Zod) + rate-limited → **proxied
  server-side** to Spring Boot (which persists to MySQL + emails via Resend).
- The browser never sees the backend URL or the form key.

## Not in this project (moved elsewhere)
Auth, patient/parent portals, admin/CMS, and the database live in the **Flutter
app** (`neuroshine_app`) + **Spring Boot backend** (`neuroshine-backend`).
