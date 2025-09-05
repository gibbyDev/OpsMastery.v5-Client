import { useEffect, useMemo, useState } from "react";
import { getUsers } from "@/lib/api/api";

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  status: string;
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter((u) =>
      Object.values(u).some((val) =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [users, search]);

  return { users, loading, search, setSearch, filteredUsers };
}