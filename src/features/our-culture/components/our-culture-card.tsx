import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

import { type CultureCard } from "@/features/our-culture/constants/our-culture";

type CultureCardMode =
  | "lead-default"
  | "lead-collapsed"
  | "mobile-lead"
  | "mobile-stacked"
  | "stacked-default"
  | "stacked-expanded";

function CultureSparkIcon() {
  return (
    <Image
      src="/images/tabler_music.svg"
      alt=""
      aria-hidden="true"
      width={46}
      height={46}
      className="h-(--culture-icon-size) w-(--culture-icon-size)"
    />
  );
}

function CulturePillarIcon() {
  return (
    <Image
      src="/images/logos_kafka-icon.svg"
      alt=""
      aria-hidden="true"
      width={21}
      height={34}
      className="h-(--culture-pill-icon-height) w-(--culture-pill-icon-width)"
    />
  );
}

function CultureScienceIcon() {
  return (
    <Image
      src="/images/boxicons_science.svg"
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      className="h-(--culture-icon-size) w-(--culture-icon-size)"
    />
  );
}

const splitCardClassName = cn(
  "grid w-full overflow-hidden rounded-[var(--culture-card-radius)] bg-[var(--color-culture-card-bg)] p-[var(--culture-card-padding)]",
  "gap-[var(--culture-card-inner-gap)] shadow-[var(--culture-card-shadow)]",
  "min-h-[var(--culture-split-card-min-height)]",
);

const splitCardTextColumnClassName = cn(
  "relative flex min-h-[var(--culture-split-card-content-height)] min-w-0 flex-col justify-between overflow-hidden rounded-[var(--culture-card-inner-radius)]",
  "bg-[var(--color-culture-card-bg)] px-[var(--culture-card-content-padding-x)] py-[var(--culture-card-content-padding-y)]",
);

const stackedCardClassName = cn(
  "relative flex min-h-[var(--culture-stacked-card-min-height)] w-full flex-col justify-between overflow-hidden rounded-[var(--culture-card-radius)]",
  "bg-[var(--color-culture-stacked-card-bg)] px-[var(--culture-stacked-card-padding-x)] py-[var(--culture-stacked-card-padding-y)]",
  "shadow-[var(--culture-card-shadow)]",
);

const cardTitleClassName = cn(
  "w-full whitespace-pre-wrap break-words font-[family-name:var(--font-cal-sans)]",
  "text-[length:var(--culture-card-title-size)] leading-[var(--culture-card-title-line-height)]",
  "font-[var(--culture-card-title-weight)] tracking-[var(--culture-card-title-letter-spacing)]",
  "text-[var(--color-culture-card-title)] [font-feature-settings:'blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on]",
);

const cardDescriptionClassName = cn(
  "w-full whitespace-pre-wrap break-words font-[family-name:var(--font-poppins)]",
  "text-[length:var(--culture-card-description-size)] leading-[var(--culture-card-description-line-height)]",
  "font-[var(--culture-card-description-weight)] tracking-[var(--culture-card-description-letter-spacing)]",
  "text-[var(--color-culture-card-description)] [font-feature-settings:'blwf'_on,'cv09'_on,'cv03'_on,'cv04'_on,'cv11'_on]",
);

const splitCardTitleClassName = cn(
  cardTitleClassName,
  "min-h-[var(--culture-split-card-title-max-height)] whitespace-normal",
);

const splitCardDescriptionClassName = cn(
  cardDescriptionClassName,
  "max-h-[var(--culture-split-card-description-height)] overflow-visible",
);

const splitCardTextBlockClassName = cn(
  "relative flex h-[var(--culture-split-card-text-block-height)] min-w-0 w-full flex-col justify-end overflow-hidden",
);

const splitCardTitleWrapClassName = cn(
  "absolute inset-x-0 z-[1] min-w-0 overflow-hidden",
);

const splitCardDescriptionClipClassName = cn(
  "absolute bottom-0 left-0 h-[var(--culture-split-card-description-height)] w-[var(--culture-split-card-description-width)] max-w-full overflow-hidden",
);

const stackedCardTitleWrapClassName = cn(
  "mt-auto flex min-h-[var(--culture-stacked-card-title-block-height)] w-full items-end overflow-hidden",
);

const stackedCardTitleClassName = cn(
  cardTitleClassName,
  "text-[var(--color-culture-stacked-card-title)]",
);

