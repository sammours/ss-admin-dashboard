import { Route } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderEditComponent } from './pages/order-edit/order-edit.component';

export const ordersRoutes: Route[] = [
    { path: '', component: OrderListComponent},
    { path: ':id', component: OrderEditComponent},
];
