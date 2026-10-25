'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ANALYTICS_CONSENT_EVENT } from '@/lib/privacy/analytics-consent';
import { pageViews } from '@/lib/gtag';

// Mounted once in the root layout: the only place that loads Google Analytics or reports page views.
export default function GoogleAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    pageViews.sync();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, pageViews.sync);
    window.addEventListener('storage', pageViews.sync);
    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, pageViews.sync);
      window.removeEventListener('storage', pageViews.sync);
    };
  }, []);
  useEffect(() => {
    pageViews.observe(pathname);
  }, [pathname]);
  return null;
}
