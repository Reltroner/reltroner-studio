'use client';

import { useEffect } from 'react';
import { event } from '@/lib/gtag';

export default function BlogAnalytics({ slug, title }) {
  useEffect(() => {
    if (!slug) return;

    event({
      action: 'view_blog_post',
      category: 'blog',
      label: slug,
    });
  }, [slug]);

  return null;
}
