import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const env = config({ path: '../.env' }).parsed || {};
const { DB_MYSQL_HOST, DB_MYSQL_PORT, DB_MYSQL_USERNAME, DB_MYSQL_PASSWORD, DB_MYSQL_DATABASE } = env;

export default new DataSource({
  type: 'mysql',
  host: DB_MYSQL_HOST,
  port: Number(DB_MYSQL_PORT),
  username: DB_MYSQL_USERNAME,
  password: DB_MYSQL_PASSWORD,
  database: DB_MYSQL_DATABASE,
  charset: 'utf8_general_ci',
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['./migrations/*.ts'],
  entities: [join(__dirname, '../src/**/*.entity.ts')],
});

console.log(join(__dirname, '../src/**/*.entity.ts'));
