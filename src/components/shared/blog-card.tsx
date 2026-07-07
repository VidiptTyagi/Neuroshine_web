import * as React from "react";
import Link from "next/link";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary/15 to-accent/15 text-5xl">
          📝
        </div>
        <CardContent className="flex h-full flex-col p-5">
          <Badge variant="secondary" className="w-fit font-normal">
            {post.category}
          </Badge>
          <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {format(new Date(post.date), "MMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingMinutes} min read
            </span>
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}
