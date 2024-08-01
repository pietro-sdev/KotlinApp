import { jwtDecode } from "jwt-decode";
import { AuthContextType } from "./types";
import { User } from "@/core/services/users";

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export const initialValues: AuthContextType = {
  user: null,
  authenticated: false,
  onLogin() {},
  onLogout() {},
};

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getDecodedUser(token: string | null): User | null {
  if (token !== null) {
    try {
      return jwtDecode<User>(token);
    } catch (error) {
      return null;
    }
  }
  return null;
}
