import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response as _Response } from 'express';
import { Response } from '../response';

@Catch()
export class AllExecptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<_Response>();
    const message = exception.message;

    response.status(500).json(Response.error(null, message));
  }
}
