"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

import {
  ourTeamCards,
  ourTeamCardSizes,
  ourTeamGalleryDimensions,
  ourTeamImageBaseStyle,
  ourTeamPrimaryCardId,
} from "@/features/our-team/constants/our-team";

type TeamCard = (typeof ourTeamCards)[number];

const primaryCard = ourTeamCards.find((teamCard) => teamCard.id === ourTeamPrimaryCardId) ?? ourTeamCards[0];
const mobileAutoHoverActiveDuration = 1200;
const mobileAutoHoverIdleDuration = 450;
const inactiveMobileAutoHoverState = {
  index: 0,
  isActive: false,
  direction: 1 as 1 | -1,
};

const teamCardImageBaseStyle = {
  width: ourTeamImageBaseStyle.width,
  height: ourTeamImageBaseStyle.height,
  display: "block",
  position: "absolute",
  left: ourTeamImageBaseStyle.left,
  top: ourTeamImageBaseStyle.top,
  transform: ourTeamImageBaseStyle.transform,
  borderRadius: 0,
  backgroundSize: ourTeamImageBaseStyle.backgroundSize,
  backgroundRepeat: ourTeamImageBaseStyle.backgroundRepeat,
  backgroundPosition: ourTeamImageBaseStyle.backgroundPosition,
  opacity: ourTeamImageBaseStyle.opacity,
  scale: ourTeamImageBaseStyle.scale,
} satisfies CSSProperties;

function getCardSize(variant: TeamCard["variant"]) {
  return variant === "compact" ? ourTeamCardSizes.compact : ourTeamCardSizes.standard;
}

function getTeamCardImageStyle(card: TeamCard, isMobile = false): CSSProperties {
  return {
    ...teamCardImageBaseStyle,
    backgroundImage: `url(${card.imageSrc})`,
    ...card.imageStyle,
    ...(isMobile ? card.mobileImageStyle : undefined),
  };
}

function TeamCardArtwork({
  card,
  isMobile = false,
}: {
  card: TeamCard;
  isMobile?: boolean;
}) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `var(${card.gradientVar})`,
        }}
      />

      <div aria-hidden="true" style={getTeamCardImageStyle(card, isMobile)} />
    </>
  );
}

function TeamCardHoverContent({
  card,
  isActive = false,
}: {
  card: TeamCard;
  isActive?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        isActive && "opacity-100",
      )}
    >
      <div className="flex min-h-10 w-full flex-col items-center justify-center gap-1 px-(--team-card-content-padding-x) text-center">
        <h3 className="m-0 h-auto w-full max-w-full whitespace-normal wrap-break-word font-poppins text-[14px] leading-[1.15] font-normal tracking-normal text-[#ffffff] font-features-[normal] lg:text-[18px] lg:leading-[1.2]">
          {card.name}
        </h3>
        <p className="m-0 h-auto w-full max-w-full whitespace-normal wrap-break-word text-center font-poppins text-[10px] leading-[1.2] font-medium italic tracking-normal text-[#e8e8e8] font-features-[normal] lg:text-[12px]">
          {card.role}
        </p>
      </div>
    </div>
  );
}

function OurTeamAnimatedCard({
  card,
  isExpanded,
}: {
  card: TeamCard;
  isExpanded: boolean;
}) {
  const size = getCardSize(card.variant);

  if (!primaryCard) {
    return null;
  }

  const isPrimaryCard = card.id === primaryCard.id;
  const collapsedPrimaryX = (ourTeamGalleryDimensions.width - ourTeamCardSizes.standard.width) / 2;
  const collapsedPrimaryY = 0;

  const collapsedX = isPrimaryCard
    ? collapsedPrimaryX
    : collapsedPrimaryX + card.collapsedOffsetX;
  const collapsedY = isPrimaryCard
    ? collapsedPrimaryY
    : collapsedPrimaryY + card.collapsedOffsetY;

  return (
    <motion.figure
      className="group absolute left-0 top-0 m-0 flex box-border flex-col items-center justify-start overflow-hidden rounded-(--team-card-radius)"
      initial={false}
      animate={{
        x: isExpanded ? card.targetX : collapsedX,
        y: isExpanded ? card.targetY : collapsedY,
        rotate: 0,
        scale: isExpanded ? 1 : 1,
        opacity: isExpanded ? 1 : isPrimaryCard ? 1 : 0,
      }}
      transition={{
        x: {
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
          delay: isExpanded ? (card.id - 1) * 0.03 : 0,
        },
        y: {
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
          delay: isExpanded ? (card.id - 1) * 0.03 : 0,
        },
        opacity: {
          duration: 0,
          delay: isExpanded ? 0 : 0.12,
        },
      }}
      style={{
        width: size.width,
        height: size.height,
        zIndex: isExpanded
          ? ourTeamCards.length - card.id
          : isPrimaryCard
            ? ourTeamCards.length + 1
            : ourTeamCards.length - card.id,
        background: "transparent",
        paddingTop: "var(--team-card-padding-top)",
      }}
      aria-label={`${card.name}, ${card.role}`}
    >
      <TeamCardArtwork card={card} />

      <div className="absolute inset-0 bg-[rgb(0_0_0/0.56)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex w-full flex-col items-center justify-start gap-0 transition-opacity duration-300 group-hover:opacity-0">
        <div className="mt-(--team-card-copy-offset) h-(--team-card-name-block-height)" />
      </div>

      <TeamCardHoverContent card={card} />
    </motion.figure>
  );
}

