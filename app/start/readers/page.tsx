// app/start/readers/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.reltroner.com/start/readers' },
  title: 'For Readers — Discover Asthortera | Reltroner Studio',
  description:
    'A gentle, spoiler-aware introduction to the fictional world of Asthortera, with clear choices before opening its lore archive.',
};

// IMAGE MANIFEST: set BOTH real filenames and the reviewed commit containing them.
// Bracketed filenames never request images. The historical commit has no planned assets.
const RESOURCE_SHA: string = '';
type PlannedImage = { id: string; filename: string; width: number; height: number; alt: string; placement: string };
type PathwayImage = PlannedImage & { state: 'placeholder' | 'ready'; src?: string };

function prepareImage(image: PlannedImage): PathwayImage {
  const ready = /^[a-f0-9]{40}$/i.test(RESOURCE_SHA)
    && RESOURCE_SHA.toLowerCase() !== '50b259bf8db5b8c04baf0c0cb9b1cf11a32e9c70'
    && /^[a-z0-9][a-z0-9-]*\.webp$/i.test(image.filename);
  return { ...image, state: ready ? 'ready' : 'placeholder', src: ready
    ? `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${RESOURCE_SHA.toLowerCase()}/landing-page-resource/images/${image.filename}`
    : undefined };
}

const READER_IMAGE_MANIFEST = {
  heroDesktop: prepareImage({ id: 'R-HERO-D', filename: '[pathway-reader-hero-v1.webp]', width: 1920, height: 1080,
    alt: 'A conceptual planetary landscape connects distinct advanced civilizations through shared infrastructure.', placement: 'Desktop hero beside the curiosity-led introduction' }),
  heroMobile: prepareImage({ id: 'R-HERO-M', filename: '[pathway-reader-hero-mobile-v1.webp]', width: 960, height: 1200,
    alt: 'A vertical travel perspective connects differentiated, technologically advanced fictional districts.', placement: 'Mobile hero below the copy and CTAs' }),
  observatory: prepareImage({ id: 'R-OBS', filename: '[pathway-reader-observatory-v1.webp]', width: 1600, height: 900,
    alt: 'A conceptual orbital observatory connects engineering, industrial, archival and institutional contributions from several civilizations.', placement: 'Connected-civilization observatory scenario' }),
  belonging: prepareImage({ id: 'R-BELONG', filename: '[pathway-reader-belonging-v1.webp]', width: 1500, height: 1000,
    alt: 'An individual considers identity and belonging in a prosperous fictional city with material abundance.', placement: 'Life inside the system' }),
};

const focusStyle = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300';
const primaryLink = `inline-flex min-h-[48px] items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-center text-base font-semibold text-white hover:bg-blue-500 ${focusStyle}`;
const secondaryLink = `inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-500 px-5 py-3 text-center text-base font-medium text-slate-100 hover:bg-white/5 ${focusStyle}`;
const sectionTitle = 'max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl';

function VisualSlot({ image }: { image: PathwayImage }) {
  return (
    <figure data-asset-id={image.id} data-asset-state={image.state} data-filename={image.filename}
      data-dimensions={`${image.width}x${image.height}`} data-placement={image.placement}
      className="min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/70">
      {image.src ? <img src={image.src} width={image.width} height={image.height} alt={image.alt}
        className="h-auto w-full" loading={image.id.startsWith('R-HERO') ? 'eager' : 'lazy'} /> : (
        <div data-visual-canvas className="flex flex-col gap-3 p-4 sm:p-6" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-cyan-200">
            <p className="uppercase tracking-[0.16em]">Visual preview</p><p>{image.id}</p>
          </div>
          <div className="flex min-h-0 flex-1 items-center">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 320 100" className="h-16 w-full text-cyan-300/55 sm:h-24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="160" cy="50" r="32" /><ellipse cx="160" cy="50" rx="95" ry="37" />
              <path d="M128 50h64M160 18c-22 19-22 45 0 64M160 18c22 19 22 45 0 64M32 50h64M224 50h64" strokeDasharray="4 5" />
              <circle cx="65" cy="50" r="6" /><circle cx="255" cy="50" r="6" /><circle cx="160" cy="13" r="6" /><circle cx="160" cy="87" r="6" />
            </svg>
          </div>
        </div>
      )}
      <figcaption className="border-t border-slate-700 p-4 text-sm leading-6 text-slate-300 sm:px-6">
        <p>{image.src ? 'Conceptual illustration · ' : ''}{image.alt}</p>
        {!image.src ? <div className="mt-3 text-xs leading-5 text-slate-400">
          <code className="block break-all text-slate-300">{image.filename}</code>
          <p className="mt-1">Planned image · {image.width}×{image.height} · {image.width / image.height === 0.8 ? '4:5' : image.width / image.height === 1.5 ? '3:2' : '16:9'}</p>
        </div> : null}
      </figcaption>
    </figure>
  );
}

