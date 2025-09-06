"use client";

import React, { useState, useMemo } from "react";
import { useTickets } from "../hooks/useTickets";
import {
	allColumns,
	statusOptions,
	priorityOptions,
	initialWidths,
} from "./ticket-tables/columns";
import { useResizableColumns } from "../hooks/useResizeableColumns";
import TicketsTableToolbar from "./ticket-table-toolbar";
import TicketsTableHeader from "./ticket-table-header";
import TicketsTableBody from "./ticket-table-body";
import TicketTablePagination from "./ticket-table-pagination";

const TicketDataTable = () => {
	const { tickets, loading, search, setSearch } = useTickets();
	const [status, setStatus] = useState("");
	const [priority, setPriority] = useState("");
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

	// Filtering logic for status and priority
	const filteredTickets = useMemo(() => {
		return tickets.filter((t) => {
			const matchesStatus = status ? t.status === status : true;
			const matchesPriority = priority ? t.priority === priority : true;
			const matchesSearch = search
				? Object.values(t).some((val) =>
						String(val).toLowerCase().includes(search.toLowerCase())
				  )
				: true;
			return matchesStatus && matchesPriority && matchesSearch;
		});
	}, [tickets, status, priority, search]);

	// Paginated tickets
	const paginatedTickets = useMemo(() => {
		const start = (page - 1) * pageSize;
		return filteredTickets.slice(start, start + pageSize);
	}, [filteredTickets, page, pageSize]);

	// Reset to first page if filters/search/pageSize change and page is out of bounds
	React.useEffect(() => {
		const totalPages = Math.max(1, Math.ceil(filteredTickets.length / pageSize));
		if (page > totalPages) setPage(1);
	}, [filteredTickets.length, page, pageSize]);

	if (loading) {
		return <div className="p-4">Loading tickets...</div>;
	}

	return (
		<div className="w-full flex flex-col gap-4">
			<TicketsTableToolbar
				search={search}
				setSearch={setSearch}
				status={status}
				setStatus={setStatus}
				priority={priority}
				setPriority={setPriority}
				statusOptions={statusOptions}
				priorityOptions={priorityOptions}
				showColumns={showColumns}
				setShowColumns={setShowColumns}
			/>
			<div className="w-full h-[60vh] rounded-md border overflow-x-auto">
				<div className="relative h-full">
					<table className="min-w-[1100px] w-full border-collapse">
						<TicketsTableHeader
							widths={widths}
							startResize={startResize}
							showColumns={showColumns}
						/>
						<TicketsTableBody
							tickets={paginatedTickets}
							widths={widths}
							showColumns={showColumns}
						/>
					</table>
				</div>
			</div>
			<TicketTablePagination
				page={page}
				pageSize={pageSize}
				total={filteredTickets.length}
				onPageChange={setPage}
				onPageSizeChange={(size) => {
					setPageSize(size);
					setPage(1);
				}}
			/>
		</div>
	);
};

export default TicketDataTable;