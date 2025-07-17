'use client';

import { auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-700 hover:text-orange-600 transition-colors duration-200"
    >
      Logout
    </button>
  );
}