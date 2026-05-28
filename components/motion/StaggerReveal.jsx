'use client';

import { Children } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import {
  STAGGER_REVEAL_CONTAINER,
  STAGGER_REVEAL_ITEM,
} from '@/lib/motion/config';

export default function StaggerReveal({ children, className = '', itemClassName = '' }) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={STAGGER_REVEAL_CONTAINER}
      >
        {items.map((child, index) => (
          <m.div key={index} className={itemClassName} variants={STAGGER_REVEAL_ITEM}>
            {child}
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
}