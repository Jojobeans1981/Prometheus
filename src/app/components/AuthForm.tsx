'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../lib/auth';

export default function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  
  const { login, register, error, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'signup') {
        await register({ email, password, name });
      } else {
        await login({ email, password });
      }
      router.push('/dashboard');
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
        {mode === 'signup' ? 'Create Account' : 'Login to Prometheus'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              placeholder="John Doe"
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="••••••••"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'signup' ? 'Creating Account...' : 'Logging in...'}
            </span>
          ) : mode === 'signup' ? 'Sign Up' : 'Login'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        {mode === 'signup' ? (
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-600 hover:underline">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-orange-600 hover:underline">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}