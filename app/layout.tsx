import { ReactNode } from "react";
import { Metadata } from "next";
import './global.css';
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/layout/CommandPalette";
import ShellBackdrop from "@/components/layout/ShellBackdrop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import RouteAnalytics from "@/components/RouteAnalytics";
import { inter, sora, jetbrainsMono } from "./fonts";
import {
  buildOrganizationJsonLd,
  buildUniverseJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo/jsonld";
import { ROOT_METADATA } from "@/lib/seo/metadata";
import { getCommandPaletteEntries } from "@/lib/utils/content";
import { getPublicContentIndex } from "@/lib/content/public-index";
import AssistantRoot from "@/components/assistant/AssistantRoot";
import SiteFooter from "@/components/layout/SiteFooter";
import { ReadingPathProvider } from "@/components/archive/ReadingPathContext";

export const metadata: Metadata = ROOT_METADATA;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const commandPaletteEntries = await getCommandPaletteEntries();
  const publicContentIndex = await getPublicContentIndex();

  return (
    <html lang="en" className={`dark ${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`} data-scroll-behavior="smooth">
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
            __html: JSON.stringify(buildOrganizationJsonLd()).replace(/</g, '\\u003c'),
          }}
        />

        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebsiteJsonLd()).replace(/</g, '\\u003c'),
          }}
        />

        {/* Structured Data: CreativeWork (Universe) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildUniverseJsonLd()).replace(/</g, '\\u003c'),
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
        <ReadingPathProvider>
          <a href="#main-content" className="sr-only fixed left-4 top-4 z-[10000] rounded-lg bg-blue-700 p-4 text-white focus:not-sr-only">Skip to content</a>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <ShellBackdrop />

            <div className="relative z-40">
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

            <main id="main-content" tabIndex={-1} className="relative z-10 grow py-5 md:pt-1.5 md:pb-5">{children}</main>

            <SiteFooter />

            <GoogleAnalytics />
            <RouteAnalytics />
            <AssistantRoot entries={publicContentIndex} />
          </div>
        </ReadingPathProvider>
      </body>
    </html>
  );
}
