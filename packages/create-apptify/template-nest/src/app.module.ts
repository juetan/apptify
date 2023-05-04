import { ClassSerializerInterceptor, Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  AllExecptionFilter,
  BaseModule,
  ConfigModule,
  HttpExecptionFilter,
  LoggerInterceptor,
  LoggerModule,
  ResponseInterceptor,
  ServeStaticModule,
  TypeormModule,
  ValidationExecptionFilter,
  validationPipeFactory,
} from './features';
import { AuthModule, UserModule } from './modules';

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
    AuthModule,
  ],
  providers: [
    /**
     * 全局序列化拦截器
     * @description 由于中间件的洋葱机制，需放在响应拦截器之前，否则无法检测到实例类型
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    /**
     * 全局响应拦截器
     * @description 将返回值统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    /**
     * 全局日志拦截器
     * @description 将请求和响应日志打印到控制台
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    /**
     * 全局异常过滤器
     * @description 将异常统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_FILTER,
      useClass: AllExecptionFilter,
    },
    /**
     * 全局HTTP异常过滤器
     * @description 将HTTP异常统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_FILTER,
      useClass: HttpExecptionFilter,
    },
    /**
     * 全局验证管道
     * @description 校验和转换输入数据
     */
    {
      provide: APP_PIPE,
      useFactory: validationPipeFactory,
    },
    /**
     * 全局验证异常过滤器
     * @description 将验证异常统一包装成{code, message, data, meta}格式
     */
    {
      provide: APP_FILTER,
      useClass: ValidationExecptionFilter,
    },
  ],
})
export class AppModule {}
