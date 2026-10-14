import ContactExperience from '@/components/contact/ContactExperience';
import { buildStandaloneMetadata } from '@/lib/seo/metadata';
import { toAbsoluteUrl } from '@/lib/seo/canonical';

export const metadata = buildStandaloneMetadata({ title: 'Contact', description: 'Contact Reltroner Studio about engineering collaboration, creative worldbuilding, or learning.', pathname: '/contact', image: '/images/reltroner-studio-banner.webp' });

export default function ContactPage() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Reltroner Studio', url: toAbsoluteUrl('/contact'), mainEntity: { '@type': 'Organization', name: 'Reltroner Studio', url: toAbsoluteUrl('/') } };
  return <><ContactExperience /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /></>;
}
