import { NextRequest, NextResponse } from 'next/server';
import { handleLocaleRedirect } from '@/lib/middleware/handleLocaleRedirect';
import { checkAuth } from '@/lib/middleware/checkAuth';

export function middleware(request: NextRequest) {
  // 1. Locale redirect logic
  const localeResult = handleLocaleRedirect(request);
  if (localeResult) return localeResult;

  // 2. Auth check logic
  const authResult = checkAuth(request);
  console.log('authResult', authResult);
  
  if (authResult) return authResult;

  // 3. Default allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
