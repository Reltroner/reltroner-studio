import { ANALYTICS_ID, analyticsIsConfigured, maySendAnalytics, readAnalyticsConsent } from './privacy/analytics-consent';
export const GA_TRACKING_ID = ANALYTICS_ID

const DENIED_ADS = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }

// Query strings and referrers can carry personal data; only campaign tags are reported.
const pageLocation = (path) => {
  const campaign = new URLSearchParams([...new URLSearchParams(window.location.search)].filter(([key]) => key.startsWith('utm_'))).toString()
  return window.location.origin + path + (campaign ? `?${campaign}` : '')
}
const referrerWithoutQuery = () => {
  try {
    const url = new URL(document.referrer)
    return url.origin + url.pathname
  } catch {
    return ''
  }
}

// The only producer of GA4 page_view events. It loads the Google tag once, after explicit consent, then sends one
// page_view per route change and one for the current route each time consent is granted. Routes passed while
// tracking is off or the tag is still loading are never replayed; only the route current at that point is sent.
export function createPageViewTracker(measurementId = ANALYTICS_ID) {
  let tag = 'idle' // idle -> loading -> ready | failed
  let tracking = false
  let route = null
  let routeId = 0
  let sentRouteId = 0

  const send = () => {
    if (!tracking || tag !== 'ready' || !route || sentRouteId === routeId) return
    sentRouteId = routeId
    window.gtag('event', 'page_view', { page_location: route.location, page_referrer: route.referrer, page_title: document.title })
  }

  const load = () => {
    tag = 'loading'
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('consent', 'default', { analytics_storage: 'granted', ...DENIED_ADS })
    window.gtag('js', new Date())
    window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false })
    const script = document.createElement('script')
    script.id = 'reltroner-consented-analytics'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.onload = () => {
      tag = 'ready'
      send()
    }
    // Not retried in this document, and nothing is reported as sent.
    script.onerror = () => { tag = 'failed' }
    document.head.appendChild(script)
  }

  return {
    // Applies the stored preference. Safe to call repeatedly; only a change of preference has an effect.
    sync() {
      if (typeof window === 'undefined') return
      const allowed = process.env.NODE_ENV === 'production' && analyticsIsConfigured(measurementId) && readAnalyticsConsent() === 'granted'
      if (allowed === tracking) return
      tracking = allowed
      window[`ga-disable-${measurementId}`] = !allowed
      if (!allowed) {
        window.gtag?.('consent', 'update', { analytics_storage: 'denied', ...DENIED_ADS })
        return
      }
      sentRouteId = 0
      if (tag === 'idle') load()
      else window.gtag('consent', 'update', { analytics_storage: 'granted', ...DENIED_ADS })
      send()
    },
    // Records the current route. Repeated calls for the same route (remounts, re-run effects) are not new page views.
    observe(path) {
      if (typeof window === 'undefined' || !path || path === route?.path) return
      route = { path, location: pageLocation(path), referrer: route ? route.location : referrerWithoutQuery() }
      routeId += 1
      send()
    },
  }
}

export const pageViews = createPageViewTracker()

export const event = ({ action, category, label, value }) => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production' || !maySendAnalytics() || !window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
