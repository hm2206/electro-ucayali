import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

interface ParamsException {
  status?: number;
  code?: string;
  message: string;
  errors?: { [key: string]: any };
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ParamsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception?.status || 501;
    const code = exception?.code || 'ERR';

    response.status(status).json({
      status: status,
      code,
      timestamp: new Date().toISOString(),
      message: exception.message,
      errors: exception.errors,
    });
  }
}
