import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { getPostBySlug, getAllPostSlugs, blogPosts } from "@/content/blog";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BlogCard } from "@/components/shared/blog-card";
import { HomeCta } from "@/components/sections/home/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Article not found" });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = related.length
    ? related
    : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          datePublished: post.date,
          author: post.author,
        })}
      />

      <article>
        <header className="border-b bg-muted/30">
          <Container className="py-10 lg:py-14">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Blog", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
            <div className="mt-6 max-w-3xl">
              <Badge variant="secondary" className="font-normal">
                {post.category}
              </Badge>
              <h1 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingMinutes} min read
                </span>
              </div>
            </div>
          </Container>
        </header>

        <Container className="max-w-3xl py-12">
          <div className="prose-content space-y-5 text-base leading-relaxed text-foreground/90">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal">
                #{tag}
              </Badge>
            ))}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto"
            >
              <Button variant="outline" size="sm" className="rounded-full">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </a>
          </div>

          <div className="mt-8">
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
            </Button>
          </div>
        </Container>
      </article>

      <section className="border-t bg-muted/30 py-14">
        <Container>
          <h2 className="text-2xl font-bold">Related articles</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackRelated.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <HomeCta />
    </>
  );
}
