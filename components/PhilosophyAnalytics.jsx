'use client';

import { useEffect } from 'react';
import { event } from '@/lib/gtag';

export default function PhilosophyAnalytics({ philosophy }) {
  useEffect(() => {
    if (!philosophy?.slug) return;

    event({
      action: 'view_philosophy',
      category: 'philosophy',
      label: philosophy.slug,
    });
  }, [philosophy?.slug]);

  return null;
}
