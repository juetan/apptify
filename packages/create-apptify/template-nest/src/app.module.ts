import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  AllExecptionFilter,
  BaseModule,
  ConfigModule,
  HttpExecptionFilter,
  LoggerModule,
  ResponseInterceptor,
  ServeStaticModule,
  TypeormModule,
  ValidationExecptionFilter,
  validationPipeFactory,
} from './features';
import { AccountModule, UserModule } from './modules';

@Global()
@Module({
  imports: [
    /**
     * 配置模块(全局)，提供ConfigService类
     */
    ConfigModule,
    /**
     * 日志模块(全局)，提供LoggerService类
     */
    LoggerModule,
    /**
     * 静态资源(全局)，/upload和/web
     */
    ServeStaticModule,
    /**
     * 基础模块(全局)，提供基础服务
     */
    BaseModule,
    /**
     * 数据库ORM
     */
    TypeormModule,
    /**
     * 用户模块
     */
    UserModule,
    /**
     * 账户模块
     */
    AccountModule,
  ],
  providers: [
    /**
     * 全局拦截器
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    /**
     * 全局异常过滤器
     */
    {
      provide: APP_FILTER,
      useClass: AllExecptionFilter,
    },
    /**
     * 全局HTTP异常过滤器
     */
    {
      provide: APP_FILTER,
      useClass: HttpExecptionFilter,
    },
    /**
     * 全局验证管道
     */
    {
      provide: APP_PIPE,
      useFactory: validationPipeFactory,
    },
    /**
     * 全局验证异常过滤器
     */
    {
      provide: APP_FILTER,
      useClass: ValidationExecptionFilter,
    },
  ],
})
export class AppModule {}
