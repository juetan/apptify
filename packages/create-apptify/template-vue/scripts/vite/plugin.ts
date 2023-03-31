import { ResolvedConfig } from 'vite';
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export default function envLoaderPlugin(): Plugin {
  let config: ResolvedConfig;
  let ext: string;

  return {
    name: 'vite-plugin-env-loader',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      ext = config.env.VITE_BUILD_TYPE;
    },
    async transformIndexHtml(html, ctx) {
      let pkg: any;
      const pkgPath = path.resolve(config.root, 'package.json');
      if (fs.existsSync(pkgPath)) {
        // pkg = await import(pkgPath);
      }
      return [
        {
          tag: 'meta',
          attrs: {
            name: 'app-version',
            content: pkg?.version || '0.0.0',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'app-build-time',
            content: new Date().toISOString(),
          },
        },
      ];
    },
    async resolveId(id, importer, options) {
      if (!ext || !id.startsWith('/src')) return;

      const resolution = await this.resolve(id, importer, { skipSelf: true, ...options });
      const targetPath = resolution?.id.replace(/\.([^.]*?)$/, `.${ext}.$1`);
      if (targetPath && fs.existsSync(targetPath)) {
        return targetPath;
      }
    },
  };
}
