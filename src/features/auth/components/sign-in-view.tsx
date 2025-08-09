"use client"

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage({ stars }: { stars: number }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        credentials: 'include', // Important for cookies!
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Sign in failed');
      } else {
        // Store user_id in localStorage for profile page
        if (data.user_id) {
          localStorage.setItem('user_id', String(data.user_id));
        }
        // Optionally redirect or reload
        window.location.href = '/dashboard/overview';
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotStatus('loading');
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      if (!res.ok) throw new Error();
      setForgotStatus('sent');
    } catch {
      setForgotStatus('error');
    }
  };

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Login
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          OpsMastery
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Welcome to OpsMastery, a one stop for all of your dev teams organization. Including ticket management for customer support&rdquo;
            </p>
            <footer className='text-sm'>Cody Gibbs, CEO</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          {/* github link  */}
          <Link
            className={cn('group inline-flex hover:text-yellow-200')}
            target='_blank'
            href={'https://github.com/kiranism/next-shadcn-dashboard-starter'}
          >
            <div className='flex items-center'>
              <GitHubLogoIcon className='size-4' />
              <span className='ml-1 inline'>Star on GitHub</span>{' '}
            </div>
            <div className='ml-2 flex items-center gap-1 text-sm md:flex'>
              <IconStar
                className='size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300'
                fill='currentColor'
              />
              <span className='font-display font-medium'>{stars}</span>
            </div>
          </Link>
          {/* Custom Sign In Form */}
          <form className='w-full space-y-4' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              className='w-full px-3 py-2 border rounded'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full px-3 py-2 border rounded'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <div className='flex justify-end'>
              <button
                type='button'
                className='text-sm text-primary underline underline-offset-4 hover:text-primary/80'
                onClick={() => setForgotOpen(true)}
                tabIndex={-1}
              >
                Forgot password?
              </button>
            </div>
            {error && <div className='text-red-500 text-sm'>{error}</div>}
            <button
              type='submit'
              className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          {/* Forgot Password Modal/Section */}
          {forgotOpen && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
              <div className='bg-background rounded-lg shadow-lg p-6 w-full max-w-sm'>
                <h2 className='text-lg font-semibold mb-2'>Forgot Password</h2>
                <form onSubmit={handleForgotPassword} className='space-y-4'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    className='w-full px-3 py-2 border rounded'
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    required
                  />
                  {forgotStatus === 'sent' && (
                    <div className='text-green-600 text-sm'>
                      If an account exists, a reset link has been sent to your email.
                    </div>
                  )}
                  {forgotStatus === 'error' && (
                    <div className='text-red-500 text-sm'>
                      Could not send reset email. Please try again.
                    </div>
                  )}
                  {/* Stack the buttons vertically */}
                  <div className='flex flex-col gap-2'>
                    <button
                      type='submit'
                      className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
                      disabled={forgotStatus === 'loading'}
                    >
                      {forgotStatus === 'loading' ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <button
                      type='button'
                      className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                      onClick={() => {
                        setForgotOpen(false);
                        setForgotStatus('idle');
                        setForgotEmail('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Don't have an account?{' '}
            <Link
              href='/auth/sign-up'
              className='hover:text-primary underline underline-offset-4'
            >
              Sign up
            </Link>
          </p>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
