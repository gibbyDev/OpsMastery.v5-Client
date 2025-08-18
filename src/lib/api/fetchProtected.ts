import { useAuthStore } from "@/lib/store/authSlice";

export async function fetchProtected(url: string, options: any = {}) {
  const token = useAuthStore.getState().accessToken;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (res.status === 401) {
    const refreshed = await useAuthStore.getState().refresh();
    if (refreshed) {
      // Retry request with new token
      const newToken = useAuthStore.getState().accessToken;
      return fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newToken}`,
        },
        credentials: "include",
      });
    } else {
      useAuthStore.getState().signOut();
      window.location.href = "/auth/sign-in";
      return null;
    }
  }
  return res;
}