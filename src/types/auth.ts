import { Dispatch, SetStateAction } from "react";

export type UserType = "driver" | "owner";

export interface SignUpProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export interface SignInProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}