import { TokenResponse } from './types';

export class TokenManager {
  private static readonly TOKEN_KEY = 'oauth_tokens';

  static saveTokens(tokens: TokenResponse): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
  }

  static getTokens(): TokenResponse | null {
    if (typeof window === 'undefined') return null;
    const tokens = localStorage.getItem(this.TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isTokenExpired(tokens: TokenResponse): boolean {
    const tokenData = this.getTokens();
    if (!tokenData) return true;
    
    const expirationTime = new Date(tokenData.expiresIn * 1000);
    return new Date() > expirationTime;
  }
}