'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { CellAction } from './cell-action';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from './options';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'ID',
		header: 'ID',
	},
	{
		accessorKey: 'Title',
		header: ({ column }: { column: Column<any, unknown> }) => (
			<DataTableColumnHeader column={column} title='Title' />
		),
		cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
		meta: {
			label: 'Title',
			placeholder: 'Search tickets...',
			variant: 'text',
			icon: Text,
		},
		enableColumnFilter: true,
	},
	{
		accessorKey: 'Description',
		header: 'Description',
		meta: {
			label: 'Description',
			placeholder: 'Search description...',
			variant: 'text',
			icon: Text,
		},
		enableColumnFilter: true,
	},
	{
		accessorKey: 'Status',
		header: 'Status',
		cell: ({ cell }) => (
			<Badge variant='outline' className='capitalize'>
				{cell.getValue<string>()}
			</Badge>
		),
		enableColumnFilter: true,
		meta: {
			label: 'Status',
			variant: 'multiSelect',
			options: STATUS_OPTIONS,
		},
	},
	{
		accessorKey: 'Priority',
		header: 'Priority',
		cell: ({ cell }) => (
			<Badge variant='outline' className='capitalize'>
				{cell.getValue<string>()}
			</Badge>
		),
		enableColumnFilter: true,
		meta: {
			label: 'Priority',
			variant: 'multiSelect',
			options: PRIORITY_OPTIONS,
		},
	},
	{
		accessorKey: 'Reporter.Name',
		header: 'Reporter',
		cell: ({ row }) => row.original.Reporter?.Name || '',
		meta: {
			label: 'Reporter',
			placeholder: 'Search reporter...',
			variant: 'text',
			icon: Text,
		},
		enableColumnFilter: true,
	},
	{
		accessorKey: 'Assignee.Name',
		header: 'Assignee',
		cell: ({ row }) => row.original.Assignee?.Name || '',
		meta: {
			label: 'Assignee',
			placeholder: 'Search assignee...',
			variant: 'text',
			icon: Text,
		},
		enableColumnFilter: true,
	},
	{
		accessorKey: 'Client.Name',
		header: 'Client',
		cell: ({ row }) => row.original.Client?.Name || '',
		meta: {
			label: 'Client',
			placeholder: 'Search client...',
			variant: 'text',
			icon: Text,
		},
		enableColumnFilter: true,
	},
	{
		accessorKey: 'CreatedAt',
		header: 'Created At',
		cell: ({ cell }) => {
			const date = cell.getValue<string>();
			return date ? new Date(date).toLocaleDateString() : '';
		},
	},
	{
		accessorKey: 'UpdatedAt',
		header: 'Updated At',
		cell: ({ cell }) => {
			const date = cell.getValue<string>();
			return date ? new Date(date).toLocaleDateString() : '';
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
	{
		id: 'save',
		header: () => <></>,
		cell: () => <Button variant='default'>Save</Button>,
	},
];