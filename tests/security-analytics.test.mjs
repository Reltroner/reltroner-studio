import test from "node:test";
import assert from "node:assert/strict";
import { ANALYTICS_CONSENT_KEY, analyticsIsConfigured, maySendAnalytics, readAnalyticsConsent } from "../lib/privacy/analytics-consent.ts";
import { event } from "../lib/gtag.js";

test("analytics remains off before explicit consent, including incumbent event helpers", () => {
  const originalWindow = globalThis.window;
  let consent = null;
  const sent = [];
  globalThis.window = { localStorage: { getItem: (key) => key === ANALYTICS_CONSENT_KEY ? consent : null }, gtag: (...args) => sent.push(args) };
  try {
    assert.equal(readAnalyticsConsent(), "unknown");
    assert.equal(maySendAnalytics(), false);
    event({ action: "scroll", category: "reading" });
    assert.equal(sent.length, 0);
    consent = "denied";
    assert.equal(readAnalyticsConsent(), "denied");
    assert.equal(maySendAnalytics(), false);
    event({ action: "view", category: "reading" });
    assert.equal(sent.length, 0);
    if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "true") assert.equal(analyticsIsConfigured(), false);
  } finally { globalThis.window = originalWindow; }
});
