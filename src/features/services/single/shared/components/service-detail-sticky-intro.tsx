import { motion } from "framer-motion";

interface ServiceDetailStickyIntroProps {
  titleId: string;
  label: string;
  title: string;
  titleClassName: string;
  containerClassName: string;
  labelClassName: string;
  motionConfig?: {
    initial: { opacity: number; y: number; filter: string };
    animate: { opacity: number; y: number; filter: string };
    viewport: { once: boolean; amount: number };
    transition: {
      duration: number;
      type: "spring";
      stiffness: number;
      damping: number;
    };
  };
}

export function ServiceDetailStickyIntro({
  titleId,
  label,
  title,
  titleClassName,
  containerClassName,
  labelClassName,
  motionConfig,
}: ServiceDetailStickyIntroProps) {
  const labelNode = (
    <p className={labelClassName}>
      {label}
    </p>
  );

  const titleNode = (
    <h2 id={titleId} className={titleClassName}>
      {title}
    </h2>
  );

  return (
    <aside className="min-w-0 md:self-stretch">
      <div className={containerClassName}>
        {motionConfig ? (
          <>
            <motion.p
              className={labelClassName}
              initial={motionConfig.initial}
              whileInView={motionConfig.animate}
              viewport={motionConfig.viewport}
              transition={motionConfig.transition}
            >
              {label}
            </motion.p>
            <motion.h2
              id={titleId}
              className={titleClassName}
              initial={motionConfig.initial}
              whileInView={motionConfig.animate}
              viewport={motionConfig.viewport}
              transition={{ ...motionConfig.transition, delay: 0.075 }}
            >
              {title}
            </motion.h2>
          </>
        ) : (
          <>
            {labelNode}
            {titleNode}
          </>
        )}
      </div>
    </aside>
  );
}