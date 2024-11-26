// TokenManager.ts - A file to manage tokens globally

// In-memory token cache for quick access
let accessToken: string | null = localStorage.getItem("accessToken");
let refreshToken: string | null = localStorage.getItem("refreshToken");

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error accessing localStorage for key "${key}":`, error);
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving "${key}" to localStorage:`, error);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing "${key}" from localStorage:`, error);
    }
  },
};

// Get current tokens
export const getTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  if (!accessToken) {
    accessToken = safeLocalStorage.getItem("accessToken");
  }
  if (!refreshToken) {
    refreshToken = safeLocalStorage.getItem("refreshToken");
  }
  return { accessToken, refreshToken };
};

// Set tokens
export const setTokens = (newAccessToken: string, newRefreshToken: string): void => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;

  safeLocalStorage.setItem("accessToken", newAccessToken);
  safeLocalStorage.setItem("refreshToken", newRefreshToken);
};

// Clear tokens
export const clearTokens = (): void => {
  accessToken = null;
  refreshToken = null;

  safeLocalStorage.removeItem("accessToken");
  safeLocalStorage.removeItem("refreshToken");
};