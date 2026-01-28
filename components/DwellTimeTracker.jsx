'use client';

import { useEffect } from 'react';
import { event } from '@/lib/gtag';

export default function DwellTimeTracker({ slug }) {
  useEffect(() => {
    const start = Date.now();

    return () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      event({
        action: 'dwell_time',
        category: 'blog',
        label: slug,
        value: seconds,
      });
    };
  }, [slug]);

  return null;
}
