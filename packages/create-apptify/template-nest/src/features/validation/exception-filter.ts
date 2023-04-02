import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ResponseCode } from '../response';
import { AppValidationError } from './error';

@Catch(AppValidationError)
export class ValidationExecptionFilter implements ExceptionFilter {
  catch(exception: AppValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = ResponseCode.ERROR;
    const message = exception.message;
    const data = exception.messages;
    response.status(400).json({ code, message, data });
  }
}

export const AppValidationExecptionFilter = new ValidationExecptionFilter();
