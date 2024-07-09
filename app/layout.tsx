import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.css';

const spartan = League_Spartan({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={spartan.className}>{children}</body>
    </html>
  );
}
