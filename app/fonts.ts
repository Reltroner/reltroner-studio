import { Inter, Sora, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  fallback: ['system-ui', 'sans-serif'],
});

export const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  fallback: ['system-ui', 'sans-serif'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['monospace'],
});
