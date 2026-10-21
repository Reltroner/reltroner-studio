import type { Metadata } from 'next';
import Link from 'next/link';
import ExploreAboutCdnImage from '@/components/worldbuilding/ExploreAboutCdnImage';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';
import { ExploreCuriositySection } from './ExploreClient';

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
#explore-page-content .explore-hero-svg {
  width: 100%;
  height: 100%;
  min-height: 420px;
  display: block;
}
#explore-page-content .explore-art-caption {
  padding: 12px 16px;
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
  top: 6px;
  left: 28px;
  color: var(--color-blue-200);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
#explore-page-content .explore-theme-art + .studio-card {
  position: relative;
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
#explore-page-content .explore-archive-columns h3 {
  font-family: inherit;
  line-height: inherit;
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
  #explore-page-content .explore-result-grid {
    grid-template-columns: 1fr;
  }
  #explore-page-content .explore-art-box,
  #explore-page-content .explore-hero-svg {
    min-height: 340px;
  }
}
@media (max-width: 600px) {
  #explore-page-content .explore-tag-overlay {
    left: 24px;
  }
  #explore-page-content .explore-entry-grid,
  #explore-page-content .explore-archive-columns {
    grid-template-columns: 1fr;
  }
  #explore-page-content .explore-entry-btn {
    min-height: 136px;
  }
  #explore-page-content .explore-results {
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
                Choose what interests you stories, civilizations, creative methods,
                or questions about human life. We’ll point you toward a few
                useful places to begin.
              </p>
              <div className="studio-actions">
                <Link href="#choose" className="studio-button">
                  Find my starting point <span aria-hidden="true"></span>
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

            <figure className="explore-art-box" aria-label="Connected worlds · Non-canon illustration" aria-describedby="explore-art-description">
              <ExploreAboutCdnImage asset={22} className="explore-hero-svg" priority>
                <div id="explore-art-description" className="explore-art-caption">
                  <div>
                    <strong>Many doors. One connected world.</strong>
                    <small>
                      Worldbuilding, narrative, ideas, and the people behind them.
                    </small>
                  </div>
                  <span>Explore freely</span>
                </div>
              </ExploreAboutCdnImage>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 02 & 03 | Choose Your Curiosity + Spoiler-Aware Discovery */}
      <ExploreCuriositySection />

      {/* SECTION 05 | Doors Worth Opening */}
      <section
        id="picks"
        className="studio-section"
        aria-labelledby="picksTitle"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">02 / Doors worth opening</p>
            <h2 id="picksTitle">A few places to wander.</h2>
            <p>
              Explore stays brief on purpose. The reading preview and the
              creative loop each have a full page of their own; these doors
              take you straight there.
            </p>
          </div>

          <div className="studio-grid-three">
            <Link
              href="/readers#story"
              id="reading"
              className="studio-panel studio-link-card scroll-mt-24"
            >
              <div className="explore-theme-art">
                <ExploreAboutCdnImage asset={23} />
              </div>
              <div className="studio-card">
                <span className="explore-tag-overlay">Stories & choices</span>
                <h3>Step into Asthortera</h3>
                <p>
                  Read a short hypothetical scene about one person’s choice,
                  then reveal its backstory or world context only if you want
                  it.
                </p>
                <span className="studio-text-link">
                  Try the reading preview
                </span>
              </div>
            </Link>

            <Link href="/places" className="studio-panel studio-link-card">
              <div className="explore-theme-art">
                <ExploreAboutCdnImage asset={24} />
              </div>
              <div className="studio-card">
                <span className="explore-tag-overlay">Places & civilizations</span>
                <h3>Follow civilizations and places</h3>
                <p>
                  Look at the cultures, institutions and landscapes behind the
                  story without needing to memorize an entire encyclopedia.
                </p>
                <span className="studio-text-link">
                  Browse the places archive
                </span>
              </div>
            </Link>

            <Link
              href="/creators#creator-loop"
              id="small-experiment"
              className="studio-panel studio-link-card scroll-mt-24"
            >
              <div className="explore-theme-art">
                <ExploreAboutCdnImage asset={25} />
              </div>
              <div className="studio-card">
                <span className="explore-tag-overlay">Creative practice</span>
                <h3>Make your ideas grow together</h3>
                <p>
                  Step through the six-stage creative loop, then turn your own
                  idea into an AI-ready brainstorming prompt.
                </p>
                <span className="studio-text-link">
                  Try the creative loop
                </span>
              </div>
            </Link>
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
            <p className="studio-eyebrow">03 / Want more depth?</p>
            <h2 id="collectionsTitle">Browse the knowledge collections.</h2>
            <p>
              Find all 20 public knowledge collections below. Reference pages may
              reveal named lore, history, or story architecture; choose your depth.
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
                <h3>People, places &amp; events</h3>
                <Link href="/characters">Characters </Link>
                <Link href="/places">Places </Link>
                <Link href="/factions">Factions </Link>
                <Link href="/cultures">Cultures </Link>
                <Link href="/organizations">Organizations </Link>
                <Link href="/events">Events </Link>
                <Link href="/series">
                  Series · may reveal story architecture
                </Link>
              </div>

              <div>
                <h3>Ideas &amp; civilizations</h3>
                <Link href="/philosophies">Philosophies </Link>
                <Link href="/principles">Principles </Link>
                <Link href="/laws">Laws </Link>
                <Link href="/technologies">Technologies </Link>
                <Link href="/research">Research </Link>
                <Link href="/statistics">Statistics </Link>
                <Link href="/myths">Myths </Link>
              </div>

              <div>
                <h3>Making &amp; media</h3>
                <Link href="/items">Items </Link>
                <Link href="/blog">Studio notes &amp; blog </Link>
                <Link href="/music">Music </Link>
                <Link href="/video">Video </Link>
                <Link href="/blog/for-recruiters">Professional overview </Link>
                <Link href="/blog/disclaimer">Legal disclaimer </Link>
                <Link href="/creators">For Creators </Link>
                <Link href="/readers">For Readers </Link>
                <a
                  href="https://lms.reltroner.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learning portal
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
                Start a conversation <span aria-hidden="true"></span>
              </Link>
              <Link href="/creators" className="studio-button secondary">
                For Creators <span aria-hidden="true"></span>
              </Link>
              <Link href="/readers" className="studio-button secondary">
                For Readers <span aria-hidden="true"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
