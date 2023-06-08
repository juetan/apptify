## 介绍
基于vue3 + vite4 + typescript的B端管理系统起始模板，提供自动导入/路由、轻量CRUD表格组件和API接口自动生成等功能。

## 功能
- 一个文件，自动生成路由/菜单/面包屑
- Typescript支持，内置和扩展众多类型定义，文档在手可触
- 根据openapi自动生成数据类型、请求函数
- 轻量化的封装表单、CRUD表格，开箱即用
- 内置VITE插件，输出版本/打包信息，支持根据不同后缀打包
- 轻量的字典常量定义助手函数
- 常用API/组件自动导入，同时带类型提示
- 图标/样式一个类名搞定
- 遵循`Conventional Changelog`规范， 自动生成版本记录文档
- 内置常用VsCode代码片段和推荐扩展，提升开发效率

## 快速开始
1. 确保本地安装有如下软件，推荐最新版本。
```
git
node
pnpm
```
备注：pnpm在NodeJS v16+版本可通过 corepack enable 命令开启，低版本请通过 npm install pnpm 命令安装

2. 拉取模板
```
npx degit https://github.com/juetan/apptify-admin
```

3. 安装依赖
```
pnpm install
```

4. 启动项目，默认端口3020。
```
pnpm dev
```


## 使用说明
本仓库仅是一个起始模板，具体项目请根据需求改造。

### 路由生成
基于 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) 插件。本项目使用`src/pages`作为路由目录，最终生成的路由仅有2级，主要是出于`<keepalive>`缓存的需要，其中：

| 说明 |
| --- |
| `src/pages`目录下以`_`开头的文件名/目录名为一级路由，如登陆页面。
| 其余目录或`.vue`文件为2级路由，如应用首页。

左侧菜单数据，将根据上面的2级路由自动生成，如需生成层级只需在对应目录下的index.vue文件中定义如下路由配置：
```vue
<route lang="json">
{
  "parentMeta": {
    // 具体属性查阅 src/types/vue-router.d.ts
  }
}
</route>
```


## 最后
如果你在使用过程中遇到问题，请在issue中提问。