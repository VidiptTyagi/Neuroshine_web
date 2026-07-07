import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  Hand,
  Brain,
  GraduationCap,
  Puzzle,
  Blocks,
  Activity,
  Waves,
  Baby,
  BookOpen,
  Accessibility,
  HeartHandshake,
  Users,
  UserRound,
  Sparkles,
  Users2,
  Video,
  ClipboardList,
  Stethoscope,
  Gauge,
  ScanSearch,
  BrainCircuit,
  ListChecks,
} from "lucide-react";

export interface NavLink {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface NavItem {
  title: string;
  href?: string;
  children?: NavLink[];
}

/** All 18 therapy services — source of truth for menus, sitemap & pages. */
export const serviceLinks: NavLink[] = [
  { title: "Speech Therapy", href: "/services/speech-therapy", icon: MessageCircle, description: "Language, articulation, fluency & feeding." },
  { title: "Occupational Therapy", href: "/services/occupational-therapy", icon: Hand, description: "Fine-motor, sensory & daily-living skills." },
  { title: "Behaviour Therapy", href: "/services/behavior-therapy", icon: Brain, description: "Positive behaviour support & regulation." },
  { title: "Special Education", href: "/services/special-education", icon: GraduationCap, description: "Individualised learning plans." },
  { title: "Autism Therapy", href: "/services/autism-therapy", icon: Puzzle, description: "Comprehensive ASD support." },
  { title: "ABA Therapy", href: "/services/aba-therapy", icon: Blocks, description: "Applied Behaviour Analysis programs." },
  { title: "ADHD Management", href: "/services/adhd-management", icon: Activity, description: "Focus, attention & impulse strategies." },
  { title: "Sensory Integration", href: "/services/sensory-integration", icon: Waves, description: "Sensory processing therapy." },
  { title: "Developmental Delay", href: "/services/developmental-delay", icon: Baby, description: "Milestone-focused early support." },
  { title: "Learning Disability", href: "/services/learning-disability", icon: BookOpen, description: "Dyslexia, dyscalculia & more." },
  { title: "Cerebral Palsy Therapy", href: "/services/cerebral-palsy-therapy", icon: Accessibility, description: "Motor & functional rehabilitation." },
  { title: "Down Syndrome Support", href: "/services/down-syndrome-support", icon: HeartHandshake, description: "Holistic developmental care." },
  { title: "Psychological Counseling", href: "/services/psychological-counseling", icon: Users, description: "Child & adolescent counselling." },
  { title: "Parent Counseling", href: "/services/parent-counseling", icon: UserRound, description: "Coaching & family guidance." },
  { title: "Early Intervention", href: "/services/early-intervention", icon: Sparkles, description: "Support in the critical early years." },
  { title: "Group Therapy", href: "/services/group-therapy", icon: Users2, description: "Social skills in a group setting." },
  { title: "Tele Therapy", href: "/services/tele-therapy", icon: Video, description: "Online sessions from home." },
  { title: "Assessment", href: "/services/assessment", icon: ClipboardList, description: "Standardised evaluations." },
];

/** 7 assessments. */
export const assessmentLinks: NavLink[] = [
  { title: "Development Assessment", href: "/assessments/development-assessment", icon: Gauge, description: "Overall developmental screening." },
  { title: "Autism Assessment", href: "/assessments/autism-assessment", icon: ScanSearch, description: "ASD diagnostic evaluation." },
  { title: "Speech Assessment", href: "/assessments/speech-assessment", icon: Stethoscope, description: "Speech & language evaluation." },
  { title: "IQ Test", href: "/assessments/iq-test", icon: BrainCircuit, description: "Cognitive ability testing." },
  { title: "Learning Disability Assessment", href: "/assessments/learning-disability-assessment", icon: BookOpen, description: "Academic-skills evaluation." },
  { title: "ADHD Assessment", href: "/assessments/adhd-assessment", icon: Activity, description: "Attention & hyperactivity screening." },
  { title: "Behaviour Assessment", href: "/assessments/behavior-assessment", icon: ListChecks, description: "Behavioural profiling." },
];

/** Primary top-level navigation. */
export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", children: serviceLinks },
  { title: "Assessments", children: assessmentLinks },
  { title: "Therapists", href: "/therapists" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

/** Footer link columns. */
export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: serviceLinks.slice(0, 6),
  },
  {
    heading: "Explore",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Our Therapists", href: "/therapists" },
      { title: "Assessments", href: "/assessments" },
      { title: "Success Stories", href: "/success-stories" },
      { title: "Gallery", href: "/gallery" },
      { title: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Resources", href: "/resources" },
      { title: "Book Appointment", href: "/appointment" },
      { title: "Success Stories", href: "/success-stories" },
      { title: "Contact", href: "/contact" },
    ],
  },
];
