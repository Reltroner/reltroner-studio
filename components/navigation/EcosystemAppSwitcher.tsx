'use client';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Grid, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ecosystemNavigation } from '@/lib/constants/navigation';

export default function EcosystemAppSwitcher() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${open ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'}
            `}
            aria-label="Switch Reltroner Apps"
          >
            <Grid className="h-4 w-4" />
            <span>Apps</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-50 mt-3 w-[calc(100vw-2rem)] max-w-sm origin-top-right transform sm:max-w-md">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
                <div className="surface-glass p-4">
                  <div className="mb-3 px-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      Reltroner Ecosystem
                    </p>
                  </div>
                  <div className="grid gap-2">
                    {ecosystemNavigation.map((app) => {
                      const isComingSoon = app.status === 'planned';
                      const isExternal = app.type === 'external';

                      const content = (
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-white">
                              {app.name}
                            </p>
                            {isComingSoon && (
                              <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
                                Planned
                              </span>
                            )}
                            {isExternal && !isComingSoon && (
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                          <p className="mt-1 text-xs text-slate-300">
                            {app.description}
                          </p>
                        </div>
                      );

                      if (isComingSoon) {
                        return (
                          <div
                            key={app.name}
                            className="flex cursor-not-allowed items-center rounded-xl p-3 opacity-60 transition duration-150 ease-in-out"
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
                            rel="noreferrer"
                            className="flex items-center rounded-xl p-3 transition duration-150 ease-in-out hover:bg-white/10"
                          >
                            {content}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={app.name}
                          href={app.href}
                          className="flex items-center rounded-xl p-3 transition duration-150 ease-in-out hover:bg-white/10"
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