function HeroVisual() {
  const desktop = READER_IMAGE_MANIFEST.heroDesktop;
  const mobile = READER_IMAGE_MANIFEST.heroMobile;
  if (desktop.src && mobile.src) return (
    <figure className="overflow-hidden rounded-2xl border border-slate-700" data-asset-state="ready">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktop.src} width={desktop.width} height={desktop.height} />
        <img src={mobile.src} width={mobile.width} height={mobile.height} alt={desktop.alt} className="h-auto w-full" />
      </picture>
      <figcaption className="px-4 py-3 text-sm text-slate-300">Conceptual planetary landscape, not official geography.</figcaption>
    </figure>
  );
  return <><div className="hidden lg:block"><VisualSlot image={desktop} /></div><div className="lg:hidden"><VisualSlot image={mobile} /></div></>;
}

// These explanatory roles follow the published Civilizational Systems framework.
// The proposed project below is a scenario, not a new canonical mission.
const civilizations = [
  { name: 'Astrostelia', role: 'Space research & mission architecture', contribution: 'Frames the scientific question and mission design.', relationship: 'A mission concept becomes useful when other teams can build, document and govern it.' },
  { name: 'Moreg', role: 'Industrial capabilities', contribution: 'Provides industrial engineering and manufacturing capabilities.', relationship: 'Physical systems must meet research needs and remain understandable to the people operating them.' },
  { name: 'Depcutland', role: 'Archives & knowledge continuity', contribution: 'Preserves research documentation and institutional memory.', relationship: 'Records let future teams review decisions, reproduce reasoning and continue the work.' },
  { name: 'Kalgered', role: 'Legal & institutional frameworks', contribution: 'Clarifies responsibilities, agreements and ways to resolve disputes.', relationship: 'Cooperation needs institutional certainty as well as technical compatibility.' },
] as const;

