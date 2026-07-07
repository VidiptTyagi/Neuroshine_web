import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

/**
 * Lazily instantiate the Resend client. Returns null when no API key is set,
 * so the site keeps working in development (emails are skipped, forms succeed).
 */
let client: Resend | null = null;
function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

const FROM =
  process.env.RESEND_FROM_EMAIL ?? `${siteConfig.name} <onboarding@resend.dev>`;
const CLINIC_INBOX =
  process.env.CONTACT_NOTIFY_EMAIL ?? siteConfig.contact.email;

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}

export interface SendResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  attachments,
}: SendArgs): Promise<SendResult> {
  const resend = getClient();
  if (!resend) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipped "${subject}" to`,
      to,
    );
    return { ok: true, skipped: true };
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
      replyTo,
      attachments,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { ok: false, error: (err as Error).message };
  }
}

export const emailConfig = { FROM, CLINIC_INBOX };
