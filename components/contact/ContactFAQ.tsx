export default function ContactFAQ() {
  return <section aria-labelledby="contact-faq-heading" className="mt-10"><h2 id="contact-faq-heading" className="text-2xl font-semibold">Before you reach out</h2>
    <div className="mt-4 space-y-3">{[
      ['Does a contact inquiry subscribe me?', 'No. Newsletter consent is a separate choice. Your inquiry never enrolls you in a mailing list.'],
      ['Can I send confidential project information?', 'Begin with a short, non-confidential overview. Do not include credentials or private customer records.'],
      ['Is this form connected?', process.env.NEXT_PUBLIC_WEB3FORMS_ENABLED === 'true' ? 'Yes. Your browser submits directly to Web3Forms. A successful response confirms provider acceptance; inbox delivery may still depend on spam filtering and recipient settings.' : 'This local prototype validates form input only. Web3Forms submission remains unavailable until the owner verifies the account, recipient, access key and free-plan spam controls.'],
    ].map(([question, answer]) => <details key={question} className="rounded-xl border border-slate-700 p-4"><summary className="cursor-pointer py-1 font-medium">{question}</summary><p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p></details>)}</div>
  </section>;
}
