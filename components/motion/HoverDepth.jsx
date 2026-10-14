'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { getHoverDepthMotion } from '@/lib/motion/config';

export default function HoverDepth({ children, className = '' }) {
  const reduceMotion = useReducedMotion();
  const motionProps = getHoverDepthMotion(reduceMotion);

  return (
    <LazyMotion features={domAnimation} strict>
      {/* The containing link owns keyboard focus, regardless of motion preference. */}
      <m.div className={className} tabIndex={-1} {...motionProps}>
        {children}
      </m.div>
    </LazyMotion>
  );
}
