"use client";

import { useEffect, useRef, type ReactNode, type SyntheticEvent } from "react";
import { RESOURCE_FALLBACK_IMAGE } from "@/lib/assets/fallback";

export default function ContentMediaFallback({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  function updateVideo(video: HTMLVideoElement, failed = false) {
    const figure = video.closest<HTMLElement>("[data-native-video]");
    if (!figure) return;
    if (failed || video.error) {
      video.pause();
      figure.dataset.mediaState = "unavailable";
      video.hidden = true;
      video.removeAttribute("controls");
    } else if (video.readyState >= HTMLMediaElement.HAVE_METADATA && Number.isFinite(video.duration) && video.duration > 0) {
      figure.dataset.mediaState = "ready";
    }
  }
  function applyFallback(target: EventTarget) {
    if (target instanceof HTMLImageElement && !target.dataset.fallbackApplied) {
      target.dataset.fallbackApplied = "true";
      target.alt = `${target.alt || "Archive illustration"} — illustration unavailable`;
      target.src = RESOURCE_FALLBACK_IMAGE;
      target.removeAttribute("srcset");
    }
    if (target instanceof HTMLVideoElement) updateVideo(target, true);
    if (target instanceof HTMLSourceElement && target.parentElement instanceof HTMLVideoElement) updateVideo(target.parentElement, true);
  }
  useEffect(() => {
    // An origin can fail before hydration, before the React error listener exists.
    wrapper.current?.querySelectorAll("img").forEach((image) => {
      if (image.complete && image.naturalWidth === 0) applyFallback(image);
    });
    wrapper.current?.querySelectorAll("video").forEach(video => updateVideo(video));
  }, [children]);
  function handleError(event: SyntheticEvent<HTMLDivElement>) { applyFallback(event.target); }
  return <div ref={wrapper} onErrorCapture={handleError} onLoadedMetadataCapture={event => { if (event.target instanceof HTMLVideoElement) updateVideo(event.target); }}>{children}</div>;
}
