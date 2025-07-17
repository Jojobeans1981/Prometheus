// UPDATED: Added predictive features
'use client';

import { useState, useEffect } from 'react';
import {Submission, FormState } from '../types';
import { resumeService } from '../../services/resumeService';
import { getEmergingSkills, generatePredictiveResume } from '@/services/predictiveService'; // Added
import { EmergingSkill } from '@/services/predictiveService'; // Added

export default function ResumeForm() {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    error: null,
    success: false
  });
  
  const [industry, setIndustry] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [emergingSkills, setEmergingSkills] = useState<EmergingSkill[]>([]);

  // Fetch emerging skills when industry changes
  useEffect(() => {
    if (industry.trim() !== '') {
      getEmergingSkills(industry).then(skills => {
        setEmergingSkills(skills);
      });
    } else {
      setEmergingSkills([]);
    }
  }, [industry]);

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

      // Create submission object
      const submissionData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        targetRole: formData.get('targetRole') as string,
        experienceLevel: formData.get('experienceLevel') as Submission['experienceLevel'],
        industry: formData.get('industry') as string,
        jobDescription: formData.get('jobDescription') as string,
        resumeUrl,
        status: 'pending'
      };

      //  Generate predictive resume
      const predictiveResume = await generatePredictiveResume(submissionData);

      await resumeService.submitResume(predictiveResume);

      setFormState({
        isSubmitting: false,
        error: null,
        success: true
      });
      e.currentTarget.reset();
      setIndustry('');
      setTargetRole('');

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
        
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information  */}
          
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
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
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
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Technology, Healthcare, Finance, etc."
              />
            </div>
            
            {/* Emerging Skills Section */}
            {emergingSkills.length > 0 && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-orange-800">
                  🔮 Emerging Skills in {industry}
                </h3>
                <p className="text-sm text-orange-600 mb-2">
                  Consider adding these skills to your resume to future-proof your career:
                </p>
                <div className="flex flex-wrap gap-2">
                  {emergingSkills.map(skill => (
                    <span 
                      key={skill.id} 
                      className="px-3 py-1 bg-white text-orange-700 text-sm font-medium rounded-full border border-orange-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resume Information*/}
          
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
                  Generating Predictive Analysis...
                </span>
              ) : (
                'Future-Proof My Resume'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}