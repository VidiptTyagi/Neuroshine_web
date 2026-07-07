import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

export const appointmentSchema = z.object({
  parentName: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  childName: z.string().min(1, "Please enter your child's name").max(80),
  childAge: z.string().min(1, "Please enter your child's age").max(20),
  service: z.string().min(1, "Please select a service"),
  therapist: z.string().optional(),
  date: z.string().min(1, "Please choose a date"),
  time: z.string().min(1, "Please choose a time"),
  payment: z.enum(["clinic", "online"]),
  notes: z.string().max(1000).optional(),
});
export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number").optional().or(z.literal("")),
  subject: z.string().min(2, "Please add a subject").max(120),
  message: z.string().min(10, "Please write at least 10 characters").max(2000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const careerSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please add your experience").max(60),
  message: z.string().max(2000).optional(),
  /** Resume file metadata — the file itself is uploaded separately. */
  resumeUrl: z.string().url().optional(),
});
export type CareerInput = z.infer<typeof careerSchema>;
