import Link from "next/link";

import { cn } from "@/lib/cn";

interface DetailBreadcrumbItem {
  label: string;
  href?: string;
}

interface DetailBreadcrumbProps {
  items: DetailBreadcrumbItem[];
  className?: string;
  linkClassName?: string;
  currentClassName?: string;
  separatorClassName?: string;
}

export function DetailBreadcrumb({
  items,
  className,
  linkClassName,
  currentClassName,
  separatorClassName,
}: DetailBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="contents">
            {item.href && !isLastItem ? (
              <Link href={item.href} className={linkClassName}>
                {item.label}
              </Link>
            ) : (
              <span className={cn("whitespace-nowrap font-medium", currentClassName)}>
                {item.label}
              </span>
            )}

            {!isLastItem ? (
              <span aria-hidden="true" className={separatorClassName}>
                &gt;
              </span>
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}