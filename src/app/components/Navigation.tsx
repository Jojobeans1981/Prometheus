'use client';

import Link from 'next/link';
import useAuth from '../../../lib/auth';

type AuthReturn = {
  user?: { name?: string; email?: string };
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export default function Navigation() {
  const auth = useAuth({ children: null });
  const { user, signOut: logout, isAuthenticated: isAuth, isLoading } = (typeof auth === 'object' && auth !== null
    ? auth
    : { user: undefined, signOut: async () => {}, isAuthenticated: false, isLoading: false }) as AuthReturn;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-orange-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Prometheus</Link>
        </h1>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-orange-200">Home</Link>
          
          {isAuth ? (
            <>
              <Link href="/dashboard" className="hover:text-orange-200">Dashboard</Link>
              <Link href="/pricing" className="hover:text-orange-200">Pricing</Link>
              <span className="text-orange-200">Hello, {user?.name || user?.email}</span>
              <button 
                onClick={handleLogout}
                className="hover:text-orange-200 bg-orange-700 px-3 py-1 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <Link href="/pricing" className="hover:text-orange-200">Pricing</Link>
              <Link href="/login" className="hover:text-orange-200">Login</Link>
              <Link href="/signup" className="bg-orange-700 px-3 py-1 rounded hover:bg-orange-800">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}