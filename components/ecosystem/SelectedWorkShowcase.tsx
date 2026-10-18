// components/ecosystem/SelectedWorkShowcase.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

const RESOURCE_COMMIT = '50b259bf8db5b8c04baf0c0cb9b1cf11a32e9c70';

const IMAGE_ROOT = `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${RESOURCE_COMMIT}/landing-page-resource/images`;

const workSamples = [
  {
    id: 'direktori-listing',
    kind: 'COURSE COMPLETION · CODEPOLITAN',
    title: 'Directory Listing App Development',
    summary:
      'Certificate of completion awarded to Rei Reltroner by CODEPOLITAN on March 10, 2025, for successfully completing the online course "Belajar Membangun Aplikasi Studi Kasus Directory Listing App." The course focused on practical application development through a directory listing case study.',
    src: `${IMAGE_ROOT}/direktori-listing.webp`,
    alt: 'CODEPOLITAN course completion certificate awarded to Rei Reltroner for completing the Directory Listing App development course on March 10, 2025.',
  },
  {
    id: 'rei-kelas-digi',
    kind: 'NATIONAL WORKSHOP · KELAS DIGI',
    title: 'YouTube Career Blueprint',
    summary:
      'Certificate of participation awarded to Rei Reltroner for attending a national workshop organized by Kelas DiGi, titled "YouTube Career Blueprint: Bangun Personal Brand, Skill, dan Peluang Karier lewat YouTube." The workshop explored personal branding, skill development, and career opportunities through YouTube.',
    src: `${IMAGE_ROOT}/rei-kelas-digi.webp`,
    alt: 'Kelas DiGi national workshop participation certificate awarded to Rei Reltroner for the YouTube Career Blueprint workshop.',
  },
] as const;

const focusStyle =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400';

function WorkImage({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // A cached/network error can finish before React attaches the image handler.
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
      {failed ? (
        <div
          className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 px-6 text-center"
          role="status"
        >
          <span className="text-sm font-semibold text-blue-200">
            {title}
          </span>
          <span className="text-xs text-slate-400">
            Certificate preview temporarily unavailable
          </span>
        </div>
      ) : (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain object-center"
        />
      )}
    </div>
  );
}

export default function SelectedWorkShowcase() {
  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="scroll-mt-28"
    >
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
          Learning evidence &amp; professional development
        </p>

        <h2
          id="selected-work-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-white"
        >
          Selected Work &amp; Practice
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
          These original certificates document course completion and workshop
          participation. They are learning milestones, not paid client engagements.
        </p>
      </header>

      <div className="mt-9 grid gap-6 md:grid-cols-2">
        {workSamples.map((sample) => (
          <article
            key={sample.id}
            className="studio-card grid min-w-0 items-start gap-4 sm:grid-cols-[7rem_minmax(0,1fr)]"
          >
            <WorkImage
              src={sample.src}
              alt={sample.alt}
              title={sample.title}
            />

            <div className="min-w-0 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300">
                {sample.kind}
              </p>

              <h3 className="text-xl font-bold text-white">
                {sample.title}
              </h3>

              <p className="text-sm leading-7 text-slate-300">
                {sample.id === 'direktori-listing'
                  ? 'CODEPOLITAN course completion, awarded to Rei Reltroner on March 10, 2025.'
                  : 'Kelas DiGi national workshop participation, awarded to Rei Reltroner.'}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="/blog/for-recruiters"
          className={`inline-flex min-h-12 items-center justify-center rounded-full border border-blue-400/50 px-6 py-3 text-sm font-semibold text-blue-100 transition hover:bg-blue-900/30 ${focusStyle}`}
        >
          Explore engineering experience and collaboration →
        </a>

        <span className="text-xs leading-6 text-slate-400">
          Course completion &amp; workshop participation · Engineering
          experience and case studies in the public archive
        </span>
      </div>
    </section>
  );
}
