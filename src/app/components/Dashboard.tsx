// components/Dashboard.tsx
import { Submission } from "../types";
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface DashboardProps {
  submissions: Submission[];
  refreshSubmissions: () => Promise<void>;
}

export default function Dashboard({ submissions, refreshSubmissions }: DashboardProps) {
  const [editingStatus, setEditingStatus] = useState<{ [key: string]: string }>({});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = (id: string, value: string) => {
    setEditingStatus(prev => ({ ...prev, [id]: value }));
  };

  const updateStatus = async (id: string) => {
    if (!editingStatus[id]) return;
    
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'submissions', id), {
        status: editingStatus[id]
      });
      await refreshSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
      setEditingStatus(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Target Role</th>
            <th className="py-3 px-4 text-left">Experience</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="py-3 px-4">{submission.name}</td>
              <td className="py-3 px-4">{submission.email}</td>
              <td className="py-3 px-4">{submission.targetRole}</td>
              <td className="py-3 px-4 capitalize">{submission.experienceLevel}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    submission.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : submission.status === 'reviewing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                  }`}>
                    {submission.status}
                  </span>
                  
                  <select
                    value={editingStatus[submission.id as string] || ''}
                    onChange={(e) => handleStatusChange(submission.id as string, e.target.value)}
                    className="text-xs p-1 border rounded"
                  >
                    <option value="">Change</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                  
                  {editingStatus[submission.id as string] && (
                    <button 
                      onClick={() => updateStatus(submission.id as string)}
                      disabled={isUpdating}
                      className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 disabled:opacity-50"
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <a 
                    href={submission.resumeUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    View Resume
                  </a>
                  <button 
                    onClick={() => navigator.clipboard.writeText(submission.email)}
                    className="text-gray-500 hover:text-orange-500"
                    title="Copy email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}