# OAuth2 Client Library and Demo Application

A professional, type-safe OAuth2 client library implementation with a Next.js demo application. This project provides a flexible OAuth2 client that works with multiple providers and includes a beautiful demo application showcasing the authentication flow.

## 🌟 Features

- **Flexible OAuth2 Client Library**
  - Support for multiple OAuth providers (Auth0, Clerk, Kinde)
  - Type-safe implementation with TypeScript
  - PKCE (Proof Key for Code Exchange) support
  - Secure token management
  - Automatic token refresh
  - User information retrieval

- **Next.js Demo Application**
  - Modern, responsive UI with Tailwind CSS
  - Protected routes with middleware
  - User profile management
  - Dark mode support
  - Error handling pages
  - Loading states

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- An account with one of the supported OAuth providers (Auth0, Clerk, or Kinde)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/oauth2-client-demo.git
cd oauth2-client-demo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain.auth0.com
NEXT_PUBLIC_OAUTH_CLIENT_ID=your-client-id
OAUTH_CLIENT_SECRET=your-client-secret
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

### Running the Demo

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Library Usage

### Basic Implementation

```typescript
import { OAuth2Client } from '@/lib/oauth2/client';
import { OAuth2Config } from '@/lib/oauth2/config';

// Configure the OAuth client
const config = new OAuth2Config({
  clientId: 'your-client-id',
  redirectUri: 'your-redirect-uri',
  authorizationEndpoint: 'https://provider.com/authorize',
  tokenEndpoint: 'https://provider.com/token',
  scope: ['openid', 'profile', 'email'],
  provider: 'auth0'
});

// Create a client instance
const client = new OAuth2Client(config);

// Start the authentication flow
const authUrl = await client.startAuthFlow();

// Handle the callback
const tokens = await client.handleCallback({
  code: 'authorization-code',
  state: 'state-parameter'
});
```

### Token Management

```typescript
import { TokenManager } from '@/lib/oauth2/token-manager';

// Save tokens
TokenManager.saveTokens(tokens);

// Check if token is expired
const isExpired = TokenManager.isTokenExpired(tokens);

// Refresh token
const newTokens = await client.refreshToken(tokens.refreshToken);
```

## 🏗️ Project Structure

```
├── app/                    # Next.js application routes
│   ├── api/               # API routes for authentication
│   ├── auth/              # Authentication-related pages
│   └── page.tsx           # Home page
├── lib/                   # OAuth2 client library
│   └── oauth2/
│       ├── client.ts      # Main OAuth2 client implementation
│       ├── config.ts      # Configuration and provider settings
│       ├── types.ts       # TypeScript interfaces
│       ├── utils.ts       # Utility functions
│       └── storage.ts     # Token storage management
└── components/            # Reusable UI components
```

## 🔒 Security Considerations

- PKCE flow implementation for enhanced security
- Secure token storage with HTTP-only cookies
- State parameter validation to prevent CSRF attacks
- Protected routes with middleware
- Environment variable protection
- Type safety with TypeScript

## 🛠️ Technologies Used

- Next.js 13
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Lucide React Icons

## 📝 API Documentation

### OAuth2Client

#### `startAuthFlow()`
Initiates the OAuth2 authorization flow.
- Returns: `Promise<string>` - Authorization URL

#### `handleCallback(params: CallbackParams)`
Processes the OAuth callback and exchanges the code for tokens.
- Parameters: `CallbackParams` object containing code and state
- Returns: `Promise<TokenResponse>`

#### `refreshToken(refreshToken: string)`
Refreshes an expired access token.
- Parameters: `refreshToken` - The refresh token
- Returns: `Promise<TokenResponse>`

## 🙏 Acknowledgments

- [OAuth 2.0 Specification](https://oauth.net/2/)
- [Auth0 Documentation](https://auth0.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)