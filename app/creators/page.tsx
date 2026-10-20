import Link from 'next/link';
import ConceptArt from '@/components/worldbuilding/ConceptArt';
import CreatorGoals from '@/components/worldbuilding/CreatorGoals';
import CreatorNotebook from '@/components/worldbuilding/CreatorNotebook';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';

export const metadata = buildStandaloneMetadata({
  title: 'For Creators | Keep Your World Growing',
  description: 'Build the world you wish existed. Try a six-stage creative experiment and a private local worksheet for connected worldbuilding, with no account required.',
  pathname: '/creators',
  image: '/images/reltroner-studio-banner.webp',
});

export default function CreatorStartPage() {
  return <div id="creator-start-content" className="studio-page">
    <section id="top" className="studio-hero">
      <div className="studio-wrap">
        <nav className="studio-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">For Creators</span></nav>
        <div className="studio-split">
          <div>
            <p className="studio-eyebrow">A creative practice for curious minds</p>
            <h1>Build the world you wish existed. Then see where it leads.</h1>
            <p className="studio-lead">Your imagination is worth following and you don’t need every answer before you begin. Start with something you’d love to read, draw, play, or explore, research what fascinates you as you go, and give your ideas room to grow together.</p>
            <div className="studio-actions"><Link href="#creator-loop" className="studio-button">Try the creative experiment ↗</Link><Link href="#creator-method" className="studio-button secondary">How it works ↓</Link></div>
            <p className="studio-small">Free to explore · Your ideas stay yours · No account required</p>
          </div>
          <ConceptArt kind="hero" label="Concept illustration · An idea becomes a world · Not canon" ratio="6 / 5" />
        </div>
      </div>
    </section>

    <section className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro">
          <p className="studio-eyebrow">For the kind of creator you already are</p><h2>Does this sound familiar?</h2>
          <p>You love imagining things. But sometimes keeping a project alive is harder than starting it. You might recognize one of these moments.</p>
        </div>
        <div className="studio-grid-three">
          {[
            ['The spark', 'So many ideas. Where do they connect?', 'Your characters, places, and inventions are exciting on their own, but they don’t yet shape one another.'],
            ['The pause', 'One great concept. Now what?', 'You finish the big idea and wonder how to find a meaningful next step without forcing it.'],
            ['The weight', 'More notes. Less joy.', 'Your archive keeps expanding, while the part you actually enjoy, the act of making things, gets harder to reach.'],
          ].map(([tag, title, text], index) => <article className="studio-card" key={tag}><p className="studio-eyebrow">0{index + 1} / {tag}</p><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="studio-card mt-7"><h3>What if you didn’t need to invent everything from scratch, every time?</h3><p>Creative compounding means a decision you make today can open possibilities tomorrow. It’s a practice to experiment with not a promise that creativity will never feel difficult.</p></div>
      </div>
    </section>

    <section id="creator-method" className="studio-section studio-soft">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">There’s no single right way to create</p><h2>What are you making this for?</h2><p>The same creative loop can support different goals. Pick what feels closest to you; nothing here changes your project or stores a profile.</p></div>
        <CreatorGoals />
      </div>
    </section>
    <CreatorNotebook />

    <section id="evidence" className="studio-section studio-soft">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">Proof of method / Asthortera</p><h2>See how connected ideas can shape a fictional civilization.</h2><p>Asthortera is Reltroner Studio’s original worldbuilding project. Its specialized civilizations offer a way to examine how research, industry, records, and institutions depend on one another.</p></div>
        <div className="studio-split">
          <ConceptArt kind="network" label="Concept diagram · Hypothetical, not a canon event" />
          <div>
            <p className="studio-small">Hypothetical demonstration · Do not interpret as story canon</p>
            <ol className="studio-recognition">
              {[
                ['A shared scientific question', 'Imagine a mission involving research expertise, production capability, archival continuity, and institutional cooperation.'],
                ['Different civilizations contribute', 'Astrostelia, Moreg, Depcutland, and Kalgered represent distinct areas of capability in this illustrative scenario.'],
                ['Cooperation creates new choices', 'The partnership changes responsibilities, expectations, and what people inside these systems must decide next.'],
              ].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p className="mt-3">{text}</p></div></li>)}
            </ol>
            <Link href="/readers" className="studio-text-link">Explore Asthortera from the reader’s perspective →</Link>
          </div>
        </div>
      </div>
    </section>

    <section id="curiosity" className="studio-section">
      <div className="studio-wrap studio-split studio-reverse">
        <div><p className="studio-eyebrow">Make what you wish existed</p><h2>Curiosity first. Research follows. Your work grows with you.</h2><p className="studio-lead">If you’ve ever wished a certain story, world, drawing, or game existed, that longing can be a creative starting point. Learn what you don’t yet know because you want to make something you care about, not only because an audience might approve.</p><p className="studio-small mt-5">Inspired by the creative principle discussed in Austin Kleon’s work. This is a design interpretation, not a verbatim quotation or a guarantee against burnout.</p></div>
        <ConceptArt kind="desk" label="Concept illustration · Creator-led curiosity" />
      </div>
    </section>

    <section id="next" className="studio-section studio-soft">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">Choose your next small step</p><h2>Keep creating, at your own pace.</h2><p>Learning resources are useful when they help you return to the work you enjoy. You don’t need to purchase anything to try the ideas on this page.</p></div>
        <div className="studio-grid-three">
          {[
            ['01 / Practice', 'Make another loop', 'Go back to your idea, change one condition, and notice what happens. Small experiments count.', '#notebook', 'Open your worksheet'],
            ['02 / Learn', 'Explore free learning', 'Continue with the Reltroner LMS guest-facing learning space. Actual available lessons depend on the live LMS.', 'https://lms.reltroner.com/', 'Explore LMS'],
            ['03 / Explore', 'See the creative world', 'Discover how the ideas behind this method can be applied in the worldbuilding of Asthortera.', '/readers', 'For Readers'],
          ].map(([tag, title, text, href, cta]) => <article key={tag} className="studio-card"><p className="studio-eyebrow">{tag}</p><h3>{title}</h3><p>{text}</p>{href.startsWith('http') ? <a href={href} target="_blank" rel="noopener noreferrer" className="studio-text-link">{cta} ↗</a> : <Link href={href} className="studio-text-link">{cta} ↗</Link>}</article>)}
        </div>
      </div>
    </section>

    <section id="community" className="studio-section">
      <div className="studio-wrap studio-panel studio-conversation studio-split studio-reverse">
        <div><p className="studio-eyebrow">A conversation, not a pitch</p><h2>What kind of world would you love to make?</h2><p>Maybe you’re writing your first chapter, drawing a fictional city, outlining a game, or simply imagining things because you enjoy it. You’re welcome to share a question, a creative roadblock, or an idea you’re curious about.</p><p className="studio-small">No community membership, public critique program, or paid mentorship availability is implied by this design.</p><div className="studio-actions"><Link href="/contact" className="studio-button">Start a conversation ↗</Link></div></div>
        <ConceptArt kind="conversation" label="Concept illustration · Collaborative curiosity" />
      </div>
    </section>
  </div>;
}
