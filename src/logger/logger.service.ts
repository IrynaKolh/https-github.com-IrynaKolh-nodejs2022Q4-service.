import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: string, context?: string) {
    console.log(`[${new Date().toISOString()}] [INFO] [${context}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] [${context}] ${message}`,
    );
    if (trace) {
      console.error(`[${new Date().toISOString()}] [ERROR] ${trace}`);
    }
  }

  warn(message: string, context?: string) {
    console.warn(
      `[${new Date().toISOString()}] [WARM] [${context}] ${message}`,
    );
  }

  debug(message: string, context?: string) {
    console.debug(
      `[${new Date().toISOString()}] [DEBUG] [${context}] ${message}`,
    );
  }

  verbose(message: string, context?: string) {
    console.info(
      `[${new Date().toISOString()}] [VERBOSE] [${context}] ${message}`,
    );
  }
}
