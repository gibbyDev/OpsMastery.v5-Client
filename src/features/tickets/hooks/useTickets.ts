import { useEffect, useMemo, useState } from "react";
import { getTickets } from "@/lib/api/api";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  reporter: string;
  assignee: string;
  client: string;
  createdAt: string;
};

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTickets()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  const filteredTickets = useMemo(() => {
    if (!search) return tickets;
    const q = search.toLowerCase();
    return tickets.filter((t) =>
      Object.values(t).some((val) =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [tickets, search]);

  return { tickets, loading, search, setSearch, filteredTickets };
}