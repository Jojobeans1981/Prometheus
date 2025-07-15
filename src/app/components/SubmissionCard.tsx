import { ResumeSubmission } from '@/types';

interface SubmissionCardProps {
  submission: ResumeSubmission;
  onStatusChange: (status: ResumeSubmission['status']) => void;
}

export default function SubmissionCard({ submission, onStatusChange }: SubmissionCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{submission.name}</h3>
          <p className="text-gray-600">{submission.email}</p>
          <p className="text-sm mt-2">
            {submission.targetRole} • {submission.experienceLevel}
          </p>
        </div>
        <select
          value={submission.status}
          onChange={(e) => onStatusChange(e.target.value as ResumeSubmission['status'])}
          className="border rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="reviewing">Reviewing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="mt-4">
        <a
          href={submission.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          View Resume
        </a>
      </div>
    </div>
  );
}