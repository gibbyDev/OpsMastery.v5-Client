'use client';
import { useEffect, useState } from 'react';
import { searchUsers } from '@/lib/api/user';
import { useAuthStore } from '@/lib/store/authSlice';
import { UserTable } from './user-tables';
import { columns } from './user-tables/columns';

type UserListingPageProps = {
  searchParams?: Record<string, string>;
};

export default function UserListingPage({ searchParams }: UserListingPageProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const search = searchParams?.name ?? '';
        const data = await searchUsers(search, accessToken);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [searchParams, accessToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <UserTable
      data={users}
      totalItems={users.length}
      columns={columns}
    />
  );
}
