// Simple logging utility for debugging auth flows
export const logger = {
  error: (message: string, error?: any) => {
    console.error(`[Auth Error] ${message}`, error);
    // In production, you'd want to send this to a logging service
  },
  
  info: (message: string, data?: any) => {
    console.log(`[Auth Info] ${message}`, data);
  }
};