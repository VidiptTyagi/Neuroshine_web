import type { Therapist } from "@/types";

export const therapists: Therapist[] = [
  {
    slug: "dr-garima-tyagi",
    name: "Dr. Garima Tyagi",
    role: "Occupational Therapist",
    qualification: "BOT,MOT(Neuropeds)",
    experienceYears: 7,
    specializations: ["Autism Assessment", "Psychological Counseling", "IQ Testing"],
    bio: "Dr. Garima Tyagi founded NeuroShine with a vision of compassionate, evidence-based care. She specialises in developmental and psychological assessment and has helped families understand and support their children.",
    availability: "Mon–Fri",
    image: null,
  },
  {
    slug: "vikash-kumar",
    name: "Vikash Kumar",
    role: "Senior Speech Therapist",
    qualification: "Licensed SLP",
    experienceYears: 11,
    specializations: ["Speech Therapy", "Feeding Therapy", "Early Intervention"],
    bio: "Vikash is passionate about helping children find their voice. He blends play-based techniques with the latest research to support language, articulation and feeding.",
    availability: "Mon–Sat",
    image: null,
  }
];

export function getTherapistBySlug(slug: string): Therapist | undefined {
  return therapists.find((t) => t.slug === slug);
}

export function getAllTherapistSlugs(): string[] {
  return therapists.map((t) => t.slug);
}
