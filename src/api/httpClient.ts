import axios from 'axios';

const BASE_URL = 'https://easydev.club/api/v1';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken') ?? ''}`;
  return config;
});

export { httpClient };
