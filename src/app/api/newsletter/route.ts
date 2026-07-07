import { newsletterSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { ok, badRequest, tooMany, serverError } from "@/lib/api-response";
import { sendEmail, emailConfig } from "@/lib/email/resend";
import { newsletterWelcomeEmail } from "@/lib/email/templates";

/** Newsletter → welcomes the subscriber + notifies the clinic. No database. */
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!limit.success) return tooMany(limit.resetAt);

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return serverError("Invalid request body");
  }

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) return badRequest(parsed.error);
  const { email } = parsed.data;

  try {
    await sendEmail({
      to: email,
      subject: "Welcome to the NeuroShine newsletter 🎉",
      html: newsletterWelcomeEmail(email),
    });
    await sendEmail({
      to: emailConfig.CLINIC_INBOX,
      subject: "New newsletter subscriber",
      html: `<p style="font-family:sans-serif">New subscriber: <strong>${email}</strong></p>`,
    });
    return ok();
  } catch (err) {
    console.error("[api/newsletter]", err);
    return serverError();
  }
}
