'use client';
import './globals.css';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n';
import { UserProvider } from '@/context/UserContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // ดึง locale จาก path เช่น /en/xxx หรือ /th/xxx
    const match = pathname.match(/^\/(\w{2})(\/|$)/);
    const locale = match?.[1];
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [pathname]);

  return (
    <html lang="th">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
