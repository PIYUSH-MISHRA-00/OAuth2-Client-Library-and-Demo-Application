import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is accessing protected routes
  if (request.nextUrl.pathname.startsWith('/auth/profile')) {
    const token = request.cookies.get('auth_token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/auth/:path*',
};