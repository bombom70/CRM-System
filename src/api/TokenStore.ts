class TokenStore {
  private accessToken: string | null;
  private refreshToken: string | null;

  constructor() {
    this.accessToken = null;
    this.refreshToken = localStorage.getItem('refreshToken') ?? null;
  }

  getAccess() {
    return this.accessToken;
  }

  getRefresh() {
    return this.refreshToken;
  }

  setAccess(accessToken: string) {
    this.accessToken = accessToken;
  }

  setRefresh(refreshToken: string) {
    this.refreshToken = refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
  }

  clear() {
    localStorage.removeItem('refreshToken');
    this.accessToken = null;
    this.refreshToken = null;
  }
}

export const tokenStore = new TokenStore();
