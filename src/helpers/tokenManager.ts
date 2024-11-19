// Create a file to manage tokens globally.

let accessToken: string | null = localStorage.getItem("accessToken");
let refreshToken: string | null = localStorage.getItem("refreshToken");

// Get current tokens
export const getTokens = () => ({ accessToken, refreshToken });

// Set tokens
export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  localStorage.setItem("accessToken", newAccessToken);
  localStorage.setItem("refreshToken", newRefreshToken);
};

// Clear tokens
export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};