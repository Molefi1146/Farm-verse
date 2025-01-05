export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'An account with this email already exists',
  WEAK_PASSWORD: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number',
  INVALID_ROLE: 'Invalid user role selected',
  SERVER_ERROR: 'Unable to complete registration. Please try again.',
} as const;

export const getAuthErrorMessage = (error: any): string => {
  if (!error) return AUTH_ERRORS.SERVER_ERROR;

  const message = error.message?.toLowerCase() || '';
  
  if (message.includes('email already')) return AUTH_ERRORS.EMAIL_IN_USE;
  if (message.includes('password')) return AUTH_ERRORS.WEAK_PASSWORD;
  if (message.includes('role')) return AUTH_ERRORS.INVALID_ROLE;
  
  return AUTH_ERRORS.SERVER_ERROR;
};