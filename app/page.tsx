import { Metadata } from 'next';
import EcosystemHero from '@/components/ecosystem/EcosystemHero';
import AppDock from '@/components/ecosystem/AppDock';
import EcosystemPillars from '@/components/ecosystem/EcosystemPillars';
import UseCasePathways from '@/components/ecosystem/UseCasePathways';
import FeaturedKnowledgeBridge from '@/components/ecosystem/FeaturedKnowledgeBridge';
import EcosystemRoadmapPreview from '@/components/ecosystem/EcosystemRoadmapPreview';
import SelectedWorkShowcase from '@/components/ecosystem/SelectedWorkShowcase';
import NewsletterSection from '@/components/newsletter/NewsletterSection';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.reltroner.com/' },
  title: "Reltroner Studio — Ecosystem Gateway",
  description: "Start with worldbuilding revision practices for creators or an introductory glossary of the fictional Asthortera universe for readers. Explore engineering work, the knowledge base, LMS, and HRM.",
  keywords: "Reltroner Studio, worldbuilding, creators, readers, Asthortera fiction, Reltroner ecosystem, knowledge base, learning management system, human resource management",
};

export default function Home() {
  const newsletterActivationVerified =
    process.env.RESEND_NEWSLETTER_ENABLED === 'true' &&
    process.env.CLOUDFLARE_WAF_PROTECTION_VERIFIED === 'true' &&
    process.env.RESEND_HARD_STOP_VERIFIED === 'true' &&
    process.env.RESEND_UNSUBSCRIBE_VERIFIED === 'true';

  return (
    <div className="space-y-8 px-4 sm:px-6 pb-12">
      <EcosystemHero />
      <AppDock />
      <EcosystemPillars />
      <UseCasePathways />
      <FeaturedKnowledgeBridge />
      <EcosystemRoadmapPreview />
      <SelectedWorkShowcase />
      <NewsletterSection activationVerified={newsletterActivationVerified} />

      <section className="section-shell text-center py-16">
        <h2 className="mb-6 text-3xl font-bold text-white">Ready to explore?</h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
          <a href="#knowledge-bridge" className="focus-visible:rs-focus-ring rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500">
            Explore Knowledge Base
          </a>
          <a href="https://lms.reltroner.com" target="_blank" rel="noreferrer" className="focus-visible:rs-focus-ring rounded-full rs-glass px-6 py-3 font-medium text-white transition hover:bg-slate-800/50">
            Open LMS ↗
          </a>
          <a href="https://hrm.reltroner.com" target="_blank" rel="noreferrer" className="focus-visible:rs-focus-ring rounded-full border border-slate-600 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
            Open HRM ↗
          </a>
          <a href="https://www.youtube.com/@ReltronerStudio" target="_blank" rel="noreferrer" className="focus-visible:rs-focus-ring rounded-full border border-slate-600 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
            Open Reltroner Studio Music ↗
          </a>
        </div>
      </section>
    </div>
  );
}
