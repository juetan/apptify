import { builtinModules } from 'module';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [...builtinModules, ...builtinModules.map((i) => `node:${i}`)],
      output: {
        banner: `#!/usr/bin/env node`,
      },
    },
  },
});
