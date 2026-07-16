'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ExternalLink,
  Menu,
  Search,
  X,
} from 'lucide-react';
import Link from 'next/link';

import {
  ecosystemNavigation,
  knowledgeNavigation,
} from '@/lib/constants/navigation';

const commandPaletteEvent = 'reltroner:command-palette:open';

type NavigationItem = {
  name: string;
  href: string;
};

const ecosystemLinks: NavigationItem[] = [
  {
    name: 'Reltroner Studio',
    href: '/',
  },
  {
    name: 'Roadmap',
    href: '/#roadmap',
  },
];

const companyLinks: NavigationItem[] = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Portfolio & Recruiting',
    href: '/blog/for-recruiters',
  },
  {
    name: 'Disclaimer',
    href: '/blog/disclaimer',
  },
];

const interactiveClassName =
  'flex min-h-12 min-w-0 items-center rounded-xl border border-transparent ' +
  'px-4 py-3 text-sm font-medium text-slate-200 transition ' +
  'hover:border-white/10 hover:bg-white/10 hover:text-white ' +
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-sky-300 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-slate-950 active:scale-[0.99] ' +
  'motion-reduce:transform-none motion-reduce:transition-none';

function MobileLinkGrid({
  items,
  onNavigate,
}: {
  items: readonly NavigationItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
      {items.map((item) => {
        const isExternal =
          item.href.startsWith('http://') ||
          item.href.startsWith('https://');

        const content = (
          <>
            <span className="min-w-0 break-words">
              {item.name}
            </span>

            {isExternal && (
              <ExternalLink
                aria-hidden="true"
                className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-400"
              />
            )}
          </>
        );

        if (isExternal) {
          return (
            <a
              key={`${item.name}-${item.href}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className={interactiveClassName}
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={`${item.name}-${item.href}`}
            href={item.href}
            onClick={onNavigate}
            className={interactiveClassName}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

function NavigationSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`mobile-navigation-${title
        .toLowerCase()
        .replaceAll(' ', '-')}`}
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-3"
    >
      <h3
        id={`mobile-navigation-${title
          .toLowerCase()
          .replaceAll(' ', '-')}`}
        className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400"
      >
        {title}
      </h3>

      {children}
    </section>
  );
}

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeNavigation = () => {
    setIsOpen(false);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new Event(commandPaletteEvent));
  };

  const openCommandPaletteFromDrawer = () => {
    setIsOpen(false);

    // Wait until the navigation dialog begins closing so focus management
    // does not compete with the command palette.
    window.setTimeout(() => {
      openCommandPalette();
    }, 200);
  };

  return (
    <>
      {/* Fixed navbar: always attached to the mobile viewport */}
      <header
        className="fixed inset-x-0 top-0 z-[100] px-3 md:hidden"
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        }}
      >
        <nav
          aria-label="Mobile primary navigation"
          className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/85 px-3 py-2.5 text-slate-50 shadow-lg shadow-slate-950/20 backdrop-blur-xl"
        >
          <Link
            href="/"
            aria-label="Reltroner home"
            className="min-w-0 flex-1 rounded-xl px-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <span className="block truncate text-base font-semibold tracking-tight">
              Reltroner
            </span>

            <span className="block truncate text-[10px] uppercase tracking-[0.14em] text-slate-400">
              Knowledge Ecosystem
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={openCommandPalette}
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:scale-95 motion-reduce:transform-none"
              aria-label="Search the archive"
            >
              <Search aria-hidden="true" className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:scale-95 motion-reduce:transform-none"
              aria-label="Open navigation"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/*
       * Compensates for the fixed navbar so page content does not render
       * underneath it.
       */}
      <div
        aria-hidden="true"
        className="md:hidden"
        style={{
          height: 'calc(5.25rem + env(safe-area-inset-top))',
        }}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[9999] md:hidden"
          onClose={setIsOpen}
        >
          {/* Backdrop must stay behind the scrollable drawer */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300 ease-out motion-reduce:transition-none"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in motion-reduce:transition-none"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="transform transition duration-300 ease-out motion-reduce:transition-none"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition duration-200 ease-in motion-reduce:transition-none"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel
                id="mobile-navigation-drawer"
                className="flex h-[100dvh] w-full max-w-md flex-col overflow-hidden border-l border-sky-300/20 bg-slate-950/95 text-white shadow-2xl backdrop-blur-xl"
              >
                {/* Fixed drawer header */}
                <div
                  className="shrink-0 border-b border-white/10 bg-slate-950/90 px-4 pb-4"
                  style={{
                    paddingTop:
                      'max(1rem, env(safe-area-inset-top))',
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                        Archive Access
                      </p>

                      <Dialog.Title className="mt-1 truncate text-xl font-semibold tracking-tight">
                        Navigation
                      </Dialog.Title>
                    </div>

                    <button
                      type="button"
                      onClick={closeNavigation}
                      aria-label="Close navigation"
                      className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:scale-95 motion-reduce:transform-none"
                    >
                      <X aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    data-autofocus
                    onClick={openCommandPaletteFromDrawer}
                    className="mt-4 flex min-h-12 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] px-4 text-left text-sm text-slate-200 transition hover:border-sky-300/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <Search
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-sky-300"
                    />

                    <span className="min-w-0 flex-1 truncate">
                      Search archive
                    </span>
                  </button>
                </div>

                {/* Only this region scrolls */}
                <div
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4"
                  style={{
                    paddingBottom:
                      'max(1.5rem, env(safe-area-inset-bottom))',
                  }}
                >
                  <div className="space-y-4">
                    <NavigationSection title="Ecosystem">
                      <MobileLinkGrid
                        items={ecosystemLinks}
                        onNavigate={closeNavigation}
                      />
                    </NavigationSection>

                    <NavigationSection title="Apps">
                      <div className="grid grid-cols-1 gap-2 min-[520px]:grid-cols-2">
                        {ecosystemNavigation.map((app) => {
                          const isComingSoon =
                            app.status === 'planned';
                          const isExternal =
                            app.type === 'external';

                          const content = (
                            <>
                              <span className="min-w-0 flex-1 break-words">
                                {app.name}
                              </span>

                              {isExternal && !isComingSoon && (
                                <ExternalLink
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5 shrink-0 text-slate-400"
                                />
                              )}

                              {isComingSoon && (
                                <span className="shrink-0 rounded-full border border-slate-600 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                                  Planned
                                </span>
                              )}
                            </>
                          );

                          if (isComingSoon) {
                            return (
                              <div
                                key={app.name}
                                aria-disabled="true"
                                className="flex min-h-12 min-w-0 items-center gap-2 rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3 text-sm text-slate-500"
                              >
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
                                rel="noopener noreferrer"
                                onClick={closeNavigation}
                                className={`${interactiveClassName} gap-2`}
                              >
                                {content}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={app.name}
                              href={app.href}
                              onClick={closeNavigation}
                              className={`${interactiveClassName} gap-2`}
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    </NavigationSection>

                    <NavigationSection title="Knowledge Base">
                      <MobileLinkGrid
                        items={knowledgeNavigation}
                        onNavigate={closeNavigation}
                      />
                    </NavigationSection>

                    <NavigationSection title="Company & Public">
                      <MobileLinkGrid
                        items={companyLinks}
                        onNavigate={closeNavigation}
                      />
                    </NavigationSection>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}