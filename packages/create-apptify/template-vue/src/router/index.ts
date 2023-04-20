import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHashHistory } from "vue-router";
import { useAuth, useNprogress, useTitle } from "./guards";
import { transformToMenuItems } from "./menus";
import { getAppRoutes, transformRoutes } from "./util";
export type { MenuItem } from "./menus";
export { router, menuItems };

const routes = transformRoutes(generatedRoutes);
const menuItems = transformToMenuItems(getAppRoutes(routes));
// menuItems.push(...linkItems);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    ...routes,
  ],
});

useNprogress(router);
useTitle(router);
useAuth(router);