export default function ReaderStartPage() {
  return (
    <div id="reader-start-content" className="mx-auto max-w-6xl px-4 pb-28 pt-6 text-white sm:px-6 sm:pt-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-3 text-sm text-slate-300">
        <Link href="/" className={`inline-flex min-h-[44px] items-center hover:underline ${focusStyle}`}>Home</Link>
        <span aria-hidden="true" className="text-slate-500">/</span><span aria-current="page">For Readers</span>
      </nav>

      <header id="reader-orientation" data-section="R1" tabIndex={-1} className="grid scroll-mt-6 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Asthortera / Fictional civilizational world</p>
          <h1 style={{ hyphens: 'none' }} className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">One planet. Many civilizations. Different futures.</h1>
          <p className="mt-5 max-w-xl text-lg leading-7 text-slate-300">What connects a world whose civilizations don&apos;t need to think, build, or live the same way? Explore Asthortera through the people, institutions, and choices that shape its shared future.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ marginRight: 'clamp(0px, calc(375px - 100vw), 64px)' }}>
            <Link href="#reader-observatory" className={primaryLink}>Explore the Connected World <span aria-hidden="true" className="ml-2">↓</span></Link>
            <Link href="#reader-depth" className={secondaryLink}>Choose Your Reading Depth</Link>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">Fiction, not an empirical account of Earth. Its nations, institutions and imagined statistics belong to worldbuilding; real-world parallels are creative analogies.</p>
        </div>
        <div className="min-w-0"><HeroVisual /></div>
      </header>

      <section id="reader-observatory" data-section="R2" tabIndex={-1} aria-labelledby="reader-observatory-title" className="mt-16 scroll-mt-6 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-200">One observatory, many contributions</p>
        <h2 id="reader-observatory-title" className={sectionTitle}>One project. Many civilizations.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">Imagine an orbital observatory. Its scientific ambition depends on more than a telescope: it needs manufacturing, knowledge continuity and institutions that make cooperation possible.</p>
        <p className="mt-4 text-sm font-medium text-amber-200">Illustrative worldbuilding scenario — not a published story event.</p>
        <div className="mt-7 grid items-start gap-7 lg:grid-cols-2">
          <div className="min-w-0">
            <VisualSlot image={READER_IMAGE_MANIFEST.observatory} />
            <p className="mt-4 text-sm leading-6 text-slate-400">One shared undertaking does not require one civilization to perform every function.</p>
          </div>
          <div className="min-w-0">
            <p className="mb-4 text-sm text-slate-300">Open a contribution to see why it needs the others.</p>
            <div className="space-y-3">
              {civilizations.map((civilization, index) => <details key={civilization.name} open={index === 0} className="group rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 sm:px-5">
                <summary className={`min-h-[48px] cursor-pointer list-none rounded-lg [&::-webkit-details-marker]:hidden ${focusStyle}`}>
                  <h3 className="flex min-h-[48px] items-center justify-between gap-3 text-lg font-semibold">
                    <span>{civilization.name}</span><span aria-hidden="true" className="text-xl text-cyan-200 group-open:rotate-90">›</span>
                  </h3>
                </summary>
                <p className="mt-2 text-sm font-medium text-cyan-200">{civilization.role}</p>
                <p className="mt-3 text-base leading-7 text-slate-200">{civilization.contribution}</p>
                <p className="mb-2 mt-3 text-sm leading-6 text-slate-400">{civilization.relationship}</p>
              </details>)}
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">Different expertise meets through shared responsibilities. Connection makes difference useful; it does not make the civilizations identical.</p>
      </section>

      <section data-section="R3" aria-labelledby="reader-belonging-title" className="mt-16 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Life inside the system</p>
        <h2 id="reader-belonging-title" className={sectionTitle}>What does belonging mean after material abundance?</h2>
        <div className="mt-7 grid items-center gap-7 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="max-w-xl text-base leading-7 text-slate-300">Imagine someone considering a role in a research team, in a fictional city where essential material needs are secure. Having a place to live does not decide how they want to participate.</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">They can still ask whether their work is recognized, whom they trust professionally, and what responsibility they owe a community. Material security and personal meaning are different questions.</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">A hypothetical human perspective, not a named character or canon event. Abundance does not erase agency, conflict or institutional responsibility.</p>
            <div className="mt-6 divide-y divide-slate-700">
              {[
                ['Can I choose my contribution?', 'Personal agency includes choosing a role, revising a commitment, and making room for others to do the same.'],
                ['What counts as recognition?', 'A community can value work differently from an institution. Belonging need not mean accepting every measure of success.'],
                ['How does an institution earn trust?', 'Professional trust depends on accountable decisions, shared knowledge and responsibilities that people can understand.'],
              ].map(([question, answer]) => <details key={question} className="py-3">
                <summary className={`min-h-[48px] cursor-pointer py-3 text-base font-medium ${focusStyle}`}>{question}</summary>
                <p className="pb-3 text-base leading-7 text-slate-300">{answer}</p>
              </details>)}
            </div>
          </div>
          <VisualSlot image={READER_IMAGE_MANIFEST.belonging} />
        </div>
      </section>

      <section data-section="R4" aria-labelledby="reader-scales-title" className="mt-16 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-200">Change the lens</p>
        <h2 id="reader-scales-title" className={sectionTitle}>Explore Asthortera at three scales</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {[
            ['Micro', 'A person makes a choice', 'Individual experience and decisions.', 'What does participation mean to this person?'],
            ['Meso', 'A community responds', 'Communities, institutions and organizations.', 'How does a team recognize work and share responsibility?'],
            ['Macro', 'Civilizations coordinate', 'Intercivilizational relationships and planetary systems.', 'How can distinct societies cooperate without becoming uniform?'],
          ].map(([scale, title, description, question], index) => <article key={scale} className="min-w-0 rounded-2xl border border-slate-700 bg-slate-950/50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">0{index + 1} / {scale}</p>
            <h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-base leading-7 text-slate-300">{description}</p>
            <p className="mt-5 border-t border-slate-700 pt-4 text-sm leading-6 text-slate-400">{question}</p>
          </article>)}
        </div>
        <p className="mt-6 max-w-3xl leading-7 text-slate-300">A personal choice can affect a team; some institutional choices reach across civilizations. Others stay local. These scales connect, but every small event need not become a planetary crisis.</p>
      </section>

      <section id="reader-depth" data-section="R5" tabIndex={-1} aria-labelledby="reader-depth-title" className="mt-16 scroll-mt-6 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Your pace, your choice</p>
        <h2 id="reader-depth-title" className={sectionTitle}>Choose your reading depth</h2>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">Curiosity is enough to start. Deeper lore is a voluntary next step.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <article className="flex min-w-0 flex-col rounded-2xl border border-slate-700 bg-slate-950/50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">01 / Spoiler-light orientation</p>
            <h3 className="mt-4 text-xl font-semibold">Stay with the big picture</h3>
            <p className="mb-6 mt-3 text-base leading-7 text-slate-300">Revisit the ideas on this page without entering named story events or detailed lore.</p>
            <Link href="#reader-orientation" className={`mt-auto ${secondaryLink}`}>Stay with this orientation</Link>
          </article>
          <article className="flex min-w-0 flex-col rounded-2xl border border-blue-800/60 bg-blue-950/30 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-200">02 / Contains lore</p>
            <h3 className="mt-4 text-xl font-semibold">Learn the world&apos;s vocabulary</h3>
            <p id="reader-glossary-warning" className="mb-6 mt-3 text-base leading-7 text-slate-300">The Asthortera glossary contains named concepts and world rules. It may reveal lore and is not spoiler-free.</p>
            <Link href="/blog/asthortera-glossary" aria-describedby="reader-glossary-warning" className={`mt-auto ${primaryLink}`}>Open the glossary (contains lore)</Link>
          </article>
          <article className="flex min-w-0 flex-col rounded-2xl border border-slate-700 bg-slate-950/50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-200">03 / Story & canon disclosure</p>
            <h3 className="mt-4 text-xl font-semibold">Enter the story archive</h3>
            <p id="reader-series-warning" className="mb-6 mt-3 text-base leading-7 text-slate-300">The series archive may reveal canon, narrative information and story structures. It is not spoiler-free.</p>
            <Link href="/series" aria-describedby="reader-series-warning" className={`mt-auto ${secondaryLink}`}>Explore the series archive</Link>
          </article>
        </div>
        <Link href="/#knowledge-bridge" className={`mt-5 inline-flex min-h-[48px] items-center text-sm font-medium text-blue-300 hover:underline ${focusStyle}`}>Prefer browsing by subject? Explore the public knowledge collections →</Link>
      </section>

      <section data-section="R6" aria-labelledby="reader-cross-title" className="mt-14 border-t border-slate-700 pt-7">
        <h2 id="reader-cross-title" className="text-xl font-semibold">Interested in building worlds of your own?</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">The Creator pathway explores how an idea becomes a connected creative system.</p>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-sm">
          <Link href="/start/creators" className={`inline-flex min-h-[48px] items-center text-blue-300 hover:underline ${focusStyle}`}>Explore the Creator pathway →</Link>
          <Link href="/" className={`inline-flex min-h-[48px] items-center text-slate-300 hover:underline ${focusStyle}`}>Return to the Studio homepage</Link>
        </div>
      </section>
    </div>
  );
}
