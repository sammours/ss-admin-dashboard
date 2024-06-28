import { Route } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const usersRoutes: Route[] = [
    { path: '', component: UserListComponent},
    { path: ':id', component: UserEditComponent},
];
