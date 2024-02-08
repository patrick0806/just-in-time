import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Problem } from './Problem';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(
    exception: HttpException & Omit<Problem, 'status'>,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);

    const statusCode =
      Number(exception.getStatus()) || HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse() as Record<string, any>;

    response.status(statusCode).json({
      status: statusCode,
      title: exceptionResponse.title,
      detail: exceptionResponse.message,
      userMessage: exceptionResponse.userMessage,
      timestamp: new Date().toISOString(),
      fields: exceptionResponse.fields,
    });
  }
}
