import { defineConfig } from 'vite';
import { builtinModules } from 'module';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [...builtinModules],
    },
  },
  esbuild: {
    // banner: `#!/usr/bin/env node`,
  }
});
