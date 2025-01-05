import { z } from 'zod';

export const userRoleSchema = z.enum(['investor', 'project_creator', 'vendor']);

export const registrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: userRoleSchema,
  organization: z.string().optional(),
  experience: z.string().optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;