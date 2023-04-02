import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isObject } from 'lodash';
import { Observable, map } from 'rxjs';
import { RESPONSE_KEY, ResponseType } from './decorator';
import { Response } from './response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const classMetadata = Reflect.getMetadata(RESPONSE_KEY, context.getClass());
    const handlerMetadata = Reflect.getMetadata(RESPONSE_KEY, context.getHandler());

    const maper = (data: any) => {
      const dataMetadata = Reflect.getMetadata(RESPONSE_KEY, isObject(data) ? data : {});
      const metadata = {
        ...classMetadata,
        ...handlerMetadata,
        ...dataMetadata,
      };

      if (metadata.type === ResponseType.RAW) {
        return data;
      }

      return data instanceof Response ? data : Response.success(data);
    };

    return next.handle().pipe(map(maper));
  }
}

export const AppResponseInterceptor = new ResponseInterceptor();
