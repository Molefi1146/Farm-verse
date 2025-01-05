import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { AuthError } from '@supabase/supabase-js';
import RegistrationForm from '../components/auth/RegistrationForm';
import { registerUser, RegistrationData } from '../lib/supabase/auth';
import { logger } from '../utils/logger';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegistration = async (data: RegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await registerUser(data);

      if (authError) {
        throw authError;
      }

      // Registration successful
      navigate('/dashboard');
    } catch (err) {
      logger.error('Registration failed', err);
      const authError = err as AuthError;
      
      // Provide user-friendly error messages
      if (authError.message.includes('Email confirmation')) {
        setError('Please check your email to confirm your account');
      } else {
        setError(authError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <UserPlus className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegistrationForm
            onSubmit={handleRegistration}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}