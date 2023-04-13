import { RouteRecordRaw } from 'vue-router';

const APP_ROUTE_NAME = '_app';

/**
 * 转换一维路由为二维路由，其中以 _ 开头的路由为顶级路由，其余为应用路由
 * @param routes 路由配置
 * @returns
 */
export const transformRoutes = (routes: RouteRecordRaw[]) => {
  const topRoutes: RouteRecordRaw[] = [];
  const appRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    if ((route.name as string)?.startsWith('_')) {
      route.path = route.path.replace('_', '');
      topRoutes.push(route);
      return;
    }
    console.log({defineAsyncComponent, route});
    route.component = defineAsyncComponent({
      loader: route.component as any,
      loadingComponent: () => <div>loading...</div>,
      errorComponent: () => <div>error...</div>,
      delay: 200,
      timeout: 3000,
    });
    appRoutes.push(route);
  });

  const appRoute = routes.find((i) => i.name === APP_ROUTE_NAME);
  if (appRoute) {
    appRoute.children = appRoutes;
  }

  return topRoutes;
};

/**
 * 获取应用路由
 * @param routes 路由配置
 * @returns
 */
export const getAppRoutes = (routes: RouteRecordRaw[]) => {
  return routes.find((i) => i.name === APP_ROUTE_NAME)?.children || [];
};
