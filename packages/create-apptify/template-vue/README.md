# 路由
使用`vite-plugin-pages`路由系统，有2套路由系统，分别为页面路由和菜单路由。

其中，页面路由是实际传入给`vue-router`的路由，只包含2层路由(配合缓存)。`src/pages`目录下为路由页面，其中：
- `src/pages`下以`_`开头的文件名/目录名为顶级路由。
- 其余目录或`.vue`文件为2级路由。每个目录下的同名`.vue`文件为菜单层级配置。

## 组件
- Toast 以函数形式调用，返回一个关闭函数。

## 请求函数
- 存在token则携带token
- 可传入toast参数进行请求中的提示
- 可使用useRequest进行请求状态的管理

## 状态管理
- userStore持久化保存在`localStorage`中。