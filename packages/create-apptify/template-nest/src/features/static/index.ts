import { ServeStaticModule as module } from '@nestjs/serve-static';
import { join } from 'path';
import { getRootPath } from 'src/common';

export const ServeStaticModule = module.forRoot(
  {
    rootPath: join(getRootPath(), 'public/upload'),
    serveRoot: '/upload',
  },
  {
    rootPath: join(getRootPath(), 'public/web'),
  },
);
