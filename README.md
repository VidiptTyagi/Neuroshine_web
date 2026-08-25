# NeuroShine — Public Marketing Website

> **Bringing out the best in every mind.**
> The public, SEO-optimized marketing site for the NeuroShine child-development
> therapy clinic. Live at **https://neuroshine.in**.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · ShadCN UI**.

## 🏛️ What this is

A **standalone, database-less** marketing site. There is no login, no admin, no
database and no separate backend to run — everything you need is in this repo.

- **Content** is static and type-safe, living in `src/content/` and
  `src/config/site.ts`. That keeps every page fully server-rendered for **SEO**.
- **Forms** (contact, appointment, newsletter, careers) are validated with Zod
  and rate-limited in the route handler, then emailed to the clinic through
  **[Resend](https://resend.com)**. Nothing is persisted.

Each form sends two emails: a notification to the clinic — required, the request
fails if it cannot send — and a best-effort confirmation to the visitor.

## ✨ Features

- **Marketing pages** — home, about, 18 service pages, 7 assessments,
  therapists, blog (search + categories), resources, success stories, gallery,
  careers, contact, appointment, legal.
- **SEO** — dynamic metadata, Open Graph/Twitter, JSON-LD (LocalBusiness, FAQ,
  Breadcrumb, Article), `sitemap.xml`, `robots.txt`, PWA manifest.
- **A11y & UX** — WCAG-minded, keyboard nav, dark mode, reduced-motion support,
  glassmorphism, scroll animations, WhatsApp button, cookie consent, back-to-top.
- **Forms** — React Hook Form + Zod, emailed via Resend.

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local     # fill in the Resend values
npm run dev                    # http://localhost:3000
```

Every page renders without any configuration. Email is the only thing that needs
setting up, and even that is optional locally: with no `RESEND_API_KEY` the forms
still succeed and the send is skipped and logged (`src/lib/email/resend.ts`).

> ⚠️ That same fallback applies in production. If `RESEND_API_KEY` is missing on
> the deployed site, every form silently succeeds and no mail is ever sent.

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier |

## 🗂️ Structure

See **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**. In short:

```
src/
├── app/(marketing)/  # all public pages (route group)
├── app/api/          # form handlers → Resend (contact/appointments/newsletter/careers)
├── components/       # ui (ShadCN) · layout · sections · shared · forms · seo · providers
├── content/          # type-safe content (services, assessments, therapists, blog…)
├── lib/              # email (Resend) · validations (Zod) · rate-limit · seo · utils
└── config/           # site + navigation
```

## 🔧 Configuration

Clinic identity — name, tagline, phone, WhatsApp, email, address, coordinates,
opening hours, social links — lives in **`src/config/site.ts`** and flows into
the header, footer, contact page, SEO metadata and JSON-LD.

Two things are duplicated and drift easily, so change both halves together:

- **Opening hours** — display strings in `src/config/site.ts`, and
  `openingHoursSpecification` in `src/lib/seo/schema.ts`.
- **Therapist names** — `src/content/therapists/index.ts`, the `author` field on
  blog posts, and the founder quote on the About page.

## 🚢 Deploy

Vercel, deployed from `main`. See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the
environment variables, DNS, Resend setup and post-deploy checks.

Note that `NEXT_PUBLIC_*` values are baked in at build time — changing one in
Vercel requires a redeploy with the build cache disabled.

## 📄 License

Proprietary — © NeuroShine Child Development Centre.
