import Link from 'next/link';
import HomepageCdnArt from '@/components/worldbuilding/HomepageCdnArt';
import CreativeLoop from '@/components/worldbuilding/CreativeLoop';
import ReadingPreview from '@/components/worldbuilding/ReadingPreview';
import NewsletterSection from '@/components/newsletter/NewsletterSection';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';

export const metadata = buildStandaloneMetadata({
  title: 'Connected Worlds & Creative Curiosity',
  description: 'Start with an idea worth exploring. Discover creative worldbuilding practice, the fictional world of Asthortera, and questions that connect them at Reltroner Studio.',
  pathname: '/',
  image: '/images/reltroner-studio-banner.webp',
});

export default function Home() {
  const newsletterActivationVerified =
    process.env.RESEND_NEWSLETTER_ENABLED === 'true' &&
    process.env.CLOUDFLARE_WAF_PROTECTION_VERIFIED === 'true' &&
    process.env.RESEND_HARD_STOP_VERIFIED === 'true' &&
    process.env.RESEND_UNSUBSCRIBE_VERIFIED === 'true';

  return <div className="studio-page">
    <section id="top" className="studio-hero">
      <div className="studio-wrap">
        <div className="studio-split">
          <div>
            <p className="studio-eyebrow">Creative curiosity · Worlds · Systems · Stories</p>
            <h1>What if one idea could grow into an entire world?</h1>
            <p className="studio-lead">A creative systems studio where ideas grow through choices and consequences, and where Asthortera turns those connections into stories about civilization and human life.</p>
            <div className="studio-actions">
              <Link href="/creators" className="studio-button">I build worlds </Link>
              <Link href="/readers" className="studio-button secondary">I explore worlds </Link>
            </div>
            <p className="studio-small">Start with what you love. Follow the questions. Discover what grows.</p>
          </div>
          <HomepageCdnArt asset={1} kind="hero" ratio="6 / 5" priority />
        </div>
        <div className="studio-signals"><span>Creator-led, not algorithm-led</span><span>Open to readers and worldbuilders</span><span>Built around curiosity and consequence</span></div>
      </div>
    </section>

    <section id="begin" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro">
          <p className="studio-eyebrow">Choose your way in</p>
          <h2>Two ways into Reltroner Studio.</h2>
          <p>Maybe you want to invent a new world. Maybe you want to discover one. You don’t need to understand an entire fictional universe first.</p>
        </div>
        <div className="studio-grid-two">
          <Link href="/creators" className="studio-panel studio-link-card">
            <HomepageCdnArt asset={2} kind="notebook" ratio="2 / 1" caption={false} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 850px) calc((100vw - 64px) / 2), 588px" />
            <div className="studio-card">
              <p className="studio-eyebrow">For creators · An open workshop</p>
              <h3>I love building worlds.</h3>
              <p>Got an idea you keep coming back to? Try connecting it with choices and consequences until your next question begins to emerge.</p>
              <span className="studio-text-link">See the creator method </span>
            </div>
          </Link>
          <Link href="/readers" className="studio-panel studio-link-card">
            <HomepageCdnArt asset={3} kind="city" ratio="2 / 1" caption={false} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 850px) calc((100vw - 64px) / 2), 588px" />
            <div className="studio-card">
              <p className="studio-eyebrow">For readers · A fictional world</p>
              <h3>I love exploring worlds.</h3>
              <p>Enter Asthortera through a story question, then discover the cultures, decisions, and interconnected civilizations behind it.</p>
              <span className="studio-text-link">Meet Asthortera </span>
            </div>
          </Link>
        </div>
      </div>
    </section>

    <section id="recognize" className="studio-section studio-soft">
      <div className="studio-wrap studio-split">
        <HomepageCdnArt asset={4} kind="notes" label="Concept illustration · Connected creative notes" />
        <div>
          <p className="studio-eyebrow">A question many creators recognize</p>
          <h2>Have plenty of ideas, but aren’t sure what comes next?</h2>
          <p className="studio-lead">You don’t have to know everything before you start. Sometimes the next idea is hiding in something you’ve already made.</p>
          <ol className="studio-recognition">
            {['Characters and places exist, but their choices rarely meet.', 'You’ve finished a big concept and wonder where to go next.', 'You want to keep discovering, not just adding more disconnected lore.'].map((text, index) => <li key={text}><span>0{index + 1}</span>{text}</li>)}
          </ol>
          <p className="studio-small mt-4">This is one creative approach, not a formula every artist must follow.</p>
        </div>
      </div>
    </section>

    <section id="creative-loop" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro">
          <p className="studio-eyebrow">Try the Creative Compound Machine</p>
          <h2>One idea can lead to the next.</h2>
          <p>Explore a small, non-canon example. Six connected stages show how a fictional city’s decision might become an entirely new creative question.</p>
        </div>
        <CreativeLoop compact homepageImages />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="studio-small max-w-xl">When the new question depends on the changed world, previous creative work becomes an input to what follows.</p>
          <Link href="/creators" className="studio-text-link">Try the full creator experience </Link>
        </div>
      </div>
    </section>

    <section id="asthortera" className="studio-section studio-soft">
      <div className="studio-wrap">
        <div className="studio-split">
          <div>
            <p className="studio-eyebrow">From the Studio’s imagination</p>
            <h2>Welcome to Asthortera.</h2>
            <p className="studio-lead">A fictional world where extraordinary progress doesn’t make every decision easy.</p>
            <p className="mt-4">Explore different civilizations, questions about memory and agency, and what happens when one society’s choices change another’s possibilities.</p>
            <p className="studio-small mt-4">Illustrations are concept art, not official canon imagery.</p>
            <div className="studio-actions"><Link href="/readers" className="studio-button">Discover Asthortera </Link></div>
          </div>
          <HomepageCdnArt asset={6} kind="city" label="Concept art · Not official canon imagery" />
        </div>
        <div className="studio-grid-three mt-6">
          {[
            ['Memory', 'What should a civilization remember?', 'Archives can preserve information. People still have to decide what to learn from it.'],
            ['Progress', 'When life gets easier, what matters next?', 'Material progress may change what people need, but does it settle questions about meaning and belonging?'],
            ['Agency', 'Who shapes the future?', 'Institutions may improve decisions. Their legitimacy and human consequences still matter.'],
          ].map(([tag, title, text]) => <article key={tag} className="studio-card"><p className="studio-small">{tag}</p><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>

    <section id="reading" className="studio-section">
      <div className="studio-wrap studio-split">
        <div>
          <p className="studio-eyebrow">For curious readers</p>
          <h2>A story first. The world behind it when you’re ready.</h2>
          <p className="studio-lead">Not every reader wants an encyclopedia before the story begins. Start with what is happening, then reveal the history or the world guide only when a question comes up.</p>
          <Link href="/readers" className="studio-text-link mt-4">See the full reader pathway </Link>
        </div>
        <ReadingPreview compact />
      </div>
    </section>

    <section id="explore" className="studio-section studio-soft">
      <div className="studio-wrap">
        <div id="knowledge-bridge" className="studio-panel studio-archive">
          <div className="studio-intro">
            <p className="studio-eyebrow">A more welcoming knowledge archive</p>
            <h2>Follow a question, not a wall of categories.</h2>
            <p>Start with what interests you. The full archive is still here when you want to go further.</p>
          </div>
          <div className="studio-grid-three">
            {[
              { asset: 7 as const, kind: 'city' as const, tag: 'Stories & series', title: 'Follow a story’s structure.', text: 'See how each series is shaped and which questions drive it. Series pages may reveal story details.', href: '/series', cta: 'Browse series' },
              { asset: 8 as const, kind: 'network' as const, tag: 'Creative systems', title: 'Read the principles.', text: 'See how rules, relationships and consequences can give ideas a future.', href: '/principles', cta: 'Read the principles' },
              { asset: 9 as const, kind: 'atlas' as const, tag: 'Places & cultures', title: 'Follow the world map.', text: 'Trace fictional cities, institutions, societies and their histories.', href: '/places', cta: 'Browse places' },
            ].map(item => <Link key={item.href} href={item.href} className="studio-panel studio-link-card"><HomepageCdnArt asset={item.asset} kind={item.kind} ratio="2 / 1" caption={false} sizes="(max-width: 600px) calc(100vw - 80px), (max-width: 850px) calc((100vw - 120px) / 2), 360px" /><div className="studio-card"><p className="studio-eyebrow">{item.tag}</p><h3>{item.title}</h3><p>{item.text}</p><span className="studio-text-link">{item.cta} </span></div></Link>)}
          </div>
          <Link href="/explore#collections" className="studio-text-link mt-5">Browse all 20 knowledge collections on Explore </Link>
        </div>
      </div>
    </section>

    <section id="studio-notes" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro">
          <p className="studio-eyebrow">Notes from the Studio</p>
          <h2>A little more of what’s behind the worlds.</h2>
          <p>Two starting points from the existing Reltroner archive, one about the creative process, another about building interconnected civilizations.</p>
        </div>
        <div className="studio-grid-two">
          {[
            ['Creative practice', 'Creative Lore Bible', 'Explore how organizing a growing fictional project can make its relationships easier to revisit.', '/blog/creative-lore-bible', 'Read the creator note'],
            ['Worldbuilding and systems', 'Civilizational Systems Worldbuilding', 'See how culture, institutions, and decisions can be treated as interacting parts of a living fictional world.', '/principles/civilizational-systems-worldbuilding-asthortera', 'Read the framework'],
          ].map(([tag, title, text, href, cta]) => <article key={href} className="studio-card"><p className="studio-eyebrow">{tag}</p><h3>{title}</h3><p>{text}</p><Link href={href} className="studio-text-link">{cta} </Link></article>)}
        </div>
      </div>
    </section>

    <section id="conversation" className="studio-section studio-soft">
      <div className="studio-wrap">
        <div className="studio-panel studio-conversation studio-split studio-reverse">
          <div>
            <p className="studio-eyebrow">Conversation before promotion</p>
            <h2>What’s a worldbuilding question you keep returning to?</h2>
            <p>Maybe it’s a rule your characters disagree with, a city with a strange tradition, or a future you wish you could explore. I’d love to hear what makes you curious.</p>
            <div className="studio-actions"><Link href="/contact" className="studio-button secondary">Share a Thought </Link></div>
          </div>
          <HomepageCdnArt asset={10} kind="conversation" label="Concept illustration · Creative conversation" />
        </div>
      </div>
    </section>

    <section id="about" className="studio-section">
      <div className="studio-wrap studio-split">
        <HomepageCdnArt asset={11} kind="desk" label="Concept illustration · A creator’s workbench" />
        <div>
          <p className="studio-eyebrow">Behind Reltroner Studio</p>
          <h2>I make the kind of worlds I’d want to explore.</h2>
          <p className="studio-lead">The studio brings together systemic creative design, software engineering, and the habit of learning as I go. Curiosity leads to research; research opens new directions for the fiction.</p>
          <p className="mt-4">This is an ongoing independent creative project, shared so readers and fellow worldbuilders can follow the questions too.</p>
          <div className="studio-actions"><Link href="/about" className="studio-button secondary">Meet the studio </Link></div>
          <p id="selected-work" className="studio-small mt-5 scroll-mt-24">For professional context, <Link href="/about#selected-work" className="studio-text-link">view learning certificates and workshop participation </Link>.</p>
        </div>
      </div>
    </section>
    <div className="studio-section"><div className="studio-wrap"><NewsletterSection activationVerified={newsletterActivationVerified} /></div></div>
  </div>;
}
