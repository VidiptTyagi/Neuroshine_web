import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  Clock,
  Star,
  Smile,
} from "lucide-react";
import type {
  Testimonial,
  CoreValue,
  TimelineEvent,
  FAQ,
} from "@/types";

/** Homepage statistics. */
export const stats = [
  { value: 100, suffix: "+", label: "Children Helped" },
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Certified Therapists" },
  { value: 100, suffix: "+", label: "Happy Parents" },
];

/** "Why choose us" points. */
export const whyChooseUs = [
  {
    icon: Users,
    title: "Multidisciplinary Team",
    description:
      "occupational,Speech, behaviour, psychology and special-education experts collaborating under one roof.",
  },
  {
    icon: HeartHandshake,
    title: "Family-Centred Care",
    description:
      "We treat parents as partners, coaching you to support your child's progress every day.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence-Based Methods",
    description:
      "Every program is grounded in the latest research and tailored to your child.",
  },
  {
    icon: Sparkles,
    title: "Individualised Plans",
    description:
      "No two children are alike — each receives a personalised, goal-driven plan.",
  },
  {
    icon: Smile,
    title: "Child-Friendly Space",
    description:
      "A warm, safe, sensory-friendly environment where children love to learn.",
  },
  {
    icon: Clock,
    title: "Flexible & Accessible",
    description:
      "In-clinic and tele-therapy options with scheduling that fits your family.",
  },
];

export const coreValues: CoreValue[] = [
  {
    icon: HeartHandshake,
    title: "Compassion",
    description:
      "We meet every child and family with warmth, patience and genuine care.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Honest, transparent and always acting in the best interest of the child.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "We hold ourselves to the highest clinical and ethical standards.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work as one team — with families, schools and each other.",
  },
];

export const timeline: TimelineEvent[] = [
  { year: "2024", title: "NeuroShine is Born", description: "Founded by Dr. Garima Tyagi with a single therapy room and a big vision." },
  { year: "2025", title: "Multidisciplinary Team", description: "Expanded to a full team across speech, OT, psychology and special education." },
  { year: "2026", title: "1,00+ Children Supported", description: "Celebrated a milestone of empowering over a thousand young minds." },
];

export const achievements = [
  //{ icon: Award, label: "Best Child Development Centre 2025" },
  { icon: Star, label: "4.9/5 average parent rating" },
  { icon: Users, label: "5+ certified specialists" },
  { icon: HeartHandshake, label: "100+ families supported" },
];

export const certifications = [
  "Rehabilitation Council of India (RCI) registered professionals",
  "Board Certified Behaviour Analysts (BCBA)",
  "Certified Sensory Integration practitioners",
  "Licensed Speech-Language Pathologists",
  "Certified Special Educators",
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "My son barely spoke at three. After a year at NeuroShine he chats non-stop! The therapists are patient, skilled and genuinely caring.",
    author: "Priya S.",
    relation: "Mother of a 4-year-old",
    rating: 5,
  },
  {
    quote:
      "The sensory integration program transformed our daughter. She's calmer, more focused and finally enjoys school.",
    author: "Rahul M.",
    relation: "Father of a 6-year-old",
    rating: 5,
  },
  {
    quote:
      "As parents we felt lost after the autism diagnosis. NeuroShine gave us a clear plan and unwavering support. We're forever grateful.",
    author: "Aisha K.",
    relation: "Mother of a 5-year-old",
    rating: 5,
  },
  {
    quote:
      "The special-education team helped my dyslexic son go from hating reading to reading for fun. Incredible, compassionate professionals.",
    author: "Vikram R.",
    relation: "Father of an 8-year-old",
    rating: 5,
  },
  {
    quote:
      "Tele-therapy meant we could continue sessions even from another city. Same quality, total convenience.",
    author: "Neha T.",
    relation: "Mother of a 7-year-old",
    rating: 5,
  },
  {
    quote:
      "Warm, professional and truly invested in the children. NeuroShine feels like family.",
    author: "Sana D.",
    relation: "Mother of a 3-year-old",
    rating: 5,
  },
];

/** General FAQs for the homepage & contact page. */
export const generalFaqs: FAQ[] = [
  {
    question: "How do I know if my child needs therapy?",
    answer:
      "If you notice delays in speech, movement, learning or social skills, challenging behaviour, or concerns raised at school, an assessment can provide clarity. When in doubt, a consultation is a great first step.",
  },
  {
    question: "Do I need a doctor's referral to book?",
    answer:
      "No referral is required. You can book a consultation or assessment with us directly, and we'll guide you from there.",
  },
  {
    question: "What happens at the first visit?",
    answer:
      "We listen to your concerns, understand your child's history and, where appropriate, begin an assessment. You'll leave with clear next steps and a recommended plan.",
  },
  {
    question: "How long before we see progress?",
    answer:
      "Every child is different. Many families notice positive changes within weeks, and we review progress every 8–12 weeks to keep therapy on track.",
  },
  {
    question: "Do you offer online therapy?",
    answer:
      "Yes — our secure tele-therapy service delivers the same expert care to your home, ideal for busy schedules or families further away.",
  },
  {
    question: "Can I be involved in my child's therapy?",
    answer:
      "Absolutely. Parent involvement is central to success. We coach you with practical strategies to support your child at home.",
  },
];
