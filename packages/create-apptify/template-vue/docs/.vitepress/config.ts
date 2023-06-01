import { defineConfig } from "vitepress";

/**
 * 站点配置
 * @see https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  lang: "zh-CN",
  title: "测试站点",
  description: "快速开发的模板",
  /**
   * 主题配置
   * @see https://vitepress.dev/reference/default-theme-config
   */
  themeConfig: {
    logo: "/favicon.ico",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '重置搜索',
            footer: {
              selectText: '选择',
              navigateText: '移动',
              closeText: '关闭',
            }
          }
        },
      }
    },
    outline: {
      label: "本篇目录",
    },
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "示例",
        link: "/markdown-examples",
      },
      {
        text: '测试分类',
        items: [
          {
            text: '测试1',
            link: '/test1'
          },
          {
            text: '测试2',
            link: '/test2'
          }
        ]
      }
    ],
    sidebar: [
      {
        text: "示例",
        items: [
          {
            text: "Markdown语法示例",
            link: "/markdown-examples",
          },
          {
            text: "Runtime API示例",
            link: "/api-examples",
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/juetan",
      },
    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    footer: {
      message: "© 2023 JueTan",
      copyright: '版权所有'
    }
  },

  markdown: {
    theme: "github-dark-dimmed",
    lineNumbers: true,
  },
});
