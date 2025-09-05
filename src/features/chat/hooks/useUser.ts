// import { useEffect, useState } from 'react';

// export function useUsers(apiUrl: string) {
//   const [users, setUsers] = useState<{ id: string; name: string; username?: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const res = await fetch(`${apiUrl}/users`, { credentials: 'include' });
//         if (!res.ok) throw new Error(`Error: ${res.status}`);
//         const data = await res.json();
//         const usersArray = Array.isArray(data) ? data : data.users;
//         if (!Array.isArray(usersArray)) throw new Error('Invalid user data');
//         setUsers(usersArray.map((user: any) => ({
//           id: user.ID?.toString() ?? user.id?.toString(),
//           name: user.name || user.email,
//           username: user.username,
//         })));
//       } catch (err: any) {
//         setError(err.message);
//         setUsers([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUsers();
//   }, [apiUrl]);

//   return { users, loading, error };
// }