import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visual breadcrumb trail + matching BreadcrumbList JSON-LD.
 * Always include Home as the first crumb.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <React.Fragment key={item.path}>
                <BreadcrumbItem>
                  {last ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.path}>
                      {item.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!last ? <BreadcrumbSeparator /> : null}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
