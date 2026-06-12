import { Metadata } from 'next';
import EcosystemHero from '@/components/ecosystem/EcosystemHero';
import AppDock from '@/components/ecosystem/AppDock';
import EcosystemPillars from '@/components/ecosystem/EcosystemPillars';
import UseCasePathways from '@/components/ecosystem/UseCasePathways';
import FeaturedKnowledgeBridge from '@/components/ecosystem/FeaturedKnowledgeBridge';
import EcosystemRoadmapPreview from '@/components/ecosystem/EcosystemRoadmapPreview';

export const metadata: Metadata = {
  title: "Reltroner Studio — Ecosystem Gateway",
  description: "Reltroner Studio is the official gateway to the Reltroner ecosystem — connecting the knowledge base, LMS, HRM, and future ecosystem apps.",
  keywords: "Reltroner Studio, Asthortera, Reltroner ecosystem, knowledge base, learning management system, human resource management",
};

export default function Home() {
  return (
    <div className="space-y-8 px-4 sm:px-6 pb-12">
      <EcosystemHero />
      <AppDock />
      <EcosystemPillars />
      <UseCasePathways />
      <FeaturedKnowledgeBridge />
      <EcosystemRoadmapPreview />
      
      <section className="section-shell text-center py-16">
        <h2 className="mb-6 text-3xl font-bold text-white">Ready to explore?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#knowledge-bridge" className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500">
            Explore Knowledge Base
          </a>
          <a href="https://lms.reltroner.com" target="_blank" rel="noreferrer" className="rounded-full rs-glass px-6 py-3 font-medium text-white transition hover:bg-slate-800/50">
            Open LMS ↗
          </a>
          <a href="https://hrm.reltroner.com" target="_blank" rel="noreferrer" className="rounded-full border border-slate-600 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
            Open HRM ↗
          </a>
        </div>
      </section>
    </div>
  );
}
