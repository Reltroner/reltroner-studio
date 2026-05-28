'use client';

import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  MOTION_EASE,
  MOTION_TIMINGS,
  PAGE_FADE_VARIANTS,
  REDUCED_PAGE_FADE_VARIANTS,
} from '@/lib/motion/config';

export default function PageFade({ children }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? REDUCED_PAGE_FADE_VARIANTS : PAGE_FADE_VARIANTS;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        transition={{
          duration: MOTION_TIMINGS.base,
          ease: MOTION_EASE,
        }}
      >
        <m.div
          key={pathname}
          initial="initial"
          animate="animate"
          variants={variants}
          className="relative"
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}