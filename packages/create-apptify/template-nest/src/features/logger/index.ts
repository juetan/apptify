import { ConsoleLogger, Global, Injectable, Module } from '@nestjs/common';
import { dayjs } from 'src/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  protected getTimestamp(): string {
    return dayjs().format();
  }
}

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
