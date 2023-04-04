import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';
import { HttpExecptionFilter } from './response-http.filter';
import { AllExecptionFilter } from './response-all.filter';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpExecptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AllExecptionFilter,
    },
  ],
})
export class ResponseModule {}
