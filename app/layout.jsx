import './global.css';
import Navbar from "@/components/Navbar";
import { roboto } from "./fonts";
import MobileNavbar from "@/components/MobileNavbar";
import CommandPalette from "@/components/CommandPalette";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // <- New

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
      <body className="bg-slate-100 text-black dark:bg-gray-900 dark:text-white">
        <GoogleAnalytics />
        <MobileNavbar />
        <header>
          <CommandPalette />
          <Navbar />
        </header>
        <main className="py-5 grow">{children}</main>
        <footer className="border-t pt-4 pb-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Reltroner Studio. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
