const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function getChatHistory(user1: string, user2: string, accessToken?: string) {
  const res = await fetch(`${API_URL}/chats?user1=${user1}&user2=${user2}`, {
    credentials: "include",
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  });
  return res.ok ? await res.json() : [];
}

export async function deleteChat(user1: string, user2: string, accessToken: string) {
  const res = await fetch(`${API_URL}/api/v1/chats?user1=${user1}&user2=${user2}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  // Don't call res.json() here!
  return res.ok;
}

export async function fetchChatPartners(userId: string, accessToken: string) {
  const res = await fetch(`${API_URL}/api/v1/chats/partners?user_id=${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  return res.ok ? await res.json() : [];
}

export async function searchUsers(query: string, accessToken: string) {
  const res = await fetch(`${API_URL}/api/v1/users/search?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  return res.ok ? await res.json() : [];
}