import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import { presetIcons, presetUno } from "unocss";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import AutoComponent from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Page from "vite-plugin-pages";
import plugin from "./scripts/vite/plugin";

/**
 * vite 配置
 * @see https://cn.vitejs.dev/config/
 */
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
  server: {
    port: 3020,
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
      imports: [
        "vue",
        "vue-router",
        {
          "@/components": ["useForm", "useFormModal", "useTable"],
          "@/api": ["api", "useRequest", "ContentType"],
        },
      ],
      resolvers: [ArcoResolver()],
      dts: "./src/types/auto-import.d.ts",
    }),
    /**
     * 提供vue组件的自动导入
     * @see https://github.com/antfu/unplugin-vue-components
     */
    AutoComponent({
      resolvers: [
        ArcoResolver({ sideEffect: false }),
        (() => {
          const components = ["Form", "FormModal", "Table"];
          return {
            type: "component",
            resolve: (name) => {
              if (components.includes(name)) {
                return { name, from: `@/components` };
              }
            },
          };
        })(),
      ],
      dts: "./src/types/auto-component.d.ts",
    }),
    /**
     * 提供基于文件系统的路由
     * @see https://github.com/hannoeru/vite-plugin-pages
     */
    Page({
      exclude: ["**/components/*.vue", "**/*.*.vue"],
    }),
    /**
     * 提供CSS和图标的按需加载
     * @see https://github.com/unocss/unocss#readme
     */
    Unocss({
      include: ["src/**/*.{vue,ts,tsx,css,scss,sass,less,styl}"],
      presets: [
        presetUno(),
        presetIcons({
          prefix: "",
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
            width: "16px",
            height: "16px",
          },
        }),
      ],
    }),
    /**
     * 项目插件，打包时注入版本信息、打包信息等内容
     * @see ./scripts/vite/plugin.ts
     */
    plugin(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import (reference) "${resolve("src/style/arco.less")}";`,
          arcoblue: "#66f",
        },
      },
    },
  },
});
