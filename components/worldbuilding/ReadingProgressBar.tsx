'use client';

import { useEffect, useState } from "react";

export interface ReadingProgressBarProps {
  targetId: string;
}

export default function ReadingProgressBar({ targetId }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!targetId) {
      return undefined;
    }

    let frameId = 0;

    const updateProgress = () => {
      const target = document.getElementById(targetId);

      if (!target) {
        setProgress(0);
        return;
      }

      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDistance = Math.max(target.offsetHeight - viewportHeight * 0.55, 1);
      const travelled = Math.min(
        Math.max(viewportHeight * 0.2 - rect.top, 0),
        totalDistance
      );

      setProgress(Math.round((travelled / totalDistance) * 100));
    };

    const queueUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        className="bg-linear-to-r h-full origin-left from-blue-400/80 via-cyan-300/70 to-transparent transition-transform duration-200"
        style={{ transform: `scaleX(${Math.max(0, Math.min(progress, 100)) / 100})` }}
      />
    </div>
  );
}
