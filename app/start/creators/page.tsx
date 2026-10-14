// app/start/creators/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.reltroner.com/start/creators' },
  title: 'For Creators — Creative Practice | Reltroner Studio',
  description:
    'Start a practical creative journey: structure your ideas, revise worldbuilding, and maintain consistency as your work grows.',
};

// IMAGE MANIFEST: replace bracketed filenames AND set the reviewed resource SHA.
// Filename replacement alone cannot activate images at an old immutable commit.
// The historical 50b259bf8db5b8c04baf0c0cb9b1cf11a32e9c70 has none of these assets.
const RESOURCE_SHA: string = '';
type PlannedImage = { id: string; filename: string; width: number; height: number; alt: string; placement: string };
type PathwayImage = PlannedImage & { state: 'placeholder' | 'ready'; src?: string };

function prepareImage(image: PlannedImage): PathwayImage {
  const ready = /^[a-f0-9]{40}$/i.test(RESOURCE_SHA)
    && RESOURCE_SHA.toLowerCase() !== '50b259bf8db5b8c04baf0c0cb9b1cf11a32e9c70'
    && /^[a-z0-9][a-z0-9-]*\.webp$/i.test(image.filename);
  return {
    ...image, state: ready ? 'ready' : 'placeholder', src: ready
      ? `https://cdn.jsdelivr.net/gh/Reltroner/reltroner-studio-resource@${RESOURCE_SHA.toLowerCase()}/landing-page-resource/images/${image.filename}`
      : undefined
  };
}

const CREATOR_IMAGE_MANIFEST = {
  heroDesktop: prepareImage({
    id: 'C-HERO-D', filename: '[pathway-creator-hero-v1.webp]', width: 1800, height: 1125,
    alt: 'An initial sketch evolves through connected decisions into an emerging fictional civilization.', placement: 'Desktop hero beside the value proposition'
  }),
  heroMobile: prepareImage({
    id: 'C-HERO-M', filename: '[pathway-creator-hero-mobile-v1.webp]', width: 960, height: 1200,
    alt: 'A vertical sequence connects one creative seed, meaningful decisions, and an emerging fictional world.', placement: 'Mobile hero below the copy and CTAs'
  }),
  workbench: prepareImage({
    id: 'C-WORK', filename: '[pathway-creator-workbench-v1.webp]', width: 1500, height: 1000,
    alt: 'A physical creative workbench connects sketches and decision cards, with one previous outcome becoming a new question.', placement: 'Beside the interactive Creative Loop'
  }),
  proof: prepareImage({
    id: 'C-PROOF', filename: '[pathway-creator-proof-v1.webp]', width: 1600, height: 900,
    alt: 'A conceptual fictional environment shows cultural and institutional consequences of earlier design decisions.', placement: 'Proof through practice'
  }),
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
        className="h-auto w-full" loading={image.id.startsWith('C-HERO') ? 'eager' : 'lazy'} /> : (
        <div data-visual-canvas className="flex flex-col gap-3 p-4 sm:p-6" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-blue-300">
            <p className="uppercase tracking-[0.16em]">Visual preview</p><p>{image.id}</p>
          </div>
          <div className="flex min-h-0 flex-1 items-center">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 320 80" className="h-14 w-full text-blue-400/60 sm:h-20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M32 40H108M132 40H210M234 40H288M120 28V8H222V28" strokeDasharray="4 5" />
              <rect x="8" y="16" width="48" height="48" rx="8" /><path d="M22 47l8-20 10 20M25 41h12" />
              <circle cx="120" cy="40" r="12" /><rect x="210" y="28" width="24" height="24" rx="4" />
              <path d="M276 57V32l12-10 12 10v25zM286 57V43h5v14" />
            </svg>
          </div>
        </div>
      )}
      <figcaption className="border-t border-slate-700 p-4 text-sm leading-6 text-slate-300 sm:px-6">
        <p>{image.src ? 'Conceptual illustration · ' : ''}{image.alt}</p>
        {!image.src ? <div className="mt-3 text-xs leading-5 text-slate-400">
          <code className="block break-all text-slate-300">{image.filename}</code>
          <p className="mt-1">Planned image · {image.width}×{image.height} · {image.width / image.height === 1.6 ? '8:5' : image.width / image.height === 0.8 ? '4:5' : image.width / image.height === 1.5 ? '3:2' : '16:9'}</p>
        </div> : null}
      </figcaption>
    </figure>
  );
}

function HeroVisual() {
  const desktop = CREATOR_IMAGE_MANIFEST.heroDesktop;
  const mobile = CREATOR_IMAGE_MANIFEST.heroMobile;
  if (desktop.src && mobile.src) return (
    <figure className="overflow-hidden rounded-2xl border border-slate-700" data-asset-state="ready">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktop.src} width={desktop.width} height={desktop.height} />
        <img src={mobile.src} width={mobile.width} height={mobile.height} alt={desktop.alt} className="h-auto w-full" />
      </picture>
      <figcaption className="px-4 py-3 text-sm text-slate-300">Conceptual illustration of a creative system.</figcaption>
    </figure>
  );
  return <><div className="hidden lg:block"><VisualSlot image={desktop} /></div><div className="lg:hidden"><VisualSlot image={mobile} /></div></>;
}

