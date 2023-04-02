import { ServeStaticModule as module } from '@nestjs/serve-static';
import { join } from 'path';
import { rootPath } from '../config';

export const serveStaticModule = () => {
  return module.forRoot(
    {
      rootPath: join(rootPath, 'public/upload'),
      serveRoot: '/upload',
    },
    {
      rootPath: join(rootPath, 'public/web'),
    },
  );
};
