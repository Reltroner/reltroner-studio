'use client'

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Characters", href: "/characters" },
  { name: "Series", href: "/series" },

  // Worldbuilding Core
  { name: "Philosophies", href: "/philosophies" },
  { name: "Laws", href: "/laws" },
  { name: "Technologies", href: "/technologies" },

  // Optional but impactful
  { name: "Factions", href: "/factions" },
  { name: "Myths", href: "/myths" },

  // Supportive
  { name: "Statistics", href: "/statistics" },
  { name: "Organizations", href: "/organizations" },
  { name: "Places", href: "/places" },
  { name: "Cultures", href: "/cultures" },
  { name: "Events", href: "/events" },

  // Professional
  { name: "Portfolio", href: "/blog/for-recruiters" },
  { name: "Principles", href: "/blog/reltroner" },

  // Footer-type
  { name: "Contact", href: "/contact" },
  { name: "Disclaimer", href: "/blog/disclaimer" },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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
      {/* Mobile menu button */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50 text-black dark:bg-gray-900 dark:text-white">
        {/* Dark Mode Toggle */}
        <Link href="/">
          <h1 className="text-lg font-bold text-center">Reltroner</h1>
        </Link>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar menu */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 dark:text-white p-6 text-left align-middle shadow-xl transition-all mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Navigation</h2>
                    <button onClick={() => setIsOpen(false)} aria-label="Close navigation">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} onClick={() => setIsOpen(false)}>
                          <span className="block text-gray-800 dark:text-white hover:text-blue-600 transition truncate">
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
