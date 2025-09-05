import { useState, useCallback } from "react";
import api from "@/lib/api/axios";

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null
  );
  const [user, setUser] = useState<any>(
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null
  );

  const signIn = useCallback(async (emailOrUsername: string, password: string) => {
    const res = await api.post("/signin", { emailOrUsername, password });
    const { access_token, user } = res.data;
    setAccessToken(access_token);
    setUser(user);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }, []);

  const signOut = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    api.post("/auth/signout");
  }, []);

  const refreshToken = useCallback(async () => {
    const res = await api.post("/auth/refresh");
    const { access_token } = res.data;
    setAccessToken(access_token);
    localStorage.setItem("access_token", access_token);
    return access_token;
  }, []);

  return { accessToken, user, signIn, signOut, refreshToken };
}