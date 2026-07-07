import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { GalleryGrid } from "@/components/sections/gallery/gallery-grid";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { gallery } from "@/content/data/misc";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Take a peek inside Neuroshine — our therapy rooms, sensory gym, team and events. A warm, child-friendly space where children love to learn.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Step inside Neuroshine"
        description="A warm, safe and playful environment designed for children to feel comfortable, curious and confident."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <GalleryGrid items={gallery} />
        </Container>
      </section>
      <HomeCta />
    </>
  );
}
