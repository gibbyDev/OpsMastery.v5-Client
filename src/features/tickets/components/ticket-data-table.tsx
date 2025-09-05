"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useTickets } from "../hooks/useTickets";

const TicketDataTable = () => {
	const { tickets, loading, search, setSearch, filteredTickets } = useTickets();

	if (loading) {
		return <div className="p-4">Loading tickets...</div>;
	}

	return (
		<div className="w-full flex flex-col gap-4">
			<Input
				placeholder="Search tickets..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="max-w-xs"
			/>
			<div className="w-full h-[60vh] rounded-md border overflow-x-auto overflow-y-auto">
				<Table className="min-w-[1100px]">
					<TableHeader className="sticky top-0 z-10 bg-background">
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Reporter</TableHead>
							<TableHead>Assignee</TableHead>
							<TableHead>Client</TableHead>
							<TableHead>Created</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredTickets.length ? (
							filteredTickets.map((ticket) => (
								<TableRow key={ticket.id}>
									<TableCell>{ticket.id}</TableCell>
									<TableCell>{ticket.title}</TableCell>
									<TableCell className="max-w-xs truncate">
										{ticket.description}
									</TableCell>
									<TableCell>{ticket.status}</TableCell>
									<TableCell>{ticket.priority}</TableCell>
									<TableCell>{ticket.reporter}</TableCell>
									<TableCell>{ticket.assignee}</TableCell>
									<TableCell>{ticket.client}</TableCell>
									<TableCell>
										{new Date(ticket.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell className="text-right">
										<Button size="icon" variant="ghost">
											<MoreHorizontal className="w-5 h-5" />
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={10} className="text-center">
									No tickets found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default TicketDataTable;