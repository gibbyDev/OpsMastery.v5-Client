import { useEffect, useState } from "react";
import { getUserById } from "@/lib/api/api";

export function useUserById(userId: string) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    if (userId !== "new") {
      getUserById(userId)
        .then((data) => {
          if (active) setUser(data);
        })
        .catch(() => {
          if (active) setUser(null);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
    return () => {
      active = false;
    };
  }, [userId]);

  return { user, loading };
}