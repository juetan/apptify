import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExecptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = 2000;
    const message = exception.message;

    console.log('error', exception);

    response.json({ code, message });
  }
}

export const AppAllExecptionFilter = new AllExecptionFilter();
