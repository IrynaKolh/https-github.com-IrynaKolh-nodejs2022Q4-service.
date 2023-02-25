import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from './logger.service';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, body, query } = req;

    this.logger.log(
      `Incoming request: method: ${method}, url: ${url}, query: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(body)}`,
      'MyLoggerService',
    );

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `Outgoing response: method: ${method}, url: ${url}, status code: ${statusCode}`,
        'MyLoggerService',
      );
    });

    next();
  }
}
