import { careerSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { ok, badRequest, tooMany, serverError } from "@/lib/api-response";
import { sendEmail, emailConfig } from "@/lib/email/resend";
import { careerClinicEmail, careerUserEmail } from "@/lib/email/templates";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/** Career application → emails the clinic with the resume attached (+ confirmation). No database. */
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`careers:${ip}`, 3, 60_000);
  if (!limit.success) return tooMany(limit.resetAt);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return serverError("Invalid form submission");
  }

  const parsed = careerSchema.safeParse({
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    position: String(form.get("position") ?? ""),
    experience: String(form.get("experience") ?? ""),
    message: String(form.get("message") ?? ""),
  });
  if (!parsed.success) return badRequest(parsed.error);
  const d = parsed.data;

  const resume = form.get("resume");
  if (!(resume instanceof File)) return serverError("Please attach your resume.");
  if (resume.size > MAX_RESUME_BYTES) return serverError("Resume must be under 5MB.");
  if (!ALLOWED.includes(resume.type)) {
    return serverError("Resume must be a PDF or Word document.");
  }

  try {
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const clinic = await sendEmail({
      to: emailConfig.CLINIC_INBOX,
      subject: `New application: ${d.position} — ${d.name}`,
      html: careerClinicEmail({ ...d, resumeName: resume.name }),
      replyTo: d.email,
      attachments: [{ filename: resume.name, content: resumeBuffer }],
    });
    if (!clinic.ok) return serverError();
    await sendEmail({
      to: d.email,
      subject: "Application received — NeuroShine",
      html: careerUserEmail(d),
    });
    return ok();
  } catch (err) {
    console.error("[api/careers]", err);
    return serverError();
  }
}
