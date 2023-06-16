/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  /**
   * 网站标题
   */
  readonly VITE_APP_TITLE: string;
  /**
   * 网站副标题
   */
  readonly VITE_APP_SUBTITLE: string;
  /**
   * 自定义的文件后缀
   */
  readonly VITE_BUILD_EXTENSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}