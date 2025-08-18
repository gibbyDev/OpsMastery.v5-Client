// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// export async function getUserById(userId: string, accessToken?: string) {
//   const res = await fetch(`${API_URL}/users/${userId}`, {
//     credentials: "include",
//     headers: accessToken
//       ? { Authorization: `Bearer ${accessToken}` }
//       : {},
//   });
//   return res.ok ? await res.json() : null;
// }

// export async function searchUsers(query: string, accessToken?: string) {
//   const res = await fetch(`${API_URL}/users/search?q=${encodeURIComponent(query)}`, {
//     credentials: "include",
//     headers: accessToken
//       ? { Authorization: `Bearer ${accessToken}` }
//       : {},
//   });
//   return res.ok ? await res.json() : [];
// }