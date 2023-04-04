import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { RESPONSE_KEY, ResponseType } from './response.decorator';
import { Response } from './response';
import { LoggerService } from 'src/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService, private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass();
    const handler = context.getHandler();
    const metadata = this.reflector.getAllAndOverride(RESPONSE_KEY, [controller, handler]);
    const { method, url } = context.switchToHttp().getRequest();

    this.logger.log(`${method} ${url} +1`, controller.name);

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
