import type { Metadata } from 'next';
import Link from 'next/link';
import SelectedWorkShowcase from '@/components/ecosystem/SelectedWorkShowcase';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildStandaloneMetadata({
  title: 'About | The Story Behind Reltroner Studio',
  description:
    'About Reltroner Studio | an independent creative systems studio exploring stories, worldbuilding, systemic creative design, and how one idea can lead to another.',
  pathname: '/about',
  image: '/images/logo.webp',
});

const capabilities = [
  {
    num: '01 / IMAGINE',
    title: 'Systemic structural creative design',
    body: 'I explore how characters, places, institutions and decisions affect one another. The goal isn’t to build the largest world. It’s to make a world that can keep changing for meaningful reasons.',
  },
  {
    num: '02 / BUILD',
    title: 'Software engineering',
    body: 'Websites, archives and small interactive tools make complex ideas easier to explore. The technology should serve the story or the creator, not become the reason the studio exists.',
  },
  {
    num: '03 / GROW',
    title: 'Self-improvement',
    body: 'Research, reflection and honest correction help me make better decisions over time. I want creative work to stay personally meaningful, even when a project gets difficult.',
  },
] as const;

const studioPrinciples = [
  {
    num: '01',
    title: 'Curiosity before performance.',
    body: 'Begin with something you’re genuinely interested in, not only the reaction you hope to get.',
  },
  {
    num: '02',
    title: 'Consequences over collections.',
    body: 'More lore doesn’t always mean a richer world. Let one event change what comes after it.',
  },
  {
    num: '03',
    title: 'Learning is part of making.',
    body: 'Not knowing something can be a reason to research, test and come back with a better idea.',
  },
  {
    num: '04',
    title: 'Creators keep their agency.',
    body: 'Frameworks should help people make their own decisions not replace their imagination.',
  },
  {
    num: '05',
    title: 'Honesty beats the big claim.',
    body: 'Separate what exists, what is in progress, and what still needs to be tested with other people.',
  },
  {
    num: '06',
    title: 'Make room to enjoy it.',
    body: 'A sustainable creative practice matters. No method can guarantee motivation, fan growth, or prevent burnout.',
  },
] as const;

const founderJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rei Reltroner',
  alternateName: 'Raidan',
  url: 'https://www.reltroner.com/about',
  worksFor: {
    '@type': 'Organization',
    name: 'Reltroner Studio',
    url: 'https://www.reltroner.com',
  },
  jobTitle: 'Founder & System Architect',
  description:
    'Founder of Reltroner Studio, focused on systemic creative design, software engineering, and narrative worldbuilding.',
};