const stackedCardContentClassName = cn(
  "mt-auto flex min-h-[var(--culture-stacked-card-title-block-height)] w-full flex-col justify-end gap-(--culture-card-text-gap) overflow-hidden",
);

const mobileLeadCardClassName = cn(
  "flex w-full flex-col overflow-hidden rounded-[var(--culture-card-radius)] bg-[var(--color-culture-card-bg)] p-[var(--culture-card-padding)]",
  "gap-[var(--culture-card-inner-gap)] shadow-[var(--culture-card-shadow)]",
);

const mobileLeadContentClassName = cn(
  "flex w-full flex-col items-center justify-center gap-[var(--culture-mobile-card-content-gap)] rounded-[var(--culture-card-inner-radius)]",
  "bg-[var(--color-culture-card-bg)] px-[var(--culture-card-content-padding-x)] py-[var(--culture-card-content-padding-y)] text-center",
);

const mobileStackedCardClassName = cn(
  "flex min-h-[var(--culture-mobile-stacked-card-min-height)] w-full flex-col items-center justify-center gap-[var(--culture-mobile-card-content-gap)] overflow-hidden",
  "rounded-[var(--culture-card-radius)] bg-[var(--color-culture-stacked-card-bg)] px-[var(--culture-stacked-card-padding-x)] py-[var(--culture-stacked-card-padding-y)] text-center shadow-[var(--culture-card-shadow)]",
);

type CultureIconMode = "spark" | "pillar" | "science" | "both";

interface OurCultureCardProps {
  card: CultureCard;
  mode?: CultureCardMode;
  sharedImage?: string;
  imageLayoutId?: string;
  width?: string;
  enablePositionLayout?: boolean;
  layoutDirection?: "horizontal" | "vertical";
}

function CardIcons({ mode }: { mode: CultureIconMode }) {
  if (mode === "spark") {
    return <CultureSparkIcon />;
  }

  if (mode === "pillar") {
    return <CulturePillarIcon />;
  }

  if (mode === "science") {
    return <CultureScienceIcon />;
  }

  return (
    <div className="flex items-start gap-(--culture-stacked-card-icon-gap) opacity-(--culture-stacked-card-icons-opacity)">
      <CulturePillarIcon />
      <CultureSparkIcon />
    </div>
  );
}

