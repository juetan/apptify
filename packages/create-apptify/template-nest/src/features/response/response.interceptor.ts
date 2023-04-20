import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { LoggerService } from '../logger';
import { Response } from './response';
import { RESPONSE_KEY, ResponseType } from './response.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService, private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass();
    const handler = context.getHandler();
    const metadata = this.reflector.getAllAndOverride(RESPONSE_KEY, [controller, handler]);
    const { method, url } = context.switchToHttp().getRequest();

    this.logger.log(`${method} ${url} 访问+1`, controller.name);
    const maper = (data: any) => {
      if (metadata?.type === ResponseType.RAW) {
        return data;
      }
      if (data instanceof Response) {
        return data;
      }
      return Response.success(data);
    };

    return next.handle().pipe(map(maper));
  }
}
