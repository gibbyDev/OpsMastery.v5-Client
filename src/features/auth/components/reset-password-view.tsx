'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export default function ResetPasswordView() {
  const searchParams = useSearchParams();
  const token = searchParams.get('reset_token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }
    if (!password || password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reset_token: token,
          new_password: password,
         }),
      });
      if (!res.ok) throw new Error('Reset failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Could not reset password. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {status === 'success'
              ? 'Your password has been reset. You can now sign in.'
              : 'Enter your new password below.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status !== 'success' ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New password"
                className="w-full px-3 py-2 border rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border rounded"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          ) : (
            <a href="/auth/sign-in">
              <Button className="w-full mt-4">Go to Sign In</Button>
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}