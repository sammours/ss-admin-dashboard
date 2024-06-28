import { Route } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const productsRoutes: Route[] = [
    { path: '', component: ProductListComponent},
    { path: ':id', component: ProductEditComponent},
];
