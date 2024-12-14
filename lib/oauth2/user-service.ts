import { UserInfo } from './types';
import { TokenManager } from './token-manager';

export class UserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUserInfo(): Promise<UserInfo> {
    const tokens = TokenManager.getTokens();
    if (!tokens) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${this.baseUrl}/userinfo`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return response.json();
  }
}