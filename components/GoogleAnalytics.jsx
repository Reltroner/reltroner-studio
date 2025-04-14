import Link from "next/link";
import './global.css';
import Navbar from "@/components/Navbar";
import { roboto } from "./fonts";
import MobileNavbar from "@/components/MobileNavbar";
import CommandPalette from "@/components/CommandPalette";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // Tambahkan komponen ini

export const metadata = {
  title: {
    default: "Reltroner Studio",
    template: "%s | Reltroner Studio",
  },
  description: "Reltroner Studio is a digital agency specializing in web development and creative sanctuary of the fictional universe Asthortera.",
};

export default function Layout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="bg-slate-100 px-5 py-5 flex flex-col min-h-screen text-black dark:bg-gray-900 dark:text-white">
        <GoogleAnalytics />
        <MobileNavbar />
        <header>
          <CommandPalette />
          <Navbar />
        </header>
        <main className="py-5 grow dark:bg-gray-900 dark:text-white">{children}</main>
        <footer className="border-t pt-4 pb-6 text-center text-xs text-gray-500 dark:bg-gray-900 dark:text-white">
          © {new Date().getFullYear()} Reltroner Studio. All rights reserved.
          <br />
          Built with ❤️ in Asthortera.
        </footer>
      </body>
    </html>
  );
}
