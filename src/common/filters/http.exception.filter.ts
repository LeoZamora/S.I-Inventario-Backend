import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let msg = 'Internal server error'

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            const res = exception.getResponse()

            msg =
            typeof res === 'string'
                ? res : (res as any).message || exception.message
        }

        response.status(status).json({
            code: status,
            msg: msg,
            error: HttpStatus[status],
            path: request.url,
        })
    }
}