import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="brand-gradient-text text-7xl font-extrabold sm:text-8xl">
        404
      </p>
      <div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          The page you’re looking for doesn’t exist or has moved. Let’s get you
          back on track.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full">
          <Link href="/">
            <Home className="h-4 w-4" />
            Go home
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/services">
            <Search className="h-4 w-4" />
            Browse services
          </Link>
        </Button>
      </div>
    </div>
  );
}
