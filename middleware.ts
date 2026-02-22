import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Strictly catch exact lowercase /bazzar (case-sensitive check) to redirect to /Bazzar
  if (pathname.startsWith('/bazzar')) {
    const newPath = pathname.replace('/bazzar', '/Bazzar');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Only intercept paths that start specifically with /bazzar 
  // Next.js matchers are slightly case-insensitive but the strict `startsWith` inside fixes that.
  matcher: [
    '/bazzar',
    '/bazzar/:path*',
  ],
};
