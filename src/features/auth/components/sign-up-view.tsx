"use client";

import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { FcGoogle } from 'react-icons/fc'; // Google logo
import { IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignUpViewPage({ stars }: { stars: number }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Sign up failed');
      } else {
        setSuccess(true);
        setEmail('');
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
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
        Sign Up
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
          <form className='w-full space-y-4' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              className='w-full rounded border px-3 py-2'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type='text'
              placeholder='Username'
              className='w-full rounded border px-3 py-2'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full rounded border px-3 py-2'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type='submit'
              className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {error && <div className='text-red-500 text-sm'>{error}</div>}
            {success && (
              <div className='text-green-600 text-sm'>
                Sign up successful, please check your email for verification
              </div>
            )}
          </form>
          <div className="flex flex-col w-full gap-2 mt-4">
            <div className="flex items-center w-full my-2">
              <div className="flex-grow border-t border-muted" />
              <span className="mx-2 text-xs text-muted-foreground">or</span>
              <div className="flex-grow border-t border-muted" />
            </div>
            <button
              type="button"
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-md border bg-black text-white py-2 font-medium hover:bg-gray-900 transition-colors"
              )}
              onClick={() => window.location.href = `${API_URL}/auth/github`}
            >
              <GitHubLogoIcon className="w-5 h-5 mr-2" />
              Sign in with Github
            </button>
            <button
              type="button"
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-md border bg-white text-gray-900 py-2 font-medium hover:bg-gray-100 transition-colors"
              )}
              onClick={() => window.location.href = `${API_URL}/auth/google`}
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </div>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Already have an account?{' '}
            <Link
              href='/auth/sign-in'
              className='hover:text-primary underline underline-offset-4'
            >
              Sign in
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
