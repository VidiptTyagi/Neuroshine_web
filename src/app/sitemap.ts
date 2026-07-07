import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllServiceSlugs } from "@/content/services";
import { getAllAssessmentSlugs } from "@/content/assessments";
import { getAllTherapistSlugs } from "@/content/therapists";
import { getAllPostSlugs } from "@/content/blog";
import { blogCategories } from "@/content/blog";
import { jobs } from "@/content/data/misc";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/assessments",
    "/therapists",
    "/appointment",
    "/blog",
    "/resources",
    "/success-stories",
    "/gallery",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamic = [
    ...getAllServiceSlugs().map((s) => `/services/${s}`),
    ...getAllAssessmentSlugs().map((s) => `/assessments/${s}`),
    ...getAllTherapistSlugs().map((s) => `/therapists/${s}`),
    ...getAllPostSlugs().map((s) => `/blog/${s}`),
    ...blogCategories.map(
      (c) => `/blog/category/${c.toLowerCase().replace(/\s+/g, "-")}`,
    ),
    ...jobs.map((j) => `/careers/${j.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamic];
}
