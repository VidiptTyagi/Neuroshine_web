import { contactSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { ok, badRequest, tooMany, serverError } from "@/lib/api-response";
import { sendEmail, emailConfig } from "@/lib/email/resend";
import { contactClinicEmail, contactUserEmail } from "@/lib/email/templates";

/** Contact form → emails the clinic (+ confirmation to the sender). No database. */
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.success) return tooMany(limit.resetAt);

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return serverError("Invalid request body");
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) return badRequest(parsed.error);
  const d = parsed.data;

  try {
    const clinic = await sendEmail({
      to: emailConfig.CLINIC_INBOX,
      subject: `New enquiry: ${d.subject}`,
      html: contactClinicEmail(d),
      replyTo: d.email,
    });
    if (!clinic.ok) return serverError();
    // Confirmation to the visitor (best-effort — don't fail the request on this)
    await sendEmail({
      to: d.email,
      subject: "We've received your message — NeuroShine",
      html: contactUserEmail(d),
    });
    return ok();
  } catch (err) {
    console.error("[api/contact]", err);
    return serverError();
  }
}
