import Link from 'next/link';

export default function ContactFAQ() {
  return <section id="faq" className="studio-section studio-soft"><div className="studio-wrap studio-split">
    <div><p className="studio-eyebrow">A few useful details</p><h2>Before you reach out.</h2><p className="mt-5">Clear expectations help keep conversations comfortable for everyone.</p><Link href="/privacy" className="studio-text-link mt-5">Read the privacy policy ↗</Link></div>
    <div className="studio-faq">{[
      ['Can I ask about an unfinished idea without sharing private material?','Yes. Unfinished ideas are welcome. Describe yours at a high level and leave out private drafts, unpublished canon, login credentials, client records and other confidential documents.'],
      ['Will you arrange a call or mentorship session?','A contact inquiry does not reserve a call, paid mentorship, or availability. Communication starts asynchronously by email, and any further engagement needs a separate agreement.'],
    ].map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </div></section>;
}
