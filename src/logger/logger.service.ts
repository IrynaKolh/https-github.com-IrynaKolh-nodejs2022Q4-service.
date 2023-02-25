import { Injectable, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';

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

  logRequest(request: Request, response: Response) {
    const { method, originalUrl: url, body, query } = request;

    this.log(
      `Incoming request: ${method} ${url} ${JSON.stringify(
        query,
      )} ${JSON.stringify(body)}`,
      'MyLoggerService',
    );

    response.on('finish', () => {
      const { statusCode } = response;

      this.log(
        `Outgoing response: ${method} ${url} - ${statusCode}`,
        'MyLoggerService',
      );
    });
  }
}
