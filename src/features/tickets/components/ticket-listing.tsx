"use client";
import { useEffect, useState } from "react";
import { fetchTickets } from "@/lib/api/ticket";
import { TicketTable } from "./ticket-tables";
import { columns } from "./ticket-tables/columns";

type TicketListingPageProps = {
  searchParams?: Record<string, string>;
};

export default function TicketListingPage({ searchParams }: TicketListingPageProps) {
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token") ?? undefined
      : undefined;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTickets() {
      setLoading(true);
      try {
        const search = searchParams?.search ?? "";
        const data = await fetchTickets(search, accessToken);
        setTickets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getTickets();
  }, [searchParams, accessToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <TicketTable
      data={tickets}
      totalItems={tickets.length}
      columns={columns}
      searchParams={searchParams}
    />
  );
}
