import type { LucideIcon } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
  heroTagline: string;
  /** Ages / who it's for */
  ageRange: string;
  overview: string[];
  symptoms: string[];
  benefits: string[];
  process: ProcessStep[];
  duration: string;
  faqs: FAQ[];
  featured?: boolean;
}

export interface Assessment {
  slug: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
  overview: string[];
  whatWeEvaluate: string[];
  duration: string;
  outcome: string;
  faqs: FAQ[];
}

export interface Therapist {
  slug: string;
  name: string;
  role: string;
  qualification: string;
  experienceYears: number;
  specializations: string[];
  bio: string;
  availability: string;
  /** Public image path or null → falls back to initials avatar. */
  image?: string | null;
}

export interface Testimonial {
  quote: string;
  author: string;
  relation: string;
  rating: number;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string; // ISO
  readingMinutes: number;
  cover?: string;
  content: string[]; // paragraphs
}

export interface JobListing {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time / Part-time
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Clinic" | "Therapy" | "Events" | "Team";
  /** Emoji stand-in used until real photography is supplied. */
  emoji: string;
}

export interface SuccessStory {
  childName: string;
  age: string;
  condition: string;
  summary: string;
  outcome: string;
  parent: string;
}

export interface Resource {
  title: string;
  type: "Video" | "PDF" | "Article" | "Activity";
  description: string;
  href: string;
}
