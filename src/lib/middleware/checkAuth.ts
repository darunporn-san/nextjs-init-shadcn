import { NextRequest, NextResponse } from 'next/server';
// import { getAccessTokenFromRefreshTokenAsync } from '@/lib/authUser'; // Implement this if needed

// Define route exceptions and SSO routes
const exceptRoutes = [
  '/login',
  '/oauth/kc/callback',
  // Add more as needed
];
const ssoRoutes = [
  '/', // Adjust as needed
];

export function checkAuth(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;


  console.log('checkAuth', pathname, searchParams);
  
  // SSO redirect logic
  if (ssoRoutes.includes(pathname) && searchParams.get('auth_ch') === 'sso') {
    return checkAndRedirect(request);
  }

  // Skip auth for except routes
  if (exceptRoutes.includes(pathname)) {
    return null;
  }

  // Cookie parsing
  const accessToken = request.cookies.get('accessToken')?.value || '';
  const refreshToken = request.cookies.get('refreshToken')?.value || '';
  const isSuperAdmin = request.cookies.get('isSuperAdmin')?.value === 'true';

  // If no tokens, redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If no accessToken but have refreshToken, try to refresh (not possible in middleware)
  // if (!accessToken && refreshToken) {
  //   // Placeholder: Token refresh logic should be handled in an API route or page, not middleware
  //   // const data = await getAccessTokenFromRefreshTokenAsync(refreshToken);
  //   // if (data?.access_token) { /* set cookies */ } else {
  //   //   return NextResponse.redirect(new URL('/login', request.url));
  //   // }
  // }



  if (
    !isSuperAdmin &&
    !exceptRoutes.includes(pathname)
  ) {
    return NextResponse.redirect(new URL('/shop/select-shop', request.url));
  }

  return null;
}

// SSO redirect helper
function checkAndRedirect(request: NextRequest) {
  const kcConfig = {
    host: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/kc/callback`,
  };
  const scopes = 'openid';
  const redirect_url = encodeURIComponent(kcConfig.redirect_url);
  const oauthlocation = `${kcConfig.host}?response_type=code&client_id=${kcConfig.clientId}&redirect_uri=${redirect_url}&scopes=${scopes}`;
  return NextResponse.redirect(oauthlocation);
} 