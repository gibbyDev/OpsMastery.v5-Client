import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = /^\/dashboard(\/.*)?$/;

function verifyJWT(token: string): boolean {
  // Optionally, verify the JWT signature and expiration here.
  // For demo, just check if it exists.
  return !!token;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PROTECTED_ROUTES.test(pathname)) {
    const accessToken = req.cookies.get('access_token')?.value;
    if (!accessToken || !verifyJWT(accessToken)) {
      const signInUrl = new URL('/auth/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
};
