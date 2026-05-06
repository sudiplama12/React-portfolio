'use client';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}