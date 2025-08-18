const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function signIn(emailOrUsername: string, password: string) {
  const res = await fetch(`${API_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrUsername, password }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function signOut() {
  await fetch(`${API_URL}/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function refreshToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return { ok: res.ok, data };
}