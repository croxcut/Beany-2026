// Set EXPO_PUBLIC_API_URL in your project-root .env file.
// Android emulator -> http://10.0.2.2:PORT
// iOS simulator    -> http://localhost:PORT
// Physical device  -> http://<your-pc-lan-ip>:PORT
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';

export interface ApiResult<T = any> {
  ok: boolean;
  status: number;
  data: T;
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  accessToken?: string | null
): Promise<ApiResult<T>> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data: data as T };
}
