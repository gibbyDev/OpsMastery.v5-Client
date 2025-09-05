import { useState, useEffect } from "react";
import { getUsers } from "@/lib/api/api";

export function useUsers(search?: string) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsers(search)
      .then(setUsers)
      .finally(() => setLoading(false));
  }, [search]);

  return { users, loading };
}