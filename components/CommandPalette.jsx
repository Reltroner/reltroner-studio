'use client'

import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup
} from 'cmdk';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Characters", path: "/characters" },
    { name: "Cultures", path: "/cultures" },
    { name: "Places", path: "/places" },
    { name: "Series", path: "/series" },
    { name: "Statistics", path: "/statistics" },
    { name: "Organizations", path: "/organizations" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
    { name: "Portfolio", path: "/blog/for-recruiters" },
    { name: "Principles", path: "/blog/reltroner" },
    { name: "Disclaimer", path: "/blog/disclaimer" },
    { name: "Statistics: SDI Report", path: "/statistics/sdi-report-asthortera" },
    { name: "Culture: Cuteness Manifesto", path: "/cultures/cuteness-manifesto" },
    { name: "Profile: Talent Longevity", path: "/blog/talent-longevity" },
  ];

  return (
    <CommandDialog
  open={open}
  onOpenChange={setOpen}
  className="fixed inset-0 flex items-center justify-center z-[9999] px-4 transition-opacity duration-200 ease-in-out"
>
  <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-600 p-4 transition-all duration-200 ease-in-out transform scale-100 opacity-100">
    <VisuallyHidden>
      <DialogTitle>Command Palette</DialogTitle>
    </VisuallyHidden>
    <CommandInput
      placeholder="Search page..."
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-4"
    />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="⬇️Click down here to select a page">
        {pages.map((page) => (
          <CommandItem
            key={page.path}
            value={page.name}
            onSelect={() => {
              router.push(page.path);
              setOpen(false);
            }}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          >
            {page.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </div>
</CommandDialog>

  );
}
