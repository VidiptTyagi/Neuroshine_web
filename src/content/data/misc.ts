import type {
  JobListing,
  GalleryItem,
  SuccessStory,
  Resource,
} from "@/types";

export const jobs: JobListing[] = [
  {
    slug: "speech-language-pathologist",
    title: "Speech-Language Pathologist",
    department: "Clinical",
    location: "On-site",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Join our speech therapy team to assess and support children with communication, language and feeding needs.",
    responsibilities: [
      "Conduct speech and language assessments",
      "Design and deliver individualised therapy",
      "Coach parents and collaborate with the team",
      "Maintain clear clinical documentation",
    ],
    requirements: [
      "Master's in Speech-Language Pathology (MASLP)",
      "RCI registration / valid licence",
      "Experience with paediatric clients",
      "Warm, family-centred approach",
    ],
  },
  {
    slug: "occupational-therapist",
    title: "Occupational Therapist",
    department: "Clinical",
    location: "On-site",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Help children build motor, sensory and daily-living skills in our dedicated sensory centre.",
    responsibilities: [
      "Assess motor and sensory processing needs",
      "Deliver play-based occupational therapy",
      "Develop home and school strategies",
      "Track and review progress",
    ],
    requirements: [
      "Master's in Occupational Therapy (MOT)",
      "Sensory integration training preferred",
      "Paediatric experience",
      "Creative, child-centred mindset",
    ],
  },
  {
    slug: "special-educator",
    title: "Special Educator",
    department: "Education",
    location: "On-site",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Design and deliver individualised education plans for children who learn differently.",
    responsibilities: [
      "Create and implement IEPs",
      "Deliver multi-sensory remedial teaching",
      "Liaise with schools and families",
      "Assess academic progress",
    ],
    requirements: [
      "M.Ed / B.Ed in Special Education",
      "Experience with learning disabilities",
      "Strong collaboration skills",
      "Patience and creativity",
    ],
  },
];

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobs.find((j) => j.slug === slug);
}

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Sensory Gym", category: "Clinic", emoji: "🤸" },
  { id: "g2", title: "Speech Therapy Room", category: "Clinic", emoji: "🗣️" },
  { id: "g3", title: "Group Session", category: "Therapy", emoji: "👫" },
  { id: "g4", title: "Art & Play Area", category: "Clinic", emoji: "🎨" },
  { id: "g5", title: "Annual Family Day", category: "Events", emoji: "🎉" },
  { id: "g6", title: "Our Therapy Team", category: "Team", emoji: "🧑‍⚕️" },
  { id: "g7", title: "Assessment Suite", category: "Clinic", emoji: "📋" },
  { id: "g8", title: "Awareness Workshop", category: "Events", emoji: "📣" },
  { id: "g9", title: "Fine-Motor Play", category: "Therapy", emoji: "✋" },
  { id: "g10", title: "Reading Corner", category: "Clinic", emoji: "📚" },
  { id: "g11", title: "Parent Workshop", category: "Events", emoji: "👨‍👩‍👧" },
  { id: "g12", title: "Celebrating Milestones", category: "Team", emoji: "🏆" },
];

export const successStories: SuccessStory[] = [
  {
    childName: "Aarav",
    age: "4 years",
    condition: "Speech delay",
    summary:
      "Aarav had only a handful of words at age three and found it hard to make himself understood.",
    outcome:
      "After a year of speech therapy, Aarav speaks in full sentences, tells stories and has started school with confidence.",
    parent: "Priya, Aarav's mum",
  },
  {
    childName: "Zara",
    age: "6 years",
    condition: "Sensory processing",
    summary:
      "Loud places overwhelmed Zara, and she struggled to sit and focus in class.",
    outcome:
      "Sensory integration therapy helped Zara regulate. She now enjoys school, has friends and loves music class.",
    parent: "Rahul, Zara's dad",
  },
  {
    childName: "Vivaan",
    age: "5 years",
    condition: "Autism spectrum",
    summary:
      "After his diagnosis, Vivaan's family felt unsure how to help him communicate and connect.",
    outcome:
      "With a coordinated therapy plan, Vivaan now uses words to express himself, plays alongside peers and thrives on routine.",
    parent: "Aisha, Vivaan's mum",
  },
  {
    childName: "Ishaan",
    age: "8 years",
    condition: "Dyslexia",
    summary:
      "Ishaan avoided reading and his confidence at school was fading fast.",
    outcome:
      "Structured remediation turned things around — Ishaan now reads for pleasure and believes in himself again.",
    parent: "Vikram, Ishaan's dad",
  },
];

export const resources: Resource[] = [
  {
    title: "Speech Milestones Checklist (PDF)",
    type: "PDF",
    description: "A printable age-by-age checklist of key communication milestones.",
    href: "/resources",
  },
  {
    title: "Calm-Down Corner: Sensory Activities",
    type: "Activity",
    description: "Simple sensory activities to help your child self-regulate at home.",
    href: "/resources",
  },
  {
    title: "Understanding Your Child's Assessment Report",
    type: "Article",
    description: "A plain-language guide to making sense of assessment results.",
    href: "/blog/understanding-sensory-processing",
  },
  {
    title: "Fine-Motor Fun: 10 Activities",
    type: "Activity",
    description: "Playful ideas to build the hand skills behind handwriting.",
    href: "/blog/handwriting-help-for-kids",
  },
  {
    title: "Introduction to Early Intervention (Video)",
    type: "Video",
    description: "A short video on why the early years matter and how to help.",
    href: "/resources",
  },
  {
    title: "Parent's Guide to Starting Therapy",
    type: "PDF",
    description: "Everything you need to know before your first appointment.",
    href: "/resources",
  },
];
