import Link from "next/link";
import './global.css';
import Navbar from "@/components/Navbar";
import { roboto } from "./fonts";
import MobileNavbar from "@/components/MobileNavbar";
import CommandPalette from "@/components/CommandPalette";


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
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Reltroner Studio</title>
                    <link rel="icon" href="/images/reltroner-studio.png" type="image/png" />
                    {/*  jika punya .ico: */}
                    {/* <link rel="icon" href="/reltroner-logo.ico" type="image/x-icon" /> */}
                    {/* Google Analytics */}
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=G-VZ7QYLZPF0`}></script>
                    <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-VZ7QYLZPF0');
                    `
                    }} />
            </head>
            <body className="bg-slate-100 px-5 py-5 flex flex-col min-h-screen  text-black dark:bg-gray-900 dark:text-white">
            <MobileNavbar />
                <header>
                <CommandPalette />
                    <Navbar />
                </header>
                <main className="py-5 grow dark:bg-gray-900 dark:text-white">{children}</main>
                <footer className="border-t pt-4 pb-6 text-center text-xs text-gray-500  dark:bg-gray-900 dark:text-white">
                    © {new Date().getFullYear()} Reltroner Studio. All rights reserved.
                    <br />
                    Built with ❤️ in Asthortera.
                </footer>
            </body>
        </html>
    );
}
