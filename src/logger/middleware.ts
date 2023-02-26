import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from './logger.service';
import { Stream } from 'stream';
import { createWriteStream } from 'fs';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLoggerService) {}

  private writableStream = createWriteStream('log.txt', {
    flags: 'a',
  });
  private readable = new Stream.Readable({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    read() {},
  });

  private logToFileError(data: string) {
    this.writableStream.on('error', (e) => {
      console.log(e);
    });
    this.readable.push(data + '\n');
    this.readable.pipe(this.writableStream);
  }
  catch(e) {
    console.log(e);
  }

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

      if (!res.statusCode.toString().startsWith('2'))
        this.logToFileError(
          `[${new Date().toISOString()}] 
          [ERROR] 
          method: ${method}, 
          url: ${url}, 
          query: ${JSON.stringify(query)},
          body: ${JSON.stringify(body)}
          status code: ${statusCode}`,
        );

      this.logger.log(
        `Outgoing response: method: ${method}, url: ${url}, status code: ${statusCode}`,
        'MyLoggerService',
      );
    });

    next();
  }
}
