import type { Metadata } from 'next';
import Link from 'next/link';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';
import {
  ExploreCompoundExperiment,
  ExploreCuriositySection,
  ExploreReadingLenses,
} from './ExploreClient';

export const metadata: Metadata = buildStandaloneMetadata({
  title: 'Explore | Follow Your Curiosity',
  description:
    'Explore Asthortera, creative frameworks, stories, and the questions that connect them. Find your own way in, at your own pace.',
  pathname: '/explore',
  image: '/images/reltroner-studio-banner.webp',
});

const exploreScopedCss = `
#explore-page-content .explore-art-box {
  position: relative;
  min-height: 420px;
  border: 1px solid var(--rs-border-strong);
  border-radius: var(--rs-radius-panel);
  background: linear-gradient(145deg, color-mix(in srgb, var(--rs-bg-panel-strong) 85%, transparent), var(--rs-bg-deep));
  overflow: hidden;
}
#explore-page-content .explore-art-banner {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 10px;
  border: 1px solid var(--rs-border-strong);
  border-radius: 8px;
  background: color-mix(in srgb, var(--rs-bg-deep) 82%, transparent);
  color: var(--color-blue-200);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
#explore-page-content .explore-art-banner::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-blue-400);
}
#explore-page-content .explore-hero-svg {
  width: 100%;
  height: 100%;
  min-height: 420px;
  display: block;
}
#explore-page-content .explore-art-caption {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 2;
  padding: 12px 16px;
  border: 1px solid var(--rs-border-strong);
  border-radius: 14px;
  background: color-mix(in srgb, var(--rs-bg-deep) 88%, transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
#explore-page-content .explore-art-caption strong {
  display: block;
  font-size: 0.8rem;
  color: var(--rs-text-primary);
}
#explore-page-content .explore-art-caption small {
  display: block;
  margin-top: 2px;
  font-size: 0.7rem;
  color: var(--rs-text-muted);
}
#explore-page-content .explore-art-caption span {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-blue-300);
}
#explore-page-content .explore-entry-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
#explore-page-content .explore-entry-btn {
  position: relative;
  min-height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform var(--rs-motion-fast), border-color var(--rs-motion-fast), background var(--rs-motion-fast);
}
#explore-page-content .explore-entry-btn:hover {
  border-color: var(--rs-border-strong);
}
#explore-page-content .explore-entry-active {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--color-blue-200);
}
#explore-page-content .explore-entry-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--rs-border-strong);
  background: var(--rs-bg-panel-strong);
  color: var(--color-blue-300);
  display: grid;
  place-items: center;
  margin-bottom: 16px;
  flex-shrink: 0;
}
#explore-page-content .explore-entry-icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
#explore-page-content .explore-results {
  margin-top: 22px;
  padding: 28px;
}
#explore-page-content .explore-results-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}
#explore-page-content .explore-spoiler-switch {
  margin: 22px 0;
  padding: 14px 16px;
  border: 1px solid var(--rs-border-muted);
  border-radius: 13px;
  background: var(--rs-bg-panel);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}
#explore-page-content .explore-spoiler-switch label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--rs-text-primary);
  cursor: pointer;
}
#explore-page-content .explore-spoiler-switch input {
  width: 18px;
  height: 18px;
  accent-color: var(--color-blue-500);
  flex-shrink: 0;
}
#explore-page-content .explore-spoiler-switch small {
  font-size: 0.75rem;
  color: var(--rs-text-muted);
}
#explore-page-content .explore-result-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
#explore-page-content .explore-result-card {
  padding: 20px;
  border: 1px solid var(--rs-border-muted);
  border-radius: 15px;
  background: var(--rs-bg-panel);
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 210px;
}
#explore-page-content .explore-result-card[data-lore="true"] {
  border-color: var(--rs-border-strong);
  background: color-mix(in srgb, var(--rs-accent-strong) 18%, var(--rs-bg-panel));
}
#explore-page-content .explore-result-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
#explore-page-content .explore-pill-warn {
  display: inline-block;
  padding: 5px 10px;
  font-size: 0.65rem;
  border-radius: 30px;
  border: 1px solid var(--color-blue-400);
  background: color-mix(in srgb, var(--color-blue-600) 28%, var(--rs-bg-panel-strong));
  color: var(--color-blue-200);
}
#explore-page-content .explore-result-card h4 {
  font-family: var(--font-display), sans-serif;
  font-size: 1.08rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--rs-text-primary);
}
#explore-page-content .explore-result-card p {
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--rs-text-soft);
}
#explore-page-content .explore-question-visual {
  height: 240px;
  position: relative;
  border: 1px solid var(--rs-border-muted);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 24px;
  background: radial-gradient(ellipse at 60% 50%, color-mix(in srgb, var(--rs-accent-strong) 38%, transparent), transparent 65%), var(--rs-bg-deep);
}
#explore-page-content .explore-question-visual svg {
  width: 100%;
  height: 100%;
  display: block;
}
#explore-page-content .explore-lens-control {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0;
}
#explore-page-content .explore-lens-control button {
  min-height: 44px;
  padding: 9px 14px;
  border-radius: 10px;
  border: 1px solid var(--rs-border-muted);
  background: var(--rs-bg-panel);
  color: var(--rs-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
}
#explore-page-content .explore-lens-control button[aria-selected="true"] {
  background: color-mix(in srgb, var(--rs-accent-strong) 45%, var(--rs-bg-panel-strong));
  color: var(--rs-text-primary);
  border-color: var(--color-blue-400);
}
#explore-page-content .explore-reading-sample {
  min-height: 220px;
  padding: 24px;
  border: 1px solid var(--rs-border-strong);
  border-radius: 15px;
  background: var(--rs-bg-panel-strong);
}
#explore-page-content .explore-sample-tag {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--color-blue-300);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
#explore-page-content .explore-reading-sample h4 {
  font-family: var(--font-display), sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--rs-text-primary);
}
#explore-page-content .explore-lens-foot {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
#explore-page-content .explore-theme-art {
  height: 184px;
  position: relative;
  border-bottom: 1px solid var(--rs-border-muted);
  background: linear-gradient(135deg, var(--rs-bg-panel-strong), var(--rs-bg-deep));
  overflow: hidden;
}
#explore-page-content .explore-theme-art svg {
  width: 100%;
  height: 100%;
  display: block;
}
#explore-page-content .explore-tag-overlay {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  padding: 5px 8px;
  border: 1px solid var(--rs-border-strong);
  border-radius: 7px;
  background: color-mix(in srgb, var(--rs-bg-deep) 82%, transparent);
  color: var(--color-blue-200);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
#explore-page-content .explore-experiment-box {
  padding: 36px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  align-items: center;
  background: radial-gradient(circle at 80% 45%, color-mix(in srgb, var(--rs-accent-strong) 28%, transparent), transparent 70%), var(--rs-surface-base);
}
#explore-page-content .explore-compound {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
#explore-page-content .explore-compound button {
  min-height: 44px;
  padding: 10px 16px;
  border: 1px solid var(--rs-border-muted);
  border-radius: 11px;
  background: var(--rs-bg-panel);
  color: var(--rs-text-primary);
  font-size: 0.84rem;
  font-weight: 600;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
#explore-page-content .explore-compound button[aria-pressed="true"] {
  background: color-mix(in srgb, var(--rs-accent-strong) 42%, var(--rs-bg-panel-strong));
  border-color: var(--color-blue-400);
}
#explore-page-content .explore-compound-output {
  margin-top: 4px;
  padding: 16px 18px;
  border: 1px solid var(--rs-border-strong);
  border-radius: 13px;
  background: var(--rs-bg-panel-strong);
  min-height: 116px;
}
#explore-page-content .explore-compound-output strong {
  display: block;
  color: var(--color-blue-300);
  font-size: 0.82rem;
}
#explore-page-content .explore-compound-output p {
  margin-top: 6px;
  font-size: 0.85rem;
}
#explore-page-content #collections {
  scroll-margin-top: 95px;
}
#explore-page-content .explore-archive-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--rs-border-muted);
}
#explore-page-content .explore-archive-columns h4 {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-blue-300);
  margin-bottom: 12px;
}
#explore-page-content .explore-archive-columns a {
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 6px 0;
  font-size: 0.85rem;
  color: var(--rs-text-soft);
}
#explore-page-content .explore-archive-columns a:hover {
  color: var(--rs-text-primary);
  text-decoration: underline;
}
@media (max-width: 1050px) {
  #explore-page-content .explore-entry-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 850px) {
  #explore-page-content .explore-result-grid,
  #explore-page-content .explore-experiment-box {
    grid-template-columns: 1fr;
  }
  #explore-page-content .explore-art-box,
  #explore-page-content .explore-hero-svg {
    min-height: 340px;
  }
}
@media (max-width: 600px) {
  #explore-page-content .explore-entry-grid,
  #explore-page-content .explore-archive-columns {
    grid-template-columns: 1fr;
  }
  #explore-page-content .explore-entry-btn {
    min-height: 136px;
  }
  #explore-page-content .explore-results,
  #explore-page-content .explore-experiment-box {
    padding: 22px;
  }
  #explore-page-content .explore-results-top {
    flex-direction: column;
  }
}
`;

