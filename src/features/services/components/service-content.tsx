"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

import { type Service } from "@/features/services/constants/services";
import { servicesContentContainerClassName } from "@/features/services/constants/services-layout";
import { ServiceContentArrow } from "./service-content-arrow";

interface ServiceContentProps {
  service: Service;
  variant?: "panel" | "standalone" | "page";
  layoutMode?: "flow" | "overlay";
  isGridHovered?: boolean;
  headerContent?: ReactNode;
  showContentTitle?: boolean;
  descriptionItems?: string[];
}

const serviceContentTitleClassName = cn(
  "absolute left-0 top-0 m-0 h-auto w-full min-w-0",
  "whitespace-pre-wrap wrap-break-word break-words",
  "font-cal-sans text-[24px] leading-[1.4] font-semibold not-italic tracking-[0em]",
  "text-(--Text_Color,#2c3134) md:text-[var(--Purple_Light,#2558b4)]",
  "[font-feature-settings:var(--services-content-font-features)]",
);

const serviceContentHeaderHeightClassName = "min-h-[67.2px]";

const serviceContentFeaturesOffsetClassName = "pt-[48px] md:pt-[91.2px]";

const serviceContentDescriptionClassName = cn(
  "absolute left-0 top-[48px] m-0 h-auto w-full min-w-0 p-0 md:top-[91.2px]",
  "whitespace-pre-wrap wrap-break-word break-words",
  "font-poppins text-[16px] leading-[1.6] font-normal not-italic tracking-normal",
  "text-(--Text_Color,#2c3134)",
  "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
);

export function ServiceContent({
  service,
  variant = "panel",
  layoutMode = "overlay",
  isGridHovered = false,
  headerContent,
  showContentTitle = true,
  descriptionItems,
}: ServiceContentProps) {
  const resolvedDescriptionItems = descriptionItems ?? service.description;
  const usesFlowLayout = layoutMode === "flow";

  if (variant === "page") {
    return (
      <article className={servicesContentContainerClassName}>
        {headerContent ? (
          <div className={cn("w-full shrink-0", !showContentTitle && "mb-(--services-content-header-desc-gap)")}>
            {headerContent}
          </div>
        ) : null}

        <div className="service-content-details relative flex min-h-0 w-full flex-1 flex-col">
          {showContentTitle ? (
            <header className="w-full shrink-0 pb-1 md:pb-(--services-content-header-desc-gap)">
              <h3 className={cn(serviceContentTitleClassName, "static")}>{service.contentTitle}</h3>
            </header>
          ) : null}

          <ul
            className={cn(
              "service-content-description-list static space-y-0 md:space-y-1",
              "m-0 h-auto w-full min-w-0 p-0",
              "font-poppins text-[16px] leading-[1.32] md:leading-[1.6] font-normal not-italic tracking-normal",
              "text-(--Text_Color,#2c3134)",
              "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
            )}
          >
            {resolvedDescriptionItems.map((item) => (
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
      </article>
    );
  }

  const content = usesFlowLayout ? (
    <>
      {headerContent ? (
        <div className={cn("w-full shrink-0", !showContentTitle && "mb-(--services-content-header-desc-gap)")}>
          {headerContent}
        </div>
      ) : null}

      <div className="service-content-details relative flex min-h-0 w-full flex-1 flex-col">
        {showContentTitle ? (
          <header className="w-full shrink-0 pb-1 md:pb-(--services-content-header-desc-gap)">
            <h3 className={cn(serviceContentTitleClassName, "static")}>{service.contentTitle}</h3>
          </header>
        ) : null}

        <ul
          className={cn(
            "service-content-description-list static space-y-0.5 md:space-y-2",
            "m-0 h-auto w-full min-w-0 p-0",
            "font-poppins text-[16px] leading-[1.32] md:leading-[1.6] font-normal not-italic tracking-normal",
            "text-(--Text_Color,#2c3134)",
            "font-features-['blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on,'zero'_on]",
          )}
        >
          {resolvedDescriptionItems.map((item) => (
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
  ) : (
    <>
      {headerContent ? (
        <div className={cn("w-full shrink-0", !showContentTitle && "mb-(--services-content-header-desc-gap)")}>
          {headerContent}
        </div>
      ) : null}

      <div
        className={cn(
          "service-content-details relative",
          showContentTitle && serviceContentFeaturesOffsetClassName,
        )}
        aria-label={`${service.contentTitle} details`}
      >
        {showContentTitle ? (
          <header className={cn("absolute inset-x-0 top-0 w-full shrink-0", serviceContentHeaderHeightClassName)}>
            <h3 className={serviceContentTitleClassName}>
              {service.contentTitle}
            </h3>
          </header>
        ) : null}

        <ul className={cn("service-content-description-list space-y-2", serviceContentDescriptionClassName)}>
          {resolvedDescriptionItems.map((item) => (
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
