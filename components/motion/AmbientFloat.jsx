'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { getAmbientFloatAnimation } from '@/lib/motion/config';

export default function AmbientFloat({ children, className = '' }) {
  const reduceMotion = useReducedMotion();
  const motionProps = getAmbientFloatAnimation(reduceMotion);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div className={className} {...motionProps}>
        {children}
      </m.div>
    </LazyMotion>
  );
}