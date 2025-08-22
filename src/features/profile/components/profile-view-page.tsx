"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export default function ProfileViewPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        // Replace with your actual user ID logic
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const userId = user?.id;
        const username = user?.username;
        const role = user?.role;
        if (!userId) {
          setError('User ID not found');
          setLoading(false);
          return;
        }
        setUserId(userId);

        const res = await fetch(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setName(data.name || '');
        setAddress(data.address || '');
        setPhoneNumber(data.phone_number || '');
        setUsername(data.username || '');
        setRole(data.role || '');
        setProfilePhotoUrl(`${API_URL}/users/${userId}/profile_photo`);
      } catch (err) {
        setError('Could not load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  // PUT all fields (including photo) to /users/:id
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!userId) throw new Error('User ID missing');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('address', address);
      formData.append('phone_number', phoneNumber);
      if (profilePhoto) formData.append('profile_photo', profilePhoto);

      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Do NOT set Content-Type for FormData; browser will set it automatically
        },
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Profile update failed');
      } else {
        setSuccess(true);
        // Refresh photo if updated
        if (profilePhoto) {
          setProfilePhotoUrl(`${API_URL}/users/${userId}/profile_photo?${Date.now()}`);
          setProfilePhoto(null);
        }
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleProfileSubmit} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border rounded"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-3 py-2 border rounded"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full px-3 py-2 border rounded"
              value={role}
              onChange={e => setRole(e.target.value)}
              disabled
            />
            <div className="flex flex-col items-center gap-2">
              {profilePhotoUrl && (
                <img
                  src={profilePhotoUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handlePhotoChange}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && (
              <div className="text-green-600 text-sm">
                Profile updated successfully!
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
