import { ConfigModule as configModule } from '@nestjs/config';
import { resolve } from 'path';

export const ConfigModule = configModule.forRoot({
  envFilePath: ['.env.local', '.env'],
  isGlobal: true,
});

console.log({ __dirname, __filename, rootPath: resolve(__dirname, '..', '..', '..') });
export const rootPath = resolve(__dirname, '..', '..', '..');
