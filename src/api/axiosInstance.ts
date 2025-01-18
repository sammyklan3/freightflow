import axios from "axios";
import { getTokens, setTokens, clearTokens } from "../helpers/tokenManager";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_APP_ENV === "production"
      ? import.meta.env.VITE_PRODUCTION_BASE_URL
      : import.meta.env.VITE_DEVELOPMENT_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const BASE_URL = import.meta.env.VITE_APP_ENV === "production" ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEVELOPMENT_BASE_URL;

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const { accessToken } = getTokens();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken } = getTokens();
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      try {
        // Request new access token
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/refresh`,
          { token: refreshToken }
        );
        setTokens(data.accessToken, data.refreshToken);

        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
