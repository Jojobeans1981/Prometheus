// src/components/ResumeForm.tsx
'use client';

import { useState } from 'react';
import { ResumeSubmission, FormState } from '../types';
import { resumeService } from '../../services/resumeService';

export default function ResumeForm() {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    error: null,
    success: false
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, error: null, success: false });

    try {
      const formData = new FormData(e.currentTarget);
      const resumeUrl = formData.get('resumeUrl') as string;

      // Basic URL validation
      try {
        new URL(resumeUrl);
      } catch {
        throw new Error('Please enter a valid resume URL');
      }

      await resumeService.submitResume({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        targetRole: formData.get('targetRole') as string,
        experienceLevel: formData.get('experienceLevel') as ResumeSubmission['experienceLevel'],
        industry: formData.get('industry') as string,
        jobDescription: formData.get('jobDescription') as string,
        resumeUrl,
        status: 'pending'
      });

      setFormState({
        isSubmitting: false,
        error: null,
        success: true
      });
      e.currentTarget.reset();

    } catch (error) {
      setFormState({
        isSubmitting: false,
        error: { 
          message: error instanceof Error ? error.message : 'Failed to submit form'
        },
        success: false
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        {formState.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Resume submitted successfully! We will review it soon.
          </div>
        )}

        {formState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {formState.error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Professional Information</h2>

            <div>
              <label htmlFor="targetRole" className="block text-sm font-medium text-gray-700">
                Target Role *
              </label>
              <input
                type="text"
                id="targetRole"
                name="targetRole"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                Experience Level *
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="">Select experience level...</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (2-5 years)</option>
                <option value="senior">Senior Level (5-8 years)</option>
                <option value="expert">Expert (8+ years)</option>
              </select>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry *
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Technology, Healthcare, Finance, etc."
              />
            </div>
          </div>

          {/* Resume Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Resume Information</h2>

            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
                Resume URL *
              </label>
              <input
                type="url"
                id="resumeUrl"
                name="resumeUrl"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="https://drive.google.com/..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Please provide a public link to your resume (Google Drive, Dropbox, etc.)
              </p>
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                Target Job Description *
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Paste the job description you're targeting..."
              />
              <p className="mt-1 text-sm text-gray-500">
                This helps us tailor your resume to the specific role
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-md shadow-sm transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {formState.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Resume for Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}