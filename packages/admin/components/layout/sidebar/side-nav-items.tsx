import { SideNavItemProps } from '@atomic-web/ui-core';
import {
  Apps,
  Basket,
  Clipboard,
  Configure,
  Dashboard,
  Inbox,
  User,
} from 'grommet-icons';

export const menuItems: SideNavItemProps[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    id: 'configurations',
    label: 'Configurations',
    icon: <Configure />,
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: <Apps />,
    items: [
      {
        id: 'app1',
        icon: <Apps />,
        label: 'App 1',
      },
      {
        id: 'app2',
        icon: <Apps />,
        label: 'App 2',
      },
      {
        id: 'app3',
        icon: <Apps />,
        label: 'App 3',
      },
    ],
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: <Inbox />,
  },
  {
    id: 'user',
    label: 'Users',
    icon: <User />,
  },
  {
    id: 'shopping_cart',
    label: 'Shpping Carts',
    icon: <Basket />,
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <Clipboard />,
  },
];
