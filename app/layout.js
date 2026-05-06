import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-900">
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}