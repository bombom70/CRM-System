import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenStore } from '../api/TokenStore';
import { refreshTokens } from './refreshTokens';

const baseUrl = 'https://easydev.club/api/v1';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const accessToken = tokenStore.getAccess();
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      } else {
        const refreshToken = tokenStore.getRefresh() ?? '';
        await refreshTokens(refreshToken);
        const newAccessToken = tokenStore.getAccess();
        headers.set('authorization', `Bearer ${newAccessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: () => ({}),
});
