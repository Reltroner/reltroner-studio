'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
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
    title: 'I’m here for a story.',
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
    title: 'I love fictional civilizations.',
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
        title: 'Reltronland and Depcutland',
        desc: 'Two different institutional approaches to progress, archives and continuity.',
        type: 'Faction profiles',
        url: '/factions/depcutland',
        lore: true,
      },
    ],
  },
  {
    key: 'questions',
    title: 'I like big questions.',
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
    title: 'I’m making my own world.',
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

type LensKey = 'current' | 'backstory' | 'guide';

const readingLenses: readonly {
  key: LensKey;
  tabLabel: string;
  badge: string;
  heading: string;
  text: string;
}[] = [
  {
    key: 'current',
    tabLabel: 'Current Lore',
    badge: 'ILLUSTRATIVE · NON-CANON',
    heading: 'The choice in front of them',
    text: 'They had a place to live. They had the freedom to choose a path. But when the invitation arrived, it asked a harder question: what kind of contribution would actually feel like their own?',
  },
  {
    key: 'backstory',
    tabLabel: 'Backstory',
    badge: 'HYPOTHETICAL BACKSTORY · NON-CANON',
    heading: 'How this choice became possible',
    text: 'Generations earlier, the community had reorganized how everyday needs were met. Security increased, but there was no single agreement about the meaning of contribution. That history now shapes the person’s decision.',
  },
  {
    key: 'guide',
    tabLabel: 'World Guide',
    badge: 'HYPOTHETICAL WORLD GUIDE · NON-CANON',
    heading: 'The system behind the question',
    text: 'Material security describes access to essentials. Belonging, recognition and agency describe different relationships between people, communities and institutions. Improving one does not automatically settle the others.',
  },
] as const;

const compoundStages: readonly {
  buttonLabel: string;
  heading: string;
  text: string;
}[] = [
  {
    buttonLabel: '01. Seed',
    heading: '01 / Seed',
    text: 'A town creates a public memory garden: every resident may add one story each year.',
  },
  {
    buttonLabel: '02. Constraint',
    heading: '02 / Constraint',
    text: 'The archive has limited space. Residents must choose which memories remain public and which stay personal.',
  },
  {
    buttonLabel: '03. Interaction',
    heading: '03 / Interaction',
    text: 'A student asks why a cherished story was never recorded. The archivist and the family disagree.',
  },
  {
    buttonLabel: '04. Consequence',
    heading: '04 / Consequence',
    text: 'People begin debating who deserves to decide what represents the community’s past.',
  },
  {
    buttonLabel: '05. Changed State',
    heading: '05 / Changed State',
    text: 'A new public review practice appears. Memory-keeping is no longer just an archivist’s private task.',
  },
  {
    buttonLabel: '06. Next Question',
    heading: '06 / Next Question',
    text: 'What happens when the next generation disagrees with the stories the town chose to preserve?',
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
          <h2 id="chooseTitle">What brought you here today?</h2>
          <p>
            Choose the thing that sounds most interesting. I’ll suggest a few
            places to begin. You can change your mind at any time.
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
            This is a hand-curated guide, not a live personalized recommendation
            or full-text search engine. Some archives contain story details.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ExploreReadingLenses() {
  const [activeLensIndex, setActiveLensIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeLens = readingLenses[activeLensIndex];

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const total = readingLenses.length;
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? total - 1
          : event.key === 'ArrowLeft'
            ? (index + total - 1) % total
            : (index + 1) % total;
    setActiveLensIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="studio-panel studio-card flex flex-col justify-between">
      <div>
        <p className="studio-eyebrow">Try the reading lenses</p>
        <h3>How much context do you want?</h3>

        <div
          className="explore-lens-control"
          role="tablist"
          aria-label="Reading mode preview"
        >
          {readingLenses.map((lens, index) => {
            const isSelected = index === activeLensIndex;
            return (
              <button
                key={lens.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                id={`tab-${lens.key}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="lensPanel"
                tabIndex={isSelected ? 0 : -1}
                data-lens={lens.key}
                onClick={() => setActiveLensIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {lens.tabLabel}
              </button>
            );
          })}
        </div>

        <div
          id="lensPanel"
          role="tabpanel"
          aria-labelledby={`tab-${activeLens.key}`}
          tabIndex={0}
          aria-live="polite"
          className="explore-reading-sample"
        >
          <span id="lensLabel" className="explore-sample-tag">
            {activeLens.badge}
          </span>
          <h4 id="lensHeading">{activeLens.heading}</h4>
          <p id="lensText">{activeLens.text}</p>
        </div>
      </div>

      <div className="explore-lens-foot">
        <Link href="/readers" className="studio-text-link">
          Experience the Reader pathway <span aria-hidden="true">↗</span>
        </Link>
        <span className="studio-small">Switch without leaving this page</span>
      </div>
    </div>
  );
}

export function ExploreCompoundExperiment() {
  const [activeStage, setActiveStage] = useState(0);
  const current = compoundStages[activeStage];

  return (
    <div
      className="explore-compound"
      role="group"
      aria-label="Explore the six creative compound stages"
    >
      {compoundStages.map((stage, index) => (
        <button
          key={stage.buttonLabel}
          type="button"
          aria-pressed={activeStage === index}
          data-stage={index}
          onClick={() => setActiveStage(index)}
        >
          <span>{stage.buttonLabel}</span>
          <span aria-hidden="true">↗</span>
        </button>
      ))}

      <div className="explore-compound-output" aria-live="polite">
        <strong id="stageHeading">{current.heading}</strong>
        <p id="stageText">{current.text}</p>
      </div>
    </div>
  );
}
