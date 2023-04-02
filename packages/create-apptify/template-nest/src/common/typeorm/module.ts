import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * 连接数据库
 */
export const TypeormModule = (entities: TypeOrmModuleOptions['entities'] = []) => {
  return TypeOrmModule.forRoot({
    type: 'sqlite',
    // host: '111.229.68.125',
    // port: 3306,
    // username: 'test1',
    // password: 'test1',
    database: 'database/db.sqlite',
    entities,
    synchronize: true,
    logging: false,
    // charset: 'utf8_general_ci',
    // dateStrings: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
};
