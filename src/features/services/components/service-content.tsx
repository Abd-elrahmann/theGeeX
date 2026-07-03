"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

import { type Service } from "@/features/services/constants/services";
import { servicesContentContainerClassName } from "@/features/services/constants/services-layout";
import { ServiceContentArrow } from "./service-content-arrow";

interface ServiceContentProps {
  service: Service;
  variant?: "panel" | "standalone";
  isGridHovered?: boolean;
  headerContent?: ReactNode;
  showContentTitle?: boolean;
}

const serviceContentTitleClassName = cn(
  "m-0 w-full min-w-0 font-[family-name:var(--font-cal-sans)] font-semibold not-italic",
  "text-[length:var(--services-content-header-size)] leading-(--services-content-header-line-height)",
  "tracking-[0em] whitespace-normal text-(--color-cta-text) lg:text-(--color-services-content-accent)",
  "[font-feature-settings:var(--services-content-font-features)]",
);

const serviceContentDescriptionClassName = "break-words font-poppins font-normal lg:font-light";

export function ServiceContent({
  service,
  variant = "panel",
  isGridHovered = false,
  headerContent,
  showContentTitle = true,
}: ServiceContentProps) {
  const content = (
    <>
      {headerContent ? (
        <div className={cn("w-full shrink-0", !showContentTitle && "mb-(--services-content-header-desc-gap)")}>
          {headerContent}
        </div>
      ) : null}

      <div className="service-content-details" aria-label={`${service.contentTitle} details`}>
        {showContentTitle ? (
          <header className="relative w-full shrink-0">
            <h3 className={serviceContentTitleClassName}>{service.contentTitle}</h3>
          </header>
        ) : null}

        <ul className={cn("service-content-description-list space-y-2", serviceContentDescriptionClassName)}>
          {service.description.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span aria-hidden className="service-content-bullet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "relative mt-auto flex h-min w-full flex-row flex-nowrap content-center items-center justify-end",
          "gap-(--services-content-arrow-gap) overflow-visible p-0",
        )}
      >
        <ServiceContentArrow isGridHovered={isGridHovered} />
      </div>
    </>
  );

  if (variant === "standalone") {
    return <article className={servicesContentContainerClassName}>{content}</article>;
  }

  return content;
}
