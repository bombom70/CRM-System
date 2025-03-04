import { fetchRefresh } from '../api/profile/profile';
import { tokenStore } from '../api/TokenStore';

export const refreshTokens = async (refreshToken: string, cb: () => void) => {
  try {
    const newTokens = await fetchRefresh({ refreshToken });
    tokenStore.setAccess(newTokens.accessToken);
    tokenStore.setRefresh(newTokens.refreshToken);
    await cb();
  } catch (error) {
    tokenStore.clear();
    localStorage.removeItem('isAdmin');
    window.location.replace('/auth/login');
    throw error;
  }
};
