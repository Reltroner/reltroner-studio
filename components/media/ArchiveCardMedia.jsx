import Image from "next/image";
import { resolveCdnImageUrl } from "@/lib/assets/image";

export default function ArchiveCardMedia({ image, title, sizes, className = "h-48 w-full" }) {
  const resolvedImage = resolveCdnImageUrl(image);
  const bypassOptimization = resolvedImage?.startsWith("https://cdn.jsdelivr.net/");

  return (
    <div className={`media-frame relative isolate overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.78),transparent_58%),linear-gradient(135deg,rgba(148,163,184,0.18),rgba(15,23,42,0.2))] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_56%),linear-gradient(135deg,rgba(15,23,42,0.9),rgba(30,41,59,0.98))]"
      />

      {resolvedImage ? (
        <Image
          src={resolvedImage}
          alt={title}
          fill
          sizes={sizes}
          unoptimized={bypassOptimization}
          className="object-contain p-3 drop-shadow-[0_18px_38px_rgba(15,23,42,0.18)] sm:p-4"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-blue-400/80">
              Archive Illustration
            </p>
            <p className="max-w-56 text-sm font-bold text-gray-700 dark:text-white">
              {title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}