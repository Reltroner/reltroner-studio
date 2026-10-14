'use client';

import { useEffect } from 'react';
import { ANALYTICS_ID, ANALYTICS_CONSENT_EVENT, analyticsIsConfigured, maySendAnalytics } from '@/lib/privacy/analytics-consent';

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!analyticsIsConfigured() || process.env.NODE_ENV !== 'production') return;
    const sync = () => {
      const allowed = maySendAnalytics();
      window[`ga-disable-${ANALYTICS_ID}`] = !allowed;
      if (!allowed) {
        window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        document.getElementById('reltroner-consented-analytics')?.remove();
        return;
      }
      if (document.getElementById('reltroner-consented-analytics')) return;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date());
      window.gtag('config', ANALYTICS_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const script = document.createElement('script');
      script.id = 'reltroner-consented-analytics';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
      script.onload = () => {
        if (maySendAnalytics()) window.gtag('event', 'page_view', { page_path: window.location.pathname });
      };
      document.head.appendChild(script);
    };
    sync();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return null;
}
