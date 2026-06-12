import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

export interface WikiBreadcrumbsProps {
  segments: BreadcrumbSegment[];
}

export default function WikiBreadcrumbs({ segments }: WikiBreadcrumbsProps) {
  if (!segments || segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <ol className="flex items-center gap-2 text-sm text-slate-400">
        <li className="flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <li key={segment.label} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-slate-500" />
              {isLast || !segment.href ? (
                <span
                  className="font-medium text-white"
                  aria-current={isLast ? "page" : undefined}
                >
                  {segment.label}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className="transition-colors hover:text-white"
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
