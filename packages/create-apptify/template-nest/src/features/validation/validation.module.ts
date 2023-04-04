import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationExecptionFilter } from './validation.filter';
import { validationPipeFactory } from './validation.pipe';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExecptionFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: validationPipeFactory,
    },
  ],
})
export class ValidationModule {}
