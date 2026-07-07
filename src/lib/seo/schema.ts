import { siteConfig, type SiteConfig } from "@/config/site";
import type { FAQ } from "@/types";

const { url } = siteConfig;

/** MedicalClinic / LocalBusiness — used on the homepage & contact page. */
export function localBusinessSchema(site: SiteConfig = siteConfig) {
  const { name, legalName, contact, address, socials, logo } = site;
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${url}/#organization`,
    name: legalName,
    alternateName: name,
    url,
    logo: `${url}${logo}`,
    image: `${url}${site.ogImage}`,
    description: site.description,
    telephone: contact.phone,
    email: contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.lat,
      longitude: address.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: Object.values(socials),
    medicalSpecialty: [
      "Pediatrics",
      "SpeechPathology",
      "OccupationalTherapy",
      "Psychiatric",
    ],
  };
}

export function organizationSchema(site: SiteConfig = siteConfig) {
  const { legalName, contact, address, socials, logo } = site;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: legalName,
    url,
    logo: `${url}${logo}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      contactType: "customer service",
      email: contact.email,
      areaServed: address.country,
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: Object.values(socials),
  };
}

export function websiteSchema(site: SiteConfig = siteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: site.name,
    publisher: { "@id": `${url}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: input.name,
    description: input.description,
    url: `${url}${input.path}`,
    provider: { "@id": `${url}/#organization` },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    author: { "@type": "Person", name: input.author },
    publisher: { "@id": `${url}/#organization` },
    image: input.image ? `${url}${input.image}` : `${url}${siteConfig.ogImage}`,
    mainEntityOfPage: `${url}${input.path}`,
  };
}
