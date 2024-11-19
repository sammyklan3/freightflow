import { Dispatch, SetStateAction } from "react";

export type UserType = "driver" | "owner";

export interface SignUpProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export interface SignInProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

// src/types/AuthTypes.ts
export interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  // userData: ();
  refreshAccessToken: () => Promise<void>;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
