import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ExceptionsLoggerFilter implements ExceptionFilter {
  private configureHttpExceptionResponse(exception: HttpException) {
    console.log('Error', exception);
    if (typeof exception.getResponse() === 'object')
      return { ...(exception.getResponse() as object) };
    else
      return {
        statusCode: exception.getStatus() || 500,
        message: exception.message,
      };
  }

  private configureErrorResponse(error: Error) {
    console.log('Error', error);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
  }

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseJson =
      exception instanceof HttpException
        ? this.configureHttpExceptionResponse(exception)
        : this.configureErrorResponse(exception as Error);

    response
      .status(responseJson.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(responseJson);
  }
}
