

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export type User = { name?: string; email?: string; [key: string]: unknown };
export type AuthResult = { token?: string; access_token?: string; user?: User; data?: { token?: string; access_token?: string; user?: User }; [key: string]: unknown };

export function readUser(): User | null {
  try { const raw = localStorage.getItem("qabox_user"); return raw ? JSON.parse(raw) as User : null; }
  catch { return null; }
}
export function getToken(data: AuthResult) {
  return data.token || data.access_token || data.data?.token || data.data?.access_token || null;
}
export function getUser(data: AuthResult): User {
  return data.user || data.data?.user || {};
}
