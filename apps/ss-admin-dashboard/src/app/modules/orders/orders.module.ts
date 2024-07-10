import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ordersRoutes } from './orders.routes';
import {
  BreadcrumbComponent,
  ButtonComponent,
  CarouselComponent,
  HighlightPipe,
  IconComponent,
  LineComponent,
  MenuComponent,
  PaginatorComponent,
  RatingComponent,
  TruncatePipe,
} from '@ss-admin-dashboard/ui-common';
import { UtilCommonModule } from '@ss-admin-dashboard/util-common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { MatDialogModule } from '@angular/material/dialog';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderEditComponent } from './pages/order-edit/order-edit.component';
import { OrdersTableComponent } from '@ss-admin-dashboard/feature';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ordersRoutes),
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
    LineComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    OrdersTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideNativeDateAdapter()],
  declarations: [OrderListComponent, OrderEditComponent],
})
export class OrdersModule {}
