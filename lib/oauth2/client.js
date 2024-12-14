import { generateState, generateCodeVerifier, generateCodeChallenge } from './utils';

export class OAuth2Client {
  constructor(config) {
    this.config = config;
    this.state = null;
    this.codeVerifier = null;
  }

  async startAuthFlow() {
    this.state = generateState();
    this.codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(this.codeVerifier);

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scope,
      state: this.state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });

    return `${this.config.authorizationEndpoint}?${params.toString()}`;
  }

  async handleCallback(callbackParams) {
    if (callbackParams.state !== this.state) {
      throw new Error('Invalid state parameter');
    }

    if (callbackParams.error) {
      throw new Error(`OAuth error: ${callbackParams.error}`);
    }

    const tokenResponse = await this.exchangeCodeForTokens(callbackParams.code);
    return this.processTokenResponse(tokenResponse);
  }

  async exchangeCodeForTokens(code) {
    const response = await fetch(this.config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        redirect_uri: this.config.redirectUri,
        code_verifier: this.codeVerifier,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    return response.json();
  }

  async refreshToken(refreshToken) {
    const response = await fetch(this.config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return this.processTokenResponse(await response.json());
  }

  processTokenResponse(response) {
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      expiresIn: response.expires_in,
      tokenType: response.token_type,
      scope: response.scope,
    };
  }
}