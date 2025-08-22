"use client";
import { useEffect, useState } from "react";
import { getTicketById } from "@/lib/api/ticket";
import TicketForm from "./ticket-form";

export default function TicketViewPage({ ticketId }) {
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token") ?? undefined
      : undefined;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      if (ticketId !== "new") {
        try {
          const data = await getTicketById(ticketId, accessToken);
          setTicket(data);
        } catch (err) {
          setTicket(null);
        }
      }
      setLoading(false);
    }
    fetchTicket();
  }, [ticketId, accessToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <TicketForm
      initialData={ticket}
      pageTitle={ticketId === "new" ? "Create New Ticket" : "Edit Ticket"}
    />
  );
}
