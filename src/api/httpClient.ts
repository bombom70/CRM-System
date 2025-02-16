import axios from 'axios';
import { tokenStore } from '../shared/TokenStore';

const BASE_URL = 'https://easydev.club/api/v1';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${tokenStore.getAccess()}`;
  return config;
});

export { httpClient };
