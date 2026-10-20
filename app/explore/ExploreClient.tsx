'use client';

import { useState } from 'react';
import Link from 'next/link';

type TrackKey = 'stories' | 'worlds' | 'questions' | 'making';

interface TrackCard {
  title: string;
  desc: string;
  type: string;
  url: string;
  lore: boolean;
}

interface TrackData {
  key: TrackKey;
  title: string;
  subtitle: string;
  eyebrow: string;
  heading: string;
  description: string;
  cards: readonly TrackCard[];
}

const tracks: readonly TrackData[] = [
  {
    key: 'stories',
    title: 'What would you choose?',
    subtitle: 'Characters, choices, and the worlds they change.',
    eyebrow: 'FOR THE STORY-CURIOUS',
    heading: 'Start with the experience, not the encyclopedia.',
    description:
      'Follow the people, choices and unanswered questions first. The deeper narrative architecture is always optional.',
    cards: [
      {
        title: 'A gentle introduction to Asthortera',
        desc: 'What is this world, and why do its people still face difficult choices?',
        type: 'Reader path',
        url: '/readers',
        lore: false,
      },
      {
        title: 'Meet some of the people',
        desc: 'Explore the character collection once you want to know who lives in this universe.',
        type: 'Character archive',
        url: '/characters',
        lore: true,
      },
      {
        title: 'The Abyss of Comfort',
        desc: 'The ongoing master series architecture. It contains substantial narrative information and forward-development structure.',
        type: 'Story architecture',
        url: '/series/the-abyss-of-comfort',
        lore: true,
      },
    ],
  },
  {
    key: 'worlds',
    title: 'How do civilizations shape daily life?',
    subtitle: 'Places, cultures, institutions, and history.',
    eyebrow: 'FOR WORLD EXPLORERS',
    heading: 'Every civilization has a different way of seeing the world.',
    description:
      'Begin with places and their people. Open national profiles only when you feel ready for more detail.',
    cards: [
      {
        title: 'Start with a reader-friendly world overview',
        desc: 'Understand why Asthortera has so many connected, distinct civilizations.',
        type: 'Reader path',
        url: '/readers',
        lore: false,
      },
      {
        title: 'Browse places',
        desc: 'Find locations without having to start with a full chronology.',
        type: 'Place archive',
        url: '/places',
        lore: false,
      },
      {
        title: 'Depcutland: memory and continuity',
        desc: 'Explore one civilization’s approach to archives, memory and continuity.',
        type: 'Faction profiles',
        url: '/factions/depcutland',
        lore: true,
      },
    ],
  },
  {
    key: 'questions',
    title: 'What gives progress meaning?',
    subtitle: 'Progress, memory, agency, and meaning.',
    eyebrow: 'FOR CURIOUS THINKERS',
    heading: 'Sometimes the most interesting part is the question.',
    description:
      'Explore what progress, memory, agency, and shared responsibility might mean in a different kind of world.',
    cards: [
      {
        title: 'What happens after abundance?',
        desc: 'A gentle thought experiment about participation and belonging in a more secure society.',
        type: 'Reader perspective',
        url: '/readers',
        lore: false,
      },
      {
        title: 'Browse philosophies',
        desc: 'See how the world’s ideas are organized in the public collection.',
        type: 'Ideas archive',
        url: '/philosophies',
        lore: false,
      },
      {
        title: 'Explore foundational principles',
        desc: 'Discover deeper structures, world rules and conceptual doctrine.',
        type: 'Deep knowledge',
        url: '/principles',
        lore: true,
      },
    ],
  },
  {
    key: 'making',
    title: 'How can one idea generate the next?',
    subtitle: 'Turn loose ideas into something that keeps growing.',
    eyebrow: 'FOR WORLD-MAKERS',
    heading: 'Make something you would genuinely love to explore.',
    description:
      'You can start from curiosity, then use constraints and consequences to give your ideas somewhere to go.',
    cards: [
      {
        title: 'Try the Creative Compound Machine',
        desc: 'Learn a six-stage way to make one idea become useful input for the next.',
        type: 'Creator workshop',
        url: '/creators',
        lore: false,
      },
      {
        title: 'Meet the practice behind Reltroner Studio',
        desc: 'Why I combine structural creativity, software and reflection in my own work.',
        type: 'Studio story',
        url: '/about',
        lore: false,
      },
      {
        title: 'Browse studio notes',
        desc: 'Explore public notes, essays and documentation when you want more context.',
        type: 'Studio archive',
        url: '/blog',
        lore: true,
      },
    ],
  },
] as const;

