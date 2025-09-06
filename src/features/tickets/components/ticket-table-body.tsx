"use client";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { allColumns } from "./ticket-tables/columns";
import { Ticket } from "../hooks/useTickets";
import TicketTableRowActions from "./ticket-table-row-actions";

type Props = {
  tickets: Ticket[];
  widths: number[];
  showColumns: Record<string, boolean>;
};

export default function TicketsTableBody({ tickets, widths, showColumns }: Props) {
  return (
    <TableBody>
      {tickets.length ? (
        tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            {allColumns.map((col, idx) =>
              col.alwaysVisible || showColumns[col.key] ? (
                <TableCell
                  key={col.key}
                  style={{ width: widths[idx], minWidth: 60 }}
                  className={col.align === "right" ? "text-right" : ""}
                >
                  {col.key === "actions" ? (
                    <TicketTableRowActions ticket={ticket} />
                  ) : col.key === "createdAt" ? (
                    new Date(ticket.createdAt).toLocaleDateString()
                  ) : (
                    ticket[col.key as keyof typeof ticket]
                  )}
                </TableCell>
              ) : null
            )}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={allColumns.length} className="text-center">
            No tickets found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}