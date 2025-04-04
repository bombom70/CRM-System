import { fetchRefresh } from '../api/profile/profile';
import { tokenStore } from '../api/TokenStore';

export const refreshTokens = async (refreshToken: string) => {
  try {
    const newTokens = await fetchRefresh({ refreshToken });
    tokenStore.setAccess(newTokens.accessToken);
    tokenStore.setRefresh(newTokens.refreshToken);
  } catch (error) {
    tokenStore.clear();
    window.location.replace('/auth/login');
    throw error;
  }
};