export function OurCultureCard({
  card,
  mode,
  sharedImage,
  imageLayoutId,
  width,
  enablePositionLayout = true,
  layoutDirection = "horizontal",
}: OurCultureCardProps) {
  const resolvedMode = mode ?? (card.variant === "split" ? "lead-default" : "stacked-default");
  const isSplitLayout =
    resolvedMode === "lead-default" ||
    resolvedMode === "lead-collapsed" ||
    resolvedMode === "stacked-expanded";
  const isCollapsedLead = resolvedMode === "lead-collapsed";
  const showDescription = resolvedMode === "lead-default" || resolvedMode === "stacked-expanded";
  const showImage =
    resolvedMode === "lead-default" ||
    resolvedMode === "lead-collapsed" ||
    resolvedMode === "stacked-expanded";
  const imageSource = resolvedMode === "stacked-expanded" ? sharedImage ?? card.image : card.image;
  const titleClassName = isSplitLayout ? splitCardTitleClassName : stackedCardTitleClassName;
  const cardWidth = width ?? "100%";
  const cardOpacity = isCollapsedLead ? 0.6 : 1;
  const showTwoIcons = resolvedMode === "stacked-default" || resolvedMode === "stacked-expanded";
  const iconMode: CultureIconMode = card.id === 2 ? "pillar" : card.id === 3 ? "science" : showTwoIcons ? "both" : "spark";
  const shouldShowDescription = Boolean(card.description) && showDescription;
  const isExpandedStacked = resolvedMode === "stacked-expanded";
  const mobileDescription = card.mobileDescription ?? card.description;
  const isVerticalLayout = layoutDirection === "vertical";
  const resolvedDescription = isVerticalLayout ? mobileDescription : card.description;

  if (resolvedMode === "mobile-lead") {
    return (
      <motion.article className={mobileLeadCardClassName} initial={false}>
        <div className={mobileLeadContentClassName}>
          <CardIcons mode={iconMode} />
          <h3 className={cardTitleClassName}>{card.title}</h3>
          {mobileDescription ? <p className={cardDescriptionClassName}>{mobileDescription}</p> : null}
        </div>

        {card.image ? (
          <div className="relative h-(--culture-mobile-lead-image-height) w-full overflow-hidden rounded-(--culture-image-radius)">
            <div className="relative h-full w-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </motion.article>
    );
  }

  if (resolvedMode === "mobile-stacked") {
    return (
      <motion.article className={mobileStackedCardClassName} initial={false}>
        <CardIcons mode={iconMode} />
        <h3 className={stackedCardTitleClassName}>{card.title}</h3>
      </motion.article>
    );
  }

  if (isSplitLayout) {
    return (
      <motion.article
        className={cn(splitCardClassName, isVerticalLayout && "grid-cols-1")}
        animate={{
          width: cardWidth,
          opacity: cardOpacity,
          gridTemplateColumns: isVerticalLayout
            ? "minmax(0, 1fr)"
            : isCollapsedLead
              ? "minmax(0, 1fr) 0fr"
              : "minmax(0, 1fr) minmax(0, 1fr)",
          gridTemplateRows: isVerticalLayout
            ? isCollapsedLead
              ? "minmax(0, 1fr) 0fr"
              : "minmax(0, 1fr) var(--culture-mobile-lead-image-height)"
            : undefined,
        }}
        initial={false}
        layout={enablePositionLayout ? "position" : false}
      >
        <div className={cn(splitCardTextColumnClassName, isVerticalLayout && "min-h-0")}> 
          <CardIcons mode={iconMode} />

          <motion.div
            className={splitCardTextBlockClassName}
            animate={{
              y: isExpandedStacked ? "var(--culture-text-block-margin-top)" : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.44, 0, 0.56, 1],
              delay: 0,
            }}
          >
            <motion.div
              className={splitCardTitleWrapClassName}
              initial={
                isExpandedStacked
                  ? {
                      bottom: "var(--culture-split-card-collapsed-title-offset)",
                      y: 0,
                    }
                  : false
              }
              animate={{
                bottom: shouldShowDescription
                  ? "var(--culture-split-card-title-expanded-offset)"
                  : "var(--culture-split-card-collapsed-title-offset)",
                y: shouldShowDescription ? 0 : "var(--culture-split-card-title-drop-offset)",
              }}
              transition={{
                duration: 0.6,
                ease: [0.44, 0, 0.56, 1],
                delay: 0,
              }}
            >
              <h3 className={titleClassName}>
                {card.title}
              </h3>
            </motion.div>

            {resolvedDescription ? (
              <div className={splitCardDescriptionClipClassName}>
                <motion.div
                  initial={
                    isExpandedStacked
                      ? { y: "var(--culture-split-card-description-height)" }
                      : false
                  }
                  animate={{
                    y: shouldShowDescription
                      ? 0
                      : "var(--culture-split-card-description-height)",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.44, 0, 0.56, 1],
                    delay: shouldShowDescription ? 0.18 : 0,
                  }}
                >
                  <p className={splitCardDescriptionClassName}>{resolvedDescription}</p>
                </motion.div>
              </div>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          className={cn(
            "relative overflow-hidden rounded-(--culture-image-radius)",
            isVerticalLayout ? "min-h-0" : "min-h-(--culture-split-card-media-min-height)",
          )}
          animate={{ opacity: isCollapsedLead ? 0 : 1 }}
          initial={false}
          layout={enablePositionLayout ? "position" : false}
        >
          {showImage && imageSource ? (
            <motion.div layoutId={imageLayoutId} className="relative h-full w-full" layout="position">
              <Image
                src={imageSource}
                alt={card.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          ) : null}
        </motion.div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className={stackedCardClassName}
      animate={{ width: cardWidth, opacity: cardOpacity }}
      initial={false}
      layout={enablePositionLayout ? "position" : false}
    >
      <CardIcons mode={iconMode} />

      <motion.div className={stackedCardContentClassName}>
        <motion.div className={stackedCardTitleWrapClassName}>
          <h3 className={titleClassName}>
            {card.title}
          </h3>
        </motion.div>

        {card.description ? (
          <motion.div
            animate={{
              opacity: 0,
              height: 0,
              y: 30,
            }}
            initial={false}
            className="overflow-hidden"
          >
            <p className={cardDescriptionClassName}>{card.description}</p>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.article>
  );
}