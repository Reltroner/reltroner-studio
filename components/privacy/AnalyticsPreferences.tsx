"use client";

import { useEffect, useState } from "react";
import { analyticsIsConfigured, readAnalyticsConsent, writeAnalyticsConsent, type AnalyticsConsent } from "@/lib/privacy/analytics-consent";

export default function AnalyticsPreferences() {
  const [consent, setConsent] = useState<AnalyticsConsent>("unknown");
  const [feedback, setFeedback] = useState("");
  const configured = analyticsIsConfigured();
  useEffect(() => { setConsent(readAnalyticsConsent()); }, []);
  function choose(value: "granted" | "denied") {
    if (!writeAnalyticsConsent(value)) {
      setFeedback("Your browser could not save the preference. Optional analytics remains off.");
      return;
    }
    setConsent(value);
    setFeedback(value === "denied" ? "Optional analytics rejected. All website features remain available." : "Optional analytics allowed on this browser. You can reject it at any time.");
  }
  return (
    <section aria-labelledby="analytics-preferences" className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
      <h2 id="analytics-preferences" className="text-xl font-semibold text-white">Optional analytics</h2>
      <p className="mt-3 text-slate-300">{configured ? "Google Analytics loads only after you explicitly allow it on this browser." : "Google Analytics is disabled in this prototype. No optional analytics tag is loaded."}</p>
      <p className="mt-2 text-sm text-slate-400">Current preference: {consent === "unknown" ? "no choice saved" : consent}. Essential preferences stay in your browser.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("denied")} className="rounded-lg border border-slate-500 px-4 py-3 text-white focus-visible:rs-focus-ring">Reject optional analytics</button>
        {configured && <button type="button" onClick={() => choose("granted")} className="rounded-lg bg-blue-600 px-4 py-3 text-white focus-visible:rs-focus-ring">Allow optional analytics</button>}
      </div>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-sky-200">{feedback}</p>
    </section>
  );
}
