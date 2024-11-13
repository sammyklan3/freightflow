// https://freightflow.onrender.com

import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuth();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle refresh token if access token has expired in response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const { refreshAccessToken } = useAuth();

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();
      const { accessToken } = useAuth();
      if (accessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
