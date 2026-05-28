// app/layout.jsx

import './global.css';
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import CommandPalette from "@/components/layout/CommandPalette";
import ShellBackdrop from "@/components/layout/ShellBackdrop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import RouteAnalytics from "@/components/RouteAnalytics";
import { roboto } from "./fonts";
import {
  buildOrganizationJsonLd,
  buildUniverseJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo/jsonld";
import { ROOT_METADATA } from "@/lib/seo/metadata";
import { getCommandPaletteEntries } from "@/lib/utils/content";

export const metadata = ROOT_METADATA;

export default async function RootLayout({ children }) {
  const commandPaletteEntries = await getCommandPaletteEntries();

  return (
    <html lang="en" className={roboto.variable} data-scroll-behavior="smooth">
      <head>
        {/* Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Favicon compatibility */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.webp" />

        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationJsonLd()),
          }}
        />

        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebsiteJsonLd()),
          }}
        />

        {/* Structured Data: CreativeWork (Universe) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildUniverseJsonLd()),
          }}
        />
      </head>

      <body
        className="font-body"
        style={{
          backgroundColor: "var(--rs-page-background)",
          color: "var(--rs-text-primary)",
        }}
      >
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <ShellBackdrop />

          <div className="relative z-40">
            <MobileNavbar />
            <header>
              <div className="hidden md:block">
                <div className="shell-container px-4 pt-4">
                  <div className="surface-glass flex justify-center px-3 py-3">
                    <CommandPalette pages={commandPaletteEntries} />
                  </div>
                </div>
                <Navbar />
              </div>
            </header>
          </div>

          <main className="relative z-10 grow py-5">{children}</main>

          <footer className="relative z-10 px-4 pb-8 pt-2">
            <div className="shell-container">
              <div className="surface-glass px-6 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
                <a
                  href="/blog/for-recruiters"
                  className="text-blue-500 hover:underline"
                >
                  For Recruiters & Collaborators ↗
                </a>
                <br />
                © {new Date().getFullYear()} Reltroner Studio. All rights reserved.
              </div>
            </div>
          </footer>

          <GoogleAnalytics />
          <RouteAnalytics />
        </div>
      </body>
    </html>
  );
}
