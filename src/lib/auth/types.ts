import { User, AuthError } from '@supabase/supabase-js';

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

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}