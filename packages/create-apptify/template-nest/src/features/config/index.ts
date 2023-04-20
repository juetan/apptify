import { ConfigModule as configModule } from '@nestjs/config';
import { resolve } from 'path';

export const ConfigModule = configModule.forRoot({
  envFilePath: ['.env.local', '.env'],
  isGlobal: true,
});

export const rootPath = resolve(__dirname, '..', '..', '..');
