import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * 基本配置
 */
export const baseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'public/sqlite/data.db',
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

/**
 * 用于运行时连接数据库
 */
export const ormConfig: TypeOrmModuleOptions = {
  ...baseConfig,
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};

/**
 * 用于生成迁移文件
 */
export const cliConfig: DataSourceOptions = {
  ...baseConfig,
  entities: ['src/**/*.entity.ts'],
  migrations: [],
};

/**
 * 用于生成迁移文件
 */
export default new DataSource(cliConfig);
