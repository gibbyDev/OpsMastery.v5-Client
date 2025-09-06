"use client";

import React, { useState, useMemo } from "react";
import { useUsers } from "../hooks/useUsers";
import { allColumns, statusOptions, initialWidths } from "./user-tables/columns";
import { useResizableColumns } from "../hooks/useResizeableColumns";
import UsersTableToolbar from "./user-table-toolbar";
import UsersTableHeader from "./user-table-header";
import UsersTableBody from "./user-table-body";
import UserTablePagination from "./user-table-pagination";

const UsersDataTable = () => {
  const { users, loading, search, setSearch } = useUsers();
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [showColumns, setShowColumns] = useState(() =>
    allColumns.reduce<Record<string, boolean>>(
      (acc, col) => ({
        ...acc,
        [col.key]: col.hideByDefault ? false : true,
      }),
      {}
    )
  );
  const { widths, startResize } = useResizableColumns(initialWidths);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Compute unique roles from users for filter dropdown
  const uniqueRoles = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => u.role && set.add(u.role));
    return Array.from(set);
  }, [users]);

  // Filtering logic for role and status
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = role ? u.role === role : true;
      const matchesStatus = status ? u.status === status : true;
      const matchesSearch = search
        ? Object.values(u).some((val) =>
            String(val).toLowerCase().includes(search.toLowerCase())
          )
        : true;
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, role, status, search]);

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  // Reset to first page if filters/search/pageSize change and page is out of bounds
  React.useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
    if (page > totalPages) setPage(1);
  }, [filteredUsers.length, page, pageSize]);

  if (loading) {
    return <div className="p-4">Loading users...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <UsersTableToolbar
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        uniqueRoles={uniqueRoles}
        statusOptions={statusOptions}
        showColumns={showColumns}
        setShowColumns={setShowColumns}
      />
      <div className="w-full h-[60vh] rounded-md border overflow-x-auto">
        <div className="relative h-full">
          <table className="min-w-[900px] w-full border-collapse">
            <UsersTableHeader
              widths={widths}
              startResize={startResize}
              showColumns={showColumns}
            />
            <UsersTableBody
              users={paginatedUsers}
              widths={widths}
              showColumns={showColumns}
            />
          </table>
        </div>
      </div>
      <UserTablePagination
        page={page}
        pageSize={pageSize}
        total={filteredUsers.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
};

export default UsersDataTable;