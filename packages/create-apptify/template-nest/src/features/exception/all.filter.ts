import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response as _Response } from 'express';
import { Response, ResponseCode } from '../response';

@Catch()
export class AllExecptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<_Response>();
    const message = exception.message;
    const code = ResponseCode.UNKNOWN_ERROR;

    response.status(500).json(Response.create({ code, message, data: null }));
  }
}
