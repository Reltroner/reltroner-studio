import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap', // memastikan font tidak blocking rendering
  variable: '--font-roboto', // opsional: jika ingin digunakan sebagai CSS variable
  fallback: ['Helvetica', 'Arial', 'sans-serif'], // fallback font jika gagal load
});
