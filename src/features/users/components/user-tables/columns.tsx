'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { User } from '@/constants/mock-api';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle, Text } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { ROLE_OPTIONS } from './options';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'ProfilePhoto',
		header: 'Avatar',
		cell: ({ row }) => {
			const photo = row.getValue<string>('ProfilePhoto');
			const name = row.getValue<string>('Name');
			if (photo && typeof photo === 'string' && photo.trim() !== '') {
				return (
					<div className='relative aspect-square'>
						<Image
							src={photo}
							alt={name || 'User avatar'}
							fill
							className='rounded-lg'
						/>
					</div>
				);
			}
			// Fallback: show initials if no photo
			const initials = name
				? name
						.split(' ')
						.map((n) => n[0])
						.join('')
						.toUpperCase()
				: '?';
			return (
				<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg font-bold'>
					{initials}
				</div>
			);
		}
	},
	{
		accessorKey: 'ID',
		header: 'ID'
	},
	{
		accessorKey: 'Name',
		header: ({ column }: { column: Column<User, unknown> }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
		cell: ({ cell }) => <div>{cell.getValue<User['Name']>()}</div>,
		meta: {
			label: 'Name',
			placeholder: 'Search users...',
			variant: 'text',
			icon: Text
		},
		enableColumnFilter: true
	},
	{
		accessorKey: 'Email',
		header: 'Email'
	},
	{
		accessorKey: 'Username',
		header: 'Username'
	},
	{
		accessorKey: 'Role',
		header: 'Role',
		cell: ({ cell }) => {
			const role = cell.getValue<User['Role']>();
			return (
				<Badge variant='outline' className='capitalize'>
					{role}
				</Badge>
			);
		},
		enableColumnFilter: true,
		meta: {
			label: 'Role',
			variant: 'multiSelect',
			options: ROLE_OPTIONS
		}
	},
	{
		accessorKey: 'Active',
		header: 'Active',
		cell: ({ cell }) => {
			const active = cell.getValue<boolean>();
			return active ? (
				<Badge variant='success'>
					<CheckCircle2 className='mr-1 h-4 w-4' /> Yes
				</Badge>
			) : (
				<Badge variant='destructive'>
					<XCircle className='mr-1 h-4 w-4' /> No
				</Badge>
			);
		}
	},
	{
		accessorKey: 'CreatedAt',
		header: 'Created At',
		cell: ({ cell }) => {
			const date = cell.getValue<string>();
			return date ? new Date(date).toLocaleDateString() : '';
		}
	},
	{
		accessorKey: 'UpdatedAt',
		header: 'Updated At',
		cell: ({ cell }) => {
			const date = cell.getValue<string>();
			return date ? new Date(date).toLocaleDateString() : '';
		}
	},
	{
		accessorKey: 'Client',
		header: 'Client'
	},
	{
		accessorKey: 'PhoneNumber',
		header: 'Phone'
	},
	{
		accessorKey: 'Address',
		header: 'Address'
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />
	},
	{
		id: 'save',
		header: () => null,
		cell: () => <Button variant='default'>Save</Button>
	}
];
