import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
import { RegistrationData } from './validation';
import { getAuthErrorMessage } from './errors';
import { logger } from '../utils/logger';

export class AuthService {
  static async register(data: RegistrationData) {
    try {
      logger.info('Starting registration process', { email: data.email, role: data.role });

      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
            organization: data.organization || null,
            experience: data.experience || null,
          },
        },
      });

      if (error) throw error;

      logger.info('Registration successful', { userId: authData.user?.id });
      
      return {
        success: true,
        user: authData.user,
      };
    } catch (err) {
      const error = err as AuthError;
      logger.error('Registration failed', error);
      
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }
  }
}