export default function ExplorePage() {
  return (
    <div id="explore-page-content" className="studio-page">
      <style>{exploreScopedCss}</style>

      {/* SECTION 01 | Curiosity-First Hero */}
      <section id="top" className="studio-hero" aria-labelledby="heroTitle">
        <div className="studio-wrap">
          <nav className="studio-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Explore</span>
          </nav>

          <div className="studio-split">
            <div>
              <p className="studio-eyebrow">
                Explore Reltroner Studio · Your way in
              </p>
              <h1 id="heroTitle">
                Follow the question{' '}
                <span className="text-[var(--color-blue-300)]">
                  that pulls you in.
                </span>
              </h1>
              <p className="studio-lead">
                Maybe you’re here for a story, curious how fictional
                civilizations work, or dreaming up a world of your own. Follow
                whatever sparks your imagination first, you don’t need prior lore
                or a reading order to start exploring.
              </p>
              <div className="studio-actions">
                <Link href="#choose" className="studio-button">
                  Find my starting point <span aria-hidden="true">↗</span>
                </Link>
                <Link href="#collections" className="studio-button secondary">
                  Browse the archives <span aria-hidden="true">↓</span>
                </Link>
              </div>
              <div className="studio-signals">
                <span>Start anywhere</span>
                <span>Choose your depth</span>
                <span>No sign-in to browse</span>
              </div>
            </div>

            <figure className="explore-art-box">
              <div className="explore-art-banner">
                EXP-HERO-D · CONCEPT VISUAL · NON-CANON
              </div>
              <svg
                className="explore-hero-svg"
                viewBox="0 0 720 620"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                aria-label="Abstract speculative world: a luminous planet over a network of ideas and an open notebook, representing multiple ways to explore fictional civilizations."
              >
                <defs>
                  <radialGradient id="exp-space" cx=".65" cy=".28" r=".7">
                    <stop stopColor="#17498d" />
                    <stop offset=".65" stopColor="#081e47" />
                    <stop offset="1" stopColor="#020c25" />
                  </radialGradient>
                  <radialGradient id="exp-planet" cx=".32" cy=".18" r=".9">
                    <stop stopColor="#b3e8ff" />
                    <stop offset=".22" stopColor="#398ad1" />
                    <stop offset=".64" stopColor="#145096" />
                    <stop offset="1" stopColor="#071a45" />
                  </radialGradient>
                  <filter id="exp-glow">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </defs>
                <rect width="720" height="620" fill="url(#exp-space)" />
                <g fill="#93c4ff" opacity=".65">
                  <circle cx="88" cy="89" r="1" />
                  <circle cx="230" cy="62" r="1.2" />
                  <circle cx="628" cy="98" r="1.6" />
                  <circle cx="607" cy="276" r="1" />
                  <circle cx="92" cy="287" r="1.8" />
                  <circle cx="533" cy="37" r="1.3" />
                  <circle cx="351" cy="90" r="1.1" />
                  <circle cx="165" cy="196" r="1.5" />
                  <circle cx="670" cy="404" r="1" />
                  <circle cx="62" cy="422" r="1" />
                </g>
                <ellipse
                  cx="405"
                  cy="300"
                  rx="224"
                  ry="59"
                  transform="rotate(-17 405 300)"
                  stroke="#63a9ff"
                  strokeWidth="2"
                  opacity=".3"
                  fill="none"
                />
                <circle
                  cx="408"
                  cy="246"
                  r="157"
                  fill="#346aab"
                  filter="url(#exp-glow)"
                  opacity=".45"
                />
                <circle
                  cx="408"
                  cy="246"
                  r="135"
                  fill="url(#exp-planet)"
                  stroke="#84c8ff"
                  strokeOpacity=".4"
                />
                <path
                  d="M307 222c65-85 104-37 169-79 20-13 38-11 53-4-5 62-47 83-89 87-44 4-56 62-122 61z"
                  fill="#70bbd7"
                  opacity=".42"
                />
                <path
                  d="M340 304c26-35 71-13 106-19 45-7 64-34 93-29-31 90-103 134-173 112z"
                  fill="#68a4c9"
                  opacity=".5"
                />
                <path
                  d="M294 250c14 42 35 75 70 105"
                  fill="none"
                  stroke="#c5eeff"
                  opacity=".32"
                  strokeWidth="2"
                />
                <ellipse
                  cx="408"
                  cy="246"
                  rx="216"
                  ry="54"
                  transform="rotate(-17 408 246)"
                  stroke="#b6e7ff"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity=".35"
                />
                <g opacity=".8" stroke="#368ada" strokeWidth="1.5">
                  <path
                    d="M102 450 245 378 365 451 486 372 634 446"
                    fill="none"
                  />
                  <path
                    d="M245 378 204 284M365 451l45-71M486 372l-11-58"
                    fill="none"
                  />
                </g>
                <g fill="#d8f5ff">
                  <circle cx="102" cy="450" r="5" />
                  <circle cx="245" cy="378" r="6" />
                  <circle cx="365" cy="451" r="5" />
                  <circle cx="486" cy="372" r="6" />
                  <circle cx="634" cy="446" r="5" />
                </g>
                <path
                  d="M122 466 345 514 616 468 393 424z"
                  fill="#04102b"
                  stroke="#4d86c7"
                  strokeWidth="3"
                />
                <path
                  d="M345 514v31l271-45v-32M122 466v29l223 50"
                  fill="#092b53"
                  stroke="#4282cb"
                  strokeWidth="2"
                />
                <path
                  d="M166 475 323 509M410 500l140-24M174 485l95 22"
                  stroke="#6cb4ef"
                  strokeOpacity=".6"
                  strokeWidth="2"
                />
              </svg>
              <figcaption className="explore-art-caption">
                <div>
                  <strong>Many doors. One connected world.</strong>
                  <small>
                    Worldbuilding, narrative, ideas, and the people behind them.
                  </small>
                </div>
                <span>Explore freely</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 02 & 03 | Choose Your Curiosity + Spoiler-Aware Discovery */}
      <ExploreCuriositySection />

      {/* SECTION 04 | Reading Experience */}
      <section
        id="reading"
        className="studio-section studio-soft"
        aria-labelledby="readingTitle"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">02 / See how it feels</p>
            <h2 id="readingTitle">
              A story first. The context when you need it.
            </h2>
            <p>
              You can follow a person making a choice, understand what happened
              before, or open the system behind the scene. No one needs a
              hundred lore entries to care about a single moment.
            </p>
          </div>

          <div className="studio-grid-two items-stretch">
            <div className="studio-panel studio-card flex flex-col justify-between">
              <div>
                <p className="studio-eyebrow">
                  One idea, different ways to read
                </p>
                <h3>What changes when a civilization has almost everything?</h3>
                <p>
                  More comfort doesn’t remove every difficult question. Who
                  belongs? Whose work matters? What do people choose when
                  survival is no longer the only concern?
                </p>
                <div className="explore-question-visual">
                  <svg
                    viewBox="0 0 560 270"
                    preserveAspectRatio="xMidYMid slice"
                    role="img"
                    aria-label="Non-canon conceptual silhouette of a luminous city, an individual walking toward it and layered paths representing personal, institutional and societal context."
                  >
                    <defs>
                      <linearGradient id="exp-city" x1="0" y1="0" x2="0" y2="1">
                        <stop stopColor="#3482c3" />
                        <stop offset="1" stopColor="#091b3c" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="385"
                      cy="98"
                      r="88"
                      fill="#1761b3"
                      opacity=".33"
                    />
                    <path
                      d="M0 229 68 174 121 202 171 130 228 192 284 110 331 184 398 95 447 182 510 123 560 205V270H0"
                      fill="#0c3164"
                    />
                    <path
                      d="M56 218v-68h33v68M110 218v-94h35v94M170 218v-130h45v130M248 218V63h51v155M318 218v-111h44v111M393 218v-144h54v144M474 218v-94h42v94"
                      fill="url(#exp-city)"
                      stroke="#5290c6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 220h560M0 240h560"
                      stroke="#4b84be"
                      strokeOpacity=".45"
                    />
                    <g fill="#9ddaff" opacity=".62">
                      <path
                        d="M187 105v7m14-7v7m-14 12v8m15-8v8M271 87v9m14-9v9m-14 13v10m14-10v10M409 99v9m21-9v9m-21 16v9m21-9v9"
                        stroke="#9ddaff"
                        strokeWidth="3"
                      />
                    </g>
                    <path
                      d="M66 261q26-26 51-27l17-17 38 1 23 43"
                      fill="none"
                      stroke="#a7d9fe"
                      strokeWidth="3"
                    />
                    <circle cx="116" cy="215" r="8" fill="#bfe9ff" />
                    <path
                      d="m116 225-3 19m3-13 14 10m-14-9-12 10"
                      stroke="#d5efff"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="studio-small mt-4">
                EXP-QUESTION-01 · Concept image, 16:9 · Not a published
                Asthortera scene.
              </p>
            </div>

            <ExploreReadingLenses />
          </div>
        </div>
      </section>

      {/* SECTION 05 | Doors Worth Opening */}
      <section
        id="picks"
        className="studio-section"
        aria-labelledby="picksTitle"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">03 / Doors worth opening</p>
            <h2 id="picksTitle">A few places to wander.</h2>
            <p>
              There’s a lot inside Reltroner Studio. Here’s a smaller set of
              doors to make the first visit easier.
            </p>
          </div>

          <div className="studio-grid-three">
            <Link
              href="/readers"
              className="studio-panel studio-link-card"
            >
              <div className="explore-theme-art">
                <span className="explore-tag-overlay">EXP-PICK-01 · STORY</span>
                <svg
                  viewBox="0 0 400 210"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                  aria-label="Concept placeholder: distant misty blue horizon and a walking figure leading into a fictional world."
                >
                  <defs>
                    <linearGradient
                      id="exp-storySky"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop stopColor="#0c3674" />
                      <stop offset="1" stopColor="#06142e" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="210" fill="url(#exp-storySky)" />
                  <circle
                    cx="278"
                    cy="76"
                    r="41"
                    fill="#3b89ce"
                    opacity=".53"
                  />
                  <path
                    d="M0 149 79 95 150 136 218 76 272 119 340 81 400 135V210H0"
                    fill="#154375"
                  />
                  <path
                    d="M0 174 62 148 136 169 218 129 289 158 350 118 400 158V210H0"
                    fill="#0b2952"
                  />
                  <path
                    d="M0 190 125 174 225 186 400 162V210H0"
                    fill="#071b3b"
                  />
                  <circle cx="186" cy="174" r="6" fill="#a3d8ff" />
                  <path
                    d="m186 180 0 17m0-11-7 5m7-5 7 4"
                    stroke="#a3d8ff"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="studio-card">
                <h3>Step into Asthortera</h3>
                <p>
                  One fictional planet. Distinct civilizations. Stories about
                  what progress solves, and what it doesn’t.
                </p>
                <span className="studio-text-link">
                  Start with the Reader pathway ↗
                </span>
              </div>
            </Link>

            <Link href="/places" className="studio-panel studio-link-card">
              <div className="explore-theme-art">
                <span className="explore-tag-overlay">EXP-PICK-02 · WORLD</span>
                <svg
                  viewBox="0 0 400 210"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                  aria-label="Concept placeholder: layered atlas contours, route lines and glowing archive structures."
                >
                  <rect width="400" height="210" fill="#07182e" />
                  <g
                    fill="none"
                    stroke="#306ca9"
                    strokeWidth="1.5"
                    opacity=".7"
                  >
                    <path d="M-10 60C55 15 120 90 172 57S288 33 410 60" />
                    <path d="M-10 90C55 45 120 120 172 87S288 63 410 90" />
                    <path d="M-10 120C55 75 120 150 172 117S288 93 410 120" />
                    <path d="M-10 150C55 105 120 180 172 147S288 123 410 150" />
                  </g>
                  <path
                    d="M65 152 133 75 220 121 309 68 363 149"
                    stroke="#6faef7"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="6 6"
                  />
                  <g fill="#bbecff">
                    <circle cx="65" cy="152" r="7" />
                    <circle cx="133" cy="75" r="7" />
                    <circle cx="220" cy="121" r="7" />
                    <circle cx="309" cy="68" r="7" />
                    <circle cx="363" cy="149" r="7" />
                  </g>
                  <circle
                    cx="220"
                    cy="121"
                    r="25"
                    stroke="#70b6ff"
                    fill="none"
                    opacity=".4"
                  />
                </svg>
              </div>
              <div className="studio-card">
                <h3>Follow civilizations and places</h3>
                <p>
                  Look at the cultures, institutions and landscapes behind the
                  story without needing to memorize an entire encyclopedia.
                </p>
                <span className="studio-text-link">
                  Browse the places archive ↗
                </span>
              </div>
            </Link>

            <Link
              href="/creators"
              className="studio-panel studio-link-card"
            >
              <div className="explore-theme-art">
                <span className="explore-tag-overlay">
                  EXP-PICK-03 · PRACTICE
                </span>
                <svg
                  viewBox="0 0 400 210"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                  aria-label="Concept placeholder: connected notes and idea cards forming a creative dependency graph."
                >
                  <rect width="400" height="210" fill="#081d3a" />
                  <path
                    d="m68 66 130 36 128-51M198 102l-85 63m85-63 128 64"
                    stroke="#357fc1"
                    strokeWidth="3"
                    fill="none"
                  />
                  <rect
                    x="35"
                    y="34"
                    width="95"
                    height="64"
                    rx="10"
                    fill="#103969"
                    stroke="#63a1e4"
                  />
                  <rect
                    x="154"
                    y="71"
                    width="96"
                    height="65"
                    rx="10"
                    fill="#15559a"
                    stroke="#92c7f9"
                  />
                  <rect
                    x="281"
                    y="25"
                    width="83"
                    height="64"
                    rx="10"
                    fill="#103969"
                    stroke="#63a1e4"
                  />
                  <rect
                    x="68"
                    y="139"
                    width="96"
                    height="53"
                    rx="10"
                    fill="#103969"
                    stroke="#63a1e4"
                  />
                  <rect
                    x="276"
                    y="141"
                    width="91"
                    height="51"
                    rx="10"
                    fill="#103969"
                    stroke="#63a1e4"
                  />
                  <g
                    stroke="#9bc7ed"
                    strokeLinecap="round"
                    strokeWidth="3"
                  >
                    <path d="M51 53h64M51 63h38M51 73h55M169 90h66M169 100h47M169 110h61M298 46h52M298 58h35M83 159h65M83 170h39M291 161h62M291 173h44" />
                  </g>
                </svg>
              </div>
              <div className="studio-card">
                <h3>Make your ideas grow together</h3>
                <p>
                  See a simple method for turning one worldbuilding decision
                  into fresh questions and next steps.
                </p>
                <span className="studio-text-link">
                  Try the Creator pathway ↗
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 06 | Small Creative Experiment */}
      <section
        id="small-experiment"
        className="studio-section studio-soft"
        aria-labelledby="experimentTitle"
      >
        <div className="studio-wrap">
          <div className="studio-panel explore-experiment-box">
            <div>
              <p className="studio-eyebrow">
                04 / Try a small thought experiment
              </p>
              <h2 id="experimentTitle">
                You don’t need a huge idea to start.
              </h2>
              <p className="mt-4">
                Imagine a town introduces a new way of sharing its memories.
                Click through what could happen next. This is a hypothetical
                exercise, not canon and not a prediction of real communities.
              </p>
              <p className="studio-small mt-4">
                A small example of the Creative Compound Machine: a decision
                changes the next set of possibilities.
              </p>
              <div className="studio-actions">
                <Link href="/creators" className="studio-button secondary">
                  Practice with your own idea <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            <ExploreCompoundExperiment />
          </div>
        </div>
      </section>

      {/* SECTION 07 | Knowledge Archives */}
      <section
        id="collections"
        className="studio-section"
        aria-labelledby="collectionsTitle"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">05 / Want more depth?</p>
            <h2 id="collectionsTitle">Everything else is still here.</h2>
            <p>
              This page is the front door, not the whole library. You can keep
              following a question or open the full archive when you’re ready.
            </p>
          </div>

          <div className="studio-panel studio-archive">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <strong className="text-white">Browse the collections</strong>
                <p className="mt-1 text-sm">
                  Organized by what you’d like to discover, not by an app
                  ecosystem.
                </p>
              </div>
              <span className="studio-badge">Deeper reading</span>
            </div>

            <div className="explore-archive-columns">
              <div>
                <h4>People, places &amp; events</h4>
                <Link href="/characters">Characters ↗</Link>
                <Link href="/places">Places ↗</Link>
                <Link href="/factions">Factions ↗</Link>
                <Link href="/cultures">Cultures ↗</Link>
                <Link href="/organizations">Organizations ↗</Link>
                <Link href="/events">Events ↗</Link>
                <Link href="/series">
                  Series · may reveal story architecture ↗
                </Link>
              </div>

              <div>
                <h4>Ideas &amp; civilizations</h4>
                <Link href="/philosophies">Philosophies ↗</Link>
                <Link href="/principles">Principles ↗</Link>
                <Link href="/laws">Laws ↗</Link>
                <Link href="/technologies">Technologies ↗</Link>
                <Link href="/research">Research ↗</Link>
                <Link href="/statistics">Statistics ↗</Link>
                <Link href="/myths">Myths ↗</Link>
              </div>

              <div>
                <h4>Making &amp; media</h4>
                <Link href="/items">Items ↗</Link>
                <Link href="/blog">Studio notes &amp; blog ↗</Link>
                <Link href="/music">Music ↗</Link>
                <Link href="/video">Video ↗</Link>
                <Link href="/creators">For Creators ↗</Link>
                <Link href="/readers">For Readers ↗</Link>
                <a
                  href="https://lms.reltroner.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learning portal ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08 | Community Invitation */}
      <section
        id="community"
        className="studio-section studio-soft"
        aria-labelledby="ctaTitle"
      >
        <div className="studio-wrap">
          <div className="studio-panel studio-conversation flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="studio-eyebrow">Curious minds welcome</p>
              <h2 id="ctaTitle">Found an idea worth talking about?</h2>
              <p>
                Tell me what you’re building, reading, or wondering about. A
                good question is enough to start a conversation.
              </p>
            </div>
            <div className="studio-actions mt-0">
              <Link href="/contact" className="studio-button">
                Start a conversation <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/creators" className="studio-button secondary">
                For Creators <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/readers" className="studio-button secondary">
                For Readers <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
