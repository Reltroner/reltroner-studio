// components/MobileNavbar.jsx

'use client'

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import NavLinks from "@/components/layout/NavLinks";
import { NAV_ITEMS } from "@/lib/constants/routes";

const commandPaletteEvent = "reltroner:command-palette:open";


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
        <div className="surface-glass flex items-center justify-between gap-3 px-4 py-3 text-black dark:text-white">
          <Link href="/" className="min-w-0 shrink">
            <h1 className="text-lg font-semibold tracking-tight text-center">Reltroner</h1>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={openCommandPalette}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Open archive search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Open navigation"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-9999" onClose={setIsOpen}>
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
                <Dialog.Panel className="surface-glass mx-auto w-full max-w-sm transform overflow-hidden p-6 text-left align-middle text-black transition-all dark:text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">Archive access</p>
                      <h2 className="text-lg font-semibold tracking-tight">Navigation</h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close navigation"
                      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <NavLinks items={NAV_ITEMS} layout="mobile" onNavigate={() => setIsOpen(false)} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
