import { appointmentSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { ok, badRequest, tooMany, serverError } from "@/lib/api-response";
import { sendEmail, emailConfig } from "@/lib/email/resend";
import {
  appointmentClinicEmail,
  appointmentUserEmail,
} from "@/lib/email/templates";

/** Appointment request → emails the clinic (+ confirmation to the parent). No database. */
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`appointment:${ip}`, 5, 60_000);
  if (!limit.success) return tooMany(limit.resetAt);

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return serverError("Invalid request body");
  }

  const parsed = appointmentSchema.safeParse(json);
  if (!parsed.success) return badRequest(parsed.error);
  const d = parsed.data;

  try {
    const clinic = await sendEmail({
      to: emailConfig.CLINIC_INBOX,
      subject: `New appointment: ${d.service} — ${d.childName}`,
      html: appointmentClinicEmail(d),
      replyTo: d.email,
    });
    if (!clinic.ok) return serverError();
    await sendEmail({
      to: d.email,
      subject: "Your NeuroShine appointment request",
      html: appointmentUserEmail(d),
    });
    return ok();
  } catch (err) {
    console.error("[api/appointments]", err);
    return serverError();
  }
}
