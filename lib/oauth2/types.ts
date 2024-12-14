// Type definitions for OAuth2 library
export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
  scope?: string;
}

export interface CallbackParams {
  code: string;
  state: string;
  error?: string;
  error_description?: string;
}

export interface UserInfo {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
}