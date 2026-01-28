// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url) => {
  if (!window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  if (!window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
