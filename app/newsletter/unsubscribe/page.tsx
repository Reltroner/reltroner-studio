import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Newsletter preferences | Reltroner Studio', description: 'Newsletter availability, unsubscribe and preference information.', alternates: { canonical: 'https://www.reltroner.com/newsletter/unsubscribe' } };

export default function UnsubscribePage() {
  return <div className="editorial-shell px-4 py-12"><h1 className="text-3xl font-bold">Newsletter preferences</h1>
    <p className="mt-6 leading-7 text-slate-300">Use the unsubscribe link in a Studio newsletter to manage your preferences securely through Resend. Resend processes that protected link and displays the result. Visiting this page does not change your subscription.</p>
    <p className="mt-4 leading-7 text-slate-300">Signing up does not send a welcome email. If you have not received a newsletter or cannot access its link, contact the Studio for help. Previously unsubscribed addresses are not automatically reactivated by this form. No unsubscribe success is claimed here.</p>
    <p className="mt-6"><Link href="/contact" className="text-blue-300 underline">Contact the Studio about your preferences</Link></p>
    <Link href="/#newsletter" className="mt-6 inline-block text-blue-300 underline">Return to newsletter</Link>
  </div>;
}