const aboutScopedCss = `
#about-page-content .about-hero-artboard {
  position: relative;
  margin: 0;
  border: 1px solid var(--rs-border-strong);
  border-radius: var(--rs-radius-panel);
  background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--rs-accent-strong) 40%, transparent) 0%, var(--rs-bg-panel-strong) 55%, var(--rs-bg-deep) 100%);
  padding: 16px;
  overflow: hidden;
}
#about-page-content .about-art-tag {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 2;
  padding: 6px 10px;
  border: 1px solid var(--rs-border-strong);
  border-radius: 8px;
  background: color-mix(in srgb, var(--rs-bg-deep) 82%, transparent);
  color: var(--color-blue-200);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
#about-page-content .about-art-caption {
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 2;
  padding: 6px 10px;
  border: 1px solid var(--rs-border-muted);
  border-radius: 8px;
  background: color-mix(in srgb, var(--rs-bg-deep) 85%, transparent);
  color: var(--rs-text-muted);
  font-size: 0.65rem;
}
#about-page-content .about-hero-ribbon {
  position: absolute;
  left: 18px;
  bottom: 18px;
  z-index: 2;
  padding: 8px 12px;
  border: 1px solid var(--rs-border-strong);
  border-radius: 10px;
  background: var(--rs-bg-panel-strong);
  color: var(--color-blue-200);
  font-size: 0.7rem;
  font-weight: 600;
}
#about-page-content .about-pullquote {
  margin-top: 28px;
  border-left: 3px solid var(--color-blue-400);
  padding: 6px 0 6px 20px;
  color: var(--rs-text-primary);
  font-family: var(--font-display), sans-serif;
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.03em;
}
#about-page-content .about-story-marker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  font-size: 0.78rem;
  color: var(--rs-text-muted);
}
#about-page-content .about-story-marker span {
  display: block;
  width: 26px;
  height: 1px;
  background: var(--color-blue-400);
}
#about-page-content .about-motive-visual {
  position: relative;
  min-height: 290px;
  margin: 0;
  padding: 22px;
  border: 1px solid var(--rs-border-strong);
  border-radius: var(--rs-radius-card);
  background: radial-gradient(circle at 72% 32%, color-mix(in srgb, var(--rs-accent-strong) 38%, transparent), transparent 45%), var(--rs-bg-panel-strong);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
#about-page-content .about-motive-visual svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
#about-page-content .about-motive-caption {
  position: relative;
  z-index: 2;
  max-width: 240px;
  color: var(--rs-text-primary);
  font-family: var(--font-display), sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
}
#about-page-content .about-path-visual {
  position: relative;
  aspect-ratio: 9 / 4;
  border-bottom: 1px solid var(--rs-border-muted);
  background: radial-gradient(circle at 55% 70%, color-mix(in srgb, var(--rs-accent-strong) 42%, transparent), var(--rs-bg-panel-strong) 70%);
  overflow: hidden;
}
#about-page-content .about-path-visual svg {
  width: 100%;
  height: 100%;
  display: block;
}
#about-page-content .about-principle-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}
#about-page-content .about-principle {
  border-top: 1px solid var(--rs-border-strong);
  padding: 22px 10px 20px 0;
}
#about-page-content .about-principle-num {
  color: var(--color-blue-300);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  margin-bottom: 14px;
  font-family: var(--font-mono), monospace;
}
#about-page-content .about-principle p {
  margin-top: 12px;
  font-size: 0.9rem;
}
#about-page-content .about-people-card {
  display: grid;
  grid-template-columns: minmax(0, 4.6fr) minmax(0, 7.4fr);
  overflow: hidden;
}
#about-page-content .about-portrait {
  position: relative;
  min-height: 360px;
  border-right: 1px solid var(--rs-border-muted);
  background: radial-gradient(circle at 50% 31%, color-mix(in srgb, var(--rs-accent-strong) 40%, transparent) 0%, var(--rs-bg-panel-strong) 55%, var(--rs-bg-deep) 100%);
  display: grid;
  place-items: center;
  padding: 24px;
}
#about-page-content .about-portrait svg {
  width: 84%;
  max-width: 300px;
  height: auto;
}
#about-page-content .about-person-copy {
  padding: 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#about-page-content .about-person-copy p + p {
  margin-top: 14px;
}
#about-page-content .about-person-meta {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--rs-border-muted);
  font-size: 0.8rem;
  color: var(--rs-text-muted);
}
#about-page-content .about-origin-note {
  margin-top: 24px;
  padding: 28px;
  border: 1px solid var(--rs-border-muted);
  border-radius: var(--rs-radius-card);
  background: var(--rs-card-bg);
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
#about-page-content .about-phase-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-blue-200);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}
#about-page-content .about-phase-indicator span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-blue-400);
}
@media (max-width: 850px) {
  #about-page-content .about-principle-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  #about-page-content .about-people-card {
    grid-template-columns: 1fr;
  }
  #about-page-content .about-portrait {
    border-right: 0;
    border-bottom: 1px solid var(--rs-border-muted);
    min-height: 280px;
  }
}
@media (max-width: 600px) {
  #about-page-content .about-hero-ribbon {
    display: none;
  }
  #about-page-content .about-principle-grid {
    grid-template-columns: 1fr;
  }
  #about-page-content .about-person-copy {
    padding: 24px;
  }
  #about-page-content .about-origin-note {
    flex-direction: column;
    padding: 22px;
  }
}
`;

