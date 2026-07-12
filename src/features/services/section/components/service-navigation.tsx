"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { formatIndex } from "@/lib/format-index";

import { type Service, servicesTransition } from "@/features/services/constants/services";

interface ServiceNavigationProps {
  services: Service[];
  activeIndex: number;
  variant?: "desktop" | "mobile";
}

interface ServiceNavItemContentProps {
  service: Service;
  index: number;
  isActive: boolean;
}

function ServiceNavItemContent({ service, index, isActive }: ServiceNavItemContentProps) {
  return (
    <>
      <span
        className={cn(
          "relative z-1 flex shrink-0 items-center justify-center whitespace-nowrap font-cal-sans font-semibold not-italic",
          "h-(--services-nav-index-height) w-(--services-nav-index-width)",
          "text-(length:--services-nav-index-size) leading-(--services-nav-index-line-height)",
          "tracking-(--services-nav-index-letter-spacing)",
          "font-features-(--services-nav-index-font-features)",
          isActive
            ? "text-(--color-services-nav-active-text)"
            : "text-(--color-services-nav-index)",
        )}
      >
        {formatIndex(index)}
      </span>

      <span
        className={cn(
          "relative z-1 min-w-0 flex-1 whitespace-nowrap font-cal-sans not-italic",
          "text-(length:--services-nav-title-size) leading-(--services-nav-title-line-height)",
          "tracking-normal",
          isActive
            ? "font-medium text-(--color-services-nav-active-text)"
            : "font-semibold text-(--color-services-nav-inactive-text)",
        )}
      >
        {service.navTitle}
      </span>
    </>
  );
}

export function ServiceNavigation({
  services,
  activeIndex,
  variant = "desktop",
}: ServiceNavigationProps) {
  const isDesktop = variant === "desktop";
  const itemClassName = cn(
    "relative flex h-(--services-nav-item-height) w-full flex-nowrap items-center",
    "gap-(--services-nav-item-gap)",
    "px-(--services-nav-item-padding-x) py-(--services-nav-item-padding-y)",
    "rounded-(--services-nav-item-radius)",
  );

  return (
    <nav
      aria-label="Services navigation"
      className={cn(
        "flex min-w-0 flex-col flex-nowrap content-start items-stretch justify-start",
        "gap-(--services-nav-list-gap) p-0",
        isDesktop
          ? "relative h-full w-full pt-(--services-nav-offset-top) pb-(--services-nav-offset-bottom)"
          : "relative h-auto w-full",
      )}
    >
      {isDesktop ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-(--services-nav-item-height) w-full rounded-(--services-nav-item-radius) bg-(--color-services-nav-active-bg)"
          initial={false}
          animate={{
            y: `calc(${activeIndex} * (var(--services-nav-item-height) + var(--services-nav-list-gap)))`,
          }}
          transition={servicesTransition}
        />
      ) : null}

      <ul className="flex w-full flex-col gap-(--services-nav-list-gap)">
        {services.map((service, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={service.id} className="relative w-full">
              {isDesktop ? (
                <Link
                  href={`/services/${service.slug}`}
                  className={itemClassName}
                  role="group"
                  aria-label={
                    isActive ? `Open ${service.navTitle} service page, current service` : `Open ${service.navTitle} service page`
                  }
                >
                  <ServiceNavItemContent service={service} index={index} isActive={isActive} />
                </Link>
              ) : (
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(itemClassName, "text-left")}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={isActive ? `Open ${service.navTitle} service page, current service` : `Open ${service.navTitle} service page`}
                >
                  <ServiceNavItemContent service={service} index={index} isActive={isActive} />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}