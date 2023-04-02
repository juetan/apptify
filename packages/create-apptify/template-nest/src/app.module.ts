import { Module } from '@nestjs/common';
import { BaseModule, ConfigModule, LoggerModule, TypeormModule, serveStaticModule } from 'src/common';
import { AccountModule, User, UserModule } from 'src/modules';

@Module({
  imports: [
    /**
     * 配置模块(全局)，提供configService类
     */
    ConfigModule,
    /**
     * 日志模块(全局)，提供全局loggerService类
     */
    LoggerModule,
    /**
     * 静态资源模块(全局)，/upload和/web
     */
    serveStaticModule(),
    /**
     * 基础模块(全局)，提供基础服务
     */
    BaseModule,
    /**
     * 数据库ORM
     */
    TypeormModule([User]),
    /**
     * 用户模块
     */
    UserModule,
    /**
     * 账户模块
     */
    AccountModule,
  ],
})
export class AppModule {}
