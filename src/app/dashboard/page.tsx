'use client';

import { useAuth } from '../../../lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          Welcome to your Dashboard, {user?.name}!
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resume Upload Card */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-orange-800 mb-3">
              Upload Resume
            </h2>
            <p className="text-orange-600 mb-4">
              Upload your resume to get started with optimization
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors">
              Upload Resume
            </button>
          </div>

          {/* Recent Resumes Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              Recent Resumes
            </h2>
            <p className="text-blue-600 mb-4">
              View and manage your uploaded resumes
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              View Resumes
            </button>
          </div>

          {/* Analytics Card */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-3">
              Analytics
            </h2>
            <p className="text-green-600 mb-4">
              Track your resume optimization progress
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              View Analytics
            </button>
          </div>
        </div>

        {/* User Info Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
