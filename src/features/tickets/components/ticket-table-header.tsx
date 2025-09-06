"use client";

import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import clsx from "clsx";
import { allColumns } from "./ticket-tables/columns";

type Props = {
  widths: number[];
  startResize: (idx: number, e: React.MouseEvent) => void;
  showColumns: Record<string, boolean>;
};

export default function TicketsTableHeader({ widths, startResize, showColumns }: Props) {
  return (
    <TableHeader>
      <TableRow
        className="bg-background"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {allColumns.map((col, idx) =>
          col.alwaysVisible || showColumns[col.key] ? (
            <TableHead
              key={col.key}
              className={clsx(
                "relative group bg-background",
                col.align === "right" && "text-right"
              )}
              style={{
                width: widths[idx],
                minWidth: 60,
                maxWidth: 500,
                position: "sticky",
                top: 0,
                background: "inherit",
                zIndex: 20,
              }}
            >
              <div className="flex items-center justify-between">
                <span>{col.label}</span>
                {idx < allColumns.length - 1 && (
                  <span
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize group-hover:bg-muted transition"
                    onMouseDown={(e) => startResize(idx, e)}
                    style={{ zIndex: 30 }}
                  />
                )}
              </div>
            </TableHead>
          ) : null
        )}
      </TableRow>
    </TableHeader>
  );
}