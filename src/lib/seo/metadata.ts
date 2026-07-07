import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildMetadataArgs {
  title?: string;
  description?: string;
  /** Path beginning with "/" — used for canonical + OG url. */
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Produce consistent per-page metadata: canonical URL, Open Graph and
 * Twitter cards. Title is templated with the site name via the root layout.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  keywords,
  noIndex = false,
}: BuildMetadataArgs = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : undefined,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : undefined,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
