import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi, AuthUser } from '../api/authApi';
import { tokenStorage } from '../../../services/storage/tokenStorage';

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  register: (input: { email: string; password: string; name?: string }) => Promise<AuthResult>;
  login: (input: { email: string; password: string }) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  // On app start: validate any stored tokens against /users/me, and
  // auto-refresh if the access token has expired, before giving up
  // and treating the user as logged out.
  async function restoreSession() {
    const stored = await tokenStorage.getTokens();

    if (stored.accessToken && stored.refreshToken) {
      const me = await authApi.me(stored.accessToken);

      if (me.ok) {
        setUser(me.data.user ?? null);
        setAccessToken(stored.accessToken);
        setRefreshToken(stored.refreshToken);
      } else {
        const refreshed = await authApi.refresh(stored.refreshToken);

        if (refreshed.ok && refreshed.data.accessToken && refreshed.data.refreshToken) {
          await tokenStorage.setTokens(refreshed.data.accessToken, refreshed.data.refreshToken);
          setAccessToken(refreshed.data.accessToken);
          setRefreshToken(refreshed.data.refreshToken);
          const meAgain = await authApi.me(refreshed.data.accessToken);
          if (meAgain.ok) setUser(meAgain.data.user ?? null);
        } else {
          await tokenStorage.clearTokens();
        }
      }
    }

    setIsLoading(false);
  }

  async function register(input: { email: string; password: string; name?: string }): Promise<AuthResult> {
    const res = await authApi.register(input);

    if (res.ok && res.data.accessToken && res.data.refreshToken) {
      await tokenStorage.setTokens(res.data.accessToken, res.data.refreshToken);
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setUser(res.data.user ?? null);
      return { success: true };
    }

    return { success: false, error: res.data.error ?? 'Registration failed' };
  }

  async function login(input: { email: string; password: string }): Promise<AuthResult> {
    const res = await authApi.login(input);

    if (res.ok && res.data.accessToken && res.data.refreshToken) {
      await tokenStorage.setTokens(res.data.accessToken, res.data.refreshToken);
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setUser(res.data.user ?? null);
      return { success: true };
    }

    return { success: false, error: res.data.error ?? 'Login failed' };
  }

  async function logout() {
    if (refreshToken) {
      await authApi.logout(refreshToken);
    }
    await tokenStorage.clearTokens();
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
  return ctx;
}
