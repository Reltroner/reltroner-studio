import Link from 'next/link';
import ConceptArt from '@/components/worldbuilding/ConceptArt';
import ReadingPreview from '@/components/worldbuilding/ReadingPreview';
import ReaderConnections from '@/components/worldbuilding/ReaderConnections';
import ReaderScales from '@/components/worldbuilding/ReaderScales';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';

export const metadata = buildStandaloneMetadata({
  title: 'For Readers | Discover Asthortera',
  description: 'A spoiler-light introduction to Asthortera: one fictional planet, many civilizations, and stories about choices that progress cannot answer for us.',
  pathname: '/readers',
  image: '/images/reltroner-studio-banner.webp',
});

export default function ReaderStartPage() {
  return <div id="reader-start-content" className="studio-page">
    <section id="reader-orientation" className="studio-hero">
      <div className="studio-wrap">
        <nav className="studio-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">For Readers</span></nav>
        <div className="studio-split">
          <div>
            <p className="studio-eyebrow">For readers · Discover Asthortera</p>
            <h1>What if a better world still had difficult choices?</h1>
            <p className="studio-lead">Welcome to Asthortera: one fictional planet, many distinct civilizations, and stories about what people do when progress doesn’t answer every question.</p>
            <p className="mt-5">Fictional worlds give us room to wonder, ask honest questions, and imagine how life could feel under different conditions. Begin with a moment, not an encyclopedia, and explore the world at your own pace.</p>
            <div className="studio-actions"><Link href="#story" className="studio-button">Try a story preview ↓</Link><Link href="#reader-observatory" className="studio-button secondary">Explore the connected world ↗</Link></div>
            <p className="studio-small">Spoiler-light introduction · Fictional world · No account required</p>
          </div>
          <ConceptArt kind="city" label="Concept art · Inhabited future, not canon art" ratio="6 / 5" />
        </div>
      </div>
    </section>

    <section id="story" className="studio-section studio-soft">
      <div className="studio-wrap studio-split">
        <div><p className="studio-eyebrow">Experience the story · Reader-first</p><h2>A story first. The world behind it when you’re ready.</h2><p className="studio-lead">A researcher spots a problem on the eve of an observatory’s opening. Does she speak up when everyone is counting on her team?</p><p className="mt-5">Begin with her choice in Current Lore. Open Backstory for what makes it difficult, or World Guide for the rules that shape the response.</p><p className="studio-small mt-5">This short hypothetical scene is not a published chapter or an Asthortera canon event.</p></div>
        <ReadingPreview />
      </div>
    </section>

    <section id="reader-observatory" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">The world is interconnected</p><h2>One project. Four different contributions.</h2><p>Behind the researcher’s choice is a shared project. This hypothetical orbital observatory shows how separate civilizations could each contribute to one goal, and why a single warning affects all of them. It is a worldbuilding example, not an official story event.</p></div>
        <ReaderConnections />
      </div>
    </section>

    <section id="belonging" className="studio-section studio-soft">
      <div className="studio-wrap studio-split">
        <ConceptArt kind="city" label="Concept art · Human agency and belonging · Non-canon" ratio="3 / 2" />
        <div><p className="studio-eyebrow">Life inside the system</p><h2>What does belonging mean when basic needs are secure?</h2><p className="studio-lead">Asthortera’s advanced civilizations open questions that remain personal: What should I contribute? Who recognizes my work? Which institutions deserve my trust?</p><p className="mt-5">Abundance can change the conditions of a life. It does not automatically answer how someone wants to live it.</p><p className="mt-5">A reader doesn’t need to understand every institution to care about the person facing a choice.</p><p className="studio-small mt-5">A hypothetical human perspective. No named character or fictional event is being added to canon.</p></div>
      </div>
    </section>

    <section id="scale" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">Change the lens</p><h2>Small choices. Wider consequences. No forced complexity.</h2><p>Explore the same thought experiment at three scales: a person, a community and interconnected civilizations. Each is meaningful on its own.</p></div>
        <ReaderScales />
      </div>
    </section>

    <section id="reader-depth" className="studio-section studio-soft">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">Spoiler-aware by design</p><h2>You decide how deep to go.</h2><p>Stay with the questions on this page, or open more of the archive when you’re comfortable encountering named lore, story structure, and possible spoilers.</p></div>
        <div className="studio-grid-three">
          {[
            ['Spoiler-light', 'Stay with the big picture', 'Keep exploring human questions and interconnected possibilities without opening deeper canon or major story details.', '#reader-orientation', 'Back to the introduction ↑'],
            ['Contains lore', 'Get to know the world’s vocabulary', 'The Asthortera glossary contains named concepts and world rules. It is not spoiler-free.', '/blog/asthortera-glossary', 'Explore glossary ↗'],
            ['Story information', 'Discover The Abyss of Comfort', 'A public reference describing the series’ narrative architecture: its seasons, characters and causal structure. It contains substantial spoilers and is not a released novel, chapter or season.', '/series/the-abyss-of-comfort', 'Read the series reference ↗'],
          ].map(([tag, title, text, href, cta], index) => <article key={tag} className="studio-card flex flex-col"><p className="studio-eyebrow">0{index + 1} / {tag}</p><h3>{title}</h3><p id={'reader-warning-' + index} className="mb-6 grow">{text}</p><Link href={href} aria-describedby={'reader-warning-' + index} className={index === 0 ? 'studio-button' : 'studio-button secondary'}>{cta}</Link></article>)}
        </div>
        <p className="studio-small mt-5">Reference pages describe worldbuilding and narrative plans. They do not provide unpublished chapters or establish that planned seasons have been released.</p>
      </div>
    </section>

    <section id="discover" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">Explore by curiosity</p><h2>What would you like to learn about next?</h2><p>The archive is large. You don’t need to start with a full directory, pick one kind of question.</p></div>
        <div className="studio-grid-three">
          {[
            { kind: 'city' as const, tag: 'Places & everyday life', title: 'How would people actually live here?', text: 'Explore cities, geography and the way a setting shapes everyday decisions.', href: '/places', cta: 'Explore places' },
            { kind: 'network' as const, tag: 'Institutions & relationships', title: 'Who makes the rules and why?', text: 'Discover groups, alliances and the pressures that create difficult decisions.', href: '/factions', cta: 'Explore factions' },
            { kind: 'atlas' as const, tag: 'History & consequences', title: 'What happened before this moment?', text: 'Follow historical context and see how previous changes continue to matter.', href: '/events', cta: 'Explore events' },
          ].map(item => <Link key={item.href} href={item.href} className="studio-panel studio-link-card"><ConceptArt kind={item.kind} ratio="16 / 9" caption={false} /><div className="studio-card"><p className="studio-eyebrow">{item.tag}</p><h3>{item.title}</h3><p>{item.text}</p><span className="studio-text-link">{item.cta} ↗</span></div></Link>)}
        </div>
        <Link href="/explore#collections" className="studio-text-link mt-5">Explore all public knowledge collections →</Link>
      </div>
    </section>

    <section id="continue" className="studio-section studio-soft">
      <div className="studio-wrap studio-panel studio-conversation studio-split studio-reverse">
        <div><p className="studio-eyebrow">Curiosity is welcome here</p><h2>What kind of fictional world would you want to explore?</h2><p>Whether you’re here for an interesting story, a difficult question, or your own creative ideas, there is more to explore. You don’t need to join a membership or book a session to start.</p><div className="studio-actions"><Link href="/contact" className="studio-button">Share a thought ↗</Link><Link href="/creators" className="studio-button secondary">I build worlds too ↗</Link></div><p className="studio-small">Share a question by email when you like. Replies depend on availability; paid mentorship and live chat are not currently offered.</p></div>
        <ConceptArt kind="conversation" label="Concept illustration · No real community members depicted" />
      </div>
    </section>
  </div>;
}
