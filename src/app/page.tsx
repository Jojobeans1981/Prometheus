'use client';

import Link from 'next/link';
import { useAuth } from '../../lib/auth';

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-orange-600 mb-6">
            Prometheus Resume Optimizer
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Transform your resume with AI-powered optimization and land your dream job
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                Welcome back, {user?.name}!
              </p>
              <Link 
                href="/dashboard"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link 
                href="/signup"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Get Started
              </Link>
              <Link 
                href="/login"
                className="inline-block bg-white hover:bg-gray-50 text-orange-600 font-bold py-3 px-8 rounded-lg border-2 border-orange-600 transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes your resume and provides personalized recommendations
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">Industry Insights</h3>
            <p className="text-gray-600">
              Get insights tailored to your specific industry and target roles
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">Real-time Optimization</h3>
            <p className="text-gray-600">
              See improvements in real-time as you implement our suggestions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
