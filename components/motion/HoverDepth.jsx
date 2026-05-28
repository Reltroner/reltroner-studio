'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { getHoverDepthMotion } from '@/lib/motion/config';

export default function HoverDepth({ children, className = '' }) {
  const reduceMotion = useReducedMotion();
  const motionProps = getHoverDepthMotion(reduceMotion);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div className={className} {...motionProps}>
        {children}
      </m.div>
    </LazyMotion>
  );
}