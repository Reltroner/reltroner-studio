import ContactExperience from '@/components/contact/ContactExperience';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';
import { toAbsoluteUrl } from '@/lib/seo/canonical';

export const metadata = buildStandaloneMetadata({ title: 'Start a Conversation', description: 'Share a worldbuilding question, explore Asthortera, ask about learning, or discuss relevant engineering collaboration. Email-first, with no newsletter sign-up.', pathname: '/contact', image: '/images/reltroner-studio-banner.webp' });

export default function ContactPage() {
  const newsletterActivationVerified =
    process.env.RESEND_NEWSLETTER_ENABLED === 'true' &&
    process.env.CLOUDFLARE_WAF_PROTECTION_VERIFIED === 'true' &&
    process.env.RESEND_HARD_STOP_VERIFIED === 'true' &&
    process.env.RESEND_UNSUBSCRIBE_VERIFIED === 'true';
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Reltroner Studio', url: toAbsoluteUrl('/contact'), mainEntity: { '@type': 'Organization', name: 'Reltroner Studio', url: toAbsoluteUrl('/') } };
  return <><ContactExperience newsletterActivationVerified={newsletterActivationVerified} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /></>;
}
