import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { BlogCard } from "@/components/shared/blog-card";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPosts, blogCategories } from "@/content/blog";

interface Props {
  params: Promise<{ category: string }>;
}

const toSlug = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: toSlug(c) }));
}

function resolveCategory(slug: string): string | undefined {
  return blogCategories.find((c) => toSlug(c) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const name = resolveCategory(category);
  if (!name) return buildMetadata({ title: "Category not found" });
  return buildMetadata({
    title: `${name} Articles`,
    description: `Read NeuroShine articles in the ${name} category.`,
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const name = resolveCategory(category);
  if (!name) notFound();

  const posts = blogPosts.filter((p) => p.category === name);

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={name}
        description={`Articles about ${name.toLowerCase()} from the NeuroShine team.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name, path: `/blog/category/${category}` },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
