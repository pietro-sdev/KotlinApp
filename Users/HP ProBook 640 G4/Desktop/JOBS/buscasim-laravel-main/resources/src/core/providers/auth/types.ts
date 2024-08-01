import { LoginResponse } from "@/core/services/auth";
import { User } from "@/core/services/users";

export type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  onLogin: (data: LoginResponse, callback: VoidFunction) => void;
  onLogout: (callback: VoidFunction) => void;
};
