import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: {
    user_id: string | number;
    fullName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  } | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export function UserAvatarProfile({
  className,
  showInfo = false,
  user
}: UserAvatarProfileProps) {
  // Build backend profile photo URL if user_id is present
  const imageUrl =
    user?.user_id
      ? `${API_URL}/users/${user.user_id}/profile_photo`
      : '';

  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage
          src={imageUrl}
          alt={user?.fullName || ''}
          crossOrigin="use-credentials"
        />
        <AvatarFallback className='rounded-lg'>
          {user?.fullName?.slice(0, 2)?.toUpperCase() || 'CN'}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>{user?.fullName || ''}</span>
          <span className='truncate text-xs'>
            {user?.emailAddresses[0].emailAddress || ''}
          </span>
        </div>
      )}
    </div>
  );
}

export function UserAvatarProfileContainer({ className, showInfo = false }: { className?: string; showInfo?: boolean }) {
  const [user, setUser] = useState<{
    user_id: string | number;
    fullName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  } | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    fetch(`${API_URL}/users/${userId}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUser({
          user_id: data.user_id || userId,
          fullName: data.name || data.username || '',
          emailAddresses: [{ emailAddress: data.email }],
        });
      });
  }, []);

  return <UserAvatarProfile className={className} showInfo={showInfo} user={user} />;
}
