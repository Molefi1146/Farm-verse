import { useState } from 'react';
import { AuthService } from '../../lib/auth/service';
import { RegistrationData } from '../../lib/auth/validation';
import { useNavigate } from 'react-router-dom';

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (data: RegistrationData) => {
    setLoading(true);
    setError(null);

    const result = await AuthService.register(data);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return false;
    }

    // Registration successful
    setLoading(false);
    navigate('/dashboard');
    return true;
  };

  return {
    register,
    loading,
    error,
  };
}