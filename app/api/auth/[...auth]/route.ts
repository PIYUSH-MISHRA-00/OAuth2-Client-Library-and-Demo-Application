import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from '@/lib/oauth2/client';
import { OAuth2Config, PROVIDERS } from '@/lib/oauth2/config';

// Initialize OAuth2 configuration
const config = new OAuth2Config({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  redirectUri: process.env.OAUTH_REDIRECT_URI!,
  ...PROVIDERS.AUTH0.configureEndpoints(process.env.AUTH0_DOMAIN!),
  scope: ['openid', 'profile', 'email'],
  provider: PROVIDERS.AUTH0.name,
});

const oauth2Client = new OAuth2Client(config);

export async function GET(
  request: NextRequest,
  { params }: { params: { auth: string[] } }
) {
  const [action] = params.auth;

  if (action === 'login') {
    const authUrl = await oauth2Client.startAuthFlow();
    return NextResponse.redirect(authUrl);
  }

  if (action === 'callback') {
    try {
      const searchParams = request.nextUrl.searchParams;
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code || !state) {
        throw new Error('Missing required parameters');
      }

      const tokens = await oauth2Client.handleCallback({ code, state });

      // In a real application, you would store the tokens securely
      // and create a session for the user
      const response = NextResponse.redirect(new URL('/', request.url));
      
      // Set secure HTTP-only cookie with the access token
      response.cookies.set('auth_token', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL('/auth/error', request.url));
    }
  }

  return NextResponse.json({ error: 'Invalid auth route' }, { status: 400 });
}