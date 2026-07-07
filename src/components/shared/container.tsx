import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Centered, responsive max-width wrapper used by every section.
 */
export function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Comp = as ?? "div";
  return (
    <Comp
      className={cn("mx-auto w-full max-w-7xl container-px", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
