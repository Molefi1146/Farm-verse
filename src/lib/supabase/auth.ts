import { AuthError, AuthResponse, User } from '@supabase/supabase-js';
import { supabase } from './client';
import { logger } from '../utils/logger';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
}

export interface RegistrationData {
  email: string;
  password: string;
  name: string;
  role: 'investor' | 'project_creator' | 'vendor';
  organization?: string;
  experience?: string;
}

export async function registerUser(data: RegistrationData): Promise<AuthResponse> {
  logger.info('Starting registration', { email: data.email, role: data.role });
  
  return supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        role: data.role,
        organization: data.organization,
        experience: data.experience
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });
}