const creativeLoop = [
  { name: 'Seed', id: 'seed', example: 'A fictional civilization values public creative expression.', prompt: 'Start with one value, practice, or possibility worth exploring.' },
  { name: 'Constraint', id: 'constraint', example: 'Shared exhibition space must be allocated.', prompt: 'What boundary makes this idea matter to someone else?' },
  { name: 'Interaction', id: 'interaction', example: 'Creators, communities and institutions have different priorities.', prompt: 'Whose choices meet, and where do their priorities differ?' },
  { name: 'Consequence', id: 'consequence', example: 'Some artistic practices gain visibility while others receive less attention.', prompt: 'Follow what changes because of the interaction.' },
  { name: 'Changed State', id: 'changed-state', example: 'The relationships between creative recognition, trust and public institutions change.', prompt: 'Keep this new state in the world. Do not reset it after the scene.' },
  { name: 'New Question', id: 'new-question', example: 'How can creators preserve independence while participating in shared institutions?', prompt: 'This question can become the seed of the next creative loop.' },
] as const;

export default function CreatorStartPage() {
  return (
    <div id="creator-start-content" className="mx-auto max-w-6xl px-4 pb-28 pt-6 text-white sm:px-6 sm:pt-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-3 text-sm text-slate-300">
        <Link href="/" className={`inline-flex min-h-[44px] items-center hover:underline ${focusStyle}`}>Home</Link>
        <span aria-hidden="true" className="text-slate-500">/</span><span aria-current="page">For Creators</span>
      </nav>

      <header data-section="C1" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Reltroner Studio / For Creators</p>
          <h1 style={{ hyphens: 'none' }} className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            What if your next idea came from the world you&apos;ve already built?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-7 text-slate-300">
            Your creativity doesn&apos;t have to restart from zero. Learn how decisions, constraints, and consequences can turn one idea into a growing system of possibilities.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ marginRight: 'clamp(0px, calc(375px - 100vw), 64px)' }}>
            <Link href="#creator-loop" className={primaryLink}>Try the Creative Loop <span aria-hidden="true" className="ml-2">↓</span></Link>
            <Link href="#creator-method" className={secondaryLink}>Understand the Method</Link>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">Creative Compound Machine · One output becomes the next input.</p>
        </div>
        <div className="min-w-0"><HeroVisual /></div>
      </header>

      <section data-section="C2" aria-labelledby="creator-problem-title" className="mt-16 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Recognize the pattern</p>
        <h2 id="creator-problem-title" className={sectionTitle}>Why do creative worlds stop growing?</h2>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">Sometimes the missing piece is a relationship, rather than another detail.</p>
        <ul className="mt-7 grid gap-6 md:grid-cols-3">
          {[
            ['Many ideas. Few connections.', 'You have places, characters and inventions, but their choices rarely affect one another.'],
            ['One big concept. Then a pause.', 'A major idea is complete, but it does not yet suggest a meaningful next question.'],
            ['More detail. Little consequence.', 'The archive grows while the state of the world stays much the same.'],
          ].map(([title, description], index) => <li key={title} className="min-w-0 border-t border-slate-600 pt-5">
            <p className="text-sm font-semibold text-blue-300">0{index + 1}</p><h3 className="mt-3 text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-300">{description}</p>
          </li>)}
        </ul>
      </section>

      <section id="creator-loop" data-section="C3" tabIndex={-1} aria-labelledby="creator-loop-title" className="mt-16 scroll-mt-6 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-300">Try the Creative Compound Machine</p>
        <h2 id="creator-loop-title" className={sectionTitle}>One idea. Six connected decisions.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">Open each stage to follow what one decision makes possible. The outcome of this loop is a starting point for another.</p>
        <p className="mt-4 text-sm font-medium text-amber-200">Non-canonical example · A practice scenario, not Asthortera lore.</p>
        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[1.15fr_1fr]">
          <ol className="min-w-0 divide-y divide-slate-700 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/60">
            {creativeLoop.map((stage, index) => <li key={stage.id}>
              <details id={`creator-stage-${stage.id}`} open={index === 0} className="group scroll-mt-6 px-4 py-3 sm:px-5">
                <summary className={`min-h-[48px] cursor-pointer list-none rounded-lg [&::-webkit-details-marker]:hidden ${focusStyle}`}>
                  <h3 className="flex min-h-[48px] items-center gap-4 text-base font-semibold">
                    <span className="text-sm font-medium text-blue-300">0{index + 1}</span><span className="flex-1">{stage.name}</span>
                    <span aria-hidden="true" className="text-xl text-blue-300 group-open:rotate-90">›</span>
                  </h3>
                </summary>
                <p className="mt-2 text-base leading-7 text-slate-100">{stage.example}</p>
                <p className="mb-3 mt-3 text-sm leading-6 text-slate-400">{stage.prompt}</p>
                {index === 5 ? <Link href="#creator-stage-seed" className={`mb-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-blue-300 hover:underline ${focusStyle}`}>Return the new question to the seed <span aria-hidden="true" className="ml-2">↗</span></Link> : null}
              </details>
            </li>)}
          </ol>
          <aside className="min-w-0">
            <VisualSlot image={CREATOR_IMAGE_MANIFEST.workbench} />
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">Keep previous outcomes in view. A useful next idea grows from something your world has already changed.</p>
          </aside>
        </div>
      </section>

      <section id="creator-method" data-section="C4" tabIndex={-1} aria-labelledby="creator-method-title" className="mt-16 scroll-mt-6 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Understand the method</p>
        <h2 id="creator-method-title" className={sectionTitle}>From isolated ideas to creative compounding</h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="max-w-xl space-y-4 text-base leading-7 text-slate-300">
            <p>Ideas need relationships. A constraint gives those relationships something to negotiate, and an interaction creates consequences.</p>
            <p>Consequences change the world&apos;s state: what people know, what institutions permit, or what a community expects. Keep that change available to later work.</p>
            <p>The new state creates further questions. That is creative compounding. More words or more lore do not automatically make a stronger system.</p>
            <p>Revise the connections, record what changed and why, and explain what that change means for someone inside the world.</p>
          </div>
          <div className="min-w-0 rounded-2xl border border-blue-800/60 bg-blue-950/30 p-5 sm:p-7">
            <h3 className="text-xl font-semibold">Make one loop of your own</h3>
            <p className="mt-3 leading-7 text-slate-300">Use paper or a Markdown file. Write one sentence for each of the six stages.</p>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-base leading-7 text-slate-200">
              <li>Choose a seed you already have.</li><li>Give it one constraint.</li><li>Name the people or systems that interact.</li>
              <li>Describe a consequence of their choices.</li><li>Record what is different afterward.</li><li>Turn that changed state into one new question.</li>
            </ol>
            <p className="mt-5 border-t border-blue-800/60 pt-4 text-sm leading-6 text-blue-200">The test: does your next question depend on what just happened? If not, revisit the connection.</p>
          </div>
        </div>
      </section>

      <section data-section="C5" aria-labelledby="creator-proof-title" className="mt-16 sm:mt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Proof through practice</p>
        <h2 id="creator-proof-title" className={sectionTitle}>See how a creative system becomes a world</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">Asthortera is an extensive fictional worldbuilding project connecting systems, institutions, culture and narrative. It offers a place to examine how earlier design decisions create later possibilities.</p>
        <div className="mt-7 grid items-center gap-7 lg:grid-cols-2">
          <VisualSlot image={CREATOR_IMAGE_MANIFEST.proof} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-amber-200">Conceptual relationship · Not a named canon event.</p>
            <ol className="mt-5 space-y-5 border-l border-blue-700 pl-5">
              <li><h3 className="text-lg font-semibold">An institutional choice</h3><p className="mt-2 leading-7 text-slate-300">A rule establishes how people can participate.</p></li>
              <li><h3 className="text-lg font-semibold">A cultural consequence</h3><p className="mt-2 leading-7 text-slate-300">Participation changes which practices are visible and valued.</p></li>
              <li><h3 className="text-lg font-semibold">A narrative possibility</h3><p className="mt-2 leading-7 text-slate-300">Those changes create new decisions, tensions and questions.</p></li>
            </ol>
            <Link href="/principles/civilizational-systems-worldbuilding-asthortera" className={`mt-5 inline-flex min-h-[48px] items-center text-sm font-semibold text-blue-300 hover:underline ${focusStyle}`}>Read the civilizational systems framework →</Link>
          </div>
        </div>
      </section>

      <section data-section="C6" aria-labelledby="creator-next-title" className="mt-16 rounded-2xl border border-blue-800/60 bg-blue-950/30 p-5 sm:mt-20 sm:p-8">
        <h2 id="creator-next-title" className={sectionTitle}>Take the next step in your own creative practice</h2>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">Keep ownership of your decisions. Start with the revision guide, then use the deeper framework when it helps your own work.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="https://lms.reltroner.com/" className={primaryLink}>Start now on LMS ↗</Link>
          <Link href="/blog/creative-lore-bible" className={secondaryLink}>Explore the creative lore framework</Link>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-400">A public creative framework. No enrollment or paid mentorship program is required.</p>
      </section>
      <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-sm">
        <Link href="/start/readers" className={`inline-flex min-h-[48px] items-center text-blue-300 hover:underline ${focusStyle}`}>Looking for the fictional world? For Readers →</Link>
        <Link href="/" className={`inline-flex min-h-[48px] items-center text-slate-300 hover:underline ${focusStyle}`}>Return to the Studio homepage</Link>
      </div>
    </div>
  );
}
