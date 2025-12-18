import { z } from 'zod';

// Auth validations
export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const signupSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
  role: z.enum(['professional', 'employer']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
});

// Professional onboarding validations
export const professionalStep1Schema = z.object({
  fullName: z.string().trim().min(2, { message: 'Full name must be at least 2 characters' }).max(100),
  phone: z.string().trim().min(10, { message: 'Please enter a valid phone number' }),
  location: z.string().trim().min(2, { message: 'Location is required' }),
});

export const professionalStep2Schema = z.object({
  category: z.string().trim().min(2, { message: 'Please select or enter a category' }),
  yearsExperience: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Please enter valid years of experience',
  }),
  skills: z.string().trim().min(3, { message: 'Please enter at least one skill' }),
  bio: z.string().trim().min(20, { message: 'Bio must be at least 20 characters' }).max(500),
});

// Employer onboarding validations
export const employerStep1Schema = z.object({
  companyName: z.string().trim().min(2, { message: 'Company name is required' }).max(100),
  contactName: z.string().trim().min(2, { message: 'Contact name is required' }).max(100),
  email: z.string().trim().email({ message: 'Please enter a valid business email' }),
  phone: z.string().trim().min(10, { message: 'Please enter a valid phone number' }),
  location: z.string().trim().min(2, { message: 'Location is required' }),
});

export const employerStep2Schema = z.object({
  companySize: z.string().trim().min(1, { message: 'Please enter company size' }),
  industry: z.string().trim().min(2, { message: 'Industry is required' }),
  description: z.string().trim().min(20, { message: 'Description must be at least 20 characters' }).max(1000),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
});

// Job creation validation
export const createJobSchema = z.object({
  title: z.string().trim().min(5, { message: 'Job title must be at least 5 characters' }).max(100),
  category: z.string().trim().min(1, { message: 'Please select a category' }),
  location: z.string().trim().min(2, { message: 'Location is required' }),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary']),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  description: z.string().trim().min(50, { message: 'Description must be at least 50 characters' }).max(5000),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
}).refine((data) => {
  if (data.salaryMin && data.salaryMax) {
    return Number(data.salaryMax) >= Number(data.salaryMin);
  }
  return true;
}, {
  message: 'Maximum salary must be greater than minimum salary',
  path: ['salaryMax'],
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CreateJobFormData = z.infer<typeof createJobSchema>;
