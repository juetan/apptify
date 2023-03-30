import { RouteRecordRaw } from 'vue-router';

export const transformRoutes = (routes: RouteRecordRaw[]) => {
  const topRoutes: RouteRecordRaw[] = [];
  const appRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    if ((route.name as string)?.startsWith('_')) {
      route.path = route.path.replace('_', '');
      topRoutes.push(route);
      return;
    }
    appRoutes.push(route);
  });

  const appRoute = routes.find((i) => i.name === '_app');
  if (appRoute) {
    appRoute.children = appRoutes;
  }

  return topRoutes;
};
