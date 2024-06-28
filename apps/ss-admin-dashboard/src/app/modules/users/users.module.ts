import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { usersRoutes } from "./users.routes";
import { UserListComponent } from "./user-list/user-list.component";
import { BreadcrumbComponent, HighlightPipe, IconComponent, MenuComponent, PaginatorComponent } from "@ss-admin-dashboard/ui-common";
import { UtilCommonModule } from "@ss-admin-dashboard/util-common";
import { FormsModule } from "@angular/forms";
import { UserEditComponent } from "./user-edit/user-edit.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(usersRoutes),
      MenuComponent,
      IconComponent, 
      UtilCommonModule,
      PaginatorComponent,
      BreadcrumbComponent,
      HighlightPipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [UserListComponent, UserEditComponent]
  })
  export class UsersModule { }