import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { productsRoutes } from "./products.routes";
import { BreadcrumbComponent, DialogComponent, HighlightPipe, IconComponent, MenuComponent, PaginatorComponent, TruncatePipe } from "@ss-admin-dashboard/ui-common";
import { UtilCommonModule } from "@ss-admin-dashboard/util-common";
import { FormsModule } from "@angular/forms";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(productsRoutes),
      MenuComponent,
      IconComponent, 
      UtilCommonModule,
      PaginatorComponent,
      BreadcrumbComponent,
      DialogComponent,
      HighlightPipe,
      TruncatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ProductListComponent, ProductEditComponent]
  })
  export class ProductsModule { }