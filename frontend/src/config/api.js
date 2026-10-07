const RENDER_API_BASE_URL = 'https://food-based-reels-platform-4.onrender.com';
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const isLocalApiUrl = (url) =>
  url?.includes('localhost') || url?.includes('127.0.0.1');

export const getApiBaseUrl = (configuredUrl) =>
  import.meta.env.PROD && isLocalApiUrl(configuredUrl)
    ? RENDER_API_BASE_URL
    : configuredUrl || RENDER_API_BASE_URL;

export const API_BASE_URL = getApiBaseUrl(configuredApiBaseUrl);
