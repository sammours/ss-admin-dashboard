import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'inbox',
        loadChildren: () =>
          import('./modules/inbox/inbox.module').then((m) => m.InboxModule),
      },
    ],
  },
];