function OurTeamMobileCard({
  card,
  isActive,
}: {
  card: TeamCard;
  isActive: boolean;
}) {
  const size = ourTeamCardSizes.standard;

  return (
    <figure
      className="group relative m-0 flex w-full min-w-0 box-border flex-col items-center justify-start overflow-hidden rounded-(--team-card-radius)"
      style={{
        background: "transparent",
        aspectRatio: `${size.width} / ${size.height}`,
        paddingTop: "var(--team-card-padding-top)",
      }}
      aria-label={`${card.name}, ${card.role}`}
    >
      <TeamCardArtwork card={card} isMobile />

      <div
        className={cn(
          "absolute inset-0 z-10 bg-[rgb(0_0_0/0.56)] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          isActive && "opacity-100",
        )}
      />

      <div
        className={cn(
          "relative z-10 flex w-full flex-col items-center justify-start gap-0 transition-opacity duration-300 group-hover:opacity-0",
          isActive && "opacity-0",
        )}
      >
        <div className="mt-(--team-card-copy-offset) h-(--team-card-name-block-height)" />
      </div>

      <TeamCardHoverContent card={card} isActive={isActive} />
    </figure>
  );
}

function OurTeamMobileCollapsedCard() {
  if (!primaryCard) {
    return null;
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-(--team-mobile-collapsed-card-width)"
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <OurTeamMobileCard card={primaryCard} isActive={false} />
    </motion.div>
  );
}

export function OurTeamGallery({
  isExpanded,
  usesScatteredLayout,
}: {
  isExpanded: boolean;
  usesScatteredLayout: boolean;
}) {
  const mobileAutoHoverCanRunRef = useRef(false);
  const mobileAutoHoverWasExpandedRef = useRef(false);
  const mobileScrollDirectionRef = useRef<1 | -1>(1);
  const [mobileAutoHoverState, setMobileAutoHoverState] = useState(inactiveMobileAutoHoverState);

  useEffect(() => {
    if (usesScatteredLayout || ourTeamCards.length === 0) {
      return;
    }

    let previousScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY !== previousScrollY) {
        mobileScrollDirectionRef.current = currentScrollY > previousScrollY ? 1 : -1;
      }

      previousScrollY = currentScrollY;
    };

    updateScrollDirection();
    window.addEventListener("scroll", updateScrollDirection, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [usesScatteredLayout]);

  useEffect(() => {
    if (usesScatteredLayout || !isExpanded || ourTeamCards.length === 0) {
      mobileAutoHoverCanRunRef.current = false;
      mobileAutoHoverWasExpandedRef.current = false;
      return;
    }

    if (mobileAutoHoverWasExpandedRef.current) {
      return;
    }

    const direction = mobileScrollDirectionRef.current;
    const index = direction === -1 ? ourTeamCards.length - 1 : 0;

    mobileAutoHoverWasExpandedRef.current = true;
    mobileAutoHoverCanRunRef.current = true;

    const timeoutId = window.setTimeout(() => {
      setMobileAutoHoverState({
        index,
        isActive: true,
        direction,
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [usesScatteredLayout, isExpanded]);

  useEffect(() => {
    if (usesScatteredLayout || !isExpanded || ourTeamCards.length === 0 || !mobileAutoHoverCanRunRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => {
        setMobileAutoHoverState((currentState) => {
          if (currentState.isActive) {
            return {
              ...currentState,
              isActive: false,
            };
          }

          const nextIndex = currentState.index + currentState.direction;

          if (nextIndex < 0 || nextIndex >= ourTeamCards.length) {
            mobileAutoHoverCanRunRef.current = false;

            return {
              ...currentState,
              isActive: false,
            };
          }

          return {
            index: nextIndex,
            isActive: true,
            direction: currentState.direction,
          };
        });
      },
      mobileAutoHoverState.isActive
        ? mobileAutoHoverActiveDuration
        : mobileAutoHoverIdleDuration,
    );

    return () => window.clearTimeout(timeoutId);
  }, [usesScatteredLayout, isExpanded, mobileAutoHoverState]);

  if (!usesScatteredLayout) {
    if (!isExpanded) {
      return <OurTeamMobileCollapsedCard />;
    }

    return (
      <motion.div
        className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,var(--team-mobile-card-min-width)),1fr))] gap-(--team-mobile-grid-gap)"
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {ourTeamCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.025,
            }}
          >
            <OurTeamMobileCard
              card={card}
              isActive={mobileAutoHoverState.isActive && index === mobileAutoHoverState.index}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="relative mx-auto h-(--team-gallery-scaled-height) w-(--team-gallery-scaled-width) max-w-full overflow-visible">
      <div
        className={cn(
          "relative origin-top-left scale-(--team-gallery-scale) overflow-visible",
          "h-(--team-gallery-height) w-(--team-gallery-width)",
        )}
        style={{
          width: ourTeamGalleryDimensions.width,
          height: ourTeamGalleryDimensions.height,
        }}
      >
        {ourTeamCards.map((card) => (
          <OurTeamAnimatedCard key={card.id} card={card} isExpanded={isExpanded} />
        ))}
      </div>
    </div>
  );
}