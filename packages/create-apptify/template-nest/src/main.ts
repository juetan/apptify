import { ClassSerializerInterceptor, Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { join } from 'path';
import {
  AppAllExecptionFilter,
  AppHttpExecptionFilter,
  AppResponseInterceptor,
  AppValidationExecptionFilter,
  AppValidationPipe,
  initSwagger,
} from 'src/features';
import { AppModule } from './app.module';

async function bootstrap() {
  process.env.ROOT_PATH = join(__dirname, '..');

  /**
   * 创建应用
   */
  const app = await NestFactory.create(AppModule);

  /**
   * 转换响应(data => { code, message, data })
   */
  app.useGlobalInterceptors(AppResponseInterceptor);

  /**
   * 全局异常捕获
   */
  app.useGlobalFilters(AppAllExecptionFilter);

  /**
   * Http异常捕获
   */
  app.useGlobalFilters(AppHttpExecptionFilter);

  /**
   * 全局拦截器
   */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /**
   * 参数校验
   */
  app.useGlobalPipes(AppValidationPipe);

  /**
   * 参数校验异常捕获
   */
  app.useGlobalFilters(AppValidationExecptionFilter);

  /**
   * 允许跨域
   */
  app.enableCors();

  /**
   * API前缀
   */
  app.setGlobalPrefix('/api');

  /**
   * 接口版本
   */
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  /**
   * 接口文档(swagger)
   */
  initSwagger(app);

  /**
   * 监听端口
   */
  const port = app.get(ConfigService).get('SERVER_PORT', 5000);
  const host = app.get(ConfigService).get('SERVER_HOST', '0.0.0.0');
  await app.listen(port, host);

  /**
   * 输出项目运行URL
   */
  Logger.log(`Application is running at ${await app.getUrl()}`, 'NestApplication');

  /**
   * 输出接口文档URL
   */
  Logger.log(`OpenapiDocs is running at ${await app.getUrl()}/openapi`, 'NestApplication');
}

bootstrap();
