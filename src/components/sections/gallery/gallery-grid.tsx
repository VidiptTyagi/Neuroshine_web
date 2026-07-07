"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Clinic", "Therapy", "Events", "Team"] as const;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] =
    React.useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
          >
            <Badge
              variant={active === cat ? "default" : "secondary"}
              className={cn(
                "cursor-pointer px-4 py-1.5 font-normal transition-colors",
                active !== cat && "hover:bg-secondary/70",
              )}
            >
              {cat}
            </Badge>
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.figure
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border/60"
            >
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-accent/15 text-5xl transition-transform duration-300 group-hover:scale-110">
                {item.emoji}
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-white/80">{item.category}</p>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
