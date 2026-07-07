import { siteConfig, type SiteConfig } from "@/config/site";

/**
 * Clinic details for the (database-less) site — sourced from `config/site.ts`.
 * Edit that file to change the name, tagline, phone, WhatsApp, email, address,
 * business hours and social links (YouTube / Instagram / …) — it flows to the
 * header, footer, contact & appointment pages, and SEO/JSON-LD.
 *
 * Kept async so server components can `await getSite()` (and so a live backend
 * could be re-introduced later without touching any callers).
 */
export async function getSite(): Promise<SiteConfig> {
  return siteConfig;
}
