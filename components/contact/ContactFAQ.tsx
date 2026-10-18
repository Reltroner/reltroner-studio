import Link from 'next/link';

export default function ContactFAQ() {
  return <section id="faq" className="studio-section studio-soft"><div className="studio-wrap studio-split">
    <div><p className="studio-eyebrow">A few useful details</p><h2>Before you reach out.</h2><p className="mt-5">Clear expectations help keep conversations comfortable for everyone.</p><Link href="/privacy" className="studio-text-link mt-5">Read the privacy policy ↗</Link></div>
    <div className="studio-faq">{[
      ['Is the contact form actually sending messages?', process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED==='true'?'Yes. Your browser submits directly to Web3Forms. A successful response confirms provider acceptance; inbox delivery may still depend on spam filtering and recipient settings.':'This local prototype validates and previews your input only. It never claims a message was received. You can use your email app to contact the Studio separately.'],
      ['Does contacting Reltroner join me to the newsletter?','No. Newsletter subscriptions have a separate opt-in. This Contact form does not subscribe anyone to updates.'],
      ['Can I send a very early idea, not a finished project?','Yes. A short non-confidential outline or interesting question is a good starting point; nobody needs to reveal private drafts or unpublished canon.'],
      ['Will you arrange a call or mentorship session?','A contact inquiry does not reserve a call, paid mentorship, or availability. Communication starts asynchronously by email, and any further engagement needs a separate agreement.'],
      ['Should I share sensitive business or client records?','No. Avoid login credentials, private customer information, confidential documents and unpublished material you do not wish to disclose. Use a high-level summary first.'],
    ].map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </div></section>;
}
