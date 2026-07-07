import { siteConfig } from "@/config/site";

/** Escape user-supplied text for safe insertion into HTML email bodies. */
function esc(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Branded responsive wrapper shared by every email. */
function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;background:#f4f6fb;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#16324a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:24px 0;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(20,80,160,.08);">
<tr><td style="background:linear-gradient(120deg,#2f5fe0,#7c3aed);padding:24px 32px;">
<span style="color:#fff;font-size:20px;font-weight:800;">Neuro<span style="opacity:.85">Shine</span></span>
<div style="color:rgba(255,255,255,.85);font-size:12px;margin-top:2px;">${esc(siteConfig.tagline)}</div></td></tr>
<tr><td style="padding:32px;"><h1 style="margin:0 0 16px;font-size:20px;color:#16324a;">${esc(title)}</h1>${bodyHtml}</td></tr>
<tr><td style="padding:20px 32px;background:#f4f6fb;color:#5a7386;font-size:12px;line-height:1.6;">
${esc(siteConfig.legalName)}<br/>${esc(siteConfig.address.street)}, ${esc(siteConfig.address.locality)}<br/>
${esc(siteConfig.contact.phone)} · ${esc(siteConfig.contact.email)}</td></tr>
</table></td></tr></table></body></html>`;
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 0;color:#5a7386;font-size:13px;width:150px;vertical-align:top;">${esc(label)}</td>
<td style="padding:6px 0;color:#16324a;font-size:14px;font-weight:500;">${esc(value)}</td></tr>`;
}
const table = (rows: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;

/* ---------- Appointment ---------- */
export interface AppointmentEmailData {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  service: string;
  therapist?: string;
  date: string;
  time: string;
  payment: string;
  notes?: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

export function appointmentClinicEmail(d: AppointmentEmailData): string {
  const rows =
    row("Parent", d.parentName) +
    row("Phone", d.phone) +
    row("Email", d.email) +
    row("Child", `${d.childName} (${d.childAge})`) +
    row("Service", d.service) +
    row("Therapist", d.therapist || "Any available") +
    row("Date", formatDate(d.date)) +
    row("Time", d.time) +
    row("Payment", d.payment === "online" ? "Pay online" : "Pay at clinic") +
    row("Notes", d.notes || "—");
  return layout(
    "New Appointment Request",
    `<p style="margin:0 0 16px;color:#5a7386;font-size:14px;">A new appointment request has been submitted.</p>${table(rows)}`,
  );
}

export function appointmentUserEmail(d: AppointmentEmailData): string {
  const body = `<p style="margin:0 0 16px;color:#16324a;font-size:15px;">Hi ${esc(d.parentName)},</p>
<p style="margin:0 0 16px;color:#5a7386;font-size:14px;line-height:1.6;">Thank you for booking with NeuroShine. We've received your request and our team will confirm it within one working day.</p>
${table(row("Service", d.service) + row("Child", `${d.childName} (${d.childAge})`) + row("Preferred date", formatDate(d.date)) + row("Preferred time", d.time))}`;
  return layout("We've received your request 🎉", body);
}

/* ---------- Contact ---------- */
export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function contactClinicEmail(d: ContactEmailData): string {
  const rows =
    row("Name", d.name) +
    row("Email", d.email) +
    row("Phone", d.phone || "—") +
    row("Subject", d.subject);
  return layout(
    "New Contact Message",
    `<p style="margin:0 0 16px;color:#5a7386;font-size:14px;">New message from the website contact form.</p>${table(rows)}
<div style="margin-top:16px;padding:16px;background:#f4f6fb;border-radius:12px;color:#16324a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(d.message)}</div>`,
  );
}

export function contactUserEmail(d: ContactEmailData): string {
  return layout(
    "Thanks for contacting us",
    `<p style="margin:0 0 16px;color:#16324a;font-size:15px;">Hi ${esc(d.name)},</p>
<p style="margin:0;color:#5a7386;font-size:14px;line-height:1.6;">Thank you for reaching out to NeuroShine. We've received your message and our team will get back to you within one working day.</p>`,
  );
}

/* ---------- Newsletter ---------- */
export function newsletterWelcomeEmail(email: string): string {
  return layout(
    "You're subscribed 🎉",
    `<p style="margin:0;color:#5a7386;font-size:14px;line-height:1.6;">Welcome to the NeuroShine newsletter! You'll now receive parenting tips, therapy insights and updates. We're glad to have you (${esc(email)}) with us.</p>`,
  );
}

/* ---------- Careers ---------- */
export interface CareerEmailData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message?: string;
  resumeName?: string;
}

export function careerClinicEmail(d: CareerEmailData): string {
  const rows =
    row("Name", d.name) +
    row("Email", d.email) +
    row("Phone", d.phone) +
    row("Position", d.position) +
    row("Experience", d.experience) +
    row("Resume", d.resumeName || "Attached") +
    row("Note", d.message || "—");
  return layout(
    "New Career Application",
    `<p style="margin:0 0 16px;color:#5a7386;font-size:14px;">A new job application has been received.</p>${table(rows)}`,
  );
}

export function careerUserEmail(d: CareerEmailData): string {
  return layout(
    "Application received",
    `<p style="margin:0 0 16px;color:#16324a;font-size:15px;">Hi ${esc(d.name)},</p>
<p style="margin:0;color:#5a7386;font-size:14px;line-height:1.6;">Thank you for applying for the ${esc(d.position)} role at NeuroShine. We've received your application and our team will be in touch if there's a fit.</p>`,
  );
}
