import { apiFetch } from '../../../services/api/client';

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  role: string | null;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthApiResult {
  success: boolean;
  user?: AuthUser;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}

export const authApi = {
  register(input: RegisterInput) {
    return apiFetch<AuthApiResult>('/api/v1/users/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  login(input: LoginInput) {
    return apiFetch<AuthApiResult>('/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  refresh(refreshToken: string) {
    return apiFetch<AuthApiResult>('/api/v1/users/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  me(accessToken: string) {
    return apiFetch<{ success: boolean; user?: AuthUser; error?: string }>(
      '/api/v1/users/me',
      { method: 'GET' },
      accessToken
    );
  },

  logout(refreshToken: string) {
    return apiFetch<{ success: boolean; error?: string }>('/api/v1/users/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
};