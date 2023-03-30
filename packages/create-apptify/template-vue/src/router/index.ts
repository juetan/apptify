import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import generatedRoutes from 'virtual:generated-pages';
import { useNprogress, useTitle, useAuth } from './guards';
import { transformToMenuItems } from './menus';
export type { MenuItem } from './menus';
import { transformRoutes } from './util';

const routes = transformRoutes(generatedRoutes);

const menuItems = transformToMenuItems(routes.find((i) => i.name === 'app')?.children || []);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...routes,
  ],
});

useNprogress(router);

useTitle(router);

useAuth(router);

export { router, menuItems };
