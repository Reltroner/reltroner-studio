import React from 'react';
import Link from 'next/link';
import { KNOWLEDGE_CARDS } from '@/lib/constants/knowledgeCards';
import HoverDepth from '@/components/motion/HoverDepth';

export default function FeaturedKnowledgeBridge() {
  return (
    <section id="knowledge-bridge" className="mb-12 relative z-10">
      <div className="section-shell text-center mb-8">
        <h2 className="text-2xl font-semibold tracking-tight mb-2 text-white">Knowledge Ecosystem</h2>
        <p className="rs-muted max-w-2xl mx-auto">Explore core archives, principles, and worldbuilding lore.</p>
      </div>
      
      <div className="section-shell">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {KNOWLEDGE_CARDS.map((card) => (
            <Link key={card.name} href={card.href} className="block group h-full">
              <HoverDepth className="h-full">
                <div className="rs-panel overflow-hidden flex flex-col h-full dark:text-white transition-all duration-300 hover:border-blue-500/40">
                  {/* Thumbnail Area - CSS Fallback */}
                  <div className={`h-28 w-full bg-gradient-to-br ${card.gradient} relative flex items-center justify-center border-b border-white/5`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_56%)] mix-blend-overlay"></div>
                    <span className="text-5xl font-black text-white/10 uppercase tracking-widest">{card.name.substring(0, 2)}</span>
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex flex-col grow p-5">
                    <div className="mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/80">
                        {card.accent}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors">
                      {card.name}
                    </h3>
                    
                    <p className="text-sm text-slate-300 grow mb-5">
                      {card.description}
                    </p>
                    
                    <div className="mt-auto text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                      Explore Collection <span aria-hidden="true">&rarr;</span>
                    </div>
                  </div>
                </div>
              </HoverDepth>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
