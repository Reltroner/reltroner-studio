'use client';
import { useState } from 'react';
import Link from 'next/link';
import ContactInquiryForm from './ContactInquiryForm';
import { contactTopics, type ContactTopic } from './ContactIntentTabs';
import ContactNextSteps from './ContactNextSteps';
import ContactFAQ from './ContactFAQ';
import NewsletterSection from '@/components/newsletter/NewsletterSection';
import ConceptArt from '@/components/worldbuilding/ConceptArt';

export default function ContactExperience({
  newsletterActivationVerified = false,
}: {
  newsletterActivationVerified?: boolean;
}) {
  const [topic, setTopic] = useState<ContactTopic>(contactTopics[0]);
  return <div className="studio-page">
    <section className="studio-hero">
      <div className="studio-wrap studio-contact-grid">
        <div className="studio-contact-intro">
          <p className="studio-eyebrow">Reltroner Studio / Contact</p>
          <h1>What’s on your mind?</h1>
          <p className="studio-lead">A question about worldbuilding, a fictional world you’re dreaming up, a creative roadblock, or a thoughtful collaboration?</p>
          <p>Tell me a little about what you’re exploring. Every worthwhile project starts with curiosity, you don’t need a polished pitch or a fully finished world to start a conversation.</p>
          <div className="studio-signals"><span>Email-first</span><span>No call required</span><span>No newsletter sign-up</span></div>
          <div className="studio-contact-art"><ConceptArt kind="conversation" label="Concept illustration · Exchanging ideas, not real members" /><div className="studio-actions"><Link href="/creators" className="studio-text-link">Explore creator pathway ↗</Link><Link href="/readers" className="studio-text-link">New to Asthortera? ↗</Link></div><p className="studio-small mt-5">Contact is asynchronous and personal. Messages are reviewed when capacity allows. No reply deadline, call, mentorship place, or business engagement is promised.</p></div>
        </div>
        <div id="contact-form" className="studio-panel studio-contact-form scroll-mt-24">
          <p className="studio-eyebrow">Your conversation starts here</p>
          <h2>Send a thoughtful note.</h2>
          <p className="studio-small mt-4">Pick what feels closest to your idea. A few sentences are enough, we’ll keep the form simple.</p>
          <p id="contact-mode" className="my-5 rounded-xl border border-blue-400/30 p-4 text-xs leading-6 text-blue-100">
            {process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? 'Submitting sends your inquiry directly to Web3Forms for forwarding to the Studio. Provider acceptance does not confirm inbox delivery. Contact inquiries never subscribe you to the newsletter.' : 'Local prototype. Real provider submission is disabled. Validation and preview happen on your device. Nothing is sent, uploaded, or stored. You can choose the email link to reach out yourself.'}
          </p>
          <ContactInquiryForm topic={topic} onTopicChange={setTopic} />
        </div>
      </div>
    </section>
    <ContactNextSteps />
    <section id="self-service" className="studio-section">
      <div className="studio-wrap">
        <div className="studio-intro"><p className="studio-eyebrow">Prefer exploring on your own?</p><h2>You might find what you need here.</h2><p>Some questions become clearer when you see an example first. You can start with the work that’s already available.</p></div>
        <div className="studio-grid-three">
          {[
            ['For worldbuilders', 'Build on the idea you love.', 'Explore a creator-facing starting point for making fictional details connect.', '/creators', 'Explore creative practice'],
            ['For readers', 'Get to know Asthortera.', 'Start with the world and go deeper at your own pace, without a lore exam.', '/readers', 'Explore the fictional world'],
            ['Learning', 'See the public LMS.', 'Browse available learning material; report content or experience issues if needed.', 'https://lms.reltroner.com/', 'Open LMS'],
          ].map(([tag, title, text, href, cta]) => <article key={tag} className="studio-card"><p className="studio-eyebrow">{tag}</p><h3>{title}</h3><p>{text}</p><a href={href} className="studio-text-link">{cta} ↗</a></article>)}
        </div>
      </div>
    </section>
    <ContactFAQ />
    <div className="studio-wrap"><NewsletterSection activationVerified={newsletterActivationVerified} /></div>
    <section id="contact-closing" className="studio-section"><div className="studio-wrap studio-panel studio-conversation"><p className="studio-eyebrow">Still have a question?</p><h2>Let’s begin with a thought.</h2><p>No elaborate pitch required. Choose your topic and write a few sentences.</p><div className="studio-actions"><a href="#contact-form" className="studio-button">Write a message ↑</a></div></div></section>
  </div>;
}
