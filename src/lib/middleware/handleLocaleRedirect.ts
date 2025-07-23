import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'th'];
const DEFAULT_LOCALE = 'th';

export function handleLocaleRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ข้าม static files, /login, และ /oauth/kc/callback
  if (
    pathname === '/login' ||
    pathname === '/oauth/kc/callback' ||

    pathname === '/oauth/kc/logout' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return null;
  }

  // redirect `/th` หรือ `/th/` → `/`
  if (pathname === `/${DEFAULT_LOCALE}` || pathname === `/${DEFAULT_LOCALE}/`) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // redirect /th/xyz → /xyz
  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    return NextResponse.redirect(
      new URL(pathname.replace(`/${DEFAULT_LOCALE}`, '') || '/', request.url)
    );
  }

  // ถ้า path ไม่มี locale → rewrite ไปยัง defaultLocale
  // ยกเว้น /oauth/kc/callback
  if (pathname === '/oauth/kc/callback' || pathname === '/oauth/kc/logout') {
    return null;
  }
  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return null;
} 