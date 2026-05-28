'use client';

import { useRef } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { getSoftParallaxRange } from '@/lib/motion/config';

export default function SoftParallax({ children, className = '', distance = 24 }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const range = getSoftParallaxRange(distance);
  const y = useTransform(scrollYProgress, range.input, range.output);
  const smoothY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.4 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div ref={containerRef} className={className} style={{ y: smoothY }}>
        {children}
      </m.div>
    </LazyMotion>
  );
}