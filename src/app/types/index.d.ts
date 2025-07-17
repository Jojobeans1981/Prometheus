export interface Submission {
  id?: string;
  name: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  industry: string;
  jobDescription: string;
  resumeUrl: string;
  status: 'pending' | 'reviewing' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}



export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data?: T;
  error?: AppError;
  success: boolean;
}

export interface FormState {
  isSubmitting: boolean;
  error: AppError | null;
  success: boolean;
}