import {
  Gauge,
  ScanSearch,
  Stethoscope,
  BrainCircuit,
  BookOpen,
  Activity,
  ListChecks,
} from "lucide-react";
import type { Assessment } from "@/types";

export const assessments: Assessment[] = [
  {
    slug: "development-assessment",
    title: "Development Assessment",
    shortDescription:
      "A comprehensive screening of your child's development across all key areas.",
    icon: Gauge,
    overview: [
      "Our developmental assessment gives a complete picture of how your child is progressing across motor, language, social, cognitive and self-care domains, compared to age expectations.",
      "It's ideal when you have general concerns, or want to understand your child's strengths and needs and plan the right support early.",
    ],
    whatWeEvaluate: [
      "Gross and fine motor skills",
      "Speech, language and communication",
      "Social and emotional development",
      "Cognitive and problem-solving skills",
      "Play and adaptive behaviour",
    ],
    duration: "60–90 minutes, plus a feedback session and written report.",
    outcome:
      "A clear developmental profile with practical recommendations and, where needed, referrals for targeted therapy.",
    faqs: [
      { question: "What age is this suitable for?", answer: "Developmental assessments are most commonly used from infancy through the early school years, but can be adapted for older children." },
      { question: "Will I get a written report?", answer: "Yes, you'll receive a detailed report with findings and recommendations after a feedback session." },
    ],
  },
  {
    slug: "autism-assessment",
    title: "Autism Assessment",
    shortDescription:
      "A structured diagnostic evaluation for autism spectrum disorder by experienced specialists.",
    icon: ScanSearch,
    overview: [
      "Our autism assessment uses internationally recognised, evidence-based tools and clinical observation to evaluate social communication, interaction, and patterns of behaviour and interests.",
      "We take a warm, child-friendly approach and combine parent interviews, direct assessment and, where relevant, input from school to reach a careful, accurate conclusion.",
    ],
    whatWeEvaluate: [
      "Social communication and interaction",
      "Play and imagination",
      "Repetitive behaviours and interests",
      "Sensory responses",
      "Developmental history",
    ],
    duration: "Typically 2–3 sessions, plus a detailed feedback session and report.",
    outcome:
      "A clear diagnostic conclusion with tailored recommendations for therapy, school and home support.",
    faqs: [
      { question: "How early can autism be assessed?", answer: "Reliable assessment is often possible from around age two, and earlier support leads to better outcomes." },
      { question: "What happens after diagnosis?", answer: "We guide you through next steps and can begin a coordinated therapy plan straight away." },
    ],
  },
  {
    slug: "speech-assessment",
    title: "Speech & Language Assessment",
    shortDescription:
      "A detailed evaluation of your child's speech, language and communication skills.",
    icon: Stethoscope,
    overview: [
      "This assessment evaluates how your child understands language, expresses themselves, produces speech sounds and communicates socially, identifying any areas that need support.",
      "It's the first step toward effective speech therapy, giving us a clear baseline and specific goals.",
    ],
    whatWeEvaluate: [
      "Receptive language (understanding)",
      "Expressive language (talking)",
      "Speech-sound production and clarity",
      "Fluency and voice",
      "Social communication",
    ],
    duration: "45–60 minutes, plus feedback and a written report.",
    outcome:
      "A clear speech-and-language profile with targeted therapy goals and recommendations.",
    faqs: [
      { question: "When should I get a speech assessment?", answer: "If your child's talking, understanding or clarity seems behind peers, an assessment provides clarity and direction." },
      { question: "Does assessment lead straight into therapy?", answer: "Yes — findings translate directly into a personalised speech therapy plan." },
    ],
  },
  {
    slug: "iq-test",
    title: "IQ Test (Cognitive Assessment)",
    shortDescription:
      "A standardised measure of your child's cognitive abilities and thinking skills.",
    icon: BrainCircuit,
    overview: [
      "A cognitive (IQ) assessment measures reasoning, memory, processing and problem-solving using gold-standard, standardised tests administered by our psychologists.",
      "It helps understand learning strengths and challenges, informs school planning, and can be part of assessing giftedness or learning difficulties.",
    ],
    whatWeEvaluate: [
      "Verbal reasoning",
      "Visual-spatial reasoning",
      "Working memory",
      "Processing speed",
      "Fluid reasoning",
    ],
    duration: "90–120 minutes, plus a feedback session and report.",
    outcome:
      "A comprehensive cognitive profile with standardised scores and practical educational recommendations.",
    faqs: [
      { question: "Why would my child need an IQ test?", answer: "It clarifies learning strengths and needs, supports school planning, and can be part of assessing giftedness or learning difficulties." },
      { question: "Is the test stressful for children?", answer: "No — our psychologists make it engaging and supportive, and we build in breaks as needed." },
    ],
  },
  {
    slug: "learning-disability-assessment",
    title: "Learning Disability Assessment",
    shortDescription:
      "A thorough evaluation to identify dyslexia, dyscalculia, dysgraphia and other learning difficulties.",
    icon: BookOpen,
    overview: [
      "This assessment identifies specific learning disabilities by examining cognitive abilities alongside academic skills in reading, writing and mathematics.",
      "It explains why a capable child may be struggling academically and provides a clear plan of remediation and accommodations.",
    ],
    whatWeEvaluate: [
      "Reading accuracy, fluency and comprehension",
      "Spelling and written expression",
      "Mathematical skills",
      "Underlying cognitive processes",
      "Attention and working memory",
    ],
    duration: "Usually 2–3 sessions, plus feedback and a comprehensive report.",
    outcome:
      "A clear diagnosis where applicable, with a remediation plan and recommended school accommodations.",
    faqs: [
      { question: "What age is best for this assessment?", answer: "Usually from age six or seven, once formal academic skills have been taught, though concerns can be explored earlier." },
      { question: "Can the report help at school?", answer: "Yes — it includes recommended accommodations you can share with your child's school." },
    ],
  },
  {
    slug: "adhd-assessment",
    title: "ADHD Assessment",
    shortDescription:
      "A structured evaluation of attention, activity and impulse control.",
    icon: Activity,
    overview: [
      "Our ADHD assessment combines standardised rating scales, clinical interview and direct observation to evaluate attention, hyperactivity and impulsivity across settings.",
      "We gather information from parents and, with consent, school, to understand your child fully and reach an accurate conclusion.",
    ],
    whatWeEvaluate: [
      "Attention and concentration",
      "Hyperactivity and impulsivity",
      "Executive functioning",
      "Behaviour across home and school",
      "Developmental and medical history",
    ],
    duration: "1–2 sessions plus questionnaires, feedback and a written report.",
    outcome:
      "A clear conclusion with tailored strategies for home, school and, if relevant, coordination with your paediatrician.",
    faqs: [
      { question: "Do you involve the school?", answer: "With your consent, teacher input greatly improves accuracy, so we usually gather school questionnaires." },
      { question: "What support follows the assessment?", answer: "We provide practical strategies and can begin ADHD-management support right away." },
    ],
  },
  {
    slug: "behavior-assessment",
    title: "Behaviour Assessment",
    shortDescription:
      "An in-depth evaluation of challenging behaviours to understand causes and guide support.",
    icon: ListChecks,
    overview: [
      "A behaviour assessment identifies the patterns, triggers and functions behind challenging behaviours, so support can be targeted and effective rather than reactive.",
      "Through interview, questionnaires and observation, we build a clear behavioural profile and a positive behaviour support plan.",
    ],
    whatWeEvaluate: [
      "Behaviour patterns and triggers",
      "Function of behaviours",
      "Emotional regulation",
      "Environmental factors",
      "Existing strengths and supports",
    ],
    duration: "1–2 sessions plus questionnaires, feedback and a report.",
    outcome:
      "A positive behaviour support plan with clear, practical strategies for home and school.",
    faqs: [
      { question: "Will this help reduce meltdowns?", answer: "Yes — understanding what drives behaviour is the key to reducing it and teaching better alternatives." },
      { question: "Is the approach positive?", answer: "Entirely. We focus on understanding needs and building skills, never punishment." },
    ],
  },
];

export function getAssessmentBySlug(slug: string): Assessment | undefined {
  return assessments.find((a) => a.slug === slug);
}

export function getAllAssessmentSlugs(): string[] {
  return assessments.map((a) => a.slug);
}
