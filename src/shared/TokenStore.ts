export class TokenStore {
  private accessToken: string | null;
  private refreshToken: string | null;

  constructor() {
    this.accessToken = localStorage.getItem('accessToken') ?? null;
    this.refreshToken = localStorage.getItem('refreshToken') ?? null;
  }

  getAccess() {
    return this.accessToken;
  }

  getRefresh() {
    return this.refreshToken;
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
