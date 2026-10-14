export type AnalyticsConsent = "unknown" | "granted" | "denied";
export const ANALYTICS_CONSENT_KEY = "reltroner.optional-analytics.v1";
export const ANALYTICS_CONSENT_EVENT = "reltroner:analytics-consent";
export const ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/** Analytics stays unavailable unless an operator explicitly enables a valid public tag ID. */
export function analyticsIsConfigured(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" && /^G-[A-Z0-9]{4,25}$/.test(ANALYTICS_ID);
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return "unknown";
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unknown";
  } catch { return "unknown"; }
}

export function maySendAnalytics(): boolean {
  return analyticsIsConfigured() && readAnalyticsConsent() === "granted";
}

export function writeAnalyticsConsent(consent: "granted" | "denied"): boolean {
  if (typeof window === "undefined") return false;
  try { window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent); } catch { return false; }
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  return true;
}
