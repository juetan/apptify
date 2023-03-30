import { RouteRecordRaw } from 'vue-router';

export interface MenuItem {
  parent: string;
  path: string;
  sort?: number;
  title?: string;
  icon?: string;
  children?: MenuItem[];
}

const META_FILENAME = '/__route';

function routesToItems(routes: RouteRecordRaw[]): MenuItem[] {
  return routes.map((route) => {
    let paths = route.path.split('/');
    let parent = '';
    if (routes.some((i) => i.path === `${route.path}${META_FILENAME}`)) {
      parent = `${route.path}${META_FILENAME}`;
    }
    if (paths.length > 2) {
      if (route.path.endsWith(META_FILENAME)) {
        paths = paths.slice(0, -2);
      }
      if (routes.some((i) => i.path === `${paths.slice(0, -1).join('/')}${META_FILENAME}`)) {
        parent = `${paths.slice(0, -1).join('/')}${META_FILENAME}`;
      }
    }
    return {
      parent,
      path: route.path,
      sort: route.meta?.sort,
      title: route.meta?.title,
      icon: route.meta?.icon,
    };
  });
}

function listToTree(list: MenuItem[]) {
  const map: Record<string, MenuItem> = {};
  const tree: MenuItem[] = [];

  list.forEach((item) => {
    map[item.path] = item;
  });

  list.forEach((item) => {
    const parent = map[item.parent];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item);
    }
  });

  return tree;
}

function sort<T extends { children?: T[]; [key: string]: any }>(routes: T[], key = 'sort') {
  return routes.sort((a, b) => {
    if (Array.isArray(a.children)) {
      a.children = sort(a.children);
    }
    if (Array.isArray(b.children)) {
      b.children = sort(b.children);
    }
    return (a[key] as number) - (b[key] as number);
  });
}

export function transformToMenuItems(routes: RouteRecordRaw[]) {
  const items = sort(listToTree(routesToItems(routes)));
  return items;
}
