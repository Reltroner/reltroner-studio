// app/layout.jsx
import './global.css';
import Navbar from "@/components/Navbar";
import { roboto } from "./fonts";
import MobileNavbar from "@/components/MobileNavbar";
import CommandPalette from "@/components/CommandPalette";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata = {
  title: {
    default: "Reltroner Studio",
    template: "%s | Reltroner Studio",
  },
  description: "Reltroner Studio is a digital agency specializing in web development and creative sanctuary of the fictional universe Asthortera.",
  openGraph: {
    siteName: "Reltroner Studio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Reltroner Studio",
              "url": "https://reltroner.com",
              "logo": "https://reltroner.com/images/logo.png",
              "sameAs": [
                "https://www.youtube.com/@reltroner",
                "https://github.com/reltroner",
                "https://twitter.com/reltroner"
              ]
            }),
          }}
        />

        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Reltroner Studio",
              "url": "https://reltroner.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://reltroner.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />

        {/* CreativeWork */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": "Reltroner Studio Universe",
              "creator": {
                "@type": "Person",
                "name": "Rei Reltroner",
                "url": "https://reltroner.com"
              },
              "dateCreated": "2025-04-06",
              "description": "A deeply immersive digital world known as Asthortera — home of Reltronland, Depcutland, and the core narratives of The Abyss of Comfort and The Freezone Code. All contents, characters, visuals, and designs are original creations of Rei Reltroner.",
              "publisher": {
                "@type": "Organization",
                "name": "Reltroner Studio"
              },
              "inLanguage": "en",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://reltroner.com"
              }
            }),
          }}
        />
        
      </head>
      <body className="bg-slate-100 text-black dark:bg-gray-900 dark:text-white">
        <GoogleAnalytics />
        <MobileNavbar />
        <header>
          <CommandPalette />
          <Navbar />
        </header>
        <main className="py-5 grow">{children}</main>
        <footer className="border-t pt-4 pb-6 text-center text-xs text-gray-500">
          <a href="/blog/for-recruiters" className="text-blue-500 hover:underline">
            For Recruiters & Collaborators ↗
          </a>
          <br />
          © {new Date().getFullYear()} Reltroner Studio. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
