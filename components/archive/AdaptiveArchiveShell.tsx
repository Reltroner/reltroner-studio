"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReadingPath, areHeadingsEqual } from "./ReadingPathContext";
import type { PublicContentEntry } from "@/lib/content/taxonomy";
import type { ContentHeading } from "@/types/content";

const EMPTY_HEADINGS: ContentHeading[] = [];

export default function AdaptiveArchiveShell({
  children,
  headings = EMPTY_HEADINGS,
  entries: _entries,
  currentId: _currentId,
  collection: _collection = "",
  mode = "article",
  relatedContent,
}: {
  children: ReactNode;
  headings?: ContentHeading[];
  entries?: PublicContentEntry[];
  currentId?: string;
  collection?: string;
  mode?: "article" | "collection";
  relatedContent?: ReactNode;
}) {
  const { setHeadings, clearHeadings, setActiveId } = useReadingPath();

  // Stabilize incoming headings so newly created array references with identical content
  // do not trigger repeated effect executions.
  const headingsRef = useRef<ContentHeading[]>(headings);
  if (!areHeadingsEqual(headingsRef.current, headings)) {
    headingsRef.current = headings && headings.length > 0 ? headings : EMPTY_HEADINGS;
  }
  const stableHeadings = headingsRef.current;

  const hasReadingPath = mode === "article" && stableHeadings.length > 0;

  // Register the current article outline for Compass; clear it on route unmount.
  useEffect(() => {
    if (!hasReadingPath) return;

    setHeadings(stableHeadings);

    return () => {
      clearHeadings();
    };
  }, [hasReadingPath, stableHeadings, setHeadings, clearHeadings]);

  // Track the current section for the Compass outline at every viewport.
  useEffect(() => {
    if (!hasReadingPath) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );

    stableHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [hasReadingPath, stableHeadings, setActiveId]);

  // Collection mode: single dominant full-width surface without sidebars
  if (mode === "collection") {
    return (
      <div className="mx-auto w-full max-w-[94rem] px-3 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
    );
  }

  // One centered article surface. Compass owns the outline, without a reserved rail.
  return (
    <div className="archive-article-shell mx-auto w-full max-w-[80rem] px-3 py-6 sm:px-6 sm:py-8">
      <div className="min-w-0 w-full">{children}</div>
      {relatedContent ? <div className="mt-10 w-full">{relatedContent}</div> : null}
    </div>
  );
}
