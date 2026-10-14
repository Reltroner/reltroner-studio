import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

export interface WikiBreadcrumbsProps {
  segments: BreadcrumbSegment[];
  centerMobile?: boolean;
  centered?: boolean;
  className?: string;
}

export default function WikiBreadcrumbs({
  segments,
  centerMobile = false,
  centered = false,
  className = "",
}: WikiBreadcrumbsProps) {
  if (!segments || segments.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${centered ? "collection-breadcrumb" : "mb-6"} ${
        centered
          ? "w-full flex justify-center"
          : centerMobile
          ? "w-full flex justify-center sm:justify-start"
          : "overflow-x-auto whitespace-nowrap scrollbar-hide"
      } ${className}`.trim()}
    >
      <ol
        className={`flex items-center gap-2 text-sm text-slate-400 ${
          centered
            ? "max-w-full flex-wrap justify-center"
            : centerMobile ? "flex-wrap justify-center sm:justify-start" : ""
        }`}
      >
        <li className="flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span className={centered ? "" : "sr-only"}>Home</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <li key={segment.label} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
              {isLast || !segment.href ? (
                <span
                  className="font-medium text-white break-words"
                  aria-current={isLast ? "page" : undefined}
                >
                  {segment.label}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded break-words"
                >
                  {segment.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
