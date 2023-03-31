import { MenuItem } from '../menus';

export const linkItems: MenuItem[] = [
  {
    id: 'dev',
    title: '开发环境',
    icon: 'icon-park-outline-server',
    path: 'dev',
    children: [
      {
        id: 'unocss',
        path: '/__unocss',
        title: 'Unocss统计',
        icon: 'icon-park-outline-link',
        external: true,
      },
      {
        id: 'api',
        path: '/link',
        title: '接口文档',
        icon: 'icon-park-outline-link',
        external: true,
      },
    ],
  },
  {
    id: 'about',
    title: '关于',
    icon: 'icon-park-outline-info',
    path: 'about',
  }
];
