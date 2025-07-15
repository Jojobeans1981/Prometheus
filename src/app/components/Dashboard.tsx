// src/components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { ResumeSubmission } from '../types';
import { resumeService } from '../../services/resumeService';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<ResumeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getSubmissions();
      setSubmissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load submissions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ResumeSubmission['status']) => {
    try {
      await resumeService.updateStatus(id, status);
      await loadSubmissions(); // Reload the list
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Submissions</h1>
        <button 
          onClick={() => loadSubmissions()} 
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Refresh
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No submissions yet</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {submissions.map((submission) => (
            <div 
              key={submission.id} 
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{submission.name}</h2>
                    <p className="text-gray-600">{submission.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Target Role: {submission.targetRole}
                    </p>
                    <p className="text-sm text-gray-500">
                      Industry: {submission.industry}
                    </p>
                  </div>
                  <select
                    value={submission.status}
                    onChange={(e) => handleStatusUpdate(submission.id!, e.target.value as ResumeSubmission['status'])}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      submission.status === 'completed' ? 'bg-green-100 text-green-800' :
                      submission.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <a 
                    href={submission.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    View Resume
                  </a>
                  <p className="text-sm text-gray-500">
                    Experience: {submission.experienceLevel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}