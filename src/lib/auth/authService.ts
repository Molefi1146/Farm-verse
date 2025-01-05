import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
import { RegistrationData, AuthResponse } from './types';
import { logger } from '../utils/logger';

export class AuthService {
  static async register(data: RegistrationData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
            organization: data.organization,
            experience: data.experience
          }
        }
      });

      if (error) throw error;

      return {
        success: true,
        user: authData.user
      };
    } catch (err) {
      const error = err as AuthError;
      logger.error('Registration failed', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return {
        success: true,
        user: authData.user
      };
    } catch (err) {
      const error = err as AuthError;
      logger.error('Sign in failed', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  static async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { success: true };
    } catch (err) {
      const error = err as AuthError;
      logger.error('Sign out failed', error);
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  private static getErrorMessage(error: AuthError): string {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Invalid email or password';
      case 'Email not confirmed':
        return 'Please verify your email address';
      case 'User already registered':
        return 'An account with this email already exists';
      default:
        return error.message;
    }
  }
}