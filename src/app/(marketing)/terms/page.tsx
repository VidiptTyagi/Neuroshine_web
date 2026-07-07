import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of the NeuroShine website and services.",
  path: "/terms",
});

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: "By accessing or using the NeuroShine website and services, you agree to these Terms of Service. If you do not agree, please do not use our website or services.",
  },
  {
    heading: "2. Services",
    body: "NeuroShine provides child-development therapy and assessment services. Information on this website is for general guidance only and does not replace professional clinical advice, diagnosis or treatment.",
  },
  {
    heading: "3. Appointments & Cancellations",
    body: "Appointment requests submitted online are confirmed by our team. We ask that you provide reasonable notice for cancellations or rescheduling so we can offer the slot to another family.",
  },
  {
    heading: "4. No Medical Emergency Service",
    body: "Our website and online forms are not monitored for emergencies. If your child needs urgent medical attention, please contact your local emergency services immediately.",
  },
  {
    heading: "5. Intellectual Property",
    body: "All content on this website — text, graphics, logos and images — is the property of NeuroShine and protected by applicable laws. You may not reproduce it without permission.",
  },
  {
    heading: "6. User Responsibilities",
    body: "You agree to provide accurate information and to use our website lawfully and respectfully. You are responsible for maintaining the confidentiality of any portal login credentials.",
  },
  {
    heading: "7. Limitation of Liability",
    body: "To the extent permitted by law, NeuroShine is not liable for any indirect or consequential loss arising from the use of this website. Website information is provided 'as is' without warranties.",
  },
  {
    heading: "8. Changes to Terms",
    body: "We may update these terms from time to time. Continued use of the website after changes constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before using our website and services."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().getFullYear()}
          </p>
          <div className="mt-8 space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-semibold">{s.heading}</h2>
                <p className="mt-2 text-muted-foreground">{s.body}</p>
              </div>
            ))}
            <div>
              <h2 className="text-xl font-semibold">9. Contact</h2>
              <p className="mt-2 text-muted-foreground">
                Questions about these terms? Contact us at{" "}
                <a
                  href={siteConfig.contact.emailHref}
                  className="text-primary underline underline-offset-2"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
