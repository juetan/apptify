import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

/**
 * Vite配置
 * @see https://cn.vitejs.dev/config/
 */
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    /**
     * 集成油猴插件
     * @see https://github.com/lisonge/vite-plugin-monkey
     */
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://*/*'],
        require: [
          /**
           * 通过base64编码的方式引入外部脚本，设置Layui的路径，避免css文件找不到;
           * (function () { this.LAYUI_GLOBAL = {dir: 'https://cdn.jsdelivr.net/npm/layui@2.7.6/dist/'}; })()
           */
          `data:application/javascript;base64,OyhmdW5jdGlvbiAoKSB7IHRoaXMuTEFZVUlfR0xPQkFMID0ge2RpcjogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbGF5dWlAMi43LjYvZGlzdC8nfTsgfSkoKTsK`,
        ],
      },
      build: {
        externalGlobals: {
          jquery: cdn.jsdelivr('jQuery', 'dist/jquery.min.js'),
          layui: cdn.jsdelivr('layui', 'dist/layui.js'),
        },
      },
    }),
  ],
});
