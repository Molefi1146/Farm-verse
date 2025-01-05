import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase/client';
import { AuthService } from '../../lib/auth/authService';
import { RegistrationData } from '../../lib/auth/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const register = async (data: RegistrationData) => {
    setLoading(true);
    setError(null);
    
    const response = await AuthService.register(data);
    
    if (!response.success) {
      setError(response.error || 'Registration failed');
    }
    
    setLoading(false);
    return response;
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const response = await AuthService.signIn(email, password);
    
    if (!response.success) {
      setError(response.error || 'Sign in failed');
    }
    
    setLoading(false);
    return response;
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    const response = await AuthService.signOut();
    
    if (!response.success) {
      setError(response.error || 'Sign out failed');
    }
    
    setLoading(false);
    return response;
  };

  return {
    user,
    loading,
    error,
    register,
    signIn,
    signOut
  };
}