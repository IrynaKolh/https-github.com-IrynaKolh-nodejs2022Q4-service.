import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: string, context?: string) {
    console.log(`[INFO] [${context}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`[ERROR] [${context}] ${message}`);
    if (trace) {
      console.error(`[ERROR] ${trace}`);
    }
  }

  warn(message: string, context?: string) {
    console.warn(`[WARM] [${context}] ${message}`);
  }

  debug(message: string, context?: string) {
    console.debug(`[DEBUG] [${context}] ${message}`);
  }

  verbose(message: string, context?: string) {
    console.info(`[VERBOSE] [${context}] ${message}`);
  }
}
