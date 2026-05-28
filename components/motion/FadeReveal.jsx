'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { getFadeRevealVariants } from '@/lib/motion/config';

export default function FadeReveal({
  children,
  className = '',
  delay = 0,
  distance = 20,
  once = true,
  amount = 0.2,
}) {
  const reduceMotion = useReducedMotion();
  const variants = getFadeRevealVariants({
    distance,
    delay,
    reduced: reduceMotion,
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={variants}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}