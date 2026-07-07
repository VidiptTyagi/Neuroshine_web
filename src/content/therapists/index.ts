import type { Therapist } from "@/types";

export const therapists: Therapist[] = [
  {
    slug: "dr-ananya-sharma",
    name: "Dr. Ananya Sharma",
    role: "Clinical Director & Child Psychologist",
    qualification: "PhD Clinical Psychology, M.Phil",
    experienceYears: 16,
    specializations: ["Autism Assessment", "Psychological Counseling", "IQ Testing"],
    bio: "Dr. Ananya founded NeuroShine with a vision of compassionate, evidence-based care. She specialises in developmental and psychological assessment and has helped hundreds of families understand and support their children.",
    availability: "Mon–Fri",
    image: null,
  },
  {
    slug: "rhea-menon",
    name: "Rhea Menon",
    role: "Senior Speech-Language Pathologist",
    qualification: "MASLP, Licensed SLP",
    experienceYears: 11,
    specializations: ["Speech Therapy", "Feeding Therapy", "Early Intervention"],
    bio: "Rhea is passionate about helping children find their voice. She blends play-based techniques with the latest research to support language, articulation and feeding.",
    availability: "Mon–Sat",
    image: null,
  },
  {
    slug: "arjun-nair",
    name: "Arjun Nair",
    role: "Occupational Therapist",
    qualification: "MOT, Sensory Integration Certified",
    experienceYears: 9,
    specializations: ["Occupational Therapy", "Sensory Integration", "Handwriting"],
    bio: "Arjun helps children build the skills for everyday independence, from fine-motor control to sensory regulation, always through motivating, purposeful play.",
    availability: "Tue–Sat",
    image: null,
  },
  {
    slug: "sara-thomas",
    name: "Sara Thomas",
    role: "Special Educator",
    qualification: "M.Ed Special Education",
    experienceYears: 12,
    specializations: ["Special Education", "Learning Disability", "Remedial Teaching"],
    bio: "Sara designs individualised learning plans that make academics accessible and enjoyable, restoring confidence for children who learn differently.",
    availability: "Mon–Fri",
    image: null,
  },
  {
    slug: "dr-kabir-verma",
    name: "Dr. Kabir Verma",
    role: "Behaviour Analyst (BCBA)",
    qualification: "Board Certified Behaviour Analyst",
    experienceYears: 10,
    specializations: ["ABA Therapy", "Behaviour Therapy", "Autism Therapy"],
    bio: "Kabir develops naturalistic, play-based ABA programs that build meaningful skills and reduce barriers to learning, with a strong focus on family collaboration.",
    availability: "Mon–Sat",
    image: null,
  },
  {
    slug: "meera-iyer",
    name: "Meera Iyer",
    role: "Child Counselor & Early Interventionist",
    qualification: "MA Child Psychology",
    experienceYears: 8,
    specializations: ["Early Intervention", "Parent Counseling", "Group Therapy"],
    bio: "Meera supports our youngest children and their families, combining early-intervention expertise with warm, practical parent coaching.",
    availability: "Wed–Sun",
    image: null,
  },
];

export function getTherapistBySlug(slug: string): Therapist | undefined {
  return therapists.find((t) => t.slug === slug);
}

export function getAllTherapistSlugs(): string[] {
  return therapists.map((t) => t.slug);
}
