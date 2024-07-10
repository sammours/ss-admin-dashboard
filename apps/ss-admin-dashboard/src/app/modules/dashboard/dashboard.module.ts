import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard.routes";
import { BreadcrumbComponent, ButtonComponent, CarouselComponent, IconComponent, LineComponent, MenuComponent, PaginatorComponent } from "@ss-admin-dashboard/ui-common";
import { UtilCommonModule } from "@ss-admin-dashboard/util-common";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardUsersComponent } from "./components/dashboard-users/dashboard-users.component";
import { DashboardOrderOverviewComponent } from "./components/dashboard-order-overview/dashboard-order-overview.component";
import { DashboardLastOrdersComponent } from "./components/dashboard-last-orders/dashboard-last-orders.component";
import { OrdersTableComponent } from "@ss-admin-dashboard/feature";
import { DashboardProductStatsComponent } from "./components/dashboard-product-stats/dashboard-product-stats.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(dashboardRoutes),
      MenuComponent,
      IconComponent, 
      UtilCommonModule,
      PaginatorComponent,
      BreadcrumbComponent,
      ButtonComponent,
      CarouselComponent,
      NgApexchartsModule,
      LineComponent,
      OrdersTableComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [DashboardComponent, DashboardUsersComponent, DashboardOrderOverviewComponent, DashboardLastOrdersComponent, DashboardProductStatsComponent]
  })
  export class DashboardModule { }