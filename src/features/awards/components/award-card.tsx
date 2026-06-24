import Image from "next/image";

import { cn } from "@/lib/cn";

import { type AwardItem } from "@/features/awards/constants/awards";

interface AwardCardProps {
  award: AwardItem;
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <article
      className={cn(
        "box-border flex w-full max-w-(--awards-card-max-width) flex-col items-center overflow-hidden",
        "rounded-(--awards-card-radius) bg-(--color-awards-card-bg)",
        "px-(--awards-card-padding-x) pt-(--awards-card-padding-top) pb-(--awards-card-padding-bottom)",
      )}
    >
      <div className="flex h-(--awards-image-slot-height) w-full items-center justify-center overflow-visible">
        <Image
          src={award.imageSrc}
          alt={award.imageAlt}
          width={320}
          height={145}
          sizes="(min-width: 1024px) 320px, calc(100vw - 64px)"
          className="block h-auto w-(--awards-image-width) max-w-full object-contain object-center"
        />
      </div>

      <h3
        className={cn(
          "mt-(--awards-card-title-margin-top) flex min-h-(--awards-card-title-height) w-full items-center justify-center whitespace-nowrap text-center font-cal-sans",
          "text-(length:--awards-card-title-size) leading-(--awards-card-title-line-height)",
          "font-(--awards-card-title-weight) tracking-normal text-(--color-awards-card-text)",
          "font-features-normal",
        )}
      >
        {award.title}
      </h3>

      <p
        className={cn(
          "mt-(--awards-card-place-margin-top) flex min-h-(--awards-card-place-height) w-full items-center justify-center whitespace-nowrap text-center font-poppins",
          "text-(length:--awards-card-place-size) leading-(--awards-card-place-line-height)",
          "font-(--awards-card-place-weight) tracking-normal text-(--color-awards-card-text)",
          "font-features-normal",
        )}
      >
        {award.place}
      </p>
    </article>
  );
}
