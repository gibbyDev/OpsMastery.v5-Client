const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function getUserById(userId: string, accessToken?: string) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  });
  return res.ok ? await res.json() : null;
}

export async function searchUsers(search?: string, accessToken?: string) {
  const params = search ? `?search=${encodeURIComponent(search)}` : '';
  const url = `${API_URL}/users${params}`;
  const res = await fetch(url, {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  return Array.isArray(data) ? data : data.users;
}