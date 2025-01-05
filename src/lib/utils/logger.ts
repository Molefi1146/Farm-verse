type LogLevel = 'info' | 'error' | 'warn';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, message: string, data?: any) {
    if (this.isDevelopment) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      
      switch (level) {
        case 'error':
          console.error(logMessage, data);
          break;
        case 'warn':
          console.warn(logMessage, data);
          break;
        default:
          console.log(logMessage, data);
      }
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  error(message: string, error?: any) {
    this.log('error', message, error);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }
}

export const logger = new Logger();