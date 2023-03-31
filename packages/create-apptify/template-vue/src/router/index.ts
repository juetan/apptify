import { createRouter, createWebHashHistory } from 'vue-router';
import generatedRoutes from 'virtual:generated-pages';
import { useNprogress, useTitle, useAuth } from './guards';
import { transformToMenuItems } from './menus';
export type { MenuItem } from './menus';
import { transformRoutes, getAppRoutes } from './util';
import { linkItems } from './links';

const routes = transformRoutes(generatedRoutes);
const menuItems = transformToMenuItems(getAppRoutes(routes));
menuItems.push(...linkItems);

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
