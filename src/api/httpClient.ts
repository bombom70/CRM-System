import axios from 'axios';

const BASE_URL = 'https://easydev.club/api/v1';

export const httpClient = axios.create({
  baseURL: BASE_URL,
});
