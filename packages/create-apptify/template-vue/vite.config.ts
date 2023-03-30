import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { presetIcons, presetUno } from 'unocss';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import AutoComponent from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Page from 'vite-plugin-pages';
import Layout from 'vite-plugin-vue-layouts';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@app',
        replacement: 'src',
      },
    ],
  },
  plugins: [
    /**
     * 提供 Vue 3 单文件组件支持
     * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
     */
    Vue(),
    /**
     * 提供 Vue 3 JSX 支持
     * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx
     */
    VueJsx(),
    /**
     * 提供vue等api的自动导入
     * @see https://github.com/antfu/unplugin-auto-import#readme
     */
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ArcoResolver()],
      dts: './src/types/auto-import.d.ts',
    }),
    /**
     * 提供vue组件的自动导入
     * @see https://github.com/antfu/unplugin-vue-components
     */
    AutoComponent({
      resolvers: [ArcoResolver({ sideEffect: true })],
      dts: './src/types/auto-component.d.ts',
    }),
    /**
     * 提供基于文件系统的路由
     * @see https://github.com/hannoeru/vite-plugin-pages
     */
    Page({
      exclude: ['**/components/*.vue'],
    }),
    /**
     * 提供路由布局
     * @see todo
     */
    Layout(),
    /**
     * 提供按需生成的CSS引擎
     * @see https://github.com/unocss/unocss#readme
     */
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          prefix: '',
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
            width: '16px',
            height: '16px',
          },
        }),
      ],
    }),
  ],
});
