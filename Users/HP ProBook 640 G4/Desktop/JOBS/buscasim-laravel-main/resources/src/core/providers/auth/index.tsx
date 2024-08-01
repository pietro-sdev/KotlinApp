import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { User } from '@/core/services/users';
import { LoginResponse } from '@/core/services/auth';
import { AuthContextType } from './types';
import {
  getAuthToken,
  getDecodedUser,
  initialValues,
  removeAuthToken,
  setAuthToken,
} from './utils';

const AuthContext = createContext<AuthContextType>(initialValues);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  async function handleLogin(data: LoginResponse, callback: VoidFunction) {
    const currentUser = getDecodedUser(data.token);

    if (currentUser !== null) {
      setAuthToken(data.token);
      setUser(currentUser);
      setAuthenticated(true);
      callback();
    }
  }

  function handleLogout(callback: VoidFunction) {
    removeAuthToken();
    setUser(null);
    setAuthenticated(false);
    callback();
  }

  useEffect(() => {
    const token = getAuthToken();

    if (token !== null) {
      const currentUser = getDecodedUser(token);

      if (currentUser !== null) {
        setUser(currentUser);
        setAuthenticated(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext<AuthContextType>(AuthContext);
}

export * from './types';
export * from './utils';
