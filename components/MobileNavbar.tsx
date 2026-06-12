'use client';

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, Search, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import NavLinks from "@/components/layout/NavLinks";
import {
  knowledgeNavigation,
  ecosystemNavigation,
} from "@/lib/constants/navigation";

const commandPaletteEvent = "reltroner:command-palette:open";

const ecosystemLinks = [
  { name: 'Reltroner Studio', href: '/' },
  { name: 'Roadmap', href: '/#roadmap' }
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Portfolio & Recruiting', href: '/blog/for-recruiters' },
  { name: 'Disclaimer', href: '/blog/disclaimer' }
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const openCommandPalette = () => {
    window.dispatchEvent(new Event(commandPaletteEvent));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      <div className="sticky top-0 z-50 px-4 pt-4 md:hidden">
        <div className="surface-glass flex items-center justify-between gap-3 px-4 py-3 text-slate-50">
          <Link href="/" className="min-w-0 shrink">
            <h1 className="text-lg font-semibold tracking-tight text-center">Reltroner</h1>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={openCommandPalette}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full transition hover:bg-white/10"
              aria-label="Open archive search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full transition hover:bg-white/10"
              aria-label="Open navigation"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-400"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-280"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-400"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-280"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="surface-glass mx-auto w-full max-w-sm transform overflow-hidden p-6 text-left align-middle text-white transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Archive access</p>
                      <h2 className="text-lg font-semibold tracking-tight">Navigation</h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close navigation"
                      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full transition hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    {/* 1. Ecosystem */}
                    <section>
                      <h3 className="mb-3 px-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">Ecosystem</h3>
                      <NavLinks items={ecosystemLinks} layout="mobile" onNavigate={() => setIsOpen(false)} />
                    </section>

                    {/* 2. Apps */}
                    <section>
                      <h3 className="mb-3 px-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">Apps</h3>
                      <div className="grid gap-1">
                        {ecosystemNavigation.map((app) => {
                          const isComingSoon = app.status === 'planned';
                          const isExternal = app.type === 'external';

                          const content = (
                            <div className="flex items-center gap-2">
                              <span className="truncate">{app.name}</span>
                              {isExternal && !isComingSoon && <ExternalLink className="h-3 w-3 opacity-50" />}
                              {isComingSoon && <span className="text-[10px] uppercase text-slate-400 border border-slate-700 rounded-full px-1.5 py-0.5 ml-auto">Planned</span>}
                            </div>
                          );

                          if (isComingSoon) {
                            return (
                              <div key={app.name} className="flex min-h-[44px] items-center rounded-xl px-4 text-sm text-slate-400 opacity-60 cursor-not-allowed">
                                {content}
                              </div>
                            );
                          }

                          if (isExternal) {
                            return (
                              <a
                                key={app.name}
                                href={app.href}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex min-h-[44px] items-center rounded-xl px-4 text-sm transition hover:bg-white/10"
                              >
                                {content}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={app.name}
                              href={app.href}
                              onClick={() => setIsOpen(false)}
                              className="flex min-h-[44px] items-center rounded-xl px-4 text-sm transition hover:bg-white/10"
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    </section>

                    {/* 3. Knowledge Base */}
                    <section>
                      <h3 className="mb-3 px-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">Knowledge Base</h3>
                      <NavLinks items={knowledgeNavigation} layout="mobile" onNavigate={() => setIsOpen(false)} />
                    </section>

                    {/* 4. Company / Public */}
                    <section>
                      <h3 className="mb-3 px-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">Company & Public</h3>
                      <NavLinks items={companyLinks} layout="mobile" onNavigate={() => setIsOpen(false)} />
                    </section>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
