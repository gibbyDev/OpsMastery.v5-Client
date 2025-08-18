import { create } from "zustand";
import { signIn as apiSignIn, refreshToken as apiRefreshToken, signOut as apiSignOut } from "@/lib/api/auth";

interface AuthState {
  accessToken: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
  signIn: (emailOrUsername: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refresh: () => Promise<boolean>;
  setAuth: (user: any, token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  user: typeof window !== "undefined" ? (() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  })() : null,
  loading: false,
  error: null,

  setAuth: (user, token) => {
    set({ user, accessToken: token });
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  signIn: async (emailOrUsername, password) => {
    set({ loading: true, error: null });
    const { ok, data } = await apiSignIn(emailOrUsername, password);
    if (ok && data.access_token && data.user) {
      set({ user: data.user, accessToken: data.access_token, loading: false });
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return true;
    } else {
      set({ error: data.error || "Sign in failed", loading: false });
      return false;
    }
  },

  signOut: async () => {
    await apiSignOut();
    set({ user: null, accessToken: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }
  },

  refresh: async () => {
    set({ loading: true, error: null });
    const { ok, data } = await apiRefreshToken();
    if (ok && data.access_token) {
      set({ accessToken: data.access_token, loading: false });
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", data.access_token);
      }
      return true;
    } else {
      set({ error: data.error || "Refresh failed", loading: false });
      return false;
    }
  },
}));