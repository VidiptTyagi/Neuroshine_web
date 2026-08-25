/**
 * Central site configuration — single source of truth for brand identity,
 * contact details and social links. Imported by layout, SEO, footer, schema.
 */
export const siteConfig = {
  name: "Neuroshine",
  legalName: "Neuroshine",
  tagline: "Bringing out the best in every mind",
  description:
    "Neuroshine Therapy Centre is a leading pediatric therapy and child development clinic in Indirapuram, Ghaziabad, dedicated to helping children achieve their full potential. We provide evidence-based Occupational Therapy, Speech Therapy, ABA Therapy, Special Education, Sensory Integration Therapy, Autism Therapy, ADHD support, developmental assessments, and individualized intervention programs. Our experienced therapists create personalized treatment plans to improve communication, motor skills, sensory processing, learning, behavior, and independence in a caring and child-friendly environment. Book your consultation today and begin your child's journey toward confident growth and development.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://neuroshine.in",
  ogImage: "/images/og/og-default.jpeg",
  logo: "/images/logo.jpeg",
  locale: "en_IN",

  contact: {
    phone: "+91 8700263187",
    phoneHref: "tel:+918700263187",
    whatsapp: "918700263187",
    whatsappHref: "https://wa.me/918700263187",
    email: "neuroshinecdc@gmail.com",
    emailHref: "mailto:neuroshinecdc@gmail.com",
    emergency: "+91 8368965507",
  },

  address: {
    street: "568,Niti-Khand-3",
    locality: "Indirapuram, Ghaziabad",
    region: "Uttar Pradesh",
    postalCode: "201014",
    country: "IN",
    // Exact pin for the embedded map — a bare name search lands anywhere.
    mapQuery: "28.645188,77.376437",
    // Plus Code 7JWVJ9WG+3H (J9WG+3H Ghaziabad).
    lat: 28.645188,
    lng: 77.376437,
  },

  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],

  socials: {
    facebook: "https://www.facebook.com/share/1BS4eMX37A/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/neuroshine_care",
    youtube: "https://www.youtube.com/@Neuro_shine",
  },
};

export type SiteConfig = typeof siteConfig;
