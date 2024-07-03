import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { inboxRoutes } from "./inbox.routes";
import { BreadcrumbComponent, ButtonComponent, CarouselComponent, HighlightPipe, IconComponent, LineComponent, MenuComponent, PaginatorComponent, RatingComponent, TruncatePipe } from "@ss-admin-dashboard/ui-common";
import { UtilCommonModule } from "@ss-admin-dashboard/util-common";
import { FormsModule } from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(inboxRoutes),
      MenuComponent,
      IconComponent, 
      UtilCommonModule,
      PaginatorComponent,
      BreadcrumbComponent,
      ButtonComponent,
      CarouselComponent,
      HighlightPipe,
      TruncatePipe,
      MatDialogModule,
      RatingComponent,
      LineComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: []
  })
  export class InboxModule { }