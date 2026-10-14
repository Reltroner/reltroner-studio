import { ANALYTICS_ID, maySendAnalytics } from './privacy/analytics-consent';
export const GA_TRACKING_ID = ANALYTICS_ID

export const pageview = (url) => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production' || !maySendAnalytics() || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production' || !maySendAnalytics() || !window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
