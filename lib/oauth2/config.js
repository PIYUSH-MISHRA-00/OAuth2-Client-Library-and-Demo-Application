// OAuth2 Configuration Module
export class OAuth2Config {
  constructor({
    clientId,
    clientSecret,
    redirectUri,
    authorizationEndpoint,
    tokenEndpoint,
    scope,
    provider
  }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.authorizationEndpoint = authorizationEndpoint;
    this.tokenEndpoint = tokenEndpoint;
    this.scope = Array.isArray(scope) ? scope.join(' ') : scope;
    this.provider = provider;
  }
}

// Predefined provider configurations
export const PROVIDERS = {
  AUTH0: {
    name: 'auth0',
    configureEndpoints: (domain) => ({
      authorizationEndpoint: `https://${domain}/authorize`,
      tokenEndpoint: `https://${domain}/oauth/token`
    })
  },
  CLERK: {
    name: 'clerk',
    configureEndpoints: (domain) => ({
      authorizationEndpoint: `https://${domain}/oauth/authorize`,
      tokenEndpoint: `https://${domain}/oauth/token`
    })
  },
  KINDE: {
    name: 'kinde',
    configureEndpoints: (domain) => ({
      authorizationEndpoint: `https://${domain}/oauth2/auth`,
      tokenEndpoint: `https://${domain}/oauth2/token`
    })
  }
};