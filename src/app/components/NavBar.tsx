'use client';

import Link from 'next/link';
import useAuth from '../../../lib/auth';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  const { user, loading } = useAuth();

  return (
    <nav className="bg-orange-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-orange-200">
          Prometheus
        </Link>
        
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-orange-200">Home</Link>
          {user && (
            <Link href="/dashboard" className="hover:text-orange-200">Dashboard</Link>
          )}
          <Link href="/pricing" className="hover:text-orange-200">Pricing</Link>
        </div>
        
        <div>
          {loading ? (
            <div className="h-6 w-20 bg-orange-500 rounded animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Hi, {user.email?.split('@')[0]}</span>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link href="/login" className="hover:text-orange-200">Login</Link>
              <span className="text-orange-300">|</span>
              <Link href="/signup" className="hover:text-orange-200">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}