export default function AboutPage() {
  return (
    <div id="about-page-content" className="studio-page">
      <style>{aboutScopedCss}</style>

      {/* Section 01 | Curiosity-First Hero */}
      <section id="top" className="studio-hero" aria-labelledby="hero-title">
        <div className="studio-wrap">
          <nav className="studio-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">About</span>
          </nav>
          <div className="studio-split">
            <div>
              <p className="studio-eyebrow">The story behind Reltroner Studio</p>
              <h1 id="hero-title">
                A world begins with{' '}
                <span className="text-[var(--color-blue-300)]">a question</span>{' '}
                you can’t let go of.
              </h1>
              <p className="studio-lead">
                I started Reltroner Studio to build the worlds I wanted to
                explore—and developed a creative method so those worlds could
                keep generating meaningful possibilities. Imagination is a gift;
                software and continuous learning help me share what grows from it.
              </p>
              <p className="mt-4 text-sm text-[var(--rs-text-muted)]">
                If you love making worlds, getting lost in fictional
                civilizations, or just asking “what if?”, you’re in the right
                place.
              </p>
              <div className="studio-actions">
                <Link href="#our-story" className="studio-button">
                  Read our story ↓
                </Link>
                <Link href="/readers" className="studio-button secondary">
                  Explore Asthortera ↗
                </Link>
              </div>
              <div className="studio-signals">
                <span>Independent creative studio</span>
                <span>Worlds, stories &amp; systems</span>
                <span>Curious minds welcome</span>
              </div>
            </div>

            <figure
              className="about-hero-artboard"
              role="img"
              aria-label="Non-canon concept illustration: a creative notebook connecting with a distant speculative city and orbiting worlds"
            >
              <span className="about-art-tag">THE WORLD THAT GROWS</span>
              <svg
                viewBox="0 0 690 640"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="about-halo">
                    <stop stopColor="#215DAD" stopOpacity=".9" />
                    <stop offset="1" stopColor="#0B2550" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="about-sky" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#092B5F" />
                    <stop offset="1" stopColor="#5F9DE7" />
                  </linearGradient>
                  <linearGradient id="about-paper" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#183A69" />
                    <stop offset="1" stopColor="#0B2145" />
                  </linearGradient>
                </defs>
                <circle cx="430" cy="232" r="245" fill="url(#about-halo)" />
                <circle
                  cx="434"
                  cy="239"
                  r="178"
                  fill="none"
                  stroke="#5DA4F2"
                  strokeOpacity=".24"
                  strokeWidth="1.5"
                />
                <circle
                  cx="434"
                  cy="239"
                  r="130"
                  fill="none"
                  stroke="#6AA8EB"
                  strokeOpacity=".2"
                />
                <path
                  d="M200 240C305 45 571 73 624 223"
                  fill="none"
                  stroke="#B3D5FF"
                  strokeOpacity=".34"
                  strokeDasharray="3 9"
                />
                <circle
                  cx="457"
                  cy="208"
                  r="120"
                  fill="url(#about-sky)"
                  opacity=".82"
                />
                <circle
                  cx="457"
                  cy="208"
                  r="122"
                  stroke="#C5E5FF"
                  strokeOpacity=".55"
                  fill="none"
                  strokeWidth="1.6"
                />
                <path d="M352 255h206v52H350Z" fill="#0A2451" />
                <path
                  d="M361 255v-65l17-29 16 31v63M397 255v-105l17-24 15 24v105M430 255v-80l17-29 20 29v80M471 255v-122l19-28 18 28v122M509 255v-64l18-21 18 21v64"
                  fill="#071B3D"
                  stroke="#9DCBFE"
                  strokeOpacity=".54"
                  strokeWidth="1.4"
                />
                <path d="M350 256h209" stroke="#8AD1FF" strokeOpacity=".74" />
                <path
                  d="M376 179h4M411 171h5M445 188h4M491 152h4M526 211h4"
                  stroke="#B4E1FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx="171"
                  cy="145"
                  r="50"
                  fill="#163D7C"
                  stroke="#7BAAE1"
                  strokeWidth="1.2"
                />
                <path
                  d="M133 135c20-14 33 16 48-2 19-21 27-2 32 12M141 159c23 12 33-16 52-10"
                  fill="none"
                  stroke="#90C6F0"
                  strokeOpacity=".54"
                  strokeWidth="8"
                />
                <circle cx="610" cy="90" r="17" fill="#B7DFFF" opacity=".7" />
                <circle cx="598" cy="364" r="11" fill="#B7DFFF" opacity=".56" />
                <g fill="#D5ECFF">
                  <circle cx="310" cy="94" r="2" />
                  <circle cx="280" cy="212" r="2" />
                  <circle cx="565" cy="89" r="2" />
                  <circle cx="615" cy="285" r="2" />
                </g>
                <path
                  d="M125 407c40-40 95-60 152-62M327 356c55 7 83 26 110 65"
                  stroke="#7DAFF4"
                  strokeWidth="2"
                  strokeOpacity=".55"
                  fill="none"
                  strokeDasharray="8 8"
                />
                <circle cx="278" cy="346" r="6" fill="#AEDBFF" />
                <circle cx="438" cy="420" r="6" fill="#AEDBFF" />
                <path
                  d="M80 435 287 396l172 54-216 56Z"
                  fill="#0D2B57"
                  stroke="#8CB9EF"
                  strokeOpacity=".7"
                  strokeWidth="2"
                />
                <path
                  d="M80 435v55l163 68v-52M243 506v52l216-56v-52"
                  fill="#071933"
                  stroke="#587FBD"
                />
                <path
                  d="m117 437 179-20 96 26-185 35Z"
                  fill="url(#about-paper)"
                  stroke="#83B6EF"
                  strokeWidth="1.5"
                />
                <path
                  d="m143 448 104-10m-94 22 96-10m-79 21 59-7"
                  stroke="#8FC5F8"
                  strokeWidth="3"
                  strokeOpacity=".66"
                  strokeLinecap="round"
                />
                <path
                  d="m284 439 36 4m-31 5 46 3"
                  stroke="#B4DAFF"
                  strokeWidth="3"
                  strokeOpacity=".65"
                />
                <path
                  d="M402 460c-37-19-52-39-65-56m0 0c20 10 38 13 56 9m-56-9c-6 24-19 31-27 37"
                  stroke="#BBDFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M482 470l39 44 63-61"
                  stroke="#76BDFF"
                  strokeWidth="2"
                  fill="none"
                  strokeOpacity=".64"
                />
                <g
                  fontFamily="Arial,sans-serif"
                  fontWeight="700"
                  fontSize="15"
                  fill="#B4DFFF"
                  opacity=".83"
                >
                  <text x="90" y="582">
                    ONE IDEA
                  </text>
                  <text x="457" y="369">
                    MANY POSSIBILITIES
                  </text>
                </g>
                <path
                  d="m178 378-18-25 20-8 9 22 16-18 8 16-25 29Z"
                  fill="#9DC9F7"
                  stroke="#CEEAFF"
                  strokeWidth="1"
                  opacity=".9"
                />
              </svg>
              <figcaption className="about-art-caption">
                Concept illustration · Not canonical artwork
              </figcaption>
              <div className="about-hero-ribbon">
                Curiosity → Structure → Consequences → New ideas
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Section 02 | The Beginning */}
      <section
        id="our-story"
        className="studio-section"
        aria-labelledby="our-story-title"
      >
        <div className="studio-wrap studio-split items-start">
          <div>
            <p className="studio-eyebrow">01 / The beginning</p>
            <h2 id="our-story-title">
              It started with wanting to see something that wasn’t there yet.
            </h2>
          </div>
          <div>
            <p className="studio-lead mt-0">
              Have you ever finished a story and wished you could step a little
              further into its world? Find out how its cities work, why its
              people disagree, or what happened after the last page?
            </p>
            <p className="mt-4">
              That kind of curiosity is one reason I keep building Asthortera. I
              want to explore fictional civilizations where technology, culture,
              institutions and personal choices actually affect one another, not
              just exist as separate entries in an encyclopedia.
            </p>
            <p className="mt-4">
              And because I don’t know everything about those subjects, building
              the world gives me a reason to keep learning. The questions lead
              to research. Research changes the world. The world creates new
              questions.
            </p>
            <blockquote className="about-pullquote">
              “Make the kind of thing you’d love to discover and give yourself
              permission to learn while making it.”
            </blockquote>
            <div className="about-story-marker">
              <span aria-hidden="true" />
              A guiding idea, inspired by curiosity-first creative practice
            </div>
          </div>
        </div>
      </section>

      {/* Section 03 | The Realization */}
      <section
        id="realization"
        className="studio-section studio-soft"
        aria-labelledby="realization-title"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">02 / The realization</p>
            <span id="try-the-loop" className="scroll-mt-24" />
            <h2 id="realization-title">
              One idea doesn’t have to end when you’ve finished it.
            </h2>
            <p>
              At some point, I started treating worldbuilding less like
              collecting lore and more like building a living system of
              consequences.
            </p>
          </div>

          <div className="studio-grid-two">
            <figure
              className="about-motive-visual"
              role="img"
              aria-label="Concept diagram showing connected creative nodes generating new possibilities"
            >
              <span className="about-art-tag">Connected creative ideas</span>
              <svg viewBox="0 0 600 360" aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id="about-mg">
                    <stop stopColor="#3675C7" stopOpacity=".65" />
                    <stop offset="1" stopColor="#061A37" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse
                  cx="320"
                  cy="175"
                  rx="248"
                  ry="172"
                  fill="url(#about-mg)"
                />
                <g
                  stroke="#82B7F6"
                  fill="none"
                  strokeWidth="2.5"
                  opacity=".9"
                >
                  <path d="M99 236 203 126 320 182 449 87 519 204 354 271 205 288Z" />
                  <path
                    d="M203 126 205 288M320 182l34 89M449 87l-95 184M99 236l221-54M449 87l70 117"
                    strokeDasharray="6 9"
                    opacity=".66"
                  />
                </g>
                <g fill="#081F48" stroke="#B1D9FF" strokeWidth="2.8">
                  <circle cx="99" cy="236" r="19" />
                  <circle cx="203" cy="126" r="23" />
                  <circle cx="320" cy="182" r="28" />
                  <circle cx="449" cy="87" r="20" />
                  <circle cx="519" cy="204" r="23" />
                  <circle cx="354" cy="271" r="24" />
                  <circle cx="205" cy="288" r="18" />
                </g>
                <g fill="#82BEFF">
                  <circle cx="320" cy="182" r="9" />
                  <circle cx="449" cy="87" r="6" />
                  <circle cx="99" cy="236" r="6" />
                  <circle cx="354" cy="271" r="6" />
                </g>
              </svg>
              <figcaption className="about-motive-caption">
                When ideas connect, new possibilities appear.
              </figcaption>
            </figure>

            <div className="studio-card flex flex-col justify-between">
              <div>
                <p className="studio-eyebrow">Creative Compound Machine</p>
                <h3>A question becomes a decision. A decision changes a world.</h3>
                <p>
                  Instead of finishing an idea and starting from a blank page
                  again, I ask:{' '}
                  <strong className="text-white">
                    What changed because this happened?
                  </strong>
                </p>
                <p>The answer can become the beginning of something new.</p>
              </div>
              <Link href="/creators" className="studio-text-link">
                See how the creative loop works ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04 | Three Interests, One Practice */}
      <section
        id="practice"
        className="studio-section"
        aria-labelledby="practice-title"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">03 / What shapes the work</p>
            <h2 id="practice-title">Three interests. One creative practice.</h2>
            <p>
              Here’s why a worldbuilder might also care about software and why
              learning never really leaves the picture.
            </p>
          </div>
          <div className="studio-grid-three">
            {capabilities.map((item) => (
              <article key={item.num} className="studio-card">
                <p className="studio-eyebrow">{item.num}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* Section 06 | Two Ways to Explore */}
      <section
        id="pathways"
        className="studio-section"
        aria-labelledby="for-title"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">04 / Two ways to explore</p>
            <h2 id="for-title">
              There’s more than one way to belong in a fictional world.
            </h2>
            <p>
              You don’t have to be an expert or even a worldbuilder to find
              something interesting here.
            </p>
          </div>

          <div className="studio-grid-two">
            <Link
              href="/creators"
              className="studio-panel studio-link-card"
            >
              <div
                className="about-path-visual"
                role="img"
                aria-label="Concept illustration for the creator pathway"
              >
                <span className="about-art-tag">
                  For creators · Concept illustration
                </span>
                <svg viewBox="0 0 540 240" aria-hidden="true" focusable="false">
                  <defs>
                    <linearGradient id="about-pc" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#0A3671" />
                      <stop offset="1" stopColor="#04152F" />
                    </linearGradient>
                  </defs>
                  <rect width="540" height="240" fill="url(#about-pc)" />
                  <path
                    d="M85 183 219 110 364 158l91-59"
                    fill="none"
                    stroke="#8AC4FF"
                    strokeWidth="2.4"
                    strokeDasharray="6 8"
                  />
                  <g stroke="#A9D8FF" fill="#0B2C5E" strokeWidth="2">
                    <rect x="67" y="150" width="112" height="60" rx="11" />
                    <rect x="187" y="70" width="106" height="70" rx="11" />
                    <rect x="325" y="132" width="117" height="63" rx="11" />
                  </g>
                  <path
                    d="m86 167 42-8m-42 23 60-8m60-88 65-4m-65 22 44-4m93 55 68-7m-68 20 44-5"
                    stroke="#79B7FE"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="432"
                    cy="71"
                    r="25"
                    fill="#295B9C"
                    stroke="#C0E5FF"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="studio-card">
                <p className="studio-eyebrow">For creators</p>
                <h3>Have a world in your head?</h3>
                <p>
                  Start with what excites you. Learn a simple way to connect
                  ideas so your project has somewhere interesting to go next.
                </p>
                <span className="studio-text-link">
                  Explore the creator pathway ↗
                </span>
              </div>
            </Link>

            <Link
              href="/readers"
              className="studio-panel studio-link-card"
            >
              <div
                className="about-path-visual"
                role="img"
                aria-label="Concept illustration for the reader pathway"
              >
                <span className="about-art-tag">
                  For readers · Concept illustration
                </span>
                <svg viewBox="0 0 540 240" aria-hidden="true" focusable="false">
                  <rect width="540" height="240" fill="#0A2A59" />
                  <circle
                    cx="370"
                    cy="111"
                    r="102"
                    fill="#225599"
                    opacity=".6"
                  />
                  <circle
                    cx="370"
                    cy="111"
                    r="77"
                    fill="#2A67B0"
                    opacity=".5"
                  />
                  <path
                    d="M204 196V89l32-41 34 41v107m0 0v-79l25-20 26 20v79m0 0V69l30-38 32 38v127m0 0v-83l28-31 27 31v83M190 196h261"
                    fill="#051936"
                    stroke="#90C7FF"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M235 122h5m0 30h5m58-2h5m47-62h7m40 38h6"
                    stroke="#C5E7FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M128 215C227 151 356 151 464 216"
                    fill="none"
                    stroke="#7FABE5"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <div className="studio-card">
                <p className="studio-eyebrow">For readers</p>
                <h3>Wonder what a different world could reveal?</h3>
                <p>
                  Visit Asthortera, an evolving science-fantasy setting that
                  explores what progress changes, and what questions remain.
                </p>
                <span className="studio-text-link">Discover Asthortera ↗</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 07 | Studio Principles */}
      <section
        id="principles"
        className="studio-section studio-soft"
        aria-labelledby="values-title"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">05 / Studio principles</p>
            <h2 id="values-title">A few things I want to keep true.</h2>
            <p>
              These aren’t promises of perfect results. They’re the principles I
              use to guide the work and the ones I expect to keep testing.
            </p>
          </div>

          <div className="about-principle-grid">
            {studioPrinciples.map((principle) => (
              <article key={principle.num} className="about-principle">
                <div className="about-principle-num">{principle.num}</div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 08 | Meet Rei */}
      <section
        id="founder"
        className="studio-section"
        aria-labelledby="founder-title"
      >
        <div className="studio-wrap">
          <div className="studio-panel about-people-card">
            <div
              className="about-portrait"
              role="img"
              aria-label="Abstract founder illustration, not a photograph"
            >
              <svg viewBox="0 0 370 340" aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id="about-portgrad">
                    <stop stopColor="#3474C3" stopOpacity=".6" />
                    <stop offset="1" stopColor="#082448" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="180" cy="140" r="140" fill="url(#about-portgrad)" />
                <circle
                  cx="180"
                  cy="125"
                  r="61"
                  fill="#174780"
                  stroke="#7FADE3"
                  strokeWidth="2"
                />
                <path
                  d="M85 319c5-87 48-133 95-133s92 46 99 133"
                  fill="#113C73"
                  stroke="#6D9BCE"
                  strokeWidth="2"
                />
                <path d="M128 278h103" stroke="#6EA5E0" strokeWidth="1" />
                <g fill="none" stroke="#8ABCF3" strokeWidth="2" opacity=".65">
                  <circle cx="180" cy="125" r="98" strokeDasharray="3 12" />
                  <path d="m64 225 48-28m137 9 57 34m-230-165 50 37m166-15-36 21" />
                </g>
              </svg>
              <span className="about-art-caption">
                Founder illustration · Not a photograph
              </span>
            </div>

            <div className="about-person-copy">
              <p className="studio-eyebrow">06 / The person behind it</p>
              <h2 id="founder-title">Hi, I’m Rei.</h2>
              <p>
                I’m the founder of Reltroner Studio (Raidan / Rei Reltroner). I
                work across worldbuilding, systemic creative design and software
                engineering partly because I enjoy finding connections between
                things that don’t look related at first.
              </p>
              <p>
                I don’t have a finished answer to every question this studio
                explores. That’s part of the appeal. Asthortera is where I put
                difficult questions into fictional motion; the Creative Compound
                Machine is one way I organize what I learn from making it.
              </p>
              <p>
                My hope is that some of these tools and stories eventually help
                other creators keep exploring the projects that matter to them.
              </p>
              <p className="about-person-meta">
                <strong className="text-white">Rei Reltroner</strong> ·
                Independent founder &amp; creator · Creative systems + software
                engineering
              </p>
            </div>
          </div>

          <div className="about-origin-note">
            <span
              className="text-2xl text-[var(--color-blue-300)]"
              aria-hidden="true"
            >
              ✧
            </span>
            <div>
              <strong className="text-white">
                For professional context, too.
              </strong>
              <p className="mt-2 text-sm">
                Software and architecture work are part of the founder’s
                background, but this page keeps the creative studio’s purpose
                first. If you’re here for collaboration or engineering
                experience, the project archive and contact route are better
                next stops.
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <Link href="/blog/for-recruiters" className="studio-text-link">
                  Professional overview ↗
                </Link>
                <Link href="/contact" className="studio-text-link">
                  Contact the studio ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="studio-section studio-soft"><div className="studio-wrap"><SelectedWorkShowcase /></div></div>

      {/* Section 09 | What's Happening Now */}
      <section
        id="now"
        className="studio-section"
        aria-labelledby="now-title"
      >
        <div className="studio-wrap">
          <div className="studio-intro">
            <p className="studio-eyebrow">
              07 / Building in the open, with clear boundaries
            </p>
            <h2 id="now-title">
              What exists today—and what is still in development.
            </h2>
            <p>
              I’d rather be clear about what is being built than pretend
              everything is already finished.
            </p>
          </div>

          <div className="studio-grid-two">
            <article className="studio-card flex flex-col"><div className="about-phase-indicator"><span aria-hidden="true" />Available today</div><h3 className="mt-4">Creative practice you can try.</h3><p className="grow">The Creative Compound Machine demonstration, the six-field worksheet and its AI-ready Markdown export are public and free to use. Your worksheet stays in your browser.</p><Link href="/creators#notebook" className="studio-text-link">Try your own creative loop ↗</Link></article>
            <article className="studio-card flex flex-col"><div className="about-phase-indicator"><span aria-hidden="true" />Available today · Reference, not released canon</div><h3 className="mt-4">A world you can read about.</h3><p className="grow">Asthortera has public reference pages and clearly labeled hypothetical examples. The Abyss of Comfort page describes the series’ narrative architecture; it is not a released novel, chapter or season.</p><Link href="/series/the-abyss-of-comfort" className="studio-text-link">Read the series reference · Contains spoilers ↗</Link></article>
            <article className="studio-card flex flex-col"><div className="about-phase-indicator"><span aria-hidden="true" />Public prototype</div><h3 className="mt-4">Sample learning material.</h3><p className="grow">The Reltroner Learning Academy is a public design prototype with a small sample course. Sign-in, saved learner progress and its other planned features are not yet an operational production service.</p><a href="https://lms.reltroner.com/" target="_blank" rel="noopener noreferrer" className="studio-text-link">Explore the LMS prototype ↗</a></article>
            <article className="studio-card flex flex-col"><div className="about-phase-indicator"><span aria-hidden="true" />In development · Then later</div><h3 className="mt-4">Foundations first, community after.</h3><p className="grow">The current priority is bringing the learning platform and this website to an accepted production standard. Only after that does the focus shift toward learning from worldbuilding communities. Community programs or mentorship may follow later; none can be booked today.</p><Link href="/contact" className="studio-text-link">Share a question ↗</Link></article>
          </div>
        </div>
      </section>

      {/* Section 10 | Community Invitation */}
      <section
        id="community"
        className="studio-section studio-soft"
        aria-labelledby="cta-title"
      >
        <div className="studio-wrap">
          <div className="studio-panel studio-conversation text-center">
            <p className="studio-eyebrow">Where would you like to begin?</p>
            <h2 id="cta-title" className="mx-auto max-w-3xl">
              You bring the curiosity. There’s room to explore.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl">
              Whether you’re building a world of your own or looking for one
              worth getting lost in, you don’t need to understand the whole
              system before taking the first step.
            </p>
            <div className="studio-actions justify-center">
              <Link href="/creators" className="studio-button">
                I’m making something ↗
              </Link>
              <Link href="/readers" className="studio-button secondary">
                I want to explore a world ↗
              </Link>
              <Link href="/contact" className="studio-button secondary">
                Start a conversation ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify(founderJsonLd)}
      </script>
    </div>
  );
}
