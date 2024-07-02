import { Route } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

export const productsRoutes: Route[] = [
    { path: '', component: ProductListComponent},
    { path: ':id', component: ProductEditComponent},
];
