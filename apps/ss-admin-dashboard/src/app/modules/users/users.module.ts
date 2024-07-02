import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';
import { UserListComponent } from './user-list/user-list.component';
import {
  BreadcrumbComponent,
  ButtonComponent,
  HighlightPipe,
  IconComponent,
  LineComponent,
  MenuComponent,
  PaginatorComponent,
  // DateInputComponent,
} from '@ss-admin-dashboard/ui-common';
import { UtilCommonModule } from '@ss-admin-dashboard/util-common';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    MenuComponent,
    FormsModule,
    IconComponent,
    UtilCommonModule,
    PaginatorComponent,
    ButtonComponent,
    BreadcrumbComponent,
    LineComponent,
    HighlightPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [UserListComponent, UserEditComponent],
  // providers: [provideNativeDateAdapter()],
})
export class UsersModule {}
