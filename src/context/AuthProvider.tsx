import React, { createContext, useEffect, useState, useContext } from "react";
import api from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, TokenResponse } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const refreshToken = localStorage.getItem("refreshToken");

  // Login method to obtain access and refresh tokens
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<TokenResponse>("/auth/login", {
        email,
        password,
      });

      setTokens(response.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout method to clear tokens
  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Set tokens in both state and local storage
  const setTokens = ({ accessToken, refreshToken }: TokenResponse) => {
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  // Refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await api.post<TokenResponse>("/auth/refresh", {
        token: refreshToken,
      });
      setTokens(response.data);
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
    }
  };

  // Decode and check if access token is expired
  const isTokenExpired = (token: string): boolean => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  };

  // Automatically refresh access token if expired
  useEffect(() => {
    if (accessToken && isTokenExpired(accessToken)) {
      refreshAccessToken();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