function TrackIcon({ trackKey }: { trackKey: TrackKey }) {
  if (trackKey === 'stories') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 5c3-1 5-.6 8 1.5C15 4.4 18 4 20 5v14c-3-1-5-.5-8 1.5C9 18.5 7 18 4 19zM12 6.5V20" />
      </svg>
    );
  }
  if (trackKey === 'worlds') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18" />
      </svg>
    );
  }
  if (trackKey === 'questions') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9 9a3 3 0 0 1 6 0c0 3-3 3-3 6M12 19h.01" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 20h16M5 16l11-11 3 3-11 11-4 1zM14 7l3 3M6 4l1 2M20 15l-2 1" />
    </svg>
  );
}

export function ExploreCuriositySection() {
  const [selectedTrack, setSelectedTrack] = useState<TrackKey>('stories');
  const [allowLore, setAllowLore] = useState(false);

  const activeTrack =
    tracks.find((item) => item.key === selectedTrack) ?? tracks[0];
  const visibleCards = activeTrack.cards.filter(
    (card) => !card.lore || allowLore
  );

  return (
    <section
      id="choose"
      className="studio-section"
      aria-labelledby="chooseTitle"
    >
      <div className="studio-wrap">
        <div className="studio-intro">
          <p className="studio-eyebrow">01 / Your curiosity first</p>
          <h2 id="chooseTitle">Start with a question.</h2>
          <p>
            Pick the question closest to what you’re curious about. Each one
            suggests gentle starting points first; deeper reference pages
            appear only when you turn on the lore switch.
          </p>
        </div>

        <div
          className="explore-entry-grid"
          role="group"
          aria-label="Choose a topic to explore"
        >
          {tracks.map((item) => {
            const isActive = item.key === selectedTrack;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={isActive}
                data-track={item.key}
                onClick={() => setSelectedTrack(item.key)}
                className="studio-card studio-choice explore-entry-btn"
              >
                <span className="explore-entry-active" aria-hidden="true">
                  {isActive ? 'SELECTED' : ''}
                </span>
                <span className="explore-entry-icon" aria-hidden="true">
                  <TrackIcon trackKey={item.key} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </div>
              </button>
            );
          })}
        </div>

        <div
          id="guidedResults"
          className="studio-panel explore-results"
          aria-live="polite"
        >
          <div className="explore-results-top">
            <div>
              <p id="resultEyebrow" className="studio-eyebrow mb-2">
                {activeTrack.eyebrow}
              </p>
              <h3 id="resultHeading">{activeTrack.heading}</h3>
              <p id="resultDescription" className="mt-2">
                {activeTrack.description}
              </p>
            </div>
            <span id="resultPill" className="studio-badge shrink-0">
              Curated route
            </span>
          </div>

          <div className="explore-spoiler-switch">
            <label htmlFor="allowLore">
              <input
                id="allowLore"
                type="checkbox"
                checked={allowLore}
                onChange={(event) => setAllowLore(event.target.checked)}
              />
              <span>
                I’m comfortable opening deeper lore and story-architecture pages
              </span>
            </label>
            <small>
              {allowLore
                ? 'Showing deeper lore & story-architecture destinations'
                : 'Off by default · Spoiler-aware'}
            </small>
          </div>

          <div id="resultCards" className="explore-result-grid">
            {visibleCards.map((card) => (
              <article
                key={card.url + card.title}
                data-lore={card.lore ? 'true' : 'false'}
                className="explore-result-card"
              >
                <div className="explore-result-pills">
                  <span className="studio-badge">{card.type}</span>
                  {card.lore ? (
                    <span className="explore-pill-warn">May contain lore</span>
                  ) : null}
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
                <Link href={card.url} className="studio-text-link mt-auto">
                  Explore this →
                </Link>
              </article>
            ))}
          </div>

          <p className="studio-small mt-5">
            Suggestions are selected by the Studio. Deeper reference pages may
            include story details.
          </p>
        </div>
      </div>
    </section>
  );
}
