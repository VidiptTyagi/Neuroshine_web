import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { BlogExplorer } from "@/components/sections/blog/blog-explorer";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPosts, blogCategories } from "@/content/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Expert articles, parenting tips and therapy insights from the NeuroShine team — on speech, occupational therapy, autism, early intervention and more.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights for growing minds"
        description="Practical, compassionate advice from our therapists — to support your child at home and beyond."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <BlogExplorer posts={blogPosts} categories={blogCategories} />
        </Container>
      </section>
    </>
  );
}
