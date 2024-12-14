// OAuth2 Configuration Module
export interface OAuth2ConfigOptions {
  clientId: string;
  redirectUri: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  scope: string[] | string;
  provider: string;
}

export class OAuth2Config {
  clientId: string;
  redirectUri: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  scope: string;
  provider: string;

  constructor({
    clientId,
    redirectUri,
    authorizationEndpoint,
    tokenEndpoint,
    scope,
    provider
  }: OAuth2ConfigOptions) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.authorizationEndpoint = authorizationEndpoint;
    this.tokenEndpoint = tokenEndpoint;
    this.scope = Array.isArray(scope) ? scope.join(' ') : scope;
    this.provider = provider;
  }
}

export const PROVIDERS = {
  AUTH0: {
    name: 'auth0',
    configureEndpoints: (domain: string) => ({
      authorizationEndpoint: `https://${domain}/authorize`,
      tokenEndpoint: `https://${domain}/oauth/token`
    })
  },
  CLERK: {
    name: 'clerk',
    configureEndpoints: (domain: string) => ({
      authorizationEndpoint: `https://${domain}/oauth/authorize`,
      tokenEndpoint: `https://${domain}/oauth/token`
    })
  },
  KINDE: {
    name: 'kinde',
    configureEndpoints: (domain: string) => ({
      authorizationEndpoint: `https://${domain}/oauth2/auth`,
      tokenEndpoint: `https://${domain}/oauth2/token`
    })
  }
};