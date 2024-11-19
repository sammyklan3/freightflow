import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { setTokens, clearTokens, getTokens } from "../helpers/tokenManager";
import { AuthContextType, TokenResponse } from "../types/auth";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    getTokens().accessToken
  );

  // Login method to obtain access and refresh tokens
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<TokenResponse>("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken); // Sync with tokenManager
      setAccessToken(accessToken);

      // Decode the access token to get user data
      const decodedToken = jwtDecode(accessToken);
      setUserData(decodedToken); // Save decoded token data in state

      console.log("Login successful:", decodedToken);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout method to clear tokens
  const logout = () => {
    clearTokens(); // Clear tokens globally
    setAccessToken(null);
  };

  // Check if the access token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      return Date.now() >= exp * 1000;
    } catch (error) {
      return true; // Treat invalid token as expired
    }
  };

  // Automatically refresh the token if expired
  const refreshAccessToken = async () => {
    const { refreshToken } = getTokens();
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await api.post<TokenResponse>("/auth/refresh", {
        token: refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      setTokens(accessToken, newRefreshToken); // Sync with tokenManager
      setAccessToken(accessToken);
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
    }
  };

  // Automatically refresh the access token on mount if expired
  useEffect(() => {
    const { accessToken } = getTokens();
    if (accessToken && isTokenExpired(accessToken)) {
      refreshAccessToken();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, userData, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
