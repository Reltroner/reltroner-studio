'use client';

import { useEffect, useRef } from 'react';
import { event } from '@/lib/gtag';

export default function ScrollDepthTracker({ slug, category }) {
  const fired = useRef(new Set());

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach(p => {
        if (percent >= p && !fired.current.has(p)) {
          fired.current.add(p);
          event({
            action: 'scroll_depth',
            category,
            label: `${slug}:${p}`,
            value: p,
          });
        }
      });
    };

    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [slug, category]);

  return null;
}
