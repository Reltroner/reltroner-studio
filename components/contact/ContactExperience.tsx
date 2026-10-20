'use client';
import { useState } from 'react';
import Link from 'next/link';
import ContactInquiryForm from './ContactInquiryForm';
import { contactTopics, type ContactTopic } from './ContactIntentTabs';
import ContactNextSteps from './ContactNextSteps';
import ContactFAQ from './ContactFAQ';
import ConceptArt from '@/components/worldbuilding/ConceptArt';

export default function ContactExperience() {
  const [topic, setTopic] = useState<ContactTopic>(contactTopics[0]);
  return <div className="studio-page">
    <section className="studio-hero">
      <div className="studio-wrap studio-contact-grid">
        <div className="studio-contact-intro">
          <p className="studio-eyebrow">Reltroner Studio / Contact</p>
          <h1>What’s on your mind?</h1>
          <p className="studio-lead">Share your question, the context behind it, and what kind of outcome you’re hoping for. A short, non-confidential overview is enough. Replies are asynchronous and depend on availability.</p>
          <div className="studio-signals"><span>Email-first</span><span>No call required</span><span>No newsletter sign-up</span></div>
          <div className="studio-contact-art"><ConceptArt kind="conversation" label="Concept illustration · Exchanging ideas, not real members" /></div>
        </div>
        <div id="contact-form" className="studio-panel studio-contact-form scroll-mt-24">
          <p className="studio-eyebrow">Your conversation starts here</p>
          <h2>Send a thoughtful note.</h2>
          <p className="studio-small mt-4">Choose a topic, describe what you need and why, then send. The form shows exactly what happened to your message.</p>
          <p id="contact-mode" className="my-5 rounded-xl border border-blue-400/30 p-4 text-xs leading-6 text-blue-100">
            {process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? 'Submitting sends your inquiry directly to Web3Forms for forwarding to the Studio. Provider acceptance does not confirm inbox delivery. Contact inquiries never subscribe you to the newsletter.' : 'Local prototype. Real provider submission is disabled. Validation and preview happen on your device. Nothing is sent, uploaded, or stored. You can choose the email link to reach out yourself.'}
          </p>
          <ContactInquiryForm topic={topic} onTopicChange={setTopic} />
          <ContactNextSteps />
        </div>
      </div>
    </section>
    <section id="self-service" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">Prefer exploring on your own?</p><h2>You might find what you need here.</h2><p>Some questions become clearer when you see an example first. You can start with the work that’s already available.</p></div>
        <div className="studio-grid-three">
          {[
            ['For worldbuilders', 'Build on the idea you love.', 'Try the six-stage creative loop and worksheet before asking about method.', '/creators', 'See the creator method'],
            ['For readers', 'Get to know Asthortera.', 'Start with the world and go deeper at your own pace, without a lore exam.', '/readers', 'Meet Asthortera'],
            ['Learning', 'See the public LMS.', 'Browse the public prototype and sample learning material, or ask about something you encountered there.', 'https://lms.reltroner.com/', 'Open LMS'],
          ].map(([tag, title, text, href, cta]) => <article key={tag} className="studio-card"><p className="studio-eyebrow">{tag}</p><h3>{title}</h3><p>{text}</p><a href={href} className="studio-text-link">{cta} ↗</a></article>)}
        </div>
      </div>
    </section>
    <ContactFAQ />
    <div id="contact-closing" className="studio-wrap pb-10"><p className="studio-small">Looking for occasional Studio updates? <Link href="/#newsletter" className="studio-text-link">The homepage has a separate newsletter opt-in ↗</Link>.</p></div>
  </div>;
}
