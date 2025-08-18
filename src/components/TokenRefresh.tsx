"use client";

import { useEffect } from "react";

const REFRESH_INTERVAL = 1000 * 60 * 5; // 5 minutes
const API_URL = "http://localhost:8080/api/v1";

export function TokenRefresh() {
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
          }
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);
  return null;
}