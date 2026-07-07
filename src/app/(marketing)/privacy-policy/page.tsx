import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How NeuroShine Child Development Centre collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

const sections = [
  {
    heading: "1. Information We Collect",
    body: "We collect information you provide directly — such as your name, contact details, your child's name and age, and any information shared through our appointment, contact and application forms. We also collect limited technical data (such as device and usage information) to improve our website.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "We use your information to schedule and provide care, respond to enquiries, process applications, send updates you have requested, and improve our services. We never sell your personal information.",
  },
  {
    heading: "3. Children's Privacy",
    body: "We take special care with information relating to children. Details about your child are collected only from parents or guardians and used solely to provide and coordinate appropriate care.",
  },
  {
    heading: "4. Data Sharing",
    body: "We share information only with your consent, with our care team who need it to support your child, or where required by law. With your permission we may coordinate with your child's school or other professionals.",
  },
  {
    heading: "5. Data Security",
    body: "We use appropriate technical and organisational measures to protect your information against unauthorised access, loss or misuse. Access is limited to authorised staff.",
  },
  {
    heading: "6. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time. To exercise these rights, contact us using the details below.",
  },
  {
    heading: "7. Cookies",
    body: "Our website uses cookies to improve your experience and understand how the site is used. You can control cookies through our consent banner and your browser settings.",
  },
  {
    heading: "8. Updates to This Policy",
    body: "We may update this policy from time to time. Material changes will be posted on this page with a revised date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains how we handle your information."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
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
              <h2 className="text-xl font-semibold">9. Contact Us</h2>
              <p className="mt-2 text-muted-foreground">
                For any privacy questions or requests, contact us at{" "}
                <a
                  href={siteConfig.contact.emailHref}
                  className="text-primary underline underline-offset-2"
                >
                  {siteConfig.contact.email}
                </a>{" "}
                or {siteConfig.contact.phone}.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
