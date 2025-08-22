'use client';
import { useEffect, useState } from 'react';
import { getUserById } from '@/lib/api/user';
import { useAuthStore } from '@/lib/store/authSlice';
import UserForm from './user-form';

export default function UserViewPage({ userId }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (userId !== 'new') {
        try {
          const data = await getUserById(userId, accessToken);
          setUser(data);
        } catch (err) {
          setUser(null);
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, [userId, accessToken]);

  if (loading) return <div>Loading...</div>;

  return <UserForm initialData={user} pageTitle={userId === 'new' ? 'Create New User' : 'Edit User'} />;
}
