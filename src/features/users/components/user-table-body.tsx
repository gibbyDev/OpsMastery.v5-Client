"use client";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { User } from "../hooks/useUsers";
import UserTableRowActions from "./user-table-row-actions";

import { allColumns } from "./user-tables/columns";

type Props = {
  users: User[];
  widths: number[];
  showColumns: Record<string, boolean>;
};

export default function UsersTableBody({ users, widths, showColumns }: Props) {
  return (
    <TableBody>
      {users.length ? (
        users.map((user) => (
          <TableRow key={user.id}>
            {allColumns.map((col, idx) =>
              col.alwaysVisible || showColumns[col.key] ? (
                <TableCell
                  key={col.key}
                  style={{ width: widths[idx], minWidth: 60 }}
                  className={col.align === "right" ? "text-right" : ""}
                >
                  {col.key === "actions" ? (
                    <UserTableRowActions user={user} />
                  ) : (
                    user[col.key as keyof typeof user]
                  )}
                </TableCell>
              ) : null
            )}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={allColumns.length} className="text-center">
            No users found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}